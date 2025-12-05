#!/usr/bin/env node

/**
 * SageBox Component Generator
 *
 * Creates a new component package with all necessary files:
 * - package.json
 * - stencil.config.ts
 * - tsconfig.json
 * - Component files (tsx, css, spec, stories)
 * - Updates root package.json exports
 * - Updates src/components/index.ts
 * - Updates tsconfig.json paths
 * - Updates .changeset/config.json
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const ROOT_DIR = path.resolve(__dirname, '..');
const PACKAGES_DIR = path.join(ROOT_DIR, 'packages');
const CORE_TOKENS_PATH = path.join(ROOT_DIR, 'packages', 'core', 'src', 'styles', 'tokens.css');
const CORE_ALIASES_PATH = path.join(ROOT_DIR, 'packages', 'core', 'src', 'styles', 'aliases.css');

// Helper to ask questions
function ask(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise(resolve => {
    rl.question(question, answer => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

// Extract CSS custom properties from a CSS file
function extractCSSTokens(filePath) {
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️  Token file not found: ${filePath}`);
    return '';
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const tokens = [];

  // Match CSS custom properties in :root
  const rootMatch = content.match(/:root\s*\{([^}]+(?:\{[^}]*\}[^}]*)*)\}/gs);
  if (rootMatch) {
    rootMatch.forEach(block => {
      // Extract all --sg-* or --ui-* properties with their values
      const propMatches = block.matchAll(/^\s*(--(?:sg|ui)-[a-z0-9-]+)\s*:\s*([^;]+);/gm);
      for (const match of propMatches) {
        // Only include --sg-* tokens (the public API)
        if (match[1].startsWith('--sg-')) {
          tokens.push(`    ${match[1]}: ${match[2].trim()};`);
        }
      }
    });
  }

  return tokens.join('\n');
}

// Convert to different cases
function toPascalCase(str) {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

function toKebabCase(str) {
  return str.toLowerCase().replace(/\s+/g, '-');
}

// Template files
function getPackageJson(name, description) {
  return JSON.stringify(
    {
      name: `@sagebox/${name}`,
      version: '1.0.0',
      description: `${description} - SageBox component`,
      main: 'dist/index.cjs.js',
      module: 'dist/index.js',
      types: 'dist/types/index.d.ts',
      collection: 'dist/collection/collection-manifest.json',
      unpkg: `dist/sagebox-${name}/sagebox-${name}.esm.js`,
      exports: {
        '.': {
          types: './dist/types/index.d.ts',
          import: './dist/index.js',
          require: './dist/index.cjs.js',
        },
        './loader': {
          types: './loader/index.d.ts',
          import: './loader/index.js',
          require: './loader/index.cjs',
        },
      },
      repository: {
        type: 'git',
        url: 'https://github.com/Adravilag/sagebox.git',
        directory: `packages/${name}`,
      },
      files: ['dist/', 'loader/'],
      scripts: {
        build: 'stencil build',
        'build:watch': 'stencil build --watch',
        test: 'stencil test --spec',
        storybook: 'stencil build && storybook dev -p 6006',
        'storybook:fast': 'storybook dev -p 6006',
        'build-storybook': 'stencil build && storybook build',
      },
      peerDependencies: {
        '@sagebox/core': '^1.0.0',
      },
      devDependencies: {
        '@stencil/core': '^4.27.1',
        typescript: '^5.9.3',
      },
      keywords: ['sagebox', name, 'web-components', 'stencil'],
      author: 'adravilag',
      license: 'MIT',
      publishConfig: { access: 'public' },
    },
    null,
    2
  );
}

function getStencilConfig(name) {
  return `import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'sagebox-${name}',
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
`;
}

function getTsConfig() {
  return JSON.stringify(
    {
      extends: '../../tsconfig.json',
      compilerOptions: {
        outDir: 'dist',
        declarationDir: 'dist/types',
      },
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: ['node_modules', 'dist'],
    },
    null,
    2
  );
}

function getIndexTs(name) {
  return `export * from './components/${name}/${name}';
`;
}

function getComponentTsx(name, pascalName, tagName) {
  return `import { Component, Prop, h, Host } from '@stencil/core';

/**
 * @component ${tagName}
 * @description ${pascalName} component for SageBox
 */
@Component({
  tag: '${tagName}',
  styleUrl: '${name}.css',
  shadow: true,
})
export class ${pascalName} {
  /**
   * Example property
   */
  @Prop() variant: 'default' | 'primary' | 'secondary' = 'default';

  render() {
    return (
      <Host class={\`sg-${name} sg-${name}--\${this.variant}\`}>
        <slot></slot>
      </Host>
    );
  }
}
`;
}

function getComponentCss(name) {
  return `:host {
  display: block;
}

.sg-${name} {
  /* Base styles */
}

.sg-${name}--default {
  /* Default variant */
}

.sg-${name}--primary {
  /* Primary variant */
}

.sg-${name}--secondary {
  /* Secondary variant */
}
`;
}

function getComponentSpec(name, pascalName, tagName) {
  return `import { newSpecPage } from '@stencil/core/testing';
import { ${pascalName} } from './${name}';

describe('${tagName}', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [${pascalName}],
      html: \`<${tagName}></${tagName}>\`,
    });
    expect(page.root).toEqualHtml(\`
      <${tagName} class="sg-${name} sg-${name}--default">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </${tagName}>
    \`);
  });

  it('applies variant class', async () => {
    const page = await newSpecPage({
      components: [${pascalName}],
      html: \`<${tagName} variant="primary"></${tagName}>\`,
    });
    expect(page.root).toHaveClass('sg-${name}--primary');
  });
});
`;
}

function getComponentStories(name, pascalName, tagName) {
  return `export default {
  title: 'Components/${pascalName}',
  component: '${tagName}',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'secondary'],
      description: 'Component variant',
    },
  },
};

// Helper to create story HTML with event listeners
const createStory = (html) => {
  const container = document.createElement('div');
  container.innerHTML = html;
  return container;
};

export const Default = {
  render: () => createStory(\`
    <${tagName} variant="default">
      ${pascalName} Content
    </${tagName}>
  \`),
};

export const Primary = {
  render: () => createStory(\`
    <${tagName} variant="primary">
      Primary ${pascalName}
    </${tagName}>
  \`),
};

export const Secondary = {
  render: () => createStory(\`
    <${tagName} variant="secondary">
      Secondary ${pascalName}
    </${tagName}>
  \`),
};
`;
}

function getStorybookMain() {
  return `import type { StorybookConfig } from '@storybook/html-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/html-vite',
    options: {},
  },
  staticDirs: ['../dist'],
};

export default config;
`;
}

function getStorybookPreview() {
  // Extract tokens from core aliases.css
  const tokens = extractCSSTokens(CORE_ALIASES_PATH);

  // Fallback tokens if aliases.css doesn't exist or is empty
  const fallbackTokens = `    --sg-color-surface: #ffffff;
    --sg-color-text: #1f2937;
    --sg-color-border: #e5e7eb;
    --sg-color-primary: #3b82f6;
    --sg-space-md: 1rem;
    --sg-radius-md: 0.5rem;
    --sg-font-family: system-ui, -apple-system, sans-serif;`;

  const cssTokens = tokens || fallbackTokens;

  return `import type { Preview } from '@storybook/html';
import { defineCustomElements } from '../loader';

// Register Stencil web components
defineCustomElements();

// Inject CSS tokens for Storybook (auto-generated from @sagebox/core)
const style = document.createElement('style');
style.textContent = \`
  :root {
${cssTokens}
  }
  body {
    font-family: var(--sg-font-family, system-ui, sans-serif);
    margin: 0;
    padding: 1rem;
    background: var(--sg-color-surface, #ffffff);
    color: var(--sg-color-text, #1f2937);
  }
\`;
document.head.appendChild(style);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1f2937' },
      ],
    },
  },
};

export default preview;
`;
}

function getReadme(name, pascalName, tagName, description) {
  return `# @sagebox/${name}

${description}

## Installation

\`\`\`bash
npm install @sagebox/${name}
\`\`\`

## Usage

### HTML

\`\`\`html
<script type="module">
  import { defineCustomElements } from '@sagebox/${name}/loader';
  defineCustomElements();
</script>

<${tagName}>Content</${tagName}>
\`\`\`

### React

\`\`\`jsx
import '@sagebox/${name}';

function App() {
  return <${tagName}>Content</${tagName}>;
}
\`\`\`

### Angular

\`\`\`typescript
import '@sagebox/${name}';

@Component({
  template: \`<${tagName}>Content</${tagName}>\`
})
export class AppComponent {}
\`\`\`

## Properties

| Property  | Type                                    | Default     | Description       |
|-----------|-----------------------------------------|-------------|-------------------|
| \`variant\` | \`'default' \\| 'primary' \\| 'secondary'\` | \`'default'\` | Component variant |

## Slots

| Slot      | Description            |
|-----------|------------------------|
| (default) | Main content           |

## CSS Custom Properties

| Property              | Description        |
|-----------------------|--------------------|
| \`--sg-${name}-color\` | Main color        |

## License

MIT
`;
}

// Update root package.json exports
function updateRootPackageJson(name, tagName) {
  const packageJsonPath = path.join(ROOT_DIR, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

  // Add component export
  packageJson.exports[`./components/${tagName}.js`] = {
    types: `./dist/components/${tagName}.d.ts`,
    import: `./dist/components/${tagName}.js`,
  };

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
  console.log('  ✅ Updated root package.json exports');
}

// Update src/components/index.ts to export the new component
function updateComponentsIndex(name) {
  const indexPath = path.join(ROOT_DIR, 'src', 'components', 'index.ts');
  let content = fs.readFileSync(indexPath, 'utf-8');

  const exportLine = `export * from '@sagebox/${name}';`;

  // Check if already exported
  if (content.includes(exportLine)) {
    console.log('  ⏭️  Component already exported in src/components/index.ts');
    return;
  }

  // Add export before the last line or at the end
  if (content.endsWith('\n')) {
    content = content.slice(0, -1) + `\n${exportLine}\n`;
  } else {
    content += `\n${exportLine}\n`;
  }

  fs.writeFileSync(indexPath, content);
  console.log('  ✅ Updated src/components/index.ts');
}

// Update root tsconfig.json paths
function updateTsConfigPaths(name) {
  const tsconfigPath = path.join(ROOT_DIR, 'tsconfig.json');
  let content = fs.readFileSync(tsconfigPath, 'utf-8');

  // Parse JSONC (remove comments for parsing)
  const jsonContent = content.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
  const tsconfig = JSON.parse(jsonContent);

  const pathKey = `@sagebox/${name}`;
  const pathValue = [`./packages/${name}/src/index.ts`];

  // Check if path already exists
  if (tsconfig.compilerOptions.paths[pathKey]) {
    console.log('  ⏭️  Path alias already exists in tsconfig.json');
    return;
  }

  // Add path alias - we need to do string manipulation to preserve comments
  const pathsMatch = content.match(/"paths"\s*:\s*\{[^}]+\}/);
  if (pathsMatch) {
    const pathsBlock = pathsMatch[0];
    const lastBrace = pathsBlock.lastIndexOf('}');
    const beforeBrace = pathsBlock.slice(0, lastBrace);
    const newPath = `,\n      "${pathKey}": ["./packages/${name}/src/index.ts"]`;
    const newPathsBlock = beforeBrace + newPath + '\n    }';
    content = content.replace(pathsBlock, newPathsBlock);
    fs.writeFileSync(tsconfigPath, content);
    console.log('  ✅ Updated tsconfig.json paths');
  }
}

// Update changeset config
function updateChangesetConfig(name) {
  const configPath = path.join(ROOT_DIR, '.changeset', 'config.json');
  const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

  // Add to fixed group if not already there
  const packageName = `@sagebox/${name}`;
  if (config.fixed && config.fixed[0] && !config.fixed[0].includes(packageName)) {
    config.fixed[0].push(packageName);
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2) + '\n');
    console.log('✅ Updated .changeset/config.json');
  }
}

// Main function
async function main() {
  console.log('\n🚀 SageBox Component Generator\n');

  // Get component name
  let name = process.argv[2];
  if (!name) {
    name = await ask('📦 Component name (kebab-case, e.g., "card", "modal"): ');
  }
  name = toKebabCase(name);

  // Validate name
  if (!name || !/^[a-z][a-z0-9-]*$/.test(name)) {
    console.error('❌ Invalid component name. Use kebab-case (e.g., "card", "date-picker")');
    process.exit(1);
  }

  // Check if already exists
  const packageDir = path.join(PACKAGES_DIR, name);
  if (fs.existsSync(packageDir)) {
    console.error(`❌ Package "${name}" already exists at ${packageDir}`);
    process.exit(1);
  }

  // Get description
  const description = (await ask('📝 Component description: ')) || `${toPascalCase(name)} component`;

  const pascalName = toPascalCase(name);
  const tagName = `sg-${name}`;

  console.log('\n📁 Creating component structure...\n');

  // Create directories
  const componentDir = path.join(packageDir, 'src', 'components', name);
  fs.mkdirSync(componentDir, { recursive: true });
  fs.mkdirSync(path.join(packageDir, 'loader'), { recursive: true });
  fs.mkdirSync(path.join(packageDir, '.storybook'), { recursive: true });

  // Create files
  const files = [
    { path: path.join(packageDir, 'package.json'), content: getPackageJson(name, description) },
    { path: path.join(packageDir, 'stencil.config.ts'), content: getStencilConfig(name) },
    { path: path.join(packageDir, 'tsconfig.json'), content: getTsConfig() },
    { path: path.join(packageDir, 'readme.md'), content: getReadme(name, pascalName, tagName, description) },
    { path: path.join(packageDir, 'src', 'index.ts'), content: getIndexTs(name) },
    { path: path.join(componentDir, `${name}.tsx`), content: getComponentTsx(name, pascalName, tagName) },
    { path: path.join(componentDir, `${name}.css`), content: getComponentCss(name) },
    { path: path.join(componentDir, `${name}.spec.ts`), content: getComponentSpec(name, pascalName, tagName) },
    { path: path.join(componentDir, `${name}.stories.ts`), content: getComponentStories(name, pascalName, tagName) },
    { path: path.join(packageDir, '.storybook', 'main.ts'), content: getStorybookMain() },
    { path: path.join(packageDir, '.storybook', 'preview.ts'), content: getStorybookPreview() },
  ];

  files.forEach(({ path: filePath, content }) => {
    fs.writeFileSync(filePath, content);
    console.log(`  ✅ Created ${path.relative(ROOT_DIR, filePath)}`);
  });

  // Update root configs
  console.log('\n📝 Updating configurations...\n');
  updateRootPackageJson(name, tagName);
  updateComponentsIndex(name);
  updateTsConfigPaths(name);
  updateChangesetConfig(name);

  console.log('\n🎉 Component created successfully!\n');
  console.log('Next steps:');
  console.log(`  1. cd packages/${name}`);
  console.log('  2. npm install (from root)');
  console.log(`  3. Edit src/components/${name}/${name}.tsx`);
  console.log('  4. npm run build (to verify)');
  console.log('  5. npm run storybook (to preview)');
  console.log('  6. npm run changeset (to document the new component)\n');
}

main().catch(console.error);
