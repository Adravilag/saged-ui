import { newSpecPage } from '@stencil/core/testing';
import { SgSkeleton } from './skeleton';

describe('sg-skeleton', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [SgSkeleton],
      html: '<sg-skeleton></sg-skeleton>',
    });

    const skeleton = page.root.shadowRoot.querySelector('.skeleton');
    expect(skeleton).not.toBeNull();
    expect(skeleton).toHaveClass('skeleton--text');
    expect(skeleton).toHaveClass('skeleton--shimmer');
  });

  it('renders text variant', async () => {
    const page = await newSpecPage({
      components: [SgSkeleton],
      html: '<sg-skeleton variant="text"></sg-skeleton>',
    });

    const skeleton = page.root.shadowRoot.querySelector('.skeleton');
    expect(skeleton).toHaveClass('skeleton--text');
  });

  it('renders rect variant', async () => {
    const page = await newSpecPage({
      components: [SgSkeleton],
      html: '<sg-skeleton variant="rect"></sg-skeleton>',
    });

    const skeleton = page.root.shadowRoot.querySelector('.skeleton');
    expect(skeleton).toHaveClass('skeleton--rect');
  });

  it('renders circle variant', async () => {
    const page = await newSpecPage({
      components: [SgSkeleton],
      html: '<sg-skeleton variant="circle"></sg-skeleton>',
    });

    const skeleton = page.root.shadowRoot.querySelector('.skeleton');
    expect(skeleton).toHaveClass('skeleton--circle');
  });

  it('renders with shimmer animation by default', async () => {
    const page = await newSpecPage({
      components: [SgSkeleton],
      html: '<sg-skeleton></sg-skeleton>',
    });

    const skeleton = page.root.shadowRoot.querySelector('.skeleton');
    expect(skeleton).toHaveClass('skeleton--shimmer');
  });

  it('renders with pulse animation', async () => {
    const page = await newSpecPage({
      components: [SgSkeleton],
      html: '<sg-skeleton animation="pulse"></sg-skeleton>',
    });

    const skeleton = page.root.shadowRoot.querySelector('.skeleton');
    expect(skeleton).toHaveClass('skeleton--pulse');
  });

  it('renders without animation class when animation is none', async () => {
    const page = await newSpecPage({
      components: [SgSkeleton],
      html: '<sg-skeleton animation="none"></sg-skeleton>',
    });

    const skeleton = page.root.shadowRoot.querySelector('.skeleton');
    expect(skeleton).not.toHaveClass('skeleton--shimmer');
    expect(skeleton).not.toHaveClass('skeleton--pulse');
    expect(skeleton).not.toHaveClass('skeleton--none');
  });

  it('has accessibility attributes', async () => {
    const page = await newSpecPage({
      components: [SgSkeleton],
      html: '<sg-skeleton></sg-skeleton>',
    });

    const skeleton = page.root.shadowRoot.querySelector('.skeleton');
    expect(skeleton.getAttribute('aria-busy')).toBe('true');
    expect(skeleton.getAttribute('aria-live')).toBe('polite');
  });

  it('applies custom width', async () => {
    const page = await newSpecPage({
      components: [SgSkeleton],
      html: '<sg-skeleton width="200px"></sg-skeleton>',
    });

    const skeleton = page.root.shadowRoot.querySelector('.skeleton');
    expect(skeleton.getAttribute('style')).toContain('width: 200px');
  });

  it('applies custom height', async () => {
    const page = await newSpecPage({
      components: [SgSkeleton],
      html: '<sg-skeleton height="50px"></sg-skeleton>',
    });

    const skeleton = page.root.shadowRoot.querySelector('.skeleton');
    expect(skeleton.getAttribute('style')).toContain('height: 50px');
  });

  it('applies custom width and height together', async () => {
    const page = await newSpecPage({
      components: [SgSkeleton],
      html: '<sg-skeleton width="300px" height="100px"></sg-skeleton>',
    });

    const skeleton = page.root.shadowRoot.querySelector('.skeleton');
    const style = skeleton.getAttribute('style');
    expect(style).toContain('width: 300px');
    expect(style).toContain('height: 100px');
  });

  it('uses default width of 100%', async () => {
    const page = await newSpecPage({
      components: [SgSkeleton],
      html: '<sg-skeleton></sg-skeleton>',
    });

    const skeleton = page.root.shadowRoot.querySelector('.skeleton');
    expect(skeleton.getAttribute('style')).toContain('width: 100%');
  });

  it('uses default height of 1rem', async () => {
    const page = await newSpecPage({
      components: [SgSkeleton],
      html: '<sg-skeleton></sg-skeleton>',
    });

    const skeleton = page.root.shadowRoot.querySelector('.skeleton');
    expect(skeleton.getAttribute('style')).toContain('height: 1rem');
  });

  it('renders circle with equal dimensions', async () => {
    const page = await newSpecPage({
      components: [SgSkeleton],
      html: '<sg-skeleton variant="circle" width="48px" height="48px"></sg-skeleton>',
    });

    const skeleton = page.root.shadowRoot.querySelector('.skeleton');
    expect(skeleton).toHaveClass('skeleton--circle');
    const style = skeleton.getAttribute('style');
    expect(style).toContain('width: 48px');
    expect(style).toContain('height: 48px');
  });

  it('combines variant and animation classes', async () => {
    const page = await newSpecPage({
      components: [SgSkeleton],
      html: '<sg-skeleton variant="rect" animation="pulse"></sg-skeleton>',
    });

    const skeleton = page.root.shadowRoot.querySelector('.skeleton');
    expect(skeleton).toHaveClass('skeleton');
    expect(skeleton).toHaveClass('skeleton--rect');
    expect(skeleton).toHaveClass('skeleton--pulse');
  });
});
