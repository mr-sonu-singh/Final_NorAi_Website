export interface ComparisonColumn {
  id: string;
  label: string;
  highlighted?: boolean;
}

export type ComparisonCellValue = boolean | string;

export interface ComparisonRow {
  id: string;
  label: string;
  hint?: string;
  category?: string;
  values: Record<string, ComparisonCellValue>;
}

export interface ComparisonCategory {
  name: string;
  rows: ComparisonRow[];
}

export type ComparisonTableVariant = 'FeatureComparison' | 'PlanComparison';

export interface ComparisonTableProps {
  heading?: string;
  description?: string;
  columns: ComparisonColumn[];
  rows?: ComparisonRow[];
  categories?: ComparisonCategory[];
  variant?: ComparisonTableVariant;
  caption?: string;
}
