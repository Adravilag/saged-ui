# @sagebox/button

> Button component for SageBox - Versatile button with variants and states

## Installation

```bash
npm install @sagebox/button @sagebox/core
```

## Usage

```html
<!-- Basic -->
<sg-button>Click me</sg-button>

<!-- Variants -->
<sg-button variant="primary">Primary</sg-button>
<sg-button variant="secondary">Secondary</sg-button>
<sg-button variant="ghost">Ghost</sg-button>
<sg-button variant="outline">Outline</sg-button>
<sg-button variant="success">Success</sg-button>
<sg-button variant="warning">Warning</sg-button>
<sg-button variant="error">Error</sg-button>
<sg-button variant="info">Info</sg-button>

<!-- Sizes -->
<sg-button size="xs">Extra Small</sg-button>
<sg-button size="sm">Small</sg-button>
<sg-button size="md">Medium</sg-button>
<sg-button size="lg">Large</sg-button>

<!-- Shapes -->
<sg-button shape="circle">O</sg-button>
<sg-button shape="pill">Pill</sg-button>
<sg-button shape="square">□</sg-button>
<sg-button shape="block">Full Width</sg-button>

<!-- States -->
<sg-button disabled>Disabled</sg-button>
<sg-button loading>Loading...</sg-button>
<sg-button loading loading-text="Please wait...">Submit</sg-button>

<!-- With Icons (requires @sagebox/icons) -->
<sg-button leading-icon="check">Save</sg-button>
<sg-button trailing-icon="arrow-right">Next</sg-button>
```

## JavaScript

```js
import '@sagebox/button';

document.querySelector('sg-button').addEventListener('sgClick', (e) => {
  console.log('Button clicked!', e.detail);
});
```

## React

```jsx
import '@sagebox/button';

function App() {
  return (
    <sg-button 
      variant="primary"
      onSgClick={(e) => console.log('Clicked!', e.detail)}
    >
      Click me
    </sg-button>
  );
}
```

## Angular

```typescript
// app.module.ts
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import '@sagebox/button';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
```

```html
<sg-button
  variant="primary"
  [attr.loading]="isLoading || null"
  (sgClick)="handleClick($event)"
>
  Submit
</sg-button>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'outline' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'primary'` | Button color variant |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `shape` | `'default' \| 'circle' \| 'square' \| 'pill' \| 'block'` | `'default'` | Button shape |
| `disabled` | `boolean` | `false` | Disable the button |
| `loading` | `boolean` | `false` | Show loading state |
| `loading-text` | `string` | - | Text shown during loading |
| `leading-icon` | `string` | - | Icon name for leading position |
| `trailing-icon` | `string` | - | Icon name for trailing position |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Button type attribute |
| `aria-label` | `string` | - | Accessible label |

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `sgClick` | `MouseEvent` | Emitted when button is clicked (not disabled/loading) |

## CSS Custom Properties

| Property | Description |
|----------|-------------|
| `--sg-btn-bg` | Button background |
| `--sg-btn-color` | Button text color |
| `--sg-btn-border-color` | Button border color |
| `--sg-btn-radius` | Button border radius |
| `--sg-btn-shadow` | Button box shadow |

## License

MIT
