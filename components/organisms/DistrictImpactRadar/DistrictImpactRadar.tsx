'use client';

import React, { useState } from 'react';
import { Search, MapPin, CheckCircle2, Radio } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface DistrictInfo {
  name: string;
  division: string;
  focus: string;
  status: 'Active' | 'Expanding' | 'Scheduled';
  metrics: string;
}

const SAMPLE_DISTRICTS: DistrictInfo[] = [
  {
    name: 'Varanasi',
    division: 'Varanasi',
    focus: 'Weaver guild digitization & Sanskrit-Hindi NLP models',
    status: 'Active',
    metrics: '420+ Artisans & Students trained',
  },
  {
    name: 'Lucknow',
    division: 'Lucknow',
    focus: 'State governance alert parser & university AI labs',
    status: 'Active',
    metrics: '1,250+ Collegiate Scholars',
  },
  {
    name: 'Gautam Buddha Nagar (Noida)',
    division: 'Meerut',
    focus: 'Core engineering studio & micro-SaaS benchmarking',
    status: 'Active',
    metrics: 'Primary R&D Enclave',
  },
  {
    name: 'Kanpur Nagar',
    division: 'Kanpur',
    focus: 'Industrial telemetry & logistics document extraction',
    status: 'Active',
    metrics: '380+ Engineering Learners',
  },
  {
    name: 'Prayagraj',
    division: 'Prayagraj',
    focus: 'Public service exam verification & legal gazette NLP',
    status: 'Expanding',
    metrics: '620+ Aspirants Supported',
  },
  {
    name: 'Gorakhpur',
    division: 'Gorakhpur',
    focus: 'Eastern UP agricultural voice interfaces & mandi rates',
    status: 'Expanding',
    metrics: '510+ Rural Citizens',
  },
  {
    name: 'Agra',
    division: 'Agra',
    focus: 'Footwear MSME inventory parsing & tourism vernacular AI',
    status: 'Scheduled',
    metrics: 'Cohort Launching Q4',
  },
  {
    name: 'Ayodhya',
    division: 'Ayodhya',
    focus: 'Civic crowd telemetry & multi-lingual hospitality assistance',
    status: 'Scheduled',
    metrics: 'Cohort Launching Q4',
  },
  {
    name: 'Meerut',
    division: 'Meerut',
    focus: 'Sports goods manufacturing documentation & automation',
    status: 'Scheduled',
    metrics: 'Cohort Launching Q1',
  },
  {
    name: 'Jhansi',
    division: 'Jhansi',
    focus: 'Bundelkhand drought monitoring & rural welfare navigation',
    status: 'Scheduled',
    metrics: 'Cohort Launching Q1',
  },
];

export function DistrictImpactRadar() {
  const [search, setSearch] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictInfo>(
    SAMPLE_DISTRICTS[0] as DistrictInfo,
  );

  const filtered = SAMPLE_DISTRICTS.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.division.toLowerCase().includes(search.toLowerCase()) ||
    d.focus.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="rounded-[22px] bg-[#072929] text-[#f5f5f0] border border-[var(--line)] p-6 sm:p-10 shadow-xl overflow-hidden relative">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-[var(--pine-20)] pb-8">
        <div className="space-y-2 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--mint)]/20 text-[var(--mint)] border border-[var(--mint)]/30 font-mono text-xs font-bold uppercase tracking-wider">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Regional Youth & Local Area Telemetry</span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#f5f5f0] tracking-tight">
            A Vision to Upskill Youth & Regional Communities.
          </h3>
          <p className="text-sm sm:text-base text-[var(--bone-70)] max-w-2xl font-normal">
            We reject the idea that artificial intelligence should be locked in elite metropolitan enclaves.
            NorAI is committed to a statewide vision: free workshops, localized open-weight tooling, and hands-on developer training for local youth and collegiate talent across Uttar Pradesh.
          </p>
        </div>

        {/* Aggregate Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 shrink-0">
          <div className="p-3.5 rounded-xl bg-[var(--forest)]/60 border border-[var(--line)] text-left">
            <span className="font-display text-2xl font-extrabold text-[var(--mint)] block">Vision</span>
            <span className="text-[11px] font-mono text-[var(--bone-70)] uppercase">Youth & Local Areas</span>
          </div>
          <div className="p-3.5 rounded-xl bg-[var(--forest)]/60 border border-[var(--line)] text-left">
            <span className="font-display text-2xl font-extrabold text-[var(--lavender)] block">100% Free</span>
            <span className="text-[11px] font-mono text-[var(--bone-70)] uppercase">Scholar Access</span>
          </div>
          <div className="p-3.5 rounded-xl bg-[var(--forest)]/60 border border-[var(--line)] text-left col-span-2 sm:col-span-1">
            <span className="font-display text-2xl font-extrabold text-[var(--sky)] block">EN / HI</span>
            <span className="text-[11px] font-mono text-[var(--bone-70)] uppercase">Bilingual Core</span>
          </div>
        </div>
      </div>

      {/* District Explorer Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-8">
        {/* District Selector List */}
        <div className="lg:col-span-6 space-y-4 text-left">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--bone-70)]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search district or division (e.g. Varanasi, Lucknow)..."
              className="w-full h-10 pl-10 pr-4 rounded-xl bg-[var(--forest)]/70 border border-[var(--line)] text-xs text-[#f5f5f0] placeholder:text-[var(--bone-70)] focus:outline-none focus:border-[var(--mint)] transition-colors"
            />
          </div>

          <div className="max-h-72 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
            {filtered.map((d) => {
              const isSelected = selectedDistrict.name === d.name;
              return (
                <button
                  key={d.name}
                  type="button"
                  onClick={() => setSelectedDistrict(d)}
                  className={cn(
                    'w-full p-3 rounded-xl border text-left flex items-center justify-between gap-3 transition-all duration-150 cursor-pointer',
                    isSelected
                      ? 'bg-[var(--forest)] border-[var(--mint)] shadow-sm text-[#f5f5f0]'
                      : 'bg-[var(--forest)]/30 border-[var(--line)]/50 hover:bg-[var(--forest)]/60 text-[var(--bone-70)]',
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <MapPin className={cn('w-4 h-4 shrink-0', isSelected ? 'text-[var(--mint)]' : 'text-[var(--bone-70)]')} />
                    <div>
                      <span className="font-display text-sm font-bold text-[#f5f5f0] block">{d.name}</span>
                      <span className="text-[10px] font-mono text-[var(--bone-70)]">Division: {d.division}</span>
                    </div>
                  </div>

                  <span
                    className={cn(
                      'text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full uppercase',
                      d.status === 'Active' && 'bg-[var(--mint)]/20 text-[var(--mint)]',
                      d.status === 'Expanding' && 'bg-[var(--lavender)]/20 text-[var(--lavender)]',
                      d.status === 'Scheduled' && 'bg-white/10 text-white/90 font-medium',
                    )}
                  >
                    {d.status}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected District Telemetry Card */}
        <div className="lg:col-span-6 rounded-2xl bg-[var(--forest)]/70 border border-[var(--line)] p-6 sm:p-7 flex flex-col justify-between text-left space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--mint)] font-bold block">
                  ACTIVE DISTRICT FOCUS
                </span>
                <h4 className="font-display text-2xl font-extrabold text-[#f5f5f0]">
                  {selectedDistrict.name}
                </h4>
              </div>
              <span className="font-mono text-xs text-[var(--bone-70)]">
                {selectedDistrict.metrics}
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-[var(--bone-70)] uppercase font-semibold block">
                Regional Model Specialization
              </span>
              <p className="text-sm sm:text-base text-[var(--bone)] leading-relaxed font-medium">
                {selectedDistrict.focus}
              </p>
            </div>

            <div className="pt-2 space-y-2">
              <div className="flex items-start gap-2 text-xs text-[var(--bone-70)]">
                <CheckCircle2 className="w-4 h-4 text-[var(--mint)] shrink-0 mt-0.5" />
                <span>Zero hardware cost: optimized to run on low-tier smartphones and basic campus PCs.</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-[var(--bone-70)]">
                <CheckCircle2 className="w-4 h-4 text-[var(--mint)] shrink-0 mt-0.5" />
                <span>Bilingual English &amp; Hindi synthetic prompt library provided at ₹0 cost.</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[var(--line)] flex items-center justify-between text-xs font-mono text-[var(--bone-70)]">
            <span>Status: <strong className="text-[#f5f5f0]">{selectedDistrict.status}</strong></span>
            <span className="text-[var(--mint)] font-semibold">100% Open Access</span>
          </div>
        </div>
      </div>
    </div>
  );
}
