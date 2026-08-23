import React from 'react';
import { Container } from '@/components/foundation/Container';
import { Section } from '@/components/foundation/Section';
import { AnimatedSection, Reveal, StaggerGrid, StaggerItem } from '@/components/foundation';
import NextLink from 'next/link';
import { ArrowRight } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';
import { MonogramAvatar } from '@/components/illustrations/editorial';

export const metadata = buildMetadata({
  path: '/team',
  title: 'Founding Leadership & Technical Team — NorAI Technologies',
  description:
    'Meet the founding engineers and operational leadership driving NorAI Technologies from Uttar Pradesh, India.',
});

interface TeamMember {
  name: string;
  role: string;
  bio: string;
}

const FOUNDER: TeamMember = {
  name: 'Sonu Singh',
  role: 'Founder & AI engineer',
  bio: 'Represented NorAI at the Japan VR/AR Summit and came home convinced that spatial-grade craft belongs in everyday tools. Wrote the first resume shortlister that became NorAI, and still reviews every pipeline we ship.',
};

const TEAM: TeamMember[] = [
  {
    name: 'Dhruw Singh',
    role: 'Operations & discipline',
    bio: 'Retd. Indian Army, Corps of Signals — thirty years of keeping critical systems running. Makes sure we ship what we promise.',
  },
  {
    name: 'Gourav Singh',
    role: 'AI orchestration',
    bio: 'Builds the agents and state machines behind our pipelines — smart, verifiable, and boring in exactly the right ways.',
  },
  {
    name: 'Rishabh',
    role: 'Design & visualisation',
    bio: 'Draws the interfaces you barely notice, because good tools get out of the way of the work.',
  },
  {
    name: 'Annant',
    role: 'Growth & marketing',
    bio: 'Tells the story honestly — inbound pipelines, SEO, and the corporate relationships that keep the workshop busy.',
  },
];

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-canvas-base text-ink-primary">
      {/* Header */}
      <Section className="pb-12 pt-16 md:pb-16 md:pt-24">
        <Container size="default">
          <Reveal>
            <p className="font-display text-lg italic text-terra-600">The team</p>
            <h1 className="mt-4 max-w-3xl font-display text-[clamp(44px,6vw,60px)] leading-[1.05] tracking-[-0.01em] text-ink-primary">
              The people behind the tools.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-body">
              Five people, one workshop in Uttar Pradesh. We build every tool ourselves, answer
              our own email, and ship on a rhythm.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* Founder feature */}
      <Section className="py-8">
        <Container size="default">
          <AnimatedSection>
            <article className="grid overflow-hidden rounded-2xl border border-line-subtle bg-canvas-paper shadow-sm md:grid-cols-[280px_1fr]">
              <div className="flex items-center justify-center bg-canvas-recessed py-10 md:py-0">
                <MonogramAvatar name={FOUNDER.name} size="lg" />
              </div>
              <div className="flex flex-col justify-center gap-3 p-8 md:p-10">
                <h2 className="font-display text-[30px] leading-tight text-ink-primary">
                  {FOUNDER.name}
                </h2>
                <p className="font-sans text-[13px] text-terra-600">{FOUNDER.role}</p>
                <p className="mt-1 max-w-xl text-[15px] leading-relaxed text-ink-body">
                  {FOUNDER.bio}
                </p>
              </div>
            </article>
          </AnimatedSection>
        </Container>
      </Section>

      {/* Team grid */}
      <Section className="pb-16 pt-8 md:pb-20">
        <Container size="default">
          <StaggerGrid className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((member) => (
              <StaggerItem key={member.name}>
                <article className="h-full overflow-hidden rounded-2xl border border-line-subtle bg-canvas-paper shadow-sm transition-[border-color,box-shadow] duration-200 hover:border-line-default hover:shadow-md">
                  <div className="flex h-36 items-center justify-center bg-canvas-recessed">
                    <MonogramAvatar name={member.name} size="md" />
                  </div>
                  <div className="space-y-2 p-6">
                    <h3 className="font-sans text-lg font-semibold text-ink-primary">
                      {member.name}
                    </h3>
                    <p className="font-sans text-[13px] text-terra-600">{member.role}</p>
                    <p className="pt-1 text-sm leading-relaxed text-ink-body">{member.bio}</p>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </Container>
      </Section>

      {/* Hiring note */}
      <AnimatedSection className="pb-20 md:pb-28">
        <Container size="default">
          <div className="mx-auto max-w-2xl px-4 text-center sm:px-0">
            <h2 className="font-display text-[clamp(30px,4vw,40px)] leading-tight text-ink-primary">
              We hire for judgment, not pedigree.
            </h2>
            <p className="mt-4 text-[17px] leading-relaxed text-ink-body">
              Degrees don&rsquo;t build tools; taste and follow-through do. If you&rsquo;ve shipped
              something you&rsquo;re proud of, we&rsquo;d like to read it more than your CV.
            </p>
            <NextLink
              href="/careers"
              className="group mt-7 inline-flex items-center gap-2 font-sans text-[15px] font-medium text-terra-600 transition-colors duration-200 hover:text-terra-700"
            >
              See open roles
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </NextLink>
          </div>
        </Container>
      </AnimatedSection>
    </div>
  );
}
