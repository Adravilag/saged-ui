# @sage-box/input

A versatile input component for SageBox - Text input with validation, icons, and multiple variants.

## Installation

```bash
npm install @sage-box/input
```

## Usage

### Basic Usage

```html
<script type="module">
  import { defineCustomElements } from '@sage-box/input/loader';
  defineCustomElements();
</script>

<sg-input placeholder="Enter text"></sg-input>
```

### With Label and Helper Text

```html
<sg-input 
  label="Email Address" 
  type="email"
  placeholder="you@example.com"
  helper-text="We'll never share your email"
  required>
</sg-input>
```

### With Icons

```html
<!-- Leading icon -->
<sg-input leading-icon="search" placeholder="Search..."></sg-input>

<!-- Trailing icon -->
<sg-input trailing-icon="check" placeholder="Verified field"></sg-input>

<!-- Both icons -->
<sg-input 
  leading-icon="user" 
  trailing-icon="check"
  placeholder="Username">
</sg-input>
```

### Password Input

```html
<sg-input 
  type="password" 
  label="Password"
  leading-icon="lock">
</sg-input>
```

The password input automatically includes a toggle button to show/hide the password.

### Clearable Input

```html
<sg-input 
  clearable 
  placeholder="Type and click X to clear">
</sg-input>
```

### Validation States

```html
<!-- Success -->
<sg-input 
  label="Email"
  value="user@example.com"
  validation-state="success"
  helper-text="Email is valid">
</sg-input>

<!-- Warning -->
<sg-input 
  label="Password"
  validation-state="warning"
  helper-text="Password could be stronger">
</sg-input>

<!-- Error -->
<sg-input 
  label="Email"
  validation-state="error"
  error-message="Please enter a valid email">
</sg-input>
```

### Sizes

```html
<sg-input size="sm" placeholder="Small"></sg-input>
<sg-input size="md" placeholder="Medium (default)"></sg-input>
<sg-input size="lg" placeholder="Large"></sg-input>
```

### Visual Variants

```html
<sg-input variant="default" placeholder="Default/Outline"></sg-input>
<sg-input variant="filled" placeholder="Filled background"></sg-input>
<sg-input variant="underline" placeholder="Underline only"></sg-input>
```

### Input Types

```html
<sg-input type="text" placeholder="Text"></sg-input>
<sg-input type="email" placeholder="Email"></sg-input>
<sg-input type="password" placeholder="Password"></sg-input>
<sg-input type="number" placeholder="Number" min="0" max="100"></sg-input>
<sg-input type="tel" placeholder="Phone"></sg-input>
<sg-input type="url" placeholder="URL"></sg-input>
<sg-input type="search" placeholder="Search"></sg-input>
<sg-input type="date"></sg-input>
<sg-input type="time"></sg-input>
```

### Framework Examples

#### Angular

```typescript
import { Component } from '@angular/core';

@Component({
  template: `
    <sg-input
      label="Email"
      type="email"
      [attr.value]="email"
      [attr.validation-state]="emailError ? 'error' : 'default'"
      [attr.error-message]="emailError"
      (sgInput)="onEmailChange($event)">
    </sg-input>
  `
})
export class MyComponent {
  email = '';
  emailError = '';
  
  onEmailChange(event: CustomEvent) {
    this.email = event.detail.value;
    this.validateEmail();
  }
}
```

#### React

```tsx
import { SgInput } from '@sage-box/react';

function MyComponent() {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  
  return (
    <SgInput
      label="Email"
      type="email"
      value={value}
      validationState={error ? 'error' : 'default'}
      errorMessage={error}
      onSgInput={(e) => setValue(e.detail.value)}
    />
  );
}
```

## Properties

| Property | Attribute | Type | Default | Description |
|----------|-----------|------|---------|-------------|
| `type` | `type` | `'text' \| 'password' \| 'email' \| 'number' \| 'tel' \| 'url' \| 'search' \| 'date' \| 'time' \| 'datetime-local'` | `'text'` | Input type |
| `value` | `value` | `string` | `''` | Input value |
| `name` | `name` | `string` | - | Input name attribute |
| `placeholder` | `placeholder` | `string` | - | Placeholder text |
| `label` | `label` | `string` | - | Label text |
| `helperText` | `helper-text` | `string` | - | Helper text below input |
| `errorMessage` | `error-message` | `string` | - | Error message (shown when validation-state is 'error') |
| `size` | `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Input size |
| `variant` | `variant` | `'default' \| 'filled' \| 'outline' \| 'underline'` | `'default'` | Visual variant |
| `validationState` | `validation-state` | `'default' \| 'success' \| 'warning' \| 'error'` | `'default'` | Validation state |
| `disabled` | `disabled` | `boolean` | `false` | Disabled state |
| `readonly` | `readonly` | `boolean` | `false` | Read-only state |
| `required` | `required` | `boolean` | `false` | Required field |
| `clearable` | `clearable` | `boolean` | `false` | Show clear button |
| `leadingIcon` | `leading-icon` | `string` | - | Icon name for leading position |
| `trailingIcon` | `trailing-icon` | `string` | - | Icon name for trailing position |
| `minlength` | `minlength` | `number` | - | Minimum character length |
| `maxlength` | `maxlength` | `number` | - | Maximum character length |
| `pattern` | `pattern` | `string` | - | Regex pattern for validation |
| `min` | `min` | `string \| number` | - | Minimum value (number/date) |
| `max` | `max` | `string \| number` | - | Maximum value (number/date) |
| `step` | `step` | `string \| number` | - | Step value (number) |
| `autocomplete` | `autocomplete` | `string` | - | Autocomplete attribute |
| `autofocus` | `autofocus` | `boolean` | `false` | Autofocus on mount |

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `sgInput` | `{ value: string, event: InputEvent }` | Emitted on input |
| `sgChange` | `{ value: string }` | Emitted on blur after change |
| `sgFocus` | - | Emitted on focus |
| `sgBlur` | - | Emitted on blur |
| `sgClear` | - | Emitted when cleared |

## Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `setFocus` | `() => Promise<void>` | Focus the input |
| `setBlur` | `() => Promise<void>` | Remove focus |
| `select` | `() => Promise<void>` | Select all text |
| `clear` | `() => Promise<void>` | Clear the input |
| `getInputElement` | `() => Promise<HTMLInputElement>` | Get native input |

## Slots

| Slot | Description |
|------|-------------|
| `prefix` | Content before the input field |
| `suffix` | Content after the input field |

## CSS Custom Properties

| Property | Description |
|----------|-------------|
| `--sg-input-bg` | Background color |
| `--sg-input-color` | Text color |
| `--sg-input-border-color` | Border color |
| `--sg-input-border-radius` | Border radius |
| `--sg-input-focus-ring` | Focus ring color |

## Accessibility

- Labels are properly associated with inputs via `for`/`id`
- Required fields display `*` and have `required` attribute
- Error states set `aria-invalid="true"`
- Helper text linked via `aria-describedby`
- Password toggle has proper `aria-label`
- Clear button has `aria-label="Clear input"`

## License

MIT
