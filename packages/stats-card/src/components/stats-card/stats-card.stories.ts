import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Components/StatsCard',
  component: 'sg-stats-card',
  tags: ['autodocs'],
  argTypes: {
    cardTitle: {
      control: 'text',
      description: 'Card title/label',
    },
    value: {
      control: 'text',
      description: 'Main value to display',
    },
    description: {
      control: 'text',
      description: 'Description text below value',
    },
    icon: {
      control: 'text',
      description: 'Icon name',
    },
    color: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'error', 'info', 'purple', 'cyan'],
      description: 'Color theme',
    },
    trend: {
      control: 'number',
      description: 'Trend percentage value',
    },
    trendLabel: {
      control: 'text',
      description: 'Label for the trend',
    },
    trendDirection: {
      control: 'select',
      options: ['up', 'down', 'neutral'],
      description: 'Direction of the trend',
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: args => `
    <sg-stats-card
      card-title="${args.cardTitle}"
      value="${args.value}"
      description="${args.description}"
      icon="${args.icon}"
      color="${args.color}"
      ${args.trend ? `trend="${args.trend}"` : ''}
      ${args.trendLabel ? `trend-label="${args.trendLabel}"` : ''}
      ${args.trendDirection ? `trend-direction="${args.trendDirection}"` : ''}
    ></sg-stats-card>
  `,
  args: {
    cardTitle: 'Total Users',
    value: '1,234',
    description: 'Active users this month',
    icon: 'users',
    color: 'primary',
    trend: 12.5,
    trendLabel: 'vs last month',
    trendDirection: 'up',
  },
};

export const Colors: Story = {
  render: () => `
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1rem;">
      <sg-stats-card card-title="Primary" value="100" icon="chart" color="primary"></sg-stats-card>
      <sg-stats-card card-title="Success" value="200" icon="check" color="success"></sg-stats-card>
      <sg-stats-card card-title="Warning" value="300" icon="warning" color="warning"></sg-stats-card>
      <sg-stats-card card-title="Error" value="400" icon="error" color="error"></sg-stats-card>
      <sg-stats-card card-title="Info" value="500" icon="info" color="info"></sg-stats-card>
      <sg-stats-card card-title="Purple" value="600" icon="star" color="purple"></sg-stats-card>
      <sg-stats-card card-title="Cyan" value="700" icon="settings" color="cyan"></sg-stats-card>
    </div>
  `,
};

export const WithTrend: Story = {
  render: () => `
    <div style="display: grid; gap: 1rem; max-width: 300px;">
      <sg-stats-card
        card-title="Revenue"
        value="$45,231"
        color="success"
        trend="20.1"
        trend-direction="up"
        trend-label="vs last month"
      ></sg-stats-card>
      <sg-stats-card
        card-title="Bounce Rate"
        value="42.3%"
        color="error"
        trend="5.4"
        trend-direction="down"
        trend-label="vs last week"
      ></sg-stats-card>
    </div>
  `,
};
