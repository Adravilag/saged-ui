// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://adravilag.github.io',
  base: '/saged-ui',
  outDir: '../dist-docs',
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
