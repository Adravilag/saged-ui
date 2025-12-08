import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Components/ThemeToggle',
  component: 'sg-theme-toggle',
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'select',
      options: ['light', 'dark', 'system'],
      description: 'The current theme mode',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the toggle button',
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: args => `
    <sg-theme-toggle
      theme="${args.theme}"
      size="${args.size}"
    ></sg-theme-toggle>
  `,
  args: {
    theme: 'system',
    size: 'md',
  },
};

export const Sizes: Story = {
  render: () => `
    <div style="display: flex; align-items: center; gap: 1rem;">
      <sg-theme-toggle size="sm"></sg-theme-toggle>
      <sg-theme-toggle size="md"></sg-theme-toggle>
      <sg-theme-toggle size="lg"></sg-theme-toggle>
    </div>
  `,
};
