'use client';

import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface KnobOption {
  id: string;
  label: string;
  shortLabel?: string;
  value: string | number;
}

interface KnobSwitchProps {
  options: KnobOption[];
  selectedIndex: number;
  onChange: (index: number) => void;
  label?: string;
  className?: string;
}

export function KnobSwitch({
  options,
  selectedIndex,
  onChange,
  label,
  className,
}: KnobSwitchProps) {
  const rotationAngle = (selectedIndex / Math.max(1, options.length - 1)) * 90 - 45;

  return (
    <div className={cn('inline-flex flex-col items-center gap-2 select-none', className)}>
      {label && (
        <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted font-semibold">
          {label}
        </span>
      )}
      <div className="flex items-center gap-3 bg-surface-panel-subtle/80 p-2 rounded-xl border border-border-subtle shadow-inner">
        {/* Physical Rotary Dial Graphic */}
        <button
          type="button"
          aria-label={`Cycle ${label || 'option'}`}
          onClick={() => onChange((selectedIndex + 1) % options.length)}
          className="relative w-11 h-11 rounded-full bg-surface-panel border border-border-strong shadow-md hover:border-accent-primary/50 transition-colors flex items-center justify-center cursor-pointer group focus:outline-none focus:ring-2 focus:ring-accent-primary"
        >
          {/* Knurled Outer Edge */}
          <div className="absolute inset-0.5 rounded-full border border-border-subtle knurled-texture opacity-40 group-hover:opacity-70 transition-opacity" />
          
          {/* Center Indicator Notch */}
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-accent-primary shadow-sm"
            animate={{ rotate: rotationAngle }}
            transition={{ type: 'spring', stiffness: 450, damping: 25 }}
            style={{ originY: 2.2 }}
          />
        </button>

        {/* Stepped Pill Labels */}
        <div className="flex items-center gap-1">
          {options.map((option, idx) => {
            const isActive = idx === selectedIndex;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => onChange(idx)}
                className={cn(
                  'px-2 py-1 rounded-md text-xs font-mono transition-all cursor-pointer',
                  isActive
                    ? 'bg-accent-primary text-white font-semibold shadow-sm'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                )}
              >
                {option.shortLabel || option.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
