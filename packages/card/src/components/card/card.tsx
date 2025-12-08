import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';

export type CardVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info' | 'gradient' | 'outlined';
export type CardSize = 'sm' | 'md' | 'lg';

/**
 * @component sg-card
 * @description A flexible card component with multiple variants, optional header/footer, icons and actions.
 * Framework-agnostic: works with Angular, React, Vue, and vanilla JS.
 *
 * @slot - Default slot for card content
 * @slot header - Optional header content (overrides title/subtitle props)
 * @slot footer - Optional footer content (overrides action props)
 * @slot icon - Custom icon slot
 * @slot media - Media content (image/video) displayed at top
 *
 * @part card - The main card container
 * @part header - The header section
 * @part title - The title element
 * @part subtitle - The subtitle element
 * @part body - The body/content section
 * @part footer - The footer section
 * @part icon - The icon wrapper
 * @part media - The media container
 * @part action - The action button
 *
 * @example
 * ### Basic Usage
 * ```html
 * <sg-card title="Card Title" subtitle="Card subtitle">
 *   <p>Card content goes here</p>
 * </sg-card>
 * ```
 *
 * ### With Icon and Action
 * ```html
 * <sg-card
 *   title="Users"
 *   subtitle="Manage your team"
 *   icon="users"
 *   variant="primary"
 *   action-label="View All"
 *   clickable>
 *   <p>You have 24 active users</p>
 * </sg-card>
 * ```
 *
 * ### With Custom Slots
 * ```html
 * <sg-card variant="gradient">
 *   <img slot="media" src="image.jpg" alt="Cover" />
 *   <div slot="header">
 *     <h3>Custom Header</h3>
 *   </div>
 *   <p>Content here</p>
 *   <div slot="footer">
 *     <sg-button variant="primary">Action</sg-button>
 *   </div>
 * </sg-card>
 * ```
 */
@Component({
  tag: 'sg-card',
  styleUrl: 'card.css',
  shadow: true,
})
export class SgCard {
  // ═══════════════════════════════════════════════════════════════════════════
  // CONTENT PROPS
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Card title displayed in the header
   */
  @Prop() cardTitle: string;

  /**
   * Card subtitle displayed below the title
   */
  @Prop() subtitle: string;

  /**
   * Optional header text (displays above title with accent background)
   */
  @Prop() header: string;

  // ═══════════════════════════════════════════════════════════════════════════
  // APPEARANCE PROPS
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Visual variant of the card
   */
  @Prop({ reflect: true }) variant: CardVariant = 'default';

  /**
   * Size preset for padding and typography
   */
  @Prop({ reflect: true }) size: CardSize = 'md';

  /**
   * Removes shadow from the card
   */
  @Prop({ reflect: true }) flat: boolean = false;

  /**
   * Adds hover elevation effect
   */
  @Prop({ reflect: true }) hoverable: boolean = false;

  /**
   * Makes the entire card clickable
   */
  @Prop({ reflect: true }) clickable: boolean = false;

  /**
   * Disables the card (reduces opacity, no interactions)
   */
  @Prop({ reflect: true }) disabled: boolean = false;

  /**
   * Applies loading state with skeleton effect
   */
  @Prop({ reflect: true }) loading: boolean = false;

  // ═══════════════════════════════════════════════════════════════════════════
  // ICON PROPS
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Icon name to display (uses sg-icon internally)
   */
  @Prop() icon: string;

  /**
   * Icon size in pixels
   */
  @Prop() iconSize: number | string = 48;

  /**
   * Icon color (CSS color value)
   */
  @Prop() iconColor: string;

  // ═══════════════════════════════════════════════════════════════════════════
  // ACTION PROPS
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Label for the action button in footer
   */
  @Prop() actionLabel: string;

  /**
   * Variant for the action button
   */
  @Prop() actionVariant: 'primary' | 'secondary' | 'ghost' = 'primary';

  /**
   * URL for navigation (makes card a link)
   */
  @Prop() href: string;

  /**
   * Target for href link
   */
  @Prop() target: string = '_self';

  // ═══════════════════════════════════════════════════════════════════════════
  // EVENTS
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Emitted when the card is clicked (if clickable)
   */
  @Event() sgClick: EventEmitter<void>;

  /**
   * Emitted when the action button is clicked
   */
  @Event() sgAction: EventEmitter<void>;

  // ═══════════════════════════════════════════════════════════════════════════
  // HANDLERS
  // ═══════════════════════════════════════════════════════════════════════════

  private readonly handleClick = (_e: MouseEvent) => {
    if (this.disabled || this.loading) return;

    if (this.clickable) {
      this.sgClick.emit();
    }

    if (this.href) {
      if (this.target === '_blank') {
        globalThis.open(this.href, '_blank', 'noopener,noreferrer');
      } else {
        globalThis.location.href = this.href;
      }
    }
  };

  private readonly handleActionClick = (e: MouseEvent) => {
    e.stopPropagation();
    if (this.disabled || this.loading) return;
    this.sgAction.emit();
  };

  private readonly handleKeyDown = (e: KeyboardEvent) => {
    if (this.disabled || this.loading) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.handleClick(e as any);
    }
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // RENDER HELPERS
  // ═══════════════════════════════════════════════════════════════════════════

  private getHostClasses(): Record<string, boolean> {
    return {
      [`sg-card--${this.variant}`]: true,
      [`sg-card--${this.size}`]: true,
      'sg-card--flat': this.flat,
      'sg-card--hoverable': this.hoverable,
      'sg-card--clickable': this.clickable || !!this.href,
      'sg-card--disabled': this.disabled,
      'sg-card--loading': this.loading,
    };
  }

  private renderIcon() {
    if (!this.icon) return null;

    return (
      <div class="card-icon" part="icon">
        <sg-icon name={this.icon} size={this.iconSize} color={this.iconColor || 'currentColor'}></sg-icon>
      </div>
    );
  }

  private renderHeader() {
    const hasHeaderContent = this.header || this.cardTitle || this.subtitle;

    if (!hasHeaderContent) return null;

    return (
      <div class="card-header" part="header">
        {this.header && <div class="card-header-badge">{this.header}</div>}
        <slot name="header">
          {this.cardTitle && (
            <h3 class="card-title" part="title">
              {this.cardTitle}
            </h3>
          )}
          {this.subtitle && (
            <p class="card-subtitle" part="subtitle">
              {this.subtitle}
            </p>
          )}
        </slot>
      </div>
    );
  }

  private renderFooter() {
    if (!this.actionLabel) return null;

    return (
      <div class="card-footer" part="footer">
        <slot name="footer">
          <button class={`card-action card-action--${this.actionVariant}`} part="action" onClick={this.handleActionClick} disabled={this.disabled}>
            {this.actionLabel}
          </button>
        </slot>
      </div>
    );
  }

  private renderLoading() {
    return (
      <div class="card-loading">
        <div class="skeleton skeleton-header"></div>
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-text skeleton-text--short"></div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════════

  render() {
    const isInteractive = this.clickable || !!this.href;

    return (
      <Host
        class={this.getHostClasses()}
        role={isInteractive ? 'region' : 'article'}
        tabindex={isInteractive && !this.disabled ? '0' : undefined}
        onClick={this.handleClick}
        onKeyDown={isInteractive ? this.handleKeyDown : undefined}
        aria-disabled={this.disabled ? 'true' : undefined}
      >
        <div class="card" part="card">
          {/* Media Slot */}
          <div class="card-media" part="media">
            <slot name="media"></slot>
          </div>

          {/* Icon */}
          <slot name="icon">{this.renderIcon()}</slot>

          {/* Loading State */}
          {this.loading
            ? this.renderLoading()
            : [
                /* Header */
                this.renderHeader(),

                /* Body */
                <div key="card-body" class="card-body" part="body">
                  <slot></slot>
                </div>,

                /* Footer */
                this.renderFooter(),
              ]}
        </div>
      </Host>
    );
  }
}
