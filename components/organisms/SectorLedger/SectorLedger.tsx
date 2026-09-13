'use client';

import React from 'react';
import { Container } from '@/components/foundation/Container';
import { Link } from '@/components/atoms/Link';
import { ArrowRight } from 'lucide-react';

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
    name: '75-District Bharat Literacy Mission',
    promise: '100% free coding bootcamps and open-weight model deployment across Uttar Pradesh.',
    deliverable: 'Grassroots Impact',
    href: '/mission',
  },
];

export function SectorLedger() {
  return (
    <section className="section relative bg-[#f5f5f0] text-[var(--pine)] py-20 sm:py-28 overflow-hidden border-b border-[var(--line)]">
      <Container size="default" className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <span className="text-xs uppercase font-mono tracking-widest text-[var(--mint-ink)] font-semibold">
              The Enterprise & Bharat Ledger
            </span>
            <h2 className="font-display font-normal text-3xl sm:text-4xl md:text-5xl text-[var(--pine)] tracking-tight leading-[1.1] mt-3">
              Where AI belongs. Where it delivers.
            </h2>
          </div>
          <p className="text-[var(--pine)]/70 text-sm sm:text-base max-w-md leading-relaxed">
            Every engagement starts with a fixed-scope two-week diagnostic that proves ROI before any bigger build.
          </p>
        </div>

        {/* Audens Ledger Table */}
        <div className="ledger border-t border-[var(--line)]">
          {LEDGER_ITEMS.map((item) => (
            <Link
              key={item.n}
              href={item.href}
              variant="unstyled"
              className="ledger__row group"
            >
              {/* Number */}
              <span className="font-mono text-sm font-bold text-[var(--mint-ink)]">
                {item.n}
              </span>

              {/* Title & Promise */}
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                <span className="font-sans font-semibold text-base sm:text-lg text-[var(--pine)] group-hover:text-[var(--forest)] transition-colors">
                  {item.name}
                </span>
                <span className="text-xs sm:text-sm text-[var(--pine)]/80 font-normal">
                  {item.promise}
                </span>
              </div>

              {/* Deliverable Tag */}
              <div className="hidden md:block">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-medium bg-[var(--pine-08)] text-[var(--pine)] group-hover:bg-[var(--mint)] group-hover:text-[var(--pine)] transition-colors">
                  {item.deliverable}
                </span>
              </div>

              {/* Slide Arrow */}
              <div className="ledger__arrow text-[var(--pine)]/80">
                <ArrowRight className="w-5 h-5" />
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default SectorLedger;
