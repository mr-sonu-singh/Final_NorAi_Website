import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export interface PageMetadataOptions {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
  /**
   * Emit no canonical at all. Required for the 404: a canonical on a 404 tells
   * search engines the homepage is the authoritative version of every unknown
   * URL, which is the opposite of what a 404 should say.
   */
  noCanonical?: boolean;
}

/** OG image served from /public. Must resolve, or every social share is blank. */
const DEFAULT_OG_IMAGE = '/og.png';

const BRAND_SUFFIXES = [
  /\s*[—\-|–]\s*Nor\s?Ai\s+Technologies\s*$/i,
  /\s*\|\s*Nor\s?Ai\s+Technologies\s*$/i,
  /\s*[—\-|–]\s*Nor\s?Ai\s*$/i,
  /\s*\|\s*Nor\s?Ai\s*$/i,
];

/**
 * Removes a brand suffix the caller already appended, so composing
 * `${title} | ${siteConfig.name}` cannot produce "X | NorAI | NorAI Technologies".
 */
function stripBrandSuffix(title: string): string {
  let out = title.trim();
  for (const pattern of BRAND_SUFFIXES) {
    const next = out.replace(pattern, '').trim();
    if (next !== out) out = next;
  }
  return out;
}

/**
 * Clamps a description to the 160-character search-snippet budget, cutting on
 * a word boundary so the result still reads as a sentence. Enforced here
 * rather than per page so a long excerpt can never silently overflow.
 */
function clampDescription(text: string, max = 160): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}

export function buildMetadata({
  title,
  description = siteConfig.description,
  path = '',
  image,
  noIndex = false,
  noCanonical = false,
}: PageMetadataOptions = {}): Metadata {
  const bare = title ? stripBrandSuffix(title) : '';
  const fullTitle = bare ? `${bare} | ${siteConfig.name}` : siteConfig.name;
  const summary = clampDescription(description);
  const canonicalUrl = `${siteConfig.url}${path.startsWith('/') ? path : `/${path}`}`;
  const ogImage = image
    ? `${siteConfig.url}${image.startsWith('/') ? image : `/${image}`}`
    : `${siteConfig.url}${DEFAULT_OG_IMAGE}`;

  return {
    title: fullTitle,
    description: summary,
    metadataBase: new URL(siteConfig.url),
    ...(noCanonical
      ? {}
      : {
          alternates: {
            canonical: canonicalUrl,
          },
        }),
    openGraph: {
      title: fullTitle,
      description: summary,
      url: noCanonical ? undefined : canonicalUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: summary,
      images: [ogImage],
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/icon.png', type: 'image/png', sizes: '512x512' },
      ],
      apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}
