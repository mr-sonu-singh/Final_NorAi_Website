'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export interface TextRevealProps {
  /** The text string to reveal */
  text: string;
  /** Whether to split text into words or individual characters (default: 'word') */
  splitBy?: 'word' | 'char';
  /** Stagger delay between tokens in seconds (default: 0.08) */
  stagger?: number;
  /** Animation duration per token in seconds (default: 0.65) */
  duration?: number;
  /** Initial delay before stagger animation begins (default: 0) */
  delay?: number;
  /** Rendered HTML element tag (default: 'span') */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  /** Classes applied to the root element */
  className?: string;
  /** Classes applied to each token container */
  tokenClassName?: string;
  /** Whether to trigger only once on scroll (default: true) */
  once?: boolean;
}

/**
 * TextReveal splits headlines or body text into words/characters with
 * staggered slide-up and fade-in animations on scroll into view.
 * Respects prefers-reduced-motion with zero layout shift.
 */
export function TextReveal({
  text,
  splitBy = 'word',
  stagger = 0.08,
  duration = 0.65,
  delay = 0,
  as: Tag = 'span',
  className = '',
  tokenClassName = '',
  once = true,
}: TextRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  const words = text.split(' ');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: {
      y: '100%',
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration,
        ease: EASE_OUT,
      },
    },
  };

  const MotionTag = motion.create(Tag);

  return (
    <MotionTag
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
    >
      {splitBy === 'word'
        ? words.map((word, index) => (
            <span
              key={`${word}-${index}`}
              className="inline-block overflow-hidden align-top mr-[0.28em] last:mr-0"
            >
              <motion.span variants={itemVariants} className={`inline-block ${tokenClassName}`}>
                {word}
              </motion.span>
            </span>
          ))
        : words.map((word, wordIndex) => (
            <span
              key={`word-${wordIndex}`}
              className="inline-block whitespace-nowrap mr-[0.28em] last:mr-0"
            >
              {word.split('').map((char, charIndex) => (
                <span key={`char-${charIndex}`} className="inline-block overflow-hidden align-top">
                  <motion.span variants={itemVariants} className={`inline-block ${tokenClassName}`}>
                    {char}
                  </motion.span>
                </span>
              ))}
            </span>
          ))}
    </MotionTag>
  );
}
