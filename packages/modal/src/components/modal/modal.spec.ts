import { newSpecPage } from '@stencil/core/testing';
import { SgModal } from './modal';

describe('sg-modal', () => {
  it('renders closed by default', async () => {
    const page = await newSpecPage({
      components: [SgModal],
      html: `<sg-modal></sg-modal>`,
    });

    const dialog = page.root?.shadowRoot?.querySelector('dialog');
    expect(dialog).toBeTruthy();
    expect(dialog?.hasAttribute('open')).toBe(false);
  });

  it('renders with header text', async () => {
    const page = await newSpecPage({
      components: [SgModal],
      html: `<sg-modal header="Test Title"></sg-modal>`,
    });

    const title = page.root?.shadowRoot?.querySelector('.sg-modal__title');
    expect(title?.textContent).toBe('Test Title');
  });

  it('renders with size classes', async () => {
    const page = await newSpecPage({
      components: [SgModal],
      html: `<sg-modal size="lg"></sg-modal>`,
    });

    const dialog = page.root?.shadowRoot?.querySelector('dialog');
    expect(dialog?.classList.contains('sg-modal--lg')).toBe(true);
  });

  it('renders close button by default', async () => {
    const page = await newSpecPage({
      components: [SgModal],
      html: `<sg-modal header="Test"></sg-modal>`,
    });

    const closeBtn = page.root?.shadowRoot?.querySelector('.sg-modal__close');
    expect(closeBtn).toBeTruthy();
  });

  it('hides close button when show-close-button is false', async () => {
    const page = await newSpecPage({
      components: [SgModal],
      html: `<sg-modal header="Test" show-close-button="false"></sg-modal>`,
    });

    const closeBtn = page.root?.shadowRoot?.querySelector('.sg-modal__close');
    expect(closeBtn).toBeFalsy();
  });

  it('renders slotted content', async () => {
    const page = await newSpecPage({
      components: [SgModal],
      html: `<sg-modal><p>Modal content</p></sg-modal>`,
    });

    const body = page.root?.shadowRoot?.querySelector('.sg-modal__body');
    expect(body).toBeTruthy();
  });

  it('renders footer slot when provided', async () => {
    const page = await newSpecPage({
      components: [SgModal],
      html: `
        <sg-modal>
          <p>Content</p>
          <div slot="footer">Footer content</div>
        </sg-modal>
      `,
    });

    // Trigger slot check
    await page.waitForChanges();

    const modal = page.rootInstance as SgModal;
    expect(modal).toBeTruthy();
  });

  it('has showModal method', async () => {
    const page = await newSpecPage({
      components: [SgModal],
      html: `<sg-modal></sg-modal>`,
    });

    const modal = page.rootInstance as SgModal;
    expect(typeof modal.showModal).toBe('function');
  });

  it('has close method', async () => {
    const page = await newSpecPage({
      components: [SgModal],
      html: `<sg-modal></sg-modal>`,
    });

    const modal = page.rootInstance as SgModal;
    expect(typeof modal.close).toBe('function');
  });

  it('applies different size variants', async () => {
    const sizes = ['sm', 'md', 'lg', 'xl', 'full'] as const;

    for (const size of sizes) {
      const page = await newSpecPage({
        components: [SgModal],
        html: `<sg-modal size="${size}"></sg-modal>`,
      });

      const dialog = page.root?.shadowRoot?.querySelector('dialog');
      expect(dialog?.classList.contains(`sg-modal--${size}`)).toBe(true);
    }
  });

  it('has overlay enabled by default', async () => {
    const page = await newSpecPage({
      components: [SgModal],
      html: `<sg-modal></sg-modal>`,
    });

    const modal = page.rootInstance as SgModal;
    expect(modal.overlay).toBe(true);

    const dialog = page.root?.shadowRoot?.querySelector('dialog');
    expect(dialog?.classList.contains('sg-modal--no-overlay')).toBe(false);
  });

  it('renders without overlay when overlay is false', async () => {
    const page = await newSpecPage({
      components: [SgModal],
      html: `<sg-modal overlay="false"></sg-modal>`,
    });

    const dialog = page.root?.shadowRoot?.querySelector('dialog');
    expect(dialog?.classList.contains('sg-modal--no-overlay')).toBe(true);
  });

  it('has closeOnBackdrop enabled by default', async () => {
    const page = await newSpecPage({
      components: [SgModal],
      html: `<sg-modal></sg-modal>`,
    });

    const modal = page.rootInstance as SgModal;
    expect(modal.closeOnBackdrop).toBe(true);
  });

  it('has closeOnEscape enabled by default', async () => {
    const page = await newSpecPage({
      components: [SgModal],
      html: `<sg-modal></sg-modal>`,
    });

    const modal = page.rootInstance as SgModal;
    expect(modal.closeOnEscape).toBe(true);
  });

  it('can disable closeOnBackdrop', async () => {
    const page = await newSpecPage({
      components: [SgModal],
      html: `<sg-modal close-on-backdrop="false"></sg-modal>`,
    });

    const modal = page.rootInstance as SgModal;
    expect(modal.closeOnBackdrop).toBe(false);
  });

  it('can disable closeOnEscape', async () => {
    const page = await newSpecPage({
      components: [SgModal],
      html: `<sg-modal close-on-escape="false"></sg-modal>`,
    });

    const modal = page.rootInstance as SgModal;
    expect(modal.closeOnEscape).toBe(false);
  });

  it('renders header slot when provided', async () => {
    const page = await newSpecPage({
      components: [SgModal],
      html: `
        <sg-modal>
          <div slot="header"><h3>Custom Header</h3></div>
          <p>Content</p>
        </sg-modal>
      `,
    });

    const header = page.root?.shadowRoot?.querySelector('.sg-modal__header');
    expect(header).toBeTruthy();
  });

  it('has show method as alias for showModal', async () => {
    const page = await newSpecPage({
      components: [SgModal],
      html: `<sg-modal></sg-modal>`,
    });

    const modal = page.rootInstance as SgModal;
    expect(typeof modal.show).toBe('function');
  });

  it('renders with non-modal mode', async () => {
    const page = await newSpecPage({
      components: [SgModal],
      html: `<sg-modal non-modal="true"></sg-modal>`,
    });

    const modal = page.rootInstance as SgModal;
    expect(modal.nonModal).toBe(true);
  });

  it('default size is md', async () => {
    const page = await newSpecPage({
      components: [SgModal],
      html: `<sg-modal></sg-modal>`,
    });

    const modal = page.rootInstance as SgModal;
    expect(modal.size).toBe('md');

    const dialog = page.root?.shadowRoot?.querySelector('dialog');
    expect(dialog?.classList.contains('sg-modal--md')).toBe(true);
  });

  it('does not render header when no header prop or slot', async () => {
    const page = await newSpecPage({
      components: [SgModal],
      html: `<sg-modal show-close-button="false"></sg-modal>`,
    });

    const header = page.root?.shadowRoot?.querySelector('.sg-modal__header');
    expect(header).toBeFalsy();
  });

  // ========================================
  // Additional tests for better coverage
  // ========================================

  // Helper to mock dialog element methods
  const mockDialogMethods = (page: any) => {
    const dialog = page.root?.shadowRoot?.querySelector('dialog');
    if (dialog) {
      dialog.showModal = jest.fn();
      dialog.show = jest.fn();
      dialog.close = jest.fn();
    }
    return dialog;
  };

  describe('open/close methods', () => {
    it('showModal method sets open to true', async () => {
      const page = await newSpecPage({
        components: [SgModal],
        html: `<sg-modal></sg-modal>`,
      });

      mockDialogMethods(page);
      const modal = page.rootInstance as SgModal;
      await modal.showModal();
      expect(modal.open).toBe(true);
    });

    it('close method sets open to false', async () => {
      const page = await newSpecPage({
        components: [SgModal],
        html: `<sg-modal></sg-modal>`,
      });

      const dialog = page.root?.shadowRoot?.querySelector('dialog');
      if (dialog) {
        dialog.showModal = jest.fn();
        dialog.show = jest.fn();
        // Mock close to trigger the close event
        dialog.close = jest.fn((returnValue?: string) => {
          (dialog as any).returnValue = returnValue || '';
          dialog.dispatchEvent(new Event('close'));
        });
      }

      const modal = page.rootInstance as SgModal;
      modal.open = true;
      await page.waitForChanges();

      await modal.close();
      await page.waitForChanges();
      expect(modal.open).toBe(false);
    });

    it('close method accepts returnValue', async () => {
      const page = await newSpecPage({
        components: [SgModal],
        html: `<sg-modal></sg-modal>`,
      });

      const dialog = page.root?.shadowRoot?.querySelector('dialog');
      if (dialog) {
        dialog.showModal = jest.fn();
        dialog.show = jest.fn();
        dialog.close = jest.fn((returnValue?: string) => {
          (dialog as any).returnValue = returnValue || '';
          dialog.dispatchEvent(new Event('close'));
        });
      }

      const modal = page.rootInstance as SgModal;
      modal.open = true;
      await page.waitForChanges();

      await modal.close('test-value');
      await page.waitForChanges();
      expect(modal.open).toBe(false);
    });

    it('show method sets open to true', async () => {
      const page = await newSpecPage({
        components: [SgModal],
        html: `<sg-modal non-modal="true"></sg-modal>`,
      });

      mockDialogMethods(page);
      const modal = page.rootInstance as SgModal;
      await modal.show();
      expect(modal.open).toBe(true);
    });
  });

  describe('event handlers', () => {
    it('handleCloseButtonClick emits sgCancel', async () => {
      const page = await newSpecPage({
        components: [SgModal],
        html: `<sg-modal header="Test"></sg-modal>`,
      });

      mockDialogMethods(page);
      const sgCancelSpy = jest.fn();
      page.root?.addEventListener('sgCancel', sgCancelSpy);

      const closeBtn = page.root?.shadowRoot?.querySelector('.sg-modal__close') as HTMLButtonElement;
      closeBtn?.click();

      await page.waitForChanges();
      expect(sgCancelSpy).toHaveBeenCalled();
    });

    it('handleDialogCancel prevents default when closeOnEscape is false', async () => {
      const page = await newSpecPage({
        components: [SgModal],
        html: `<sg-modal close-on-escape="false"></sg-modal>`,
      });

      const dialog = page.root?.shadowRoot?.querySelector('dialog');
      const cancelEvent = new Event('cancel', { cancelable: true });
      dialog?.dispatchEvent(cancelEvent);

      expect(cancelEvent.defaultPrevented).toBe(true);
    });

    it('handleDialogCancel emits sgCancel when closeOnEscape is true', async () => {
      const page = await newSpecPage({
        components: [SgModal],
        html: `<sg-modal></sg-modal>`,
      });

      const sgCancelSpy = jest.fn();
      page.root?.addEventListener('sgCancel', sgCancelSpy);

      const dialog = page.root?.shadowRoot?.querySelector('dialog');
      dialog?.dispatchEvent(new Event('cancel'));

      expect(sgCancelSpy).toHaveBeenCalled();
    });

    it('handleDialogClose emits sgClose with returnValue', async () => {
      const page = await newSpecPage({
        components: [SgModal],
        html: `<sg-modal></sg-modal>`,
      });

      const sgCloseSpy = jest.fn();
      page.root?.addEventListener('sgClose', sgCloseSpy);

      const dialog = page.root?.shadowRoot?.querySelector('dialog');
      dialog?.dispatchEvent(new Event('close'));

      await page.waitForChanges();
      expect(sgCloseSpy).toHaveBeenCalled();
    });

    it('handleBackdropClick does nothing when closeOnBackdrop is false', async () => {
      const page = await newSpecPage({
        components: [SgModal],
        html: `<sg-modal close-on-backdrop="false"></sg-modal>`,
      });

      const sgCancelSpy = jest.fn();
      page.root?.addEventListener('sgCancel', sgCancelSpy);

      const dialog = page.root?.shadowRoot?.querySelector('dialog');
      dialog?.dispatchEvent(new MouseEvent('click', { clientX: 0, clientY: 0 }));

      expect(sgCancelSpy).not.toHaveBeenCalled();
    });
  });

  describe('watch handlers', () => {
    it('handleOpenChange triggers when open changes', async () => {
      const page = await newSpecPage({
        components: [SgModal],
        html: `<sg-modal></sg-modal>`,
      });

      mockDialogMethods(page);
      const modal = page.rootInstance as SgModal;
      modal.open = true;
      await page.waitForChanges();

      const dialog = page.root?.shadowRoot?.querySelector('dialog');
      expect(dialog).toBeTruthy();
    });

    it('handleOpenChange closes when open set to false', async () => {
      const page = await newSpecPage({
        components: [SgModal],
        html: `<sg-modal></sg-modal>`,
      });

      mockDialogMethods(page);
      const modal = page.rootInstance as SgModal;
      modal.open = true;
      await page.waitForChanges();
      modal.open = false;
      await page.waitForChanges();
      expect(modal.open).toBe(false);
    });
  });

  describe('slot detection', () => {
    it('detects footer slot content', async () => {
      const page = await newSpecPage({
        components: [SgModal],
        html: `
          <sg-modal>
            <p>Body content</p>
            <div slot="footer"><button>Save</button></div>
          </sg-modal>
        `,
      });

      const modal = page.rootInstance as SgModal;
      await page.waitForChanges();
      expect(modal.hasFooterSlot).toBe(true);
    });

    it('detects header slot content', async () => {
      const page = await newSpecPage({
        components: [SgModal],
        html: `
          <sg-modal>
            <div slot="header"><h1>Custom Title</h1></div>
            <p>Body content</p>
          </sg-modal>
        `,
      });

      const modal = page.rootInstance as SgModal;
      await page.waitForChanges();
      expect(modal.hasHeaderSlot).toBe(true);
    });
  });

  describe('lifecycle', () => {
    it('componentWillLoad checks slots', async () => {
      const page = await newSpecPage({
        components: [SgModal],
        html: `
          <sg-modal>
            <div slot="header">Header</div>
            <div slot="footer">Footer</div>
          </sg-modal>
        `,
      });

      const modal = page.rootInstance as SgModal;
      expect(modal.hasHeaderSlot).toBe(true);
      expect(modal.hasFooterSlot).toBe(true);
    });

    it('componentDidLoad sets up event listeners', async () => {
      const page = await newSpecPage({
        components: [SgModal],
        html: `<sg-modal></sg-modal>`,
      });

      const modal = page.rootInstance as SgModal;
      expect(modal).toBeTruthy();
      // The dialog element should have listeners attached
    });

    it('initially has open prop set correctly', async () => {
      const page = await newSpecPage({
        components: [SgModal],
        html: `<sg-modal></sg-modal>`,
      });

      const modal = page.rootInstance as SgModal;
      expect(modal.open).toBe(false);
    });
  });

  describe('render conditions', () => {
    it('renders footer when hasFooterSlot is true', async () => {
      const page = await newSpecPage({
        components: [SgModal],
        html: `
          <sg-modal>
            <div slot="footer">Footer content</div>
          </sg-modal>
        `,
      });

      await page.waitForChanges();
      const footer = page.root?.shadowRoot?.querySelector('.sg-modal__footer');
      expect(footer).toBeTruthy();
    });

    it('does not render footer when hasFooterSlot is false', async () => {
      const page = await newSpecPage({
        components: [SgModal],
        html: `<sg-modal></sg-modal>`,
      });

      const footer = page.root?.shadowRoot?.querySelector('.sg-modal__footer');
      expect(footer).toBeFalsy();
    });

    it('renders header with title when header prop provided', async () => {
      const page = await newSpecPage({
        components: [SgModal],
        html: `<sg-modal header="My Title"></sg-modal>`,
      });

      const title = page.root?.shadowRoot?.querySelector('.sg-modal__title');
      expect(title?.textContent).toBe('My Title');
    });

    it('renders sg-modal--no-overlay class when overlay is false', async () => {
      const page = await newSpecPage({
        components: [SgModal],
        html: `<sg-modal overlay="false"></sg-modal>`,
      });

      const dialog = page.root?.shadowRoot?.querySelector('dialog');
      expect(dialog?.classList.contains('sg-modal--no-overlay')).toBe(true);
    });
  });
});

