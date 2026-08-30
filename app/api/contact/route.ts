import { NextResponse } from 'next/server';
import { submitContactForm } from '@/lib/services/contact';
import { checkRateLimit, getClientIp, getRateLimitHeaders } from '@/lib/security';

export async function POST(req: Request) {
  try {
    const clientIp = getClientIp(req);
    const rateLimitKey = `contact:${clientIp}`;

    // Stricter rate limit on contact submissions: 5 requests per 15 minutes
    const rateLimit = checkRateLimit(rateLimitKey, {
      maxRequests: 5,
      windowMs: 15 * 60 * 1000,
    });

    const headers = getRateLimitHeaders(rateLimit);

    if (!rateLimit.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Too many contact requests from your IP. Please try again later.',
        },
        {
          status: 429,
          headers,
        }
      );
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid JSON payload received.',
        },
        {
          status: 400,
          headers,
        }
      );
    }

    const result = await submitContactForm(body);

    if (!result.success) {
      return NextResponse.json(result, {
        status: result.errors ? 400 : 500,
        headers,
      });
    }

    return NextResponse.json(result, {
      status: 200,
      headers,
    });
  } catch (error) {
    // Prevent sensitive error leakage
    console.error('Unhandled contact route error:', error instanceof Error ? error.message : 'Unknown error');

    return NextResponse.json(
      {
        success: false,
        message: 'An unexpected error occurred while processing your request.',
      },
      {
        status: 500,
      }
    );
  }
}
