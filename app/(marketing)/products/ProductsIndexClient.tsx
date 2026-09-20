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
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Layers,
  Zap,
  Terminal,
  Activity,
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
    accent: 'var(--mint)',
    badgeBg: 'bg-[var(--mint)]/15',
    badgeText: 'text-[var(--mint-ink)]',
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
    accent: 'var(--lavender)',
    badgeBg: 'bg-[var(--lavender)]/25',
    badgeText: 'text-[#4e3a8c]',
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
    accent: 'var(--coral)',
    badgeBg: 'bg-[var(--coral)]/20',
    badgeText: 'text-[#b83818]',
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
    accent: 'var(--sky)',
    badgeBg: 'bg-[var(--sky)]/25',
    badgeText: 'text-[#16656e]',
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

  const activeTool: CatalogToolItem = (filteredTools.find((t) => t.slug === selectedSlug) || filteredTools[0] || CATALOG_TOOLS[0]) as CatalogToolItem;

  const ActiveIcon = ICON_MAP[activeTool.slug] || Layers;

  return (
    <div className="min-h-screen font-sans bg-[#f5f5f0] text-[var(--pine)] selection:bg-[var(--mint)] selection:text-[var(--pine)]">
      {/* HERO CHAMBER */}
      <section className="relative pt-12 pb-14 sm:pt-20 sm:pb-20 overflow-hidden border-b border-[var(--line)]">
        <div className="aurora__orb -top-32 -left-20 w-[450px] h-[450px] bg-[var(--mint)]/15" aria-hidden="true" />
        <div className="aurora__orb -top-20 right-0 w-[500px] h-[500px] bg-[var(--lavender)]/12" aria-hidden="true" />

        <Container size="default" className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-6 text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[var(--mint-ink)] font-bold tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-[var(--mint-ink)] animate-pulse" aria-hidden="true" />
              <span>— APPLIED R&D & PROTOTYPES · PILLAR 04</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[var(--pine)] leading-[1.04] tracking-[-0.03em]">
              Four applied tools. <br />
              <span className="relative inline-block text-[var(--mint-ink)]">
                Built to solve real problems.
                <svg
                  className="absolute -bottom-2 sm:-bottom-3 left-0 w-full h-3 sm:h-4 text-[var(--mint)]"
                  viewBox="0 0 240 40"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d="M3 33C50 12 150 5 237 22" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-[var(--pine)]/80 leading-relaxed max-w-2xl font-normal text-pretty">
              Living proof of our Research & Innovation pillar. Functional applications developed by our engineering practice and student cohorts to solve operational, academic, and civic friction.
            </p>

            <div className="pt-2 flex flex-wrap gap-3 text-xs font-mono text-[var(--pine)]">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fffdf7] border border-[var(--line)]">
                <ShieldCheck className="w-4 h-4 text-[var(--mint-ink)]" />
                <span>Zero Cold-Storage Retention</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fffdf7] border border-[var(--line)]">
                <Zap className="w-4 h-4 text-[var(--mint-ink)]" />
                <span>Sub-Second Vector Execution</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fffdf7] border border-[var(--line)]">
                <Terminal className="w-4 h-4 text-[var(--mint-ink)]" />
                <span>REST API &amp; Web UI Ready</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* THE KINETIC SLIDING TOOL DECK & TELEMETRY WORKBENCH */}
      <section className="py-14 sm:py-20 border-b border-[var(--line)]">
        <Container size="wide" className="max-w-[1240px] mx-auto px-4 sm:px-6">
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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Precision Monospace Tool Ledger */}
            <div className="lg:col-span-5 space-y-3">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--mint-ink)] font-bold block mb-3">
                SELECT INSTRUMENT (01–04)
              </span>

              <div className="space-y-2">
                {filteredTools.map((tool) => {
                  const isSelected = tool.slug === activeTool.slug;
                  const Icon = ICON_MAP[tool.slug] || Layers;

                  return (
                    <div
                      key={tool.slug}
                      onClick={() => setSelectedSlug(tool.slug)}
                      onMouseEnter={() => setSelectedSlug(tool.slug)}
                      className={cn(
                        'p-5 rounded-2xl transition-all duration-200 cursor-pointer text-left border relative overflow-hidden group',
                        isSelected
                          ? 'bg-[#072929] text-[#f5f5f0] border-transparent shadow-xl ring-1 ring-white/15'
                          : 'bg-[#fffdf7] text-[var(--pine)] border-[var(--line)] hover:border-[var(--pine)]/30 hover:bg-[#fffdf7]/90',
                      )}
                    >
                      {isSelected && (
                        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#00E599]" />
                      )}

                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              'w-10 h-10 rounded-xl flex items-center justify-center transition-colors border',
                              isSelected
                                ? 'bg-white/10 text-[#00E599] border-white/10'
                                : 'bg-[var(--porcelain)] text-[var(--pine)] border-[var(--line)]',
                            )}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold text-[#00E599]">
                                {tool.number}
                              </span>
                              <h3
                                className={cn(
                                  'font-display text-lg font-bold tracking-tight',
                                  isSelected ? 'text-white' : 'text-[var(--pine)]',
                                )}
                              >
                                {tool.title}
                              </h3>
                            </div>
                            <span
                              className={cn(
                                'text-[11px] font-mono tracking-wide',
                                isSelected ? 'text-[var(--bone-70)]' : 'text-[var(--pine)]/60',
                              )}
                            >
                              {tool.category}
                            </span>
                          </div>
                        </div>

                        <span
                          className={cn(
                            'font-mono text-[11px] px-2.5 py-1 rounded-full border whitespace-nowrap',
                            isSelected
                              ? 'bg-[#00E599]/15 text-[#00E599] border-[#00E599]/30'
                              : 'bg-[var(--pine-08)] text-[var(--pine)] border-[var(--line)]',
                          )}
                        >
                          {tool.metric}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Dynamic Live Telemetry Workbench Stage */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTool.slug}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  className="rounded-3xl bg-[#072929] border border-white/15 p-6 sm:p-9 text-[#f5f5f0] shadow-2xl relative overflow-hidden"
                >
                  <div
                    className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{
                      backgroundImage: 'radial-gradient(circle, #00E599 1px, transparent 1px)',
                      backgroundSize: '24px 24px',
                    }}
                    aria-hidden="true"
                  />

                  <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/15 pb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-[#00E599]/15 border border-[#00E599]/30 flex items-center justify-center text-[#00E599]">
                        <ActiveIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-[#00E599]">
                            ACTIVE CONSOLE
                          </span>
                          <span className="w-2 h-2 rounded-full bg-[#00E599] animate-pulse" />
                        </div>
                        <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                          {activeTool.title}
                        </h2>
                      </div>
                    </div>

                    <span className="font-mono text-xs font-semibold px-3 py-1 rounded-full bg-[#00E599]/20 text-[#00E599] border border-[#00E599]/30">
                      {activeTool.metric}
                    </span>
                  </div>

                  <p className="relative z-10 text-sm sm:text-base text-[var(--bone-70)] leading-relaxed mt-4 font-normal">
                    {activeTool.tagline}
                  </p>

                  <div className="relative z-10 my-6 rounded-2xl bg-black/40 border border-white/10 p-5 font-mono text-xs space-y-3">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[11px] text-[var(--bone-70)]">
                      <span className="flex items-center gap-1.5 text-[#00E599]">
                        <Activity className="w-3.5 h-3.5" />
                        <span>RUNTIME TELEMETRY STREAM</span>
                      </span>
                      <span>IN-MEMORY · 0 BYTES EGRESS</span>
                    </div>

                    <div className="space-y-1 text-xs">
                      <div className="text-[var(--bone-70)]">
                        <span className="text-[#FFAE42]">SOURCE:</span> {activeTool.telemetryStream.inputSample}
                      </div>
                      <div className="text-[var(--bone-70)]">
                        <span className="text-[#00E599]">ENGINE:</span> {activeTool.telemetryStream.engine}
                      </div>
                      <div className="text-[#00E599] font-semibold">
                        STATUS: {activeTool.telemetryStream.stat}
                      </div>
                    </div>

                    <pre className="p-3.5 rounded-xl bg-black/60 border border-white/10 text-[#00E599] text-[11px] leading-relaxed overflow-x-auto whitespace-pre font-mono">
                      {activeTool.telemetryStream.snippet}
                    </pre>
                  </div>

                  <div className="relative z-10 space-y-2 border-t border-white/15 pt-4">
                    {activeTool.highlights.map((point, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--bone-70)]">
                        <CheckCircle2 className="w-4 h-4 text-[#00E599] shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>

                  <div className="relative z-10 pt-6 mt-6 border-t border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <span className="font-mono text-xs text-[var(--bone-70)]">
                      Starter Tier · 50 sandbox credits
                    </span>

                    <Link
                      href={'/products/' + activeTool.slug}
                      className="bg-[#00E599] hover:bg-[#1ef4b4] text-[#072929] font-bold h-11 px-6 rounded-full inline-flex items-center gap-2 shadow-[0_10px_25px_-5px_rgba(0,229,153,0.4)] transition-all duration-200 active:scale-95"
                      data-testid={
                        activeTool.slug === 'resume-shortlister'
                          ? 'capability-link-resume-shortlister'
                          : undefined
                      }
                    >
                      <span>Launch Tool</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
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
          <div
            className="rounded-[32px] p-8 sm:p-14 text-center shadow-2xl relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #FF7755 0%, #FFAE42 40%, #00E599 100%)',
            }}
          >
            <div className="max-w-3xl mx-auto space-y-6 text-[#072929]">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#072929]/10 text-xs font-mono font-bold uppercase tracking-wider">
                — HIGH-VOLUME &amp; PRIVATE VPC HOSTING
              </div>

              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                Need dedicated endpoints or private VPC hosting?
              </h2>

              <p className="text-base sm:text-lg opacity-90 max-w-2xl mx-auto leading-relaxed font-medium">
                All four tools provide dedicated REST API endpoints, custom latency SLAs, and air-gapped
                Docker/Helm containers running inside your private VPC with zero external training egress.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact?service=enterprise-capacity"
                  className="w-full sm:w-auto h-12 px-8 rounded-full bg-[#072929] hover:bg-[#0c3c3c] text-white font-bold text-sm inline-flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all"
                >
                  <span>Talk to an engineer</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/services"
                  className="w-full sm:w-auto h-12 px-7 rounded-full bg-white/40 hover:bg-white/60 backdrop-blur-md border border-white/40 text-[#072929] font-bold text-sm inline-flex items-center justify-center transition-all"
                >
                  <span>Explore Deliverables →</span>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
