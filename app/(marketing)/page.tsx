import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/foundation/Container';
import { Button } from '@/components/atoms/Button';
import { Link } from '@/components/atoms/Link';
import {
  AnimatedSection,
  Reveal,
  StaggerGrid,
  StaggerItem,
} from '@/components/foundation/AnimatedSection';
import { TextReveal } from '@/components/foundation/TextReveal';
import { CountUp } from '@/components/foundation/CountUp';
import { MeshGradient } from '@/components/atoms/MeshGradient';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Zap,
  FileCheck,
  MapPin,
  Clock,
  Users,
  Activity,
  Terminal,
} from 'lucide-react';
import {
  HeroStudioWorkbench,
  ProductStudio,
  ConnectedPipelineRail,
  RoiCalculator,
  EnterpriseBlueprintMatrix,
  ArchitecturalSpecMatrix,
  SkillMissionSection,
  HomeFaqAccordion,
} from '@/components/organisms';
import { buildMetadata, getOrganizationJsonLd, getLocalBusinessJsonLd, JsonLd } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  path: '/',
  title: 'AI That Actually Works',
  description:
    'Deterministic micro-SaaS utilities and bespoke enterprise AI automation pipelines engineered in Uttar Pradesh with sub-second latency targets.',
});

export default function HomePage() {
  return (
    <div className="text-ink-primary min-h-screen font-sans selection:bg-accent-500 selection:text-white">
      <JsonLd schema={getOrganizationJsonLd()} />
      <JsonLd schema={getLocalBusinessJsonLd()} />

      {/* =========================================================================
          TOP HARDWARE TELEMETRY & STATUS STRIP
          ========================================================================= */}
      <div className="bg-canvas-recessed/90 border-b border-[rgba(13,37,61,0.08)] py-1.5 px-4 text-center">
        <div className="flex items-center justify-center gap-3 text-[11px] font-mono text-ink-secondary flex-wrap">
          <span className="flex items-center gap-1.5 text-accent-secondary font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-secondary animate-pulse" />
            SYS: NOMINAL
          </span>
          <span className="text-[rgba(13,37,61,0.2)]">|</span>
          <span>P95 LATENCY &lt; 320ms</span>
          <span className="text-[rgba(13,37,61,0.2)]">|</span>
          <span>ZERO-EGRESS EPHEMERAL RAM</span>
          <span className="text-[rgba(13,37,61,0.2)]">|</span>
          <span className="text-accent-500 font-semibold">100% DETERMINISTIC JSON</span>
        </div>
      </div>

      {/* =========================================================================
          SECTION 1: HERO (Living Command Stage with HeroStudioWorkbench)
          ========================================================================= */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-canvas-base">
        <MeshGradient intensity="medium" />

        <Container size="default" className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-7 text-left">
              {/* Badge */}
              <Reveal delay={0} y={16}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-50 border border-accent-500/20 text-accent-500 text-xs font-mono font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse" />
                  <span>Deterministic AI Engineering · Uttar Pradesh</span>
                </div>
              </Reveal>

              {/* Headline in Instrument Serif with TextReveal */}
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-ink-primary leading-[1.02] tracking-display">
                <TextReveal text="Your operations," splitBy="word" as="span" stagger={0.08} duration={0.7} /> <br />
                <span className="italic text-accent-500 font-normal inline-block">
                  <TextReveal text="on autopilot." splitBy="word" as="span" delay={0.2} stagger={0.08} duration={0.7} />
                </span>
              </h1>

              {/* Body in Plus Jakarta Sans with Fluid Clamp & Pretty Wrap */}
              <Reveal delay={0.32} y={18}>
                <p className="fluid-lead text-ink-body font-normal leading-relaxed max-w-xl text-pretty">
                  Four purpose-built AI tools engineered to eliminate manual operational drag. Screen candidate batches in <span className="font-mono tabular-nums font-semibold text-ink-primary">&lt; 0.35s</span>, extract lecture intelligence with LaTeX precision, summarize community chats, and digest regional news with verifiable JSON schemas.
                </p>
              </Reveal>

              {/* Dual Primary Terracotta CTA + Secondary Clean Paper */}
              <Reveal delay={0.46} y={18}>
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <Link href="/contact?service=enterprise-audit" className="w-full sm:w-auto">
                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full sm:w-auto justify-center group shadow-accent hover:shadow-hover hover:-translate-y-0.5 active:scale-[0.98] transition-all"
                    >
                      <span>Schedule Architecture Audit</span>
                      <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link href="#product-studio" className="w-full sm:w-auto">
                    <Button
                      variant="secondary"
                      size="lg"
                      className="w-full sm:w-auto justify-center hover:-translate-y-0.5 active:scale-[0.98] transition-all"
                    >
                      Explore 4 Live Tools
                    </Button>
                  </Link>
                </div>
              </Reveal>

              {/* SLA / Trust Badges with Tightened Gestalt Grouping */}
              <Reveal delay={0.60} y={14}>
                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-ink-secondary">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-accent-secondary shrink-0" />
                    <span>Encrypted RAM isolation (0 bytes logged)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-accent-secondary shrink-0" />
                    <span>Direct founder & engineer support</span>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Product Demo: Authentic Interactive 4-in-1 Living Studio Workbench */}
            <div className="lg:col-span-6 relative">
              <Reveal delay={0.35} y={28}>
                <HeroStudioWorkbench />
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 2: TRUST & TELEMETRY STRIP (Quantified Social Proof)
          ========================================================================= */}
      <AnimatedSection as="aside" aria-label="Platform telemetry and verified impact" className="relative py-6 border-y border-[rgba(13,37,61,0.08)] bg-canvas-paper/70 pattern-dots backdrop-blur-sm">
        <Container size="default">
          <StaggerGrid className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 items-center text-center" stagger={0.14}>
            {/* Metric 1: Resumes Screened */}
            <StaggerItem className="flex flex-col items-center justify-center space-y-1">
              <div className="flex items-center gap-1 font-mono text-xl sm:text-2xl font-bold text-ink-primary tabular-nums">
                <CountUp value={14200} duration={2.2} />
                <span className="text-accent-500 font-sans font-semibold text-lg">+</span>
              </div>
              <p className="text-xs font-medium text-ink-secondary flex items-center gap-1.5">
                <FileCheck className="w-3.5 h-3.5 text-accent-secondary shrink-0" />
                Resumes parsed & scored
              </p>
            </StaggerItem>

            {/* Metric 2: Hours Saved */}
            <StaggerItem className="flex flex-col items-center justify-center space-y-1">
              <div className="flex items-center gap-1 font-mono text-xl sm:text-2xl font-bold text-ink-primary tabular-nums">
                <CountUp value={4800} duration={2.2} />
                <span className="text-accent-500 font-sans font-semibold text-lg">+</span>
              </div>
              <p className="text-xs font-medium text-ink-secondary flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-accent-500 shrink-0" />
                Operational hours saved
              </p>
            </StaggerItem>

            {/* Metric 3: Active Workspaces */}
            <StaggerItem className="flex flex-col items-center justify-center space-y-1">
              <div className="flex items-center gap-1 font-mono text-xl sm:text-2xl font-bold text-ink-primary tabular-nums">
                <CountUp value={180} duration={2.0} />
                <span className="text-accent-500 font-sans font-semibold text-lg">+</span>
              </div>
              <p className="text-xs font-medium text-ink-secondary flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-accent-secondary shrink-0" />
                Teams & workspaces
              </p>
            </StaggerItem>

            {/* Metric 4: Sub-second SLA */}
            <StaggerItem className="flex flex-col items-center justify-center space-y-1">
              <div className="flex items-center gap-1 font-mono text-xl sm:text-2xl font-bold text-ink-primary tabular-nums">
                <span className="text-accent-500 font-sans text-lg font-normal">&lt;</span>
                <CountUp value={0.35} decimals={2} duration={1.8} suffix="s" />
              </div>
              <p className="text-xs font-medium text-ink-secondary flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-accent-500 shrink-0" />
                Average parser latency
              </p>
            </StaggerItem>
          </StaggerGrid>
        </Container>
      </AnimatedSection>

      {/* =========================================================================
          SECTION 3: FLAGSHIP MICRO-SAAS PRODUCT STUDIO (Widescreen 1380px Stage)
          ========================================================================= */}
      <AnimatedSection id="product-studio" className="py-20 md:py-28 bg-canvas-base border-b border-[rgba(13,37,61,0.08)]">
        <Container size="wide">
          <Reveal delay={0} y={24}>
            <div className="max-w-2xl mb-12 text-left space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-50 border border-accent-500/20 text-accent-500 text-xs font-mono font-semibold">
                <Activity className="w-3.5 h-3.5" />
                <span>Interactive Product Studio</span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal text-ink-primary leading-tight tracking-display">
                Purpose-built tools. <br />
                <span className="italic text-accent-500 font-normal">Zero operational drag.</span>
              </h2>
              <p className="fluid-body text-ink-body leading-relaxed max-w-xl text-pretty">
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
          SECTION 4: CONNECTED 3-STAGE EXECUTION PIPELINE
          ========================================================================= */}
      <AnimatedSection className="py-20 md:py-28 bg-canvas-paper border-b border-[rgba(13,37,61,0.08)]">
        <Container size="default">
          <ConnectedPipelineRail />
        </Container>
      </AnimatedSection>

      {/* =========================================================================
          SECTION 5: OPERATIONAL DRAG & ROI CALCULATOR
          ========================================================================= */}
      <AnimatedSection className="py-20 md:py-28 bg-canvas-base border-b border-[rgba(13,37,61,0.08)]">
        <Container size="default">
          <RoiCalculator />
        </Container>
      </AnimatedSection>

      {/* =========================================================================
          SECTION 6: BESPOKE ENTERPRISE SYSTEM TOPOLOGY MATRIX
          ========================================================================= */}
      <AnimatedSection className="py-20 md:py-28 bg-canvas-paper border-b border-[rgba(13,37,61,0.08)]">
        <Container size="default">
          <EnterpriseBlueprintMatrix />
        </Container>
      </AnimatedSection>

      {/* =========================================================================
          SECTION 7: CORE ARCHITECTURAL SPEC MATRIX
          ========================================================================= */}
      <AnimatedSection className="py-20 md:py-28 bg-canvas-base border-b border-[rgba(13,37,61,0.08)]">
        <Container size="default">
          <ArchitecturalSpecMatrix />
        </Container>
      </AnimatedSection>

      {/* =========================================================================
          SECTION 8: AI SKILL MISSION & YOUTH ENABLEMENT
          ========================================================================= */}
      <AnimatedSection className="py-20 md:py-28 bg-canvas-base border-t border-[rgba(13,37,61,0.08)]">
        <SkillMissionSection />
      </AnimatedSection>

      {/* =========================================================================
          SECTION 9: TECHNICAL ARCHITECTURE & FAQ ACCORDION
          ========================================================================= */}
      <AnimatedSection className="py-20 md:py-28 bg-canvas-paper border-y border-[rgba(13,37,61,0.08)]">
        <Container size="default">
          <HomeFaqAccordion />
        </Container>
      </AnimatedSection>

      {/* =========================================================================
          SECTION 10: MANDATORY TAGLINE REVEAL MANIFESTO (Skill B11)
          ========================================================================= */}
      <AnimatedSection className="relative py-24 md:py-32 bg-canvas-base border-b border-[rgba(13,37,61,0.08)] overflow-hidden">
        {/* Ambient radial warmth on parchment */}
        <div
          className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(194,85,58,0.05)_0%,transparent_70%)]"
          aria-hidden="true"
        />

        <Container size="narrow" className="relative z-10">
          {/* Top Hairline Gradient Divider */}
          <div className="hairline-divider-gradient mb-12" aria-hidden="true" />

          <div className="relative text-center space-y-8 px-4 sm:px-8">
            {/* Large Decorative Instrument Serif Opening Quote Watermark */}
            <span
              aria-hidden="true"
              className="font-display text-8xl sm:text-9xl md:text-[11rem] text-accent-500/10 leading-none select-none pointer-events-none absolute -top-12 sm:-top-16 left-1/2 -translate-x-1/2"
            >
              “
            </span>

            <h3 className="font-display text-3xl sm:text-4xl md:text-5xl text-ink-primary font-normal leading-snug relative z-10 max-w-2xl mx-auto text-pretty">
              <TextReveal
                text="We do not build generic chatbots that guess. We engineer high-precision deterministic tools that do one job exceptionally well."
                splitBy="word"
                as="span"
                stagger={0.04}
              />
            </h3>

            <div className="pt-2 relative z-10 space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-canvas-recessed/60 border border-[rgba(13,37,61,0.08)] text-xs font-mono font-medium text-ink-primary mb-2">
                <Terminal className="w-3.5 h-3.5 text-accent-500" />
                <span>NorAI Engineering Philosophy</span>
              </div>
              <p className="text-sm font-semibold text-ink-primary">Core Engineering Team</p>
              <p className="text-xs text-ink-secondary">Engineered in Uttar Pradesh, India</p>
            </div>
          </div>

          {/* Bottom Hairline Gradient Divider */}
          <div className="hairline-divider-gradient mt-12" aria-hidden="true" />
        </Container>
      </AnimatedSection>

      {/* =========================================================================
          SECTION 11: PRE-FOOTER HIGH-CONVERSION CONSOLE
          ========================================================================= */}
      <AnimatedSection as="aside" aria-label="Get started" role="complementary" className="py-20 md:py-28 bg-canvas-base">
        <Container size="default">
          <div className="rounded-3xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] p-8 sm:p-12 md:p-16 text-center shadow-lg relative overflow-hidden">
            {/* Ambient radial warmth on parchment */}
            <div
              className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(194,85,58,0.04)_0%,transparent_70%)]"
              aria-hidden="true"
            />

            <div className="max-w-2xl mx-auto space-y-8 relative z-10">
              {/* Urgency / Beta Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-50 border border-accent-500/25 text-accent-600 text-xs font-mono font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse" />
                <span>Limited Beta Access · Early Adopter Tier Free for 50 Resumes/mo</span>
              </div>

              {/* Headline */}
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal text-ink-primary leading-tight tracking-display">
                Ready to eliminate <br />
                <span className="italic text-accent-500 font-normal">operational drag?</span>
              </h2>

              <p className="fluid-body text-ink-body leading-relaxed max-w-xl mx-auto text-pretty">
                Deploy any of our self-serve tools right now with instant API keys or consult with our core engineering team for custom enterprise VPC workflow scoping.
              </p>

              {/* Micro-Testimonial Card */}
              <div className="rounded-2xl border border-[rgba(13,37,61,0.08)] bg-canvas-base/80 p-5 sm:p-6 text-left shadow-sm max-w-lg mx-auto space-y-3">
                <p className="font-sans text-sm text-ink-body leading-relaxed italic text-pretty">
                  “NorAI cut our candidate screening time from 4 hours to under 15 minutes with verified skill schema matching and zero false positives.”
                </p>
                <div className="flex items-center justify-between border-t border-[rgba(13,37,61,0.06)] pt-3 text-xs">
                  <div>
                    <p className="font-semibold text-ink-primary">Talent Acquisition Lead</p>
                    <p className="text-ink-secondary">Regional Logistics & Supply Platform</p>
                  </div>
                  <span className="font-mono text-[11px] text-accent-secondary font-medium bg-sage-100/70 border border-accent-secondary/20 px-2 py-0.5 rounded">
                    Verified User
                  </span>
                </div>
              </div>

              {/* Dual Action CTAs with Tightened Proximity */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/contact?service=enterprise-audit" className="w-full sm:w-auto">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto justify-center group shadow-accent hover:shadow-hover hover:-translate-y-0.5 active:scale-[0.98] transition-all"
                  >
                    <span>Schedule Architecture Audit</span>
                    <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/products" className="w-full sm:w-auto">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full sm:w-auto justify-center hover:-translate-y-0.5 active:scale-[0.98] transition-all"
                  >
                    Explore all 4 products
                  </Button>
                </Link>
              </div>

              {/* Trust badges footer with Tightened Grouping */}
              <div className="pt-6 border-t border-[rgba(13,37,61,0.08)] flex flex-wrap items-center justify-center gap-4 text-xs text-ink-secondary">
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-accent-500" />
                  <span>Sub-second response SLA</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-accent-secondary" />
                  <span>Ephemeral data isolation</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-accent-500" />
                  <span>Engineered in Uttar Pradesh, India</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </AnimatedSection>
    </div>
  );
}