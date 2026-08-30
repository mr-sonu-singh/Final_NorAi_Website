import React from 'react';
import { cn } from '@/lib/utils';

export type TextVariant =
  | 'body-xl'
  | 'body-lg'
  | 'body-md'
  | 'body-sm'
  | 'body-xs'
  | 'label'
  | 'fluid-lead'
  | 'fluid-body';

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TextVariant;
  as?: React.ElementType;
}

export function Text({
  variant = 'body-md',
  as: Component = 'p',
  className,
  children,
  ...props
}: TextProps) {
  const variantClasses: Record<TextVariant, string> = {
    'body-xl':
      'text-[length:var(--text-body-xl-size)] leading-[var(--text-body-xl-line)] font-[var(--text-body-xl-weight)]',
    'body-lg':
      'text-[length:var(--text-body-lg-size)] leading-[var(--text-body-lg-line)] font-[var(--text-body-lg-weight)]',
    'body-md':
      'text-[length:var(--text-body-md-size)] leading-[var(--text-body-md-line)] font-[var(--text-body-md-weight)]',
    'body-sm':
      'text-[length:var(--text-body-sm-size)] leading-[var(--text-body-sm-line)] font-[var(--text-body-sm-weight)]',
    'body-xs':
      'text-[length:var(--text-body-xs-size)] leading-[var(--text-body-xs-line)] font-[var(--text-body-xs-weight)]',
    label:
      'text-[length:var(--text-label-size)] leading-[var(--text-label-line)] font-[var(--text-label-weight)]',
    'fluid-lead': 'fluid-lead font-normal',
    'fluid-body': 'fluid-body font-normal',
  };

  return (
    <Component className={cn('text-primary-700', variantClasses[variant], className)} {...props}>
      {children}
    </Component>
  );
}
