'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Code2, Rocket, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

const STEPS = [
  {
    step: '01',
    time: 'Day 1–2',
    icon: ShieldCheck,
    accent: '#38BDF8',
    title: 'Architecture Blueprint & Scoping',
    desc: 'We analyze your data boundaries, latency targets, and business constraints. We deliver a clear technical specification with zero vendor lock-in.',
    deliverable: 'Signed Architecture Spec & Zero-Egress Boundary Plan',
  },
  {
    step: '02',
    time: 'Day 3–7',
    icon: Code2,
    accent: '#7a5cff',
    title: '5-Day Functional PoC Sprint',
    desc: 'We author a functional, reproducible proof-of-concept in an isolated sandbox. You verify performance, accuracy, and latency with real test data.',
    deliverable: 'Working In-Memory Benchmark Probes & Test Suite',
  },
  {
    step: '03',
    time: 'Sprint Close',
    icon: Rocket,
    accent: '#ffa24d',
    title: 'Production Handover & Local Deploy',
    desc: 'Complete git repository transfer, Docker deployment configurations, and senior engineer architectural walkthrough. You own 100% of the code.',
    deliverable: '100% Repository Transfer & Docker Runbooks',
  },
];

export function ServicesEngagementTimeline() {
  return (
    <div className="space-y-12 text-left">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {/* Architectural Connecting Line (Desktop) */}
        <div
          className="hidden md:block absolute top-[45px] left-[15%] right-[15%] h-[1px] bg-black/10 dark:bg-white/15 z-0 pointer-events-none"
          aria-hidden="true"
        />

        {STEPS.map((s, idx) => {
          const SIcon = s.icon;
          return (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.3, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 p-7 sm:p-8 rounded-3xl bg-[#fffdf7] dark:bg-[#0D1226]/70 border border-[var(--line)] shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden"
            >
              {/* Top Step Pill & Time */}
              <div className="flex items-center justify-between mb-6">
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center border shadow-xs transition-transform duration-200 group-hover:scale-110"
                  style={{
                    background: `${s.accent}15`,
                    borderColor: `${s.accent}40`,
                    color: s.accent,
                  }}
                >
                  <SIcon className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[var(--pine)] text-white dark:bg-white/10">
                    STEP {s.step}
                  </span>
                  <span
                    className="font-mono text-xs font-bold px-2.5 py-1 rounded-full border"
                    style={{
                      color: s.accent,
                      borderColor: `${s.accent}30`,
                      background: `${s.accent}10`,
                    }}
                  >
                    {s.time}
                  </span>
                </div>
              </div>

              <h3 className="font-display text-xl font-bold text-[var(--pine)] dark:text-white mb-2 tracking-tight">
                {s.title}
              </h3>

              <p className="text-xs sm:text-sm text-[var(--pine)]/75 dark:text-white/70 leading-relaxed mb-6 font-normal">
                {s.desc}
              </p>

              <div className="pt-4 border-t border-[var(--line)] flex items-start gap-2 text-xs font-mono text-[var(--pine)]/85 dark:text-white/80">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#38BDF8] shrink-0 mt-0.5" />
                <span>{s.deliverable}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Architectural CTA Banner */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="p-8 sm:p-12 rounded-3xl bg-[#0D1226] border border-white/15 text-white flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-2xl relative overflow-hidden"
      >
        <div
          className="absolute -right-20 -bottom-20 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none opacity-25"
          style={{ background: '#7C3AED' }}
        />

        <div className="relative z-10 max-w-xl space-y-2">
          <span className="text-xs font-mono text-[#B278E3] font-bold uppercase tracking-wider block mb-2">
            FOUNDER-LED ARCHITECTURAL ENGAGEMENT
          </span>
          <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Ready to build with precision?
          </h3>
          <p className="text-sm text-[#a8beb4]">
            Speak directly with founding engineers. We scope technical feasibility and deliver reproducible PoC sandboxes within 24 hours.
          </p>
        </div>

        <Link
          href="/contact"
          className="relative z-10 inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#D4C5F9] text-[#03091E] font-semibold text-sm hover:bg-[#E4CEF7] transition-all duration-200 shadow-lg shadow-[#D4C5F9]/20 shrink-0 active:scale-[0.98] group"
        >
          <span>Start a Project Consultation</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </div>
  );
}
