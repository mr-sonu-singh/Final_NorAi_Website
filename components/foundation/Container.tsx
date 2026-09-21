import React from 'react';
import { cn } from '@/lib/utils';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'wide' | 'default' | 'narrow';
  as?: React.ElementType;
}

export function Container({
  size = 'default',
  as: Component = 'div',
  className,
  children,
  ...props
}: ContainerProps) {
  const sizeClasses = {
    wide: 'max-w-[var(--container-wide)]',
    default: 'max-w-[var(--container-default)]',
    narrow: 'max-w-[var(--container-narrow)]',
  };

  return (
    <Component
      className={cn('w-full mx-auto px-4 sm:px-6 lg:px-8', sizeClasses[size], className)}
      {...props}
    >
      {children}
    </Component>
  );
}
