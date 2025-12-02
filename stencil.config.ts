import { Config } from '@stencil/core';
// Angular proxies are now manually maintained in angular/src/directives/proxies.ts
// import { angularOutputTarget } from '@stencil/angular-output-target';

export const config: Config = {
  namespace: 'saged-ui',
  sourceMap: false,
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
    // Angular proxies are manually maintained - don't auto-generate
    // This avoids issues with file: dependencies and saged-ui/components imports
    // angularOutputTarget({
    //   componentCorePackage: 'saged-ui',
    //   outputType: 'standalone',
    //   directivesProxyFile: './angular/src/directives/proxies.ts',
    //   directivesArrayFile: './angular/src/directives/index.ts',
    // }),
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
