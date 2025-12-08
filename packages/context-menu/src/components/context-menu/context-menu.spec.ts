import { newSpecPage } from '@stencil/core/testing';
import { ContextMenu } from './context-menu';

describe('sg-context-menu', () => {
  describe('rendering', () => {
    it('renders but is not visible by default', async () => {
      const page = await newSpecPage({
        components: [ContextMenu],
        html: `<sg-context-menu></sg-context-menu>`,
      });

      expect(page.root).toBeTruthy();
      const menu = page.root.shadowRoot.querySelector('.context-menu');
      expect(menu).toBeFalsy(); // Not visible when closed
    });

    it('renders menu items when visible', async () => {
      const page = await newSpecPage({
        components: [ContextMenu],
        html: `<sg-context-menu></sg-context-menu>`,
      });

      page.rootInstance.items = [
        { id: 'edit', label: 'Edit' },
        { id: 'delete', label: 'Delete' },
      ];
      await page.rootInstance.show(100, 100);
      await page.waitForChanges();

      const menu = page.root.shadowRoot.querySelector('.context-menu');
      expect(menu).toBeTruthy();
      const items = page.root.shadowRoot.querySelectorAll('.menu-item');
      expect(items.length).toBe(2);
    });
  });

  describe('show/close methods', () => {
    it('shows menu at specified position', async () => {
      const page = await newSpecPage({
        components: [ContextMenu],
        html: `<sg-context-menu></sg-context-menu>`,
      });

      page.rootInstance.items = [{ id: 'test', label: 'Test' }];
      await page.rootInstance.show(150, 200);
      await page.waitForChanges();

      const menu = page.root.shadowRoot.querySelector('.context-menu') as HTMLElement;
      expect(menu).toBeTruthy();
      expect(menu.style.left).toBe('150px');
      expect(menu.style.top).toBe('200px');
    });

    it('closes menu', async () => {
      const page = await newSpecPage({
        components: [ContextMenu],
        html: `<sg-context-menu></sg-context-menu>`,
      });

      page.rootInstance.items = [{ id: 'test', label: 'Test' }];
      await page.rootInstance.show(100, 100);
      await page.waitForChanges();

      let menu = page.root.shadowRoot.querySelector('.context-menu');
      expect(menu).toBeTruthy();

      await page.rootInstance.close();
      await page.waitForChanges();

      menu = page.root.shadowRoot.querySelector('.context-menu');
      expect(menu).toBeFalsy();
    });
  });

  describe('menu items', () => {
    it('renders items with icons', async () => {
      const page = await newSpecPage({
        components: [ContextMenu],
        html: `<sg-context-menu></sg-context-menu>`,
      });

      page.rootInstance.items = [
        { id: 'edit', label: 'Edit', icon: 'edit' },
      ];
      await page.rootInstance.show(100, 100);
      await page.waitForChanges();

      const icon = page.root.shadowRoot.querySelector('sg-icon');
      expect(icon).toBeTruthy();
      expect(icon.getAttribute('name')).toBe('edit');
    });

    it('renders dividers', async () => {
      const page = await newSpecPage({
        components: [ContextMenu],
        html: `<sg-context-menu></sg-context-menu>`,
      });

      page.rootInstance.items = [
        { id: 'edit', label: 'Edit' },
        { id: 'divider1', divider: true, label: '' },
        { id: 'delete', label: 'Delete' },
      ];
      await page.rootInstance.show(100, 100);
      await page.waitForChanges();

      const divider = page.root.shadowRoot.querySelector('.divider');
      expect(divider).toBeTruthy();
    });

    it('renders disabled items', async () => {
      const page = await newSpecPage({
        components: [ContextMenu],
        html: `<sg-context-menu></sg-context-menu>`,
      });

      page.rootInstance.items = [
        { id: 'disabled', label: 'Disabled Item', disabled: true },
      ];
      await page.rootInstance.show(100, 100);
      await page.waitForChanges();

      const item = page.root.shadowRoot.querySelector('.menu-item');
      expect(item).toHaveClass('disabled');
      expect(item.getAttribute('disabled')).not.toBeNull();
    });

    it('renders danger items with special styling', async () => {
      const page = await newSpecPage({
        components: [ContextMenu],
        html: `<sg-context-menu></sg-context-menu>`,
      });

      page.rootInstance.items = [
        { id: 'delete', label: 'Delete', danger: true },
      ];
      await page.rootInstance.show(100, 100);
      await page.waitForChanges();

      const item = page.root.shadowRoot.querySelector('.menu-item');
      expect(item).toHaveClass('danger');
    });
  });

  describe('events', () => {
    it('emits itemClick event when item is clicked', async () => {
      const page = await newSpecPage({
        components: [ContextMenu],
        html: `<sg-context-menu></sg-context-menu>`,
      });

      page.rootInstance.items = [
        { id: 'edit', label: 'Edit' },
      ];
      await page.rootInstance.show(100, 100);
      await page.waitForChanges();

      const itemClickSpy = jest.fn();
      page.root.addEventListener('itemClick', itemClickSpy);

      const item = page.root.shadowRoot.querySelector('.menu-item') as HTMLElement;
      item.click();
      await page.waitForChanges();

      expect(itemClickSpy).toHaveBeenCalled();
      expect(itemClickSpy.mock.calls[0][0].detail).toBe('edit');
    });

    it('emits menuClose event when menu closes', async () => {
      const page = await newSpecPage({
        components: [ContextMenu],
        html: `<sg-context-menu></sg-context-menu>`,
      });

      page.rootInstance.items = [{ id: 'test', label: 'Test' }];
      await page.rootInstance.show(100, 100);
      await page.waitForChanges();

      const closeSpy = jest.fn();
      page.root.addEventListener('menuClose', closeSpy);

      await page.rootInstance.close();
      await page.waitForChanges();

      expect(closeSpy).toHaveBeenCalled();
    });

    it('does not emit itemClick for disabled items', async () => {
      const page = await newSpecPage({
        components: [ContextMenu],
        html: `<sg-context-menu></sg-context-menu>`,
      });

      page.rootInstance.items = [
        { id: 'disabled', label: 'Disabled', disabled: true },
      ];
      await page.rootInstance.show(100, 100);
      await page.waitForChanges();

      const itemClickSpy = jest.fn();
      page.root.addEventListener('itemClick', itemClickSpy);

      const item = page.root.shadowRoot.querySelector('.menu-item') as HTMLElement;
      item.click();
      await page.waitForChanges();

      expect(itemClickSpy).not.toHaveBeenCalled();
    });
  });

  describe('keyboard interaction', () => {
    it('closes on Escape key', async () => {
      const page = await newSpecPage({
        components: [ContextMenu],
        html: `<sg-context-menu></sg-context-menu>`,
      });

      page.rootInstance.items = [{ id: 'test', label: 'Test' }];
      await page.rootInstance.show(100, 100);
      await page.waitForChanges();

      expect(page.root.shadowRoot.querySelector('.context-menu')).toBeTruthy();

      // Simulate Escape key
      page.rootInstance.handleKeyDown(new KeyboardEvent('keydown', { key: 'Escape' }));
      await page.waitForChanges();

      expect(page.root.shadowRoot.querySelector('.context-menu')).toBeFalsy();
    });
  });
});
