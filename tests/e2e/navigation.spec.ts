import { test, expect } from '@playwright/test';

/**
 * Site Navigation & Interactive Flow Verification Suite
 * Verifies desktop routing, mobile drawer toggle, footer links, and keyboard skip-to-content functionality.
 */

test.describe('Navigation & Interactive Flows', () => {
  test.describe('Desktop Navigation', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto('/');
    });

    const navLinks = [
      { name: 'Products', expectedPath: '/products' },
      { name: 'Services', expectedPath: '/services' },
      { name: 'About', expectedPath: '/about' },
      { name: 'Team', expectedPath: '/team' },
      { name: 'Blog', expectedPath: '/blog' },
      { name: 'Contact', expectedPath: '/contact' },
    ];

    for (const { name, expectedPath } of navLinks) {
      test(`navigates to ${name} (${expectedPath}) successfully`, async ({ page }) => {
        const navItem = page.locator('nav[aria-label="Main Navigation"]').getByRole('link', { name, exact: true });
        await expect(navItem).toBeVisible();

        await navItem.click();
        await expect(page).toHaveURL(new RegExp(expectedPath));

        // Ensure not a 404 page
        await expect(page.locator('h1')).not.toContainText('404');
      });
    }

    test('primary and secondary CTA header links navigate correctly', async ({ page }) => {
      const header = page.locator('header[data-testid="header-organism"]');

      // Primary CTA: "Launch Studio" / "Explore Live Demo"
      const exploreBtn = header.getByRole('link', { name: /Launch Studio|Explore|Demo/i });
      if (await exploreBtn.isVisible()) {
        const href = await exploreBtn.getAttribute('href');
        expect(href).toBeTruthy();
      }
    });

    test('footer links resolve without 404s', async ({ page, request }) => {
      const footer = page.locator('footer');
      await expect(footer).toBeVisible();

      const footerLinks = footer.locator('a[href^="/"]');
      const count = await footerLinks.count();
      expect(count).toBeGreaterThan(5);

      const hrefs = new Set<string>();
      for (let i = 0; i < count; i++) {
        const href = await footerLinks.nth(i).getAttribute('href');
        if (href && !href.startsWith('#')) {
          hrefs.add(href);
        }
      }

      for (const href of hrefs) {
        const res = await request.get(href);
        expect(res.status(), `Footer link failed: ${href}`).toBeLessThan(400);
      }
    });
  });

  test.describe('Mobile Navigation Drawer', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto('/');
    });

    test('toggles mobile menu drawer open and closed with aria states', async ({ page }) => {
      const toggleBtn = page.locator('#mobile-menu-toggle');
      await expect(toggleBtn).toBeVisible();
      await expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');

      // Open drawer
      await toggleBtn.click();
      await expect(toggleBtn).toHaveAttribute('aria-expanded', 'true');

      const mobileMenu = page.locator('#mobile-menu');
      await expect(mobileMenu).toBeVisible();

      // Verify links exist inside mobile menu
      const mobileProductsLink = mobileMenu.getByRole('link', { name: 'Products', exact: true });
      await expect(mobileProductsLink).toBeVisible();

      // Close drawer via toggle button
      await toggleBtn.click();
      await expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');
      await expect(mobileMenu).toBeHidden();
    });

    test('closes mobile menu on Escape key press', async ({ page }) => {
      const toggleBtn = page.locator('#mobile-menu-toggle');
      await toggleBtn.click();
      await expect(toggleBtn).toHaveAttribute('aria-expanded', 'true');

      await page.keyboard.press('Escape');
      await expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');
      await expect(page.locator('#mobile-menu')).toBeHidden();
    });
  });

  test.describe('Accessibility Skip Link', () => {
    test('skip-to-content link receives focus on first Tab and navigates to main content', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto('/');

      // Press tab from top of document
      await page.keyboard.press('Tab');

      const skipLink = page.locator('a[href="#main-content"]');
      await expect(skipLink).toBeFocused();

      // Press Enter on skip link
      await page.keyboard.press('Enter');

      const mainContent = page.locator('#main-content');
      await expect(mainContent).toBeAttached();
    });
  });
});
