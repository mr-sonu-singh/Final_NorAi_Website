import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/foundation/Container';
import { Button } from '@/components/atoms/Button';
import { Link } from '@/components/atoms/Link';
import { AnimatedSection, Reveal } from '@/components/foundation/AnimatedSection';
import { TextReveal } from '@/components/foundation/TextReveal';
import { MagneticButton } from '@/components/atoms/MagneticButton';
import { InteractiveCircuitTrace, TaglineReveal } from '@/components/molecules';
import { ArrowRight } from 'lucide-react';
import {
  HeroStudioWorkbench,
  HardwareTelemetryLedger,
  ProductStudio,
  RoiCalculator,
  SkillMissionSection,
  ArchitecturalSpecMatrix,
  HomeFaqAccordion,
} from '@/components/organisms';
import { buildMetadata, getOrganizationJsonLd, getLocalBusinessJsonLd, JsonLd } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  path: '/',
  title: 'NorAI Technologies — Deterministic AI Pipelines & Enterprise Automation',
  description:
    'Eliminate manual document drag with sub-second, deterministic AI pipelines. Verified JSON schemas, ephemeral RAM data isolation, and air-gapped private VPC deployments.',
});

export default function HomePage() {
  return (
    <div className="text-text-primary min-h-screen font-sans selection:bg-accent-primary selection:text-white">
      <JsonLd schema={getOrganizationJsonLd()} />
      <JsonLd schema={getLocalBusinessJsonLd()} />

      {/* =========================================================================
          BEAT 1: HERO (High-Impact Living Command Stage with 4-Tool Sandbox)
          Linear & Vercel Inspired 6/6 Split Layout with Zero Fold Cutoff
          ========================================================================= */}
      <section className="relative pt-8 pb-10 sm:pt-12 sm:pb-14 md:pt-14 md:pb-16 overflow-hidden bg-surface-canvas border-b border-border-subtle">
        <Container size="default" className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Content Column (6 cols on desktop) */}
            <div className="lg:col-span-6 space-y-5 text-left">
              {/* Borderless Minimalist Eyebrow */}
              <p className="text-xs font-mono font-semibold uppercase tracking-[0.14em] text-accent-primary">
                NorAI Technologies · Tools · Services · Community Mission
              </p>

              {/* Headline in Instrument Serif with TextReveal */}
              <h1
                aria-label="Frontier AI tools and services. Rooted in community growth."
                className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-normal text-text-primary leading-[1.05] tracking-display text-balance"
              >
                <TextReveal text="Frontier AI" splitBy="word" as="span" stagger={0.08} duration={0.7} /> <br />
                <span className="font-normal inline-block text-text-primary">
                  <TextReveal text="tools & services." splitBy="word" as="span" delay={0.16} stagger={0.08} duration={0.7} />
                </span> <br />
                <span className="italic text-accent-primary font-normal inline-block">
                  <TextReveal text="Rooted in community growth." splitBy="word" as="span" delay={0.32} stagger={0.08} duration={0.7} />
                </span>
              </h1>

              {/* Lede */}
              <Reveal delay={0.32} y={16}>
                <p className="fluid-lead text-text-secondary font-normal leading-relaxed max-w-xl text-pretty">
                  NorAI builds high-velocity autonomous tools, bespoke enterprise pipelines, and grassroots computational literacy. From sub-second document triage to statewide builder training across Uttar Pradesh, we engineer deterministic AI with zero data retention and physical-world reliability.
                </p>
              </Reveal>

              {/* Primary Action + Secondary Scoping */}
              <Reveal delay={0.46} y={16}>
                <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <Link href="/products" className="w-full sm:w-auto">
                    <MagneticButton strength={12} className="w-full sm:w-auto">
                      <Button
                        variant="primary"
                        size="lg"
                        className="w-full sm:w-auto justify-center group active:scale-[0.98] transition-transform cursor-pointer whitespace-nowrap"
                      >
                        <span>Start Free Sandbox</span>
                        <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </MagneticButton>
                  </Link>
                  <Link href="/services" className="w-full sm:w-auto">
                    <Button
                      variant="secondary"
                      size="lg"
                      className="w-full sm:w-auto justify-center active:scale-[0.98] transition-transform cursor-pointer whitespace-nowrap"
                    >
                      Enterprise Services &rarr;
                    </Button>
                  </Link>
                </div>
              </Reveal>

              {/* SLA / Hardware Guarantees */}
              <Reveal delay={0.60} y={14}>
                <div className="pt-1 flex flex-wrap items-center gap-3 text-xs text-text-muted font-mono">
                  <Link href="/products" className="no-underline hover:text-accent-primary transition-colors">
                    <span>4 Autonomous Tools</span>
                  </Link>
                  <span className="text-border-strong select-none">/</span>
                  <Link href="/services" className="no-underline hover:text-accent-primary transition-colors">
                    <span>Dedicated Enterprise VPC</span>
                  </Link>
                  <span className="text-border-strong select-none">/</span>
                  <Link href="/mission" className="no-underline hover:text-accent-primary transition-colors">
                    <span>75-District UP Skill Mission</span>
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Right Product Demo: Multi-Tool Living Sandbox (6 cols on desktop) */}
            <div className="lg:col-span-6 relative">
              <Reveal delay={0.35} y={24}>
                <HeroStudioWorkbench />
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          BEAT 2: HARDWARE TELEMETRY LEDGER (Teenage Engineering Honesty)
          ========================================================================= */}
      <HardwareTelemetryLedger />

      {/* =========================================================================
          BEAT 3: MANDATORY TAGLINE REVEAL (Skill Rule B11)
          Apple & Stripe Press Reading Cadence
          ========================================================================= */}
      <TaglineReveal />

      {/* =========================================================================
          BEAT 4: FLAGSHIP MICRO-SAAS BENTO WORKBENCHES (Widescreen 1380px Stage)
          ========================================================================= */}
      <AnimatedSection id="product-studio" className="py-14 md:py-20 bg-surface-canvas border-b border-border-subtle">
        <Container size="wide">
          <Reveal delay={0} y={24}>
            <div className="max-w-2xl mb-12 text-left space-y-3">
              <p className="text-xs font-mono font-semibold uppercase tracking-[0.14em] text-accent-primary">
                Autonomous Workbenches
              </p>

              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal text-text-primary leading-tight tracking-display">
                Purpose-built tools. <br />
                <span className="font-medium text-text-primary">Zero operational drag.</span>
              </h2>
              <p className="fluid-body text-text-secondary leading-relaxed max-w-xl text-pretty">
                No bloated all-in-one platforms. Each utility does exactly one operational job with deterministic accuracy, sub-second speed, and ephemeral memory isolation.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2} y={28}>
            <ProductStudio />
          </Reveal>
        </Container>
      </AnimatedSection>

      {/* =========================================================================
          BEAT 5: EXECUTION PIPELINE & OPERATIONAL ROI DIAGNOSTIC
          ========================================================================= */}
      <AnimatedSection className="py-14 md:py-20 bg-surface-panel border-b border-border-subtle" id="pipeline-roi">
        <Container size="default">
          <Reveal delay={0} y={20}>
            <div className="max-w-2xl mb-12 text-left space-y-3">
              <p className="text-xs font-mono font-semibold uppercase tracking-[0.14em] text-accent-primary">
                Execution Architecture &amp; Savings
              </p>

              <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-text-primary leading-tight">
                Quantified efficiency. <br />
                <span className="font-medium text-text-primary">Sub-second payload execution.</span>
              </h3>
              <p className="text-sm md:text-base text-text-secondary leading-relaxed max-w-xl">
                Trace payload execution through ingest, neural vector scoring, and ephemeral flush — then calculate your organization&apos;s annual payroll reclamation.
              </p>
            </div>
          </Reveal>

          {/* Connected Pipeline Trace */}
          <div className="mb-14">
            <InteractiveCircuitTrace />
          </div>

          {/* ROI Calculator */}
          <div className="pt-8 border-t border-border-subtle">
            <RoiCalculator />
          </div>
        </Container>
      </AnimatedSection>

      {/* =========================================================================
          BEAT 6: AI SKILL MISSION & COMMUNITY UPLIFTMENT (Premier Centerpiece)
          Democratizing AI literacy & production engineering across Uttar Pradesh
          ========================================================================= */}
      <SkillMissionSection />

      {/* =========================================================================
          BEAT 8: ARCHITECTURAL SPEC MATRIX & TECHNICAL ARCHITECTURE FAQ
          ========================================================================= */}
      <AnimatedSection className="py-14 md:py-20 bg-surface-panel border-b border-border-subtle" id="spec-matrix">
        <Container size="default">
          <Reveal delay={0} y={20}>
            <div className="max-w-2xl mb-12 text-left space-y-3">
              <p className="text-xs font-mono font-semibold uppercase tracking-[0.14em] text-accent-primary">
                Verifiable Standards
              </p>

              <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-text-primary leading-tight">
                Deterministic standards. <br />
                <span className="font-medium text-text-primary">Direct technical answers.</span>
              </h3>
              <p className="text-sm md:text-base text-text-secondary leading-relaxed max-w-xl">
                Review our verifiable SLA guarantees, zero-logging data isolation specs, and integration guidelines.
              </p>
            </div>
          </Reveal>

          <div className="space-y-14">
            <ArchitecturalSpecMatrix />
            <div className="pt-10 border-t border-border-subtle">
              <HomeFaqAccordion />
            </div>
          </div>
        </Container>
      </AnimatedSection>

      {/* =========================================================================
          BEAT 9: DUAL-FUNNEL CLOSING CONSOLE & TESTIMONIAL PROOF
          ========================================================================= */}
      <AnimatedSection as="aside" aria-label="Get started" role="complementary" className="py-14 md:py-20 bg-surface-canvas">
        <Container size="default">
          <div className="rounded-xl bg-surface-panel border border-border-strong p-6 sm:p-10 md:p-12 text-center relative overflow-hidden">
            <div className="max-w-2xl mx-auto space-y-8 relative z-10">
              <p className="text-xs font-mono font-semibold uppercase tracking-[0.14em] text-accent-primary">
                Immediate Access
              </p>

              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal text-text-primary leading-tight tracking-display">
                Ready to eliminate <br />
                <span className="font-medium text-text-primary">manual operational drag?</span>
              </h2>

              <p className="fluid-body text-text-secondary leading-relaxed max-w-xl mx-auto text-pretty">
                Deploy any of our self-serve tools right now with 50 free parse credits, or schedule a direct architectural audit with our core engineering team for private VPC deployments.
              </p>

              {/* Micro-Testimonial Card */}
              <div className="rounded-xl border border-border-subtle bg-surface-canvas p-5 sm:p-6 text-left max-w-lg mx-auto space-y-3">
                <p className="font-sans text-sm text-text-secondary leading-relaxed italic text-pretty">
                  &ldquo;NorAI cut our candidate screening time from 4 hours to under 15 minutes with verified skill schema matching and zero false positives.&rdquo;
                </p>
                <div className="flex items-center justify-between border-t border-border-subtle pt-3 text-xs">
                  <div>
                    <p className="font-semibold text-text-primary">Talent Acquisition Lead</p>
                    <p className="text-text-muted">Regional Logistics &amp; Supply Platform</p>
                  </div>
                  <span className="font-mono text-[11px] text-text-muted font-medium">
                    Verified Production User
                  </span>
                </div>
              </div>

              {/* Dual Action: Primary CTA + Secondary Link */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/products" className="w-full sm:w-auto">
                  <MagneticButton strength={12} className="w-full sm:w-auto">
                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full sm:w-auto justify-center group active:scale-[0.98] transition-transform cursor-pointer whitespace-nowrap"
                    >
                      <span>Start Free Sandbox (50 Credits)</span>
                      <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </MagneticButton>
                </Link>
                <Link href="/contact?service=enterprise-audit" className="w-full sm:w-auto">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full sm:w-auto justify-center active:scale-[0.98] transition-transform cursor-pointer whitespace-nowrap"
                  >
                    Schedule Architecture Audit &rarr;
                  </Button>
                </Link>
              </div>

              {/* Trust Badges Footer */}
              <div className="pt-6 border-t border-border-subtle flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-text-muted">
                <span>Sub-second response SLA</span>
                <span className="text-border-strong select-none">/</span>
                <span>Ephemeral RAM isolation</span>
                <span className="text-border-strong select-none">/</span>
                <span>Engineered in Uttar Pradesh</span>
              </div>
            </div>
          </div>
        </Container>
      </AnimatedSection>
    </div>
  );
}