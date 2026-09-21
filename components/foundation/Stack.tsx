import React from 'react';
import { cn } from '@/lib/utils';

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'col';
  gap?: '1' | '2' | '3' | '4' | '6' | '8' | '12';
  align?: 'start' | 'center' | 'end' | 'baseline' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
}

export function Stack({
  direction = 'col',
  gap = '4',
  align,
  justify,
  className,
  children,
  ...props
}: StackProps) {
  const dirClasses = {
    row: 'flex-row',
    col: 'flex-col',
  };

  const gapClasses = {
    '1': 'gap-1',
    '2': 'gap-2',
    '3': 'gap-3',
    '4': 'gap-4',
    '6': 'gap-6',
    '8': 'gap-8',
    '12': 'gap-12',
  };

  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    baseline: 'items-baseline',
    stretch: 'items-stretch',
  };

  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
  };

  return (
    <div
      className={cn(
        'flex',
        dirClasses[direction],
        gapClasses[gap],
        align && alignClasses[align],
        justify && justifyClasses[justify],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
