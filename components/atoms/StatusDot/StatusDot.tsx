'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { StatusDotProps, StatusDotStatus, StatusDotSize } from './StatusDot.types';

const statusClasses: Record<StatusDotStatus, string> = {
  neutral: 'bg-ink-disabled',
  accent: 'bg-terra-500',
  success: 'bg-success-600',
  warning: 'bg-warning-600',
  error: 'bg-error-600',
};

const sizeClasses: Record<StatusDotSize, string> = {
  sm: 'w-1.5 h-1.5',
  md: 'w-2 h-2',
  lg: 'w-2.5 h-2.5',
};

export function StatusDot({
  status = 'neutral',
  size = 'md',
  pulse = false,
  'aria-label': ariaLabel,
  className,
  ...props
}: StatusDotProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <span className="relative inline-flex items-center justify-center">
      {pulse && !prefersReducedMotion && (
        <span
          className={cn(
            'absolute inline-flex rounded-full opacity-75 animate-ping',
            statusClasses[status],
            sizeClasses[size],
          )}
        />
      )}
      <span
        aria-label={ariaLabel}
        role={ariaLabel ? 'img' : undefined}
        aria-hidden={!ariaLabel}
        className={cn(
          'relative inline-block rounded-full shrink-0',
          statusClasses[status],
          sizeClasses[size],
          className,
        )}
        {...props}
      />
    </span>
  );
}
