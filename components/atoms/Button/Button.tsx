'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Icon } from '../Icon';
import { Spinner } from '../Spinner';
import { ButtonProps, ButtonVariant, ButtonSize } from './Button.types';

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-[var(--bg-dark)] text-[var(--bone)] shadow-none hover:bg-[var(--forest)] active:scale-[0.98] font-medium',
  secondary:
    'bg-surface-panel border border-border-strong text-text-primary shadow-none font-medium hover:border-border-highlight hover:bg-surface-hover active:scale-[0.98]',
  ghost: 'bg-transparent text-text-primary font-medium hover:bg-surface-hover active:scale-[0.98]',
  dark: 'bg-[var(--bg-dark)] text-[var(--bone)] shadow-none font-medium hover:bg-[var(--forest)] active:scale-[0.98]',
  danger: 'bg-error-600 text-white font-medium hover:bg-error-600/90 active:scale-[0.98]',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-9 px-3 min-w-[44px] text-xs font-medium rounded-md gap-1.5',
  md: 'h-11 px-4 min-w-[44px] text-sm font-medium rounded-md gap-2',
  lg: 'h-12 px-6 min-w-[44px] text-base font-semibold rounded-md gap-2.5',
};

const iconSizeMap: Record<ButtonSize, 'sm' | 'md' | 'lg'> = {
  sm: 'sm',
  md: 'md',
  lg: 'md',
};

export function Button({
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  loading = false,
  fullWidth = false,
  leadingIcon,
  trailingIcon,
  className,
  children,
  onClick,
  'aria-label': ariaLabel,
  ...props
}: ButtonProps) {
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
      type={type}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      aria-busy={loading}
      aria-label={ariaLabel}
      onClick={handleClick}
      className={cn(
        'inline-flex items-center justify-center font-sans transition-[transform,opacity,color,background-color,border-color,box-shadow] duration-[var(--duration-fast)] ease-[var(--ease-smooth)] select-none',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--mint-ink)] focus-visible:ring-offset-canvas-paper',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        (disabled || loading) &&
          'opacity-40 pointer-events-none cursor-not-allowed transform-none shadow-none',
        className,
      )}
      {...props}
    >
      {loading ? (
        <Spinner size={iconSizeMap[size]} aria-label="Loading" />
      ) : (
        <>
          {leadingIcon && <Icon name={leadingIcon} size={iconSizeMap[size]} />}
          {children && <span>{children}</span>}
          {trailingIcon && <Icon name={trailingIcon} size={iconSizeMap[size]} />}
        </>
      )}
    </button>
  );
}
