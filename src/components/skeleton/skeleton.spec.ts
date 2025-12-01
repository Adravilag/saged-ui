import { newSpecPage } from '@stencil/core/testing';
import { SgSkeleton } from './skeleton';

describe('sg-skeleton', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [SgSkeleton],
      html: '<sg-skeleton></sg-skeleton>',
    });

    const skeleton = page.root.shadowRoot.querySelector('.skeleton');
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

  it('applies custom dimensions', async () => {
    const page = await newSpecPage({
      components: [SgSkeleton],
      html: '<sg-skeleton width="200px" height="50px"></sg-skeleton>',
    });

    const skeleton = page.root.shadowRoot.querySelector('.skeleton') as HTMLElement;
    expect(skeleton.style.width).toBe('200px');
    expect(skeleton.style.height).toBe('50px');
  });

  it('applies pulse animation', async () => {
    const page = await newSpecPage({
      components: [SgSkeleton],
      html: '<sg-skeleton animation="pulse"></sg-skeleton>',
    });

    const skeleton = page.root.shadowRoot.querySelector('.skeleton');
    expect(skeleton).toHaveClass('skeleton--pulse');
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
});
