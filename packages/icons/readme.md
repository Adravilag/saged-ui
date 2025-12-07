# @sage-box/icons

A flexible, accessible SVG icon component from the SageBox library.

## Installation

```bash
npm install @sage-box/icons
```

## Usage

### Basic Usage

```html
<!-- Using custom element -->
<script type="module">
  import { defineCustomElements } from '@sage-box/icons/loader';
  defineCustomElements();
</script>

<sg-icon name="home"></sg-icon>
<sg-icon name="settings" size="32"></sg-icon>
<sg-icon name="heart" color="#ff0000"></sg-icon>
```

### With Framework

#### Vanilla JS / HTML

```javascript
import { defineCustomElements } from '@sage-box/icons/loader';
defineCustomElements();
```

```html
<sg-icon name="home"></sg-icon>
```

### Register Custom Icons

```javascript
import { registerIcons, registerIcon } from '@sage-box/icons';

// Register multiple icons
registerIcons({
  'my-logo': '<svg viewBox="0 0 24 24"><path d="M12..."/></svg>',
  'custom-icon': '<svg>...</svg>'
});

// Register single icon
registerIcon('my-custom-icon', '<svg viewBox="0 0 24 24">...</svg>');
```

### Load Icons from JSON

```html
<sg-icon name="my-icon" json-src="/assets/custom-icons.json"></sg-icon>
```

Or configure globally:

```javascript
import { SgIcon } from '@sage-box/icons';

// Set default JSON source for all icons
SgIcon.configure({ jsonSrc: '/assets/custom-icons.json' });

// Or pre-load icons
await SgIcon.loadIcons('/assets/custom-icons.json');
```

## CLI

The package includes a CLI for managing icons:

```bash
# Initialize icon configuration
npx sage-icons init

# Add icons from Iconify
npx sage-icons add mdi:home mdi:settings

# Browse and search icons
npx sage-icons browse
```

## Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `name` | `string` | - | Icon name from built-in library |
| `src` | `string` | - | URL to custom SVG file |
| `json-src` | `string` | - | URL to JSON file with icon definitions |
| `size` | `number \| string` | `24` | Icon size in pixels |
| `width` | `number \| string` | - | Width (overrides size) |
| `height` | `number \| string` | - | Height (overrides size) |
| `color` | `string` | `currentColor` | Icon color |
| `fill` | `string` | - | Alias for color |
| `stroke-width` | `number` | - | Stroke width for outline icons |
| `spin` | `boolean` | `false` | Enable spinning animation |
| `rotate` | `number` | - | Rotation angle in degrees |
| `flip-h` | `boolean` | `false` | Flip horizontally |
| `flip-v` | `boolean` | `false` | Flip vertically |
| `aria-label` | `string` | - | Accessible label |
| `decorative` | `boolean` | `false` | Mark as decorative (hidden from screen readers) |

## License

MIT © [adravilag](https://github.com/adravilag)
