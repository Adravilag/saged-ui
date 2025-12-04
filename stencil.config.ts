import { Config } from '@stencil/core';
import { angularOutputTarget } from '@stencil/angular-output-target';
import { reactOutputTarget } from '@stencil/react-output-target';

const isDev = process.argv.includes('--watch');

export const config: Config = {
  namespace: 'sagebox',
  sourceMap: isDev, // Enable source maps in dev for debugging
  globalStyle: 'src/styles/tokens.css',
  // Include components from packages
  srcDir: '.',
  // Tell Stencil where to find components (from packages)
  globalScript: 'src/index.ts',
  // Ignore directories for watch mode - IMPORTANT: ignore output directories to prevent infinite rebuild loops
  watchIgnoredRegex: /node_modules|dist|dist-docs|\.git|coverage|website|wrappers|loader|tools|\.stencil|packages\/.*\/loader/,
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
      // Disable collection in dev to avoid copying entire project (15k+ files)
      collectionDir: isDev ? null : 'collection',
      copy: [{ src: 'src/styles/tokens.css', dest: 'styles/tokens.css' }],
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
    },
    // Only generate Angular/React wrappers in production builds (slower)
    ...(isDev
      ? []
      : [
          angularOutputTarget({
            componentCorePackage: 'sagebox',
            outputType: 'standalone',
            directivesProxyFile: './wrappers/angular/src/directives/proxies.ts',
            directivesArrayFile: './wrappers/angular/src/directives/index.ts',
          }),
          reactOutputTarget({
            stencilPackageName: 'sagebox',
            outDir: './wrappers/react/src/components/stencil-generated',
          }),
        ]),
    // Only generate docs in production builds
    ...(isDev ? [] : [{ type: 'docs-readme' as const }]),
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
