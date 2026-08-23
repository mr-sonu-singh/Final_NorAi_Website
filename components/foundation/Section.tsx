import React from 'react';
import { cn } from '@/lib/utils';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'sunken' | 'dark';
}

export function Section({ variant = 'default', className, children, ...props }: SectionProps) {
  const variantClasses = {
    default: 'bg-transparent text-primary-800',
    sunken: 'bg-canvas-recessed text-primary-800',
    dark: 'bg-navy-900 text-canvas-paper',
  };

  return (
    <section
      className={cn('py-12 sm:py-16 lg:py-20', variantClasses[variant], className)}
      {...props}
    >
      {children}
    </section>
  );
}
