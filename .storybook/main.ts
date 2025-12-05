import type { StorybookConfig } from '@storybook/html-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)', '../packages/**/src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/html-vite',
    options: {},
  },
  staticDirs: ['../dist'],
  async viteFinal(config) {
    // Configurar HMR para detectar cambios en icons/index.ts
    config.server = {
      ...config.server,
      watch: {
        ...config.server?.watch,
        // Incluir la carpeta de iconos en el watch
        ignored: ['!**/src/components/svg-icon/icons/**'],
      },
    };

    // Forzar que los cambios en icons/index.ts invaliden el cache
    config.optimizeDeps = {
      ...config.optimizeDeps,
      exclude: [...(config.optimizeDeps?.exclude || []), './src/components/svg-icon/icons'],
    };

    return config;
  },
};

export default config;
