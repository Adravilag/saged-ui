# @sagebox/dropdown

> Dropdown component for SageBox - Accessible dropdown menus

## Installation

```bash
npm install @sagebox/dropdown @sagebox/core
```

## Usage

```html
<!-- Basic -->
<sg-dropdown>
  <button slot="trigger">Open Menu</button>
  <button>Option 1</button>
  <button>Option 2</button>
  <button>Option 3</button>
</sg-dropdown>

<!-- With Header and Footer -->
<sg-dropdown align="end">
  <button slot="trigger">Settings</button>
  <div slot="header">User Settings</div>
  <button>Profile</button>
  <button>Preferences</button>
  <button>Logout</button>
  <div slot="footer">v1.0.0</div>
</sg-dropdown>

<!-- Positions and Alignments -->
<sg-dropdown position="top" align="center">
  <button slot="trigger">Top Center</button>
  <div>Content</div>
</sg-dropdown>

<!-- With Backdrop (Mobile) -->
<sg-dropdown show-backdrop>
  <button slot="trigger">Mobile Menu</button>
  <nav>...</nav>
</sg-dropdown>
```

## JavaScript API

```js
const dropdown = document.querySelector('sg-dropdown');

// Programmatic control
await dropdown.openDropdown();
await dropdown.closeDropdown();
await dropdown.toggle();

// Events
dropdown.addEventListener('sgOpen', () => console.log('Opened'));
dropdown.addEventListener('sgClose', () => console.log('Closed'));
dropdown.addEventListener('sgToggle', (e) => console.log('State:', e.detail));
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `open` | `boolean` | `false` | Whether dropdown is open |
| `align` | `'start' \| 'end' \| 'center'` | `'start'` | Horizontal alignment |
| `position` | `'bottom' \| 'top'` | `'bottom'` | Vertical position |
| `close-on-select` | `boolean` | `true` | Close on item click |
| `min-width` | `string` | `'200px'` | Minimum width |
| `max-height` | `string` | `'320px'` | Maximum height |
| `disabled` | `boolean` | `false` | Disable dropdown |
| `show-backdrop` | `boolean` | `false` | Show backdrop overlay |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant |

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `sgOpen` | - | Dropdown opened |
| `sgClose` | - | Dropdown closed |
| `sgToggle` | `boolean` | Open state changed |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `openDropdown()` | `Promise<void>` | Open dropdown |
| `closeDropdown()` | `Promise<void>` | Close dropdown |
| `toggle()` | `Promise<void>` | Toggle open state |

## Slots

| Slot | Description |
|------|-------------|
| `trigger` | Trigger element |
| (default) | Dropdown content |
| `header` | Header content |
| `footer` | Footer content |

## Keyboard Navigation

- `Enter` / `Space` - Toggle dropdown
- `Escape` - Close dropdown
- `ArrowDown` - Move focus down
- `ArrowUp` - Move focus up
- `Tab` - Close on tab out

## License

MIT
