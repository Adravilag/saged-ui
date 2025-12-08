import { newSpecPage } from '@stencil/core/testing';
import { SgTooltip } from './tooltip';

describe('sg-tooltip', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SgTooltip],
      html: `<sg-tooltip text="Tooltip text"><button>Hover me</button></sg-tooltip>`,
    });
    expect(page.root).toEqualHtml(`
      <sg-tooltip class="sg-tooltip--default sg-tooltip--top" position="top" text="Tooltip text" variant="default">
        <mock:shadow-root>
          <div class="tooltip-trigger">
            <slot></slot>
          </div>
        </mock:shadow-root>
        <button>Hover me</button>
      </sg-tooltip>
    `);
  });

  it('renders with custom position', async () => {
    const page = await newSpecPage({
      components: [SgTooltip],
      html: `<sg-tooltip text="Tooltip text" position="bottom"><button>Hover me</button></sg-tooltip>`,
    });
    expect(page.root).toEqualHtml(`
      <sg-tooltip class="sg-tooltip--bottom sg-tooltip--default" position="bottom" text="Tooltip text" variant="default">
        <mock:shadow-root>
          <div class="tooltip-trigger">
            <slot></slot>
          </div>
        </mock:shadow-root>
        <button>Hover me</button>
      </sg-tooltip>
    `);
  });

  it('renders with variant', async () => {
    const page = await newSpecPage({
      components: [SgTooltip],
      html: `<sg-tooltip text="Tooltip text" variant="primary"><button>Hover me</button></sg-tooltip>`,
    });
    expect(page.root).toEqualHtml(`
      <sg-tooltip class="sg-tooltip--primary sg-tooltip--top" position="top" text="Tooltip text" variant="primary">
        <mock:shadow-root>
          <div class="tooltip-trigger">
            <slot></slot>
          </div>
        </mock:shadow-root>
        <button>Hover me</button>
      </sg-tooltip>
    `);
  });
});
