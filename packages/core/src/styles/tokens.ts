/**
 * sagebox - Design Tokens (TypeScript)
 * Type-safe access to design tokens for programmatic use
 */

// =====================================================
// COLOR PALETTE
// =====================================================

export const colors = {
  neutral: {
    0: '#ffffff',
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
    950: '#030712',
  },
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
  },
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
  },
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
  },
} as const;

// =====================================================
// SEMANTIC TOKENS
// =====================================================

export interface SemanticTokens {
  bg: string;
  bgSecondary: string;
  bgTertiary: string;
  bgElevated: string;
  bgOverlay: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  textInverse: string;
  border: string;
  borderStrong: string;
  borderFocus: string;
  accent: string;
  accentHover: string;
  accentActive: string;
  accentSubtle: string;
  success: string;
  successBg: string;
  warning: string;
  warningBg: string;
  error: string;
  errorBg: string;
}

export const lightTheme: SemanticTokens = {
  bg: colors.neutral[0],
  bgSecondary: colors.neutral[50],
  bgTertiary: colors.neutral[100],
  bgElevated: colors.neutral[0],
  bgOverlay: 'rgba(0, 0, 0, 0.5)',
  text: colors.neutral[900],
  textSecondary: colors.neutral[600],
  textMuted: colors.neutral[400],
  textInverse: colors.neutral[0],
  border: colors.neutral[200],
  borderStrong: colors.neutral[300],
  borderFocus: colors.primary[500],
  accent: colors.primary[500],
  accentHover: colors.primary[600],
  accentActive: colors.primary[700],
  accentSubtle: colors.primary[50],
  success: colors.success[500],
  successBg: colors.success[50],
  warning: colors.warning[500],
  warningBg: colors.warning[50],
  error: colors.error[500],
  errorBg: colors.error[50],
};

export const darkTheme: SemanticTokens = {
  bg: colors.neutral[900],
  bgSecondary: colors.neutral[800],
  bgTertiary: colors.neutral[700],
  bgElevated: colors.neutral[800],
  bgOverlay: 'rgba(0, 0, 0, 0.7)',
  text: colors.neutral[50],
  textSecondary: colors.neutral[400],
  textMuted: colors.neutral[500],
  textInverse: colors.neutral[900],
  border: colors.neutral[700],
  borderStrong: colors.neutral[600],
  borderFocus: colors.primary[400],
  accent: colors.primary[400],
  accentHover: colors.primary[300],
  accentActive: colors.primary[500],
  accentSubtle: colors.primary[900],
  success: colors.success[500],
  successBg: colors.success[50],
  warning: colors.warning[500],
  warningBg: colors.warning[50],
  error: colors.error[500],
  errorBg: colors.error[50],
};

// =====================================================
// TYPOGRAPHY
// =====================================================

export const typography = {
  fontFamily: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    mono: "'SF Mono', 'Fira Code', 'Fira Mono', Menlo, Monaco, Consolas, 'Liberation Mono', monospace",
    serif: "Georgia, Cambria, 'Times New Roman', Times, serif",
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
} as const;

// =====================================================
// SPACING
// =====================================================

export const spacing = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
} as const;

// =====================================================
// BORDERS & RADIUS
// =====================================================

export const radius = {
  none: '0',
  sm: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  full: '9999px',
} as const;

export const borderWidth = {
  default: '1px',
  2: '2px',
} as const;

// =====================================================
// SHADOWS
// =====================================================

export const shadows = {
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
} as const;

// =====================================================
// TRANSITIONS
// =====================================================

export const transitions = {
  fast: '150ms ease',
  normal: '250ms ease',
  slow: '350ms ease',
} as const;

// =====================================================
// Z-INDEX
// =====================================================

export const zIndex = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
} as const;

// =====================================================
// THEME TYPES
// =====================================================

export type ThemeName = 'light' | 'dark' | 'auto' | 'purple' | 'emerald' | 'rose' | 'orange';

export interface Theme {
  name: ThemeName;
  tokens: SemanticTokens;
}

// =====================================================
// HELPER FUNCTIONS
// =====================================================

/**
 * Get CSS variable name for a token
 */
export function getCssVar(token: string): string {
  return `var(--ui-${token})`;
}

/**
 * Apply theme to an element via data attribute
 */
export function applyTheme(element: HTMLElement, theme: ThemeName): void {
  element.setAttribute('data-theme', theme);
}

/**
 * Get current theme from element
 */
export function getTheme(element: HTMLElement): ThemeName | null {
  return element.getAttribute('data-theme') as ThemeName | null;
}

/**
 * Convert tokens to CSS custom properties object
 */
export function tokensToCssVars(tokens: SemanticTokens): Record<string, string> {
  return {
    '--ui-bg': tokens.bg,
    '--ui-bg-secondary': tokens.bgSecondary,
    '--ui-bg-tertiary': tokens.bgTertiary,
    '--ui-bg-elevated': tokens.bgElevated,
    '--ui-bg-overlay': tokens.bgOverlay,
    '--ui-text': tokens.text,
    '--ui-text-secondary': tokens.textSecondary,
    '--ui-text-muted': tokens.textMuted,
    '--ui-text-inverse': tokens.textInverse,
    '--ui-border': tokens.border,
    '--ui-border-strong': tokens.borderStrong,
    '--ui-border-focus': tokens.borderFocus,
    '--ui-accent': tokens.accent,
    '--ui-accent-hover': tokens.accentHover,
    '--ui-accent-active': tokens.accentActive,
    '--ui-accent-subtle': tokens.accentSubtle,
    '--ui-success': tokens.success,
    '--ui-success-bg': tokens.successBg,
    '--ui-warning': tokens.warning,
    '--ui-warning-bg': tokens.warningBg,
    '--ui-error': tokens.error,
    '--ui-error-bg': tokens.errorBg,
  };
}

// Default export
export default {
  colors,
  typography,
  spacing,
  radius,
  borderWidth,
  shadows,
  transitions,
  zIndex,
  lightTheme,
  darkTheme,
};
