import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'saged-ui',
  globalStyle: 'src/styles/tokens.css',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
      copy: [
        { src: 'styles/tokens.css', dest: 'styles/tokens.css' },
      ],
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null,
      copy: [
        { src: 'styles/tokens.css', dest: 'styles/tokens.css' },
      ],
    },
  ],
  testing: {
    browserHeadless: "shell",
  },
};
