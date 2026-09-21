import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export interface PageMetadataOptions {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}

export function buildMetadata({
  title,
  description = siteConfig.description,
  path = '',
  image,
  noIndex = false,
}: PageMetadataOptions = {}): Metadata {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const canonicalUrl = `${siteConfig.url}${path.startsWith('/') ? path : `/${path}`}`;
  const ogImage = image
    ? `${siteConfig.url}${image.startsWith('/') ? image : `/${image}`}`
    : `${siteConfig.url}/og.png`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
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
      description,
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
