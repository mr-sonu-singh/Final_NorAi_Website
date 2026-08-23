'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { HTMLAttributes, ReactNode } from 'react';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/** HTML attributes that collide with Framer Motion's own handler types */
type MotionSafeAttributes<T extends HTMLElement = HTMLElement> = Omit<
  HTMLAttributes<T>,
  'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd'
>;

export interface AnimatedSectionProps extends MotionSafeAttributes {
  children: ReactNode;
  /** Stagger delay in seconds */
  delay?: number;
  /** Render as a different element (div, section, etc.) */
  as?: 'section' | 'div' | 'article' | 'aside' | 'header' | 'footer';
}

/**
 * Scroll-triggered section reveal. Fades + rises once when scrolled into view.
 * Respects prefers-reduced-motion by rendering statically.
 */
export function AnimatedSection({
  children,
  className,
  delay = 0,
  as: Tag = 'section',
  ...props
}: AnimatedSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <Tag className={className} {...props}>
        {children}
      </Tag>
    );
  }

  return (
    <motion.section
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.4, delay, ease: EASE_OUT }}
      {...props}
    >
      {children}
    </motion.section>
  );
}

export interface RevealProps extends MotionSafeAttributes<HTMLDivElement> {
  children: ReactNode;
  delay?: number;
  y?: number;
}

/** Generic scroll reveal wrapper for non-section elements. */
export function Reveal({ children, className, delay = 0, y = 24, ...props }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.38, delay, ease: EASE_OUT }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export interface StaggerGridProps extends MotionSafeAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Seconds between each child's entrance */
  stagger?: number;
}

/**
 * Parent container that staggers its direct motion.div children.
 * Wrap each grid child in <StaggerItem />.
 */
export function StaggerGrid({ children, className, stagger = 0.08, ...props }: StaggerGridProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={{ visible: { transition: { staggerChildren: stagger } } }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export interface StaggerItemProps extends MotionSafeAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function StaggerItem({ children, className, ...props }: StaggerItemProps) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20, scale: 0.98 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.36, ease: EASE_OUT },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
