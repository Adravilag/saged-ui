/**
 * Storybook stories for sg-badge
 */

export default {
  title: 'Components/Badge',
  component: 'sg-badge',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger', 'info'],
      description: 'Badge color variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Badge size',
    },
    rounded: {
      control: 'boolean',
      description: 'Fully rounded (pill) style',
    },
    outline: {
      control: 'boolean',
      description: 'Outline style instead of filled',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
A versatile badge component for displaying status, labels, or counts.

## Features
- Multiple color variants
- Size options (sm, md, lg)
- Outline and filled styles
- Pill/rounded option
- Icon support
        `,
      },
    },
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// BASIC STORIES
// ═══════════════════════════════════════════════════════════════════════════

export const Default = {
  render: () => `<sg-badge>Badge</sg-badge>`,
};

export const Primary = {
  render: () => `<sg-badge variant="primary">Primary</sg-badge>`,
};

export const Secondary = {
  render: () => `<sg-badge variant="secondary">Secondary</sg-badge>`,
};

export const Success = {
  render: () => `<sg-badge variant="success">Success</sg-badge>`,
};

export const Warning = {
  render: () => `<sg-badge variant="warning">Warning</sg-badge>`,
};

export const Danger = {
  render: () => `<sg-badge variant="danger">Danger</sg-badge>`,
};

// ═══════════════════════════════════════════════════════════════════════════
// SIZES
// ═══════════════════════════════════════════════════════════════════════════

export const Sizes = {
  render: () => `
    <div style="display: flex; gap: 0.5rem; align-items: center;">
      <sg-badge size="sm">Small</sg-badge>
      <sg-badge size="md">Medium</sg-badge>
      <sg-badge size="lg">Large</sg-badge>
    </div>
  `,
};

// ═══════════════════════════════════════════════════════════════════════════
// VARIANTS
// ═══════════════════════════════════════════════════════════════════════════

export const AllVariants = {
  render: () => `
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
      <sg-badge variant="default">Default</sg-badge>
      <sg-badge variant="primary">Primary</sg-badge>
      <sg-badge variant="secondary">Secondary</sg-badge>
      <sg-badge variant="success">Success</sg-badge>
      <sg-badge variant="warning">Warning</sg-badge>
      <sg-badge variant="danger">Danger</sg-badge>
      <sg-badge variant="info">Info</sg-badge>
    </div>
  `,
};

export const Outline = {
  render: () => `
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
      <sg-badge variant="primary" outline>Primary</sg-badge>
      <sg-badge variant="success" outline>Success</sg-badge>
      <sg-badge variant="warning" outline>Warning</sg-badge>
      <sg-badge variant="danger" outline>Danger</sg-badge>
    </div>
  `,
};

export const Rounded = {
  render: () => `
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
      <sg-badge variant="primary" rounded>12</sg-badge>
      <sg-badge variant="success" rounded>New</sg-badge>
      <sg-badge variant="danger" rounded>99+</sg-badge>
    </div>
  `,
};

// ═══════════════════════════════════════════════════════════════════════════
// USE CASES
// ═══════════════════════════════════════════════════════════════════════════

export const StatusBadges = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 0.75rem;">
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <sg-badge variant="success">Active</sg-badge>
        <span>User is currently online</span>
      </div>
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <sg-badge variant="warning">Pending</sg-badge>
        <span>Awaiting approval</span>
      </div>
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <sg-badge variant="danger">Expired</sg-badge>
        <span>Subscription ended</span>
      </div>
    </div>
  `,
};

export const NotificationCount = {
  render: () => `
    <div style="display: flex; gap: 1.5rem;">
      <div style="position: relative; display: inline-block;">
        <sg-svg-icon name="mdi:bell" size="24px"></sg-svg-icon>
        <sg-badge
          variant="danger"
          rounded
          size="sm"
          style="position: absolute; top: -4px; right: -8px;"
        >3</sg-badge>
      </div>
      <div style="position: relative; display: inline-block;">
        <sg-svg-icon name="mdi:email" size="24px"></sg-svg-icon>
        <sg-badge
          variant="primary"
          rounded
          size="sm"
          style="position: absolute; top: -4px; right: -8px;"
        >99+</sg-badge>
      </div>
    </div>
  `,
};
