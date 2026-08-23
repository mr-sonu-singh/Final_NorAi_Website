'use client';

import React from 'react';
import { useReducedMotion } from 'framer-motion';

export interface MeshGradientProps {
  className?: string;
  intensity?: 'subtle' | 'medium' | 'vibrant';
  interactive?: boolean;
}

/**
 * Stripe-style Warm Mesh Gradient component.
 * Uses blurred organic blobs in terracotta, warm peach, sand, and sage tones.
 * Automatically respects prefers-reduced-motion.
 */
export function MeshGradient({
  className = '',
  intensity = 'medium',
}: MeshGradientProps) {
  const shouldReduceMotion = useReducedMotion();

  const opacityMap = {
    subtle: 'opacity-40',
    medium: 'opacity-60',
    vibrant: 'opacity-80',
  };

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${className}`}
    >
      <div
        className={`absolute inset-0 ${opacityMap[intensity]}`}
        style={{ filter: 'blur(60px)' }}
      >
        {/* Blob 1: Terracotta primary */}
        <div
          className={`absolute -top-[10%] right-[10%] w-[450px] h-[450px] rounded-full bg-[#E8927C]/30 ${
            !shouldReduceMotion ? 'animate-mesh-drift' : ''
          }`}
          style={{ mixBlendMode: 'multiply' }}
        />
        {/* Blob 2: Warm peach */}
        <div
          className={`absolute top-[20%] right-[25%] w-[380px] h-[380px] rounded-full bg-[#F5D3B0]/40 ${
            !shouldReduceMotion ? 'animate-mesh-drift-reverse' : ''
          }`}
          style={{ mixBlendMode: 'multiply' }}
        />
        {/* Blob 3: Warm sand */}
        <div
          className={`absolute top-[45%] right-[5%] w-[340px] h-[340px] rounded-full bg-[#D4A574]/30 ${
            !shouldReduceMotion ? 'animate-mesh-drift' : ''
          }`}
          style={{ mixBlendMode: 'multiply' }}
        />
        {/* Blob 4: Soft Sage accent */}
        <div
          className={`absolute -top-[5%] left-[15%] w-[320px] h-[320px] rounded-full bg-[#E2EDE7]/50 ${
            !shouldReduceMotion ? 'animate-mesh-drift-reverse' : ''
          }`}
          style={{ mixBlendMode: 'multiply' }}
        />
      </div>
    </div>
  );
}

export default MeshGradient;
