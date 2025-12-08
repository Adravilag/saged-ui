import { Component, Prop, State, Event, EventEmitter, h, Host, Element, Method } from '@stencil/core';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';
export type TooltipTrigger = 'hover' | 'click' | 'focus' | 'manual';
export type TooltipVariant = 'default' | 'dark' | 'light' | 'primary' | 'success' | 'warning' | 'error';

/**
 * @component sg-tooltip
 * @description A tooltip component for displaying contextual information on hover, focus, or click.
 *
 * @slot - Default slot for the trigger element
 * @slot content - Custom tooltip content (overrides text prop)
 *
 * @part tooltip - The tooltip container
 * @part arrow - The tooltip arrow
 * @part content - The tooltip content wrapper
 *
 * @example
 * ### Basic Usage
 * ```html
 * <sg-tooltip text="This is a tooltip">
 *   <button>Hover me</button>
 * </sg-tooltip>
 * ```
 *
 * ### With Position
 * ```html
 * <sg-tooltip text="Top tooltip" position="top">...</sg-tooltip>
 * <sg-tooltip text="Right tooltip" position="right">...</sg-tooltip>
 * ```
 *
 * ### With Trigger
 * ```html
 * <sg-tooltip text="Click to show" trigger="click">...</sg-tooltip>
 * ```
 */
@Component({
  tag: 'sg-tooltip',
  styleUrl: 'tooltip.css',
  shadow: true,
})
export class SgTooltip {
  @Element() el: HTMLElement;

  // ═══════════════════════════════════════════════════════════════════════════
  // PROPS
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Tooltip text content
   */
  @Prop() text: string = '';

  /**
   * Position of the tooltip relative to trigger
   */
  @Prop({ reflect: true }) position: TooltipPosition = 'top';

  /**
   * How to trigger the tooltip
   */
  @Prop() trigger: TooltipTrigger = 'hover';

  /**
   * Visual variant
   */
  @Prop({ reflect: true }) variant: TooltipVariant = 'default';

  /**
   * Delay before showing (ms)
   */
  @Prop() showDelay: number = 200;

  /**
   * Delay before hiding (ms)
   */
  @Prop() hideDelay: number = 100;

  /**
   * Maximum width of tooltip
   */
  @Prop() maxWidth: string = '250px';

  /**
   * Show arrow pointer
   */
  @Prop() arrow: boolean = true;

  /**
   * Keep tooltip visible (for manual control)
   */
  @Prop({ mutable: true }) open: boolean = false;

  /**
   * Disable the tooltip
   */
  @Prop({ reflect: true }) disabled: boolean = false;

  /**
   * Interactive tooltip (can hover over tooltip content)
   */
  @Prop() interactive: boolean = false;

  // ═══════════════════════════════════════════════════════════════════════════
  // STATE
  // ═══════════════════════════════════════════════════════════════════════════

  @State() visible: boolean = false;
  @State() actualPosition: TooltipPosition;

  // ═══════════════════════════════════════════════════════════════════════════
  // EVENTS
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Emitted when tooltip is shown
   */
  @Event() sgShow: EventEmitter<void>;

  /**
   * Emitted when tooltip is hidden
   */
  @Event() sgHide: EventEmitter<void>;

  // ═══════════════════════════════════════════════════════════════════════════
  // PRIVATE
  // ═══════════════════════════════════════════════════════════════════════════

  private showTimeout: ReturnType<typeof setTimeout>;
  private hideTimeout: ReturnType<typeof setTimeout>;
  private triggerEl: HTMLElement;

  // ═══════════════════════════════════════════════════════════════════════════
  // LIFECYCLE
  // ═══════════════════════════════════════════════════════════════════════════

  componentWillLoad() {
    this.actualPosition = this.position;
    if (this.trigger === 'manual') {
      this.visible = this.open;
    }
  }

  componentDidLoad() {
    this.triggerEl = this.el.shadowRoot?.querySelector('.tooltip-trigger');
    this.setupEventListeners();
  }

  disconnectedCallback() {
    this.clearTimeouts();
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // PUBLIC METHODS
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Show the tooltip programmatically
   */
  @Method()
  async show(): Promise<void> {
    if (this.disabled) return;
    this.clearTimeouts();
    this.visible = true;
    this.open = true;
    this.sgShow.emit();
  }

  /**
   * Hide the tooltip programmatically
   */
  @Method()
  async hide(): Promise<void> {
    this.clearTimeouts();
    this.visible = false;
    this.open = false;
    this.sgHide.emit();
  }

  /**
   * Toggle tooltip visibility
   */
  @Method()
  async toggle(): Promise<void> {
    if (this.visible) {
      await this.hide();
    } else {
      await this.show();
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // PRIVATE METHODS
  // ═══════════════════════════════════════════════════════════════════════════

  private setupEventListeners() {
    if (this.trigger === 'manual') return;

    const trigger = this.triggerEl;
    if (!trigger) return;

    if (this.trigger === 'hover' || this.trigger === 'focus') {
      trigger.addEventListener('mouseenter', this.handleMouseEnter);
      trigger.addEventListener('mouseleave', this.handleMouseLeave);
      trigger.addEventListener('focus', this.handleFocus, true);
      trigger.addEventListener('blur', this.handleBlur, true);
    }

    if (this.trigger === 'click') {
      trigger.addEventListener('click', this.handleClick);
      document.addEventListener('click', this.handleOutsideClick);
    }
  }

  private clearTimeouts() {
    if (this.showTimeout) clearTimeout(this.showTimeout);
    if (this.hideTimeout) clearTimeout(this.hideTimeout);
  }

  private readonly handleMouseEnter = () => {
    if (this.disabled) return;
    this.clearTimeouts();
    this.showTimeout = setTimeout(() => {
      this.visible = true;
      this.sgShow.emit();
    }, this.showDelay);
  };

  private readonly handleMouseLeave = () => {
    this.clearTimeouts();
    this.hideTimeout = setTimeout(() => {
      if (!this.interactive || !this.isHoveringTooltip()) {
        this.visible = false;
        this.sgHide.emit();
      }
    }, this.hideDelay);
  };

  private readonly handleFocus = () => {
    if (this.disabled) return;
    this.clearTimeouts();
    this.visible = true;
    this.sgShow.emit();
  };

  private readonly handleBlur = () => {
    this.clearTimeouts();
    this.visible = false;
    this.sgHide.emit();
  };

  private readonly handleClick = (e: Event) => {
    e.stopPropagation();
    if (this.disabled) return;
    this.visible = !this.visible;
    if (this.visible) {
      this.sgShow.emit();
    } else {
      this.sgHide.emit();
    }
  };

  private readonly handleOutsideClick = (e: Event) => {
    if (!this.el.contains(e.target as Node) && this.visible) {
      this.visible = false;
      this.sgHide.emit();
    }
  };

  private isHoveringTooltip(): boolean {
    // Check if mouse is over the tooltip content
    return false; // Simplified - would need more complex logic
  }

  private readonly handleTooltipMouseEnter = () => {
    if (this.interactive) {
      this.clearTimeouts();
    }
  };

  private readonly handleTooltipMouseLeave = () => {
    if (this.interactive) {
      this.handleMouseLeave();
    }
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════════

  private getHostClasses(): Record<string, boolean> {
    return {
      [`sg-tooltip--${this.actualPosition}`]: true,
      [`sg-tooltip--${this.variant}`]: true,
      'sg-tooltip--visible': this.visible,
      'sg-tooltip--disabled': this.disabled,
      'sg-tooltip--interactive': this.interactive,
    };
  }

  render() {
    return (
      <Host class={this.getHostClasses()}>
        <div class="tooltip-trigger">
          <slot></slot>
        </div>

        {this.visible && (this.text || true) && (
          <div
            class="tooltip"
            part="tooltip"
            role="tooltip"
            style={{ '--tooltip-max-width': this.maxWidth }}
            onMouseEnter={this.handleTooltipMouseEnter}
            onMouseLeave={this.handleTooltipMouseLeave}
          >
            {this.arrow && <div class="tooltip-arrow" part="arrow"></div>}
            <div class="tooltip-content" part="content">
              <slot name="content">{this.text}</slot>
            </div>
          </div>
        )}
      </Host>
    );
  }
}
