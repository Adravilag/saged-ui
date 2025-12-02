import { Config } from '@stencil/core';

/**
 * Minimal development configuration for SagedUI
 * Fast rebuild times - outputs to docs/public for Astro dev server
 */
export const config: Config = {
  namespace: 'saged-ui',
  sourceMap: true,
  globalStyle: 'src/styles/tokens.css',
  outputTargets: [
    {
      type: 'www',
      dir: 'docs/public',
      buildDir: 'saged-ui',
      serviceWorker: null,
      copy: [
        { src: 'styles/tokens.css', dest: 'saged-ui/tokens.css' },
      ],
    },
  ],
  testing: {
    browserHeadless: 'shell',
  },
};
