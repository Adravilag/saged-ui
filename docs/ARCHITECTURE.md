# Architecture

## Overview

SageBox is a monorepo containing Web Components built with Stencil.js.

```
sagebox/
├── packages/           # Individual component packages
│   ├── core/          # Shared utilities and tokens
│   ├── button/        # @sage-box/button
│   ├── modal/         # @sage-box/modal
│   └── ...
├── src/               # Root Stencil entry point
├── website/           # Astro documentation site
├── wrappers/          # Framework integrations
│   ├── angular/       # Angular directives
│   └── react/         # React components
└── dist/              # Built output
```

## Package Structure

Each component package follows this structure:

```
packages/{component}/
├── package.json        # Package manifest
├── stencil.config.ts   # Stencil configuration
├── tsconfig.json       # TypeScript config
├── readme.md           # Auto-generated docs
├── .storybook/         # Storybook config
│   ├── main.ts
│   └── preview.ts
└── src/
    ├── index.ts        # Public exports
    └── components/
        └── {component}/
            ├── {component}.tsx      # Component logic
            ├── {component}.css      # Styles
            ├── {component}.spec.ts  # Unit tests
            └── {component}.stories.ts # Storybook stories
```

## Build System

### Development (Fast)

```bash
npm run build:fast  # ~1.5s - Only custom elements
```

- Skips `dist/` generation
- Skips Angular/React wrappers
- Skips documentation generation
- Ideal for rapid iteration

### Production

```bash
npm run build  # ~70s - Full build
```

- Generates `dist/` with all formats
- Builds Angular/React wrappers
- Generates documentation
- Creates collection for distribution

## Component Communication

### Props (Parent → Child)

```tsx
<sg-button variant="primary">Click</sg-button>
```

### Events (Child → Parent)

```tsx
@Event() sgClick: EventEmitter<void>;
```

### Slots (Content Projection)

```tsx
<slot></slot>
<slot name="header"></slot>
```

## Styling System

### Token Layers

1. **Primitives** (`--ui-*`) - Raw design values
2. **Aliases** (`--sg-*`) - Component-specific tokens
3. **Component** - Internal component styles

```css
/* tokens.css - Primitives */
:root {
  --ui-color-primary: #6366f1;
}

/* aliases.css - Component tokens */
:root {
  --sg-button-bg: var(--ui-color-primary);
}

/* button.css - Usage */
:host {
  background: var(--sg-button-bg);
}
```

## Testing

### Unit Tests

```bash
npm run test:spec           # Run all
npm run test -- --filter=button  # Run specific
```

### E2E Tests

```bash
npm run test:e2e            # Playwright
```

## Versioning

Using [Changesets](https://github.com/changesets/changesets) in **lockstep mode**.

All `@sage-box/*` packages share the same version number.

```bash
npm run changeset      # Create changeset
npm run changeset:version  # Bump versions
npm run changeset:publish  # Publish to npm
```
