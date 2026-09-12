'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion, animate } from 'motion/react';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export interface CountUpProps {
  /** Target numeric value */
  value: number;
  /** Starting numeric value (default: 0) */
  startValue?: number;
  /** Optional prefix string (e.g., "< " or "$") */
  prefix?: string;
  /** Optional suffix string (e.g., "s", "%", "+") */
  suffix?: string;
  /** Number of decimal places to display (inferred if omitted) */
  decimals?: number;
  /** Duration of counting animation in seconds (default: 2.2) */
  duration?: number;
  /** Delay before animation starts in seconds (default: 0) */
  delay?: number;
  /** Additional CSS class names */
  className?: string;
  /** Whether to animate only once on scroll (default: true) */
  once?: boolean;
}

/**
 * CountUp smoothly animates a numeric value from startValue to value on scroll into view.
 * Uses font-mono and tabular-nums to prevent cumulative layout shift (CLS = 0).
 * Respects prefers-reduced-motion with static display.
 */
export function CountUp({
  value,
  startValue = 0,
  prefix = '',
  suffix = '',
  decimals,
  duration = 2.2,
  delay = 0,
  className = '',
  once = true,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: '0px 0px -20px 0px' });
  const shouldReduceMotion = useReducedMotion();

  // Infer decimal places if not explicitly passed (e.g. 0.35 -> 2, 50 -> 0)
  const resolvedDecimals =
    decimals !== undefined
      ? decimals
      : value.toString().includes('.')
      ? (value.toString().split('.')[1]?.length ?? 0)
      : 0;

  const formatNumber = React.useCallback(
    (val: number) => {
      return val.toFixed(resolvedDecimals);
    },
    [resolvedDecimals]
  );

  // Always initialize with final value so SSR, headless crawlers, and static snapshots render the true metric
  const [currentDisplay, setCurrentDisplay] = useState(() => formatNumber(value));
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (shouldReduceMotion || hasAnimatedRef.current) {
      setCurrentDisplay(formatNumber(value));
      return;
    }

    if (!isInView) return;

    hasAnimatedRef.current = true;
    const controls = animate(startValue, value, {
      duration,
      delay,
      ease: EASE_OUT,
      onUpdate: (latest) => {
        setCurrentDisplay(formatNumber(latest));
      },
    });

    return () => controls.stop();
  }, [isInView, value, startValue, duration, delay, shouldReduceMotion, formatNumber]);

  return (
    <span
      ref={ref}
      className={`inline-block font-mono tabular-nums ${className}`}
    >
      {prefix}
      {currentDisplay}
      {suffix}
    </span>
  );
}
