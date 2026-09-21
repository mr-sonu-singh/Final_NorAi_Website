'use client';

import React, { useState } from 'react';
import { Container } from '@/components/foundation/Container';
import { Link } from '@/components/atoms/Link';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileText,
  Headphones,
  MessageSquare,
  Newspaper,
  CheckCircle2,
  ArrowRight,
  Layers,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SubpageHeroAtmosphere } from '@/components/organisms';

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
  telemetryStream: {
    inputSample: string;
    engine: string;
    stat: string;
    snippet: string;
  };
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
    accent: '#38BDF8',
    badgeBg: 'bg-[#38BDF8]/15',
    badgeText: 'text-[#38BDF8]',
    telemetryStream: {
      inputSample: '540 Engineering Resumes (Batch #0482)',
      engine: 'pgvector In-Memory Cosine Similarity',
      stat: '0.28s Execution · 94.2% Relevance Match',
      snippet: '{\n  "candidate_id": "eng-7402",\n  "score": 0.942,\n  "skills_matched": ["Rust", "Distributed Systems", "vLLM"],\n  "verdict": "SHORTLIST_STAGE_1"\n}',
    },
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
      'Academic access for students & researchers',
    ],
    accent: '#7a5cff',
    badgeBg: 'bg-[#7a5cff]/20',
    badgeText: 'text-[#7a5cff]',
    telemetryStream: {
      inputSample: 'Stanford CS229 Lecture Audio (1hr 42m)',
      engine: 'Whisper-v3 Transient Streaming + KaTeX Parser',
      stat: '42 LaTeX Equations Extracted · 0 Storage Retained',
      snippet: '## Gradient Descent Optimization\n$$\\nabla f(\\theta) = \\frac{1}{m} \\sum_{i=1}^m (h_\\theta(x^{(i)}) - y^{(i)}) x_j^{(i)}$$\n- Verified: Converges in 14 iterations\n- SRS Flashcard #12 generated',
    },
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
    accent: '#ffa24d',
    badgeBg: 'bg-[#ffa24d]/20',
    badgeText: 'text-[#ffa24d]',
    telemetryStream: {
      inputSample: '4,820 unread team messages (#core-dev, #general)',
      engine: 'Deterministic Graph Cluster & Action Extractor',
      stat: '96.4% Noise Rejected · 3 Key Decisions Extracted',
      snippet: '• Decision 01: PR #892 merged to main; API v2 deployed\n• Decision 02: Database migration scheduled for 02:00 UTC\n• Action Item: @sonu to sign off on WebGPU shader telemetry',
    },
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
    accent: '#00e5ff',
    badgeBg: 'bg-[#00e5ff]/20',
    badgeText: 'text-[#00e5ff]',
    telemetryStream: {
      inputSample: 'UP State Gazette Official PDF & 12 Regional Wires',
      engine: 'Bilingual Hindi-English Cross-Modal Parser',
      stat: '100% Verified Public Source · 0 Ads · Zero Clickbait',
      snippet: 'सूचना: उत्तर प्रदेश लोक सेवा आयोग भर्ती अधिसूचना 2026\n[Verified UPPSC Dispatch #4902 · Eligibility: B.Tech / B.Sc]\nDirect Application Portal: Active (Closes 30 Sep)',
    },
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
  const [selectedSlug, setSelectedSlug] = useState('resume-shortlister');

  const filteredTools =
    activeCategory === 'All'
      ? CATALOG_TOOLS
      : CATALOG_TOOLS.filter((t) => t.category === activeCategory);

  const activeTool: CatalogToolItem = (filteredTools.find((t) => t.slug === selectedSlug) ||
    filteredTools[0] ||
    CATALOG_TOOLS[0]) as CatalogToolItem;

  const ActiveIcon = ICON_MAP[activeTool.slug] || Layers;

  return (
    <div className="min-h-screen font-sans bg-[#f5f5f0] dark:bg-[#060919] text-[var(--pine)] dark:text-[#F4F6FC] selection:bg-[#B278E3]/30 selection:text-[#060919]">
      {/* CINEMATIC HERO CHAMBER WITH CYBERNETIC OBSERVATION DECK BACKDROP */}
      <section className="relative min-h-[65vh] lg:min-h-[72vh] flex flex-col justify-center overflow-hidden bg-[#060919] text-[#F4F6FC] border-b border-white/10 pt-28 pb-16 sm:pt-36 sm:pb-24">
        <SubpageHeroAtmosphere
          imageSrc="/images/bg-products-cyberdeck.webp"
          imageAlt="Cybernetic Observation Deck overlooking Aurora Horizon"
          imagePosition="object-cover object-[75%_center] md:object-[80%_center]"
          glowGradient="radial-gradient(ellipse 60% 40% at 75% 60%, rgba(30,244,180,0.22), transparent 70%), radial-gradient(ellipse 50% 50% at 20% 30%, rgba(122,92,255,0.20), transparent 70%)"
        />

        <Container size="default" className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-6 text-left">
            {/* Bold Unified Display Headline */}
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold text-white leading-[1.04] tracking-[-0.035em]">
              Four applied tools.{' '}
              <span className="text-[#38BDF8]">Built to solve real problems.</span>
            </h1>

            <p className="text-lg sm:text-xl text-[#A8B6D8] leading-relaxed max-w-2xl font-normal text-pretty">
              Living proof of our Research &amp; Innovation pillar. Functional applications developed by our engineering practice and student cohorts to solve operational, academic, and civic friction.
            </p>
          </div>
        </Container>
      </section>

      {/* KINETIC TOOL DECK & TELEMETRY WORKBENCH */}
      <section className="py-14 sm:py-24 border-b border-[var(--line)]">
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
                  onClick={() => {
                    setActiveCategory(cat);
                    const match =
                      cat === 'All'
                        ? CATALOG_TOOLS[0]
                        : CATALOG_TOOLS.find((t) => t.category === cat);
                    if (match) setSelectedSlug(match.slug);
                  }}
                  className={cn(
                    'px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer active:scale-[0.98]',
                    isSelected
                      ? 'bg-[#38BDF8] text-[#060919] shadow-sm font-bold'
                      : 'bg-[#fffdf7] dark:bg-white/5 text-[var(--pine)] dark:text-white/80 hover:bg-[var(--bone)] border border-[var(--line)]'
                  )}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Interactive Tool Ledger with Spring Pill */}
            <div className="lg:col-span-5 space-y-3 text-left">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--mint-ink)] dark:text-[#38BDF8] font-bold block mb-3">
                SELECT INSTRUMENT (01–04)
              </span>

              <div className="space-y-2.5">
                {filteredTools.map((tool) => {
                  const isSelected = tool.slug === activeTool.slug;
                  const Icon = ICON_MAP[tool.slug] || Layers;

                  return (
                    <button
                      key={tool.slug}
                      type="button"
                      onClick={() => setSelectedSlug(tool.slug)}
                      onMouseEnter={() => setSelectedSlug(tool.slug)}
                      className={cn(
                        'w-full p-5 rounded-2xl transition-all duration-200 cursor-pointer text-left border relative overflow-hidden group block',
                        isSelected
                          ? 'bg-[#060919] text-white border-white/20 shadow-xl ring-1 ring-white/15'
                          : 'bg-[#fffdf7] dark:bg-[#0D1226]/50 text-[var(--pine)] dark:text-white border-[var(--line)] hover:border-[#B278E3]/40 hover:bg-[#fffdf7]/90'
                      )}
                    >
                      {/* Spring-Animated Active Indicator Pill */}
                      {isSelected && (
                        <motion.div
                          layoutId="active-tool-pill"
                          className="absolute inset-0 bg-gradient-to-r from-[#38BDF8]/10 to-transparent pointer-events-none"
                          transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                        />
                      )}



                      <div className="relative z-10 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              'w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-200 border',
                              isSelected
                                ? 'bg-white/10 text-white border-white/10'
                                : 'bg-[var(--porcelain)] dark:bg-white/5 text-[var(--pine)] dark:text-white border-[var(--line)] group-hover:scale-105'
                            )}
                            style={isSelected ? { color: tool.accent } : undefined}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span
                                className="font-mono text-xs font-bold"
                                style={{ color: tool.accent }}
                              >
                                {tool.number}
                              </span>
                              <h3
                                className={cn(
                                  'font-display text-base sm:text-lg font-bold tracking-tight',
                                  isSelected ? 'text-white' : 'text-[var(--pine)] dark:text-white'
                                )}
                              >
                                {tool.title}
                              </h3>
                            </div>
                            <span className="text-[11px] font-mono tracking-wide text-[var(--pine)]/60 dark:text-white/60">
                              {tool.category}
                            </span>
                          </div>
                        </div>

                        <ArrowRight className={cn("w-4 h-4 transition-transform group-hover:translate-x-1", isSelected ? "text-white" : "text-[var(--pine)]/40 dark:text-white/40")} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Dynamic Tool Detail Workbench */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTool.slug}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-3xl bg-[#060919] border border-white/15 p-6 sm:p-9 text-[#f5f5f0] shadow-2xl relative overflow-hidden text-left"
                >
                  <div className="relative z-10 flex items-center justify-between border-b border-white/15 pb-5">
                    <div className="flex items-center gap-3.5">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center border shrink-0"
                        style={{
                          background: `${activeTool.accent}15`,
                          borderColor: `${activeTool.accent}30`,
                          color: activeTool.accent,
                        }}
                      >
                        <ActiveIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-xs font-mono text-[#A8B6D8] block">
                          {activeTool.category}
                        </span>
                        <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                          {activeTool.title}
                        </h2>
                      </div>
                    </div>

                    <Link
                      href={'/products/' + activeTool.slug}
                      className="bg-[#D4C5F9] hover:bg-[#E4CEF7] text-[#03091E] font-semibold text-xs sm:text-sm h-10 px-5 rounded-xl inline-flex items-center gap-2 transition-all duration-200 active:scale-95 group shadow-sm"
                      data-testid={
                        activeTool.slug === 'resume-shortlister'
                          ? 'capability-link-resume-shortlister'
                          : undefined
                      }
                    >
                      <span>Launch Prototype</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  </div>

                  <p className="relative z-10 text-sm sm:text-base text-[#A8B6D8] leading-relaxed mt-5 font-normal">
                    {activeTool.tagline}
                  </p>

                  {/* Core Capabilities Checklist */}
                  <div className="relative z-10 space-y-3 py-6">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-white/50 font-semibold">
                      Validated Capabilities:
                    </h3>
                    <div className="space-y-2.5">
                      {activeTool.highlights.map((point, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/90">
                          <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Clean Input & Output Contract Specs */}
                  <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/10 text-xs font-mono">
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-white/50 block text-[11px] mb-1">ACCEPTED INPUT</span>
                      <span className="text-white font-medium">{activeTool.inputFormat}</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-white/50 block text-[11px] mb-1">GENERATED OUTPUT</span>
                      <span className="text-[#38BDF8] font-medium">{activeTool.outputFormat}</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Container>
      </section>

      {/* CLOSING DISPATCH */}
      <section className="py-16 sm:py-24">
        <Container size="default" className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="rounded-[32px] p-8 sm:p-14 text-center shadow-2xl relative overflow-hidden bg-[#060919] border border-white/15 text-[#F4F6FC]">
            <div
              className="absolute -top-24 -right-24 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none opacity-20"
              style={{ background: '#7C3AED' }}
              aria-hidden="true"
            />
            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Need a private custom prototype in production?
              </h2>

              <p className="text-base sm:text-lg max-w-xl mx-auto font-normal text-[#A8B6D8] leading-relaxed">
                We take prototypes from isolated sandboxes into enterprise environments with private VPC isolation and custom model fine-tuning.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="h-12 px-8 rounded-xl bg-[#38BDF8] hover:bg-[#E4CEF7] text-[#060919] font-bold text-sm shadow-lg shadow-[#D4C5F9]/20 transition-all duration-200 active:scale-[0.98] inline-flex items-center gap-2"
                >
                  <span>Request Custom Tool Prototype</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
