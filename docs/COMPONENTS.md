# Creating Components

## Quick Start

```bash
npm run generate
# Follow prompts:
# - Component name (kebab-case): tooltip
# - Description: A tooltip component for contextual information
```

This creates:

```
packages/tooltip/
├── package.json
├── stencil.config.ts
├── tsconfig.json
├── readme.md
├── .storybook/
│   ├── main.ts
│   └── preview.ts
└── src/
    ├── index.ts
    └── components/
        └── tooltip/
            ├── tooltip.tsx
            ├── tooltip.css
            ├── tooltip.spec.ts
            └── tooltip.stories.ts
```

And automatically updates:

- `src/components/index.ts` - Adds export
- `tsconfig.json` - Adds path alias
- `.changeset/config.json` - Adds to lockstep group
- `package.json` - Adds export mapping

## Component Structure

### TSX Component

```tsx
import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';

@Component({
  tag: 'sg-tooltip',
  styleUrl: 'tooltip.css',
  shadow: true,
})
export class SgTooltip {
  // Props
  @Prop() content: string = '';
  @Prop() position: 'top' | 'bottom' | 'left' | 'right' = 'top';
  
  // Events
  @Event() sgShow: EventEmitter<void>;
  @Event() sgHide: EventEmitter<void>;
  
  // Methods
  private handleMouseEnter = () => {
    this.sgShow.emit();
  };
  
  // Render
  render() {
    return (
      <div class="tooltip-wrapper" onMouseEnter={this.handleMouseEnter}>
        <slot></slot>
        <div class={`tooltip tooltip--${this.position}`}>
          {this.content}
        </div>
      </div>
    );
  }
}
```

### CSS Styles

```css
:host {
  /* Use design tokens */
  --_bg: var(--sg-tooltip-bg, var(--ui-color-surface-700));
  --_text: var(--sg-tooltip-text, var(--ui-color-text-primary));
  --_radius: var(--sg-tooltip-radius, var(--ui-radius-md));
  
  display: inline-block;
  position: relative;
}

.tooltip {
  position: absolute;
  background: var(--_bg);
  color: var(--_text);
  border-radius: var(--_radius);
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
}

:host(:hover) .tooltip {
  opacity: 1;
}

.tooltip--top {
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 0.5rem;
}
```

### Unit Tests

```ts
import { newSpecPage } from '@stencil/core/testing';
import { SgTooltip } from './tooltip';

describe('sg-tooltip', () => {
  it('renders with content', async () => {
    const page = await newSpecPage({
      components: [SgTooltip],
      html: `<sg-tooltip content="Hello">Hover me</sg-tooltip>`,
    });
    
    expect(page.root).toEqualHtml(`
      <sg-tooltip content="Hello">
        <mock:shadow-root>
          <div class="tooltip-wrapper">
            <slot></slot>
            <div class="tooltip tooltip--top">Hello</div>
          </div>
        </mock:shadow-root>
        Hover me
      </sg-tooltip>
    `);
  });
  
  it('emits sgShow on mouse enter', async () => {
    const page = await newSpecPage({
      components: [SgTooltip],
      html: `<sg-tooltip content="Hello">Hover</sg-tooltip>`,
    });
    
    const spy = jest.fn();
    page.root.addEventListener('sgShow', spy);
    
    const wrapper = page.root.shadowRoot.querySelector('.tooltip-wrapper');
    wrapper.dispatchEvent(new MouseEvent('mouseenter'));
    
    expect(spy).toHaveBeenCalled();
  });
});
```

### Storybook Stories

```ts
import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Components/Tooltip',
  tags: ['autodocs'],
  argTypes: {
    content: { control: 'text' },
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
  },
};

export default meta;

export const Default: StoryObj = {
  args: {
    content: 'This is a tooltip',
    position: 'top',
  },
  render: (args) => `
    <sg-tooltip content="${args.content}" position="${args.position}">
      <sg-button>Hover me</sg-button>
    </sg-tooltip>
  `,
};

export const Positions: StoryObj = {
  render: () => `
    <div style="display: flex; gap: 2rem; padding: 3rem;">
      <sg-tooltip content="Top" position="top">
        <sg-button>Top</sg-button>
      </sg-tooltip>
      <sg-tooltip content="Bottom" position="bottom">
        <sg-button>Bottom</sg-button>
      </sg-tooltip>
    </div>
  `,
};
```

## Best Practices

### 1. Use Design Tokens

```css
/* ✅ Good */
background: var(--sg-button-bg, var(--ui-color-primary));

/* ❌ Bad */
background: #6366f1;
```

### 2. Prefix Events with `sg`

```tsx
/* ✅ Good */
@Event() sgClick: EventEmitter<void>;

/* ❌ Bad */
@Event() click: EventEmitter<void>;  // Conflicts with native
```

### 3. Support Slots

```tsx
/* ✅ Good - Flexible */
<slot></slot>
<slot name="icon"></slot>

/* ❌ Bad - Rigid */
<span>{this.label}</span>
```

### 4. Handle Accessibility

```tsx
render() {
  return (
    <button
      role="button"
      aria-label={this.ariaLabel}
      aria-disabled={this.disabled ? 'true' : null}
    >
      <slot></slot>
    </button>
  );
}
```

### 5. Test Edge Cases

- Empty props
- Long content
- RTL languages
- Keyboard navigation
- Screen readers
