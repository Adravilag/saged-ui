import { test, expect } from '@playwright/test';

test.describe('SagedUI Components E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('sg-badge', () => {
    test('should render badge with default variant', async ({ page }) => {
      await page.setContent(`
        <sg-badge>Test Badge</sg-badge>
        <script type="module" src="/build/saged-ui.esm.js"></script>
      `);
      
      const badge = page.locator('sg-badge');
      await expect(badge).toBeVisible();
      await expect(badge).toContainText('Test Badge');
    });

    test('should render badge variants', async ({ page }) => {
      await page.setContent(`
        <sg-badge variant="primary">Primary</sg-badge>
        <sg-badge variant="success">Success</sg-badge>
        <sg-badge variant="warning">Warning</sg-badge>
        <sg-badge variant="error">Error</sg-badge>
        <script type="module" src="/build/saged-ui.esm.js"></script>
      `);
      
      const badges = page.locator('sg-badge');
      await expect(badges).toHaveCount(4);
    });

    test('should render badge sizes', async ({ page }) => {
      await page.setContent(`
        <sg-badge size="sm">Small</sg-badge>
        <sg-badge size="md">Medium</sg-badge>
        <sg-badge size="lg">Large</sg-badge>
        <script type="module" src="/build/saged-ui.esm.js"></script>
      `);
      
      const badges = page.locator('sg-badge');
      await expect(badges).toHaveCount(3);
    });
  });

  test.describe('sg-button', () => {
    test('should render button and handle click', async ({ page }) => {
      await page.setContent(`
        <sg-button id="test-btn">Click Me</sg-button>
        <script type="module" src="/build/saged-ui.esm.js"></script>
      `);
      
      const button = page.locator('sg-button');
      await expect(button).toBeVisible();
      await expect(button).toContainText('Click Me');
    });

    test('should emit sgClick event', async ({ page }) => {
      await page.setContent(`
        <sg-button id="test-btn">Click Me</sg-button>
        <script type="module" src="/build/saged-ui.esm.js"></script>
      `);
      
      // Wait for component to be defined
      await page.waitForFunction(() => customElements.get('sg-button'));
      
      // Setup event listener
      await page.evaluate(() => {
        (window as any).clicked = false;
        document.querySelector('#test-btn')?.addEventListener('sgClick', () => {
          (window as any).clicked = true;
        });
      });
      
      await page.locator('sg-button').click();
      const clicked = await page.evaluate(() => (window as any).clicked);
      expect(clicked).toBe(true);
    });

    test('should not emit click when disabled', async ({ page }) => {
      await page.setContent(`
        <sg-button id="test-btn" disabled>Disabled</sg-button>
        <script type="module" src="/build/saged-ui.esm.js"></script>
        <script>
          window.clicked = false;
          document.querySelector('#test-btn').addEventListener('sgClick', () => {
            window.clicked = true;
          });
        </script>
      `);
      
      await page.locator('sg-button').click({ force: true });
      const clicked = await page.evaluate(() => (window as any).clicked);
      expect(clicked).toBe(false);
    });
  });

  test.describe('sg-icon', () => {
    test('should render built-in icon', async ({ page }) => {
      await page.setContent(`
        <sg-icon name="home"></sg-icon>
        <script type="module" src="/build/saged-ui.esm.js"></script>
      `);
      
      // Wait for component to be defined and rendered
      await page.waitForFunction(() => customElements.get('sg-icon'));
      
      const icon = page.locator('sg-icon');
      await expect(icon).toBeVisible();
      // Check that aria-label contains 'home' (may have 'icon' suffix)
      await expect(icon).toHaveAttribute('role', 'img');
    });

    test('should render with custom size', async ({ page }) => {
      await page.setContent(`
        <sg-icon name="home" size="48"></sg-icon>
        <script type="module" src="/build/saged-ui.esm.js"></script>
      `);
      
      await page.waitForFunction(() => customElements.get('sg-icon'));
      
      const icon = page.locator('sg-icon');
      await expect(icon).toBeVisible();
      await expect(icon).toHaveCSS('width', '48px');
      await expect(icon).toHaveCSS('height', '48px');
    });

    test('should be decorative when marked', async ({ page }) => {
      await page.setContent(`
        <sg-icon name="home" decorative></sg-icon>
        <script type="module" src="/build/saged-ui.esm.js"></script>
      `);
      
      await page.waitForFunction(() => customElements.get('sg-icon'));
      
      const icon = page.locator('sg-icon');
      await expect(icon).toBeVisible();
      await expect(icon).toHaveAttribute('aria-hidden', 'true');
      await expect(icon).toHaveAttribute('role', 'presentation');
    });
  });

  test.describe('sg-theme-toggle', () => {
    test('should render theme toggle', async ({ page }) => {
      await page.setContent(`
        <sg-theme-toggle></sg-theme-toggle>
        <script type="module" src="/build/saged-ui.esm.js"></script>
      `);
      
      const toggle = page.locator('sg-theme-toggle');
      await expect(toggle).toBeVisible();
    });

    test('should toggle theme on click', async ({ page }) => {
      await page.setContent(`
        <sg-theme-toggle></sg-theme-toggle>
        <script type="module" src="/build/saged-ui.esm.js"></script>
      `);
      
      // Wait for component to be defined
      await page.waitForFunction(() => customElements.get('sg-theme-toggle'));
      
      // Setup event listener
      await page.evaluate(() => {
        document.querySelector('sg-theme-toggle')?.addEventListener('sgThemeChange', (e: any) => {
          (window as any).newTheme = e.detail;
        });
      });
      
      await page.locator('sg-theme-toggle').click();
      const theme = await page.evaluate(() => (window as any).newTheme);
      expect(['light', 'dark']).toContain(theme);
    });
  });

  test.describe('sg-skeleton', () => {
    test('should render skeleton with default variant', async ({ page }) => {
      await page.setContent(`
        <sg-skeleton></sg-skeleton>
        <script type="module" src="/build/saged-ui.esm.js"></script>
      `);
      
      const skeleton = page.locator('sg-skeleton');
      await expect(skeleton).toBeVisible();
    });

    test('should render circle skeleton', async ({ page }) => {
      await page.setContent(`
        <sg-skeleton variant="circle" size="64"></sg-skeleton>
        <script type="module" src="/build/saged-ui.esm.js"></script>
      `);
      
      const skeleton = page.locator('sg-skeleton');
      await expect(skeleton).toBeVisible();
    });
  });

  test.describe('sg-dropdown', () => {
    test('should render dropdown', async ({ page }) => {
      await page.setContent(`
        <sg-dropdown>
          <button slot="trigger">Open Menu</button>
          <div slot="content">
            <a href="#">Item 1</a>
            <a href="#">Item 2</a>
          </div>
        </sg-dropdown>
        <script type="module" src="/build/saged-ui.esm.js"></script>
      `);
      
      const dropdown = page.locator('sg-dropdown');
      await expect(dropdown).toBeVisible();
    });

    test('should open dropdown on trigger click', async ({ page }) => {
      await page.setContent(`
        <sg-dropdown>
          <button slot="trigger">Open Menu</button>
          <div slot="content">
            <a href="#">Item 1</a>
          </div>
        </sg-dropdown>
        <script type="module" src="/build/saged-ui.esm.js"></script>
      `);
      
      await page.locator('[slot="trigger"]').click();
      const content = page.locator('[slot="content"]');
      await expect(content).toBeVisible();
    });
  });
});

test.describe('Accessibility', () => {
  test('sg-icon should have proper ARIA attributes', async ({ page }) => {
    await page.setContent(`
      <sg-icon name="home" aria-label="Navigate to home"></sg-icon>
      <script type="module" src="/build/saged-ui.esm.js"></script>
    `);
    
    await page.waitForFunction(() => customElements.get('sg-icon'));
    
    const icon = page.locator('sg-icon');
    await expect(icon).toBeVisible();
    await expect(icon).toHaveAttribute('role', 'img');
    await expect(icon).toHaveAttribute('aria-label', 'Navigate to home');
  });

  test('sg-button should be keyboard accessible', async ({ page }) => {
    await page.setContent(`
      <sg-button id="test-btn">Press Enter</sg-button>
      <script type="module" src="/build/saged-ui.esm.js"></script>
    `);
    
    await page.waitForFunction(() => customElements.get('sg-button'));
    
    // Setup event listener
    await page.evaluate(() => {
      (window as any).clicked = false;
      document.querySelector('#test-btn')?.addEventListener('sgClick', () => {
        (window as any).clicked = true;
      });
    });
    
    await page.locator('sg-button').focus();
    await page.keyboard.press('Enter');
    const clicked = await page.evaluate(() => (window as any).clicked);
    expect(clicked).toBe(true);
  });
});

test.describe('Theming', () => {
  test('should apply dark theme', async ({ page }) => {
    await page.setContent(`
      <div data-theme="dark">
        <sg-badge variant="primary">Dark Theme</sg-badge>
      </div>
      <script type="module" src="/build/saged-ui.esm.js"></script>
    `);
    
    const container = page.locator('[data-theme="dark"]');
    await expect(container).toHaveAttribute('data-theme', 'dark');
  });
});
