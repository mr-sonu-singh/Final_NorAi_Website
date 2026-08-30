import { NextRequest, NextResponse } from 'next/server';
import {
  DainikNewsInputSchema,
  DainikNewsOutputSchema,
  GEMINI_DAINIK_NEWS_RESPONSE_SCHEMA,
} from '@/lib/tools/schemas';
import {
  SYSTEM_PROMPT_SMART_DAINIK_NEWS,
  buildSmartDainikNewsPrompt,
} from '@/lib/tools/prompts';
import { estimateTokenCount, estimateApiCost } from '@/lib/tools/client-parser';
import { checkRateLimit, getClientIp, getRateLimitHeaders } from '@/lib/security';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  const startTime = Date.now();

  try {
    const clientIp = getClientIp(req);
    const rateLimit = checkRateLimit(`tool:smart-dainik-news:${clientIp}`, {
      maxRequests: 30,
      windowMs: 5 * 60 * 1000,
    });

    if (!rateLimit.success) {
      return NextResponse.json(
        {
          error: 'RATE_LIMIT_EXCEEDED',
          message: 'Too many requests. Please wait a moment before analyzing more gazettes.',
        },
        { status: 429, headers: getRateLimitHeaders(rateLimit) }
      );
    }

    const body = await req.json();
    const parseResult = DainikNewsInputSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          error: 'INVALID_INPUT',
          message: 'Invalid Smart Dainik News payload.',
          details: parseResult.error.flatten(),
        },
        { status: 400, headers: getRateLimitHeaders(rateLimit) }
      );
    }

    const inputData = parseResult.data;

    // Check for API Key
    const clientApiKey = req.headers.get('x-gemini-api-key');
    const apiKey = clientApiKey || process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error: 'MISSING_API_KEY',
          message:
            'No Gemini API Key found. Please add your Gemini API key in the BYOK settings modal or configure GEMINI_API_KEY in your server environment.',
        },
        { status: 401 }
      );
    }

    // Resolve requested model
    const requestedModel =
      (body.preferredModel as string) ||
      process.env.GEMINI_MODEL ||
      'gemini-3.5-lite';

    const resolveModelName = (name: string): string => {
      const lower = name.toLowerCase().trim();
      if (
        lower === 'gemini-3.5-lite' ||
        lower === 'gemini-3.1-lite' ||
        lower === '3.5-lite'
      ) {
        return 'gemini-2.5-flash-lite';
      }
      return name;
    };

    const targetModel = resolveModelName(requestedModel);
    const modelEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/${targetModel}:generateContent?key=${apiKey}`;

    const userPrompt = buildSmartDainikNewsPrompt(inputData);
    const estimatedInputTokens = estimateTokenCount(userPrompt) + 500;

    const payload = {
      systemInstruction: {
        parts: [{ text: SYSTEM_PROMPT_SMART_DAINIK_NEWS }],
      },
      contents: [
        {
          role: 'user',
          parts: [{ text: userPrompt }],
        },
      ],
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: GEMINI_DAINIK_NEWS_RESPONSE_SCHEMA,
        temperature: 0.15,
        maxOutputTokens: 8192,
      },
    };

    const response = await fetch(modelEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorJson;
      try {
        errorJson = JSON.parse(errorText);
      } catch {
        errorJson = { message: errorText };
      }

      return NextResponse.json(
        {
          error: 'MODEL_API_ERROR',
          message:
            errorJson?.error?.message ||
            `Gemini API returned status ${response.status}`,
          details: errorJson,
        },
        { status: response.status >= 400 && response.status < 500 ? 400 : 502 }
      );
    }

    const data = await response.json();
    const candidatePart =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!candidatePart) {
      return NextResponse.json(
        {
          error: 'EMPTY_MODEL_RESPONSE',
          message: 'The model returned an empty response. Please retry.',
        },
        { status: 502 }
      );
    }

    let parsedOutput;
    try {
      parsedOutput = JSON.parse(candidatePart);
    } catch {
      return NextResponse.json(
        {
          error: 'SCHEMA_PARSE_ERROR',
          message: 'Failed to parse structured gazette report from model output.',
          raw: candidatePart,
        },
        { status: 502 }
      );
    }

    const validatedOutput = DainikNewsOutputSchema.safeParse(parsedOutput);
    const finalData = validatedOutput.success
      ? validatedOutput.data
      : parsedOutput;

    const latencyMs = Date.now() - startTime;
    const estimatedOutputTokens = estimateTokenCount(candidatePart);
    const totalTokens = estimatedInputTokens + estimatedOutputTokens;
    const estimatedCostUsd = estimateApiCost(
      estimatedInputTokens,
      estimatedOutputTokens
    );

    const telemetry = {
      latencyMs,
      inputTokens: estimatedInputTokens,
      outputTokens: estimatedOutputTokens,
      totalTokens,
      estimatedCostUsd,
      modelUsed: `${requestedModel} (deterministic JSON mode)`,
      ephemeralStatus: 'EPHEMERAL_RAM_FLUSHED' as const,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: {
        ...finalData,
        telemetry,
      },
    });
  } catch (err: unknown) {
    const errorMsg =
      err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json(
      {
        error: 'INTERNAL_ERROR',
        message: errorMsg,
      },
      { status: 500 }
    );
  }
}
