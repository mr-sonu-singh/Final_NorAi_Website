import React from 'react';
import { cn } from '@/lib/utils';

export interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'mark' | 'full' | 'inverted';
  className?: string;
}

const sizeMap = {
  sm: {
    mark: 'w-7 h-7',
    text: 'text-xl',
    gap: 'gap-2',
  },
  md: {
    mark: 'w-8 h-8',
    text: 'text-2xl',
    gap: 'gap-2.5',
  },
  lg: {
    mark: 'w-10 h-10',
    text: 'text-3xl',
    gap: 'gap-3',
  },
};

/**
 * Clean, architectural NorAI brand mark matching the warm Stripe / New Yorker aesthetic.
 * Minimalist geometric lettermark 'N' on warm canvas paper or deep navy squircle.
 */
export function BrandLogo({ size = 'md', variant = 'full', className }: BrandLogoProps) {
  const { mark, text, gap } = sizeMap[size];
  const isInverted = variant === 'inverted';

  const markSvg = (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(mark, 'shrink-0 select-none')}
      aria-hidden="true"
    >
      {/* Refined squircle tile */}
      <rect width="32" height="32" rx="8" fill={isInverted ? '#FDFBF7' : '#0D253D'} />
      {/* Crisp geometric N lettermark */}
      <path
        d="M9 22.5V9.5L23 22.5V9.5"
        stroke={isInverted ? '#0D253D' : '#FDFBF7'}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Terracotta accent mark */}
      <circle cx="23" cy="9.5" r="2" fill="#C2553A" />
    </svg>
  );

  if (variant === 'mark') {
    return <span className={cn('inline-flex items-center', className)}>{markSvg}</span>;
  }

  return (
    <div className={cn('inline-flex items-center', gap, className)}>
      {markSvg}
      <span
        className={cn(
          'font-display font-normal tracking-tight leading-none',
          text,
          isInverted ? 'text-[#FDFBF7]' : 'text-ink-primary',
        )}
      >
        NorAI
      </span>
    </div>
  );
}
