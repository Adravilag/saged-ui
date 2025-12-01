import { iconNames } from './icons';

export default {
  title: 'Components/Icon',
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: iconNames,
      description: 'Built-in icon name',
    },
    size: {
      control: { type: 'number', min: 8, max: 128, step: 4 },
      description: 'Size in pixels',
    },
    color: {
      control: 'color',
      description: 'Icon color',
    },
    spin: {
      control: 'boolean',
      description: 'Enable spin animation',
    },
    rotate: {
      control: { type: 'number', min: 0, max: 360, step: 45 },
      description: 'Rotation angle in degrees',
    },
    flipH: {
      control: 'boolean',
      description: 'Flip horizontally',
    },
    flipV: {
      control: 'boolean',
      description: 'Flip vertically',
    },
    decorative: {
      control: 'boolean',
      description: 'Mark as decorative (hidden from screen readers)',
    },
  },
};

const Template = args => {
  const attrs = [];
  if (args.name) attrs.push(`name="${args.name}"`);
  if (args.size) attrs.push(`size="${args.size}"`);
  if (args.color) attrs.push(`color="${args.color}"`);
  if (args.spin) attrs.push('spin');
  if (args.rotate) attrs.push(`rotate="${args.rotate}"`);
  if (args.flipH) attrs.push('flip-h');
  if (args.flipV) attrs.push('flip-v');
  if (args.decorative) attrs.push('decorative');
  if (args.ariaLabel) attrs.push(`aria-label="${args.ariaLabel}"`);

  return `<sg-icon ${attrs.join(' ')}></sg-icon>`;
};

export const Default = Template.bind({});
Default.args = {
  name: 'home',
  size: 24,
  color: 'currentColor',
};

export const CustomSize = Template.bind({});
CustomSize.args = {
  name: 'settings',
  size: 48,
  color: '#333',
};

export const CustomColor = Template.bind({});
CustomColor.args = {
  name: 'heart',
  size: 32,
  color: '#e91e63',
};

export const Spinning = Template.bind({});
Spinning.args = {
  name: 'refresh',
  size: 32,
  spin: true,
  color: '#2196f3',
};

export const Rotated = Template.bind({});
Rotated.args = {
  name: 'chevron-right',
  size: 32,
  rotate: 90,
};

export const Flipped = Template.bind({});
Flipped.args = {
  name: 'arrow-right',
  size: 32,
  flipH: true,
};

// Icon Gallery - showing all available icons
export const Gallery = () => {
  const categories = {
    'Navigation & UI': [
      'menu',
      'close',
      'chevron-left',
      'chevron-right',
      'chevron-up',
      'chevron-down',
      'arrow-left',
      'arrow-right',
      'arrow-up',
      'arrow-down',
      'home',
      'settings',
      'search',
      'more-vert',
      'more-horiz',
    ],
    'Actions': ['add', 'remove', 'edit', 'delete', 'save', 'copy', 'download', 'upload', 'share', 'print', 'refresh', 'filter', 'sort'],
    'Status & Feedback': ['check', 'check-circle', 'error', 'warning', 'info', 'help', 'notification'],
    'User & Account': ['user', 'users', 'login', 'logout'],
    'Content & Media': ['image', 'video', 'audio', 'file', 'folder', 'folder-open', 'link', 'attachment'],
    'Communication': ['email', 'chat', 'phone', 'send'],
    'Medical': ['heart', 'heart-pulse', 'medical', 'stethoscope', 'pill', 'hospital', 'calendar', 'clock'],
    'Visibility': ['visibility', 'visibility-off'],
    'Toggle States': ['star', 'star-outline', 'favorite', 'favorite-outline', 'bookmark', 'bookmark-outline'],
    'Layout': ['dashboard', 'grid', 'list'],
    'Misc': ['lock', 'unlock', 'language', 'dark-mode', 'light-mode', 'drag', 'expand', 'collapse', 'fullscreen', 'fullscreen-exit'],
  };

  let html = '<div style="font-family: system-ui, sans-serif;">';

  for (const [category, icons] of Object.entries(categories)) {
    html += `<h3 style="margin: 24px 0 16px; color: #333; border-bottom: 1px solid #e0e0e0; padding-bottom: 8px;">${category}</h3>`;
    html += '<div style="display: flex; flex-wrap: wrap; gap: 16px;">';

    for (const icon of icons) {
      html += `
        <div style="display: flex; flex-direction: column; align-items: center; padding: 16px; border: 1px solid #e0e0e0; border-radius: 8px; min-width: 80px;">
          <sg-icon name="${icon}" size="24" color="#333"></sg-icon>
          <span style="margin-top: 8px; font-size: 11px; color: #666;">${icon}</span>
        </div>
      `;
    }

    html += '</div>';
  }

  html += '</div>';
  return html;
};
Gallery.parameters = {
  controls: { disable: true },
};

// Size variants
export const Sizes = () => `
  <div style="display: flex; align-items: center; gap: 24px; font-family: system-ui, sans-serif;">
    <div style="text-align: center;">
      <sg-icon name="star" size="12"></sg-icon>
      <div style="font-size: 11px; color: #666; margin-top: 4px;">12px</div>
    </div>
    <div style="text-align: center;">
      <sg-icon name="star" size="16"></sg-icon>
      <div style="font-size: 11px; color: #666; margin-top: 4px;">16px</div>
    </div>
    <div style="text-align: center;">
      <sg-icon name="star" size="24"></sg-icon>
      <div style="font-size: 11px; color: #666; margin-top: 4px;">24px</div>
    </div>
    <div style="text-align: center;">
      <sg-icon name="star" size="32"></sg-icon>
      <div style="font-size: 11px; color: #666; margin-top: 4px;">32px</div>
    </div>
    <div style="text-align: center;">
      <sg-icon name="star" size="48"></sg-icon>
      <div style="font-size: 11px; color: #666; margin-top: 4px;">48px</div>
    </div>
    <div style="text-align: center;">
      <sg-icon name="star" size="64"></sg-icon>
      <div style="font-size: 11px; color: #666; margin-top: 4px;">64px</div>
    </div>
  </div>
`;
Sizes.parameters = {
  controls: { disable: true },
};

// Color variants
export const Colors = () => `
  <div style="display: flex; align-items: center; gap: 16px;">
    <sg-icon name="heart" size="32" color="#f44336"></sg-icon>
    <sg-icon name="heart" size="32" color="#e91e63"></sg-icon>
    <sg-icon name="heart" size="32" color="#9c27b0"></sg-icon>
    <sg-icon name="heart" size="32" color="#673ab7"></sg-icon>
    <sg-icon name="heart" size="32" color="#3f51b5"></sg-icon>
    <sg-icon name="heart" size="32" color="#2196f3"></sg-icon>
    <sg-icon name="heart" size="32" color="#00bcd4"></sg-icon>
    <sg-icon name="heart" size="32" color="#4caf50"></sg-icon>
    <sg-icon name="heart" size="32" color="#ff9800"></sg-icon>
  </div>
`;
Colors.parameters = {
  controls: { disable: true },
};

// Medical icons showcase
export const MedicalIcons = () => `
  <div style="font-family: system-ui, sans-serif;">
    <h3 style="margin-bottom: 16px; color: #333;">Medical Icons for SagedUI</h3>
    <div style="display: flex; flex-wrap: wrap; gap: 24px;">
      <div style="display: flex; flex-direction: column; align-items: center; padding: 20px; background: #f5f5f5; border-radius: 12px;">
        <sg-icon name="heart" size="48" color="#e91e63"></sg-icon>
        <span style="margin-top: 8px; font-size: 12px; color: #666;">heart</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; padding: 20px; background: #f5f5f5; border-radius: 12px;">
        <sg-icon name="medical" size="48" color="#f44336"></sg-icon>
        <span style="margin-top: 8px; font-size: 12px; color: #666;">medical</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; padding: 20px; background: #f5f5f5; border-radius: 12px;">
        <sg-icon name="stethoscope" size="48" color="#2196f3"></sg-icon>
        <span style="margin-top: 8px; font-size: 12px; color: #666;">stethoscope</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; padding: 20px; background: #f5f5f5; border-radius: 12px;">
        <sg-icon name="pill" size="48" color="#4caf50"></sg-icon>
        <span style="margin-top: 8px; font-size: 12px; color: #666;">pill</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; padding: 20px; background: #f5f5f5; border-radius: 12px;">
        <sg-icon name="hospital" size="48" color="#9c27b0"></sg-icon>
        <span style="margin-top: 8px; font-size: 12px; color: #666;">hospital</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; padding: 20px; background: #f5f5f5; border-radius: 12px;">
        <sg-icon name="calendar" size="48" color="#ff9800"></sg-icon>
        <span style="margin-top: 8px; font-size: 12px; color: #666;">calendar</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; padding: 20px; background: #f5f5f5; border-radius: 12px;">
        <sg-icon name="clock" size="48" color="#607d8b"></sg-icon>
        <span style="margin-top: 8px; font-size: 12px; color: #666;">clock</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; padding: 20px; background: #f5f5f5; border-radius: 12px;">
        <sg-icon name="user" size="48" color="#00bcd4"></sg-icon>
        <span style="margin-top: 8px; font-size: 12px; color: #666;">user</span>
      </div>
    </div>
  </div>
`;
MedicalIcons.parameters = {
  controls: { disable: true },
};

// Usage with buttons
export const InButtons = () => `
  <div style="display: flex; gap: 16px; font-family: system-ui, sans-serif;">
    <button style="display: inline-flex; align-items: center; gap: 8px; padding: 10px 16px; background: #2196f3; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 14px;">
      <sg-icon name="add" size="20" color="white"></sg-icon>
      Add New
    </button>
    <button style="display: inline-flex; align-items: center; gap: 8px; padding: 10px 16px; background: #4caf50; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 14px;">
      <sg-icon name="save" size="20" color="white"></sg-icon>
      Save
    </button>
    <button style="display: inline-flex; align-items: center; gap: 8px; padding: 10px 16px; background: #f44336; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 14px;">
      <sg-icon name="delete" size="20" color="white"></sg-icon>
      Delete
    </button>
    <button style="display: inline-flex; align-items: center; gap: 8px; padding: 10px 16px; background: white; color: #333; border: 1px solid #ddd; border-radius: 8px; cursor: pointer; font-size: 14px;">
      <sg-icon name="settings" size="20" color="#333"></sg-icon>
      Settings
    </button>
  </div>
`;
InButtons.parameters = {
  controls: { disable: true },
};

// Loading state
export const LoadingState = () => `
  <div style="display: flex; align-items: center; gap: 24px; font-family: system-ui, sans-serif;">
    <div style="text-align: center;">
      <sg-icon name="refresh" size="32" color="#2196f3" spin></sg-icon>
      <div style="font-size: 12px; color: #666; margin-top: 8px;">Loading...</div>
    </div>
    <button style="display: inline-flex; align-items: center; gap: 8px; padding: 10px 20px; background: #2196f3; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; opacity: 0.8;" disabled>
      <sg-icon name="refresh" size="18" color="white" spin></sg-icon>
      Processing...
    </button>
  </div>
`;
LoadingState.parameters = {
  controls: { disable: true },
};
