import { NextResponse, type NextRequest } from 'next/server';

/**
 * Normalises legacy and mistyped paths before they reach the router.
 *
 * `next.config.ts` `redirects()` handles the explicit legacy routes; this
 * middleware covers the cases a static redirect table cannot express well —
 * trailing-slash variants, and casing — which otherwise render as a soft 404
 * with a 200 status. Both run before routing, so neither changes the response
 * for a canonical URL.
 */

/** Legacy or misspelled path -> canonical path. */
const CANONICAL_REWRITES: Record<string, string> = {
  '/index': '/',
  '/home': '/',
  '/capabilities': '/products',
  '/approach': '/services',
  '/deliverables': '/services',
  '/work': '/products',
  '/journal': '/blog',
  '/stories': '/blog',
  '/about-us': '/team',
  '/who-we-are': '/team',
  '/career': '/careers',
  '/jobs': '/careers',
  '/get-in-touch': '/contact',
  '/enquiry': '/contact',
  '/documentation': '/docs',
  '/legal': '/cookie-policy',
  '/cookies': '/cookie-policy',
  '/cookie': '/cookie-policy',
  '/privacy-notice': '/privacy-policy',
  '/tos': '/terms-of-service',
  '/terms-and-conditions': '/terms-of-service',
  '/mission-statement': '/mission',
  '/upskilling': '/mission',
};

/** Paths that must never be rewritten, only passed through. */
const PASSTHROUGH = [/^\/api\//, /^\/_next\//, /^\/feed\.xml$/, /^\/sitemap\.xml$/, /^\/robots\.txt$/];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (PASSTHROUGH.some((re) => re.test(pathname))) {
    return NextResponse.next();
  }

  // Strip a trailing slash so /team/ and /team are the same page, and so a
  // crawler is never handed two indexable URLs for one document.
  const withoutTrailing = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  const lower = withoutTrailing.toLowerCase();
  const target = CANONICAL_REWRITES[lower] ?? (lower !== withoutTrailing ? lower : null);

  if (target && target !== withoutTrailing) {
    return NextResponse.redirect(new URL(target, req.url), 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|icon.png|apple-icon.png|og.png).*)'],
};
