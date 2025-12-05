# @sagebox/modal

Dialog modal component using native HTML dialog

## Installation

```bash
npm install @sagebox/modal
```

## Usage

### HTML

```html
<script type="module">
  import { defineCustomElements } from '@sagebox/modal/loader';
  defineCustomElements();
</script>

<sg-modal>Content</sg-modal>
```

### React

```jsx
import '@sagebox/modal';

function App() {
  return <sg-modal>Content</sg-modal>;
}
```

### Angular

```typescript
import '@sagebox/modal';

@Component({
  template: `<sg-modal>Content</sg-modal>`
})
export class AppComponent {}
```

## Properties

| Property  | Type                                    | Default     | Description       |
|-----------|-----------------------------------------|-------------|-------------------|
| `variant` | `'default' \| 'primary' \| 'secondary'` | `'default'` | Component variant |

## Slots

| Slot      | Description            |
|-----------|------------------------|
| (default) | Main content           |

## CSS Custom Properties

| Property              | Description        |
|-----------------------|--------------------|
| `--sg-modal-color` | Main color        |

## License

MIT
