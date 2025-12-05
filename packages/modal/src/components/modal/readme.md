# sg-modal



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute           | Description                                                         | Type                                     | Default     |
| ----------------- | ------------------- | ------------------------------------------------------------------- | ---------------------------------------- | ----------- |
| `closeOnBackdrop` | `close-on-backdrop` | Whether the modal can be closed by clicking the backdrop            | `boolean`                                | `true`      |
| `closeOnEscape`   | `close-on-escape`   | Whether the modal can be closed by pressing Escape                  | `boolean`                                | `true`      |
| `header`          | `header`            | Modal header text                                                   | `string`                                 | `undefined` |
| `nonModal`        | `non-modal`         | Whether the modal is a non-modal dialog (doesn't block interaction) | `boolean`                                | `false`     |
| `open`            | `open`              | Whether the modal is open                                           | `boolean`                                | `false`     |
| `overlay`         | `overlay`           | Whether to show the backdrop overlay                                | `boolean`                                | `true`      |
| `showCloseButton` | `show-close-button` | Whether to show the close button in the header                      | `boolean`                                | `true`      |
| `size`            | `size`              | Modal size preset                                                   | `"full" \| "lg" \| "md" \| "sm" \| "xl"` | `'md'`      |


## Events

| Event      | Description                                          | Type                  |
| ---------- | ---------------------------------------------------- | --------------------- |
| `sgCancel` | Emitted when modal is cancelled (Escape or backdrop) | `CustomEvent<void>`   |
| `sgClose`  | Emitted when modal closes                            | `CustomEvent<string>` |
| `sgOpen`   | Emitted when modal opens                             | `CustomEvent<void>`   |


## Methods

### `close(returnValue?: string) => Promise<void>`

Closes the modal dialog

#### Parameters

| Name          | Type     | Description                                 |
| ------------- | -------- | ------------------------------------------- |
| `returnValue` | `string` | - Optional value to pass to the close event |

#### Returns

Type: `Promise<void>`



### `show() => Promise<void>`

Opens as non-modal dialog

#### Returns

Type: `Promise<void>`



### `showModal() => Promise<void>`

Opens the modal dialog

#### Returns

Type: `Promise<void>`




## Slots

| Slot       | Description                                   |
| ---------- | --------------------------------------------- |
|            | Main content of the modal                     |
| `"footer"` | Footer content (typically action buttons)     |
| `"header"` | Custom header content (overrides header prop) |


## Shadow Parts

| Part             | Description |
| ---------------- | ----------- |
| `"body"`         |             |
| `"close-button"` |             |
| `"dialog"`       |             |
| `"footer"`       |             |
| `"header"`       |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
