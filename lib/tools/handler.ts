import { NextResponse } from 'next/server';
import type { z } from 'zod';
import {
  buildGeminiEndpoint,
  checkRateLimit,
  getClientIp,
  getRateLimitHeaders,
  isAllowedModelId,
  mapUpstreamError,
  readJsonBody,
  resolveRequestedModel,
  MAX_REQUEST_BODY_BYTES,
} from '@/lib/security';
import { estimateApiCost, estimateTokenCount } from '@/lib/tools/client-parser';

/**
 * Shared BYOK request pipeline for every tool route.
 *
 * All four tool routes previously carried their own copy of the rate limit,
 * body parse, model resolution, and upstream error handling. That duplication
 * meant the security-relevant logic had four places to drift. This factory is
 * the single place where a request becomes an upstream call, so a fix here
 * applies to every tool and a new tool cannot accidentally skip it.
 */

export interface ToolHandlerConfig<TIn extends z.ZodTypeAny, TOut extends z.ZodTypeAny> {
  /** Stable slug used for the rate-limit bucket. Never user-controlled. */
  routeName: string;
  inputSchema: TIn;
  outputSchema: TOut;
  /** JSON Schema sent to Gemini for structured output. */
  responseJsonSchema: Record<string, unknown>;
  systemPrompt: string;
  buildPrompt: (input: z.infer<TIn>) => string;
  temperature?: number;
  rateLimit?: { maxRequests: number; windowMs: number };
}

const DEFAULT_RATE_LIMIT = { maxRequests: 30, windowMs: 5 * 60 * 1000 } as const;

function errorBody(code: string, message: string, extra?: Record<string, unknown>) {
  return { success: false, error: code, message, ...extra };
}

export function createToolHandler<TIn extends z.ZodTypeAny, TOut extends z.ZodTypeAny>(
  config: ToolHandlerConfig<TIn, TOut>,
) {
  const { routeName, temperature = 0.15 } = config;
  const limits = config.rateLimit ?? DEFAULT_RATE_LIMIT;

  return async function POST(req: Request) {
    const startTime = Date.now();

    const clientIp = getClientIp(req);
    const rateLimit = checkRateLimit(`tool:${routeName}:${clientIp}`, limits);

    if (!rateLimit.success) {
      return NextResponse.json(
        errorBody('RATE_LIMIT_EXCEEDED', 'Too many requests. Please wait a moment before retrying.'),
        { status: 429, headers: getRateLimitHeaders(rateLimit) },
      );
    }

    const rateHeaders = getRateLimitHeaders(rateLimit);

    // Bounded read. Rejects oversized or malformed bodies before any work.
    const body = await readJsonBody(req, MAX_REQUEST_BODY_BYTES);
    if (!body.ok) {
      const status = body.code === 'PAYLOAD_TOO_LARGE' ? 413 : 400;
      return NextResponse.json(
        errorBody(
          body.code === 'PAYLOAD_TOO_LARGE' ? 'PAYLOAD_TOO_LARGE' : 'INVALID_INPUT',
          body.code === 'PAYLOAD_TOO_LARGE'
            ? 'Request body is too large.'
            : 'Request body could not be parsed as JSON.',
        ),
        { status, headers: rateHeaders },
      );
    }

    const raw = body.value as Record<string, unknown>;

    // Model allowlist. Rejects before any key is read and before any upstream
    // call, so an unknown id never reaches URL construction.
    const upstreamModel = resolveRequestedModel(raw?.preferredModel);
    if (upstreamModel === null) {
      return NextResponse.json(
        errorBody('INVALID_MODEL', 'That model is not available. Choose one of the supported models.'),
        { status: 400, headers: rateHeaders },
      );
    }

    const parsed = config.inputSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json(
        errorBody('INVALID_INPUT', 'Invalid payload for this tool.', {
          details: parsed.error.flatten().fieldErrors,
        }),
        { status: 400, headers: rateHeaders },
      );
    }

    const apiKey = req.headers.get('x-gemini-api-key') || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        errorBody(
          'MISSING_API_KEY',
          'No Gemini API key found. Add your own key in the BYOK settings, or configure GEMINI_API_KEY on the server.',
        ),
        { status: 401, headers: rateHeaders },
      );
    }

    const userPrompt = config.buildPrompt(parsed.data);
    const estimatedInputTokens = estimateTokenCount(userPrompt) + 500;

    const payload = {
      systemInstruction: { parts: [{ text: config.systemPrompt }] },
      contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: config.responseJsonSchema,
        temperature,
        maxOutputTokens: 8192,
      },
    };

    let upstream: Response;
    try {
      upstream = await fetch(buildGeminiEndpoint(upstreamModel), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Header, not ?key= — keeps the key out of proxy/CDN/Referer logs.
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify(payload),
      });
    } catch (cause) {
      console.error(`[${routeName}] upstream fetch failed`, {
        reason: cause instanceof Error ? cause.name : 'unknown',
      });
      return NextResponse.json(
        errorBody('MODEL_UNREACHABLE', 'The model service could not be reached. Please retry.'),
        { status: 502, headers: rateHeaders },
      );
    }

    if (!upstream.ok) {
      // The upstream body is never read back to the client: it can echo the
      // request, the model id, quota details, or key material.
      const mapped = mapUpstreamError(upstream.status);
      console.warn(`[${routeName}] upstream rejected request`, { status: upstream.status });
      return NextResponse.json(errorBody(mapped.code, mapped.message), {
        status: mapped.httpStatus,
        headers: rateHeaders,
      });
    }

    let candidatePart: string | undefined;
    try {
      const data = (await upstream.json()) as {
        candidates?: { content?: { parts?: { text?: string }[] } }[];
      };
      candidatePart = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    } catch {
      return NextResponse.json(
        errorBody('EMPTY_MODEL_RESPONSE', 'The model returned an unreadable response. Please retry.'),
        { status: 502, headers: rateHeaders },
      );
    }

    if (!candidatePart) {
      return NextResponse.json(
        errorBody('EMPTY_MODEL_RESPONSE', 'The model returned an empty response. Please retry.'),
        { status: 502, headers: rateHeaders },
      );
    }

    let structured: unknown;
    try {
      structured = JSON.parse(candidatePart);
    } catch {
      // Raw model text is not echoed back; it can contain prompt fragments.
      return NextResponse.json(
        errorBody('SCHEMA_PARSE_ERROR', 'Failed to parse a structured response from the model.'),
        { status: 502, headers: rateHeaders },
      );
    }

    const validated = config.outputSchema.safeParse(structured);
    if (!validated.success) {
      return NextResponse.json(
        errorBody('SCHEMA_MISMATCH', 'The model response did not match the expected structure.'),
        { status: 502, headers: rateHeaders },
      );
    }

    const estimatedOutputTokens = estimateTokenCount(candidatePart);
    const totalTokens = estimatedInputTokens + estimatedOutputTokens;

    return NextResponse.json(
      {
        success: true,
        data: {
          ...validated.data,
          telemetry: {
            latencyMs: Date.now() - startTime,
            inputTokens: estimatedInputTokens,
            outputTokens: estimatedOutputTokens,
            totalTokens,
            estimatedCostUsd: estimateApiCost(estimatedInputTokens, estimatedOutputTokens),
            // Only ever an allowlist key, never the raw request string.
            modelUsed: isAllowedModelId(raw?.preferredModel)
              ? String(raw.preferredModel)
              : 'gemini-3.5-lite',
            ephemeralStatus: 'EPHEMERAL_RAM_FLUSHED' as const,
            timestamp: new Date().toISOString(),
          },
        },
      },
      { headers: rateHeaders },
    );
  };
}
