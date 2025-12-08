# sg-tooltip

Tooltip component for displaying contextual information.

## Features

- Multiple positions (top, bottom, left, right)
- Trigger modes (hover, click, focus, manual)
- Visual variants (default, dark, light, primary, success, warning, error)
- Show/hide delays
- Arrow pointer
- Interactive mode
- Accessibility support

## Usage

### Basic

```html
<sg-tooltip text="This is a helpful tooltip">
  <button>Hover me</button>
</sg-tooltip>
```

### Positions

```html
<sg-tooltip text="Top" position="top">...</sg-tooltip>
<sg-tooltip text="Bottom" position="bottom">...</sg-tooltip>
<sg-tooltip text="Left" position="left">...</sg-tooltip>
<sg-tooltip text="Right" position="right">...</sg-tooltip>
```

### Trigger Modes

```html
<!-- Hover (default) -->
<sg-tooltip text="Hover tooltip" trigger="hover">...</sg-tooltip>

<!-- Click -->
<sg-tooltip text="Click to toggle" trigger="click">...</sg-tooltip>

<!-- Focus -->
<sg-tooltip text="Focus tooltip" trigger="focus">...</sg-tooltip>

<!-- Manual control -->
<sg-tooltip text="Manual" trigger="manual" open>...</sg-tooltip>
```

### Variants

```html
<sg-tooltip text="Primary" variant="primary">...</sg-tooltip>
<sg-tooltip text="Success" variant="success">...</sg-tooltip>
<sg-tooltip text="Warning" variant="warning">...</sg-tooltip>
<sg-tooltip text="Error" variant="error">...</sg-tooltip>
```

### With Custom Content

```html
<sg-tooltip>
  <button>Info</button>
  <div slot="content">
    <strong>Rich content</strong>
    <p>With HTML support</p>
  </div>
</sg-tooltip>
```

### Programmatic Control

```javascript
const tooltip = document.querySelector('sg-tooltip');

// Show tooltip
await tooltip.show();

// Hide tooltip
await tooltip.hide();

// Toggle
await tooltip.toggle();
```

## CSS Custom Properties

| Property | Description | Default |
|----------|-------------|---------|
| `--sg-tooltip-bg` | Background color | `#1f2937` |
| `--sg-tooltip-color` | Text color | `#ffffff` |
| `--sg-tooltip-radius` | Border radius | `0.375rem` |
| `--sg-tooltip-padding` | Content padding | `0.5rem 0.75rem` |
| `--sg-tooltip-font-size` | Font size | `0.8125rem` |
| `--sg-tooltip-shadow` | Box shadow | `0 4px 6px...` |
| `--sg-tooltip-offset` | Distance from trigger | `8px` |

<!-- Auto Generated Below -->
