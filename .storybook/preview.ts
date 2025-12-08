import type { Preview } from '@storybook/html';
import { defineCustomElements } from '../loader';

// Import global design tokens
import '../src/styles/tokens.css';

// Register Stencil web components
defineCustomElements();

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
    },
    backgrounds: {
      options: {
        light: { name: 'light', value: '#ffffff' },
        dark: { name: 'dark', value: '#1f2937' },
        neutral: { name: 'neutral', value: '#f3f4f6' }
      }
    },
  },

  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: '', title: '☀️ Light' },
          { value: 'dark', title: '🌙 Dark' },
          { value: 'purple', title: '💜 Purple' },
          { value: 'emerald', title: '💚 Emerald' },
          { value: 'rose', title: '🌹 Rose' },
          { value: 'orange', title: '🧡 Orange' },
        ],
        dynamicTitle: true,
      },
    },
    locale: {
      name: 'Locale',
      description: 'Internationalization locale',
      defaultValue: 'en',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'en', right: '🇺🇸', title: 'English' },
          { value: 'es', right: '🇪🇸', title: 'Español' },
          { value: 'fr', right: '🇫🇷', title: 'Français' },
          { value: 'de', right: '🇩🇪', title: 'Deutsch' },
          { value: 'pt', right: '🇵🇹', title: 'Português' },
          { value: 'it', right: '🇮🇹', title: 'Italiano' },
          { value: 'zh', right: '🇨🇳', title: '中文' },
          { value: 'ja', right: '🇯🇵', title: '日本語' },
          { value: 'ko', right: '🇰🇷', title: '한국어' },
          { value: 'ar', right: '🇸🇦', title: 'العربية' },
        ],
        dynamicTitle: true,
      },
    },
  },

  decorators: [
    (story, context) => {
      const theme = context.globals.theme;
      const container = document.createElement('div');

      if (theme) {
        container.dataset.theme = theme;
      }

      // Apply theme-appropriate background
      if (theme === 'dark') {
        container.style.background = '#1f2937';
        container.style.padding = '1rem';
        container.style.borderRadius = '8px';
        container.style.minHeight = '100px';
      }

      const storyResult = story();

      // Handle both string HTML and DOM nodes
      if (typeof storyResult === 'string') {
        container.innerHTML = storyResult;
      } else if (storyResult instanceof Node) {
        container.appendChild(storyResult);
      } else {
        container.innerHTML = String(storyResult);
      }

      return container;
    },
  ],

  initialGlobals: {
    backgrounds: {
      value: 'light'
    }
  }
};

export default preview;
