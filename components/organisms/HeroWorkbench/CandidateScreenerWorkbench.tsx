'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Link } from '@/components/atoms/Link';
import { CrossFade } from '@/components/foundation/CrossFade';
import { Check, Copy, ArrowRight, ShieldCheck, Zap, SlidersHorizontal } from 'lucide-react';

interface Candidate {
  id: string;
  name: string;
  role: string;
  experience: string;
  score: number;
  status: 'Top Candidate' | 'Shortlisted' | 'Review Queue';
  skills: string[];
  rationale: string;
  vectors: { label: string; match: number }[];
}

const CANDIDATES: Candidate[] = [
  {
    id: 'cand-01',
    name: 'Aditya Verma',
    role: 'Senior Backend Engineer',
    experience: '5 yrs exp',
    score: 96,
    status: 'Top Candidate',
    skills: ['Python', 'FastAPI', 'PostgreSQL', 'Distributed Systems', 'vLLM'],
    rationale:
      'Verified 5+ yrs high-concurrency API engineering. Exact match on distributed queue orchestration, async database connection pooling, and low-latency inference wrappers.',
    vectors: [
      { label: 'Distributed Architecture', match: 98 },
      { label: 'Async Python / FastAPI', match: 96 },
      { label: 'Relational DB Optimization', match: 94 },
    ],
  },
  {
    id: 'cand-02',
    name: 'Neha Kulkarni',
    role: 'Full Stack Engineer',
    experience: '3 yrs exp',
    score: 84,
    status: 'Shortlisted',
    skills: ['React 19', 'Next.js 15', 'TypeScript', 'GraphQL', 'Tailwind'],
    rationale:
      'Strong React & Next.js full-stack foundation. Meets core frontend architecture standards with solid server component patterns and API contracts.',
    vectors: [
      { label: 'Frontend Component Design', match: 92 },
      { label: 'Next.js App Router', match: 88 },
      { label: 'API Integration', match: 80 },
    ],
  },
  {
    id: 'cand-03',
    name: 'Rohit Sen',
    role: 'Frontend Engineer',
    experience: '2 yrs exp',
    score: 71,
    status: 'Review Queue',
    skills: ['TypeScript', 'Tailwind CSS', 'REST APIs', 'Figma'],
    rationale:
      'Good UI design execution and TypeScript typing. Meets baseline UI standards, recommended for secondary technical architecture interview.',
    vectors: [
      { label: 'UI Precision & Styling', match: 85 },
      { label: 'TypeScript Interfaces', match: 74 },
      { label: 'Backend Contracts', match: 62 },
    ],
  },
];

const JSON_SAMPLE = {
  batch_id: 'norai_batch_104_prod',
  status: 'SUCCESS',
  latency_ms: 238,
  engine: 'Deterministic Neural Parser v2.4',
  data_residency: 'EPHEMERAL_RAM_FLUSHED',
  candidates_evaluated: 58,
  top_match: {
    name: 'Aditya Verma',
    composite_score: 0.962,
    threshold_passed: true,
    recommendation: 'FAST_TRACK_TECHNICAL_ROUND',
    extracted_vectors: {
      distributed_systems: 0.98,
      fastapi_async: 0.96,
      sql_optimization: 0.94,
    },
  },
};

const DEFAULT_CANDIDATE: Candidate = CANDIDATES[0] ?? {
  id: 'cand-01',
  name: 'Aditya Verma',
  role: 'Senior Backend Engineer',
  experience: '5 yrs exp',
  score: 96,
  status: 'Top Candidate',
  skills: ['Python', 'FastAPI', 'PostgreSQL', 'Distributed Systems', 'vLLM'],
  rationale:
    'Verified 5+ yrs high-concurrency API engineering. Exact match on distributed queue orchestration, async database connection pooling, and low-latency inference wrappers.',
  vectors: [
    { label: 'Distributed Architecture', match: 98 },
    { label: 'Async Python / FastAPI', match: 96 },
    { label: 'Relational DB Optimization', match: 94 },
  ],
};

export function CandidateScreenerWorkbench() {
  const [activeTab, setActiveTab] = useState<'scorecard' | 'vectors' | 'json'>('scorecard');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate>(DEFAULT_CANDIDATE);
  const [copied, setCopied] = useState(false);
  const [liveAnnouncement, setLiveAnnouncement] = useState('');

  const handleSelectCandidate = (cand: Candidate) => {
    setSelectedCandidate(cand);
    setLiveAnnouncement(`Selected candidate ${cand.name}, ${cand.score}% match, status: ${cand.status}.`);
  };

  const handleTabChange = (tab: 'scorecard' | 'vectors' | 'json') => {
    setActiveTab(tab);
    const tabLabel = tab === 'scorecard' ? 'Scorecard' : tab === 'vectors' ? 'Skill Vectors' : 'JSON Contract';
    setLiveAnnouncement(`Switched to ${tabLabel} view.`);
  };

  const handleCopyJson = () => {
    navigator.clipboard?.writeText(JSON.stringify(JSON_SAMPLE, null, 2));
    setCopied(true);
    setLiveAnnouncement('JSON schema payload copied to clipboard.');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-full group">
      {/* Stable live region for screen readers */}
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {liveAnnouncement}
      </div>

      {/* Ambient diffuse glow behind the workbench to make it float off parchment canvas */}
      <div
        className="absolute -inset-1.5 rounded-3xl bg-gradient-to-b from-accent-500/15 via-accent-500/5 to-transparent blur-xl -z-10 pointer-events-none opacity-80 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden="true"
      />

      <div className="w-full rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] shadow-xl overflow-hidden text-left font-sans transition-all">
        {/* Titlebar / macOS-style Hardware Window Chrome */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-5 py-3 bg-canvas-recessed/70 border-b border-[rgba(13,37,61,0.08)]">
          <div className="flex items-center gap-3">
            {/* Window Traffic Lights */}
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="w-2.5 h-2.5 rounded-full bg-accent-500/80 border border-accent-600/40 shadow-xs" />
              <span className="w-2.5 h-2.5 rounded-full bg-gold-500/80 border border-gold-600/40 shadow-xs" />
              <span className="w-2.5 h-2.5 rounded-full bg-sage-500/80 border border-sage-600/40 shadow-xs" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-semibold text-ink-primary tracking-tight">
                Live Screener
              </span>
              <span className="text-[11px] font-mono text-ink-secondary hidden sm:inline">
                · Batch #104 (58 Evaluated)
              </span>
            </div>
          </div>

          {/* Tab Switcher with 5-State Ergonomics & Tablist Roles */}
          <div role="tablist" aria-label="Candidate Screener Views" className="flex items-center rounded-lg bg-canvas-paper/90 p-0.5 border border-[rgba(13,37,61,0.08)] text-xs">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'scorecard'}
              onClick={() => handleTabChange('scorecard')}
              className={cn(
                'px-2.5 py-1 rounded-md font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-1',
                activeTab === 'scorecard'
                  ? 'bg-navy-900 text-white shadow-xs'
                  : 'text-ink-secondary hover:text-ink-primary hover:bg-canvas-recessed/50'
              )}
            >
              Scorecard
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'vectors'}
              onClick={() => handleTabChange('vectors')}
              className={cn(
                'px-2.5 py-1 rounded-md font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-1',
                activeTab === 'vectors'
                  ? 'bg-navy-900 text-white shadow-xs'
                  : 'text-ink-secondary hover:text-ink-primary hover:bg-canvas-recessed/50'
              )}
            >
              Skill Vectors
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'json'}
              onClick={() => handleTabChange('json')}
              className={cn(
                'px-2.5 py-1 rounded-md font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-1',
                activeTab === 'json'
                  ? 'bg-navy-900 text-white shadow-xs'
                  : 'text-ink-secondary hover:text-ink-primary hover:bg-canvas-recessed/50'
              )}
            >
              JSON Contract
            </button>
          </div>
        </div>

        {/* Main Workbench Body with Smooth CrossFade */}
        <CrossFade activeKey={activeTab}>
          {/* Scorecard Tab */}
          {activeTab === 'scorecard' && (
            <div className="p-4 sm:p-5 md:p-6 space-y-4" role="tabpanel" aria-label="Candidate Scorecard">
              {/* Candidate Interactive Rows */}
              <div className="space-y-2.5" role="listbox" aria-label="Screened candidates list">
                {CANDIDATES.map((cand) => {
                  const isSelected = selectedCandidate.id === cand.id;
                  return (
                    <button
                      key={cand.id}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => handleSelectCandidate(cand)}
                      className={cn(
                        'w-full text-left p-3.5 rounded-xl border transition-all duration-150 flex items-center justify-between gap-3 sm:gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2',
                        isSelected
                          ? 'bg-canvas-paper border-accent-500/80 shadow-md ring-1 ring-accent-500/20 translate-y-[-1px]'
                          : 'bg-canvas-recessed/30 border-[rgba(13,37,61,0.06)] hover:bg-canvas-recessed/60 hover:border-accent-500/30'
                      )}
                    >
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-display text-base font-normal text-ink-primary">
                            {cand.name}
                          </span>
                          <span className="font-mono tabular-nums text-xs font-semibold px-2 py-0.5 rounded bg-accent-50 text-accent-500 border border-accent-500/20">
                            {cand.score}% Match
                          </span>
                        </div>
                        <p className="text-xs text-ink-secondary">
                          {cand.role} · <span className="font-mono tabular-nums">{cand.experience}</span>
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <span
                          className={cn(
                            'text-xs font-medium px-2 py-0.5 rounded-full inline-block',
                            cand.status === 'Top Candidate'
                              ? 'bg-sage-100/70 text-accent-secondary font-semibold'
                              : cand.status === 'Shortlisted'
                              ? 'bg-accent-50 text-accent-500'
                              : 'bg-canvas-recessed text-ink-secondary'
                          )}
                        >
                          {cand.status}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Selected Candidate Rationale Drawer */}
              <div className="rounded-xl bg-canvas-recessed/50 border border-[rgba(13,37,61,0.08)] p-4 space-y-3">
                <div className="flex items-center justify-between text-xs text-ink-secondary flex-wrap gap-2">
                  <div className="flex items-center gap-1.5 font-mono font-medium text-ink-primary">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-accent-500" />
                    <span>Deterministic Scoring Rationale</span>
                  </div>
                  <div className="flex items-center gap-1 text-accent-secondary font-mono text-[11px]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>RAM Flushed on Exit</span>
                  </div>
                </div>
                <p className="text-xs text-ink-body leading-relaxed">
                  {selectedCandidate.rationale}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedCandidate.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-canvas-paper text-[11px] font-medium text-ink-primary border border-[rgba(13,37,61,0.08)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Skill Vectors Tab */}
          {activeTab === 'vectors' && (
            <div className="p-4 sm:p-5 md:p-6 space-y-5" role="tabpanel" aria-label="Skill Vector Alignment">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-display text-lg text-ink-primary font-normal">
                    Skill Vector Alignment
                  </h4>
                  <span className="font-mono text-xs text-accent-500 font-semibold">
                    {selectedCandidate.name}
                  </span>
                </div>
                <p className="text-xs text-ink-secondary">
                  Extracted weights parsed against target backend engineering requirements.
                </p>
              </div>

              <div className="space-y-4">
                {selectedCandidate.vectors.map((vec, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-sans">
                      <span className="font-medium text-ink-primary">{vec.label}</span>
                      <span className="font-mono tabular-nums font-semibold text-accent-500">
                        {vec.match}%
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-canvas-recessed overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-accent-400 to-accent-500 rounded-full transition-all duration-300"
                        style={{ width: `${vec.match}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* JSON Schema Tab */}
          {activeTab === 'json' && (
            <div className="p-4 sm:p-5 relative bg-navy-900 text-canvas-paper" role="tabpanel" aria-label="JSON Contract Payload">
              <div className="flex justify-between items-center pb-2 mb-2 border-b border-white/10 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] text-emerald-400">POST /api/v1/shortlist/batch-104</span>
                  <span className="font-mono tabular-nums text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-slate-300">
                    238ms
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyJson}
                  aria-label="Copy JSON schema payload"
                  className="inline-flex items-center gap-1 px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all text-xs font-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-accent-secondary" />
                      <span className="text-accent-secondary">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Payload</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="font-mono text-xs text-emerald-300/90 overflow-x-auto p-2 leading-relaxed max-h-60">
                {JSON.stringify(JSON_SAMPLE, null, 2)}
              </pre>
            </div>
          )}
        </CrossFade>

        {/* Footer Telemetry Strip */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-3 bg-canvas-recessed/40 border-t border-[rgba(13,37,61,0.06)] text-xs">
          <div className="flex items-center gap-2 text-ink-secondary">
            <Zap className="w-3.5 h-3.5 text-accent-500" />
            <span>
              Parsed in <span className="font-mono tabular-nums font-semibold text-ink-primary">&lt; 0.35s</span> / PDF
            </span>
          </div>
          <Link
            href="/products/resume-shortlister"
            className="font-medium text-accent-500 hover:text-accent-600 inline-flex items-center gap-1 group"
          >
            <span>Open Full Tool</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

