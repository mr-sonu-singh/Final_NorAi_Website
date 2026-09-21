'use client';

import React from 'react';
import { Link } from '@/components/atoms/Link';
import { VisuallyHidden } from '@/components/foundation/VisuallyHidden';
import { BrandLogo } from '@/components/atoms/BrandLogo';
import { cn } from '@/lib/utils';
import { LogoProps, LogoSize } from './Logo.types';

const sizeMapping: Record<LogoSize, 'sm' | 'md' | 'lg'> = {
  S: 'sm',
  M: 'md',
  L: 'lg',
};

export function Logo({
  variant = 'full',
  size = 'M',
  href = '/',
  'aria-label': ariaLabel = 'NorAI, home',
  className,
  ...props
}: LogoProps) {
  const brandSize = sizeMapping[size] || 'md';

  return (
    <Link
      href={href}
      variant="unstyled"
      aria-label={ariaLabel}
      className={cn(
        'inline-flex items-center hover:opacity-90 transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 rounded-sm',
        className,
      )}
      data-testid="logo-molecule"
      {...props}
    >
      {variant === 'full' && <BrandLogo size={brandSize} variant="full" />}
      {variant === 'symbol' && (
        <>
          <BrandLogo size={brandSize} variant="mark" />
          <VisuallyHidden>NorAI</VisuallyHidden>
        </>
      )}
      {variant === 'wordmark' && (
        <span className="font-display text-2xl font-normal tracking-tight text-ink-primary">
          NorAI
        </span>
      )}
    </Link>
  );
}
