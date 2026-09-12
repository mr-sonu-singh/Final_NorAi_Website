import React from 'react';
import { siteConfig } from '@/config/site';
import type { ProductData } from '@/lib/products';

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export interface FAQItemSchema {
  question: string;
  answer: string;
}

/**
 * Helper component to safely render JSON-LD script tags
 */
export function JsonLd({
  schema,
}: {
  schema: Record<string, unknown> | Array<Record<string, unknown>>;
}) {
  return React.createElement('script', {
    type: 'application/ld+json',
    dangerouslySetInnerHTML: { __html: JSON.stringify(schema) },
  });
}

/**
 * Organization Schema
 */
export function getOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/icon.svg`,
    description: siteConfig.description,
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'Uttar Pradesh',
      addressCountry: 'IN',
    },
    sameAs: [siteConfig.links.twitter, siteConfig.links.github].filter(Boolean),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'technical support',
      url: `${siteConfig.url}/contact`,
    },
  };
}

/**
 * WebSite Schema with SearchAction
 */
export function getWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      '@id': `${siteConfig.url}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/products?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * LocalBusiness Schema (NorAI Technologies in Uttar Pradesh, India)
 */
export function getLocalBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteConfig.url}/#localbusiness`,
    name: siteConfig.name,
    url: siteConfig.url,
    description:
      'NorAI Technologies engineers deterministic micro-SaaS utilities and bespoke enterprise AI automation pipelines with sub-second latency targets in Uttar Pradesh, India.',
    image: `${siteConfig.url}/icon.svg`,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'Uttar Pradesh',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      addressCountry: 'IN',
    },
  };
}

/**
 * SoftwareApplication Schema (for self-serve micro-SaaS products)
 */
export function getSoftwareApplicationJsonLd(product: ProductData) {
  const applicationCategories: Record<string, string> = {
    'resume-shortlister': 'BusinessApplication',
    'course-note-taker': 'EducationalApplication',
    'chat-digest': 'CommunicationApplication',
    'smart-dainik-news': 'NewsApplication',
  };

  const startingPrice = product.pricing?.[0]?.price?.replace(/[^0-9.]/g, '') || '0';

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: product.title,
    applicationCategory: applicationCategories[product.slug] || 'BusinessApplication',
    operatingSystem: 'Web, Cloud',
    description: product.excerpt || product.tagline,
    url: `${siteConfig.url}/products/${product.slug}`,
    offers: product.pricing?.map((tier) => ({
      '@type': 'Offer',
      name: tier.tier,
      price: tier.price.replace(/[^0-9.]/g, '') || '0',
      priceCurrency: 'USD',
      description: tier.desc,
      availability: 'https://schema.org/InStock',
    })) || [
      {
        '@type': 'Offer',
        price: startingPrice,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
    ],
    featureList: product.features?.map((f) => f.title).join(', '),
    author: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

/**
 * Enterprise Service Schema (Bespoke Enterprise AI Solutions)
 */
export function getServiceJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Enterprise AI Engineering & Automation Pipelines',
    name: 'Bespoke Enterprise AI Solutions',
    description:
      'Custom Retrieval-Augmented Generation (RAG) vector search engines, Model Context Protocol (MCP) tool servers, LLM cost optimization, and private VPC inference deployments.',
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Worldwide',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Enterprise AI Practices',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'RAG Systems & Vector Search',
            description:
              'Enterprise vector search pipelines, hybrid retrieval, and multi-document indexing engines.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Model Context Protocol (MCP) Servers',
            description:
              'Standardized MCP tool and resource servers connecting LLMs directly to private databases.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'LLM Stack Optimization & Cost Auditing',
            description: 'Prompt compression, semantic caching, and deterministic model routing.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Custom AI Web Applications',
            description:
              'Full-stack Next.js and React web applications powered by sub-second neural inference.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Business Automation Pipelines',
            description:
              'Automated data entry, ERP ingestion, and multi-app background worker queues.',
          },
        },
      ],
    },
  };
}

/**
 * FAQPage Schema
 */
export function getFAQPageJsonLd(items: FAQItemSchema[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

/**
 * BreadcrumbList Schema
 */
export function getBreadcrumbListJsonLd(crumbs: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.path.startsWith('http') ? crumb.path : `${siteConfig.url}${crumb.path}`,
    })),
  };
}
