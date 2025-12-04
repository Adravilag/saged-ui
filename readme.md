# SageBox

[![npm version](https://img.shields.io/npm/v/sagebox.svg)](https://www.npmjs.com/package/sagebox)
[![CI](https://github.com/adravilag/sagebox/actions/workflows/ci.yml/badge.svg)](https://github.com/adravilag/sagebox/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/adravilag/sagebox/branch/main/graph/badge.svg)](https://codecov.io/gh/adravilag/sagebox)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/sagebox)](https://bundlephobia.com/package/sagebox)

Modern Web Components Library - Reusable UI components built with Stencil.js

🌐 **[Documentation](https://adravilag.github.io/sagebox/)** | 📦 **[npm](https://www.npmjs.com/package/sagebox)** | 🐙 **[GitHub](https://github.com/adravilag/sagebox)** | 📋 **[Changelog](./CHANGELOG.md)**

## ✨ Features

- 🎨 **Themeable** - CSS Custom Properties for easy theming
- 🌙 **Dark Mode Ready** - Built-in support for dark mode
- ♿ **Accessible** - ARIA attributes and keyboard navigation
- 🔧 **Framework Agnostic** - Native wrappers for Angular, React, Vue, or vanilla JS
- 🪶 **Lightweight** - Tree-shakeable, only load what you need
- 📘 **TypeScript** - Full TypeScript support with type definitions

## 📦 Installation

```bash
npm install sagebox
```

## 🚀 Quick Start

### <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" width="20" height="20" alt="React" /> React (v17+)

```tsx
import { SgButton, SgBadge, SgIcon } from 'sagebox/react';

function App() {
  return (
    <div>
      <SgButton variant="primary" onSgClick={() => console.log('clicked!')}>
        Click me
      </SgButton>
      <SgBadge variant="success">Active</SgBadge>
      <SgIcon name="home" size={24} />
    </div>
  );
}
```

### <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/angular/angular-original.svg" width="20" height="20" alt="Angular" /> Angular (v18+)

```typescript
import { SgButton, SgBadge, SgIcon } from 'sagebox/angular';

@Component({
  imports: [SgButton, SgBadge, SgIcon],
  template: `
    <sg-button variant="primary" (sgClick)="onClick()">Click me</sg-button>
    <sg-badge variant="success">Active</sg-badge>
    <sg-icon name="home" [size]="24"></sg-icon>
  `
})
export class AppComponent {
  onClick() {
    console.log('clicked!');
  }
}
```

### <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original.svg" width="20" height="20" alt="Vue" /> Vue (v3+)

```vue
<script setup>
import { defineCustomElements } from 'sagebox/loader';
defineCustomElements();
</script>

<template>
  <sg-button variant="primary" @sgClick="onClick">Click me</sg-button>
  <sg-badge variant="success">Active</sg-badge>
  <sg-icon name="home" :size="24"></sg-icon>
</template>
```

### <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" width="20" height="20" alt="JavaScript" /> Vanilla JS / CDN

```html
<script type="module">
  import { defineCustomElements } from 'https://unpkg.com/sagebox/loader/index.js';
  defineCustomElements();
</script>

<sg-button variant="primary">Click me</sg-button>
<sg-badge variant="success">Active</sg-badge>
<sg-icon name="home" size="24"></sg-icon>
```

## 🧩 Components

Explore all components in the [documentation](https://adravilag.github.io/sagebox/).

- `sg-button` - Customizable button
- `sg-badge` - Labels and status indicators
- `sg-icon` - SVG icons (190+)
- `sg-dropdown` - Dropdown menu
- `sg-skeleton` - Loading placeholder
- `sg-article-editor` - Rich text editor
- `sg-theme-toggle` - Dark/light mode toggle

## 🎨 Theming

Customize components using CSS Custom Properties:

```css
:root {
  --sg-primary: #6366f1;
  --sg-secondary: #64748b;
  --sg-success: #22c55e;
  --sg-warning: #f59e0b;
  --sg-error: #ef4444;
}

[data-theme="dark"] {
  --sg-primary: #818cf8;
}
```

## 🌐 Browser Support

| Chrome | Firefox | Safari | Edge |
|--------|---------|--------|------|
| 60+    | 63+     | 12+    | 79+  |

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start dev server with docs
npm run docs:dev

# Build components
npm run build

# Build documentation
npm run docs:build

# Run tests
npm test

# Run Storybook
npm run storybook
```

## 📄 License

MIT © [adravilag](https://github.com/adravilag)
