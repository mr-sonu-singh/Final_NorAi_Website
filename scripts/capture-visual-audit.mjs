import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const SCREENSHOT_DIR = process.env.SCREENSHOT_DIR || "/home/gourav/.gemini/antigravity-ide/brain/93525f38-314e-49a9-92db-c8e280c176a5/screenshots";

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function runVisualAudit() {
  console.log('🚀 Starting Chromium Visual Audit for NorAI Technologies...');
  const browser = await chromium.launch({ headless: true });

  // 1. Desktop Audit (1440 x 900)
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2, // High-DPI crisp capture
  });
  const page = await context.newPage();

  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000); // Allow animations & fonts to settle

  console.log('Capturing Desktop Sections...');

  // Full Homepage
  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, '10_full_homepage.png'),
    fullPage: true,
  });

  // Section 1: Hero Chamber
  const heroSection = page.locator('section').first();
  await heroSection.screenshot({
    path: path.join(SCREENSHOT_DIR, '01_hero_chamber.png'),
  });

  // Section 2: Three Dimensions Conversation Rail
  const threeDimensions = page.locator('section').nth(1);
  if (await threeDimensions.isVisible()) {
    await threeDimensions.screenshot({
      path: path.join(SCREENSHOT_DIR, '02_three_dimensions_rail.png'),
    });
  }

  // Section 3: The Manifest Shift
  const shiftSection = page.locator('section:has-text("The Shift")').first();
  if (await shiftSection.isVisible()) {
    await shiftSection.screenshot({
      path: path.join(SCREENSHOT_DIR, '03_the_shift.png'),
    });
  }

  // Section 4: Kinetic Wave Marquee
  const marqueeSection = page.locator('.marquee__container, [class*="marquee"], section:has([class*="wave"])').first();
  if (await marqueeSection.isVisible()) {
    await marqueeSection.screenshot({
      path: path.join(SCREENSHOT_DIR, '04_kinetic_marquee.png'),
    });
  }

  // Section 5: The Capability Arc (#capabilities)
  const capabilityArc = page.locator('#capabilities');
  if (await capabilityArc.isVisible()) {
    await capabilityArc.screenshot({
      path: path.join(SCREENSHOT_DIR, '05_capability_arc.png'),
    });
  }

  // Section 6: The Sector Ledger
  const sectorLedger = page.locator('section:has-text("The Enterprise & Bharat Ledger")').first();
  if (await sectorLedger.isVisible()) {
    await sectorLedger.screenshot({
      path: path.join(SCREENSHOT_DIR, '06_sector_ledger.png'),
    });
  }

  // Section 6.5: Operating Rituals (#operating-rituals)
  const operatingRituals = page.locator('#operating-rituals');
  if (await operatingRituals.isVisible()) {
    await operatingRituals.screenshot({
      path: path.join(SCREENSHOT_DIR, '07_operating_rituals.png'),
    });
  }

  // Section 6.8: Grassroots Bharat Mission (#bharat-mission)
  const bharatMission = page.locator('#bharat-mission');
  if (await bharatMission.isVisible()) {
    await bharatMission.screenshot({
      path: path.join(SCREENSHOT_DIR, '08_bharat_mission.png'),
    });
  }

  // Section 7: Closing Dispatch (#closing-dispatch)
  const closingDispatch = page.locator('#closing-dispatch');
  if (await closingDispatch.isVisible()) {
    await closingDispatch.screenshot({
      path: path.join(SCREENSHOT_DIR, '09_closing_dispatch.png'),
    });
  }

  // Subpages: /products
  console.log('Auditing /products...');
  await page.goto('http://localhost:3000/products', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, '11_products_index.png'),
    fullPage: true,
  });

  // Subpages: /services
  console.log('Auditing /services...');
  await page.goto('http://localhost:3000/services', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, '12_services_index.png'),
    fullPage: true,
  });

  // Subpages: /mission
  console.log('Auditing /mission...');
  await page.goto('http://localhost:3000/mission', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, '13_mission_index.png'),
    fullPage: true,
  });

  // Subpages: /team
  console.log('Auditing /team...');
  await page.goto('http://localhost:3000/team', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, '17_team_index.png'),
    fullPage: true,
  });

  // Subpages: /blog
  console.log('Auditing /blog...');
  await page.goto('http://localhost:3000/blog', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, '18_blog_index.png'),
    fullPage: true,
  });

  await context.close();

  // 2. Mobile Viewport Audit (375 x 812)
  console.log('Capturing Mobile Viewports...');
  const mobileContext = await browser.newContext({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 2,
    isMobile: true,
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1000);

  await mobilePage.locator('section').first().screenshot({
    path: path.join(SCREENSHOT_DIR, '14_mobile_hero.png'),
  });

  const mobileCapabilities = mobilePage.locator('#capabilities');
  if (await mobileCapabilities.isVisible()) {
    await mobileCapabilities.screenshot({
      path: path.join(SCREENSHOT_DIR, '15_mobile_capabilities.png'),
    });
  }

  const mobileMission = mobilePage.locator('#bharat-mission');
  if (await mobileMission.isVisible()) {
    await mobileMission.screenshot({
      path: path.join(SCREENSHOT_DIR, '16_mobile_bharat_mission.png'),
    });
  }

  await mobileContext.close();
  await browser.close();

  console.log('✅ Visual audit capture completed successfully!');
  console.log(`Saved screenshots to: ${SCREENSHOT_DIR}`);
}

runVisualAudit().catch((err) => {
  console.error('Error during visual audit:', err);
  process.exit(1);
});
