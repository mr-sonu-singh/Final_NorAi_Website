import React from 'react';
import { Container } from '@/components/foundation/Container';
import { Link } from '@/components/atoms/Link';
import { BrandLogo } from '@/components/atoms/BrandLogo';
import { cn } from '@/lib/utils';
import { FooterProps, FooterColumn } from './Footer.types';
import { SocialLinkItem } from '@/components/molecules/SocialLinks/SocialLinks.types';

export const DEFAULT_FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: 'Capabilities',
    links: [
      { label: 'AI Resume Shortlister', href: '/products/resume-shortlister' },
      { label: 'Course Note-Taker', href: '/products/course-note-taker' },
      { label: 'Community Chat Digest', href: '/products/chat-digest' },
      { label: 'Smart Dainik News', href: '/products/smart-dainik-news' },
    ],
  },
  {
    title: 'Solutions & Mission',
    links: [
      { label: 'Private VPC Inference', href: '/services' },
      { label: 'Deterministic RAG Systems', href: '/services' },
      { label: 'MCP Agent Workflows', href: '/services' },
      { label: '75-District Bharat Mission', href: '/mission' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Approach', href: '/services#operating-rituals' },
      { label: 'Deliverables', href: '/services' },
      { label: 'Team & Story', href: '/team' },
      { label: 'The Canonical', href: '/blog' },
    ],
  },
];

export const DEFAULT_FOOTER_SOCIAL_LINKS: SocialLinkItem[] = [
  {
    label: 'Twitter / X',
    href: 'https://twitter.com/norai',
    icon: 'twitter',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/norai',
    icon: 'github',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/norai',
    icon: 'linkedin',
  },
];

export const DEFAULT_LEGAL_TEXT = '© 2026 NorAI Technologies · all rights reserved';

export function Footer({
  columns = DEFAULT_FOOTER_COLUMNS,
  legalText = DEFAULT_LEGAL_TEXT,
  className,
}: FooterProps) {
  return (
    <footer
      aria-label="Site Footer"
      className={cn(
        'section section--dark relative w-full bg-[#072929] text-[var(--bone)] pt-16 sm:pt-20 pb-12 font-sans border-t border-[var(--bone-20)]',
        className,
      )}
      data-testid="footer-organism"
    >
      <Container size="default" className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* Top Section: Audens Signature Bold Statement */}
        <div className="pb-12 sm:pb-16 border-b border-[var(--bone-20)]">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[var(--bone)] tracking-tight max-w-2xl leading-[1.08]">
            Built to change what <span className="text-[var(--mint)]">happens.</span>
          </h2>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 sm:gap-12 py-12 sm:py-16 border-b border-[var(--bone-20)]">
          {/* Brand Col (2 cols on desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-3 group active:scale-[0.98] transition-transform"
              aria-label="NorAI Home"
            >
              <BrandLogo size="lg" variant="inverted" />
            </Link>
            <p className="text-[var(--bone-70)] text-sm sm:text-base leading-relaxed max-w-sm">
              Fast, sovereign AI engineering and single-purpose utilities. Advice that ships. Systems you own.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 text-xs font-mono text-[var(--mint)]">
                <span className="w-2 h-2 rounded-full bg-[var(--mint)] animate-pulse" aria-hidden="true" />
                <span>Operating across 75 districts in Uttar Pradesh</span>
              </span>
            </div>
          </div>

          {/* Nav Columns */}
          {columns.map((column) => (
            <div key={column.title} className="space-y-4">
              <h3 className="text-xs uppercase font-mono tracking-widest text-[var(--bone-70)] font-semibold">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label + link.href}>
                    <Link
                      href={link.href}
                      variant="unstyled"
                      className="text-[var(--bone)] hover:text-[var(--mint)] text-sm font-medium transition-colors inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Col */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase font-mono tracking-widest text-[var(--bone-70)] font-semibold">
              Contact
            </h3>
            <div className="space-y-3 text-sm">
              <a
                href="mailto:contact@norai.tech"
                className="text-[var(--bone)] hover:text-[var(--mint)] font-medium transition-colors block break-all"
              >
                contact@norai.tech
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-[var(--mint)] font-semibold text-sm hover:underline hover:underline-offset-4"
              >
                <span>Book a diagnostic</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-[var(--bone-70)]">
          <div>{legalText}</div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" variant="unstyled" className="hover:text-[var(--bone)] transition-colors">
              Privacy
            </Link>
            <Link href="/terms" variant="unstyled" className="hover:text-[var(--bone)] transition-colors">
              Terms
            </Link>
            <span className="text-[var(--bone-50)]">·</span>
            <span>Engineered in Uttar Pradesh, India</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
