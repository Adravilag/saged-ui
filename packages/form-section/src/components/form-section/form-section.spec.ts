import { newSpecPage } from '@stencil/core/testing';
import { FormSection } from './form-section';

describe('sg-form-section', () => {
  describe('rendering', () => {
    it('renders with default props', async () => {
      const page = await newSpecPage({
        components: [FormSection],
        html: `<sg-form-section></sg-form-section>`,
      });

      expect(page.root).toBeTruthy();
      expect(page.root.shadowRoot.querySelector('.form-section')).toBeTruthy();
    });

    it('renders with section title', async () => {
      const page = await newSpecPage({
        components: [FormSection],
        html: `<sg-form-section section-title="Personal Info"></sg-form-section>`,
      });

      const title = page.root.shadowRoot.querySelector('.section-title');
      expect(title).toBeTruthy();
      expect(title.textContent).toBe('Personal Info');
    });

    it('renders slot content correctly', async () => {
      const page = await newSpecPage({
        components: [FormSection],
        html: `<sg-form-section section-title="Test">
          <p>Form content here</p>
        </sg-form-section>`,
      });

      const slot = page.root.shadowRoot.querySelector('slot:not([name])');
      expect(slot).toBeTruthy();
    });

    it('renders icon slot', async () => {
      const page = await newSpecPage({
        components: [FormSection],
        html: `<sg-form-section section-title="Test">
          <span slot="icon">📧</span>
        </sg-form-section>`,
      });

      const iconSlot = page.root.shadowRoot.querySelector('slot[name="icon"]');
      expect(iconSlot).toBeTruthy();
    });
  });

  describe('step indicators', () => {
    it('renders step indicator when both stepNumber and totalSteps are provided', async () => {
      const page = await newSpecPage({
        components: [FormSection],
        html: `<sg-form-section section-title="Step" step-number="1" total-steps="3"></sg-form-section>`,
      });

      const stepIndicator = page.root.shadowRoot.querySelector('.step-indicator');
      expect(stepIndicator).toBeTruthy();
      expect(stepIndicator.textContent).toContain('1');
      expect(stepIndicator.textContent).toContain('3');
    });

    it('does not render step indicator when stepNumber is missing', async () => {
      const page = await newSpecPage({
        components: [FormSection],
        html: `<sg-form-section section-title="Step" total-steps="3"></sg-form-section>`,
      });

      const stepIndicator = page.root.shadowRoot.querySelector('.step-indicator');
      expect(stepIndicator).toBeFalsy();
    });

    it('does not render step indicator when totalSteps is missing', async () => {
      const page = await newSpecPage({
        components: [FormSection],
        html: `<sg-form-section section-title="Step" step-number="1"></sg-form-section>`,
      });

      const stepIndicator = page.root.shadowRoot.querySelector('.step-indicator');
      expect(stepIndicator).toBeFalsy();
    });
  });

  describe('icon background classes', () => {
    const bgClasses = ['bg-blue-100', 'bg-green-100', 'bg-red-100', 'bg-yellow-100'];

    for (const bgClass of bgClasses) {
      it(`applies ${bgClass} to icon wrapper`, async () => {
        const page = await newSpecPage({
          components: [FormSection],
          html: `<sg-form-section section-title="Test" icon-bg-class="${bgClass}"></sg-form-section>`,
        });

        const iconWrapper = page.root.shadowRoot.querySelector('.icon-wrapper');
        expect(iconWrapper).toHaveClass(bgClass);
      });
    }
  });

  describe('collapsible behavior', () => {
    it('renders as non-collapsible by default', async () => {
      const page = await newSpecPage({
        components: [FormSection],
        html: `<sg-form-section section-title="Test"></sg-form-section>`,
      });

      const header = page.root.shadowRoot.querySelector('.section-header');
      expect(header).not.toHaveClass('collapsible');
      const collapseIcon = page.root.shadowRoot.querySelector('.collapse-icon');
      expect(collapseIcon).toBeFalsy();
    });

    it('renders collapse icon when collapsible is true', async () => {
      const page = await newSpecPage({
        components: [FormSection],
        html: `<sg-form-section section-title="Test" collapsible="true"></sg-form-section>`,
      });

      const header = page.root.shadowRoot.querySelector('.section-header');
      expect(header).toHaveClass('collapsible');
      const collapseIcon = page.root.shadowRoot.querySelector('.collapse-icon');
      expect(collapseIcon).toBeTruthy();
    });

    it('hides content when collapsed', async () => {
      const page = await newSpecPage({
        components: [FormSection],
        html: `<sg-form-section section-title="Test" collapsible="true" collapsed="true"></sg-form-section>`,
      });

      const content = page.root.shadowRoot.querySelector('.section-content');
      expect(content).toHaveClass('hidden');
    });

    it('shows content when not collapsed', async () => {
      const page = await newSpecPage({
        components: [FormSection],
        html: `<sg-form-section section-title="Test" collapsible="true" collapsed="false"></sg-form-section>`,
      });

      const content = page.root.shadowRoot.querySelector('.section-content');
      expect(content).not.toHaveClass('hidden');
    });

    it('toggles collapsed state on header click', async () => {
      const page = await newSpecPage({
        components: [FormSection],
        html: `<sg-form-section section-title="Test" collapsible="true"></sg-form-section>`,
      });

      const header = page.root.shadowRoot.querySelector('.section-header') as HTMLElement;
      let content = page.root.shadowRoot.querySelector('.section-content');
      expect(content).not.toHaveClass('hidden');

      header.click();
      await page.waitForChanges();

      content = page.root.shadowRoot.querySelector('.section-content');
      expect(content).toHaveClass('hidden');
    });
  });
});
