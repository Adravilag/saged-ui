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
- 🔧 **Framework Agnostic** - Native wrappers for Angular, React, or vanilla JS
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

| Component | Description | Key Features |
|-----------|-------------|--------------|
| `sg-button` | Customizable button | 8 variants, 4 sizes, 4 shapes, loading state, icons |
| `sg-badge` | Labels and indicators | 9 variants, dot indicator, pulse animation, removable |
| `sg-icon` | SVG icon system | 81 builtin icons, custom icons via `src`/`json-src`, spin, flip |
| `sg-dropdown` | Dropdown menu | Keyboard navigation, slots (header/footer), backdrop |
| `sg-skeleton` | Loading placeholder | 3 variants (text/rect/circle), shimmer/pulse animation |
| `sg-modal` | Modal dialog | Native `<dialog>`, sizes, backdrop click, focus trap |
| `sg-article-editor` | Rich text editor | HTML/Markdown modes, toolbar, preview, media library |
| `sg-theme-toggle` | Theme switcher | Light/dark/system modes, auto-sync |

### Component Props Quick Reference

```tsx
// sg-button
<sg-button 
  variant="primary|secondary|ghost|outline|success|warning|error|info"
  size="xs|sm|md|lg"
  shape="default|circle|square|pill|block"
  disabled loading
  leading-icon="icon-name"
  trailing-icon="icon-name">
</sg-button>

// sg-icon
<sg-icon 
  name="home"           // Built-in icon
  src="/custom.svg"     // OR custom SVG file
  json-src="/icons.json" // OR load from JSON
  size="24" 
  color="#6366f1"
  spin flip-h flip-v rotate="90">
</sg-icon>

// sg-modal
<sg-modal 
  header="Title"
  size="sm|md|lg|xl|full"
  close-on-backdrop
  close-on-escape>
  <div slot="footer">...</div>
</sg-modal>

// sg-dropdown
<sg-dropdown align="start|center|end" position="bottom|top">
  <button slot="trigger">Menu</button>
  <div slot="header">Header</div>
  <div>Content</div>
  <div slot="footer">Footer</div>
</sg-dropdown>
```

### Events

All components emit custom events prefixed with `sg`:

```javascript
// Button
button.addEventListener('sgClick', (e) => console.log(e.detail));

// Modal  
modal.addEventListener('sgOpen', () => {});
modal.addEventListener('sgClose', (e) => console.log(e.detail)); // returnValue
modal.addEventListener('sgCancel', () => {});

// Dropdown
dropdown.addEventListener('sgOpen', () => {});
dropdown.addEventListener('sgClose', () => {});
dropdown.addEventListener('sgToggle', (e) => console.log(e.detail)); // boolean

// Theme Toggle
toggle.addEventListener('sgThemeChange', (e) => console.log(e.detail)); // 'light'|'dark'|'system'

// Badge (removable)
badge.addEventListener('sgRemove', (e) => e.target.remove());

// Article Editor
editor.addEventListener('sgChange', (e) => console.log(e.detail.value));
editor.addEventListener('sgContentTypeChange', (e) => {}); // html|markdown
```

## 🎨 Theming

### CSS Custom Properties

```css
:root {
  /* Primary colors */
  --sg-primary: #6366f1;
  --sg-secondary: #64748b;
  --sg-success: #22c55e;
  --sg-warning: #f59e0b;
  --sg-error: #ef4444;
  
  /* Backgrounds */
  --ui-bg: #ffffff;
  --ui-bg-secondary: #f9fafb;
  
  /* Text */
  --ui-text: #111827;
  --ui-text-secondary: #4b5563;
  
  /* Borders */
  --ui-border: #e5e7eb;
  --ui-border-focus: var(--ui-color-primary-500);
}

[data-theme="dark"] {
  --ui-bg: #111827;
  --ui-bg-secondary: #1f2937;
  --ui-text: #f9fafb;
  --ui-text-secondary: #9ca3af;
  --ui-border: #374151;
}
```

### Dark Mode

```html
<!-- Auto-sync with system preference -->
<sg-theme-toggle theme="system"></sg-theme-toggle>

<!-- Or set programmatically -->
<script>
  document.documentElement.setAttribute('data-theme', 'dark');
</script>
```

## 🌐 Browser Support

| Chrome | Firefox | Safari | Edge |
|--------|---------|--------|------|
| 60+    | 63+     | 12+    | 79+  |

## 📖 Icon Reference

### Built-in Icons (81)

**Navigation:** `home`, `search`, `menu`, `settings`, `user`, `close`, `chevron-down`, `chevron-up`, `chevron-left`, `chevron-right`, `arrow-left`, `arrow-right`, `external-link`, `link`

**Actions:** `add`, `edit`, `delete`, `save`, `copy`, `download`, `upload`, `refresh`

**Status:** `check`, `warning`, `error`, `info`, `success`, `loading`

**Media:** `play`, `pause`, `stop`, `image`, `video`, `music`

**UI:** `sun`, `moon`, `star`, `heart`, `bookmark`, `share`, `filter`, `sort`, `more-vertical`, `more-horizontal`, `code`, `eye`, `eye-off`, `lock`, `unlock`

**Files:** `folder`, `file`, `file-text`, `calendar`, `clock`

**Misc:** `mail`, `notification`, `github`, `npm`, `palette`, `lightning`, `dashboard`, `verified`, `rocket`, `shield`, `box`, `puzzle`, `layers`, `zap`, `package`, `terminal`, `grid`, `list`, `book`, `help-circle`, `tool`, `cpu`, `database`, `cloud`, `server`, `globe`, `dark-mode`

### Custom Icons

```javascript
// Register custom icons globally
const iconEl = document.querySelector('sg-icon');
await iconEl.registerIcons({
  'my-icon': '<svg viewBox="0 0 24 24"><path d="M12..."/></svg>'
});

// Or load from JSON file
<sg-icon name="my-icon" json-src="/assets/icons.json"></sg-icon>

// Or use direct SVG src
<sg-icon src="/assets/custom-icon.svg"></sg-icon>
```

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
