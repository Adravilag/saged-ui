/**
 * Built-in Icons for SageBox
 *
 * These are minimal built-in icons that ship with the library.
 * For custom icons, use the CLI: npx sagebox icons build
 */

export interface IconDefinition {
  paths: string[];
  viewBox?: string;
  fillRule?: 'nonzero' | 'evenodd';
}

/**
 * Built-in icons (minimal set for library functionality)
 * These are always available without any configuration
 */
export const builtinIcons: Record<string, IconDefinition> = {
  // Error/Warning icon for fallback
  error: {
    paths: ['M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z'],
    viewBox: '0 0 24 24',
  },
  // Loading spinner (simple)
  loading: {
    paths: ['M12 2a10 10 0 0 1 10 10'],
    viewBox: '0 0 24 24',
  },
};

export type BuiltinIconName = keyof typeof builtinIcons;
