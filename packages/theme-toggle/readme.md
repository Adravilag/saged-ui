# @sage-box/theme-toggle

> Theme toggle component for SageBox - Dark/light mode switcher

## Installation

```bash
npm install @sage-box/theme-toggle @sage-box/core
```

## Usage

```html
<!-- Basic -->
<sg-theme-toggle></sg-theme-toggle>

<!-- Set initial theme -->
<sg-theme-toggle theme="dark"></sg-theme-toggle>
<sg-theme-toggle theme="light"></sg-theme-toggle>
<sg-theme-toggle theme="system"></sg-theme-toggle>

<!-- Sizes -->
<sg-theme-toggle size="sm"></sg-theme-toggle>
<sg-theme-toggle size="md"></sg-theme-toggle>
<sg-theme-toggle size="lg"></sg-theme-toggle>
```

## JavaScript

```js
const toggle = document.querySelector('sg-theme-toggle');

// Listen for theme changes
toggle.addEventListener('sgThemeChange', (e) => {
  console.log('Theme changed to:', e.detail);
});

// Programmatically set theme
toggle.theme = 'dark';
```

## Theme Modes

| Mode | Description |
|------|-------------|
| `light` | Force light theme |
| `dark` | Force dark theme |
| `system` | Follow OS preference |

The component automatically:
- Sets `data-theme` attribute on `<html>` element
- Listens for system preference changes when in `system` mode
- Shows "auto" badge when in system mode

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `theme` | `'light' \| 'dark' \| 'system'` | `'system'` | Current theme mode |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `sgThemeChange` | `ThemeMode` | Emitted when theme changes |

## CSS Custom Properties

| Property | Description |
|----------|-------------|
| `--sg-bg-secondary` | Button background |
| `--sg-bg-tertiary` | Button hover background |
| `--sg-text-primary` | Icon color |
| `--sg-accent` | Badge background |
| `--sg-focus-ring` | Focus outline color |

## Styling Your App

Use the `data-theme` attribute to style your app:

```css
[data-theme='light'] {
  --bg-color: #ffffff;
  --text-color: #1e293b;
}

[data-theme='dark'] {
  --bg-color: #0f172a;
  --text-color: #f1f5f9;
}
```

## License

MIT
