/**
 * Navigation configuration for SageBox docs
 */

// Import version from package.json
import pkg from '../../../package.json';

export interface NavItem {
  id: string;
  name: string;
  href?: string;
  icon?: string;
}

export interface NavSection {
  group: string;
  icon?: string;
  items: NavItem[];
}

export const navigation: NavSection[] = [
  {
    group: 'General',
    icon: 'layers',
    items: [
      { id: 'button', name: 'Button', href: '/components/button', icon: 'button' },
      { id: 'badge', name: 'Badge', href: '/components/badge', icon: 'badge' },
      { id: 'icon', name: 'Icon', href: '/components/icon', icon: 'image' },
      { id: 'card', name: 'Card', href: '/components/card', icon: 'card' },
      { id: 'tooltip', name: 'Tooltip', href: '/components/tooltip', icon: 'tooltip' },
    ],
  },
  {
    group: 'Navigation',
    icon: 'navigation',
    items: [
      { id: 'breadcrumb', name: 'Breadcrumb', href: '/components/breadcrumb', icon: 'breadcrumb' },
      { id: 'context-menu', name: 'Context Menu', href: '/components/context-menu', icon: 'menu' },
    ],
  },
  {
    group: 'Form',
    icon: 'form',
    items: [
      { id: 'input', name: 'Input', href: '/components/input', icon: 'input' },
      { id: 'select', name: 'Select', href: '/components/select', icon: 'select' },
      { id: 'dropdown', name: 'Dropdown', href: '/components/dropdown', icon: 'dropdown' },
      { id: 'date-picker', name: 'Date Picker', href: '/components/date-picker', icon: 'calendar' },
      { id: 'search-box', name: 'Search Box', href: '/components/search-box', icon: 'search' },
      { id: 'form-section', name: 'Form Section', href: '/components/form-section', icon: 'form' },
    ],
  },
  {
    group: 'Data Display',
    icon: 'chart',
    items: [
      { id: 'stats-card', name: 'Stats Card', href: '/components/stats-card', icon: 'stats' },
      { id: 'info-field', name: 'Info Field', href: '/components/info-field', icon: 'info' },
    ],
  },
  {
    group: 'Feedback',
    icon: 'activity',
    items: [{ id: 'skeleton', name: 'Skeleton', href: '/components/skeleton', icon: 'skeleton' }],
  },
  {
    group: 'Content',
    icon: 'file-text',
    items: [{ id: 'article-editor', name: 'Article Editor', href: '/components/article-editor', icon: 'editor' }],
  },
  {
    group: 'Utils',
    icon: 'settings',
    items: [{ id: 'theme-toggle', name: 'Theme Toggle', href: '/components/theme-toggle', icon: 'moon' }],
  },
];

export const siteConfig = {
  name: 'SageBox',
  version: pkg.version,
};
