'use client';

import React, { useState } from 'react';
import { Search, BookOpen, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface EducationalModuleInfo {
  name: string;
  track: string;
  focus: string;
  status: 'In Development' | 'Planned' | 'Researching';
  metrics: string;
  keyHighlights: string[];
}

const PLANNED_MODULES: EducationalModuleInfo[] = [
  {
    name: 'Hindi Civic NLP & Notice Extraction',
    track: 'Vernacular AI',
    focus: 'Bilingual Hindi-English NLP pipelines to parse district public notices, citizen gazettes, and official welfare guidelines into plain language.',
    status: 'In Development',
    metrics: 'Vernacular NLP Track',
    keyHighlights: [
      'Open-weight Hindi language tokenization and transliteration benchmarks',
      'Extraction of deadlines, eligibility criteria, and regional civic alerts',
      'Zero-cloud dependencies: designed to run locally on consumer hardware',
    ],
  },
  {
    name: 'Collegiate Open-Weight Model Serving',
    track: 'Systems Engineering',
    focus: 'Hands-on architectural labs teaching undergraduate engineering students how to quantize, serve, and index local open-weight LLMs using vLLM and Ollama.',
    status: 'In Development',
    metrics: 'Systems Engineering Track',
    keyHighlights: [
      'Model Context Protocol (MCP) server creation and tool calling',
      'Vector store indexing and structured KaTeX retrieval pipelines',
      'Pragmatic deployment without expensive cloud GPU dependencies',
    ],
  },
  {
    name: 'High-School Computational Thinking',
    track: 'Foundations',
    focus: 'Introductory Python, algorithmic logic, and deterministic problem-solving designed to build strong programming fundamentals before generative tools.',
    status: 'Planned',
    metrics: 'Foundational Track',
    keyHighlights: [
      'Type-safe programming habits and foundational Python syntax',
      'Deconstructing algorithmic logic rather than copy-pasting code',
      'Designed for regional schools and polytechnic institutes in Eastern UP',
    ],
  },
  {
    name: 'Agricultural & Local Enterprise Tooling',
    track: 'Civic Utility',
    focus: 'Practical decision-support tools and vernacular voice query prototypes designed for rural micro-enterprises, mandi trade pricing, and local farmers.',
    status: 'Researching',
    metrics: 'Applied Civic Track',
    keyHighlights: [
      'Voice-first audio prompts for regional agricultural queries',
      'Offline-capable local data indexing with zero user telemetry',
      'Built in partnership with regional community and student builders',
    ],
  },
];

export function DistrictImpactRadar() {
  const [search, setSearch] = useState('');
  const [selectedModule, setSelectedModule] = useState<EducationalModuleInfo>(
    PLANNED_MODULES[0] as EducationalModuleInfo,
  );

  const filtered = PLANNED_MODULES.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.track.toLowerCase().includes(search.toLowerCase()) ||
    m.focus.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="rounded-[22px] bg-[#072929] text-[#f5f5f0] border border-[var(--line)] p-6 sm:p-10 shadow-xl overflow-hidden relative">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-[var(--pine-20)] pb-8">
        <div className="space-y-2 text-left">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--mint)] font-bold block mb-2">
            Curriculum & Regional Outreach Roadmap
          </span>
          <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#f5f5f0] tracking-tight">
            A Vision to Upskill Youth & Regional Communities.
          </h3>
          <p className="text-sm sm:text-base text-[var(--bone-70)] max-w-2xl font-normal">
            We reject the idea that artificial intelligence should be locked in elite metropolitan enclaves.
            NorAI is committed to an open educational vision: practical workshops, localized open-weight tooling, and hands-on developer training for collegiate talent and ambitious youth across Uttar Pradesh.
          </p>
        </div>

        {/* Aggregate Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 shrink-0">
          <div className="p-3.5 rounded-xl bg-[var(--forest)]/60 border border-[var(--line)] text-left">
            <span className="font-display text-2xl font-extrabold text-[var(--mint)] block">Vision</span>
            <span className="text-[11px] font-mono text-[var(--bone-70)] uppercase">Youth & Local Areas</span>
          </div>
          <div className="p-3.5 rounded-xl bg-[var(--forest)]/60 border border-[var(--line)] text-left">
            <span className="font-display text-2xl font-extrabold text-[var(--lavender)] block">Academic</span>
            <span className="text-[11px] font-mono text-[var(--bone-70)] uppercase">Scholar Access</span>
          </div>
          <div className="p-3.5 rounded-xl bg-[var(--forest)]/60 border border-[var(--line)] text-left col-span-2 sm:col-span-1">
            <span className="font-display text-2xl font-extrabold text-[var(--sky)] block">EN / HI</span>
            <span className="text-[11px] font-mono text-[var(--bone-70)] uppercase">Bilingual Core</span>
          </div>
        </div>
      </div>

      {/* Module Explorer Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-8">
        {/* Module Selector List */}
        <div className="lg:col-span-6 space-y-4 text-left">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--bone-70)]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search curriculum tracks or focus areas..."
              className="w-full h-10 pl-10 pr-4 rounded-xl bg-[var(--forest)]/70 border border-[var(--line)] text-xs text-[#f5f5f0] placeholder:text-[var(--bone-70)] focus:outline-none focus:border-[var(--mint)] transition-colors"
            />
          </div>

          <div className="max-h-72 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
            {filtered.map((m) => {
              const isSelected = selectedModule.name === m.name;
              return (
                <button
                  key={m.name}
                  type="button"
                  onClick={() => setSelectedModule(m)}
                  className={cn(
                    'w-full p-3.5 rounded-xl border text-left flex items-center justify-between gap-3 transition-all duration-150 cursor-pointer',
                    isSelected
                      ? 'bg-[var(--forest)] border-[var(--mint)] shadow-sm text-[#f5f5f0]'
                      : 'bg-[var(--forest)]/30 border-[var(--line)]/50 hover:bg-[var(--forest)]/60 text-[var(--bone-70)]',
                  )}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <BookOpen className={cn('w-4 h-4 shrink-0', isSelected ? 'text-[var(--mint)]' : 'text-[var(--bone-70)]')} />
                    <div className="min-w-0">
                      <span className="font-display text-sm font-bold text-[#f5f5f0] truncate block">{m.name}</span>
                      <span className="text-[10px] font-mono text-[var(--bone-70)]">Track: {m.track}</span>
                    </div>
                  </div>

                  <span
                    className={cn(
                      'text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full uppercase shrink-0',
                      m.status === 'In Development' && 'bg-[var(--mint)]/20 text-[var(--mint)]',
                      m.status === 'Planned' && 'bg-[var(--lavender)]/20 text-[var(--lavender)]',
                      m.status === 'Researching' && 'bg-white/10 text-white/90 font-medium',
                    )}
                  >
                    {m.status}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Module Telemetry Card */}
        <div className="lg:col-span-6 rounded-2xl bg-[var(--forest)]/70 border border-[var(--line)] p-6 sm:p-7 flex flex-col justify-between text-left space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--mint)] font-bold block">
                  PLANNED CURRICULUM MODULE
                </span>
                <h4 className="font-display text-2xl font-extrabold text-[#f5f5f0]">
                  {selectedModule.name}
                </h4>
              </div>
              <span className="font-mono text-xs text-[var(--bone-70)]">
                {selectedModule.metrics}
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-[var(--bone-70)] uppercase font-semibold block">
                Educational Scope & Objectives
              </span>
              <p className="text-sm sm:text-base text-[var(--bone)] leading-relaxed font-medium">
                {selectedModule.focus}
              </p>
            </div>

            <div className="pt-2 space-y-2">
              {selectedModule.keyHighlights.map((hl, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-[var(--bone-70)]">
                  <CheckCircle2 className="w-4 h-4 text-[var(--mint)] shrink-0 mt-0.5" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-[var(--line)] flex items-center justify-between text-xs font-mono text-[var(--bone-70)]">
            <span>Status: <strong className="text-[#f5f5f0]">{selectedModule.status}</strong></span>
            <span className="text-[var(--mint)] font-semibold">Open Educational Standards</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DistrictImpactRadar;
