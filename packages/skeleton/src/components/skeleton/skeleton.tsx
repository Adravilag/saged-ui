import { Component, Prop, h, Host } from '@stencil/core';

/**
 * @component sg-skeleton
 * @description Skeleton loading placeholder component for SageBox
 *
 * @example
 * <sg-skeleton variant="text" width="200px" height="1rem"></sg-skeleton>
 * <sg-skeleton variant="rect" width="100%" height="200px"></sg-skeleton>
 * <sg-skeleton variant="circle" width="48px" height="48px"></sg-skeleton>
 */
@Component({
  tag: 'sg-skeleton',
  styleUrl: 'skeleton.css',
  shadow: true,
})
export class SgSkeleton {
  /**
   * The shape variant of the skeleton
   * - text: Slightly rounded, good for text placeholders
   * - rect: More rounded, good for cards/images
   * - circle: Fully rounded, good for avatars
   */
  @Prop() variant: 'text' | 'rect' | 'circle' = 'text';

  /**
   * The width of the skeleton
   * @default '100%'
   */
  @Prop() width: string = '100%';

  /**
   * The height of the skeleton
   * @default '1rem'
   */
  @Prop() height: string = '1rem';

  /**
   * Animation type
   * - shimmer: Gradient animation (default)
   * - pulse: Opacity pulse animation
   * - none: No animation
   */
  @Prop() animation: 'shimmer' | 'pulse' | 'none' = 'shimmer';

  render() {
    const classes = {
      skeleton: true,
      [`skeleton--${this.variant}`]: true,
      [`skeleton--${this.animation}`]: this.animation !== 'none',
    };

    return (
      <Host>
        <div
          class={classes}
          style={{
            width: this.width,
            height: this.height,
          }}
          aria-busy="true"
          aria-live="polite"
        ></div>
      </Host>
    );
  }
}
