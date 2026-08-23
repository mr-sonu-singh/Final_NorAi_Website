'use client';

import React from 'react';
import { Container } from '@/components/foundation/Container';
import { Button } from '@/components/atoms/Button';
import { Link } from '@/components/atoms/Link';
import { AnimatedSection } from '@/components/foundation/AnimatedSection';
import { MeshGradient } from '@/components/atoms/MeshGradient';
import {
  ArrowRight,
  FileText,
  Headphones,
  MessageSquare,
  Newspaper,
  ShieldCheck,
  Clock,
  Coins,
  ChevronRight,
  ExternalLink,
  Layers,
} from 'lucide-react';


export default function HomePage() {


  return (
    <div className="text-ink-primary min-h-screen font-sans selection:bg-accent-500 selection:text-white">
      {/* =========================================================================
          SECTION 1: HERO (Layout 1: Editorial Full-Bleed)
          ========================================================================= */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-canvas-base">
        {/* Warm Mesh Gradient Background */}
        <MeshGradient intensity="medium" />

        <Container size="default" className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6 text-left">
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[rgba(194,85,58,0.2)] bg-canvas-paper/80 backdrop-blur-sm text-accent-500 text-xs font-semibold">
                <span>NorAI Autonomous Operations</span>
              </div>


              {/* Headline in Instrument Serif */}
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-normal text-ink-primary leading-[1.05] tracking-tight">
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
              <div className="pt-4 flex items-center gap-6 text-xs text-ink-secondary">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-accent-secondary" />
                  <span>Encrypted data isolation</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-accent-secondary" />
                  <span>&lt; 2hr response SLA</span>
                </div>
              </div>
            </div>

            {/* Right Product Demo Card: Interactive Candidate Shortlisting Card */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-lg rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] p-6 shadow-xl backdrop-blur-sm">
                {/* Demo Card Header */}
                <div className="flex items-center justify-between border-b border-[rgba(13,37,61,0.08)] pb-4 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-accent-50 flex items-center justify-center text-accent-500 font-semibold text-sm">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-ink-primary">AI Resume Shortlister</h3>
                      <p className="text-xs text-ink-secondary">Live Candidate Screening Batch #104</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-accent-secondary-soft text-accent-secondary text-xs font-semibold">
                    Processing Complete
                  </span>
                </div>

                {/* Candidate Demo Rows */}
                <div className="space-y-3">
                  <div className="rounded-xl border border-[rgba(194,85,58,0.25)] bg-[#FAF5F0] p-3.5 transition-all">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-ink-primary">Aditya Verma</span>
                          <span className="px-2 py-0.2 rounded bg-accent-50 text-accent-500 text-[11px] font-bold">
                            96% Match
                          </span>
                        </div>
                        <p className="text-xs text-ink-body mt-0.5">Senior Backend Engineer • 5 yrs exp</p>
                      </div>
                      <span className="text-xs font-semibold text-accent-secondary bg-accent-secondary-soft px-2 py-0.5 rounded">
                        Top Candidate
                      </span>
                    </div>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      <span className="px-2 py-0.5 rounded bg-canvas-paper border border-[rgba(13,37,61,0.08)] text-[11px] text-ink-body">
                        Python / FastAPI
                      </span>
                      <span className="px-2 py-0.5 rounded bg-canvas-paper border border-[rgba(13,37,61,0.08)] text-[11px] text-ink-body">
                        PostgreSQL
                      </span>
                      <span className="px-2 py-0.5 rounded bg-canvas-paper border border-[rgba(13,37,61,0.08)] text-[11px] text-ink-body">
                        Distributed Systems
                      </span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-[rgba(13,37,61,0.08)] bg-canvas-paper p-3.5 opacity-90">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-ink-primary">Neha Kulkarni</span>
                          <span className="px-2 py-0.2 rounded bg-canvas-recessed text-ink-body text-[11px] font-medium">
                            84% Match
                          </span>
                        </div>
                        <p className="text-xs text-ink-secondary mt-0.5">Full Stack Developer • 3 yrs exp</p>
                      </div>
                      <span className="text-xs text-ink-secondary">Shortlisted</span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-[rgba(13,37,61,0.08)] bg-canvas-paper p-3.5 opacity-70">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-ink-primary">Rohit Sen</span>
                          <span className="px-2 py-0.2 rounded bg-canvas-recessed text-ink-body text-[11px] font-medium">
                            71% Match
                          </span>
                        </div>
                        <p className="text-xs text-ink-secondary mt-0.5">Frontend Engineer • 2 yrs exp</p>
                      </div>
                      <span className="text-xs text-ink-secondary">Review Queue</span>
                    </div>
                  </div>
                </div>

                {/* Card Footer Bar */}
                <div className="mt-4 pt-3 border-t border-[rgba(13,37,61,0.08)] flex items-center justify-between text-xs text-ink-secondary">
                  <span>142 resumes parsed in 8.4s</span>
                  <Link href="/products/ai-resume-shortlister" className="text-accent-500 font-semibold hover:underline flex items-center gap-1">
                    <span>Try shortlister</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 2: SOCIAL PROOF / TRUST STRIP (Layout 6: Marquee / Trust Strip)
          ========================================================================= */}
      <section className="py-6 border-y border-[rgba(13,37,61,0.08)] bg-canvas-recessed">
        <Container size="default">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-accent-secondary" />
              <p className="text-sm font-medium text-ink-primary">
                Trusted by teams, campuses, and operators across India.
              </p>
            </div>
            <div className="flex items-center gap-8 text-xs font-medium text-ink-secondary">
              <span>Sub-second latency</span>
              <span aria-hidden="true">·</span>
              <span>Deterministic outputs</span>
              <span aria-hidden="true">·</span>
              <span>Zero data retention</span>
            </div>

          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 3: PRODUCT SUITE (Layout 3: Asymmetric Bento)
          ========================================================================= */}
      <AnimatedSection className="py-20 md:py-28 bg-canvas-base">
        <Container size="default">
          <div className="max-w-2xl mb-14 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-primary-soft text-accent-primary text-xs font-semibold mb-4">
              Micro-SaaS Tools
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-normal text-ink-primary leading-tight tracking-tight">
              Four tools. Each solves one problem.
            </h2>
            <p className="mt-3 text-lg text-ink-body leading-relaxed">
              No bloated platform agreements or multi-month rollout cycles. Deploy modular tools designed to solve specific bottlenecks instantly.
            </p>
          </div>

          {/* Bento Grid: 2/3 Flagship + 1/3 Stacked */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* 2/3 Width Flagship Card: AI Resume Shortlister */}
            <div className="lg:col-span-7 rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] p-8 md:p-10 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-accent-50 text-accent-500 flex items-center justify-center">
                    <FileText className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-accent-50 text-accent-500 text-xs font-semibold">
                    Flagship Tool
                  </span>
                </div>
                <h3 className="font-display text-2xl md:text-3xl text-ink-primary font-normal">
                  AI Resume Shortlister
                </h3>
                <p className="mt-3 text-base text-ink-body leading-relaxed">
                  Parse, score, and rank hundreds of applicant resumes against your exact job description in seconds. Extracts verified skills, calculates job match percentages, and outputs structured candidate dossiers.
                </p>

                {/* Monolinear SVG Illustration / Flow Indicator */}
                <div className="my-8 rounded-xl bg-canvas-recessed/60 p-5 border border-[rgba(13,37,61,0.08)]">
                  <div className="grid grid-cols-3 gap-3 text-center text-xs font-medium text-ink-primary">
                    <div className="p-3 rounded-lg bg-canvas-paper border border-[rgba(13,37,61,0.08)]">
                      <span className="block text-accent-500 font-bold mb-1">01. Bulk Upload</span>
                      <span className="text-ink-secondary text-[11px]">PDF, DOCX Resumes</span>
                    </div>
                    <div className="p-3 rounded-lg bg-canvas-paper border border-[rgba(13,37,61,0.08)]">
                      <span className="block text-accent-secondary font-bold mb-1">02. Neural Match</span>
                      <span className="text-ink-secondary text-[11px]">Skill & Exp Extraction</span>
                    </div>
                    <div className="p-3 rounded-lg bg-canvas-paper border border-[rgba(13,37,61,0.08)]">
                      <span className="block text-accent-tertiary font-bold mb-1">03. Ranked Table</span>
                      <span className="text-ink-secondary text-[11px]">Export to ATS / CSV</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[rgba(13,37,61,0.08)] flex items-center justify-between">
                <span className="text-xs font-semibold text-accent-secondary">Used by 25+ recruitment teams</span>
                <Link href="/products/ai-resume-shortlister">
                  <Button variant="primary" size="md">
                    <span>Try Shortlister</span>
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* 1/3 Width Stacked Column: 3 Micro-tools */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Tool 2: Course Note-Taker */}
              <div className="rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] p-6 shadow-sm hover:shadow-md transition-all flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-accent-secondary-soft text-accent-secondary flex items-center justify-center">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display text-lg text-ink-primary font-normal">Course Note-Taker</h4>
                    <span className="text-xs text-ink-secondary">EdTech & Knowledge Extraction</span>
                  </div>
                </div>
                <p className="text-sm text-ink-body leading-relaxed">
                  Transform raw audio recordings, lecture videos, and lecture decks into structured summaries, mind maps, and flashcards.
                </p>
                <div className="mt-4 pt-3 border-t border-[rgba(13,37,61,0.08)] flex justify-end">
                  <Link href="/products/course-note-taker" className="text-xs font-semibold text-accent-500 hover:underline flex items-center gap-1">
                    <span>Explore note-taker</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Tool 3: Community Chat Digest */}
              <div className="rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] p-6 shadow-sm hover:shadow-md transition-all flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-accent-tertiary-soft text-accent-tertiary flex items-center justify-center">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display text-lg text-ink-primary font-normal">Community Chat Digest</h4>
                    <span className="text-xs text-ink-secondary">Community & Support AI</span>
                  </div>
                </div>
                <p className="text-sm text-ink-body leading-relaxed">
                  Condense noisy Discord, Telegram, and Slack channels into daily executive briefs highlighting key bug reports and user sentiment.
                </p>
                <div className="mt-4 pt-3 border-t border-[rgba(13,37,61,0.08)] flex justify-end">
                  <Link href="/products/community-chat-digest" className="text-xs font-semibold text-accent-500 hover:underline flex items-center gap-1">
                    <span>Explore digest</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Tool 4: Smart Dainik News */}
              <div className="rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] p-6 shadow-sm hover:shadow-md transition-all flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-accent-50 text-accent-500 flex items-center justify-center">
                    <Newspaper className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display text-lg text-ink-primary font-normal">Smart Dainik News</h4>
                    <span className="text-xs text-ink-secondary">Regional Intelligence</span>
                  </div>
                </div>
                <p className="text-sm text-ink-body leading-relaxed">
                  Curated regional news intelligence and sentiment filtering powered by multilingual neural translation models.
                </p>
                <div className="mt-4 pt-3 border-t border-[rgba(13,37,61,0.08)] flex justify-end">
                  <Link href="/products/smart-dainik-news" className="text-xs font-semibold text-accent-500 hover:underline flex items-center gap-1">
                    <span>Explore news feed</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </AnimatedSection>

      {/* =========================================================================
          SECTION 4: HOW IT WORKS (Layout 4: Sticky Scroll Story)
          ========================================================================= */}
      <section className="py-20 md:py-28 bg-canvas-paper border-y border-[rgba(13,37,61,0.08)]">
        <Container size="default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Sticky Narrative Column */}
            <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-secondary-soft text-accent-secondary text-xs font-semibold">
                Execution Workflow
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-normal text-ink-primary leading-tight tracking-tight">
                Simple integration. <br />
                Instant execution.
              </h2>
              <p className="text-base md:text-lg text-ink-body leading-relaxed">
                Connect via browser dashboard or standard REST API endpoints. You supply the raw data stream; NorAI executes the inference and delivers clean, structured JSON.
              </p>
              <div className="pt-4">
                <Link href="/docs">
                  <Button variant="secondary" size="md">
                    <span>View API Documentation</span>
                    <ExternalLink className="w-4 h-4 ml-1.5" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Scrolling Step Cards */}
            <div className="lg:col-span-7 space-y-8">
              {/* Step 1 */}
              <div className="rounded-2xl bg-canvas-base border border-[rgba(13,37,61,0.12)] p-8 shadow-sm">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="w-8 h-8 rounded-full bg-accent-50 text-accent-500 font-display text-lg font-bold flex items-center justify-center">
                    1
                  </span>
                  <span className="text-xs font-semibold text-ink-secondary">Ingest stage</span>
                </div>
                <h3 className="font-display text-2xl text-ink-primary font-normal">
                  Connect your raw data source
                </h3>
                <p className="mt-2 text-sm text-ink-body leading-relaxed">
                  Upload candidate PDFs, stream podcast audio files, or connect your webhook channels directly through our developer console.
                </p>
                <div className="mt-4 rounded-lg bg-canvas-paper border border-[rgba(13,37,61,0.08)] p-3.5 font-mono text-xs text-ink-body">
                  POST https://api.norai.tech/v1/shortlist/ingest
                </div>
              </div>

              {/* Step 2 */}
              <div className="rounded-2xl bg-canvas-base border border-[rgba(13,37,61,0.12)] p-8 shadow-sm">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="w-8 h-8 rounded-full bg-accent-secondary-soft text-accent-secondary font-display text-lg font-bold flex items-center justify-center">
                    2
                  </span>
                  <span className="text-xs font-semibold text-ink-secondary">Processing stage</span>
                </div>
                <h3 className="font-display text-2xl text-ink-primary font-normal">
                  Deterministic neural pipeline execution
                </h3>
                <p className="mt-2 text-sm text-ink-body leading-relaxed">
                  Our low-latency models parse unstructured text, match against custom criteria, and execute confidence scoring with zero hallucination.
                </p>
                <div className="mt-4 rounded-lg bg-canvas-paper border border-[rgba(13,37,61,0.08)] p-3.5 font-mono text-xs text-accent-secondary">
                  Latency: 142ms • Status: 200 OK • Confidence: 0.98
                </div>
              </div>

              {/* Step 3 */}
              <div className="rounded-2xl bg-canvas-base border border-[rgba(13,37,61,0.12)] p-8 shadow-sm">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="w-8 h-8 rounded-full bg-accent-tertiary-soft text-accent-tertiary font-display text-lg font-bold flex items-center justify-center">
                    3
                  </span>
                  <span className="text-xs font-semibold text-ink-secondary">Delivery stage</span>
                </div>
                <h3 className="font-display text-2xl text-ink-primary font-normal">
                  Consume structured output
                </h3>
                <p className="mt-2 text-sm text-ink-body leading-relaxed">
                  Receive structured JSON data into your database, view executive dashboards in real time, or sync directly into your existing CRM/ATS.
                </p>
                <div className="mt-4 rounded-lg bg-canvas-paper border border-[rgba(13,37,61,0.08)] p-3.5 font-mono text-xs text-ink-body">
                  {`{ "ranked_candidates": 142, "top_match_id": "cand_8471" }`}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 5: WHY NORAI (Layout 2: Alternating Offset)
          ========================================================================= */}
      <AnimatedSection className="py-20 md:py-28 bg-canvas-base">
        <Container size="default">
          <div className="max-w-2xl mb-16 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-primary-soft text-accent-primary text-xs font-semibold mb-4">
              Architecture & Guarantees
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-normal text-ink-primary leading-tight tracking-tight">
              The boring stuff that matters.
            </h2>
            <p className="mt-3 text-lg text-ink-body leading-relaxed">
              We skip the decorative hype and build reliable infrastructure: fast inference, strict privacy guarantees, and clean unit economics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <div className="rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] p-8 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-accent-50 text-accent-500 flex items-center justify-center mb-5">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-display text-2xl text-ink-primary font-normal">Sub-Second Execution</h3>

              <p className="mt-2 text-sm text-ink-body leading-relaxed">
                Optimized serverless edge inference ensures your users never stare at loading spinners. Operations execute with sub-second response times.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] p-8 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-accent-secondary-soft text-accent-secondary flex items-center justify-center mb-5">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-display text-2xl text-ink-primary font-normal">Data Privacy & Security</h3>
              <p className="mt-2 text-sm text-ink-body leading-relaxed">
                Your organizational data is never pooled, retained, or utilized to train public foundational models. Complete data isolation by design.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] p-8 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-accent-tertiary-soft text-accent-tertiary flex items-center justify-center mb-5">
                <Coins className="w-5 h-5" />
              </div>
              <h3 className="font-display text-2xl text-ink-primary font-normal">Predictable Unit Economics</h3>
              <p className="mt-2 text-sm text-ink-body leading-relaxed">
                Transparent flat subscriptions and predictable volume tiers. Pay only for the workload you process, with zero surprise token bills.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] p-8 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-accent-50 text-accent-500 flex items-center justify-center mb-5">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-display text-2xl text-ink-primary font-normal">Direct Engineering Access</h3>
              <p className="mt-2 text-sm text-ink-body leading-relaxed">
                Direct Slack and email access to the engineers who built the system. No tier-1 support tickets or multi-day resolution delays.
              </p>
            </div>
          </div>
        </Container>
      </AnimatedSection>

      {/* =========================================================================
          SECTION 6: EDITORIAL PULL-QUOTE (Layout 5: Large Serif Quote)
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