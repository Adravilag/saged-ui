# @sagebox/skeleton

> Skeleton component for SageBox - Loading placeholder animations

## Installation

```bash
npm install @sagebox/skeleton @sagebox/core
```

## Usage

```html
<!-- Text placeholder -->
<sg-skeleton variant="text" width="200px" height="1rem"></sg-skeleton>

<!-- Rectangle placeholder (cards, images) -->
<sg-skeleton variant="rect" width="100%" height="200px"></sg-skeleton>

<!-- Circle placeholder (avatars) -->
<sg-skeleton variant="circle" width="48px" height="48px"></sg-skeleton>

<!-- Different animations -->
<sg-skeleton animation="shimmer">Shimmer (default)</sg-skeleton>
<sg-skeleton animation="pulse">Pulse effect</sg-skeleton>
<sg-skeleton animation="none">No animation</sg-skeleton>
```

## Card Loading Example

```html
<div class="card">
  <sg-skeleton variant="rect" width="100%" height="200px"></sg-skeleton>
  <div class="card-body">
    <sg-skeleton variant="text" width="60%" height="1.5rem"></sg-skeleton>
    <sg-skeleton variant="text" width="100%" height="1rem"></sg-skeleton>
    <sg-skeleton variant="text" width="80%" height="1rem"></sg-skeleton>
  </div>
</div>
```

## User Profile Example

```html
<div class="profile">
  <sg-skeleton variant="circle" width="64px" height="64px"></sg-skeleton>
  <div class="info">
    <sg-skeleton variant="text" width="120px" height="1.25rem"></sg-skeleton>
    <sg-skeleton variant="text" width="80px" height="0.875rem"></sg-skeleton>
  </div>
</div>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'text' \| 'rect' \| 'circle'` | `'text'` | Shape variant |
| `width` | `string` | `'100%'` | Width of skeleton |
| `height` | `string` | `'1rem'` | Height of skeleton |
| `animation` | `'shimmer' \| 'pulse' \| 'none'` | `'shimmer'` | Animation type |

## Accessibility

The skeleton component includes:
- `aria-busy="true"` - Indicates loading state
- `aria-live="polite"` - Announces when content is ready

## License

MIT
