/**
 * SagedUI Angular Wrappers
 */

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
} from './directives/proxies';

// Re-export components
export {
  SgArticleEditor,
  SgBadge,
  SgButton,
  SgDropdown,
  SgIcon,
  SgSkeleton,
  SgThemeToggle,
} from './directives/proxies';

import {
  SgArticleEditor,
  SgBadge,
  SgButton,
  SgDropdown,
  SgIcon,
  SgSkeleton,
  SgThemeToggle,
} from './directives/proxies';

export const DIRECTIVES = [
  SgArticleEditor,
  SgBadge,
  SgButton,
  SgDropdown,
  SgIcon,
  SgSkeleton,
  SgThemeToggle,
];