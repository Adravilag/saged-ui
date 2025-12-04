// SVG Icon Component - Public API
export { SgIcon } from './svg-icon';
export { builtinIcons, IconDefinition, BuiltinIconName } from './icons/builtin';

// Re-export icons from auto-generated file if exists (for user projects)
export * from './icons';

// ═══════════════════════════════════════════════════════════════════════════
// Global Icon Registration API
// These functions allow users to register custom icons without component reference
// ═══════════════════════════════════════════════════════════════════════════

import type { IconDefinition } from './icons/builtin';

/** Global key for user-registered icons */
const ICONS_KEY = '__sgUserIcons';

/** Type for icon storage in globalThis */
interface SgIconGlobals {
  [ICONS_KEY]?: Record<string, IconDefinition | string>;
}

/** Typed globalThis accessor */
function getGlobal(): SgIconGlobals {
  return typeof globalThis !== 'undefined' ? (globalThis as unknown as SgIconGlobals) : {};
}

/** Internal storage for user-registered icons */
const _userIcons: Record<string, IconDefinition | string> = {};

/**
 * Register multiple icons at once (global function)
 * Icons registered here will be available to all <sg-icon> instances
 *
 * @param icons - Object with icon names as keys and SVG strings or IconDefinition as values
 * @example
 * import { registerIcons } from '@nicepage/sagebox';
 *
 * registerIcons({
 *   'my-logo': '<svg viewBox="0 0 24 24"><path d="M12..."/></svg>',
 *   'custom-icon': '<svg>...</svg>'
 * });
 *
 * // Then use in HTML:
 * // <sg-icon name="my-logo"></sg-icon>
 */
export function registerIcons(icons: Record<string, IconDefinition | string>): void {
  Object.assign(_userIcons, icons);
  // Sync with component's userIcons
  const g = getGlobal();
  g[ICONS_KEY] = _userIcons;
}

/**
 * Register a single icon (global function)
 *
 * @param name - Icon name to register
 * @param icon - SVG string or IconDefinition
 * @example
 * import { registerIcon } from '@nicepage/sagebox';
 *
 * registerIcon('my-custom-icon', '<svg viewBox="0 0 24 24">...</svg>');
 */
export function registerIcon(name: string, icon: IconDefinition | string): void {
  _userIcons[name] = icon;
  const g = getGlobal();
  g[ICONS_KEY] = _userIcons;
}

/**
 * Get all registered user icons
 */
export function getRegisteredIcons(): Record<string, IconDefinition | string> {
  return { ..._userIcons };
}

/**
 * Check if a custom icon is registered
 */
export function hasRegisteredIcon(name: string): boolean {
  return name in _userIcons;
}
