# sg-card

<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `actionLabel` | `action-label` | Label for the action button in footer | `string` | `undefined` |
| `actionVariant` | `action-variant` | Variant for the action button | `"ghost" \| "primary" \| "secondary"` | `'primary'` |
| `cardTitle` | `card-title` | Card title displayed in the header | `string` | `undefined` |
| `clickable` | `clickable` | Makes the entire card clickable | `boolean` | `false` |
| `disabled` | `disabled` | Disables the card | `boolean` | `false` |
| `flat` | `flat` | Removes shadow from the card | `boolean` | `false` |
| `header` | `header` | Optional header text | `string` | `undefined` |
| `hoverable` | `hoverable` | Adds hover elevation effect | `boolean` | `false` |
| `href` | `href` | URL for navigation | `string` | `undefined` |
| `icon` | `icon` | Icon name to display | `string` | `undefined` |
| `iconColor` | `icon-color` | Icon color | `string` | `undefined` |
| `iconSize` | `icon-size` | Icon size in pixels | `number \| string` | `48` |
| `loading` | `loading` | Applies loading state | `boolean` | `false` |
| `size` | `size` | Size preset | `"lg" \| "md" \| "sm"` | `'md'` |
| `subtitle` | `subtitle` | Card subtitle | `string` | `undefined` |
| `target` | `target` | Target for href link | `string` | `'_self'` |
| `variant` | `variant` | Visual variant | `"default" \| "error" \| "gradient" \| "info" \| "outlined" \| "primary" \| "success" \| "warning"` | `'default'` |


## Events

| Event | Description | Type |
| --- | --- | --- |
| `sgAction` | Emitted when action button is clicked | `CustomEvent<void>` |
| `sgClick` | Emitted when card is clicked | `CustomEvent<void>` |


## Slots

| Slot | Description |
| --- | --- |
| | Default slot for card content |
| `"footer"` | Optional footer content |
| `"header"` | Optional header content |
| `"icon"` | Custom icon slot |
| `"media"` | Media content at top |


## Shadow Parts

| Part | Description |
| --- | --- |
| `"action"` | The action button |
| `"body"` | The body section |
| `"card"` | The main card container |
| `"footer"` | The footer section |
| `"header"` | The header section |
| `"icon"` | The icon wrapper |
| `"media"` | The media container |
| `"subtitle"` | The subtitle element |
| `"title"` | The title element |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
