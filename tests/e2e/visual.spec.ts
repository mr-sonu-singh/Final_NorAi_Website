import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

/**
 * Visual Regression & Baseline Snapshot Suite
 * Captures responsive page screenshots across desktop (1440x900) and mobile (375x812).
 * Stores baseline images in tests/e2e/__screenshots__/.
 */

const VISUAL_PAGES = [
  { path: '/', slug: 'home' },
  { path: '/products', slug: 'products' },
  { path: '/services', slug: 'services' },
  { path: '/pricing', slug: 'pricing' },
  { path: '/about', slug: 'about' },
  { path: '/team', slug: 'team' },
  { path: '/careers', slug: 'careers' },
  { path: '/contact', slug: 'contact' },
  { path: '/blog', slug: 'blog' },
  { path: '/mission', slug: 'mission' },
];

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 375, height: 812 },
];

const SCREENSHOT_DIR = path.join(process.cwd(), 'tests', 'e2e', '__screenshots__');

test.beforeAll(() => {
  if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
  }
});

test.describe('Visual Regression Baseline Snapshots', () => {
  for (const { path: pagePath, slug } of VISUAL_PAGES) {
    for (const vp of VIEWPORTS) {
      test(`captures ${vp.name} snapshot for ${slug} (${pagePath})`, async ({ page }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.goto(pagePath);
        await page.waitForLoadState('networkidle');

        // Reset scroll position to top
        await page.evaluate(() => window.scrollTo(0, 0));

        // Save baseline screenshot artifact file
        const screenshotPath = path.join(SCREENSHOT_DIR, `${slug}-${vp.name}.png`);
        await page.screenshot({
          path: screenshotPath,
          fullPage: true,
          animations: 'disabled',
        });

        expect(fs.existsSync(screenshotPath)).toBe(true);
      });
    }
  }
});
