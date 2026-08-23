import React from 'react';
import { cn } from '@/lib/utils';
import { Icon } from '../Icon';
import { StatusDot } from '../StatusDot';
import { BadgeProps, BadgeVariant, BadgeSize } from './Badge.types';

const variantClasses: Record<BadgeVariant, string> = {
  neutral: 'bg-canvas-recessed text-ink-secondary',
  accent: 'bg-terra-100 text-terra-700',
  success: 'bg-success-100 text-success-600',
  warning: 'bg-warning-100 text-warning-600',
  error: 'bg-error-100 text-error-600',
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-[12px] rounded-full gap-1',
  md: 'px-2.5 py-1 text-[13px] rounded-full gap-1.5',
};

export function Badge({
  variant = 'neutral',
  size = 'md',
  leadingIcon,
  showStatusDot = false,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-sans font-medium select-none',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {showStatusDot && <StatusDot status={variant} size={size} />}
      {leadingIcon && <Icon name={leadingIcon} size={size === 'sm' ? 'xs' : 'sm'} />}
      <span>{children}</span>
    </span>
  );
}
