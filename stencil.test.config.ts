import { Config } from '@stencil/core';

/**
 * Test configuration for SageBox - E2E testing with Playwright
 * Builds a www output target that can be served for browser testing
 */
export const config: Config = {
  namespace: 'sagebox',
  sourceMap: true,
  globalStyle: 'src/styles/tokens.css',
  srcDir: '.',
  globalScript: 'src/index.ts',
  watchIgnoredRegex: /node_modules|dist|dist-docs|\.git|coverage|website|wrappers|loader|tools|\.stencil|packages\/.*\/loader/,
  outputTargets: [
    {
      type: 'www',
      dir: 'www',
      serviceWorker: null,
      baseUrl: '/',
      copy: [
        { src: 'src/styles/tokens.css', dest: 'build/tokens.css' },
      ],
    },
  ],
  devServer: {
    port: 3333,
    reloadStrategy: 'pageReload',
  },
  testing: {
    browserHeadless: 'shell',
  },
};
