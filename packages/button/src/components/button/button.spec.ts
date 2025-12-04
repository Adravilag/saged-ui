import { newSpecPage } from '@stencil/core/testing';
import { SgButton } from './button';

describe('sg-button', () => {
  describe('rendering', () => {
    it('renders with default props', async () => {
      const page = await newSpecPage({
        components: [SgButton],
        html: `<sg-button>Click me</sg-button>`,
      });

      expect(page.root).toHaveClass('sg-button');
      expect(page.root).toHaveClass('sg-button--primary');
      expect(page.root).toHaveClass('sg-button--md');
      expect(page.root.shadowRoot.querySelector('button')).toBeTruthy();
    });

    it('renders slot content correctly', async () => {
      const page = await newSpecPage({
        components: [SgButton],
        html: `<sg-button>Test Content</sg-button>`,
      });

      const slot = page.root.shadowRoot.querySelector('slot');
      expect(slot).toBeTruthy();
    });

    it('renders button with correct type attribute', async () => {
      const page = await newSpecPage({
        components: [SgButton],
        html: `<sg-button type="submit">Submit</sg-button>`,
      });

      const button = page.root.shadowRoot.querySelector('button');
      expect(button.getAttribute('type')).toBe('submit');
    });
  });

  describe('variants', () => {
    const variants = ['primary', 'secondary', 'ghost', 'outline', 'success', 'warning', 'error', 'info'] as const;

    for (const variant of variants) {
      it(`renders ${variant} variant correctly`, async () => {
        const page = await newSpecPage({
          components: [SgButton],
          html: `<sg-button variant="${variant}">Button</sg-button>`,
        });

        expect(page.root).toHaveAttribute('variant');
        expect(page.root.getAttribute('variant')).toBe(variant);
        expect(page.root).toHaveClass(`sg-button--${variant}`);
      });
    }
  });

  describe('sizes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg'] as const;

    for (const size of sizes) {
      it(`renders ${size} size correctly`, async () => {
        const page = await newSpecPage({
          components: [SgButton],
          html: `<sg-button size="${size}">Button</sg-button>`,
        });

        expect(page.root).toHaveAttribute('size');
        expect(page.root.getAttribute('size')).toBe(size);
        expect(page.root).toHaveClass(`sg-button--${size}`);
      });
    }
  });

  describe('shapes', () => {
    const shapes = ['circle', 'square', 'pill', 'block'] as const;

    for (const shape of shapes) {
      it(`renders ${shape} shape correctly`, async () => {
        const page = await newSpecPage({
          components: [SgButton],
          html: `<sg-button shape="${shape}">Button</sg-button>`,
        });

        expect(page.root).toHaveAttribute('shape');
        expect(page.root.getAttribute('shape')).toBe(shape);
        expect(page.root).toHaveClass(`sg-button--${shape}`);
      });
    }

    it('does not apply shape class for default shape', async () => {
      const page = await newSpecPage({
        components: [SgButton],
        html: `<sg-button shape="default">Button</sg-button>`,
      });

      expect(page.root).not.toHaveClass('sg-button--default');
    });
  });

  describe('disabled state', () => {
    it('applies disabled class when disabled prop is true', async () => {
      const page = await newSpecPage({
        components: [SgButton],
        html: `<sg-button disabled>Disabled</sg-button>`,
      });

      expect(page.root).toHaveClass('sg-button--disabled');
      const button = page.root.shadowRoot.querySelector('button');
      expect(button.hasAttribute('disabled')).toBe(true);
      expect(button.getAttribute('aria-disabled')).toBe('true');
    });

    it('does not emit click event when disabled', async () => {
      const page = await newSpecPage({
        components: [SgButton],
        html: `<sg-button disabled>Disabled</sg-button>`,
      });

      const clickSpy = jest.fn();
      page.root.addEventListener('sgClick', clickSpy);

      const button = page.root.shadowRoot.querySelector('button');
      button.click();

      expect(clickSpy).not.toHaveBeenCalled();
    });
  });

  describe('loading state', () => {
    it('applies loading class when loading prop is true', async () => {
      const page = await newSpecPage({
        components: [SgButton],
        html: `<sg-button loading>Loading</sg-button>`,
      });

      expect(page.root).toHaveClass('sg-button--loading');
      const button = page.root.shadowRoot.querySelector('button');
      expect(button.hasAttribute('disabled')).toBe(true);
      expect(button.getAttribute('aria-busy')).toBe('true');
    });

    it('renders spinner when loading', async () => {
      const page = await newSpecPage({
        components: [SgButton],
        html: `<sg-button loading>Loading</sg-button>`,
      });

      const spinner = page.root.shadowRoot.querySelector('.spinner');
      expect(spinner).toBeTruthy();
    });

    it('renders loading text when provided', async () => {
      const page = await newSpecPage({
        components: [SgButton],
        html: `<sg-button loading loading-text="Please wait...">Submit</sg-button>`,
      });

      const content = page.root.shadowRoot.querySelector('.content');
      expect(content.textContent).toContain('Please wait...');
    });

    it('hides content when loading without loading-text', async () => {
      const page = await newSpecPage({
        components: [SgButton],
        html: `<sg-button loading>Submit</sg-button>`,
      });

      const content = page.root.shadowRoot.querySelector('.content');
      expect(content).toHaveClass('content--hidden');
    });

    it('does not emit click event when loading', async () => {
      const page = await newSpecPage({
        components: [SgButton],
        html: `<sg-button loading>Loading</sg-button>`,
      });

      const clickSpy = jest.fn();
      page.root.addEventListener('sgClick', clickSpy);

      const button = page.root.shadowRoot.querySelector('button');
      button.click();

      expect(clickSpy).not.toHaveBeenCalled();
    });
  });

  describe('icons', () => {
    it('renders leading icon when provided', async () => {
      const page = await newSpecPage({
        components: [SgButton],
        html: `<sg-button leading-icon="check">Save</sg-button>`,
      });

      const icon = page.root.shadowRoot.querySelector('sg-icon.icon-leading');
      expect(icon).toBeTruthy();
      expect(icon.getAttribute('name')).toBe('check');
    });

    it('renders trailing icon when provided', async () => {
      const page = await newSpecPage({
        components: [SgButton],
        html: `<sg-button trailing-icon="arrow-right">Next</sg-button>`,
      });

      const icon = page.root.shadowRoot.querySelector('sg-icon.icon-trailing');
      expect(icon).toBeTruthy();
      expect(icon.getAttribute('name')).toBe('arrow-right');
    });

    it('hides icons when loading', async () => {
      const page = await newSpecPage({
        components: [SgButton],
        html: `<sg-button loading leading-icon="check" trailing-icon="arrow">Submit</sg-button>`,
      });

      const leadingIcon = page.root.shadowRoot.querySelector('sg-icon.icon-leading');
      const trailingIcon = page.root.shadowRoot.querySelector('sg-icon.icon-trailing');
      expect(leadingIcon).toBeFalsy();
      expect(trailingIcon).toBeFalsy();
    });
  });

  describe('events', () => {
    it('emits sgClick event on click', async () => {
      const page = await newSpecPage({
        components: [SgButton],
        html: `<sg-button>Click me</sg-button>`,
      });

      const clickSpy = jest.fn();
      page.root.addEventListener('sgClick', clickSpy);

      const button = page.root.shadowRoot.querySelector('button');
      button.click();

      expect(clickSpy).toHaveBeenCalled();
    });

    it('emits sgClick event on Enter key', async () => {
      const page = await newSpecPage({
        components: [SgButton],
        html: `<sg-button>Click me</sg-button>`,
      });

      const clickSpy = jest.fn();
      page.root.addEventListener('sgClick', clickSpy);

      const button = page.root.shadowRoot.querySelector('button');
      button.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

      expect(clickSpy).toHaveBeenCalled();
    });

    it('emits sgClick event on Space key', async () => {
      const page = await newSpecPage({
        components: [SgButton],
        html: `<sg-button>Click me</sg-button>`,
      });

      const clickSpy = jest.fn();
      page.root.addEventListener('sgClick', clickSpy);

      const button = page.root.shadowRoot.querySelector('button');
      button.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));

      expect(clickSpy).toHaveBeenCalled();
    });

    it('does not emit on keydown when disabled', async () => {
      const page = await newSpecPage({
        components: [SgButton],
        html: `<sg-button disabled>Click me</sg-button>`,
      });

      const clickSpy = jest.fn();
      page.root.addEventListener('sgClick', clickSpy);

      const button = page.root.shadowRoot.querySelector('button');
      button.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

      expect(clickSpy).not.toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('supports aria-label', async () => {
      const page = await newSpecPage({
        components: [SgButton],
        html: `<sg-button aria-label="Close dialog">X</sg-button>`,
      });

      const button = page.root.shadowRoot.querySelector('button');
      expect(button.getAttribute('aria-label')).toBe('Close dialog');
    });

    it('has correct default type', async () => {
      const page = await newSpecPage({
        components: [SgButton],
        html: `<sg-button>Button</sg-button>`,
      });

      const button = page.root.shadowRoot.querySelector('button');
      expect(button.getAttribute('type')).toBe('button');
    });
  });

  describe('reflected attributes', () => {
    it('reflects variant to attribute', async () => {
      const page = await newSpecPage({
        components: [SgButton],
        html: `<sg-button variant="error">Error</sg-button>`,
      });

      expect(page.root.getAttribute('variant')).toBe('error');
    });

    it('reflects size to attribute', async () => {
      const page = await newSpecPage({
        components: [SgButton],
        html: `<sg-button size="lg">Large</sg-button>`,
      });

      expect(page.root.getAttribute('size')).toBe('lg');
    });

    it('reflects boolean props to attributes', async () => {
      const page = await newSpecPage({
        components: [SgButton],
        html: `<sg-button disabled loading>Loading</sg-button>`,
      });

      expect(page.root).toHaveAttribute('disabled');
      expect(page.root).toHaveAttribute('loading');
    });
  });

  describe('combined props', () => {
    it('applies multiple classes correctly', async () => {
      const page = await newSpecPage({
        components: [SgButton],
        html: `<sg-button variant="success" size="lg" shape="pill" disabled>Combined</sg-button>`,
      });

      expect(page.root).toHaveClass('sg-button--success');
      expect(page.root).toHaveClass('sg-button--lg');
      expect(page.root).toHaveClass('sg-button--pill');
      expect(page.root).toHaveClass('sg-button--disabled');
    });
  });
});
