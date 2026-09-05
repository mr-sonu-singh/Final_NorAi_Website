'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export interface DrawLineProps {
  /** Custom SVG path string (d attribute) */
  path?: string;
  /** Direction for auto-generated straight line if path is omitted (default: 'horizontal') */
  orientation?: 'horizontal' | 'vertical';
  /** Stroke color of the line (default: 'currentColor') */
  color?: string;
  /** Stroke width in pixels (default: 2) */
  strokeWidth?: number;
  /** Optional stroke dash array (e.g., "4 4" for dashed) */
  strokeDasharray?: string;
  /** Duration of draw animation in seconds (default: 1.2) */
  duration?: number;
  /** Delay before draw starts in seconds (default: 0) */
  delay?: number;
  /** Class names applied to the SVG container */
  className?: string;
  /** Class names applied to the animated path */
  pathClassName?: string;
  /** Whether to animate only once on scroll (default: true) */
  once?: boolean;
}

/**
 * DrawLine animates an SVG pathLength from 0 to 1 as it scrolls into view.
 * Ideal for pipeline rails, process flow connectors, and architectural schematics.
 * Respects prefers-reduced-motion with static rendering.
 */
export function DrawLine({
  path,
  orientation = 'horizontal',
  color = 'currentColor',
  strokeWidth = 2,
  strokeDasharray,
  duration = 1.2,
  delay = 0,
  className = 'w-full h-4 overflow-visible',
  pathClassName = '',
  once = true,
}: DrawLineProps) {
  const shouldReduceMotion = useReducedMotion();

  // If no custom SVG path provided, generate a responsive line
  const d =
    path ||
    (orientation === 'horizontal'
      ? 'M 0,2 L 100,2'
      : 'M 2,0 L 2,100');

  const viewBox =
    orientation === 'horizontal' ? '0 0 100 4' : '0 0 4 100';

  if (shouldReduceMotion) {
    return (
      <svg
        className={className}
        viewBox={viewBox}
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={d}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          strokeLinecap="round"
          className={pathClassName}
        />
      </svg>
    );
  }

  return (
    <svg
      className={className}
      viewBox={viewBox}
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        d={d}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
        strokeLinecap="round"
        className={pathClassName}
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once }}
        transition={{
          pathLength: { duration, delay, ease: EASE_OUT },
          opacity: { duration: 0.2, delay },
        }}
      />
    </svg>
  );
}
