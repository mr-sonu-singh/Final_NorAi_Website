'use client';

import React from 'react';
import { Section } from '@/components/foundation/Section';
import { Container } from '@/components/foundation/Container';
import { Heading } from '@/components/foundation/Heading';
import { Icon } from '@/components/atoms/Icon';

import { VisuallyHidden } from '@/components/foundation/VisuallyHidden';
import { EmptyState } from '@/components/molecules/EmptyState';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/utils';
import { ComparisonTableProps, ComparisonCellValue, ComparisonColumn, ComparisonRow } from './ComparisonTable.types';

export function ComparisonTable({
  heading,
  columns = [],
  rows = [],
  variant = 'FeatureComparison',
  caption,
}: ComparisonTableProps) {
  const { ref, isRevealed } = useScrollReveal<HTMLDivElement>();
  const prefersReducedMotion = usePrefersReducedMotion();

  const shouldAnimate = !prefersReducedMotion;

  const renderCellContent = (value: ComparisonCellValue | undefined) => {
    if (value === undefined || value === false) {
      return (
        <div className="flex items-center justify-center text-ink-disabled">
          <Icon name="minus" size="sm" aria-hidden="true" />
          <VisuallyHidden>Not included</VisuallyHidden>
        </div>
      );
    }

    if (value === true) {
      return (
        <div className="flex items-center justify-center text-sage-500">
          <Icon name="check" size="sm" aria-hidden="true" />
          <VisuallyHidden>Included</VisuallyHidden>
        </div>
      );
    }

    return (
      <span className="text-sm font-medium text-ink-body tabular-nums">{value}</span>
    );
  };

  const renderHeaderRow = () => (
    <tr className="border-b border-line-default bg-canvas-recessed">
      <th
        scope="col"
        className={cn(
          'sticky left-0 z-10 w-48 border-r border-line-subtle bg-canvas-recessed p-4 text-left align-bottom text-[13px] font-semibold tracking-wide text-ink-secondary',
        )}
      >
        Features / Tiers
      </th>
      {columns.map((col) => (
        <th
          key={col.id}
          scope="col"
          className={cn(
            'w-36 p-4 text-center text-sm font-semibold text-ink-primary',
            col.highlighted && 'bg-terra-50 text-terra-600',
          )}
        >
          {col.label}
          {col.highlighted ? <span className="sr-only"> (recommended)</span> : null}
        </th>
      ))}
    </tr>
  );

  const renderBodyRow = (row: ComparisonRow, rowIndex: number) => {
    const zebraBg = rowIndex % 2 === 0 ? 'bg-canvas-paper' : 'bg-canvas-base';

    return (
      <tr key={row.id} className={cn('transition-colors duration-200', zebraBg)}>
        <th
          scope="row"
          className={cn(
            'sticky left-0 z-10 border-r border-line-subtle p-4 text-left text-sm font-medium text-ink-primary',
            zebraBg,
          )}
        >
          {row.label}
        </th>
        {columns.map((col) => (
          <td
            key={`${row.id}-${col.id}`}
            className={cn('p-4 text-center', col.highlighted && 'bg-terra-50')}
          >
            {renderCellContent(row.values[col.id])}
          </td>
        ))}
      </tr>
    );
  };

  const renderTable = (_columns: ComparisonColumn[], rows: ComparisonRow[]) => (

    <div className="w-full overflow-x-auto rounded-xl border border-line-subtle bg-canvas-paper shadow-sm">
      <table className="w-full min-w-[640px] border-collapse text-left">
        <thead>{renderHeaderRow()}</thead>
        <tbody className="divide-y divide-line-subtle">
          {rows.map((row, index) => renderBodyRow(row, index))}
        </tbody>
      </table>
      {caption ? (
        <p className="px-4 py-3 text-[13px] leading-relaxed text-ink-secondary">{caption}</p>
      ) : null}
    </div>
  );

  return (
    <div ref={ref}>
      <Section
        variant="default"
        className={cn(
          'relative py-16 lg:py-24 transition-all duration-normal',
          shouldAnimate && !isRevealed && 'opacity-0 translate-y-4',
          shouldAnimate && isRevealed && 'opacity-100 translate-y-0',
        )}
        data-testid="comparison-table-organism"
        data-variant={variant}
        data-revealed={isRevealed}
      >
        <Container size="default">
          {heading ? (
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <Heading as="h2" variant="display-md" className="text-balance text-ink-primary">
                {heading}
              </Heading>
            </div>
          ) : null}

          {rows.length === 0 ? (
            <EmptyState
              title="No Comparison Features"
              description="Comparison details are currently unavailable."
              icon="layers"
            />
          ) : (
            renderTable(columns, rows)
          )}
        </Container>
      </Section>
    </div>
  );
}

export default ComparisonTable;
