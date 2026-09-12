'use client';

import React, { useState } from 'react';
import { Check, ShieldCheck, ArrowUpRight, Sparkles } from 'lucide-react';

interface CandidateProfile {
  name: string;
  experience: string;
  role: string;
  score: number;
  chips: string[];
}

const SAMPLE_CANDIDATE: CandidateProfile = {
  name: 'Aditya V.',
  experience: '5 yrs experience',
  role: 'Senior Backend Engineer',
  score: 96,
  chips: [
    'Backend Architecture (Verified)',
    'Fast API Integration (Strong)',
    'Team Leadership (Demonstrated)',
  ],
};

export function VignetteResumeScore() {
  const [activeChip, setActiveChip] = useState<number | null>(null);
  const [isExported, setIsExported] = useState(false);

  // Circular gauge calculations
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (SAMPLE_CANDIDATE.score / 100) * circumference;

  return (
    <div className="w-full rounded-xl bg-[var(--forest)] border border-white/10 overflow-hidden shadow-2xl transition-all duration-200 hover:border-white/20 select-none">
      {/* Window Chrome Header */}
      <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-white/8 bg-[var(--pine)]/90 backdrop-blur-sm">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80" aria-hidden="true" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80" aria-hidden="true" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80" aria-hidden="true" />
          <span className="ml-2 font-mono text-[10px] uppercase tracking-wider text-white/70">
            APPLICANT REVIEW · SENIOR DEVELOPER
          </span>
        </div>
        <div className="flex items-center gap-1 text-[10px] font-mono text-[#2EFCC2]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2EFCC2] animate-pulse" aria-hidden="true" />
          <span>Sub-second Match</span>
        </div>
      </div>

      {/* Main Vignette Content */}
      <div className="p-4 sm:p-5 space-y-4">
        {/* Candidate Profile Header & Circular Match Gauge */}
        <div className="flex items-center justify-between gap-3 bg-white/[0.03] border border-white/8 p-3 rounded-lg">
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm sm:text-base text-white truncate">
                {SAMPLE_CANDIDATE.name}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/10 text-white/80">
                {SAMPLE_CANDIDATE.experience}
              </span>
            </div>
            <p className="text-xs text-white/70">{SAMPLE_CANDIDATE.role}</p>
          </div>

          {/* Saturated Circular Match Gauge */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <svg className="w-12 h-12 -rotate-90" viewBox="0 0 52 52" aria-hidden="true">
                <circle
                  cx="26"
                  cy="26"
                  r={radius}
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth="3.5"
                  fill="none"
                />
                <circle
                  cx="26"
                  cy="26"
                  r={radius}
                  stroke="#2EFCC2"
                  strokeWidth="3.5"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="none"
                  className="transition-[stroke-dashoffset] duration-700 ease-out"
                />
              </svg>
              <span className="absolute font-mono text-xs font-bold text-[#2EFCC2]">
                {SAMPLE_CANDIDATE.score}%
              </span>
            </div>
            <div className="hidden sm:block text-right">
              <span className="block font-mono text-[10px] uppercase text-white/60">Confidence</span>
              <span className="text-xs font-semibold text-[#2EFCC2]">High Fit</span>
            </div>
          </div>
        </div>

        {/* Why It Matched (Visual Chips) */}
        <div className="space-y-1.5">
          <span className="font-mono text-[10px] uppercase tracking-wider text-white/70">
            Key Qualifications Verified
          </span>
          <div className="flex flex-col gap-1.5">
            {SAMPLE_CANDIDATE.chips.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveChip(activeChip === idx ? null : idx)}
                className={`w-full flex items-center justify-between text-left px-2.5 py-1.5 rounded-md border text-xs font-sans transition-all duration-150 active:scale-[0.98] ${
                  activeChip === idx
                    ? 'bg-[#2EFCC2]/10 border-[#2EFCC2]/40 text-[#2EFCC2]'
                    : 'bg-white/[0.02] border-white/5 text-white/80 hover:border-white/15 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Check className="w-3.5 h-3.5 text-[#2EFCC2] shrink-0" />
                  <span className="truncate">{chip}</span>
                </div>
                <span className="font-mono text-[10px] text-white/60 ml-2 shrink-0">
                  {idx === 0 ? '100%' : idx === 1 ? '98%' : '94%'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Action & Decision Bar */}
        <div className="pt-1">
          <button
            type="button"
            onClick={() => setIsExported(true)}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg font-mono text-[11px] font-semibold uppercase tracking-wider bg-[#2EFCC2]/15 text-[#2EFCC2] border border-[#2EFCC2]/30 hover:bg-[#2EFCC2]/25 active:scale-[0.97] transition-all duration-150 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#2EFCC2]" />
            <span>
              {isExported ? 'EXPORTED TO ATS SYSTEM ✓' : 'RECOMMENDED FOR INTERVIEW · EXPORT TO ATS'}
            </span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
          </button>
        </div>

        {/* Plain-English Trust Note */}
        <div className="flex items-center justify-center gap-1.5 pt-1 text-[11px] text-white/70 border-t border-white/5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#2EFCC2]" />
          <span>🔒 Resumes deleted automatically after review. Zero data retention.</span>
        </div>
      </div>
    </div>
  );
}
