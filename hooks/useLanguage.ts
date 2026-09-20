'use client';

import { useState, useEffect, useCallback } from 'react';
import { TRANSLATIONS, Language } from '@/config/translations';

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
