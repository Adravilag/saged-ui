/**
 * Tests for SVG Parser Utilities
 */

const {
  parseSVG,
  parseSpriteSVG,
  extractCircles,
  circleToPath,
  validatePathData,
  normalizeViewBox,
  toKebabCase
} = require('../utils/svg-parser');

describe('SVG Parser Utilities', () => {
  describe('parseSVG', () => {
    it('should extract paths from simple SVG', () => {
      const svg = '<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>';
      const result = parseSVG(svg);

      expect(result.paths).toHaveLength(1);
      expect(result.paths[0]).toBe('M12 2L2 7l10 5 10-5-10-5z');
      expect(result.viewBox).toBe('0 0 24 24');
    });

    it('should extract multiple paths', () => {
      const svg = `
        <svg viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5"/>
          <path d="M12 22V12"/>
        </svg>
      `;
      const result = parseSVG(svg);

      expect(result.paths).toHaveLength(2);
      expect(result.paths[0]).toBe('M12 2L2 7l10 5');
      expect(result.paths[1]).toBe('M12 22V12');
    });

    it('should extract viewBox with different format', () => {
      const svg = '<svg viewBox="0 0 48 48"><path d="M0 0"/></svg>';
      const result = parseSVG(svg);

      expect(result.viewBox).toBe('0 0 48 48');
    });

    it('should default viewBox to 0 0 24 24', () => {
      const svg = '<svg><path d="M0 0"/></svg>';
      const result = parseSVG(svg);

      expect(result.viewBox).toBe('0 0 24 24');
    });

    it('should extract fill-rule', () => {
      const svg = '<svg><path d="M0 0" fill-rule="evenodd"/></svg>';
      const result = parseSVG(svg);

      expect(result.fillRule).toBe('evenodd');
    });

    it('should handle paths with single quotes', () => {
      const svg = "<svg viewBox='0 0 24 24'><path d='M12 2L2 7'/></svg>";
      const result = parseSVG(svg);

      expect(result.paths).toHaveLength(1);
      expect(result.paths[0]).toBe('M12 2L2 7');
    });

    it('should handle self-closing path tags', () => {
      const svg = '<svg viewBox="0 0 24 24"><path d="M12 2L2 7" /></svg>';
      const result = parseSVG(svg);

      expect(result.paths).toHaveLength(1);
    });

    it('should extract circles', () => {
      const svg = '<svg><circle cx="12" cy="12" r="10"/></svg>';
      const result = parseSVG(svg);

      expect(result.circles).toHaveLength(1);
      expect(result.circles[0]).toEqual({ cx: 12, cy: 12, r: 10 });
    });
  });

  describe('parseSpriteSVG', () => {
    it('should parse SVG sprite with symbols', () => {
      const sprite = `
        <svg xmlns="http://www.w3.org/2000/svg">
          <symbol id="icon-home" viewBox="0 0 24 24">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </symbol>
          <symbol id="icon-star" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
          </symbol>
        </svg>
      `;

      const result = parseSpriteSVG(sprite);

      expect(Object.keys(result)).toHaveLength(2);
      expect(result['home']).toBeDefined();
      expect(result['star']).toBeDefined();
      expect(result['home'].paths).toHaveLength(1);
      expect(result['star'].paths).toHaveLength(1);
    });

    it('should remove common prefixes from icon names', () => {
      const sprite = `
        <svg>
          <symbol id="icon-test" viewBox="0 0 24 24">
            <path d="M0 0"/>
          </symbol>
          <symbol id="svg-test2" viewBox="0 0 24 24">
            <path d="M0 0"/>
          </symbol>
          <symbol id="i-test3" viewBox="0 0 24 24">
            <path d="M0 0"/>
          </symbol>
        </svg>
      `;

      const result = parseSpriteSVG(sprite);

      expect(result['test']).toBeDefined();
      expect(result['test2']).toBeDefined();
      expect(result['test3']).toBeDefined();
    });

    it('should skip symbols without id', () => {
      const sprite = `
        <svg>
          <symbol viewBox="0 0 24 24">
            <path d="M0 0"/>
          </symbol>
        </svg>
      `;

      const result = parseSpriteSVG(sprite);

      // When no symbols with id are found, it falls back to parsing as single SVG
      // So we expect 'imported-icon' to be created
      expect(result['imported-icon']).toBeDefined();
    });

    it('should skip symbols without paths', () => {
      const sprite = `
        <svg>
          <symbol id="empty" viewBox="0 0 24 24">
            <rect width="10" height="10"/>
          </symbol>
        </svg>
      `;

      const result = parseSpriteSVG(sprite);

      expect(result['empty']).toBeUndefined();
    });

    it('should include non-default viewBox', () => {
      const sprite = `
        <svg>
          <symbol id="icon-custom" viewBox="0 0 48 48">
            <path d="M0 0"/>
          </symbol>
        </svg>
      `;

      const result = parseSpriteSVG(sprite);

      expect(result['custom'].viewBox).toBe('0 0 48 48');
    });

    it('should include fill-rule when not nonzero', () => {
      const sprite = `
        <svg>
          <symbol id="icon-evenodd" viewBox="0 0 24 24">
            <path d="M0 0" fill-rule="evenodd"/>
          </symbol>
        </svg>
      `;

      const result = parseSpriteSVG(sprite);

      expect(result['evenodd'].fillRule).toBe('evenodd');
    });

    it('should parse single SVG when no symbols found', () => {
      const svg = '<svg viewBox="0 0 24 24"><path d="M12 2L2 7"/></svg>';
      const result = parseSpriteSVG(svg);

      expect(result['imported-icon']).toBeDefined();
      expect(result['imported-icon'].paths).toHaveLength(1);
    });
  });

  describe('extractCircles', () => {
    it('should extract circles from SVG', () => {
      const svg = '<svg><circle cx="12" cy="12" r="10"/></svg>';
      const circles = extractCircles(svg);

      expect(circles).toHaveLength(1);
      expect(circles[0]).toEqual({ cx: 12, cy: 12, r: 10 });
    });

    it('should extract multiple circles', () => {
      const svg = `
        <svg>
          <circle cx="6" cy="6" r="3"/>
          <circle cx="18" cy="18" r="5"/>
        </svg>
      `;
      const circles = extractCircles(svg);

      expect(circles).toHaveLength(2);
    });

    it('should handle circles with decimal values', () => {
      const svg = '<svg><circle cx="12.5" cy="12.5" r="10.25"/></svg>';
      const circles = extractCircles(svg);

      expect(circles[0]).toEqual({ cx: 12.5, cy: 12.5, r: 10.25 });
    });

    it('should skip incomplete circles', () => {
      const svg = '<svg><circle cx="12" cy="12"/></svg>'; // missing r
      const circles = extractCircles(svg);

      expect(circles).toHaveLength(0);
    });
  });

  describe('circleToPath', () => {
    it('should convert circle to path data', () => {
      const pathData = circleToPath(12, 12, 10);

      expect(pathData).toContain('M 2 12');
      expect(pathData).toContain('a 10 10 0 1 0 20 0');
      expect(pathData).toContain('a 10 10 0 1 0 -20 0');
    });

    it('should handle different radii', () => {
      const pathData = circleToPath(0, 0, 5);

      expect(pathData).toContain('M -5 0');
      expect(pathData).toContain('a 5 5 0 1 0 10 0');
    });
  });

  describe('validatePathData', () => {
    it('should validate correct path data', () => {
      expect(validatePathData('M12 2L2 7l10 5 10-5-10-5z')).toBe(true);
      expect(validatePathData('M 0 0 L 10 10')).toBe(true);
      expect(validatePathData('M0,0 L10,10 Z')).toBe(true);
    });

    it('should validate path with all commands', () => {
      const complexPath = 'M0 0 L10 10 H20 V30 C1 2 3 4 5 6 S1 2 3 4 Q1 2 3 4 T5 6 A1 2 0 1 0 10 10 Z';
      expect(validatePathData(complexPath)).toBe(true);
    });

    it('should validate path with scientific notation', () => {
      expect(validatePathData('M1e-5 2E+3')).toBe(true);
    });

    it('should reject invalid characters', () => {
      expect(validatePathData('M0 0 X10 10')).toBe(false); // X is not valid
      expect(validatePathData('M0 0 <script>')).toBe(false);
    });
  });

  describe('normalizeViewBox', () => {
    it('should normalize space-separated viewBox', () => {
      expect(normalizeViewBox('0 0 24 24')).toBe('0 0 24 24');
    });

    it('should normalize comma-separated viewBox', () => {
      expect(normalizeViewBox('0,0,24,24')).toBe('0 0 24 24');
    });

    it('should handle mixed separators', () => {
      expect(normalizeViewBox('0, 0, 24, 24')).toBe('0 0 24 24');
    });

    it('should handle extra whitespace', () => {
      expect(normalizeViewBox('  0   0   24   24  ')).toBe('0 0 24 24');
    });

    it('should return default for invalid viewBox', () => {
      expect(normalizeViewBox('invalid')).toBe('0 0 24 24');
      expect(normalizeViewBox('')).toBe('0 0 24 24');
      expect(normalizeViewBox('0 0 24')).toBe('0 0 24 24'); // incomplete
    });
  });

  describe('toKebabCase', () => {
    it('should convert camelCase to kebab-case', () => {
      expect(toKebabCase('myIconName')).toBe('my-icon-name');
      expect(toKebabCase('IconName')).toBe('icon-name');
    });

    it('should convert PascalCase to kebab-case', () => {
      expect(toKebabCase('MyIconName')).toBe('my-icon-name');
    });

    it('should convert spaces to hyphens', () => {
      expect(toKebabCase('my icon name')).toBe('my-icon-name');
    });

    it('should convert underscores to hyphens', () => {
      expect(toKebabCase('my_icon_name')).toBe('my-icon-name');
    });

    it('should handle already kebab-case', () => {
      expect(toKebabCase('my-icon-name')).toBe('my-icon-name');
    });

    it('should convert to lowercase', () => {
      expect(toKebabCase('MyICON')).toBe('my-icon');
    });
  });
});
