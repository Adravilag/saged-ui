// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'https://adravilag.github.io',
  base: '/sagebox',
  outDir: '../dist-docs',
  trailingSlash: 'always',
  // Static by default, SSR only where needed (Icon Manager)
  output: 'static',
  adapter: node({
    mode: 'standalone'
  }),
  build: {
    assets: 'assets'
  },
  vite: {
    server: {
      fs: {
        // Permitir acceso a archivos del proyecto padre
        allow: ['..']
      }
    }
  }
});
