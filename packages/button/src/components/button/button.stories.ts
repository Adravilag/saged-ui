/**
 * Storybook stories for sg-button
 */

export default {
  title: 'Components/Button',
  component: 'sg-button',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger', 'ghost', 'link'],
      description: 'Button style variant',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Button size',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the button',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading spinner',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Make button full width',
    },
    outline: {
      control: 'boolean',
      description: 'Outline style',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
A versatile button component with multiple variants, sizes, and states.

## Features
- Multiple color variants
- Size options (xs to xl)
- Loading state with spinner
- Icon support (prefix/suffix)
- Full width option
- Outline variants
- Keyboard accessible
        `,
      },
    },
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// BASIC STORIES
// ═══════════════════════════════════════════════════════════════════════════

export const Default = {
  render: () => `<sg-button>Button</sg-button>`,
};

export const Primary = {
  render: () => `<sg-button variant="primary">Primary</sg-button>`,
};

export const Secondary = {
  render: () => `<sg-button variant="secondary">Secondary</sg-button>`,
};

export const Success = {
  render: () => `<sg-button variant="success">Success</sg-button>`,
};

export const Warning = {
  render: () => `<sg-button variant="warning">Warning</sg-button>`,
};

export const Danger = {
  render: () => `<sg-button variant="danger">Danger</sg-button>`,
};

// ═══════════════════════════════════════════════════════════════════════════
// SIZES
// ═══════════════════════════════════════════════════════════════════════════

export const Sizes = {
  render: () => `
    <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
      <sg-button size="xs">Extra Small</sg-button>
      <sg-button size="sm">Small</sg-button>
      <sg-button size="md">Medium</sg-button>
      <sg-button size="lg">Large</sg-button>
      <sg-button size="xl">Extra Large</sg-button>
    </div>
  `,
};

// ═══════════════════════════════════════════════════════════════════════════
// VARIANTS
// ═══════════════════════════════════════════════════════════════════════════

export const AllVariants = {
  render: () => `
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
      <sg-button variant="default">Default</sg-button>
      <sg-button variant="primary">Primary</sg-button>
      <sg-button variant="secondary">Secondary</sg-button>
      <sg-button variant="success">Success</sg-button>
      <sg-button variant="warning">Warning</sg-button>
      <sg-button variant="danger">Danger</sg-button>
      <sg-button variant="ghost">Ghost</sg-button>
      <sg-button variant="link">Link</sg-button>
    </div>
  `,
};

export const OutlineVariants = {
  render: () => `
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
      <sg-button variant="primary" outline>Primary</sg-button>
      <sg-button variant="secondary" outline>Secondary</sg-button>
      <sg-button variant="success" outline>Success</sg-button>
      <sg-button variant="warning" outline>Warning</sg-button>
      <sg-button variant="danger" outline>Danger</sg-button>
    </div>
  `,
};

// ═══════════════════════════════════════════════════════════════════════════
// STATES
// ═══════════════════════════════════════════════════════════════════════════

export const Disabled = {
  render: () => `
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
      <sg-button disabled>Disabled</sg-button>
      <sg-button variant="primary" disabled>Primary Disabled</sg-button>
      <sg-button variant="danger" disabled>Danger Disabled</sg-button>
    </div>
  `,
};

export const Loading = {
  render: () => `
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
      <sg-button loading>Loading</sg-button>
      <sg-button variant="primary" loading>Saving...</sg-button>
      <sg-button variant="success" loading>Processing</sg-button>
    </div>
  `,
};

// ═══════════════════════════════════════════════════════════════════════════
// WITH ICONS
// ═══════════════════════════════════════════════════════════════════════════

export const WithIcons = {
  render: () => `
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
      <sg-button variant="primary">
        <sg-svg-icon slot="prefix" name="mdi:plus" size="16px"></sg-svg-icon>
        Add Item
      </sg-button>
      <sg-button variant="danger">
        Delete
        <sg-svg-icon slot="suffix" name="mdi:trash-can" size="16px"></sg-svg-icon>
      </sg-button>
      <sg-button variant="secondary">
        <sg-svg-icon slot="prefix" name="mdi:download" size="16px"></sg-svg-icon>
        Download
        <sg-svg-icon slot="suffix" name="mdi:chevron-down" size="16px"></sg-svg-icon>
      </sg-button>
    </div>
  `,
};

export const IconOnly = {
  render: () => `
    <div style="display: flex; gap: 0.5rem; align-items: center;">
      <sg-button variant="ghost" aria-label="Settings">
        <sg-svg-icon name="mdi:cog" size="20px"></sg-svg-icon>
      </sg-button>
      <sg-button variant="ghost" aria-label="Search">
        <sg-svg-icon name="mdi:magnify" size="20px"></sg-svg-icon>
      </sg-button>
      <sg-button variant="danger" aria-label="Delete">
        <sg-svg-icon name="mdi:trash-can" size="20px"></sg-svg-icon>
      </sg-button>
    </div>
  `,
};

// ═══════════════════════════════════════════════════════════════════════════
// FULL WIDTH
// ═══════════════════════════════════════════════════════════════════════════

export const FullWidth = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 0.5rem; max-width: 300px;">
      <sg-button variant="primary" full-width>Sign In</sg-button>
      <sg-button variant="secondary" full-width outline>Create Account</sg-button>
    </div>
  `,
};

// ═══════════════════════════════════════════════════════════════════════════
// BUTTON GROUP
// ═══════════════════════════════════════════════════════════════════════════

export const ButtonGroup = {
  render: () => `
    <div style="display: inline-flex; border-radius: 0.375rem; overflow: hidden; box-shadow: 0 1px 2px rgba(0,0,0,0.1);">
      <sg-button variant="secondary" style="border-radius: 0;">Left</sg-button>
      <sg-button variant="secondary" style="border-radius: 0; border-left: 1px solid rgba(0,0,0,0.1);">Center</sg-button>
      <sg-button variant="secondary" style="border-radius: 0; border-left: 1px solid rgba(0,0,0,0.1);">Right</sg-button>
    </div>
  `,
};
