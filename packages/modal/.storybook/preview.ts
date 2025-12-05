import type { Preview } from '@storybook/html';
import { defineCustomElements } from '../loader';

// Register Stencil web components
defineCustomElements();

// Inyectar tokens CSS básicos para Storybook
const style = document.createElement('style');
style.textContent = `
  :root {
    /* Colores base */
    --sg-color-surface: #ffffff;
    --sg-color-surface-elevated: #ffffff;
    --sg-color-text: #1f2937;
    --sg-color-text-muted: #6b7280;
    --sg-color-border: #e5e7eb;
    --sg-color-primary: #3b82f6;
    --sg-color-primary-hover: #2563eb;
    
    /* Espaciado */
    --sg-space-xs: 0.25rem;
    --sg-space-sm: 0.5rem;
    --sg-space-md: 1rem;
    --sg-space-lg: 1.5rem;
    --sg-space-xl: 2rem;
    
    /* Bordes */
    --sg-radius-sm: 0.25rem;
    --sg-radius-md: 0.5rem;
    --sg-radius-lg: 0.75rem;
    
    /* Sombras */
    --sg-shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --sg-shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    --sg-shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
    --sg-shadow-xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
    
    /* Tipografía */
    --sg-font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    --sg-font-size-sm: 0.875rem;
    --sg-font-size-md: 1rem;
    --sg-font-size-lg: 1.125rem;
    --sg-font-size-xl: 1.25rem;
    --sg-font-weight-normal: 400;
    --sg-font-weight-medium: 500;
    --sg-font-weight-semibold: 600;
    --sg-font-weight-bold: 700;
    
    /* Transiciones */
    --sg-transition-fast: 150ms;
    --sg-transition-normal: 200ms;
  }
  
  /* Dark mode */
  [data-theme="dark"], .dark {
    --sg-color-surface: #1f2937;
    --sg-color-surface-elevated: #374151;
    --sg-color-text: #f9fafb;
    --sg-color-text-muted: #9ca3af;
    --sg-color-border: #4b5563;
    --sg-color-primary: #60a5fa;
    --sg-color-primary-hover: #93c5fd;
  }
  
  body {
    font-family: var(--sg-font-family);
    margin: 0;
    padding: 1rem;
    background: var(--sg-color-surface);
    color: var(--sg-color-text);
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
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1f2937' },
      ],
    },
  },
};

export default preview;
