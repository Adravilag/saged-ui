/**
 * SagedUI Design Tokens
 * CSS Custom Properties as JavaScript constants
 */

export const colors = {
  // Primary
  primary: 'var(--sg-color-primary, #6366f1)',
  primaryHover: 'var(--sg-color-primary-hover, #4f46e5)',
  primaryActive: 'var(--sg-color-primary-active, #4338ca)',

  // Secondary
  secondary: 'var(--sg-color-secondary, #64748b)',
  secondaryHover: 'var(--sg-color-secondary-hover, #475569)',

  // Success
  success: 'var(--sg-color-success, #22c55e)',
  successHover: 'var(--sg-color-success-hover, #16a34a)',

  // Warning
  warning: 'var(--sg-color-warning, #f59e0b)',
  warningHover: 'var(--sg-color-warning-hover, #d97706)',

  // Danger
  danger: 'var(--sg-color-danger, #ef4444)',
  dangerHover: 'var(--sg-color-danger-hover, #dc2626)',

  // Neutral
  background: 'var(--sg-color-background, #ffffff)',
  surface: 'var(--sg-color-surface, #f8fafc)',
  border: 'var(--sg-color-border, #e2e8f0)',
  text: 'var(--sg-color-text, #1e293b)',
  textMuted: 'var(--sg-color-text-muted, #64748b)',
} as const;

export const spacing = {
  xs: 'var(--sg-spacing-xs, 0.25rem)',
  sm: 'var(--sg-spacing-sm, 0.5rem)',
  md: 'var(--sg-spacing-md, 1rem)',
  lg: 'var(--sg-spacing-lg, 1.5rem)',
  xl: 'var(--sg-spacing-xl, 2rem)',
  '2xl': 'var(--sg-spacing-2xl, 3rem)',
} as const;

export const radii = {
  none: '0',
  sm: 'var(--sg-radius-sm, 0.25rem)',
  md: 'var(--sg-radius-md, 0.375rem)',
  lg: 'var(--sg-radius-lg, 0.5rem)',
  xl: 'var(--sg-radius-xl, 0.75rem)',
  full: '9999px',
} as const;

export const fontSizes = {
  xs: 'var(--sg-font-size-xs, 0.75rem)',
  sm: 'var(--sg-font-size-sm, 0.875rem)',
  md: 'var(--sg-font-size-md, 1rem)',
  lg: 'var(--sg-font-size-lg, 1.125rem)',
  xl: 'var(--sg-font-size-xl, 1.25rem)',
  '2xl': 'var(--sg-font-size-2xl, 1.5rem)',
} as const;

export const shadows = {
  none: 'none',
  sm: 'var(--sg-shadow-sm, 0 1px 2px 0 rgb(0 0 0 / 0.05))',
  md: 'var(--sg-shadow-md, 0 4px 6px -1px rgb(0 0 0 / 0.1))',
  lg: 'var(--sg-shadow-lg, 0 10px 15px -3px rgb(0 0 0 / 0.1))',
} as const;

export const transitions = {
  fast: 'var(--sg-transition-fast, 150ms ease)',
  normal: 'var(--sg-transition-normal, 200ms ease)',
  slow: 'var(--sg-transition-slow, 300ms ease)',
} as const;

export const tokens = {
  colors,
  spacing,
  radii,
  fontSizes,
  shadows,
  transitions,
} as const;

export default tokens;
