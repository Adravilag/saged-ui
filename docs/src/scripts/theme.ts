/**
 * Theme management for SageBox docs
 * Note: Theme is initialized in Layout.astro head script to prevent flash
 * This file only provides the toggle function as a backup
 */

// toggleTheme is already defined in Layout.astro inline script
// This is just a type declaration for TypeScript
declare global {
  interface Window {
    toggleTheme: () => void;
  }
}
