'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { Link } from '@/components/atoms/Link';
import {
  Check,
  Copy,
  ArrowRight,
  SlidersHorizontal,
  FileText,
  Headphones,
  MessageSquare,
  Newspaper,
  Play,
  Pause,
} from 'lucide-react';
import { MathRenderer, MathText } from '@/components/atoms/MathRenderer';
import { WaveformCanvas } from '@/components/atoms/WaveformCanvas';

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
  const [activeCommunityPlatform, setActiveCommunityPlatform] = useState<
    'discord' | 'telegram' | 'slack'
  >('discord');

  // Smart Dainik News simulator state
  const [newsLang, setNewsLang] = useState<'hi' | 'en'>('hi');

  const handleCopyJson = () => {
    navigator.clipboard?.writeText(JSON.stringify(JSON_SAMPLE, null, 2));
    setCopied(true);
    setLiveAnnouncement('JSON contract payload copied to clipboard.');
    setTimeout(() => setCopied(false), 2000);
  };

  // Keyboard hotkeys 1-4 for quick tool switching & c for JSON copy
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
      } else if (
        e.key.toLowerCase() === 'c' &&
        resumeSubTab === 'json' &&
        activeTool === 'resume'
      ) {
        handleCopyJson();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [resumeSubTab, activeTool]);

  const TOOLS_LIST = [
    { id: 'resume' as const, label: 'Resume', icon: FileText, hotkey: '1' },
    { id: 'notes' as const, label: 'Notes', icon: Headphones, hotkey: '2' },
    { id: 'digest' as const, label: 'Digest', icon: MessageSquare, hotkey: '3' },
    { id: 'news' as const, label: 'Dainik', icon: Newspaper, hotkey: '4' },
  ];

  return (
    <div className="w-full rounded-xl bg-surface-panel border border-border-strong overflow-hidden text-left font-sans transition-all duration-200">
      {/* Screen reader live region */}
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {liveAnnouncement}
      </div>

      {/* Faux-OS Window Chrome Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 px-3.5 sm:px-4 py-2.5 bg-surface-panel-subtle/70 border-b border-border-subtle">
        {/* Left Faux-OS Window Dots + Title */}
        <div className="flex items-center gap-2.5">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300 border border-slate-400/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300 border border-slate-400/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300 border border-slate-400/40" />
          </div>
          <span className="font-mono text-xs font-semibold text-text-primary tracking-tight whitespace-nowrap">
            NorAI Studio<span className="hidden xl:inline"> · Living Workbench</span>
          </span>
          <span className="text-[11px] font-mono text-text-muted shrink-0 whitespace-nowrap">
            Ephemeral RAM
          </span>
        </div>

        {/* 4 Tool Selector Buttons with Physical Keycaps */}
        <div
          role="tablist"
          aria-label="NorAI Living Studio Tools"
          className="grid grid-cols-4 sm:flex items-center rounded-lg bg-surface-panel p-0.5 border border-border-subtle text-xs relative"
        >
          {TOOLS_LIST.map((tool) => {
            const Icon = tool.icon;
            const isSelected = activeTool === tool.id;
            return (
              <button
                key={tool.id}
                type="button"
                role="tab"
                id={`tab-${tool.id}`}
                aria-selected={isSelected}
                aria-controls={`panel-${tool.id}`}
                onClick={() => setActiveTool(tool.id)}
                className={cn(
                  'relative flex items-center justify-center gap-1 px-2.5 py-1 rounded-md font-medium transition-all duration-150 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary z-10 cursor-pointer active:scale-[0.98]',
                  isSelected
                    ? 'text-white font-semibold'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover/50',
                )}
              >
                {isSelected && (
                  <motion.span
                    layoutId="heroStudioTabIndicator"
                    className="absolute inset-0 bg-[#141C2B] rounded-md -z-10"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden min-[380px]:inline">{tool.label}</span>
                <kbd
                  className={cn(
                    'hidden sm:inline-block ml-1 font-mono text-[9px] px-1 py-0.2 rounded border leading-none',
                    isSelected
                      ? 'bg-white/10 text-white/80 border-white/20'
                      : 'bg-surface-panel text-text-muted border-border-subtle',
                  )}
                >
                  {tool.hotkey}
                </kbd>
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
            id="panel-resume"
            role="tabpanel"
            aria-labelledby="tab-resume"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Subheader */}
            <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 bg-surface-canvas border-b border-border-subtle text-xs">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-text-primary">AI Resume Shortlister</span>
                <span className="text-[11px] font-mono text-text-muted hidden sm:inline">
                  · Batch #104 (58 Evaluated)
                </span>
              </div>

              <div className="flex items-center gap-1 bg-surface-panel p-0.5 rounded border border-border-subtle relative">
                {(['scorecard', 'vectors', 'json'] as const).map((tab) => {
                  const isTabActive = resumeSubTab === tab;
                  const label =
                    tab === 'scorecard'
                      ? 'Scorecard'
                      : tab === 'vectors'
                        ? 'Vectors'
                        : 'JSON Schema';
                  return (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setResumeSubTab(tab)}
                      className={cn(
                        'relative px-2 py-0.5 rounded text-[11px] font-medium transition-colors z-10 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-primary',
                        isTabActive
                          ? 'text-accent-primary font-semibold'
                          : 'text-text-secondary hover:text-text-primary',
                      )}
                    >
                      {isTabActive && (
                        <motion.span
                          layoutId="resumeSubTabIndicator"
                          className="absolute inset-0 bg-accent-50 rounded -z-10 border border-accent-primary/20"
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
                          'w-full text-left p-3 rounded-lg border transition-all duration-150 flex items-center justify-between gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary cursor-pointer active:scale-[0.99]',
                          isSelected
                            ? 'bg-surface-panel border-border-strong ring-1 ring-border-strong'
                            : 'bg-surface-panel-subtle/30 border-border-subtle hover:bg-surface-panel-subtle/60 hover:border-border-strong',
                        )}
                      >
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-sans font-medium text-sm text-text-primary">
                              {cand.name}
                            </span>
                            <span className="font-mono tabular-nums text-xs font-semibold text-text-secondary">
                              {cand.score}% Match
                            </span>
                          </div>
                          <p className="text-xs text-text-secondary">
                            {cand.role} ·{' '}
                            <span className="font-mono tabular-nums">{cand.experience}</span>
                          </p>
                        </div>

                        <div className="shrink-0 text-right">
                          <span className="text-xs font-mono text-text-muted">{cand.status}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Rationale Drawer */}
                <div className="rounded-lg bg-surface-panel-subtle/40 border border-border-subtle p-3.5 space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-text-secondary">
                    <div className="flex items-center gap-1.5 font-mono font-medium text-text-primary">
                      <SlidersHorizontal className="w-3.5 h-3.5 text-accent-primary" />
                      <span>Scoring Rationale</span>
                    </div>
                    <span className="font-mono text-xs text-accent-secondary">
                      {selectedCandidate.name}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {selectedCandidate.rationale}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {selectedCandidate.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-surface-panel text-[11px] font-medium text-text-primary border border-border-subtle"
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
                    <h4 className="font-sans font-semibold text-sm text-text-primary">
                      Skill Vector Alignment
                    </h4>
                    <p className="text-xs text-text-secondary">
                      Cosine similarity calculated against Senior Backend specification.
                    </p>
                  </div>
                  <span className="font-mono text-xs text-accent-primary font-semibold px-2 py-1 bg-accent-50 rounded border border-accent-primary/20">
                    {selectedCandidate.name}
                  </span>
                </div>

                <div className="space-y-3.5">
                  {selectedCandidate.vectors.map((vec, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-medium text-text-primary">{vec.label}</span>
                        <span className="font-mono tabular-nums font-semibold text-accent-primary">
                          {vec.match}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-surface-panel-subtle overflow-hidden">
                        <div
                          className="h-full bg-accent-primary rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${vec.match}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {resumeSubTab === 'json' && (
              <div className="p-4 relative bg-[#141C2B] text-[#F5F0EA] rounded-b-xl">
                <div className="flex justify-between items-center pb-2 mb-2 border-b border-white/10 text-xs text-slate-400">
                  <span className="font-mono text-[11px] text-[#55BA83]">
                    POST /api/v1/shortlist/batch-104
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyJson}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-mono transition-all cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3 h-3 text-accent-secondary" />
                        <span className="text-accent-secondary">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Payload (c)</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="font-mono text-[11px] text-[#55BA83]/90 overflow-x-auto p-1 leading-relaxed max-h-52">
                  {JSON.stringify(JSON_SAMPLE, null, 2)}
                </pre>
              </div>
            )}

            {/* Footer Bar */}
            <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 bg-surface-panel-subtle/40 border-t border-border-subtle text-xs">
              <div className="text-text-secondary">
                <span>
                  Parsed in{' '}
                  <span className="font-mono tabular-nums font-semibold text-text-primary">
                    &lt; 0.35s
                  </span>{' '}
                  / PDF
                </span>
              </div>
              <Link
                href="/products/resume-shortlister"
                className="font-medium text-accent-primary hover:text-accent-hover inline-flex items-center gap-1 group"
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
            id="panel-notes"
            role="tabpanel"
            aria-labelledby="tab-notes"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Subheader */}
            <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 bg-surface-canvas border-b border-border-subtle text-xs">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-text-primary">AI Course Note-Taker</span>
                <span className="text-[11px] font-mono text-[#7c5506] bg-[#fff4d6] px-2 py-0.5 rounded border border-[#7c5506]/20">
                  100% Free for Students
                </span>
              </div>
              <span className="font-mono text-accent-secondary text-[11px]">
                Audio/Video Ingestion
              </span>
            </div>

            <div className="p-4 sm:p-5 space-y-4">
              {/* Audio Waveform Simulator */}
              <div className="rounded-xl bg-surface-panel-subtle/40 border border-border-subtle p-3.5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                      className="w-8 h-8 rounded-full bg-accent-primary hover:bg-accent-hover text-white flex items-center justify-center shadow-accent transition-all active:scale-95 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent-primary"
                      aria-label={isPlayingAudio ? 'Pause Lecture Audio' : 'Play Lecture Audio'}
                    >
                      {isPlayingAudio ? (
                        <Pause className="w-3.5 h-3.5" />
                      ) : (
                        <Play className="w-3.5 h-3.5 ml-0.5" />
                      )}
                    </button>
                    <div>
                      <p className="text-xs font-semibold text-text-primary">
                        MIT 8.02: Maxwell&apos;s Equations & Electromagnetism
                      </p>
                      <p className="text-[11px] font-mono text-text-secondary">
                        04:12 / 52:30 · 1.5x Speed Neural Filtered
                      </p>
                    </div>
                  </div>
                  <span className="font-mono tabular-nums text-xs text-accent-primary font-semibold px-2 py-0.5 rounded bg-accent-50 border border-accent-primary/20">
                    {isPlayingAudio ? 'Transcribing...' : 'Paused'}
                  </span>
                </div>

                {/* Animated Waveform Visualizer Canvas */}
                <div className="h-8 px-2 py-1 bg-surface-panel rounded-lg border border-border-subtle overflow-hidden flex items-center">
                  <WaveformCanvas
                    isPlaying={isPlayingAudio}
                    color="#C85A32"
                    height={24}
                    barCount={36}
                  />
                </div>
              </div>

              {/* Extracted Structured Note Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* LaTeX Math Extraction */}
                <div className="rounded-xl bg-surface-panel border border-border-subtle p-3.5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-semibold text-accent-primary">
                      LaTeX Formula Extraction
                    </span>
                    <span className="text-[10px] font-mono text-accent-secondary">Verified</span>
                  </div>
                  <div className="p-2.5 rounded bg-surface-panel-subtle/60 text-text-primary border border-border-subtle flex items-center justify-center min-h-[44px]">
                    <MathRenderer
                      math="\nabla \times \mathbf{E} = -\frac{\partial \mathbf{B}}{\partial t}"
                      displayMode={false}
                    />
                  </div>
                  <p className="text-[11px] text-text-secondary">
                    Faraday&apos;s Law of Induction: Time-varying magnetic fields induce circulating
                    electric fields.
                  </p>
                </div>

                {/* Interactive Flashcard with 3D flip */}
                <button
                  type="button"
                  onClick={() => setFlashcardFlipped(!flashcardFlipped)}
                  className="text-left rounded-xl bg-surface-panel border border-accent-primary/30 hover:border-accent-primary p-3.5 space-y-2 transition-all hover:shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-semibold text-text-primary">
                      Interactive Study Card
                    </span>
                    <span className="text-[10px] font-mono text-accent-primary">Click to Flip</span>
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
                        <span className="text-[10px] font-mono text-accent-secondary uppercase">
                          Answer
                        </span>
                        <p className="text-xs text-text-primary font-medium">
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
                        <span className="text-[10px] font-mono text-text-secondary uppercase">
                          Question (Card #04)
                        </span>
                        <p className="text-xs text-text-primary font-medium">
                          What critical term did Maxwell add to Ampère&apos;s Law to unify
                          electricity and magnetism?
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </div>

            {/* Footer Bar */}
            <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 bg-surface-panel-subtle/40 border-t border-border-subtle text-xs">
              <div className="text-text-secondary">
                <span>Generates chapter outlines, key definitions &amp; LaTeX formulas</span>
              </div>
              <Link
                href="/products/course-note-taker"
                className="font-medium text-accent-primary hover:text-accent-hover inline-flex items-center gap-1 group"
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
            id="panel-digest"
            role="tabpanel"
            aria-labelledby="tab-digest"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Subheader */}
            <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 bg-surface-canvas border-b border-border-subtle text-xs">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-text-primary">Community Chat Digest</span>
                <span className="text-[11px] font-mono text-text-muted">
                  4,820 messages condensed to 3 briefs
                </span>
              </div>

              {/* Platform toggles */}
              <div className="flex items-center gap-1 bg-surface-panel p-0.5 rounded border border-border-subtle relative">
                {(['discord', 'telegram', 'slack'] as const).map((plat) => {
                  const isPlatActive = activeCommunityPlatform === plat;
                  return (
                    <button
                      key={plat}
                      type="button"
                      onClick={() => setActiveCommunityPlatform(plat)}
                      className={cn(
                        'relative px-2 py-0.5 rounded text-[11px] font-medium capitalize transition-colors z-10 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-primary',
                        isPlatActive
                          ? 'text-accent-primary font-semibold'
                          : 'text-text-secondary hover:text-text-primary',
                      )}
                    >
                      {isPlatActive && (
                        <motion.span
                          layoutId="communityPlatformIndicator"
                          className="absolute inset-0 bg-accent-50 rounded -z-10 border border-accent-primary/20"
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
                <div className="p-2.5 rounded-lg bg-surface-panel-subtle/40 border border-border-subtle">
                  <span className="text-[10px] font-mono text-text-secondary block">
                    Compression Ratio
                  </span>
                  <span className="font-mono tabular-nums text-base text-text-primary font-semibold">
                    94.8%
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-panel-subtle/40 border border-border-subtle">
                  <span className="text-[10px] font-mono text-text-secondary block">
                    Community Sentiment
                  </span>
                  <span className="font-mono tabular-nums text-base text-accent-secondary font-semibold">
                    82% Positive
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-panel-subtle/40 border border-border-subtle">
                  <span className="text-[10px] font-mono text-text-secondary block">
                    Action Items Found
                  </span>
                  <span className="font-mono tabular-nums text-base text-accent-primary font-semibold">
                    6 Tasks
                  </span>
                </div>
              </div>

              {/* Structured Executive Brief Output */}
              <div className="rounded-xl bg-surface-panel border border-border-subtle p-3.5 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-text-primary">
                    Today&apos;s Cluster: #vLLM-Inference-Deployments
                  </span>
                  <span className="text-[10px] font-mono text-accent-secondary bg-sage-100/70 px-2 py-0.5 rounded border border-accent-secondary/20">
                    High Engagement
                  </span>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Key discussion: 42 developers benchmarked the new FP8 quantization kernel. General
                  consensus: 2.1x throughput gain on RTX 4090 with zero loss in JSON schema
                  strictness.
                </p>

                {/* Action item card */}
                <div className="pt-2 border-t border-border-subtle flex items-center justify-between text-xs">
                  <div className="text-text-primary font-medium">
                    <span>Action: Release benchmark guide for TensorRT-LLM integration</span>
                  </div>
                  <span className="text-[10px] font-mono text-text-muted">
                    Assigned: @infra-team
                  </span>
                </div>
              </div>
            </div>

            {/* Footer Bar */}
            <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 bg-surface-panel-subtle/40 border-t border-border-subtle text-xs">
              <div className="text-text-secondary">
                <span>Token-efficient batch deduplication with webhook dispatch</span>
              </div>
              <Link
                href="/products/chat-digest"
                className="font-medium text-accent-primary hover:text-accent-hover inline-flex items-center gap-1 group"
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
            id="panel-news"
            role="tabpanel"
            aria-labelledby="tab-news"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Subheader */}
            <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 bg-surface-canvas border-b border-border-subtle text-xs">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-text-primary">Smart Dainik News</span>
                <span className="text-[11px] font-mono text-accent-secondary bg-sage-100/70 px-2 py-0.5 rounded border border-accent-secondary/20">
                  UP Gazette & Civic Matcher
                </span>
              </div>

              {/* Language Switcher */}
              <div className="flex items-center gap-1 bg-surface-panel p-0.5 rounded border border-border-subtle relative">
                <button
                  type="button"
                  onClick={() => setNewsLang('hi')}
                  className={cn(
                    'relative px-2 py-0.5 rounded text-[11px] font-medium transition-colors z-10 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-primary',
                    newsLang === 'hi'
                      ? 'text-accent-primary font-semibold'
                      : 'text-text-secondary hover:text-text-primary',
                  )}
                >
                  {newsLang === 'hi' && (
                    <motion.span
                      layoutId="newsLangIndicator"
                      className="absolute inset-0 bg-accent-50 rounded -z-10 border border-accent-primary/20"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                  हिंदी (Hindi)
                </button>
                <button
                  type="button"
                  onClick={() => setNewsLang('en')}
                  className={cn(
                    'relative px-2 py-0.5 rounded text-[11px] font-medium transition-colors z-10 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-primary',
                    newsLang === 'en'
                      ? 'text-accent-primary font-semibold'
                      : 'text-text-secondary hover:text-text-primary',
                  )}
                >
                  {newsLang === 'en' && (
                    <motion.span
                      layoutId="newsLangIndicator"
                      className="absolute inset-0 bg-accent-50 rounded -z-10 border border-accent-primary/20"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                  English
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-5 space-y-3.5">
              {/* Gazette Alert Card */}
              <div className="rounded-xl bg-surface-panel border border-border-subtle p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-accent-50 text-accent-primary border border-accent-primary/20">
                    {newsLang === 'hi'
                      ? 'उत्तर प्रदेश लोक सेवा आयोग'
                      : 'UP Public Service Commission'}
                  </span>
                  <span className="font-mono text-xs text-accent-secondary font-medium">
                    {newsLang === 'hi' ? 'सत्यापित अधिसूचना' : 'Verified Gazette'}
                  </span>
                </div>

                <div>
                  <h4 className="font-sans font-semibold text-sm sm:text-base text-text-primary">
                    {newsLang === 'hi'
                      ? 'सहायक समीक्षा अधिकारी (RO/ARO) भर्ती 2026 — 411 पद'
                      : 'Assistant Review Officer (RO/ARO) Recruitment 2026 — 411 Posts'}
                  </h4>
                  <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                    {newsLang === 'hi'
                      ? 'आयु सीमा 21-40 वर्ष, स्नातक डिग्री अनिवार्य, आवेदन की अंतिम तिथि 15 सितंबर 2026। ओ-लेवल प्रमाण पत्र अनिवार्य।'
                      : 'Age limit 21-40 years, Graduate degree required, Final application deadline Sep 15, 2026. O-Level Certificate mandatory.'}
                  </p>
                </div>

                {/* Extraction Tags */}
                <div className="pt-2 border-t border-border-subtle flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2 font-mono text-[11px] text-text-muted">
                    <span>Pay Scale: Level-7 (₹44,900 - ₹1,42,400)</span>
                  </div>
                  <span className="text-[11px] font-mono text-accent-primary font-semibold">
                    {newsLang === 'hi' ? 'आवेदन लिंक सत्यापित ✓' : 'Verified Apply Link ✓'}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer Bar */}
            <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 bg-surface-panel-subtle/40 border-t border-border-subtle text-xs">
              <div className="text-text-secondary">
                <span>Bi-directional Hindi/English NLP with civic impact filtering</span>
              </div>
              <Link
                href="/products/smart-dainik-news"
                className="font-medium text-accent-primary hover:text-accent-hover inline-flex items-center gap-1 group"
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
