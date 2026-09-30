import React from 'react';
import Link from 'next/link';
import { ErrorState } from '@/components/molecules/ErrorState';
import { Button } from '@/components/atoms/Button';

/**
 * Global 404 for URLs that match no route at all.
 *
 * Why this file exists instead of only `not-found.tsx`: Next.js returns a
 * 200 for a *streamed* `notFound()` response and only a 404 for a
 * non-streamed one. Because this site streams, every unknown URL — bogus
 * product slugs, bogus blog slugs, bogus legal slugs, and any unmatched path —
 * was answering HTTP 200 with 404 content, which reads as a valid page to
 * crawlers and to any monitoring.
 *
 * `global-not-found.tsx` is resolved at the routing level, before rendering a
 * segment, so it yields a genuine 404 status. `not-found.tsx` is kept as well
 * for `notFound()` calls raised from inside a known route.
 */
export default function GlobalNotFound() {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#060919] font-sans text-[#F4F6FC]">
        <div className="flex min-h-screen flex-col items-center justify-center px-6">
          <ErrorState
            variant="notFound"
            title="404 — Page Not Found"
            description="The page you requested could not be found or may have moved to another URL."
            primaryAction={
              <Link href="/">
                <Button variant="primary" size="md">
                  Go to Homepage
                </Button>
              </Link>
            }
            secondaryAction={
              <Link href="/products">
                <Button variant="secondary" size="md">
                  Explore Products
                </Button>
              </Link>
            }
          />
        </div>
      </body>
    </html>
  );
}
