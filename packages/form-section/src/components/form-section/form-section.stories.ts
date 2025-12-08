import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Components/FormSection',
  component: 'sg-form-section',
  tags: ['autodocs'],
  argTypes: {
    sectionTitle: {
      control: 'text',
      description: 'Title of the section',
    },
    stepNumber: {
      control: 'number',
      description: 'Current step number',
    },
    totalSteps: {
      control: 'number',
      description: 'Total number of steps',
    },
    iconBgClass: {
      control: 'text',
      description: 'CSS class for icon background color',
    },
    collapsible: {
      control: 'boolean',
      description: 'Whether section is collapsible',
    },
    collapsed: {
      control: 'boolean',
      description: 'Whether section is initially collapsed',
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: args => `
    <sg-form-section
      section-title="${args.sectionTitle}"
      ${args.stepNumber ? `step-number="${args.stepNumber}"` : ''}
      ${args.totalSteps ? `total-steps="${args.totalSteps}"` : ''}
      icon-bg-class="${args.iconBgClass}"
      ${args.collapsible ? 'collapsible' : ''}
      ${args.collapsed ? 'collapsed' : ''}
    >
      <sg-icon slot="icon" name="user"></sg-icon>
      <div style="display: grid; gap: 1rem;">
        <sg-input label="First Name" placeholder="John"></sg-input>
        <sg-input label="Last Name" placeholder="Doe"></sg-input>
        <sg-input label="Email" type="email" placeholder="john@example.com"></sg-input>
      </div>
    </sg-form-section>
  `,
  args: {
    sectionTitle: 'Personal Information',
    stepNumber: 1,
    totalSteps: 3,
    iconBgClass: 'bg-blue-100',
    collapsible: false,
    collapsed: false,
  },
};

export const Collapsible: Story = {
  render: args => `
    <sg-form-section
      section-title="${args.sectionTitle}"
      collapsible
      icon-bg-class="bg-green-100"
    >
      <sg-icon slot="icon" name="settings"></sg-icon>
      <div style="padding: 1rem;">
        <p>This content can be collapsed.</p>
        <sg-input label="Setting 1"></sg-input>
      </div>
    </sg-form-section>
  `,
  args: {
    sectionTitle: 'Advanced Settings',
  },
};

export const WithoutSteps: Story = {
  render: args => `
    <sg-form-section
      section-title="${args.sectionTitle}"
      icon-bg-class="bg-purple-100"
    >
      <sg-icon slot="icon" name="info"></sg-icon>
      <p>Simple section without step indicators.</p>
    </sg-form-section>
  `,
  args: {
    sectionTitle: 'General Info',
  },
};
