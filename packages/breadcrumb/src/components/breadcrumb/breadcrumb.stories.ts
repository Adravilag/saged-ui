import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Components/Breadcrumb',
  component: 'sg-breadcrumb',
  tags: ['autodocs'],
  argTypes: {
    separator: {
      control: 'select',
      options: ['chevron', 'slash', 'arrow', 'dot'],
      description: 'Separator style between items',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
    },
    customSeparator: {
      control: 'text',
      description: 'Custom separator character (overrides separator prop)',
    },
    showHomeIcon: {
      control: 'boolean',
      description: 'Show home icon for first item',
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: args => `
    <sg-breadcrumb
      separator="${args.separator}"
      size="${args.size}"
      ${args.customSeparator ? `custom-separator="${args.customSeparator}"` : ''}
      ${args.showHomeIcon ? 'show-home-icon' : ''}
    >
      <sg-breadcrumb-item href="/">Home</sg-breadcrumb-item>
      <sg-breadcrumb-item href="/products">Products</sg-breadcrumb-item>
      <sg-breadcrumb-item active>Details</sg-breadcrumb-item>
    </sg-breadcrumb>
  `,
  args: {
    separator: 'chevron',
    size: 'md',
    showHomeIcon: false,
  },
};

export const WithHomeIcon: Story = {
  render: args => `
    <sg-breadcrumb
      separator="${args.separator}"
      size="${args.size}"
      show-home-icon
    >
      <sg-breadcrumb-item href="/">Home</sg-breadcrumb-item>
      <sg-breadcrumb-item href="/products">Products</sg-breadcrumb-item>
      <sg-breadcrumb-item active>Details</sg-breadcrumb-item>
    </sg-breadcrumb>
  `,
  args: {
    separator: 'chevron',
    size: 'md',
    showHomeIcon: true,
  },
};

export const CustomSeparator: Story = {
  render: args => `
    <sg-breadcrumb
      size="${args.size}"
      custom-separator="|"
    >
      <sg-breadcrumb-item href="/">Home</sg-breadcrumb-item>
      <sg-breadcrumb-item href="/products">Products</sg-breadcrumb-item>
      <sg-breadcrumb-item active>Details</sg-breadcrumb-item>
    </sg-breadcrumb>
  `,
  args: {
    size: 'md',
    customSeparator: '|',
  },
};

export const Sizes: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <sg-breadcrumb size="sm">
        <sg-breadcrumb-item href="/">Home</sg-breadcrumb-item>
        <sg-breadcrumb-item active>Small</sg-breadcrumb-item>
      </sg-breadcrumb>
      <sg-breadcrumb size="md">
        <sg-breadcrumb-item href="/">Home</sg-breadcrumb-item>
        <sg-breadcrumb-item active>Medium</sg-breadcrumb-item>
      </sg-breadcrumb>
      <sg-breadcrumb size="lg">
        <sg-breadcrumb-item href="/">Home</sg-breadcrumb-item>
        <sg-breadcrumb-item active>Large</sg-breadcrumb-item>
      </sg-breadcrumb>
    </div>
  `,
};
