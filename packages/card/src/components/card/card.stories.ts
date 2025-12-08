import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Components/Card',
  component: 'sg-card',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'error', 'info', 'gradient', 'outlined'],
      description: 'Card variant style',
    },
    title: {
      control: 'text',
      description: 'Card title',
    },
    subtitle: {
      control: 'text',
      description: 'Card subtitle',
    },
    icon: {
      control: 'text',
      description: 'Icon name',
    },
    actionLabel: {
      control: 'text',
      description: 'Label for the action button',
    },
    clickable: {
      control: 'boolean',
      description: 'Whether the card is clickable',
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: args => `
    <sg-card
      variant="${args.variant}"
      title="${args.title}"
      subtitle="${args.subtitle}"
      icon="${args.icon}"
      ${args.actionLabel ? `action-label="${args.actionLabel}"` : ''}
      ${args.clickable ? 'clickable' : ''}
    >
      <p>This is the main content of the card. You can put any HTML content here.</p>
    </sg-card>
  `,
  args: {
    variant: 'default',
    title: 'Card Title',
    subtitle: 'Card Subtitle',
    icon: 'info',
    actionLabel: 'Action',
    clickable: false,
  },
};

export const Variants: Story = {
  render: () => `
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1rem;">
      <sg-card title="Default" variant="default"><p>Default variant</p></sg-card>
      <sg-card title="Primary" variant="primary"><p>Primary variant</p></sg-card>
      <sg-card title="Success" variant="success"><p>Success variant</p></sg-card>
      <sg-card title="Warning" variant="warning"><p>Warning variant</p></sg-card>
      <sg-card title="Error" variant="error"><p>Error variant</p></sg-card>
      <sg-card title="Info" variant="info"><p>Info variant</p></sg-card>
      <sg-card title="Gradient" variant="gradient"><p>Gradient variant</p></sg-card>
      <sg-card title="Outlined" variant="outlined"><p>Outlined variant</p></sg-card>
    </div>
  `,
};

export const WithMedia: Story = {
  render: args => `
    <sg-card
      title="${args.title}"
      subtitle="${args.subtitle}"
      style="max-width: 400px;"
    >
      <div slot="media" style="height: 200px; background-color: #e5e7eb; display: flex; align-items: center; justify-content: center;">
        <span style="color: #6b7280;">Media Area (Image/Video)</span>
      </div>
      <p>Card with media content at the top.</p>
    </sg-card>
  `,
  args: {
    title: 'Media Card',
    subtitle: 'With image slot',
  },
};

export const WithCustomSlots: Story = {
  render: () => `
    <sg-card>
      <div slot="header" style="display: flex; justify-content: space-between; align-items: center;">
        <h3>Custom Header</h3>
        <sg-badge variant="success">New</sg-badge>
      </div>
      <p>Card with custom header and footer slots.</p>
      <div slot="footer" style="display: flex; justify-content: flex-end; gap: 0.5rem;">
        <sg-button variant="outline" size="sm">Cancel</sg-button>
        <sg-button size="sm">Save</sg-button>
      </div>
    </sg-card>
  `,
};
