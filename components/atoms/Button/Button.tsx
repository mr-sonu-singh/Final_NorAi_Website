'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Icon } from '../Icon';
import { Spinner } from '../Spinner';
import { ButtonProps, ButtonVariant, ButtonSize } from './Button.types';

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-terra-500 text-white shadow-accent hover:bg-terra-600 hover:-translate-y-px active:translate-y-0 active:scale-[0.98] font-semibold',
  secondary:
    'bg-transparent border border-line-strong text-ink-primary shadow-sm font-medium hover:border-line-accent hover:text-terra-600 hover:bg-terra-50 active:scale-[0.98]',
  ghost: 'bg-transparent text-terra-600 font-medium hover:bg-terra-50 active:scale-[0.98]',
  dark: 'bg-terra-700 text-white shadow-md font-semibold hover:bg-terra-600 active:scale-[0.98]',
  danger: 'bg-error-600 text-white font-semibold hover:bg-error-600/90 active:scale-[0.98]',
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
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        (disabled || loading) &&
          'opacity-[var(--opacity-disabled)] pointer-events-none cursor-not-allowed transform-none',
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
