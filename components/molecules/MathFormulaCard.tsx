'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { MathRenderer, MathText } from '@/components/atoms/MathRenderer';
import { Copy, Check, Code2, Sigma } from 'lucide-react';

interface MathFormulaCardProps {
  label: string;
  formulaOrSnippet: string;
  explanation: string;
  className?: string;
}

export function MathFormulaCard({
  label,
  formulaOrSnippet,
  explanation,
  className,
}: MathFormulaCardProps) {
  const [copied, setCopied] = useState(false);
  const [showRawCode, setShowRawCode] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(formulaOrSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        'p-4 rounded-xl bg-canvas-recessed/60 border border-[rgba(13,37,61,0.09)] space-y-2.5 transition-all',
        'hover:border-accent-500/30 hover:bg-canvas-recessed/80',
        className,
      )}
    >
      {/* Formula Header */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-md bg-accent-50 text-accent-500 flex items-center justify-center border border-accent-500/20 shrink-0">
            <Sigma className="w-3 h-3" />
          </div>
          <span className="font-sans text-xs font-semibold text-ink-primary">{label}</span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 text-[11px] font-mono">
          <button
            type="button"
            onClick={() => setShowRawCode(!showRawCode)}
            className={cn(
              'px-2 py-0.5 rounded text-[10px] font-medium transition-all flex items-center gap-1 border',
              showRawCode
                ? 'bg-[#0D253D] text-white border-[#0D253D]'
                : 'bg-canvas-paper text-ink-secondary hover:text-ink-primary border-[rgba(13,37,61,0.12)]',
            )}
            title="Toggle Raw LaTeX"
          >
            <Code2 className="w-3 h-3" />
            <span>{showRawCode ? 'Hide Code' : 'Raw LaTeX'}</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="p-1 px-1.5 rounded bg-canvas-paper hover:bg-canvas-base border border-[rgba(13,37,61,0.12)] text-ink-secondary hover:text-ink-primary transition-all flex items-center gap-1 active:scale-[0.97]"
            title="Copy LaTeX formula to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-600" />
                <span className="text-[10px] text-emerald-700 font-semibold">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 text-accent-500" />
                <span className="text-[10px]">Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Rendered KaTeX Formula Surface */}
      <div className="p-3 rounded-lg bg-canvas-paper border border-[rgba(13,37,61,0.1)] text-ink-primary text-center shadow-xs overflow-x-auto scrollbar-none">
        <MathRenderer math={formulaOrSnippet} displayMode={true} />
      </div>

      {/* Optional Raw LaTeX Snippet Block */}
      {showRawCode && (
        <div className="p-2.5 rounded-lg bg-[#0D253D] text-[#F9F6F0] font-mono text-[11px] leading-relaxed overflow-x-auto border border-[rgba(255,255,255,0.08)] select-all">
          <code>{formulaOrSnippet}</code>
        </div>
      )}

      {/* Conceptual Pedagogical Explanation */}
      <div className="text-[11px] text-ink-secondary leading-relaxed pt-0.5">
        <MathText text={explanation} />
      </div>
    </div>
  );
}
