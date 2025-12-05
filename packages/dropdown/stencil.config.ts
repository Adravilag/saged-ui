import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'sagebox-dropdown',
  taskQueue: 'async',
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
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  },
};
