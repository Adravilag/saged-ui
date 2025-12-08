import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Components/InfoField',
  component: 'sg-info-field',
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text for the field',
    },
    value: {
      control: 'text',
      description: 'Value to display',
    },
    type: {
      control: 'select',
      options: ['text', 'date', 'datetime', 'status', 'currency', 'boolean', 'html', 'array', 'custom'],
      description: 'Type of value formatting',
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: args => `
    <sg-info-field
      label="${args.label}"
      value="${args.value}"
      type="${args.type}"
    ></sg-info-field>
  `,
  args: {
    label: 'Full Name',
    value: 'John Doe',
    type: 'text',
  },
};

export const Types: Story = {
  render: () => `
    <div style="display: grid; gap: 1rem; max-width: 400px;">
      <sg-info-field label="Text" value="Simple text value" type="text"></sg-info-field>
      <sg-info-field label="Date" value="2024-01-15" type="date"></sg-info-field>
      <sg-info-field label="DateTime" value="2024-01-15T14:30:00" type="datetime"></sg-info-field>
      <sg-info-field label="Currency" value="1234.56" type="currency"></sg-info-field>
      <sg-info-field label="Boolean (True)" value="true" type="boolean"></sg-info-field>
      <sg-info-field label="Boolean (False)" value="false" type="boolean"></sg-info-field>
      <sg-info-field label="Status (Active)" value="active" type="status"></sg-info-field>
      <sg-info-field label="Status (Inactive)" value="inactive" type="status"></sg-info-field>
    </div>
  `,
};

export const ArrayType: Story = {
  render: () => {
    const el = document.createElement('sg-info-field');
    el.label = 'Tags';
    el.type = 'array';
    el.value = ['Development', 'Design', 'Marketing'];
    return el;
  },
};

export const CustomStatusMap: Story = {
  render: () => {
    const el = document.createElement('sg-info-field');
    el.label = 'Order Status';
    el.type = 'status';
    el.value = 'shipped';
    el.statusMap = {
      shipped: { label: 'Enviado', bgColor: '#dbeafe', textColor: '#1e40af' },
      processing: { label: 'Procesando', bgColor: '#fef3c7', textColor: '#92400e' },
    };
    return el;
  },
};
