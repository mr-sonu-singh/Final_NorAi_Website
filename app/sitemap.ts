import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { PRODUCTS_DATA } from '@/lib/products';
import { BLOG_POSTS } from '@/lib/blog';
import { LEGAL_POLICIES } from '@/lib/legal';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const staticRoutes = [
    '',
    '/products',
    '/services',
    '/team',
    '/mission',
    '/blog',
    '/docs',
    '/contact',
  ];
  const productRoutes = Object.keys(PRODUCTS_DATA).map((slug) => `/products/${slug}`);
  const blogRoutes = Object.keys(BLOG_POSTS).map((slug) => `/blog/${slug}`);
  const legalRoutes = Object.keys(LEGAL_POLICIES).map((policy) => `/${policy}`);

  const allRoutes = [...staticRoutes, ...productRoutes, ...blogRoutes, ...legalRoutes];

  return allRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : route.startsWith('/products') || route === '/services' ? 0.9 : 0.8,
  }));
}
