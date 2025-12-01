# SagedUI

[![npm version](https://img.shields.io/npm/v/saged-ui.svg)](https://www.npmjs.com/package/saged-ui)
[![CI](https://github.com/adravilag/saged-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/adravilag/saged-ui/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![semantic-release](https://img.shields.io/badge/semantic--release-conventionalcommits-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

Modern Web Components Library - Reusable UI components built with Stencil.js

## Features

-  **Themeable** - CSS Custom Properties for easy theming
-  **Dark Mode Ready** - Built-in support for dark mode via CSS variables
-  **Accessible** - ARIA attributes and keyboard navigation
-  **Framework Agnostic** - Works with Angular, React, Vue, or vanilla JS
-  **Lightweight** - Tree-shakeable, only load what you need
-  **TypeScript** - Full TypeScript support with type definitions

## Installation

```bash
npm install saged-ui
```

## Quick Start

### Vanilla HTML/JS

```html
<script type="module" src="node_modules/saged-ui/dist/saged-ui/saged-ui.esm.js"></script>

<sg-skeleton variant="text" width="200px" height="1rem"></sg-skeleton>
```

### ES Modules (Recommended)

```javascript
import { defineCustomElements } from 'saged-ui/loader';

// Register all components
defineCustomElements();
```

### CDN

```html
<script type="module" src="https://unpkg.com/saged-ui@latest/dist/saged-ui/saged-ui.esm.js"></script>
```

### Angular

```typescript
// main.ts
import { defineCustomElements } from 'saged-ui/loader';
defineCustomElements();

// app.module.ts
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  // ...
})
export class AppModule {}
```

### React

```jsx
import { defineCustomElements } from 'saged-ui/loader';
defineCustomElements();

function App() {
  return <sg-skeleton variant="circle" width="48px" height="48px" />;
}
```

### Vue

```javascript
// main.js
import { defineCustomElements } from 'saged-ui/loader';

defineCustomElements();

// In vue.config.js (Vue 2) or vite.config.js (Vue 3)
// Ignore custom elements
vue: {
  compilerOptions: {
    isCustomElement: (tag) => tag.startsWith('sg-')
  }
}
```

## Components

### sg-article-editor

A headless-ready rich text editor supporting HTML and Markdown modes with live preview, formatting toolbar, and optional media library integration.

```html
<sg-article-editor
  value="<p>Hello World</p>"
  mode="html"
  placeholder="Start writing..."
></sg-article-editor>
```

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | `string` | `''` | The content value |
| `mode` | `'html' \| 'markdown' \| 'preview' \| 'split'` | `'html'` | Editor mode |
| `placeholder` | `string` | `'Start writing...'` | Placeholder text |
| `min-height` | `number` | `400` | Minimum height in pixels |
| `show-word-count` | `boolean` | `true` | Show word/character count |
| `disabled` | `boolean` | `false` | Disabled state |

**Events:**
- `editorChange` - Content changes `{ value, mode, wordCount, charCount }`
- `editorModeChange` - Mode changes `{ previousMode, newMode }`
- `mediaLibraryOpen` - Media library requested
- `mediaInsert` - Media item inserted

**Keyboard Shortcuts:** Ctrl+B (bold), Ctrl+I (italic), Ctrl+K (link)

[Full documentation →](./src/components/article-editor/readme.md)

---

### sg-icon

SVG Icon component with 190+ built-in icons.

```html
<sg-icon name="home" size="24"></sg-icon>
<sg-icon name="heart" color="#e91e63"></sg-icon>
<sg-icon name="refresh" spin></sg-icon>
```

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `name` | `string` | - | Icon name from the built-in library |
| `size` | `number` | `24` | Icon size in pixels |
| `color` | `string` | `'currentColor'` | Icon color |
| `spin` | `boolean` | `false` | Enable spin animation |
| `rotate` | `number` | - | Rotation angle in degrees |
| `flip-h` | `boolean` | `false` | Flip horizontally |
| `flip-v` | `boolean` | `false` | Flip vertically |

---

### sg-skeleton

Skeleton loading placeholder component.

| Property    | Type                              | Default   | Description                |
|-------------|-----------------------------------|-----------|----------------------------|
| variant     | 'text' \| 'rect' \| 'circle'       | 'text'    | Shape variant              |
| width       | string                            | '100%'    | Width of skeleton          |
| height      | string                            | '1rem'    | Height of skeleton         |
| animation   | 'shimmer' \| 'pulse' \| 'none'     | 'shimmer' | Animation type             |

#### Examples

```html
<!-- Text placeholder -->
<sg-skeleton variant="text" width="200px" height="1rem"></sg-skeleton>

<!-- Image placeholder -->
<sg-skeleton variant="rect" width="100%" height="200px"></sg-skeleton>

<!-- Avatar placeholder -->
<sg-skeleton variant="circle" width="48px" height="48px"></sg-skeleton>
```

## Theming

Customize components using CSS Custom Properties:

```css
/* Light mode (default) */
:root {
  --skeleton-bg-start: #e2e8f0;
  --skeleton-bg-mid: #f1f5f9;
  --skeleton-bg-end: #e2e8f0;
}

/* Dark mode */
[data-theme="dark"] {
  --skeleton-bg-start: #334155;
  --skeleton-bg-mid: #475569;
  --skeleton-bg-end: #334155;
}
```

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm start

# Run Storybook
npm run storybook

# Build for production
npm run build

# Run tests
npm test

# Icon management
npm run icon-server    # Start icon API server
npm run generate-icons # Regenerate icons from JSON
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## Versioning

We use [Semantic Versioning](https://semver.org/) with automatic releases via [semantic-release](https://github.com/semantic-release/semantic-release). Commit messages following [Conventional Commits](https://www.conventionalcommits.org/) trigger automatic version bumps:

- `fix:` → Patch release (1.0.0 → 1.0.1)
- `feat:` → Minor release (1.0.0 → 1.1.0)
- `feat!:` or `BREAKING CHANGE:` → Major release (1.0.0 → 2.0.0)

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for a list of changes.

## License

MIT
