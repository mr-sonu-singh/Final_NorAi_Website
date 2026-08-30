import React from 'react';
import { cn } from '@/lib/utils';

export type HeadingVariant =
  | 'display-xl'
  | 'display-lg'
  | 'display-md'
  | 'heading-xl'
  | 'heading-lg'
  | 'heading-md'
  | 'heading-sm'
  | 'heading-xs';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  variant?: HeadingVariant;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export function Heading({
  variant = 'heading-lg',
  as: Component = 'h2',
  className,
  children,
  ...props
}: HeadingProps) {
  const isDisplay = variant === 'display-xl' || variant === 'display-lg' || variant === 'display-md';

  const variantClasses: Record<HeadingVariant, string> = {
    'display-xl':
      'font-display text-[length:var(--text-display-xl-size)] leading-[var(--text-display-xl-line)] font-[var(--text-display-xl-weight)] tracking-[var(--text-display-xl-tracking)]',
    'display-lg':
      'font-display text-[length:var(--text-display-lg-size)] leading-[var(--text-display-lg-line)] font-[var(--text-display-lg-weight)] tracking-[var(--text-display-lg-tracking)]',
    'display-md':
      'font-display text-[length:var(--text-display-md-size)] leading-[var(--text-display-md-line)] font-[var(--text-display-md-weight)] tracking-[var(--text-display-md-tracking)]',
    'heading-xl':
      'text-[length:var(--text-heading-xl-size)] leading-[var(--text-heading-xl-line)] font-[var(--text-heading-xl-weight)] tracking-[var(--text-heading-xl-tracking)]',
    'heading-lg':
      'text-[length:var(--text-heading-lg-size)] leading-[var(--text-heading-lg-line)] font-[var(--text-heading-lg-weight)] tracking-[var(--text-heading-lg-tracking)]',
    'heading-md':
      'text-[length:var(--text-heading-md-size)] leading-[var(--text-heading-md-line)] font-[var(--text-heading-md-weight)] tracking-[var(--text-heading-md-tracking)]',
    'heading-sm':
      'text-[length:var(--text-heading-sm-size)] leading-[var(--text-heading-sm-line)] font-[var(--text-heading-sm-weight)]',
    'heading-xs':
      'text-[length:var(--text-heading-xs-size)] leading-[var(--text-heading-xs-line)] font-[var(--text-heading-xs-weight)]',
  };

  return (
    <Component
      className={cn('text-primary-800', isDisplay ? '' : 'font-sans', variantClasses[variant], className)}
      {...props}
    >
      {children}
    </Component>
  );
}
