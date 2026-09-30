import React from 'react';
import { notFound } from 'next/navigation';
import { buildMetadata } from '@/lib/seo';
import { LEGAL_POLICIES } from '@/lib/legal';
import { LegalTemplate } from '@/components/templates/LegalTemplate';

interface PageProps {
  params: Promise<{ policy: string }>;
}

function sectionId(slug: string, index: number, heading: string): string {
  const base = heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  return `${slug}-${index}-${base}`;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(LEGAL_POLICIES).map((policy) => ({ policy }));
}

export async function generateMetadata({ params }: PageProps) {
  const { policy: policySlug } = await params;
  const policy = LEGAL_POLICIES[policySlug];

  if (!policy) {
    return buildMetadata({
      title: '404 — Page Not Found',
      description: 'The requested legal policy document could not be found.',
      noIndex: true,
    });
  }

  return buildMetadata({
    title: `${policy.title} | NorAi Technologies`,
    description: policy.description,
    path: `/${policy.slug}`,
  });
}

export default async function LegalPolicyPage({ params }: PageProps) {
  const { policy: policySlug } = await params;
  const policy = LEGAL_POLICIES[policySlug];

  if (!policy) {
    notFound();
  }

  const sections = policy.sections.map((section, index) => ({
    id: sectionId(policy.slug, index, section.heading),
    title: section.heading,
    paragraphs: section.paragraphs,
  }));

  return (
    <LegalTemplate
      eyebrow="Legal & compliance"
      title={policy.title}
      lastUpdated={policy.lastUpdated}
      sections={sections}
      footer={
        <div className="space-y-3 rounded-xl border border-line-subtle bg-canvas-paper p-6 shadow-sm">
          <h2 className="font-display text-xl text-ink-primary">Questions about this document?</h2>
          <p className="text-sm leading-[1.75] text-ink-body">
            Write to us and a person will get back to you —{' '}
            <a
              href="mailto:noraitechnologies@gmail.com"
              className="font-semibold text-terra-600 underline underline-offset-4 transition-colors duration-200 hover:text-terra-700"
            >
              noraitechnologies@gmail.com
            </a>
            .
          </p>
        </div>
      }
    />
  );
}
