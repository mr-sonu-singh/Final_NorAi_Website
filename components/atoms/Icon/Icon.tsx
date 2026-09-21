import React from 'react';
import { icons, HelpCircle, LucideProps } from 'lucide-react';
import { cn } from '@/lib/utils';
import { IconProps, IconSize } from './Icon.types';

const sizeMap: Record<IconSize, string> = {
  xs: 'w-3.5 h-3.5',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

export function Icon({
  name,
  size = 'md',
  strokeWidth = 1.5,
  'aria-label': ariaLabel,
  className,
  ...props
}: IconProps) {
  const iconPascalName = name
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('') as keyof typeof icons;

  const LucideComponent: React.ComponentType<LucideProps> =
    icons[iconPascalName] || icons[name as keyof typeof icons] || HelpCircle;

  const isDecorative = !ariaLabel;

  return (
    <LucideComponent
      className={cn('inline-block shrink-0 stroke-current', sizeMap[size], className)}
      strokeWidth={strokeWidth}
      aria-hidden={isDecorative ? 'true' : undefined}
      aria-label={ariaLabel}
      role={ariaLabel ? 'img' : undefined}
      {...props}
    />
  );
}
