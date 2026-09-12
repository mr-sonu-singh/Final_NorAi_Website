import { test, expect } from '@playwright/test';

/**
 * SEO & Structured Data Verification Suite
 * Verifies titles, meta descriptions, canonical URLs, JSON-LD, and H1 tags across all marketing routes.
 */

const MARKETING_PAGES = [
  { path: '/', name: 'Homepage' },
  { path: '/products', name: 'Products Catalog' },
  { path: '/products/resume-shortlister', name: 'Resume Shortlister Product' },
  { path: '/products/course-note-taker', name: 'Course Note-Taker Product' },
  { path: '/products/chat-digest', name: 'Chat Digest Product' },
  { path: '/products/smart-dainik-news', name: 'Smart Dainik News Product' },
  { path: '/services', name: 'Enterprise Services' },
  { path: '/team', name: 'Team' },
  { path: '/careers', name: 'Careers' },
  { path: '/contact', name: 'Contact' },
  { path: '/blog', name: 'Blog Hub' },
  { path: '/mission', name: 'AI Skill Mission' },
  { path: '/docs', name: 'Docs Hub' },
];

test.describe('SEO & Metadata Verification', () => {
  for (const { path, name } of MARKETING_PAGES) {
    test.describe(`Page: ${name} (${path})`, () => {
      test.beforeEach(async ({ page }) => {
        await page.goto(path);
      });

      test('has a valid and descriptive title tag', async ({ page }) => {
        const title = await page.title();
        expect(title).toBeTruthy();
        expect(title.length).toBeGreaterThan(5);
        expect(title.toLowerCase()).toContain('norai');
      });

      test('has a meta description tag with non-empty content', async ({ page }) => {
        const metaDesc = page.locator('meta[name="description"]');
        await expect(metaDesc).toHaveCount(1);
        const content = await metaDesc.getAttribute('content');
        expect(content).toBeTruthy();
        expect(content!.length).toBeGreaterThan(20);
      });

      test('has a canonical link tag', async ({ page }) => {
        const canonical = page.locator('link[rel="canonical"]');
        await expect(canonical).toHaveCount(1);
        const href = await canonical.getAttribute('href');
        expect(href).toBeTruthy();
        expect(href).toMatch(/^https?:\/\//);
      });

      test('has at least one valid JSON-LD structured data script', async ({ page }) => {
        const jsonLdScripts = page.locator('script[type="application/ld+json"]');
        const count = await jsonLdScripts.count();
        expect(count).toBeGreaterThan(0);

        for (let i = 0; i < count; i++) {
          const rawJson = await jsonLdScripts.nth(i).textContent();
          expect(rawJson).toBeTruthy();
          const parsed = JSON.parse(rawJson!);
          expect(parsed['@context']).toBe('https://schema.org');
          expect(parsed['@type']).toBeDefined();
        }
      });

      test('has exactly one <h1> heading', async ({ page }) => {
        const h1Count = await page.locator('h1').count();
        expect(h1Count).toBe(1);
      });
    });
  }

  test('all marketing page titles are unique', async ({ request }) => {
    const titles = new Map<string, string>();

    for (const { path } of MARKETING_PAGES) {
      const res = await request.get(path);
      expect(res.ok()).toBe(true);
      const html = await res.text();
      const match = html.match(/<title[^>]*>([^<]+)<\/title>/i);
      expect(match).not.toBeNull();
      const title = (match && match[1]) ? match[1].trim() : '';
      expect(title.length).toBeGreaterThan(0);

      if (titles.has(title)) {
        const existingPath = titles.get(title);
        throw new Error(`Duplicate page title "${title}" found on ${path} and ${existingPath}`);
      }
      titles.set(title, path);
    }

    expect(titles.size).toBe(MARKETING_PAGES.length);
  });
});
