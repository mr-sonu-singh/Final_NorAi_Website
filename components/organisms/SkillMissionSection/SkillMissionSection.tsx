'use client';

import React from 'react';
import { Container } from '@/components/foundation/Container';
import { Button } from '@/components/atoms/Button';
import { Link } from '@/components/atoms/Link';
import {
  GraduationCap,
  Cpu,
  Users,
  ArrowRight,
  MapPin,
  CheckCircle2,
  Landmark,
} from 'lucide-react';

interface Pillar {
  icon: React.ElementType;
  badge: string;
  badgeVariant: 'terracotta' | 'sage' | 'ochre';
  title: string;
  tagline: string;
  description: string;
  points: string[];
}

const PILLARS: Pillar[] = [
  {
    icon: Users,
    badge: 'Tier 1: Grassroots Inclusion',
    badgeVariant: 'ochre',
    title: 'Rural Citizens & Elders',
    tagline: 'Practical everyday AI in simple Hindi and regional voice prompts.',
    description:
      'We teach rural youth, village elders, and local shopkeepers how to use ChatGPT and Gemini for everyday tasks, administrative drafting, crop/market queries, and digital fraud/scam awareness.',
    points: [
      'Hindi & voice-first AI interactions',
      'Government welfare & letter drafting',
      'AI scam & deepfake safety awareness',
    ],
  },
  {
    icon: GraduationCap,
    badge: 'Tier 2: Youth Foundations',
    badgeVariant: 'sage',
    title: 'School & College Learners',
    tagline: 'Transforming passive consumption into academic & research superpower.',
    description:
      'High school and undergraduate students learn to turn AI into a 24/7 personal tutor for STEM, convert lectures into study flashcards via Course Note-Taker, and build foundational programming literacy.',
    points: [
      'Socratic STEM inquiry & study engines',
      'Lecture-to-flashcard synthesis',
      'Prompt-to-code foundational logic',
    ],
  },
  {
    icon: Cpu,
    badge: 'Tier 3: Advanced Builders',
    badgeVariant: 'terracotta',
    title: 'Collegiate & Tech Hubs',
    tagline: 'Production-grade AI engineering, MCP systems, and micro-SaaS.',
    description:
      'For engineering students in regional towns ready for real software craft: we teach Model Context Protocol (MCP) servers, local open-weight model serving (vLLM / Ollama), and type-safe Next.js micro-SaaS deployments.',
    points: [
      'Model Context Protocol (MCP) tooling',
      'Local model quantization & vLLM',
      'Full-stack micro-SaaS live deploys',
    ],
  },
];

const METRICS = [
  { label: 'Demographic Tiers', value: '3 Tracks', note: 'Seniors, Youth & Engineers' },
  { label: 'Delivery Model', value: 'Adaptive', note: 'Rural Village vs Town Campus' },
  { label: 'Student Access', value: '100% Free', note: 'Scholar EdTech Subsidies' },
  { label: 'Long-Term Vision', value: 'Statewide UP', note: 'Government partnership blueprint' },
];

export function SkillMissionSection() {
  return (
    <section className="py-20 md:py-28 bg-canvas-base border-t border-[rgba(13,37,61,0.08)]">
      <Container size="default">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 text-left">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-50 border border-accent-500/20 text-accent-500 text-xs font-mono font-semibold">
              <MapPin className="w-3.5 h-3.5" />
              <span>The NorAI Skill Mission · Uttar Pradesh</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal text-ink-primary leading-tight tracking-tight">
              Empowering communities. <br />
              <span className="italic text-accent-500 font-normal">
                From rural villages to tech hubs.
              </span>
            </h2>

            <p className="text-base md:text-lg text-ink-body leading-relaxed">
              We conduct customized on-ground AI workshops across Uttar Pradesh—teaching everyday AI to rural elders, academic productivity to students, and production-grade software engineering to collegiate builders.
            </p>
          </div>

          {/* Header Action Button */}
          <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link href="/mission">
              <Button variant="primary" size="md" className="w-full sm:w-auto group">
                <span>Explore Workshop Tracks</span>
                <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/contact?service=campus-workshop">
              <Button variant="secondary" size="md" className="w-full sm:w-auto">
                Request a Workshop
              </Button>
            </Link>
          </div>
        </div>

        {/* 3 Editorial Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch mb-12 text-left">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="rounded-3xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] p-8 md:p-9 shadow-sm hover:shadow-md hover:border-accent-500/30 transition-all duration-200 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  {/* Badge & Icon Row */}
                  <div className="flex items-center justify-between gap-4">
                    <span
                      className={`font-mono text-xs font-semibold px-2.5 py-1 rounded border ${
                        pillar.badgeVariant === 'terracotta'
                          ? 'bg-accent-50 text-accent-500 border-accent-500/20'
                          : pillar.badgeVariant === 'sage'
                          ? 'bg-[#e2ede7] text-accent-secondary border-accent-secondary/30'
                          : 'bg-[#fff4d6] text-[#7c5506] border-[#7c5506]/20'
                      }`}
                    >
                      {pillar.badge}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-canvas-base border border-[rgba(13,37,61,0.08)] flex items-center justify-center text-ink-primary">
                      <Icon className="w-4 h-4 text-accent-500" />
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <div className="space-y-1">
                    <h3 className="font-display text-2xl sm:text-3xl text-ink-primary font-normal">
                      {pillar.title}
                    </h3>
                    <p className="text-xs font-mono text-accent-500 font-medium">
                      {pillar.tagline}
                    </p>
                  </div>

                  {/* Body prose */}
                  <p className="text-sm text-ink-body leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                {/* Checklist bullet points */}
                <div className="pt-4 border-t border-[rgba(13,37,61,0.08)] space-y-2">
                  {pillar.points.map((pt, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-ink-body">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent-secondary shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* UP Government & Statewide Vision Banner */}
        <div className="rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] p-6 md:p-8 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-left">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#fff4d6] border border-[#7c5506]/20 text-[#7c5506] flex items-center justify-center shrink-0 mt-0.5">
              <Landmark className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <span className="font-mono text-xs font-semibold text-[#7c5506] uppercase tracking-wider">
                Statewide Vision & Government Collaboration
              </span>
              <h4 className="font-display text-xl sm:text-2xl text-ink-primary font-normal">
                Aiming to uplift Uttar Pradesh with state-level partnership.
              </h4>
              <p className="text-xs md:text-sm text-ink-body leading-relaxed max-w-3xl">
                We are actively developing institutional frameworks to align with the Uttar Pradesh Skill Development Mission and Department of IT & Electronics, bringing verified AI literacy to all 75 districts.
              </p>
            </div>
          </div>

          <Link href="/mission#statewide-vision" className="shrink-0">
            <Button variant="secondary" size="sm">
              Learn About State Roadmap
            </Button>
          </Link>
        </div>

        {/* Telemetry / Impact Strip */}
        <div className="rounded-2xl bg-canvas-paper/70 border border-[rgba(13,37,61,0.08)] p-6 md:p-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[rgba(13,37,61,0.08)] text-left">
            {METRICS.map((metric, idx) => (
              <div key={metric.label} className={idx > 0 ? 'sm:pl-8 pt-4 sm:pt-0' : ''}>
                <div className="font-display text-3xl sm:text-4xl text-ink-primary font-normal tracking-tight">
                  {metric.value}
                </div>
                <div className="text-xs font-semibold text-ink-primary mt-1">
                  {metric.label}
                </div>
                <div className="text-[11px] font-mono text-ink-secondary mt-0.5">
                  {metric.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default SkillMissionSection;
