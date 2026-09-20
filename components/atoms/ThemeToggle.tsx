'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from '@/providers/ThemeProvider';
import { Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md';
}

export function ThemeToggle({ className, size = 'sm' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? theme === 'dark' : true;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'relative inline-flex items-center justify-center rounded-full p-2 border transition-all duration-200 outline-none cursor-pointer select-none active:scale-95',
        isDark
          ? 'bg-[#0A2020] border-[rgba(30,244,180,0.25)] text-[#1EF4B4] hover:bg-[#0F2C2C] shadow-[0_0_12px_rgba(30,244,180,0.2)]'
          : 'bg-[#fffdf7] border-[var(--line)] text-[var(--pine)] hover:bg-[#f5f5f0] shadow-xs',
        size === 'sm' ? 'w-9 h-9' : 'w-10 h-10',
        className,
      )}
    >
      {isDark ? (
        <Sun className="w-4 h-4 transition-transform duration-200 rotate-0 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 transition-transform duration-200 rotate-0 hover:-rotate-12" />
      )}
    </button>
  );
}

export default ThemeToggle;
