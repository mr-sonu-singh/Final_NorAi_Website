'use client';

import React, { useState } from 'react';
import { Container } from '@/components/foundation/Container';
import { cn } from '@/lib/utils';
import { Link } from '@/components/atoms/Link';

interface DimensionSlot {
  id: string;
  n: string;
  category: string;
  tone: 'mint' | 'lavender' | 'butter';
  speaker: string;
  question: string;
  answerTitle: string;
  answerBody: string;
  metric: string;
  link: string;
  linkText: string;
}

const DIMENSIONS: DimensionSlot[] = [
  {
    id: 'dim-1',
    n: '01',
    category: 'Sovereign Everyday Tools',
    tone: 'mint',
    speaker: 'Aditya (Hiring Lead) asks:',
    question: '“Which candidate actually built and shipped backend microservices in production?”',
    answerTitle: 'AI Resume Shortlister · Contextual Scorecard',
    answerBody:
      'Sub-second parsing analyzes git repositories and architectural experience, filtering out ATS keyword stuffers.',
    metric: 'Evaluated in 0.28s · 96% Match',
    link: '/products/resume-shortlister',
    linkText: 'Explore Shortlister →',
  },
  {
    id: 'dim-2',
    n: '02',
    category: 'Bespoke Enterprise Intelligence',
    tone: 'lavender',
    speaker: 'VP of Engineering asks:',
    question: '“Can our analysts query private internal documents without data leaving our VPC?”',
    answerTitle: 'Air-Gapped Private Inference & Deterministic RAG',
    answerBody:
      'Dedicated local inference clusters with strict citation grounding. Zero telemetry or training data egress.',
    metric: 'Air-Gapped · Zero Cloud Egress',
    link: '/services',
    linkText: 'Explore Enterprise Infra →',
  },
  {
    id: 'dim-3',
    n: '03',
    category: 'Grassroots Bharat Mission',
    tone: 'butter',
    speaker: 'Student in Varanasi asks:',
    question: '“Where can I learn to build autonomous agents in Hindi without paying for bootcamps?”',
    answerTitle: '75-District Coding Literacy & Developer Workshops',
    answerBody:
      '100% free, hands-on workshops teaching Python, MCP tools, and sovereign open-weight models across Uttar Pradesh.',
    metric: '100% Free · 75 Districts',
    link: '/mission',
    linkText: 'Join the Mission →',
  },
];

export function ThreeDimensionsRail() {
  const [activeSlot, setActiveSlot] = useState<string>('dim-1');

  const toneClasses = {
    mint: {
      border: 'border-[var(--mint)]/40',
      bg: 'bg-[var(--mint)]/10',
      badge: 'bg-[var(--mint)] text-[var(--pine)]',
      text: 'text-[var(--mint)]',
      glow: 'shadow-[0_0_24px_rgba(30,244,180,0.15)]',
    },
    lavender: {
      border: 'border-[var(--lavender)]/40',
      bg: 'bg-[var(--lavender)]/10',
      badge: 'bg-[var(--lavender)] text-[var(--pine)]',
      text: 'text-[var(--lavender)]',
      glow: 'shadow-[0_0_24px_rgba(198,181,255,0.15)]',
    },
    butter: {
      border: 'border-[var(--butter)]/40',
      bg: 'bg-[var(--butter)]/10',
      badge: 'bg-[var(--butter)] text-[var(--pine)]',
      text: 'text-[var(--butter)]',
      glow: 'shadow-[0_0_24px_rgba(255,233,181,0.15)]',
    },
  };

  return (
    <section className="section section--dark relative bg-[#072929] text-[var(--bone)] py-20 sm:py-28 overflow-hidden border-t border-b border-[var(--bone-20)]">
      {/* Subtle Dot Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(var(--bone) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      <Container size="default" className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bone-20)] text-[var(--mint)] text-xs font-mono font-medium mb-4">
            <span className="w-2 h-2 rounded-full bg-[var(--mint)] animate-pulse" aria-hidden="true" />
            <span>Three Dimensions of Sovereign Impact</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-[var(--bone)] tracking-tight leading-[1.1]">
            How we solve the problems <br />
            that generic AI <span className="text-[var(--mint)]">ignores.</span>
          </h2>
          <p className="mt-4 text-[var(--bone-70)] text-base sm:text-lg leading-relaxed">
            Real questions from hiring managers, enterprise engineering leaders, and aspiring developers across India — answered with software you own.
          </p>
        </div>

        {/* 3 Interactive Staggered Slots */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {DIMENSIONS.map((dim) => {
            const isSelected = activeSlot === dim.id;
            const tone = toneClasses[dim.tone];

            return (
              <div
                key={dim.id}
                onClick={() => setActiveSlot(dim.id)}
                className={cn(
                  'group relative rounded-[22px] border transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between cursor-pointer',
                  isSelected
                    ? cn('bg-[#1e3c3b]/80 border-[var(--bone-20)]', tone.glow)
                    : 'bg-[#0b3333]/50 border-[var(--bone-20)]/50 hover:border-[var(--bone-20)] hover:bg-[#1e3c3b]/40',
                )}
              >
                {/* Header: Number & Category */}
                <div>
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <span
                      className={cn(
                        'w-8 h-8 rounded-full font-mono text-xs font-bold flex items-center justify-center transition-transform duration-200 group-hover:scale-105',
                        tone.badge,
                      )}
                    >
                      {dim.n}
                    </span>
                    <span className="text-xs font-mono tracking-wider uppercase text-[var(--bone-70)]">
                      {dim.category}
                    </span>
                  </div>

                  {/* Speaker & Question Bubble */}
                  <div className="bg-[#072929]/70 rounded-xl p-4 border border-[var(--bone-20)]/40 mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium text-[var(--bone-70)]">
                        {dim.speaker}
                      </span>
                      {/* Animated 3-dot typing indicator */}
                      <span className="typing-dots text-[var(--mint)]" aria-label="Typing">
                        <i />
                        <i />
                        <i />
                      </span>
                    </div>
                    <p className="text-sm font-medium text-[var(--bone)] italic">
                      {dim.question}
                    </p>
                  </div>

                  {/* Revealed Resolution Card */}
                  <div className="space-y-3">
                    <h3 className="text-base font-semibold text-[var(--bone)] group-hover:text-white transition-colors">
                      {dim.answerTitle}
                    </h3>
                    <p className="text-sm text-[var(--bone-70)] leading-relaxed">
                      {dim.answerBody}
                    </p>
                  </div>
                </div>

                {/* Footer: Telemetry Badge & Action Link */}
                <div className="pt-6 mt-6 border-t border-[var(--bone-20)]/60 flex items-center justify-between gap-3">
                  <span className={cn('text-xs font-mono font-medium px-2.5 py-1 rounded-full', tone.bg, tone.text)}>
                    {dim.metric}
                  </span>
                  <Link
                    href={dim.link}
                    variant="unstyled"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--bone)] group-hover:text-[var(--mint)] transition-colors"
                  >
                    <span>{dim.linkText}</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default ThreeDimensionsRail;
