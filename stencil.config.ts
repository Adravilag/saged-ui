import { Config } from '@stencil/core';
import { angularOutputTarget } from '@stencil/angular-output-target';
import { reactOutputTarget } from '@stencil/react-output-target';

export const config: Config = {
  namespace: 'sagebox',
  sourceMap: false,
  globalStyle: 'src/styles/tokens.css',
  // Include components from packages
  srcDir: 'src',
  // Tell Stencil where to find components (from packages)
  globalScript: 'src/index.ts',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
      copy: [{ src: 'styles/tokens.css', dest: 'styles/tokens.css' }],
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
    },
    angularOutputTarget({
      componentCorePackage: 'sagebox',
      outputType: 'standalone',
      directivesProxyFile: './wrappers/angular/src/directives/proxies.ts',
      directivesArrayFile: './wrappers/angular/src/directives/index.ts',
    }),
    reactOutputTarget({
      componentCorePackage: 'sagebox',
      proxiesFile: './wrappers/react/src/components/stencil-generated/index.ts',
      outDir: './wrappers/react/dist',
    }),
    {
      type: 'docs-readme',
    },
  ],
  testing: {
    browserHeadless: 'shell',
    testPathIgnorePatterns: [
      '/node_modules/',
      '/wrappers/angular/',
      '/wrappers/react/',
      '/docs/',
      '/tests/', // Playwright E2E tests
    ],
    modulePathIgnorePatterns: [
      '<rootDir>/wrappers/angular/',
      '<rootDir>/wrappers/react/',
      '<rootDir>/docs/',
      '<rootDir>/tests/', // Playwright E2E tests
    ],
    collectCoverageFrom: ['packages/**/src/**/*.{ts,tsx}', '!packages/**/src/**/*.stories.ts', '!packages/**/src/**/*.d.ts'],
    coverageReporters: ['text', 'lcov', 'html'],
    coverageDirectory: 'coverage',
  },
};
