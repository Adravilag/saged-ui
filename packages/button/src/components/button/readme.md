# sg-button



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                   | Type                                                                                              | Default     |
| -------------- | --------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------- | ----------- |
| `disabled`     | `disabled`      | Disable the button                            | `boolean`                                                                                         | `false`     |
| `label`        | `label`         | Accessible label                              | `string`                                                                                          | `undefined` |
| `leadingIcon`  | `leading-icon`  | Leading icon name (from sg-icon)              | `string`                                                                                          | `undefined` |
| `loading`      | `loading`       | Show loading spinner                          | `boolean`                                                                                         | `false`     |
| `loadingText`  | `loading-text`  | Loading text (replaces content while loading) | `string`                                                                                          | `undefined` |
| `shape`        | `shape`         | Button shape                                  | `"block" \| "circle" \| "default" \| "pill" \| "square"`                                          | `'default'` |
| `size`         | `size`          | Button size                                   | `"lg" \| "md" \| "sm" \| "xs"`                                                                    | `'md'`      |
| `trailingIcon` | `trailing-icon` | Trailing icon name (from sg-icon)             | `string`                                                                                          | `undefined` |
| `type`         | `type`          | Button type attribute                         | `"button" \| "reset" \| "submit"`                                                                 | `'button'`  |
| `variant`      | `variant`       | Button color variant                          | `"error" \| "ghost" \| "info" \| "outline" \| "primary" \| "secondary" \| "success" \| "warning"` | `'primary'` |


## Events

| Event     | Description                                     | Type                      |
| --------- | ----------------------------------------------- | ------------------------- |
| `sgClick` | Click event (emitted when not disabled/loading) | `CustomEvent<MouseEvent>` |


## Slots

| Slot | Description                        |
| ---- | ---------------------------------- |
|      | Button content (text, icons, etc.) |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
