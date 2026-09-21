import React from 'react';
import { cn } from '@/lib/utils';
import { DividerProps } from './Divider.types';

export function Divider({
  orientation = 'horizontal',
  decorative = true,
  className,
  ...props
}: DividerProps) {
  return (
    <div
      role={decorative ? undefined : 'separator'}
      aria-hidden={decorative ? 'true' : undefined}
      aria-orientation={decorative ? undefined : orientation}
      className={cn(
        'bg-line-subtle shrink-0',
        orientation === 'horizontal'
          ? 'w-full h-[var(--border-width-default)] my-4'
          : 'h-full w-[var(--border-width-default)] mx-4 inline-block',
        className,
      )}
      {...props}
    />
  );
}
