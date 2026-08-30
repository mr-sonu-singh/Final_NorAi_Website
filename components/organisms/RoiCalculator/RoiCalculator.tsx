'use client';

import React, { useState } from 'react';
import { Button } from '@/components/atoms/Button';
import { Link } from '@/components/atoms/Link';
import { ArrowRight, Calculator, Clock, DollarSign, Zap } from 'lucide-react';

export function RoiCalculator() {
  const [docCount, setDocCount] = useState<number>(350); // documents / week
  const [teamSize, setTeamSize] = useState<number>(6); // team members

  // Calculations
  // Manual time per doc = ~12 mins (0.2 hrs)
  const manualHoursPerMonth = Math.round(docCount * 4 * 0.2);
  // NorAI time per doc = <0.35s (instant)
  const noraiHoursPerMonth = Math.round(docCount * 4 * 0.005);
  const hoursSavedPerMonth = manualHoursPerMonth - noraiHoursPerMonth;

  // Cost calculation based on average knowledge worker hourly rate ($28/hr)
  const costSavingsPerMonth = Math.round(hoursSavedPerMonth * 28);

  // Cloud API wrapper overhead savings (elimination of token wastage from unstructured retries)
  const apiOverheadSaved = Math.round(docCount * 4 * 0.18);

  return (
    <div className="w-full text-left font-sans">
      <div className="rounded-3xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] p-8 sm:p-10 lg:p-14 shadow-lg">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-8 border-b border-[rgba(13,37,61,0.08)]">
          <div className="max-w-xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-50 border border-accent-500/20 text-accent-500 text-xs font-mono font-semibold">
              <Calculator className="w-3.5 h-3.5" />
              <span>Operational Drag & ROI Calculator</span>
            </div>
            <h3 className="font-display text-3xl sm:text-4xl md:text-5xl text-ink-primary font-normal leading-tight tracking-tight">
              Quantify your team&apos;s <br />
              <span className="italic text-accent-500 font-normal">efficiency dividend.</span>
            </h3>
            <p className="text-base text-ink-body leading-relaxed">
              Adjust your operational intake volume to see how sub-second deterministic extraction eliminates manual review backlogs and cloud API token waste.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2 font-mono text-xs text-ink-secondary bg-canvas-base px-3.5 py-2 rounded-xl border border-[rgba(13,37,61,0.08)]">
            <span className="w-2 h-2 rounded-full bg-accent-secondary animate-pulse" />
            <span>Benchmark: 320ms vLLM P95</span>
          </div>
        </div>

        {/* Interactive Grid: Sliders on Left, Live Metric Cards on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Sliders Column (Span 6) */}
          <div className="lg:col-span-6 space-y-8">
            {/* Slider 1: Weekly Documents */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label htmlFor="doc-slider" className="text-sm font-semibold text-ink-primary">
                  Weekly Documents / Ingest Items
                </label>
                <span className="font-mono tabular-nums text-sm font-bold text-accent-500 bg-accent-50 px-2.5 py-1 rounded border border-accent-500/20">
                  {docCount.toLocaleString()} items / wk
                </span>
              </div>
              <input
                id="doc-slider"
                type="range"
                min="50"
                max="3000"
                step="25"
                value={docCount}
                onChange={(e) => setDocCount(Number(e.target.value))}
                className="w-full h-2.5 bg-canvas-recessed rounded-lg appearance-none cursor-pointer accent-terra-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
              />
              <div className="flex justify-between text-[11px] font-mono text-ink-secondary">
                <span>50 (Startup)</span>
                <span>1,500 (Growth)</span>
                <span>3,000+ (Enterprise)</span>
              </div>
            </div>

            {/* Slider 2: Team Members */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label htmlFor="team-slider" className="text-sm font-semibold text-ink-primary">
                  Operations & Hiring Staff Size
                </label>
                <span className="font-mono tabular-nums text-sm font-bold text-accent-secondary bg-sage-100/70 px-2.5 py-1 rounded border border-accent-secondary/20">
                  {teamSize} team members
                </span>
              </div>
              <input
                id="team-slider"
                type="range"
                min="1"
                max="40"
                step="1"
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full h-2.5 bg-canvas-recessed rounded-lg appearance-none cursor-pointer accent-sage-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
              />
              <div className="flex justify-between text-[11px] font-mono text-ink-secondary">
                <span>1 person</span>
                <span>20 persons</span>
                <span>40+ team</span>
              </div>
            </div>

            {/* Micro comparison bar */}
            <div className="p-4 rounded-2xl bg-canvas-recessed/40 border border-[rgba(13,37,61,0.06)] space-y-2.5 text-xs">
              <div className="flex justify-between font-mono">
                <span className="text-ink-secondary">Workflow Execution Speed</span>
                <span className="text-accent-500 font-semibold">48x Acceleration</span>
              </div>
              <div className="w-full h-3 rounded-full bg-canvas-paper flex overflow-hidden border border-[rgba(13,37,61,0.06)]">
                <div className="bg-terra-500 h-full w-[96%]" title="NorAI Automated Parsing" />
                <div className="bg-canvas-recessed h-full w-[4%]" title="Manual Overhead" />
              </div>
              <p className="text-[11px] text-ink-secondary leading-relaxed">
                Replaces manual copy-pasting, multi-tab ATS entry, and hallucination fact-checking with single-click deterministic pipelines.
              </p>
            </div>
          </div>

          {/* Metric Outputs Column (Span 6) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Metric 1: Hours Saved */}
            <div className="p-6 rounded-2xl bg-canvas-base border border-[rgba(13,37,61,0.08)] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-medium text-ink-secondary uppercase tracking-wider">
                  Time Saved
                </span>
                <Clock className="w-4 h-4 text-accent-500" />
              </div>
              <div className="font-display text-4xl sm:text-5xl text-ink-primary font-normal tabular-nums">
                {hoursSavedPerMonth.toLocaleString()}
                <span className="text-lg font-sans text-ink-secondary font-normal ml-1">hrs/mo</span>
              </div>
              <p className="text-xs text-ink-secondary">
                Eliminates {Math.round(hoursSavedPerMonth / teamSize)} hours of manual document drag per operator every month.
              </p>
            </div>

            {/* Metric 2: Estimated Value */}
            <div className="p-6 rounded-2xl bg-canvas-base border border-[rgba(13,37,61,0.08)] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-medium text-ink-secondary uppercase tracking-wider">
                  Value Reclaimed
                </span>
                <DollarSign className="w-4 h-4 text-accent-secondary" />
              </div>
              <div className="font-display text-4xl sm:text-5xl text-ink-primary font-normal tabular-nums text-accent-500">
                ${costSavingsPerMonth.toLocaleString()}
                <span className="text-lg font-sans text-ink-secondary font-normal ml-1">/mo</span>
              </div>
              <p className="text-xs text-ink-secondary">
                Direct payroll hours reallocated to high-value candidate interviews and client strategy.
              </p>
            </div>

            {/* Metric 3: Token Waste Eliminated */}
            <div className="p-6 rounded-2xl bg-canvas-base border border-[rgba(13,37,61,0.08)] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-medium text-ink-secondary uppercase tracking-wider">
                  Cloud Waste Cut
                </span>
                <Zap className="w-4 h-4 text-accent-500" />
              </div>
              <div className="font-display text-4xl sm:text-5xl text-ink-primary font-normal tabular-nums">
                ${apiOverheadSaved.toLocaleString()}
                <span className="text-lg font-sans text-ink-secondary font-normal ml-1">/mo</span>
              </div>
              <p className="text-xs text-ink-secondary">
                Zero schema drift retries or exorbitant raw LLM token wastage.
              </p>
            </div>

            {/* Metric 4: CTA Card */}
            <div className="p-6 rounded-2xl bg-[#0D253D] text-white space-y-3 flex flex-col justify-between">
              <div className="space-y-1">
                <span className="text-xs font-mono text-emerald-400">Zero Setup Friction</span>
                <h4 className="font-display text-xl text-white font-normal">
                  Ready to benchmark?
                </h4>
                <p className="text-xs text-slate-300">
                  Book a 20-min architectural review or test with 50 free resumes right now.
                </p>
              </div>

              <Link href="/contact?service=roi-benchmark">
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full justify-center group text-xs font-semibold"
                >
                  <span>Book Architecture Audit</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoiCalculator;
