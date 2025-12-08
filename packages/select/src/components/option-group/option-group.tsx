import { Component, Prop, h, Host } from '@stencil/core';

/**
 * @component sg-option-group
 * @description Group of options for sg-select component
 *
 * @example
 * <sg-select label="Choose">
 *   <sg-option-group label="Group A">
 *     <sg-option value="1">Option 1</sg-option>
 *     <sg-option value="2">Option 2</sg-option>
 *   </sg-option-group>
 *   <sg-option-group label="Group B">
 *     <sg-option value="3">Option 3</sg-option>
 *   </sg-option-group>
 * </sg-select>
 */
@Component({
  tag: 'sg-option-group',
  shadow: false,
})
export class SgOptionGroup {
  /** Group label */
  @Prop() label!: string;

  /** Whether all options in group are disabled */
  @Prop() disabled: boolean = false;

  render() {
    return (
      <Host style={{ display: 'none' }}>
        <slot />
      </Host>
    );
  }
}
