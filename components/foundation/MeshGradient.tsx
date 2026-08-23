import React from 'react';
import { cn } from '@/lib/utils';

export interface MeshGradientProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Position within the parent — defaults to filling its container */
  className?: string;
}

/**
 * Stripe-style warm mesh gradient. Pure CSS (two blurred radial layers),
 * zero JavaScript, sits behind content with z-index 0.
 */
export function MeshGradient({ className, ...props }: MeshGradientProps) {
  return <div aria-hidden="true" className={cn('mesh-gradient', className)} {...props} />;
}
