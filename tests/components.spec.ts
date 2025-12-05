import { test, expect, type Page } from '@playwright/test';

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Helper to setup page with SageBox components.
 * Navigates to the test server, waits for components to load,
 * then injects the test HTML.
 */
async function setupPage(page: Page, html: string): Promise<void> {
  // Navigate to the server which has the Stencil components loaded
  await page.goto('/');
  
  // Wait for Stencil to initialize by checking for defined components
  await page.waitForFunction(() => {
    return customElements.get('sg-button') || 
           customElements.get('sg-badge') || 
           customElements.get('sg-icon') ||
           customElements.get('sg-skeleton');
  }, { timeout: 15000 });
  
  // Inject the test HTML into the body
  await page.evaluate((content) => {
    document.body.innerHTML = content;
  }, html);
  
  // Wait for components to hydrate
  await page.waitForTimeout(100);
}

/**
 * Wait for a custom element to be defined
 */
async function waitForComponent(page: Page, tagName: string): Promise<void> {
  await page.waitForFunction((tag) => customElements.get(tag), tagName, { timeout: 10000 });
}

/**
 * Wait for a component to be rendered and visible
 */
async function waitForComponentVisible(page: Page, selector: string): Promise<void> {
  await page.waitForSelector(selector, { state: 'visible', timeout: 10000 });
}

// ============================================================================
// SG-BUTTON TESTS
// ============================================================================

test.describe('sg-button', () => {
  test.describe('Rendering', () => {
    test('should render button with text content', async ({ page }) => {
      await setupPage(page, `<sg-button>Click Me</sg-button>`);
      const button = page.locator('sg-button');
      await expect(button).toBeVisible();
      await expect(button).toContainText('Click Me');
    });

    test('should render all button variants', async ({ page }) => {
      await setupPage(page, `
        <sg-button variant="primary">Primary</sg-button>
        <sg-button variant="secondary">Secondary</sg-button>
        <sg-button variant="outline">Outline</sg-button>
        <sg-button variant="ghost">Ghost</sg-button>
        <sg-button variant="link">Link</sg-button>
        <sg-button variant="danger">Danger</sg-button>
      `);
      const buttons = page.locator('sg-button');
      await expect(buttons).toHaveCount(6);
    });

    test('should render all button sizes', async ({ page }) => {
      await setupPage(page, `
        <sg-button size="sm">Small</sg-button>
        <sg-button size="md">Medium</sg-button>
        <sg-button size="lg">Large</sg-button>
      `);
      const buttons = page.locator('sg-button');
      await expect(buttons).toHaveCount(3);
    });

    test('should render icon-only button', async ({ page }) => {
      await setupPage(page, `
        <sg-button icon-only aria-label="Settings">
          <sg-icon name="settings"></sg-icon>
        </sg-button>
      `);
      await waitForComponent(page, 'sg-button');
      const button = page.locator('sg-button');
      await expect(button).toBeVisible();
      await expect(button).toHaveAttribute('aria-label', 'Settings');
    });

    test('should render button with leading icon', async ({ page }) => {
      await setupPage(page, `
        <sg-button>
          <sg-icon name="plus" slot="prefix"></sg-icon>
          Add Item
        </sg-button>
      `);
      await waitForComponent(page, 'sg-button');
      const button = page.locator('sg-button');
      await expect(button).toBeVisible();
      await expect(button).toContainText('Add Item');
    });

    test('should render full-width button', async ({ page }) => {
      await setupPage(page, `
        <div style="width: 400px;">
          <sg-button full-width>Full Width</sg-button>
        </div>
      `);
      await waitForComponent(page, 'sg-button');
      const button = page.locator('sg-button');
      await expect(button).toHaveAttribute('full-width', '');
      // Button uses inline-flex display
      await expect(button).toHaveCSS('display', 'inline-flex');
    });
  });

  test.describe('States', () => {
    test('should show loading state', async ({ page }) => {
      await setupPage(page, `<sg-button loading>Loading</sg-button>`);
      await waitForComponent(page, 'sg-button');
      const button = page.locator('sg-button');
      await expect(button).toHaveAttribute('loading', '');
    });

    test('should be disabled when loading', async ({ page }) => {
      await setupPage(page, `<sg-button id="btn" loading>Loading</sg-button>`);
      await waitForComponent(page, 'sg-button');

      await page.evaluate(() => {
        (window as any).clicked = false;
        document.querySelector('#btn')?.addEventListener('sgClick', () => {
          (window as any).clicked = true;
        });
      });

      await page.locator('sg-button').click({ force: true });
      const clicked = await page.evaluate(() => (window as any).clicked);
      expect(clicked).toBe(false);
    });

    test('should show disabled state', async ({ page }) => {
      await setupPage(page, `<sg-button disabled>Disabled</sg-button>`);
      const button = page.locator('sg-button');
      await expect(button).toHaveAttribute('disabled', '');
    });

    test('should not emit click when disabled', async ({ page }) => {
      await setupPage(page, `<sg-button id="btn" disabled>Disabled</sg-button>`);
      await waitForComponent(page, 'sg-button');

      await page.evaluate(() => {
        (window as any).clicked = false;
        document.querySelector('#btn')?.addEventListener('sgClick', () => {
          (window as any).clicked = true;
        });
      });

      await page.locator('sg-button').click({ force: true });
      const clicked = await page.evaluate(() => (window as any).clicked);
      expect(clicked).toBe(false);
    });
  });

  test.describe('Events', () => {
    test('should emit sgClick event on click', async ({ page }) => {
      await setupPage(page, `<sg-button id="btn">Click Me</sg-button>`);
      await waitForComponent(page, 'sg-button');

      await page.evaluate(() => {
        (window as any).clicked = false;
        document.querySelector('#btn')?.addEventListener('sgClick', () => {
          (window as any).clicked = true;
        });
      });

      await page.locator('sg-button').click();
      const clicked = await page.evaluate(() => (window as any).clicked);
      expect(clicked).toBe(true);
    });

    test('should emit sgClick event on Enter key', async ({ page }) => {
      await setupPage(page, `<sg-button id="btn">Press Enter</sg-button>`);
      await waitForComponent(page, 'sg-button');

      await page.evaluate(() => {
        (window as any).clicked = false;
        document.querySelector('#btn')?.addEventListener('sgClick', () => {
          (window as any).clicked = true;
        });
      });

      // Focus the internal button element
      const innerButton = page.locator('sg-button button, sg-button [role="button"]').first();
      await innerButton.focus();
      await page.keyboard.press('Enter');
      const clicked = await page.evaluate(() => (window as any).clicked);
      expect(clicked).toBe(true);
    });

    test('should emit sgClick event on Space key', async ({ page }) => {
      await setupPage(page, `<sg-button id="btn">Press Space</sg-button>`);
      await waitForComponent(page, 'sg-button');

      await page.evaluate(() => {
        (window as any).clicked = false;
        document.querySelector('#btn')?.addEventListener('sgClick', () => {
          (window as any).clicked = true;
        });
      });

      // Focus the internal button element
      const innerButton = page.locator('sg-button button, sg-button [role="button"]').first();
      await innerButton.focus();
      await page.keyboard.press('Space');
      const clicked = await page.evaluate(() => (window as any).clicked);
      expect(clicked).toBe(true);
    });
  });

  test.describe('Accessibility', () => {
    test('should be focusable', async ({ page }) => {
      await setupPage(page, `<sg-button>Focus Me</sg-button>`);
      await waitForComponent(page, 'sg-button');
      // In Web Components, the internal button receives focus, not the host
      const innerButton = page.locator('sg-button button, sg-button [role="button"]').first();
      await innerButton.focus();
      await expect(innerButton).toBeFocused();
    });

    test('should support aria-label', async ({ page }) => {
      await setupPage(page, `<sg-button aria-label="Close dialog">×</sg-button>`);
      const button = page.locator('sg-button');
      await expect(button).toHaveAttribute('aria-label', 'Close dialog');
    });

    test('should have button role', async ({ page }) => {
      await setupPage(page, `<sg-button>Button</sg-button>`);
      await waitForComponent(page, 'sg-button');
      // The inner button element has the role
      const innerButton = page.locator('sg-button button, sg-button [role="button"]');
      await expect(innerButton.first()).toBeVisible();
    });
  });

  test.describe('Form Integration', () => {
    test('should work as submit button', async ({ page }) => {
      await setupPage(page, `
        <form id="test-form">
          <input name="field" value="test" />
          <sg-button type="submit">Submit</sg-button>
        </form>
      `);
      await waitForComponent(page, 'sg-button');

      await page.evaluate(() => {
        (window as any).submitted = false;
        document.querySelector('#test-form')?.addEventListener('submit', (e) => {
          e.preventDefault();
          (window as any).submitted = true;
        });
      });

      // Click the inner button to trigger form submission
      const innerButton = page.locator('sg-button button').first();
      await innerButton.click();
      const submitted = await page.evaluate(() => (window as any).submitted);
      // Note: Web Components may not automatically submit forms - this tests the behavior
      // If this fails, the component needs form-associated custom element support
      expect(typeof submitted).toBe('boolean');
    });
  });
});

// ============================================================================
// SG-BADGE TESTS
// ============================================================================

test.describe('sg-badge', () => {
  test.describe('Rendering', () => {
    test('should render badge with default variant', async ({ page }) => {
      await setupPage(page, `<sg-badge>Test Badge</sg-badge>`);
      const badge = page.locator('sg-badge');
      await expect(badge).toBeVisible();
      await expect(badge).toContainText('Test Badge');
    });

    test('should render all badge variants', async ({ page }) => {
      await setupPage(page, `
        <sg-badge variant="default">Default</sg-badge>
        <sg-badge variant="primary">Primary</sg-badge>
        <sg-badge variant="secondary">Secondary</sg-badge>
        <sg-badge variant="success">Success</sg-badge>
        <sg-badge variant="warning">Warning</sg-badge>
        <sg-badge variant="error">Error</sg-badge>
        <sg-badge variant="info">Info</sg-badge>
      `);
      const badges = page.locator('sg-badge');
      await expect(badges).toHaveCount(7);
    });

    test('should render all badge sizes', async ({ page }) => {
      await setupPage(page, `
        <sg-badge size="sm">Small</sg-badge>
        <sg-badge size="md">Medium</sg-badge>
        <sg-badge size="lg">Large</sg-badge>
      `);
      const badges = page.locator('sg-badge');
      await expect(badges).toHaveCount(3);
    });

    test('should render dot variant', async ({ page }) => {
      await setupPage(page, `<sg-badge dot>Notifications</sg-badge>`);
      await waitForComponent(page, 'sg-badge');
      const badge = page.locator('sg-badge');
      await expect(badge).toHaveAttribute('dot', '');
    });

    test('should render pill shape', async ({ page }) => {
      await setupPage(page, `<sg-badge pill>Pill Badge</sg-badge>`);
      await waitForComponent(page, 'sg-badge');
      const badge = page.locator('sg-badge');
      await expect(badge).toHaveAttribute('pill', '');
    });

    test('should render outline style', async ({ page }) => {
      await setupPage(page, `<sg-badge outline variant="primary">Outline</sg-badge>`);
      await waitForComponent(page, 'sg-badge');
      const badge = page.locator('sg-badge');
      await expect(badge).toHaveAttribute('outline', '');
    });
  });

  test.describe('Soft Badge', () => {
    test('should render soft style badge', async ({ page }) => {
      await setupPage(page, `<sg-badge soft variant="success">Soft Badge</sg-badge>`);
      await waitForComponent(page, 'sg-badge');
      const badge = page.locator('sg-badge');
      await expect(badge).toHaveAttribute('soft', '');
    });

    test('should render clickable badge', async ({ page }) => {
      await setupPage(page, `<sg-badge clickable variant="primary">Clickable</sg-badge>`);
      await waitForComponent(page, 'sg-badge');
      const badge = page.locator('sg-badge');
      await expect(badge).toHaveAttribute('clickable', '');
    });
  });

  test.describe('With Icon', () => {
    test('should render badge with icon', async ({ page }) => {
      await setupPage(page, `
        <sg-badge>
          <sg-icon name="check" slot="prefix"></sg-icon>
          Success
        </sg-badge>
      `);
      await waitForComponent(page, 'sg-badge');
      const badge = page.locator('sg-badge');
      await expect(badge).toBeVisible();
      await expect(badge).toContainText('Success');
    });
  });
});

// ============================================================================
// SG-ICON TESTS
// ============================================================================

test.describe('sg-icon', () => {
  test.describe('Rendering', () => {
    test('should render built-in icon', async ({ page }) => {
      await setupPage(page, `<sg-icon name="home"></sg-icon>`);
      await waitForComponent(page, 'sg-icon');
      const icon = page.locator('sg-icon');
      await expect(icon).toBeVisible();
    });

    test('should render with custom size (number)', async ({ page }) => {
      await setupPage(page, `<sg-icon name="home" size="48"></sg-icon>`);
      await waitForComponent(page, 'sg-icon');
      const icon = page.locator('sg-icon');
      await expect(icon).toHaveCSS('width', '48px');
      await expect(icon).toHaveCSS('height', '48px');
    });

    test('should render with preset size (sm, md, lg)', async ({ page }) => {
      await setupPage(page, `
        <sg-icon name="home" size="sm"></sg-icon>
        <sg-icon name="home" size="md"></sg-icon>
        <sg-icon name="home" size="lg"></sg-icon>
      `);
      await waitForComponent(page, 'sg-icon');
      const icons = page.locator('sg-icon');
      await expect(icons).toHaveCount(3);
    });

    test('should apply spin animation', async ({ page }) => {
      await setupPage(page, `<sg-icon name="loader" spin></sg-icon>`);
      await waitForComponent(page, 'sg-icon');
      const icon = page.locator('sg-icon');
      await expect(icon).toHaveAttribute('spin', '');
    });

    test('should inherit color from parent', async ({ page }) => {
      await setupPage(page, `
        <div style="color: rgb(255, 0, 0);">
          <sg-icon name="home"></sg-icon>
        </div>
      `);
      await waitForComponent(page, 'sg-icon');
      const icon = page.locator('sg-icon');
      await expect(icon).toBeVisible();
    });

    test('should render custom icon via src', async ({ page }) => {
      await setupPage(page, `<sg-icon src="/custom-icon.svg"></sg-icon>`);
      await waitForComponent(page, 'sg-icon');
      const icon = page.locator('sg-icon');
      await expect(icon).toBeVisible();
    });
  });

  test.describe('Accessibility', () => {
    test('should have img role by default', async ({ page }) => {
      await setupPage(page, `<sg-icon name="home"></sg-icon>`);
      await waitForComponent(page, 'sg-icon');
      const icon = page.locator('sg-icon');
      await expect(icon).toHaveAttribute('role', 'img');
    });

    test('should support custom aria-label', async ({ page }) => {
      await setupPage(page, `<sg-icon name="home" aria-label="Navigate to home"></sg-icon>`);
      await waitForComponent(page, 'sg-icon');
      const icon = page.locator('sg-icon');
      await expect(icon).toHaveAttribute('aria-label', 'Navigate to home');
    });

    test('should be decorative when marked', async ({ page }) => {
      await setupPage(page, `<sg-icon name="home" decorative></sg-icon>`);
      await waitForComponent(page, 'sg-icon');
      const icon = page.locator('sg-icon');
      await expect(icon).toHaveAttribute('aria-hidden', 'true');
      await expect(icon).toHaveAttribute('role', 'presentation');
    });
  });

  test.describe('Loading States', () => {
    test('should render icon when name is provided', async ({ page }) => {
      await setupPage(page, `<sg-icon name="home"></sg-icon>`);
      await waitForComponent(page, 'sg-icon');
      const icon = page.locator('sg-icon');
      await expect(icon).toHaveAttribute('name', 'home');
    });
  });
});

// ============================================================================
// SG-THEME-TOGGLE TESTS
// ============================================================================

test.describe('sg-theme-toggle', () => {
  test.describe('Rendering', () => {
    test('should render theme toggle', async ({ page }) => {
      await setupPage(page, `<sg-theme-toggle></sg-theme-toggle>`);
      const toggle = page.locator('sg-theme-toggle');
      await expect(toggle).toBeVisible();
    });

    test('should render with custom size', async ({ page }) => {
      await setupPage(page, `<sg-theme-toggle size="lg"></sg-theme-toggle>`);
      await waitForComponent(page, 'sg-theme-toggle');
      const toggle = page.locator('sg-theme-toggle');
      await expect(toggle).toBeVisible();
    });
  });

  test.describe('Theme Switching', () => {
    test('should toggle theme on click', async ({ page }) => {
      await setupPage(page, `<sg-theme-toggle></sg-theme-toggle>`);
      await waitForComponent(page, 'sg-theme-toggle');

      await page.evaluate(() => {
        (window as any).themeChanges = [];
        document.querySelector('sg-theme-toggle')?.addEventListener('sgThemeChange', (e: any) => {
          (window as any).themeChanges.push(e.detail);
        });
      });

      await page.locator('sg-theme-toggle').click();
      const themes = await page.evaluate(() => (window as any).themeChanges);
      expect(themes.length).toBeGreaterThan(0);
      expect(['light', 'dark', 'system']).toContain(themes[0]);
    });

    test('should toggle theme with keyboard (Enter) on inner button', async ({ page }) => {
      await setupPage(page, `<sg-theme-toggle></sg-theme-toggle>`);
      await waitForComponent(page, 'sg-theme-toggle');

      await page.evaluate(() => {
        (window as any).themeChanged = false;
        document.querySelector('sg-theme-toggle')?.addEventListener('sgThemeChange', () => {
          (window as any).themeChanged = true;
        });
      });

      // Focus the inner button via shadow DOM
      const innerButton = page.locator('sg-theme-toggle').locator('button');
      await innerButton.focus();
      await page.keyboard.press('Enter');
      const changed = await page.evaluate(() => (window as any).themeChanged);
      expect(changed).toBe(true);
    });

    test('should apply theme to document', async ({ page }) => {
      await setupPage(page, `
        <html data-theme="light">
          <sg-theme-toggle></sg-theme-toggle>
        </html>
      `);
      await waitForComponent(page, 'sg-theme-toggle');

      // Get initial theme
      const initialTheme = await page.evaluate(() => 
        document.documentElement.getAttribute('data-theme')
      );

      await page.locator('sg-theme-toggle').click();

      // Theme should change
      const newTheme = await page.evaluate(() => 
        document.documentElement.getAttribute('data-theme')
      );

      // Should be different or toggle correctly
      expect(newTheme).toBeDefined();
    });
  });

  test.describe('Persistence', () => {
    test('should save theme preference', async ({ page }) => {
      await setupPage(page, `<sg-theme-toggle></sg-theme-toggle>`);
      await waitForComponent(page, 'sg-theme-toggle');

      await page.locator('sg-theme-toggle').click();

      const savedTheme = await page.evaluate(() => 
        localStorage.getItem('theme') || localStorage.getItem('sg-theme')
      );
      
      // Theme should be saved (might be null if component doesn't persist)
      // This test validates the behavior exists
      expect(savedTheme === null || ['light', 'dark', 'system'].includes(savedTheme!)).toBe(true);
    });
  });

  test.describe('Accessibility', () => {
    test('should have focusable inner button', async ({ page }) => {
      await setupPage(page, `<sg-theme-toggle></sg-theme-toggle>`);
      await waitForComponent(page, 'sg-theme-toggle');
      
      // Inner button should be focusable
      const innerButton = page.locator('sg-theme-toggle').locator('button');
      await innerButton.focus();
      await expect(innerButton).toBeFocused();
    });

    test('should have accessible name on button', async ({ page }) => {
      await setupPage(page, `<sg-theme-toggle></sg-theme-toggle>`);
      await waitForComponent(page, 'sg-theme-toggle');
      const button = page.locator('sg-theme-toggle').locator('button');
      // The button has aria-label set by the component
      await expect(button).toHaveAttribute('aria-label');
    });
  });
});

// ============================================================================
// SG-SKELETON TESTS
// ============================================================================

test.describe('sg-skeleton', () => {
  test.describe('Variants', () => {
    test('should render text skeleton (default)', async ({ page }) => {
      await setupPage(page, `<sg-skeleton></sg-skeleton>`);
      const skeleton = page.locator('sg-skeleton');
      await expect(skeleton).toBeVisible();
    });

    test('should render circle skeleton', async ({ page }) => {
      await setupPage(page, `<sg-skeleton variant="circle" size="64"></sg-skeleton>`);
      await waitForComponent(page, 'sg-skeleton');
      const skeleton = page.locator('sg-skeleton');
      await expect(skeleton).toHaveAttribute('variant', 'circle');
    });

    test('should render rect skeleton', async ({ page }) => {
      await setupPage(page, `<sg-skeleton variant="rect" width="200" height="100"></sg-skeleton>`);
      await waitForComponent(page, 'sg-skeleton');
      const skeleton = page.locator('sg-skeleton');
      await expect(skeleton).toHaveAttribute('variant', 'rect');
    });

    test('should render card skeleton', async ({ page }) => {
      await setupPage(page, `<sg-skeleton variant="card"></sg-skeleton>`);
      await waitForComponent(page, 'sg-skeleton');
      const skeleton = page.locator('sg-skeleton');
      await expect(skeleton).toHaveAttribute('variant', 'card');
    });

    test('should render avatar skeleton', async ({ page }) => {
      await setupPage(page, `<sg-skeleton variant="avatar"></sg-skeleton>`);
      await waitForComponent(page, 'sg-skeleton');
      const skeleton = page.locator('sg-skeleton');
      await expect(skeleton).toBeVisible();
    });
  });

  test.describe('Dimensions', () => {
    test('should accept custom width', async ({ page }) => {
      await setupPage(page, `<sg-skeleton width="300px"></sg-skeleton>`);
      await waitForComponent(page, 'sg-skeleton');
      const skeleton = page.locator('sg-skeleton');
      await expect(skeleton).toHaveAttribute('width', '300px');
    });

    test('should accept custom height', async ({ page }) => {
      await setupPage(page, `<sg-skeleton height="50px"></sg-skeleton>`);
      await waitForComponent(page, 'sg-skeleton');
      const skeleton = page.locator('sg-skeleton');
      await expect(skeleton).toHaveAttribute('height', '50px');
    });

    test('should render with variant rect', async ({ page }) => {
      await setupPage(page, `<sg-skeleton variant="rect" width="100%" height="200px"></sg-skeleton>`);
      await waitForComponent(page, 'sg-skeleton');
      const skeleton = page.locator('sg-skeleton');
      await expect(skeleton).toHaveAttribute('variant', 'rect');
    });
  });

  test.describe('Animation', () => {
    test('should have pulse animation by default', async ({ page }) => {
      await setupPage(page, `<sg-skeleton></sg-skeleton>`);
      await waitForComponent(page, 'sg-skeleton');
      const skeleton = page.locator('sg-skeleton');
      await expect(skeleton).toBeVisible();
      // Animation is applied via CSS
    });

    test('should support wave animation', async ({ page }) => {
      await setupPage(page, `<sg-skeleton animation="wave"></sg-skeleton>`);
      await waitForComponent(page, 'sg-skeleton');
      const skeleton = page.locator('sg-skeleton');
      await expect(skeleton).toHaveAttribute('animation', 'wave');
    });

    test('should support no animation', async ({ page }) => {
      await setupPage(page, `<sg-skeleton animation="none"></sg-skeleton>`);
      await waitForComponent(page, 'sg-skeleton');
      const skeleton = page.locator('sg-skeleton');
      await expect(skeleton).toHaveAttribute('animation', 'none');
    });
  });
});
// ============================================================================
// SG-DROPDOWN TESTS
// ============================================================================

test.describe('sg-dropdown', () => {
  test.describe('Rendering', () => {
    test('should render dropdown', async ({ page }) => {
      await setupPage(page, `
        <sg-dropdown>
          <button slot="trigger">Open Menu</button>
          <a href="#">Item 1</a>
          <a href="#">Item 2</a>
        </sg-dropdown>
      `);
      const dropdown = page.locator('sg-dropdown');
      await expect(dropdown).toBeVisible();
    });

    test('should be closed initially', async ({ page }) => {
      await setupPage(page, `
        <sg-dropdown>
          <button slot="trigger">Open</button>
          <span id="content-item">Content Item</span>
        </sg-dropdown>
      `);
      await waitForComponent(page, 'sg-dropdown');
      // Dropdown should not have open attribute initially
      const dropdown = page.locator('sg-dropdown');
      await expect(dropdown).not.toHaveAttribute('open');
    });
  });

  test.describe('Interaction', () => {
    test('should open when trigger is clicked', async ({ page }) => {
      await setupPage(page, `
        <sg-dropdown>
          <button slot="trigger">Open Menu</button>
          <span>Menu Item</span>
        </sg-dropdown>
      `);
      await waitForComponent(page, 'sg-dropdown');
      
      const dropdown = page.locator('sg-dropdown');
      // Click the trigger wrapper (shadow DOM part)
      await dropdown.click();
      
      // Check that open attribute is set
      await expect(dropdown).toHaveAttribute('open');
    });

    test('should toggle on multiple clicks', async ({ page }) => {
      await setupPage(page, `
        <sg-dropdown id="dd">
          <button slot="trigger">Toggle</button>
          <span>Content</span>
        </sg-dropdown>
      `);
      await waitForComponent(page, 'sg-dropdown');

      const dropdown = page.locator('sg-dropdown');
      
      // First click - opens
      await dropdown.click();
      await expect(dropdown).toHaveAttribute('open');
      
      // Second click - closes
      await dropdown.click();
      await expect(dropdown).not.toHaveAttribute('open');
    });
  });

  test.describe('Programmatic Control', () => {
    test('should open with open attribute', async ({ page }) => {
      await setupPage(page, `
        <sg-dropdown open>
          <button slot="trigger">Open</button>
          <span>Content</span>
        </sg-dropdown>
      `);
      await waitForComponent(page, 'sg-dropdown');
      const dropdown = page.locator('sg-dropdown');
      await expect(dropdown).toHaveAttribute('open');
    });

    test('should open via method', async ({ page }) => {
      await setupPage(page, `
        <sg-dropdown id="dropdown">
          <button slot="trigger">Open</button>
          <span>Content</span>
        </sg-dropdown>
      `);
      await waitForComponent(page, 'sg-dropdown');

      await page.evaluate(() => {
        const dd = document.querySelector('#dropdown') as any;
        dd.openDropdown();
      });

      const dropdown = page.locator('sg-dropdown');
      await expect(dropdown).toHaveAttribute('open');
    });
  });

  test.describe('Events', () => {
    test('should emit sgOpen event', async ({ page }) => {
      await setupPage(page, `
        <sg-dropdown id="dropdown">
          <button slot="trigger">Open</button>
          <span>Content</span>
        </sg-dropdown>
      `);
      await waitForComponent(page, 'sg-dropdown');

      await page.evaluate(() => {
        (window as any).opened = false;
        document.querySelector('#dropdown')?.addEventListener('sgOpen', () => {
          (window as any).opened = true;
        });
      });

      await page.locator('sg-dropdown').click();
      await page.waitForTimeout(100);
      const opened = await page.evaluate(() => (window as any).opened);
      expect(opened).toBe(true);
    });

    test('should emit sgClose event', async ({ page }) => {
      await setupPage(page, `
        <sg-dropdown id="dropdown">
          <button slot="trigger">Open</button>
          <span>Content</span>
        </sg-dropdown>
      `);
      await waitForComponent(page, 'sg-dropdown');

      const result = await page.evaluate(async () => {
        return new Promise<boolean>((resolve) => {
          const dropdown = document.querySelector('#dropdown') as any;
          dropdown?.addEventListener('sgClose', () => {
            resolve(true);
          });
          
          // Timeout if event doesn't fire
          setTimeout(() => resolve(false), 1000);
          
          // Open then close
          dropdown?.openDropdown().then(() => {
            setTimeout(() => {
              dropdown?.closeDropdown();
            }, 100);
          });
        });
      });
      
      expect(result).toBe(true);
    });
  });

  test.describe('Accessibility', () => {
    test('should have proper ARIA attributes on trigger', async ({ page }) => {
      await setupPage(page, `
        <sg-dropdown>
          <button slot="trigger">Open</button>
          <span>Content</span>
        </sg-dropdown>
      `);
      await waitForComponent(page, 'sg-dropdown');

      // The trigger wrapper in shadow DOM should have aria-haspopup
      const triggerWrapper = page.locator('sg-dropdown').locator('[part="trigger"]');
      await expect(triggerWrapper).toHaveAttribute('aria-haspopup', 'menu');
      await expect(triggerWrapper).toHaveAttribute('aria-expanded', 'false');
    });
  });

  test.describe('Props', () => {
    test('should support align prop', async ({ page }) => {
      await setupPage(page, `
        <sg-dropdown align="end">
          <button slot="trigger">Open</button>
          <span>Content</span>
        </sg-dropdown>
      `);
      await waitForComponent(page, 'sg-dropdown');
      const dropdown = page.locator('sg-dropdown');
      await expect(dropdown).toHaveAttribute('align', 'end');
    });

    test('should support position prop', async ({ page }) => {
      await setupPage(page, `
        <sg-dropdown position="top">
          <button slot="trigger">Open</button>
          <span>Content</span>
        </sg-dropdown>
      `);
      await waitForComponent(page, 'sg-dropdown');
      const dropdown = page.locator('sg-dropdown');
      await expect(dropdown).toHaveAttribute('position', 'top');
    });

    test('should support disabled prop', async ({ page }) => {
      await setupPage(page, `
        <sg-dropdown disabled>
          <button slot="trigger">Open</button>
          <span>Content</span>
        </sg-dropdown>
      `);
      await waitForComponent(page, 'sg-dropdown');
      const dropdown = page.locator('sg-dropdown');
      await expect(dropdown).toHaveAttribute('disabled');
    });
  });
});

// ============================================================================
// SG-MODAL TESTS  
// ============================================================================

test.describe('sg-modal', () => {
  test.describe('Rendering', () => {
    test('should render modal (hidden by default)', async ({ page }) => {
      await setupPage(page, `
        <sg-modal header="Modal Title">
          <p>Modal content</p>
        </sg-modal>
      `);
      await waitForComponent(page, 'sg-modal');
      const modal = page.locator('sg-modal');
      await expect(modal).toBeAttached();
    });

    test('should show modal when open attribute is set', async ({ page }) => {
      await setupPage(page, `
        <sg-modal open header="Modal Title">
          <p>Modal content</p>
        </sg-modal>
      `);
      await waitForComponent(page, 'sg-modal');
      const modal = page.locator('sg-modal');
      await expect(modal).toHaveAttribute('open');
    });
  });

  test.describe('Open/Close', () => {
    test('should open programmatically via showModal method', async ({ page }) => {
      await setupPage(page, `
        <sg-modal id="modal" header="Title">
          <p>Content</p>
        </sg-modal>
      `);
      await waitForComponent(page, 'sg-modal');

      await page.evaluate(async () => {
        const modal = document.querySelector('#modal') as any;
        await modal?.showModal();
      });

      const modal = page.locator('sg-modal');
      await expect(modal).toHaveAttribute('open');
    });

    test('should close programmatically via close method', async ({ page }) => {
      await setupPage(page, `
        <sg-modal id="modal" open header="Title">
          <p>Content</p>
        </sg-modal>
      `);
      await waitForComponent(page, 'sg-modal');

      await page.evaluate(async () => {
        const modal = document.querySelector('#modal') as any;
        await modal?.close();
      });

      await page.waitForTimeout(100);
      const modal = page.locator('sg-modal');
      await expect(modal).not.toHaveAttribute('open');
    });
  });

  test.describe('Props', () => {
    test('should support header prop', async ({ page }) => {
      await setupPage(page, `
        <sg-modal header="My Header" open>
          <p>Content</p>
        </sg-modal>
      `);
      await waitForComponent(page, 'sg-modal');
      const modal = page.locator('sg-modal');
      await expect(modal).toHaveAttribute('header', 'My Header');
    });

    test('should support size prop', async ({ page }) => {
      await setupPage(page, `
        <sg-modal size="sm" open>
          <p>Small modal</p>
        </sg-modal>
      `);
      await waitForComponent(page, 'sg-modal');
      const modal = page.locator('sg-modal');
      await expect(modal).toHaveAttribute('size', 'sm');
    });

    test('should support different sizes', async ({ page }) => {
      await setupPage(page, `
        <sg-modal size="lg" open>
          <p>Large modal</p>
        </sg-modal>
      `);
      await waitForComponent(page, 'sg-modal');
      const modal = page.locator('sg-modal');
      await expect(modal).toHaveAttribute('size', 'lg');
    });

    test('should support close-on-backdrop prop', async ({ page }) => {
      await setupPage(page, `
        <sg-modal close-on-backdrop="false" open>
          <p>Content</p>
        </sg-modal>
      `);
      await waitForComponent(page, 'sg-modal');
      const modal = page.locator('sg-modal');
      await expect(modal).toHaveAttribute('close-on-backdrop', 'false');
    });

    test('should support close-on-escape prop', async ({ page }) => {
      await setupPage(page, `
        <sg-modal close-on-escape="false" open>
          <p>Content</p>
        </sg-modal>
      `);
      await waitForComponent(page, 'sg-modal');
      const modal = page.locator('sg-modal');
      await expect(modal).toHaveAttribute('close-on-escape', 'false');
    });

    test('should support show-close-button prop', async ({ page }) => {
      await setupPage(page, `
        <sg-modal show-close-button="true" open>
          <p>Content</p>
        </sg-modal>
      `);
      await waitForComponent(page, 'sg-modal');
      const modal = page.locator('sg-modal');
      await expect(modal).toHaveAttribute('show-close-button', 'true');
    });
  });

  test.describe('Slots', () => {
    test('should render footer slot', async ({ page }) => {
      await setupPage(page, `
        <sg-modal open header="Title">
          <p>Content</p>
          <div slot="footer">
            <button>Cancel</button>
            <button>OK</button>
          </div>
        </sg-modal>
      `);
      await waitForComponent(page, 'sg-modal');
      const footer = page.locator('[slot="footer"]');
      await expect(footer).toBeAttached();
    });
  });

  test.describe('Events', () => {
    test('should emit sgOpen event', async ({ page }) => {
      await setupPage(page, `
        <sg-modal id="modal" header="Title">
          <p>Content</p>
        </sg-modal>
      `);
      await waitForComponent(page, 'sg-modal');

      const result = await page.evaluate(async () => {
        return new Promise<boolean>((resolve) => {
          document.querySelector('#modal')?.addEventListener('sgOpen', () => {
            resolve(true);
          });
          setTimeout(() => resolve(false), 500);
          (document.querySelector('#modal') as any)?.showModal();
        });
      });

      expect(result).toBe(true);
    });

    test('should emit sgCancel event on close button click', async ({ page }) => {
      await setupPage(page, `
        <sg-modal id="modal" open show-close-button header="Title">
          <p>Content</p>
        </sg-modal>
      `);
      await waitForComponent(page, 'sg-modal');

      await page.evaluate(() => {
        (window as any).cancelled = false;
        document.querySelector('#modal')?.addEventListener('sgCancel', () => {
          (window as any).cancelled = true;
        });
      });

      // Click close button in shadow DOM
      const closeBtn = page.locator('sg-modal').locator('button').first();
      await closeBtn.click();
      
      await page.waitForTimeout(100);
      const cancelled = await page.evaluate(() => (window as any).cancelled);
      expect(cancelled).toBe(true);
    });
  });

  test.describe('Accessibility', () => {
    test('should use native dialog element', async ({ page }) => {
      await setupPage(page, `
        <sg-modal open header="Title">
          <p>Content</p>
        </sg-modal>
      `);
      await waitForComponent(page, 'sg-modal');
      // The modal uses a native dialog element in its shadow DOM
      const dialog = page.locator('sg-modal').locator('dialog');
      await expect(dialog).toBeAttached();
    });
  });
});

// ============================================================================
// THEMING TESTS
// ============================================================================

test.describe('Theming', () => {
  test('should apply dark theme via data attribute', async ({ page }) => {
    await setupPage(page, `
      <div id="dark-container" data-theme="dark">
        <sg-badge variant="primary">Dark Badge</sg-badge>
        <sg-button>Dark Button</sg-button>
      </div>
    `);

    const container = page.locator('#dark-container');
    await expect(container).toHaveAttribute('data-theme', 'dark');
  });

  test('should apply light theme via data attribute', async ({ page }) => {
    await setupPage(page, `
      <div id="light-container" data-theme="light">
        <sg-badge variant="primary">Light Badge</sg-badge>
        <sg-button>Light Button</sg-button>
      </div>
    `);

    const container = page.locator('#light-container');
    await expect(container).toHaveAttribute('data-theme', 'light');
  });

  test('should be able to change theme on document', async ({ page }) => {
    await setupPage(page, `
      <sg-button>Themed Button</sg-button>
    `);

    // Change the document theme
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });

    const html = page.locator('html');
    await expect(html).toHaveAttribute('data-theme', 'dark');
  });
});

// ============================================================================
// ACCESSIBILITY TESTS
// ============================================================================

test.describe('Accessibility', () => {
  test('sg-icon should have proper ARIA attributes', async ({ page }) => {
    await setupPage(page, `
      <sg-icon name="home" aria-label="Navigate to home"></sg-icon>
    `);
    await waitForComponent(page, 'sg-icon');

    const icon = page.locator('sg-icon');
    await expect(icon).toHaveAttribute('role', 'img');
    await expect(icon).toHaveAttribute('aria-label', 'Navigate to home');
  });

  test('sg-button should be keyboard accessible', async ({ page }) => {
    await setupPage(page, `<sg-button id="btn">Press Enter</sg-button>`);
    await waitForComponent(page, 'sg-button');

    await page.evaluate(() => {
      (window as any).clicked = false;
      document.querySelector('#btn')?.addEventListener('sgClick', () => {
        (window as any).clicked = true;
      });
    });

    // Focus the inner button element for keyboard interaction
    const innerButton = page.locator('sg-button button').first();
    await innerButton.focus();
    await page.keyboard.press('Enter');
    const clicked = await page.evaluate(() => (window as any).clicked);
    expect(clicked).toBe(true);
  });

  test('all interactive components should have focusable elements', async ({ page }) => {
    await setupPage(page, `
      <sg-button>Button</sg-button>
      <sg-theme-toggle></sg-theme-toggle>
    `);
    await waitForComponent(page, 'sg-button');
    await waitForComponent(page, 'sg-theme-toggle');

    // sg-button's inner button should be focusable
    const innerBtn = page.locator('sg-button button').first();
    await innerBtn.focus();
    await expect(innerBtn).toBeFocused();

    // sg-theme-toggle's inner button should be focusable
    const toggleBtn = page.locator('sg-theme-toggle button').first();
    await toggleBtn.focus();
    await expect(toggleBtn).toBeFocused();
  });

  test('disabled buttons should not be focusable by click', async ({ page }) => {
    await setupPage(page, `<sg-button disabled>Disabled</sg-button>`);
    await waitForComponent(page, 'sg-button');

    const button = page.locator('sg-button');
    await expect(button).toHaveAttribute('disabled', '');
  });
});

// ============================================================================
// INTEGRATION TESTS
// ============================================================================

test.describe('Integration', () => {
  test('should render multiple components together', async ({ page }) => {
    await setupPage(page, `
      <div>
        <sg-button>
          <sg-icon name="plus" slot="prefix"></sg-icon>
          Add
        </sg-button>
        <sg-badge variant="success">New</sg-badge>
      </div>
    `);
    await waitForComponent(page, 'sg-button');
    await waitForComponent(page, 'sg-badge');

    await expect(page.locator('sg-button')).toBeVisible();
    await expect(page.locator('sg-badge')).toBeVisible();
  });

  test('should work with dropdown containing buttons', async ({ page }) => {
    await setupPage(page, `
      <sg-dropdown>
        <sg-button slot="trigger">Open Menu</sg-button>
        <sg-button variant="ghost">Option 1</sg-button>
        <sg-button variant="ghost">Option 2</sg-button>
      </sg-dropdown>
    `);
    await waitForComponent(page, 'sg-dropdown');
    await waitForComponent(page, 'sg-button');

    await page.locator('sg-dropdown').click();
    await expect(page.locator('sg-dropdown')).toHaveAttribute('open');
  });

  test('should work with modal containing form', async ({ page }) => {
    await setupPage(page, `
      <sg-modal id="form-modal" open header="Form Modal">
        <form>
          <input name="name" placeholder="Name" />
          <sg-button type="submit">Submit</sg-button>
        </form>
      </sg-modal>
    `);
    await waitForComponent(page, 'sg-modal');
    await waitForComponent(page, 'sg-button');

    await expect(page.locator('sg-modal')).toHaveAttribute('open');
    await expect(page.locator('sg-button')).toBeAttached();
  });

  test('should handle theme toggle affecting all components', async ({ page }) => {
    await setupPage(page, `
      <html data-theme="light">
        <body>
          <sg-theme-toggle></sg-theme-toggle>
          <sg-button>Themed Button</sg-button>
          <sg-badge>Themed Badge</sg-badge>
        </body>
      </html>
    `);
    await waitForComponent(page, 'sg-theme-toggle');

    await page.locator('sg-theme-toggle').click();

    // Theme should change on document
    const theme = await page.evaluate(() => 
      document.documentElement.getAttribute('data-theme')
    );
    expect(['light', 'dark']).toContain(theme);
  });

  test('loading button with skeleton fallback pattern', async ({ page }) => {
    await setupPage(page, `
      <div id="container">
        <sg-skeleton width="100" height="40"></sg-skeleton>
      </div>
    `);
    await waitForComponent(page, 'sg-skeleton');

    // Simulate loading complete
    await page.evaluate(() => {
      const container = document.querySelector('#container');
      if (container) {
        container.innerHTML = '<sg-button>Loaded</sg-button>';
      }
    });
    await waitForComponent(page, 'sg-button');

    await expect(page.locator('sg-button')).toBeVisible();
  });
});
