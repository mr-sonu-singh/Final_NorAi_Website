'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  ShieldCheck,
  Play,
  Pause,
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
    accentColor: '#141C2B',
    accentBorder: 'border-border-strong',
    accentBg: 'bg-surface-panel-subtle',
    accentText: 'text-text-primary',
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

  const handleCopyJson = React.useCallback(() => {
    navigator.clipboard?.writeText(JSON.stringify(activeProduct.jsonPayload, null, 2));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  }, [activeProduct]);

  // Global keyboard shortcuts for 1-4 and c (copy JSON)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['input', 'textarea'].includes((e.target as HTMLElement)?.tagName?.toLowerCase())) {
        return;
      }
      if (e.key === '1') setSelectedIdx(0);
      if (e.key === '2') setSelectedIdx(1);
      if (e.key === '3') setSelectedIdx(2);
      if (e.key === '4') setSelectedIdx(3);
      if (e.key.toLowerCase() === 'c' && viewMode === 'json') {
        handleCopyJson();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode, handleCopyJson]);

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
                'group relative rounded-xl p-4 sm:p-5 text-left transition-all duration-150 flex flex-col justify-between space-y-3 cursor-pointer outline-none active:scale-[0.98]',
                'focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-canvas',
                isSelected
                  ? 'bg-surface-panel border border-border-strong ring-1 ring-border-strong'
                  : 'bg-surface-panel/70 hover:bg-surface-panel border border-border-subtle hover:border-border-strong'
              )}
            >
              {/* Active Indicator Top Bar via Framer Motion */}
              {isSelected && (
                <motion.span
                  layoutId="activeStudioDockIndicator"
                  className="absolute inset-x-0 top-0 h-0.5 bg-accent-primary rounded-t-xl z-10"
                  transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                  aria-hidden="true"
                />
              )}

              {/* Card Header: Category + Hotkey Tag */}
              <div className="flex items-center justify-between w-full">
                <span className="font-mono text-[11px] font-semibold text-text-secondary flex items-center gap-1.5">
                  <span className="text-accent-primary font-bold">{prod.number}</span>
                  <span>·</span>
                  <span>{prod.category}</span>
                </span>
                <kbd className="hidden sm:inline-flex items-center justify-center font-mono text-[10px] px-1.5 py-0.5 rounded bg-surface-panel-subtle text-text-secondary border border-border-subtle group-hover:text-text-primary transition-colors">
                  {prod.hotkey}
                </kbd>
              </div>

              {/* Card Body: Icon & Title */}
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'w-9 h-9 rounded-lg flex items-center justify-center transition-colors shrink-0',
                    isSelected
                      ? 'bg-[#141C2B] text-white shadow-xs'
                      : 'bg-surface-panel-subtle text-text-primary group-hover:bg-accent-primary/10 group-hover:text-accent-primary'
                  )}
                >
                  <IconComp className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-sans text-sm sm:text-base font-semibold text-text-primary truncate">
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
      <div className="rounded-xl bg-surface-panel border border-border-strong overflow-hidden flex flex-col">
        {/* Stage Navigation & Mode Bar */}
        <div className="p-5 sm:p-6 md:p-8 border-b border-border-subtle bg-surface-canvas flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
              <span>{activeProduct.category}</span>
              <span className="text-border-strong select-none">/</span>
              <span className="tabular-nums">Latency: {activeProduct.metric}</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-text-primary font-normal">
              {activeProduct.title}
            </h2>
            <p className="text-sm sm:text-base text-text-secondary max-w-2xl text-pretty">
              {activeProduct.tagline}
            </p>
          </div>

          {/* Right Controls: Mode Toggle & Launch CTA */}
          <div className="flex items-center gap-3 shrink-0 self-start md:self-auto">
            <div className="inline-flex p-1 rounded-lg bg-surface-panel-subtle border border-border-subtle text-xs">
              <button
                type="button"
                onClick={() => setViewMode('visual')}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded font-medium transition-all cursor-pointer active:scale-[0.97]',
                  viewMode === 'visual'
                    ? 'bg-surface-panel text-text-primary shadow-xs font-semibold border border-border-subtle'
                    : 'text-text-secondary hover:text-text-primary'
                )}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Interactive Visual</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('json')}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded font-medium transition-all cursor-pointer active:scale-[0.97]',
                  viewMode === 'json'
                    ? 'bg-[#141C2B] text-white shadow-xs font-semibold'
                    : 'text-text-secondary hover:text-text-primary'
                )}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Verified Schema</span>
              </button>
            </div>

            <Link href={`/products/${activeProduct.slug}`}>
              <Button variant="primary" size="md" className="group whitespace-nowrap active:scale-[0.97] transition-transform cursor-pointer">
                <span>{activeProduct.cta}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>

        {/* =========================================================================
            3. STAGE CONTENT: VISUAL DEMO VS JSON SCHEMA
            ========================================================================= */}
        <div className="p-6 sm:p-8 md:p-10 bg-surface-panel min-h-[480px] flex flex-col justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            {viewMode === 'json' ? (
              /* Enhanced JSON Contract Inspector with Syntax Highlighting */
              <motion.div
                key={`json-${activeProduct.id}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-xl bg-[#111722] text-[#F5F0EA] p-6 sm:p-8 font-mono text-xs overflow-x-auto shadow-inner border border-white/10 space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3 text-white/60 text-[11px]">
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
              </motion.div>
            ) : (
              /* Visual Interactive Stage */
              <motion.div
                key={`visual-${activeProduct.id}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
              >
                {/* =============================================================
                    TOOL 1: RESUME SHORTLISTER

                  ============================================================= */}
              {activeProduct.id === 'resume-shortlister' && (
                <div className="space-y-6">
                  {/* Interactive Slider Bar */}
                  <div className="rounded-xl bg-surface-canvas border border-border-strong p-5 sm:p-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <span className="font-mono text-xs font-semibold text-text-primary block">
                          Candidate Qualification Threshold
                        </span>
                        <span className="text-xs text-text-secondary">
                          Filter applicant vector scores in real time
                        </span>
                      </div>
                      <span className="font-mono text-base font-bold text-accent-primary bg-accent-50 px-3 py-1 rounded-lg border border-accent-primary/20 tabular-nums">
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
                      className="w-full accent-accent-primary cursor-pointer h-2 bg-surface-panel-subtle rounded-lg"
                    />
                    <div className="flex justify-between font-mono text-[11px] text-text-secondary">
                      <span>60% (Broad Pool)</span>
                      <span>80% (Recommended)</span>
                      <span>95% (Strict Vector Match)</span>
                    </div>
                  </div>

                  {/* Filtered Candidate Stream */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      {
                        name: 'Priyanshu Sharma',
                        score: 94,
                        role: 'Sr. Distributed Systems Architect',
                        exp: '6 yrs exp',
                        pass: 94 >= resumeThreshold,
                        skills: ['Go', 'Raft Consensus', 'vLLM', 'Postgres'],
                        rationale: 'Exact match on consensus algorithms, low-latency queues, and high-concurrency API pipelines.',
                      },
                      {
                        name: 'Tanya Nair',
                        score: 88,
                        role: 'Staff ML Inference Engineer',
                        exp: '4 yrs exp',
                        pass: 88 >= resumeThreshold,
                        skills: ['PyTorch', 'Quantization (FP8)', 'CUDA', 'Python'],
                        rationale: 'Deep model optimization and tensor compilation experience. Meets tier-1 inference engineering specs.',
                      },
                      {
                        name: 'Vikram Malhotra',
                        score: 73,
                        role: 'Cloud Infrastructure Engineer',
                        exp: '3 yrs exp',
                        pass: 73 >= resumeThreshold,
                        skills: ['Terraform', 'AWS VPC', 'Kubernetes', 'Docker'],
                        rationale: 'Solid cloud infrastructure foundation, but lacks specialized LLM inference orchestration.',
                      },
                    ].map((cand, cIdx) => (
                      <div
                        key={cIdx}
                        className={cn(
                          'rounded-xl border p-5 transition-all flex flex-col justify-between space-y-4',
                          cand.pass
                            ? 'bg-surface-canvas border-accent-secondary/50 shadow-xs'
                            : 'bg-surface-canvas/40 border-border-subtle opacity-60'
                        )}
                      >
                        <div className="space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h4 className="font-sans font-semibold text-text-primary text-sm">
                                {cand.name}
                              </h4>
                              <p className="text-xs text-text-secondary">
                                {cand.role} · {cand.exp}
                              </p>
                            </div>
                            <span
                              className={cn(
                                'font-mono font-bold text-xs px-2.5 py-1 rounded tabular-nums',
                                cand.pass
                                  ? 'bg-accent-50 text-accent-primary border border-accent-primary/20'
                                  : 'bg-surface-panel-subtle text-text-muted'
                              )}
                            >
                              {cand.score}%
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {cand.skills.map((s, sIdx) => (
                              <span
                                key={sIdx}
                                className="font-mono text-[10px] px-2 py-0.5 rounded bg-surface-panel-subtle text-text-primary border border-border-subtle"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Accordion / Rationale */}
                        <div className="pt-3 border-t border-border-subtle">
                          <p className="text-xs text-text-secondary leading-relaxed">
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
                  <div className="lg:col-span-6 rounded-xl bg-surface-canvas border border-border-strong p-6 space-y-5 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-semibold text-text-primary flex items-center gap-1.5">
                          <Radio className="w-3.5 h-3.5 text-accent-tertiary animate-pulse" />
                          <span>Distributed Systems Lecture 08</span>
                        </span>
                        <span className="font-mono text-xs text-accent-secondary font-medium tabular-nums">
                          42:15 Audio Duration
                        </span>
                      </div>

                      {/* Waveform Scrubber Simulation */}
                      <div className="p-4 rounded-lg bg-surface-panel-subtle/60 border border-border-subtle space-y-3">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-text-primary font-bold">18:32</span>
                          <span className="text-text-secondary">42:15</span>
                        </div>

                        {/* Bar Waveform */}
                        <div className="flex items-end gap-1 h-12 w-full">
                          {[30, 45, 75, 90, 60, 40, 85, 95, 70, 50, 65, 80, 45, 90, 100, 75, 55, 80, 60, 40, 70, 85, 95, 60, 45, 80, 65].map(
                            (height, barIdx) => (
                              <div
                                key={barIdx}
                                style={{ height: isPlayingAudio ? `${Math.max(25, (height + (barIdx % 5) * 10) % 100)}%` : `${height}%` }}
                                className={cn(
                                  'flex-1 rounded-full transition-all',
                                  isPlayingAudio
                                    ? 'bg-accent-primary ' + (barIdx % 4 === 0 ? 'animate-waveform-1' : barIdx % 4 === 1 ? 'animate-waveform-2' : barIdx % 4 === 2 ? 'animate-waveform-3' : 'animate-waveform-4')
                                    : barIdx <= 13
                                    ? 'bg-accent-primary'
                                    : 'bg-surface-panel-subtle hover:bg-accent-primary/40'
                                )}
                              />
                            )
                          )}
                        </div>

                        <div className="flex items-center justify-center gap-3 pt-2">
                          <button
                            type="button"
                            onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                            className="p-2.5 rounded-full bg-[#141C2B] text-white hover:bg-[#1F2B3E] transition-colors cursor-pointer active:scale-95"
                            aria-label={isPlayingAudio ? 'Pause Lecture Audio' : 'Play Lecture Audio'}
                          >
                            {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-3 rounded-lg bg-surface-panel-subtle/50 border border-border-subtle">
                        <span className="font-semibold text-text-primary block">LaTeX Extraction</span>
                        <span className="text-text-secondary text-[11px]">Formula rendering ready</span>
                      </div>
                      <div className="p-3 rounded-lg bg-surface-panel-subtle/50 border border-border-subtle">
                        <span className="font-semibold text-text-primary block">Notion Sync</span>
                        <span className="text-text-secondary text-[11px]">1-click page export</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Interactive 3D Study Flashcard */}
                  <div className="lg:col-span-6 rounded-xl bg-surface-canvas border border-border-strong p-6 flex flex-col justify-between space-y-4">
                    <div className="flex items-center justify-between border-b border-border-subtle pb-3">
                      <span className="font-mono text-xs font-semibold text-text-primary">
                        Extracted Concept Flashcard
                      </span>
                      <span className="font-mono text-xs text-accent-tertiary font-medium">
                        Card 03 of 12
                      </span>
                    </div>

                    {/* Interactive Flip Trigger */}
                    <button
                      type="button"
                      onClick={() => setActiveCardFlipped(!activeCardFlipped)}
                      className="w-full text-left rounded-lg p-5 bg-surface-panel border border-border-subtle hover:border-accent-primary/40 transition-all space-y-3 cursor-pointer active:scale-[0.99]"
                    >
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span className="text-text-secondary font-medium">
                          {activeCardFlipped ? 'REVERSE · DEFINITION & PROOF' : 'FRONT · CORE THEOREM'}
                        </span>
                        <span className="text-accent-primary font-semibold">Click to flip card ↺</span>
                      </div>

                      <AnimatePresence mode="wait">
                        {activeCardFlipped ? (
                          <motion.div
                            key="answer"
                            initial={{ opacity: 0, rotateX: -30 }}
                            animate={{ opacity: 1, rotateX: 0 }}
                            exit={{ opacity: 0, rotateX: 30 }}
                            transition={{ duration: 0.36 }}
                            className="space-y-2"
                          >
                            <p className="text-sm font-semibold text-text-primary">
                              Quorum Size Proof:
                            </p>
                            <div className="p-2.5 rounded bg-surface-panel-subtle border border-border-subtle font-mono text-xs text-accent-secondary">
                              Quorum = floor(N / 2) + 1
                            </div>
                            <p className="text-xs text-text-secondary leading-relaxed">
                              Any two quorums in a cluster of size N overlap by at least one node, ensuring no two leaders can be elected simultaneously in the same term.
                            </p>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="question"
                            initial={{ opacity: 0, rotateX: 30 }}
                            animate={{ opacity: 1, rotateX: 0 }}
                            exit={{ opacity: 0, rotateX: -30 }}
                            transition={{ duration: 0.36 }}
                            className="space-y-2"
                          >
                            <p className="text-sm font-semibold text-text-primary">
                              What is the minimum quorum condition required for Raft leader election safety?
                            </p>
                            <p className="text-xs text-text-secondary leading-relaxed">
                              Why does Raft require a strict majority of nodes rather than a simple plurality during split-vote recovery?
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>

                    <div className="flex items-center justify-between text-xs pt-1 border-t border-border-subtle">
                      <span className="font-mono text-accent-secondary font-medium">
                        ✓ Extracted from audio transcript (18:32)
                      </span>
                      <span className="font-mono text-text-muted text-[11px]">
                        Flashcard #03
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* =============================================================
                  TOOL 3: COMMUNITY CHAT DIGEST
                  ============================================================= */}
              {activeProduct.id === 'community-chat-digest' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                  {/* Left: Raw Channel Stream Preview */}
                  <div className="lg:col-span-5 rounded-xl bg-surface-canvas border border-border-strong p-6 space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-semibold text-text-primary">
                          Ingested Channel Feed
                        </span>
                        <span className="font-mono text-xs text-accent-secondary font-medium tabular-nums">
                          1,482 msgs / 24h
                        </span>
                      </div>

                      {/* Channel Tabs */}
                      <div className="flex items-center gap-1.5 p-1 rounded-lg bg-surface-panel-subtle border border-border-subtle text-xs">
                        {(['#engineering-core', '#product-sync', '#infra-alerts'] as const).map((ch) => (
                          <button
                            key={ch}
                            type="button"
                            onClick={() => setActiveChannel(ch)}
                            className={cn(
                              'px-2.5 py-1 rounded-md font-mono text-[11px] transition-all cursor-pointer truncate',
                              activeChannel === ch
                                ? 'bg-surface-panel text-accent-secondary shadow-xs font-semibold'
                                : 'text-text-secondary hover:text-text-primary'
                            )}
                          >
                            {ch}
                          </button>
                        ))}
                      </div>

                      {/* Chat Messages Mock */}
                      <div className="space-y-2.5 pt-1">
                        <div className="p-3 rounded-lg bg-surface-panel-subtle/50 border border-border-subtle space-y-1">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-mono font-semibold text-text-primary">@aditya_v</span>
                            <span className="font-mono text-text-secondary">10:14 AM</span>
                          </div>
                          <p className="text-xs text-text-secondary">
                            Migrated Redis cluster to consistent hash ring. Memory overhead down 34%. PR #412 ready.
                          </p>
                        </div>
                        <div className="p-3 rounded-lg bg-surface-panel-subtle/50 border border-border-subtle space-y-1">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-mono font-semibold text-text-primary">@neha_k</span>
                            <span className="font-mono text-text-secondary">10:28 AM</span>
                          </div>
                          <p className="text-xs text-text-secondary">
                            Staging webhook retry test passed with exponential backoff. Merging to release candidate branch.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-surface-panel-subtle/60 border border-border-subtle flex justify-between items-center text-xs">
                      <span className="text-text-secondary text-[11px] font-mono">Deduplication SLA</span>
                      <span className="font-mono font-semibold text-accent-secondary">94.8% Compression</span>
                    </div>
                  </div>

                  {/* Right: Output Executive Brief */}
                  <div className="lg:col-span-7 rounded-xl bg-surface-canvas border border-border-strong p-6 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-border-subtle pb-3">
                        <span className="font-mono text-xs font-semibold text-text-primary flex items-center gap-1.5">
                          <MessageSquare className="w-3.5 h-3.5 text-accent-secondary" />
                          <span>Structured Executive Brief · {activeChannel}</span>
                        </span>
                        <div className="flex items-center gap-1.5">
                          {(['24h', '7d'] as const).map((tf) => (
                            <button
                              key={tf}
                              type="button"
                              onClick={() => setDigestTimeframe(tf)}
                              className={cn(
                                'font-mono text-[10px] px-2 py-0.5 rounded border transition-all cursor-pointer',
                                digestTimeframe === tf
                                  ? 'bg-accent-secondary text-white border-accent-secondary font-bold'
                                  : 'bg-surface-panel-subtle text-text-secondary border-border-subtle hover:text-text-primary'
                              )}
                            >
                              {tf}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Brief Topic Cluster 1 */}
                      <div className="p-4 rounded-lg bg-surface-panel border border-border-subtle space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-xs text-text-primary">
                            1. Redis Cache Sharding Architecture
                          </span>
                          <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-sage-100/70 text-accent-secondary border border-accent-secondary/20 font-medium">
                            Consensus Achieved
                          </span>
                        </div>
                        <p className="text-xs text-text-secondary leading-relaxed">
                          Consistent hashing ring implementation approved. Tested on staging with 34% memory reduction and zero hash collisions.
                        </p>
                        <div className="pt-2 border-t border-border-subtle flex justify-between items-center text-[11px] font-mono">
                          <span className="text-text-secondary">Action Assigned: @aditya_v</span>
                          <span className="text-accent-secondary font-medium">Merged to Master</span>
                        </div>
                      </div>

                      {/* Brief Topic Cluster 2 */}
                      <div className="p-4 rounded-lg bg-surface-panel border border-border-subtle space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-xs text-text-primary">
                            2. Webhook Dispatch Exponential Backoff
                          </span>
                          <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-500/20 font-medium">
                            Review Required
                          </span>
                        </div>
                        <p className="text-xs text-text-secondary leading-relaxed">
                          Failure retry policy clamped to 5 max attempts with jitter to prevent downstream webhook thundering herd.
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-border-subtle flex justify-between items-center text-xs">
                      <span className="font-mono text-accent-secondary font-medium">
                        ✓ Dispatched to Slack Webhook #leadership-sync
                      </span>
                      <span className="font-mono text-text-secondary text-[11px]">Daily 09:00 AM IST</span>
                    </div>
                  </div>
                </div>
              )}

              {/* =============================================================
                  TOOL 4: SMART DAINIK NEWS
                  ============================================================= */}
              {activeProduct.id === 'smart-dainik-news' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                  {/* Left: Regional Feed Sources */}
                  <div className="lg:col-span-5 rounded-xl bg-surface-canvas border border-border-strong p-6 space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-semibold text-text-primary flex items-center gap-1.5">
                          <Newspaper className="w-3.5 h-3.5 text-accent-primary" />
                          <span>UP Regional Feed Aggregator</span>
                        </span>
                        <span className="font-mono text-xs text-accent-secondary font-medium tabular-nums">
                          14 Live Sources
                        </span>
                      </div>

                      {/* Language Selector */}
                      <div className="flex items-center gap-1.5 p-1 rounded-lg bg-surface-panel-subtle border border-border-subtle text-xs">
                        <button
                          type="button"
                          onClick={() => setLanguage('en')}
                          className={cn(
                            'flex-1 py-1 rounded-md font-mono text-[11px] transition-all cursor-pointer',
                            language === 'en'
                              ? 'bg-surface-panel text-text-primary shadow-xs font-semibold'
                              : 'text-text-secondary hover:text-text-primary'
                          )}
                        >
                          English Feeds
                        </button>
                        <button
                          type="button"
                          onClick={() => setLanguage('hi')}
                          className={cn(
                            'flex-1 py-1 rounded-md font-mono text-[11px] transition-all cursor-pointer',
                            language === 'hi'
                              ? 'bg-surface-panel text-accent-primary shadow-xs font-semibold'
                              : 'text-text-secondary hover:text-text-primary'
                          )}
                        >
                          हिंदी समाचार फ़ीड
                        </button>
                      </div>

                      {/* Ingested items list */}
                      <div className="space-y-2 pt-1">
                        <div className="p-3 rounded-lg bg-surface-panel-subtle/50 border border-border-subtle space-y-1">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-mono font-semibold text-accent-primary">UPPSC Gazette</span>
                            <span className="font-mono text-text-secondary">2 hrs ago</span>
                          </div>
                          <p className="text-xs text-text-secondary">
                            {language === 'en'
                              ? 'Technical cadre recruitment official notification released for 411 positions.'
                              : 'तकनीकी संवर्ग भर्ती की आधिकारिक अधिसूचना 411 पदों के लिए जारी।'}
                          </p>
                        </div>
                        <div className="p-3 rounded-lg bg-surface-panel-subtle/50 border border-border-subtle space-y-1">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-mono font-semibold text-text-primary">Agra Industrial Board</span>
                            <span className="font-mono text-text-secondary">5 hrs ago</span>
                          </div>
                          <p className="text-xs text-text-secondary">
                            {language === 'en'
                              ? 'Optical fiber connectivity project approved for regional leather and MSME cluster.'
                              : 'क्षेत्रीय चमड़ा और एमएसएमई क्लस्टर के लिए ऑप्टिकल फाइबर परियोजना स्वीकृत।'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-surface-panel-subtle/60 border border-border-subtle flex justify-between items-center text-xs">
                      <span className="text-text-secondary text-[11px] font-mono">Bilingual Accuracy</span>
                      <span className="font-mono font-semibold text-accent-secondary">99.4% Verified</span>
                    </div>
                  </div>

                  {/* Right: Matched Alerts & Verification */}
                  <div className="lg:col-span-7 rounded-xl bg-surface-canvas border border-border-strong p-6 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-border-subtle pb-3">
                        <span className="font-mono text-xs font-semibold text-text-primary">
                          Verified Public Alerts & Schema Extraction
                        </span>
                        <span className="font-mono text-xs text-accent-primary font-medium">
                          UP Central & Western
                        </span>
                      </div>

                      {/* Alert Card 1 */}
                      <div className="p-4 rounded-lg bg-surface-panel border border-border-subtle space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[11px] font-bold text-accent-primary px-2 py-0.5 rounded bg-accent-50 border border-accent-primary/20">
                            ALERT_ID: UPPSC_TECH_2026
                          </span>
                          <span className="font-mono text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-500/20 font-semibold">
                            Official Verified
                          </span>
                        </div>
                        <h4 className="font-sans font-semibold text-sm sm:text-base text-text-primary">
                          {language === 'en'
                            ? 'UPPSC Assistant Engineer & Technical Cadre (411 Posts)'
                            : 'यूपीपीएससी सहायक अभियंता एवं तकनीकी संवर्ग भर्ती (411 पद)'}
                        </h4>
                        <p className="text-xs text-text-secondary leading-relaxed">
                          {language === 'en'
                            ? 'Eligibility: B.Tech in CSE, ECE, EE. Age: 21-40 yrs. Application window opens March 2026.'
                            : 'पात्रता: कंप्यूटर साइंस/आईटी में बी.टेक। आयु सीमा: 21-40 वर्ष। आवेदन मार्च 2026 से उपलब्ध।'}
                        </p>
                        <div className="pt-2 border-t border-border-subtle flex justify-between items-center text-[11px] font-mono">
                          <span className="text-text-secondary">Deadline: 2026-03-30</span>
                          <span className="text-accent-primary font-semibold">Direct Portal Hook Ready</span>
                        </div>
                      </div>

                      {/* Alert Card 2 */}
                      <div className="p-4 rounded-lg bg-surface-panel border border-border-subtle space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[11px] font-bold text-text-secondary px-2 py-0.5 rounded bg-surface-panel-subtle">
                            ALERT_ID: AGRA_OPTICAL_GRID
                          </span>
                          <span className="font-mono text-xs text-accent-secondary font-medium">
                            Infrastructure
                          </span>
                        </div>
                        <h4 className="font-sans font-semibold text-sm text-text-primary">
                          {language === 'en'
                            ? 'Agra-Lucknow Industrial Optical Fiber Grid'
                            : 'आगरा-लखनऊ औद्योगिक ऑप्टिकल फाइबर ग्रिड विस्तार'}
                        </h4>
                        <p className="text-xs text-text-secondary leading-relaxed">
                          {language === 'en'
                            ? 'High-speed data grid expansion reaching Tier-2 district hubs by Q3 2026. Micro-industrial units to gain low-latency internet.'
                            : 'Q3 2026 तक टियर-2 जिला औद्योगिक केंद्रों तक हाई-स्पीड डेटा ग्रिड विस्तार। सूक्ष्म औद्योगिक इकाइयों को उच्च गति इंटरनेट।'}
                        </p>
                        <div className="pt-2 border-t border-border-subtle flex justify-between items-center text-xs">
                          <span className="font-mono text-accent-secondary font-medium">✓ Verified Gazette</span>
                          <span className="font-mono text-text-primary font-medium">Tier-2 Expansion</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

        {/* =========================================================================
            4. BOTTOM SPECIFICATION & TELEMETRY STRIP
            ========================================================================= */}
        <div className="p-5 sm:p-6 md:p-8 bg-surface-canvas border-t border-border-subtle grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-text-secondary block text-[11px]">Input Support</span>
            <span className="font-mono font-medium text-text-primary">
              {activeProduct.inputFormat}
            </span>
          </div>
          <div>
            <span className="text-text-secondary block text-[11px]">Output Delivery</span>
            <span className="font-mono font-medium text-text-primary">
              {activeProduct.outputFormat}
            </span>
          </div>
          <div>
            <span className="text-text-secondary block text-[11px]">Execution Speed</span>
            <span className="font-mono font-medium text-accent-primary tabular-nums">
              {activeProduct.metric}
            </span>
          </div>
          <div>
            <span className="text-text-secondary block text-[11px]">Privacy Guarantee</span>
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
