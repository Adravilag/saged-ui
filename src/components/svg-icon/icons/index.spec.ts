import { icons, iconNames, isValidIconName, loadIconsFromJson } from './index';
import type { IconName } from './index';

describe('svg-icon/icons/index', () => {
  describe('icons object', () => {
    it('should export icons as Record<string, string>', () => {
      expect(typeof icons).toBe('object');
      expect(icons).not.toBeNull();
    });

    it('should contain SVG strings', () => {
      const iconKeys = Object.keys(icons);
      expect(iconKeys.length).toBeGreaterThan(0);

      for (const key of iconKeys) {
        expect(icons[key]).toContain('<svg');
        expect(icons[key]).toContain('</svg>');
      }
    });

    it('should have icons with viewBox or width/height', () => {
      const iconKeys = Object.keys(icons);

      for (const key of iconKeys) {
        const svg = icons[key];
        const hasViewBox = svg.includes('viewBox');
        const hasDimensions = svg.includes('width=') || svg.includes('height=');
        expect(hasViewBox || hasDimensions).toBe(true);
      }
    });
  });

  describe('iconNames array', () => {
    it('should be an array of strings', () => {
      expect(Array.isArray(iconNames)).toBe(true);
      expect(iconNames.length).toBeGreaterThan(0);

      for (const name of iconNames) {
        expect(typeof name).toBe('string');
      }
    });

    it('should match keys of icons object', () => {
      const iconKeys = Object.keys(icons);
      expect(iconNames.sort()).toEqual(iconKeys.sort());
    });
  });

  describe('isValidIconName', () => {
    it('should return true for valid icon names', () => {
      for (const name of iconNames) {
        expect(isValidIconName(name)).toBe(true);
      }
    });

    it('should return false for invalid icon names', () => {
      expect(isValidIconName('non-existent-icon')).toBe(false);
      expect(isValidIconName('')).toBe(false);
      expect(isValidIconName('random-string-123')).toBe(false);
    });

    it('should work as type guard', () => {
      const testName = 'add';
      if (isValidIconName(testName)) {
        // TypeScript should narrow the type to IconName
        const _iconName: IconName = testName;
        expect(_iconName).toBe(testName);
      }
    });
  });

  describe('loadIconsFromJson', () => {
    const mockFetch = jest.fn();
    const originalFetch = global.fetch;

    beforeEach(() => {
      global.fetch = mockFetch;
      mockFetch.mockClear();

      // Clear loaded state
      const ICONS_LOADED_KEY = '__sgIconsLoaded';
      if (typeof globalThis !== 'undefined') {
        (globalThis as Record<string, unknown>)[ICONS_LOADED_KEY] = undefined;
      }
    });

    afterEach(() => {
      global.fetch = originalFetch;
    });

    it('should load icons from JSON path', async () => {
      const mockIcons = {
        'loaded-icon': '<svg viewBox="0 0 24 24"><path/></svg>',
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockIcons),
      });

      await loadIconsFromJson('/test/icons.json');

      expect(mockFetch).toHaveBeenCalledWith('/test/icons.json');
    });

    it('should not reload already loaded path', async () => {
      const mockIcons = { icon: '<svg/>' };

      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockIcons),
      });

      await loadIconsFromJson('/same/path.json');
      await loadIconsFromJson('/same/path.json');

      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    it('should handle fetch errors gracefully', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      await loadIconsFromJson('/error/path.json');

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('should handle non-ok responses', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      await loadIconsFromJson('/not-found.json');

      expect(mockFetch).toHaveBeenCalled();
    });
  });
});
