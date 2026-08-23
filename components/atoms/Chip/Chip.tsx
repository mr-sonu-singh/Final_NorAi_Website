'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { FocusRing } from '../FocusRing';
import { Icon } from '../Icon';
import { BadgeSize } from '../Badge/Badge.types';
import { ChipProps } from './Chip.types';

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'h-7 px-2.5 text-body-xs rounded-full gap-1 min-w-[44px]',
  md: 'h-9 px-3.5 text-body-sm rounded-full gap-1.5 min-w-[44px]',
};

export function Chip({
  selected = false,
  disabled = false,
  variant = 'neutral',
  size = 'md',
  leadingIcon,
  removable = false,
  className,
  children,
  onSelect,
  onClick,
  ...props
}: ChipProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    onSelect?.();
    onClick?.(e);
  };

  const chipElement = (
    <button
      type="button"
      disabled={disabled}
      aria-pressed={selected}
      aria-disabled={disabled}
      onClick={handleClick}
      className={cn(
        'inline-flex items-center justify-center font-sans font-medium transition-[transform,opacity,color,background-color,border-color,box-shadow] duration-200 ease-[var(--ease-smooth)] border rounded-full select-none cursor-pointer active:scale-[0.98]',
        sizeClasses[size],
        selected
          ? 'bg-terra-500 border-terra-500 text-white shadow-accent'
          : variant === 'accent'
            ? 'bg-terra-50 border-line-accent text-terra-700 hover:bg-terra-100'
            : 'bg-canvas-recessed border-line-subtle text-ink-body hover:border-line-strong',
        disabled &&
          'opacity-disabled bg-canvas-recessed border-line-subtle text-ink-secondary cursor-not-allowed',
        className,
      )}
      {...props}
    >
      {leadingIcon && <Icon name={leadingIcon} size={size === 'sm' ? 'xs' : 'sm'} />}
      <span>{children}</span>
      {removable && <Icon name="X" size="xs" className="ml-0.5" />}
    </button>
  );

  return <FocusRing>{chipElement}</FocusRing>;
}
