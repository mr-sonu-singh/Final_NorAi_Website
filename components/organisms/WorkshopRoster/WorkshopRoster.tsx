'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';

interface Founder {
  name: string;
  role: string;
  pedigree: string;
  focus: string;
  bio: string;
}

const FOUNDERS: Founder[] = [
  {
    name: 'Sonu Singh',
    role: 'Founder & Head of Operations',
    pedigree: '30-Year Indian Army Veteran · Strategic Defense Operations',
    focus: 'Operational discipline, organizational architecture, enterprise execution rigor.',
    bio: 'Brings three decades of high-stakes defense leadership and operational precision to ensure NorAI operates with uncompromising reliability and zero friction.',
  },
  {
    name: 'Dhruw Singh',
    role: 'Co-Founder & Chief Technology Officer',
    pedigree: 'Computer Science (AI/ML) · Open-Source Protocol Maintainer',
    focus: 'Model Context Protocol (MCP) server architecture, sub-second inference pipelines, neural vector retrieval.',
    bio: 'Leads core AI architecture and deterministic neural tooling. Deeply committed to building high-speed, verifiable AI utilities from Uttar Pradesh for global engineering teams.',
  },
  {
    name: 'Gourav Singh',
    role: 'Co-Founder & Spatial Systems Architect',
    pedigree: 'Spatial Computing Researcher · Top-6 World Finalist Japan AR/VR Summit',
    focus: 'Multi-modal interaction models, next-generation spatial computing, real-time sensory data pipelines.',
    bio: 'Recognized at the world finals in Japan for spatial computing innovations. Drives human-machine interfaces and multi-modal sensory pipelines across NorAI products.',
  },
  {
    name: 'Rishabh',
    role: 'Founding Engineer & Backend Lead',
    pedigree: 'Distributed Systems & Database Optimization Specialist',
    focus: 'Vector database infrastructure, ephemeral RAM isolation, sub-100ms API endpoints.',
    bio: 'Architects the zero-data-retention serverless infrastructure that powers hundreds of concurrent resume evaluations and real-time community chat digests.',
  },
  {
    name: 'Annant',
    role: 'Founding Engineer & Applied AI Lead',
    pedigree: 'NLP Specialist & Model Distillation Researcher',
    focus: 'Domain-specific fine-tuning, prompt schema distillation, vernacular Indian language models.',
    bio: 'Engineers the multi-lingual clustering algorithms behind Smart Dainik News and high-accuracy lecture concept extraction for Course Note-Taker.',
  },
];

export function WorkshopRoster() {
  return (
    <div className="w-full text-left font-sans space-y-6">
      <div className="border-b border-[rgba(13,37,61,0.08)] pb-3">
        <span className="font-mono text-xs font-semibold text-accent-500 uppercase tracking-wider">
          // ENGINEERING FOUNDRY ROSTER
        </span>
      </div>

      <div className="divide-y divide-[rgba(13,37,61,0.1)]">
        {FOUNDERS.map((founder, idx) => (
          <div
            key={founder.name}
            className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start hover:bg-canvas-paper/40 transition-colors p-4 rounded-xl"
          >
            {/* Monogram and Name */}
            <div className="lg:col-span-4 space-y-1">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-accent-500">
                  0{idx + 1}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl text-ink-primary font-normal">
                  {founder.name}
                </h3>
              </div>
              <span className="text-xs font-medium text-accent-500 block">
                {founder.role}
              </span>
              <span className="font-mono text-[11px] text-ink-secondary block pt-1">
                {founder.pedigree}
              </span>
            </div>

            {/* Focus and Narrative */}
            <div className="lg:col-span-8 space-y-2">
              <p className="text-xs font-mono font-medium text-ink-secondary">
                CORE FOCUS: {founder.focus}
              </p>
              <p className="text-sm text-ink-body leading-relaxed">
                {founder.bio}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
