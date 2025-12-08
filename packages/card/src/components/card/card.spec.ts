import { newSpecPage } from '@stencil/core/testing';
import { SgCard } from './card';

describe('sg-card', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SgCard],
      html: `<sg-card></sg-card>`,
    });
    expect(page.root).toEqualHtml(`
      <sg-card class="sg-card--default sg-card--md" role="article" size="md" variant="default">
        <mock:shadow-root>
          <div class="card" part="card">
            <div class="card-media" part="media">
              <slot name="media"></slot>
            </div>
            <slot name="icon"></slot>
            <div class="card-body" part="body">
              <slot></slot>
            </div>
          </div>
        </mock:shadow-root>
      </sg-card>
    `);
  });

  it('renders with title and subtitle', async () => {
    const page = await newSpecPage({
      components: [SgCard],
      html: `<sg-card card-title="Title" subtitle="Subtitle"></sg-card>`,
    });
    expect(page.root).toEqualHtml(`
      <sg-card card-title="Title" class="sg-card--default sg-card--md" role="article" size="md" subtitle="Subtitle" variant="default">
        <mock:shadow-root>
          <div class="card" part="card">
            <div class="card-media" part="media">
              <slot name="media"></slot>
            </div>
            <slot name="icon"></slot>
            <div class="card-header" part="header">
              <slot name="header">
                <h3 class="card-title" part="title">Title</h3>
                <p class="card-subtitle" part="subtitle">Subtitle</p>
              </slot>
            </div>
            <div class="card-body" part="body">
              <slot></slot>
            </div>
          </div>
        </mock:shadow-root>
      </sg-card>
    `);
  });

  it('renders with variant', async () => {
    const page = await newSpecPage({
      components: [SgCard],
      html: `<sg-card variant="primary"></sg-card>`,
    });
    expect(page.root).toEqualHtml(`
      <sg-card class="sg-card--md sg-card--primary" role="article" size="md" variant="primary">
        <mock:shadow-root>
          <div class="card" part="card">
            <div class="card-media" part="media">
              <slot name="media"></slot>
            </div>
            <slot name="icon"></slot>
            <div class="card-body" part="body">
              <slot></slot>
            </div>
          </div>
        </mock:shadow-root>
      </sg-card>
    `);
  });
});
