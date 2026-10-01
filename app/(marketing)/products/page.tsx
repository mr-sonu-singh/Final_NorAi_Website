import React from 'react';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { ProductsIndexClient } from './ProductsIndexClient';

export const metadata: Metadata = buildMetadata({
  path: '/products',
  title: 'Applied Prototypes & Tools',
  description:
    'Four live browser prototypes built by NorAI engineers: resume shortlisting, lecture synthesis, community digests, and regional gazette reading.',
});

/**
 * No page-level JSON-LD: the root layout already emits the site-wide
 * Organization and WebSite entities. Re-declaring WebSite here would put the
 * same @type on one page twice and leave the graph self-contradictory.
 */
export default function ProductsPage() {
  return <ProductsIndexClient />;
}
