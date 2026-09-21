import React from 'react';
import { cn } from '@/lib/utils';

export interface MonogramAvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'w-9 h-9 text-[13px]',
  md: 'w-16 h-16 text-2xl',
  lg: 'w-24 h-24 text-4xl',
} as const;

/**
 * Serif-initials avatar on a terra-100 disc. Deliberately NOT a photo or
 * AI-generated face — people are represented by their own letters.
 */
export function MonogramAvatar({ name, size = 'md', className }: MonogramAvatarProps) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-flex shrink-0 select-none items-center justify-center rounded-full bg-terra-100 font-display text-terra-700',
        sizeClasses[size],
        className,
      )}
    >
      {initials}
    </span>
  );
}
