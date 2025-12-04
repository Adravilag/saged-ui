// Component API Data
// Datos centralizados de props, eventos, slots y métodos para todos los componentes

export interface Prop {
  name: string;
  type: string;
  default: string;
  description: string;
}

export interface Event {
  name: string;
  description: string;
  type: string;
}

export interface Slot {
  name: string;
  description: string;
}

export interface Method {
  name: string;
  description: string;
  returns: string;
}

// Button Component
export const buttonProps: Prop[] = [
  { name: 'variant', type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'", default: 'primary', description: 'Visual style variant' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: 'md', description: 'Button size' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable interactions' },
  { name: 'loading', type: 'boolean', default: 'false', description: 'Show loading spinner' },
  { name: 'type', type: "'button' | 'submit' | 'reset'", default: 'button', description: 'Native button type' },
  { name: 'full-width', type: 'boolean', default: 'false', description: 'Expand to container width' },
  { name: 'icon-only', type: 'boolean', default: 'false', description: 'Icon only mode (square)' },
  { name: 'aria-label', type: 'string', default: '-', description: 'Accessibility label' },
  { name: 'href', type: 'string', default: '-', description: 'Convert to anchor link' },
];

export const buttonEvents: Event[] = [
  { name: 'sgClick', description: 'Emitted when button is clicked', type: 'CustomEvent<void>' },
  { name: 'sgFocus', description: 'Emitted when button receives focus', type: 'CustomEvent<void>' },
  { name: 'sgBlur', description: 'Emitted when button loses focus', type: 'CustomEvent<void>' },
];

export const buttonSlots: Slot[] = [
  { name: 'default', description: 'Button content (text/icons)' },
  { name: 'icon-start', description: 'Icon before text' },
  { name: 'icon-end', description: 'Icon after text' },
];

// Badge Component
export const badgeProps: Prop[] = [
  { name: 'variant', type: "'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'", default: 'primary', description: 'Color variant' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: 'md', description: 'Badge size' },
  { name: 'pill', type: 'boolean', default: 'false', description: 'Fully rounded corners' },
  { name: 'dot', type: 'boolean', default: 'false', description: 'Show status dot' },
  { name: 'removable', type: 'boolean', default: 'false', description: 'Show remove button' },
  { name: 'outline', type: 'boolean', default: 'false', description: 'Outlined style' },
  { name: 'icon', type: 'string', default: '-', description: 'Icon name (left side)' },
  { name: 'icon-right', type: 'string', default: '-', description: 'Icon name (right side)' },
  { name: 'count', type: 'number', default: '-', description: 'Numeric count to display' },
];

export const badgeSlots: Slot[] = [
  { name: 'default', description: 'Badge text content' },
];

// Icon Component
export const iconProps: Prop[] = [
  { name: 'name', type: 'string', default: '-', description: 'Icon name from sprite' },
  { name: 'size', type: 'number | string', default: '24', description: 'Icon size in pixels' },
  { name: 'color', type: 'string', default: 'currentColor', description: 'Icon color (CSS)' },
  { name: 'spin', type: 'boolean', default: 'false', description: 'Continuous rotation' },
  { name: 'flip', type: "'horizontal' | 'vertical' | 'both'", default: '-', description: 'Mirror the icon' },
  { name: 'rotate', type: 'number', default: '0', description: 'Rotation in degrees' },
  { name: 'sprite-url', type: 'string', default: '-', description: 'Custom sprite URL' },
  { name: 'aria-label', type: 'string', default: '-', description: 'Accessibility label' },
  { name: 'aria-hidden', type: 'boolean', default: 'true', description: 'Hide from screen readers' },
  { name: 'lazy', type: 'boolean', default: 'true', description: 'Lazy load the sprite' },
];

// Dropdown Component
export const dropdownProps: Prop[] = [
  { name: 'open', type: 'boolean', default: 'false', description: 'Control open state' },
  { name: 'align', type: "'start' | 'end' | 'center'", default: 'start', description: 'Menu alignment' },
  { name: 'position', type: "'bottom' | 'top' | 'left' | 'right'", default: 'bottom', description: 'Menu position' },
  { name: 'close-on-select', type: 'boolean', default: 'true', description: 'Close on item click' },
  { name: 'close-on-outside', type: 'boolean', default: 'true', description: 'Close on outside click' },
];

export const dropdownEvents: Event[] = [
  { name: 'sgOpen', description: 'Emitted when menu opens', type: 'CustomEvent<void>' },
  { name: 'sgClose', description: 'Emitted when menu closes', type: 'CustomEvent<void>' },
  { name: 'sgSelect', description: 'Emitted when an item is selected', type: 'CustomEvent<{ value: string }>' },
];

export const dropdownSlots: Slot[] = [
  { name: 'trigger', description: 'Element that opens the menu' },
  { name: 'default', description: 'Menu items content' },
  { name: 'header', description: 'Optional header section' },
  { name: 'footer', description: 'Optional footer section' },
];

export const dropdownMethods: Method[] = [
  { name: 'toggle()', description: 'Toggle menu visibility', returns: 'void' },
  { name: 'show()', description: 'Open the menu', returns: 'void' },
  { name: 'hide()', description: 'Close the menu', returns: 'void' },
];

// Skeleton Component
export const skeletonProps: Prop[] = [
  { name: 'variant', type: "'text' | 'rect' | 'circle'", default: 'text', description: 'Shape variant' },
  { name: 'width', type: 'string', default: '100%', description: 'Element width' },
  { name: 'height', type: 'string', default: '1rem', description: 'Element height' },
  { name: 'animation', type: "'shimmer' | 'pulse' | 'none'", default: 'shimmer', description: 'Animation type' },
  { name: 'lines', type: 'number', default: '1', description: 'Number of lines (text)' },
  { name: 'gap', type: 'string', default: '0.5rem', description: 'Gap between lines' },
];

// Article Editor Component
export const editorProps: Prop[] = [
  { name: 'value', type: 'string', default: "''", description: 'Initial HTML content' },
  { name: 'mode', type: "'html' | 'markdown' | 'split'", default: 'html', description: 'Editor mode' },
  { name: 'placeholder', type: 'string', default: 'Start writing...', description: 'Empty state text' },
  { name: 'min-height', type: 'number', default: '200', description: 'Minimum height (px)' },
  { name: 'max-height', type: 'number', default: '-', description: 'Maximum height (px)' },
  { name: 'readonly', type: 'boolean', default: 'false', description: 'Disable editing' },
  { name: 'autofocus', type: 'boolean', default: 'false', description: 'Focus on mount' },
  { name: 'toolbar', type: 'string[]', default: 'all', description: 'Visible toolbar items' },
];

export const editorEvents: Event[] = [
  { name: 'sgChange', description: 'Content changed', type: 'CustomEvent<{ html: string, text: string }>' },
  { name: 'sgSave', description: 'Ctrl+S pressed', type: 'CustomEvent<{ html: string, markdown: string }>' },
  { name: 'sgFocus', description: 'Editor focused', type: 'CustomEvent<void>' },
  { name: 'sgBlur', description: 'Editor blurred', type: 'CustomEvent<void>' },
];

export const editorMethods: Method[] = [
  { name: 'getHTML()', description: 'Get current HTML content', returns: 'string' },
  { name: 'getMarkdown()', description: 'Get content as Markdown', returns: 'string' },
  { name: 'setContent(html)', description: 'Set editor content', returns: 'void' },
  { name: 'clear()', description: 'Clear all content', returns: 'void' },
  { name: 'focus()', description: 'Focus the editor', returns: 'void' },
];

// Theme Toggle Component
export const themeToggleProps: Prop[] = [
  { name: 'theme', type: "'light' | 'dark' | 'auto'", default: 'auto', description: 'Active theme' },
  { name: 'storage-key', type: 'string', default: 'theme', description: 'localStorage key' },
  { name: 'target', type: 'string', default: 'html', description: 'Element selector for data-theme' },
];

export const themeToggleEvents: Event[] = [
  { name: 'sgChange', description: 'Theme changed', type: "CustomEvent<{ theme: 'light' | 'dark' }>" },
];

// Framework Data
export interface Framework {
  name: string;
  version: string;
  description: string;
  icon: string;
  color: string;
  npmLink?: string;
  githubLink?: string;
  installCommand: string;
}

export const frameworks: Framework[] = [
  {
    name: 'Web Components',
    version: 'Native',
    description: 'Vanilla JS, HTML, o cualquier framework',
    icon: 'web',
    color: '#4f46e5',
    npmLink: 'https://www.npmjs.com/package/sagebox',
    githubLink: 'https://github.com/Adravilag/sagebox',
    installCommand: 'npm install sagebox',
  },
  {
    name: 'React',
    version: '≥17.0.0',
    description: 'Wrappers nativos para React y Next.js',
    icon: 'react',
    color: '#61dafb',
    npmLink: 'https://www.npmjs.com/package/sagebox',
    installCommand: "import { SgButton } from 'sagebox/react'",
  },
  {
    name: 'Angular',
    version: '≥17.0.0',
    description: 'Directivas y módulos para Angular',
    icon: 'angular',
    color: '#dd0031',
    npmLink: 'https://www.npmjs.com/package/sagebox',
    installCommand: "import { SgButton } from 'sagebox/angular'",
  },
];

// Features
export interface Feature {
  icon: string;
  label: string;
}

export const features: Feature[] = [
  { icon: 'dashboard', label: 'Tree-shakeable' },
  { icon: 'palette', label: 'CSS Variables' },
  { icon: 'shield', label: 'WCAG 2.1' },
  { icon: 'verified', label: 'Zero deps' },
  { icon: 'dark-mode', label: 'Dark mode' },
  { icon: 'lightning', label: 'Lazy loading' },
];

// Stats
export interface Stat {
  value: string;
  label: string;
}

export const stats: Stat[] = [
  { value: '7', label: 'Components' },
  { value: '100%', label: 'TypeScript' },
  { value: 'A11y', label: 'Accessible' },
];

// QuickStart Steps
export interface Step {
  label: string;
  code: string;
}

export const quickStartSteps: Step[] = [
  { label: '1. Install', code: 'npm install sagebox' },
  { label: '2. Import', code: "import 'sagebox';" },
  { label: '3. Use', code: '<sg-button>Click me</sg-button>' },
];

// QuickStart Links
export interface QuickLink {
  icon: string;
  label: string;
  url: string;
}

export const quickStartLinks: QuickLink[] = [
  { icon: 'github', label: 'GitHub', url: 'https://github.com/Adravilag/sagebox' },
  { icon: 'file-text', label: 'Changelog', url: 'https://github.com/Adravilag/sagebox/blob/main/CHANGELOG.md' },
  { icon: 'download', label: 'npm', url: 'https://www.npmjs.com/package/sagebox' },
];
