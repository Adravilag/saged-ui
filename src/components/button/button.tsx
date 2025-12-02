import { Component, Prop, Event, EventEmitter, h, Host, Element } from '@stencil/core';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'success' | 'warning' | 'error' | 'info';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';
export type ButtonShape = 'default' | 'circle' | 'square' | 'pill' | 'block';

/**
 * @component sg-button
 * @description A versatile button component with multiple variants, sizes, and states.
 * Framework-agnostic: works with Angular, React, Vue, and vanilla JS without wrappers.
 *
 * @example
 * <!-- ═══════════════════════════════════════════════════════════════════════════════
 *      VANILLA HTML / JS
 *      ═══════════════════════════════════════════════════════════════════════════════ -->
 * <sg-button>Click me</sg-button>
 * <sg-button variant="primary">Primary</sg-button>
 * <sg-button variant="outline" size="lg">Large Outline</sg-button>
 * <sg-button variant="success" leading-icon="check">Save</sg-button>
 * <sg-button loading>Loading...</sg-button>
 * <sg-button disabled>Disabled</sg-button>
 * <sg-button shape="pill" variant="secondary">Pill Button</sg-button>
 *
 * <script>
 *   document.querySelector('sg-button').addEventListener('sgClick', (e) => {
 *     console.log('Button clicked!', e.detail);
 *   });
 * </script>
 *
 * <!-- ═══════════════════════════════════════════════════════════════════════════════
 *      ANGULAR (no wrapper needed, add CUSTOM_ELEMENTS_SCHEMA)
 *      ═══════════════════════════════════════════════════════════════════════════════ -->
 * <sg-button
 *   variant="primary"
 *   [attr.loading]="isLoading || null"
 *   [attr.disabled]="isDisabled || null"
 *   (sgClick)="handleClick($event)">
 *   Save Changes
 * </sg-button>
 *
 * <!-- ═══════════════════════════════════════════════════════════════════════════════
 *      REACT (use kebab-case attributes)
 *      ═══════════════════════════════════════════════════════════════════════════════ -->
 * <sg-button
 *   variant="primary"
 *   leading-icon="save"
 *   loading={isLoading}
 *   onSgClick={(e) => handleClick(e.detail)}>
 *   Save Changes
 * </sg-button>
 *
 * @slot - Button content (text, icons, etc.)
 *
 * @fires sgClick - Emitted when button is clicked (not disabled/loading)
 *
 * @cssprop --sg-btn-bg - Button background color
 * @cssprop --sg-btn-color - Button text color
 * @cssprop --sg-btn-border-color - Button border color
 * @cssprop --sg-btn-radius - Button border radius
 * @cssprop --sg-btn-shadow - Button box shadow
 */
@Component({
  tag: 'sg-button',
  styleUrl: 'button.css',
  shadow: true,
})
export class SgButton {
  @Element() el!: HTMLElement;

  /**
   * Button color variant
   * @attr variant
   */
  @Prop({ reflect: true }) variant: ButtonVariant = 'primary';

  /**
   * Button size
   * @attr size
   */
  @Prop({ reflect: true }) size: ButtonSize = 'md';

  /**
   * Button shape
   * @attr shape
   */
  @Prop({ reflect: true }) shape: ButtonShape = 'default';

  /**
   * Disable the button
   * @attr disabled
   */
  @Prop({ reflect: true }) disabled: boolean = false;

  /**
   * Show loading spinner
   * @attr loading
   */
  @Prop({ reflect: true }) loading: boolean = false;

  /**
   * Loading text (replaces content while loading)
   * @attr loading-text
   */
  @Prop({ attribute: 'loading-text' }) loadingText?: string;

  /**
   * Leading icon name (from sg-icon)
   * @attr leading-icon
   */
  @Prop({ attribute: 'leading-icon' }) leadingIcon?: string;

  /**
   * Trailing icon name (from sg-icon)
   * @attr trailing-icon
   */
  @Prop({ attribute: 'trailing-icon' }) trailingIcon?: string;

  /**
   * Button type attribute
   * @attr type
   */
  @Prop() type: 'button' | 'submit' | 'reset' = 'button';

  /**
   * Accessible label
   * @attr aria-label
   */
  @Prop({ attribute: 'aria-label' }) ariaLabel?: string;

  /**
   * Click event (emitted when not disabled/loading)
   */
  @Event() sgClick!: EventEmitter<MouseEvent>;

  private handleClick = (event: MouseEvent) => {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.sgClick.emit(event);
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      if (this.disabled || this.loading) {
        event.preventDefault();
        return;
      }
      event.preventDefault();
      this.sgClick.emit(event as unknown as MouseEvent);
    }
  };

  private renderSpinner() {
    return (
      <svg class="spinner" viewBox="0 0 24 24" fill="none">
        <circle class="spinner-track" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="spinner-head" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
    );
  }

  private renderIcon(iconName: string, position: 'leading' | 'trailing') {
    return <sg-icon name={iconName} class={`icon icon-${position}`} size="1em" />;
  }

  render() {
    const hostClasses = {
      'sg-button': true,
      [`sg-button--${this.variant}`]: true,
      [`sg-button--${this.size}`]: true,
      [`sg-button--${this.shape}`]: this.shape !== 'default',
      'sg-button--disabled': this.disabled,
      'sg-button--loading': this.loading,
    };

    return (
      <Host class={hostClasses}>
        <button
          type={this.type}
          class="button"
          disabled={this.disabled || this.loading}
          aria-disabled={this.disabled || this.loading ? 'true' : undefined}
          aria-busy={this.loading ? 'true' : undefined}
          aria-label={this.ariaLabel}
          onClick={this.handleClick}
          onKeyDown={this.handleKeyDown}
        >
          {/* Ripple container */}
          <span class="ripple-container" />

          {/* Loading spinner */}
          {this.loading && <span class="spinner-wrapper">{this.renderSpinner()}</span>}

          {/* Leading icon */}
          {this.leadingIcon && !this.loading && this.renderIcon(this.leadingIcon, 'leading')}

          {/* Content */}
          <span class={{ 'content': true, 'content--hidden': this.loading && !this.loadingText }}>{this.loading && this.loadingText ? this.loadingText : <slot />}</span>

          {/* Trailing icon */}
          {this.trailingIcon && !this.loading && this.renderIcon(this.trailingIcon, 'trailing')}
        </button>
      </Host>
    );
  }
}
