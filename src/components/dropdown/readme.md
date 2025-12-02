# sg-dropdown



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute         | Description                                                      | Type                           | Default     |
| --------------- | ----------------- | ---------------------------------------------------------------- | ------------------------------ | ----------- |
| `align`         | `align`           | Horizontal alignment of the dropdown content relative to trigger | `"center" \| "end" \| "start"` | `'start'`   |
| `align`         | `align`           | Horizontal alignment of the dropdown                             | `"start" \| "end" \| "center"` | `undefined` |
| `closeOnSelect` | `close-on-select` | Whether to close the dropdown when an item is selected/clicked   | `boolean`                      | `true`      |
| `disabled`      | `disabled`        | Whether the dropdown is disabled                                 | `boolean`                      | `false`     |
| `maxHeight`     | `max-height`      | Maximum height of the dropdown content for scrolling             | `string`                       | `'320px'`   |
| `minWidth`      | `min-width`       | Minimum width of the dropdown content (e.g., "200px", "12rem")   | `string`                       | `'200px'`   |
| `open`          | `open`            | Whether the dropdown is currently open                           | `boolean`                      | `false`     |
| `position`      | `position`        | Vertical position of the dropdown content                        | `"bottom" \| "top"`            | `'bottom'`  |
| `position`      | `position`        | Position of the dropdown relative to trigger                     | `"bottom" \| "top"`            | `undefined` |
| `showBackdrop`  | `show-backdrop`   | Show a backdrop overlay (useful on mobile)                       | `boolean`                      | `false`     |
| `size`          | `size`            | Size variant                                                     | `"lg" \| "md" \| "sm"`         | `'md'`      |


## Events

| Event      | Description                         | Type                   |
| ---------- | ----------------------------------- | ---------------------- |
| `sgClose`  | Emitted when the dropdown closes    | `CustomEvent<void>`    |
| `sgOpen`   | Emitted when the dropdown opens     | `CustomEvent<void>`    |
| `sgToggle` | Emitted when the open state changes | `CustomEvent<boolean>` |


## Methods

### `closeDropdown() => Promise<void>`

Closes the dropdown programmatically

#### Returns

Type: `Promise<void>`



### `openDropdown() => Promise<void>`

Opens the dropdown programmatically

#### Returns

Type: `Promise<void>`



### `toggle() => Promise<void>`

Toggles the dropdown open/closed

#### Returns

Type: `Promise<void>`




## Slots

| Slot        | Description                        |
| ----------- | ---------------------------------- |
|             | Default slot for dropdown content  |
| `"footer"`  | Optional footer content            |
| `"header"`  | Optional header content            |
| `"trigger"` | Content that triggers the dropdown |


## Shadow Parts

| Part          | Description                           |
| ------------- | ------------------------------------- |
| `"backdrop"`  | The backdrop overlay (only on mobile) |
| `"container"` | The outer container                   |
| `"content"`   | The dropdown content wrapper          |
| `"trigger"`   | The trigger wrapper                   |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
