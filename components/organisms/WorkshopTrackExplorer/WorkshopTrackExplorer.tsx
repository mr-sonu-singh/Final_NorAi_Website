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
    tagline: 'Demystifying artificial intelligence through vernacular voice tools and real-world utility.',
    targetAudience: 'Rural citizens, elders, village youth, local artisans, small shopkeepers, and first-time digital users.',
    prerequisites: 'Zero technical background or prior computer experience required. Just a standard smartphone.',
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
      description: 'Citizens speak in Hindi to automatically format formal administrative applications and verify welfare eligibility.',
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
        description: 'What is artificial intelligence really? Breaking down misconceptions without technical jargon.',
        points: ['How AI thinks and responds', 'Safe vs. unsafe uses of AI', 'Smartphone-first access'],
      },
      {
        title: 'Voice-First Problem Solving',
        description: 'Hands-on practice asking questions, seeking government scheme eligibility, and drafting documents.',
        points: ['Vernacular speech inputs', 'Drafting Hindi letters & forms', 'Crop & business queries'],
      },
      {
        title: 'Digital Safety & Fraud Prevention',
        description: 'Empowering elders and rural citizens against emerging deepfake scams and fraudulent calls.',
        points: ['Spotting cloned voices & scams', 'Privacy on public Wi-Fi', 'Fact-checking online news'],
      },
    ],
    ruralAdaptation: 'Conducted in community halls or Panchayat Bhawans with projector visual aids, local dialect examples, and assisted 1-on-1 smartphone walkthroughs.',
    townAdaptation: 'Held in local community centers and senior citizen clubs with customized workflows for household budgeting and small business administration.',
  },
  {
    id: 'youth',
    tabLabel: '02. School & College Youth',
    badge: 'Tier 2: Academic & Career Foundations',
    badgeVariant: 'sage',
    icon: GraduationCap,
    title: 'AI Productivity & Research for Young Learners',
    tagline: 'Empowering students to turn AI into a 24/7 personal tutor, study partner, and creative accelerator.',
    targetAudience: 'High school students, diploma candidates, and regional degree college undergraduates.',
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
      description: 'Turns lecture audio recordings and textbook PDFs into LaTeX flashcard decks and practice quizzes in seconds.',
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
        description: 'Techniques to master complex curriculum material 3x faster with interactive interrogation.',
        points: ['Structured inquiry frameworks', 'Socratic dialogue prompts', 'LaTeX math extraction'],
      },
      {
        title: 'Lecture-to-Notes Mastery',
        description: 'Hands-on practice using NorAI Course Note-Taker to convert webinars and lectures into flashcards.',
        points: ['Multi-modal transcription', 'Key takeaway synthesis', 'Practice quiz generation'],
      },
      {
        title: 'Introduction to Computational Thinking',
        description: 'Demystifying how software works and building first interactive mini-apps with AI coding tools.',
        points: ['Prompt-to-code workflows', 'Debugging syntax errors', 'Launching first web pages'],
      },
    ],
    ruralAdaptation: 'Bilingual delivery focusing on bridging English educational barriers with Hindi explanation scaffolds.',
    townAdaptation: 'Integrated with institutional computer labs with dedicated tracks on competitive exam prep (JEE, NEET, GATE) and career resume crafting.',
  },
  {
    id: 'engineering',
    tabLabel: '03. Advanced Engineering Hubs',
    badge: 'Tier 3: Production AI & Builders',
    badgeVariant: 'terracotta',
    icon: Cpu,
    title: 'Deterministic AI Systems & MCP Architecture',
    tagline: 'Moving from superficial prompt wrappers to high-accuracy, sub-second production AI engineering.',
    targetAudience: 'Computer Science & IT students, polytechnic engineers, open-source contributors, and aspiring founders in towns and university hubs.',
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
      description: 'Production MCP server connecting local open-weight LLMs directly to structured databases with zero data leaks.',
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
        description: 'Writing type-safe Model Context Protocol servers in TypeScript and Python for autonomous tool routing.',
        points: ['JSON-RPC communication', 'Type-safe schema definitions', 'Tool sandboxing & safety'],
      },
      {
        title: 'Local Neural Serving & vLLM',
        description: 'Optimizing open-weight LLMs with GGUF/AWQ quantization for sub-second in-RAM execution.',
        points: ['vLLM engine setup', 'Continuous batching', 'Memory caching strategies'],
      },
      {
        title: 'Hybrid Vector RAG Pipelines',
        description: 'Grounding AI in custom enterprise documents using pgvector, Qdrant, and reciprocal rank fusion.',
        points: ['Dense + sparse indexing', 'Chunking optimization', 'Citation verification'],
      },
      {
        title: 'Full-Stack Micro-SaaS Capstone',
        description: 'Deploying a live Next.js 15 AI web application with rate limiting and deterministic error boundaries.',
        points: ['Streaming edge responses', 'Zero data retention', 'Live Vercel/VPS deploy'],
      },
    ],
    ruralAdaptation: 'Focus on setting up lightweight local offline LLMs (Ollama) that operate without continuous high-speed broadband.',
    townAdaptation: 'Full cloud + edge orchestration hackathon with mentorship, live portfolio code reviews, and direct interview pipelines.',
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
    <div className="w-full text-left font-sans space-y-8 select-none">
      {/* Track Selector Navigation Tabs with Sliding Spring Pill */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-[rgba(13,37,61,0.08)] pb-4">
        {/* Track Pills */}
        <div className="flex flex-wrap items-center gap-2 p-1 rounded-2xl bg-canvas-sunken/70 border border-[rgba(13,37,61,0.06)]" role="tablist" aria-label="Workshop Tiers">
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
                className={`relative px-4 py-2.5 rounded-xl font-sans text-xs md:text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-terra-500 focus-visible:ring-offset-canvas-sunken ${
                  isSelected
                    ? 'text-ink-primary'
                    : 'text-ink-secondary hover:text-ink-primary hover:bg-canvas-paper/40'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeTrackPill"
                    className="absolute inset-0 rounded-xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] shadow-xs"
                    transition={{ type: 'spring', duration: 0.35, bounce: 0.1 }}
                  />
                )}
                <span className="relative z-10">{track.tabLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Geographic Context Switcher with Spring Indicator */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-canvas-sunken border border-[rgba(13,37,61,0.08)] shrink-0 self-start sm:self-auto">
          <span className="text-[11px] font-mono font-medium text-ink-secondary px-2 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-terra-500" />
            <span>Delivery Context:</span>
          </span>
          <button
            type="button"
            onClick={() => setContextMode('rural')}
            className={`relative px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
              contextMode === 'rural' ? 'text-terra-600' : 'text-ink-secondary hover:text-ink-primary'
            }`}
          >
            {contextMode === 'rural' && (
              <motion.div
                layoutId="activeContextPill"
                className="absolute inset-0 rounded-xl bg-canvas-paper border border-[rgba(13,37,61,0.10)] shadow-2xs"
                transition={{ type: 'spring', duration: 0.3, bounce: 0.08 }}
              />
            )}
            <span className="relative z-10">Rural / Village</span>
          </button>
          <button
            type="button"
            onClick={() => setContextMode('town')}
            className={`relative px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
              contextMode === 'town' ? 'text-terra-600' : 'text-ink-secondary hover:text-ink-primary'
            }`}
          >
            {contextMode === 'town' && (
              <motion.div
                layoutId="activeContextPill"
                className="absolute inset-0 rounded-xl bg-canvas-paper border border-[rgba(13,37,61,0.10)] shadow-2xs"
                transition={{ type: 'spring', duration: 0.3, bounce: 0.08 }}
              />
            )}
            <span className="relative z-10">Town / Campus</span>
          </button>
        </div>
      </div>

      {/* Main Animated Track Detail Card (AnimatePresence depth scale entrance) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeTrack.id}-${contextMode}`}
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16, scale: shouldReduceMotion ? 1 : 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -10, scale: 0.99 }}
          transition={{ duration: 0.26, ease: EASE_OUT }}
          className="rounded-3xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] p-6 md:p-10 shadow-md space-y-8"
        >
          {/* Card Header & Meta Ribbon */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-[rgba(13,37,61,0.08)]">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-lg border bg-terra-50 text-terra-600 border-terra-500/20">
                  {activeTrack.badge}
                </span>
                <span className="font-mono text-xs text-ink-secondary flex items-center gap-1.5">
                  <Radio className="w-3 h-3 text-sage-600 animate-pulse" />
                  <span>{activeTrack.duration}</span>
                </span>
              </div>

              <h3 className="font-display text-3xl sm:text-4xl text-ink-primary font-normal leading-tight">
                {activeTrack.title}
              </h3>

              <p className="text-base text-ink-body leading-relaxed">
                {activeTrack.tagline}
              </p>
            </div>

            {/* Quick Meta Box */}
            <div className="shrink-0 rounded-2xl bg-canvas-base border border-[rgba(13,37,61,0.08)] p-5 space-y-3 lg:w-76 shadow-2xs">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-ink-secondary block">
                  Target Audience
                </span>
                <span className="text-xs text-ink-primary font-medium mt-0.5 block leading-snug">
                  {activeTrack.targetAudience}
                </span>
              </div>
              <div className="pt-2 border-t border-[rgba(13,37,61,0.06)]">
                <span className="text-[11px] font-mono uppercase tracking-wider text-ink-secondary block">
                  Prerequisites
                </span>
                <span className="text-xs text-ink-body mt-0.5 block leading-snug">
                  {activeTrack.prerequisites}
                </span>
              </div>
            </div>
          </div>

          {/* Adaptive Delivery Banner */}
          <div className="rounded-2xl bg-canvas-base border border-terra-500/20 p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xs">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-terra-50 border border-terra-500/20 text-terra-600 flex items-center justify-center shrink-0 mt-0.5">
                {contextMode === 'rural' ? (
                  <Languages className="w-4 h-4" />
                ) : (
                  <Laptop className="w-4 h-4" />
                )}
              </div>
              <div>
                <div className="text-xs font-mono font-semibold text-terra-600 uppercase tracking-wider">
                  {contextMode === 'rural'
                    ? 'Adapted for Rural Villages & Gram Panchayats'
                    : 'Adapted for Semi-Urban Towns & Campus Labs'}
                </div>
                <p className="text-xs md:text-sm text-ink-body mt-0.5">
                  {contextMode === 'rural'
                    ? activeTrack.ruralAdaptation
                    : activeTrack.townAdaptation}
                </p>
              </div>
            </div>
            <span className="shrink-0 text-xs font-mono text-sage-800 font-medium px-2.5 py-1 rounded-lg bg-sage-50 border border-sage-200">
              Context Calibrated
            </span>
          </div>

          {/* Two-Column Details: Syllabus Modules (Expandable) & Practical Outcomes */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Syllabus Flow with Expandable Modules (Col 7) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-terra-500" />
                <h4 className="font-display text-xl text-ink-primary font-normal">
                  Structured Curriculum Flow (Interactive Modules)
                </h4>
              </div>

              <div className="space-y-3">
                {activeTrack.syllabus.map((item, idx) => {
                  const isExpanded = expandedModuleIdx === idx;
                  return (
                    <motion.div
                      key={item.title}
                      layout
                      onClick={() => setExpandedModuleIdx(isExpanded ? null : idx)}
                      className={`rounded-2xl border transition-all cursor-pointer p-5 space-y-2 ${
                        isExpanded
                          ? 'bg-canvas-base border-terra-500/30 shadow-xs'
                          : 'bg-canvas-base/70 border-[rgba(13,37,61,0.08)] hover:border-[rgba(13,37,61,0.16)]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-semibold text-terra-600">
                          Module 0{idx + 1}
                        </span>
                        <div className="flex items-center gap-2">
                          <Terminal className="w-3.5 h-3.5 text-ink-secondary" />
                          <ChevronDown
                            className={`w-4 h-4 text-ink-secondary transition-transform duration-200 ${
                              isExpanded ? 'rotate-180 text-terra-500' : ''
                            }`}
                          />
                        </div>
                      </div>

                      <h5 className="font-sans font-semibold text-sm text-ink-primary">
                        {item.title}
                      </h5>

                      <p className="text-xs text-ink-body leading-relaxed">
                        {item.description}
                      </p>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2, ease: EASE_OUT }}
                            className="pt-2 flex flex-wrap gap-1.5 overflow-hidden"
                          >
                            {item.points.map((pt) => (
                              <span
                                key={pt}
                                className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-canvas-paper text-ink-primary border border-[rgba(13,37,61,0.08)] shadow-2xs"
                              >
                                {pt}
                              </span>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Practical Outcomes, Tools & Capstone (Col 5) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Capstone Project Card */}
              <div className="rounded-2xl bg-canvas-base border border-terra-500/20 p-5 space-y-2.5 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-terra-600 px-2 py-0.5 rounded bg-terra-50 border border-terra-500/20">
                    {activeTrack.capstoneProject.badge}
                  </span>
                  <Code2 className="w-4 h-4 text-terra-500" />
                </div>
                <h5 className="font-display text-lg text-ink-primary font-normal">
                  {activeTrack.capstoneProject.title}
                </h5>
                <p className="text-xs text-ink-body leading-relaxed">
                  {activeTrack.capstoneProject.description}
                </p>
              </div>

              {/* Practical Outcomes */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-sage-600" />
                  <h4 className="font-display text-xl text-ink-primary font-normal">
                    Measurable Outcomes
                  </h4>
                </div>

                <div className="rounded-2xl bg-canvas-base border border-[rgba(13,37,61,0.08)] p-5 space-y-3 shadow-2xs">
                  {activeTrack.keyOutcomes.map((outcome, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-ink-body leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-sage-600 shrink-0 mt-0.5" />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools Covered */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-ochre-600" />
                  <h4 className="font-display text-xl text-ink-primary font-normal">
                    Tools &amp; Protocols Covered
                  </h4>
                </div>

                <div className="rounded-2xl bg-canvas-base border border-[rgba(13,37,61,0.08)] p-5 flex flex-wrap gap-2 shadow-2xs">
                  {activeTrack.toolsCovered.map((tool) => (
                    <span
                      key={tool}
                      className="font-mono text-xs font-medium px-2.5 py-1 rounded-lg bg-canvas-paper border border-[rgba(13,37,61,0.1)] text-ink-primary"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Direct CTA */}
              <div className="pt-2">
                <NextLink
                  href={`/contact?service=workshop-${activeTrack.id}` as Route}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-terra-500 px-6 py-3.5 font-sans text-sm font-semibold text-white shadow-sm hover:bg-terra-600 transition-all hover:-translate-y-0.5 active:scale-[0.98] group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terra-500"
                >
                  <span>Request This Track for Your Institution</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
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
