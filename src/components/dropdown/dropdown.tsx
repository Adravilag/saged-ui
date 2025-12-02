import { Component, Prop, State, Event, EventEmitter, Element, Host, h, Listen, Method } from '@stencil/core';

/**
 * @virtualProp {"start" | "end" | "center"} align - Horizontal alignment of the dropdown
 * @virtualProp {"bottom" | "top"} position - Position of the dropdown relative to trigger
 *
 * @slot trigger - Content that triggers the dropdown
 * @slot - Default slot for dropdown content
 * @slot header - Optional header content
 * @slot footer - Optional footer content
 *
 * @part container - The outer container
 * @part trigger - The trigger wrapper
 * @part content - The dropdown content wrapper
 * @part backdrop - The backdrop overlay (only on mobile)
 *
 * @example
 * ### Angular
 * ```html
 * <sg-dropdown align="start" position="bottom">
 *   <button slot="trigger">Open Menu</button>
 *   <div slot="header">Settings</div>
 *   <button>Option 1</button>
 *   <button>Option 2</button>
 *   <div slot="footer">Logged in as Admin</div>
 * </sg-dropdown>
 * ```
 *
 * ### React
 * ```jsx
 * <sg-dropdown align="start" closeOnSelect={false}>
 *   <button slot="trigger">Menu</button>
 *   <div>Content here</div>
 * </sg-dropdown>
 * ```
 *
 * ### Vanilla JS
 * ```html
 * <sg-dropdown id="myDropdown" align="end" close-on-select="false">
 *   <button slot="trigger">Options</button>
 *   <ul>
 *     <li>Item 1</li>
 *     <li>Item 2</li>
 *   </ul>
 * </sg-dropdown>
 * <script>
 *   const dropdown = document.querySelector('#myDropdown');
 *   dropdown.addEventListener('sgOpen', (e) => console.log('Opened'));
 *   dropdown.addEventListener('sgClose', (e) => console.log('Closed'));
 * </script>
 * ```
 */
@Component({
  tag: 'sg-dropdown',
  styleUrl: 'dropdown.css',
  shadow: true,
})
export class SgDropdown {
  @Element() el: HTMLElement;

  /**
   * Whether the dropdown is currently open
   */
  @Prop({ reflect: true, mutable: true }) open: boolean = false;

  /**
   * Horizontal alignment of the dropdown content relative to trigger
   */
  @Prop({ reflect: true }) align: 'start' | 'end' | 'center' = 'start';

  /**
   * Vertical position of the dropdown content
   */
  @Prop({ reflect: true }) position: 'bottom' | 'top' = 'bottom';

  /**
   * Whether to close the dropdown when an item is selected/clicked
   */
  @Prop({ reflect: true, attribute: 'close-on-select' }) closeOnSelect: boolean = true;

  /**
   * Minimum width of the dropdown content (e.g., "200px", "12rem")
   */
  @Prop({ reflect: true, attribute: 'min-width' }) minWidth: string = '200px';

  /**
   * Maximum height of the dropdown content for scrolling
   */
  @Prop({ reflect: true, attribute: 'max-height' }) maxHeight: string = '320px';

  /**
   * Whether the dropdown is disabled
   */
  @Prop({ reflect: true }) disabled: boolean = false;

  /**
   * Show a backdrop overlay (useful on mobile)
   */
  @Prop({ reflect: true, attribute: 'show-backdrop' }) showBackdrop: boolean = false;

  /**
   * Size variant
   */
  @Prop({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';

  // ─────────────────────────────────────────────────────────────────────────────
  // STATE
  // ─────────────────────────────────────────────────────────────────────────────

  @State() focusedIndex: number = -1;

  private triggerEl: HTMLElement;
  private contentEl: HTMLElement;
  private focusableItems: HTMLElement[] = [];

  // ─────────────────────────────────────────────────────────────────────────────
  // EVENTS
  // ─────────────────────────────────────────────────────────────────────────────

  /**
   * Emitted when the dropdown opens
   */
  @Event({ eventName: 'sgOpen' }) sgOpen: EventEmitter<void>;

  /**
   * Emitted when the dropdown closes
   */
  @Event({ eventName: 'sgClose' }) sgClose: EventEmitter<void>;

  /**
   * Emitted when the open state changes
   */
  @Event({ eventName: 'sgToggle' }) sgToggle: EventEmitter<boolean>;

  // ─────────────────────────────────────────────────────────────────────────────
  // PUBLIC METHODS
  // ─────────────────────────────────────────────────────────────────────────────

  /**
   * Opens the dropdown programmatically
   */
  @Method()
  async openDropdown(): Promise<void> {
    if (!this.disabled) {
      this.open = true;
      this.sgOpen.emit();
      this.sgToggle.emit(true);
      this.updateFocusableItems();
    }
  }

  /**
   * Closes the dropdown programmatically
   */
  @Method()
  async closeDropdown(): Promise<void> {
    this.open = false;
    this.focusedIndex = -1;
    this.sgClose.emit();
    this.sgToggle.emit(false);
  }

  /**
   * Toggles the dropdown open/closed
   */
  @Method()
  async toggle(): Promise<void> {
    if (this.open) {
      await this.closeDropdown();
    } else {
      await this.openDropdown();
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // LISTENERS
  // ─────────────────────────────────────────────────────────────────────────────

  @Listen('click', { target: 'document' })
  handleClickOutside(event: MouseEvent): void {
    if (this.open && !this.el.contains(event.target as Node)) {
      this.closeDropdown();
    }
  }

  @Listen('keydown', { target: 'document' })
  handleKeydown(event: KeyboardEvent): void {
    if (!this.open) return;

    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        this.closeDropdown();
        this.triggerEl?.focus();
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.moveFocus(1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.moveFocus(-1);
        break;
      case 'Tab':
        // Close on tab out
        setTimeout(() => {
          if (!this.el.contains(document.activeElement)) {
            this.closeDropdown();
          }
        }, 0);
        break;
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // PRIVATE METHODS
  // ─────────────────────────────────────────────────────────────────────────────

  private handleTriggerClick = (event: MouseEvent): void => {
    event.stopPropagation();
    if (!this.disabled) {
      this.toggle();
    }
  };

  private handleTriggerKeydown = (event: KeyboardEvent): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggle();
    }
    if (event.key === 'ArrowDown' && !this.open) {
      event.preventDefault();
      this.openDropdown();
    }
  };

  private handleContentClick = (): void => {
    if (this.closeOnSelect) {
      this.closeDropdown();
    }
  };

  private handleBackdropClick = (): void => {
    this.closeDropdown();
  };

  private updateFocusableItems(): void {
    setTimeout(() => {
      if (this.contentEl) {
        this.focusableItems = Array.from(this.contentEl.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'));
      }
    }, 0);
  }

  private moveFocus(direction: number): void {
    if (this.focusableItems.length === 0) return;

    this.focusedIndex = Math.max(0, Math.min(this.focusableItems.length - 1, this.focusedIndex + direction));

    this.focusableItems[this.focusedIndex]?.focus();
  }

  private getHostClasses(): Record<string, boolean> {
    return {
      'sg-dropdown--open': this.open,
      'sg-dropdown--disabled': this.disabled,
      [`sg-dropdown--align-${this.align}`]: true,
      [`sg-dropdown--position-${this.position}`]: true,
      [`sg-dropdown--size-${this.size}`]: true,
    };
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────────

  render() {
    return (
      <Host class={this.getHostClasses()}>
        {/* Backdrop for mobile */}
        {this.showBackdrop && this.open && <div class="backdrop" part="backdrop" onClick={this.handleBackdropClick}></div>}

        <div class="container" part="container">
          {/* Trigger */}
          <div
            class="trigger"
            part="trigger"
            ref={el => (this.triggerEl = el)}
            onClick={this.handleTriggerClick}
            onKeyDown={this.handleTriggerKeydown}
            aria-haspopup="true"
            aria-expanded={this.open ? 'true' : 'false'}
          >
            <slot name="trigger"></slot>
          </div>

          {/* Content */}
          {this.open && (
            <div
              class="content"
              part="content"
              ref={el => (this.contentEl = el)}
              role="menu"
              aria-orientation="vertical"
              style={{
                '--dropdown-min-width': this.minWidth,
                '--dropdown-max-height': this.maxHeight,
              }}
              onClick={this.handleContentClick}
            >
              {/* Header slot */}
              <div class="header">
                <slot name="header"></slot>
              </div>

              {/* Default slot for menu items */}
              <div class="items">
                <slot></slot>
              </div>

              {/* Footer slot */}
              <div class="footer">
                <slot name="footer"></slot>
              </div>
            </div>
          )}
        </div>
      </Host>
    );
  }
}
