'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ShieldCheck, Globe, Zap } from 'lucide-react';

interface EdgeRegion {
  id: string;
  name: string;
  latencyMs: number;
  status: 'NOMINAL' | 'OPTIMAL';
}

const REGIONS: EdgeRegion[] = [
  { id: 'noida', name: 'DEL/Noida Edge', latencyMs: 18, status: 'OPTIMAL' },
  { id: 'mumbai', name: 'BOM/Mumbai Core', latencyMs: 24, status: 'NOMINAL' },
  { id: 'global', name: 'Global Anycast (vLLM)', latencyMs: 110, status: 'NOMINAL' },
];

export function TelemetryHeader({ className }: { className?: string }) {
  const [activeRegionIndex, setActiveRegionIndex] = useState(0);
  const activeRegion = REGIONS[activeRegionIndex] || {
    id: 'noida',
    name: 'DEL/Noida Edge',
    latencyMs: 18,
    status: 'OPTIMAL' as const,
  };

  return (
    <div
      className={cn(
        'bg-surface-panel-subtle/90 border-b border-border-subtle py-1.5 px-4 text-center',
        className,
      )}
    >
      <div className="flex items-center justify-center gap-3 text-[11px] font-mono text-text-secondary flex-wrap">
        {/* Live Status indicator */}
        <div className="flex items-center gap-1.5 text-accent-secondary font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-secondary animate-pulse" />
          <span>SYS: {activeRegion.status}</span>
        </div>

        <span className="text-text-muted/40" aria-hidden="true">
          |
        </span>

        {/* Region Selector Pill */}
        <div className="flex items-center gap-1">
          <Globe className="w-3 h-3 text-accent-primary" />
          <button
            type="button"
            onClick={() => setActiveRegionIndex((prev) => (prev + 1) % REGIONS.length)}
            className="hover:text-text-primary underline decoration-dotted underline-offset-2 transition-colors cursor-pointer"
            title="Click to cycle edge region benchmark"
          >
            {activeRegion.name}:{' '}
            <span className="font-semibold text-text-primary">{activeRegion.latencyMs}ms</span>
          </button>
        </div>

        <span className="text-text-muted/40" aria-hidden="true">
          |
        </span>

        <span className="flex items-center gap-1">
          <Zap className="w-3 h-3 text-accent-primary" />
          <span>P95 SLA &lt; 320ms</span>
        </span>

        <span className="text-text-muted/40" aria-hidden="true">
          |
        </span>

        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-accent-secondary" />
          <span>ZERO-EGRESS EPHEMERAL RAM</span>
        </span>

        <span className="text-text-muted/40" aria-hidden="true">
          |
        </span>

        <span className="text-accent-primary font-semibold">100% DETERMINISTIC JSON</span>
      </div>
    </div>
  );
}
