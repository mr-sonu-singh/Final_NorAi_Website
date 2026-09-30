'use client';

import React from 'react';
import { Section } from '@/components/foundation/Section';
import { Container } from '@/components/foundation/Container';
import { Heading } from '@/components/foundation/Heading';
import { Text } from '@/components/foundation/Text';
import { Check, Minus } from 'lucide-react';
import { VisuallyHidden } from '@/components/foundation/VisuallyHidden';
import { EmptyState } from '@/components/molecules/EmptyState';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/utils';
import { ComparisonTableProps, ComparisonCellValue, ComparisonRow } from './ComparisonTable.types';

export function ComparisonTable({
  heading,
  description,
  columns = [],
  rows = [],
  categories,
  variant = 'FeatureComparison',
  caption,
}: ComparisonTableProps) {
  const { ref, isRevealed } = useScrollReveal<HTMLDivElement>();
  const prefersReducedMotion = usePrefersReducedMotion();

  const shouldAnimate = !prefersReducedMotion;

  const renderCellContent = (value: ComparisonCellValue | undefined) => {
    if (value === undefined || value === false) {
      return (
        <div className="flex items-center justify-center text-ink-muted">
          <Minus className="h-4 w-4" aria-hidden="true" />
          <VisuallyHidden>Not included</VisuallyHidden>
        </div>
      );
    }

    if (value === true) {
      return (
        <div className="flex items-center justify-center text-sage-600">
          <Check className="h-4 w-4 stroke-[2.5]" aria-hidden="true" />
          <VisuallyHidden>Included</VisuallyHidden>
        </div>
      );
    }

    return (
      <span className="font-mono text-sm font-medium text-ink-primary tabular-nums">{value}</span>
    );
  };

  const renderHeaderRow = () => (
    <tr className="border-b border-line-strong bg-canvas-recessed">
      <th
        scope="col"
        className={cn(
          'sticky left-0 z-20 w-64 border-r border-line-subtle bg-canvas-recessed p-4 text-left align-bottom text-[13px] font-semibold tracking-wide text-ink-secondary',
        )}
      >
        Features & Specifications
      </th>
      {columns.map((col) => (
        <th
          key={col.id}
          scope="col"
          className={cn(
            'w-44 p-4 text-center text-sm font-semibold text-ink-primary transition-colors',
            col.highlighted && 'bg-accent-subtle/50 text-accent-primary font-bold',
          )}
        >
          <div className="flex flex-col items-center gap-1">
            <span>{col.label}</span>
            {col.highlighted && (
              <span className="rounded-full bg-accent-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider on-accent-fill">
                Recommended
              </span>
            )}
          </div>
        </th>
      ))}
    </tr>
  );

  const renderBodyRow = (row: ComparisonRow, rowIndex: number) => {
    const zebraBg = rowIndex % 2 === 0 ? 'bg-canvas-paper' : 'bg-canvas-base';

    return (
      <tr key={row.id} className={cn('transition-colors duration-150', zebraBg)}>
        <th
          scope="row"
          className={cn(
            'sticky left-0 z-10 border-r border-line-subtle p-4 text-left font-normal text-ink-primary',
            zebraBg,
          )}
        >
          <div className="space-y-0.5">
            <span className="text-sm font-medium text-ink-primary">{row.label}</span>
            {row.hint && <p className="text-xs text-ink-secondary">{row.hint}</p>}
          </div>
        </th>
        {columns.map((col) => (
          <td
            key={`${row.id}-${col.id}`}
            className={cn(
              'p-4 text-center align-middle',
              col.highlighted &&
                (rowIndex % 2 === 0 ? 'bg-accent-subtle/25' : 'bg-accent-subtle/35'),
            )}
          >
            {renderCellContent(row.values[col.id])}
          </td>
        ))}
      </tr>
    );
  };

  const renderCategoryHeader = (categoryName: string, catIndex: number) => (
    <tr key={`cat-${catIndex}`} className="border-y border-line-strong bg-canvas-recessed/80">
      <th
        colSpan={columns.length + 1}
        scope="colgroup"
        className="px-4 py-3 text-left font-mono text-[11px] font-bold uppercase tracking-wider text-ink-secondary"
      >
        {categoryName}
      </th>
    </tr>
  );

  const renderTableContent = () => {
    if (categories && categories.length > 0) {
      return (
        <tbody className="divide-y divide-line-subtle">
          {categories.map((cat, catIdx) => (
            <React.Fragment key={cat.name}>
              {renderCategoryHeader(cat.name, catIdx)}
              {cat.rows.map((row, rIdx) => renderBodyRow(row, rIdx))}
            </React.Fragment>
          ))}
        </tbody>
      );
    }

    return (
      <tbody className="divide-y divide-line-subtle">
        {rows.map((row, index) => renderBodyRow(row, index))}
      </tbody>
    );
  };

  const hasData = (categories && categories.length > 0) || (rows && rows.length > 0);

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
            <div className="mx-auto mb-10 max-w-2xl text-center space-y-3">
              <p className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-accent-primary">
                Detailed Matrix
              </p>
              <Heading as="h2" variant="display-md" className="text-balance text-ink-primary">
                {heading}
              </Heading>
              {description && (
                <Text variant="body-md" className="text-ink-body">
                  {description}
                </Text>
              )}
            </div>
          ) : null}

          {!hasData ? (
            <EmptyState
              title="No Comparison Features"
              description="Comparison details are currently unavailable."
              icon="layers"
            />
          ) : (
            <div className="w-full overflow-hidden rounded-2xl border border-line-subtle bg-canvas-paper shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[680px] border-collapse text-left">
                  <thead>{renderHeaderRow()}</thead>
                  {renderTableContent()}
                </table>
              </div>
              {caption ? (
                <div className="border-t border-line-subtle bg-canvas-recessed/50 px-5 py-3.5">
                  <p className="font-mono text-xs leading-relaxed text-ink-secondary">
                    ℹ️ {caption}
                  </p>
                </div>
              ) : null}
            </div>
          )}
        </Container>
      </Section>
    </div>
  );
}

export default ComparisonTable;
