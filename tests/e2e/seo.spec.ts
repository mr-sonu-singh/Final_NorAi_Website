import { test, expect } from '@playwright/test';

/**
 * SEO, metadata and structured-data integrity across all 25 canonical routes.
 *
 * The route table mirrors `app/sitemap.ts` (9 static + 4 product detail +
 * 9 blog posts + 3 legal). Titles, descriptions and canonicals must be unique
 * and self-consistent, and every URL the site asks a crawler to index must be
 * a real 200 — a canonical that points at a redirect or a 404 is worse than no
 * canonical at all.
 */

const PRODUCTION_ORIGIN = 'https://norai.tech';

const STATIC_ROUTES = [
  '/',
  '/products',
  '/services',
  '/mission',
  '/team',
  '/careers',
  '/contact',
  '/blog',
  '/docs',
] as const;

const PRODUCT_ROUTES = [
  '/products/resume-shortlister',
  '/products/course-note-taker',
  '/products/chat-digest',
  '/products/smart-dainik-news',
] as const;

const BLOG_SLUGS = [
  'ai-agent-orchestration-architecture',
  'rag-vector-search-best-practices',
  'mcp-protocol-developer-tooling',
  'automated-resume-screening-patterns',
  'operational-discipline-devops-reliability',
  'deploying-open-weight-llms-vllm-awq',
  'multimodal-audio-video-synthesis-latex',
  'zero-hallucination-enterprise-guardrails',
  'vernacular-nlp-hindi-english-gazette-parsing',
] as const;

const BLOG_ROUTES = BLOG_SLUGS.map((s) => `/blog/${s}`) as ReadonlyArray<`/blog/${string}`>;

const LEGAL_ROUTES = ['/privacy-policy', '/terms-of-service', '/cookie-policy'] as const;

const CANONICAL_ROUTES: readonly string[] = [
  ...STATIC_ROUTES,
  ...PRODUCT_ROUTES,
  ...BLOG_ROUTES,
  ...LEGAL_ROUTES,
];

const UNKNOWN_PATHS = ['/products/nope', '/blog/nope', '/nonexistent'] as const;

/** A page with more text than this is a wall of copy, not a description. */
const MAX_DESCRIPTION_LENGTH = 320;

/** Every @type declared by the JSON-LD on the current page, flattened. */
async function jsonLdTypes(page: import('@playwright/test').Page): Promise<string[]> {
  const scripts = await page.locator('script[type="application/ld+json"]').allTextContents();
  return scripts.flatMap((raw) => {
    const value = (JSON.parse(raw) as Record<string, unknown>)['@type'];
    return Array.isArray(value) ? (value as string[]) : [value as string];
  });
}

function canonicalUrl(path: string): string {
  return path === '/' ? PRODUCTION_ORIGIN : `${PRODUCTION_ORIGIN}${path}`;
}

test.describe('per-page metadata', () => {
  for (const path of CANONICAL_ROUTES) {
    test(`${path} exposes complete, correct and unique SEO metadata`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status(), `${path} must be a 200`).toBe(200);

      // --- <html lang> ---
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');

      // --- <title> ---
      const title = await page.title();
      expect(title, `${path} has no <title>`).not.toBe('');
      expect(title.length, `${path} title is too short`).toBeGreaterThan(10);
      expect(title.length, `${path} title is too long`).toBeLessThan(120);
      expect(title.toLowerCase(), `${path} title is missing the brand`).toContain('norai');
      await expect(page.locator('title')).toHaveCount(1);

      // --- meta description ---
      const descriptions = page.locator('head meta[name="description"]');
      await expect(descriptions, `${path} must declare exactly one description`).toHaveCount(1);
      const description = (await descriptions.getAttribute('content')) ?? '';
      expect(description.length, `${path} description is too short`).toBeGreaterThan(20);
      expect(description.length, `${path} description is too long`).toBeLessThan(
        MAX_DESCRIPTION_LENGTH,
      );

      // --- canonical ---
      const canonicals = page.locator('head link[rel="canonical"]');
      await expect(canonicals, `${path} must declare exactly one canonical`).toHaveCount(1);
      const href = (await canonicals.getAttribute('href')) ?? '';
      expect(href, `${path} canonical is not absolute`).toMatch(/^https:\/\//);
      // No trailing slash, no query string, no fragment: one URL per document.
      expect(href, `${path} canonical must equal ${canonicalUrl(path)}`).toBe(canonicalUrl(path));

      // --- indexability ---
      const robots = (await page.locator('head meta[name="robots"]').getAttribute('content')) ?? '';
      expect(robots, `${path} is not indexable`).toContain('index');
      expect(robots, `${path} is blocked from crawling`).not.toContain('nofollow');

      // --- headings ---
      const h1s = page.getByRole('heading', { level: 1 });
      await expect(h1s, `${path} must have exactly one h1`).toHaveCount(1);
      await expect(h1s, `${path} h1 is not visible`).toBeVisible();
      expect(((await h1s.innerText()) ?? '').trim(), `${path} h1 is empty`).not.toBe('');
      await expect(page.locator('h1')).toHaveCount(1);
      expect(await page.locator('h2').count(), `${path} has no section headings`).toBeGreaterThan(0);

      // --- Open Graph ---
      const og = async (property: string) =>
        (await page.locator(`head meta[property="og:${property}"]`).getAttribute('content')) ?? '';
      expect(await og('title'), `${path} is missing og:title`).not.toBe('');
      expect(await og('description'), `${path} is missing og:description`).not.toBe('');
      expect(await og('type'), `${path} is missing og:type`).not.toBe('');
      expect(await og('site_name')).toBe('NorAI Technologies');
      expect(await og('image')).toMatch(/^https:\/\//);
      // The share card must point at the same document the canonical claims.
      expect(await og('url'), `${path} og:url disagrees with its canonical`).toBe(href);

      // --- Twitter / X card ---
      const twitterCard =
        (await page.locator('head meta[name="twitter:card"]').getAttribute('content')) ?? '';
      expect(twitterCard, `${path} is missing twitter:card`).not.toBe('');
      const twitterTitle =
        (await page.locator('head meta[name="twitter:title"]').getAttribute('content')) ?? '';
      expect(twitterTitle, `${path} is missing twitter:title`).not.toBe('');

      // --- JSON-LD ---
      const jsonLd = await page.locator('script[type="application/ld+json"]').allTextContents();
      expect(jsonLd.length, `${path} has no structured data`).toBeGreaterThan(0);
      for (const [index, raw] of jsonLd.entries()) {
        expect(raw, `${path} JSON-LD #${index} is empty`).not.toBe('');
        let parsed: Record<string, unknown>;
        try {
          parsed = JSON.parse(raw) as Record<string, unknown>;
        } catch {
          throw new Error(`${path} JSON-LD #${index} is not valid JSON: ${raw.slice(0, 200)}`);
        }
        expect(parsed['@context'], `${path} JSON-LD #${index} has a foreign @context`).toBe(
          'https://schema.org',
        );
        expect(parsed['@type'], `${path} JSON-LD #${index} has no @type`).toBeTruthy();
      }

      // --- no environment leakage ---
      const html = await page.content();
      expect(html, `${path} leaks a localhost URL`).not.toContain('localhost');
      expect(html, `${path} leaks a staging port`).not.toContain(':3000');
    });
  }
});

test.describe('cross-page consistency', () => {
  test('every canonical page has a distinct title', async ({ request }) => {
    const seen = new Map<string, string>();

    for (const path of CANONICAL_ROUTES) {
      const res = await request.get(path);
      expect(res.status(), `${path} is not reachable`).toBe(200);

      const match = (await res.text()).match(/<title[^>]*>([^<]*)<\/title>/i);
      expect(match, `${path} rendered no <title>`).not.toBeNull();
      const title = (match?.[1] ?? '').trim();
      expect(title, `${path} rendered an empty <title>`).not.toBe('');

      const clash = seen.get(title);
      expect(clash, `duplicate <title> "${title}" on ${path} and ${clash}`).toBeUndefined();
      seen.set(title, path);
    }

    expect(seen.size).toBe(CANONICAL_ROUTES.length);
  });

  test('no two canonical pages share a meta description', async ({ request }) => {
    const seen = new Map<string, string>();

    for (const path of CANONICAL_ROUTES) {
      const html = await (await request.get(path)).text();
      const match = html.match(/<meta name="description" content="([^"]*)"/i);
      expect(match, `${path} rendered no meta description`).not.toBeNull();

      const description = match?.[1] ?? '';
      expect(description, `${path} rendered an empty meta description`).not.toBe('');

      const clash = seen.get(description);
      expect(clash, `duplicate meta description on ${path} and ${clash}`).toBeUndefined();
      seen.set(description, path);
    }

    expect(seen.size).toBe(CANONICAL_ROUTES.length);
  });

  test('every route in the table really exists', async ({ request }) => {
    for (const path of CANONICAL_ROUTES) {
      const res = await request.get(path, { maxRedirects: 0 });
      expect(res.status(), `${path} is listed as canonical but is not a 200`).toBe(200);
      expect(res.headers().location, `${path} is listed as canonical but redirects`).toBeUndefined();
    }
  });

  test('the homepage declares organization, website and local business entities', async ({ page }) => {
    await page.goto('/');
    const types = await jsonLdTypes(page);
    expect(types).toContain('Organization');
    expect(types).toContain('WebSite');
    expect(types).toContain('LocalBusiness');
  });

  test('every product detail page declares the app and its breadcrumb trail', async ({ page }) => {
    for (const path of PRODUCT_ROUTES) {
      await page.goto(path);
      const types = await jsonLdTypes(page);
      expect(types, `${path} declares no SoftwareApplication entity`).toContain('SoftwareApplication');
      expect(types, `${path} declares no BreadcrumbList entity`).toContain('BreadcrumbList');
    }
  });

  /**
   * A post describes itself the way a product page describes itself. This used to
   * emit nothing but the layout's Organization and WebSite, so a crawler had no
   * article entity at all. The values are checked against the post's own rendered
   * text, and the forbidden keys make sure nothing is invented: these posts carry
   * no ratings, review counts, word counts or hero images.
   */
  test('every blog post declares an article entity built from its own content', async ({ page }) => {
    for (const path of BLOG_ROUTES) {
      await page.goto(path);
      const types = await jsonLdTypes(page);
      expect(types, `${path} declares no BlogPosting entity`).toContain('BlogPosting');
      expect(types, `${path} declares no BreadcrumbList entity`).toContain('BreadcrumbList');

      const raw = await page.locator('script[type="application/ld+json"]').allTextContents();
      const articles = raw
        .map((script) => JSON.parse(script) as Record<string, unknown>)
        .filter((schema) => schema['@type'] === 'BlogPosting');
      expect(articles, `${path} emitted ${articles.length} BlogPosting entities`).toHaveLength(1);
      const article = articles[0]!;

      const title = (await page.locator('h1').first().innerText()).trim();
      expect(article.headline, `${path} headline is not the rendered h1`).toBe(title);
      expect(article.url, `${path} url is not absolute`).toBe(canonicalUrl(path));
      expect(String(article.datePublished), `${path} datePublished is not ISO 8601`).toMatch(
        /^\d{4}-\d{2}-\d{2}$/,
      );
      expect(article.dateModified, `${path} dateModified disagrees with datePublished`).toBe(
        article.datePublished,
      );

      const author = article.author as { '@type'?: string; name?: string; jobTitle?: string };
      expect(author['@type']).toBe('Person');
      expect(author.name, `${path} names no author`).toBeTruthy();
      const byline = (await page.locator('main').first().innerText()).trim();
      expect(byline, `${path} byline does not show the declared author`).toContain(author.name!);
      if (author.jobTitle) {
        expect(byline, `${path} byline does not show the declared author role`).toContain(
          author.jobTitle,
        );
      }

      const description = (await page
        .locator('head meta[name="description"]')
        .getAttribute('content')) ?? '';
      // `buildMetadata` clamps the description to the 160-character snippet
      // budget, so the entity carries the full excerpt and the meta tag its
      // clamped form. The two must still be the same sentence.
      const excerpt = String(article.description);
      expect(excerpt.length, `${path} article description is empty`).toBeGreaterThan(20);
      expect(
        description === excerpt || description === `${excerpt.slice(0, description.length - 1).trimEnd()}…`,
        `${path} meta description "${description}" is not the article description "${excerpt}"`,
      ).toBe(true);

      for (const invented of ['aggregateRating', 'review', 'wordCount', 'image', 'thumbnailUrl']) {
        expect(article, `${path} invents "${invented}", which this post does not have`).not.toHaveProperty(
          invented,
        );
      }
    }
  });

  /**
   * The root layout already emits the site-wide Organization and WebSite for
   * every route, so a page that re-declared them put the same @type on one
   * document twice — `/team`, `/products` and `/contact` all did, and the
   * homepage repeated Organization. Each top-level entity is now declared by
   * exactly one emitter, and a repeat fails here.
   */
  test('no page declares the same top-level entity twice', async ({ page }) => {
    for (const path of CANONICAL_ROUTES) {
      await page.goto(path);
      const types = await jsonLdTypes(page);
      const seen = new Map<string, number>();
      for (const type of types) seen.set(type, (seen.get(type) ?? 0) + 1);
      const duplicated = [...seen.entries()].filter(([, count]) => count > 1);
      expect(duplicated, `${path} declares a duplicated entity: ${JSON.stringify(duplicated)}`).toEqual(
        [],
      );
    }
  });

  test('og:title, twitter:title and <title> never disagree', async ({ page }) => {
    for (const path of CANONICAL_ROUTES) {
      await page.goto(path);
      const title = await page.title();
      const ogTitle = (await page.locator('head meta[property="og:title"]').getAttribute('content')) ?? '';
      const twitterTitle =
        (await page.locator('head meta[name="twitter:title"]').getAttribute('content')) ?? '';

      expect(ogTitle, `${path} og:title disagrees with <title>`).toBe(title);
      expect(twitterTitle, `${path} twitter:title disagrees with <title>`).toBe(title);
      expect(
        (await page.locator('head meta[property="og:description"]').getAttribute('content')) ?? '',
        `${path} og:description disagrees with the meta description`,
      ).toBe((await page.locator('head meta[name="description"]').getAttribute('content')) ?? '');
    }
  });
});

test.describe('sitemap.xml', () => {
  test('is a well-formed urlset listing exactly the canonical routes', async ({ request }) => {
    const res = await request.get('/sitemap.xml');
    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toContain('xml');

    const xml = await res.text();
    expect(xml.startsWith('<?xml')).toBe(true);
    expect(xml).toContain('<urlset');

    const locations = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]!);
    expect(locations).toHaveLength(CANONICAL_ROUTES.length);
    expect([...locations].sort()).toEqual(CANONICAL_ROUTES.map(canonicalUrl).sort());

    for (const loc of locations) {
      expect(loc, `${loc} is not absolute`).toMatch(/^https:\/\//);
      expect(new URL(loc).origin, `${loc} points at the wrong origin`).toBe(PRODUCTION_ORIGIN);
      expect(loc).not.toContain('localhost');
    }
    expect(new Set(locations).size).toBe(locations.length);
  });

  test('gives every URL a lastmod, a changefreq and a priority', async ({ request }) => {
    const xml = await (await request.get('/sitemap.xml')).text();
    const entries = xml.split('<url>').slice(1);
    expect(entries.length).toBe(CANONICAL_ROUTES.length);

    for (const entry of entries) {
      const loc = entry.match(/<loc>([^<]+)<\/loc>/)?.[1] ?? '(no loc)';
      expect(entry, `${loc} has no <lastmod>`).toMatch(/<lastmod>[^<]+<\/lastmod>/);
      expect(entry, `${loc} has no <changefreq>`).toMatch(/<changefreq>[^<]+<\/changefreq>/);
      const priority = Number(entry.match(/<priority>([^<]+)<\/priority>/)?.[1]);
      expect(Number.isFinite(priority), `${loc} has no <priority>`).toBe(true);
      expect(priority).toBeGreaterThan(0);
      expect(priority).toBeLessThanOrEqual(1);
    }
  });

  test('never submits a redirect or a 404', async ({ request }) => {
    const xml = await (await request.get('/sitemap.xml')).text();
    const locations = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]!).pathname);

    for (const path of locations) {
      const res = await request.get(path, { maxRedirects: 0 });
      expect(res.status(), `${path} is in the sitemap but answers ${res.status()}`).toBe(200);
    }

    for (const dead of ['/about', '/capabilities', '/journal', '/privacy', '/legal']) {
      expect(locations, `${dead} is a redirect and must not be in the sitemap`).not.toContain(dead);
    }
  });
});

test.describe('robots.txt', () => {
  test('allows the site, blocks the API and points at the production sitemap', async ({ request }) => {
    const res = await request.get('/robots.txt');
    expect(res.status()).toBe(200);

    const body = await res.text();
    expect(body).toMatch(/User-Agent:\s*\*/i);
    expect(body).toMatch(/Allow:\s*\/\s*$/m);
    expect(body).toMatch(/Disallow:\s*\/api\//i);
    expect(body).toContain(`Sitemap: ${PRODUCTION_ORIGIN}/sitemap.xml`);
    expect(body).not.toContain('localhost');
  });
});

test.describe('feed.xml', () => {
  test('is a valid RSS 2.0 feed with one item per blog post', async ({ request }) => {
    const res = await request.get('/feed.xml');
    expect(res.status()).toBe(200);

    const xml = await res.text();
    expect(xml.startsWith('<?xml')).toBe(true);
    expect(xml).toContain('<rss version="2.0"');
    expect(xml).toContain('<channel>');

    const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((m) => m[1]!);
    expect(items).toHaveLength(BLOG_SLUGS.length);

    const linkedPaths = items.map((item) => new URL(item.match(/<link>([^<]+)<\/link>/)![1]!).pathname);
    expect([...linkedPaths].sort()).toEqual([...BLOG_ROUTES].sort());
    expect(new Set(linkedPaths).size).toBe(BLOG_SLUGS.length);

    for (const item of items) {
      expect(item.match(/<title>/)).not.toBeNull();
      expect(item.match(/<pubDate>/)).not.toBeNull();
      expect(item).not.toContain('localhost');
    }

    expect(xml).toContain(`<atom:link href="${PRODUCTION_ORIGIN}/feed.xml"`);
  });
});

test.describe('error pages', () => {
  for (const path of UNKNOWN_PATHS) {
    test(`${path} is excluded from indexing and claims no canonical`, async ({ request }) => {
      const res = await request.get(path);
      expect(res.status()).toBe(404);

      const html = await res.text();
      expect(html, `${path} is indexable`).toMatch(
        /<meta name="robots" content="noindex/,
      );
      expect(html, `${path} still emits a canonical`).not.toContain('rel="canonical"');
      // No og:url: a 404 must never claim a URL identity for itself.
      expect(html, `${path} still advertises an og:url`).not.toContain('property="og:url"');
      expect(html, `${path} leaks a localhost URL`).not.toContain('localhost');
    });
  }

  test('the 404 title is distinct from every canonical title', async ({ request }) => {
    const canonicalTitles = new Set<string>();
    for (const path of CANONICAL_ROUTES) {
      const html = await (await request.get(path)).text();
      canonicalTitles.add(html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim() ?? '');
    }

    const html = await (await request.get('/nonexistent')).text();
    const notFoundTitle = html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim() ?? '';
    expect(notFoundTitle).not.toBe('');
    expect(canonicalTitles.has(notFoundTitle)).toBe(false);
  });
});