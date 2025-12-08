/**
 * Storybook stories for sg-dropdown
 */

export default {
  title: 'Components/Dropdown',
  component: 'sg-dropdown',
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: ['bottom-start', 'bottom', 'bottom-end', 'top-start', 'top', 'top-end', 'left', 'right'],
      description: 'Dropdown placement',
    },
    trigger: {
      control: 'select',
      options: ['click', 'hover'],
      description: 'How to trigger the dropdown',
    },
    closeOnSelect: {
      control: 'boolean',
      description: 'Close dropdown when item is selected',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the dropdown',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
A flexible dropdown component for menus, selects, and action lists.

## Features
- Multiple trigger modes (click, hover)
- Configurable placement
- Keyboard navigation
- Auto-positioning
- Close on outside click
- Animation support
        `,
      },
    },
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// BASIC STORIES
// ═══════════════════════════════════════════════════════════════════════════

export const Default = {
  render: () => `
    <sg-dropdown>
      <sg-button slot="trigger">Open Menu</sg-button>
      <div slot="content" style="padding: 0.5rem; min-width: 150px;">
        <div style="padding: 0.5rem; cursor: pointer;">Option 1</div>
        <div style="padding: 0.5rem; cursor: pointer;">Option 2</div>
        <div style="padding: 0.5rem; cursor: pointer;">Option 3</div>
      </div>
    </sg-dropdown>
  `,
};

export const WithIcons = {
  render: () => `
    <sg-dropdown>
      <sg-button slot="trigger" variant="primary">
        Actions
        <sg-svg-icon slot="suffix" name="mdi:chevron-down" size="16px"></sg-svg-icon>
      </sg-button>
      <div slot="content" style="padding: 0.25rem; min-width: 180px;">
        <div style="padding: 0.5rem 0.75rem; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; border-radius: 0.25rem;">
          <sg-svg-icon name="mdi:pencil" size="16px"></sg-svg-icon>
          Edit
        </div>
        <div style="padding: 0.5rem 0.75rem; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; border-radius: 0.25rem;">
          <sg-svg-icon name="mdi:content-copy" size="16px"></sg-svg-icon>
          Duplicate
        </div>
        <div style="padding: 0.5rem 0.75rem; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; border-radius: 0.25rem;">
          <sg-svg-icon name="mdi:archive" size="16px"></sg-svg-icon>
          Archive
        </div>
        <hr style="margin: 0.25rem 0; border: none; border-top: 1px solid #e5e7eb;">
        <div style="padding: 0.5rem 0.75rem; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; border-radius: 0.25rem; color: #ef4444;">
          <sg-svg-icon name="mdi:trash-can" size="16px"></sg-svg-icon>
          Delete
        </div>
      </div>
    </sg-dropdown>
  `,
};

// ═══════════════════════════════════════════════════════════════════════════
// PLACEMENT
// ═══════════════════════════════════════════════════════════════════════════

export const Placements = {
  render: () => `
    <div style="display: flex; gap: 1rem; flex-wrap: wrap; padding: 100px 50px;">
      <sg-dropdown placement="bottom-start">
        <sg-button slot="trigger">Bottom Start</sg-button>
        <div slot="content" style="padding: 1rem;">Content here</div>
      </sg-dropdown>

      <sg-dropdown placement="bottom">
        <sg-button slot="trigger">Bottom</sg-button>
        <div slot="content" style="padding: 1rem;">Content here</div>
      </sg-dropdown>

      <sg-dropdown placement="bottom-end">
        <sg-button slot="trigger">Bottom End</sg-button>
        <div slot="content" style="padding: 1rem;">Content here</div>
      </sg-dropdown>
    </div>
  `,
};

// ═══════════════════════════════════════════════════════════════════════════
// TRIGGER MODES
// ═══════════════════════════════════════════════════════════════════════════

export const HoverTrigger = {
  render: () => `
    <sg-dropdown trigger="hover">
      <sg-button slot="trigger">Hover Me</sg-button>
      <div slot="content" style="padding: 1rem; min-width: 200px;">
        <p style="margin: 0;">This dropdown opens on hover!</p>
      </div>
    </sg-dropdown>
  `,
};

// ═══════════════════════════════════════════════════════════════════════════
// USE CASES
// ═══════════════════════════════════════════════════════════════════════════

export const UserMenu = {
  render: () => `
    <sg-dropdown placement="bottom-end">
      <button slot="trigger" style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem; border: none; background: none; cursor: pointer;">
        <div style="width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, #667eea, #764ba2); display: flex; align-items: center; justify-content: center; color: white; font-weight: 600;">JD</div>
        <sg-svg-icon name="mdi:chevron-down" size="16px"></sg-svg-icon>
      </button>
      <div slot="content" style="min-width: 200px;">
        <div style="padding: 0.75rem 1rem; border-bottom: 1px solid #e5e7eb;">
          <div style="font-weight: 600;">John Doe</div>
          <div style="font-size: 0.875rem; color: #6b7280;">john@example.com</div>
        </div>
        <div style="padding: 0.25rem;">
          <div style="padding: 0.5rem 0.75rem; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; border-radius: 0.25rem;">
            <sg-svg-icon name="mdi:account" size="16px"></sg-svg-icon>
            Profile
          </div>
          <div style="padding: 0.5rem 0.75rem; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; border-radius: 0.25rem;">
            <sg-svg-icon name="mdi:cog" size="16px"></sg-svg-icon>
            Settings
          </div>
          <div style="padding: 0.5rem 0.75rem; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; border-radius: 0.25rem;">
            <sg-svg-icon name="mdi:help-circle" size="16px"></sg-svg-icon>
            Help
          </div>
        </div>
        <div style="border-top: 1px solid #e5e7eb; padding: 0.25rem;">
          <div style="padding: 0.5rem 0.75rem; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; border-radius: 0.25rem; color: #ef4444;">
            <sg-svg-icon name="mdi:logout" size="16px"></sg-svg-icon>
            Sign Out
          </div>
        </div>
      </div>
    </sg-dropdown>
  `,
};

export const NavigationMenu = {
  render: () => `
    <nav style="display: flex; gap: 0.5rem;">
      <sg-dropdown trigger="hover">
        <button slot="trigger" style="padding: 0.5rem 1rem; border: none; background: none; cursor: pointer; font-weight: 500;">
          Products
        </button>
        <div slot="content" style="padding: 1rem; min-width: 250px;">
          <div style="display: grid; gap: 0.5rem;">
            <a href="#" style="display: flex; gap: 0.75rem; padding: 0.5rem; border-radius: 0.375rem; text-decoration: none; color: inherit;">
              <sg-svg-icon name="mdi:laptop" size="24px" color="#6366f1"></sg-svg-icon>
              <div>
                <div style="font-weight: 500;">Software</div>
                <div style="font-size: 0.75rem; color: #6b7280;">Desktop & web apps</div>
              </div>
            </a>
            <a href="#" style="display: flex; gap: 0.75rem; padding: 0.5rem; border-radius: 0.375rem; text-decoration: none; color: inherit;">
              <sg-svg-icon name="mdi:cellphone" size="24px" color="#6366f1"></sg-svg-icon>
              <div>
                <div style="font-weight: 500;">Mobile</div>
                <div style="font-size: 0.75rem; color: #6b7280;">iOS & Android</div>
              </div>
            </a>
            <a href="#" style="display: flex; gap: 0.75rem; padding: 0.5rem; border-radius: 0.375rem; text-decoration: none; color: inherit;">
              <sg-svg-icon name="mdi:cloud" size="24px" color="#6366f1"></sg-svg-icon>
              <div>
                <div style="font-weight: 500;">Cloud</div>
                <div style="font-size: 0.75rem; color: #6b7280;">Hosting & services</div>
              </div>
            </a>
          </div>
        </div>
      </sg-dropdown>

      <sg-dropdown trigger="hover">
        <button slot="trigger" style="padding: 0.5rem 1rem; border: none; background: none; cursor: pointer; font-weight: 500;">
          Resources
        </button>
        <div slot="content" style="padding: 0.5rem; min-width: 150px;">
          <div style="padding: 0.5rem 0.75rem; cursor: pointer;">Documentation</div>
          <div style="padding: 0.5rem 0.75rem; cursor: pointer;">Tutorials</div>
          <div style="padding: 0.5rem 0.75rem; cursor: pointer;">Blog</div>
        </div>
      </sg-dropdown>
    </nav>
  `,
};

export const Disabled = {
  render: () => `
    <sg-dropdown disabled>
      <sg-button slot="trigger" disabled>Disabled Dropdown</sg-button>
      <div slot="content" style="padding: 1rem;">
        This won't open
      </div>
    </sg-dropdown>
  `,
};
