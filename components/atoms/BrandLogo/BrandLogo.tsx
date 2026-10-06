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
    px: 44,
    markClass: 'w-11 h-11',
    text: 'text-xl',
    gap: 'gap-2',
  },

  // HEADER
  md: {
    px: 60,
    markClass: 'w-[60px] h-[60px]',
    text: 'text-2xl',
    gap: 'gap-2.5',
  },

  // LARGE
  lg: {
    px: 68,
    markClass: 'w-[68px] h-[68px]',
    text: 'text-3xl',
    gap: 'gap-3',
  },

  // FOOTER
  footer: {
    px: 100,
    markClass: 'w-[100px] h-[100px]',
    text: 'text-4xl',
    gap: 'gap-4',
  },
};

export function BrandLogo({
  size = 'md',
  variant = 'full',
  className,
}: BrandLogoProps) {
  const { px, markClass, text, gap } = sizeMap[size];

  const isFooter = size === 'footer';

  const markElement = (
    <div
      className={cn(
        markClass,
        'relative shrink-0 select-none flex items-center justify-center'
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

  const textColor =
    variant === 'inverted'
      ? 'text-[var(--bone)]'
      : 'text-[var(--pine)]';

  return (
    <div
      className={cn(
        'inline-flex items-center',
        gap,
        className
      )}
    >
      {markElement}

      {/* Footer mein hamesha Nor AI show hoga */}
      {isFooter && (
        <span
          className={cn(
            'font-display font-extrabold tracking-tight leading-none whitespace-nowrap',
            textColor,
            text
          )}
        >
          Nor AI
        </span>
      )}
    </div>
  );
}

export default BrandLogo;