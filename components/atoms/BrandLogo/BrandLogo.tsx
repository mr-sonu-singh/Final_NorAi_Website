'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'mark' | 'full' | 'inverted';
  className?: string;
}

const sizeMap = {
  sm: {
    px: 44,
    markClass: 'w-11 h-11',
    text: 'text-xl',
    gap: 'gap-2',
  },
  md: {
    px: 60,
    markClass: 'w-15 h-15',
    text: 'text-2xl',
    gap: 'gap-2.5',
  },
  lg: {
    px: 68,
    markClass: 'w-[68px] h-[68px]',
    text: 'text-3xl',
    gap: 'gap-3',
  },
};

/**
 * Official NorAI Brand Logo.
 */
export function BrandLogo({
  size = 'md',
  variant = 'full',
  className,
}: BrandLogoProps) {
  const { px, markClass, text, gap } = sizeMap[size];

  const markElement = (
    <div
      className={cn(
        markClass,
        'relative shrink-0 select-none flex items-center justify-center',
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
    return (
      <span className={cn('inline-flex items-center', className)}>
        {markElement}
      </span>
    );
  }

  const textColor =
    variant === 'inverted'
      ? 'text-[var(--bone)]'
      : 'text-[var(--pine)]';

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
      </span>
    </div>
  );
}

export default BrandLogo;