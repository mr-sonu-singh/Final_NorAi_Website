import React from 'react';
import Image from 'next/image';
import type { Metadata } from 'next';
import { Container } from '@/components/foundation/Container';
import { Button } from '@/components/atoms/Button';
import { Link } from '@/components/atoms/Link';
import { MagneticButton } from '@/components/atoms/MagneticButton';
import {
  AnimatedSection,
  Reveal,
  StaggerGrid,
  StaggerItem,
} from '@/components/foundation/AnimatedSection';
import { TextReveal } from '@/components/foundation/TextReveal';
import { CountUp } from '@/components/foundation/CountUp';
import {
  ArrowRight,
  Sparkles,
  Users,
  GraduationCap,
  Terminal,
  CheckCircle2,
  Heart,
  MapPin,
} from 'lucide-react';
import { buildMetadata, getBreadcrumbListJsonLd, JsonLd } from '@/lib/seo';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = buildMetadata({
  path: '/mission',
  title: 'AI Skill Mission — Computational Literacy Across Uttar Pradesh',
  description:
    'Democratizing everyday AI literacy and deterministic engineering across 75 districts of Uttar Pradesh. 100% free workshops for students, youth, and village citizens.',
});

const COMMUNITY_TIERS = [
  {
    tier: 'TIER 01',
    badge: 'Rural & Village Citizens',
    title: 'Everyday Vernacular Literacy',
    desc: 'Bringing Hindi voice interfaces, government welfare navigation, and digital fraud prevention to village elders, self-help groups, and local tradespeople.',
    metric: '₹0 Cost · Vernacular Delivery',
    icon: Users,
    highlights: [
      'Hindi voice prompts for crop advisory & mandi rates',
      'Digital scam detection & online payment safety',
      'Government welfare portal navigation',
    ],
  },
  {
    tier: 'TIER 02',
    badge: 'Secondary & College Students',
    title: 'Academic & Foundation Mastery',
    desc: 'Teaching high school and collegiate students how to turn AI into a tireless personal tutor, extract structured notes from messy lectures, and build rigorous study habits.',
    metric: 'Free Scholar Sandbox Access',
    icon: GraduationCap,
    highlights: [
      'Lecture note-taking & structured flashcard extraction',
      'STEM homework verification without hallucination',
      'Foundational programming fundamentals',
    ],
  },
  {
    tier: 'TIER 03',
    badge: 'Collegiate Builders & Engineers',
    title: 'Deterministic Systems Engineering',
    desc: 'Direct founder-led masterclasses for ambitious undergraduate engineers: Model Context Protocol (MCP) servers, local vLLM serving, vector databases, and typed APIs.',
    metric: 'Direct Founder Mentorship',
    icon: Terminal,
    highlights: [
      'Model Context Protocol (MCP) server authoring',
      'Local open-weight vLLM serving & prompt engineering',
      'Type-safe Zod runtime contracts & vector search',
    ],
  },
];

const GROUND_FACTS = [
  {
    value: 0,
    prefix: '₹',
    suffix: '',
    label: 'Student Fee',
    detail: '100% free workshops and materials, always',
  },
  {
    value: 75,
    prefix: '',
    suffix: '',
    label: 'UP Districts Scope',
    detail: 'Statewide community outreach objective',
  },
  {
    value: 500,
    prefix: '',
    suffix: '+',
    label: 'Participants Mentored',
    detail: 'Across eastern and central Uttar Pradesh',
  },
  {
    value: 100,
    prefix: '',
    suffix: '%',
    label: 'Founder-Led Delivery',
    detail: 'Taught directly by the 5 founding engineers',
  },
];

export default function MissionPage() {
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Mission', path: '/mission' },
  ];

  const missionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOccupationalProgram',
    name: 'NorAI Skill Mission & Regional Enablement Movement',
    description:
      'Democratizing everyday AI literacy and deterministic engineering across 75 districts of Uttar Pradesh. 100% free workshops for students, youth, and village citizens.',
    provider: {
      '@type': 'Organization',
      name: 'NorAI Technologies',
      url: siteConfig.url,
    },
  };

  return (
    <div className="text-text-primary min-h-screen font-sans bg-surface-canvas selection:bg-accent-primary selection:text-white">
      <JsonLd schema={missionJsonLd} />
      <JsonLd schema={getBreadcrumbListJsonLd(breadcrumbs)} />

      {/* =========================================================================
          BEAT 1: HERO MANIFESTO & DOCUMENTARY FRAME
          ========================================================================= */}
      <section className="relative pt-16 pb-14 md:pt-24 md:pb-20 border-b border-border-subtle overflow-hidden bg-surface-canvas">
        <Container size="default" className="relative z-10 space-y-12">
          <div className="max-w-4xl space-y-6 text-left">
            <Reveal delay={0} y={16}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent-50 border border-accent-primary/20 text-accent-primary text-xs font-mono font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>NorAI Skill Mission · Uttar Pradesh</span>
              </div>
            </Reveal>

            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-text-primary leading-[1.02] tracking-display">
              <TextReveal text="Computational literacy" as="span" /> <br />
              <span className="italic text-accent-primary font-normal">
                <TextReveal text="for all 75 districts." as="span" delay={0.2} />
              </span>
            </h1>

            <Reveal delay={0.2} y={18}>
              <p className="fluid-lead text-text-secondary leading-relaxed max-w-2xl font-normal text-pretty">
                Artificial intelligence should never be a metro-only privilege. We conduct
                zero-cost, hands-on workshops across rural communities, regional schools, and
                collegiate tech hubs in Uttar Pradesh—empowering everyday citizens, students, and
                young builders.
              </p>
            </Reveal>
          </div>

          {/* Documentary Photo Frame */}
          <Reveal delay={0.3} y={24}>
            <figure className="relative overflow-hidden rounded-3xl border border-border-strong bg-surface-panel shadow-sm">
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-panel-subtle">
                <Image
                  src="/images/about/skill-mission.jpg"
                  alt="NorAI Skill Mission hands-on AI engineering masterclass in a regional college classroom in Uttar Pradesh"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              </div>
              <figcaption className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-t border-border-subtle bg-surface-panel/90 px-6 py-3.5 text-xs font-mono text-text-secondary text-left">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-primary" />
                  <span>
                    Hands-on Engineering Masterclass · Regional College Cohort, Uttar Pradesh
                  </span>
                </span>
                <span className="text-accent-secondary font-medium">
                  Democratizing Engineering Beyond Metros
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </Container>
      </section>

      {/* =========================================================================
          BEAT 2: THREE COMMUNITY TIERS
          ========================================================================= */}
      <AnimatedSection className="py-20 md:py-28 border-b border-border-subtle bg-surface-panel">
        <Container size="default">
          <div className="max-w-3xl mb-14 text-left space-y-3">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent-primary">
              Three Grassroots Tiers
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal text-text-primary leading-tight tracking-display">
              Calibrated pedagogy for every divide.
            </h2>
            <p className="fluid-body text-text-secondary leading-relaxed max-w-xl text-pretty">
              We never parachute generic corporate slide decks into regional classrooms. Every
              session is designed specifically for its audience.
            </p>
          </div>

          <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left" stagger={0.12}>
            {COMMUNITY_TIERS.map((tier) => {
              const Icon = tier.icon;
              return (
                <StaggerItem key={tier.tier} className="h-full">
                  <div className="p-2 rounded-3xl bg-surface-canvas/80 border border-border-strong shadow-sm h-full flex flex-col justify-between hover:border-accent-primary/40 transition-colors">
                    <div className="rounded-[calc(1.5rem-0.25rem)] bg-surface-panel border border-border-subtle p-7 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] space-y-5 h-full flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold text-accent-primary px-2.5 py-0.5 rounded bg-accent-50 border border-accent-primary/20">
                            {tier.tier}
                          </span>
                          <div className="w-8 h-8 rounded-lg bg-surface-panel-subtle border border-border-subtle text-accent-primary flex items-center justify-center">
                            <Icon className="w-4 h-4" />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <span className="text-[11px] font-mono text-accent-secondary font-medium block">
                            {tier.badge}
                          </span>
                          <h3 className="font-display text-2xl text-text-primary font-normal leading-snug">
                            {tier.title}
                          </h3>
                        </div>

                        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                          {tier.desc}
                        </p>

                        <div className="space-y-1.5 pt-2 border-t border-border-subtle">
                          {tier.highlights.map((hl) => (
                            <div
                              key={hl}
                              className="flex items-start gap-2 text-xs text-text-primary"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-accent-secondary shrink-0 mt-0.5" />
                              <span className="text-[11px] font-medium leading-tight">{hl}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-border-subtle flex items-center justify-between text-xs font-mono text-accent-secondary font-semibold">
                        <span>{tier.metric}</span>
                        <Heart className="w-3.5 h-3.5 text-accent-primary" />
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGrid>
        </Container>
      </AnimatedSection>

      {/* =========================================================================
          BEAT 3: GROUND FACTS & OUTREACH REALITY
          ========================================================================= */}
      <AnimatedSection className="py-20 md:py-28 border-b border-border-subtle bg-surface-canvas">
        <Container size="default">
          <div className="max-w-3xl mb-14 text-left space-y-3">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent-secondary">
              Verified Ground Reality
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal text-text-primary leading-tight tracking-display">
              Four grounded commitments.
            </h2>
            <p className="fluid-body text-text-secondary leading-relaxed max-w-xl text-pretty">
              Zero corporate vanity metrics. We measure our impact by real classroom hours, verified
              local code repositories, and genuine accessibility.
            </p>
          </div>

          <StaggerGrid className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left" stagger={0.1}>
            {GROUND_FACTS.map((fact) => (
              <StaggerItem key={fact.label} className="h-full">
                <div className="p-2 rounded-2xl bg-surface-panel/50 border border-border-strong shadow-sm h-full flex flex-col justify-between">
                  <div className="rounded-xl bg-surface-panel border border-border-subtle p-5 space-y-2 h-full flex flex-col justify-between">
                    <div>
                      <div className="font-display text-3xl sm:text-4xl text-text-primary font-normal flex items-baseline">
                        <CountUp
                          value={fact.value}
                          prefix={fact.prefix}
                          suffix={fact.suffix}
                          duration={1.6}
                          className="font-display text-3xl sm:text-4xl text-text-primary font-normal"
                        />
                      </div>
                      <div className="font-sans text-xs font-semibold text-text-primary pt-1">
                        {fact.label}
                      </div>
                    </div>
                    <p className="font-mono text-[11px] text-text-secondary leading-tight pt-1">
                      {fact.detail}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </Container>
      </AnimatedSection>

      {/* =========================================================================
          BEAT 4: REQUEST A WORKSHOP CTA CONSOLE
          ========================================================================= */}
      <AnimatedSection
        as="aside"
        aria-label="Request an on-campus masterclass"
        className="py-20 md:py-28 bg-surface-panel"
      >
        <Container size="default">
          <div className="p-2 sm:p-3 rounded-3xl bg-surface-canvas/80 border border-border-strong shadow-lg">
            <div className="rounded-[calc(1.5rem-0.25rem)] bg-surface-panel border border-border-subtle p-8 sm:p-12 md:p-16 text-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] relative overflow-hidden">
              <div
                className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(200,90,50,0.04)_0%,transparent_70%)]"
                aria-hidden="true"
              />

              <div className="max-w-2xl mx-auto space-y-6 relative z-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-50 border border-accent-primary/25 text-accent-primary text-xs font-mono font-semibold">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Bring NorAI to Your Institution</span>
                </div>

                <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal text-text-primary leading-tight tracking-display">
                  Host an on-campus <br />
                  <span className="italic text-accent-primary font-normal">AI masterclass.</span>
                </h2>

                <p className="fluid-body text-text-secondary leading-relaxed max-w-xl mx-auto text-pretty">
                  Are you a college principal, department chair, polytechnic educator, or community
                  leader in Uttar Pradesh? Invite our engineering team to conduct a 100% free,
                  hands-on workshop on your campus.
                </p>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link href="/contact?subject=mission-workshop" className="w-full sm:w-auto">
                    <MagneticButton strength={14} className="w-full sm:w-auto">
                      <Button
                        variant="primary"
                        size="lg"
                        className="w-full sm:w-auto justify-between group shadow-accent hover:shadow-hover hover:-translate-y-0.5 active:scale-[0.98] transition-all cursor-pointer btn-tactile pl-6 pr-2.5 py-2.5"
                      >
                        <span className="font-semibold text-sm">
                          Request Free Campus Masterclass
                        </span>
                        <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5 ml-3">
                          <ArrowRight className="w-4 h-4 text-white" />
                        </span>
                      </Button>
                    </MagneticButton>
                  </Link>

                  <Link href="/team" className="w-full sm:w-auto">
                    <Button
                      variant="secondary"
                      size="lg"
                      className="w-full sm:w-auto justify-center hover:-translate-y-0.5 active:scale-[0.98] transition-all cursor-pointer text-sm"
                    >
                      Meet the founding team
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </AnimatedSection>
    </div>
  );
}
