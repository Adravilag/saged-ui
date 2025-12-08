import {
  colors,
  lightTheme,
  darkTheme,
  typography,
  spacing,
  radius,
  borderWidth,
  shadows,
  transitions,
  zIndex,
  getCssVar,
  applyTheme,
  getTheme,
  tokensToCssVars,
} from './tokens';

describe('Design Tokens', () => {
  describe('colors', () => {
    it('should have neutral palette', () => {
      expect(colors.neutral[0]).toBe('#ffffff');
      expect(colors.neutral[500]).toBe('#6b7280');
      expect(colors.neutral[950]).toBe('#030712');
    });

    it('should have primary palette', () => {
      expect(colors.primary[500]).toBe('#3b82f6');
      expect(colors.primary[600]).toBe('#2563eb');
    });

    it('should have success palette', () => {
      expect(colors.success[500]).toBe('#22c55e');
      expect(colors.success[50]).toBe('#f0fdf4');
    });

    it('should have warning palette', () => {
      expect(colors.warning[500]).toBe('#f59e0b');
    });

    it('should have error palette', () => {
      expect(colors.error[500]).toBe('#ef4444');
    });
  });

  describe('lightTheme', () => {
    it('should have all semantic tokens', () => {
      expect(lightTheme.bg).toBe(colors.neutral[0]);
      expect(lightTheme.text).toBe(colors.neutral[900]);
      expect(lightTheme.accent).toBe(colors.primary[500]);
    });

    it('should have correct background values', () => {
      expect(lightTheme.bgSecondary).toBe(colors.neutral[50]);
      expect(lightTheme.bgTertiary).toBe(colors.neutral[100]);
      expect(lightTheme.bgElevated).toBe(colors.neutral[0]);
      expect(lightTheme.bgOverlay).toBe('rgba(0, 0, 0, 0.5)');
    });

    it('should have correct text values', () => {
      expect(lightTheme.textSecondary).toBe(colors.neutral[600]);
      expect(lightTheme.textMuted).toBe(colors.neutral[400]);
      expect(lightTheme.textInverse).toBe(colors.neutral[0]);
    });

    it('should have correct border values', () => {
      expect(lightTheme.border).toBe(colors.neutral[200]);
      expect(lightTheme.borderStrong).toBe(colors.neutral[300]);
      expect(lightTheme.borderFocus).toBe(colors.primary[500]);
    });

    it('should have correct accent values', () => {
      expect(lightTheme.accentHover).toBe(colors.primary[600]);
      expect(lightTheme.accentActive).toBe(colors.primary[700]);
      expect(lightTheme.accentSubtle).toBe(colors.primary[50]);
    });

    it('should have correct status colors', () => {
      expect(lightTheme.success).toBe(colors.success[500]);
      expect(lightTheme.warning).toBe(colors.warning[500]);
      expect(lightTheme.error).toBe(colors.error[500]);
    });
  });

  describe('darkTheme', () => {
    it('should have inverted background values', () => {
      expect(darkTheme.bg).toBe(colors.neutral[900]);
      expect(darkTheme.bgSecondary).toBe(colors.neutral[800]);
      expect(darkTheme.text).toBe(colors.neutral[50]);
    });

    it('should have correct dark mode overlay', () => {
      expect(darkTheme.bgOverlay).toBe('rgba(0, 0, 0, 0.7)');
    });

    it('should have adjusted accent colors', () => {
      expect(darkTheme.accent).toBe(colors.primary[400]);
      expect(darkTheme.accentSubtle).toBe(colors.primary[900]);
    });
  });

  describe('typography', () => {
    it('should have font families', () => {
      expect(typography.fontFamily.sans).toContain('system-ui');
      expect(typography.fontFamily.mono).toContain('SF Mono');
      expect(typography.fontFamily.serif).toContain('Georgia');
    });

    it('should have font sizes', () => {
      expect(typography.fontSize.xs).toBe('0.75rem');
      expect(typography.fontSize.base).toBe('1rem');
      expect(typography.fontSize['4xl']).toBe('2.25rem');
    });

    it('should have font weights', () => {
      expect(typography.fontWeight.normal).toBe(400);
      expect(typography.fontWeight.bold).toBe(700);
    });

    it('should have line heights', () => {
      expect(typography.lineHeight.normal).toBe(1.5);
      expect(typography.lineHeight.tight).toBe(1.25);
    });
  });

  describe('spacing', () => {
    it('should have spacing scale', () => {
      expect(spacing[0]).toBe('0');
      expect(spacing[1]).toBe('0.25rem');
      expect(spacing[4]).toBe('1rem');
      expect(spacing[16]).toBe('4rem');
    });
  });

  describe('radius', () => {
    it('should have radius scale', () => {
      expect(radius.none).toBe('0');
      expect(radius.md).toBe('0.375rem');
      expect(radius.full).toBe('9999px');
    });
  });

  describe('borderWidth', () => {
    it('should have border widths', () => {
      expect(borderWidth.default).toBe('1px');
      expect(borderWidth[2]).toBe('2px');
    });
  });

  describe('shadows', () => {
    it('should have shadow scale', () => {
      expect(shadows.xs).toContain('rgba(0, 0, 0');
      expect(shadows.md).toContain('4px 6px');
      expect(shadows.inner).toContain('inset');
    });
  });

  describe('transitions', () => {
    it('should have transition presets', () => {
      expect(transitions.fast).toBe('150ms ease');
      expect(transitions.normal).toBe('250ms ease');
      expect(transitions.slow).toBe('350ms ease');
    });
  });

  describe('zIndex', () => {
    it('should have z-index scale', () => {
      expect(zIndex.dropdown).toBe(1000);
      expect(zIndex.modal).toBe(1050);
      expect(zIndex.tooltip).toBe(1070);
    });

    it('should have modal higher than backdrop', () => {
      expect(zIndex.modal).toBeGreaterThan(zIndex.modalBackdrop);
    });
  });

  describe('getCssVar', () => {
    it('should return CSS variable format', () => {
      expect(getCssVar('bg')).toBe('var(--ui-bg)');
      expect(getCssVar('text-secondary')).toBe('var(--ui-text-secondary)');
    });
  });

  describe('applyTheme', () => {
    it('should set data-theme attribute', () => {
      const element = document.createElement('div');
      applyTheme(element, 'dark');
      expect(element.getAttribute('data-theme')).toBe('dark');
    });

    it('should work with different themes', () => {
      const element = document.createElement('div');

      applyTheme(element, 'light');
      expect(element.getAttribute('data-theme')).toBe('light');

      applyTheme(element, 'purple');
      expect(element.getAttribute('data-theme')).toBe('purple');
    });
  });

  describe('getTheme', () => {
    it('should get data-theme attribute', () => {
      const element = document.createElement('div');
      element.setAttribute('data-theme', 'dark');
      expect(getTheme(element)).toBe('dark');
    });

    it('should return null when no theme set', () => {
      const element = document.createElement('div');
      expect(getTheme(element)).toBeNull();
    });
  });

  describe('tokensToCssVars', () => {
    it('should convert tokens to CSS variables', () => {
      const vars = tokensToCssVars(lightTheme);

      expect(vars['--ui-bg']).toBe(lightTheme.bg);
      expect(vars['--ui-text']).toBe(lightTheme.text);
      expect(vars['--ui-accent']).toBe(lightTheme.accent);
    });

    it('should include all semantic tokens', () => {
      const vars = tokensToCssVars(lightTheme);
      const expectedKeys = [
        '--ui-bg',
        '--ui-bg-secondary',
        '--ui-bg-tertiary',
        '--ui-bg-elevated',
        '--ui-bg-overlay',
        '--ui-text',
        '--ui-text-secondary',
        '--ui-text-muted',
        '--ui-text-inverse',
        '--ui-border',
        '--ui-border-strong',
        '--ui-border-focus',
        '--ui-accent',
        '--ui-accent-hover',
        '--ui-accent-active',
        '--ui-accent-subtle',
        '--ui-success',
        '--ui-success-bg',
        '--ui-warning',
        '--ui-warning-bg',
        '--ui-error',
        '--ui-error-bg',
      ];

      expectedKeys.forEach(key => {
        expect(vars).toHaveProperty(key);
      });
    });

    it('should work with dark theme', () => {
      const vars = tokensToCssVars(darkTheme);
      expect(vars['--ui-bg']).toBe(darkTheme.bg);
      expect(vars['--ui-text']).toBe(darkTheme.text);
    });
  });
});
