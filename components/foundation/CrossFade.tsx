'use client';

import React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export interface CrossFadeProps {
  /** Unique key identifying the active content pane */
  activeKey: string | number;
  /** Child content to render for the active pane */
  children: React.ReactNode;
  /** AnimatePresence mode: 'wait' for sequential transitions, 'popLayout' for concurrent layout (default: 'wait') */
  mode?: 'wait' | 'popLayout';
  /** Transition duration in seconds (default: 0.22 — strictly < 300ms for UI ergonomics) */
  duration?: number;
  /** Additional CSS class names for the animated wrapper */
  className?: string;
}

/**
 * CrossFade provides a buttery-smooth fade and micro-scale transition
 * when switching between tabs, views, or dynamic content panels.
 * Follows the 5-state and Emil Kowalski anti-slop rules (never scale(0)).
 * Respects prefers-reduced-motion with instant fallback.
 */
export function CrossFade({
  activeKey,
  children,
  mode = 'wait',
  duration = 0.22,
  className = 'w-full',
}: CrossFadeProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div key={activeKey} className={className}>{children}</div>;
  }

  return (
    <AnimatePresence mode={mode}>
      <motion.div
        key={activeKey}
        initial={{ opacity: 0, scale: 0.98, y: 4 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: -4 }}
        transition={{
          duration,
          ease: EASE_OUT,
        }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
