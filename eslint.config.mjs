// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook';

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: [
      'dist/**',
      'loader/**',
      'node_modules/**',
      'docs/**',
      'www/**',
      '.stencil/**',
      'storybook-static/**',
      '*.config.js',
      '*.config.ts',
      'scripts/**',
      'bin/**',
      'cli/**',
      '**/*.stories.ts',
      // Monorepo packages
      'packages/**/dist/**',
      'packages/**/loader/**',
      'packages/**/node_modules/**',
      'packages/**/cli/**',
      'packages/**/bin/**',
      'packages/**/src/components.d.ts',
      // Auto-generated wrappers
      'wrappers/**',
    ],
  },
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.eslint.json',
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^(h|Host|Fragment)$' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
  {
    files: ['packages/**/*.ts', 'packages/**/*.tsx'],
    languageOptions: {
      parserOptions: {
        project: null,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^(h|Host|Fragment)$' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
  storybook.configs['flat/recommended'],
  storybook.configs['flat/recommended'],
  storybook.configs['flat/recommended'],
  storybook.configs['flat/recommended']
);
