import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  path: '/terms',
  title: 'Terms of Service — NorAi Technologies',
  description:
    'Review the Terms of Service governing the use of NorAI micro-tools, API endpoints, and enterprise automation services.',
});

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
