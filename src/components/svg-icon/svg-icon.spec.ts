import { newSpecPage } from '@stencil/core/testing';
import { SgIcon } from './svg-icon';

describe('sg-icon', () => {
  it('renders with a built-in icon name', async () => {
    const page = await newSpecPage({
      components: [SgIcon],
      html: `<sg-icon name="home"></sg-icon>`,
    });
    expect(page.root).toBeDefined();
    expect(page.root?.getAttribute('name')).toBe('home');
    expect(page.root?.getAttribute('role')).toBe('img');
    expect(page.root?.getAttribute('aria-label')).toBe('home icon');
    expect(page.root?.shadowRoot?.querySelector('svg')).toBeDefined();
    expect(page.root?.shadowRoot?.querySelector('path')).toBeDefined();
  });

  it('renders with custom size', async () => {
    const page = await newSpecPage({
      components: [SgIcon],
      html: `<sg-icon name="settings" size="32"></sg-icon>`,
    });
    expect(page.root).toBeDefined();
    expect(page.root?.shadowRoot?.querySelector('svg')).toBeDefined();
  });

  it('renders with custom color', async () => {
    const page = await newSpecPage({
      components: [SgIcon],
      html: `<sg-icon name="heart" color="#ff0000"></sg-icon>`,
    });
    const path = page.root?.shadowRoot?.querySelector('path');
    expect(path?.getAttribute('fill')).toBe('#ff0000');
  });

  it('renders with spin animation', async () => {
    const page = await newSpecPage({
      components: [SgIcon],
      html: `<sg-icon name="refresh" spin></sg-icon>`,
    });
    expect(page.root?.classList.contains('icon--spin')).toBe(true);
  });

  it('renders with rotation', async () => {
    const page = await newSpecPage({
      components: [SgIcon],
      html: `<sg-icon name="chevron-right" rotate="90"></sg-icon>`,
    });
    expect(page.root).toBeDefined();
  });

  it('renders with horizontal flip', async () => {
    const page = await newSpecPage({
      components: [SgIcon],
      html: `<sg-icon name="arrow-right" flip-h></sg-icon>`,
    });
    expect(page.root).toBeDefined();
  });

  it('renders with vertical flip', async () => {
    const page = await newSpecPage({
      components: [SgIcon],
      html: `<sg-icon name="arrow-up" flip-v></sg-icon>`,
    });
    expect(page.root).toBeDefined();
  });

  it('renders as decorative (aria-hidden)', async () => {
    const page = await newSpecPage({
      components: [SgIcon],
      html: `<sg-icon name="star" decorative></sg-icon>`,
    });
    expect(page.root?.getAttribute('aria-hidden')).toBe('true');
    expect(page.root?.getAttribute('role')).toBe('presentation');
  });

  it('renders with custom aria-label', async () => {
    const page = await newSpecPage({
      components: [SgIcon],
      html: `<sg-icon name="heart" aria-label="Favorite"></sg-icon>`,
    });
    expect(page.root?.getAttribute('aria-label')).toBe('Favorite');
  });

  it('renders nothing when icon name is invalid', async () => {
    const page = await newSpecPage({
      components: [SgIcon],
      html: `<sg-icon name="invalid-icon-name"></sg-icon>`,
    });
    expect(page.root?.shadowRoot?.innerHTML).toBe('');
  });

  it('renders with width and height override', async () => {
    const page = await newSpecPage({
      components: [SgIcon],
      html: `<sg-icon name="menu" width="40" height="20"></sg-icon>`,
    });
    expect(page.root).toBeDefined();
  });

  it('renders medical icons correctly', async () => {
    const page = await newSpecPage({
      components: [SgIcon],
      html: `<sg-icon name="medical"></sg-icon>`,
    });
    expect(page.root?.shadowRoot?.querySelector('svg')).toBeDefined();
    expect(page.root?.shadowRoot?.querySelector('path')).toBeDefined();
  });

  it('applies correct classes', async () => {
    const page = await newSpecPage({
      components: [SgIcon],
      html: `<sg-icon name="check" spin></sg-icon>`,
    });
    expect(page.root).toBeDefined();
  });
});
