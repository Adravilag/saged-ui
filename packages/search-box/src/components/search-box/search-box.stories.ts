import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Components/SearchBox',
  component: 'sg-search-box',
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Current search term value',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input',
    },
    searchButtonLabel: {
      control: 'text',
      description: 'Label for search button',
    },
    clearButtonLabel: {
      control: 'text',
      description: 'Label for clear button',
    },
    searchIcon: {
      control: 'text',
      description: 'Icon name for search button',
    },
    clearIcon: {
      control: 'text',
      description: 'Icon name for clear button',
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: args => `
    <sg-search-box
      value="${args.value}"
      placeholder="${args.placeholder}"
      search-button-label="${args.searchButtonLabel}"
      clear-button-label="${args.clearButtonLabel}"
      search-icon="${args.searchIcon}"
      clear-icon="${args.clearIcon}"
    ></sg-search-box>
  `,
  args: {
    value: '',
    placeholder: 'Search...',
    searchButtonLabel: 'Search',
    clearButtonLabel: 'Clear',
    searchIcon: 'view',
    clearIcon: 'delete',
  },
};

export const WithValue: Story = {
  render: args => `
    <sg-search-box
      value="${args.value}"
      placeholder="${args.placeholder}"
    ></sg-search-box>
  `,
  args: {
    value: 'Initial search term',
    placeholder: 'Search...',
  },
};

export const CustomLabels: Story = {
  render: () => `
    <sg-search-box
      placeholder="Buscar usuarios..."
      search-button-label="Buscar"
      clear-button-label="Limpiar"
    ></sg-search-box>
  `,
};
