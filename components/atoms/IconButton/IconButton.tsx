'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Icon } from '../Icon';
import { Spinner } from '../Spinner';
import { ButtonVariant, ButtonSize } from '../Button/Button.types';
import { IconButtonProps } from './IconButton.types';

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--pine)] text-[var(--bone)] shadow-sm hover:bg-[var(--forest)] hover:-translate-y-px active:translate-y-0 active:scale-[0.98]',
  secondary:
    'bg-transparent border border-line-strong text-ink-primary shadow-xs hover:border-line-accent hover:text-[var(--mint-ink)] hover:bg-[rgba(6,132,90,0.06)] active:scale-[0.98]',
  ghost: 'bg-transparent text-ink-body hover:bg-[rgba(7,41,41,0.06)] hover:text-ink-primary active:scale-[0.98]',
  dark: 'bg-[var(--pine)] text-[var(--bone)] shadow-sm hover:bg-[var(--forest)] active:scale-[0.98]',
  danger: 'bg-error-600 text-white hover:bg-error-600/90 active:scale-[0.98]',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'w-9 h-9 min-w-[44px] min-h-[44px]',
  md: 'w-11 h-11 min-w-[44px] min-h-[44px]',
  lg: 'w-12 h-12 min-w-[44px] min-h-[44px]',
};

const iconSizeMap: Record<ButtonSize, 'sm' | 'md' | 'lg'> = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
};

export function IconButton({
  icon,
  'aria-label': ariaLabel,
  variant = 'ghost',
  size = 'md',
  shape = 'square',
  disabled = false,
  loading = false,
  className,
  onClick,
  ...props
}: IconButtonProps) {
  const isInteractive = !disabled && !loading;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isInteractive) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  return (
    <button
      type="button"
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      aria-busy={loading}
      aria-label={ariaLabel}
      onClick={handleClick}
      className={cn(
        'inline-flex items-center justify-center font-sans transition-[transform,opacity,color,background-color,border-color,box-shadow] duration-[var(--duration-fast)] ease-[var(--ease-smooth)] select-none',
        shape === 'round' ? 'rounded-full' : 'rounded-md',
        variantClasses[variant],
        sizeClasses[size],
        (disabled || loading) &&
          'opacity-[var(--opacity-disabled)] pointer-events-none cursor-not-allowed transform-none',
        className,
      )}
      {...props}
    >
      {loading ? (
        <Spinner size={iconSizeMap[size]} aria-label="Loading" />
      ) : (
        <Icon name={icon} size={iconSizeMap[size]} />
      )}
    </button>
  );
}
