/**
 * In-Memory Sliding Window Rate Limiter
 * Provides IP-based and key-based rate limiting to prevent abuse and denial-of-service.
 */

export interface RateLimitOptions {
  /** Maximum number of allowed requests within the time window. Default: 5 */
  maxRequests?: number;
  /** Window duration in milliseconds. Default: 15 minutes (900_000 ms) */
  windowMs?: number;
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
  retryAfterSeconds: number;
}

interface RateLimitRecord {
  timestamps: number[];
  lastSeen: number;
}

// In-memory store for tracking request timestamps
const rateLimitStore = new Map<string, RateLimitRecord>();

// Clean up stale entries every 5 minutes to prevent memory leaks
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;
let lastPruned = Date.now();

function pruneStaleRecords(maxAgeMs: number = 30 * 60 * 1000) {
  const now = Date.now();
  if (now - lastPruned < CLEANUP_INTERVAL_MS) return;

  lastPruned = now;
  for (const [key, record] of rateLimitStore.entries()) {
    if (now - record.lastSeen > maxAgeMs) {
      rateLimitStore.delete(key);
    }
  }
}

/**
 * Checks and records a request against the rate limit window.
 */
export function checkRateLimit(
  key: string,
  options: RateLimitOptions = {}
): RateLimitResult {
  const maxRequests = options.maxRequests ?? 5;
  const windowMs = options.windowMs ?? 15 * 60 * 1000;
  const now = Date.now();
  const windowStart = now - windowMs;

  pruneStaleRecords(windowMs * 2);

  let record = rateLimitStore.get(key);
  if (!record) {
    record = { timestamps: [], lastSeen: now };
    rateLimitStore.set(key, record);
  }

  record.lastSeen = now;

  // Filter out timestamps outside the active sliding window
  record.timestamps = record.timestamps.filter((ts) => ts > windowStart);

  const requestCount = record.timestamps.length;
  const isAllowed = requestCount < maxRequests;

  if (isAllowed) {
    record.timestamps.push(now);
  }

  const remaining = Math.max(0, maxRequests - record.timestamps.length);
  const oldestTimestamp = record.timestamps[0] ?? now;
  const reset = oldestTimestamp + windowMs;
  const retryAfterSeconds = isAllowed
    ? 0
    : Math.max(1, Math.ceil((reset - now) / 1000));

  return {
    success: isAllowed,
    limit: maxRequests,
    remaining,
    reset,
    retryAfterSeconds,
  };
}

/**
 * Resolves the client IP address from standard request headers.
 */
export function getClientIp(headers: Headers | Request): string {
  const reqHeaders = headers instanceof Request ? headers.headers : headers;

  const forwardedFor = reqHeaders.get('x-forwarded-for');
  if (forwardedFor) {
    const firstIp = forwardedFor.split(',')[0]?.trim();
    if (firstIp) return firstIp;
  }

  const realIp = reqHeaders.get('x-real-ip');
  if (realIp) return realIp.trim();

  const cfConnectingIp = reqHeaders.get('cf-connecting-ip');
  if (cfConnectingIp) return cfConnectingIp.trim();

  const trueClientIp = reqHeaders.get('true-client-ip');
  if (trueClientIp) return trueClientIp.trim();

  return '127.0.0.1';
}

/**
 * Returns standard HTTP rate-limiting headers for API responses.
 */
export function getRateLimitHeaders(result: RateLimitResult): Record<string, string> {
  return {
    'X-RateLimit-Limit': String(result.limit),
    'X-RateLimit-Remaining': String(result.remaining),
    'X-RateLimit-Reset': String(Math.ceil(result.reset / 1000)),
    ...(result.success ? {} : { 'Retry-After': String(result.retryAfterSeconds) }),
  };
}
