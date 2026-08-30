'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

import { Container } from '@/components/foundation/Container';
import { Link } from '@/components/atoms/Link';
import { IconButton } from '@/components/atoms/IconButton';
import { BrandLogo } from '@/components/atoms/BrandLogo';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';
import { HeaderProps, HeaderCTA } from './Header.types';
import { NavItem } from '@/types';

export const DEFAULT_HEADER_NAV_ITEMS: NavItem[] = [
  { label: 'Products', href: '/products' },
  { label: 'Services', href: '/services' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Mission', href: '/mission' },
  { label: 'About', href: '/about' },
  { label: 'Team', href: '/team' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export const DEFAULT_HEADER_PRIMARY_CTA: HeaderCTA = {
  label: 'Get in touch',
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

  // Handle scroll listener for sticky variant
  useEffect(() => {
    if (!sticky) return;

    function handleScroll() {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sticky]);

  // Focus trapping and Esc key handling for mobile menu
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    // Focus the first focusable element inside the menu when it opens
    const menuEl = mobileMenuRef.current;
    if (menuEl) {
      const focusableEls = menuEl.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
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
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        );

        // Full trap ring: [toggleBtn, ...menuFocusables]
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
        // Return focus to toggle button when closed via click
        setTimeout(() => document.getElementById('mobile-menu-toggle')?.focus(), 50);
      }
      return next;
    });
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setLiveAnnouncement('Mobile navigation menu closed');
    document.getElementById('mobile-menu-toggle')?.focus();
  };

  return (
    <header
      className={cn(
        'relative w-full bg-[rgba(253,251,247,0.9)] backdrop-blur-md border-b border-[rgba(13,37,61,0.08)] text-ink-primary transition-all duration-200 z-50',
        sticky && 'sticky top-0',
        sticky && isScrolled && 'shadow-sm bg-[rgba(253,251,247,0.96)]',
        className,
      )}
      style={{ viewTransitionName: 'persistent-header' }}
      data-testid="header-organism"
      data-scrolled={isScrolled}
      data-sticky={sticky}
    >
      {/* Stable live region for screen readers */}
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {liveAnnouncement}
      </div>

      <Container size="default">
        <nav className="flex items-center justify-between min-h-[68px]" aria-label="Main Navigation">
          {/* Brand Logo & Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/" className="group inline-flex items-center" aria-label="NorAI Home">
              <BrandLogo size="md" />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  variant="unstyled"
                  className={cn(
                    'text-sm font-medium no-underline transition-colors duration-150',
                    isActive
                      ? 'text-accent-600 font-semibold'
                      : 'text-ink-body hover:text-accent-600',
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center justify-center font-sans font-medium h-9 px-3.5 rounded-md border border-line-strong text-ink-primary shadow-sm hover:border-line-accent hover:text-terra-600 hover:bg-terra-50 text-xs transition-colors"
              >
                {secondaryCta.label}
              </Link>
            )}
            {primaryCta && (
              <Link
                href={primaryCta.href}
                className="inline-flex items-center justify-center font-sans font-semibold h-9 px-3.5 rounded-md bg-terra-500 text-white shadow-accent hover:bg-terra-600 text-xs transition-colors"
              >
                {primaryCta.label}
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center">
            <IconButton
              id="mobile-menu-toggle"
              icon={isMobileMenuOpen ? 'x' : 'menu'}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              variant="ghost"
              size="md"
              onClick={toggleMobileMenu}
              className="text-ink-primary hover:bg-canvas-recessed"
            />
          </div>
        </nav>
      </Container>

      {/* Mobile Menu Dropdown with Focus Trapping & Framer Motion AnimatePresence */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            ref={mobileMenuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0, y: -6 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, height: 'auto', y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0, y: -6 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden border-t border-[rgba(13,37,61,0.08)] bg-canvas-paper px-6 py-6 shadow-xl overflow-hidden"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className={cn(
                      'text-base py-1.5 font-medium transition-colors',
                      isActive ? 'text-accent-600 font-semibold' : 'text-ink-primary hover:text-accent-600',
                    )}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="pt-4 mt-2 border-t border-[rgba(13,37,61,0.08)] flex flex-col gap-3">
                {secondaryCta && (
                  <Link
                    href={secondaryCta.href}
                    onClick={closeMobileMenu}
                    className="inline-flex items-center justify-center font-sans font-medium h-11 px-4 rounded-md border border-line-strong text-ink-primary shadow-sm hover:border-line-accent hover:text-terra-600 hover:bg-terra-50 text-sm w-full transition-colors"
                  >
                    {secondaryCta.label}
                  </Link>
                )}
                {primaryCta && (
                  <Link
                    href={primaryCta.href}
                    onClick={closeMobileMenu}
                    className="inline-flex items-center justify-center font-sans font-semibold h-11 px-4 rounded-md bg-terra-500 text-white shadow-accent hover:bg-terra-600 text-sm w-full transition-colors"
                  >
                    {primaryCta.label}
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;