'use client';

import React from 'react';
import { Container } from '@/components/foundation/Container';
import { Stack } from '@/components/foundation/Stack';
import { Text } from '@/components/foundation/Text';
import { Heading } from '@/components/foundation/Heading';
import { Link } from '@/components/atoms/Link';
import { BrandLogo } from '@/components/atoms/BrandLogo';
import { SocialLinks } from '@/components/molecules/SocialLinks';
import { cn } from '@/lib/utils';
import { FooterProps, FooterColumn } from './Footer.types';
import { SocialLinkItem } from '@/components/molecules/SocialLinks/SocialLinks.types';


export const DEFAULT_FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: 'Products',
    links: [
      { label: 'All Products', href: '/products' },
      { label: 'Resume Shortlister', href: '/products/resume-shortlister' },
      { label: 'Course Note-Taker', href: '/products/course-note-taker' },
      { label: 'Chat Digest AI', href: '/products/chat-digest' },
      { label: 'Smart Dainik News', href: '/products/smart-dainik-news' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Our Story', href: '/about' },
      { label: 'AI Skill Mission', href: '/mission' },
      { label: 'Team', href: '/team' },
      { label: 'Careers', href: '/careers' },
      { label: 'Custom AI services', href: '/services' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog & Insights', href: '/blog' },
      { label: 'Campus Workshops', href: '/mission#workshops' },
      { label: 'Documentation', href: '/docs' },
      { label: 'Help & FAQ', href: '/faq' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
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

export const DEFAULT_LEGAL_TEXT =
  '© 2026 NorAI Technologies Pvt. Ltd. All rights reserved.';

export function Footer({
  columns = DEFAULT_FOOTER_COLUMNS,
  socialLinks = DEFAULT_FOOTER_SOCIAL_LINKS,
  legalText = DEFAULT_LEGAL_TEXT,
  className,
}: FooterProps) {
  return (
    <footer
      aria-label="Site Footer"
      className={cn(
        'relative w-full bg-[#0D253D] text-[#FDFBF7] pt-16 pb-12 font-sans border-t border-[rgba(253,251,247,0.08)]',
        className,
      )}
      data-testid="footer-organism"
    >
      <Container size="default" className="relative z-10">

        {/* Brand Wordmark & Top Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-12 border-b border-[rgba(253,251,247,0.1)]">
          <div className="space-y-3">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <BrandLogo variant="inverted" size="lg" />
            </Link>
            <p className="text-slate-400 text-sm max-w-sm">
              Purpose-built micro-SaaS utilities and enterprise AI systems engineered with conviction.
            </p>
          </div>


          {/* Social Links */}
          {socialLinks && socialLinks.length > 0 && (
            <div className="flex items-center gap-3">
              <SocialLinks
                links={socialLinks}
                size="md"
                orientation="horizontal"
                className="
                  [&_a]:h-10
                  [&_a]:w-10
                  [&_a]:rounded-full
                  [&_a]:border
                  [&_a]:border-[rgba(253,251,247,0.15)]
                  [&_a]:bg-[#16324E]
                  [&_a]:flex
                  [&_a]:items-center
                  [&_a]:justify-center
                  [&_a]:text-slate-300
                  [&_a]:transition-all
                  [&_a]:duration-200
                  [&_a:hover]:border-[#C2553A]
                  [&_a:hover]:text-white
                  [&_a:hover]:bg-[#C2553A]/20
                  [&_a:hover]:-translate-y-0.5
                "
              />
            </div>
          )}
        </div>

        {/* Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-12 border-b border-[rgba(253,251,247,0.1)]">
          {columns.map((column) => (
            <Stack
              key={column.title}
              direction="col"
              gap="4"
              align="start"
              className="min-w-[9rem]"
            >
              <Heading
                as="h4"
                variant="heading-xs"
                className="font-sans text-[#FDFBF7] font-semibold text-xs text-[#D4A574]"
              >
                {column.title}
              </Heading>

              <div className="flex flex-col space-y-2.5">
                {column.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    variant="unstyled"
                    className="no-underline text-[#CBD5E1] text-sm font-normal transition-colors duration-150 hover:text-white hover:underline hover:decoration-[#D4A574]/60 hover:underline-offset-4"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </Stack>
          ))}
        </div>

        {/* Bottom Bar: Legal + Regional Origin */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-center sm:text-left text-sm text-slate-400">
          <Text variant="body-xs" className="text-slate-400">
            {legalText}
          </Text>

          <div className="flex items-center gap-2 text-slate-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5B8A72] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#5B8A72]" />
            </span>
            <span className="text-xs font-medium text-slate-300">
              Built with conviction in Uttar Pradesh, India.
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;