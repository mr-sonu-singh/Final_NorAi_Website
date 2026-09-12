'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';
import { Link } from '@/components/atoms/Link';
import {
  Check,
  ArrowRight,
  FileText,
  Headphones,
  MessageSquare,
  Newspaper,
  Play,
  Pause,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  Clock,
  Briefcase,
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
  status: 'Recommended for Interview' | 'Shortlisted for Review' | 'Held for Second Round';
  statusColor: string;
  statusBg: string;
  skills: string[];
  rationale: string;
  highlights: string[];
}

const CANDIDATES: Candidate[] = [
  {
    id: 'cand-01',
    name: 'Aditya Verma',
    role: 'Senior Backend Engineer',
    experience: '5 yrs exp',
    score: 96,
    status: 'Recommended for Interview',
    statusColor: '#2EFCC2',
    statusBg: 'rgba(46, 252, 194, 0.12)',
    skills: ['Python / FastAPI', 'PostgreSQL', 'Distributed Queues', 'System Design'],
    rationale:
      'Verified 5+ yrs high-concurrency API engineering. Strong track record in async queuing, low-latency API design, and database query optimization.',
    highlights: [
      'Built multi-region async API handling 20k req/sec',
      'Optimized PostgreSQL queries reducing read latency by 68%',
      'Demonstrated high system ownership and clean code craft',
    ],
  },
  {
    id: 'cand-02',
    name: 'Neha Kulkarni',
    role: 'Full Stack Engineer',
    experience: '3 yrs exp',
    score: 84,
    status: 'Shortlisted for Review',
    statusColor: '#D8B4FE',
    statusBg: 'rgba(216, 180, 254, 0.12)',
    skills: ['React 19', 'Next.js App Router', 'TypeScript', 'GraphQL', 'Tailwind'],
    rationale:
      'Solid React and Next.js full-stack foundation. Clean server component architecture and proven track record shipping customer-facing features.',
    highlights: [
      'Migrated legacy web app to Next.js App Router',
      'Implemented accessible design system across 40+ components',
      'Strong end-to-end testing coverage with Playwright',
    ],
  },
  {
    id: 'cand-03',
    name: 'Rohit Sen',
    role: 'Frontend Engineer',
    experience: '2 yrs exp',
    score: 74,
    status: 'Held for Second Round',
    statusColor: '#94A3B8',
    statusBg: 'rgba(148, 163, 184, 0.12)',
    skills: ['TypeScript', 'Tailwind CSS', 'REST APIs', 'Figma Specs', 'Web Performance'],
    rationale:
      'High attention to visual craft and UI ergonomics. Strong foundational CSS skills with quick learning trajectory on complex component state.',
    highlights: [
      'Crafted responsive interfaces with 100/100 Lighthouse performance',
      'Collaborated closely with product designers from Figma specs',
      'Contributed to regional tech community open source tools',
    ],
  },
];

export function HeroStudioWorkbench() {
  const [activeTool, setActiveTool] = useState<ToolId>('resume');
  const [resumeSubTab, setResumeSubTab] = useState<'scorecard' | 'highlights'>('scorecard');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate>(CANDIDATES[0] as Candidate);
  const [liveAnnouncement, setLiveAnnouncement] = useState('');
  const shouldReduceMotion = useReducedMotion();

  // Course Note-Taker simulator state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [flashcardFlipped, setFlashcardFlipped] = useState(false);

  // Community Digest simulator state
  const [activeCommunityPlatform, setActiveCommunityPlatform] = useState<
    'discord' | 'telegram' | 'slack'
  >('discord');

  // Smart Dainik News simulator state
  const [newsLang, setNewsLang] = useState<'hi' | 'en'>('hi');

  // Keyboard hotkeys 1-4 for quick tool switching
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['input', 'textarea'].includes((e.target as HTMLElement)?.tagName?.toLowerCase())) {
        return;
      }
      if (e.key === '1') {
        setActiveTool('resume');
        setLiveAnnouncement('Switched to AI Resume Shortlister.');
      } else if (e.key === '2') {
        setActiveTool('notes');
        setLiveAnnouncement('Switched to Course Note-Taker.');
      } else if (e.key === '3') {
        setActiveTool('digest');
        setLiveAnnouncement('Switched to Community Chat Digest.');
      } else if (e.key === '4') {
        setActiveTool('news');
        setLiveAnnouncement('Switched to Smart Dainik News.');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleTablistKeyDown = (e: React.KeyboardEvent) => {
    const currentIndex = TOOLS_LIST.findIndex((t) => t.id === activeTool);
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % TOOLS_LIST.length;
      const nextTool = TOOLS_LIST[nextIndex];
      if (nextTool) {
        setActiveTool(nextTool.id);
        setLiveAnnouncement(`Switched to ${nextTool.label} tool.`);
        document.getElementById(`tab-${nextTool.id}`)?.focus();
      }
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + TOOLS_LIST.length) % TOOLS_LIST.length;
      const prevTool = TOOLS_LIST[prevIndex];
      if (prevTool) {
        setActiveTool(prevTool.id);
        setLiveAnnouncement(`Switched to ${prevTool.label} tool.`);
        document.getElementById(`tab-${prevTool.id}`)?.focus();
      }
    } else if (e.key === 'Home') {
      e.preventDefault();
      const firstTool = TOOLS_LIST[0];
      if (firstTool) {
        setActiveTool(firstTool.id);
        setLiveAnnouncement(`Switched to ${firstTool.label} tool.`);
        document.getElementById(`tab-${firstTool.id}`)?.focus();
      }
    } else if (e.key === 'End') {
      e.preventDefault();
      const lastTool = TOOLS_LIST[TOOLS_LIST.length - 1];
      if (lastTool) {
        setActiveTool(lastTool.id);
        setLiveAnnouncement(`Switched to ${lastTool.label} tool.`);
        document.getElementById(`tab-${lastTool.id}`)?.focus();
      }
    }
  };

  const TOOLS_LIST = [
    {
      id: 'resume' as const,
      label: 'Resume',
      icon: FileText,
      hotkey: '1',
      jewelColor: '#2EFCC2',
      glow: 'rgba(46, 252, 194, 0.25)',
    },
    {
      id: 'notes' as const,
      label: 'Notes',
      icon: Headphones,
      hotkey: '2',
      jewelColor: '#D8B4FE',
      glow: 'rgba(216, 180, 254, 0.25)',
    },
    {
      id: 'digest' as const,
      label: 'Digest',
      icon: MessageSquare,
      hotkey: '3',
      jewelColor: '#FFA07A',
      glow: 'rgba(255, 160, 122, 0.25)',
    },
    {
      id: 'news' as const,
      label: 'Dainik',
      icon: Newspaper,
      hotkey: '4',
      jewelColor: '#34D399',
      glow: 'rgba(52, 211, 153, 0.25)',
    },
  ];

  return (
    <div className="w-full rounded-2xl bg-[#0B0E17] border border-white/10 overflow-hidden text-left font-sans shadow-[0_24px_60px_rgba(0,0,0,0.85)] transition-[border-color,box-shadow] duration-200 ease-out">
      {/* Screen reader live region */}
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {liveAnnouncement}
      </div>

      {/* =========================================================================
          FAUX-OS WINDOW CHROME HEADER BAR (Precision Jewel Dots + Tab Navigation)
          ========================================================================= */}
      <div className="flex items-center justify-between gap-2 px-3.5 sm:px-4 py-2.5 bg-[#0D1017] border-b border-white/[0.08]">
        {/* Left 3 Jewel Window Dots + Title */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]/60 shadow-[0_0_8px_rgba(255,95,86,0.35)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]/60 shadow-[0_0_8px_rgba(255,189,46,0.35)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29]/60 shadow-[0_0_8px_rgba(39,201,63,0.35)]" />
          </div>
          <span className="font-mono text-xs font-semibold text-white tracking-tight whitespace-nowrap">
            NorAI Studio
          </span>
        </div>

        {/* 4 Tool Selector Tabs with Physical Keycaps & Spring Indicators */}
        <div
          role="tablist"
          aria-label="NorAI Living Studio Tools"
          onKeyDown={handleTablistKeyDown}
          className="flex items-center rounded-xl bg-[#07080D] p-0.5 border border-white/10 text-xs shrink-0"
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
                tabIndex={isSelected ? 0 : -1}
                onClick={() => {
                  setActiveTool(tool.id);
                  setLiveAnnouncement(`Switched to ${tool.label} tool.`);
                }}
                title={`Press ${tool.hotkey} to switch`}
                className={cn(
                  'relative flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-[transform,color] duration-150 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2EFCC2] z-10 cursor-pointer active:scale-[0.97]',
                  isSelected
                    ? 'text-white font-semibold'
                    : 'text-white/75 hover:text-white hover:bg-white/[0.04]',
                )}
              >
                {isSelected && (
                  <motion.span
                    layoutId="heroStudioTabIndicator"
                    className="absolute inset-0 bg-[#141824] rounded-lg -z-10 border border-white/15 shadow-sm"
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { type: 'spring', stiffness: 450, damping: 32 }
                    }
                  />
                )}
                <Icon
                  className="w-3.5 h-3.5 shrink-0 transition-colors"
                  style={{ color: isSelected ? tool.jewelColor : undefined }}
                />
                <span className="text-xs">{tool.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          MAIN LIVING TOOL CONTENT (Tangible Human Outcomes & Results)
          ========================================================================= */}
      <AnimatePresence mode="wait">
        {/* =========================================================================
            TAB 1: AI RESUME SHORTLISTER (Electric Mint #2EFCC2)
            ========================================================================= */}
        {activeTool === 'resume' && (
          <motion.div
            key="resume"
            id="panel-resume"
            role="tabpanel"
            aria-labelledby="tab-resume"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Subheader */}
            <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 bg-[#07080D]/70 border-b border-white/[0.08] text-xs">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">AI Resume Shortlister</span>
                <span className="text-[11px] font-mono text-white/80 hidden sm:inline">
                  · Verified Vector Scoring · Top Match First
                </span>
              </div>

              <div className="flex items-center gap-1 bg-[#141824] p-0.5 rounded-lg border border-white/10 relative">
                <button
                  type="button"
                  onClick={() => setResumeSubTab('scorecard')}
                  className={cn(
                    'relative px-2.5 py-0.5 rounded-md text-[11px] font-medium transition-colors z-10 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2EFCC2]',
                    resumeSubTab === 'scorecard'
                      ? 'text-[#2EFCC2] font-semibold'
                      : 'text-white/75 hover:text-white',
                  )}
                >
                  {resumeSubTab === 'scorecard' && (
                    <motion.span
                      layoutId="resumeSubTabIndicator"
                      className="absolute inset-0 bg-[#2EFCC2]/10 rounded-md -z-10 border border-[#2EFCC2]/30"
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : { type: 'spring', stiffness: 500, damping: 35 }
                      }
                    />
                  )}
                  Applicant Scorecard
                </button>
                <button
                  type="button"
                  onClick={() => setResumeSubTab('highlights')}
                  className={cn(
                    'relative px-2.5 py-0.5 rounded-md text-[11px] font-medium transition-colors z-10 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2EFCC2]',
                    resumeSubTab === 'highlights'
                      ? 'text-[#2EFCC2] font-semibold'
                      : 'text-white/75 hover:text-white',
                  )}
                >
                  {resumeSubTab === 'highlights' && (
                    <motion.span
                      layoutId="resumeSubTabIndicator"
                      className="absolute inset-0 bg-[#2EFCC2]/10 rounded-md -z-10 border border-[#2EFCC2]/30"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                  Verified Strengths
                </button>
              </div>
            </div>

            {/* Subtab Body */}
            <div className="p-4 sm:p-5 space-y-3.5">
              {/* Candidate Selection List */}
              <div className="space-y-2" role="listbox" aria-label="Screened candidates">
                {CANDIDATES.map((cand) => {
                  const isSelected = selectedCandidate.id === cand.id;
                  return (
                    <button
                      key={cand.id}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        setSelectedCandidate(cand);
                        setLiveAnnouncement(`Selected applicant ${cand.name}`);
                      }}
                      className={cn(
                        'w-full text-left p-3 rounded-xl border transition-[transform,background-color,border-color] duration-150 flex items-center justify-between gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2EFCC2] cursor-pointer active:scale-[0.99]',
                        isSelected
                          ? 'bg-[#141824] border-white/20 shadow-md ring-1 ring-white/10'
                          : 'bg-[#0D1017] border-white/[0.06] hover:bg-[#111520] hover:border-white/15',
                      )}
                    >
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className="font-sans font-semibold text-sm text-white">
                            {cand.name}
                          </span>
                          <span
                            className="font-mono tabular-nums text-xs font-bold px-2 py-0.5 rounded-full border"
                            style={{
                              color: cand.statusColor,
                              backgroundColor: cand.statusBg,
                              borderColor: `${cand.statusColor}40`,
                            }}
                          >
                            {cand.score}% Match
                          </span>
                        </div>
                        <p className="text-xs text-white/80 leading-snug truncate">
                          {cand.role} · <span className="font-mono text-white/80 font-medium">{cand.experience}</span>
                        </p>
                      </div>

                      <div className="shrink-0 text-right">
                        <span
                          className="text-[11px] font-medium px-2.5 py-1 rounded-full border whitespace-nowrap hidden sm:inline-block"
                          style={{
                            color: cand.statusColor,
                            backgroundColor: cand.statusBg,
                            borderColor: `${cand.statusColor}30`,
                          }}
                        >
                          {cand.status}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Detail Drawer (Scorecard vs Highlights) */}
              {resumeSubTab === 'scorecard' ? (
                <div className="rounded-xl bg-[#0D1017] border border-white/[0.08] p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 font-mono font-medium text-white">
                      <Sparkles className="w-3.5 h-3.5 text-[#2EFCC2]" />
                      <span>Hiring Recommendation Rationale</span>
                    </div>
                    <span
                      className="font-mono text-xs font-semibold px-2 py-0.5 rounded-full border"
                      style={{
                        color: selectedCandidate.statusColor,
                        backgroundColor: selectedCandidate.statusBg,
                        borderColor: `${selectedCandidate.statusColor}30`,
                      }}
                    >
                      {selectedCandidate.status}
                    </span>
                  </div>

                  <p className="text-xs text-white/80 leading-relaxed">
                    {selectedCandidate.rationale}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {selectedCandidate.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-[#141824] text-[11px] font-medium text-white border border-white/10"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="rounded-xl bg-[#0D1017] border border-white/[0.08] p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 font-mono font-medium text-[#2EFCC2]">
                      <Check className="w-3.5 h-3.5" />
                      <span>Key Verified Achievements</span>
                    </div>
                    <span className="font-mono text-xs text-white/70">
                      {selectedCandidate.name}
                    </span>
                  </div>

                  <ul className="space-y-2 text-xs text-white/80">
                    {selectedCandidate.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#2EFCC2] shrink-0 mt-0.5">✓</span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Footer Bar */}
            <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 bg-[#07080D]/70 border-t border-white/[0.08] text-xs">
              <div className="text-white/80 flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2EFCC2]" />
                <span>Screened in seconds · Resumes deleted immediately after review</span>
              </div>
              <Link
                href="/products/resume-shortlister"
                className="font-medium text-[#2EFCC2] hover:text-[#1edba4] inline-flex items-center gap-1 group"
              >
                <span>Open Tool Fullscreen</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </motion.div>
        )}

        {/* =========================================================================
            TAB 2: AI COURSE NOTE-TAKER (Lavender #D8B4FE)
            ========================================================================= */}
        {activeTool === 'notes' && (
          <motion.div
            key="notes"
            id="panel-notes"
            role="tabpanel"
            aria-labelledby="tab-notes"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Subheader */}
            <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 bg-[#07080D]/70 border-b border-white/[0.08] text-xs">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">AI Course Note-Taker</span>
                <span className="text-[11px] font-mono text-[#D8B4FE] bg-[#D8B4FE]/10 px-2.5 py-0.5 rounded-full border border-[#D8B4FE]/20">
                  100% Free for Students
                </span>
              </div>
            </div>

            <div className="p-4 sm:p-5 space-y-4">
              {/* Audio Waveform Simulator */}
              <div className="rounded-xl bg-[#0D1017] border border-white/[0.08] p-3.5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                      className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-[#D8B4FE] hover:bg-[#c99dfc] text-[#07080D] flex items-center justify-center transition-transform active:scale-[0.95] cursor-pointer focus-visible:ring-2 focus-visible:ring-[#D8B4FE]"
                      aria-label={isPlayingAudio ? 'Pause Lecture Audio' : 'Play Lecture Audio'}
                    >
                      {isPlayingAudio ? (
                        <Pause className="w-4 h-4 fill-current" />
                      ) : (
                        <Play className="w-4 h-4 ml-0.5 fill-current" />
                      )}
                    </button>
                    <div>
                      <p className="text-xs font-semibold text-white">
                        Physics 101: Energy Conservation &amp; Thermodynamics
                      </p>
                      <p className="text-[11px] font-mono text-white/80">
                        08:42 / 54:00 · 1.5x Speed Clean Synthesis
                      </p>
                    </div>
                  </div>
                  <span className="font-mono tabular-nums text-xs text-[#D8B4FE] font-semibold px-2.5 py-0.5 rounded-full bg-[#D8B4FE]/10 border border-[#D8B4FE]/20">
                    {isPlayingAudio ? 'Transcribing...' : 'Audio Ready'}
                  </span>
                </div>

                {/* Animated Waveform Visualizer Canvas (Lavender #D8B4FE) */}
                <div className="h-8 px-2 py-1 bg-[#07080D] rounded-lg border border-white/[0.08] overflow-hidden flex items-center">
                  <WaveformCanvas
                    isPlaying={isPlayingAudio}
                    color="#D8B4FE"
                    height={26}
                    barCount={36}
                  />
                </div>
              </div>

              {/* Extracted Structured Outcome Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* LaTeX Math Extraction */}
                <div className="rounded-xl bg-[#0D1017] border border-white/[0.08] p-3.5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-semibold text-[#D8B4FE]">
                      LaTeX Formula Extraction
                    </span>
                    <span className="text-[10px] font-mono text-[#2EFCC2]">Verified ✓</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#141824] text-white border border-white/10 flex items-center justify-center min-h-[46px]">
                    <MathRenderer
                      math="\Delta U = Q - W"
                      displayMode={false}
                    />
                  </div>
                  <div className="text-[11px] text-white/80 leading-relaxed">
                    <MathText text="First Law of Thermodynamics: Internal energy change ($\Delta U$) equals heat added ($Q$) minus work done ($W$)." />
                  </div>
                </div>

                {/* Interactive Study Flashcard with 3D Flip */}
                <button
                  type="button"
                  onClick={() => setFlashcardFlipped(!flashcardFlipped)}
                  aria-expanded={flashcardFlipped}
                  aria-label={flashcardFlipped ? 'Hide flashcard answer' : 'Reveal flashcard answer'}
                  className="text-left rounded-xl bg-[#0D1017] border border-[#D8B4FE]/30 hover:border-[#D8B4FE]/60 p-3.5 space-y-2 transition-[transform,background-color,border-color] duration-150 ease-out hover:bg-[#111422] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D8B4FE] active:scale-[0.97]"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-semibold text-white">
                      Interactive Study Card
                    </span>
                    <span className="text-[10px] font-mono text-[#D8B4FE] bg-[#D8B4FE]/10 px-2 py-0.5 rounded-full border border-[#D8B4FE]/20">
                      Tap to Flip
                    </span>
                  </div>
                  <AnimatePresence mode="wait">
                    {flashcardFlipped ? (
                      <motion.div
                        key="answer"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-1 min-h-[46px] flex flex-col justify-center"
                      >
                        <span className="text-[10px] font-mono text-[#2EFCC2] uppercase font-bold">
                          Answer
                        </span>
                        <p className="text-xs text-white font-medium leading-snug">
                          <MathText text="$Q$ represents the net heat energy transferred into the thermodynamic system." />
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="question"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-1 min-h-[46px] flex flex-col justify-center"
                      >
                        <span className="text-[10px] font-mono text-white/80 uppercase">
                          Question (Card #01)
                        </span>
                        <p className="text-xs text-white font-medium leading-snug">
                          In the First Law formula, what physical quantity does $Q$ denote?
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </div>

            {/* Footer Bar */}
            <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 bg-[#07080D]/70 border-t border-white/[0.08] text-xs">
              <div className="text-white/80 flex items-center gap-2">
                <GraduationCap className="w-3.5 h-3.5 text-[#D8B4FE]" />
                <span>Turns 2-hour lecture audio &amp; slides into structured notes &amp; flashcards</span>
              </div>
              <Link
                href="/products/course-note-taker"
                className="font-medium text-[#D8B4FE] hover:text-[#c99dfc] inline-flex items-center gap-1 group"
              >
                <span>Try Note-Taker</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </motion.div>
        )}

        {/* =========================================================================
            TAB 3: COMMUNITY CHAT DIGEST (Coral #FFA07A)
            ========================================================================= */}
        {activeTool === 'digest' && (
          <motion.div
            key="digest"
            id="panel-digest"
            role="tabpanel"
            aria-labelledby="tab-digest"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Subheader */}
            <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 bg-[#07080D]/70 border-b border-white/[0.08] text-xs">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">Community Chat Digest</span>
                <span className="text-[11px] font-mono text-white/70 hidden sm:inline">
                  · 4,820 unread messages ➔ 3 key decisions
                </span>
              </div>

              {/* Platform Toggles */}
              <div className="flex items-center gap-1 bg-[#141824] p-0.5 rounded-lg border border-white/10 relative">
                {(['discord', 'telegram', 'slack'] as const).map((plat) => {
                  const isPlatActive = activeCommunityPlatform === plat;
                  return (
                    <button
                      key={plat}
                      type="button"
                      onClick={() => {
                        setActiveCommunityPlatform(plat);
                        setLiveAnnouncement(`Switched digest platform to ${plat}`);
                      }}
                      className={cn(
                        'relative px-2.5 py-0.5 rounded-md text-[11px] font-medium capitalize transition-colors z-10 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FFA07A]',
                        isPlatActive
                          ? 'text-[#FFA07A] font-semibold'
                          : 'text-white/75 hover:text-white',
                      )}
                    >
                      {isPlatActive && (
                        <motion.span
                          layoutId="communityPlatformIndicator"
                          className="absolute inset-0 bg-[#FFA07A]/10 rounded-md -z-10 border border-[#FFA07A]/30"
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
              {/* Tangible Outcome Metrics Bar */}
              <div className="grid grid-cols-3 gap-2.5 text-left">
                <div className="p-3 rounded-xl bg-[#0D1017] border border-white/[0.08]">
                  <span className="text-[10px] font-mono text-white/80 block">
                    Messages Condensed
                  </span>
                  <span className="font-mono tabular-nums text-sm sm:text-base text-white font-bold">
                    4,820 ➔ 3 Briefs
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-[#0D1017] border border-white/[0.08]">
                  <span className="text-[10px] font-mono text-white/80 block">
                    Time Saved
                  </span>
                  <span className="font-mono tabular-nums text-sm sm:text-base text-[#FFA07A] font-bold">
                    42 Minutes
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-[#0D1017] border border-white/[0.08]">
                  <span className="text-[10px] font-mono text-white/80 block">
                    Action Items Identified
                  </span>
                  <span className="font-mono tabular-nums text-sm sm:text-base text-[#2EFCC2] font-bold">
                    3 Decisions
                  </span>
                </div>
              </div>

              {/* Actionable Executive Decisions (Replaces Developer Jargon) */}
              <div className="space-y-2">
                <div className="rounded-xl bg-[#0D1017] border border-white/[0.08] p-3 flex items-start gap-3">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#2EFCC2]/10 text-[#2EFCC2] border border-[#2EFCC2]/20 shrink-0 mt-0.5">
                    LAUNCHED
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-white font-medium">
                      Payment gateway upgrade deployed successfully with zero customer downtime.
                    </p>
                    <p className="text-[11px] text-white/70 mt-0.5">
                      All webhooks verified · 100% operational
                    </p>
                  </div>
                </div>

                <div className="rounded-xl bg-[#0D1017] border border-white/[0.08] p-3 flex items-start gap-3">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#D8B4FE]/10 text-[#D8B4FE] border border-[#D8B4FE]/20 shrink-0 mt-0.5">
                    RESOLVED
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-white font-medium">
                      Mobile checkout bug resolved by core team; push update dispatched to users.
                    </p>
                    <p className="text-[11px] text-white/70 mt-0.5">
                      Fixed in 18 minutes · 0 error reports since patch
                    </p>
                  </div>
                </div>

                <div className="rounded-xl bg-[#0D1017] border border-white/[0.08] p-3 flex items-start gap-3">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#FFA07A]/10 text-[#FFA07A] border border-[#FFA07A]/20 shrink-0 mt-0.5">
                    ASSIGNED
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-white font-medium">
                      Documentation and API reference review assigned to team leads for Friday release.
                    </p>
                    <p className="text-[11px] text-white/70 mt-0.5">
                      Assigned to @infra-team &amp; @design
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Bar */}
            <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 bg-[#07080D]/70 border-t border-white/[0.08] text-xs">
              <div className="text-white/80 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#FFA07A]" />
                <span>Read daily team updates in 90 seconds instead of an hour</span>
              </div>
              <Link
                href="/products/chat-digest"
                className="font-medium text-[#FFA07A] hover:text-[#ff8f62] inline-flex items-center gap-1 group"
              >
                <span>Explore Chat Digest</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </motion.div>
        )}

        {/* =========================================================================
            TAB 4: SMART DAINIK NEWS (Laser Emerald #34D399)
            ========================================================================= */}
        {activeTool === 'news' && (
          <motion.div
            key="news"
            id="panel-news"
            role="tabpanel"
            aria-labelledby="tab-news"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Subheader */}
            <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 bg-[#07080D]/70 border-b border-white/[0.08] text-xs">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">Smart Dainik News</span>
                <span className="text-[11px] font-mono text-[#34D399] bg-[#34D399]/10 px-2 py-0.5 rounded-full border border-[#34D399]/20">
                  Verified Regional Gazette Alerts
                </span>
              </div>

              {/* Language Switcher */}
              <div className="flex items-center gap-1 bg-[#141824] p-0.5 rounded-lg border border-white/10 relative">
                <button
                  type="button"
                  onClick={() => {
                    setNewsLang('hi');
                    setLiveAnnouncement('समाचार भाषा हिंदी चुनी गई');
                  }}
                  className={cn(
                    'relative px-2.5 py-0.5 rounded-md text-[11px] font-medium transition-colors z-10 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#34D399]',
                    newsLang === 'hi'
                      ? 'text-[#34D399] font-semibold'
                      : 'text-white/75 hover:text-white',
                  )}
                >
                  {newsLang === 'hi' && (
                    <motion.span
                      layoutId="newsLangIndicator"
                      className="absolute inset-0 bg-[#34D399]/10 rounded-md -z-10 border border-[#34D399]/30"
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : { type: 'spring', stiffness: 500, damping: 35 }
                      }
                    />
                  )}
                  हिंदी (Hindi)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setNewsLang('en');
                    setLiveAnnouncement('Switched news language to English');
                  }}
                  className={cn(
                    'relative px-2.5 py-0.5 rounded-md text-[11px] font-medium transition-colors z-10 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#34D399]',
                    newsLang === 'en'
                      ? 'text-[#34D399] font-semibold'
                      : 'text-white/75 hover:text-white',
                  )}
                >
                  {newsLang === 'en' && (
                    <motion.span
                      layoutId="newsLangIndicator"
                      className="absolute inset-0 bg-[#34D399]/10 rounded-md -z-10 border border-[#34D399]/30"
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : { type: 'spring', stiffness: 500, damping: 35 }
                      }
                    />
                  )}
                  English
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-5 space-y-3.5">
              {/* Gazette Alert Card */}
              <div className="rounded-xl bg-[#0D1017] border border-white/[0.08] p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#34D399]/10 text-[#34D399] border border-[#34D399]/20">
                    {newsLang === 'hi'
                      ? 'उत्तर प्रदेश लोक सेवा आयोग (UPPSC)'
                      : 'UP Public Service Commission (UPPSC)'}
                  </span>
                  <span className="font-mono text-xs text-[#2EFCC2] font-medium">
                    {newsLang === 'hi' ? 'सत्यापित अधिसूचना ✓' : 'Verified Gazette ✓'}
                  </span>
                </div>

                <div>
                  <h4 className="font-sans font-semibold text-sm sm:text-base text-white">
                    {newsLang === 'hi'
                      ? 'सहायक समीक्षा अधिकारी (RO/ARO) भर्ती २०२६ — ४११ पद'
                      : 'Assistant Review Officer (RO/ARO) Recruitment 2026 — 411 Posts'}
                  </h4>
                  <p className="text-xs text-white/80 mt-1 leading-relaxed">
                    {newsLang === 'hi'
                      ? 'आयु सीमा २१-४० वर्ष, स्नातक डिग्री अनिवार्य, आवेदन की अंतिम तिथि १५ सितंबर २०२६। ओ-लेवल प्रमाण पत्र अनिवार्य।'
                      : 'Age limit 21–40 years, Graduate degree required, Final application deadline Sep 15, 2026. O-Level Certificate mandatory.'}
                  </p>
                </div>

                {/* Eligibility Badges */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="px-2.5 py-1 rounded-lg bg-[#141824] text-[11px] font-mono text-white border border-white/10">
                    🎓 {newsLang === 'hi' ? 'स्नातक डिग्री' : 'Graduate Degree'}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-[#141824] text-[11px] font-mono text-white border border-white/10">
                    📅 {newsLang === 'hi' ? 'आयु: २१-४० वर्ष' : 'Age: 21–40 Yrs'}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-[#141824] text-[11px] font-mono text-white border border-white/10">
                    💰 {newsLang === 'hi' ? 'वेतन लेवल-७ (₹४४,९००+)' : 'Pay Level-7 (₹44,900+)'}
                  </span>
                </div>

                {/* Status Bar */}
                <div className="pt-2 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#34D399]">
                    <span>{newsLang === 'hi' ? 'आवेदन पोर्टल सत्यापित ✓ (uppsc.up.nic.in)' : 'Official Apply Portal Verified ✓'}</span>
                  </div>
                  <span className="text-[11px] font-mono text-white/70">
                    {newsLang === 'hi' ? 'अंतिम तिथि: ४ दिन, १२ घंटे शेष' : 'Deadline: 4 days, 12 hours remaining'}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer Bar */}
            <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 bg-[#07080D]/70 border-t border-white/[0.08] text-xs">
              <div className="text-white/80 flex items-center gap-2">
                <Briefcase className="w-3.5 h-3.5 text-[#34D399]" />
                <span>Verified regional employment alerts with zero fake news or broken links</span>
              </div>
              <Link
                href="/products/smart-dainik-news"
                className="font-medium text-[#34D399] hover:text-[#2bc58d] inline-flex items-center gap-1 group"
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
