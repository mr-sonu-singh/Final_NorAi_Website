'use client';

import React, { useState } from 'react';
import { Play, Pause, RotateCw, Sparkles, BookOpen, Volume2 } from 'lucide-react';
import { MathRenderer } from '@/components/atoms/MathRenderer';

export function VignetteCourseNotes() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="w-full rounded-xl bg-[#090C13] border border-white/10 overflow-hidden shadow-2xl transition-all duration-200 hover:border-white/20 select-none">
      {/* Window Chrome Header */}
      <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-white/8 bg-[#0B0E17]/90 backdrop-blur-sm">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80" aria-hidden="true" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80" aria-hidden="true" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80" aria-hidden="true" />
          <span className="ml-2 font-mono text-[10px] uppercase tracking-wider text-text-muted">
            LECTURE SYNTHESIS · PHYSICS 101
          </span>
        </div>
        <div className="flex items-center gap-1 text-[10px] font-mono text-[#D8B4FE]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D8B4FE] animate-pulse" aria-hidden="true" />
          <span>KaTeX + Audio NLP</span>
        </div>
      </div>

      {/* Main Vignette Content */}
      <div className="p-4 sm:p-5 space-y-3.5">
        {/* Lecture Audio Tracker */}
        <div className="flex items-center justify-between gap-3 bg-white/[0.03] border border-white/8 p-2.5 sm:p-3 rounded-lg">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? 'Pause sample lecture audio' : 'Play sample lecture audio'}
              className="w-8 h-8 rounded-full bg-[#D8B4FE]/15 border border-[#D8B4FE]/30 flex items-center justify-center text-[#D8B4FE] hover:bg-[#D8B4FE]/25 active:scale-[0.95] transition-all duration-150 cursor-pointer shrink-0"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
            </button>
            <div className="min-w-0 space-y-0.5">
              <p className="text-xs font-medium text-white truncate">
                Energy Conservation &amp; Heat Transfer
              </p>
              <div className="flex items-center gap-2 text-[10px] font-mono text-text-muted">
                <Volume2 className="w-3 h-3 text-[#D8B4FE]" />
                <span>08:42 / 54:20</span>
                <span>·</span>
                <span className="text-[#D8B4FE]">Slide 14 Matched</span>
              </div>
            </div>
          </div>

          {/* Animated Wave Bars */}
          <div className="flex items-center gap-0.5 h-5 shrink-0 px-2" aria-hidden="true">
            {[40, 75, 100, 60, 85, 45, 90, 50, 70, 30].map((height, i) => (
              <span
                key={i}
                style={{ height: `${height}%` }}
                className={`w-0.5 rounded-full transition-all duration-300 ${
                  isPlaying
                    ? 'bg-[#D8B4FE] animate-pulse'
                    : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Clean Summary Card */}
        <div className="p-2.5 rounded-lg bg-[#D8B4FE]/[0.06] border border-[#D8B4FE]/20">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#D8B4FE] shrink-0" />
            <span className="font-mono text-[10px] uppercase font-semibold text-[#D8B4FE]">
              Core Principle
            </span>
          </div>
          <p className="text-xs text-text-secondary mt-1">
            Energy cannot be created or destroyed, only transformed between internal energy, heat, and work.
          </p>
        </div>

        {/* Formatted Equation Card (KaTeX) */}
        <div className="p-3 rounded-lg bg-white/[0.02] border border-white/8 flex items-center justify-between gap-3">
          <div className="space-y-0.5">
            <span className="font-mono text-[10px] uppercase text-text-muted">
              First Law Formula
            </span>
            <div className="text-base text-white font-serif">
              <MathRenderer math="\Delta U = Q - W" displayMode={false} />
            </div>
          </div>
          <div className="text-[10px] font-mono text-text-muted text-right space-y-0.5">
            <div><span className="text-[#D8B4FE] font-bold">Q</span>: Heat added</div>
            <div><span className="text-white font-bold">W</span>: Work done</div>
          </div>
        </div>

        {/* Interactive Flashcard Simulator with 3D Flip */}
        <div className="perspective-1000">
          <div
            className={`relative min-h-[92px] w-full rounded-lg border transition-all duration-300 preserve-3d cursor-pointer ${
              isFlipped
                ? 'bg-[#D8B4FE]/10 border-[#D8B4FE]/40'
                : 'bg-white/[0.03] border-white/10 hover:border-white/20'
            }`}
            onClick={() => setIsFlipped(!isFlipped)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setIsFlipped(!isFlipped);
              }
            }}
            aria-label="Thermodynamics flashcard. Click or press space to flip and reveal answer."
          >
            {/* Front Side */}
            <div
              className={`p-3 space-y-2 backface-hidden transition-opacity duration-200 ${
                isFlipped ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase text-text-muted flex items-center gap-1.5">
                  <BookOpen className="w-3 h-3 text-[#D8B4FE]" />
                  Card 1 of 12 · Review Prompt
                </span>
                <span className="font-mono text-[10px] text-[#D8B4FE] flex items-center gap-1">
                  <RotateCw className="w-3 h-3" />
                  Tap to Flip
                </span>
              </div>
              <p className="text-xs font-medium text-white">
                What does <span className="font-serif italic text-[#D8B4FE]">Q</span> represent in the first law of thermodynamics?
              </p>
            </div>

            {/* Back Side (Answer) */}
            <div
              className={`absolute inset-0 p-3 space-y-2 transition-opacity duration-200 ${
                isFlipped ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase text-[#D8B4FE] font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#D8B4FE]" />
                  Answer Verified
                </span>
                <span className="font-mono text-[10px] text-text-muted flex items-center gap-1">
                  <RotateCw className="w-3 h-3" />
                  Flip Back
                </span>
              </div>
              <p className="text-xs font-semibold text-white">
                <span className="text-[#D8B4FE]">Q</span> represents the net heat energy added to the system from its surroundings.
              </p>
            </div>
          </div>
        </div>

        {/* Footnote */}
        <div className="flex items-center justify-between pt-1 text-[11px] font-mono text-text-muted border-t border-white/5">
          <span>LaTeX syntax preserved</span>
          <span className="text-[#D8B4FE]">Export to Anki / Markdown ✓</span>
        </div>
      </div>
    </div>
  );
}
