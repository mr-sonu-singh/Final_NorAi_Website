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
} from 'lucide-react';
import {
  CandidateScreenerWorkbench,
  ArchitecturalSpecMatrix,
  ConnectedPipelineRail,
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
              {/* Headline in Instrument Serif */}
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-ink-primary leading-[1.02] tracking-tight">
                Your operations, <br />
                <span className="italic text-accent-500 font-normal">on autopilot.</span>
              </h1>

              {/* Body in Plus Jakarta Sans */}
              <p className="text-lg md:text-xl text-ink-body font-normal leading-relaxed max-w-xl">
                Four purpose-built AI tools engineered to eliminate manual operational drag. Screen candidates, summarize audio, digest community chats, and curate intelligence in seconds.
              </p>

              {/* Single Primary Terracotta CTA + Secondary */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto justify-center group shadow-md">
                    <span>Get in touch</span>
                    <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/products" className="w-full sm:w-auto">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto justify-center">
                    Explore tools
                  </Button>
                </Link>
              </div>

              {/* SLA / Trust Badge */}
              <div className="pt-2 flex items-center gap-6 text-xs text-ink-secondary">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-accent-secondary" />
                  <span>Encrypted data isolation</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-accent-secondary" />
                  <span>&lt; 2hr response SLA</span>
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
          SECTION 2: TRUST STRIP (Social Proof)
          ========================================================================= */}
      <section className="py-6 border-y border-[rgba(13,37,61,0.08)] bg-canvas-paper/50">
        <Container size="default">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-ink-secondary">
            <span className="font-medium text-ink-primary">
              Trusted by teams, campuses, and operators across India.
            </span>
            <div className="flex items-center gap-6 font-mono text-[11px]">
              <span>Sub-second latency</span>
              <span>•</span>
              <span>Deterministic outputs</span>
              <span>•</span>
              <span>Zero data retention</span>
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
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal text-ink-primary leading-tight tracking-tight">
              Purpose-built tools. <br />
              <span className="italic text-accent-500 font-normal">Zero operational drag.</span>
            </h2>
            <p className="text-base md:text-lg text-ink-body leading-relaxed">
              No bloated all-in-one platforms. Each utility does exactly one operational job with deterministic accuracy and sub-second speed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {/* Bento Card 1: Resume Shortlister (Large Span 7) */}
            <div className="md:col-span-7 rounded-3xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] p-8 md:p-10 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded bg-accent-50 text-accent-500 border border-accent-500/20">
                    Recruitment AI
                  </span>
                  <span className="font-mono text-xs text-accent-secondary">
                    &lt; 0.35s / PDF
                  </span>
                </div>
                <h3 className="font-display text-3xl text-ink-primary font-normal">
                  AI Resume Shortlister
                </h3>
                <p className="text-base text-ink-body leading-relaxed max-w-lg">
                  Screen hundreds of engineering and operations resumes in seconds. Extract verified skills, rank candidates against target job descriptions, and export structured scorecards.
                </p>
              </div>

              <div className="pt-4 border-t border-[rgba(13,37,61,0.08)] flex justify-between items-center text-xs">
                <span className="text-ink-secondary">Supports PDF, DOCX & TXT</span>
                <Link href="/products/resume-shortlister" className="font-semibold text-accent-500 hover:text-accent-600 inline-flex items-center gap-1">
                  <span>Try Shortlister</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Bento Card 2: Course Note-Taker (Span 5) */}
            <div className="md:col-span-5 rounded-3xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] p-8 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded bg-accent-50 text-accent-500 border border-accent-500/20">
                    EdTech AI
                  </span>
                </div>
                <h3 className="font-display text-2xl text-ink-primary font-normal">
                  AI Course Note-Taker
                </h3>
                <p className="text-sm text-ink-body leading-relaxed">
                  Turn lecture audio, video files, or slide decks into structured chapter outlines, core concept definitions, and interactive flashcards.
                </p>
              </div>

              <div className="pt-4 border-t border-[rgba(13,37,61,0.08)] flex justify-between items-center text-xs">
                <span className="text-ink-secondary">Audio & Video Input</span>
                <Link href="/products/course-note-taker" className="font-semibold text-accent-500 hover:text-accent-600 inline-flex items-center gap-1">
                  <span>Explore tool</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Bento Card 3: Community Chat Digest (Span 5) */}
            <div className="md:col-span-5 rounded-3xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] p-8 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded bg-accent-50 text-accent-500 border border-accent-500/20">
                    Community AI
                  </span>
                </div>
                <h3 className="font-display text-2xl text-ink-primary font-normal">
                  Community Chat Digest
                </h3>
                <p className="text-sm text-ink-body leading-relaxed">
                  Condense thousands of unread Slack, Discord, and Telegram messages into structured executive briefings and action lists.
                </p>
              </div>

              <div className="pt-4 border-t border-[rgba(13,37,61,0.08)] flex justify-between items-center text-xs">
                <span className="text-ink-secondary">Slack / Telegram Sync</span>
                <Link href="/products/community-chat-digest" className="font-semibold text-accent-500 hover:text-accent-600 inline-flex items-center gap-1">
                  <span>Explore tool</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Bento Card 4: Smart Dainik News (Span 7) */}
            <div className="md:col-span-7 rounded-3xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] p-8 md:p-10 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded bg-accent-50 text-accent-500 border border-accent-500/20">
                    Regional Intelligence
                  </span>
                </div>
                <h3 className="font-display text-3xl text-ink-primary font-normal">
                  Smart Dainik News
                </h3>
                <p className="text-base text-ink-body leading-relaxed max-w-lg">
                  Hyper-local, noise-filtered regional news intelligence clustered by topic, sentiment, and civic impact across Hindi and English regional feeds.
                </p>
              </div>

              <div className="pt-4 border-t border-[rgba(13,37,61,0.08)] flex justify-between items-center text-xs">
                <span className="text-ink-secondary">Vernacular & Wire Feeds</span>
                <Link href="/products/smart-dainik-news" className="font-semibold text-accent-500 hover:text-accent-600 inline-flex items-center gap-1">
                  <span>Explore news feed</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
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
          SECTION 5: ARCHITECTURAL SPEC MATRIX (Replacing 2x2 Feature Cards)
          ========================================================================= */}
      <AnimatedSection className="py-20 md:py-28 bg-canvas-base">
        <Container size="default">
          <ArchitecturalSpecMatrix />
        </Container>
      </AnimatedSection>

      {/* =========================================================================
          SECTION 6: EDITORIAL PULL-QUOTE (Large Serif Manifesto)
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
          SECTION 7: PRE-FOOTER CALL TO ACTION
          ========================================================================= */}
      <section className="py-20 md:py-28 bg-canvas-base">
        <Container size="default">
          <div className="rounded-3xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] p-10 md:p-16 text-center shadow-lg relative overflow-hidden">
            <div className="max-w-2xl mx-auto space-y-6 relative z-10">
              <h2 className="font-display text-4xl md:text-5xl font-normal text-ink-primary leading-tight">
                Ready to automate your operations?
              </h2>
              <p className="text-base md:text-lg text-ink-body leading-relaxed">
                Try any of our self-serve tools right now or connect with our core team for custom enterprise workflow scoping.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto">
                    <span>Talk to our team</span>
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </Link>
                <Link href="/products" className="w-full sm:w-auto">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    View all tools
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}