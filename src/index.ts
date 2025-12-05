/**
 * @fileoverview entry point for your component library
 *
 * This is the entry point for your component library. Use this file to export utilities,
 * constants or data structure that accompany your components.
 *
 * DO NOT use this file to export your components. Instead, use the recommended approaches
 * to consume components of this package as outlined in the `README.md`.
 */

export { format } from './utils/utils';
// Icon management utilities - re-exported from @sagebox/icons package
export { registerIcons, registerIcon, getRegisteredIcons, hasRegisteredIcon, type IconDefinition } from '@sagebox/icons';

// Default export for Stencil globalScript import compatibility.
// Stencil imports the globalScript as a default import; provide a noop function
// so builds that reference `src/index.ts` as `globalScript` work correctly.
export default () => {};
