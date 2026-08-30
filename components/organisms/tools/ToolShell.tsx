'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/atoms/Button';
import {
  Sparkles,
  Key,
  ShieldCheck,
  Zap,
  RotateCcw,
  SlidersHorizontal,
} from 'lucide-react';
import { TelemetryMetrics, ByokSettings } from '@/lib/tools/types';

interface ToolShellProps {
  toolId: string;
  toolName: string;
  category: string;
  isProcessing: boolean;
  telemetry?: TelemetryMetrics;
  byokSettings: ByokSettings;
  onOpenByokModal: () => void;
  onReset: () => void;
  onRun: () => void;
  children: React.ReactNode;
  activePresetTitle?: string;
  isPresetMode?: boolean;
}

export function ToolShell({
  toolName,
  category,
  isProcessing,
  telemetry,
  byokSettings,
  onOpenByokModal,
  onReset,
  onRun,
  children,
  activePresetTitle,
  isPresetMode,
}: ToolShellProps) {
  const hasCustomKey = Boolean(byokSettings.apiKey);

  return (
    <div className="w-full rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] shadow-xl overflow-hidden text-left font-sans transition-all">
      {/* Titlebar / Command Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 bg-canvas-recessed/80 border-b border-[rgba(13,37,61,0.08)]">
        {/* Left: Window Dots & Tool Identity */}
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C2553A]/40 border border-[#C2553A]/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#0D253D]/20 border border-[#0D253D]/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#2D6A4F]/30 border border-[#2D6A4F]/50" />
          </div>

          <div className="h-4 w-px bg-[rgba(13,37,61,0.12)] mx-1" />

          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold text-ink-primary">
              {toolName}
            </span>
            <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-accent-50 text-accent-500 font-semibold border border-accent-500/20">
              {category}
            </span>
            {activePresetTitle && (
              <span className="hidden md:inline font-mono text-[10px] text-ink-secondary">
                ({activePresetTitle})
              </span>
            )}
          </div>
        </div>

        {/* Right: Runtime Status & Key Manager */}
        <div className="flex items-center gap-2.5 text-xs">
          {/* Active Mode Badge */}
          {hasCustomKey ? (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-500/30 text-[11px] font-mono font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              <span>BYOK: {byokSettings.preferredModel}</span>
            </div>
          ) : isPresetMode ? (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-accent-50 text-accent-600 border border-accent-500/20 text-[11px] font-mono font-medium">
              <Sparkles className="w-3 h-3 text-accent-500" />
              <span>Zero-Config Verified Mode</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-canvas-base text-ink-secondary border border-[rgba(13,37,61,0.1)] text-[11px] font-mono">
              <ShieldCheck className="w-3 h-3 text-accent-secondary" />
              <span>Serverless Edge Runtime</span>
            </div>
          )}

          {/* BYOK Settings Trigger */}
          <button
            type="button"
            onClick={onOpenByokModal}
            className={cn(
              'flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all border',
              hasCustomKey
                ? 'bg-canvas-base border-emerald-500/30 text-emerald-800 hover:bg-emerald-50/50'
                : 'bg-canvas-base border-[rgba(13,37,61,0.15)] text-ink-secondary hover:text-ink-primary hover:border-accent-500'
            )}
            title="Configure Custom Gemini API Key"
          >
            <Key className="w-3.5 h-3.5 text-accent-500" />
            <span>{hasCustomKey ? 'Key Configured' : 'API Key'}</span>
          </button>
        </div>
      </div>

      {/* Main Workbench Body */}
      <div className="w-full">{children}</div>

      {/* Footer Telemetry & Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 bg-canvas-recessed/60 border-t border-[rgba(13,37,61,0.08)] text-xs text-ink-secondary font-mono">
        {/* Left Telemetry Readouts */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-accent-secondary" />
            <span>
              Latency:{' '}
              <strong className="text-ink-primary font-bold">
                {telemetry ? `${telemetry.latencyMs}ms` : '< 350ms'}
              </strong>
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-ink-secondary" />
            <span>
              Tokens:{' '}
              <strong className="text-ink-primary font-bold">
                {telemetry ? telemetry.totalTokens.toLocaleString() : '0 tokens'}
              </strong>
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-emerald-700 font-medium">RAM Flushed Ephemeral</span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5 font-sans">
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            disabled={isProcessing}
            className="text-xs text-ink-secondary hover:text-ink-primary gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={onRun}
            disabled={isProcessing}
            className="gap-2 shadow-sm font-semibold text-xs"
          >
            {isProcessing ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Evaluating Candidates...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Run Evaluation</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
