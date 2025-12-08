/**
 * Storybook stories for sg-select
 * Advanced select component
 */

export default {
  title: 'Components/Select',
  component: 'sg-select',
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['default', 'filled', 'outline', 'underline'],
    },
    multiple: { control: 'boolean' },
    searchable: { control: 'boolean' },
    clearable: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  parameters: {
    docs: {
      description: {
        component: `
Advanced select/combobox component with powerful features.

## Features
- 🔍 **Searchable** - Filter options by typing
- ✅ **Multi-select** - Select multiple values with tags
- ➕ **Creatable** - Create new options on the fly
- ⏳ **Async loading** - Load options from API
- 📦 **Option groups** - Organize options in groups
- 🎨 **Customizable** - Icons, descriptions, and more
- ♿ **Accessible** - Full keyboard navigation

## Basic vs Advanced
- Use \`<sg-input type="select">\` for simple native selects
- Use \`<sg-select>\` for advanced features like search, multi-select, async
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
    <sg-select
      label="Country"
      placeholder="Select a country"
      options='[
        {"value":"us","label":"United States"},
        {"value":"uk","label":"United Kingdom"},
        {"value":"es","label":"Spain"},
        {"value":"fr","label":"France"},
        {"value":"de","label":"Germany"},
        {"value":"it","label":"Italy"},
        {"value":"jp","label":"Japan"},
        {"value":"cn","label":"China"}
      ]'
    ></sg-select>
  `,
};

export const WithHelperText = {
  render: () => `
    <sg-select
      label="Language"
      placeholder="Select your language"
      helper-text="This will be used for notifications"
      options='[
        {"value":"en","label":"English"},
        {"value":"es","label":"Spanish"},
        {"value":"fr","label":"French"},
        {"value":"de","label":"German"}
      ]'
    ></sg-select>
  `,
};

// ═══════════════════════════════════════════════════════════════════════════
// SEARCHABLE
// ═══════════════════════════════════════════════════════════════════════════

export const Searchable = {
  render: () => `
    <sg-select
      label="Search countries"
      placeholder="Type to search..."
      searchable
      options='[
        {"value":"us","label":"United States"},
        {"value":"uk","label":"United Kingdom"},
        {"value":"es","label":"Spain"},
        {"value":"fr","label":"France"},
        {"value":"de","label":"Germany"},
        {"value":"it","label":"Italy"},
        {"value":"jp","label":"Japan"},
        {"value":"cn","label":"China"},
        {"value":"br","label":"Brazil"},
        {"value":"mx","label":"Mexico"},
        {"value":"ar","label":"Argentina"},
        {"value":"au","label":"Australia"}
      ]'
    ></sg-select>
  `,
};

// ═══════════════════════════════════════════════════════════════════════════
// MULTI-SELECT
// ═══════════════════════════════════════════════════════════════════════════

export const MultiSelect = {
  render: () => `
    <sg-select
      label="Select tags"
      placeholder="Choose multiple..."
      multiple
      options='[
        {"value":"react","label":"React"},
        {"value":"vue","label":"Vue"},
        {"value":"angular","label":"Angular"},
        {"value":"svelte","label":"Svelte"},
        {"value":"solid","label":"Solid"},
        {"value":"preact","label":"Preact"}
      ]'
    ></sg-select>
  `,
};

export const MultiSelectWithSearch = {
  render: () => `
    <sg-select
      label="Select skills"
      placeholder="Search and select..."
      multiple
      searchable
      clearable
      options='[
        {"value":"js","label":"JavaScript"},
        {"value":"ts","label":"TypeScript"},
        {"value":"py","label":"Python"},
        {"value":"go","label":"Go"},
        {"value":"rust","label":"Rust"},
        {"value":"java","label":"Java"},
        {"value":"csharp","label":"C#"},
        {"value":"cpp","label":"C++"}
      ]'
    ></sg-select>
  `,
};

// ═══════════════════════════════════════════════════════════════════════════
// WITH ICONS & DESCRIPTIONS
// ═══════════════════════════════════════════════════════════════════════════

export const WithIcons = {
  render: () => `
    <sg-select
      label="Payment method"
      placeholder="Select payment..."
      options='[
        {"value":"card","label":"Credit Card","icon":"mdi:credit-card"},
        {"value":"paypal","label":"PayPal","icon":"mdi:paypal"},
        {"value":"bank","label":"Bank Transfer","icon":"mdi:bank"},
        {"value":"crypto","label":"Cryptocurrency","icon":"mdi:bitcoin"}
      ]'
    ></sg-select>
  `,
};

export const WithDescriptions = {
  render: () => `
    <sg-select
      label="Select plan"
      placeholder="Choose a plan..."
      options='[
        {"value":"free","label":"Free","description":"Basic features, 1GB storage"},
        {"value":"pro","label":"Pro","description":"All features, 100GB storage"},
        {"value":"enterprise","label":"Enterprise","description":"Custom limits, priority support"}
      ]'
    ></sg-select>
  `,
};

// ═══════════════════════════════════════════════════════════════════════════
// CREATABLE
// ═══════════════════════════════════════════════════════════════════════════

export const Creatable = {
  render: () => `
    <sg-select
      label="Add tags"
      placeholder="Type to create..."
      searchable
      creatable
      multiple
      options='[
        {"value":"bug","label":"Bug"},
        {"value":"feature","label":"Feature"},
        {"value":"docs","label":"Documentation"}
      ]'
    ></sg-select>
  `,
};

// ═══════════════════════════════════════════════════════════════════════════
// SIZES
// ═══════════════════════════════════════════════════════════════════════════

export const Sizes = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 300px;">
      <sg-select
        size="sm"
        label="Small"
        placeholder="Select..."
        options='[{"value":"1","label":"Option 1"},{"value":"2","label":"Option 2"}]'
      ></sg-select>
      <sg-select
        size="md"
        label="Medium"
        placeholder="Select..."
        options='[{"value":"1","label":"Option 1"},{"value":"2","label":"Option 2"}]'
      ></sg-select>
      <sg-select
        size="lg"
        label="Large"
        placeholder="Select..."
        options='[{"value":"1","label":"Option 1"},{"value":"2","label":"Option 2"}]'
      ></sg-select>
    </div>
  `,
};

// ═══════════════════════════════════════════════════════════════════════════
// VARIANTS
// ═══════════════════════════════════════════════════════════════════════════

export const Variants = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 300px;">
      <sg-select
        variant="default"
        label="Default"
        placeholder="Select..."
        options='[{"value":"1","label":"Option 1"},{"value":"2","label":"Option 2"}]'
      ></sg-select>
      <sg-select
        variant="filled"
        label="Filled"
        placeholder="Select..."
        options='[{"value":"1","label":"Option 1"},{"value":"2","label":"Option 2"}]'
      ></sg-select>
      <sg-select
        variant="underline"
        label="Underline"
        placeholder="Select..."
        options='[{"value":"1","label":"Option 1"},{"value":"2","label":"Option 2"}]'
      ></sg-select>
    </div>
  `,
};

// ═══════════════════════════════════════════════════════════════════════════
// VALIDATION
// ═══════════════════════════════════════════════════════════════════════════

export const ValidationStates = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 300px;">
      <sg-select
        label="Success"
        value="approved"
        validation-state="success"
        helper-text="Selection confirmed"
        options='[{"value":"approved","label":"Approved"},{"value":"rejected","label":"Rejected"}]'
      ></sg-select>
      <sg-select
        label="Warning"
        validation-state="warning"
        helper-text="Consider selecting a different option"
        options='[{"value":"1","label":"Option 1"},{"value":"2","label":"Option 2"}]'
      ></sg-select>
      <sg-select
        label="Error"
        validation-state="error"
        error-message="Please select an option"
        options='[{"value":"1","label":"Option 1"},{"value":"2","label":"Option 2"}]'
      ></sg-select>
    </div>
  `,
};

// ═══════════════════════════════════════════════════════════════════════════
// STATES
// ═══════════════════════════════════════════════════════════════════════════

export const Disabled = {
  render: () => `
    <sg-select
      label="Disabled"
      placeholder="Cannot interact"
      disabled
      options='[{"value":"1","label":"Option 1"},{"value":"2","label":"Option 2"}]'
    ></sg-select>
  `,
};

export const Clearable = {
  render: () => `
    <sg-select
      label="Clearable"
      placeholder="Select then clear..."
      clearable
      value="1"
      options='[{"value":"1","label":"Option 1"},{"value":"2","label":"Option 2"}]'
    ></sg-select>
  `,
};

// ═══════════════════════════════════════════════════════════════════════════
// FORM EXAMPLE
// ═══════════════════════════════════════════════════════════════════════════

export const FormExample = {
  render: () => `
    <div style="max-width: 400px; display: flex; flex-direction: column; gap: 1rem;">
      <sg-input label="Name" placeholder="Enter your name" required></sg-input>

      <sg-select
        label="Country"
        placeholder="Select country"
        searchable
        required
        options='[
          {"value":"us","label":"United States"},
          {"value":"uk","label":"United Kingdom"},
          {"value":"es","label":"Spain"},
          {"value":"fr","label":"France"}
        ]'
      ></sg-select>

      <sg-select
        label="Interests"
        placeholder="Select your interests"
        multiple
        searchable
        options='[
          {"value":"tech","label":"Technology"},
          {"value":"sports","label":"Sports"},
          {"value":"music","label":"Music"},
          {"value":"travel","label":"Travel"},
          {"value":"food","label":"Food"}
        ]'
      ></sg-select>

      <sg-button variant="primary" full-width>Submit</sg-button>
    </div>
  `,
};
