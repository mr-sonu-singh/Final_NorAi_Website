'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useReducedMotion, useScroll, useSpring } from 'motion/react';

import { Link } from '@/components/atoms/Link';
import { BrandLogo } from '@/components/atoms/BrandLogo';
import { BilingualToggle } from '@/components/molecules/BilingualToggle';
import { ThemeToggle } from '@/components/atoms/ThemeToggle';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { useLanguage } from '@/hooks/useLanguage';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';
import { HeaderProps, HeaderCTA } from './Header.types';
import { NavItem } from '@/types';
import { AUDENS_HEADER_NAV_ITEMS } from '@/config/navigation';

export const DEFAULT_HEADER_NAV_ITEMS: NavItem[] = AUDENS_HEADER_NAV_ITEMS;

export const DEFAULT_HEADER_PRIMARY_CTA: HeaderCTA = {
  label: 'Start a Project',
  href: '/contact',
};

export function Header({
  sticky = true,
  className,
}: HeaderProps) {
  const { t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [liveAnnouncement, setLiveAnnouncement] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const prevIsDesktop = useRef(isDesktop);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll progress for top hairline indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Automatically close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useLockBodyScroll(isMobileMenuOpen && !isDesktop);

  // Close mobile menu when resizing from mobile screen to desktop breakpoint
  useEffect(() => {
    if (isDesktop && !prevIsDesktop.current) {
      setIsMobileMenuOpen(false);
    }
    prevIsDesktop.current = isDesktop;
  }, [isDesktop]);

  // Subtle sticky shadow threshold
  useEffect(() => {
    function handleScroll() {
      const scrolled = window.scrollY > 15;
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sticky]);

  // Focus trapping and Esc key handling for mobile menu
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const menuEl = mobileMenuRef.current;
    if (menuEl) {
      const focusableEls = menuEl.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusableEls.length > 0) {
        focusableEls[0]?.focus();
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setLiveAnnouncement('Navigation menu closed');
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    const nextState = !isMobileMenuOpen;
    setIsMobileMenuOpen(nextState);
    setLiveAnnouncement(nextState ? 'Navigation menu opened' : 'Navigation menu closed');
  };

  const dynamicNavItems = [
    { label: t.nav.solutions, href: '/services' },
    { label: t.nav.prototypes, href: '/products' },
    { label: t.nav.civicMission, href: '/mission' },
    { label: t.nav.studioStory, href: '/team' },
  ];

  const dynamicCtaLabel = t.nav.startProject;

  return (
    <header
      role="banner"
      className={cn(
        'w-full z-40 px-4 sm:px-6 pt-3 pb-1 transition-all duration-300 ease-out',
        sticky ? 'sticky top-0' : 'relative',
        className,
      )}
      data-testid="header-organism"
    >
      <div className="sr-only" role="status" aria-live="polite">
        {liveAnnouncement}
      </div>

      {/* The Floating Pill */}
      <div
        className={cn(
          'mx-auto max-w-5xl rounded-2xl px-4 sm:px-6 flex items-center justify-between border transition-all duration-300 shadow-sm',
          'bg-[#fffdf7]/95 dark:bg-[#0a2020]/95 backdrop-blur-xl border-[var(--line)] text-[var(--pine)]',
          isScrolled && 'shadow-lg border-[var(--pine-20)]',
        )}
        style={{ height: '66px' }}
      >
        <nav
          className="flex items-center justify-between gap-3 w-full"
          aria-label="Main Navigation"
        >
          {/* Brand Wordmark & Monogram */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/"
              className="group inline-flex items-center gap-2.5 active:scale-[0.97] transition-transform duration-160 ease-out"
              aria-label="NorAI Home"
            >
              <BrandLogo size="md" />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1">
            {dynamicNavItems.map((item) => {
              const isActive =
                pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  variant="unstyled"
                  className={cn(
                    'relative px-4 py-2 text-sm font-medium no-underline rounded-xl font-sans transition-[color,background-color,transform] duration-160 ease-out active:scale-[0.97]',
                    isActive
                      ? 'bg-[var(--mint)] text-[#072929] font-semibold shadow-xs'
                      : 'text-[var(--pine)]/85 hover:text-[var(--pine)] hover:bg-[var(--pine-08)]',
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop Controls & CTA */}
          <div className="hidden lg:flex items-center gap-2.5">
            <BilingualToggle size="sm" />
            <ThemeToggle size="sm" />
            <Link
              href="/contact"
              className="btn btn--solid text-sm h-10 px-5 rounded-xl shadow-xs group active:scale-[0.97] transition-[transform,background-color] duration-160 ease-out"
            >
              <span>{dynamicCtaLabel}</span>
              <svg
                className="btn__hand w-4 h-4 text-current transition-transform duration-200 group-hover:rotate-12 group-hover:scale-110"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M9 11V5.5a1.5 1.5 0 0 1 3 0V11m0-1.5a1.5 1.5 0 0 1 3 0V11m0-1a1.5 1.5 0 0 1 3 0v4.5a6 6 0 0 1-6 6h-1.2a5 5 0 0 1-3.8-1.8L4 16.2a1.5 1.5 0 0 1 2.2-2L8 16V8.5a1.5 1.5 0 0 1 1-1.4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>

          {/* Mobile Actions: Bilingual + Theme + Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <BilingualToggle size="sm" />
            <ThemeToggle size="sm" />
            <button
              id="mobile-menu-toggle"
              type="button"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              onClick={toggleMobileMenu}
              className="p-2 rounded-xl text-[var(--pine)] hover:bg-[var(--pine-08)] active:scale-[0.97] transition-[transform,background-color] duration-160 ease-out cursor-pointer pointer-events-auto"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {isMobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="8" x2="21" y2="8" />
                    <line x1="3" y1="16" x2="21" y2="16" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Scroll Progress Bar at the base of the pill */}
        <motion.div
          className="nav-progress"
          aria-hidden="true"
          style={{ scaleX: shouldReduceMotion ? scrollYProgress : scaleX }}
        />
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            ref={mobileMenuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.96 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="pointer-events-auto mx-auto max-w-5xl mt-2 rounded-[22px] border border-[var(--line)] bg-[#fffdf7]/98 dark:bg-[#0a2020]/98 backdrop-blur-2xl p-5 shadow-2xl lg:hidden text-[var(--pine)]"
          >
            <div className="flex flex-col gap-2">
              {dynamicNavItems.map((item) => {
                const isActive =
                  pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    variant="unstyled"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      'px-4 py-3 text-base font-medium rounded-xl border-b border-[var(--line)]/50 transition-[background-color,transform] duration-160 ease-out active:scale-[0.97]',
                      isActive
                        ? 'bg-[var(--mint)] text-[#072929] font-semibold'
                        : 'text-[var(--pine)] hover:bg-[var(--pine-08)]',
                    )}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <div className="pt-3">
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn btn--solid w-full h-11 text-base shadow-xs active:scale-[0.97] transition-[transform,background-color] duration-160 ease-out"
                >
                  <span>{dynamicCtaLabel}</span>
                  <svg
                    className="btn__hand w-4 h-4 text-current"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M9 11V5.5a1.5 1.5 0 0 1 3 0V11m0-1.5a1.5 1.5 0 0 1 3 0V11m0-1a1.5 1.5 0 0 1 3 0v4.5a6 6 0 0 1-6 6h-1.2a5 5 0 0 1-3.8-1.8L4 16.2a1.5 1.5 0 0 1 2.2-2L8 16V8.5a1.5 1.5 0 0 1 1-1.4"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
