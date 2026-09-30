'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/atoms/Button';
import {
  Key,
  ShieldCheck,
  Zap,
  RotateCcw,
  SlidersHorizontal,
  Layers,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { TelemetryMetrics, ByokSettings } from '@/lib/tools/types';

export interface ToolShellProps {
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
  runButtonLabel?: string;
  processingLabel?: string;
  // Optional progressive disclosure props
  hasResults?: boolean;
  isIngestionCollapsed?: boolean;
  onToggleIngestion?: () => void;
  className?: string;
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
  runButtonLabel = 'Run Evaluation',
  processingLabel = 'Executing Neural Pipeline...',
  hasResults,
  isIngestionCollapsed,
  onToggleIngestion,
  className,
}: ToolShellProps) {
  const hasCustomKey = Boolean(byokSettings.apiKey);

  return (
    <div
      className={cn(
        'w-full rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] shadow-sm text-left font-sans transition-all duration-200',
        className,
      )}
    >
      {/* =========================================================================
          1. FLOATING STUDIO COMMAND BAR (Linear / Raycast Studio Architecture)
          ========================================================================= */}
      <header className="flex flex-wrap items-center justify-between gap-3.5 px-5 sm:px-6 py-3.5 bg-canvas-paper border-b border-[rgba(13,37,61,0.08)] rounded-t-2xl">
        {/* Left: Studio Tool Identity & Active Preset */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="w-8 h-8 rounded-xl bg-canvas-recessed text-accent-500 border border-[rgba(13,37,61,0.08)] flex items-center justify-center shrink-0">
            <Layers className="w-4 h-4" />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-sans text-sm font-semibold text-ink-primary tracking-tight">
              {toolName}
            </span>
            <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-accent-50 text-accent-500 font-semibold border border-accent-500/20">
              {category}
            </span>
            {activePresetTitle && (
              <span className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[11px] text-ink-secondary bg-canvas-recessed/70 px-2.5 py-0.5 rounded-md border border-[rgba(13,37,61,0.06)]">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-secondary" />
                <span className="truncate max-w-[200px]">{activePresetTitle}</span>
              </span>
            )}
          </div>
        </div>

        {/* Right: Live Telemetry Dials, Status Pill & Key Manager */}
        <div className="flex items-center gap-2.5 text-xs flex-wrap">
          {/* Telemetry Dials in Header */}
          <div className="hidden lg:flex items-center gap-3 px-3 py-1 rounded-lg bg-canvas-recessed/60 border border-[rgba(13,37,61,0.06)] font-mono text-[11px]">
            <div className="flex items-center gap-1 text-ink-secondary">
              <Zap className="w-3 h-3 text-accent-secondary" />
              <span>Latency:</span>
              <strong className="text-ink-primary font-semibold tabular-nums">
                {telemetry ? `${telemetry.latencyMs}ms` : '< 350ms'}
              </strong>
            </div>

            <span className="text-[rgba(13,37,61,0.15)]">|</span>

            <div className="flex items-center gap-1 text-ink-secondary">
              <SlidersHorizontal className="w-3 h-3 text-ink-secondary" />
              <span>Tokens:</span>
              <strong className="text-ink-primary font-semibold tabular-nums">
                {telemetry ? telemetry.totalTokens.toLocaleString() : '0'}
              </strong>
            </div>
          </div>

          {/* Active Mode Status Badge */}
          {hasCustomKey ? (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-500/30 text-[11px] font-mono font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              <span className="hidden sm:inline">BYOK:</span>
              <span>{byokSettings.preferredModel}</span>
            </div>
          ) : isPresetMode ? (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-accent-50 text-accent-600 border border-accent-500/20 text-[11px] font-mono font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-accent-500" />
              <span className="hidden sm:inline">Zero-Config Verified</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-canvas-recessed text-ink-secondary border border-[rgba(13,37,61,0.08)] text-[11px] font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-accent-secondary" />
              <span className="hidden sm:inline">Serverless Edge Runtime</span>
            </div>
          )}

          {/* Optional Progressive Disclosure Intake Toggle */}
          {hasResults && onToggleIngestion && (
            <button
              type="button"
              onClick={onToggleIngestion}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-canvas-base border border-[rgba(13,37,61,0.15)] text-ink-primary text-[11px] font-medium hover:border-accent-500 active:scale-[0.97] transition-all"
            >
              {isIngestionCollapsed ? (
                <>
                  <ChevronDown className="w-3.5 h-3.5 text-accent-500" />
                  <span>Edit Inputs</span>
                </>
              ) : (
                <>
                  <ChevronUp className="w-3.5 h-3.5 text-ink-secondary" />
                  <span>Hide Inputs</span>
                </>
              )}
            </button>
          )}

          {/* BYOK Settings Trigger Button */}
          <button
            type="button"
            onClick={onOpenByokModal}
            className={cn(
              'flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all border outline-none cursor-pointer',
              'focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-page active:scale-[0.97]',
              hasCustomKey
                ? 'bg-canvas-paper border-emerald-500/30 text-emerald-800 hover:bg-emerald-50/50'
                : 'bg-canvas-paper border-[rgba(13,37,61,0.15)] text-ink-secondary hover:text-ink-primary hover:border-accent-500',
            )}
            title="Configure Custom Gemini API Key"
          >
            <Key className="w-3.5 h-3.5 text-accent-500" />
            <span>{hasCustomKey ? 'Key Active' : 'API Key'}</span>
          </button>
        </div>
      </header>

      {/* =========================================================================
          2. MAIN WORKBENCH BODY (Edge-to-Edge Studio Stage)
          ========================================================================= */}
      <main className="w-full">{children}</main>

      {/* =========================================================================
          3. FOOTER TELEMETRY & TACTILE ACTION BAR
          ========================================================================= */}
      <footer className="flex flex-wrap items-center justify-between gap-3 px-5 sm:px-6 py-3 bg-canvas-recessed/50 border-t border-[rgba(13,37,61,0.08)] text-xs text-ink-secondary font-mono rounded-b-2xl">
        {/* Left: Telemetry & Memory Guarantees */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-accent-secondary" />
            <span>
              Latency:{' '}
              <strong className="text-ink-primary font-bold tabular-nums">
                {telemetry ? `${telemetry.latencyMs}ms` : '< 350ms'}
              </strong>
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-ink-secondary" />
            <span>
              Tokens:{' '}
              <strong className="text-ink-primary font-bold tabular-nums">
                {telemetry ? telemetry.totalTokens.toLocaleString() : '0 tokens'}
              </strong>
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-300" />
            <span className="font-medium text-[11px]">
              Ephemeral RAM Flushed (0 Bytes Retained)
            </span>
          </div>
        </div>

        {/* Right: Tactile 5-State Action Buttons */}
        <div className="flex items-center gap-2.5 font-sans">
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            disabled={isProcessing}
            className="text-xs text-ink-secondary hover:text-ink-primary gap-1 active:scale-[0.97] transition-transform"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={onRun}
            disabled={isProcessing}
            className="gap-2 shadow-sm font-semibold text-xs active:scale-[0.97] transition-transform"
          >
            {isProcessing ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>{processingLabel}</span>
              </>
            ) : (
              <>
                <span>{runButtonLabel}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </Button>
        </div>
      </footer>
    </div>
  );
}
