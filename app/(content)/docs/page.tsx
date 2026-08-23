import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/foundation/Container';
import { Section } from '@/components/foundation/Section';
import { Reveal } from '@/components/foundation';
import { Link } from '@/components/atoms/Link';
import { buildMetadata } from '@/lib/seo';
import { ApiReferenceMatrix } from '@/components/organisms/ApiReferenceMatrix';

export const metadata: Metadata = buildMetadata({
  path: '/docs',
  title: 'Developer Documentation & API Reference — NorAi Technologies',
  description:
    'Comprehensive API reference, deterministic JSON schemas, and SDK integration guides for NorAi micro-SaaS utilities.',
});

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-canvas-base font-sans text-ink-primary">
      {/* Editorial Header */}
      <Section className="relative overflow-hidden border-b border-[rgba(13,37,61,0.08)] pb-12 pt-16 md:pt-24">
        <Container size="default" className="relative z-10">
          <div className="max-w-3xl space-y-4 text-left">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-accent-500 tracking-wider uppercase">
              <span>// DEVELOPER DOCUMENTATION · API SPEC V1</span>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-normal text-ink-primary leading-tight tracking-tight">
              Developer documentation <br />
              <span className="italic text-accent-500 font-normal">&amp; API contracts.</span>
            </h1>
            <p className="text-lg text-ink-body leading-relaxed max-w-2xl font-normal">
              Direct, deterministic REST endpoints for high-volume automated operations. Ephemeral RAM execution with sub-350ms response guarantees.
            </p>
          </div>
        </Container>
      </Section>

      {/* Interactive API Matrix */}
      <Section className="py-16 md:py-24 border-b border-[rgba(13,37,61,0.08)]">
        <Container size="default">
          <ApiReferenceMatrix />
        </Container>
      </Section>

      {/* Custom Scoping Footer */}
      <Section className="py-16 md:py-24 bg-canvas-paper">
        <Container size="default">
          <div className="max-w-2xl text-left space-y-4">
            <h2 className="font-display text-3xl sm:text-4xl text-ink-primary font-normal">
              Looking for dedicated VPC deployment or custom tool servers?
            </h2>
            <p className="text-base text-ink-body leading-relaxed">
              We build custom Model Context Protocol (MCP) servers and private VPC containers tailored directly to your engineering team&rsquo;s security requirements.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="font-semibold text-accent-500 hover:text-accent-600 inline-flex items-center gap-1 text-sm"
              >
                <span>Talk to our infrastructure team &rarr;</span>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
