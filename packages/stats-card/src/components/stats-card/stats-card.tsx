import { Component, Prop, h, Host, State } from '@stencil/core';

export type StatsCardColor = 'primary' | 'success' | 'warning' | 'error' | 'info' | 'purple' | 'cyan';

export interface StatItem {
  label: string;
  value: string | number;
  unit?: string;
  color?: StatsCardColor;
}

/**
 * @component sg-stats-card
 * @description A card component for displaying statistics and metrics with icon and optional breakdown.
 *
 * @slot - Default slot for additional content
 * @slot icon - Custom icon slot (overrides icon prop)
 *
 * @part card - The main card container
 * @part header - The header section with title
 * @part value - The main value display
 * @part description - The description text
 * @part icon - The icon container
 * @part stats - The additional stats section
 *
 * @example
 * ```html
 * <sg-stats-card
 *   title="Total Users"
 *   value="1,234"
 *   description="Active this month"
 *   icon="users"
 *   color="primary">
 * </sg-stats-card>
 * ```
 */
@Component({
  tag: 'sg-stats-card',
  styleUrl: 'stats-card.css',
  shadow: true,
})
export class SgStatsCard {
  // ═══════════════════════════════════════════════════════════════════════════
  // PROPS
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Card title/label
   */
  @Prop({ attribute: 'card-title' }) cardTitle: string = '';

  /**
   * Main value to display
   */
  @Prop() value: string | number = '';

  /**
   * Unit suffix for the value
   */
  @Prop() unit: string = '';

  /**
   * Description text below the value
   */
  @Prop() description: string = '';

  /**
   * Icon name (uses sg-icon)
   */
  @Prop() icon: string;

  /**
   * Color theme
   */
  @Prop({ reflect: true }) color: StatsCardColor = 'primary';

  /**
   * Additional stats breakdown (JSON string or array)
   */
  @Prop() stats: string | StatItem[];

  /**
   * Show loading skeleton
   */
  @Prop({ reflect: true }) loading: boolean = false;

  /**
   * Animation delay in ms (for staggered animations)
   */
  @Prop() animationDelay: number = 0;

  /**
   * Trend indicator: 'up', 'down', or percentage like '+12%'
   */
  @Prop() trend: string;

  /**
   * Whether trend is positive (green) or negative (red)
   */
  @Prop() trendPositive: boolean = true;

  // ═══════════════════════════════════════════════════════════════════════════
  // STATE
  // ═══════════════════════════════════════════════════════════════════════════

  @State() parsedStats: StatItem[] = [];

  // ═══════════════════════════════════════════════════════════════════════════
  // LIFECYCLE
  // ═══════════════════════════════════════════════════════════════════════════

  componentWillLoad() {
    this.parseStats();
  }

  componentWillUpdate() {
    this.parseStats();
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // METHODS
  // ═══════════════════════════════════════════════════════════════════════════

  private parseStats() {
    if (!this.stats) {
      this.parsedStats = [];
      return;
    }

    if (typeof this.stats === 'string') {
      try {
        this.parsedStats = JSON.parse(this.stats);
      } catch {
        this.parsedStats = [];
      }
    } else {
      this.parsedStats = this.stats;
    }
  }

  private getHostClasses(): Record<string, boolean> {
    return {
      [`sg-stats-card--${this.color}`]: true,
      'sg-stats-card--loading': this.loading,
      'sg-stats-card--has-icon': !!this.icon,
      'sg-stats-card--has-stats': this.parsedStats.length > 0,
    };
  }

  private getColorClasses(color?: StatsCardColor): string {
    const colors: Record<StatsCardColor, string> = {
      primary: 'text-primary',
      success: 'text-success',
      warning: 'text-warning',
      error: 'text-error',
      info: 'text-info',
      purple: 'text-purple',
      cyan: 'text-cyan',
    };
    return colors[color || this.color] || colors.primary;
  }

  private renderLoading() {
    return (
      <div class="stats-loading">
        <div class="skeleton skeleton-title"></div>
        <div class="skeleton skeleton-value"></div>
        <div class="skeleton skeleton-desc"></div>
      </div>
    );
  }

  private renderTrend() {
    if (!this.trend) return null;

    const isUp = this.trend.includes('+') || this.trend.toLowerCase() === 'up';
    const isDown = this.trend.includes('-') || this.trend.toLowerCase() === 'down';

    return (
      <span class={`trend ${this.trendPositive ? 'trend--positive' : 'trend--negative'}`}>
        {(isUp || isDown) && (
          <svg class="trend-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            {isUp ? <polyline points="18 15 12 9 6 15"></polyline> : <polyline points="6 9 12 15 18 9"></polyline>}
          </svg>
        )}
        <span>{this.trend}</span>
      </span>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════════

  render() {
    return (
      <Host class={this.getHostClasses()} style={{ '--animation-delay': `${this.animationDelay}ms` }}>
        <div class="stats-card" part="card">
          {/* Background Icon (Watermark) */}
          {this.icon && (
            <div class="stats-watermark" aria-hidden="true">
              <sg-icon name={this.icon} size="120" color="currentColor"></sg-icon>
            </div>
          )}

          {/* Top accent border */}
          <div class="stats-border"></div>

          {this.loading ? (
            this.renderLoading()
          ) : (
            <div class="stats-content">
              {/* Header */}
              <div class="stats-header" part="header">
                <span class="stats-title">{this.cardTitle}</span>
              </div>

              {/* Main Value */}
              <div class="stats-value-wrapper">
                <span class="stats-value" part="value">
                  {this.value}
                </span>
                {this.unit && <span class="stats-unit">{this.unit}</span>}
                {this.renderTrend()}
              </div>

              {/* Description */}
              {this.description && (
                <div class="stats-description" part="description">
                  <span class="status-dot"></span>
                  <span>{this.description}</span>
                </div>
              )}

              {/* Additional Stats */}
              {this.parsedStats.length > 0 && (
                <div class="stats-breakdown" part="stats">
                  {this.parsedStats.map(stat => (
                    <div key={`stat-${stat.label}`} class="stat-item">
                      <span class="stat-label">{stat.label}</span>
                      <span class={`stat-value ${this.getColorClasses(stat.color)}`}>
                        {stat.value}
                        {stat.unit && <span class="stat-unit">{stat.unit}</span>}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Custom content slot */}
              <slot></slot>
            </div>
          )}
        </div>
      </Host>
    );
  }
}
