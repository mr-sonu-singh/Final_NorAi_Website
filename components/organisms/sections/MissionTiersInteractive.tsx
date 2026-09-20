'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, GraduationCap, Terminal, CheckCircle2, Trophy, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export interface CommunityTier {
  tier: string;
  badge: string;
  title: string;
  desc: string;
  metric: string;
  icon: React.ElementType;
  accent: string;
  accentGlow: string;
  highlights: string[];
  tools: string[];
  outcome: string;
}

export const COMMUNITY_TIERS: CommunityTier[] = [
  {
    tier: 'TIER 01',
    badge: 'Rural & Village Citizens',
    title: 'Everyday Vernacular Literacy',
    desc: 'Bringing Hindi voice interfaces, government welfare navigation, and digital fraud prevention to village elders, self-help groups, and local tradespeople.',
    metric: 'Vernacular Delivery · Localized Learning',
    icon: Users,
    accent: '#1ef4b4',
    accentGlow: 'rgba(30,244,180,0.15)',
    highlights: [
      'Hindi voice prompts for crop advisory & mandi rates',
      'Digital scam detection & online payment safety',
      'Government welfare portal navigation (PM-Kisan, Ayushman)',
    ],
    tools: ['Bhashini Speech API', 'WhatsApp Audio Bots', 'Zero-Install Web Audio'],
    outcome: 'Independent digital self-reliance for 10,000+ regional households.',
  },
  {
    tier: 'TIER 02',
    badge: 'Secondary & College Students',
    title: 'Academic & Foundation Mastery',
    desc: 'Teaching high school and collegiate students how to turn AI into a tireless personal tutor, extract structured notes from messy lectures, and build rigorous study habits.',
    metric: 'Curriculum & Sandbox Access',
    icon: GraduationCap,
    accent: '#7a5cff',
    accentGlow: 'rgba(122,92,255,0.15)',
    highlights: [
      'Lecture note-taking & structured flashcard extraction',
      'STEM homework verification without hallucination',
      'Foundational programming & computational thinking',
    ],
    tools: ['Whisper Transcripts', 'KaTeX Math Formatter', 'Spaced Repetition SRS'],
    outcome: 'Transform passive smartphone consumption into active academic mastery.',
  },
  {
    tier: 'TIER 03',
    badge: 'Collegiate Builders & Engineers',
    title: 'Deterministic Systems Engineering',
    desc: 'Direct founder-led masterclasses for ambitious undergraduate engineers: Model Context Protocol (MCP) servers, local vLLM serving, vector databases, and typed APIs.',
    metric: 'Direct Founder Mentorship',
    icon: Terminal,
    accent: '#ffa24d',
    accentGlow: 'rgba(255,162,77,0.15)',
    highlights: [
      'Model Context Protocol (MCP) server authoring',
      'Local open-weight vLLM serving & AWQ quantization',
      'Type-safe Zod runtime contracts & pgvector cosine search',
    ],
    tools: ['vLLM', 'FastAPI', 'Docker', 'pgvector', 'TypeScript / Zod'],
    outcome: 'Graduates ship production systems directly into enterprise clients.',
  },
];

export function MissionTiersInteractive() {
  const [activeTabMap, setActiveTabMap] = useState<Record<string, 'curriculum' | 'tools' | 'outcome'>>({
    'TIER 01': 'curriculum',
    'TIER 02': 'curriculum',
    'TIER 03': 'curriculum',
  });

  const setTabForTier = (tier: string, tab: 'curriculum' | 'tools' | 'outcome') => {
    setActiveTabMap((prev) => ({ ...prev, [tier]: tab }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
      {COMMUNITY_TIERS.map((tier, idx) => {
        const TierIcon = tier.icon;
        const currentTab = activeTabMap[tier.tier] || 'curriculum';

        return (
          <motion.div
            key={tier.tier}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.3, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl bg-[#fffdf7] dark:bg-[#04130f] border border-[var(--line)] dark:border-white/15 p-7 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
          >


            <div className="space-y-5">
              {/* Header Badge */}
              <div className="flex items-center justify-between border-b border-[var(--line)] dark:border-white/10 pb-4">
                <span className="font-mono text-xs font-bold text-[var(--pine)]/85 dark:text-white/80">
                  {tier.tier}
                </span>
                <span
                  className="font-mono text-[10px] font-bold px-2.5 py-1 rounded-full border"
                  style={{
                    color: tier.accent,
                    borderColor: `${tier.accent}40`,
                    background: `${tier.accent}12`,
                  }}
                >
                  {tier.badge}
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center border shadow-xs transition-transform duration-200 group-hover:scale-105"
                    style={{
                      background: tier.accentGlow,
                      borderColor: `${tier.accent}30`,
                      color: tier.accent,
                    }}
                  >
                    <TierIcon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-[var(--pine)] dark:text-white tracking-tight">
                    {tier.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[var(--pine)]/75 dark:text-white/70 leading-relaxed font-normal">
                  {tier.desc}
                </p>
              </div>

              {/* Tab Selector Buttons */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[var(--porcelain)] dark:bg-white/5 border border-[var(--line)] dark:border-white/10 w-fit text-[11px] font-mono">
                <button
                  type="button"
                  onClick={() => setTabForTier(tier.tier, 'curriculum')}
                  className={cn(
                    'px-2.5 py-1 rounded-lg transition-colors cursor-pointer',
                    currentTab === 'curriculum'
                      ? 'bg-white dark:bg-white/15 text-[var(--pine)] dark:text-white font-bold shadow-2xs'
                      : 'text-[var(--pine)]/60 dark:text-white/60 hover:text-[var(--pine)] dark:hover:text-white'
                  )}
                >
                  Curriculum
                </button>
                <button
                  type="button"
                  onClick={() => setTabForTier(tier.tier, 'tools')}
                  className={cn(
                    'px-2.5 py-1 rounded-lg transition-colors cursor-pointer',
                    currentTab === 'tools'
                      ? 'bg-white dark:bg-white/15 text-[var(--pine)] dark:text-white font-bold shadow-2xs'
                      : 'text-[var(--pine)]/60 dark:text-white/60 hover:text-[var(--pine)] dark:hover:text-white'
                  )}
                >
                  Stack
                </button>
                <button
                  type="button"
                  onClick={() => setTabForTier(tier.tier, 'outcome')}
                  className={cn(
                    'px-2.5 py-1 rounded-lg transition-colors cursor-pointer',
                    currentTab === 'outcome'
                      ? 'bg-white dark:bg-white/15 text-[var(--pine)] dark:text-white font-bold shadow-2xs'
                      : 'text-[var(--pine)]/60 dark:text-white/60 hover:text-[var(--pine)] dark:hover:text-white'
                  )}
                >
                  Impact
                </button>
              </div>

              {/* Dynamic Tab Panels */}
              <div className="min-h-[110px] pt-1">
                <AnimatePresence mode="wait">
                  {currentTab === 'curriculum' && (
                    <motion.div
                      key="curriculum"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      className="space-y-2"
                    >
                      {tier.highlights.map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-[var(--pine)]/85 dark:text-white/80">
                          <CheckCircle2
                            className="w-3.5 h-3.5 shrink-0 mt-0.5"
                            style={{ color: tier.accent }}
                          />
                          <span>{item}</span>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {currentTab === 'tools' && (
                    <motion.div
                      key="tools"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      className="space-y-2"
                    >
                      <div className="flex flex-wrap gap-1.5">
                        {tier.tools.map((tool, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-lg bg-[var(--porcelain)] dark:bg-white/10 border border-[var(--line)] dark:border-white/10 text-[11px] font-mono text-[var(--pine)] dark:text-white"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {currentTab === 'outcome' && (
                    <motion.div
                      key="outcome"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      className="p-3 rounded-xl bg-[var(--porcelain)] dark:bg-black/40 border border-[var(--line)] dark:border-white/10 text-xs font-mono text-[var(--pine)]/90 dark:text-white/90 leading-relaxed"
                    >
                      <Trophy className="w-3.5 h-3.5 text-[#ffa24d] inline mr-1.5 mb-0.5" />
                      <span>{tier.outcome}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom Metric & Link */}
            <div className="pt-4 border-t border-[var(--line)] dark:border-white/10 flex items-center justify-between text-xs font-mono">
              <span className="font-semibold" style={{ color: tier.accent }}>
                {tier.metric}
              </span>
              <Link
                href="/contact"
                className="text-[var(--pine)]/60 dark:text-white/60 hover:text-[var(--pine)] dark:hover:text-white flex items-center gap-1 transition-colors"
              >
                <span>Partner</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
