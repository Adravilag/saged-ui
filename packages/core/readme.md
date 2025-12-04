# @sagebox/core

Core styles, design tokens and utilities for SageBox components.

## Installation

```bash
npm install @sagebox/core
```

## Usage

### CSS Tokens

Import the CSS file to get all design tokens as CSS custom properties:

```css
@import '@sagebox/core/styles';
```

Or in JavaScript:

```javascript
import '@sagebox/core/dist/styles/tokens.css';
```

### JavaScript Tokens

```javascript
import { colors, spacing, tokens } from '@sagebox/core';

// Use tokens in your code
console.log(colors.primary); // 'var(--sg-color-primary, #6366f1)'
```

### Utilities

```javascript
import { generateId, debounce, clamp } from '@sagebox/core';

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
