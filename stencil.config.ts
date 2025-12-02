import { Config } from '@stencil/core';
import { angularOutputTarget } from '@stencil/angular-output-target';
import { reactOutputTarget } from '@stencil/react-output-target';

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
    angularOutputTarget({
      componentCorePackage: 'saged-ui',
      outputType: 'standalone',
      directivesProxyFile: './angular/src/directives/proxies.ts',
      directivesArrayFile: './angular/src/directives/index.ts',
    }),
    reactOutputTarget({
      componentCorePackage: 'saged-ui',
      proxiesFile: './react/src/components/stencil-generated/index.ts',
      outDir: './react/dist',
    }),
    {
      type: 'docs-readme',
    },
  ],
  testing: {
    browserHeadless: "shell",
  },
};
