import React from 'react';
import { Container } from '@/components/foundation/Container';
import { Button } from '@/components/atoms/Button';
import { Link } from '@/components/atoms/Link';
import { AnimatedSection } from '@/components/foundation/AnimatedSection';
import { MeshGradient } from '@/components/atoms/MeshGradient';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Zap,
  Lock,
  FileCheck,
  MapPin,
} from 'lucide-react';
import {
  CandidateScreenerWorkbench,
  ArchitecturalSpecMatrix,
  ConnectedPipelineRail,
  SkillMissionSection,
} from '@/components/organisms';

export default function HomePage() {
  return (
    <div className="text-ink-primary min-h-screen font-sans selection:bg-accent-500 selection:text-white">
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

              {/* Headline in Instrument Serif */}
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-ink-primary leading-[1.02] tracking-tight">
                Your operations, <br />
                <span className="italic text-accent-500 font-normal">on autopilot.</span>
              </h1>

              {/* Body in Plus Jakarta Sans */}
              <p className="text-lg md:text-xl text-ink-body font-normal leading-relaxed max-w-xl">
                Four purpose-built AI tools engineered to eliminate manual operational drag. Screen candidates in <span className="font-mono tabular-nums font-semibold text-ink-primary">&lt; 0.35s</span>, extract lecture intelligence, summarize community chats, and digest regional news with verifiable JSON precision.
              </p>

              {/* Single Primary Terracotta CTA + Secondary with 5-State Ergonomics */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
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

              {/* SLA / Trust Badges */}
              <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-ink-secondary">
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
          SECTION 2: TRUST & TELEMETRY STRIP (Social Proof & Live SLAs)
          ========================================================================= */}
      <section className="py-5 border-y border-[rgba(13,37,61,0.08)] bg-canvas-paper/60 backdrop-blur-sm">
        <Container size="default">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 text-xs text-ink-secondary">
            <span className="font-medium text-ink-primary text-center lg:text-left">
              Trusted by engineering teams, hiring managers, and regional operators across India.
            </span>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-mono text-[11px] tabular-nums">
              <span className="inline-flex items-center gap-1.5 text-ink-primary font-medium">
                <Zap className="w-3.5 h-3.5 text-accent-500" />
                &lt; 0.35s parser latency
              </span>
              <span className="text-[rgba(13,37,61,0.2)]" aria-hidden="true">•</span>
              <span className="inline-flex items-center gap-1.5 text-ink-primary font-medium">
                <FileCheck className="w-3.5 h-3.5 text-accent-secondary" />
                Deterministic JSON schemas
              </span>
              <span className="text-[rgba(13,37,61,0.2)]" aria-hidden="true">•</span>
              <span className="inline-flex items-center gap-1.5 text-ink-primary font-medium">
                <Lock className="w-3.5 h-3.5 text-accent-secondary" />
                Zero data retention
              </span>
              <span className="text-[rgba(13,37,61,0.2)]" aria-hidden="true">•</span>
              <span className="inline-flex items-center gap-1.5 text-ink-primary font-medium">
                <MapPin className="w-3.5 h-3.5 text-accent-500" />
                Built in UP, India
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 3: BENTO GRID: FOUR MICRO-SAAS TOOLS
          ========================================================================= */}
      <AnimatedSection className="py-20 md:py-28 bg-canvas-base">
        <Container size="default">
          <div className="max-w-2xl mb-14 text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-50 border border-accent-500/20 text-accent-500 text-xs font-mono font-semibold">
              <span>High-Utility Micro-SaaS</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal text-ink-primary leading-tight tracking-tight">
              Purpose-built tools. <br />
              <span className="italic text-accent-500 font-normal">Zero operational drag.</span>
            </h2>
            <p className="text-base md:text-lg text-ink-body leading-relaxed">
              No bloated all-in-one platforms. Each utility does exactly one operational job with deterministic accuracy, sub-second speed, and ephemeral memory isolation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {/* Bento Card 1: Resume Shortlister (Large Span 7) */}
            <div className="md:col-span-7 rounded-3xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] p-8 md:p-10 shadow-sm hover:shadow-md hover:border-accent-500/30 hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded bg-accent-50 text-accent-500 border border-accent-500/20">
                    Recruitment AI
                  </span>
                  <span className="font-mono tabular-nums text-xs font-semibold px-2 py-0.5 rounded bg-sage-100/70 text-accent-secondary border border-accent-secondary/20">
                    &lt; 0.35s / PDF · Zod Typed
                  </span>
                </div>
                <h3 className="font-display text-3xl sm:text-4xl text-ink-primary font-normal">
                  AI Resume Shortlister
                </h3>
                <p className="text-base text-ink-body leading-relaxed max-w-lg">
                  Screen hundreds of engineering and operations resumes in seconds. Extract verified skills, rank candidates against target job descriptions, and export structured scorecards.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded bg-canvas-recessed/60 text-ink-primary font-mono text-[11px] border border-[rgba(13,37,61,0.06)]">
                    PDF, DOCX & TXT
                  </span>
                  <span className="px-2.5 py-1 rounded bg-canvas-recessed/60 text-ink-primary font-mono text-[11px] border border-[rgba(13,37,61,0.06)]">
                    Skill Vector Weights
                  </span>
                  <span className="px-2.5 py-1 rounded bg-canvas-recessed/60 text-ink-primary font-mono text-[11px] border border-[rgba(13,37,61,0.06)]">
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
            </div>

            {/* Bento Card 2: Course Note-Taker (Span 5) */}
            <div className="md:col-span-5 rounded-3xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] p-8 shadow-sm hover:shadow-md hover:border-accent-500/30 hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded bg-[#fff4d6] text-[#976a08] border border-[#976a08]/20">
                    EdTech AI
                  </span>
                  <span className="font-mono text-xs text-accent-secondary font-semibold">
                    100% Free for Students
                  </span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl text-ink-primary font-normal">
                  AI Course Note-Taker
                </h3>
                <p className="text-sm text-ink-body leading-relaxed">
                  Turn lecture audio, video files, or slide decks into structured chapter outlines, core concept definitions, and interactive flashcards.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="px-2 py-1 rounded bg-canvas-recessed/60 text-ink-primary font-mono text-[11px] border border-[rgba(13,37,61,0.06)]">
                    Audio & Video Input
                  </span>
                  <span className="px-2 py-1 rounded bg-canvas-recessed/60 text-ink-primary font-mono text-[11px] border border-[rgba(13,37,61,0.06)]">
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
            </div>

            {/* Bento Card 3: Community Chat Digest (Span 5) */}
            <div className="md:col-span-5 rounded-3xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] p-8 shadow-sm hover:shadow-md hover:border-accent-500/30 hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded bg-accent-50 text-accent-500 border border-accent-500/20">
                    Community AI
                  </span>
                  <span className="font-mono text-xs text-ink-secondary">
                    Discord & Telegram
                  </span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl text-ink-primary font-normal">
                  Community Chat Digest
                </h3>
                <p className="text-sm text-ink-body leading-relaxed">
                  Condense thousands of unread Slack, Discord, and Telegram messages into structured executive briefings and actionable task lists.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="px-2 py-1 rounded bg-canvas-recessed/60 text-ink-primary font-mono text-[11px] border border-[rgba(13,37,61,0.06)]">
                    Batch Deduplication
                  </span>
                  <span className="px-2 py-1 rounded bg-canvas-recessed/60 text-ink-primary font-mono text-[11px] border border-[rgba(13,37,61,0.06)]">
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
            </div>

            {/* Bento Card 4: Smart Dainik News (Span 7) */}
            <div className="md:col-span-7 rounded-3xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] p-8 md:p-10 shadow-sm hover:shadow-md hover:border-accent-500/30 hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded bg-[#e2ede7] text-accent-secondary border border-accent-secondary/30">
                    Regional Intelligence
                  </span>
                  <span className="font-mono text-xs text-accent-500 font-semibold">
                    Hindi & English NLP
                  </span>
                </div>
                <h3 className="font-display text-3xl sm:text-4xl text-ink-primary font-normal">
                  Smart Dainik News
                </h3>
                <p className="text-base text-ink-body leading-relaxed max-w-lg">
                  Hyper-local, noise-filtered regional news intelligence clustered by topic, sentiment, and civic impact across Hindi and English regional feeds.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded bg-canvas-recessed/60 text-ink-primary font-mono text-[11px] border border-[rgba(13,37,61,0.06)]">
                    Gazette & Policy Matcher
                  </span>
                  <span className="px-2.5 py-1 rounded bg-canvas-recessed/60 text-ink-primary font-mono text-[11px] border border-[rgba(13,37,61,0.06)]">
                    Civic Impact Filters
                  </span>
                  <span className="px-2.5 py-1 rounded bg-canvas-recessed/60 text-ink-primary font-mono text-[11px] border border-[rgba(13,37,61,0.06)]">
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
            </div>
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
      <section className="py-24 md:py-32 bg-canvas-paper border-y border-[rgba(13,37,61,0.08)]">
        <Container size="narrow">
          <div className="text-center space-y-6">
            <p className="font-display text-3xl sm:text-4xl md:text-5xl text-ink-primary italic font-normal leading-snug">
              “We don’t build generic chatbots that guess. We engineer high-precision deterministic tools that do one job exceptionally well.”
            </p>
            <div className="pt-2">
              <p className="text-sm font-semibold text-ink-primary">NorAI Engineering Philosophy</p>
              <p className="text-xs text-ink-secondary">Building from Uttar Pradesh, India</p>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 8: PRE-FOOTER HIGH-CONVERSION BANNER
          ========================================================================= */}
      <section className="py-20 md:py-28 bg-canvas-base">
        <Container size="default">
          <div className="rounded-3xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] p-10 md:p-16 text-center shadow-lg relative overflow-hidden">
            <div className="max-w-2xl mx-auto space-y-6 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-50 border border-accent-500/20 text-accent-500 text-xs font-mono font-semibold">
                <span>Start in Seconds · No Credit Card Required</span>
              </div>

              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal text-ink-primary leading-tight tracking-tight">
                Ready to eliminate <br />
                <span className="italic text-accent-500 font-normal">operational drag?</span>
              </h2>

              <p className="text-base md:text-lg text-ink-body leading-relaxed max-w-xl mx-auto">
                Deploy any of our self-serve tools right now with instant API keys or consult with our core engineering team for custom enterprise VPC workflow scoping.
              </p>

              {/* Dual Action CTAs */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
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

              {/* Trust badges footer */}
              <div className="pt-6 border-t border-[rgba(13,37,61,0.08)] flex flex-wrap items-center justify-center gap-6 text-xs text-ink-secondary">
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
      </section>
    </div>
  );
}