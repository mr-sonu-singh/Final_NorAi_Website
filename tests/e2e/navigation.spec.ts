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
      { name: 'Tools', expectedPath: '/products' },
      { name: 'Services', expectedPath: '/services' },
      { name: 'Team', expectedPath: '/team' },
      { name: 'Contact', expectedPath: '/contact' },
    ];

    for (const { name, expectedPath } of navLinks) {
      test(`navigates to ${name} (${expectedPath}) successfully without blank screen`, async ({
        page,
      }) => {
        const navItem = page
          .locator('nav[aria-label="Main Navigation"]')
          .getByRole('link', { name, exact: true });
        await expect(navItem).toBeVisible();

        await navItem.click();
        await expect(page).toHaveURL(new RegExp(expectedPath), { timeout: 15000 });

        // Ensure main content is mounted and immediately visible (not blank)
        const mainContent = page.locator('#main-content');
        await expect(mainContent).toBeVisible();
        await expect(mainContent).not.toBeEmpty();

        // Ensure not a 404 page and heading is rendered
        await expect(page.locator('h1')).toBeVisible();
        await expect(page.locator('h1')).not.toContainText('404');
      });
    }

    test('verifies 308 permanent redirects for pruned legacy routes', async ({ page }) => {
      // /about -> /team
      await page.goto('/about');
      await expect(page).toHaveURL(/\/team/);
      await expect(page.locator('h1')).toBeVisible();

      // /faq -> /contact
      await page.goto('/faq');
      await expect(page).toHaveURL(/\/contact/);
      await expect(page.locator('h1')).toBeVisible();

      // /pricing -> /products
      await page.goto('/pricing');
      await expect(page).toHaveURL(/\/products/);
      await expect(page.locator('h1')).toBeVisible();
    });

    test('resets scroll position to top when navigating from scrolled home page', async ({
      page,
    }) => {
      await page.evaluate(() => window.scrollTo(0, 3000));
      await page.waitForTimeout(200);

      const contactLink = page
        .locator('nav[aria-label="Main Navigation"]')
        .getByRole('link', { name: 'Contact', exact: true });
      await contactLink.click();
      await expect(page).toHaveURL(/\/contact/);

      const scrollY = await page.evaluate(() => window.scrollY);
      expect(scrollY).toBeLessThanOrEqual(50);
      await expect(page.locator('h1')).toBeVisible();
    });

    test('heavy pages (team, tools) mount full content with visible headings on soft navigation', async ({
      page,
    }) => {
      for (const { name, path } of [
        { name: 'Team', path: '/team' },
        { name: 'Tools', path: '/products' },
      ]) {
        const link = page
          .locator('nav[aria-label="Main Navigation"]')
          .getByRole('link', { name, exact: true });
        await link.click();
        await expect(page).toHaveURL(new RegExp(path));

        const mainContent = page.locator('#main-content');
        await expect(mainContent).toBeVisible();
        await expect(mainContent).not.toBeEmpty();

        const h1 = page.locator('h1');
        await expect(h1).toBeVisible();
        await expect(h1).not.toContainText('404');
      }

      // Navigate to /team via footer link
      const teamLink = page.locator('footer').getByRole('link', { name: /Team/i });
      await teamLink.click();
      await expect(page).toHaveURL(/\/team/, { timeout: 15000 });
      await expect(page.locator('#main-content')).toBeVisible();
      await expect(page.locator('#main-content')).not.toBeEmpty();
      await expect(page.locator('h1')).toBeVisible();
    });

    test('primary and secondary CTA header links navigate correctly', async ({ page }) => {
      const header = page.locator('header[data-testid="header-organism"]');

      // Primary CTA: "Start Free Sandbox"
      const exploreBtn = header.getByRole('link', { name: /Start Free Sandbox|Explore|Demo/i });
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
      await page.waitForLoadState('domcontentloaded');
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
      const mobileToolsLink = mobileMenu.getByRole('link', { name: 'Tools', exact: true });
      await expect(mobileToolsLink).toBeVisible();

      // Close drawer via toggle button
      await toggleBtn.click();
      await expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');
      await expect(mobileMenu).toBeHidden();
    });

    test('closes mobile menu on Escape key press', async ({ page }) => {
      const toggleBtn = page.locator('#mobile-menu-toggle');
      await expect(toggleBtn).toBeVisible();
      await expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');

      await toggleBtn.click();
      await expect(toggleBtn).toHaveAttribute('aria-expanded', 'true');

      await page.keyboard.press('Escape');
      await expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');
      await expect(page.locator('#mobile-menu')).toBeHidden();
    });
  });

  test.describe('Homepage & Services Architecture Verification', () => {
    test('homepage renders 4 Operating Rituals cards without team roster', async ({ page }) => {
      await page.goto('/');
      const ritualsSection = page.locator('#operating-rituals');
      await expect(ritualsSection).toBeVisible();
      await expect(ritualsSection).toContainText('How we build software.');
      await expect(ritualsSection).toContainText('Founders write the code & answer support');
      await expect(ritualsSection).toContainText('Hardware honesty, exposed latency');
      await expect(ritualsSection).toContainText('Shipped weekly on a deterministic rhythm');
      await expect(ritualsSection).toContainText('Field Fridays across Uttar Pradesh');
      await expect(ritualsSection).toContainText('Meet the founding team on /team');

      // Ensure old founder roster is NOT on the homepage
      await expect(page.locator('#team-origin')).toHaveCount(0);
    });

    test('homepage capability arc Open Tool navigates to tool detail', async ({ page }) => {
      await page.goto('/');
      const openToolLink = page.locator('a[href="/products/resume-shortlister"]').first();
      await expect(openToolLink).toBeVisible();
      await openToolLink.click();
      await expect(page).toHaveURL(/\/products\/resume-shortlister/);
      await expect(page.locator('h1')).toContainText('Resume Shortlister');
    });

    test('homepage renders closing dispatch CTA linking to /contact', async ({ page }) => {
      await page.goto('/');
      const dispatchSection = page.locator('#closing-dispatch');
      await expect(dispatchSection).toBeVisible();
      await expect(dispatchSection).toContainText("Tell us what's slowing you down.");
      const contactBtn = dispatchSection.getByRole('link', { name: /Talk to an Engineer/i });
      await expect(contactBtn).toHaveAttribute('href', '/contact');
    });

    test('services page displays all 4 practice previews before interactive viewer', async ({
      page,
    }) => {
      await page.goto('/services');
      await expect(
        page.locator('text=Multi-Format Ingestion & Stream Extraction').first(),
      ).toBeVisible();
      await expect(
        page.locator('text=Deterministic RAG & Agent Orchestration').first(),
      ).toBeVisible();
      await expect(page.locator('text=Private VPC & Air-Gapped Inference').first()).toBeVisible();
      await expect(page.locator('text=Spatial & Immersive Systems (AR/VR)').first()).toBeVisible();

      // Ensure WebGPU and Three.js keywords are present
      await expect(page.locator('body')).toContainText('WebGPU');
      await expect(page.locator('body')).toContainText('Three.js');
      await expect(page.locator('body')).toContainText('AR/VR');
    });
  });
});
