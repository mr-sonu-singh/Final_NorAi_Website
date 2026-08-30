'use client';

import React, { useState } from 'react';
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
} from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { Link } from '@/components/atoms/Link';

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

  const activeTrack = TRACKS.find((t) => t.id === activeTrackId) ?? TRACKS[0];
  if (!activeTrack) return null;

  return (
    <div className="w-full text-left font-sans space-y-8">
      {/* Track Selector Navigation Tabs */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-[rgba(13,37,61,0.08)] pb-4">
        {/* Track Pills */}
        <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Workshop Tiers">
          {TRACKS.map((track) => {
            const isSelected = activeTrackId === track.id;
            return (
              <button
                key={track.id}
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveTrackId(track.id)}
                className={`px-4 py-2.5 rounded-xl font-mono text-xs font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent-500 focus-visible:ring-offset-bg-page ${
                  isSelected
                    ? 'bg-accent-500 text-white shadow-sm'
                    : 'bg-canvas-paper text-ink-secondary hover:text-ink-primary hover:bg-canvas-recessed border border-[rgba(13,37,61,0.08)]'
                }`}
              >
                {track.tabLabel}
              </button>
            );
          })}
        </div>

        {/* Geographic Context Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-canvas-recessed border border-[rgba(13,37,61,0.08)] shrink-0 self-start sm:self-auto">
          <span className="text-[11px] font-mono font-medium text-ink-secondary px-2 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-accent-500" />
            <span>Delivery Context:</span>
          </span>
          <button
            type="button"
            onClick={() => setContextMode('rural')}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
              contextMode === 'rural'
                ? 'bg-canvas-paper text-accent-500 shadow-xs border border-[rgba(13,37,61,0.08)]'
                : 'text-ink-secondary hover:text-ink-primary'
            }`}
          >
            Rural / Village
          </button>
          <button
            type="button"
            onClick={() => setContextMode('town')}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
              contextMode === 'town'
                ? 'bg-canvas-paper text-accent-500 shadow-xs border border-[rgba(13,37,61,0.08)]'
                : 'text-ink-secondary hover:text-ink-primary'
            }`}
          >
            Town / Campus
          </button>
        </div>
      </div>

      {/* Main Track Detail Card */}
      <div className="rounded-3xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] p-6 md:p-10 shadow-sm space-y-8">
        {/* Card Header & Badge */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-[rgba(13,37,61,0.08)]">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span
                className={`font-mono text-xs font-semibold px-2.5 py-1 rounded border ${
                  activeTrack.badgeVariant === 'terracotta'
                    ? 'bg-accent-50 text-accent-500 border-accent-500/20'
                    : activeTrack.badgeVariant === 'sage'
                    ? 'bg-[#e2ede7] text-accent-secondary border-accent-secondary/30'
                    : 'bg-[#fff4d6] text-[#7c5506] border-[#7c5506]/20'
                }`}
              >
                {activeTrack.badge}
              </span>
              <span className="font-mono text-xs text-ink-secondary flex items-center gap-1">
                <Radio className="w-3 h-3 text-accent-secondary animate-pulse" />
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
          <div className="shrink-0 rounded-2xl bg-canvas-base border border-[rgba(13,37,61,0.08)] p-5 space-y-3 lg:w-72">
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

        {/* Adaptive Delivery Banner based on Context Switcher */}
        <div className="rounded-2xl bg-canvas-base border border-accent-500/20 p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent-50 border border-accent-500/20 text-accent-500 flex items-center justify-center shrink-0 mt-0.5">
              {contextMode === 'rural' ? (
                <Languages className="w-4 h-4" />
              ) : (
                <Laptop className="w-4 h-4" />
              )}
            </div>
            <div>
              <div className="text-xs font-mono font-semibold text-accent-500 uppercase tracking-wider">
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
          <span className="shrink-0 text-xs font-mono text-accent-secondary font-medium px-2.5 py-1 rounded bg-[#e2ede7] border border-accent-secondary/20">
            Context Active
          </span>
        </div>

        {/* Two-Column Details: Syllabus Modules & Practical Outcomes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Syllabus Flow (Col 7) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-accent-500" />
              <h4 className="font-display text-xl text-ink-primary font-normal">
                Structured Curriculum Flow
              </h4>
            </div>

            <div className="space-y-3">
              {activeTrack.syllabus.map((item, idx) => (
                <div
                  key={item.title}
                  className="rounded-2xl bg-canvas-base border border-[rgba(13,37,61,0.08)] p-5 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-accent-500">
                      Module 0{idx + 1}
                    </span>
                    <Terminal className="w-3.5 h-3.5 text-ink-secondary" />
                  </div>
                  <h5 className="font-sans font-semibold text-sm text-ink-primary">
                    {item.title}
                  </h5>
                  <p className="text-xs text-ink-body leading-relaxed">
                    {item.description}
                  </p>
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {item.points.map((pt) => (
                      <span
                        key={pt}
                        className="font-mono text-[10px] px-2 py-0.5 rounded bg-canvas-recessed text-ink-secondary border border-[rgba(13,37,61,0.06)]"
                      >
                        {pt}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Practical Outcomes & Tools Covered (Col 5) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Practical Outcomes */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-accent-secondary" />
                <h4 className="font-display text-xl text-ink-primary font-normal">
                  Measurable Outcomes
                </h4>
              </div>

              <div className="rounded-2xl bg-canvas-base border border-[rgba(13,37,61,0.08)] p-5 space-y-3">
                {activeTrack.keyOutcomes.map((outcome, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-ink-body leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-accent-secondary shrink-0 mt-0.5" />
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools Covered */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accent-tertiary" />
                <h4 className="font-display text-xl text-ink-primary font-normal">
                  Tools & Protocols Covered
                </h4>
              </div>

              <div className="rounded-2xl bg-canvas-base border border-[rgba(13,37,61,0.08)] p-5 flex flex-wrap gap-2">
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
              <Link
                href={`/contact?service=workshop-${activeTrack.id}`}
                className="w-full block"
              >
                <Button variant="primary" size="md" className="w-full group">
                  <span>Request This Track for Your Institution</span>
                  <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkshopTrackExplorer;
