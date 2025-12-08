import type { Preview } from '@storybook/html';
import { defineCustomElements } from '../loader';
import { defineCustomElements as defineIcons } from '@sage-box/icons/loader';

// Register Stencil web components
defineCustomElements();
defineIcons();

// Inyectar tokens CSS del core manualmente para asegurar que estén disponibles
const style = document.createElement('style');
style.textContent = `
:root {
  /* =====================================================
     COLOR PALETTE - Base colors
     ===================================================== */

  /* Neutral Scale */
  --ui-color-neutral-0: #ffffff;
  --ui-color-neutral-50: #f9fafb;
  --ui-color-neutral-100: #f3f4f6;
  --ui-color-neutral-200: #e5e7eb;
  --ui-color-neutral-300: #d1d5db;
  --ui-color-neutral-400: #9ca3af;
  --ui-color-neutral-500: #6b7280;
  --ui-color-neutral-600: #4b5563;
  --ui-color-neutral-700: #374151;
  --ui-color-neutral-800: #1f2937;
  --ui-color-neutral-900: #111827;
  --ui-color-neutral-950: #030712;

  /* Primary - Blue */
  --ui-color-primary-50: #eff6ff;
  --ui-color-primary-100: #dbeafe;
  --ui-color-primary-200: #bfdbfe;
  --ui-color-primary-300: #93c5fd;
  --ui-color-primary-400: #60a5fa;
  --ui-color-primary-500: #3b82f6;
  --ui-color-primary-600: #2563eb;
  --ui-color-primary-700: #1d4ed8;
  --ui-color-primary-800: #1e40af;
  --ui-color-primary-900: #1e3a8a;

  /* Success - Green */
  --ui-color-success-50: #f0fdf4;
  --ui-color-success-100: #dcfce7;
  --ui-color-success-500: #22c55e;
  --ui-color-success-600: #16a34a;
  --ui-color-success-700: #15803d;

  /* Warning - Amber */
  --ui-color-warning-50: #fffbeb;
  --ui-color-warning-100: #fef3c7;
  --ui-color-warning-500: #f59e0b;
  --ui-color-warning-600: #d97706;
  --ui-color-warning-700: #b45309;

  /* Error - Red */
  --ui-color-error-50: #fef2f2;
  --ui-color-error-100: #fee2e2;
  --ui-color-error-500: #ef4444;
  --ui-color-error-600: #dc2626;
  --ui-color-error-700: #b91c1c;

  /* =====================================================
     SEMANTIC TOKENS - Light Theme (default)
     ===================================================== */

  /* Backgrounds */
  --ui-bg: var(--ui-color-neutral-0);
  --ui-bg-secondary: var(--ui-color-neutral-50);
  --ui-bg-tertiary: var(--ui-color-neutral-100);
  --ui-bg-elevated: var(--ui-color-neutral-0);
  --ui-bg-overlay: rgba(0, 0, 0, 0.5);

  /* Text */
  --ui-text: var(--ui-color-neutral-900);
  --ui-text-secondary: var(--ui-color-neutral-600);
  --ui-text-muted: var(--ui-color-neutral-400);
  --ui-text-inverse: var(--ui-color-neutral-0);

  /* Borders */
  --ui-border: var(--ui-color-neutral-200);
  --ui-border-strong: var(--ui-color-neutral-300);
  --ui-border-focus: var(--ui-color-primary-500);

  /* Interactive */
  --ui-accent: var(--ui-color-primary-500);
  --ui-accent-hover: var(--ui-color-primary-600);
  --ui-accent-active: var(--ui-color-primary-700);
  --ui-accent-subtle: var(--ui-color-primary-50);

  /* Status */
  --ui-success: var(--ui-color-success-500);
  --ui-success-bg: var(--ui-color-success-50);
  --ui-warning: var(--ui-color-warning-500);
  --ui-warning-bg: var(--ui-color-warning-50);
  --ui-error: var(--ui-color-error-500);
  --ui-error-bg: var(--ui-color-error-50);

  /* =====================================================
     TYPOGRAPHY
     ===================================================== */

  --ui-font-sans: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  --ui-font-mono: 'SF Mono', 'Fira Code', 'Fira Mono', Menlo, Monaco, Consolas, 'Liberation Mono', monospace;
  --ui-font-serif: Georgia, Cambria, 'Times New Roman', Times, serif;

  --ui-font-size-xs: 0.75rem; /* 12px */
  --ui-font-size-sm: 0.875rem; /* 14px */
  --ui-font-size-base: 1rem; /* 16px */
  --ui-font-size-lg: 1.125rem; /* 18px */
  --ui-font-size-xl: 1.25rem; /* 20px */
  --ui-font-size-2xl: 1.5rem; /* 24px */
  --ui-font-size-3xl: 1.875rem; /* 30px */
  --ui-font-size-4xl: 2.25rem; /* 36px */

  --ui-font-weight-normal: 400;
  --ui-font-weight-medium: 500;
  --ui-font-weight-semibold: 600;
  --ui-font-weight-bold: 700;

  --ui-line-height-tight: 1.25;
  --ui-line-height-normal: 1.5;
  --ui-line-height-relaxed: 1.625;
  --ui-line-height-loose: 2;

  /* =====================================================
     SPACING
     ===================================================== */

  --ui-space-0: 0;
  --ui-space-1: 0.25rem; /* 4px */
  --ui-space-2: 0.5rem; /* 8px */
  --ui-space-3: 0.75rem; /* 12px */
  --ui-space-4: 1rem; /* 16px */
  --ui-space-5: 1.25rem; /* 20px */
  --ui-space-6: 1.5rem; /* 24px */
  --ui-space-8: 2rem; /* 32px */
  --ui-space-10: 2.5rem; /* 40px */
  --ui-space-12: 3rem; /* 48px */
  --ui-space-16: 4rem; /* 64px */

  /* =====================================================
     BORDERS & RADIUS
     ===================================================== */

  --ui-radius-none: 0;
  --ui-radius-sm: 0.25rem; /* 4px */
  --ui-radius-md: 0.375rem; /* 6px */
  --ui-radius-lg: 0.5rem; /* 8px */
  --ui-radius-xl: 0.75rem; /* 12px */
  --ui-radius-2xl: 1rem; /* 16px */
  --ui-radius-full: 9999px;

  --ui-border-width: 1px;
  --ui-border-width-2: 2px;

  /* =====================================================
     SHADOWS
     ===================================================== */

  --ui-shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --ui-shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
  --ui-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  --ui-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
  --ui-shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  --ui-shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.05);

  /* Focus ring */
  --ui-ring-width: 2px;
  --ui-ring-offset: 2px;
  --ui-ring-color: var(--ui-color-primary-500);

  /* =====================================================
     TRANSITIONS
     ===================================================== */

  --ui-transition-fast: 150ms ease;
  --ui-transition-normal: 250ms ease;
  --ui-transition-slow: 350ms ease;

  /* =====================================================
     Z-INDEX SCALE
     ===================================================== */

  --ui-z-dropdown: 1000;
  --ui-z-sticky: 1020;
  --ui-z-fixed: 1030;
  --ui-z-modal-backdrop: 1040;
  --ui-z-modal: 1050;
  --ui-z-popover: 1060;
  --ui-z-tooltip: 1070;
}

/* Dark mode */
[data-theme="dark"], .dark {
  --ui-bg: var(--ui-color-neutral-900);
  --ui-bg-secondary: var(--ui-color-neutral-800);
  --ui-bg-tertiary: var(--ui-color-neutral-700);
  --ui-bg-elevated: var(--ui-color-neutral-800);
  --ui-bg-overlay: rgba(0, 0, 0, 0.7);

  --ui-text: var(--ui-color-neutral-50);
  --ui-text-secondary: var(--ui-color-neutral-400);
  --ui-text-muted: var(--ui-color-neutral-500);
  --ui-text-inverse: var(--ui-color-neutral-900);

  --ui-border: var(--ui-color-neutral-700);
  --ui-border-strong: var(--ui-color-neutral-600);
  --ui-border-focus: var(--ui-color-primary-400);

  --ui-accent: var(--ui-color-primary-400);
  --ui-accent-hover: var(--ui-color-primary-300);
  --ui-accent-active: var(--ui-color-primary-500);
  --ui-accent-subtle: var(--ui-color-primary-900);
}

body {
  font-family: var(--ui-font-sans, sans-serif);
  margin: 0;
  padding: 1rem;
  background: var(--ui-bg, #ffffff);
  color: var(--ui-text, #1f2937);
}
`;
document.head.appendChild(style);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      options: {
        light: { name: 'light', value: '#ffffff' },
        dark: { name: 'dark', value: '#1f2937' }
      }
    },
  },

  initialGlobals: {
    backgrounds: {
      value: 'light'
    }
  }
};

export default preview;
