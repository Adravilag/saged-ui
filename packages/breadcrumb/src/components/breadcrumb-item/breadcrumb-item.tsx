import { Component, Prop, h, Host, Element, State } from '@stencil/core';

/**
 * @component sg-breadcrumb-item
 * @description Individual breadcrumb item. Must be used inside sg-breadcrumb.
 *
 * @slot - Default slot for item content/label
 * @slot icon - Optional icon displayed before the label
 *
 * @part item - The list item element
 * @part link - The anchor element (when href is provided)
 * @part text - The text span element (when no href)
 * @part separator - The separator element
 * @part icon - The icon wrapper
 *
 * @example
 * ```html
 * <sg-breadcrumb-item href="/home">
 *   <sg-icon slot="icon" name="home" size="14"></sg-icon>
 *   Home
 * </sg-breadcrumb-item>
 * ```
 */
@Component({
  tag: 'sg-breadcrumb-item',
  styleUrl: 'breadcrumb-item.css',
  shadow: true,
})
export class SgBreadcrumbItem {
  @Element() el: HTMLElement;

  /**
   * URL to navigate to
   */
  @Prop() href: string;

  /**
   * Target for the link
   */
  @Prop() target: string = '_self';

  /**
   * Whether this is the current/active page
   */
  @Prop({ reflect: true }) active: boolean = false;

  /**
   * Disable the item
   */
  @Prop({ reflect: true }) disabled: boolean = false;

  /**
   * Icon name to display (uses sg-icon)
   */
  @Prop() icon: string;

  @State() separator: string = '›';
  @State() isLast: boolean = false;

  componentWillLoad() {
    this.updateSeparator();
    this.checkIfLast();
  }

  componentDidLoad() {
    // Observe parent for separator changes
    const parent = this.el.closest('sg-breadcrumb');
    if (parent) {
      const observer = new MutationObserver(() => {
        this.updateSeparator();
        this.checkIfLast();
      });
      observer.observe(parent, { childList: true, subtree: true });
    }
  }

  private updateSeparator() {
    const parent = this.el.closest('sg-breadcrumb');
    if (parent) {
      const shadowRoot = parent.shadowRoot;
      if (shadowRoot) {
        const template = shadowRoot.querySelector('.separator-template');
        if (template) {
          this.separator = template.textContent || '›';
        }
      }
    }
  }

  private checkIfLast() {
    const parent = this.el.closest('sg-breadcrumb');
    if (parent) {
      const items = parent.querySelectorAll('sg-breadcrumb-item');
      const lastItem = items[items.length - 1];
      this.isLast = this.el === lastItem;
    }
  }

  private getHostClasses(): Record<string, boolean> {
    return {
      'sg-breadcrumb-item--active': this.active || this.isLast,
      'sg-breadcrumb-item--disabled': this.disabled,
      'sg-breadcrumb-item--last': this.isLast,
    };
  }

  private renderContent() {
    return [
      this.icon && (
        <span key="item-icon" class="item-icon" part="icon">
          <sg-icon name={this.icon} size="14" color="currentColor"></sg-icon>
        </span>
      ),
      <slot key="icon-slot" name="icon"></slot>,
      <span key="item-label" class="item-label">
        <slot></slot>
      </span>,
    ];
  }

  render() {
    const isClickable = this.href && !this.active && !this.disabled;

    return (
      <Host class={this.getHostClasses()}>
        <li class="breadcrumb-item" part="item">
          {isClickable ? (
            <a href={this.href} target={this.target} class="item-link" part="link" rel={this.target === '_blank' ? 'noopener noreferrer' : undefined}>
              {this.renderContent()}
            </a>
          ) : (
            <span class="item-text" part="text" aria-current={this.active || this.isLast ? 'page' : undefined}>
              {this.renderContent()}
            </span>
          )}

          {!this.isLast && (
            <span class="item-separator" part="separator" aria-hidden="true">
              {this.separator}
            </span>
          )}
        </li>
      </Host>
    );
  }
}
