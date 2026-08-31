import React from 'react';
import Image from 'next/image';
import NextLink from 'next/link';
import { Container } from '@/components/foundation/Container';
import { Section } from '@/components/foundation/Section';
import { Heading } from '@/components/foundation/Heading';
import { Text } from '@/components/foundation/Text';
import {
  AnimatedSection,
  Reveal,
  StaggerGrid,
  StaggerItem,
  TextReveal,
  CountUp,
  DrawLine,
} from '@/components/foundation';
import {
  ArrowRight,
  Sparkles,
  Users,
  School,
  Landmark,
  ShieldCheck,
  Zap,
  Code2,
  HeartHandshake,
  CheckCircle2,
} from 'lucide-react';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  path: '/about',
  title: 'Our Story, Vision & Regional Mission',
  description:
    'Born in Uttar Pradesh. Building deterministic, single-purpose AI tools and empowering regional youth through the NorAI Skill Mission.',
});

const IMPACT_STATS = [
  {
    value: 500,
    suffix: '+',
    label: 'Participants Mentored',
    detail: 'Across regional colleges & rural youth cohorts in UP',
  },
  {
    value: 75,
    suffix: '',
    label: 'UP Districts Vision',
    detail: 'Statewide enablement roadmap with public partners',
  },
  {
    value: 0,
    prefix: '₹',
    label: 'Cost to Students',
    detail: '100% free vernacular literacy & coding masterclasses',
  },
  {
    value: 100,
    suffix: '%',
    label: 'Deterministic Utility',
    detail: 'Zero hallucinations, verified JSON schemas on all tools',
  },
];

const SKILL_MISSION_TIERS = [
  {
    icon: Users,
    badge: 'Tier 1 Inclusion',
    title: 'Rural & Senior AI Literacy',
    description:
      'We bring ChatGPT, Gemini, and Hindi voice interfaces to rural citizens and village elders—demystifying technology for public welfare, crop advisory, and digital fraud prevention.',
    metric: '100% Free Vernacular Sessions',
  },
  {
    icon: School,
    badge: 'Tier 2 Foundations',
    title: 'Youth & Academic Enablement',
    description:
      'Students learn to turn AI into a personal tutor for STEM, convert chaotic lecture notes into structured flashcards with Course Note-Taker, and build solid coding fundamentals.',
    metric: 'Free Scholar Tier Access',
  },
  {
    icon: Landmark,
    badge: 'Tier 3 Engineering',
    title: 'Advanced Builder Masterclasses',
    description:
      'For ambitious collegiate engineers: Model Context Protocol (MCP) servers, local open-weight inference (vLLM), vector databases, and production Next.js micro-SaaS deployments.',
    metric: 'Direct Founder Mentorship',
  },
];

const VALUES = [
  {
    title: 'Privacy first by design',
    tagline: 'Ephemeral RAM isolation · Zero training on user data',
    desc: 'Your documents are processed in transient memory containers, delivered, and immediately forgotten. They never train public models, and they never train ours. Speed and security are engineered together.',
    icon: ShieldCheck,
  },
  {
    title: 'Small enough to care',
    tagline: 'Founders write the code · Engineers answer the email',
    desc: 'We are a focused team of builders who talk directly to our users. No ticket queues, no automated deflection scripts. When you suggest an improvement or report an edge case, the person fixing it is the person who designed it.',
    icon: HeartHandshake,
  },
  {
    title: 'Shipped weekly on rhythm',
    tagline: 'Continuous delivery · Real utility every Monday',
    desc: 'Small, deterministic utilities released on a steady rhythm. No vaporware or pitch decks behind NDAs—just reliable, sub-second tools you can use in your daily workflow starting tomorrow.',
    icon: Zap,
  },
  {
    title: 'Radical hardware honesty',
    tagline: 'Exposed telemetry · Typed Zod schemas · No black boxes',
    desc: 'Every tool visibly displays its execution mechanics: latency in milliseconds, token counts, and inspectable payload schemas. We believe in software that explains itself honestly.',
    icon: Code2,
  },
];

export default function AboutPage() {
  const aboutJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About NorAI Technologies',
    url: 'https://norai.asia/about',
    mainEntity: {
      '@type': 'Organization',
      name: 'NorAI Technologies',
      url: 'https://norai.asia',
      foundingLocation: {
        '@type': 'Place',
        name: 'Uttar Pradesh, India',
        addressRegion: 'Uttar Pradesh',
        addressCountry: 'India',
      },
    },
  };

  return (
    <div className="min-h-screen bg-canvas-base text-ink-primary font-sans selection:bg-accent-500 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />

      {/* SECTION 1: HERO WITH TEXT REVEAL & STUDIO PHOTOGRAPHY */}
      <Section className="pt-16 pb-14 md:pt-24 md:pb-20 border-b border-[rgba(13,37,61,0.08)] relative overflow-hidden">
        {/* Archival paper top gradient */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-canvas-paper/70 to-transparent"
        />

        <Container size="default" className="relative z-10">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-terra-50 border border-terra-500/20 text-terra-600 text-xs font-mono font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Our Story & Engineering Philosophy</span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal leading-[1.04] tracking-display text-ink-primary">
              <TextReveal text="We're building from" as="span" /> <br />
              <span className="italic text-terra-500 font-normal">Uttar Pradesh.</span>
            </h1>

            <Reveal delay={0.2}>
              <p className="max-w-2xl fluid-lead leading-relaxed text-ink-body text-pretty font-normal">
                World-class AI engineering doesn&rsquo;t only happen in Silicon Valley. It happens
                wherever someone refuses to accept broken workflows—including a small studio in
                Uttar Pradesh, where our tools and missions were born.
              </p>
            </Reveal>
          </div>

          {/* Hero Studio Photography Frame */}
          <Reveal delay={0.3} className="mt-12 md:mt-16">
            <figure className="relative overflow-hidden rounded-2xl border border-[rgba(13,37,61,0.12)] bg-canvas-paper shadow-sm">
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-canvas-recessed">
                <Image
                  src="/images/about/team-hero.jpg"
                  alt="NorAI engineering team collaborating in their Uttar Pradesh studio workspace"
                  fill
                  priority
                  className="object-cover transition-transform duration-700 hover:scale-[1.01]"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              </div>
              <figcaption className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-t border-[rgba(13,37,61,0.08)] bg-canvas-paper/90 px-5 py-3 text-xs font-mono text-ink-secondary">
                <span>NorAI Engineering Studio · Uttar Pradesh, India</span>
                <span className="text-terra-600 font-medium">Ground Truth & Everyday Problem Solving</span>
              </figcaption>
            </figure>
          </Reveal>
        </Container>
      </Section>

      {/* SECTION 2: ORIGIN STORY & CRAFT (SPLIT NARRATIVE + IMAGE) */}
      <Section className="py-16 md:py-24 border-b border-[rgba(13,37,61,0.08)] bg-canvas-base">
        <Container size="default">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
            {/* Left: Origin Narrative */}
            <Reveal className="space-y-6 lg:col-span-7">
              <div className="space-y-3">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-terra-600">
                  The Genesis
                </span>
                <Heading as="h2" variant="display-lg" className="text-ink-primary font-normal">
                  Born from real operational friction.
                </Heading>
              </div>

              <div className="space-y-5 text-[16px] md:text-[17px] leading-[1.8] text-ink-body">
                <p className="first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-[58px] first-letter:leading-[0.85] first-letter:text-terra-500">
                  NorAI began with a simple frustration. Resumes arrived faster than anyone could
                  read them—four hundred applicants for a single position, shortlisted by hand over
                  long weekends. Lecture recordings dissolved into chaotic screenshots across three
                  apps and were never found again.
                </p>
                <p>
                  None of these bottlenecks required a trillion-parameter general assistant. They
                  needed someone to sit down and build the <em>focused, deterministic fix</em>—and
                  keep it running with sub-second speed and zero hallucination.
                </p>
                <p>
                  The first tool was our <strong>AI Resume Shortlister</strong>, engineered for our
                  own hiring. It read candidate documents and returned a structured, verified verdict
                  in under 350 milliseconds. We shipped it, watched teams rely on it daily, and
                  doubled down on single-purpose utility.
                </p>
              </div>
            </Reveal>

            {/* Right: Candid Workshop Craft Photo */}
            <Reveal delay={0.2} className="lg:col-span-5">
              <figure className="overflow-hidden rounded-2xl border border-[rgba(13,37,61,0.12)] bg-canvas-paper shadow-sm">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-canvas-recessed">
                  <Image
                    src="/images/about/origin-craft.jpg"
                    alt="NorAI engineers sketching architecture and reviewing code on an engineering desk"
                    fill
                    loading="eager"
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 500px"
                  />
                </div>
                <figcaption className="border-t border-[rgba(13,37,61,0.08)] bg-canvas-paper/90 px-4 py-2.5 text-xs font-mono text-ink-secondary">
                  Architectural Rigor · Notebooks, Code, and Clear Schemas
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* SECTION 3: CINEMATIC PULL-QUOTE & CREED */}
      <Section className="py-16 md:py-24 bg-canvas-paper border-b border-[rgba(13,37,61,0.08)]">
        <Container size="default">
          <div className="mx-auto max-w-4xl text-center space-y-8">
            <Reveal>
              <div className="w-12 h-12 rounded-full bg-terra-50 border border-terra-500/20 text-terra-500 flex items-center justify-center mx-auto">
                <span className="font-display text-3xl italic">&ldquo;</span>
              </div>
            </Reveal>

            <blockquote className="font-display text-3xl sm:text-4xl md:text-5xl font-normal italic leading-snug text-ink-primary text-balance">
              Artificial intelligence shouldn&rsquo;t require complex enterprise contracts or bloated
              software. Every tool we release must save real hours for real people—quietly, every
              single week.
            </blockquote>

            <div className="space-y-4 pt-2">
              <DrawLine className="mx-auto max-w-xs text-terra-500/30" />
              <p className="font-mono text-xs uppercase tracking-widest text-ink-secondary">
                NorAI Engineering Creed · Uttar Pradesh, India
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* SECTION 4: THE UP ADVANTAGE & TELEMETRY STATS */}
      <Section className="py-16 md:py-24 border-b border-[rgba(13,37,61,0.08)] bg-canvas-base">
        <Container size="default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <Reveal className="lg:col-span-5 space-y-4">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-sage-700">
                Grounded Perspective
              </span>
              <Heading as="h2" variant="display-lg" className="text-ink-primary font-normal">
                Why Uttar Pradesh is our greatest advantage.
              </Heading>
              <p className="text-[16px] leading-relaxed text-ink-body">
                Building from Uttar Pradesh keeps us grounded in the workflows that corporate tech
                hubs overlook: first-generation students piecing together lecture materials, small
                teams buried in hiring spreadsheets, and citizens navigating regional notifications.
              </p>
              <p className="text-[16px] leading-relaxed text-ink-body">
                Hunger combined with empathy is a genuine technical edge—because you cannot design an
                intuitive solution for a pain point you have never lived.
              </p>
            </Reveal>

            {/* Right: Live Telemetry Impact Grid */}
            <div className="lg:col-span-7">
              <StaggerGrid
                stagger={0.12}
                className="grid grid-cols-1 sm:grid-cols-2 gap-5"
              >
                {IMPACT_STATS.map((stat) => (
                  <StaggerItem key={stat.label}>
                    <div className="rounded-2xl border border-[rgba(13,37,61,0.10)] bg-canvas-paper p-6 space-y-2.5 shadow-sm hover:border-terra-500/30 transition-colors">
                      <div className="font-display text-4xl sm:text-5xl font-normal text-ink-primary flex items-baseline gap-0.5">
                        <CountUp
                          value={stat.value}
                          prefix={stat.prefix}
                          suffix={stat.suffix}
                          duration={1.8}
                          className="font-display text-4xl sm:text-5xl font-normal text-ink-primary"
                        />
                      </div>
                      <h3 className="font-sans text-sm font-semibold text-ink-primary">
                        {stat.label}
                      </h3>
                      <p className="text-xs text-ink-body leading-relaxed">
                        {stat.detail}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerGrid>
            </div>
          </div>
        </Container>
      </Section>

      {/* SECTION 5: AI SKILL MISSION — EMOTIONAL CENTERPIECE */}
      <Section className="py-16 md:py-24 bg-canvas-paper border-b border-[rgba(13,37,61,0.08)]">
        <Container size="default">
          <div className="space-y-12">
            {/* Section Header */}
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ochre-50 border border-ochre-500/20 text-ochre-700 text-xs font-mono font-semibold">
                <School className="w-3.5 h-3.5" />
                <span>Grassroots Education & Youth Upliftment</span>
              </div>

              <Heading as="h2" variant="display-lg" className="text-ink-primary font-normal">
                We don&rsquo;t just build software. We teach.
              </Heading>

              <Text variant="body-lg" as="p" className="text-ink-body leading-relaxed font-normal">
                True regional empowerment isn&rsquo;t about selling software—it is about sharing
                knowledge. Through the <strong>NorAI Skill Mission</strong>, we take hands-on, zero-cost
                AI literacy and engineering masterclasses directly to regional classrooms, polytechnics,
                and village clusters across Uttar Pradesh.
              </Text>
            </div>

            {/* Campus Classroom Documentary Photo */}
            <Reveal>
              <figure className="overflow-hidden rounded-2xl border border-[rgba(13,37,61,0.12)] bg-canvas-base shadow-sm">
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-canvas-recessed">
                  <Image
                    src="/images/about/skill-mission.jpg"
                    alt="Hands-on AI coding and engineering workshop in a regional Indian college classroom"
                    fill
                    loading="eager"
                    className="object-cover"
                    sizes="(max-width: 1200px) 100vw, 1200px"
                  />
                </div>
                <figcaption className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-t border-[rgba(13,37,61,0.08)] bg-canvas-paper/90 px-5 py-3 text-xs font-mono text-ink-secondary">
                  <span>Hands-on AI Engineering Masterclass · Regional College Cohort, UP</span>
                  <span className="text-sage-700 font-medium">Democratizing Engineering Beyond Metros</span>
                </figcaption>
              </figure>
            </Reveal>

            {/* 3 Distilled Mission Tiers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              {SKILL_MISSION_TIERS.map((tier) => {
                const Icon = tier.icon;
                return (
                  <div
                    key={tier.title}
                    className="rounded-2xl bg-canvas-base border border-[rgba(13,37,61,0.12)] p-7 shadow-sm flex flex-col justify-between space-y-6 hover:border-terra-500/30 transition-colors"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded bg-canvas-recessed text-ink-primary border border-line-subtle">
                          {tier.badge}
                        </span>
                        <Icon className="w-5 h-5 text-terra-500" />
                      </div>

                      <div className="space-y-1">
                        <h3 className="font-display text-2xl text-ink-primary font-normal">
                          {tier.title}
                        </h3>
                      </div>

                      <p className="text-sm text-ink-body leading-relaxed">
                        {tier.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[rgba(13,37,61,0.08)] flex items-center justify-between text-xs font-mono text-sage-800 font-semibold">
                      <span>{tier.metric}</span>
                      <CheckCircle2 className="w-4 h-4 text-sage-600" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Link to Full Mission Page */}
            <div className="pt-2 flex items-center justify-between flex-wrap gap-4 border-t border-[rgba(13,37,61,0.08)]">
              <p className="text-sm text-ink-body">
                Explore our full workshop syllabus, rural adaptation matrix, and government roadmap.
              </p>
              <NextLink
                href="/mission"
                className="inline-flex items-center gap-2 rounded-lg bg-canvas-base border border-line-default px-4 py-2.5 font-sans text-xs font-semibold text-ink-primary hover:text-terra-600 hover:border-terra-500 transition-all shadow-sm group"
              >
                <span>Explore the Full AI Skill Mission</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </NextLink>
            </div>
          </div>
        </Container>
      </Section>

      {/* SECTION 6: HOW WE WORK (ARCHITECTURAL VALUES LEDGER) */}
      <Section className="py-16 md:py-24 border-b border-[rgba(13,37,61,0.08)] bg-canvas-base">
        <Container size="default">
          <div className="max-w-2xl mb-14 space-y-3">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-secondary">
              Core Principles
            </span>
            <Heading as="h2" variant="display-lg" className="text-ink-primary font-normal">
              How we work &amp; what we stand for.
            </Heading>
            <p className="text-base text-ink-body">
              The four foundational commitments behind every line of code we ship.
            </p>
          </div>

          <div className="divide-y divide-[rgba(13,37,61,0.10)] border-y border-[rgba(13,37,61,0.10)]">
            {VALUES.map((val, idx) => {
              const Icon = val.icon;
              return (
                <Reveal
                  key={val.title}
                  delay={idx * 0.1}
                  className="py-8 md:py-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-start hover:bg-canvas-paper/40 transition-colors px-2 md:px-4 rounded-lg"
                >
                  <div className="md:col-span-5 space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-terra-50 border border-terra-500/20 text-terra-600 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="font-display text-2xl md:text-3xl text-ink-primary font-normal">
                        {val.title}
                      </h3>
                    </div>
                    <p className="font-mono text-xs text-terra-600 md:pl-11">
                      {val.tagline}
                    </p>
                  </div>

                  <div className="md:col-span-7 md:pt-1">
                    <p className="text-sm md:text-[15px] text-ink-body leading-relaxed">
                      {val.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* SECTION 7: CLOSING CALL TO ACTION */}
      <AnimatedSection className="py-20 md:py-28 bg-canvas-paper">
        <Container size="default">
          <div className="rounded-3xl bg-canvas-base border border-[rgba(13,37,61,0.12)] p-10 md:p-16 text-center space-y-6 shadow-sm">
            <h2 className="mx-auto max-w-xl font-display text-4xl sm:text-5xl font-normal leading-tight text-ink-primary">
              Come see what a small team from UP can build.
            </h2>
            <p className="max-w-md mx-auto text-sm text-ink-body leading-relaxed">
              Explore our micro-SaaS utilities, meet our engineering team, or invite us to your
              campus for an AI Skill Mission masterclass.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <NextLink
                href="/team"
                className="inline-flex items-center gap-2 rounded-xl border border-line-default bg-canvas-pure px-6 py-3 font-sans text-sm font-semibold text-ink-primary hover:bg-canvas-recessed transition-all shadow-sm active:scale-[0.98]"
              >
                <span>Meet the team</span>
                <ArrowRight className="w-4 h-4" />
              </NextLink>
              <NextLink
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-terra-500 px-6 py-3 font-sans text-sm font-semibold text-white hover:bg-terra-600 transition-all shadow-sm hover:-translate-y-0.5 active:scale-[0.98]"
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
