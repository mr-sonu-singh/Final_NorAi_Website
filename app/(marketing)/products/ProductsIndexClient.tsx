'use client';

import React, { useState } from 'react';
import { Container } from '@/components/foundation/Container';
import { Link } from '@/components/atoms/Link';
import {
  FileText,
  Headphones,
  MessageSquare,
  Newspaper,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CatalogToolItem {
  number: string;
  slug: string;
  title: string;
  category: string;
  tagline: string;
  metric: string;
  inputFormat: string;
  outputFormat: string;
  highlights: string[];
  accent: string;
  badgeBg: string;
  badgeText: string;
}

export const CATALOG_TOOLS: CatalogToolItem[] = [
  {
    number: '01',
    slug: 'resume-shortlister',
    title: 'AI Resume Shortlister',
    category: 'Recruitment AI',
    tagline:
      'Screen hundreds of engineering resumes in seconds with sub-second vector scoring and weighted skills matching.',
    metric: '< 0.35s / PDF',
    inputFormat: 'PDF, DOCX, TXT',
    outputFormat: 'Ranked Scorecard & Validated JSON',
    highlights: [
      'Multi-format resume parsing with zero permanent storage',
      'Custom skill vector weighting and experience thresholds',
      'ATS-compatible structured JSON export',
    ],
    accent: 'var(--mint)',
    badgeBg: 'bg-[var(--mint)]/15',
    badgeText: 'text-[var(--mint-ink)]',
  },
  {
    number: '02',
    slug: 'course-note-taker',
    title: 'Course Note-Taker',
    category: 'EdTech & Study AI',
    tagline:
      'Transform raw lecture recordings, videos, and slide decks into executive study notes and interactive flashcards.',
    metric: 'Real-Time Audio NLP',
    inputFormat: 'MP3, WAV, MP4, YouTube',
    outputFormat: 'Markdown, Notion & SRS Flashcards',
    highlights: [
      'LaTeX math formula extraction and rendering',
      'Interactive 3D study flashcards with spaced repetition',
      '100% free scholar access for students',
    ],
    accent: 'var(--lavender)',
    badgeBg: 'bg-[var(--lavender)]/25',
    badgeText: 'text-[#4e3a8c]',
  },
  {
    number: '03',
    slug: 'chat-digest',
    title: 'Community Chat Digest',
    category: 'Community AI',
    tagline:
      'Condense thousands of unread Slack, Discord, and Telegram team messages into structured executive decisions.',
    metric: '4,820 msgs ➔ 3 points',
    inputFormat: 'Slack, Discord, TG exports',
    outputFormat: 'Chronological Decisions & Action Items',
    highlights: [
      'Noise filtering with thread deduplication & priority scoring',
      'Action item extraction with assignees and dead-ends flagged',
      'Executive 3-bullet morning dispatch generation',
    ],
    accent: 'var(--coral)',
    badgeBg: 'bg-[var(--coral)]/20',
    badgeText: 'text-[#b83818]',
  },
  {
    number: '04',
    slug: 'smart-dainik-news',
    title: 'Smart Dainik News',
    category: 'Regional Intelligence',
    tagline:
      'Hyper-local regional news and public employment alerts clustered across Hindi and English feeds.',
    metric: 'Bilingual Feeds (EN/HI)',
    inputFormat: 'UP Gazette, Regional Wires, RSS',
    outputFormat: 'Verified Employment Alerts',
    highlights: [
      'Bi-directional Hindi/English public notification parsing',
      'Official UP public service commission alert verification',
      'Zero advertising clutter or clickbait filtering',
    ],
    accent: 'var(--sky)',
    badgeBg: 'bg-[var(--sky)]/25',
    badgeText: 'text-[#16656e]',
  },
];

const CATEGORIES = [
  'All',
  'Recruitment AI',
  'EdTech & Study AI',
  'Community AI',
  'Regional Intelligence',
];

const ICON_MAP: Record<string, React.ElementType> = {
  'resume-shortlister': FileText,
  'course-note-taker': Headphones,
  'chat-digest': MessageSquare,
  'smart-dainik-news': Newspaper,
};

export function ProductsIndexClient() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredTools =
    activeCategory === 'All'
      ? CATALOG_TOOLS
      : CATALOG_TOOLS.filter((t) => t.category === activeCategory);

  return (
    <div className="min-h-screen font-sans bg-[#f5f5f0] text-[var(--pine)] selection:bg-[var(--mint)] selection:text-[var(--pine)]">
      {/* =========================================================================
          HERO CHAMBER (.phero)
          Aurora glow orbs + kinetic display headline + system guarantees
          ========================================================================= */}
      <section className="relative pt-12 pb-14 sm:pt-20 sm:pb-20 overflow-hidden border-b border-[var(--line)]">
        {/* Soft Organic Aurora Glow Orbs */}
        <div
          className="aurora__orb -top-32 -left-20 w-[450px] h-[450px] bg-[var(--mint)]/15"
          aria-hidden="true"
        />
        <div
          className="aurora__orb -top-20 right-0 w-[500px] h-[500px] bg-[var(--lavender)]/12"
          aria-hidden="true"
        />

        <Container size="default" className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-6 text-left">
            {/* Monospace Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--pine-08)] border border-[var(--line)] text-xs font-mono text-[var(--pine)]">
              <span className="w-2 h-2 rounded-full bg-[var(--mint-ink)] animate-pulse" aria-hidden="true" />
              <span className="tracking-wide uppercase font-medium">
                01 · CAPABILITIES INDEX · SINGLE-PURPOSE SOVEREIGN TOOLS
              </span>
            </div>

            {/* Kinetic Display Headline */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[var(--pine)] leading-[1.04] tracking-tight">
              Four tools. <br />
              <span className="relative inline-block text-[var(--mint-ink)]">
                Each solves one problem.
                <svg
                  className="absolute -bottom-2 sm:-bottom-3 left-0 w-full h-3 sm:h-4 text-[var(--mint)]"
                  viewBox="0 0 240 40"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 33C50 12 150 5 237 22"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-[var(--pine)]/80 leading-relaxed max-w-2xl font-normal text-pretty">
              Autonomous micro-SaaS utilities engineered for high-volume operational workflows. No
              complex onboarding, zero permanent data retention, and instant in-memory execution.
            </p>

            {/* Hardware & Privacy Guarantees */}
            <div className="pt-2 flex flex-wrap gap-3 text-xs font-mono text-[var(--pine)]">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fffdf7] border border-[var(--line)] shadow-xs">
                <ShieldCheck className="w-4 h-4 text-[var(--mint-ink)]" />
                <span>Zero Permanent Data Retention</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fffdf7] border border-[var(--line)] shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-[var(--mint-ink)]" />
                <span>Sub-Second Vector Execution</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fffdf7] border border-[var(--line)] shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-[var(--mint-ink)]" />
                <span>REST API &amp; Web UI Ready</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          CATEGORY FILTER RAIL & CATALOG STAGE
          Audens tactile cards with number badges, specs, and Open Tool actions
          ========================================================================= */}
      <section className="py-14 sm:py-20 border-b border-[var(--line)]">
        <Container size="wide" className="max-w-[1240px] mx-auto px-4 sm:px-6">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none" role="tablist">
            {CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    'px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-all duration-200 whitespace-nowrap cursor-pointer active:scale-[0.98]',
                    isSelected
                      ? 'bg-[var(--pine)] text-[#f5f5f0] shadow-sm font-semibold'
                      : 'bg-[#fffdf7] text-[var(--pine)]/80 hover:bg-[var(--bone)] border border-[var(--line)]',
                  )}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Catalog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {filteredTools.map((tool) => {
              const Icon = ICON_MAP[tool.slug] || Sparkles;
              return (
                <div
                  key={tool.slug}
                  className="group rounded-[22px] bg-[#fffdf7] border border-[var(--line)] p-7 sm:p-9 flex flex-col justify-between space-y-7 shadow-xs hover:shadow-xl hover:border-[var(--pine)]/30 transition-[transform,box-shadow,border-color] duration-300"
                >
                  <div className="space-y-6">
                    {/* Header: Monospace Number + Category Pill + Metric */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-[var(--porcelain)] flex items-center justify-center text-[var(--pine)] group-hover:scale-105 transition-transform duration-200 border border-[var(--line)]">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="font-mono text-xs text-[var(--pine)]/60 font-semibold tracking-wider block">
                            TOOL {tool.number}
                          </span>
                          <span
                            className={cn(
                              'inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide uppercase',
                              tool.badgeBg,
                              tool.badgeText,
                            )}
                          >
                            {tool.category}
                          </span>
                        </div>
                      </div>

                      <span className="font-mono text-xs font-semibold px-3 py-1 rounded-full bg-[var(--pine-08)] text-[var(--pine)] border border-[var(--line)]">
                        {tool.metric}
                      </span>
                    </div>

                    {/* Title & Tagline */}
                    <div>
                      <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[var(--pine)] tracking-tight">
                        {tool.title}
                      </h2>
                      <p className="text-sm sm:text-base text-[var(--pine)]/75 leading-relaxed mt-2 font-normal">
                        {tool.tagline}
                      </p>
                    </div>

                    {/* Highlights List */}
                    <div className="space-y-2 pt-4 border-t border-[var(--line)]">
                      {tool.highlights.map((point, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--pine)]/85">
                          <CheckCircle2 className="w-4 h-4 text-[var(--mint-ink)] shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>

                    {/* Technical Specs Strip */}
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-3 border-t border-[var(--line)]">
                      <div className="p-3 rounded-xl bg-[var(--porcelain)] border border-[var(--line)]">
                        <span className="text-[10px] text-[var(--pine)]/50 uppercase tracking-wider block font-semibold">
                          INPUT
                        </span>
                        <span className="text-[var(--pine)] text-xs font-medium mt-0.5 block truncate">
                          {tool.inputFormat}
                        </span>
                      </div>
                      <div className="p-3 rounded-xl bg-[var(--porcelain)] border border-[var(--line)]">
                        <span className="text-[10px] text-[var(--pine)]/50 uppercase tracking-wider block font-semibold">
                          OUTPUT
                        </span>
                        <span className="text-[var(--pine)] text-xs font-medium mt-0.5 block truncate">
                          {tool.outputFormat}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Action */}
                  <div className="pt-4 flex items-center justify-between border-t border-[var(--line)]">
                    <span className="font-mono text-xs text-[var(--pine)]/60">
                      Free to start · 50 sandbox credits
                    </span>
                    <Link
                      href={`/products/${tool.slug}`}
                      className="btn btn--mint h-10 px-5 text-xs font-semibold shadow-xs"
                      data-testid={
                        tool.slug === 'resume-shortlister'
                          ? 'capability-link-resume-shortlister'
                          : undefined
                      }
                    >
                      <span>Open Tool</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          CLOSING CONIC DISPATCH (.gradient-card)
          High-voltage rotating conic gradient border enclosing enterprise callout
          ========================================================================= */}
      <section className="py-16 sm:py-24">
        <Container size="default" className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="gradient-card max-w-4xl mx-auto text-center">
            <div className="gradient-card__inner p-8 sm:p-12 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--mint)]/20 border border-[var(--mint-ink)]/20 text-xs font-mono font-bold text-[var(--mint-ink)] dark:text-[var(--mint)] uppercase tracking-wider">
                High-Volume Capacity &amp; Private Deployments
              </div>

              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--pine)] dark:text-[var(--bone)] tracking-tight leading-tight">
                Need dedicated endpoints or private VPC hosting?
              </h2>

              <p className="text-base sm:text-lg text-[var(--pine)]/75 dark:text-[var(--bone-70)] max-w-2xl mx-auto leading-relaxed font-normal">
                All four tools provide dedicated REST API endpoints, custom latency SLAs, and air-gapped
                Docker/Helm containers running inside your private VPC with zero external training egress.
              </p>

              <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact?service=enterprise-capacity"
                  className="btn btn--solid w-full sm:w-auto h-12 px-7 text-sm font-semibold shadow-md"
                >
                  <span>Talk to an engineer</span>
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/services"
                  className="btn btn--ghost w-full sm:w-auto h-12 px-6 text-sm font-medium"
                >
                  <span>Explore Deliverables &rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
