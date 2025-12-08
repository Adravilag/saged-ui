import { test, expect } from '@playwright/test';

test.describe('Sidebar Navigation', () => {
  test('should persist scroll position after navigation', async ({ page }) => {
    // 1. Navigate to home
    await page.goto('/sagebox/');

    // 2. Wait for sidebar to be visible
    const sidebar = page.locator('#sidebar-nav');
    await expect(sidebar).toBeVisible();

    // 3. Scroll sidebar down
    const scrollPosition = 200;
    await sidebar.evaluate((el, pos) => {
      el.scrollTop = pos;
    }, scrollPosition);

    // Verify scroll position was set
    let currentScroll = await sidebar.evaluate(el => el.scrollTop);
    expect(currentScroll).toBe(scrollPosition);

    // 4. Click a link that exists (e.g., Input)
    // We use a selector that targets the link specifically
    const link = page.locator('a[href*="/components/input"]');
    await link.click();

    // 5. Wait for navigation
    await page.waitForURL(/\/components\/input/);

    // 6. Verify sidebar scroll position is restored
    // We allow a small margin of error (e.g., +/- 5px) although it should be exact
    await expect
      .poll(
        async () => {
          return await sidebar.evaluate(el => el.scrollTop);
        },
        {
          message: 'Sidebar scroll position should be restored',
          timeout: 5000,
        }
      )
      .toBeGreaterThan(0); // At least it shouldn't be 0

    currentScroll = await sidebar.evaluate(el => el.scrollTop);
    console.log(`Scroll position after navigation: ${currentScroll}`);

    // Ideally it should be exactly 200, but let's check if it's close
    expect(Math.abs(currentScroll - scrollPosition)).toBeLessThan(10);
  });

  test('should highlight active link correctly', async ({ page }) => {
    await page.goto('/sagebox/components/button');

    const buttonLink = page.locator('a[href*="/components/button"]');
    await expect(buttonLink).toHaveClass(/active/);
    const badgeLink = page.locator('a[href*="/components/badge"]');
    await expect(badgeLink).not.toHaveClass(/active/);
  });

  test('should toggle theme correctly', async ({ page }) => {
    await page.goto('/sagebox/');

    const themeBtn = page.locator('#theme-toggle-btn');
    await expect(themeBtn).toBeVisible();

    // Get initial theme
    const html = page.locator('html');
    const initialTheme = (await html.getAttribute('data-theme')) || 'light';

    // Click toggle
    await themeBtn.click();

    // Verify theme changed
    const newTheme = initialTheme === 'dark' ? 'light' : 'dark';
    await expect(html).toHaveAttribute('data-theme', newTheme);

    // Click again to revert
    await themeBtn.click();
    await expect(html).toHaveAttribute('data-theme', initialTheme);
  });

  test('should render navigation structure correctly', async ({ page }) => {
    await page.goto('/sagebox/');

    // Check for at least one group
    const groups = page.locator('.nav-group');
    await expect(groups.first()).toBeVisible();

    // Check for at least one nav item
    const items = page.locator('.nav-item');
    await expect(items.first()).toBeVisible();

    // Check for Design Tokens link
    const tokensLink = page.locator('a[href*="/tokens/"]');
    await expect(tokensLink).toBeVisible();
  });

  test('should have working footer links', async ({ page }) => {
    await page.goto('/sagebox/');

    // Check GitHub link
    const githubLink = page.locator('a[href="https://github.com/adravilag/sagebox"]');
    await expect(githubLink).toBeVisible();
    await expect(githubLink).toHaveAttribute('target', '_blank');
  });

  test('should navigate to home when clicking logo', async ({ page }) => {
    await page.goto('/sagebox/components/button');
    const logo = page.locator('.logo');
    await logo.click();
    await page.waitForURL(/\/sagebox\/$/);
  });

  test('should navigate to about page', async ({ page }) => {
    await page.goto('/sagebox/');
    const aboutLink = page.locator('.about-link');
    await aboutLink.click();
    await page.waitForURL(/\/sagebox\/about\/?/);
  });

  test('should render language selector', async ({ page }) => {
    await page.goto('/sagebox/');
    const langSelector = page.locator('.language-selector');
    await expect(langSelector).toBeVisible();
  });

  test('should scroll active link into view on load', async ({ page }) => {
    // Navigate to a link that is likely at the bottom of the sidebar
    // We use theme-toggle as it is the last item in the config
    await page.goto('/sagebox/components/theme-toggle');

    const sidebar = page.locator('#sidebar-nav');

    // Wait for the scroll to happen (it's in a setTimeout(0) in the component)
    // We use expect.poll to retry until it scrolls or times out
    await expect
      .poll(
        async () => {
          return await sidebar.evaluate(el => el.scrollTop);
        },
        {
          message: 'Sidebar should scroll to show active link',
          timeout: 5000,
        }
      )
      .toBeGreaterThan(0);
  });

  test('should navigate from Button to Badge', async ({ page }) => {
    // 1. Start at Button page
    await page.goto('/sagebox/components/button/');

    // 2. Find Badge link
    const badgeLink = page.locator('a[href*="/components/badge"]');
    await expect(badgeLink).toBeVisible();

    // 3. Click and verify navigation
    await badgeLink.click();
    await page.waitForURL(/\/components\/badge\/?/, { timeout: 5000 });

    // 4. Verify we are actually on the badge page
    const title = page.locator('h1.component-title');
    await expect(title).toContainText('Badge');
  });

  test('should navigate to all sidebar links', async ({ page }) => {
    // 1. Go to home to collect links
    await page.goto('/sagebox/');

    // 2. Get all sidebar links (excluding external links if any)
    const links = page.locator('.sidebar .nav-link');
    const count = await links.count();

    console.log(`Found ${count} sidebar links to test.`);

    // 3. Collect hrefs
    const hrefs: string[] = [];
    for (let i = 0; i < count; i++) {
      const href = await links.nth(i).getAttribute('href');
      if (href) hrefs.push(href);
    }

    // 4. Test each link
    for (const href of hrefs) {
      console.log(`Testing navigation to: ${href}`);

      // Find the link again (page might have reloaded)
      const link = page.locator(`.sidebar a[href="${href}"]`);

      // Ensure sidebar is visible
      await expect(link).toBeVisible();

      // Click
      await link.click();

      // Verify URL
      const expectedPath = href.replace(/\/$/, '');
      await page.waitForURL(url => url.pathname.replace(/\/$/, '') === expectedPath, { timeout: 5000 });
    }
  });

  test('should not reload page when clicking active link', async ({ page }) => {
    await page.goto('/sagebox/components/button');

    // Set a window variable
    await page.evaluate(() => ((window as any).__TEST_VAR__ = 'persisted'));

    // Click the active link (Button)
    const buttonLink = page.locator('a[href*="/components/button"]');
    await expect(buttonLink).toHaveClass(/active/);
    await buttonLink.click();

    // Wait a bit to ensure no reload happens
    await page.waitForTimeout(1000);

    // Check if variable still exists
    const val = await page.evaluate(() => (window as any).__TEST_VAR__);
    expect(val).toBe('persisted');
  });
});
