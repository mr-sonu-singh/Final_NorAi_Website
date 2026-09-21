import React from 'react';
import { Container } from '@/components/foundation/Container';
import { Link } from '@/components/atoms/Link';
import { BrandLogo } from '@/components/atoms/BrandLogo';
import { cn } from '@/lib/utils';
import { FooterProps, FooterColumn } from './Footer.types';
import { Mail, MapPin, Globe } from 'lucide-react';

export const DEFAULT_FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: 'Solutions (4 Pillars)',
    links: [
      { label: 'AI Solutions & Automation', href: '/services' },
      { label: 'Custom Modern Web Software', href: '/services' },
      { label: 'Spatial Computing (AR / VR)', href: '/services' },
      { label: 'Applied Research & Innovation', href: '/services' },
    ],
  },
  {
    title: 'Prototypes & Tools',
    links: [
      { label: 'AI Resume Shortlister', href: '/products/resume-shortlister' },
      { label: 'Course Note-Taker', href: '/products/course-note-taker' },
      { label: 'Community Chat Digest', href: '/products/chat-digest' },
      { label: 'Smart Dainik News', href: '/products/smart-dainik-news' },
    ],
  },
  {
    title: 'Mission & Studio',
    links: [
      { label: 'Upskilling Mission', href: '/mission' },
      { label: 'Student Upskilling Initiatives', href: '/mission' },
      { label: 'Team', href: '/team' },
      { label: 'Contact & Inquiries', href: '/contact' },
    ],
  },
];

export const DEFAULT_LEGAL_TEXT = '© 2026 Nor AI Technologies Private Limited · All Rights Reserved';

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
        {/* Top Section: Signature Bold Statement */}
        <div className="pb-12 sm:pb-16 border-b border-[var(--bone-20)] flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[var(--mint)] font-bold block mb-3">
              NOR AI TECHNOLOGIES PRIVATE LIMITED
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-[var(--bone)] tracking-tight leading-[1.08]">
              Engineering pragmatic intelligence.{' '}
              <span className="text-[var(--mint)]">Empowering India.</span>
            </h2>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--mint)] text-[#072929] font-bold text-sm hover:bg-white transition-colors duration-160 shadow-md shrink-0"
          >
            <span>Start a Project →</span>
          </Link>
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
            <p className="text-[var(--bone-70)] text-sm leading-relaxed max-w-sm">
              Early-stage Indian AI engineering practice and upskilling mission. Pragmatic machine intelligence, high-performance web applications, and spatial computing.
            </p>


          </div>

          {/* Nav Columns */}
          {columns.map((column) => (
            <div key={column.title} className="space-y-4">
              <h3 className="text-xs uppercase font-mono tracking-widest text-[var(--bone-70)] font-semibold">
                {column.title}
              </h3>
              <ul className="space-y-2.5">
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
              Desk & Contact
            </h3>
            <div className="space-y-2.5 text-xs font-mono text-white/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[var(--mint)] shrink-0 mt-0.5" />
                <span>Umarganj, Zamania, Ghazipur, Uttar Pradesh</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[var(--mint)] shrink-0" />
                <a
                  href="mailto:noraitechnologies@gmail.com"
                  className="text-white hover:text-[var(--mint)] transition-colors break-all"
                >
                  noraitechnologies@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-[var(--mint)] shrink-0" />
                <span>www.norai.tech</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-[var(--bone-70)]">
          <div>{legalText}</div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" variant="unstyled" className="hover:text-[var(--bone)] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" variant="unstyled" className="hover:text-[var(--bone)] transition-colors">
              Terms of Service
            </Link>
            <span className="text-[var(--bone-50)]">·</span>
            <span>Umarganj, Zamania, Ghazipur, Uttar Pradesh</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
