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
    ],
  },
  {
    group: 'Form',
    icon: 'form',
    items: [
      { id: 'dropdown', name: 'Dropdown', href: '/components/dropdown', icon: 'dropdown' },
    ],
  },
  {
    group: 'Feedback',
    icon: 'activity',
    items: [
      { id: 'skeleton', name: 'Skeleton', href: '/components/skeleton', icon: 'skeleton' },
    ],
  },
  {
    group: 'Content',
    icon: 'file-text',
    items: [
      { id: 'article-editor', name: 'Article Editor', href: '/components/article-editor', icon: 'editor' },
    ],
  },
  {
    group: 'Utils',
    icon: 'settings',
    items: [
      { id: 'theme-toggle', name: 'Theme Toggle', href: '/components/theme-toggle', icon: 'moon' },
    ],
  },
];

export const siteConfig = {
  name: 'SageBox',
  version: pkg.version,
};
