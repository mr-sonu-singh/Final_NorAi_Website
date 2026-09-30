'use client';

import React from 'react';
import { Container } from '@/components/foundation/Container';
import { ShieldCheck, Cpu, TrendingUp, Palette, Bot, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

export interface StudioEngineer {
  id: string;
  name: string;
  role: string;
  conviction: string;
  runtimeOwnership: string;
  primaryToken: string;
  accent: string;
  icon: React.ElementType;
}

export const STUDIO_ENGINEERS: StudioEngineer[] = [
  {
    id: 'dhruw-singh',
    name: 'Dhruw Singh',
    role: 'Founder & Head of Strategic Operations',
    conviction: 'Operational security, institutional governance, and state-level outreach.',
    runtimeOwnership: 'Security Guardrails · Institutional Governance · State Outreach',
    primaryToken: 'Operational Security & Governance',
    accent: '#38BDF8',
    icon: ShieldCheck,
  },
  {
    id: 'sonu-singh',
    name: 'Sonu Singh',
    role: 'Co-Founder & Spatial Systems Lead',
    conviction: 'Tactile 3D interaction models, WebGPU compute shaders, and spatial telemetry.',
    runtimeOwnership: 'WebGPU Compute · Three.js/WGSL · Spatial Telemetry',
    primaryToken: 'WebGPU & Spatial Interaction Systems',
    accent: '#00e5ff',
    icon: Cpu,
  },
  {
    id: 'annanta-singh',
    name: 'Annanta Singh',
    role: 'Digital Growth & Client Pipelines Lead',
    conviction: 'Technical search visibility and enterprise partnership funnels into production.',
    runtimeOwnership: 'Inbound Funnels · Technical SEO · B2B Client Pipelines',
    primaryToken: 'Enterprise Partnership Ecosystems',
    accent: '#7a5cff',
    icon: TrendingUp,
  },
  {
    id: 'rishabh-singh',
    name: 'Rishabh Singh',
    role: 'Design & UI/UX Architecture Lead',
    conviction: 'High-craft design tokens, fluid spring physics, and tactile software surfaces.',
    runtimeOwnership: 'Design Systems · Fluid Spring Physics · motion/react',
    primaryToken: 'High-Craft Design Tokens',
    accent: '#ffa24d',
    icon: Palette,
  },
  {
    id: 'gourav-singh',
    name: 'Gourav Singh',
    role: 'AI Orchestration Lead & Systems Architect',
    conviction: 'Typed orchestration state machines, and output contracts a runtime can actually enforce.',
    runtimeOwnership: 'Autonomous Multi-Agents · pgvector · vLLM Serving',
    primaryToken: 'Deterministic Zod Contracts',
    accent: '#38BDF8',
    icon: Bot,
  },
];

export function SwissStudioRoster() {
  return (
    <section className="py-16 sm:py-24 border-b border-[var(--line)] bg-[#f5f5f0] dark:bg-[#060919]">
      <Container size="wide" className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-12 text-left space-y-2">
          <span className="font-mono text-xs text-[var(--mint-ink)] dark:text-[#38BDF8] uppercase tracking-widest font-bold block">
            FOUNDING STUDIO ENGINEERS · SWISS ROSTER
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--pine)] dark:text-white tracking-[-0.03em]">
            The people who write the code.
          </h2>
          <p className="text-sm sm:text-base text-[var(--pine)]/75 dark:text-white/70">
            Zero executive insulation. Each engineer directly owns production runtime services.
          </p>
        </div>

        {/* Dynamic Interactive Typographic Ledger */}
        <div className="divide-y divide-[var(--line)] dark:divide-white/10 border-y border-[var(--line)] dark:border-white/10 text-left">
          {STUDIO_ENGINEERS.map((eng, idx) => {
            const Icon = eng.icon;

            return (
              <motion.div
                key={eng.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.25, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="py-6 sm:py-8 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all duration-200 group hover:bg-[#fffdf7] dark:hover:bg-[#060919] px-4 -mx-4 rounded-2xl cursor-pointer hover:shadow-md"
              >
                {/* Left: Index + Name + Role */}
                <div className="flex items-start md:items-center gap-4 sm:gap-6">
                  <span className="font-mono text-xs text-[var(--pine)]/40 dark:text-white/40 font-bold mt-1 md:mt-0">
                    {String(idx + 1).padStart(2, '0')}
                  </span>

                  <div
                    className="w-11 h-11 rounded-xl bg-[var(--porcelain)] dark:bg-white/5 border border-[var(--line)] dark:border-white/10 flex items-center justify-center text-[var(--pine)] dark:text-white shrink-0 group-hover:scale-105 transition-transform"
                    style={{ borderColor: `${eng.accent}40` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: eng.accent }} />
                  </div>

                  <div>
                    <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[var(--pine)] dark:text-white tracking-tight group-hover:text-[#38BDF8] transition-colors">
                      {eng.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-mono text-[var(--pine)]/75 dark:text-white/70 mt-0.5">
                      {eng.role}
                    </p>
                  </div>
                </div>

                {/* Center: Conviction Line */}
                <div className="max-w-md hidden lg:block text-xs sm:text-sm text-[var(--pine)]/80 dark:text-white/70 leading-relaxed font-normal">
                  {eng.conviction}
                </div>

                {/* Right: Runtime Ownership Capsule */}
                <div className="flex items-center gap-3 shrink-0">
                  <span
                    className="font-mono text-xs px-3.5 py-1.5 rounded-full border transition-colors"
                    style={{
                      background: `${eng.accent}12`,
                      borderColor: `${eng.accent}30`,
                      color: eng.accent,
                    }}
                  >
                    {eng.primaryToken}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[var(--pine-08)] dark:bg-white/10 flex items-center justify-center text-[var(--pine)] dark:text-white group-hover:bg-[#38BDF8] group-hover:text-[#060919] transition-all">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
