# sg-theme-toggle

A theme toggle component that allows users to switch between light, dark, and system (auto) themes.

## Features

- Three theme modes: `light`, `dark`, and `system`
- Automatically detects system preference when in `system` mode
- Animated icon transitions
- Applies theme to document via `data-theme` attribute
- Accessible with proper ARIA labels

## Usage

```html
<!-- Default (system mode) -->
<sg-theme-toggle></sg-theme-toggle>

<!-- Start with light theme -->
<sg-theme-toggle theme="light"></sg-theme-toggle>

<!-- Start with dark theme -->
<sg-theme-toggle theme="dark"></sg-theme-toggle>

<!-- Different sizes -->
<sg-theme-toggle size="sm"></sg-theme-toggle>
<sg-theme-toggle size="md"></sg-theme-toggle>
<sg-theme-toggle size="lg"></sg-theme-toggle>
```

## Angular Usage

```typescript
import { SgThemeToggle } from 'saged-ui/angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SgThemeToggle],
  template: `
    <sg-theme-toggle 
      [theme]="currentTheme" 
      (sgThemeChange)="onThemeChange($event)">
    </sg-theme-toggle>
  `
})
export class HeaderComponent {
  currentTheme: ThemeMode = 'system';

  onThemeChange(event: CustomEvent<ThemeMode>) {
    this.currentTheme = event.detail;
    console.log('Theme changed to:', event.detail);
  }
}
```

<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description               | Type                            | Default    |
| -------- | --------- | ------------------------- | ------------------------------- | ---------- |
| `size`   | `size`    | Size of the toggle button | `"lg" \| "md" \| "sm"`          | `'md'`     |
| `theme`  | `theme`   | The current theme mode    | `"dark" \| "light" \| "system"` | `'system'` |


## Events

| Event           | Description                    | Type                                         |
| --------------- | ------------------------------ | -------------------------------------------- |
| `sgThemeChange` | Emitted when the theme changes | `CustomEvent<"dark" \| "light" \| "system">` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
