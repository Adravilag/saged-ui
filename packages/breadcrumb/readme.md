# sg-breadcrumb

Breadcrumb navigation component for SageBox.

## Features

- Multiple separator styles (chevron, slash, arrow, dot)
- Custom separator support
- Size variants (sm, md, lg)
- Active state detection
- Accessible navigation with ARIA
- Dark mode support

## Usage

### Basic

```html
<sg-breadcrumb>
  <sg-breadcrumb-item href="/">Home</sg-breadcrumb-item>
  <sg-breadcrumb-item href="/products">Products</sg-breadcrumb-item>
  <sg-breadcrumb-item active>Product Details</sg-breadcrumb-item>
</sg-breadcrumb>
```

### With Icons

```html
<sg-breadcrumb>
  <sg-breadcrumb-item href="/" icon="home">Home</sg-breadcrumb-item>
  <sg-breadcrumb-item href="/settings" icon="settings">Settings</sg-breadcrumb-item>
  <sg-breadcrumb-item active>Profile</sg-breadcrumb-item>
</sg-breadcrumb>
```

### Different Separators

```html
<sg-breadcrumb separator="slash">...</sg-breadcrumb>
<sg-breadcrumb separator="arrow">...</sg-breadcrumb>
<sg-breadcrumb separator="dot">...</sg-breadcrumb>
<sg-breadcrumb custom-separator="→">...</sg-breadcrumb>
```

### Sizes

```html
<sg-breadcrumb size="sm">...</sg-breadcrumb>
<sg-breadcrumb size="md">...</sg-breadcrumb>
<sg-breadcrumb size="lg">...</sg-breadcrumb>
```

## CSS Custom Properties

| Property | Description | Default |
|----------|-------------|---------|
| `--sg-breadcrumb-font-size` | Font size | `0.875rem` |
| `--sg-breadcrumb-gap` | Gap between items | `0.5rem` |
| `--sg-breadcrumb-color` | Text color | `#6b7280` |
| `--sg-breadcrumb-color-hover` | Hover color | `#6366f1` |
| `--sg-breadcrumb-color-active` | Active item color | `#111827` |
| `--sg-breadcrumb-separator-color` | Separator color | `#9ca3af` |

<!-- Auto Generated Below -->
