export interface ComparisonColumn {
  id: string;
  label: string;
  highlighted?: boolean;
}

export type ComparisonCellValue = boolean | string;

export interface ComparisonRow {
  id: string;
  label: string;
  values: Record<string, ComparisonCellValue>;
}

export type ComparisonTableVariant = 'FeatureComparison' | 'PlanComparison';

export interface ComparisonTableProps {
  heading?: string;
  columns: ComparisonColumn[];
  rows: ComparisonRow[];
  variant?: ComparisonTableVariant;
  caption?: string;
}
