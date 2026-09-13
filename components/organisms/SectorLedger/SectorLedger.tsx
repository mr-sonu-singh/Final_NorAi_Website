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
    name: 'Private On-Premises Inference',
    promise: 'Air-gapped local clusters with zero cloud telemetry or external data egress.',
    deliverable: 'VPC Enclaves',
    href: '/services',
  },
  {
    n: '02',
    name: 'Deterministic RAG Systems',
    promise: 'Answers strictly grounded in your proprietary documents with verified citations.',
    deliverable: 'Hybrid Milvus',
    href: '/services',
  },
  {
    n: '03',
    name: 'Model Context Protocol (MCP) Workflows',
    promise: 'Secure agent tool execution with deterministic human-in-the-loop validation.',
    deliverable: 'Production MCP',
    href: '/services',
  },
  {
    n: '04',
    name: 'Civic Intelligence & Regional Verification',
    promise: 'Bilingual parsing and verification of state gazettes and citizen notices.',
    deliverable: 'Smart Dainik',
    href: '/products/smart-dainik-news',
  },
  {
    n: '05',
    name: 'Youth Upskilling & Regional AI Vision',
    promise: '100% free coding workshops and open-weight model training dedicated to empowering local youth.',
    deliverable: 'Grassroots Impact',
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
            <span className="eyebrow text-xs uppercase font-mono tracking-[0.18em] text-[#06845A] font-bold block">
              — The Enterprise & Bharat Ledger
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[var(--pine)] tracking-tight leading-[1.04]">
              Where AI belongs. <br />
              <span className="text-[#06845A]">Where it delivers.</span>
            </h2>
          </div>
          <p className="text-[var(--pine)]/75 text-base sm:text-lg max-w-md leading-relaxed">
            Every deployment starts with a fixed-scope diagnostic proving measurable ROI before any broader infrastructure build.
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
                <span className="font-mono text-sm font-bold text-[#06845A] shrink-0">
                  {item.n}
                </span>
                <div className="flex flex-col lg:flex-row lg:items-baseline gap-1 lg:gap-6">
                  <span className="font-display font-bold text-lg sm:text-xl text-[var(--pine)] group-hover:text-[#06845A] transition-colors">
                    {item.name}
                  </span>
                  <span className="text-xs sm:text-sm text-[var(--pine)]/70 font-normal max-w-xl">
                    {item.promise}
                  </span>
                </div>
              </div>

              {/* Right Group: Deliverable Tag & High-Voltage Hover Arrow */}
              <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pl-8 sm:pl-0">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold bg-white border border-[var(--pine-12)] text-[var(--pine)] group-hover:border-[#06845A]/40 group-hover:text-[#06845A] transition-colors shadow-xs">
                  {item.deliverable}
                </span>
                <div className="w-9 h-9 rounded-full bg-white border border-[var(--pine-12)] flex items-center justify-center text-[var(--pine)]/70 group-hover:bg-[#06845A] group-hover:text-white group-hover:border-[#06845A] group-hover:rotate-45 transition-all duration-200 shadow-xs">
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
