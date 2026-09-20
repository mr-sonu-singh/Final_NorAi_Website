'use client';

import React, { useState, useEffect, useId } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';
import { BilingualToggleProps, SupportedLanguage } from './BilingualToggle.types';

const LANGUAGES: Array<{ id: SupportedLanguage; label: string; nativeLabel: string }> = [
  { id: 'en', label: 'English', nativeLabel: 'EN' },
  { id: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी' },
];

export function BilingualToggle({
  currentLang,
  onLanguageChange,
  className,
  size = 'md',
}: BilingualToggleProps) {
  const [internalLang, setInternalLang] = useState<SupportedLanguage>('en');
  const instanceId = useId();
  const shouldReduceMotion = useReducedMotion();

  // Sync initial language from localStorage on client mount if uncontrolled
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('norai_language') as SupportedLanguage | null;
        if (stored === 'en' || stored === 'hi') {
          setInternalLang(stored);
        }
      } catch {
        // Fallback silently
      }
    }
  }, []);

  const activeLang = currentLang ?? internalLang;

  const handleSelect = (lang: SupportedLanguage) => {
    if (lang === activeLang) return;

    if (!currentLang) {
      setInternalLang(lang);
    }

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('norai_language', lang);
        window.dispatchEvent(
          new CustomEvent('norai:language-change', {
            detail: { language: lang },
          }),
        );
      } catch {
        // Fallback silently
      }
    }

    onLanguageChange?.(lang);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const nextLang = activeLang === 'en' ? 'hi' : 'en';
      handleSelect(nextLang);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prevLang = activeLang === 'hi' ? 'en' : 'hi';
      handleSelect(prevLang);
    }
  };

  const isSmall = size === 'sm';

  return (
    <div
      role="radiogroup"
      aria-label="Select Language"
      onKeyDown={handleKeyDown}
      className={cn(
        'bilingual-toggle relative inline-flex items-center rounded-full p-0.5 shadow-xs select-none',
        'bg-[var(--surface)] dark:bg-[#061818] border border-[var(--line)] dark:border-[rgba(30,244,180,0.2)]',
        className,
      )}
    >
      {LANGUAGES.map((lang) => {
        const isSelected = activeLang === lang.id;
        return (
          <button
            key={lang.id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            tabIndex={isSelected ? 0 : -1}
            aria-label={`${lang.label} (${lang.nativeLabel})`}
            onClick={() => handleSelect(lang.id)}
            className={cn(
              'bilingual-toggle-btn relative z-10 inline-flex items-center justify-center rounded-full font-semibold transition-[transform,color] duration-150 active:scale-[0.96] outline-none cursor-pointer',
              isSmall ? 'px-2.5 py-1 text-xs' : 'px-3 py-1 text-xs',
              isSelected
                ? 'bilingual-active text-white dark:text-[#072929] font-bold'
                : 'text-[#072929]/75 hover:text-[#072929] dark:text-[#f5f5f0]/75 dark:hover:text-white',
            )}
          >
            {isSelected && (
              <motion.span
                layoutId={`lang-pill-${instanceId}`}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { type: 'spring', stiffness: 450, damping: 32 }
                }
                className="bilingual-toggle-thumb absolute inset-0 z-[-1] rounded-full shadow-xs"
                aria-hidden="true"
              />
            )}
            <span className="relative z-10">{lang.nativeLabel}</span>
          </button>
        );
      })}
    </div>
  );
}

export default BilingualToggle;
