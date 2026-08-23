'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export interface LegalTocItem {
  id: string;
  title: string;
}

export interface LegalTocProps {
  items: LegalTocItem[];
}

export function LegalToc({ items }: LegalTocProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? '');

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-96px 0px -65% 0px', threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="On this page" className="space-y-1 border-l border-line-subtle">
      {items.map((item) => {
        const isActive = item.id === activeId;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            aria-current={isActive ? 'location' : undefined}
            className={cn(
              '-ml-px block border-l-2 py-1.5 pl-4 pr-2 text-[13px] leading-snug transition-colors duration-200',
              isActive
                ? 'border-terra-500 font-semibold text-terra-600'
                : 'border-transparent text-ink-secondary hover:border-line-strong hover:text-ink-primary',
            )}
          >
            {item.title}
          </a>
        );
      })}
    </nav>
  );
}
