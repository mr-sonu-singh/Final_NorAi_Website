'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { SkeletonProps, SkeletonShape } from './Skeleton.types';

const shapeClasses: Record<SkeletonShape, string> = {
  text: 'rounded h-4 w-full',
  rect: 'rounded-md h-24 w-full',
  circle: 'rounded-full h-12 w-12',
};

export function Skeleton({
  shape = 'rect',
  width,
  height,
  className,
  style,
  ...props
}: SkeletonProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const customStyle: React.CSSProperties = {
    ...(width !== undefined ? { width } : {}),
    ...(height !== undefined ? { height } : {}),
    ...style,
  };

  return (
    <div
      aria-hidden="true"
      style={customStyle}
      className={cn(
        'bg-canvas-recessed select-none',
        shapeClasses[shape],
        !prefersReducedMotion && 'animate-pulse',
        className,
      )}
      {...props}
    />
  );
}
