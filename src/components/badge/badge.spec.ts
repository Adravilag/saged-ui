import { newSpecPage } from '@stencil/core/testing';
import { SgBadge } from './badge';

describe('sg-badge', () => {
  describe('rendering', () => {
    it('renders with default props', async () => {
      const page = await newSpecPage({
        components: [SgBadge],
        html: `<sg-badge>Default</sg-badge>`,
      });

      expect(page.root).toHaveClass('sg-badge--primary');
      expect(page.root).toHaveClass('sg-badge--md');
      expect(page.root.shadowRoot.querySelector('.content')).toBeTruthy();
    });

    it('renders slot content correctly', async () => {
      const page = await newSpecPage({
        components: [SgBadge],
        html: `<sg-badge>Test Content</sg-badge>`,
      });

      const slot = page.root.shadowRoot.querySelector('slot:not([name])');
      expect(slot).toBeTruthy();
    });
  });

  describe('variants', () => {
    const variants = ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral', 'purple', 'cyan'] as const;

    variants.forEach(variant => {
      it(`renders ${variant} variant correctly`, async () => {
        const page = await newSpecPage({
          components: [SgBadge],
          html: `<sg-badge variant="${variant}">Badge</sg-badge>`,
        });

        expect(page.root).toHaveAttribute('variant');
        expect(page.root.getAttribute('variant')).toBe(variant);
        expect(page.root).toHaveClass(`sg-badge--${variant}`);
      });
    });
  });

  describe('sizes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg'] as const;

    sizes.forEach(size => {
      it(`renders ${size} size correctly`, async () => {
        const page = await newSpecPage({
          components: [SgBadge],
          html: `<sg-badge size="${size}">Badge</sg-badge>`,
        });

        expect(page.root).toHaveAttribute('size');
        expect(page.root.getAttribute('size')).toBe(size);
        expect(page.root).toHaveClass(`sg-badge--${size}`);
      });
    });
  });

  describe('pill style', () => {
    it('applies pill class when pill prop is true', async () => {
      const page = await newSpecPage({
        components: [SgBadge],
        html: `<sg-badge pill>Pill Badge</sg-badge>`,
      });

      expect(page.root).toHaveClass('sg-badge--pill');
    });

    it('does not apply pill class when pill prop is false', async () => {
      const page = await newSpecPage({
        components: [SgBadge],
        html: `<sg-badge>Normal Badge</sg-badge>`,
      });

      expect(page.root).not.toHaveClass('sg-badge--pill');
    });
  });

  describe('outlined style', () => {
    it('applies outlined class when outlined prop is true', async () => {
      const page = await newSpecPage({
        components: [SgBadge],
        html: `<sg-badge outlined>Outlined Badge</sg-badge>`,
      });

      expect(page.root).toHaveClass('sg-badge--outlined');
    });

    it('does not apply outlined class when outlined prop is false', async () => {
      const page = await newSpecPage({
        components: [SgBadge],
        html: `<sg-badge>Normal Badge</sg-badge>`,
      });

      expect(page.root).not.toHaveClass('sg-badge--outlined');
    });
  });

  describe('soft style', () => {
    it('applies soft class when soft prop is true', async () => {
      const page = await newSpecPage({
        components: [SgBadge],
        html: `<sg-badge soft>Soft Badge</sg-badge>`,
      });

      expect(page.root).toHaveClass('sg-badge--soft');
    });
  });

  describe('dot indicator', () => {
    it('shows dot when dot prop is true', async () => {
      const page = await newSpecPage({
        components: [SgBadge],
        html: `<sg-badge dot>With Dot</sg-badge>`,
      });

      expect(page.root).toHaveClass('sg-badge--has-dot');
      const dot = page.root.shadowRoot.querySelector('.dot');
      expect(dot).toBeTruthy();
    });

    it('does not show dot when dot prop is false', async () => {
      const page = await newSpecPage({
        components: [SgBadge],
        html: `<sg-badge>Without Dot</sg-badge>`,
      });

      expect(page.root).not.toHaveClass('sg-badge--has-dot');
      const dot = page.root.shadowRoot.querySelector('.dot');
      expect(dot).toBeFalsy();
    });

    it('shows pulse animation when pulse prop is true', async () => {
      const page = await newSpecPage({
        components: [SgBadge],
        html: `<sg-badge dot pulse>Pulsing</sg-badge>`,
      });

      expect(page.root).toHaveClass('sg-badge--pulse');
      const dotPulse = page.root.shadowRoot.querySelector('.dot-pulse');
      expect(dotPulse).toBeTruthy();
    });

    it('does not show pulse without dot', async () => {
      const page = await newSpecPage({
        components: [SgBadge],
        html: `<sg-badge pulse>No Dot Pulse</sg-badge>`,
      });

      const dotPulse = page.root.shadowRoot.querySelector('.dot-pulse');
      expect(dotPulse).toBeFalsy();
    });
  });

  describe('clickable', () => {
    it('applies clickable class when clickable prop is true', async () => {
      const page = await newSpecPage({
        components: [SgBadge],
        html: `<sg-badge clickable>Clickable Badge</sg-badge>`,
      });

      expect(page.root).toHaveClass('sg-badge--clickable');
    });
  });

  describe('icon slot', () => {
    it('renders icon slot', async () => {
      const page = await newSpecPage({
        components: [SgBadge],
        html: `<sg-badge><span slot="icon">🔥</span>Hot</sg-badge>`,
      });

      const iconSlot = page.root.shadowRoot.querySelector('slot[name="icon"]');
      expect(iconSlot).toBeTruthy();
    });
  });

  describe('parts', () => {
    it('exposes badge part', async () => {
      const page = await newSpecPage({
        components: [SgBadge],
        html: `<sg-badge>Badge</sg-badge>`,
      });

      const badge = page.root.shadowRoot.querySelector('[part="badge"]');
      expect(badge).toBeTruthy();
    });

    it('exposes icon part', async () => {
      const page = await newSpecPage({
        components: [SgBadge],
        html: `<sg-badge>Badge</sg-badge>`,
      });

      const icon = page.root.shadowRoot.querySelector('[part="icon"]');
      expect(icon).toBeTruthy();
    });

    it('exposes content part', async () => {
      const page = await newSpecPage({
        components: [SgBadge],
        html: `<sg-badge>Badge</sg-badge>`,
      });

      const content = page.root.shadowRoot.querySelector('[part="content"]');
      expect(content).toBeTruthy();
    });
  });

  describe('combined props', () => {
    it('applies multiple classes correctly', async () => {
      const page = await newSpecPage({
        components: [SgBadge],
        html: `<sg-badge variant="success" size="lg" pill outlined dot pulse clickable>Combined</sg-badge>`,
      });

      expect(page.root).toHaveClass('sg-badge--success');
      expect(page.root).toHaveClass('sg-badge--lg');
      expect(page.root).toHaveClass('sg-badge--pill');
      expect(page.root).toHaveClass('sg-badge--outlined');
      expect(page.root).toHaveClass('sg-badge--has-dot');
      expect(page.root).toHaveClass('sg-badge--pulse');
      expect(page.root).toHaveClass('sg-badge--clickable');
    });

    it('applies soft and outlined together', async () => {
      const page = await newSpecPage({
        components: [SgBadge],
        html: `<sg-badge soft outlined>Soft Outlined</sg-badge>`,
      });

      expect(page.root).toHaveClass('sg-badge--soft');
      expect(page.root).toHaveClass('sg-badge--outlined');
    });
  });

  describe('accessibility', () => {
    it('dot has aria-hidden attribute', async () => {
      const page = await newSpecPage({
        components: [SgBadge],
        html: `<sg-badge dot>Status</sg-badge>`,
      });

      const dot = page.root.shadowRoot.querySelector('.dot');
      expect(dot).toHaveAttribute('aria-hidden');
      expect(dot.getAttribute('aria-hidden')).toBe('true');
    });
  });

  describe('reflected attributes', () => {
    it('reflects variant to attribute', async () => {
      const page = await newSpecPage({
        components: [SgBadge],
        html: `<sg-badge variant="error">Error</sg-badge>`,
      });

      expect(page.root.getAttribute('variant')).toBe('error');
    });

    it('reflects size to attribute', async () => {
      const page = await newSpecPage({
        components: [SgBadge],
        html: `<sg-badge size="sm">Small</sg-badge>`,
      });

      expect(page.root.getAttribute('size')).toBe('sm');
    });

    it('reflects boolean props to attributes', async () => {
      const page = await newSpecPage({
        components: [SgBadge],
        html: `<sg-badge pill outlined soft dot pulse clickable>All Props</sg-badge>`,
      });

      expect(page.root).toHaveAttribute('pill');
      expect(page.root).toHaveAttribute('outlined');
      expect(page.root).toHaveAttribute('soft');
      expect(page.root).toHaveAttribute('dot');
      expect(page.root).toHaveAttribute('pulse');
      expect(page.root).toHaveAttribute('clickable');
    });
  });
});
