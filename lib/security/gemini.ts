/**
 * Gemini model allowlist and upstream request construction.
 *
 * SECURITY: a model id chosen by the client is untrusted input. Interpolating
 * it into an upstream URL lets a caller traverse the path (`../files/x`) or
 * inject a second query parameter (`foo?key=attacker`) and override the API
 * key. Every model id MUST therefore resolve through the frozen map below, and
 * the endpoint MUST be built with `URL` + `encodeURIComponent` — never string
 * concatenation.
 *
 * The API key is sent in the `x-goog-api-key` header, not a `?key=` query
 * parameter, so it stops landing in proxy logs, CDN logs, and Referer headers.
 */

const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta';

/**
 * The complete set of model ids this application will ever send upstream,
 * mapped to their real upstream id. Anything not in this map is rejected with
 * `400 INVALID_MODEL`.
 *
 * The product-facing `gemini-3.5-lite` / `gemini-3.1-lite` labels are NorAI
 * product names; they resolve to the underlying upstream model.
 */
const MODEL_ALLOWLIST: Readonly<Record<string, string>> = Object.freeze({
  'gemini-3.5-lite': 'gemini-1.5-flash',
  'gemini-3.1-lite': 'gemini-1.5-flash',
  '3.5-lite': 'gemini-1.5-flash',
  'gemini-1.5-flash': 'gemini-1.5-flash',
  'gemini-1.5-pro': 'gemini-1.5-pro',
  'gemini-2.0-flash': 'gemini-2.0-flash',
  'gemini-2.5-flash': 'gemini-2.5-flash',
  'gemini-2.5-pro': 'gemini-2.5-pro',
});

/** Upstream id used when the client sends nothing and the env var is unusable. */
export const DEFAULT_UPSTREAM_MODEL = 'gemini-1.5-flash';

/**
 * Model ids that are safe to echo back to a client, so a UI can show which
 * model actually ran without the server disclosing arbitrary input.
 */
export const PUBLIC_MODEL_IDS = Object.freeze(Object.keys(MODEL_ALLOWLIST));

/** Frozen so a lookup table can never be mutated at runtime by a caller. */
export const GEMINI_MODEL_ALLOWLIST: Readonly<Record<string, string>> = MODEL_ALLOWLIST;

export function isAllowedModelId(id: unknown): id is string {
  return typeof id === 'string' && Object.hasOwn(MODEL_ALLOWLIST, id);
}

/**
 * Resolves a requested model id to its upstream id, or `null` when the id is
 * not on the allowlist. Case-insensitive on the product-facing labels so a
 * stored BYOK preference from an older build still resolves.
 */
export function resolveModelId(requested: unknown): string | null {
  if (typeof requested !== 'string') return null;
  const key = requested.trim().toLowerCase();
  if (!key || !Object.hasOwn(MODEL_ALLOWLIST, key)) return null;
  return MODEL_ALLOWLIST[key] ?? null;
}

/**
 * Resolves the model to use for a request. An explicit `preferredModel` from
 * the client must be on the allowlist; if it is not, we return `null` so the
 * caller can answer `400 INVALID_MODEL` rather than silently downgrading a
 * caller's explicit choice to something they did not ask for.
 */
export function resolveRequestedModel(preferredModel: unknown): string | null {
  if (preferredModel === undefined || preferredModel === null || preferredModel === '') {
    return resolveModelId(process.env.GEMINI_MODEL) ?? DEFAULT_UPSTREAM_MODEL;
  }
  return resolveModelId(preferredModel);
}

/**
 * Builds the upstream generateContent URL. The model id is taken from the
 * frozen allowlist, and is additionally encoded, so no caller-supplied
 * substring can influence the path or query string.
 */
export function buildGeminiEndpoint(upstreamModelId: string): string {
  if (!isKnownUpstreamId(upstreamModelId)) {
    throw new Error('Refusing to build endpoint for a model id outside the allowlist');
  }
  const url = new URL(`${GEMINI_API_BASE}/models/${encodeURIComponent(upstreamModelId)}:generateContent`);
  return url.toString();
}

const UPSTREAM_IDS: ReadonlySet<string> = new Set(Object.values(MODEL_ALLOWLIST));

function isKnownUpstreamId(id: string): boolean {
  return UPSTREAM_IDS.has(id);
}

/** Client-facing public label for an upstream id, safe to return in telemetry. */
export function publicModelLabel(upstreamModelId: string): string {
  return upstreamModelId;
}

/**
 * Maps an upstream failure to a client-safe error code and status. The upstream
 * response body is deliberately never propagated: it can echo the request, the
 * model id, quota details, or key material.
 */
export function mapUpstreamError(status: number): { code: string; message: string; httpStatus: number } {
  if (status === 400) {
    return {
      code: 'MODEL_REJECTED_REQUEST',
      message: 'The model rejected this request. Check the input and try again.',
      httpStatus: 400,
    };
  }
  if (status === 401 || status === 403) {
    return {
      code: 'INVALID_API_KEY',
      message: 'The Gemini API key was rejected. Check the key in your BYOK settings.',
      httpStatus: 401,
    };
  }
  if (status === 404) {
    return {
      code: 'MODEL_UNAVAILABLE',
      message: 'That model is not available for this API key. Try another model.',
      httpStatus: 400,
    };
  }
  if (status === 429) {
    return {
      code: 'UPSTREAM_RATE_LIMITED',
      message: 'The Gemini API is rate limiting this key. Wait a moment and retry.',
      httpStatus: 429,
    };
  }
  if (status >= 500) {
    return {
      code: 'MODEL_API_ERROR',
      message: 'The model service is temporarily unavailable. Please retry.',
      httpStatus: 502,
    };
  }
  return {
    code: 'MODEL_API_ERROR',
    message: 'The model request could not be completed. Please retry.',
    httpStatus: 502,
  };
}
