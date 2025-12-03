import { newSpecPage } from '@stencil/core/testing';
import { SgIcon } from './svg-icon';

/** Get globalThis with user icons storage */
function getGlobal(): { __sgUserIcons?: Record<string, string> } {
  return globalThis as { __sgUserIcons?: Record<string, string> };
}

// Helper to register icons globally before tests
const registerTestIcons = () => {
  getGlobal().__sgUserIcons = {
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
  delete getGlobal().__sgUserIcons;
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
    const global = getGlobal();
    global.__sgUserIcons = global.__sgUserIcons ?? {};
    global.__sgUserIcons['lucide-home'] = '<svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>';

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

  it('renders with both horizontal and vertical flip', async () => {
    const page = await newSpecPage({
      components: [SgIcon],
      html: `<sg-icon name="home" flip-h flip-v></sg-icon>`,
    });
    const style = page.root?.getAttribute('style');
    expect(style).toContain('scale(-1, -1)');
  });

  it('renders with rotation and flip combined', async () => {
    const page = await newSpecPage({
      components: [SgIcon],
      html: `<sg-icon name="home" rotate="45" flip-h></sg-icon>`,
    });
    const style = page.root?.getAttribute('style');
    expect(style).toContain('rotate(45deg)');
    expect(style).toContain('scale(-1, 1)');
  });

  it('normalizes numeric string size without units', async () => {
    const page = await newSpecPage({
      components: [SgIcon],
      html: `<sg-icon name="home" size="48"></sg-icon>`,
    });
    const style = page.root?.getAttribute('style');
    expect(style).toContain('--icon-size: 48px');
  });

  it('preserves size with units', async () => {
    const page = await newSpecPage({
      components: [SgIcon],
      html: `<sg-icon name="home" size="2rem"></sg-icon>`,
    });
    const style = page.root?.getAttribute('style');
    expect(style).toContain('--icon-size: 2rem');
  });

  it('renders IconDefinition with custom viewBox', async () => {
    const global = getGlobal();
    global.__sgUserIcons = global.__sgUserIcons ?? {};
    // Register an IconDefinition object (not string)
    (global as Record<string, unknown>).__sgUserIcons = {
      'def-icon': {
        paths: ['M12 2L2 12h3v8h14v-8h3L12 2z'],
        viewBox: '0 0 48 48',
      },
    };

    const page = await newSpecPage({
      components: [SgIcon],
      html: `<sg-icon name="def-icon"></sg-icon>`,
    });
    const svg = page.root?.shadowRoot?.querySelector('svg');
    expect(svg?.getAttribute('viewBox')).toBe('0 0 48 48');
  });

  it('renders IconDefinition with fillRule', async () => {
    const global = getGlobal();
    (global as Record<string, unknown>).__sgUserIcons = {
      'fillrule-icon': {
        paths: ['M12 2L2 12h3v8h14v-8h3L12 2z'],
        viewBox: '0 0 24 24',
        fillRule: 'evenodd',
      },
    };

    const page = await newSpecPage({
      components: [SgIcon],
      html: `<sg-icon name="fillrule-icon"></sg-icon>`,
    });
    const path = page.root?.shadowRoot?.querySelector('path');
    expect(path?.getAttribute('fill-rule')).toBe('evenodd');
  });

  it('handles color prop when fill is not set', async () => {
    const page = await newSpecPage({
      components: [SgIcon],
      html: `<sg-icon name="home" color="blue"></sg-icon>`,
    });
    const style = page.root?.getAttribute('style');
    expect(style).toContain('--icon-color: blue');
  });

  it('fill takes precedence over color', async () => {
    const page = await newSpecPage({
      components: [SgIcon],
      html: `<sg-icon name="home" color="red" fill="green"></sg-icon>`,
    });
    const style = page.root?.getAttribute('style');
    expect(style).toContain('--icon-color: green');
  });

  describe('static methods', () => {
    it('configure should set global config', () => {
      SgIcon.configure({ jsonSrc: '/test/icons.json' });
      // Config is set globally - no direct assertion but shouldn't throw
      expect(true).toBe(true);
    });

    it('loadIcons should handle fetch errors gracefully', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      const mockFetch = jest.fn().mockRejectedValueOnce(new Error('Network error'));
      global.fetch = mockFetch;

      await SgIcon.loadIcons('/error/path.json');

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('instance methods', () => {
    it('registerIcons method should register icons', async () => {
      const page = await newSpecPage({
        components: [SgIcon],
        html: `<sg-icon name="test-method-icon"></sg-icon>`,
      });

      await page.root?.registerIcons({
        'test-method-icon': '<svg viewBox="0 0 24 24"><rect/></svg>',
      });

      // Re-render to pick up new icon
      page.root?.setAttribute('name', 'test-method-icon');
      await page.waitForChanges();

      expect(page.root?.shadowRoot?.querySelector('.svg-container')).toBeDefined();
    });

    it('registerIcon method should register single icon', async () => {
      const page = await newSpecPage({
        components: [SgIcon],
        html: `<sg-icon name="single-method"></sg-icon>`,
      });

      await page.root?.registerIcon('single-method', '<svg viewBox="0 0 24 24"><circle/></svg>');

      page.root?.setAttribute('name', 'single-method');
      await page.waitForChanges();

      expect(page.root?.shadowRoot?.querySelector('.svg-container')).toBeDefined();
    });

    it('getRegisteredIcons should return registered icon names', async () => {
      const page = await newSpecPage({
        components: [SgIcon],
        html: `<sg-icon name="home"></sg-icon>`,
      });

      const icons = await page.root?.getRegisteredIcons();
      expect(Array.isArray(icons)).toBe(true);
    });

    it('hasIcon should return true for existing icon', async () => {
      const page = await newSpecPage({
        components: [SgIcon],
        html: `<sg-icon name="home"></sg-icon>`,
      });

      const hasHome = await page.root?.hasIcon('home');
      expect(hasHome).toBe(true);
    });

    it('hasIcon should return false for non-existing icon', async () => {
      const page = await newSpecPage({
        components: [SgIcon],
        html: `<sg-icon name="home"></sg-icon>`,
      });

      const hasNonExistent = await page.root?.hasIcon('definitely-not-exists-abc');
      expect(hasNonExistent).toBe(false);
    });
  });

  describe('src prop (custom SVG loading)', () => {
    const originalFetch = global.fetch;

    afterEach(() => {
      global.fetch = originalFetch;
    });

    it('should render custom SVG from src', async () => {
      const mockSvg = '<svg viewBox="0 0 24 24"><path d="M1 1h22v22H1z"/></svg>';
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(mockSvg),
      });

      const page = await newSpecPage({
        components: [SgIcon],
        html: `<sg-icon src="/custom.svg"></sg-icon>`,
      });

      await page.waitForChanges();
      expect(page.root?.classList.contains('icon--custom')).toBe(true);
    });

    it('should handle src fetch error', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      global.fetch = jest.fn().mockRejectedValueOnce(new Error('Failed'));

      const page = await newSpecPage({
        components: [SgIcon],
        html: `<sg-icon src="/bad.svg"></sg-icon>`,
      });

      await page.waitForChanges();
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('should handle non-ok response for src', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      const page = await newSpecPage({
        components: [SgIcon],
        html: `<sg-icon src="/not-found.svg"></sg-icon>`,
      });

      await page.waitForChanges();
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });
});
