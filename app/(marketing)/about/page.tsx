import React from 'react';
import { cn } from '@/lib/utils';
import { Container } from '@/components/foundation/Container';
import { Section } from '@/components/foundation/Section';
import { AnimatedSection, Reveal } from '@/components/foundation';
import NextLink from 'next/link';
import { ArrowRight } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  path: '/about',
  title: 'Our Story & Philosophy — NorAI Technologies',
  description:
    'Born in Uttar Pradesh. Building deterministic, single-purpose AI tools that save real operational hours for real teams.',
});

const VALUES = [
  {
    title: 'Privacy first by design',
    desc: 'Your documents are processed in transient RAM containers, delivered, and immediately forgotten. They never train anyone else\u2019s model \u2014 not even ours.',
  },
  {
    title: 'Small enough to care',
    desc: 'A five-person team that answers its own email, fixes its own bugs, and knows every customer by workflow, not ticket number.',
  },
  {
    title: 'Shipped weekly on rhythm',
    desc: 'Small deterministic tools released on a rhythm you can set a watch to. No roadmaps behind NDAs \u2014 just improvements you can use on Monday.',
  },
];

export default function AboutPage() {
  const aboutJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About NorAI Technologies',
    url: 'https://norai.in/about',
    mainEntity: {
      '@type': 'Organization',
      name: 'NorAI Technologies',
      url: 'https://norai.in',
      foundingLocation: {
        '@type': 'Place',
        name: 'Uttar Pradesh, India',
        addressRegion: 'Uttar Pradesh',
        addressCountry: 'India',
      },
    },
  };

  return (
    <div className="min-h-screen bg-canvas-base text-ink-primary font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />

      {/* Hero — clean canvas */}
      <Section className="pb-14 pt-16 md:pb-20 md:pt-24 border-b border-[rgba(13,37,61,0.08)]">
        <Container size="default">
          <Reveal>
            <h1 className="max-w-4xl font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal leading-[1.04] tracking-tight text-ink-primary">
              We&rsquo;re building from <br />
              <span className="italic text-accent-500 font-normal">Uttar Pradesh.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg md:text-xl leading-relaxed text-ink-body">
              World-class AI engineering doesn&rsquo;t only happen in San Francisco. It happens wherever someone refuses to accept broken workflows — including a small workshop in Uttar Pradesh, where ours started.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* Feature article body */}
      <Section className="py-16 md:py-24 border-b border-[rgba(13,37,61,0.08)]">
        <Container size="default">
          <div className="mx-auto max-w-[720px] space-y-6 text-[17px] leading-[1.8] text-ink-body">
            <p className="first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-[64px] first-letter:leading-[0.85] first-letter:text-accent-500">
              NorAI began with a frustration. Resumes arrived faster than anyone could read them — four hundred applications for one role, shortlisted by hand over weekends. Lecture notes dissolved into screenshots across three apps and were never found again. Community updates that mattered got buried under the noise of everything that didn&rsquo;t.
            </p>
            <p>
              None of these problems needed a moonshot. They needed someone to sit down and build the boring, obvious fix — and keep it running. So we did. The first tool was an AI resume shortlister built for our own hiring; it read documents and returned a scored, structured verdict in under a second. We shipped it, watched people rely on it, and never looked back.
            </p>
            <p>
              Since founding in early 2024, that approach has become a pattern: the Course Note-Taker that turns messy lectures into clean notes, the Community Chat Digest that reads a week of group chatter so you don&rsquo;t have to, Smart Government Job News that filters signal from noise. Each one is narrow, fast, and honest about what it does. Every pipeline returns verified, structured output — no vibes, just payloads you can build on.
            </p>

            {/* Pull-quote */}
            <figure className="my-14 border-y border-accent-500/20 py-10">
              <span aria-hidden="true" className="block font-display text-[88px] leading-none text-accent-500">
                &ldquo;
              </span>
              <blockquote className="-mt-8 font-display text-[28px] italic leading-snug text-ink-primary">
                Artificial intelligence shouldn&rsquo;t require complex enterprise contracts or bloated software. Every tool we release must save real hours for real people — quietly, every single week.
              </blockquote>
              <figcaption className="mt-5 font-sans text-xs font-mono text-ink-secondary">
                NorAI Engineering Creed · Uttar Pradesh
              </figcaption>
            </figure>

            <p>
              The industry pushes massive, general-purpose assistants that guess at everything. We made the opposite bet: tiny products with one job each, tuned until they feel invisible. A tool that saves a recruiter ten hours a week isn&rsquo;t a demo — it&rsquo;s infrastructure for someone&rsquo;s actual working life. Sub-second responses, predictable pricing, and outputs strict enough to automate against are the whole personality trait list.
            </p>
            <p>
              Restraint is the hard part. Every feature we&rsquo;ve cut made the remaining product easier to trust, and trust is the only thing a small workshop can sell.
            </p>

            <h2 className="pt-4 font-display text-[32px] leading-tight text-ink-primary">
              Why Uttar Pradesh is an advantage
            </h2>
            <p>
              Building from UP keeps us close to the users big labs forget: first-generation graduates managing hiring in spreadsheets, students stitching together study material from five apps, admins who need news before it trends. We feel these broken workflows in our own day — hunger plus empathy is a genuine technical edge, because you can&rsquo;t design a fix for a problem you&rsquo;ve never lived.
            </p>
            <p>
              The team reflects the same range: operational discipline from Sonu Singh&rsquo;s thirty years in strategic defense operations, AI/ML protocol architecture from Dhruw Singh, spatial computing research from Gourav Singh (Japan AR/VR Summit finalist), distributed backend engineering from Rishabh, and applied NLP pipelines from Annant. Small team, full stack, zero hand-offs.
            </p>
          </div>
        </Container>
      </Section>

      {/* Values Strip — Architectural Continuous Ledger */}
      <Section className="py-16 md:py-24 border-b border-[rgba(13,37,61,0.08)]">
        <Container size="default">
          <div className="max-w-2xl mb-12 text-left space-y-3">
            <h2 className="font-display text-4xl sm:text-5xl text-ink-primary font-normal">
              How we work &amp; what we guarantee.
            </h2>
          </div>

          <div className="border-t border-b border-[rgba(13,37,61,0.12)] divide-y md:divide-y-0 md:divide-x divide-[rgba(13,37,61,0.12)] grid grid-cols-1 md:grid-cols-3 py-6 text-left">
            {VALUES.map((val, idx) => (
              <div
                key={val.title}
                className={cn(
                  'py-6 md:py-8 space-y-3 flex flex-col justify-between',
                  idx === 0 ? 'pr-0 md:pr-8' : idx === 1 ? 'px-0 md:px-8' : 'pl-0 md:pl-8'
                )}
              >
                <div className="space-y-2">
                  <h3 className="font-display text-2xl text-ink-primary font-normal">
                    {val.title}
                  </h3>
                </div>
                <p className="text-sm text-ink-body leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Closing CTA */}
      <AnimatedSection className="py-20 md:py-28 bg-canvas-paper">
        <Container size="default">
          <div className="rounded-3xl bg-canvas-base border border-[rgba(13,37,61,0.12)] p-10 md:p-14 text-center space-y-6">
            <h2 className="mx-auto max-w-xl font-display text-4xl sm:text-5xl font-normal leading-tight text-ink-primary">
              Come see what a small team from UP can build.
            </h2>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <NextLink
                href="/team"
                className="text-sm font-semibold text-ink-primary hover:text-accent-500 transition-colors inline-flex items-center gap-1"
              >
                <span>Meet the team</span>
                <ArrowRight className="w-4 h-4" />
              </NextLink>
              <NextLink
                href="/contact"
                className="px-6 py-3 rounded-full bg-accent-500 text-white font-medium text-sm hover:bg-accent-600 transition-colors shadow-sm"
              >
                Say hello &rarr;
              </NextLink>
            </div>
          </div>
        </Container>
      </AnimatedSection>
    </div>
  );
}
