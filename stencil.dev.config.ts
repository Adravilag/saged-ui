import { Config } from '@stencil/core';

/**
 * Minimal development configuration for SageBox
 * Fast rebuild times - outputs to docs/public for Astro dev server
 */
export const config: Config = {
  namespace: 'sagebox',
  sourceMap: true,
  globalStyle: 'src/styles/tokens.css',
  outputTargets: [
    {
      type: 'www',
      dir: 'docs/public',
      buildDir: 'sagebox',
      serviceWorker: null,
      copy: [
        { src: 'styles/tokens.css', dest: 'sagebox/tokens.css' },
      ],
    },
  ],
  testing: {
    browserHeadless: 'shell',
  },
};
