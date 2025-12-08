import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Components/ContextMenu',
  component: 'sg-context-menu',
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: 'Menu items to display',
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: args => {
    const container = document.createElement('div');
    container.style.height = '300px';
    container.style.border = '2px dashed #ccc';
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    container.innerHTML = '<p>Right click anywhere in this area</p>';

    const menu = document.createElement('sg-context-menu');
    menu.items = args.items;

    container.appendChild(menu);

    container.addEventListener('contextmenu', e => {
      e.preventDefault();
      menu.show(e.clientX, e.clientY);
    });

    return container;
  },
  args: {
    items: [
      { id: 'view', label: 'View Details', icon: 'view' },
      { id: 'edit', label: 'Edit', icon: 'edit' },
      { id: 'duplicate', label: 'Duplicate', icon: 'copy', divider: true },
      { id: 'archive', label: 'Archive', icon: 'archive' },
      { id: 'delete', label: 'Delete', icon: 'delete', danger: true },
    ],
  },
};

export const WithDisabledItems: Story = {
  render: args => {
    const container = document.createElement('div');
    container.style.height = '300px';
    container.style.border = '2px dashed #ccc';
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    container.innerHTML = '<p>Right click here (Disabled items example)</p>';

    const menu = document.createElement('sg-context-menu');
    menu.items = args.items;

    container.appendChild(menu);

    container.addEventListener('contextmenu', e => {
      e.preventDefault();
      menu.show(e.clientX, e.clientY);
    });

    return container;
  },
  args: {
    items: [
      { id: 'copy', label: 'Copy', icon: 'copy' },
      { id: 'paste', label: 'Paste', icon: 'paste', disabled: true },
      { id: 'cut', label: 'Cut', icon: 'cut', disabled: true },
    ],
  },
};
