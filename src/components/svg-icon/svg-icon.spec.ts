import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { SgIcon } from './svg-icon';

// Helper to register icons globally before tests
const registerTestIcons = () => {
  (globalThis as any).__sgUserIcons = {
    home: '<svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>',
    settings: '<svg viewBox="0 0 24 24"><path d="M12 8c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z"/></svg>',
    heart:
      '<svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>',
    refresh:
      '<svg viewBox="0 0 24 24"><path d="M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>',
    star: '<svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>',
  };
};

// Helper to clear icons after tests
const clearTestIcons = () => {
  delete (globalThis as any).__sgUserIcons;
};

describe('sg-icon', () => {
  beforeEach(() => {
    registerTestIcons();
  });

  afterEach(() => {
    clearTestIcons();
  });

  it('renders with a user-registered icon name', async () => {
    const page = await newSpecPage({
      components: [SgIcon],
      html: `<sg-icon name="home"></sg-icon>`,
    });
    expect(page.root).toBeDefined();
    expect(page.root?.getAttribute('name')).toBe('home');
    expect(page.root?.getAttribute('role')).toBe('img');
    expect(page.root?.getAttribute('aria-label')).toBe('home icon');
    // User SVG icons are rendered in a div container
    expect(page.root?.shadowRoot?.querySelector('.svg-container')).toBeDefined();
  });

  it('renders with a built-in icon name', async () => {
    const page = await newSpecPage({
      components: [SgIcon],
      html: `<sg-icon name="error"></sg-icon>`,
    });
    expect(page.root).toBeDefined();
    expect(page.root?.shadowRoot?.querySelector('svg')).toBeDefined();
    expect(page.root?.shadowRoot?.querySelector('path')).toBeDefined();
  });

  it('renders with custom size', async () => {
    const page = await newSpecPage({
      components: [SgIcon],
      html: `<sg-icon name="settings" size="32"></sg-icon>`,
    });
    expect(page.root).toBeDefined();
    expect(page.root?.shadowRoot?.querySelector('.svg-container')).toBeDefined();
  });

  it('renders with custom color via CSS variable', async () => {
    const page = await newSpecPage({
      components: [SgIcon],
      html: `<sg-icon name="heart" color="#ff0000"></sg-icon>`,
    });
    expect(page.root).toBeDefined();
    // Color is applied via CSS variable --icon-color
    const style = page.root?.getAttribute('style');
    expect(style).toContain('--icon-color: #ff0000');
  });

  it('renders with spin animation class', async () => {
    const page = await newSpecPage({
      components: [SgIcon],
      html: `<sg-icon name="refresh" spin></sg-icon>`,
    });
    expect(page.root?.classList.contains('icon--spin')).toBe(true);
  });

  it('renders with rotation transform', async () => {
    const page = await newSpecPage({
      components: [SgIcon],
      html: `<sg-icon name="home" rotate="90"></sg-icon>`,
    });
    expect(page.root).toBeDefined();
    const style = page.root?.getAttribute('style');
    expect(style).toContain('--icon-transform: rotate(90deg)');
  });

  it('renders with horizontal flip', async () => {
    const page = await newSpecPage({
      components: [SgIcon],
      html: `<sg-icon name="home" flip-h></sg-icon>`,
    });
    expect(page.root).toBeDefined();
    const style = page.root?.getAttribute('style');
    expect(style).toContain('scale(-1, 1)');
  });

  it('renders with vertical flip', async () => {
    const page = await newSpecPage({
      components: [SgIcon],
      html: `<sg-icon name="home" flip-v></sg-icon>`,
    });
    expect(page.root).toBeDefined();
    const style = page.root?.getAttribute('style');
    expect(style).toContain('scale(1, -1)');
  });

  it('renders as decorative (aria-hidden)', async () => {
    const page = await newSpecPage({
      components: [SgIcon],
      html: `<sg-icon name="star" decorative></sg-icon>`,
    });
    expect(page.root?.getAttribute('aria-hidden')).toBe('true');
    expect(page.root?.getAttribute('role')).toBe('presentation');
  });

  it('renders with custom aria-label', async () => {
    const page = await newSpecPage({
      components: [SgIcon],
      html: `<sg-icon name="heart" aria-label="Favorite"></sg-icon>`,
    });
    expect(page.root?.getAttribute('aria-label')).toBe('Favorite');
  });

  it('renders nothing when icon name is not registered', async () => {
    clearTestIcons(); // No icons registered
    const page = await newSpecPage({
      components: [SgIcon],
      html: `<sg-icon name="non-existent-icon"></sg-icon>`,
    });
    // Should render nothing (null)
    expect(page.root?.shadowRoot?.children.length).toBe(0);
  });

  it('renders with width and height override', async () => {
    const page = await newSpecPage({
      components: [SgIcon],
      html: `<sg-icon name="home" width="40" height="20"></sg-icon>`,
    });
    expect(page.root).toBeDefined();
    const style = page.root?.getAttribute('style');
    expect(style).toContain('--icon-width: 40px');
    expect(style).toContain('--icon-height: 20px');
  });

  it('applies icon class', async () => {
    const page = await newSpecPage({
      components: [SgIcon],
      html: `<sg-icon name="home"></sg-icon>`,
    });
    expect(page.root?.classList.contains('icon')).toBe(true);
  });

  it('applies icon--user class for user-registered SVG icons', async () => {
    const page = await newSpecPage({
      components: [SgIcon],
      html: `<sg-icon name="home"></sg-icon>`,
    });
    expect(page.root?.classList.contains('icon--user')).toBe(true);
  });

  it('normalizes icon name with prefix', async () => {
    // Register icon with normalized name
    (globalThis as any).__sgUserIcons['lucide-home'] = '<svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>';

    const page = await newSpecPage({
      components: [SgIcon],
      html: `<sg-icon name="lucide:home"></sg-icon>`,
    });
    expect(page.root).toBeDefined();
    expect(page.root?.shadowRoot?.querySelector('.svg-container')).toBeDefined();
  });

  it('uses fill prop as alias for color', async () => {
    const page = await newSpecPage({
      components: [SgIcon],
      html: `<sg-icon name="heart" fill="#00ff00"></sg-icon>`,
    });
    const style = page.root?.getAttribute('style');
    expect(style).toContain('--icon-color: #00ff00');
  });
});
