import { newSpecPage } from '@stencil/core/testing';
import { SgThemeToggle } from './theme-toggle';

describe('sg-theme-toggle', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [SgThemeToggle],
      html: `<sg-theme-toggle></sg-theme-toggle>`,
    });
    expect(page.root).toEqualHtml(`
      <sg-theme-toggle theme="system">
        <mock:shadow-root>
          <button aria-label="Current theme: system. Click to change." class="toggle toggle--md" title="Theme: system" type="button">
            <span class="icon icon--sun icon--active">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" x2="12" y1="1" y2="3"></line>
                <line x1="12" x2="12" y1="21" y2="23"></line>
                <line x1="4.22" x2="5.64" y1="4.22" y2="5.64"></line>
                <line x1="18.36" x2="19.78" y1="18.36" y2="19.78"></line>
                <line x1="1" x2="3" y1="12" y2="12"></line>
                <line x1="21" x2="23" y1="12" y2="12"></line>
                <line x1="4.22" x2="5.64" y1="19.78" y2="18.36"></line>
                <line x1="18.36" x2="19.78" y1="5.64" y2="4.22"></line>
              </svg>
            </span>
            <span class="icon icon--moon">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            </span>
            <span class="badge">auto</span>
          </button>
        </mock:shadow-root>
      </sg-theme-toggle>
    `);
  });

  it('renders with theme attribute', async () => {
    const page = await newSpecPage({
      components: [SgThemeToggle],
      html: `<sg-theme-toggle theme="light"></sg-theme-toggle>`,
    });
    expect(page.root).toHaveAttribute('theme');
    expect(page.root.getAttribute('theme')).toBe('light');
  });

  it('renders with dark theme', async () => {
    const page = await newSpecPage({
      components: [SgThemeToggle],
      html: `<sg-theme-toggle theme="dark"></sg-theme-toggle>`,
    });
    expect(page.root.getAttribute('theme')).toBe('dark');
  });

  it('renders with different sizes', async () => {
    const page = await newSpecPage({
      components: [SgThemeToggle],
      html: `<sg-theme-toggle size="lg"></sg-theme-toggle>`,
    });
    const button = page.root.shadowRoot.querySelector('button');
    expect(button).toHaveClass('toggle--lg');
  });

  it('renders small size', async () => {
    const page = await newSpecPage({
      components: [SgThemeToggle],
      html: `<sg-theme-toggle size="sm"></sg-theme-toggle>`,
    });
    const button = page.root.shadowRoot.querySelector('button');
    expect(button).toHaveClass('toggle--sm');
  });

  it('renders medium size by default', async () => {
    const page = await newSpecPage({
      components: [SgThemeToggle],
      html: `<sg-theme-toggle></sg-theme-toggle>`,
    });
    const button = page.root.shadowRoot.querySelector('button');
    expect(button).toHaveClass('toggle--md');
  });

  it('cycles through themes on click', async () => {
    const page = await newSpecPage({
      components: [SgThemeToggle],
      html: `<sg-theme-toggle theme="light"></sg-theme-toggle>`,
    });

    const button = page.root.shadowRoot.querySelector('button');

    // light -> dark
    button.click();
    await page.waitForChanges();
    expect(page.root.getAttribute('theme')).toBe('dark');

    // dark -> system
    button.click();
    await page.waitForChanges();
    expect(page.root.getAttribute('theme')).toBe('system');

    // system -> light
    button.click();
    await page.waitForChanges();
    expect(page.root.getAttribute('theme')).toBe('light');
  });

  it('emits sgThemeChange event on click', async () => {
    const page = await newSpecPage({
      components: [SgThemeToggle],
      html: `<sg-theme-toggle theme="light"></sg-theme-toggle>`,
    });

    const spy = jest.fn();
    page.root.addEventListener('sgThemeChange', spy);

    const button = page.root.shadowRoot.querySelector('button');
    button.click();
    await page.waitForChanges();

    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0].detail).toBe('dark');
  });

  it('shows badge only in system mode', async () => {
    const page = await newSpecPage({
      components: [SgThemeToggle],
      html: `<sg-theme-toggle theme="system"></sg-theme-toggle>`,
    });

    let badge = page.root.shadowRoot.querySelector('.badge');
    expect(badge).not.toBeNull();
    expect(badge.textContent).toBe('auto');

    // Change to light theme
    const button = page.root.shadowRoot.querySelector('button');
    button.click();
    await page.waitForChanges();

    // Should now be 'dark' (after system) - wait, system -> light
    // Actually the cycle is light -> dark -> system -> light
    // So from system, click goes to light

    page.root.setAttribute('theme', 'light');
    await page.waitForChanges();

    badge = page.root.shadowRoot.querySelector('.badge');
    expect(badge).toBeNull();
  });

  it('has proper accessibility attributes', async () => {
    const page = await newSpecPage({
      components: [SgThemeToggle],
      html: `<sg-theme-toggle theme="dark"></sg-theme-toggle>`,
    });

    const button = page.root.shadowRoot.querySelector('button');
    expect(button.getAttribute('aria-label')).toBe('Current theme: dark. Click to change.');
    expect(button.getAttribute('title')).toBe('Theme: dark');
    expect(button.getAttribute('type')).toBe('button');
  });

  it('shows sun icon active in light mode', async () => {
    const page = await newSpecPage({
      components: [SgThemeToggle],
      html: `<sg-theme-toggle theme="light"></sg-theme-toggle>`,
    });

    const sunIcon = page.root.shadowRoot.querySelector('.icon--sun');
    const moonIcon = page.root.shadowRoot.querySelector('.icon--moon');

    expect(sunIcon).toHaveClass('icon--active');
    expect(moonIcon).not.toHaveClass('icon--active');
  });

  it('shows moon icon active in dark mode', async () => {
    const page = await newSpecPage({
      components: [SgThemeToggle],
      html: `<sg-theme-toggle theme="dark"></sg-theme-toggle>`,
    });

    const sunIcon = page.root.shadowRoot.querySelector('.icon--sun');
    const moonIcon = page.root.shadowRoot.querySelector('.icon--moon');

    expect(sunIcon).not.toHaveClass('icon--active');
    expect(moonIcon).toHaveClass('icon--active');
  });
});
