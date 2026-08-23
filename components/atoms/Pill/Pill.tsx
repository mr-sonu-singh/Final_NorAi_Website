import React from 'react';
import { cn } from '@/lib/utils';
import { BadgeVariant, BadgeSize } from '../Badge/Badge.types';
import { PillProps } from './Pill.types';

const variantClasses: Record<BadgeVariant, string> = {
  neutral: 'bg-canvas-recessed text-ink-secondary',
  accent: 'bg-terra-100 text-terra-700',
  success: 'bg-success-100 text-success-600',
  warning: 'bg-warning-100 text-warning-600',
  error: 'bg-error-100 text-error-600',
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-[12px] rounded-full',
  md: 'px-3 py-1 text-[13px] rounded-full',
};

export function Pill({
  variant = 'neutral',
  size = 'md',
  className,
  children,
  ...props
}: PillProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center font-sans font-medium select-none',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
