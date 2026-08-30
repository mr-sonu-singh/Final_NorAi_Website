'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ProductData } from '@/lib/products';
import { ResumeShortlisterWorkbench } from '@/components/organisms/tools';
import { Link } from '@/components/atoms/Link';
import {
  Sparkles,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Lock,
  Layers,
} from 'lucide-react';

interface ProductInteractiveViewProps {
  product: ProductData;
  slug: string;
}

export function ProductInteractiveView({
  product,
  slug,
}: ProductInteractiveViewProps) {
  const isResumeShortlister = slug === 'resume-shortlister' || slug === 'ai-resume-shortlister';
  const [viewMode, setViewMode] = useState<'workbench' | 'specs'>(
    isResumeShortlister ? 'workbench' : 'specs'
  );

  return (
    <div className="w-full space-y-10">
      {/* Mode Switcher Tabs */}
      <div className="flex items-center justify-center">
        <div className="inline-flex p-1.5 rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] shadow-sm">
          <button
            type="button"
            onClick={() => setViewMode('workbench')}
            className={cn(
              'flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all',
              viewMode === 'workbench'
                ? 'bg-[#0D253D] text-white shadow-sm'
                : 'text-ink-secondary hover:text-ink-primary hover:bg-canvas-recessed'
            )}
          >
            <Sparkles className="w-4 h-4 text-accent-500" />
            <span>Live Interactive Workbench</span>
            {isResumeShortlister && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-1" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setViewMode('specs')}
            className={cn(
              'flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all',
              viewMode === 'specs'
                ? 'bg-[#0D253D] text-white shadow-sm'
                : 'text-ink-secondary hover:text-ink-primary hover:bg-canvas-recessed'
            )}
          >
            <BookOpen className="w-4 h-4 text-accent-secondary" />
            <span>Specifications & Narrative</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: LIVE WORKBENCH */}
      {viewMode === 'workbench' && (
        <div className="w-full animate-fadeIn">
          {isResumeShortlister ? (
            <ResumeShortlisterWorkbench />
          ) : (
            /* Upcoming Tool Staging Card */
            <div className="rounded-3xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] p-10 md:p-16 text-center shadow-lg max-w-3xl mx-auto space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-accent-50 text-accent-500 flex items-center justify-center mx-auto">
                <Lock className="w-7 h-7" />
              </div>

              <div className="space-y-2">
                <span className="font-mono text-xs uppercase font-bold text-accent-500 tracking-wider">
                  Phase Rollout in Progress
                </span>
                <h3 className="font-display text-3xl md:text-4xl text-ink-primary font-normal">
                  {product.title} Workbench
                </h3>
                <p className="text-sm md:text-base text-ink-body max-w-xl mx-auto leading-relaxed">
                  We are rolling out NorAI tools sequentially to ensure zero-hallucination guarantees and sub-second SLAs.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-canvas-recessed/60 border border-[rgba(13,37,61,0.08)] max-w-md mx-auto text-xs text-left font-mono space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-ink-secondary">Engine Target:</span>
                  <span className="text-ink-primary font-semibold">Gemini 2.5 Flash High-Context</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-ink-secondary">Data Policy:</span>
                  <span className="text-emerald-700 font-semibold">Ephemeral In-Memory</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-ink-secondary">Phase 1 Live Tool:</span>
                  <span className="text-accent-500 font-semibold">AI Resume Shortlister</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/products/resume-shortlister">
                  <button
                    type="button"
                    className="px-6 py-3 rounded-lg bg-accent-500 text-white text-xs font-semibold hover:bg-accent-600 transition-colors shadow-sm inline-flex items-center gap-2"
                  >
                    <span>Test AI Resume Shortlister Live</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
                <button
                  type="button"
                  onClick={() => setViewMode('specs')}
                  className="px-6 py-3 rounded-lg border border-[rgba(13,37,61,0.15)] bg-canvas-base text-ink-primary text-xs font-medium hover:border-accent-500 transition-colors"
                >
                  Read Technical Specifications
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: EDITORIAL SPECIFICATIONS & NARRATIVE */}
      {viewMode === 'specs' && (
        <div className="w-full space-y-16 animate-fadeIn">
          {/* Problem vs Solution Story */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-8">
              {/* Problem */}
              <div className="rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] p-8 shadow-sm">
                <h3 className="font-display text-2xl text-ink-primary font-normal mb-4">
                  The Bottleneck
                </h3>
                <div className="space-y-3 text-base text-ink-body leading-relaxed border-l-2 border-accent-500/40 pl-4">
                  {product.problem.map((prob, pIdx) => (
                    <p key={pIdx}>{prob}</p>
                  ))}
                </div>
              </div>

              {/* Solution */}
              <div className="rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] p-8 shadow-sm">
                <h3 className="font-display text-2xl text-ink-primary font-normal mb-4">
                  The NorAI Solution
                </h3>
                <div className="space-y-4">
                  {product.solution.map((sol, sIdx) => (
                    <div key={sIdx} className="flex items-start gap-3 text-base text-ink-body leading-relaxed">
                      <CheckCircle2 className="w-5 h-5 text-accent-secondary shrink-0 mt-0.5" />
                      <span>{sol}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Technical Spec Card */}
            <div className="lg:col-span-5 rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] p-8 shadow-sm space-y-6">
              <h3 className="font-display text-xl text-ink-primary font-normal">
                Technical Specifications
              </h3>

              <div className="space-y-3 font-sans text-xs">
                <div className="flex items-center justify-between p-3 rounded-lg bg-canvas-recessed/60">
                  <span className="text-ink-secondary">Inference Model</span>
                  <span className="font-mono text-ink-primary font-medium">Gemini 2.5 Flash (1M ctx)</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-canvas-recessed/60">
                  <span className="text-ink-secondary">Processing Mode</span>
                  <span className="font-mono text-ink-primary font-medium">Ephemeral In-Memory</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-canvas-recessed/60">
                  <span className="text-ink-secondary">Integration</span>
                  <span className="font-mono text-ink-primary font-medium">REST API & Web UI</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-canvas-recessed/60">
                  <span className="text-ink-secondary">Data Retention</span>
                  <span className="font-mono text-emerald-700 font-medium">Zero Permanent Storage</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[rgba(13,37,61,0.08)]">
                <Link
                  href="/docs"
                  className="text-xs font-semibold text-accent-500 hover:underline flex items-center gap-1"
                >
                  <span>Explore developer API documentation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="space-y-6">
            <div>
              <h3 className="font-display text-3xl text-ink-primary font-normal">
                Engineered for speed & precision.
              </h3>
              <p className="text-sm text-ink-body mt-1">
                Core capabilities built into the single-purpose architecture.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.1)] p-6 shadow-sm space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-accent-500" />
                    <h4 className="font-display text-xl text-ink-primary font-normal">
                      {feat.title}
                    </h4>
                  </div>
                  <p className="text-sm text-ink-body leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
