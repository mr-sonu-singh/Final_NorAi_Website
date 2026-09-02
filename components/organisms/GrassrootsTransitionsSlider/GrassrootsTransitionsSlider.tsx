'use client';

import React, { useState } from 'react';
import {
  Users,
  GraduationCap,
  Cpu,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Languages,
} from 'lucide-react';
import NextLink from 'next/link';
import type { Route } from 'next';

interface TierTransition {
  id: string;
  step: string;
  badge: string;
  badgeVariant: 'ochre' | 'sage' | 'terracotta';
  icon: React.ElementType;
  title: string;
  subtitle: string;
  realityTitle: string;
  realityText: string;
  transformationTitle: string;
  transformationText: string;
  metric: string;
  tools: string[];
  ctaLink: string;
  ctaText: string;
}

const TRANSITIONS: TierTransition[] = [
  {
    id: 'tier-1',
    step: '01',
    badge: 'Tier 1: Grassroots Inclusion',
    badgeVariant: 'ochre',
    icon: Users,
    title: 'Rural Citizens & Elders',
    subtitle: 'From bureaucratic dependency to Hindi voice self-reliance.',
    realityTitle: 'Ground Reality',
    realityText:
      'Elderly citizens and rural residents struggle with official forms, while facing emerging voice-cloning and fake scheme scams.',
    transformationTitle: 'NorAI Transformation',
    transformationText:
      'Simple Hindi voice prompts with ChatGPT & Gemini: independently draft letters, verify crop schemes, and spot scams without middlemen.',
    metric: '100% Free Vernacular Sessions',
    tools: ['Hindi Voice AI', 'Public Welfare Radar', 'Digital Scam Safety', 'Voice Letters'],
    ctaLink: '/contact?service=village-clinic',
    ctaText: 'Request Village Clinic',
  },
  {
    id: 'tier-2',
    step: '02',
    badge: 'Tier 2: Youth Foundations',
    badgeVariant: 'sage',
    icon: GraduationCap,
    title: 'School & College Learners',
    subtitle: 'From passive phone scrolling to personal Socratic tutors.',
    realityTitle: 'Ground Reality',
    realityText:
      'Hours of recorded lectures dissolve into unorganized phone screenshots across apps, forcing passive rote memorization.',
    transformationTitle: 'NorAI Transformation',
    transformationText:
      'Turn AI into a 24/7 personal STEM tutor, synthesize lecture audio into structured flashcards, and build computational logic.',
    metric: 'Free Scholar Tier Access',
    tools: ['Course Note-Taker', 'Socratic STEM Tutors', 'LaTeX Extraction', 'Prompt-to-Code'],
    ctaLink: '/contact?service=student-fellowship',
    ctaText: 'Explore Scholar Tools',
  },
  {
    id: 'tier-3',
    step: '03',
    badge: 'Tier 3: Advanced Builders',
    badgeVariant: 'terracotta',
    icon: Cpu,
    title: 'Collegiate & Tech Hubs',
    subtitle: 'From superficial prompt fluff to production AI architecture.',
    realityTitle: 'Ground Reality',
    realityText:
      'Engineering students watch superficial prompt videos and build toy demos, lacking systems architecture that companies hire for.',
    transformationTitle: 'NorAI Transformation',
    transformationText:
      'We teach Model Context Protocol (MCP) servers, local vLLM model serving, vector databases, and type-safe Next.js micro-SaaS.',
    metric: 'Direct Founder Mentorship',
    tools: ['Model Context Protocol (MCP)', 'vLLM Local Serving', 'pgvector RAG', 'Next.js Micro-SaaS'],
    ctaLink: '/contact?service=campus-workshop',
    ctaText: 'Bring Masterclass to Campus',
  },
];

export function GrassrootsTransitionsSlider() {
  const [activeTabMobile, setActiveTabMobile] = useState(0);

  return (
    <div className="w-full space-y-6">
      {/* Mobile Tab Switcher (Visible only below lg) */}
      <div className="lg:hidden flex items-center p-1 rounded-xl bg-canvas-sunken border border-[rgba(20,28,43,0.08)]">
        {TRANSITIONS.map((tier, idx) => {
          const isActive = activeTabMobile === idx;
          return (
            <button
              key={tier.id}
              onClick={() => setActiveTabMobile(idx)}
              className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                isActive
                  ? 'bg-canvas-paper text-ink-primary shadow-xs border border-[rgba(20,28,43,0.08)]'
                  : 'text-ink-secondary hover:text-ink-primary'
              }`}
            >
              {tier.step}. {tier.title.split(' ')[0]}
            </button>
          );
        })}
      </div>

      {/* High-Density Bento Grid (Desktop: 3 columns; Mobile: tab-selected card) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {TRANSITIONS.map((tier, idx) => {
          const TierIcon = tier.icon;
          const isHiddenOnMobile = activeTabMobile !== idx;

          return (
            <div
              key={tier.id}
              className={`rounded-2xl border border-[rgba(20,28,43,0.08)] bg-canvas-paper p-6 sm:p-7 flex flex-col justify-between space-y-6 hover:border-[rgba(20,28,43,0.16)] transition-colors ${
                isHiddenOnMobile ? 'hidden lg:flex' : 'flex'
              }`}
            >
              {/* Card Top: Step, Badge, Icon, Title */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[rgba(20,28,43,0.06)] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-terra-600 tracking-wider">
                      PHASE {tier.step}
                    </span>
                    <span className="text-[11px] font-mono text-ink-secondary">/ 03</span>
                  </div>

                  <span className="font-mono text-[11px] font-medium px-2 py-0.5 rounded bg-canvas-sunken text-ink-secondary border border-[rgba(20,28,43,0.06)]">
                    {tier.metric}
                  </span>
                </div>

                <div className="flex items-start gap-3 pt-1">
                  <div className="w-10 h-10 rounded-xl bg-canvas-sunken border border-[rgba(20,28,43,0.08)] text-terra-600 flex items-center justify-center shrink-0">
                    <TierIcon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl text-ink-primary font-normal leading-tight">
                      {tier.title}
                    </h3>
                    <p className="text-xs text-ink-secondary mt-1 leading-relaxed font-sans">
                      {tier.subtitle}
                    </p>
                  </div>
                </div>

                {/* High-Density Reality vs Transformation Spec */}
                <div className="space-y-3 pt-2">
                  {/* Ground Reality */}
                  <div className="rounded-xl bg-canvas-base border border-[rgba(20,28,43,0.06)] p-3.5 space-y-1.5">
                    <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase font-semibold text-terra-600">
                      <AlertCircle className="w-3 h-3 shrink-0" aria-hidden="true" />
                      <span>{tier.realityTitle}</span>
                    </div>
                    <p className="text-xs text-ink-body leading-relaxed">
                      {tier.realityText}
                    </p>
                  </div>

                  {/* NorAI Transformation */}
                  <div className="rounded-xl bg-sage-50/50 border border-sage-200/70 p-3.5 space-y-1.5">
                    <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase font-semibold text-sage-800">
                      <CheckCircle2 className="w-3 h-3 shrink-0 text-sage-600" aria-hidden="true" />
                      <span>{tier.transformationTitle}</span>
                    </div>
                    <p className="text-xs text-ink-primary leading-relaxed">
                      {tier.transformationText}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Bottom: Tools Chips & Direct CTA */}
              <div className="space-y-4 pt-4 border-t border-[rgba(20,28,43,0.06)]">
                <div className="flex flex-wrap gap-1.5">
                  {tier.tools.map((tool) => (
                    <span
                      key={tool}
                      className="font-mono text-[11px] px-2 py-0.5 rounded bg-canvas-base text-ink-primary border border-[rgba(20,28,43,0.06)]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                <NextLink
                  href={tier.ctaLink as Route}
                  className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl border border-[rgba(20,28,43,0.12)] bg-canvas-base text-xs font-sans font-semibold text-ink-primary hover:text-terra-600 hover:border-terra-500 hover:bg-canvas-paper transition-all active:scale-[0.98] group"
                >
                  <span>{tier.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </NextLink>
              </div>
            </div>
          );
        })}
      </div>

      {/* Subtext Footer */}
      <div className="flex items-center justify-between px-1 text-xs font-mono text-ink-secondary">
        <span className="flex items-center gap-1.5">
          <Languages className="w-3.5 h-3.5 text-terra-600" aria-hidden="true" />
          <span>Vernacular Inclusion to Production AI Engineering</span>
        </span>
        <span className="text-[11px] font-medium text-sage-700 flex items-center gap-1">
          <ShieldCheck className="w-3 h-3" aria-hidden="true" />
          <span>100% Zero-Cost Public Education</span>
        </span>
      </div>
    </div>
  );
}

export default GrassrootsTransitionsSlider;
