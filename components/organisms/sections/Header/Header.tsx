'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { Container } from '@/components/foundation/Container';
import { Button } from '@/components/atoms/Button';
import { Link } from '@/components/atoms/Link';
import { IconButton } from '@/components/atoms/IconButton';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';
import { HeaderProps, HeaderCTA } from './Header.types';
import { NavItem } from '@/components/molecules/NavigationGroup/NavigationGroup.types';

export const DEFAULT_HEADER_NAV_ITEMS: NavItem[] = [
  { label: 'Products', href: '/products' },
  { label: 'Services', href: '/services' },
  { label: 'Pricing', href: '/pricing' },
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
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const prevIsDesktop = useRef(isDesktop);

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

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
        document.getElementById('mobile-menu-toggle')?.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={cn(
        'relative w-full bg-[rgba(253,251,247,0.9)] backdrop-blur-md border-b border-[rgba(13,37,61,0.08)] text-ink-primary transition-all duration-200 z-50',
        sticky && 'sticky top-0',
        sticky && isScrolled && 'shadow-sm bg-[rgba(253,251,247,0.96)]',
        className,
      )}
      data-testid="header-organism"
      data-scrolled={isScrolled}
      data-sticky={sticky}
    >
      <Container size="default">
        <nav className="flex items-center justify-between min-h-[68px]" aria-label="Main Navigation">
          {/* Brand Logo & Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/" className="flex items-center gap-2.5 group">
              <Image
                src="/images/brand-logo.png"
                alt="NorAI"
                width={36}
                height={36}
                className="w-9 h-9 object-contain rounded shrink-0"
                priority
              />
              <span className="font-display text-2xl font-normal tracking-tight text-ink-primary group-hover:text-accent-500 transition-colors">
                NorAI
              </span>
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
                  className={cn(
                    'text-sm font-medium transition-colors duration-150',
                    isActive
                      ? 'text-accent-500 font-semibold'
                      : 'text-ink-body hover:text-accent-500',
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
              <Link href={secondaryCta.href}>
                <Button variant="secondary" size="sm">
                  {secondaryCta.label}
                </Button>
              </Link>
            )}
            {primaryCta && (
              <Link href={primaryCta.href}>
                <Button variant="primary" size="sm">
                  {primaryCta.label}
                </Button>
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

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden border-t border-[rgba(13,37,61,0.08)] bg-canvas-paper px-6 py-6 shadow-xl animate-in slide-in-from-top-2 duration-200"
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
                    isActive ? 'text-accent-500 font-semibold' : 'text-ink-primary hover:text-accent-500',
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-4 mt-2 border-t border-[rgba(13,37,61,0.08)] flex flex-col gap-3">
              {secondaryCta && (
                <Link href={secondaryCta.href} onClick={closeMobileMenu}>
                  <Button variant="secondary" size="md" fullWidth>
                    {secondaryCta.label}
                  </Button>
                </Link>
              )}
              {primaryCta && (
                <Link href={primaryCta.href} onClick={closeMobileMenu}>
                  <Button variant="primary" size="md" fullWidth>
                    {primaryCta.label}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;