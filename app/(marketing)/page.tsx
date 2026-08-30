import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/foundation/Container';
import { Button } from '@/components/atoms/Button';
import { Link } from '@/components/atoms/Link';
import { AnimatedSection } from '@/components/foundation/AnimatedSection';
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
} from 'lucide-react';
import {
  CandidateScreenerWorkbench,
  ArchitecturalSpecMatrix,
  ConnectedPipelineRail,
  SkillMissionSection,
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
          SECTION 1: HERO (Editorial Full-Bleed with Interactive Workbench)
          ========================================================================= */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-32 overflow-hidden bg-canvas-base">
        <MeshGradient intensity="medium" />

        <Container size="default" className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-8 text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-50 border border-accent-500/20 text-accent-500 text-xs font-mono font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse" />
                <span>Deterministic AI Engineering · Uttar Pradesh</span>
              </div>

              {/* Headline in Instrument Serif with TextReveal */}
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-ink-primary leading-[1.02] tracking-display">
                <TextReveal text="Your operations," splitBy="word" as="span" /> <br />
                <span className="italic text-accent-500 font-normal inline-block">
                  <TextReveal text="on autopilot." splitBy="word" as="span" delay={0.12} />
                </span>
              </h1>

              {/* Body in Plus Jakarta Sans with Fluid Clamp & Pretty Wrap */}
              <p className="fluid-lead text-ink-body font-normal leading-relaxed max-w-xl text-pretty">
                Four purpose-built AI tools engineered to eliminate manual operational drag. Screen candidates in <span className="font-mono tabular-nums font-semibold text-ink-primary">&lt; 0.35s</span>, extract lecture intelligence, summarize community chats, and digest regional news with verifiable JSON precision.
              </p>

              {/* Single Primary Terracotta CTA + Secondary with Tightened Proximity */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto justify-center group shadow-accent hover:shadow-hover hover:-translate-y-0.5 active:scale-[0.98] transition-all"
                  >
                    <span>Get in touch</span>
                    <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/products" className="w-full sm:w-auto">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full sm:w-auto justify-center hover:-translate-y-0.5 active:scale-[0.98] transition-all"
                  >
                    Explore 4 tools
                  </Button>
                </Link>
              </div>

              {/* SLA / Trust Badges with Tightened Gestalt Grouping */}
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-ink-secondary">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-accent-secondary shrink-0" />
                  <span>Encrypted data isolation (0 bytes retained)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-accent-secondary shrink-0" />
                  <span>&lt; 2hr engineering response SLA</span>
                </div>
              </div>
            </div>

            {/* Right Product Demo: Authentic Interactive Operations Workbench */}
            <div className="lg:col-span-6 relative">
              <CandidateScreenerWorkbench />
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 2: TRUST & TELEMETRY STRIP (Social Proof & Quantified Impact)
          ========================================================================= */}
      {/* TODO: Connect live telemetry endpoint once analytics pipeline connects */}
      <aside aria-label="Platform telemetry and verified impact" className="relative py-6 border-y border-[rgba(13,37,61,0.08)] bg-canvas-paper/70 pattern-dots backdrop-blur-sm">
        <Container size="default">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 items-center text-center">
            {/* Metric 1: Resumes Screened */}
            <div className="flex flex-col items-center justify-center space-y-1">
              <div className="flex items-center gap-1 font-mono text-xl sm:text-2xl font-bold text-ink-primary tabular-nums">
                <CountUp value={14200} duration={1.6} />
                <span className="text-accent-500 font-sans font-semibold text-lg">+</span>
              </div>
              <p className="text-xs font-medium text-ink-secondary flex items-center gap-1.5">
                <FileCheck className="w-3.5 h-3.5 text-accent-secondary shrink-0" />
                Resumes parsed & scored
              </p>
            </div>

            {/* Metric 2: Hours Saved */}
            <div className="flex flex-col items-center justify-center space-y-1">
              <div className="flex items-center gap-1 font-mono text-xl sm:text-2xl font-bold text-ink-primary tabular-nums">
                <CountUp value={4800} duration={1.6} />
                <span className="text-accent-500 font-sans font-semibold text-lg">+</span>
              </div>
              <p className="text-xs font-medium text-ink-secondary flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-accent-500 shrink-0" />
                Operational hours saved
              </p>
            </div>

            {/* Metric 3: Active Workspaces */}
            <div className="flex flex-col items-center justify-center space-y-1">
              <div className="flex items-center gap-1 font-mono text-xl sm:text-2xl font-bold text-ink-primary tabular-nums">
                <CountUp value={180} duration={1.4} />
                <span className="text-accent-500 font-sans font-semibold text-lg">+</span>
              </div>
              <p className="text-xs font-medium text-ink-secondary flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-accent-secondary shrink-0" />
                Teams & workspaces
              </p>
            </div>

            {/* Metric 4: Sub-second SLA */}
            <div className="flex flex-col items-center justify-center space-y-1">
              <div className="flex items-center gap-1 font-mono text-xl sm:text-2xl font-bold text-ink-primary tabular-nums">
                <span className="text-accent-500 font-sans text-lg font-normal">&lt;</span>
                <CountUp value={0.35} decimals={2} duration={1.2} suffix="s" />
              </div>
              <p className="text-xs font-medium text-ink-secondary flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-accent-500 shrink-0" />
                Average parser latency
              </p>
            </div>
          </div>
        </Container>
      </aside>

      {/* =========================================================================
          SECTION 3: BENTO GRID: FOUR MICRO-SAAS TOOLS
          ========================================================================= */}
      <AnimatedSection className="py-20 md:py-28 bg-canvas-base">
        <Container size="default">
          <div className="max-w-2xl mb-14 text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-50 border border-accent-500/20 text-accent-500 text-xs font-mono font-semibold">
              <span>High-Utility Micro-SaaS</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal text-ink-primary leading-tight tracking-display">
              Purpose-built tools. <br />
              <span className="italic text-accent-500 font-normal">Zero operational drag.</span>
            </h2>
            <p className="fluid-body text-ink-body leading-relaxed max-w-xl text-pretty">
              No bloated all-in-one platforms. Each utility does exactly one operational job with deterministic accuracy, sub-second speed, and ephemeral memory isolation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
            {/* Bento Card 1: Resume Shortlister (Large Span 7 — Flagship Hero Card with Terracotta Top Wash) */}
            <article
              aria-labelledby="card-resume-shortlister-title"
              className="md:col-span-7 relative overflow-hidden rounded-3xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] border-l-2 border-l-accent-500/80 p-8 md:p-10 shadow-sm hover:shadow-md hover:border-accent-500/40 hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between space-y-6 before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-gradient-to-r before:from-accent-500 before:via-accent-400 before:to-transparent"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded bg-accent-50 text-accent-500 border border-accent-500/20">
                    Recruitment AI
                  </span>
                  <span className="font-mono tabular-nums text-xs font-semibold px-2 py-0.5 rounded bg-sage-100/70 text-accent-secondary border border-accent-secondary/20">
                    &lt; 0.35s / PDF · Zod Typed
                  </span>
                </div>
                <h3 id="card-resume-shortlister-title" className="font-display text-3xl sm:text-4xl text-ink-primary font-normal">
                  AI Resume Shortlister
                </h3>
                <p className="text-base text-ink-body leading-relaxed max-w-lg">
                  Screen hundreds of engineering and operations resumes in seconds. Extract verified skills, rank candidates against target job descriptions, and export structured scorecards.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded bg-canvas-recessed/60 text-ink-primary font-mono text-badge border border-[rgba(13,37,61,0.06)]">
                    PDF, DOCX & TXT
                  </span>
                  <span className="px-2.5 py-1 rounded bg-canvas-recessed/60 text-ink-primary font-mono text-badge border border-[rgba(13,37,61,0.06)]">
                    Skill Vector Weights
                  </span>
                  <span className="px-2.5 py-1 rounded bg-canvas-recessed/60 text-ink-primary font-mono text-badge border border-[rgba(13,37,61,0.06)]">
                    Direct ATS Sync
                  </span>
                </div>

                <div className="pt-4 border-t border-[rgba(13,37,61,0.08)] flex justify-between items-center text-xs">
                  <span className="text-ink-secondary font-mono">Free Tier: 50 resumes/mo</span>
                  <Link
                    href="/products/resume-shortlister"
                    className="font-semibold text-accent-500 hover:text-accent-600 inline-flex items-center gap-1 group"
                  >
                    <span>Launch Shortlister</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </article>

            {/* Bento Card 2: Course Note-Taker (Span 5 — EdTech Goldenrod Token Badge) */}
            <article
              aria-labelledby="card-course-notetaker-title"
              className="md:col-span-5 rounded-3xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] p-8 shadow-sm hover:shadow-md hover:border-accent-500/30 hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded bg-gold-100 text-gold-600 border border-gold-300/40">
                    EdTech AI
                  </span>
                  <span className="font-mono text-xs text-accent-secondary font-semibold">
                    100% Free for Students
                  </span>
                </div>
                <h3 id="card-course-notetaker-title" className="font-display text-2xl sm:text-3xl text-ink-primary font-normal">
                  AI Course Note-Taker
                </h3>
                <p className="text-sm text-ink-body leading-relaxed">
                  Turn lecture audio, video files, or slide decks into structured chapter outlines, core concept definitions, and interactive flashcards.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="px-2 py-1 rounded bg-canvas-recessed/60 text-ink-primary font-mono text-badge border border-[rgba(13,37,61,0.06)]">
                    Audio & Video Input
                  </span>
                  <span className="px-2 py-1 rounded bg-canvas-recessed/60 text-ink-primary font-mono text-badge border border-[rgba(13,37,61,0.06)]">
                    LaTeX Math Extraction
                  </span>
                </div>

                <div className="pt-4 border-t border-[rgba(13,37,61,0.08)] flex justify-between items-center text-xs">
                  <span className="text-ink-secondary font-mono">Audio / Video NLP</span>
                  <Link
                    href="/products/course-note-taker"
                    className="font-semibold text-accent-500 hover:text-accent-600 inline-flex items-center gap-1 group"
                  >
                    <span>Explore Note-Taker</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </article>

            {/* Bento Card 3: Community Chat Digest (Span 5 — Community Badge) */}
            <article
              aria-labelledby="card-chat-digest-title"
              className="md:col-span-5 rounded-3xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] p-8 shadow-sm hover:shadow-md hover:border-accent-500/30 hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded bg-accent-50 text-accent-500 border border-accent-500/20">
                    Community AI
                  </span>
                  <span className="font-mono text-xs text-ink-secondary">
                    Discord & Telegram
                  </span>
                </div>
                <h3 id="card-chat-digest-title" className="font-display text-2xl sm:text-3xl text-ink-primary font-normal">
                  Community Chat Digest
                </h3>
                <p className="text-sm text-ink-body leading-relaxed">
                  Condense thousands of unread Slack, Discord, and Telegram messages into structured executive briefings and actionable task lists.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="px-2 py-1 rounded bg-canvas-recessed/60 text-ink-primary font-mono text-badge border border-[rgba(13,37,61,0.06)]">
                    Batch Deduplication
                  </span>
                  <span className="px-2 py-1 rounded bg-canvas-recessed/60 text-ink-primary font-mono text-badge border border-[rgba(13,37,61,0.06)]">
                    Action Item Webhooks
                  </span>
                </div>

                <div className="pt-4 border-t border-[rgba(13,37,61,0.08)] flex justify-between items-center text-xs">
                  <span className="text-ink-secondary font-mono">Slack / Telegram Sync</span>
                  <Link
                    href="/products/chat-digest"
                    className="font-semibold text-accent-500 hover:text-accent-600 inline-flex items-center gap-1 group"
                  >
                    <span>Explore Digest</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </article>

            {/* Bento Card 4: Smart Dainik News (Span 7 — Sage Regional Badge) */}
            <article
              aria-labelledby="card-smart-dainik-title"
              className="md:col-span-7 rounded-3xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] p-8 md:p-10 shadow-sm hover:shadow-md hover:border-accent-500/30 hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded bg-sage-100 text-accent-secondary border border-sage-300/40">
                    Regional Intelligence
                  </span>
                  <span className="font-mono text-xs text-accent-500 font-semibold">
                    Hindi & English NLP
                  </span>
                </div>
                <h3 id="card-smart-dainik-title" className="font-display text-3xl sm:text-4xl text-ink-primary font-normal">
                  Smart Dainik News
                </h3>
                <p className="text-base text-ink-body leading-relaxed max-w-lg">
                  Hyper-local, noise-filtered regional news intelligence clustered by topic, sentiment, and civic impact across Hindi and English regional feeds.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded bg-canvas-recessed/60 text-ink-primary font-mono text-badge border border-[rgba(13,37,61,0.06)]">
                    Gazette & Policy Matcher
                  </span>
                  <span className="px-2.5 py-1 rounded bg-canvas-recessed/60 text-ink-primary font-mono text-badge border border-[rgba(13,37,61,0.06)]">
                    Civic Impact Filters
                  </span>
                  <span className="px-2.5 py-1 rounded bg-canvas-recessed/60 text-ink-primary font-mono text-badge border border-[rgba(13,37,61,0.06)]">
                    Vernacular Feeds
                  </span>
                </div>

                <div className="pt-4 border-t border-[rgba(13,37,61,0.08)] flex justify-between items-center text-xs">
                  <span className="text-ink-secondary font-mono">Public Employment Alerts</span>
                  <Link
                    href="/products/smart-dainik-news"
                    className="font-semibold text-accent-500 hover:text-accent-600 inline-flex items-center gap-1 group"
                  >
                    <span>Explore News Feed</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </Container>
      </AnimatedSection>

      {/* =========================================================================
          SECTION 4: CONNECTED 3-STAGE EXECUTION PIPELINE
          ========================================================================= */}
      <section className="py-20 md:py-28 bg-canvas-paper border-y border-[rgba(13,37,61,0.08)]">
        <Container size="default">
          <ConnectedPipelineRail />
        </Container>
      </section>

      {/* =========================================================================
          SECTION 5: ARCHITECTURAL SPEC MATRIX
          ========================================================================= */}
      <AnimatedSection className="py-20 md:py-28 bg-canvas-base">
        <Container size="default">
          <ArchitecturalSpecMatrix />
        </Container>
      </AnimatedSection>

      {/* =========================================================================
          SECTION 6: AI SKILL MISSION & YOUTH ENABLEMENT
          ========================================================================= */}
      <SkillMissionSection />

      {/* =========================================================================
          SECTION 7: EDITORIAL PULL-QUOTE (Large Serif Manifesto)
          ========================================================================= */}
      <section className="relative py-24 md:py-32 bg-canvas-paper border-y border-[rgba(13,37,61,0.08)] overflow-hidden">
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

            <p className="font-display text-3xl sm:text-4xl md:text-5xl text-ink-primary italic font-normal leading-snug relative z-10 max-w-2xl mx-auto text-pretty">
              “We don’t build generic chatbots that guess. We engineer high-precision deterministic tools that do one job exceptionally well.”
            </p>

            <div className="pt-2 relative z-10 space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-canvas-recessed/60 border border-[rgba(13,37,61,0.08)] text-xs font-mono font-medium text-ink-primary mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-500" />
                <span>NorAI Engineering Philosophy</span>
              </div>
              <p className="text-sm font-semibold text-ink-primary">Core Engineering Team</p>
              <p className="text-xs text-ink-secondary">Engineered in Uttar Pradesh, India</p>
            </div>
          </div>

          {/* Bottom Hairline Gradient Divider */}
          <div className="hairline-divider-gradient mt-12" aria-hidden="true" />
        </Container>
      </section>

      {/* =========================================================================
          SECTION 8: PRE-FOOTER HIGH-CONVERSION BANNER
          ========================================================================= */}
      <aside aria-label="Get started" role="complementary" className="py-20 md:py-28 bg-canvas-base">
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
      </aside>
    </div>
  );
}