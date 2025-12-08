# sg-select



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute          | Description                                                          | Type                                                | Default              |
| ----------------- | ------------------ | -------------------------------------------------------------------- | --------------------------------------------------- | -------------------- |
| `async`           | `async`            | Enable async loading (use sgSearch event)                            | `boolean`                                           | `false`              |
| `clearable`       | `clearable`        | Allow clearing selection                                             | `boolean`                                           | `false`              |
| `closeOnSelect`   | `close-on-select`  | Close dropdown after selection (single select)                       | `boolean`                                           | `true`               |
| `creatable`       | `creatable`        | Allow creating new options                                           | `boolean`                                           | `false`              |
| `createText`      | `create-text`      | Create option text template (use {query} placeholder)                | `string`                                            | `'Create "{query}"'` |
| `disabled`        | `disabled`         | Disabled state                                                       | `boolean`                                           | `false`              |
| `errorMessage`    | `error-message`    | Error message                                                        | `string`                                            | `undefined`          |
| `helperText`      | `helper-text`      | Helper text below the select                                         | `string`                                            | `undefined`          |
| `label`           | `label`            | Label text                                                           | `string`                                            | `undefined`          |
| `loading`         | `loading`          | Show loading indicator                                               | `boolean`                                           | `false`              |
| `loadingText`     | `loading-text`     | Loading text                                                         | `string`                                            | `'Loading...'`       |
| `maxSelections`   | `max-selections`   | Maximum selections for multi-select                                  | `number`                                            | `undefined`          |
| `multiple`        | `multiple`         | Allow multiple selections                                            | `boolean`                                           | `false`              |
| `noResultsText`   | `no-results-text`  | No results text                                                      | `string`                                            | `'No results found'` |
| `options`         | `options`          | Options passed as array (alternative to slots)                       | `SelectOption[] \| string`                          | `undefined`          |
| `placeholder`     | `placeholder`      | Placeholder text                                                     | `string`                                            | `undefined`          |
| `required`        | `required`         | Required field                                                       | `boolean`                                           | `false`              |
| `searchDelay`     | `search-delay`     | Search debounce delay in ms                                          | `number`                                            | `300`                |
| `searchable`      | `searchable`       | Enable search/filter functionality                                   | `boolean`                                           | `false`              |
| `size`            | `size`             | Size variant                                                         | `"lg" \| "md" \| "sm"`                              | `'md'`               |
| `validationState` | `validation-state` | Validation state                                                     | `"default" \| "error" \| "success" \| "warning"`    | `'default'`          |
| `value`           | `value`            | Current value (single select) or values (multi-select as JSON array) | `string`                                            | `undefined`          |
| `values`          | --                 | Array of selected values for multi-select                            | `string[]`                                          | `[]`                 |
| `variant`         | `variant`          | Visual variant                                                       | `"default" \| "filled" \| "outline" \| "underline"` | `'default'`          |


## Events

| Event      | Description | Type                                                                 |
| ---------- | ----------- | -------------------------------------------------------------------- |
| `sgChange` |             | `CustomEvent<{ value: string \| string[]; option?: SelectOption; }>` |
| `sgClose`  |             | `CustomEvent<void>`                                                  |
| `sgCreate` |             | `CustomEvent<{ value: string; }>`                                    |
| `sgOpen`   |             | `CustomEvent<void>`                                                  |
| `sgSearch` |             | `CustomEvent<{ query: string; }>`                                    |


## Methods

### `clear() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `close() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `open() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `toggle() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Slots

| Slot        | Description                                  |
| ----------- | -------------------------------------------- |
| `"default"` | sg-option elements                           |
| `"empty"`   | Content to show when no options match search |
| `"loading"` | Content to show while loading async options  |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
