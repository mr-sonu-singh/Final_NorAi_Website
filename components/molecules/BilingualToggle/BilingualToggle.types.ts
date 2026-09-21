export type SupportedLanguage = 'en' | 'hi';

export interface BilingualToggleProps {
  currentLang?: SupportedLanguage;
  onLanguageChange?: (lang: SupportedLanguage) => void;
  className?: string;
  size?: 'sm' | 'md';
}
