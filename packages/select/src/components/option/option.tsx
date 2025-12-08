import { Component, Prop, h, Host } from '@stencil/core';

/**
 * @component sg-option
 * @description Option element for sg-select component
 *
 * @example
 * <sg-select label="Choose">
 *   <sg-option value="1">Option 1</sg-option>
 *   <sg-option value="2" disabled>Option 2 (disabled)</sg-option>
 *   <sg-option value="3" icon="mdi:star">Option 3 with icon</sg-option>
 * </sg-select>
 */
@Component({
  tag: 'sg-option',
  shadow: false,
})
export class SgOption {
  /** Option value */
  @Prop() value!: string;

  /** Whether option is disabled */
  @Prop() disabled: boolean = false;

  /** Icon name */
  @Prop() icon?: string;

  /** Description text */
  @Prop() description?: string;

  render() {
    // This component is mainly used as a data source for sg-select
    // The actual rendering is handled by sg-select
    return (
      <Host style={{ display: 'none' }}>
        <slot />
      </Host>
    );
  }
}
