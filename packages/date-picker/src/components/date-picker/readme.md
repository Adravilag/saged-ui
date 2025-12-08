# sg-date-picker



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                                   | Type           | Default                  |
| ------------- | ------------- | --------------------------------------------- | -------------- | ------------------------ |
| `alignRight`  | `align-right` | Align dropdown to right                       | `boolean`      | `false`                  |
| `clearable`   | `clearable`   | Allow clearing the date                       | `boolean`      | `true`                   |
| `disabled`    | `disabled`    | Disable the date picker                       | `boolean`      | `false`                  |
| `hasError`    | `has-error`   | Show error state                              | `boolean`      | `false`                  |
| `locale`      | `locale`      | Locale for date formatting ('es' \| 'en')     | `"en" \| "es"` | `'es'`                   |
| `maxDate`     | `max-date`    | Maximum selectable date (ISO format)          | `string`       | `undefined`              |
| `minDate`     | `min-date`    | Minimum selectable date (ISO format)          | `string`       | `undefined`              |
| `placeholder` | `placeholder` | Placeholder text for input                    | `string`       | `'Seleccionar fecha...'` |
| `value`       | `value`       | Current date value in ISO format (YYYY-MM-DD) | `string`       | `null`                   |


## Events

| Event      | Description               | Type                  |
| ---------- | ------------------------- | --------------------- |
| `sgChange` | Emitted when date changes | `CustomEvent<string>` |


## Methods

### `close() => Promise<void>`

Close the date picker

#### Returns

Type: `Promise<void>`



### `open() => Promise<void>`

Open the date picker

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
