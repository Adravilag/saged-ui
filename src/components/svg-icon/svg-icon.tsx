import { Component, Prop, h, Host, Watch, State } from '@stencil/core';
import { icons, IconName, IconDefinition } from './icons';

/**
 * @component sg-icon
 * @description SVG Icon component for SagedUI - A flexible, accessible icon system
 *
 * @example
 * <!-- Basic usage with built-in icons -->
 * <sg-icon name="home"></sg-icon>
 *
 * <!-- With custom size -->
 * <sg-icon name="settings" size="32"></sg-icon>
 *
 * <!-- With custom color -->
 * <sg-icon name="heart" color="#ff0000"></sg-icon>
 *
 * <!-- Custom icon via src (fetches SVG file) -->
 * <sg-icon src="/assets/custom-icon.svg"></sg-icon>
 */
@Component({
  tag: 'sg-icon',
  styleUrl: 'svg-icon.css',
  shadow: true,
})
export class SgIcon {
  /**
   * The name of the icon from the built-in library
   */
  @Prop() name?: IconName;

  /**
   * URL to a custom SVG icon (alternative to name)
   */
  @Prop() src?: string;

  /**
   * Size of the icon in pixels
   * @default 24
   */
  @Prop() size: number | string = 24;

  /**
   * Width of the icon (overrides size)
   */
  @Prop() width?: number | string;

  /**
   * Height of the icon (overrides size)
   */
  @Prop() height?: number | string;

  /**
   * Color of the icon (CSS color value)
   * @default 'currentColor'
   */
  @Prop() color: string = 'currentColor';

  /**
   * Stroke width for outline icons
   */
  @Prop() strokeWidth?: number;

  /**
   * Whether the icon should spin (useful for loading icons)
   * @default false
   */
  @Prop() spin: boolean = false;

  /**
   * Rotation angle in degrees
   */
  @Prop() rotate?: number;

  /**
   * Flip the icon horizontally
   * @default false
   */
  @Prop() flipH: boolean = false;

  /**
   * Flip the icon vertically
   * @default false
   */
  @Prop() flipV: boolean = false;

  /**
   * Accessible label for screen readers
   */
  @Prop() ariaLabel?: string;

  /**
   * Whether the icon is decorative (hidden from screen readers)
   * @default false
   */
  @Prop() decorative: boolean = false;

  @State() customSvg: string | null = null;
  @State() loadError: boolean = false;

  @Watch('src')
  async loadCustomIcon(newSrc: string) {
    if (newSrc) {
      try {
        const response = await fetch(newSrc);
        if (response.ok) {
          const svgText = await response.text();
          this.customSvg = svgText;
          this.loadError = false;
        } else {
          this.loadError = true;
          console.error(`Failed to load icon from ${newSrc}`);
        }
      } catch (error) {
        this.loadError = true;
        console.error(`Error loading icon from ${newSrc}:`, error);
      }
    }
  }

  componentWillLoad() {
    if (this.src) {
      this.loadCustomIcon(this.src);
    }
  }

  private getIcon(): IconDefinition | null {
    if (this.name && icons[this.name]) {
      return icons[this.name];
    }
    return null;
  }

  private normalizeSize(value: number | string): string {
    if (typeof value === 'number') {
      return `${value}px`;
    }
    // If it's a numeric string without units, add 'px'
    if (/^\d+(\.\d+)?$/.test(value)) {
      return `${value}px`;
    }
    return value;
  }

  private getSize(dimension: 'width' | 'height'): string {
    const value = dimension === 'width' ? (this.width ?? this.size) : (this.height ?? this.size);

    return this.normalizeSize(value);
  }

  private getTransform(): string {
    const transforms: string[] = [];

    if (this.rotate) {
      transforms.push(`rotate(${this.rotate}deg)`);
    }

    if (this.flipH || this.flipV) {
      const scaleX = this.flipH ? -1 : 1;
      const scaleY = this.flipV ? -1 : 1;
      transforms.push(`scale(${scaleX}, ${scaleY})`);
    }

    return transforms.length > 0 ? transforms.join(' ') : '';
  }

  private renderSvgContent(icon: IconDefinition) {
    return icon.paths.map(path => <path d={path} fill={this.color} fill-rule={icon.fillRule || 'nonzero'} />);
  }

  private renderCustomSvg() {
    if (!this.customSvg) return null;

    // Parse the SVG and extract the inner content
    const parser = new DOMParser();
    const doc = parser.parseFromString(this.customSvg, 'image/svg+xml');
    const svg = doc.querySelector('svg');

    if (!svg) return null;

    // Clone the SVG content and apply our styles
    const viewBox = svg.getAttribute('viewBox') || '0 0 24 24';
    const svgContent = svg.innerHTML;

    return (
      <svg
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        style={{ fill: this.color }}
        // eslint-disable-next-line react/no-danger
        {...({ innerHTML: svgContent } as any)}
      />
    );
  }

  render() {
    const icon = this.getIcon();
    const width = this.getSize('width');
    const height = this.getSize('height');
    const transform = this.getTransform();

    const hostStyle: { [key: string]: string } = {
      'width': width,
      'height': height,
      '--icon-size': this.normalizeSize(this.size),
      '--icon-width': width,
      '--icon-height': height,
      '--icon-color': this.color,
    };

    if (transform) {
      hostStyle['--icon-transform'] = transform;
    }

    const hostClasses = {
      'icon': true,
      'icon--spin': this.spin,
      'icon--custom': !!this.src,
    };

    // Accessibility attributes
    const ariaHidden = this.decorative ? 'true' : undefined;
    const role = this.decorative ? 'presentation' : 'img';
    const label = this.ariaLabel || (this.name ? `${this.name} icon` : undefined);

    // 1. Render custom SVG from src
    if (this.src && this.customSvg) {
      return (
        <Host class={hostClasses} style={hostStyle} aria-hidden={ariaHidden} role={role} aria-label={!this.decorative ? label : undefined}>
          {this.renderCustomSvg()}
        </Host>
      );
    }

    // 2. Render from built-in icon registry
    if (!icon) {
      // Fallback: render a placeholder or nothing
      if (this.loadError) {
        return (
          <Host class={{ ...hostClasses, 'icon--error': true }} style={hostStyle}>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill={this.color} />
            </svg>
          </Host>
        );
      }
      return null;
    }

    return (
      <Host class={hostClasses} style={hostStyle} aria-hidden={ariaHidden} role={role} aria-label={!this.decorative ? label : undefined}>
        <svg viewBox={icon.viewBox || '0 0 24 24'} xmlns="http://www.w3.org/2000/svg">
          {this.renderSvgContent(icon)}
        </svg>
      </Host>
    );
  }
}
