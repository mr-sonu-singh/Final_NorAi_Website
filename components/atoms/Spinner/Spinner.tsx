'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { SpinnerProps, SpinnerSize } from './Spinner.types';

const sizeMap: Record<SpinnerSize, string> = {
  sm: 'w-4 h-4 border-2',
  md: 'w-5 h-5 border-2',
  lg: 'w-8 h-8 border-3',
};

export function Spinner({
  size = 'md',
  'aria-label': ariaLabel = 'Loading',
  className,
  ...props
}: SpinnerProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <span
      role="status"
      aria-live="polite"
      aria-label={ariaLabel}
      className={cn(
        'inline-block rounded-full border-current border-t-transparent',
        sizeMap[size],
        !prefersReducedMotion && 'animate-spin',
        className,
      )}
      {...props}
    >
      <span className="sr-only">{ariaLabel}</span>
    </span>
  );
}
