'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

import { Link } from '@/components/atoms/Link';
import { BrandLogo } from '@/components/atoms/BrandLogo';
import { BilingualToggle } from '@/components/molecules/BilingualToggle';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';
import { HeaderProps, HeaderCTA } from './Header.types';
import { NavItem } from '@/types';

export const DEFAULT_HEADER_NAV_ITEMS: NavItem[] = [
  { label: 'Capabilities', href: '/products' },
  { label: 'Approach', href: '/#mission' },
  { label: 'Deliverables', href: '/services' },
  { label: 'About', href: '/team' },
  { label: 'The Canonical', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export const DEFAULT_HEADER_PRIMARY_CTA: HeaderCTA = {
  label: 'Book a call',
  href: '/contact',
};

export function Header({
  navItems = DEFAULT_HEADER_NAV_ITEMS,
  primaryCta = DEFAULT_HEADER_PRIMARY_CTA,
  secondaryCta,
  sticky = true,
  className,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [liveAnnouncement, setLiveAnnouncement] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const prevIsDesktop = useRef(isDesktop);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

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

  // Handle scroll listener for sticky variant and bottom progress indicator
  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(Math.min(1, Math.max(0, window.scrollY / totalHeight)));
      }
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
        event.preventDefault();
        setIsMobileMenuOpen(false);
        setLiveAnnouncement('Mobile navigation menu closed');
        document.getElementById('mobile-menu-toggle')?.focus();
        return;
      }

      if (event.key === 'Tab') {
        const toggleBtn = document.getElementById('mobile-menu-toggle');
        const container = mobileMenuRef.current;
        if (!container) return;

        const menuFocusables = Array.from(
          container.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        );

        const allFocusables = toggleBtn ? [toggleBtn, ...menuFocusables] : menuFocusables;
        if (allFocusables.length === 0) return;

        const firstFocusable = allFocusables[0];
        const lastFocusable = allFocusables[allFocusables.length - 1];

        if (event.shiftKey) {
          if (document.activeElement === firstFocusable) {
            event.preventDefault();
            lastFocusable?.focus();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            event.preventDefault();
            firstFocusable?.focus();
          }
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => {
      const next = !prev;
      setLiveAnnouncement(next ? 'Mobile navigation menu opened' : 'Mobile navigation menu closed');
      if (!next) {
        setTimeout(() => document.getElementById('mobile-menu-toggle')?.focus(), 50);
      }
      return next;
    });
  };

  return (
    <header
      role="banner"
      className={cn(
        'navshell w-full z-[100] transition-[padding,transform] duration-200 pointer-events-none px-3 sm:px-6 pt-3',
        sticky && 'sticky top-0',
        className,
      )}
      data-testid="header-organism"
      data-scrolled={isScrolled}
      data-sticky={sticky}
    >
      {/* Stable live region for screen readers */}
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {liveAnnouncement}
      </div>

      {/* Floating Audens Capsule Nav Pill */}
      <div
        className={cn(
          'navpill pointer-events-auto relative z-50 mx-auto max-w-5xl rounded-full border px-4 sm:px-6 py-2 transition-[background-color,border-color,box-shadow,height] duration-300 ease-out',
          'bg-[#f5f5f0]/90 dark:bg-[#072929]/90 backdrop-blur-xl border-[var(--line)] text-[var(--pine)] dark:text-[var(--bone)]',
          isScrolled && 'shadow-[0_12px_36px_rgba(7,41,41,0.12)] border-[var(--line)]',
        )}
        style={{ height: '66px' }}
      >
        <nav className="flex items-center justify-between gap-3 w-full" aria-label="Main Navigation">
          {/* Brand Wordmark & Mark */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/"
              className="group inline-flex items-center gap-2.5 active:scale-[0.98] transition-transform"
              aria-label="NorAI Home"
            >
              <BrandLogo size="md" />
              <span className="font-display font-extrabold text-xl tracking-tight text-[var(--pine)] dark:text-[var(--bone)]">
                NORAI
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links (Audens Magnet Pill style) */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  variant="unstyled"
                  className={cn(
                    'relative px-4 py-2 text-sm font-medium no-underline rounded-full transition-all duration-200 font-sans',
                    isActive
                      ? 'bg-[var(--mint)] text-[var(--pine)] font-semibold shadow-sm'
                      : 'text-[var(--pine)]/80 dark:text-[var(--bone)]/80 hover:text-[var(--pine)] dark:hover:text-[var(--bone)] hover:bg-[var(--pine-08)] dark:hover:bg-[var(--bone-20)]',
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop Action Cluster: BilingualToggle + Primary CTA with Wave Hand */}
          <div className="hidden lg:flex items-center gap-3">
            <BilingualToggle size="sm" />
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="btn btn--ghost text-xs h-10 px-4"
              >
                {secondaryCta.label}
              </Link>
            )}
            {primaryCta && (
              <Link
                href={primaryCta.href}
                className="btn btn--solid text-sm h-10 px-5 shadow-sm group"
              >
                <span>{primaryCta.label}</span>
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
            )}
          </div>

          {/* Mobile Action Controls */}
          <div className="flex lg:hidden items-center gap-2">
            <BilingualToggle size="sm" />
            <button
              id="mobile-menu-toggle"
              type="button"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              onClick={toggleMobileMenu}
              className="p-2 rounded-full text-[var(--pine)] dark:text-[var(--bone)] hover:bg-[var(--pine-08)] dark:hover:bg-[var(--bone-20)] active:scale-95 transition-transform cursor-pointer pointer-events-auto"
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

        {/* Audens Bottom Progress Line */}
        <div
          className="nav-progress"
          aria-hidden="true"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>

      {/* Mobile Slide-Down Glass Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            ref={mobileMenuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.65, 0, 0.35, 1] }}
            className="pointer-events-auto mx-auto max-w-5xl mt-2 rounded-[22px] border border-[var(--line)] bg-[#f5f5f0]/95 dark:bg-[#072929]/95 backdrop-blur-2xl p-5 shadow-2xl lg:hidden text-[var(--pine)] dark:text-[var(--bone)]"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    variant="unstyled"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      'px-4 py-3 text-base font-medium rounded-xl transition-colors border-b border-[var(--line)]/50',
                      isActive
                        ? 'bg-[var(--mint)] text-[var(--pine)] font-semibold'
                        : 'hover:bg-[var(--pine-08)] dark:hover:bg-[var(--bone-20)]',
                    )}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <div className="pt-3">
                <Link
                  href={primaryCta?.href || '/contact'}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn btn--mint w-full h-11 text-base shadow-sm"
                >
                  <span>{primaryCta?.label || 'Book a call'}</span>
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
