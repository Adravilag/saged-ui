import { newSpecPage } from '@stencil/core/testing';
import { SgStatsCard } from './stats-card';

describe('sg-stats-card', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SgStatsCard],
      html: `<sg-stats-card card-title="Total Users" value="100"></sg-stats-card>`,
    });
    expect(page.root).toEqualHtml(`
      <sg-stats-card card-title="Total Users" class="sg-stats-card--primary" color="primary" style="--animation-delay: 0ms;" value="100">
        <mock:shadow-root>
          <div class="stats-card" part="card">
            <div class="stats-border"></div>
            <div class="stats-content">
              <div class="stats-header" part="header">
                <span class="stats-title">Total Users</span>
              </div>
              <div class="stats-value-wrapper">
                <span class="stats-value" part="value">100</span>
              </div>
              <slot></slot>
            </div>
          </div>
        </mock:shadow-root>
      </sg-stats-card>
    `);
  });

  it('renders with icon', async () => {
    const page = await newSpecPage({
      components: [SgStatsCard],
      html: `<sg-stats-card card-title="Users" value="100" icon="users"></sg-stats-card>`,
    });
    expect(page.root).toEqualHtml(`
      <sg-stats-card card-title="Users" class="sg-stats-card--has-icon sg-stats-card--primary" color="primary" icon="users" style="--animation-delay: 0ms;" value="100">
        <mock:shadow-root>
          <div class="stats-card" part="card">
            <div aria-hidden="true" class="stats-watermark">
              <sg-icon color="currentColor" name="users" size="120"></sg-icon>
            </div>
            <div class="stats-border"></div>
            <div class="stats-content">
              <div class="stats-header" part="header">
                <span class="stats-title">Users</span>
              </div>
              <div class="stats-value-wrapper">
                <span class="stats-value" part="value">100</span>
              </div>
              <slot></slot>
            </div>
          </div>
        </mock:shadow-root>
      </sg-stats-card>
    `);
  });

  it('renders with trend', async () => {
    const page = await newSpecPage({
      components: [SgStatsCard],
      html: `<sg-stats-card card-title="Sales" value="$100" trend="10" trend-positive="true"></sg-stats-card>`,
    });
    expect(page.root).toEqualHtml(`
      <sg-stats-card card-title="Sales" class="sg-stats-card--primary" color="primary" style="--animation-delay: 0ms;" trend="10" trend-positive="true" value="$100">
        <mock:shadow-root>
          <div class="stats-card" part="card">
            <div class="stats-border"></div>
            <div class="stats-content">
              <div class="stats-header" part="header">
                <span class="stats-title">Sales</span>
              </div>
              <div class="stats-value-wrapper">
                <span class="stats-value" part="value">$100</span>
                <span class="trend trend--positive">
                  <span>10</span>
                </span>
              </div>
              <slot></slot>
            </div>
          </div>
        </mock:shadow-root>
      </sg-stats-card>
    `);
  });
});
