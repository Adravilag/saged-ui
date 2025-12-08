import { newSpecPage } from '@stencil/core/testing';
import { SgBreadcrumbItem } from './breadcrumb-item';

describe('sg-breadcrumb-item', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SgBreadcrumbItem],
      html: `<sg-breadcrumb-item>Item</sg-breadcrumb-item>`,
    });
    expect(page.root).toEqualHtml(`
      <sg-breadcrumb-item>
        <mock:shadow-root>
          <li class="breadcrumb-item" part="item">
            <span class="item-text" part="text">
              <slot name="icon"></slot>
              <span class="item-label">
                <slot></slot>
              </span>
            </span>
            <span aria-hidden="true" class="item-separator" part="separator">›</span>
          </li>
        </mock:shadow-root>
        Item
      </sg-breadcrumb-item>
    `);
  });

  it('renders with href', async () => {
    const page = await newSpecPage({
      components: [SgBreadcrumbItem],
      html: `<sg-breadcrumb-item href="/home">Home</sg-breadcrumb-item>`,
    });
    expect(page.root).toEqualHtml(`
      <sg-breadcrumb-item href="/home">
        <mock:shadow-root>
          <li class="breadcrumb-item" part="item">
            <a class="item-link" href="/home" part="link" target="_self">
              <slot name="icon"></slot>
              <span class="item-label">
                <slot></slot>
              </span>
            </a>
            <span aria-hidden="true" class="item-separator" part="separator">›</span>
          </li>
        </mock:shadow-root>
        Home
      </sg-breadcrumb-item>
    `);
  });

  it('renders active state', async () => {
    const page = await newSpecPage({
      components: [SgBreadcrumbItem],
      html: `<sg-breadcrumb-item active>Active</sg-breadcrumb-item>`,
    });
    expect(page.root).toEqualHtml(`
      <sg-breadcrumb-item active="" class="sg-breadcrumb-item--active">
        <mock:shadow-root>
          <li class="breadcrumb-item" part="item">
            <span aria-current="page" class="item-text" part="text">
              <slot name="icon"></slot>
              <span class="item-label">
                <slot></slot>
              </span>
            </span>
            <span aria-hidden="true" class="item-separator" part="separator">›</span>
          </li>
        </mock:shadow-root>
        Active
      </sg-breadcrumb-item>
    `);
  });
});
