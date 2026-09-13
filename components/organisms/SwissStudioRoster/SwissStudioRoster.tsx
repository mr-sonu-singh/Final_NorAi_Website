'use client';

import React from 'react';
import { Container } from '@/components/foundation/Container';
import { ShieldCheck, Cpu, TrendingUp, Palette, Bot, ArrowUpRight } from 'lucide-react';

export interface StudioEngineer {
  id: string;
  name: string;
  role: string;
  conviction: string;
  runtimeOwnership: string;
  primaryToken: string;
  icon: React.ElementType;
}

export const STUDIO_ENGINEERS: StudioEngineer[] = [
  {
    id: 'dhruw-singh',
    name: 'Dhruw Singh',
    role: 'Founder & Head of Strategic Operations',
    conviction: 'Operational security and institutional governance with 30 years defense discipline.',
    runtimeOwnership: 'Security Guardrails · Defense Rigor · State Outreach',
    primaryToken: '30y Defense Service · Corps of Signals',
    icon: ShieldCheck,
  },
  {
    id: 'sonu-singh',
    name: 'Sonu Singh',
    role: 'Co-Founder & Spatial Systems Lead',
    conviction: 'Tactile 3D interaction models, WebGPU compute shaders, and spatial telemetry.',
    runtimeOwnership: 'WebGPU Compute · Three.js/WGSL · Spatial Telemetry',
    primaryToken: 'Japan VR/AR Summit Finalist',
    icon: Cpu,
  },
  {
    id: 'annanta-singh',
    name: 'Annanta Singh',
    role: 'Digital Growth & Client Pipelines Lead',
    conviction: 'Technical search visibility and enterprise partnership funnels into production.',
    runtimeOwnership: 'Inbound Funnels · Technical SEO · B2B Client Pipelines',
    primaryToken: 'Enterprise Partnership Ecosystems',
    icon: TrendingUp,
  },
  {
    id: 'rishabh-singh',
    name: 'Rishabh Singh',
    role: 'Design & UI/UX Architecture Lead',
    conviction: 'High-craft design tokens, fluid spring physics, and tactile software surfaces.',
    runtimeOwnership: 'Design Systems · Fluid Spring Physics · motion/react',
    primaryToken: 'High-Craft Design Tokens',
    icon: Palette,
  },
  {
    id: 'gourav-singh',
    name: 'Gourav Singh',
    role: 'AI Orchestration Lead & Systems Architect',
    conviction: 'Deterministic multi-agent state machines and zero-hallucination runtime contracts.',
    runtimeOwnership: 'Autonomous Multi-Agents · pgvector · vLLM Serving',
    primaryToken: 'Deterministic Zod Contracts',
    icon: Bot,
  },
];

export function SwissStudioRoster() {

  return (
    <section className="py-16 sm:py-24 border-b border-[var(--line)] bg-[#f5f5f0]">
      <Container size="wide" className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-12 text-left space-y-2">
          <span className="font-mono text-xs text-[var(--mint-ink)] uppercase tracking-widest font-bold block">
            — FOUNDING STUDIO ENGINEERS · SWISS ROSTER
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--pine)] tracking-[-0.03em]">
            The people who write the code.
          </h2>
          <p className="text-sm sm:text-base text-[var(--pine)]/75">
            Zero executive insulation. Each engineer directly owns production runtime services.
          </p>
        </div>

        {/* Borderless Typographic Ledger */}
        <div className="divide-y divide-[var(--line)] border-y border-[var(--line)] text-left">
          {STUDIO_ENGINEERS.map((eng, idx) => {
            const Icon = eng.icon;
            
            return (
              <div
                key={eng.id}
                className="py-6 sm:py-8 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors duration-200 group hover:bg-[#fffdf7] px-4 -mx-4 rounded-xl cursor-pointer"
              >
                {/* Left: Index + Name + Role */}
                <div className="flex items-start md:items-center gap-4 sm:gap-6">
                  <span className="font-mono text-xs text-[var(--pine)]/40 font-bold mt-1 md:mt-0">
                    {String(idx + 1).padStart(2, '0')}
                  </span>

                  <div className="w-10 h-10 rounded-xl bg-[var(--porcelain)] border border-[var(--line)] flex items-center justify-center text-[var(--pine)] shrink-0 group-hover:border-[var(--mint-ink)] group-hover:text-[var(--mint-ink)] transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>

                  <div>
                    <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[var(--pine)] tracking-tight group-hover:text-[var(--mint-ink)] transition-colors">
                      {eng.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-mono text-[var(--pine)]/75 mt-0.5">
                      {eng.role}
                    </p>
                  </div>
                </div>

                {/* Center: Conviction Line */}
                <div className="max-w-md hidden lg:block text-xs sm:text-sm text-[var(--pine)]/80 leading-relaxed">
                  {eng.conviction}
                </div>

                {/* Right: Runtime Ownership Capsule */}
                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-mono text-xs px-3 py-1 rounded-full bg-[var(--pine-08)] text-[var(--pine)] border border-[var(--line)] group-hover:bg-[#00E599]/15 group-hover:text-[#008f5d] group-hover:border-[#00E599]/30 transition-colors">
                    {eng.primaryToken}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[var(--pine-08)] flex items-center justify-center text-[var(--pine)] group-hover:bg-[#00E599] group-hover:text-[#072929] transition-colors">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
