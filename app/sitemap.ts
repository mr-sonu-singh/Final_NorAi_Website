import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { PRODUCTS_DATA } from '@/lib/products';
import { BLOG_POSTS } from '@/lib/blog';
import { LEGAL_POLICIES } from '@/lib/legal';

/**
 * Last meaningful content revision. A real date, not `new Date()`: stamping
 * every URL with the build time tells crawlers every page changed on every
 * deploy, which devalues the signal and invites the pages to be crawled less.
 */
const LAST_REVISED = new Date('2026-01-15T00:00:00.000Z');

/** Canonical, indexable, HTTP-200 routes. Redirects and the 404 are excluded. */
const STATIC_ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/products', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/mission', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/team', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/careers', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.8, changeFrequency: 'yearly' },
  { path: '/blog', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/docs', priority: 0.7, changeFrequency: 'monthly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const entries: MetadataRoute.Sitemap = STATIC_ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${baseUrl}${path}`,
    lastModified: LAST_REVISED,
    changeFrequency,
    priority,
  }));

  for (const slug of Object.keys(PRODUCTS_DATA)) {
    entries.push({
      url: `${baseUrl}/products/${slug}`,
      lastModified: LAST_REVISED,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  }

  for (const slug of Object.keys(BLOG_POSTS)) {
    entries.push({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: LAST_REVISED,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  for (const policy of Object.keys(LEGAL_POLICIES)) {
    entries.push({
      url: `${baseUrl}/${policy}`,
      lastModified: LAST_REVISED,
      changeFrequency: 'yearly',
      priority: 0.3,
    });
  }

  return entries;
}
