'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { Link } from '@/components/atoms/Link';
import {
  Check,
  Copy,
  ArrowRight,
  Zap,
  SlidersHorizontal,
  FileText,
  Headphones,
  MessageSquare,
  Newspaper,
  Play,
  Pause,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { MathRenderer, MathText } from '@/components/atoms/MathRenderer';

type ToolId = 'resume' | 'notes' | 'digest' | 'news';

interface Candidate {
  id: string;
  name: string;
  role: string;
  experience: string;
  score: number;
  status: 'Top Candidate' | 'Shortlisted' | 'Review Queue';
  skills: string[];
  rationale: string;
  vectors: { label: string; match: number }[];
}

const CANDIDATES: Candidate[] = [
  {
    id: 'cand-01',
    name: 'Aditya Verma',
    role: 'Senior Backend Engineer',
    experience: '5 yrs exp',
    score: 96,
    status: 'Top Candidate',
    skills: ['Python', 'FastAPI', 'PostgreSQL', 'Distributed Systems', 'vLLM'],
    rationale:
      'Verified 5+ yrs high-concurrency API engineering. Exact match on distributed queue orchestration, async DB connection pooling, and low-latency inference wrappers.',
    vectors: [
      { label: 'Distributed Architecture', match: 98 },
      { label: 'Async Python / FastAPI', match: 96 },
      { label: 'Relational DB Optimization', match: 94 },
    ],
  },
  {
    id: 'cand-02',
    name: 'Neha Kulkarni',
    role: 'Full Stack Engineer',
    experience: '3 yrs exp',
    score: 84,
    status: 'Shortlisted',
    skills: ['React 19', 'Next.js 15', 'TypeScript', 'GraphQL', 'Tailwind'],
    rationale:
      'Strong React & Next.js full-stack foundation. Meets core frontend architecture standards with solid server component patterns and API contracts.',
    vectors: [
      { label: 'Frontend Component Design', match: 92 },
      { label: 'Next.js App Router', match: 88 },
      { label: 'API Integration', match: 80 },
    ],
  },
  {
    id: 'cand-03',
    name: 'Rohit Sen',
    role: 'Frontend Engineer',
    experience: '2 yrs exp',
    score: 71,
    status: 'Review Queue',
    skills: ['TypeScript', 'Tailwind CSS', 'REST APIs', 'Figma'],
    rationale:
      'Good UI design execution and TypeScript typing. Meets baseline UI standards, recommended for secondary technical architecture interview.',
    vectors: [
      { label: 'UI Precision & Styling', match: 85 },
      { label: 'TypeScript Interfaces', match: 74 },
      { label: 'Backend Contracts', match: 62 },
    ],
  },
];

const JSON_SAMPLE = {
  batch_id: 'norai_batch_104_prod',
  status: 'SUCCESS',
  latency_ms: 238,
  engine: 'Deterministic Neural Parser v2.4',
  data_residency: 'EPHEMERAL_RAM_FLUSHED',
  candidates_evaluated: 58,
  top_match: {
    name: 'Aditya Verma',
    composite_score: 0.962,
    threshold_passed: true,
    recommendation: 'FAST_TRACK_TECHNICAL_ROUND',
    extracted_vectors: {
      distributed_systems: 0.98,
      fastapi_async: 0.96,
      sql_optimization: 0.94,
    },
  },
};

export function HeroStudioWorkbench() {
  const [activeTool, setActiveTool] = useState<ToolId>('resume');
  const [resumeSubTab, setResumeSubTab] = useState<'scorecard' | 'vectors' | 'json'>('scorecard');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate>(CANDIDATES[0] as Candidate);
  const [copied, setCopied] = useState(false);
  const [liveAnnouncement, setLiveAnnouncement] = useState('');

  // Course Note-Taker simulator state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [flashcardFlipped, setFlashcardFlipped] = useState(false);

  // Community Digest simulator state
  const [activeCommunityPlatform, setActiveCommunityPlatform] = useState<'discord' | 'telegram' | 'slack'>('discord');

  // Smart Dainik News simulator state
  const [newsLang, setNewsLang] = useState<'hi' | 'en'>('hi');

  const handleCopyJson = () => {
    navigator.clipboard?.writeText(JSON.stringify(JSON_SAMPLE, null, 2));
    setCopied(true);
    setLiveAnnouncement('JSON contract payload copied to clipboard.');
    setTimeout(() => setCopied(false), 2000);
  };

  // Keyboard hotkeys 1-4 for quick tool switching
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['input', 'textarea'].includes((e.target as HTMLElement)?.tagName?.toLowerCase())) {
        return;
      }
      if (e.key === '1') {
        setActiveTool('resume');
        setLiveAnnouncement('Switched to AI Resume Shortlister tool.');
      } else if (e.key === '2') {
        setActiveTool('notes');
        setLiveAnnouncement('Switched to Course Note-Taker tool.');
      } else if (e.key === '3') {
        setActiveTool('digest');
        setLiveAnnouncement('Switched to Community Chat Digest tool.');
      } else if (e.key === '4') {
        setActiveTool('news');
        setLiveAnnouncement('Switched to Smart Dainik News tool.');
      } else if (e.key.toLowerCase() === 'c' && resumeSubTab === 'json' && activeTool === 'resume') {
        handleCopyJson();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [resumeSubTab, activeTool]);

  const TOOLS_LIST = [
    { id: 'resume' as const, label: 'Resume', icon: FileText },
    { id: 'notes' as const, label: 'Notes', icon: Headphones },
    { id: 'digest' as const, label: 'Digest', icon: MessageSquare },
    { id: 'news' as const, label: 'Dainik', icon: Newspaper },
  ];

  return (
    <div className="w-full rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] shadow-2xl overflow-hidden text-left font-sans transition-all duration-300">
      {/* Screen reader live region */}
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {liveAnnouncement}
      </div>

      {/* Studio Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 px-3.5 sm:px-4 py-2.5 bg-canvas-recessed/80 border-b border-[rgba(13,37,61,0.08)]">
        {/* Left Mac/Terminal Dots + Title */}
        <div className="flex items-center gap-2.5">
          <div className="flex gap-1" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C2553A]/60 border border-[#C2553A]/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#B8860B]/60 border border-[#B8860B]/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#5B8A72]/60 border border-[#5B8A72]/80" />
          </div>
          <span className="font-mono text-xs font-semibold text-ink-primary tracking-tight">
            NorAI Studio
          </span>
          <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-sage-100/70 text-accent-secondary border border-accent-secondary/20">
            Ephemeral RAM
          </span>
        </div>

        {/* 4 Tool Selector Buttons with 5-State Ergonomics & Sliding Pill */}
        <div className="grid grid-cols-4 sm:flex items-center rounded-lg bg-canvas-paper p-0.5 border border-[rgba(13,37,61,0.08)] text-xs relative">
          {TOOLS_LIST.map((tool) => {
            const Icon = tool.icon;
            const isSelected = activeTool === tool.id;
            return (
              <button
                key={tool.id}
                type="button"
                onClick={() => setActiveTool(tool.id)}
                className={cn(
                  'relative flex items-center justify-center gap-1 px-2.5 py-1 rounded-md font-medium transition-colors duration-150 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 z-10',
                  isSelected
                    ? 'text-white font-semibold'
                    : 'text-ink-secondary hover:text-ink-primary'
                )}
              >
                {isSelected && (
                  <motion.span
                    layoutId="heroStudioTabIndicator"
                    className="absolute inset-0 bg-[#0D253D] rounded-md shadow-xs -z-10"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <Icon className="w-3 h-3 shrink-0" />
                <span className="text-[11px]">{tool.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Living Tool Content with AnimatePresence */}
      <AnimatePresence mode="wait">
        {/* =========================================================================
            TAB 1: AI RESUME SHORTLISTER
            ========================================================================= */}
        {activeTool === 'resume' && (
          <motion.div
            key="resume"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Subheader */}
            <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 bg-canvas-base border-b border-[rgba(13,37,61,0.06)] text-xs">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-ink-primary">AI Resume Shortlister</span>
                <span className="text-[11px] font-mono text-ink-secondary hidden sm:inline">
                  · Batch #104 (58 Evaluated)
                </span>
              </div>

              <div className="flex items-center gap-1 bg-canvas-paper p-0.5 rounded border border-[rgba(13,37,61,0.06)] relative">
                {(['scorecard', 'vectors', 'json'] as const).map((tab) => {
                  const isTabActive = resumeSubTab === tab;
                  const label = tab === 'scorecard' ? 'Scorecard' : tab === 'vectors' ? 'Vectors' : 'JSON Schema';
                  return (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setResumeSubTab(tab)}
                      className={cn(
                        'relative px-2 py-0.5 rounded text-[11px] font-medium transition-colors z-10',
                        isTabActive
                          ? 'text-accent-500 font-semibold'
                          : 'text-ink-secondary hover:text-ink-primary'
                      )}
                    >
                      {isTabActive && (
                        <motion.span
                          layoutId="resumeSubTabIndicator"
                          className="absolute inset-0 bg-accent-50 rounded -z-10 border border-accent-500/20"
                          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                        />
                      )}
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Subtab Body */}
            {resumeSubTab === 'scorecard' && (
              <div className="p-4 sm:p-5 space-y-3.5">
                {/* Candidate rows */}
                <div className="space-y-2" role="listbox" aria-label="Screened candidates">
                  {CANDIDATES.map((cand) => {
                    const isSelected = selectedCandidate.id === cand.id;
                    return (
                      <button
                        key={cand.id}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => setSelectedCandidate(cand)}
                        className={cn(
                          'w-full text-left p-3 rounded-xl border transition-all duration-150 flex items-center justify-between gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500',
                          isSelected
                            ? 'bg-canvas-paper border-accent-500/80 shadow-md ring-1 ring-accent-500/20 translate-y-[-1px]'
                            : 'bg-canvas-recessed/30 border-[rgba(13,37,61,0.06)] hover:bg-canvas-recessed/60 hover:border-accent-500/30'
                        )}
                      >
                        <div className="space-y-0.5 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-display text-base font-normal text-ink-primary">
                              {cand.name}
                            </span>
                            <span className="font-mono tabular-nums text-xs font-semibold px-2 py-0.5 rounded bg-accent-50 text-accent-500 border border-accent-500/20">
                              {cand.score}% Match
                            </span>
                          </div>
                          <p className="text-xs text-ink-secondary">
                            {cand.role} · <span className="font-mono tabular-nums">{cand.experience}</span>
                          </p>
                        </div>

                        <div className="shrink-0 text-right">
                          <span
                            className={cn(
                              'text-[11px] font-medium px-2 py-0.5 rounded-full inline-block',
                              cand.status === 'Top Candidate'
                                ? 'bg-sage-100/70 text-accent-secondary font-semibold'
                                : cand.status === 'Shortlisted'
                                ? 'bg-accent-50 text-accent-500'
                                : 'bg-canvas-recessed text-ink-secondary'
                            )}
                          >
                            {cand.status}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Rationale Drawer */}
                <div className="rounded-xl bg-canvas-recessed/40 border border-[rgba(13,37,61,0.08)] p-3.5 space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-ink-secondary">
                    <div className="flex items-center gap-1.5 font-mono font-medium text-ink-primary">
                      <SlidersHorizontal className="w-3.5 h-3.5 text-accent-500" />
                      <span>Scoring Rationale</span>
                    </div>
                    <span className="font-mono text-[11px] text-accent-secondary">
                      {selectedCandidate.name}
                    </span>
                  </div>
                  <p className="text-xs text-ink-body leading-relaxed">
                    {selectedCandidate.rationale}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {selectedCandidate.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-canvas-paper text-[11px] font-medium text-ink-primary border border-[rgba(13,37,61,0.08)]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {resumeSubTab === 'vectors' && (
              <div className="p-4 sm:p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-display text-lg text-ink-primary font-normal">
                      Skill Vector Alignment
                    </h4>
                    <p className="text-xs text-ink-secondary">
                      Cosine similarity calculated against Senior Backend specification.
                    </p>
                  </div>
                  <span className="font-mono text-xs text-accent-500 font-semibold px-2 py-1 bg-accent-50 rounded">
                    {selectedCandidate.name}
                  </span>
                </div>

                <div className="space-y-3.5">
                  {selectedCandidate.vectors.map((vec, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-medium text-ink-primary">{vec.label}</span>
                        <span className="font-mono tabular-nums font-semibold text-accent-500">
                          {vec.match}%
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-canvas-recessed overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-accent-400 to-accent-500 rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${vec.match}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {resumeSubTab === 'json' && (
              <div className="p-4 relative bg-[#0D253D] text-[#FDFBF7]">
                <div className="flex justify-between items-center pb-2 mb-2 border-b border-[rgba(253,251,247,0.1)] text-xs text-slate-400">
                  <span className="font-mono text-[11px] text-emerald-400">
                    POST /api/v1/shortlist/batch-104
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyJson}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-slate-300 text-xs font-mono transition-all"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3 h-3 text-accent-secondary" />
                        <span className="text-accent-secondary">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Payload</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="font-mono text-[11px] text-emerald-300/90 overflow-x-auto p-1 leading-relaxed max-h-52">
                  {JSON.stringify(JSON_SAMPLE, null, 2)}
                </pre>
              </div>
            )}

            {/* Footer Bar */}
            <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 bg-canvas-recessed/40 border-t border-[rgba(13,37,61,0.06)] text-xs">
              <div className="flex items-center gap-2 text-ink-secondary">
                <Zap className="w-3.5 h-3.5 text-accent-500" />
                <span>
                  Parsed in <span className="font-mono tabular-nums font-semibold text-ink-primary">&lt; 0.35s</span> / PDF
                </span>
              </div>
              <Link
                href="/products/resume-shortlister"
                className="font-medium text-accent-500 hover:text-accent-600 inline-flex items-center gap-1 group"
              >
                <span>Open Tool Fullscreen</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </motion.div>
        )}

        {/* =========================================================================
            TAB 2: AI COURSE NOTE-TAKER
            ========================================================================= */}
        {activeTool === 'notes' && (
          <motion.div
            key="notes"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Subheader */}
            <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 bg-canvas-base border-b border-[rgba(13,37,61,0.06)] text-xs">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-ink-primary">AI Course Note-Taker</span>
                <span className="text-[11px] font-mono text-[#7c5506] bg-[#fff4d6] px-2 py-0.5 rounded border border-[#7c5506]/20">
                  100% Free for Students
                </span>
              </div>
              <span className="font-mono text-accent-secondary text-[11px]">Audio/Video Ingestion</span>
            </div>

            <div className="p-4 sm:p-5 space-y-4">
              {/* Audio Waveform Simulator */}
              <div className="rounded-xl bg-canvas-recessed/40 border border-[rgba(13,37,61,0.08)] p-3.5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                      className="w-8 h-8 rounded-full bg-terra-500 hover:bg-terra-600 text-white flex items-center justify-center shadow-accent transition-all active:scale-95 cursor-pointer"
                      aria-label={isPlayingAudio ? 'Pause Lecture Audio' : 'Play Lecture Audio'}
                    >
                      {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                    </button>
                    <div>
                      <p className="text-xs font-semibold text-ink-primary">MIT 8.02: Maxwell&apos;s Equations & Electromagnetism</p>
                      <p className="text-[11px] font-mono text-ink-secondary">04:12 / 52:30 · 1.5x Speed Neural Filtered</p>
                    </div>
                  </div>
                  <span className="font-mono tabular-nums text-xs text-accent-500 font-semibold px-2 py-0.5 rounded bg-accent-50">
                    {isPlayingAudio ? 'Transcribing...' : 'Paused'}
                  </span>
                </div>

                {/* Animated Waveform Visualizer */}
                <div className="flex items-center gap-1 h-7 px-2 bg-canvas-paper rounded-lg border border-[rgba(13,37,61,0.06)] overflow-hidden">
                  {[40, 65, 80, 45, 90, 70, 30, 85, 95, 60, 50, 75, 100, 80, 65, 45, 90, 85, 70, 55, 40, 75, 90, 60, 35, 80, 65, 90, 50].map((h, i) => (
                    <div
                      key={i}
                      className={cn(
                        'flex-1 rounded-full transition-all duration-200',
                        isPlayingAudio ? 'bg-terra-500' : 'bg-terra-300/40',
                        isPlayingAudio && (i % 4 === 0 ? 'animate-waveform-1' : i % 4 === 1 ? 'animate-waveform-2' : i % 4 === 2 ? 'animate-waveform-3' : 'animate-waveform-4')
                      )}
                      style={{
                        height: isPlayingAudio ? `${Math.max(25, (h + (i % 5) * 10) % 100)}%` : `${h * 0.4}%`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Extracted Structured Note Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* LaTeX Math Extraction */}
                <div className="rounded-xl bg-canvas-paper border border-[rgba(13,37,61,0.08)] p-3.5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-semibold text-accent-500">LaTeX Formula Extraction</span>
                    <span className="text-[10px] font-mono text-accent-secondary">Verified</span>
                  </div>
                  <div className="p-2.5 rounded bg-canvas-recessed/60 text-ink-primary border border-[rgba(13,37,61,0.06)] flex items-center justify-center min-h-[44px]">
                    <MathRenderer math="\nabla \times \mathbf{E} = -\frac{\partial \mathbf{B}}{\partial t}" displayMode={false} />
                  </div>
                  <p className="text-[11px] text-ink-secondary">
                    Faraday&apos;s Law of Induction: Time-varying magnetic fields induce circulating electric fields.
                  </p>
                </div>

                {/* Interactive Flashcard with 3D flip */}
                <button
                  type="button"
                  onClick={() => setFlashcardFlipped(!flashcardFlipped)}
                  className="text-left rounded-xl bg-canvas-paper border border-accent-500/30 hover:border-accent-500 p-3.5 space-y-2 transition-all hover:shadow-sm cursor-pointer"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-semibold text-ink-primary">Interactive Study Card</span>
                    <span className="text-[10px] font-mono text-accent-500">Click to Flip</span>
                  </div>
                  <AnimatePresence mode="wait">
                    {flashcardFlipped ? (
                      <motion.div
                        key="answer"
                        initial={{ opacity: 0, rotateX: -40 }}
                        animate={{ opacity: 1, rotateX: 0 }}
                        exit={{ opacity: 0, rotateX: 40 }}
                        transition={{ duration: 0.36 }}
                        className="space-y-1"
                      >
                        <span className="text-[10px] font-mono text-accent-secondary uppercase">Answer</span>
                        <p className="text-xs text-ink-primary font-medium">
                          <MathText text="The displacement current term $\mu_0 \varepsilon_0 \frac{\partial \mathbf{E}}{\partial t}$ was added by Maxwell to satisfy conservation of charge." />
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="question"
                        initial={{ opacity: 0, rotateX: 40 }}
                        animate={{ opacity: 1, rotateX: 0 }}
                        exit={{ opacity: 0, rotateX: -40 }}
                        transition={{ duration: 0.36 }}
                        className="space-y-1"
                      >
                        <span className="text-[10px] font-mono text-ink-secondary uppercase">Question (Card #04)</span>
                        <p className="text-xs text-ink-primary font-medium">
                          What critical term did Maxwell add to Ampère&apos;s Law to unify electricity and magnetism?
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </div>

            {/* Footer Bar */}
            <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 bg-canvas-recessed/40 border-t border-[rgba(13,37,61,0.06)] text-xs">
              <div className="flex items-center gap-2 text-ink-secondary">
                <Sparkles className="w-3.5 h-3.5 text-accent-500" />
                <span>Generates chapter outlines, key definitions & LaTeX formulas</span>
              </div>
              <Link
                href="/products/course-note-taker"
                className="font-medium text-accent-500 hover:text-accent-600 inline-flex items-center gap-1 group"
              >
                <span>Try Note-Taker</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </motion.div>
        )}

        {/* =========================================================================
            TAB 3: COMMUNITY CHAT DIGEST
            ========================================================================= */}
        {activeTool === 'digest' && (
          <motion.div
            key="digest"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Subheader */}
            <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 bg-canvas-base border-b border-[rgba(13,37,61,0.06)] text-xs">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-ink-primary">Community Chat Digest</span>
                <span className="text-[11px] font-mono text-ink-secondary">4,820 messages condensed to 3 briefs</span>
              </div>

              {/* Platform toggles */}
              <div className="flex items-center gap-1 bg-canvas-paper p-0.5 rounded border border-[rgba(13,37,61,0.06)] relative">
                {(['discord', 'telegram', 'slack'] as const).map((plat) => {
                  const isPlatActive = activeCommunityPlatform === plat;
                  return (
                    <button
                      key={plat}
                      type="button"
                      onClick={() => setActiveCommunityPlatform(plat)}
                      className={cn(
                        'relative px-2 py-0.5 rounded text-[11px] font-medium capitalize transition-colors z-10',
                        isPlatActive
                          ? 'text-accent-500 font-semibold'
                          : 'text-ink-secondary hover:text-ink-primary'
                      )}
                    >
                      {isPlatActive && (
                        <motion.span
                          layoutId="communityPlatformIndicator"
                          className="absolute inset-0 bg-accent-50 rounded -z-10 border border-accent-500/20"
                          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                        />
                      )}
                      {plat}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-4 sm:p-5 space-y-3.5">
              {/* Digest Metrics Strip */}
              <div className="grid grid-cols-3 gap-2 text-left">
                <div className="p-2.5 rounded-xl bg-canvas-recessed/40 border border-[rgba(13,37,61,0.06)]">
                  <span className="text-[10px] font-mono text-ink-secondary block">Compression Ratio</span>
                  <span className="font-display text-xl text-ink-primary font-normal">94.8%</span>
                </div>
                <div className="p-2.5 rounded-xl bg-canvas-recessed/40 border border-[rgba(13,37,61,0.06)]">
                  <span className="text-[10px] font-mono text-ink-secondary block">Community Sentiment</span>
                  <span className="font-display text-xl text-accent-secondary font-normal">82% Positive</span>
                </div>
                <div className="p-2.5 rounded-xl bg-canvas-recessed/40 border border-[rgba(13,37,61,0.06)]">
                  <span className="text-[10px] font-mono text-ink-secondary block">Action Items Found</span>
                  <span className="font-display text-xl text-accent-500 font-normal">6 Tasks</span>
                </div>
              </div>

              {/* Structured Executive Brief Output */}
              <div className="rounded-xl bg-canvas-paper border border-[rgba(13,37,61,0.08)] p-3.5 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-ink-primary">
                    Today&apos;s Cluster: #vLLM-Inference-Deployments
                  </span>
                  <span className="text-[10px] font-mono text-accent-secondary bg-sage-100/70 px-2 py-0.5 rounded">
                    High Engagement
                  </span>
                </div>
                <p className="text-xs text-ink-body leading-relaxed">
                  Key discussion: 42 developers benchmarked the new FP8 quantization kernel. General consensus: 2.1x throughput gain on RTX 4090 with zero loss in JSON schema strictness.
                </p>

                {/* Action item card */}
                <div className="pt-2 border-t border-[rgba(13,37,61,0.06)] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-ink-primary font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent-500 shrink-0" />
                    <span>Action: Release benchmark guide for TensorRT-LLM integration</span>
                  </div>
                  <span className="text-[10px] font-mono text-ink-secondary">Assigned: @infra-team</span>
                </div>
              </div>
            </div>

            {/* Footer Bar */}
            <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 bg-canvas-recessed/40 border-t border-[rgba(13,37,61,0.06)] text-xs">
              <div className="flex items-center gap-2 text-ink-secondary">
                <Zap className="w-3.5 h-3.5 text-accent-500" />
                <span>Token-efficient batch deduplication with webhook dispatch</span>
              </div>
              <Link
                href="/products/chat-digest"
                className="font-medium text-accent-500 hover:text-accent-600 inline-flex items-center gap-1 group"
              >
                <span>Explore Chat Digest</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </motion.div>
        )}

        {/* =========================================================================
            TAB 4: SMART DAINIK NEWS (VERNACULAR INTELLIGENCE)
            ========================================================================= */}
        {activeTool === 'news' && (
          <motion.div
            key="news"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Subheader */}
            <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 bg-canvas-base border-b border-[rgba(13,37,61,0.06)] text-xs">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-ink-primary">Smart Dainik News</span>
                <span className="text-[11px] font-mono text-accent-secondary bg-sage-100/70 px-2 py-0.5 rounded border border-accent-secondary/20">
                  UP Gazette & Civic Matcher
                </span>
              </div>

              {/* Language Switcher */}
              <div className="flex items-center gap-1 bg-canvas-paper p-0.5 rounded border border-[rgba(13,37,61,0.06)] relative">
                <button
                  type="button"
                  onClick={() => setNewsLang('hi')}
                  className={cn(
                    'relative px-2 py-0.5 rounded text-[11px] font-medium transition-colors z-10',
                    newsLang === 'hi'
                      ? 'text-accent-500 font-semibold'
                      : 'text-ink-secondary hover:text-ink-primary'
                  )}
                >
                  {newsLang === 'hi' && (
                    <motion.span
                      layoutId="newsLangIndicator"
                      className="absolute inset-0 bg-accent-50 rounded -z-10 border border-accent-500/20"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                  हिंदी (Hindi)
                </button>
                <button
                  type="button"
                  onClick={() => setNewsLang('en')}
                  className={cn(
                    'relative px-2 py-0.5 rounded text-[11px] font-medium transition-colors z-10',
                    newsLang === 'en'
                      ? 'text-accent-500 font-semibold'
                      : 'text-ink-secondary hover:text-ink-primary'
                  )}
                >
                  {newsLang === 'en' && (
                    <motion.span
                      layoutId="newsLangIndicator"
                      className="absolute inset-0 bg-accent-50 rounded -z-10 border border-accent-500/20"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                  English
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-5 space-y-3.5">
              {/* Gazette Alert Card */}
              <div className="rounded-xl bg-canvas-paper border border-[rgba(13,37,61,0.08)] p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-accent-50 text-accent-500 border border-accent-500/20">
                    {newsLang === 'hi' ? 'उत्तर प्रदेश लोक सेवा आयोग' : 'UP Public Service Commission'}
                  </span>
                  <span className="font-mono text-xs text-accent-secondary font-medium">
                    {newsLang === 'hi' ? 'सत्यापित अधिसूचना' : 'Verified Gazette'}
                  </span>
                </div>

                <div>
                  <h4 className="font-display text-lg sm:text-xl text-ink-primary font-normal">
                    {newsLang === 'hi'
                      ? 'सहायक समीक्षा अधिकारी (RO/ARO) भर्ती 2026 — 411 पद'
                      : 'Assistant Review Officer (RO/ARO) Recruitment 2026 — 411 Posts'}
                  </h4>
                  <p className="text-xs text-ink-body mt-1 leading-relaxed">
                    {newsLang === 'hi'
                      ? 'आयु सीमा 21-40 वर्ष, स्नातक डिग्री अनिवार्य, आवेदन की अंतिम तिथि 15 सितंबर 2026। ओ-लेवल प्रमाण पत्र अनिवार्य।'
                      : 'Age limit 21-40 years, Graduate degree required, Final application deadline Sep 15, 2026. O-Level Certificate mandatory.'}
                  </p>
                </div>

                {/* Extraction Tags */}
                <div className="pt-2 border-t border-[rgba(13,37,61,0.06)] flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2 font-mono text-[11px] text-ink-secondary">
                    <span>Pay Scale: Level-7 (₹44,900 - ₹1,42,400)</span>
                  </div>
                  <span className="text-[11px] font-mono text-accent-500 font-semibold">
                    {newsLang === 'hi' ? 'आवेदन लिंक सत्यापित ✓' : 'Verified Apply Link ✓'}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer Bar */}
            <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 bg-canvas-recessed/40 border-t border-[rgba(13,37,61,0.06)] text-xs">
              <div className="flex items-center gap-2 text-ink-secondary">
                <Zap className="w-3.5 h-3.5 text-accent-500" />
                <span>Bi-directional Hindi/English NLP with civic impact filtering</span>
              </div>
              <Link
                href="/products/smart-dainik-news"
                className="font-medium text-accent-500 hover:text-accent-600 inline-flex items-center gap-1 group"
              >
                <span>Explore Regional News</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default HeroStudioWorkbench;

