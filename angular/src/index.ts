/**
 * SagedUI Angular Wrappers
 * 
 * Este módulo exporta los componentes de SagedUI como componentes standalone de Angular.
 * 
 * @example
 * ```typescript
 * import { SgIcon, SgButton, SgBadge, SgDropdown, SgSkeleton } from 'saged-ui/angular';
 * 
 * @Component({
 *   selector: 'my-component',
 *   standalone: true,
 *   imports: [SgIcon, SgButton],
 *   template: `
 *     <sg-icon name="home" size="24"></sg-icon>
 *     <sg-button variant="primary">Click me</sg-button>
 *   `
 * })
 * export class MyComponent {}
 * ```
 */

// Export all directives/components
export * from './directives/proxies';

// Export the directives array for module imports
export { DIRECTIVES } from './directives/index';

// Re-export types from saged-ui for convenience
export type { Components } from 'saged-ui/components';
