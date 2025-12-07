# @sage-box/core

Core styles, design tokens and utilities for SageBox components.

## Installation

```bash
npm install @sage-box/core
```

## Usage

### CSS Tokens

Import the CSS file to get all design tokens as CSS custom properties:

```css
@import '@sage-box/core/styles';
```

Or in JavaScript:

```javascript
import '@sage-box/core/dist/styles/tokens.css';
```

### JavaScript Tokens

```javascript
import { colors, spacing, tokens } from '@sage-box/core';

// Use tokens in your code
console.log(colors.primary); // 'var(--sg-color-primary, #6366f1)'
```

### Utilities

```javascript
import { generateId, debounce, clamp } from '@sage-box/core';

const id = generateId('button'); // 'button-abc123'
const value = clamp(150, 0, 100); // 100
```

## Theming

Override CSS variables to customize the theme:

```css
:root {
  --sg-color-primary: #your-color;
  --sg-color-primary-hover: #your-hover-color;
}
```

### Dark Mode

Add `data-theme="dark"` or class `dark` to enable dark mode:

```html
<html data-theme="dark">
  <!-- or -->
<html class="dark">
```

## License

MIT © [adravilag](https://github.com/adravilag)
