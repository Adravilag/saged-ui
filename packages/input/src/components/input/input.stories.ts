/**
 * Storybook stories for sg-input
 */

export default {
  title: 'Components/Input',
  component: 'sg-input',
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel', 'url', 'search', 'date', 'time'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['default', 'filled', 'outline', 'underline'],
    },
    validationState: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error'],
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
A versatile input component with multiple variants, sizes, and validation states.

## Features
- Multiple input types (text, password, email, number, etc.)
- Size variants (sm, md, lg)
- Visual variants (default, filled, outline, underline)
- Validation states with icons
- Leading/trailing icons
- Clearable option
- Password visibility toggle
        `,
      },
    },
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// BASIC STORIES
// ═══════════════════════════════════════════════════════════════════════════

export const Default = {
  render: () => `<sg-input placeholder="Enter text..."></sg-input>`,
};

export const WithLabel = {
  render: () => `<sg-input label="Email Address" placeholder="you@example.com" type="email"></sg-input>`,
};

export const WithHelperText = {
  render: () => `<sg-input label="Username" placeholder="Enter username" helper-text="Choose a unique username"></sg-input>`,
};

// ═══════════════════════════════════════════════════════════════════════════
// SIZE VARIANTS
// ═══════════════════════════════════════════════════════════════════════════

export const Sizes = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 300px;">
      <sg-input size="sm" placeholder="Small input"></sg-input>
      <sg-input size="md" placeholder="Medium input"></sg-input>
      <sg-input size="lg" placeholder="Large input"></sg-input>
    </div>
  `,
};

// ═══════════════════════════════════════════════════════════════════════════
// VISUAL VARIANTS
// ═══════════════════════════════════════════════════════════════════════════

export const Variants = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 300px;">
      <sg-input variant="default" label="Default" placeholder="Default style"></sg-input>
      <sg-input variant="filled" label="Filled" placeholder="Filled background"></sg-input>
      <sg-input variant="outline" label="Outline" placeholder="Outline style"></sg-input>
      <sg-input variant="underline" label="Underline" placeholder="Minimal style"></sg-input>
    </div>
  `,
};

// ═══════════════════════════════════════════════════════════════════════════
// VALIDATION STATES
// ═══════════════════════════════════════════════════════════════════════════

export const ValidationStates = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 300px;">
      <sg-input label="Success" value="valid@email.com" validation-state="success" helper-text="Email is valid"></sg-input>
      <sg-input label="Warning" value="123456" validation-state="warning" helper-text="Password is weak"></sg-input>
      <sg-input label="Error" value="invalid" validation-state="error" error-message="Please enter valid email"></sg-input>
    </div>
  `,
};

// ═══════════════════════════════════════════════════════════════════════════
// WITH ICONS
// ═══════════════════════════════════════════════════════════════════════════

export const WithIcons = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 300px;">
      <sg-input label="Search" placeholder="Search..." leading-icon="mdi:magnify"></sg-input>
      <sg-input label="Email" placeholder="Enter email" trailing-icon="mdi:email"></sg-input>
      <sg-input label="Location" placeholder="Address" leading-icon="mdi:map-marker" trailing-icon="mdi:chevron-right"></sg-input>
    </div>
  `,
};

// ═══════════════════════════════════════════════════════════════════════════
// STATES
// ═══════════════════════════════════════════════════════════════════════════

export const States = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 300px;">
      <sg-input label="Disabled" value="Cannot edit" disabled></sg-input>
      <sg-input label="Read Only" value="Read only" readonly></sg-input>
      <sg-input label="Clearable" value="Click X to clear" clearable></sg-input>
    </div>
  `,
};

// ═══════════════════════════════════════════════════════════════════════════
// FORM EXAMPLE
// ═══════════════════════════════════════════════════════════════════════════

export const LoginForm = {
  render: () => `
    <div style="max-width: 320px; display: flex; flex-direction: column; gap: 1rem;">
      <sg-input label="Email" type="email" placeholder="you@example.com" leading-icon="mdi:email" required></sg-input>
      <sg-input label="Password" type="password" placeholder="Enter password" leading-icon="mdi:lock" required></sg-input>
      <sg-button variant="primary" full-width>Sign In</sg-button>
    </div>
  `,
};

// ═══════════════════════════════════════════════════════════════════════════
// SELECT TYPE (Basic native select)
// ═══════════════════════════════════════════════════════════════════════════

export const SelectBasic = {
  render: () => `
    <sg-input
      type="select"
      label="Country"
      placeholder="Select a country"
      options='[{"value":"us","label":"United States"},{"value":"uk","label":"United Kingdom"},{"value":"es","label":"Spain"},{"value":"fr","label":"France"},{"value":"de","label":"Germany"}]'
    ></sg-input>
  `,
};

export const SelectWithIcons = {
  render: () => `
    <sg-input
      type="select"
      label="Status"
      leading-icon="mdi:flag"
      options='[{"value":"active","label":"Active"},{"value":"pending","label":"Pending"},{"value":"inactive","label":"Inactive"}]'
    ></sg-input>
  `,
};

export const SelectSizes = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 300px;">
      <sg-input type="select" size="sm" label="Small" options='[{"value":"1","label":"Option 1"},{"value":"2","label":"Option 2"}]'></sg-input>
      <sg-input type="select" size="md" label="Medium" options='[{"value":"1","label":"Option 1"},{"value":"2","label":"Option 2"}]'></sg-input>
      <sg-input type="select" size="lg" label="Large" options='[{"value":"1","label":"Option 1"},{"value":"2","label":"Option 2"}]'></sg-input>
    </div>
  `,
};

export const SelectValidation = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 300px;">
      <sg-input
        type="select"
        label="Valid selection"
        validation-state="success"
        value="approved"
        options='[{"value":"approved","label":"Approved"},{"value":"rejected","label":"Rejected"}]'
      ></sg-input>
      <sg-input
        type="select"
        label="Invalid selection"
        validation-state="error"
        error-message="Please select an option"
        options='[{"value":"1","label":"Option 1"},{"value":"2","label":"Option 2"}]'
      ></sg-input>
    </div>
  `,
};
