import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import MarketingLayout from './(marketing)/layout';
import { ErrorState } from '@/components/molecules/ErrorState';
import { Button } from '@/components/atoms/Button';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: '404 — Page Not Found',
  description: 'The page you requested could not be found or may have moved to another URL.',
  noIndex: true,
});

export default function NotFound() {
  return (
    <MarketingLayout>
      <div className="py-20 flex items-center justify-center">
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
    </MarketingLayout>
  );
}
