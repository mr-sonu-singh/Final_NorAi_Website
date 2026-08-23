'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { ProgressBarProps, ProgressBarSize } from './ProgressBar.types';

const sizeClasses: Record<ProgressBarSize, string> = {
  sm: 'h-1.5',
  md: 'h-2.5',
};

export function ProgressBar({
  value,
  max = 100,
  size = 'md',
  'aria-label': ariaLabel = 'Progress',
  className,
  ...props
}: ProgressBarProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={ariaLabel}
      className={cn(
        'w-full bg-canvas-recessed rounded-full overflow-hidden select-none',
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      <div
        style={{ transform: `scaleX(${percentage / 100})`, transformOrigin: 'left' }}
        className={cn(
          'h-full w-full bg-terra-500 rounded-full',
          !prefersReducedMotion &&
            'transition-transform duration-[var(--duration-normal)] ease-[var(--ease-smooth)]',
        )}
      />
    </div>
  );
}
