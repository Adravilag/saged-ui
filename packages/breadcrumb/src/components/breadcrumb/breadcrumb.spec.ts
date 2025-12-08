import { newSpecPage } from '@stencil/core/testing';
import { SgBreadcrumb } from './breadcrumb';

describe('sg-breadcrumb', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SgBreadcrumb],
      html: `<sg-breadcrumb></sg-breadcrumb>`,
    });
    expect(page.root).toEqualHtml(`
      <sg-breadcrumb class="sg-breadcrumb--md" separator="chevron" size="md">
        <mock:shadow-root>
          <nav aria-label="Breadcrumb" part="nav">
            <ol class="breadcrumb-list" part="list">
              <slot></slot>
            </ol>
          </nav>
          <span aria-hidden="true" class="separator-template">›</span>
        </mock:shadow-root>
      </sg-breadcrumb>
    `);
  });

  it('renders with custom separator', async () => {
    const page = await newSpecPage({
      components: [SgBreadcrumb],
      html: `<sg-breadcrumb separator="slash"></sg-breadcrumb>`,
    });
    expect(page.root).toEqualHtml(`
      <sg-breadcrumb class="sg-breadcrumb--md" separator="slash" size="md">
        <mock:shadow-root>
          <nav aria-label="Breadcrumb" part="nav">
            <ol class="breadcrumb-list" part="list">
              <slot></slot>
            </ol>
          </nav>
          <span aria-hidden="true" class="separator-template">/</span>
        </mock:shadow-root>
      </sg-breadcrumb>
    `);
  });

  it('renders with size', async () => {
    const page = await newSpecPage({
      components: [SgBreadcrumb],
      html: `<sg-breadcrumb size="lg"></sg-breadcrumb>`,
    });
    expect(page.root).toEqualHtml(`
      <sg-breadcrumb class="sg-breadcrumb--lg" separator="chevron" size="lg">
        <mock:shadow-root>
          <nav aria-label="Breadcrumb" part="nav">
            <ol class="breadcrumb-list" part="list">
              <slot></slot>
            </ol>
          </nav>
          <span aria-hidden="true" class="separator-template">›</span>
        </mock:shadow-root>
      </sg-breadcrumb>
    `);
  });
});
