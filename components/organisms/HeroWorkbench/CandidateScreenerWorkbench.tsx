'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

import { Link } from '@/components/atoms/Link';
import { Check, Copy, ArrowRight } from 'lucide-react';


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
    skills: ['Python', 'FastAPI', 'PostgreSQL', 'Distributed Systems'],
    rationale:
      'Verified 5+ yrs high-concurrency API engineering. Exact match on distributed queue orchestration and async database pools.',
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
    skills: ['React 19', 'Next.js', 'Node.js', 'GraphQL'],
    rationale:
      'Strong React & Next.js full-stack foundation. Meets core frontend architecture requirements with solid backend tooling experience.',
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
    skills: ['TypeScript', 'Tailwind CSS', 'REST APIs'],
    rationale:
      'Good UI design execution and TypeScript typing. Meets baseline requirements, recommended for secondary technical interview round.',
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

export function CandidateScreenerWorkbench() {
  const [activeTab, setActiveTab] = useState<'scorecard' | 'vectors' | 'json'>('scorecard');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate>(CANDIDATES[0] || {
    id: 'cand-01',
    name: 'Aditya Verma',
    role: 'Senior Backend Engineer',
    experience: '5 yrs exp',
    score: 96,
    status: 'Top Candidate',
    skills: ['Python', 'FastAPI'],
    rationale: 'Verified 5+ yrs high-concurrency API engineering.',
    vectors: [{ label: 'Distributed Architecture', match: 98 }],
  });
  const [copied, setCopied] = useState(false);

  const handleCopyJson = () => {
    navigator.clipboard?.writeText(JSON.stringify(JSON_SAMPLE, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] shadow-xl overflow-hidden text-left font-sans transition-all">
      {/* Titlebar / Chrome */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 bg-canvas-recessed/70 border-b border-[rgba(13,37,61,0.08)]">
        <div className="flex items-center gap-2.5">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C2553A]/30 border border-[#C2553A]/50" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#B8860B]/30 border border-[#B8860B]/50" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#5B8A72]/30 border border-[#5B8A72]/50" />
          </div>
          <span className="font-mono text-xs font-semibold text-ink-primary tracking-tight">
            Batch #104 · 58 Resumes Screened
          </span>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center rounded-lg bg-canvas-paper/90 p-1 border border-[rgba(13,37,61,0.08)] text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('scorecard')}
            className={cn(
              'px-2.5 py-1 rounded-md font-medium transition-all duration-150',
              activeTab === 'scorecard'
                ? 'bg-[#0D253D] text-white shadow-sm'
                : 'text-ink-secondary hover:text-ink-primary'
            )}
          >
            Scorecard
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('vectors')}
            className={cn(
              'px-2.5 py-1 rounded-md font-medium transition-all duration-150',
              activeTab === 'vectors'
                ? 'bg-[#0D253D] text-white shadow-sm'
                : 'text-ink-secondary hover:text-ink-primary'
            )}
          >
            Skill Vectors
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('json')}
            className={cn(
              'px-2.5 py-1 rounded-md font-medium transition-all duration-150',
              activeTab === 'json'
                ? 'bg-[#0D253D] text-white shadow-sm'
                : 'text-ink-secondary hover:text-ink-primary'
            )}
          >
            JSON Schema
          </button>
        </div>
      </div>

      {/* Main Workbench Body */}
      {activeTab === 'scorecard' && (
        <div className="p-5 md:p-6 space-y-4">
          {/* Candidate Interactive Rows */}
          <div className="space-y-2.5">
            {CANDIDATES.map((cand) => {
              const isSelected = selectedCandidate.id === cand.id;
              return (
                <button
                  key={cand.id}
                  type="button"
                  onClick={() => setSelectedCandidate(cand)}
                  className={cn(
                    'w-full text-left p-3.5 rounded-xl border transition-all duration-150 flex items-center justify-between gap-4',
                    isSelected
                      ? 'bg-canvas-paper border-accent-500/80 shadow-md ring-1 ring-accent-500/20'
                      : 'bg-canvas-recessed/30 border-[rgba(13,37,61,0.06)] hover:bg-canvas-recessed/60'
                  )}
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-display text-base font-normal text-ink-primary">
                        {cand.name}
                      </span>
                      <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-accent-50 text-accent-500 border border-accent-500/20">
                        {cand.score}% Match
                      </span>
                    </div>
                    <p className="text-xs text-ink-secondary">
                      {cand.role} · {cand.experience}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-medium text-ink-secondary">
                      {cand.status}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Candidate Rationale Drawer */}
          <div className="rounded-xl bg-canvas-recessed/50 border border-[rgba(13,37,61,0.08)] p-4 space-y-3">
            <div className="flex items-center justify-between text-xs text-ink-secondary">
              <span className="font-mono font-medium">Deterministic Scoring Rationale</span>
              <span className="text-accent-secondary font-medium">Memory Ephemeral</span>
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

      {activeTab === 'vectors' && (
        <div className="p-5 md:p-6 space-y-5">
          <div className="space-y-1">
            <h4 className="font-display text-lg text-ink-primary font-normal">
              Candidate Skill Vector Alignment
            </h4>
            <p className="text-xs text-ink-secondary">
              Weights parsed against target job description criteria for {selectedCandidate.name}.
            </p>
          </div>

          <div className="space-y-4">
            {selectedCandidate.vectors.map((vec, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-sans">
                  <span className="font-medium text-ink-primary">{vec.label}</span>
                  <span className="font-mono font-semibold text-accent-500">{vec.match}%</span>
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

      {activeTab === 'json' && (
        <div className="p-4 md:p-5 relative bg-[#0D253D] text-[#FDFBF7]">
          <div className="flex justify-between items-center pb-2 mb-2 border-b border-[rgba(253,251,247,0.1)] text-xs text-slate-400">
            <span className="font-mono">POST /api/v1/shortlist/batch-104</span>
            <button
              type="button"
              onClick={handleCopyJson}
              className="inline-flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#5B8A72]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <pre className="font-mono text-xs text-emerald-300/90 overflow-x-auto p-2 leading-relaxed max-h-60">
            {JSON.stringify(JSON_SAMPLE, null, 2)}
          </pre>
        </div>
      )}

      {/* Footer Strip */}
      <div className="flex items-center justify-between px-5 py-3 bg-canvas-recessed/40 border-t border-[rgba(13,37,61,0.06)] text-xs">
        <span className="text-ink-secondary">
          142 resumes parsed in <span className="font-mono font-semibold text-ink-primary">8.4s</span>
        </span>
        <Link
          href="/products/resume-shortlister"
          className="font-medium text-accent-500 hover:text-accent-600 inline-flex items-center gap-1"
        >
          <span>Open Full Tool</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

      </div>
    </div>
  );
}
