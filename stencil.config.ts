import { Config } from '@stencil/core';
import { angularOutputTarget } from '@stencil/angular-output-target';
import { reactOutputTarget } from '@stencil/react-output-target';
import { resolve } from 'path';

// Fast mode: --watch OR STENCIL_FAST env var
const isDev = process.argv.includes('--watch') || process.env.STENCIL_FAST === 'true';

// Rollup alias plugin for resolving @sage-box/* packages to source
const aliasPlugin = {
  name: 'sagebox-alias',
  resolveId(source: string) {
    const aliases: Record<string, string> = {
      '@sage-box/icons': resolve(__dirname, 'packages/icons/src/index.ts'),
      '@sage-box/badge': resolve(__dirname, 'packages/badge/src/index.ts'),
      '@sage-box/button': resolve(__dirname, 'packages/button/src/index.ts'),
      '@sage-box/dropdown': resolve(__dirname, 'packages/dropdown/src/index.ts'),
      '@sage-box/modal': resolve(__dirname, 'packages/modal/src/index.ts'),
      '@sage-box/skeleton': resolve(__dirname, 'packages/skeleton/src/index.ts'),
      '@sage-box/theme-toggle': resolve(__dirname, 'packages/theme-toggle/src/index.ts'),
      '@sage-box/article-editor': resolve(__dirname, 'packages/article-editor/src/index.ts'),
      '@sage-box/core': resolve(__dirname, 'packages/core/src/index.ts'),
    };
    if (aliases[source]) {
      return aliases[source];
    }
    return null;
  },
};

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
  // Rollup plugins for resolving @sage-box/* aliases
  rollupPlugins: {
    before: [aliasPlugin],
  },
  outputTargets: isDev
    ? [
        // Fast mode: only custom elements, no dist/wrappers/docs
        {
          type: 'dist-custom-elements',
          customElementsExportBehavior: 'auto-define-custom-elements',
          externalRuntime: false,
        },
      ]
    : [
        {
          type: 'dist',
          esmLoaderPath: '../loader',
          collectionDir: 'collection',
          copy: [{ src: 'src/styles/tokens.css', dest: 'styles/tokens.css' }],
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
          stencilPackageName: 'sagebox',
          outDir: './wrappers/react/src/components/stencil-generated',
        }),
        { type: 'docs-readme' as const },
      ],
  testing: {
    browserHeadless: 'shell',
    testPathIgnorePatterns: [
      '/node_modules/',
      '/wrappers/angular/',
      '/wrappers/react/',
      '/docs/',
      '/tests/', // Playwright E2E tests
      '/packages/.*/dist/', // Ignore compiled dist in packages
      '/dist/collection/', // Ignore collection output
    ],
    modulePathIgnorePatterns: [
      '<rootDir>/wrappers/angular/',
      '<rootDir>/wrappers/react/',
      '<rootDir>/docs/',
      '<rootDir>/tests/', // Playwright E2E tests
      '<rootDir>/packages/.*/dist/', // Ignore compiled dist in packages
      '<rootDir>/dist/collection/', // Ignore collection output
    ],
    collectCoverageFrom: ['packages/**/src/**/*.{ts,tsx}', '!packages/**/src/**/*.stories.ts', '!packages/**/src/**/*.d.ts'],
    coverageReporters: ['text', 'lcov', 'html'],
    coverageDirectory: 'coverage',
  },
};
