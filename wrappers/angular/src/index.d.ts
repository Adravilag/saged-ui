/**
 * SageBox Angular Wrappers
 *
 * Este módulo exporta los componentes de SageBox como componentes standalone de Angular.
 *
 * IMPORTANTE: Asegúrate de importar 'sagebox' en tu main.ts para registrar los custom elements.
 *
 * @example
 * ```typescript
 * // main.ts
 * import 'sagebox';
 *
 * // my-component.ts
 * import { SgIcon, SgButton } from 'sagebox/angular';
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
export { SgArticleEditor, SgBadge, SgButton, SgDropdown, SgIcon, SgSkeleton, SgThemeToggle, DIRECTIVES, } from './directives/index';
//# sourceMappingURL=index.d.ts.map