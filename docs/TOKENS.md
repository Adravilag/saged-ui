# Design Tokens

## Overview

SageBox uses a two-layer token system:

1. **Primitives** (`--ui-*`) - Raw design values in `tokens.css`
2. **Aliases** (`--sg-*`) - Component-specific tokens in `aliases.css`

```
┌─────────────────────────────────────────────┐
│  Component CSS                              │
│  background: var(--sg-button-bg);           │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│  Aliases (aliases.css)                      │
│  --sg-button-bg: var(--ui-color-primary);   │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│  Primitives (tokens.css)                    │
│  --ui-color-primary: #6366f1;               │
└─────────────────────────────────────────────┘
```

## Primitives (`--ui-*`)

Located in `packages/core/src/styles/tokens.css`.

### Colors

```css
/* Primary */
--ui-color-primary: #6366f1;
--ui-color-primary-hover: #4f46e5;
--ui-color-primary-active: #4338ca;

/* Secondary */
--ui-color-secondary: #64748b;
--ui-color-secondary-hover: #475569;

/* Status */
--ui-color-success: #22c55e;
--ui-color-warning: #f59e0b;
--ui-color-danger: #ef4444;
--ui-color-info: #3b82f6;

/* Surfaces */
--ui-color-surface-50: #f8fafc;
--ui-color-surface-100: #f1f5f9;
--ui-color-surface-700: #334155;
--ui-color-surface-800: #1e293b;
--ui-color-surface-900: #0f172a;

/* Text */
--ui-color-text-primary: #f8fafc;
--ui-color-text-secondary: #94a3b8;
--ui-color-text-muted: #64748b;
```

### Spacing

```css
--ui-spacing-xs: 0.25rem;   /* 4px */
--ui-spacing-sm: 0.5rem;    /* 8px */
--ui-spacing-md: 1rem;      /* 16px */
--ui-spacing-lg: 1.5rem;    /* 24px */
--ui-spacing-xl: 2rem;      /* 32px */
```

### Border Radius

```css
--ui-radius-sm: 0.25rem;    /* 4px */
--ui-radius-md: 0.5rem;     /* 8px */
--ui-radius-lg: 0.75rem;    /* 12px */
--ui-radius-full: 9999px;
```

### Typography

```css
--ui-font-family: 'Inter', system-ui, sans-serif;
--ui-font-size-xs: 0.75rem;
--ui-font-size-sm: 0.875rem;
--ui-font-size-md: 1rem;
--ui-font-size-lg: 1.125rem;
--ui-font-size-xl: 1.25rem;
--ui-font-weight-normal: 400;
--ui-font-weight-medium: 500;
--ui-font-weight-semibold: 600;
--ui-font-weight-bold: 700;
```

### Shadows

```css
--ui-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--ui-shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
--ui-shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
--ui-shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);
```

### Transitions

```css
--ui-transition-fast: 150ms ease;
--ui-transition-normal: 200ms ease;
--ui-transition-slow: 300ms ease;
```

## Aliases (`--sg-*`)

Located in `packages/core/src/styles/aliases.css`.

### Button

```css
--sg-button-bg: var(--ui-color-primary);
--sg-button-bg-hover: var(--ui-color-primary-hover);
--sg-button-text: var(--ui-color-text-primary);
--sg-button-radius: var(--ui-radius-md);
--sg-button-padding-x: var(--ui-spacing-md);
--sg-button-padding-y: var(--ui-spacing-sm);
```

### Modal

```css
--sg-modal-bg: var(--ui-color-surface-800);
--sg-modal-text: var(--ui-color-text-primary);
--sg-modal-radius: var(--ui-radius-lg);
--sg-modal-shadow: var(--ui-shadow-xl);
--sg-modal-overlay-bg: rgba(0, 0, 0, 0.5);
--sg-modal-width-sm: 400px;
--sg-modal-width-md: 600px;
--sg-modal-width-lg: 800px;
```

### Input

```css
--sg-input-bg: var(--ui-color-surface-700);
--sg-input-border: var(--ui-color-surface-600);
--sg-input-text: var(--ui-color-text-primary);
--sg-input-placeholder: var(--ui-color-text-muted);
--sg-input-focus-ring: var(--ui-color-primary);
```

## Usage in Components

### CSS Custom Properties

```css
/* component.css */
:host {
  /* Define local fallbacks */
  --_bg: var(--sg-button-bg, var(--ui-color-primary));
  --_text: var(--sg-button-text, white);
  
  background: var(--_bg);
  color: var(--_text);
}
```

### User Customization

Users can override tokens at any level:

```css
/* Override primitive */
:root {
  --ui-color-primary: #8b5cf6;
}

/* Override alias */
:root {
  --sg-button-bg: #10b981;
}

/* Override single instance */
sg-button.custom {
  --sg-button-bg: #f59e0b;
}
```

## Adding New Tokens

### 1. Add Primitive (if needed)

```css
/* packages/core/src/styles/tokens.css */
:root {
  --ui-color-accent: #ec4899;
}
```

### 2. Add Alias

```css
/* packages/core/src/styles/aliases.css */
:root {
  --sg-tooltip-bg: var(--ui-color-surface-700);
  --sg-tooltip-text: var(--ui-color-text-primary);
}
```

### 3. Use in Component

```css
/* tooltip.css */
:host {
  background: var(--sg-tooltip-bg);
  color: var(--sg-tooltip-text);
}
```

## Dark/Light Mode

Tokens support theming via CSS custom properties:

```css
/* Light mode (default in tokens.css) */
:root {
  --ui-color-surface-100: #f1f5f9;
  --ui-color-text-primary: #0f172a;
}

/* Dark mode */
:root[data-theme="dark"] {
  --ui-color-surface-100: #1e293b;
  --ui-color-text-primary: #f8fafc;
}
```

The `sg-theme-toggle` component handles theme switching.
