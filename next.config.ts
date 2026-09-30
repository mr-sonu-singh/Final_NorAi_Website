import type { NextConfig } from 'next';
import withBundleAnalyzer from '@next/bundle-analyzer';

const isDev = process.env.NODE_ENV === 'development';

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval';
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    font-src 'self' https://fonts.gstatic.com data:;
    img-src 'self' data: blob: https:;
    connect-src 'self' https://generativelanguage.googleapis.com;
    frame-ancestors 'none';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    ${isDev ? '' : 'upgrade-insecure-requests;'}
`
  .replace(/\s{2,}/g, ' ')
  .trim();

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: cspHeader,
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  ...(!isDev
    ? [
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=31536000; includeSubDomains; preload',
        },
      ]
    : []),
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin',
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
  transpilePackages: ['lucide-react'],

  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
  },

  async redirects() {
    return [
      // Legacy marketing paths retained from earlier site structures.
      { source: '/about', destination: '/team', permanent: true },
      { source: '/faq', destination: '/contact', permanent: true },
      { source: '/pricing', destination: '/products', permanent: true },
      // The legal documents moved to the (legal)/[policy] route. The short
      // paths used to be separate pages describing accounts and billing that
      // this business does not operate, so they redirect rather than persist.
      { source: '/privacy', destination: '/privacy-policy', permanent: true },
      { source: '/terms', destination: '/terms-of-service', permanent: true },
      { source: '/legal/privacy', destination: '/privacy-policy', permanent: true },
      { source: '/legal/terms', destination: '/terms-of-service', permanent: true },
      { source: '/legal/cookies', destination: '/cookie-policy', permanent: true },
      // Retired product slugs from the pre-rename catalogue.
      { source: '/products/ai-resume-shortlister', destination: '/products/resume-shortlister', permanent: true },
      { source: '/products/community-chat-digest', destination: '/products/chat-digest', permanent: true },
      { source: '/products/news-aggregator', destination: '/products/smart-dainik-news', permanent: true },
      { source: '/products/ai-course-note-taker', destination: '/products/course-note-taker', permanent: true },
      // Common case/separator variants of the same documents.
      { source: '/privacy-policy/', destination: '/privacy-policy', permanent: true },
      { source: '/terms-of-service/', destination: '/terms-of-service', permanent: true },
    ];
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default bundleAnalyzer(nextConfig);
