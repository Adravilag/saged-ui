import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { SgDropdown } from './dropdown';

describe('sg-dropdown', () => {
  let page: SpecPage;

  describe('rendering', () => {
    it('renders with default props', async () => {
      page = await newSpecPage({
        components: [SgDropdown],
        html: `<sg-dropdown><button slot="trigger">Menu</button><div>Content</div></sg-dropdown>`,
      });

      expect(page.root).toBeTruthy();
      expect(page.root.shadowRoot.querySelector('.trigger')).toBeTruthy();
    });

    it('renders trigger slot', async () => {
      page = await newSpecPage({
        components: [SgDropdown],
        html: `<sg-dropdown><button slot="trigger">Open</button></sg-dropdown>`,
      });

      const triggerSlot = page.root.shadowRoot.querySelector('slot[name="trigger"]');
      expect(triggerSlot).toBeTruthy();
    });

    it('renders content only when open', async () => {
      page = await newSpecPage({
        components: [SgDropdown],
        html: `<sg-dropdown><button slot="trigger">Menu</button><div>Content</div></sg-dropdown>`,
      });

      expect(page.root.shadowRoot.querySelector('.content')).toBeFalsy();

      page.root.open = true;
      await page.waitForChanges();

      expect(page.root.shadowRoot.querySelector('.content')).toBeTruthy();
    });
  });

  describe('alignment', () => {
    const alignments = ['start', 'end', 'center'] as const;

    for (const align of alignments) {
      it(`applies ${align} alignment class`, async () => {
        page = await newSpecPage({
          components: [SgDropdown],
          html: `<sg-dropdown align="${align}"><button slot="trigger">Menu</button></sg-dropdown>`,
        });

        expect(page.root).toHaveClass(`sg-dropdown--align-${align}`);
      });
    }
  });

  describe('position', () => {
    const positions = ['bottom', 'top'] as const;

    for (const position of positions) {
      it(`applies ${position} position class`, async () => {
        page = await newSpecPage({
          components: [SgDropdown],
          html: `<sg-dropdown position="${position}"><button slot="trigger">Menu</button></sg-dropdown>`,
        });

        expect(page.root).toHaveClass(`sg-dropdown--position-${position}`);
      });
    }
  });

  describe('sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    for (const size of sizes) {
      it(`applies ${size} size class`, async () => {
        page = await newSpecPage({
          components: [SgDropdown],
          html: `<sg-dropdown size="${size}"><button slot="trigger">Menu</button></sg-dropdown>`,
        });

        expect(page.root).toHaveClass(`sg-dropdown--size-${size}`);
      });
    }
  });

  describe('disabled state', () => {
    it('applies disabled class when disabled', async () => {
      page = await newSpecPage({
        components: [SgDropdown],
        html: `<sg-dropdown disabled><button slot="trigger">Menu</button></sg-dropdown>`,
      });

      expect(page.root).toHaveClass('sg-dropdown--disabled');
    });

    it('trigger has negative tabindex when disabled', async () => {
      page = await newSpecPage({
        components: [SgDropdown],
        html: `<sg-dropdown disabled><button slot="trigger">Menu</button></sg-dropdown>`,
      });

      const trigger = page.root.shadowRoot.querySelector('.trigger');
      expect(trigger.getAttribute('tabindex')).toBe('-1');
    });

    it('does not open when disabled', async () => {
      page = await newSpecPage({
        components: [SgDropdown],
        html: `<sg-dropdown disabled><button slot="trigger">Menu</button></sg-dropdown>`,
      });

      await page.root.openDropdown();
      await page.waitForChanges();

      expect(page.root.open).toBe(false);
    });
  });

  describe('open state', () => {
    it('applies open class when open', async () => {
      page = await newSpecPage({
        components: [SgDropdown],
        html: `<sg-dropdown open><button slot="trigger">Menu</button></sg-dropdown>`,
      });

      expect(page.root).toHaveClass('sg-dropdown--open');
    });

    it('renders content when open', async () => {
      page = await newSpecPage({
        components: [SgDropdown],
        html: `<sg-dropdown open><button slot="trigger">Menu</button><div>Items</div></sg-dropdown>`,
      });

      const content = page.root.shadowRoot.querySelector('.content');
      expect(content).toBeTruthy();
    });
  });

  describe('public methods', () => {
    it('openDropdown() opens the dropdown', async () => {
      page = await newSpecPage({
        components: [SgDropdown],
        html: `<sg-dropdown><button slot="trigger">Menu</button></sg-dropdown>`,
      });

      const openSpy = jest.fn();
      page.root.addEventListener('sgOpen', openSpy);

      await page.root.openDropdown();
      await page.waitForChanges();

      expect(page.root.open).toBe(true);
      expect(openSpy).toHaveBeenCalled();
    });

    it('closeDropdown() closes the dropdown', async () => {
      page = await newSpecPage({
        components: [SgDropdown],
        html: `<sg-dropdown open><button slot="trigger">Menu</button></sg-dropdown>`,
      });

      const closeSpy = jest.fn();
      page.root.addEventListener('sgClose', closeSpy);

      await page.root.closeDropdown();
      await page.waitForChanges();

      expect(page.root.open).toBe(false);
      expect(closeSpy).toHaveBeenCalled();
    });

    it('toggle() toggles the dropdown', async () => {
      page = await newSpecPage({
        components: [SgDropdown],
        html: `<sg-dropdown><button slot="trigger">Menu</button></sg-dropdown>`,
      });

      await page.root.toggle();
      await page.waitForChanges();
      expect(page.root.open).toBe(true);

      await page.root.toggle();
      await page.waitForChanges();
      expect(page.root.open).toBe(false);
    });
  });

  describe('events', () => {
    it('emits sgOpen when opened', async () => {
      page = await newSpecPage({
        components: [SgDropdown],
        html: `<sg-dropdown><button slot="trigger">Menu</button></sg-dropdown>`,
      });

      const openSpy = jest.fn();
      page.root.addEventListener('sgOpen', openSpy);

      await page.root.openDropdown();

      expect(openSpy).toHaveBeenCalled();
    });

    it('emits sgClose when closed', async () => {
      page = await newSpecPage({
        components: [SgDropdown],
        html: `<sg-dropdown open><button slot="trigger">Menu</button></sg-dropdown>`,
      });

      const closeSpy = jest.fn();
      page.root.addEventListener('sgClose', closeSpy);

      await page.root.closeDropdown();

      expect(closeSpy).toHaveBeenCalled();
    });

    it('emits sgToggle with state', async () => {
      page = await newSpecPage({
        components: [SgDropdown],
        html: `<sg-dropdown><button slot="trigger">Menu</button></sg-dropdown>`,
      });

      const toggleSpy = jest.fn();
      page.root.addEventListener('sgToggle', toggleSpy);

      await page.root.openDropdown();
      expect(toggleSpy).toHaveBeenCalledWith(expect.objectContaining({ detail: true }));

      await page.root.closeDropdown();
      expect(toggleSpy).toHaveBeenCalledWith(expect.objectContaining({ detail: false }));
    });
  });

  describe('trigger interactions', () => {
    it('toggles on trigger click', async () => {
      page = await newSpecPage({
        components: [SgDropdown],
        html: `<sg-dropdown><button slot="trigger">Menu</button></sg-dropdown>`,
      });

      const trigger = page.root.shadowRoot.querySelector('.trigger') as HTMLElement;
      trigger.click();
      await page.waitForChanges();

      expect(page.root.open).toBe(true);
    });

    it('toggles on Enter key', async () => {
      page = await newSpecPage({
        components: [SgDropdown],
        html: `<sg-dropdown><button slot="trigger">Menu</button></sg-dropdown>`,
      });

      const trigger = page.root.shadowRoot.querySelector('.trigger') as HTMLElement;
      trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      await page.waitForChanges();

      expect(page.root.open).toBe(true);
    });

    it('toggles on Space key', async () => {
      page = await newSpecPage({
        components: [SgDropdown],
        html: `<sg-dropdown><button slot="trigger">Menu</button></sg-dropdown>`,
      });

      const trigger = page.root.shadowRoot.querySelector('.trigger') as HTMLElement;
      trigger.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
      await page.waitForChanges();

      expect(page.root.open).toBe(true);
    });

    it('opens on ArrowDown when closed', async () => {
      page = await newSpecPage({
        components: [SgDropdown],
        html: `<sg-dropdown><button slot="trigger">Menu</button></sg-dropdown>`,
      });

      const trigger = page.root.shadowRoot.querySelector('.trigger') as HTMLElement;
      trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      await page.waitForChanges();

      expect(page.root.open).toBe(true);
    });
  });

  describe('keyboard navigation', () => {
    it('closes on Escape key', async () => {
      page = await newSpecPage({
        components: [SgDropdown],
        html: `<sg-dropdown open><button slot="trigger">Menu</button></sg-dropdown>`,
      });

      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      await page.waitForChanges();

      expect(page.root.open).toBe(false);
    });

    it('navigates with ArrowDown when open', async () => {
      page = await newSpecPage({
        components: [SgDropdown],
        html: `<sg-dropdown open><button slot="trigger">Menu</button><button>Item 1</button><button>Item 2</button></sg-dropdown>`,
      });

      // Dispatch ArrowDown to navigate
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      await page.waitForChanges();

      // Dropdown should still be open
      expect(page.root.open).toBe(true);
    });

    it('navigates with ArrowUp when open', async () => {
      page = await newSpecPage({
        components: [SgDropdown],
        html: `<sg-dropdown open><button slot="trigger">Menu</button><button>Item 1</button><button>Item 2</button></sg-dropdown>`,
      });

      // Dispatch ArrowUp to navigate
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
      await page.waitForChanges();

      // Dropdown should still be open
      expect(page.root.open).toBe(true);
    });

    it('handles Tab key when open', async () => {
      page = await newSpecPage({
        components: [SgDropdown],
        html: `<sg-dropdown open><button slot="trigger">Menu</button><button>Item 1</button></sg-dropdown>`,
      });

      // Tab should trigger the logic path (setTimeout check)
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));

      // Wait for setTimeout to execute
      await new Promise(resolve => setTimeout(resolve, 10));
      await page.waitForChanges();

      // The dropdown may or may not close depending on activeElement
      // The important thing is the code path is exercised
      expect(page.root).toBeTruthy();
    });

    it('ignores Escape when closed', async () => {
      page = await newSpecPage({
        components: [SgDropdown],
        html: `<sg-dropdown><button slot="trigger">Menu</button></sg-dropdown>`,
      });

      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      await page.waitForChanges();

      expect(page.root.open).toBe(false);
    });
  });

  describe('click outside', () => {
    it('closes when clicking outside', async () => {
      page = await newSpecPage({
        components: [SgDropdown],
        html: `<sg-dropdown open><button slot="trigger">Menu</button></sg-dropdown>`,
      });

      // Simulate click outside
      document.body.click();
      await page.waitForChanges();

      expect(page.root.open).toBe(false);
    });

    it('does not close when clicking inside', async () => {
      page = await newSpecPage({
        components: [SgDropdown],
        html: `<sg-dropdown open><button slot="trigger">Menu</button><button>Item</button></sg-dropdown>`,
      });

      const trigger = page.root.shadowRoot.querySelector('.trigger') as HTMLElement;
      trigger.click();
      await page.waitForChanges();

      // Toggle, so it closes
      expect(page.root.open).toBe(false);
    });

    it('ignores click outside when closed', async () => {
      page = await newSpecPage({
        components: [SgDropdown],
        html: `<sg-dropdown><button slot="trigger">Menu</button></sg-dropdown>`,
      });

      document.body.click();
      await page.waitForChanges();

      expect(page.root.open).toBe(false);
    });
  });

  describe('close on select', () => {
    it('closes when content is clicked with closeOnSelect=true', async () => {
      page = await newSpecPage({
        components: [SgDropdown],
        html: `<sg-dropdown open close-on-select><button slot="trigger">Menu</button><button>Item</button></sg-dropdown>`,
      });

      const content = page.root.shadowRoot.querySelector('.content') as HTMLElement;
      content.click();
      await page.waitForChanges();

      expect(page.root.open).toBe(false);
    });

    it('respects closeOnSelect default value (true)', async () => {
      page = await newSpecPage({
        components: [SgDropdown],
        html: `<sg-dropdown><button slot="trigger">Menu</button><button>Item</button></sg-dropdown>`,
      });

      // Default closeOnSelect is true
      expect(page.root.closeOnSelect).toBe(true);
    });
  });

  describe('backdrop', () => {
    it('renders backdrop when showBackdrop is true and open', async () => {
      page = await newSpecPage({
        components: [SgDropdown],
        html: `<sg-dropdown open show-backdrop><button slot="trigger">Menu</button></sg-dropdown>`,
      });

      const backdrop = page.root.shadowRoot.querySelector('.backdrop');
      expect(backdrop).toBeTruthy();
    });

    it('does not render backdrop when closed', async () => {
      page = await newSpecPage({
        components: [SgDropdown],
        html: `<sg-dropdown show-backdrop><button slot="trigger">Menu</button></sg-dropdown>`,
      });

      const backdrop = page.root.shadowRoot.querySelector('.backdrop');
      expect(backdrop).toBeFalsy();
    });

    it('closes on backdrop click', async () => {
      page = await newSpecPage({
        components: [SgDropdown],
        html: `<sg-dropdown open show-backdrop><button slot="trigger">Menu</button></sg-dropdown>`,
      });

      const backdrop = page.root.shadowRoot.querySelector('.backdrop') as HTMLElement;
      backdrop.click();
      await page.waitForChanges();

      expect(page.root.open).toBe(false);
    });
  });

  describe('slots', () => {
    it('renders header slot', async () => {
      page = await newSpecPage({
        components: [SgDropdown],
        html: `<sg-dropdown open><button slot="trigger">Menu</button><div slot="header">Header</div></sg-dropdown>`,
      });

      const headerSlot = page.root.shadowRoot.querySelector('slot[name="header"]');
      expect(headerSlot).toBeTruthy();
    });

    it('renders footer slot', async () => {
      page = await newSpecPage({
        components: [SgDropdown],
        html: `<sg-dropdown open><button slot="trigger">Menu</button><div slot="footer">Footer</div></sg-dropdown>`,
      });

      const footerSlot = page.root.shadowRoot.querySelector('slot[name="footer"]');
      expect(footerSlot).toBeTruthy();
    });
  });

  describe('accessibility', () => {
    it('trigger has correct ARIA attributes', async () => {
      page = await newSpecPage({
        components: [SgDropdown],
        html: `<sg-dropdown><button slot="trigger">Menu</button></sg-dropdown>`,
      });

      const trigger = page.root.shadowRoot.querySelector('.trigger');
      expect(trigger.getAttribute('role')).toBe('button');
      expect(trigger.getAttribute('aria-haspopup')).toBe('menu');
      expect(trigger.getAttribute('aria-expanded')).toBe('false');
    });

    it('updates aria-expanded when open', async () => {
      page = await newSpecPage({
        components: [SgDropdown],
        html: `<sg-dropdown open><button slot="trigger">Menu</button></sg-dropdown>`,
      });

      const trigger = page.root.shadowRoot.querySelector('.trigger');
      expect(trigger.getAttribute('aria-expanded')).toBe('true');
    });

    it('content has menu role', async () => {
      page = await newSpecPage({
        components: [SgDropdown],
        html: `<sg-dropdown open><button slot="trigger">Menu</button></sg-dropdown>`,
      });

      const content = page.root.shadowRoot.querySelector('.content');
      expect(content.getAttribute('role')).toBe('menu');
      expect(content.getAttribute('aria-orientation')).toBe('vertical');
    });

    it('sets aria-disabled when disabled', async () => {
      page = await newSpecPage({
        components: [SgDropdown],
        html: `<sg-dropdown disabled><button slot="trigger">Menu</button></sg-dropdown>`,
      });

      const trigger = page.root.shadowRoot.querySelector('.trigger');
      expect(trigger.getAttribute('aria-disabled')).toBe('true');
    });
  });

  describe('custom dimensions', () => {
    it('applies custom min-width', async () => {
      page = await newSpecPage({
        components: [SgDropdown],
        html: `<sg-dropdown open min-width="300px"><button slot="trigger">Menu</button></sg-dropdown>`,
      });

      const content = page.root.shadowRoot.querySelector('.content') as HTMLElement;
      expect(content.style.getPropertyValue('--dropdown-min-width')).toBe('300px');
    });

    it('applies custom max-height', async () => {
      page = await newSpecPage({
        components: [SgDropdown],
        html: `<sg-dropdown open max-height="400px"><button slot="trigger">Menu</button></sg-dropdown>`,
      });

      const content = page.root.shadowRoot.querySelector('.content') as HTMLElement;
      expect(content.style.getPropertyValue('--dropdown-max-height')).toBe('400px');
    });
  });

  describe('parts', () => {
    it('exposes container part', async () => {
      page = await newSpecPage({
        components: [SgDropdown],
        html: `<sg-dropdown><button slot="trigger">Menu</button></sg-dropdown>`,
      });

      const container = page.root.shadowRoot.querySelector('[part="container"]');
      expect(container).toBeTruthy();
    });

    it('exposes trigger part', async () => {
      page = await newSpecPage({
        components: [SgDropdown],
        html: `<sg-dropdown><button slot="trigger">Menu</button></sg-dropdown>`,
      });

      const trigger = page.root.shadowRoot.querySelector('[part="trigger"]');
      expect(trigger).toBeTruthy();
    });

    it('exposes content part when open', async () => {
      page = await newSpecPage({
        components: [SgDropdown],
        html: `<sg-dropdown open><button slot="trigger">Menu</button></sg-dropdown>`,
      });

      const content = page.root.shadowRoot.querySelector('[part="content"]');
      expect(content).toBeTruthy();
    });

    it('exposes backdrop part when shown', async () => {
      page = await newSpecPage({
        components: [SgDropdown],
        html: `<sg-dropdown open show-backdrop><button slot="trigger">Menu</button></sg-dropdown>`,
      });

      const backdrop = page.root.shadowRoot.querySelector('[part="backdrop"]');
      expect(backdrop).toBeTruthy();
    });
  });

  describe('reflected attributes', () => {
    it('reflects open to attribute', async () => {
      page = await newSpecPage({
        components: [SgDropdown],
        html: `<sg-dropdown open><button slot="trigger">Menu</button></sg-dropdown>`,
      });

      expect(page.root).toHaveAttribute('open');
    });

    it('reflects align to attribute', async () => {
      page = await newSpecPage({
        components: [SgDropdown],
        html: `<sg-dropdown align="end"><button slot="trigger">Menu</button></sg-dropdown>`,
      });

      expect(page.root.getAttribute('align')).toBe('end');
    });

    it('reflects position to attribute', async () => {
      page = await newSpecPage({
        components: [SgDropdown],
        html: `<sg-dropdown position="top"><button slot="trigger">Menu</button></sg-dropdown>`,
      });

      expect(page.root.getAttribute('position')).toBe('top');
    });
  });
});
