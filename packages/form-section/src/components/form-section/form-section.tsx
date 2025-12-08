import { Component, Prop, h } from '@stencil/core';

/**
 * @component sg-form-section
 * @description Section container for forms with title, icon and step indicators.
 * Provides consistent visual structure for form sections.
 * 
 * @slot icon - Icon slot for the section header
 * @slot - Default slot for form content
 * 
 * @example
 * <sg-form-section section-title="Personal Information" step-number="1" total-steps="3" icon-bg-class="bg-blue-100">
 *   <sg-icon slot="icon" name="user"></sg-icon>
 *   <sg-input label="Name"></sg-input>
 *   <sg-input label="Email" type="email"></sg-input>
 * </sg-form-section>
 */
@Component({
  tag: 'sg-form-section',
  styleUrl: 'form-section.css',
  shadow: true,
})
export class FormSection {
  /**
   * Title of the section
   */
  @Prop() sectionTitle: string = '';

  /**
   * Current step number (optional)
   */
  @Prop() stepNumber?: number;

  /**
   * Total number of steps (optional)
   */
  @Prop() totalSteps?: number;

  /**
   * CSS class for icon background color
   */
  @Prop() iconBgClass: string = 'bg-blue-100';

  /**
   * Whether section is collapsible
   */
  @Prop() collapsible: boolean = false;

  /**
   * Whether section is initially collapsed (only if collapsible)
   */
  @Prop({ mutable: true }) collapsed: boolean = false;

  private toggleCollapse() {
    if (this.collapsible) {
      this.collapsed = !this.collapsed;
    }
  }

  render() {
    const showSteps = this.stepNumber !== undefined && this.totalSteps !== undefined;

    return (
      <div class="form-section">
        <div 
          class={{
            'section-header': true,
            'collapsible': this.collapsible
          }}
          onClick={() => this.toggleCollapse()}
        >
          <div class={`icon-wrapper ${this.iconBgClass}`}>
            <slot name="icon"></slot>
          </div>
          <h3 class="section-title">{this.sectionTitle}</h3>
          <div class="spacer"></div>
          {showSteps && (
            <span class="step-indicator">
              Paso {this.stepNumber} de {this.totalSteps}
            </span>
          )}
          {this.collapsible && (
            <span class={`collapse-icon ${this.collapsed ? 'collapsed' : ''}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </span>
          )}
        </div>

        <div class={`section-content ${this.collapsed ? 'hidden' : ''}`}>
          <slot></slot>
        </div>
      </div>
    );
  }
}
