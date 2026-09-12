import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Automated Accessibility (a11y) Verification Suite
 * Runs Axe audits across primary marketing pages and interactive flows to guarantee WCAG compliance.
 */

const A11Y_PAGES = [
  { path: '/', name: 'Homepage' },
  { path: '/products', name: 'Products Catalog' },
  { path: '/services', name: 'Enterprise Services' },
  { path: '/team', name: 'Team & Studio' },
  { path: '/mission', name: 'AI Skill Mission' },
  { path: '/docs', name: 'Developer Docs' },
  { path: '/contact', name: 'Contact & Inquiries' },
];

test.describe('Accessibility (a11y) Audits', () => {
  for (const { path, name } of A11Y_PAGES) {
    test(`audits ${name} (${path}) for zero critical or serious WCAG violations`, async ({
      page,
    }) => {
      await page.goto(path);
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(800);

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      const severeViolations = results.violations.filter(
        (v) => v.impact === 'critical' || v.impact === 'serious',
      );

      if (severeViolations.length > 0) {
        console.error(
          `Accessibility violations on ${path}:\n`,
          JSON.stringify(
            severeViolations.map((v) => ({
              id: v.id,
              impact: v.impact,
              description: v.description,
              help: v.help,
              helpUrl: v.helpUrl,
              nodes: v.nodes.map((n) => ({
                html: n.html,
                target: n.target,
                failureSummary: n.failureSummary,
              })),
            })),
            null,
            2,
          ),
        );
      }

      expect(severeViolations).toEqual([]);
    });
  }

  test('contact form page has accessible form control associations', async ({ page }) => {
    await page.goto('/contact');
    await page.waitForLoadState('domcontentloaded');

    const formAxeResults = await new AxeBuilder({ page }).include('form').analyze();

    expect(formAxeResults.violations).toEqual([]);
  });
});
