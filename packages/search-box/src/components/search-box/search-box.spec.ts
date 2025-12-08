import { newSpecPage } from '@stencil/core/testing';
import { SearchBox } from './search-box';

describe('sg-search-box', () => {
  describe('rendering', () => {
    it('renders with default props', async () => {
      const page = await newSpecPage({
        components: [SearchBox],
        html: `<sg-search-box></sg-search-box>`,
      });

      expect(page.root).toBeTruthy();
      expect(page.root.shadowRoot.querySelector('.search-box')).toBeTruthy();
      expect(page.root.shadowRoot.querySelector('.search-input')).toBeTruthy();
    });

    it('renders with custom placeholder', async () => {
      const page = await newSpecPage({
        components: [SearchBox],
        html: `<sg-search-box placeholder="Search users..."></sg-search-box>`,
      });

      const input = page.root.shadowRoot.querySelector('.search-input') as HTMLInputElement;
      expect(input.placeholder).toBe('Search users...');
    });

    it('renders with initial value', async () => {
      const page = await newSpecPage({
        components: [SearchBox],
        html: `<sg-search-box value="test query"></sg-search-box>`,
      });

      const input = page.root.shadowRoot.querySelector('.search-input') as HTMLInputElement;
      expect(input.value).toBe('test query');
    });

    it('renders search button by default', async () => {
      const page = await newSpecPage({
        components: [SearchBox],
        html: `<sg-search-box></sg-search-box>`,
      });

      const searchBtn = page.root.shadowRoot.querySelector('.btn-primary');
      expect(searchBtn).toBeTruthy();
    });
  });

  describe('sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    for (const size of sizes) {
      it(`renders ${size} size correctly`, async () => {
        const page = await newSpecPage({
          components: [SearchBox],
          html: `<sg-search-box size="${size}"></sg-search-box>`,
        });

        const searchBox = page.root.shadowRoot.querySelector('.search-box');
        expect(searchBox).toHaveClass(`search-box--${size}`);
      });
    }
  });

  describe('button visibility', () => {
    it('hides search button when hide-search-button is true', async () => {
      const page = await newSpecPage({
        components: [SearchBox],
        html: `<sg-search-box hide-search-button="true"></sg-search-box>`,
      });

      const searchBtn = page.root.shadowRoot.querySelector('.btn-primary');
      expect(searchBtn).toBeFalsy();
    });

    it('shows clear button only when there is a value', async () => {
      const page = await newSpecPage({
        components: [SearchBox],
        html: `<sg-search-box></sg-search-box>`,
      });

      let clearBtn = page.root.shadowRoot.querySelector('.btn-danger');
      expect(clearBtn).toBeFalsy();

      // Set value
      page.rootInstance.internalValue = 'test';
      await page.waitForChanges();

      clearBtn = page.root.shadowRoot.querySelector('.btn-danger');
      expect(clearBtn).toBeTruthy();
    });

    it('hides clear button when hide-clear-button is true', async () => {
      const page = await newSpecPage({
        components: [SearchBox],
        html: `<sg-search-box value="test" hide-clear-button="true"></sg-search-box>`,
      });

      const clearBtn = page.root.shadowRoot.querySelector('.btn-danger');
      expect(clearBtn).toBeFalsy();
    });
  });

  describe('disabled state', () => {
    it('disables input when disabled', async () => {
      const page = await newSpecPage({
        components: [SearchBox],
        html: `<sg-search-box disabled="true"></sg-search-box>`,
      });

      const input = page.root.shadowRoot.querySelector('.search-input') as HTMLInputElement;
      expect(input.disabled).toBe(true);
    });

    it('disables search button when disabled', async () => {
      const page = await newSpecPage({
        components: [SearchBox],
        html: `<sg-search-box disabled="true"></sg-search-box>`,
      });

      const searchBtn = page.root.shadowRoot.querySelector('.btn-primary') as HTMLButtonElement;
      expect(searchBtn).toBeTruthy();
      expect(searchBtn.hasAttribute('disabled')).toBe(true);
    });
  });

  describe('custom labels', () => {
    it('renders custom search button label', async () => {
      const page = await newSpecPage({
        components: [SearchBox],
        html: `<sg-search-box search-button-label="Find"></sg-search-box>`,
      });

      const searchBtn = page.root.shadowRoot.querySelector('.btn-primary');
      expect(searchBtn.textContent).toContain('Find');
    });

    it('renders custom clear button label', async () => {
      const page = await newSpecPage({
        components: [SearchBox],
        html: `<sg-search-box value="test" clear-button-label="Reset"></sg-search-box>`,
      });

      const clearBtn = page.root.shadowRoot.querySelector('.btn-danger');
      expect(clearBtn.textContent).toContain('Reset');
    });
  });

  describe('events', () => {
    it('emits sgInput when input value changes', async () => {
      const page = await newSpecPage({
        components: [SearchBox],
        html: `<sg-search-box></sg-search-box>`,
      });

      const inputSpy = jest.fn();
      page.root.addEventListener('sgInput', inputSpy);

      const input = page.root.shadowRoot.querySelector('.search-input') as HTMLInputElement;
      input.value = 'new value';
      input.dispatchEvent(new Event('input'));
      await page.waitForChanges();

      expect(inputSpy).toHaveBeenCalled();
    });

    it('emits sgSearch when search button is clicked', async () => {
      const page = await newSpecPage({
        components: [SearchBox],
        html: `<sg-search-box value="query"></sg-search-box>`,
      });

      const searchSpy = jest.fn();
      page.root.addEventListener('sgSearch', searchSpy);

      const searchBtn = page.root.shadowRoot.querySelector('.btn-primary') as HTMLButtonElement;
      searchBtn.click();
      await page.waitForChanges();

      expect(searchSpy).toHaveBeenCalled();
    });

    it('emits sgSearch when Enter key is pressed', async () => {
      const page = await newSpecPage({
        components: [SearchBox],
        html: `<sg-search-box value="query"></sg-search-box>`,
      });

      const searchSpy = jest.fn();
      page.root.addEventListener('sgSearch', searchSpy);

      const input = page.root.shadowRoot.querySelector('.search-input') as HTMLInputElement;
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      await page.waitForChanges();

      expect(searchSpy).toHaveBeenCalled();
    });

    it('emits sgClear when clear button is clicked', async () => {
      const page = await newSpecPage({
        components: [SearchBox],
        html: `<sg-search-box value="test"></sg-search-box>`,
      });

      const clearSpy = jest.fn();
      page.root.addEventListener('sgClear', clearSpy);

      const clearBtn = page.root.shadowRoot.querySelector('.btn-danger') as HTMLButtonElement;
      clearBtn.click();
      await page.waitForChanges();

      expect(clearSpy).toHaveBeenCalled();
    });

    it('clears input value when clear is clicked', async () => {
      const page = await newSpecPage({
        components: [SearchBox],
        html: `<sg-search-box value="test"></sg-search-box>`,
      });

      const clearBtn = page.root.shadowRoot.querySelector('.btn-danger') as HTMLButtonElement;
      clearBtn.click();
      await page.waitForChanges();

      expect(page.rootInstance.internalValue).toBe('');
    });
  });
});
