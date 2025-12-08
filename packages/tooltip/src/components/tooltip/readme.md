# sg-tooltip



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                                          | Type                                                                               | Default     |
| ------------- | ------------- | ---------------------------------------------------- | ---------------------------------------------------------------------------------- | ----------- |
| `arrow`       | `arrow`       | Show arrow pointer                                   | `boolean`                                                                          | `true`      |
| `disabled`    | `disabled`    | Disable the tooltip                                  | `boolean`                                                                          | `false`     |
| `hideDelay`   | `hide-delay`  | Delay before hiding (ms)                             | `number`                                                                           | `100`       |
| `interactive` | `interactive` | Interactive tooltip (can hover over tooltip content) | `boolean`                                                                          | `false`     |
| `maxWidth`    | `max-width`   | Maximum width of tooltip                             | `string`                                                                           | `'250px'`   |
| `open`        | `open`        | Keep tooltip visible (for manual control)            | `boolean`                                                                          | `false`     |
| `position`    | `position`    | Position of the tooltip relative to trigger          | `"bottom" \| "left" \| "right" \| "top"`                                           | `'top'`     |
| `showDelay`   | `show-delay`  | Delay before showing (ms)                            | `number`                                                                           | `200`       |
| `text`        | `text`        | Tooltip text content                                 | `string`                                                                           | `''`        |
| `trigger`     | `trigger`     | How to trigger the tooltip                           | `"click" \| "focus" \| "hover" \| "manual"`                                        | `'hover'`   |
| `variant`     | `variant`     | Visual variant                                       | `"dark" \| "default" \| "error" \| "light" \| "primary" \| "success" \| "warning"` | `'default'` |


## Events

| Event    | Description                    | Type                |
| -------- | ------------------------------ | ------------------- |
| `sgHide` | Emitted when tooltip is hidden | `CustomEvent<void>` |
| `sgShow` | Emitted when tooltip is shown  | `CustomEvent<void>` |


## Methods

### `hide() => Promise<void>`

Hide the tooltip programmatically

#### Returns

Type: `Promise<void>`



### `show() => Promise<void>`

Show the tooltip programmatically

#### Returns

Type: `Promise<void>`



### `toggle() => Promise<void>`

Toggle tooltip visibility

#### Returns

Type: `Promise<void>`




## Slots

| Slot        | Description                                  |
| ----------- | -------------------------------------------- |
|             | Default slot for the trigger element         |
| `"content"` | Custom tooltip content (overrides text prop) |


## Shadow Parts

| Part        | Description                 |
| ----------- | --------------------------- |
| `"arrow"`   | The tooltip arrow           |
| `"content"` | The tooltip content wrapper |
| `"tooltip"` | The tooltip container       |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
