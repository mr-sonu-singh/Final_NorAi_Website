import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { Suspense } from 'react';

export const metadata: Metadata = buildMetadata({
  path: '/contact',
  title: 'Contact Us — NorAi Technologies',
  description:
    'Get in touch with the NorAi Technologies team for our self-serve micro-SaaS tools or custom AI development work.',
});

function ContactFallback() {
  return (
    <div className="min-h-screen bg-canvas-base" aria-hidden="true">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[11fr_9fr] lg:px-8">
        <div className="space-y-5">
          <div className="h-6 w-24 animate-pulse rounded-full bg-canvas-recessed" />
          <div className="h-12 w-full max-w-md animate-pulse rounded-lg bg-canvas-paper" />
          <div className="h-12 w-2/3 animate-pulse rounded-lg bg-canvas-paper" />
          <div className="h-4 w-full max-w-sm animate-pulse rounded bg-canvas-paper" />
          <div className="h-4 w-3/4 animate-pulse rounded bg-canvas-paper" />
          <div className="h-8 w-56 animate-pulse rounded-full bg-canvas-recessed" />
        </div>
        <div className="animate-pulse rounded-2xl border border-line-subtle bg-canvas-paper p-8 shadow-sm">
          <div className="space-y-5">
            <div className="h-5 w-40 rounded bg-canvas-recessed" />
            <div className="h-11 w-full rounded-md bg-canvas-base" />
            <div className="h-11 w-full rounded-md bg-canvas-base" />
            <div className="h-28 w-full rounded-md bg-canvas-base" />
            <div className="h-11 w-36 rounded-md bg-canvas-recessed" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<ContactFallback />}>{children}</Suspense>
  );
}
