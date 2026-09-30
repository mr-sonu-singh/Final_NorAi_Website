import React from 'react';
import type { Metadata } from 'next';
import { buildMetadata, getWebSiteJsonLd, JsonLd } from '@/lib/seo';
import { ProductsIndexClient } from './ProductsIndexClient';

export const metadata: Metadata = buildMetadata({
  path: '/products',
  title: 'Applied Prototypes & Tools',
  description:
    'Four live browser prototypes built by NorAI engineers: resume shortlisting, lecture synthesis, community digests, and regional gazette reading.',
});

export default function ProductsPage() {
  return (
    <>
      <JsonLd schema={getWebSiteJsonLd()} />
      <ProductsIndexClient />
    </>
  );
}
