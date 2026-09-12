'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  Users,
  GraduationCap,
  Cpu,
  CheckCircle2,
  Terminal,
  Languages,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Radio,
  BookOpen,
  MapPin,
  Laptop,
  ChevronDown,
  Code2,
} from 'lucide-react';
import NextLink from 'next/link';
import type { Route } from 'next';

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

type TrackId = 'grassroots' | 'youth' | 'engineering';
type ContextMode = 'rural' | 'town';

interface TrackData {
  id: TrackId;
  tabLabel: string;
  badge: string;
  badgeVariant: 'ochre' | 'sage' | 'terracotta';
  icon: React.ElementType;
  title: string;
  tagline: string;
  targetAudience: string;
  prerequisites: string;
  duration: string;
  toolsCovered: string[];
  keyOutcomes: string[];
  capstoneProject: {
    title: string;
    description: string;
    badge: string;
  };
  syllabus: {
    title: string;
    description: string;
    points: string[];
  }[];
  ruralAdaptation: string;
  townAdaptation: string;
}

const TRACKS: TrackData[] = [
  {
    id: 'grassroots',
    tabLabel: '01. Grassroots & Seniors',
    badge: 'Tier 1: Everyday AI & Inclusion',
    badgeVariant: 'ochre',
    icon: Users,
    title: 'Everyday AI Literacy for Rural Communities & Elders',
    tagline:
      'Demystifying artificial intelligence through vernacular voice tools and real-world utility.',
    targetAudience:
      'Rural citizens, elders, village youth, local artisans, small shopkeepers, and first-time digital users.',
    prerequisites:
      'Zero technical background or prior computer experience required. Just a standard smartphone.',
    duration: '1-Day Interactive Masterclass (3–4 Hours)',
    toolsCovered: [
      'ChatGPT (Voice & Hindi)',
      'Google Gemini (Multilingual)',
      'Voice-to-Text Utilities',
      'Smart Translation Assistants',
      'AI Safety & Scam Radar',
    ],
    capstoneProject: {
      title: 'Hindi Jan-Seva Voice Letter Drafter',
      description:
        'Citizens speak in Hindi to automatically format formal administrative applications and verify welfare eligibility.',
      badge: 'Take-Home Utility',
    },
    keyOutcomes: [
      'Speak or type in Hindi/vernacular to draft formal letters, complaints, or administrative applications.',
      'Access instant agricultural advice, weather guidance, and government welfare scheme summaries.',
      'Recognize and avoid AI-generated voice scams, phishing messages, and digital misinformation.',
      'Gain independence in day-to-day smartphone queries without requiring third-party assistance.',
    ],
    syllabus: [
      {
        title: 'Demystifying AI in Simple Hindi',
        description:
          'What is artificial intelligence really? Breaking down misconceptions without technical jargon.',
        points: [
          'How AI thinks and responds',
          'Safe vs. unsafe uses of AI',
          'Smartphone-first access',
        ],
      },
      {
        title: 'Voice-First Problem Solving',
        description:
          'Hands-on practice asking questions, seeking government scheme eligibility, and drafting documents.',
        points: [
          'Vernacular speech inputs',
          'Drafting Hindi letters & forms',
          'Crop & business queries',
        ],
      },
      {
        title: 'Digital Safety & Fraud Prevention',
        description:
          'Empowering elders and rural citizens against emerging deepfake scams and fraudulent calls.',
        points: [
          'Spotting cloned voices & scams',
          'Privacy on public Wi-Fi',
          'Fact-checking online news',
        ],
      },
    ],
    ruralAdaptation:
      'Conducted in community halls or Panchayat Bhawans with projector visual aids, local dialect examples, and assisted 1-on-1 smartphone walkthroughs.',
    townAdaptation:
      'Held in local community centers and senior citizen clubs with customized workflows for household budgeting and small business administration.',
  },
  {
    id: 'youth',
    tabLabel: '02. School & College Youth',
    badge: 'Tier 2: Academic & Career Foundations',
    badgeVariant: 'sage',
    icon: GraduationCap,
    title: 'AI Productivity & Research for Young Learners',
    tagline:
      'Empowering students to turn AI into a 24/7 personal tutor, study partner, and creative accelerator.',
    targetAudience:
      'High school students, diploma candidates, and regional degree college undergraduates.',
    prerequisites: 'Basic familiarity with a smartphone or personal computer.',
    duration: '1-Day Intensive Session (4–5 Hours)',
    toolsCovered: [
      'NorAI Course Note-Taker',
      'Advanced Prompt Frameworks',
      'Research & Paper Summarizers',
      'Coding Assistants (VS Code AI)',
      'Citation & Grounding Tools',
    ],
    capstoneProject: {
      title: 'Autonomous STEM Exam Flashcard Generator',
      description:
        'Turns lecture audio recordings and textbook PDFs into LaTeX flashcard decks and practice quizzes in seconds.',
      badge: 'Academic Study Engine',
    },
    keyOutcomes: [
      'Turn complex textbook chapters and video lectures into structured, timestamped study cards in seconds.',
      'Use multi-modal AI to explain difficult STEM concepts, step-by-step calculus, and scientific proofs.',
      'Write first automation scripts in Python/JavaScript with guided AI code completions.',
      'Master academic ethics: how to cite sources, verify hallucinated data, and avoid plagiarism.',
    ],
    syllabus: [
      {
        title: 'The AI Study Engine',
        description:
          'Techniques to master complex curriculum material 3x faster with interactive interrogation.',
        points: [
          'Structured inquiry frameworks',
          'Socratic dialogue prompts',
          'LaTeX math extraction',
        ],
      },
      {
        title: 'Lecture-to-Notes Mastery',
        description:
          'Hands-on practice using NorAI Course Note-Taker to convert webinars and lectures into flashcards.',
        points: ['Multi-modal transcription', 'Key takeaway synthesis', 'Practice quiz generation'],
      },
      {
        title: 'Introduction to Computational Thinking',
        description:
          'Demystifying how software works and building first interactive mini-apps with AI coding tools.',
        points: [
          'Prompt-to-code workflows',
          'Debugging syntax errors',
          'Launching first web pages',
        ],
      },
    ],
    ruralAdaptation:
      'Bilingual delivery focusing on bridging English educational barriers with Hindi explanation scaffolds.',
    townAdaptation:
      'Integrated with institutional computer labs with dedicated tracks on competitive exam prep (JEE, NEET, GATE) and career resume crafting.',
  },
  {
    id: 'engineering',
    tabLabel: '03. Advanced Engineering Hubs',
    badge: 'Tier 3: Production AI & Builders',
    badgeVariant: 'terracotta',
    icon: Cpu,
    title: 'Deterministic AI Systems & MCP Architecture',
    tagline:
      'Moving from superficial prompt wrappers to high-accuracy, sub-second production AI engineering.',
    targetAudience:
      'Computer Science & IT students, polytechnic engineers, open-source contributors, and aspiring founders in towns and university hubs.',
    prerequisites: 'Comfort with TypeScript, Python, or basic web development. Laptop required.',
    duration: '2-Day Live-Coding Masterclass & Hackathon',
    toolsCovered: [
      'Model Context Protocol (MCP)',
      'vLLM & Local Quantization',
      'PostgreSQL + pgvector',
      'Next.js 15 & Fastify APIs',
      'Deterministic JSON Schemas',
    ],
    capstoneProject: {
      title: 'Local Model Context Protocol (MCP) SQLite Tool',
      description:
        'Production MCP server connecting local open-weight LLMs directly to structured databases with zero data leaks.',
      badge: 'Live Hackathon Build',
    },
    keyOutcomes: [
      'Build and deploy production-grade MCP tool servers connecting LLMs to live databases and system tools.',
      'Serve and quantize open-weight models (Llama, Mistral, Gemma) locally on budget GPUs with sub-second SLAs.',
      'Implement hybrid dense + sparse vector search with zero hallucination citation guardrails.',
      'Deploy full-stack micro-SaaS applications to production and compete for NorAI fellowship pathways.',
    ],
    syllabus: [
      {
        title: 'MCP Server Architecture',
        description:
          'Writing type-safe Model Context Protocol servers in TypeScript and Python for autonomous tool routing.',
        points: [
          'JSON-RPC communication',
          'Type-safe schema definitions',
          'Tool sandboxing & safety',
        ],
      },
      {
        title: 'Local Neural Serving & vLLM',
        description:
          'Optimizing open-weight LLMs with GGUF/AWQ quantization for sub-second in-RAM execution.',
        points: ['vLLM engine setup', 'Continuous batching', 'Memory caching strategies'],
      },
      {
        title: 'Hybrid Vector RAG Pipelines',
        description:
          'Grounding AI in custom enterprise documents using pgvector, Qdrant, and reciprocal rank fusion.',
        points: ['Dense + sparse indexing', 'Chunking optimization', 'Citation verification'],
      },
      {
        title: 'Full-Stack Micro-SaaS Capstone',
        description:
          'Deploying a live Next.js 15 AI web application with rate limiting and deterministic error boundaries.',
        points: ['Streaming edge responses', 'Zero data retention', 'Live Vercel/VPS deploy'],
      },
    ],
    ruralAdaptation:
      'Focus on setting up lightweight local offline LLMs (Ollama) that operate without continuous high-speed broadband.',
    townAdaptation:
      'Full cloud + edge orchestration hackathon with mentorship, live portfolio code reviews, and direct interview pipelines.',
  },
];

export function WorkshopTrackExplorer() {
  const [activeTrackId, setActiveTrackId] = useState<TrackId>('grassroots');
  const [contextMode, setContextMode] = useState<ContextMode>('rural');
  const [expandedModuleIdx, setExpandedModuleIdx] = useState<number | null>(0);
  const shouldReduceMotion = useReducedMotion();

  const activeTrack: TrackData =
    TRACKS.find((t) => t.id === activeTrackId) || (TRACKS[0] as TrackData);

  return (
    <div className="w-full text-left font-sans space-y-6">
      {/* Track Selector & Context Switcher Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-[rgba(20,28,43,0.08)] pb-4">
        {/* Track Selection Tabs */}
        <div
          className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-canvas-sunken border border-[rgba(20,28,43,0.08)]"
          role="tablist"
          aria-label="Workshop Tiers"
        >
          {TRACKS.map((track) => {
            const isSelected = activeTrackId === track.id;
            return (
              <button
                key={track.id}
                role="tab"
                aria-selected={isSelected}
                onClick={() => {
                  setActiveTrackId(track.id);
                  setExpandedModuleIdx(0);
                }}
                className={`relative px-3.5 py-2 rounded-lg font-sans text-xs md:text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terra-500 ${
                  isSelected
                    ? 'text-ink-primary'
                    : 'text-ink-secondary hover:text-ink-primary hover:bg-canvas-paper/50'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeTrackPill"
                    className="absolute inset-0 rounded-lg bg-canvas-paper border border-[rgba(20,28,43,0.12)] shadow-xs"
                    transition={{ type: 'spring', duration: 0.35, bounce: 0.1 }}
                  />
                )}
                <span className="relative z-10">{track.tabLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Geographic Delivery Context Toggle */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-canvas-sunken border border-[rgba(20,28,43,0.08)] self-start sm:self-auto">
          <span className="text-[11px] font-mono font-medium text-ink-secondary px-2 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-terra-600" aria-hidden="true" />
            <span>Context:</span>
          </span>
          <button
            type="button"
            onClick={() => setContextMode('rural')}
            className={`relative px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
              contextMode === 'rural'
                ? 'text-terra-600'
                : 'text-ink-secondary hover:text-ink-primary'
            }`}
          >
            {contextMode === 'rural' && (
              <motion.div
                layoutId="activeContextPill"
                className="absolute inset-0 rounded-lg bg-canvas-paper border border-[rgba(20,28,43,0.08)] shadow-xs"
                transition={{ type: 'spring', duration: 0.3, bounce: 0.08 }}
              />
            )}
            <span className="relative z-10">Rural / Village</span>
          </button>
          <button
            type="button"
            onClick={() => setContextMode('town')}
            className={`relative px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
              contextMode === 'town'
                ? 'text-terra-600'
                : 'text-ink-secondary hover:text-ink-primary'
            }`}
          >
            {contextMode === 'town' && (
              <motion.div
                layoutId="activeContextPill"
                className="absolute inset-0 rounded-lg bg-canvas-paper border border-[rgba(20,28,43,0.08)] shadow-xs"
                transition={{ type: 'spring', duration: 0.3, bounce: 0.08 }}
              />
            )}
            <span className="relative z-10">Town / Campus</span>
          </button>
        </div>
      </div>

      {/* Main Animated Track Workbench */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeTrack.id}-${contextMode}`}
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
          transition={{ duration: 0.22, ease: EASE_OUT }}
          className="rounded-2xl bg-canvas-paper border border-[rgba(20,28,43,0.08)] p-6 sm:p-8 md:p-10 space-y-8"
        >
          {/* Header & Metadata Banner */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-[rgba(20,28,43,0.06)]">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="font-mono text-xs font-semibold px-2.5 py-0.5 rounded bg-canvas-sunken text-terra-600 border border-[rgba(20,28,43,0.08)]">
                  {activeTrack.badge}
                </span>
                <span className="font-mono text-xs text-ink-secondary flex items-center gap-1.5">
                  <Radio className="w-3 h-3 text-sage-600 animate-pulse" aria-hidden="true" />
                  <span>{activeTrack.duration}</span>
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl text-ink-primary font-normal leading-tight">
                {activeTrack.title}
              </h3>

              <p className="text-sm text-ink-body leading-relaxed max-w-2xl font-sans">
                {activeTrack.tagline}
              </p>
            </div>

            {/* Quick Meta Card */}
            <div className="shrink-0 rounded-xl bg-canvas-base border border-[rgba(20,28,43,0.08)] p-4 space-y-3 lg:w-80">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-ink-secondary block font-semibold">
                  Target Audience
                </span>
                <span className="text-xs text-ink-primary font-medium mt-0.5 block leading-snug">
                  {activeTrack.targetAudience}
                </span>
              </div>
              <div className="pt-2 border-t border-[rgba(20,28,43,0.06)]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-ink-secondary block font-semibold">
                  Prerequisites
                </span>
                <span className="text-xs text-ink-body mt-0.5 block leading-snug">
                  {activeTrack.prerequisites}
                </span>
              </div>
            </div>
          </div>

          {/* Context Calibration Strip */}
          <div className="rounded-xl bg-canvas-base border border-[rgba(20,28,43,0.08)] p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-canvas-sunken border border-[rgba(20,28,43,0.08)] text-terra-600 flex items-center justify-center shrink-0 mt-0.5">
                {contextMode === 'rural' ? (
                  <Languages className="w-3.5 h-3.5" aria-hidden="true" />
                ) : (
                  <Laptop className="w-3.5 h-3.5" aria-hidden="true" />
                )}
              </div>
              <div>
                <div className="text-[11px] font-mono font-semibold text-terra-600 uppercase tracking-wider">
                  {contextMode === 'rural'
                    ? 'Tailored for Rural Villages & Gram Panchayats'
                    : 'Tailored for Semi-Urban Towns & Collegiate Labs'}
                </div>
                <p className="text-xs text-ink-body mt-0.5 leading-relaxed">
                  {contextMode === 'rural'
                    ? activeTrack.ruralAdaptation
                    : activeTrack.townAdaptation}
                </p>
              </div>
            </div>
            <span className="shrink-0 text-[11px] font-mono text-sage-800 font-medium px-2 py-0.5 rounded bg-sage-50/70 border border-sage-200">
              Ground-Calibrated
            </span>
          </div>

          {/* Two-Column Grid: Curriculum Modules (Col 7) & Capstone/Outcomes (Col 5) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Syllabus Flow with Modules */}
            <div className="lg:col-span-7 space-y-3.5">
              <div className="flex items-center gap-2 pb-1 border-b border-[rgba(20,28,43,0.06)]">
                <BookOpen className="w-3.5 h-3.5 text-terra-600" aria-hidden="true" />
                <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-primary">
                  Interactive Curriculum Modules
                </h4>
              </div>

              <div className="space-y-2.5">
                {activeTrack.syllabus.map((item, idx) => {
                  const isExpanded = expandedModuleIdx === idx;
                  return (
                    <div
                      key={item.title}
                      onClick={() => setExpandedModuleIdx(isExpanded ? null : idx)}
                      className={`rounded-xl border transition-colors cursor-pointer p-4 space-y-1.5 ${
                        isExpanded
                          ? 'bg-canvas-base border-[rgba(20,28,43,0.16)] shadow-xs'
                          : 'bg-canvas-base/60 border-[rgba(20,28,43,0.08)] hover:border-[rgba(20,28,43,0.14)]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] font-bold text-terra-600">
                          MODULE 0{idx + 1}
                        </span>
                        <div className="flex items-center gap-2">
                          <Terminal className="w-3 h-3 text-ink-secondary" aria-hidden="true" />
                          <ChevronDown
                            className={`w-3.5 h-3.5 text-ink-secondary transition-transform duration-200 ${
                              isExpanded ? 'rotate-180 text-terra-600' : ''
                            }`}
                            aria-hidden="true"
                          />
                        </div>
                      </div>

                      <h5 className="font-sans font-semibold text-sm text-ink-primary">
                        {item.title}
                      </h5>

                      <p className="text-xs text-ink-body leading-relaxed">{item.description}</p>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.18, ease: EASE_OUT }}
                            className="pt-2 flex flex-wrap gap-1.5 overflow-hidden"
                          >
                            {item.points.map((pt) => (
                              <span
                                key={pt}
                                className="font-mono text-[10px] px-2 py-0.5 rounded bg-canvas-paper text-ink-primary border border-[rgba(20,28,43,0.08)]"
                              >
                                {pt}
                              </span>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Capstone Utility, Outcomes & Stack */}
            <div className="lg:col-span-5 space-y-5">
              {/* Capstone Project Box */}
              <div className="rounded-xl bg-canvas-base border border-[rgba(20,28,43,0.08)] p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-terra-600 px-2 py-0.5 rounded bg-canvas-sunken border border-[rgba(20,28,43,0.06)]">
                    {activeTrack.capstoneProject.badge}
                  </span>
                  <Code2 className="w-3.5 h-3.5 text-terra-600" aria-hidden="true" />
                </div>
                <h5 className="font-display text-lg text-ink-primary font-normal">
                  {activeTrack.capstoneProject.title}
                </h5>
                <p className="text-xs text-ink-body leading-relaxed">
                  {activeTrack.capstoneProject.description}
                </p>
              </div>

              {/* Measurable Outcomes */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-1.5 pb-1 border-b border-[rgba(20,28,43,0.06)]">
                  <ShieldCheck className="w-3.5 h-3.5 text-sage-600" aria-hidden="true" />
                  <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-primary">
                    Measurable Outcomes
                  </h4>
                </div>

                <div className="rounded-xl bg-canvas-base border border-[rgba(20,28,43,0.08)] p-4 space-y-2.5">
                  {activeTrack.keyOutcomes.map((outcome, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-xs text-ink-body leading-relaxed"
                    >
                      <CheckCircle2
                        className="w-3.5 h-3.5 text-sage-600 shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools & Protocols */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-1.5 pb-1 border-b border-[rgba(20,28,43,0.06)]">
                  <Sparkles className="w-3.5 h-3.5 text-ochre-600" aria-hidden="true" />
                  <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-primary">
                    Verified Tool Stack
                  </h4>
                </div>

                <div className="rounded-xl bg-canvas-base border border-[rgba(20,28,43,0.08)] p-3.5 flex flex-wrap gap-1.5">
                  {activeTrack.toolsCovered.map((tool) => (
                    <span
                      key={tool}
                      className="font-mono text-[11px] px-2 py-0.5 rounded bg-canvas-paper border border-[rgba(20,28,43,0.08)] text-ink-primary"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-1">
                <NextLink
                  href={`/contact?service=workshop-${activeTrack.id}` as Route}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#141C2B] px-5 py-3 font-sans text-xs font-semibold text-[#F5F0EA] hover:bg-[#1F2B3E] active:scale-[0.98] transition-all group"
                >
                  <span>Request This Track for Your Institution</span>
                  <ArrowRight
                    className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </NextLink>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default WorkshopTrackExplorer;
