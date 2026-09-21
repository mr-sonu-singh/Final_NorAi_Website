'use client';

import React from 'react';
import { Container } from '@/components/foundation/Container';
import { Link } from '@/components/atoms/Link';
import { ArrowUpRight } from 'lucide-react';
import type { Route } from 'next';

interface LedgerItem {
  n: string;
  name: string;
  promise: string;
  deliverable: string;
  href: string;
}

const LEDGER_ITEMS: LedgerItem[] = [
  {
    n: '01',
    name: 'Document & Workflow Automation',
    promise: 'Instant extraction of complex invoices, legal agreements, and technical resumes with zero data retention.',
    deliverable: 'Workflow AI',
    href: '/services',
  },
  {
    n: '02',
    name: 'Civic Intelligence & Regional Notices',
    promise: 'Automated verification and bilingual Hindi parsing of public gazettes and citizen welfare updates.',
    deliverable: 'Civic NLP',
    href: '/products/smart-dainik-news',
  },
  {
    n: '03',
    name: 'Full-Stack Modern Web Platforms',
    promise: 'Next.js 15 & React 19 digital systems engineered for sub-second speeds and 100% client code ownership.',
    deliverable: 'Modern Web',
    href: '/services',
  },
  {
    n: '04',
    name: 'Spatial Computing & WebXR Simulators',
    promise: 'Interactive browser-based 3D digital twins and vocational training environments running at 60fps.',
    deliverable: 'WebXR 3D',
    href: '/services',
  },
  {
    n: '05',
    name: 'Youth Upskilling & Collegiate Workshops',
    promise: 'Hands-on developer masterclasses and computational thinking workshops for students across Eastern Uttar Pradesh.',
    deliverable: 'Civic Mission',
    href: '/mission',
  },
];

export function SectorLedger() {
  return (
    <section id="sector-ledger" className="section relative bg-[#f5f5f0] text-[var(--pine)] py-24 sm:py-32 overflow-hidden border-b border-[var(--line)]">
      <Container size="default" className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 sm:mb-20">
          <div className="space-y-3">
            <span className="eyebrow text-xs uppercase font-mono tracking-[0.18em] text-[#0650AD] font-bold block">
              — The Enterprise & Bharat Ledger
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[var(--pine)] tracking-tight leading-[1.04]">
              Where AI belongs. <br />
              <span className="text-[#0650AD]">Where it delivers.</span>
            </h2>
          </div>
          <p className="text-[var(--pine)]/75 text-base sm:text-lg max-w-md leading-relaxed">
            Real software engineering solving tangible challenges across businesses, students, and citizens.
          </p>
        </div>

        {/* Borderless Hairline Ledger Table */}
        <div className="divide-y divide-[var(--pine-12)] border-t border-b border-[var(--pine-12)]">
          {LEDGER_ITEMS.map((item) => (
            <Link
              key={item.n}
              href={item.href as Route}
              variant="unstyled"
              className="group py-6 sm:py-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-4 -mx-4 rounded-2xl transition-all duration-200 hover:bg-white/70"
            >
              {/* Left Group: Index & Name/Promise */}
              <div className="flex items-start sm:items-baseline gap-4 sm:gap-6 flex-1">
                <span className="font-mono text-sm font-bold text-[#0650AD] shrink-0">
                  {item.n}
                </span>
                <div className="flex flex-col lg:flex-row lg:items-baseline gap-1 lg:gap-6">
                  <span className="font-display font-bold text-lg sm:text-xl text-[var(--pine)] group-hover:text-[#0650AD] transition-colors">
                    {item.name}
                  </span>
                  <span className="text-xs sm:text-sm text-[var(--pine)]/70 font-normal max-w-xl">
                    {item.promise}
                  </span>
                </div>
              </div>

              {/* Right Group: Deliverable Tag & High-Voltage Hover Arrow */}
              <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pl-8 sm:pl-0">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold bg-white border border-[var(--pine-12)] text-[var(--pine)] group-hover:border-[#040A5C]/40 group-hover:text-[#0650AD] transition-colors shadow-xs">
                  {item.deliverable}
                </span>
                <div className="w-9 h-9 rounded-full bg-white border border-[var(--pine-12)] flex items-center justify-center text-[var(--pine)]/70 group-hover:bg-[#040A5C] group-hover:text-white group-hover:border-[#040A5C] group-hover:rotate-45 transition-all duration-200 shadow-xs">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default SectorLedger;
