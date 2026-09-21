const defaultProductionUrl = 'https://norai.tech';

function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/+$/, '');
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`.replace(/\/+$/, '');
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`.replace(/\/+$/, '');
  }
  return defaultProductionUrl;
}

export const siteConfig = {
  name: 'NorAI Technologies',
  titleTemplate: 'NorAI Technologies — Intelligence Meets Action',
  description:
    'Four single-purpose AI tools. Sub-second execution, zero data retention, and clean, reliable outputs. Engineered in Uttar Pradesh, India.',
  url: resolveSiteUrl(),
  ogImage: '/og/default.png',
  links: {
    twitter: 'https://twitter.com/noraitech',
    github: 'https://github.com/noraitech',
  },
};
