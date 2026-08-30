'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/atoms/Button';
import { Link } from '@/components/atoms/Link';
import {
  FileText,
  Headphones,
  MessageSquare,
  Newspaper,
  ArrowRight,
  Code2,
  Sliders,
  CheckCircle2,
  ShieldCheck,
  Play,
  Pause,
  RotateCw,
  Radio,
  FileCode,
  Copy,
  Check,
} from 'lucide-react';

interface ProductItem {
  id: string;
  slug: string;
  number: string;
  hotkey: string;
  title: string;
  category: string;
  accentColor: string;
  accentBorder: string;
  accentBg: string;
  accentText: string;
  tagline: string;
  metric: string;
  inputFormat: string;
  outputFormat: string;
  icon: React.ElementType;
  cta: string;
  jsonPayload: object;
}

const PRODUCTS: ProductItem[] = [
  {
    id: 'resume-shortlister',
    slug: 'resume-shortlister',
    number: '01',
    hotkey: '1',
    title: 'AI Resume Shortlister',
    category: 'Recruitment AI',
    accentColor: '#C2553A',
    accentBorder: 'border-accent-500',
    accentBg: 'bg-accent-50',
    accentText: 'text-accent-500',
    tagline: 'Screen hundreds of engineering resumes in seconds with sub-second vector scoring.',
    metric: '< 0.35s / PDF',
    inputFormat: 'PDF, DOCX, TXT',
    outputFormat: 'Structured JSON & ATS Scorecard',
    icon: FileText,
    cta: 'Launch Shortlister',
    jsonPayload: {
      candidate_id: 'cand_aditya_verma_96',
      match_score: 0.96,
      verdict: 'SHORTLIST_TIER_1',
      latency_ms: 318,
      verified_skills: [
        { name: 'Distributed Systems', confidence: 0.98, proof: 'Raft consensus implementation in Go' },
        { name: 'High-Concurrency Python', confidence: 0.95, proof: '5+ yrs async FastAPIs & vLLM' },
        { name: 'PostgreSQL Optimization', confidence: 0.92, proof: 'Partitioning & connection pooling' },
      ],
      missing_skills: [],
      data_retention_bytes: 0,
    },
  },
  {
    id: 'course-note-taker',
    slug: 'course-note-taker',
    number: '02',
    hotkey: '2',
    title: 'Course Note-Taker',
    category: 'EdTech & Study AI',
    accentColor: '#B8860B',
    accentBorder: 'border-gold-500',
    accentBg: 'bg-gold-50',
    accentText: 'text-gold-600',
    tagline: 'Transform raw lecture recordings and slide decks into executive study notes and flashcards.',
    metric: 'Real-Time Audio NLP',
    inputFormat: 'MP3, WAV, MP4, YouTube',
    outputFormat: 'Markdown, Notion & Flashcards',
    icon: Headphones,
    cta: 'Explore Note-Taker',
    jsonPayload: {
      lecture_title: 'Distributed Consensus & Raft Protocol',
      duration_seconds: 2535,
      chapters_count: 5,
      core_axioms: [
        'Leader Election via randomized timeouts',
        'Log Replication with strict term matching',
        'State Machine Safety guarantees',
      ],
      latex_equations_extracted: ['\\text{Quorum} = \\lfloor N/2 \\rfloor + 1'],
      export_targets: ['Notion', 'Obsidian', 'Anki'],
    },
  },
  {
    id: 'community-chat-digest',
    slug: 'chat-digest',
    number: '03',
    hotkey: '3',
    title: 'Community Chat Digest',
    category: 'Community AI',
    accentColor: '#5B8A72',
    accentBorder: 'border-accent-secondary',
    accentBg: 'bg-[#e2ede7]',
    accentText: 'text-accent-secondary',
    tagline: 'Condense thousands of unread Discord, Slack, and Telegram messages into structured briefs.',
    metric: '2m Executive Brief',
    inputFormat: 'Slack, Discord, Telegram',
    outputFormat: 'Daily Digest & Task Webhooks',
    icon: MessageSquare,
    cta: 'Try Chat Digest',
    jsonPayload: {
      channel_id: '#engineering-core',
      messages_analyzed: 1482,
      timeframe: '24h',
      cluster_summaries: [
        { topic: 'Redis Cache Sharding', consensus: 'Consistent hashing ring adopted', memory_delta: '-34%' },
        { topic: 'Webhook Retries', consensus: 'Exponential backoff merged to staging', risk: 'Low' },
      ],
      action_items_assigned: 3,
      sentiment_score: 0.88,
    },
  },
  {
    id: 'smart-dainik-news',
    slug: 'smart-dainik-news',
    number: '04',
    hotkey: '4',
    title: 'Smart Dainik News',
    category: 'Regional Intelligence',
    accentColor: '#0D253D',
    accentBorder: 'border-[#0D253D]',
    accentBg: 'bg-canvas-recessed',
    accentText: 'text-ink-primary',
    tagline: 'Hyper-local regional news and public employment alerts clustered across Hindi and English feeds.',
    metric: 'Hindi & English Feeds',
    inputFormat: 'Regional RSS, Wire, Gazette',
    outputFormat: 'Verified Employment Alerts',
    icon: Newspaper,
    cta: 'Explore News Feed',
    jsonPayload: {
      region: 'Uttar Pradesh (Central & Western)',
      active_feed_sources: 14,
      verified_alerts: [
        { id: 'UPPSC_TECH_2026', title: 'UPPSC Technical Recruitment', status: 'VERIFIED_OFFICIAL', deadline: '2026-03-30' },
        { id: 'AGRA_OPTICAL_GRID', title: 'Agra Industrial Optical Upgrade', status: 'INFRASTRUCTURE_CONFIRMED' },
      ],
      bilingual_accuracy: 0.994,
    },
  },
];

function renderJsonValue(valStr?: string): React.ReactNode {
  if (!valStr) return null;
  const trimmed = valStr.trim();
  // String literal
  if (/^".*"[,\s]*$/.test(trimmed)) {
    return <span className="text-[#81C784]">{valStr}</span>;
  }
  // Number
  if (/^-?\d+(\.\d+)?[,\s]*$/.test(trimmed)) {
    return <span className="text-[#38BDF8] font-bold tabular-nums">{valStr}</span>;
  }
  // Boolean or null
  if (/^(true|false|null)[,\s]*$/.test(trimmed)) {
    return <span className="text-[#FBBF24] font-semibold">{valStr}</span>;
  }
  return <span className="text-[rgba(253,251,247,0.7)]">{valStr}</span>;
}

function renderJsonWithSyntaxHighlight(obj: object): React.ReactNode {
  const jsonString = JSON.stringify(obj, null, 2);
  const lines = jsonString.split('\n');
  return (
    <div className="font-mono text-xs leading-relaxed overflow-x-auto text-[#FDFBF7] space-y-0.5">
      {lines.map((line, lIdx) => {
        const keyMatch = line.match(/^(\s*)(".*?")(\s*:\s*)(.*)$/);
        if (keyMatch) {
          const indent = keyMatch[1] ?? '';
          const key = keyMatch[2] ?? '';
          const colon = keyMatch[3] ?? '';
          const value = keyMatch[4] ?? '';
          return (
            <div key={lIdx} className="hover:bg-white/[0.04] px-1.5 py-0.5 rounded transition-colors flex items-start">
              <span className="text-[rgba(253,251,247,0.25)] select-none text-[10px] w-6 inline-block text-right mr-3 shrink-0 tabular-nums pt-0.5">
                {lIdx + 1}
              </span>
              <div className="min-w-0">
                <span className="text-white/40">{indent}</span>
                <span className="text-[#E07A5F] font-semibold">{key}</span>
                <span className="text-[rgba(253,251,247,0.4)]">{colon}</span>
                {renderJsonValue(value)}
              </div>
            </div>
          );
        }
        return (
          <div key={lIdx} className="hover:bg-white/[0.04] px-1.5 py-0.5 rounded transition-colors flex items-start">
            <span className="text-[rgba(253,251,247,0.25)] select-none text-[10px] w-6 inline-block text-right mr-3 shrink-0 tabular-nums pt-0.5">
              {lIdx + 1}
            </span>
            <div className="min-w-0">
              <span className="text-[rgba(253,251,247,0.6)]">{renderJsonValue(line)}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ProductStudio() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [viewMode, setViewMode] = useState<'visual' | 'json'>('visual');
  const [isCopied, setIsCopied] = useState(false);
  const activeProduct = (PRODUCTS[selectedIdx] || PRODUCTS[0]) as ProductItem;

  // Global keyboard shortcuts for 1-4
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['input', 'textarea'].includes((e.target as HTMLElement)?.tagName?.toLowerCase())) {
        return;
      }
      if (e.key === '1') setSelectedIdx(0);
      if (e.key === '2') setSelectedIdx(1);
      if (e.key === '3') setSelectedIdx(2);
      if (e.key === '4') setSelectedIdx(3);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCopyJson = () => {
    navigator.clipboard?.writeText(JSON.stringify(activeProduct.jsonPayload, null, 2));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Tool 1: Resume Screener State
  const [resumeThreshold, setResumeThreshold] = useState(80);

  // Tool 2: Course Note-Taker State
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeCardFlipped, setActiveCardFlipped] = useState(false);

  // Tool 3: Chat Digest State
  const [activeChannel, setActiveChannel] = useState<'#engineering-core' | '#product-sync' | '#infra-alerts'>('#engineering-core');
  const [digestTimeframe, setDigestTimeframe] = useState<'24h' | '7d'>('24h');

  // Tool 4: Smart Dainik State
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  return (
    <section aria-label="Interactive Product Studio" className="w-full text-left font-sans space-y-8">
      {/* =========================================================================
          1. TACTILE 4-CARD HERO COMMAND DOCK (Linear / Raycast Metaphor)
          ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {PRODUCTS.map((prod, idx) => {
          const isSelected = selectedIdx === idx;
          const IconComp = prod.icon;

          return (
            <button
              key={prod.id}
              type="button"
              onClick={() => {
                setSelectedIdx(idx);
                setActiveCardFlipped(false);
              }}
              className={cn(
                'group relative rounded-2xl p-4 sm:p-5 text-left transition-all duration-150 flex flex-col justify-between space-y-3 cursor-pointer outline-none active:scale-[0.98]',
                'focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-page',
                isSelected
                  ? 'bg-canvas-paper shadow-md border border-accent-500/80 -translate-y-0.5'
                  : 'bg-canvas-paper/70 hover:bg-canvas-paper border border-[rgba(13,37,61,0.09)] hover:border-accent-500/35 hover:-translate-y-0.5'
              )}
            >
              {/* Active Indicator Top Bar via Framer Motion */}
              {isSelected && (
                <motion.span
                  layoutId="activeStudioDockIndicator"
                  className="absolute inset-x-0 top-0 h-1 bg-accent-500 rounded-t-2xl z-10"
                  transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                  aria-hidden="true"
                />
              )}

              {/* Card Header: Category + Hotkey Tag */}
              <div className="flex items-center justify-between w-full">
                <span className="font-mono text-[11px] font-semibold text-ink-secondary flex items-center gap-1.5">
                  <span className="text-accent-500 font-bold">{prod.number}</span>
                  <span>·</span>
                  <span>{prod.category}</span>
                </span>
                <kbd className="hidden sm:inline-flex items-center justify-center font-mono text-[10px] px-1.5 py-0.5 rounded bg-canvas-recessed/80 text-ink-secondary border border-[rgba(13,37,61,0.08)] group-hover:text-ink-primary group-hover:border-accent-500/30 transition-colors">
                  {prod.hotkey}
                </kbd>
              </div>

              {/* Card Body: Icon & Title */}
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'w-9 h-9 rounded-xl flex items-center justify-center transition-colors shrink-0',
                    isSelected
                      ? 'bg-accent-500 text-white shadow-xs'
                      : 'bg-canvas-recessed text-ink-primary group-hover:bg-accent-50 group-hover:text-accent-500'
                  )}
                >
                  <IconComp className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-sans text-sm sm:text-base font-semibold text-ink-primary truncate">
                    {prod.title}
                  </h3>
                  <p className="font-mono text-xs text-accent-secondary font-medium tabular-nums truncate">
                    {prod.metric}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* =========================================================================
          2. WIDESCREEN LIVING STAGE CANVAS (Expansive Dual-Pane Console)
          ========================================================================= */}
      <div className="rounded-3xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] shadow-sm overflow-hidden flex flex-col">
        {/* Stage Navigation & Mode Bar */}
        <div className="p-5 sm:p-6 md:p-8 border-b border-[rgba(13,37,61,0.08)] bg-canvas-paper flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-semibold px-2.5 py-0.5 rounded bg-accent-50 text-accent-500 border border-accent-500/20">
                {activeProduct.category}
              </span>
              <span className="font-mono text-xs text-accent-secondary font-medium tabular-nums">
                Latency: {activeProduct.metric}
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-ink-primary font-normal">
              {activeProduct.title}
            </h2>
            <p className="text-sm sm:text-base text-ink-body max-w-2xl text-pretty">
              {activeProduct.tagline}
            </p>
          </div>

          {/* Right Controls: Mode Toggle & Launch CTA */}
          <div className="flex items-center gap-3 shrink-0 self-start md:self-auto">
            <div className="inline-flex p-1 rounded-xl bg-canvas-recessed border border-[rgba(13,37,61,0.08)] text-xs">
              <button
                type="button"
                onClick={() => setViewMode('visual')}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer active:scale-[0.97]',
                  viewMode === 'visual'
                    ? 'bg-canvas-paper text-ink-primary shadow-sm font-semibold'
                    : 'text-ink-secondary hover:text-ink-primary'
                )}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Interactive Simulator</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('json')}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer active:scale-[0.97]',
                  viewMode === 'json'
                    ? 'bg-[#0D253D] text-white shadow-sm font-semibold'
                    : 'text-ink-secondary hover:text-ink-primary'
                )}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>JSON Schema</span>
              </button>
            </div>

            <Link href={`/products/${activeProduct.slug}`}>
              <Button variant="primary" size="md" className="group shadow-sm whitespace-nowrap active:scale-[0.97] transition-transform">
                <span>{activeProduct.cta}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>

        {/* =========================================================================
            3. STAGE CONTENT: VISUAL DEMO VS JSON SCHEMA
            ========================================================================= */}
        <div className="p-6 sm:p-8 md:p-10 bg-canvas-base/40 min-h-[480px] flex flex-col justify-center">
          {viewMode === 'json' ? (
            /* Enhanced JSON Contract Inspector with Syntax Highlighting */
            <div className="rounded-2xl bg-[#0D253D] text-[#FDFBF7] p-6 sm:p-8 font-mono text-xs overflow-x-auto shadow-inner border border-[rgba(253,251,247,0.1)] space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[rgba(253,251,247,0.1)] pb-3 text-ink-secondary text-[11px]">
                <div className="flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-accent-secondary" />
                  <span className="text-white font-semibold">Deterministic Output Contract</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-emerald-300 font-mono">
                    Zod Schema Verified
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[rgba(253,251,247,0.5)] font-mono tabular-nums text-[10px]">
                    {JSON.stringify(activeProduct.jsonPayload).length} bytes · RAM ephemeral
                  </span>

                  <button
                    type="button"
                    onClick={handleCopyJson}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-white text-[11px] font-medium transition-all cursor-pointer active:scale-[0.96]"
                    title="Copy schema JSON to clipboard"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-accent-secondary" />
                        <span>Copy JSON</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {renderJsonWithSyntaxHighlight(activeProduct.jsonPayload)}
            </div>
          ) : (
            /* Visual Interactive Stage */
            <div className="w-full">
              {/* =============================================================
                  TOOL 1: RESUME SHORTLISTER
                  ============================================================= */}
              {activeProduct.id === 'resume-shortlister' && (
                <div className="space-y-6">
                  {/* Interactive Slider Bar */}
                  <div className="rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.1)] p-5 sm:p-6 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <span className="font-mono text-xs font-semibold text-ink-primary block">
                          Candidate Qualification Threshold
                        </span>
                        <span className="text-xs text-ink-secondary">
                          Filter applicant vector scores in real time
                        </span>
                      </div>
                      <span className="font-mono text-base font-bold text-accent-500 bg-accent-50 px-3 py-1 rounded-lg border border-accent-500/20 tabular-nums">
                        ≥ {resumeThreshold}% Match
                      </span>
                    </div>

                    <input
                      type="range"
                      min="60"
                      max="95"
                      value={resumeThreshold}
                      onChange={(e) => setResumeThreshold(Number(e.target.value))}
                      aria-label="Candidate qualification threshold percentage"
                      className="w-full accent-accent-500 cursor-pointer h-2 bg-canvas-recessed rounded-lg"
                    />
                    <div className="flex justify-between font-mono text-[11px] text-ink-secondary">
                      <span>60% (Broad Pool)</span>
                      <span>80% (Recommended)</span>
                      <span>95% (Strict Vector Match)</span>
                    </div>
                  </div>

                  {/* Filtered Candidate Stream */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      {
                        name: 'Aditya Verma',
                        score: 96,
                        role: 'Sr. Backend Engineer',
                        exp: '5 yrs exp',
                        pass: 96 >= resumeThreshold,
                        skills: ['Go', 'Distributed Systems', 'vLLM', 'Postgres'],
                        rationale: 'Exact match on consensus algorithms and high-concurrency API pipelines.',
                      },
                      {
                        name: 'Neha Kulkarni',
                        score: 84,
                        role: 'Full Stack Engineer',
                        exp: '3 yrs exp',
                        pass: 84 >= resumeThreshold,
                        skills: ['Next.js', 'FastAPI', 'Redis', 'TypeScript'],
                        rationale: 'Strong web architecture background; slight gap in vector indexing depth.',
                      },
                      {
                        name: 'Rohit Sen',
                        score: 71,
                        role: 'Frontend Engineer',
                        exp: '2 yrs exp',
                        pass: 71 >= resumeThreshold,
                        skills: ['React', 'Tailwind', 'REST APIs'],
                        rationale: 'Proficient UI builder, lacks backend telemetry experience.',
                      },
                    ].map((cand, cIdx) => (
                      <div
                        key={cIdx}
                        className={cn(
                          'rounded-2xl border p-5 transition-all flex flex-col justify-between space-y-4',
                          cand.pass
                            ? 'bg-canvas-paper border-accent-secondary/50 shadow-sm'
                            : 'bg-canvas-paper/40 border-[rgba(13,37,61,0.06)] opacity-60'
                        )}
                      >
                        <div className="space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h4 className="font-sans font-semibold text-ink-primary text-sm">
                                {cand.name}
                              </h4>
                              <p className="text-xs text-ink-secondary">
                                {cand.role} · {cand.exp}
                              </p>
                            </div>
                            <span
                              className={cn(
                                'font-mono font-bold text-xs px-2.5 py-1 rounded tabular-nums',
                                cand.pass
                                  ? 'bg-accent-50 text-accent-500 border border-accent-500/20'
                                  : 'bg-canvas-recessed text-ink-secondary'
                              )}
                            >
                              {cand.score}%
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {cand.skills.map((s, sIdx) => (
                              <span
                                key={sIdx}
                                className="font-mono text-[10px] px-2 py-0.5 rounded bg-canvas-recessed/80 text-ink-primary border border-[rgba(13,37,61,0.06)]"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Accordion / Rationale */}
                        <div className="pt-3 border-t border-[rgba(13,37,61,0.08)]">
                          <p className="text-xs text-ink-body leading-relaxed">
                            {cand.rationale}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* =============================================================
                  TOOL 2: COURSE NOTE-TAKER
                  ============================================================= */}
              {activeProduct.id === 'course-note-taker' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                  {/* Left: Interactive Lecture Audio Scrubber */}
                  <div className="lg:col-span-6 rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.1)] p-6 shadow-sm space-y-5 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-semibold text-ink-primary flex items-center gap-1.5">
                          <Radio className="w-3.5 h-3.5 text-gold-600 animate-pulse" />
                          <span>Distributed Systems Lecture 08</span>
                        </span>
                        <span className="font-mono text-xs text-accent-secondary font-medium tabular-nums">
                          42:15 Audio Duration
                        </span>
                      </div>

                      {/* Waveform Scrubber Simulation */}
                      <div className="p-4 rounded-xl bg-canvas-recessed/60 border border-[rgba(13,37,61,0.08)] space-y-3">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-ink-primary font-bold">18:32</span>
                          <span className="text-ink-secondary">42:15</span>
                        </div>

                        {/* Bar Waveform */}
                        <div className="flex items-end gap-1 h-12 w-full">
                          {[30, 45, 75, 90, 60, 40, 85, 95, 70, 50, 65, 80, 45, 90, 100, 75, 55, 80, 60, 40, 70, 85, 95, 60, 45, 80, 65].map(
                            (height, barIdx) => (
                              <div
                                key={barIdx}
                                style={{ height: `${height}%` }}
                                className={cn(
                                  'flex-1 rounded-full transition-all',
                                  barIdx <= 13 ? 'bg-gold-600' : 'bg-canvas-recessed hover:bg-gold-600/40'
                                )}
                              />
                            )
                          )}
                        </div>

                        <div className="flex items-center justify-center gap-3 pt-2">
                          <button
                            type="button"
                            onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                            className="p-2.5 rounded-full bg-[#0D253D] text-white hover:bg-accent-500 transition-colors shadow-sm cursor-pointer"
                            aria-label={isPlayingAudio ? 'Pause Lecture Audio' : 'Play Lecture Audio'}
                          >
                            {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-3 rounded-xl bg-canvas-recessed/50 border border-[rgba(13,37,61,0.06)]">
                        <span className="font-semibold text-ink-primary block">LaTeX Extraction</span>
                        <span className="text-ink-secondary text-[11px]">Formula rendering ready</span>
                      </div>
                      <div className="p-3 rounded-xl bg-canvas-recessed/50 border border-[rgba(13,37,61,0.06)]">
                        <span className="font-semibold text-ink-primary block">Notion Sync</span>
                        <span className="text-ink-secondary text-[11px]">1-click page export</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Interactive 3D Study Flashcard */}
                  <div className="lg:col-span-6 rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.1)] p-6 shadow-sm flex flex-col justify-between space-y-4">
                    <div className="flex items-center justify-between border-b border-[rgba(13,37,61,0.08)] pb-3">
                      <span className="font-mono text-xs font-semibold text-ink-primary">
                        Extracted Concept Flashcard
                      </span>
                      <span className="font-mono text-xs text-gold-600 font-medium">
                        Card 03 of 12
                      </span>
                    </div>

                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => setActiveCardFlipped(!activeCardFlipped)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setActiveCardFlipped(!activeCardFlipped);
                        }
                      }}
                      aria-label="Click or press enter to flip study flashcard"
                      className="cursor-pointer min-h-[190px] rounded-2xl bg-canvas-recessed/60 border border-[rgba(13,37,61,0.1)] p-6 text-center flex flex-col items-center justify-center transition-all hover:bg-canvas-recessed/90 space-y-3"
                    >
                      <span className="font-mono text-[11px] text-accent-500 font-semibold flex items-center gap-1.5">
                        <RotateCw className="w-3.5 h-3.5" />
                        <span>CLICK TO FLIP ANSWER</span>
                      </span>

                      {!activeCardFlipped ? (
                        <p className="font-display text-xl sm:text-2xl text-ink-primary font-normal leading-relaxed">
                          Q: What is the primary role of the Leader in the Raft Protocol?
                        </p>
                      ) : (
                        <p className="text-sm text-ink-body leading-relaxed max-w-md">
                          A: The Leader receives all client requests, appends them to its local log, and replicates log entries to follower nodes before committing.
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-xs text-ink-secondary">
                      <span>Syncs to Anki & Obsidian</span>
                      <span className="font-mono font-medium text-ink-primary">100% Free for Students</span>
                    </div>
                  </div>
                </div>
              )}

              {/* =============================================================
                  TOOL 3: COMMUNITY CHAT DIGEST
                  ============================================================= */}
              {activeProduct.id === 'community-chat-digest' && (
                <div className="space-y-6">
                  {/* Channel & Timeframe Filter Strip */}
                  <div className="rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.1)] p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      {(['#engineering-core', '#product-sync', '#infra-alerts'] as const).map((channel) => (
                        <button
                          key={channel}
                          type="button"
                          onClick={() => setActiveChannel(channel)}
                          className={cn(
                            'font-mono text-xs px-3 py-1.5 rounded-xl transition-all cursor-pointer',
                            activeChannel === channel
                              ? 'bg-[#0D253D] text-white shadow-sm font-semibold'
                              : 'bg-canvas-recessed text-ink-secondary hover:text-ink-primary'
                          )}
                        >
                          {channel}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-ink-secondary font-medium">Window:</span>
                      {(['24h', '7d'] as const).map((tf) => (
                        <button
                          key={tf}
                          type="button"
                          onClick={() => setDigestTimeframe(tf)}
                          className={cn(
                            'font-mono text-xs px-2.5 py-1 rounded-lg transition-all cursor-pointer',
                            digestTimeframe === tf
                              ? 'bg-accent-secondary text-white font-bold'
                              : 'text-ink-secondary hover:text-ink-primary'
                          )}
                        >
                          {tf === '24h' ? '24 Hours' : '7 Days'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Clustered Discussion Takeaways */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.1)] p-6 shadow-sm space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-semibold text-accent-secondary">
                          TOPIC CLUSTER 01 · 64 MESSAGES
                        </span>
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-sage-50 text-accent-secondary border border-accent-secondary/20">
                          RESOLVED
                        </span>
                      </div>
                      <h4 className="font-sans font-semibold text-ink-primary text-base">
                        Redis Cache Sharding & Key Partitioning
                      </h4>
                      <p className="text-xs text-ink-body leading-relaxed">
                        Team converged on consistent hashing ring across 6 Redis cluster nodes. Memory footprint reduced by 34% in benchmark tests.
                      </p>
                      <div className="pt-2 border-t border-[rgba(13,37,61,0.08)] flex items-center gap-2 text-[11px] text-ink-secondary">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent-secondary" />
                        <span>Action Item: Merge migration script to staging branch.</span>
                      </div>
                    </div>

                    <div className="rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.1)] p-6 shadow-sm space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-semibold text-accent-500">
                          TOPIC CLUSTER 02 · 41 MESSAGES
                        </span>
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-accent-50 text-accent-500 border border-accent-500/20">
                          IN PROGRESS
                        </span>
                      </div>
                      <h4 className="font-sans font-semibold text-ink-primary text-base">
                        Webhook Retries & Exponential Backoff
                      </h4>
                      <p className="text-xs text-ink-body leading-relaxed">
                        Exponential backoff with jitter proposed for Discord webhook limits. Pull request approved by security team; awaiting release cut.
                      </p>
                      <div className="pt-2 border-t border-[rgba(13,37,61,0.08)] flex items-center gap-2 text-[11px] text-ink-secondary">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent-secondary" />
                        <span>Action Item: Deploy v2.4 hotfix to production by 4 PM.</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* =============================================================
                  TOOL 4: SMART DAINIK NEWS
                  ============================================================= */}
              {activeProduct.id === 'smart-dainik-news' && (
                <div className="space-y-6">
                  {/* Language Toggle Bar */}
                  <div className="rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.1)] p-4 sm:p-5 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-ink-primary">
                        UP Regional Intelligence Feed
                      </span>
                      <span className="font-mono text-xs text-accent-secondary">
                        (14 Feeds Synced)
                      </span>
                    </div>

                    <div className="flex items-center gap-1 bg-canvas-recessed p-1 rounded-xl">
                      <button
                        type="button"
                        onClick={() => setLanguage('en')}
                        className={cn(
                          'font-mono text-xs px-3 py-1 rounded-lg transition-all cursor-pointer',
                          language === 'en'
                            ? 'bg-[#0D253D] text-white font-bold shadow-sm'
                            : 'text-ink-secondary hover:text-ink-primary'
                        )}
                      >
                        English
                      </button>
                      <button
                        type="button"
                        onClick={() => setLanguage('hi')}
                        className={cn(
                          'font-mono text-xs px-3 py-1 rounded-lg transition-all cursor-pointer',
                          language === 'hi'
                            ? 'bg-[#0D253D] text-white font-bold shadow-sm'
                            : 'text-ink-secondary hover:text-ink-primary'
                        )}
                      >
                        हिंदी (Hindi)
                      </button>
                    </div>
                  </div>

                  {/* Gazette & News Notification Stream */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.1)] p-6 shadow-sm space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-accent-50 text-accent-500 border border-accent-500/20">
                          {language === 'en' ? 'GOVT EMPLOYMENT' : 'सरकारी रोजगार'}
                        </span>
                        <span className="font-mono text-xs text-ink-secondary">Deadline: March 30</span>
                      </div>

                      <h4 className="font-sans font-semibold text-ink-primary text-base">
                        {language === 'en'
                          ? 'UPPSC Technical Assistant Notification'
                          : 'UPPSC तकनीकी सहायक भर्ती अधिसूचना'}
                      </h4>

                      <p className="text-xs text-ink-body leading-relaxed">
                        {language === 'en'
                          ? 'Clustered from 4 official gazette releases. Age relaxation criteria and online application forms verified without duplicates.'
                          : '4 आधिकारिक राजपत्र विज्ञप्तियों से संकलित। आयु सीमा में छूट और ऑनलाइन आवेदन लिंक सत्यापित।'}
                      </p>

                      <div className="pt-2 border-t border-[rgba(13,37,61,0.08)] flex justify-between items-center text-xs">
                        <span className="font-mono text-accent-secondary font-medium">✓ Verified Source</span>
                        <span className="font-mono text-accent-500 font-semibold">Eligible Pool: 18–35 Yrs</span>
                      </div>
                    </div>

                    <div className="rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.1)] p-6 shadow-sm space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-sage-50 text-accent-secondary border border-accent-secondary/20">
                          {language === 'en' ? 'INFRASTRUCTURE' : 'अवसंरचना विकास'}
                        </span>
                        <span className="font-mono text-xs text-ink-secondary">Regional Grid</span>
                      </div>

                      <h4 className="font-sans font-semibold text-ink-primary text-base">
                        {language === 'en'
                          ? 'Agra-Lucknow Industrial Optical Fiber Grid'
                          : 'आगरा-लखनऊ औद्योगिक ऑप्टिकल फाइबर ग्रिड विस्तार'}
                      </h4>

                      <p className="text-xs text-ink-body leading-relaxed">
                        {language === 'en'
                          ? 'High-speed data grid expansion reaching Tier-2 district hubs by Q3 2026. Micro-industrial units to gain low-latency internet.'
                          : 'Q3 2026 तक टियर-2 जिला औद्योगिक केंद्रों तक हाई-स्पीड डेटा ग्रिड विस्तार। सूक्ष्म औद्योगिक इकाइयों को उच्च गति इंटरनेट।'}
                      </p>

                      <div className="pt-2 border-t border-[rgba(13,37,61,0.08)] flex justify-between items-center text-xs">
                        <span className="font-mono text-accent-secondary font-medium">✓ Verified Gazette</span>
                        <span className="font-mono text-ink-primary font-medium">Tier-2 Expansion</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* =========================================================================
            4. BOTTOM SPECIFICATION & TELEMETRY STRIP
            ========================================================================= */}
        <div className="p-5 sm:p-6 md:p-8 bg-canvas-paper border-t border-[rgba(13,37,61,0.08)] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-ink-secondary block text-[11px]">Input Support</span>
            <span className="font-mono font-medium text-ink-primary">
              {activeProduct.inputFormat}
            </span>
          </div>
          <div>
            <span className="text-ink-secondary block text-[11px]">Output Delivery</span>
            <span className="font-mono font-medium text-ink-primary">
              {activeProduct.outputFormat}
            </span>
          </div>
          <div>
            <span className="text-ink-secondary block text-[11px]">Execution Speed</span>
            <span className="font-mono font-medium text-accent-500 tabular-nums">
              {activeProduct.metric}
            </span>
          </div>
          <div>
            <span className="text-ink-secondary block text-[11px]">Privacy Guarantee</span>
            <span className="font-mono font-medium text-accent-secondary flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>0 bytes retained</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
