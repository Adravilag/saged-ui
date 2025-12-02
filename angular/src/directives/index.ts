// Re-export types
export type {
  BadgeVariant,
  BadgeSize,
  ButtonVariant,
  ButtonSize,
  ButtonShape,
  DropdownAlign,
  DropdownPosition,
  DropdownSize,
  SkeletonVariant,
  SkeletonAnimation,
  EditorMode,
  SupportedLocale,
  ThemeMode,
  ThemeToggleSize,
} from './proxies';

// Re-export components
export {
  SgArticleEditor,
  SgBadge,
  SgButton,
  SgDropdown,
  SgIcon,
  SgSkeleton,
  SgThemeToggle,
} from './proxies';

import {
  SgArticleEditor,
  SgBadge,
  SgButton,
  SgDropdown,
  SgIcon,
  SgSkeleton,
  SgThemeToggle,
} from './proxies';

/**
 * Array of all SagedUI Angular components.
 * Can be spread into the imports array of a component or module.
 */
export const DIRECTIVES = [
  SgArticleEditor,
  SgBadge,
  SgButton,
  SgDropdown,
  SgIcon,
  SgSkeleton,
  SgThemeToggle,
];
