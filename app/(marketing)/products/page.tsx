import React from 'react';
import type { Metadata } from 'next';
import { buildMetadata, getWebSiteJsonLd, JsonLd } from '@/lib/seo';
import { ProductsIndexClient } from './ProductsIndexClient';

export const metadata: Metadata = buildMetadata({
  path: '/products',
  title: 'Applied Prototypes & Tools — NorAI Technologies',
  description:
    'Explore live applied prototypes engineered by NorAI Technologies and student fellows: Resume shortlisting, lecture synthesis, community digests, and regional civic news.',
});

export default function ProductsPage() {
  return (
    <>
      <JsonLd schema={getWebSiteJsonLd()} />
      <ProductsIndexClient />
    </>
  );
}
