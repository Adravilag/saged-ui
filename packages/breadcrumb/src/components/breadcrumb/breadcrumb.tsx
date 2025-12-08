import { Component, Prop, h, Host, Element } from '@stencil/core';

export type BreadcrumbSeparator = 'chevron' | 'slash' | 'arrow' | 'dot';
export type BreadcrumbSize = 'sm' | 'md' | 'lg';

/**
 * @component sg-breadcrumb
 * @description Navigation breadcrumb component showing the current page location within a hierarchy.
 *
 * @slot - Default slot for sg-breadcrumb-item elements
 *
 * @part nav - The nav container element
 * @part list - The ordered list element
 *
 * @example
 * ```html
 * <sg-breadcrumb>
 *   <sg-breadcrumb-item href="/">Home</sg-breadcrumb-item>
 *   <sg-breadcrumb-item href="/products">Products</sg-breadcrumb-item>
 *   <sg-breadcrumb-item active>Details</sg-breadcrumb-item>
 * </sg-breadcrumb>
 * ```
 */
@Component({
  tag: 'sg-breadcrumb',
  styleUrl: 'breadcrumb.css',
  shadow: true,
})
export class SgBreadcrumb {
  @Element() el: HTMLElement;

  /**
   * Separator style between items
   */
  @Prop({ reflect: true }) separator: BreadcrumbSeparator = 'chevron';

  /**
   * Size variant
   */
  @Prop({ reflect: true }) size: BreadcrumbSize = 'md';

  /**
   * Custom separator character (overrides separator prop)
   */
  @Prop() customSeparator: string;

  /**
   * Show home icon for first item
   */
  @Prop() showHomeIcon: boolean = false;

  /**
   * Collapse items on mobile (show only first and last)
   */
  @Prop() collapsible: boolean = false;

  /**
   * Maximum items to show before collapsing (when collapsible)
   */
  @Prop() maxItems: number = 4;

  private getSeparatorIcon(): string {
    if (this.customSeparator) {
      return this.customSeparator;
    }

    const separators: Record<BreadcrumbSeparator, string> = {
      chevron: '›',
      slash: '/',
      arrow: '→',
      dot: '•',
    };

    return separators[this.separator];
  }

  private getHostClasses(): Record<string, boolean> {
    return {
      [`sg-breadcrumb--${this.size}`]: true,
      'sg-breadcrumb--collapsible': this.collapsible,
    };
  }

  render() {
    return (
      <Host class={this.getHostClasses()}>
        <nav aria-label="Breadcrumb" part="nav">
          <ol class="breadcrumb-list" part="list">
            <slot></slot>
          </ol>
        </nav>
        {/* Hidden separator template for items to use */}
        <span class="separator-template" aria-hidden="true">
          {this.getSeparatorIcon()}
        </span>
      </Host>
    );
  }
}
