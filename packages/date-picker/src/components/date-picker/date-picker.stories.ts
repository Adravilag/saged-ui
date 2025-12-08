import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Components/DatePicker',
  component: 'sg-date-picker',
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Current date value in ISO format (YYYY-MM-DD)',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for input',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the date picker',
    },
    hasError: {
      control: 'boolean',
      description: 'Show error state',
    },
    clearable: {
      control: 'boolean',
      description: 'Allow clearing the date',
    },
    alignRight: {
      control: 'boolean',
      description: 'Align dropdown to right',
    },
    locale: {
      control: 'text',
      description: 'Locale for date formatting',
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: args => `
    <div style="height: 400px;">
      <sg-date-picker
        value="${args.value || ''}"
        placeholder="${args.placeholder}"
        ${args.disabled ? 'disabled' : ''}
        ${args.hasError ? 'has-error' : ''}
        ${args.clearable ? 'clearable' : ''}
        ${args.alignRight ? 'align-right' : ''}
        locale="${args.locale}"
      ></sg-date-picker>
    </div>
  `,
  args: {
    value: '',
    placeholder: 'Select date...',
    disabled: false,
    hasError: false,
    clearable: true,
    alignRight: false,
    locale: 'en',
  },
};

export const PreselectedDate: Story = {
  render: args => `
    <div style="height: 400px;">
      <sg-date-picker
        value="${args.value}"
        placeholder="${args.placeholder}"
        locale="${args.locale}"
      ></sg-date-picker>
    </div>
  `,
  args: {
    value: '2024-01-15',
    placeholder: 'Select date...',
    locale: 'en',
  },
};

export const Disabled: Story = {
  render: () => `
    <sg-date-picker
      value="2024-01-15"
      disabled
    ></sg-date-picker>
  `,
};

export const WithError: Story = {
  render: () => `
    <div style="height: 400px;">
      <sg-date-picker
        has-error
        placeholder="Invalid date"
      ></sg-date-picker>
    </div>
  `,
};

export const SpanishLocale: Story = {
  render: () => `
    <div style="height: 400px;">
      <sg-date-picker
        locale="es"
        placeholder="Seleccionar fecha..."
      ></sg-date-picker>
    </div>
  `,
};
