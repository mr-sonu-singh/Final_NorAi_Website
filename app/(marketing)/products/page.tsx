import React from 'react';
import type { Metadata } from 'next';
import { buildMetadata, getWebSiteJsonLd, JsonLd } from '@/lib/seo';
import { ProductsIndexClient } from './ProductsIndexClient';

export const metadata: Metadata = buildMetadata({
  path: '/products',
  title: 'Autonomous AI Tools — Built to change what happens',
  description:
    'Explore instant-deploy autonomous AI tools for resume shortlisting, course note-taking, community chat digests, and smart public gazette news. Sub-second execution and zero data retention.',
});

export default function ProductsPage() {
  return (
    <>
      <JsonLd schema={getWebSiteJsonLd()} />
      <ProductsIndexClient />
    </>
  );
}
