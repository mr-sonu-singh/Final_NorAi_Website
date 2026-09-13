'use client';

import React, { useState } from 'react';
import { Container } from '@/components/foundation/Container';
import { cn } from '@/lib/utils';
import { Link } from '@/components/atoms/Link';

interface DimensionSlot {
  id: string;
  n: string;
  category: string;
  sub: string;
  tag: string;
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
    sub: 'Four zero-retention web instruments',
    tag: '01 · EVERYDAY TOOLS',
    speaker: 'Aditya, Engineering Lead',
    question: '“Which candidate actually built and shipped backend microservices in production?”',
    answerTitle: 'AI Resume Shortlister · Contextual Scorecard',
    answerBody:
      'Sub-second parsing analyzes git repositories and architectural experience, filtering out ATS keyword stuffers. Zero telemetry.',
    metric: '0.28s Execution · Zero Cloud Egress',
    link: '/products/resume-shortlister',
    linkText: 'Explore the Shortlister →',
  },
  {
    id: 'dim-2',
    n: '02',
    category: 'Bespoke Enterprise Intelligence',
    sub: 'Air-gapped on-premise inference & RAG',
    tag: '02 · ENTERPRISE INTELLIGENCE',
    speaker: 'VP of Engineering, Defense Infra',
    question: '“Can our analysts query private internal documents without data leaving our VPC?”',
    answerTitle: 'Air-Gapped Private Inference & Deterministic RAG',
    answerBody:
      'Dedicated local inference clusters with strict citation grounding. Zero telemetry, zero training egress, complete sovereign ownership.',
    metric: 'Air-Gapped VPC · 0 Bytes Egress',
    link: '/services',
    linkText: 'Explore Enterprise Infra →',
  },
  {
    id: 'dim-3',
    n: '03',
    category: 'Grassroots Bharat Mission',
    sub: 'Upskilling youth & local communities',
    tag: '03 · BHARAT MISSION',
    speaker: 'Engineering Student, Varanasi',
    question: '“Where can I learn to build autonomous agents in Hindi without paying for bootcamps?”',
    answerTitle: 'Youth Coding Literacy & Grassroots Workshops',
    answerBody:
      '100% free, hands-on workshops teaching Python, MCP tools, and sovereign open-weight models across Uttar Pradesh.',
    metric: '100% Free · Youth & Local Communities',
    link: '/mission',
    linkText: 'Join the Bharat Mission →',
  },
];

export function ThreeDimensionsRail() {
  const [activeId, setActiveId] = useState<string>('dim-1');
  const activeDim: DimensionSlot = DIMENSIONS.find((d) => d.id === activeId) || (DIMENSIONS[0] as DimensionSlot);

  return (
    <section className="section section--dark relative bg-[#072929] text-[#f5f5f0] py-24 sm:py-32 overflow-hidden border-t border-b border-white/10">
      {/* Subtle Architectural Dot Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#f5f5f0 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      {/* Atmospheric Ambient Glow */}
      <div
        className="absolute top-1/4 -left-48 w-96 h-96 rounded-full bg-[#00E599]/10 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <Container size="default" className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* Asymmetric Monolith Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Monumental Typography & Interactive Selectors */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="eyebrow text-xs uppercase font-mono tracking-[0.16em] text-[#00E599] font-semibold block mb-4">
                — THREE DIMENSIONS OF SOVEREIGN IMPACT
              </span>
              <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[3.6rem] text-[#f5f5f0] tracking-[-0.03em] leading-[1.04] mb-6">
                One firm. <br />
                <span className="text-[#00E599]">Three dimensions.</span>
              </h2>
              <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-10 max-w-md">
                Single-purpose tools. Air-gapped enterprise pipelines. A grassroots vision to upskill youth and local communities across Bharat.
              </p>
            </div>

            {/* Interactive Vertical Dimension Selector */}
            <div className="space-y-3" role="tablist" aria-label="Three Dimensions">
              {DIMENSIONS.map((dim) => {
                const isActive = dim.id === activeId;
                return (
                  <button
                    key={dim.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveId(dim.id)}
                    className={cn(
                      'w-full text-left p-4 sm:p-5 rounded-2xl transition-all duration-200 relative flex items-start gap-4 border',
                      isActive
                        ? 'bg-white/[0.07] border-white/20 shadow-[0_4px_24px_rgba(0,0,0,0.3)]'
                        : 'bg-transparent border-transparent hover:bg-white/[0.03] hover:border-white/10 opacity-60 hover:opacity-100'
                    )}
                  >
                    {/* Active High-Voltage Bar */}
                    {isActive && (
                      <div className="absolute left-0 top-3 bottom-3 w-1 bg-[#00E599] rounded-r shadow-[0_0_12px_#00E599]" />
                    )}

                    <span
                      className={cn(
                        'font-mono text-sm font-bold mt-0.5 transition-colors',
                        isActive ? 'text-[#00E599]' : 'text-white/60'
                      )}
                    >
                      {dim.n}
                    </span>
                    <div>
                      <h3
                        className={cn(
                          'text-base sm:text-lg font-bold tracking-tight transition-colors',
                          isActive ? 'text-[#f5f5f0]' : 'text-white/80'
                        )}
                      >
                        {dim.category}
                      </h3>
                      <p className="text-xs sm:text-sm text-white/50 mt-0.5">
                        {dim.sub}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: The Single High-Voltage Dynamic Stage Viewport */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl bg-[#0b3333]/70 border border-white/10 p-8 sm:p-12 backdrop-blur-xl shadow-2xl overflow-hidden min-h-[440px] flex flex-col justify-between">
              
              {/* Internal Radiant Corner Mesh */}
              <div
                className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#00E599]/15 blur-[90px] pointer-events-none"
                aria-hidden="true"
              />

              {/* Stage Header: Category Tag & Live Telemetry Pill */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 relative z-10">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#00E599]">
                  {activeDim.tag}
                </span>
                <span className="font-mono text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-white/90 border border-white/15">
                  {activeDim.metric}
                </span>
              </div>

              {/* Stage Body: The Challenge & Resolution */}
              <div className="py-8 space-y-6 relative z-10">
                <div>
                  <div className="text-xs font-mono uppercase text-white/50 mb-2">
                    The Problem · {activeDim.speaker}
                  </div>
                  <blockquote className="text-xl sm:text-2xl lg:text-[1.7rem] font-medium text-[#f5f5f0] leading-snug tracking-tight">
                    {activeDim.question}
                  </blockquote>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="text-xs font-mono uppercase text-[#00E599] font-semibold mb-1.5">
                    Sovereign Resolution
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-white mb-2">
                    {activeDim.answerTitle}
                  </h4>
                  <p className="text-sm sm:text-base text-white/70 leading-relaxed max-w-xl">
                    {activeDim.answerBody}
                  </p>
                </div>
              </div>

              {/* Stage Footer: Direct Action Link */}
              <div className="pt-6 border-t border-white/10 relative z-10 flex items-center justify-between">
                <Link
                  href={activeDim.link}
                  variant="unstyled"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#00E599] text-[#072929] font-bold text-sm hover:bg-[#1ef4b4] transition-all duration-200 shadow-[0_4px_20px_rgba(0,229,153,0.3)] hover:scale-[1.02]"
                >
                  <span>{activeDim.linkText}</span>
                </Link>
                <span className="text-xs font-mono text-white/40">
                  NO VENDOR LOCK-IN
                </span>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}

export default ThreeDimensionsRail;
