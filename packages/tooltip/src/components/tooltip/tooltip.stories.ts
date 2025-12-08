import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Components/Tooltip',
  component: 'sg-tooltip',
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'Tooltip text content',
    },
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Tooltip position',
    },
    trigger: {
      control: 'select',
      options: ['hover', 'click', 'focus', 'manual'],
      description: 'Event that triggers the tooltip',
    },
    variant: {
      control: 'select',
      options: ['default', 'dark', 'light', 'primary', 'success', 'warning', 'error'],
      description: 'Visual style variant',
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: args => `
    <div style="padding: 50px; display: flex; justify-content: center;">
      <sg-tooltip
        text="${args.text}"
        position="${args.position}"
        trigger="${args.trigger}"
        variant="${args.variant}"
      >
        <sg-button>Hover me</sg-button>
      </sg-tooltip>
    </div>
  `,
  args: {
    text: 'This is a tooltip',
    position: 'top',
    trigger: 'hover',
    variant: 'default',
  },
};

export const Positions: Story = {
  render: () => `
    <div style="padding: 50px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; justify-items: center;">
      <sg-tooltip text="Top Tooltip" position="top">
        <sg-button>Top</sg-button>
      </sg-tooltip>
      <sg-tooltip text="Bottom Tooltip" position="bottom">
        <sg-button>Bottom</sg-button>
      </sg-tooltip>
      <sg-tooltip text="Left Tooltip" position="left">
        <sg-button>Left</sg-button>
      </sg-tooltip>
      <sg-tooltip text="Right Tooltip" position="right">
        <sg-button>Right</sg-button>
      </sg-tooltip>
    </div>
  `,
};

export const Variants: Story = {
  render: () => `
    <div style="padding: 50px; display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center;">
      <sg-tooltip text="Default" variant="default"><sg-button variant="outline">Default</sg-button></sg-tooltip>
      <sg-tooltip text="Dark" variant="dark"><sg-button variant="outline">Dark</sg-button></sg-tooltip>
      <sg-tooltip text="Light" variant="light"><sg-button variant="outline">Light</sg-button></sg-tooltip>
      <sg-tooltip text="Primary" variant="primary"><sg-button variant="outline">Primary</sg-button></sg-tooltip>
      <sg-tooltip text="Success" variant="success"><sg-button variant="outline">Success</sg-button></sg-tooltip>
      <sg-tooltip text="Error" variant="error"><sg-button variant="outline">Error</sg-button></sg-tooltip>
    </div>
  `,
};

export const ClickTrigger: Story = {
  render: () => `
    <div style="padding: 50px; display: flex; justify-content: center;">
      <sg-tooltip text="Clicked!" trigger="click">
        <sg-button>Click me</sg-button>
      </sg-tooltip>
    </div>
  `,
};
