import { Component, Prop, h, Host, Watch, State, Method, Element } from '@stencil/core';
import { builtinIcons, IconDefinition } from './icons/builtin';

/** Global key for user-registered icons */
const ICONS_KEY = '__sgUserIcons';
/** Global key for icons configuration */
const CONFIG_KEY = '__sgIconConfig';
/** Global key for loaded JSON paths */
const LOADED_KEY = '__sgIconsLoaded';

/** Type for icon storage in globalThis */
interface SgIconGlobals {
  [ICONS_KEY]?: Record<string, IconDefinition | string>;
  [CONFIG_KEY]?: { jsonSrc?: string };
  [LOADED_KEY]?: Record<string, boolean>;
}

/** Typed globalThis accessor */
function getGlobal(): SgIconGlobals {
  return typeof globalThis !== 'undefined' ? (globalThis as unknown as SgIconGlobals) : {};
}

/**
 * Get user-registered icons from global storage
 */
function getUserIcons(): Record<string, IconDefinition | string> {
  const g = getGlobal();
  return g[ICONS_KEY] ?? {};
}

/**
 * Get icon configuration
 */
function getIconConfig(): { jsonSrc?: string } {
  const g = getGlobal();
  return g[CONFIG_KEY] ?? {};
}

/**
 * Check if a JSON path has been loaded
 */
function isJsonLoaded(path: string): boolean {
  const g = getGlobal();
  return !!g[LOADED_KEY]?.[path];
}

/**
 * Mark a JSON path as loaded
 */
function markJsonLoaded(path: string): void {
  const g = getGlobal();
  if (!g[LOADED_KEY]) {
    g[LOADED_KEY] = {};
  }
  g[LOADED_KEY]![path] = true;
}

/**
 * Register icons globally
 */
function registerIconsGlobal(icons: Record<string, string>): void {
  const g = getGlobal();
  if (!g[ICONS_KEY]) {
    g[ICONS_KEY] = {};
  }
  Object.assign(g[ICONS_KEY]!, icons);
}

/**
 * @component sg-icon
 * @description SVG Icon component for SagedUI - A flexible, accessible icon system
 *
 * @example
 * <!-- Basic usage with built-in icons -->
 * <sg-icon name="home"></sg-icon>
 * <sg-icon name="icon-home"></sg-icon>
 *
 * <!-- With custom size -->
 * <sg-icon name="settings" size="32"></sg-icon>
 *
 * <!-- With custom color (fill is an alias for color) -->
 * <sg-icon name="heart" color="#ff0000"></sg-icon>
 * <sg-icon name="heart" fill="#ff0000"></sg-icon>
 *
 * <!-- Custom icon via src (fetches SVG file) -->
 * <sg-icon src="/assets/custom-icon.svg"></sg-icon>
 *
 * <!-- Load icons from JSON file -->
 * <sg-icon name="my-icon" json-src="/assets/icons.json"></sg-icon>
 */
@Component({
  tag: 'sg-icon',
  styleUrl: 'svg-icon.css',
  shadow: true,
})
export class SgIcon {
  @Element() el!: HTMLElement;

  /**
   * The name of the icon from the built-in library.
   * Supports both 'name' and 'icon-name' formats for compatibility.
   */
  @Prop() name?: string;

  /**
   * URL to a custom SVG icon (alternative to name)
   */
  @Prop() src?: string;

  /**
   * URL to a JSON file containing icon definitions.
   * The JSON should be an object mapping icon names to SVG strings.
   * Icons are loaded once and cached globally.
   *
   * @example
   * <sg-icon name="my-icon" json-src="/assets/custom-icons.json"></sg-icon>
   */
  @Prop() jsonSrc?: string;

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
   * Alias for color (for compatibility with legacy svg-icon components)
   * @default undefined
   */
  @Prop() fill?: string;

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
   * Accessible label for screen readers.
   * If not provided, defaults to "{name} icon" for non-decorative icons.
   */
  @Prop({ mutable: true }) ariaLabel?: string;

  /**
   * Whether the icon is decorative (hidden from screen readers)
   * @default false
   */
  @Prop() decorative: boolean = false;

  @State() customSvg: string | null = null;
  @State() loadError: boolean = false;
  @State() jsonLoading: boolean = false;

  // ═══════════════════════════════════════════════════════════════════════════
  // STATIC METHODS - Global Configuration API
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Configure global settings for sg-icon
   * @param config - Configuration object
   * @example
   * // Set a default JSON source for all icons
   * SgIcon.configure({ jsonSrc: '/assets/custom-icons.json' });
   */
  static configure(config: { jsonSrc?: string }): void {
    const g = getGlobal();
    g[CONFIG_KEY] = { ...getIconConfig(), ...config };
  }

  /**
   * Pre-load icons from a JSON file
   * @param jsonPath - Path to the JSON file
   */
  static async loadIcons(jsonPath: string): Promise<void> {
    if (isJsonLoaded(jsonPath)) return;

    try {
      const response = await fetch(jsonPath);
      if (response.ok) {
        const iconsData = await response.json();
        registerIconsGlobal(iconsData);
        markJsonLoaded(jsonPath);
      }
    } catch (error) {
      console.error('[SagedUI] Failed to load icons from:', jsonPath, error);
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // INSTANCE METHODS - Icon Registration API for users
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Register multiple icons at once
   * @param icons - Object with icon names as keys and SVG strings or IconDefinition as values
   * @example
   * // Using SVG strings (recommended for users)
   * SgIcon.registerIcons({
   *   'my-icon': '<svg viewBox="0 0 24 24">...</svg>',
   *   'another-icon': '<svg>...</svg>'
   * });
   *
   * // Using IconDefinition objects
   * SgIcon.registerIcons({
   *   'my-icon': { paths: ['M12 2...'], viewBox: '0 0 24 24' }
   * });
   */
  @Method()
  async registerIcons(icons: Record<string, IconDefinition | string>): Promise<void> {
    const g = getGlobal();
    if (!g[ICONS_KEY]) {
      g[ICONS_KEY] = {};
    }
    Object.assign(g[ICONS_KEY]!, icons);
  }

  /**
   * Register a single icon
   * @param name - Icon name to register
   * @param icon - SVG string or IconDefinition
   * @example
   * SgIcon.registerIcon('my-custom-icon', '<svg viewBox="0 0 24 24">...</svg>');
   */
  @Method()
  async registerIcon(name: string, icon: IconDefinition | string): Promise<void> {
    const g = getGlobal();
    if (!g[ICONS_KEY]) {
      g[ICONS_KEY] = {};
    }
    g[ICONS_KEY]![name] = icon;
  }

  /**
   * Get list of all registered user icons
   */
  @Method()
  async getRegisteredIcons(): Promise<string[]> {
    return Object.keys(getUserIcons());
  }

  /**
   * Check if an icon exists (built-in or user-registered)
   */
  @Method()
  async hasIcon(name: string): Promise<boolean> {
    const normalizedName = this.normalizeIconName(name);
    const userIcons = getUserIcons();
    return !!(userIcons[normalizedName] || userIcons[name] || builtinIcons[normalizedName] || builtinIcons[name]);
  }

  // ═══════════════════════════════════════════════════════════════════════════

  @Watch('jsonSrc')
  async onJsonSrcChange(newJsonSrc: string) {
    if (newJsonSrc && !isJsonLoaded(newJsonSrc)) {
      this.jsonLoading = true;
      await this.loadIconsFromJson(newJsonSrc);
    }
  }

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

    // Load icons from JSON if specified (instance prop or global config)
    const jsonPath = this.jsonSrc || getIconConfig().jsonSrc;
    if (jsonPath && !isJsonLoaded(jsonPath)) {
      this.jsonLoading = true;
      this.loadIconsFromJson(jsonPath);
    }
  }

  componentWillRender() {
    // Set default ariaLabel before render to avoid "state changed during rendering" warning
    if (!this.decorative && !this.ariaLabel && this.name) {
      this.ariaLabel = `${this.name} icon`;
    }
  }

  /**
   * Load icons from JSON file
   */
  private async loadIconsFromJson(jsonPath: string): Promise<void> {
    try {
      const response = await fetch(jsonPath);
      if (response.ok) {
        const iconsData = await response.json();
        registerIconsGlobal(iconsData);
        markJsonLoaded(jsonPath);
      }
    } catch (error) {
      console.error('[SagedUI] Failed to load icons from:', jsonPath, error);
    } finally {
      this.jsonLoading = false;
    }
  }

  /**
   * Get the effective color (fill takes precedence over color for compatibility)
   */
  private getEffectiveColor(): string {
    return this.fill ?? this.color;
  }

  /**
   * Normalize icon name:
   * - Removes 'icon-' prefix if present
   * - Converts ':' to '-' (e.g., 'tabler:home' -> 'tabler-home')
   */
  private normalizeIconName(name: string): string {
    let normalized = name.startsWith('icon-') ? name.slice(5) : name;
    // Convert prefix:name format to prefix-name
    normalized = normalized.replace(':', '-');
    return normalized;
  }

  /**
   * Get icon from user-registered icons or built-in icons
   * User icons take priority over built-in icons
   */
  private getIcon(): IconDefinition | string | null {
    if (this.name) {
      const normalizedName = this.normalizeIconName(this.name);
      const userIcons = getUserIcons();

      // 1. Check user-registered icons first (priority)
      if (userIcons[normalizedName]) {
        return userIcons[normalizedName];
      }
      if (userIcons[this.name]) {
        return userIcons[this.name];
      }

      // 2. Check built-in icons (minimal set)
      if (builtinIcons[normalizedName]) {
        return builtinIcons[normalizedName];
      }
      if (builtinIcons[this.name]) {
        return builtinIcons[this.name];
      }
    }
    return null;
  }

  /**
   * Check if the icon is an SVG string (user-provided) vs IconDefinition
   */
  private isSvgString(icon: IconDefinition | string): icon is string {
    return typeof icon === 'string';
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
    const effectiveColor = this.getEffectiveColor();
    return icon.paths.map(path => <path d={path} fill={effectiveColor} fill-rule={icon.fillRule || 'nonzero'} />);
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
        style={{ fill: this.getEffectiveColor() }}
        // Using innerHTML for custom SVG content
        {...({ innerHTML: svgContent } as Record<string, string>)}
      />
    );
  }

  render() {
    const icon = this.getIcon();
    const width = this.getSize('width');
    const height = this.getSize('height');
    const transform = this.getTransform();

    const effectiveColor = this.getEffectiveColor();

    const hostStyle: { [key: string]: string } = {
      width: width,
      height: height,
      '--icon-size': this.normalizeSize(this.size),
      '--icon-width': width,
      '--icon-height': height,
      '--icon-color': effectiveColor,
    };

    if (transform) {
      hostStyle['--icon-transform'] = transform;
    }

    const hostClasses = {
      icon: true,
      'icon--spin': this.spin,
      'icon--custom': !!this.src,
    };

    // Accessibility attributes
    const ariaHidden = this.decorative ? 'true' : undefined;
    const role = this.decorative ? 'presentation' : 'img';

    // 1. Render custom SVG from src
    if (this.src && this.customSvg) {
      return (
        <Host class={hostClasses} style={hostStyle} aria-hidden={ariaHidden} role={role} aria-label={!this.decorative ? this.ariaLabel : undefined}>
          {this.renderCustomSvg()}
        </Host>
      );
    }

    // 2. No icon found - render error or nothing
    if (!icon) {
      if (this.loadError) {
        return (
          <Host class={{ ...hostClasses, 'icon--error': true }} style={hostStyle}>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill={effectiveColor} />
            </svg>
          </Host>
        );
      }
      return null;
    }

    // 3. Render user-registered SVG string
    if (this.isSvgString(icon)) {
      return (
        <Host
          class={{ ...hostClasses, 'icon--user': true }}
          style={hostStyle}
          aria-hidden={ariaHidden}
          role={role}
          aria-label={!this.decorative ? this.ariaLabel : undefined}
        >
          <div
            class="svg-container"
            ref={el => {
              if (el) el.innerHTML = icon;
            }}
          ></div>
        </Host>
      );
    }

    // 4. Render IconDefinition (built-in or user-registered)
    return (
      <Host class={hostClasses} style={hostStyle} aria-hidden={ariaHidden} role={role} aria-label={!this.decorative ? this.ariaLabel : undefined}>
        <svg viewBox={icon.viewBox || '0 0 24 24'} xmlns="http://www.w3.org/2000/svg">
          {this.renderSvgContent(icon)}
        </svg>
      </Host>
    );
  }
}
