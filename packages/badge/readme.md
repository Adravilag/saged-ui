# @sagebox/badge

> Badge component for SageBox - Labels, tags and status indicators

## Installation

```bash
npm install @sagebox/badge @sagebox/core
```

## Usage

```html
<!-- Basic -->
<sg-badge>Default</sg-badge>

<!-- Variants -->
<sg-badge variant="primary">Primary</sg-badge>
<sg-badge variant="secondary">Secondary</sg-badge>
<sg-badge variant="success">Success</sg-badge>
<sg-badge variant="warning">Warning</sg-badge>
<sg-badge variant="error">Error</sg-badge>
<sg-badge variant="info">Info</sg-badge>
<sg-badge variant="neutral">Neutral</sg-badge>
<sg-badge variant="purple">Purple</sg-badge>
<sg-badge variant="cyan">Cyan</sg-badge>

<!-- Sizes -->
<sg-badge size="xs">Extra Small</sg-badge>
<sg-badge size="sm">Small</sg-badge>
<sg-badge size="md">Medium</sg-badge>
<sg-badge size="lg">Large</sg-badge>

<!-- Styles -->
<sg-badge pill>Pill Shape</sg-badge>
<sg-badge outlined>Outlined</sg-badge>
<sg-badge soft>Soft/Subtle</sg-badge>

<!-- Status Dot -->
<sg-badge dot>With Dot</sg-badge>
<sg-badge dot pulse>Pulsing Dot</sg-badge>

<!-- Interactive -->
<sg-badge clickable>Clickable</sg-badge>

<!-- With Icon -->
<sg-badge>
  <sg-icon slot="icon" name="star"></sg-icon>
  Featured
</sg-badge>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error' \| 'info' \| 'neutral' \| 'purple' \| 'cyan'` | `'primary'` | Color variant |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Badge size |
| `pill` | `boolean` | `false` | Fully rounded shape |
| `outlined` | `boolean` | `false` | Transparent with border |
| `soft` | `boolean` | `false` | Subtle/light background |
| `dot` | `boolean` | `false` | Show status dot |
| `pulse` | `boolean` | `false` | Animate dot with pulse |
| `clickable` | `boolean` | `false` | Make interactive |

## Slots

| Slot | Description |
|------|-------------|
| (default) | Badge content |
| `icon` | Icon before text |

## CSS Parts

| Part | Description |
|------|-------------|
| `badge` | The badge element |
| `icon` | Icon wrapper |
| `content` | Text content wrapper |

## License

MIT
