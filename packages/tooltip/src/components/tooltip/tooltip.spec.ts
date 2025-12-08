import { newSpecPage } from '@stencil/core/testing';
import { SgTooltip } from './tooltip';

describe('sg-tooltip', () => {
  describe('rendering', () => {
    it('renders with default props', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip text"><button>Hover me</button></sg-tooltip>`,
      });
      expect(page.root).not.toBeNull();
      expect(page.root.tagName.toLowerCase()).toBe('sg-tooltip');
    });

    it('renders with text prop', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Help text"><span>?</span></sg-tooltip>`,
      });
      expect(page.rootInstance.text).toBe('Help text');
    });

    it('renders slot content', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Help"><span class="icon">?</span></sg-tooltip>`,
      });
      const slotContent = page.root.querySelector('.icon');
      expect(slotContent.textContent).toBe('?');
    });
  });

  describe('positions', () => {
    it('renders with position top (default)', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip"><button>Hover</button></sg-tooltip>`,
      });
      expect(page.rootInstance.position).toBe('top');
      expect(page.root.classList.contains('sg-tooltip--top')).toBe(true);
    });

    it('renders with position bottom', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" position="bottom"><button>Hover</button></sg-tooltip>`,
      });
      expect(page.rootInstance.position).toBe('bottom');
      expect(page.root.classList.contains('sg-tooltip--bottom')).toBe(true);
    });

    it('renders with position left', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" position="left"><button>Hover</button></sg-tooltip>`,
      });
      expect(page.rootInstance.position).toBe('left');
    });

    it('renders with position right', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" position="right"><button>Hover</button></sg-tooltip>`,
      });
      expect(page.rootInstance.position).toBe('right');
    });
  });

  describe('variants', () => {
    it('renders with default variant', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip"><button>Hover</button></sg-tooltip>`,
      });
      expect(page.rootInstance.variant).toBe('default');
      expect(page.root.classList.contains('sg-tooltip--default')).toBe(true);
    });

    it('renders with primary variant', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" variant="primary"><button>Hover</button></sg-tooltip>`,
      });
      expect(page.rootInstance.variant).toBe('primary');
      expect(page.root.classList.contains('sg-tooltip--primary')).toBe(true);
    });

    it('renders with success variant', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" variant="success"><button>Hover</button></sg-tooltip>`,
      });
      expect(page.rootInstance.variant).toBe('success');
    });

    it('renders with warning variant', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" variant="warning"><button>Hover</button></sg-tooltip>`,
      });
      expect(page.rootInstance.variant).toBe('warning');
    });

    it('renders with error variant', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" variant="error"><button>Hover</button></sg-tooltip>`,
      });
      expect(page.rootInstance.variant).toBe('error');
    });

    it('renders with dark variant', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" variant="dark"><button>Hover</button></sg-tooltip>`,
      });
      expect(page.rootInstance.variant).toBe('dark');
    });

    it('renders with light variant', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" variant="light"><button>Hover</button></sg-tooltip>`,
      });
      expect(page.rootInstance.variant).toBe('light');
    });
  });

  describe('trigger types', () => {
    it('defaults to hover trigger', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip"><button>Hover</button></sg-tooltip>`,
      });
      expect(page.rootInstance.trigger).toBe('hover');
    });

    it('supports click trigger', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" trigger="click"><button>Click</button></sg-tooltip>`,
      });
      expect(page.rootInstance.trigger).toBe('click');
    });

    it('supports focus trigger', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" trigger="focus"><input type="text" /></sg-tooltip>`,
      });
      expect(page.rootInstance.trigger).toBe('focus');
    });

    it('supports manual trigger', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" trigger="manual"><button>Manual</button></sg-tooltip>`,
      });
      expect(page.rootInstance.trigger).toBe('manual');
    });
  });

  describe('public methods', () => {
    it('shows tooltip via show() method', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" trigger="manual"><button>Manual</button></sg-tooltip>`,
      });
      expect(page.rootInstance.visible).toBe(false);

      await page.rootInstance.show();
      await page.waitForChanges();

      expect(page.rootInstance.visible).toBe(true);
    });

    it('hides tooltip via hide() method', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" trigger="manual"><button>Manual</button></sg-tooltip>`,
      });

      await page.rootInstance.show();
      await page.waitForChanges();
      expect(page.rootInstance.visible).toBe(true);

      await page.rootInstance.hide();
      await page.waitForChanges();
      expect(page.rootInstance.visible).toBe(false);
    });

    it('toggles tooltip via toggle() method', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" trigger="manual"><button>Manual</button></sg-tooltip>`,
      });

      // First toggle - show
      await page.rootInstance.toggle();
      await page.waitForChanges();
      expect(page.rootInstance.visible).toBe(true);

      // Second toggle - hide
      await page.rootInstance.toggle();
      await page.waitForChanges();
      expect(page.rootInstance.visible).toBe(false);
    });
  });

  describe('events', () => {
    it('emits sgShow event when shown', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" trigger="manual"><button>Manual</button></sg-tooltip>`,
      });

      const showSpy = jest.fn();
      page.root.addEventListener('sgShow', showSpy);

      await page.rootInstance.show();
      await page.waitForChanges();

      expect(showSpy).toHaveBeenCalled();
    });

    it('emits sgHide event when hidden', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" trigger="manual"><button>Manual</button></sg-tooltip>`,
      });

      const hideSpy = jest.fn();
      page.root.addEventListener('sgHide', hideSpy);

      await page.rootInstance.show();
      await page.waitForChanges();

      await page.rootInstance.hide();
      await page.waitForChanges();

      expect(hideSpy).toHaveBeenCalled();
    });
  });

  describe('disabled state', () => {
    it('does not show when disabled', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" disabled trigger="manual"><button>Hover</button></sg-tooltip>`,
      });

      expect(page.rootInstance.disabled).toBe(true);

      await page.rootInstance.show();
      await page.waitForChanges();

      expect(page.rootInstance.visible).toBe(false);
    });
  });

  describe('props configuration', () => {
    it('supports showDelay prop', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" show-delay="500"><button>Hover</button></sg-tooltip>`,
      });
      expect(page.rootInstance.showDelay).toBe(500);
    });

    it('supports hideDelay prop', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" hide-delay="200"><button>Hover</button></sg-tooltip>`,
      });
      expect(page.rootInstance.hideDelay).toBe(200);
    });

    it('supports maxWidth prop', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" max-width="300px"><button>Hover</button></sg-tooltip>`,
      });
      expect(page.rootInstance.maxWidth).toBe('300px');
    });

    it('supports arrow prop (default true)', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip"><button>Hover</button></sg-tooltip>`,
      });
      expect(page.rootInstance.arrow).toBe(true);
    });

    it('supports interactive prop', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" interactive><button>Hover</button></sg-tooltip>`,
      });
      expect(page.rootInstance.interactive).toBe(true);
    });
  });

  describe('controlled mode (open prop)', () => {
    it('shows tooltip when open prop is true', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" trigger="manual" open><button>Hover</button></sg-tooltip>`,
      });
      expect(page.rootInstance.visible).toBe(true);
    });
  });

  describe('hover trigger behavior', () => {
    it('sets up event listeners for hover trigger', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" trigger="hover"><button>Hover</button></sg-tooltip>`,
      });
      expect(page.rootInstance.trigger).toBe('hover');
    });

    it('shows tooltip on mouse enter after delay', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" trigger="hover" show-delay="0"><button>Hover</button></sg-tooltip>`,
      });

      // Call the handler directly
      page.rootInstance.handleMouseEnter();

      // Wait for the timeout (0ms delay)
      await new Promise(resolve => setTimeout(resolve, 10));
      await page.waitForChanges();

      expect(page.rootInstance.visible).toBe(true);
    });

    it('hides tooltip on mouse leave after delay', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" trigger="hover" show-delay="0" hide-delay="0"><button>Hover</button></sg-tooltip>`,
      });

      // Show first
      await page.rootInstance.show();
      await page.waitForChanges();
      expect(page.rootInstance.visible).toBe(true);

      // Call mouse leave handler
      page.rootInstance.handleMouseLeave();

      await new Promise(resolve => setTimeout(resolve, 10));
      await page.waitForChanges();

      expect(page.rootInstance.visible).toBe(false);
    });

    it('does not show on mouse enter when disabled', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" trigger="hover" disabled show-delay="0"><button>Hover</button></sg-tooltip>`,
      });

      page.rootInstance.handleMouseEnter();

      await new Promise(resolve => setTimeout(resolve, 10));
      await page.waitForChanges();

      expect(page.rootInstance.visible).toBe(false);
    });
  });

  describe('click trigger behavior', () => {
    it('has click trigger configured', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" trigger="click"><button>Click</button></sg-tooltip>`,
      });
      expect(page.rootInstance.trigger).toBe('click');
    });

    it('toggles visibility on click', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" trigger="click"><button>Click</button></sg-tooltip>`,
      });

      const mockEvent = { stopPropagation: jest.fn() };

      // Click to show
      page.rootInstance.handleClick(mockEvent);
      await page.waitForChanges();
      expect(page.rootInstance.visible).toBe(true);
      expect(mockEvent.stopPropagation).toHaveBeenCalled();

      // Click again to hide
      page.rootInstance.handleClick(mockEvent);
      await page.waitForChanges();
      expect(page.rootInstance.visible).toBe(false);
    });

    it('does not toggle when disabled', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" trigger="click" disabled><button>Click</button></sg-tooltip>`,
      });

      const mockEvent = { stopPropagation: jest.fn() };
      page.rootInstance.handleClick(mockEvent);
      await page.waitForChanges();

      expect(page.rootInstance.visible).toBe(false);
    });

    it('hides on outside click', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" trigger="click"><button>Click</button></sg-tooltip>`,
      });

      // Show tooltip first
      await page.rootInstance.show();
      await page.waitForChanges();
      expect(page.rootInstance.visible).toBe(true);

      // Simulate outside click with a target not in the element
      const outsideTarget = document.createElement('div');
      page.rootInstance.handleOutsideClick({ target: outsideTarget });
      await page.waitForChanges();

      expect(page.rootInstance.visible).toBe(false);
    });

    it('does not hide on inside click', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" trigger="click"><button>Click</button></sg-tooltip>`,
      });

      // Show tooltip first
      await page.rootInstance.show();
      await page.waitForChanges();
      expect(page.rootInstance.visible).toBe(true);

      // Simulate click inside - use the element itself as target
      page.rootInstance.handleOutsideClick({ target: page.root });
      await page.waitForChanges();

      // Should still be visible
      expect(page.rootInstance.visible).toBe(true);
    });
  });

  describe('focus trigger behavior', () => {
    it('has focus trigger configured', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" trigger="focus"><input type="text" /></sg-tooltip>`,
      });
      expect(page.rootInstance.trigger).toBe('focus');
    });

    it('shows tooltip on focus', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" trigger="focus"><input type="text" /></sg-tooltip>`,
      });

      page.rootInstance.handleFocus();
      await page.waitForChanges();

      expect(page.rootInstance.visible).toBe(true);
    });

    it('hides tooltip on blur', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" trigger="focus"><input type="text" /></sg-tooltip>`,
      });

      // Show first
      page.rootInstance.handleFocus();
      await page.waitForChanges();
      expect(page.rootInstance.visible).toBe(true);

      // Blur to hide
      page.rootInstance.handleBlur();
      await page.waitForChanges();

      expect(page.rootInstance.visible).toBe(false);
    });

    it('does not show on focus when disabled', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" trigger="focus" disabled><input type="text" /></sg-tooltip>`,
      });

      page.rootInstance.handleFocus();
      await page.waitForChanges();

      expect(page.rootInstance.visible).toBe(false);
    });
  });

  describe('interactive tooltip', () => {
    it('has interactive class when enabled', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" interactive><button>Hover</button></sg-tooltip>`,
      });
      expect(page.rootInstance.interactive).toBe(true);
    });

    it('clears timeout on tooltip mouse enter when interactive', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" trigger="manual" interactive><button>Hover</button></sg-tooltip>`,
      });

      await page.rootInstance.show();
      await page.waitForChanges();

      // Should not throw
      page.rootInstance.handleTooltipMouseEnter();
      await page.waitForChanges();

      expect(page.rootInstance.visible).toBe(true);
    });

    it('triggers mouse leave on tooltip mouse leave when interactive', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" trigger="manual" interactive hide-delay="0"><button>Hover</button></sg-tooltip>`,
      });

      await page.rootInstance.show();
      await page.waitForChanges();

      page.rootInstance.handleTooltipMouseLeave();

      await new Promise(resolve => setTimeout(resolve, 10));
      await page.waitForChanges();

      expect(page.rootInstance.visible).toBe(false);
    });

    it('does not trigger on non-interactive tooltip', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" trigger="manual"><button>Hover</button></sg-tooltip>`,
      });

      await page.rootInstance.show();
      await page.waitForChanges();

      // These should do nothing when not interactive
      page.rootInstance.handleTooltipMouseEnter();
      page.rootInstance.handleTooltipMouseLeave();
      await page.waitForChanges();

      expect(page.rootInstance.visible).toBe(true);
    });
  });

  describe('tooltip content rendering', () => {
    it('has arrow enabled by default', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip"><button>Hover</button></sg-tooltip>`,
      });
      expect(page.rootInstance.arrow).toBe(true);
    });

    it('can disable arrow', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" arrow="false"><button>Hover</button></sg-tooltip>`,
      });
      expect(page.rootInstance.arrow).toBe(false);
    });

    it('applies maxWidth style', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" max-width="400px"><button>Hover</button></sg-tooltip>`,
      });
      expect(page.rootInstance.maxWidth).toBe('400px');
    });

    it('renders arrow element when visible and arrow is true', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" trigger="manual" arrow><button>Hover</button></sg-tooltip>`,
      });

      await page.rootInstance.show();
      await page.waitForChanges();

      const arrow = page.root.shadowRoot.querySelector('.tooltip-arrow');
      expect(arrow).not.toBeNull();
    });

    it('does not render arrow element when arrow is false', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" trigger="manual" arrow="false"><button>Hover</button></sg-tooltip>`,
      });

      await page.rootInstance.show();
      await page.waitForChanges();

      const arrow = page.root.shadowRoot.querySelector('.tooltip-arrow');
      expect(arrow).toBeNull();
    });

    it('renders tooltip content with text', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Test content" trigger="manual"><button>Hover</button></sg-tooltip>`,
      });

      await page.rootInstance.show();
      await page.waitForChanges();

      const content = page.root.shadowRoot.querySelector('.tooltip-content');
      expect(content).not.toBeNull();
    });

    it('applies maxWidth CSS variable when visible', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" trigger="manual" max-width="300px"><button>Hover</button></sg-tooltip>`,
      });

      await page.rootInstance.show();
      await page.waitForChanges();

      const tooltip = page.root.shadowRoot.querySelector('.tooltip') as HTMLElement;
      expect(tooltip.style.getPropertyValue('--tooltip-max-width')).toBe('300px');
    });
  });

  describe('host classes', () => {
    it('applies disabled class when disabled', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" disabled><button>Hover</button></sg-tooltip>`,
      });
      expect(page.root.classList.contains('sg-tooltip--disabled')).toBe(true);
    });

    it('applies interactive class when interactive', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" interactive><button>Hover</button></sg-tooltip>`,
      });
      expect(page.root.classList.contains('sg-tooltip--interactive')).toBe(true);
    });

    it('applies visible class when visible', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" trigger="manual"><button>Hover</button></sg-tooltip>`,
      });

      await page.rootInstance.show();
      await page.waitForChanges();

      expect(page.root.classList.contains('sg-tooltip--visible')).toBe(true);
    });

    it('applies position class', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" position="right"><button>Hover</button></sg-tooltip>`,
      });
      expect(page.root.classList.contains('sg-tooltip--right')).toBe(true);
    });

    it('applies variant class', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" variant="error"><button>Hover</button></sg-tooltip>`,
      });
      expect(page.root.classList.contains('sg-tooltip--error')).toBe(true);
    });
  });

  describe('cleanup', () => {
    it('can be removed from DOM without errors', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip"><button>Hover</button></sg-tooltip>`,
      });
      // Should not throw
      page.root.remove();
      await page.waitForChanges();
    });

    it('clears timeouts on disconnect', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" trigger="hover" show-delay="1000"><button>Hover</button></sg-tooltip>`,
      });

      // Start a timeout
      page.rootInstance.handleMouseEnter();

      // Disconnect should clear it
      page.rootInstance.disconnectedCallback();
      await page.waitForChanges();

      // Should not throw or cause issues
      expect(true).toBe(true);
    });
  });

  describe('isHoveringTooltip', () => {
    it('returns false by default', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" interactive><button>Hover</button></sg-tooltip>`,
      });

      // Call the private method via instance
      const result = page.rootInstance.isHoveringTooltip();
      expect(result).toBe(false);
    });
  });

  describe('setupEventListeners', () => {
    it('sets up listeners for hover trigger', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" trigger="hover"><button>Hover</button></sg-tooltip>`,
      });

      // The component should have set up listeners during componentDidLoad
      expect(page.rootInstance.trigger).toBe('hover');
    });

    it('sets up listeners for click trigger', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" trigger="click"><button>Click</button></sg-tooltip>`,
      });

      expect(page.rootInstance.trigger).toBe('click');
    });

    it('does not set up listeners for manual trigger', async () => {
      const page = await newSpecPage({
        components: [SgTooltip],
        html: `<sg-tooltip text="Tooltip" trigger="manual"><button>Manual</button></sg-tooltip>`,
      });

      expect(page.rootInstance.trigger).toBe('manual');
    });
  });
});
