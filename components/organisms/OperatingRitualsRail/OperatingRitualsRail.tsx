'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Container } from '@/components/foundation/Container';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface RitualPillar {
  id: string;
  n: string;
  tabLabel: string;
  title: string;
  description: string;
  tag: string;
  accentColor: string;
  terminalCommand: string;
  terminalLogs: string[];
}

const RITUALS: RitualPillar[] = [
  {
    id: 'diagnostic',
    n: '01',
    tabLabel: '01 Zero Hype',
    title: 'Code Speaks Louder Than Slides',
    description:
      'We do not sell abstract roadmaps or bloated strategy decks. Before any engagement, we audit existing codebases and deliver working technical benchmarks within 7 days.',
    tag: 'Strict Engineering Standard',
    accentColor: '#38BDF8',
    terminalCommand: 'norai bench --profile production-core --strict',
    terminalLogs: [
      '[OK] Latency: 14.2ms P99 across all regional edge nodes.',
      '[PASS] Zero hallucination threshold validated via deterministic harness.',
    ],
  },
  {
    id: 'privacy',
    n: '02',
    tabLabel: '02 Privacy First',
    title: 'In-Memory Privacy Architecture',
    description:
      'Zero model retention, zero third-party training leaks. Your proprietary customer and company records are scrubbed in RAM and never stored on third-party servers.',
    tag: 'Enterprise Security SLA',
    accentColor: '#4EF2D2',
    terminalCommand: 'norai audit:privacy --verify-zero-persistence',
    terminalLogs: [
      '[RAM] Ephemeral buffer scrubbed on inference completion.',
      '[AUDIT] Zero bytes written to third-party disk or model training sets.',
    ],
  },
  {
    id: 'cicd',
    n: '03',
    tabLabel: '03 Weekly CI/CD',
    title: 'Verified Deployments Every Week',
    description:
      'Continuous delivery without waiting months. We ship verified performance patches, algorithmic updates, and model optimizations weekly.',
    tag: 'Weekly Ship Cadence',
    accentColor: '#FFAE42',
    terminalCommand: 'norai release --channel production --deterministic',
    terminalLogs: [
      '[BENCHMARK] Automated regression test suite passed: 100% deterministic.',
      '[DEPLOYED] Weekly production optimization shipped directly to your repo.',
    ],
  },
  {
    id: 'bharat',
    n: '04',
    tabLabel: '04 Bharat Labs',
    title: 'Youth & Regional AI Literacy',
    description:
      'A vision to upskill local youth and collegiate scholars with hands-on computational literacy and practical AI workshops.',
    tag: 'Civic Upskilling Vision',
    accentColor: '#C6B5FF',
    terminalCommand: 'norai grassroots --upskill-youth --local-regions',
    terminalLogs: [
      '[MISSION] Vision to upskill youth and regional communities active.',
      '[CURRICULUM] Python, MCP protocol, and open-weight models and practical AI tools.',
    ],
  },
];

export function OperatingRitualsRail() {
  const [activeId, setActiveId] = useState<string>('diagnostic');
  const activeRitual: RitualPillar = RITUALS.find((r) => r.id === activeId) || (RITUALS[0] as RitualPillar);

  return (
    <section id="operating-rituals" className="py-24 sm:py-32 bg-[#f5f5f0] text-[var(--pine)] border-b border-[var(--line)] scroll-mt-24 overflow-hidden">
      <Container size="default" className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="w-full text-left font-sans">
          {/* Asymmetric 2-Column Physical Tab Deck */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* LEFT COLUMN: Sticky Typographic Manifesto */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 lg:sticky lg:top-32 space-y-6"
            >
              <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[3.8rem] text-[var(--pine)] tracking-tight leading-[1.04]">
                Direct. <br />
                Transparent. <br />
                <span className="text-[#0650AD]">Continuous.</span>
              </h2>
              <p className="text-[var(--pine)]/80 text-base sm:text-lg leading-relaxed max-w-md">
                Zero account managers or support bots. You speak, architect, and debug directly with the engineers who write the models.
              </p>
              <div className="pt-2">
                <Link
                  href="/team"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#0650AD] hover:text-[#040A5C] transition-colors group"
                >
                  <span>Meet our engineering team on /team</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>

            {/* RIGHT COLUMN: Physical Switchboard & Folder Chassis */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* Top Selector Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2" role="tablist">
                {RITUALS.map((ritual) => {
                  const isActive = ritual.id === activeId;
                  return (
                    <button
                      key={ritual.id}
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveId(ritual.id)}
                      className={cn(
                        'py-3.5 px-3 rounded-2xl text-left border transition-all duration-200 font-mono text-xs cursor-pointer',
                        isActive
                          ? 'bg-white dark:bg-[#0a2020] border-[var(--pine-20)] dark:border-white/20 text-[var(--pine)] dark:text-white font-bold shadow-sm'
                          : 'bg-white/40 dark:bg-white/5 border-transparent text-[var(--pine)]/60 dark:text-white/50 hover:bg-white/70 hover:text-[var(--pine)]'
                      )}
                    >
                      <span className="block text-[11px] opacity-60 mb-0.5">0{ritual.n.slice(-1)}</span>
                      <span className="line-clamp-1">{ritual.title.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>

              {/* Main Physical Archival Folder Chassis */}
              <div className="rounded-3xl bg-white dark:bg-[#0a2020] border border-[var(--pine-20)] dark:border-[rgba(30,244,180,0.18)] p-8 sm:p-12 shadow-[0_16px_40px_rgba(7,41,41,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden min-h-[380px] flex flex-col justify-between">
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeRitual.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col justify-between flex-1"
                  >
                    <div>
                      {/* Folder Header */}
                      <div className="pb-6 border-b border-[var(--pine-12)] mb-8">
                        <span className="font-mono text-xs font-bold text-[var(--pine)]/50 dark:text-white/40">
                          Ritual {activeRitual.n}
                        </span>
                      </div>

                      {/* Ritual Title & Narrative */}
                      <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[var(--pine)] mb-4 tracking-tight">
                        {activeRitual.title}
                      </h3>
                      <p className="text-[var(--pine)]/80 text-base sm:text-lg leading-relaxed max-w-xl mb-6">
                        {activeRitual.description}
                      </p>

                      {/* Quiet Verification Commitment */}
                      <div className="rounded-2xl bg-[var(--porcelain)] dark:bg-white/5 border border-[var(--line)] dark:border-white/10 p-5 space-y-2">
                        <span className="text-xs font-mono text-[var(--pine)]/50 dark:text-white/50 uppercase tracking-wider block font-semibold">
                          Engineering Standard:
                        </span>
                        <div className="space-y-1.5 text-xs sm:text-sm text-[var(--pine)]/80 dark:text-white/80 font-mono">
                          {activeRitual.terminalLogs.map((log, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <span className="text-[#0650AD] font-bold shrink-0">→</span>
                              <span>{log.replace(/^\[.*?\]\s*/, '')}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Folder Footer */}
                    <div className="pt-8 mt-8 border-t border-[var(--pine-12)] flex items-center justify-between">
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 font-bold text-sm text-[var(--pine)] hover:text-[#0650AD] transition-colors group"
                      >
                        <span>Start a project with the builders</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
}

export default OperatingRitualsRail;
