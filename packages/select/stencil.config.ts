import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'sagebox-select',
  sourceMap: false,
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
    },
    {
      type: 'docs-readme',
    },
  ],
  testing: {
    browserHeadless: 'shell',
    collectCoverageFrom: ['src/components/**/*.{ts,tsx}', '!src/components/**/*.stories.ts', '!src/components/**/*.d.ts'],
    coverageReporters: ['text', 'lcov', 'html'],
    coverageDirectory: 'coverage',
  },
};
