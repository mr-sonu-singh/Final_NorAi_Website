'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'footer';
  variant?: 'mark' | 'full' | 'inverted';
  className?: string;
}

const sizeMap = {
  sm: {
    px: 28,
    markClass: 'w-7 h-7',
    text: 'text-xl',
    gap: 'gap-2',
  },
  md: {
    px: 32,
    markClass: 'w-8 h-8',
    text: 'text-2xl',
    gap: 'gap-2.5',
  },
  lg: {
    px: 40,
    markClass: 'w-10 h-10',
    text: 'text-3xl',
    gap: 'gap-3',
  },
  footer: {
    px: 100,
    markClass: 'w-[100px] h-[100px]',
    text: 'text-4xl',
    gap: 'gap-4',
  },
};

/**
 * Official NorAI Brand Logo incorporating the circular Royal Blue & Violet Ai Monogram.
 */
export function BrandLogo({ size = 'md', variant = 'full', className }: BrandLogoProps) {
  const { px, markClass, text, gap } = sizeMap[size];

  const markElement = (
    <div
      className={cn(
        markClass,
        'relative shrink-0 rounded-full overflow-hidden select-none shadow-sm flex items-center justify-center ring-1 ring-white/15',
      )}
    >
      <Image
        src="/norai-logo.png"
        alt="NorAI Monogram"
        width={px}
        height={px}
        priority
        className="w-full h-full object-contain"
      />
    </div>
  );

  if (variant === 'mark') {
    return <span className={cn('inline-flex items-center', className)}>{markElement}</span>;
  }

  const textColor = variant === 'inverted' ? 'text-[var(--bone)]' : 'text-[var(--pine)]';

  return (
    <div className={cn('inline-flex items-center', gap, className)}>
      {markElement}
      <span
        className={cn(
          'font-display font-extrabold tracking-tight leading-none',
          textColor,
          text,
        )}
      >
        NorAI
      </span>
    </div>
  );
}

export default BrandLogo;
