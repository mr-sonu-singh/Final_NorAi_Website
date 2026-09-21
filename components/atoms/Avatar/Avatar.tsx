'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { Icon } from '../Icon';
import { AvatarProps, AvatarSize } from './Avatar.types';

const sizeClasses: Record<AvatarSize, string> = {
  sm: 'w-8 h-8 text-body-xs',
  md: 'w-10 h-10 text-body-sm',
  lg: 'w-14 h-14 text-body-lg',
};

const iconSizeMap: Record<AvatarSize, 'xs' | 'sm' | 'md'> = {
  sm: 'xs',
  md: 'sm',
  lg: 'md',
};

export function Avatar({
  src,
  alt = '',
  size = 'md',
  fallback,
  status,
  className,
  ...props
}: AvatarProps) {
  const [hasError, setHasError] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(true);
  const imgRef = React.useRef<HTMLImageElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  React.useEffect(() => {
    if (imgRef.current?.complete) {
      setIsLoaded(true);
    }
  }, [src]);

  const showImage = src && !hasError;

  return (
    <div className={cn('relative inline-block shrink-0', className)} {...props}>
      <div
        className={cn(
          'flex items-center justify-center rounded-full overflow-hidden bg-canvas-recessed text-ink-body font-sans font-semibold border border-line-subtle select-none',
          sizeClasses[size],
        )}
      >
        {showImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={cn(
              'w-full h-full object-cover',
              !prefersReducedMotion &&
                'transition-opacity duration-[var(--duration-fast)] ease-[var(--ease-smooth)]',
              isLoaded || prefersReducedMotion ? 'opacity-100' : 'opacity-0',
            )}
          />
        ) : fallback ? (
          <span>{fallback.substring(0, 2).toUpperCase()}</span>
        ) : (
          <Icon name="User" size={iconSizeMap[size]} className="text-ink-disabled" />
        )}
      </div>

      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4 ring-2 ring-canvas-paper rounded-full',
            size === 'lg' ? 'w-3 h-3' : 'w-2.5 h-2.5',
            status === 'accent' && 'bg-terra-500',
            status === 'success' && 'bg-success-600',
            status === 'warning' && 'bg-warning-600',
            status === 'error' && 'bg-error-600',
            status === 'neutral' && 'bg-ink-secondary',
          )}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
