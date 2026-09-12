'use client';

import React from 'react';
import { ArrowRight, Terminal, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { Link } from '@/components/atoms/Link';

interface EthosPillar {
  id: string;
  number: string;
  title: string;
  description: string;
  tag: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ETHOS_PILLARS: EthosPillar[] = [
  {
    id: 'direct-builders',
    number: '01',
    title: 'Direct Access to the Builders',
    description:
      'Zero account managers or support bots. You speak and debug directly with the engineers who write the models and systems.',
    tag: 'Founder-Direct SLA',
    icon: Terminal,
  },
  {
    id: 'transparency-privacy',
    number: '02',
    title: 'Total Transparency & Privacy',
    description:
      'Ephemeral RAM isolation. Payloads execute in sub-second memory and immediately purge with zero persistent data retention.',
    tag: '0 Bytes Retained',
    icon: ShieldCheck,
  },
  {
    id: 'rapid-improvements',
    number: '03',
    title: 'Rapid Improvements, Shipped Frequently',
    description:
      'Continuous delivery without waiting months. We ship verified performance patches, algorithmic updates, and optimizations weekly.',
    tag: 'Weekly CI/CD Cadence',
    icon: Zap,
  },
  {
    id: 'local-communities',
    number: '04',
    title: 'Upskilling Local Communities',
    description:
      '100% free hands-on computational literacy workshops and practical AI labs for students across regional colleges in Uttar Pradesh.',
    tag: '75 Districts Mission',
    icon: Sparkles,
  },
];

export function OperatingRitualsRail() {
  return (
    <div className="w-full text-left font-sans space-y-12">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2 max-w-xl">
          <p className="text-xs font-mono font-semibold uppercase tracking-[0.14em] text-accent-primary">
            How We Work · Operating Ethos
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-text-primary leading-tight tracking-tight">
            How we build software. <br />
            <span className="italic text-accent-primary font-normal">
              Direct, transparent, continuous.
            </span>
          </h2>
        </div>

        <div className="shrink-0">
          <Link
            href="/team"
            className="font-medium text-xs sm:text-sm text-accent-primary hover:text-accent-hover inline-flex items-center gap-1 group transition-colors"
          >
            <span>Meet our engineering team on /team</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Architectural Circuit Rail
          —[ + ]——————————————[ + ]——————————————[ + ]——————————————[ + ]—
            / 01                / 02                / 03                / 04
      */}
      <div className="relative pt-2">
        {/* Continuous horizontal baseline across desktop */}
        <div
          aria-hidden="true"
          className="hidden lg:block absolute top-[21px] left-0 right-0 h-px bg-border-strong pointer-events-none"
        />

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {ETHOS_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className="group relative flex flex-col justify-between rounded-xl p-3 -m-3 transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-surface-panel/70 active:scale-[0.985]"
              >
                <div>
                  {/* Row 1: Node on the rail */}
                  <div className="relative flex items-center mb-4">
                    {/* Mobile-only connecting line */}
                    <div
                      aria-hidden="true"
                      className="lg:hidden absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-border-strong pointer-events-none"
                    />

                    {/* [ + ] Node Marker */}
                    <div className="relative z-10 inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-surface-canvas border border-border-strong text-[11px] font-mono text-text-muted transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:border-accent-primary/60 group-hover:text-accent-primary group-hover:shadow-xs">
                      <span className="opacity-40 select-none">[</span>
                      <span className="text-accent-primary font-bold text-xs inline-block transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:rotate-90">
                        +
                      </span>
                      <span className="opacity-40 select-none">]</span>
                    </div>
                  </div>

                  {/* Row 2: Editorial Index / 01 */}
                  <div className="mb-2.5">
                    <span className="font-mono text-xs font-semibold text-text-muted group-hover:text-accent-primary transition-colors duration-200">
                      / {pillar.number}
                    </span>
                  </div>

                  {/* Row 3: Pillar Title */}
                  <h3 className="font-sans font-semibold text-base sm:text-lg text-text-primary tracking-tight leading-snug mb-2 group-hover:text-text-primary transition-colors">
                    {pillar.title}
                  </h3>

                  {/* Row 4: Minimalist Editorial Description */}
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                {/* Grounding Micro-Tag at bottom */}
                <div className="pt-5 mt-6 border-t border-border-subtle flex items-center justify-between text-xs font-mono text-text-muted">
                  <span className="inline-flex items-center gap-1.5 text-[11px] text-text-muted group-hover:text-text-secondary transition-colors">
                    <Icon className="w-3.5 h-3.5 text-accent-secondary" />
                    <span>{pillar.tag}</span>
                  </span>
                  <span className="text-[10px] text-accent-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-200 font-medium">
                    Verified
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Subtle Ground Truth Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-text-muted border-t border-border-subtle pt-6">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-secondary" />
          <span>Uttar Pradesh, India · 100% In-House Engineering</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/about" className="hover:text-accent-primary transition-colors">
            Our Principles &rarr;
          </Link>
          <Link
            href="/contact"
            className="text-accent-primary hover:text-accent-hover font-medium transition-colors"
          >
            Start a Conversation &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
