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

  /* Danger - Red */
  --ui-color-danger-50: #fef2f2;
  --ui-color-danger-100: #fee2e2;
  --ui-color-danger-500: #ef4444;
  --ui-color-danger-600: #dc2626;
  --ui-color-danger-700: #b91c1c;

  /* =====================================================
     SEMANTIC TOKENS
     ===================================================== */

  /* Backgrounds */
  --sg-bg-primary: var(--ui-color-neutral-0);
  --sg-bg-secondary: var(--ui-color-neutral-50);
  --sg-bg-tertiary: var(--ui-color-neutral-100);
  --sg-bg-hover: var(--ui-color-neutral-100);
  --sg-bg-active: var(--ui-color-neutral-200);
  --sg-bg-disabled: var(--ui-color-neutral-100);
  --sg-bg-overlay: rgba(0, 0, 0, 0.5);

  /* Text */
  --sg-text-primary: var(--ui-color-neutral-900);
  --sg-text-secondary: var(--ui-color-neutral-600);
  --sg-text-tertiary: var(--ui-color-neutral-400);
  --sg-text-disabled: var(--ui-color-neutral-300);
  --sg-text-inverse: var(--ui-color-neutral-0);

  /* Borders */
  --sg-border-color: var(--ui-color-neutral-200);
  --sg-border-hover: var(--ui-color-neutral-300);
  --sg-border-focus: var(--ui-color-primary-500);
  --sg-border-radius: 0.375rem;
  --sg-border-width: 1px;

  /* Status Colors */
  --sg-color-primary: var(--ui-color-primary-600);
  --sg-color-primary-hover: var(--ui-color-primary-700);
  --sg-color-success: var(--ui-color-success-600);
  --sg-color-warning: var(--ui-color-warning-600);
  --sg-color-danger: var(--ui-color-danger-600);
  --sg-color-info: var(--ui-color-primary-500);

  /* Typography */
  --sg-font-family: 'Inter', system-ui, -apple-system, sans-serif;
  --sg-font-size-sm: 0.875rem;
  --sg-font-size-base: 1rem;
  --sg-font-size-lg: 1.125rem;
  --sg-font-size-xl: 1.25rem;
  --sg-line-height: 1.5;
}
`;
document.head.appendChild(style);

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
