import { NextResponse } from 'next/server';
import { submitContactForm } from '@/lib/services/contact';
import {
  checkRateLimit,
  getClientIp,
  getRateLimitHeaders,
  readJsonBody,
  MAX_REQUEST_BODY_BYTES,
} from '@/lib/security';

/** Stricter than the tool routes: 5 submissions per 15 minutes per IP. */
const RATE_LIMIT = { maxRequests: 5, windowMs: 15 * 60 * 1000 } as const;

export async function POST(req: Request) {
  const clientIp = getClientIp(req);
  const rateLimit = checkRateLimit(`contact:${clientIp}`, RATE_LIMIT);
  const headers = getRateLimitHeaders(rateLimit);

  if (!rateLimit.success) {
    return NextResponse.json(
      { success: false, message: 'Too many contact requests from your IP. Please try again later.' },
      { status: 429, headers },
    );
  }

  const body = await readJsonBody(req, MAX_REQUEST_BODY_BYTES);
  if (!body.ok) {
    if (body.code === 'PAYLOAD_TOO_LARGE') {
      return NextResponse.json(
        { success: false, message: 'Request body is too large.' },
        { status: 413, headers },
      );
    }
    return NextResponse.json(
      { success: false, message: 'Invalid JSON payload received.' },
      { status: 400, headers },
    );
  }

  const result = await submitContactForm(body.value);

  if (result.success) {
    return NextResponse.json(result, { status: 200, headers });
  }

  // Validation is the caller's fault (400). A delivery failure is ours (503).
  // Never a 200 for a message that was not sent, and never a 500 that blames
  // the caller for our SMTP being down.
  const status = result.failureKind === 'validation' ? 400 : 503;

  return NextResponse.json(
    { success: false, message: result.message, ...(result.errors ? { errors: result.errors } : {}) },
    { status, headers },
  );
}
