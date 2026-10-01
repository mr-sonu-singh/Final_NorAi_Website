'use client';

import { useState, useEffect, useCallback } from 'react';
import { TRANSLATIONS, Language } from '@/config/translations';

/**
 * BCP-47 tag each UI language must declare on <html lang>. A screen reader picks
 * its pronunciation and its voice from this attribute, so it has to follow the
 * interface language — Devanagari read with English rules is unintelligible.
 */
const HTML_LANG: Record<Language, string> = {
  en: 'en',
  hi: 'hi',
};

/**
 * Single writer for <html lang>. Both owners of language state call this: the
 * hook (which mirrors the stored preference) and the toggle (which owns the
 * uncontrolled selection in the header).
 */
export function applyDocumentLanguage(lang: Language) {
  if (typeof document === 'undefined') return;
  if (document.documentElement.lang !== HTML_LANG[lang]) {
    document.documentElement.lang = HTML_LANG[lang];
  }
}

export function useLanguage() {
  const [lang, setLang] = useState<Language>('en');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('norai_language') as Language | null;
      if (stored === 'en' || stored === 'hi') {
        setLang(stored);
      }
    } catch {
      // ignore
    }

    const handleLanguageChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ language: Language }>;
      if (customEvent.detail?.language) {
        setLang(customEvent.detail.language);
      }
    };

    window.addEventListener('norai:language-change', handleLanguageChange);
    return () => {
      window.removeEventListener('norai:language-change', handleLanguageChange);
    };
  }, []);

  // Runs on mount (covering a stored preference) and on every change, from
  // either the toggle or another subscriber of the language-change event.
  useEffect(() => {
    applyDocumentLanguage(lang);
  }, [lang]);

  const setLanguage = useCallback((newLang: Language) => {
    setLang(newLang);
    try {
      localStorage.setItem('norai_language', newLang);
      window.dispatchEvent(
        new CustomEvent('norai:language-change', {
          detail: { language: newLang },
        })
      );
    } catch {
      // ignore
    }
  }, []);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  return { lang, t, setLanguage };
}

export default useLanguage;
