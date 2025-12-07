# @sage-box/modal

Dialog modal component using native HTML dialog

## Installation

```bash
npm install @sage-box/modal
```

## Usage

### HTML

```html
<script type="module">
  import { defineCustomElements } from '@sage-box/modal/loader';
  defineCustomElements();
</script>

<sg-modal>Content</sg-modal>
```

### React

```jsx
import '@sage-box/modal';

function App() {
  return <sg-modal>Content</sg-modal>;
}
```

### Angular

```typescript
import '@sage-box/modal';

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
