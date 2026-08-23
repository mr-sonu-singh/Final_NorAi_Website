import React from 'react';
import { Container } from '@/components/foundation/Container';
import { Section } from '@/components/foundation/Section';
import { AnimatedSection, Reveal } from '@/components/foundation';
import NextLink from 'next/link';
import { ArrowRight } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';
import { WorkshopRoster } from '@/components/organisms';

export const metadata = buildMetadata({
  path: '/team',
  title: 'Founding Leadership & Technical Team — NorAI Technologies',
  description:
    'Meet the founding engineers and operational leadership driving NorAI Technologies from Uttar Pradesh, India.',
});

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-canvas-base text-ink-primary font-sans">
      {/* Editorial Header */}
      <Section className="pb-14 pt-16 md:pb-20 md:pt-24 border-b border-[rgba(13,37,61,0.08)]">
        <Container size="default">
          <Reveal>
            <h1 className="max-w-4xl font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal leading-[1.04] tracking-tight text-ink-primary">
              The people behind <br />
              <span className="italic text-accent-500 font-normal">the tools.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg md:text-xl leading-relaxed text-ink-body">
              Five engineers, one workshop in Uttar Pradesh. We build every tool ourselves, answer our own email, and ship on a rhythm.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* Workshop Roster (Magazine Style) */}
      <Section className="py-16 md:py-24 border-b border-[rgba(13,37,61,0.08)]">
        <Container size="default">
          <WorkshopRoster />
        </Container>
      </Section>

      {/* Hiring Philosophy */}
      <AnimatedSection className="py-20 md:py-28 bg-canvas-paper">
        <Container size="default">
          <div className="mx-auto max-w-2xl text-center space-y-6">
            <h2 className="font-display text-4xl sm:text-5xl font-normal text-ink-primary leading-tight">
              We hire for judgment, not pedigree.
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-ink-body">
              Degrees don&rsquo;t build deterministic tools; taste, operational discipline, and follow-through do. If you&rsquo;ve shipped something you&rsquo;re proud of, we&rsquo;d like to read your code more than your CV.
            </p>
            <div className="pt-2">
              <NextLink
                href="/careers"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-accent-500 hover:text-accent-600 transition-colors"
              >
                <span>See open roles at the workshop</span>
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </NextLink>
            </div>
          </div>
        </Container>
      </AnimatedSection>
    </div>
  );
}
