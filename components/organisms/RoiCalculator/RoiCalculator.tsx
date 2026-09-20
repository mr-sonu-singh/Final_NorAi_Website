'use client';

import React, { useState } from 'react';
import { Button } from '@/components/atoms/Button';
import { Link } from '@/components/atoms/Link';
import { ArrowRight } from 'lucide-react';

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
      <div className="space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border-subtle">
          <div className="max-w-xl space-y-2">
            <p className="text-xs font-mono font-semibold uppercase tracking-[0.14em] text-accent-primary">
              Operational Drag &amp; ROI Benchmark
            </p>
            <h3 className="font-display text-3xl sm:text-4xl md:text-5xl text-text-primary font-normal leading-tight tracking-tight">
              Quantify your team&apos;s <br />
              <span className="font-medium text-text-primary">efficiency dividend.</span>
            </h3>
            <p className="text-base text-text-secondary leading-relaxed">
              Adjust your operational intake volume to see how sub-second deterministic extraction
              eliminates manual review backlogs and cloud API token waste.
            </p>
          </div>

          <div className="shrink-0 flex items-center font-mono text-xs text-text-muted bg-surface-canvas px-3.5 py-2 rounded-lg border border-border-subtle">
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
                <label htmlFor="doc-slider" className="text-sm font-semibold text-text-primary">
                  Weekly Documents / Ingest Items
                </label>
                <span className="font-mono tabular-nums text-sm font-semibold text-text-primary">
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
                className="w-full h-2.5 bg-surface-panel-subtle rounded-lg appearance-none cursor-pointer accent-accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
              />
              <div className="flex justify-between text-[11px] font-mono text-text-muted">
                <span>50</span>
                <span>3,000+</span>
              </div>
            </div>

            {/* Slider 2: Team Members */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label htmlFor="team-slider" className="text-sm font-semibold text-text-primary">
                  Operations &amp; Hiring Staff Size
                </label>
                <span className="font-mono tabular-nums text-sm font-semibold text-text-primary">
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
                className="w-full h-2.5 bg-surface-panel-subtle rounded-lg appearance-none cursor-pointer accent-accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
              />
              <div className="flex justify-between text-[11px] font-mono text-text-muted">
                <span>1 person</span>
                <span>40+ team</span>
              </div>
            </div>

            {/* Micro comparison bar */}
            <div className="p-4 rounded-2xl bg-surface-panel-subtle/40 border border-border-subtle space-y-2.5 text-xs">
              <div className="flex justify-between font-mono">
                <span className="text-text-secondary">Workflow Execution Speed</span>
                <span className="text-accent-primary font-semibold">48x Acceleration</span>
              </div>
              <div className="w-full h-3 rounded-full bg-surface-panel flex overflow-hidden border border-border-subtle">
                <div className="bg-accent-primary h-full w-[96%]" title="NorAI Automated Parsing" />
                <div className="bg-surface-panel-subtle h-full w-[4%]" title="Manual Overhead" />
              </div>
              <p className="text-[11px] text-text-secondary leading-relaxed">
                Replaces manual copy-pasting, multi-tab ATS entry, and hallucination fact-checking
                with single-click deterministic pipelines.
              </p>
            </div>
          </div>

          {/* Metric Outputs Column (Span 6) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Metric 1: Hours Saved */}
            <div className="p-5 sm:p-6 rounded-xl bg-surface-canvas border border-border-subtle space-y-2">
              <span className="text-xs font-mono font-medium text-text-muted uppercase tracking-wider block">
                Time Saved
              </span>
              <div className="font-display text-4xl sm:text-5xl text-text-primary font-normal tabular-nums">
                {hoursSavedPerMonth.toLocaleString()}
                <span className="text-lg font-sans text-text-muted font-normal ml-1">hrs/mo</span>
              </div>
              <p className="text-xs text-text-secondary">
                Eliminates {Math.round(hoursSavedPerMonth / teamSize)} hours of manual document drag
                per operator every month.
              </p>
            </div>

            {/* Metric 2: Estimated Value */}
            <div className="p-5 sm:p-6 rounded-xl bg-surface-canvas border border-border-subtle space-y-2">
              <span className="text-xs font-mono font-medium text-text-muted uppercase tracking-wider block">
                Value Reclaimed
              </span>
              <div className="font-display text-4xl sm:text-5xl text-text-primary font-normal tabular-nums text-accent-primary">
                ${costSavingsPerMonth.toLocaleString()}
                <span className="text-lg font-sans text-text-muted font-normal ml-1">/mo</span>
              </div>
              <p className="text-xs text-text-secondary">
                Direct payroll hours reallocated to high-value candidate interviews and client
                strategy.
              </p>
            </div>

            {/* Metric 3: Token Waste Eliminated */}
            <div className="p-5 sm:p-6 rounded-xl bg-surface-canvas border border-border-subtle space-y-2">
              <span className="text-xs font-mono font-medium text-text-muted uppercase tracking-wider block">
                Cloud Waste Cut
              </span>
              <div className="font-display text-4xl sm:text-5xl text-text-primary font-normal tabular-nums">
                ${apiOverheadSaved.toLocaleString()}
                <span className="text-lg font-sans text-text-muted font-normal ml-1">/mo</span>
              </div>
              <p className="text-xs text-text-secondary">
                Zero schema drift retries or exorbitant raw LLM token wastage.
              </p>
            </div>

            {/* Metric 4: CTA Card (Navy Well) */}
            <div className="p-5 sm:p-6 rounded-xl bg-[#111722] text-[#F5F0EA] border border-white/10 space-y-3 flex flex-col justify-between">
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono text-slate-400 font-medium block">
                  Instant Realization
                </span>
                <h4 className="font-display text-xl text-white font-normal">
                  Claim 50 starter credits
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Test your documents immediately in the web sandbox or book an enterprise review.
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-white/10">
                <Link href="/products" className="block w-full">
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full justify-center group text-xs font-semibold cursor-pointer"
                  >
                    <span>Test 50 Sandbox Ingests</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link
                  href="/contact?service=roi-benchmark"
                  className="block text-center text-[11px] font-mono text-slate-400 hover:text-white transition-colors"
                >
                  or schedule architecture review &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoiCalculator;
