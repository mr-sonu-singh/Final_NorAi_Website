import React from 'react';
import { Container } from '@/components/foundation/Container';
import { Section } from '@/components/foundation/Section';
import { AnimatedSection, Reveal, StaggerGrid, StaggerItem } from '@/components/foundation';
import NextLink from 'next/link';
import { ArrowRight, Hammer, HeartHandshake, ShieldCheck } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  path: '/about',
  title: 'About Us & Regional AI Engineering Hub — NorAI Technologies',
  description:
    'Operating out of Uttar Pradesh, India, NorAI Technologies builds accessible, modular AI infrastructure and high-frequency micro-SaaS utilities.',
});

const VALUES = [
  {
    title: 'Privacy first',
    desc: 'Your documents are processed, delivered, and forgotten. They never train anyone else\u2019s model — not even ours.',
    icon: ShieldCheck,
    accentClasses: 'text-sage-700',
    barClass: 'bg-sage-500',
  },
  {
    title: 'Small enough to care',
    desc: 'A five-person team that answers its own email, fixes its own bugs, and knows every customer by workflow, not ticket number.',
    icon: HeartHandshake,
    accentClasses: 'text-gold-600',
    barClass: 'bg-gold-500',
  },
  {
    title: 'Shipped weekly',
    desc: 'Small tools released on a rhythm you can set a watch to. No roadmaps behind NDAs — just improvements you can use on Monday.',
    icon: Hammer,
    accentClasses: 'text-terra-600',
    barClass: 'bg-terra-500',
  },
];

const OFFSET_CLASSES = ['md:translate-y-0', 'md:translate-y-6', 'md:translate-y-12'];

export default function AboutPage() {
  const aboutJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About NorAI Technologies',
    description: 'Engineering accessible, modular AI infrastructure and micro-SaaS utilities.',
    publisher: {
      '@type': 'Organization',
      name: 'NorAI Technologies Pvt. Ltd.',
      url: 'https://norai-c8yy.onrender.com',
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'Uttar Pradesh',
        addressCountry: 'India',
      },
    },
  };

  return (
    <div className="min-h-screen bg-canvas-base text-ink-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />

      {/* Hero — clean canvas, no effects */}
      <Section className="pb-14 pt-16 md:pb-20 md:pt-24">
        <Container size="default">
          <Reveal>
            <p className="font-display text-lg italic text-terra-600">Our story</p>
            <h1 className="mt-4 max-w-3xl font-display text-[clamp(56px,7vw,64px)] leading-[1.04] tracking-[-0.01em] text-ink-primary">
              We&rsquo;re building from Uttar Pradesh.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-body">
              World-class AI work doesn&rsquo;t only happen in San Francisco. It happens wherever
              someone refuses to accept broken workflows — including a small workshop in Uttar
              Pradesh, where ours started.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* Feature article body */}
      <Section className="pb-8 pt-0">
        <Container size="default">
          <div className="mx-auto max-w-[700px] space-y-6 text-[17px] leading-[1.8] text-ink-body">
            <p className="first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-[64px] first-letter:leading-[0.85] first-letter:text-terra-500">
              NorAI began with a frustration. Resumes arrived faster than anyone could read them —
              four hundred applications for one role, shortlisted by hand, over weekends. Lecture
              notes dissolved into screenshots across three apps and were never found again.
              Community updates that mattered got buried under the noise of everything that didn&rsquo;t.
            </p>
            <p>
              None of these problems needed a moonshot. They needed someone to sit down and build
              the boring, obvious fix — and keep it running. So we did. The first tool was an AI
              resume shortlister built for our own hiring; it read documents and returned a scored,
              structured verdict in under a second. We shipped it, watched people rely on it, and
              never looked back.
            </p>
            <p>
              Since founding in early 2024, that approach has become a pattern: the Course
              Note-Taker that turns messy lectures into clean notes, the Community Chat Digest that
              reads a week of group chatter so you don&rsquo;t have to, Smart Government Job News
              that filters signal from noise. Each one is narrow, fast, and honest about what it
              does. Every pipeline returns verified, structured output — no vibes, just payloads
              you can build on.
            </p>

            {/* Pull-quote */}
            <figure className="my-14 border-y border-sage-300/50 py-10">
              <span aria-hidden="true" className="block font-display text-[88px] leading-none text-terra-500">
                &ldquo;
              </span>
              <blockquote className="-mt-8 font-display text-[28px] italic leading-snug text-ink-primary">
                Artificial intelligence shouldn&rsquo;t require complex enterprise contracts or
                bloated software. Every tool we release must save real hours for real people —
                quietly, every single week.
              </blockquote>
              <figcaption className="mt-5 font-sans text-sm text-ink-secondary">
                — The NorAI founding team
              </figcaption>
            </figure>

            <h2 className="pt-4 font-display text-[32px] leading-tight text-ink-primary">
              Why micro-tools beat moonshots
            </h2>
            <p>
              The industry loves demos that promise everything and ship nothing. We chose the
              opposite bet: tiny products with one job each, tuned until they feel invisible. A
              tool that saves a recruiter ten hours a week isn&rsquo;t a demo — it&rsquo;s
              infrastructure for someone&rsquo;s actual working life. Sub-second responses,
              predictable pricing, and outputs strict enough to automate against are the whole
              personality trait list.
            </p>
            <p>
              Restraint is the hard part. Every feature we&rsquo;ve cut made the remaining product
              easier to trust, and trust is the only thing a small workshop can sell.
            </p>

            <h2 className="pt-4 font-display text-[32px] leading-tight text-ink-primary">
              Why Uttar Pradesh is an advantage
            </h2>
            <p>
              Building from UP keeps us close to the users big labs forget: first-generation
              graduates managing hiring in spreadsheets, students stitching together study material
              from five apps, admins who need news before it trends. We feel these broken workflows
              in our own day — hunger plus empathy is a genuine technical edge, because you can&rsquo;t
              design a fix for a problem you&rsquo;ve never lived.
            </p>
            <p>
              The team reflects the same range: operational discipline from Dhruw Singh&rsquo;s
              thirty years in the Indian Army&rsquo;s Corps of Signals, spatial-computing chops
              from Sonu Singh&rsquo;s work shown at the Japan VR/AR Summit, orchestration
              engineering from Gourav Singh, design from Rishabh, and growth from Annant. Small
              team, full stack, zero hand-offs.
            </p>

            <h2 className="pt-4 font-display text-[32px] leading-tight text-ink-primary">
              Where this is going
            </h2>
            <p>
              More micro-tools, shipped weekly. Deeper pipelines for the teams whose workflows we
              already understand. And the same promise as day one: if a NorAI tool can&rsquo;t save
              you real hours, we haven&rsquo;t finished building it. The location on the letterhead
              says Uttar Pradesh. The ambition has never checked a map.
            </p>
          </div>
        </Container>
      </Section>

      {/* Values strip — offset paper cards */}
      <Section className="py-16 md:py-24">
        <Container size="default">
          <StaggerGrid className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {VALUES.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <StaggerItem key={value.title} className={OFFSET_CLASSES[index]}>
                  <article className="flex h-full flex-col gap-4 rounded-2xl border border-line-subtle bg-canvas-paper p-7 shadow-sm">
                    <span aria-hidden="true" className={`h-1.5 w-12 rounded-full ${value.barClass}`} />
                    <IconComponent className={`h-5 w-5 ${value.accentClasses}`} aria-hidden="true" />
                    <h3 className="font-display text-[24px] text-ink-primary">{value.title}</h3>
                    <p className="text-[15px] leading-relaxed text-ink-body">{value.desc}</p>
                  </article>
                </StaggerItem>
              );
            })}
          </StaggerGrid>
        </Container>
      </Section>

      {/* Quiet closing band */}
      <AnimatedSection className="pb-20 md:pb-28">
        <Container size="default">
          <div className="rounded-2xl bg-canvas-recessed px-6 py-14 text-center md:py-16">
            <h2 className="mx-auto max-w-xl font-display text-[clamp(30px,4vw,40px)] leading-tight text-ink-primary">
              Come see what a small team from UP can do.
            </h2>
            <div className="mt-8 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-8">
              <NextLink
                href="/team"
                className="inline-flex items-center gap-1.5 font-sans text-[15px] font-medium text-ink-body underline decoration-line-strong underline-offset-4 transition-colors duration-200 hover:text-ink-primary"
              >
                Meet the people behind NorAI
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </NextLink>
              <NextLink
                href="/contact"
                className="inline-flex items-center rounded-full bg-terra-500 px-6 py-3 font-sans text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-terra-600"
              >
                Say hello
              </NextLink>
            </div>
          </div>
        </Container>
      </AnimatedSection>
    </div>
  );
}
