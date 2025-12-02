import { Component, Prop, Host, h } from '@stencil/core';

export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'purple' | 'cyan';

export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg';

/**
 * @virtualProp {"primary" | "secondary" | "success" | "warning" | "error" | "info" | "neutral" | "purple" | "cyan"} variant - Color variant
 * @virtualProp {"xs" | "sm" | "md" | "lg"} size - Size of the badge
 *
 * @slot - Default slot for badge content
 * @slot icon - Optional icon slot (displayed before text)
 *
 * @part badge - The badge element
 * @part icon - The icon wrapper
 * @part content - The text content wrapper
 *
 * @example
 * ### Angular
 * ```html
 * <sg-badge variant="success">Active</sg-badge>
 * <sg-badge variant="error" size="sm" dot>Offline</sg-badge>
 * <sg-badge variant="info" pill>New Feature</sg-badge>
 * <sg-badge variant="warning">
 *   <sg-icon slot="icon" name="alert-triangle" size="12"></sg-icon>
 *   Warning
 * </sg-badge>
 * ```
 *
 * ### React
 * ```jsx
 * <sg-badge variant="primary" outlined>Beta</sg-badge>
 * <sg-badge variant="success" pulse>Live</sg-badge>
 * ```
 *
 * ### Vanilla JS
 * ```html
 * <sg-badge variant="info" size="lg">Featured</sg-badge>
 * <sg-badge variant="neutral" removable id="tag1">Tag 1</sg-badge>
 * <script>
 *   document.querySelector('#tag1').addEventListener('sgRemove', (e) => {
 *     e.target.remove();
 *   });
 * </script>
 * ```
 */
@Component({
  tag: 'sg-badge',
  styleUrl: 'badge.css',
  shadow: true,
})
export class SgBadge {
  /**
   * Color variant of the badge
   */
  @Prop({ reflect: true }) variant: BadgeVariant = 'primary';

  /**
   * Size of the badge
   */
  @Prop({ reflect: true }) size: BadgeSize = 'md';

  /**
   * Display as pill shape (fully rounded)
   */
  @Prop({ reflect: true }) pill: boolean = false;

  /**
   * Display as outlined style (transparent background with border)
   */
  @Prop({ reflect: true }) outlined: boolean = false;

  /**
   * Show a status dot indicator
   */
  @Prop({ reflect: true }) dot: boolean = false;

  /**
   * Apply pulse animation to the dot
   */
  @Prop({ reflect: true }) pulse: boolean = false;

  /**
   * Make the badge clickable/interactive
   */
  @Prop({ reflect: true }) clickable: boolean = false;

  /**
   * Custom icon name (if using sg-icon internally)
   */
  @Prop({ reflect: true }) icon: string;

  /**
   * Display as soft/subtle style (lighter background)
   */
  @Prop({ reflect: true }) soft: boolean = false;

  private getHostClasses(): Record<string, boolean> {
    return {
      [`sg-badge--${this.variant}`]: true,
      [`sg-badge--${this.size}`]: true,
      'sg-badge--pill': this.pill,
      'sg-badge--outlined': this.outlined,
      'sg-badge--soft': this.soft,
      'sg-badge--clickable': this.clickable,
      'sg-badge--has-dot': this.dot,
      'sg-badge--pulse': this.pulse,
    };
  }

  render() {
    return (
      <Host class={this.getHostClasses()}>
        <span class="badge" part="badge">
          {/* Status dot */}
          {this.dot && (
            <span class="dot" aria-hidden="true">
              {this.pulse && <span class="dot-pulse"></span>}
            </span>
          )}

          {/* Icon slot */}
          <span class="icon" part="icon">
            <slot name="icon"></slot>
          </span>

          {/* Content */}
          <span class="content" part="content">
            <slot></slot>
          </span>
        </span>
      </Host>
    );
  }
}
