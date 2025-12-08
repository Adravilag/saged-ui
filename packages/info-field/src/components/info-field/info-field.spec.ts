import { newSpecPage } from '@stencil/core/testing';
import { InfoField } from './info-field';

describe('sg-info-field', () => {
  describe('rendering', () => {
    it('renders with default props', async () => {
      const page = await newSpecPage({
        components: [InfoField],
        html: `<sg-info-field></sg-info-field>`,
      });

      expect(page.root).toBeTruthy();
      expect(page.root.shadowRoot.querySelector('.info-field')).toBeTruthy();
    });

    it('renders label correctly', async () => {
      const page = await newSpecPage({
        components: [InfoField],
        html: `<sg-info-field label="Name"></sg-info-field>`,
      });

      const label = page.root.shadowRoot.querySelector('.info-label');
      expect(label.textContent).toBe('Name');
    });

    it('renders value correctly', async () => {
      const page = await newSpecPage({
        components: [InfoField],
        html: `<sg-info-field label="Name" value="John Doe"></sg-info-field>`,
      });

      const value = page.root.shadowRoot.querySelector('.info-value');
      expect(value.textContent).toContain('John Doe');
    });

    it('renders empty text when value is not provided', async () => {
      const page = await newSpecPage({
        components: [InfoField],
        html: `<sg-info-field label="Name"></sg-info-field>`,
      });

      const value = page.root.shadowRoot.querySelector('.info-value');
      expect(value.textContent).toContain('No especificado');
    });

    it('renders custom empty text', async () => {
      const page = await newSpecPage({
        components: [InfoField],
        html: `<sg-info-field label="Name" empty-text="N/A"></sg-info-field>`,
      });

      const value = page.root.shadowRoot.querySelector('.info-value');
      expect(value.textContent).toContain('N/A');
    });
  });

  describe('type: text', () => {
    it('renders text value', async () => {
      const page = await newSpecPage({
        components: [InfoField],
        html: `<sg-info-field label="Email" value="test@example.com" type="text"></sg-info-field>`,
      });

      const value = page.root.shadowRoot.querySelector('.info-value');
      expect(value.textContent).toContain('test@example.com');
    });
  });

  describe('type: date', () => {
    it('formats date correctly', async () => {
      const page = await newSpecPage({
        components: [InfoField],
        html: `<sg-info-field label="Created" value="2024-01-15" type="date"></sg-info-field>`,
      });

      const value = page.root.shadowRoot.querySelector('.info-value');
      // Date format depends on locale, just check it's not the ISO format
      expect(value.textContent).not.toContain('2024-01-15');
    });

    it('shows empty text for invalid date', async () => {
      const page = await newSpecPage({
        components: [InfoField],
        html: `<sg-info-field label="Created" type="date"></sg-info-field>`,
      });

      const value = page.root.shadowRoot.querySelector('.info-value');
      expect(value.textContent).toContain('No especificado');
    });
  });

  describe('type: datetime', () => {
    it('formats datetime with time', async () => {
      const page = await newSpecPage({
        components: [InfoField],
        html: `<sg-info-field label="Updated" value="2024-01-15T14:30:00" type="datetime"></sg-info-field>`,
      });

      const value = page.root.shadowRoot.querySelector('.info-value');
      expect(value.textContent.length).toBeGreaterThan(10); // Should include time
    });
  });

  describe('type: status', () => {
    it('renders status badge', async () => {
      const page = await newSpecPage({
        components: [InfoField],
        html: `<sg-info-field label="Status" value="active" type="status"></sg-info-field>`,
      });

      const badge = page.root.shadowRoot.querySelector('.status-badge');
      expect(badge).toBeTruthy();
      expect(badge.textContent).toContain('Activo');
    });

    it('renders different status styles', async () => {
      const statuses = ['active', 'inactive', 'pending', 'draft', 'completed', 'cancelled'];
      
      for (const status of statuses) {
        const page = await newSpecPage({
          components: [InfoField],
          html: `<sg-info-field label="Status" value="${status}" type="status"></sg-info-field>`,
        });

        const badge = page.root.shadowRoot.querySelector('.status-badge');
        expect(badge).toBeTruthy();
      }
    });

    it('handles unknown status gracefully', async () => {
      const page = await newSpecPage({
        components: [InfoField],
        html: `<sg-info-field label="Status" value="unknown" type="status"></sg-info-field>`,
      });

      const badge = page.root.shadowRoot.querySelector('.status-badge');
      expect(badge).toBeTruthy();
      expect(badge.textContent).toContain('unknown');
    });
  });

  describe('type: currency', () => {
    it('formats currency with default symbol', async () => {
      const page = await newSpecPage({
        components: [InfoField],
        html: `<sg-info-field label="Price" value="99.99" type="currency"></sg-info-field>`,
      });

      const value = page.root.shadowRoot.querySelector('.info-value');
      expect(value.textContent).toContain('€');
      expect(value.textContent).toContain('99.99');
    });

    it('uses custom currency symbol', async () => {
      const page = await newSpecPage({
        components: [InfoField],
        html: `<sg-info-field label="Price" value="99.99" type="currency" currency-symbol="$"></sg-info-field>`,
      });

      const value = page.root.shadowRoot.querySelector('.info-value');
      expect(value.textContent).toContain('$');
    });

    it('shows empty text for invalid currency', async () => {
      const page = await newSpecPage({
        components: [InfoField],
        html: `<sg-info-field label="Price" value="invalid" type="currency"></sg-info-field>`,
      });

      const value = page.root.shadowRoot.querySelector('.info-value');
      expect(value.textContent).toContain('No especificado');
    });
  });

  describe('type: boolean', () => {
    it('renders true value', async () => {
      const page = await newSpecPage({
        components: [InfoField],
        html: `<sg-info-field label="Verified" value="true" type="boolean"></sg-info-field>`,
      });

      const value = page.root.shadowRoot.querySelector('.info-value');
      expect(value.textContent).toContain('Sí');
    });

    it('renders false value', async () => {
      const page = await newSpecPage({
        components: [InfoField],
        html: `<sg-info-field label="Verified" type="boolean"></sg-info-field>`,
      });

      const value = page.root.shadowRoot.querySelector('.info-value');
      expect(value.textContent).toContain('No');
    });

    it('uses custom true/false text', async () => {
      const page = await newSpecPage({
        components: [InfoField],
        html: `<sg-info-field label="Active" value="true" type="boolean" true-text="Yes" false-text="No"></sg-info-field>`,
      });

      const value = page.root.shadowRoot.querySelector('.info-value');
      expect(value.textContent).toContain('Yes');
    });
  });

  describe('type: html', () => {
    it('renders HTML content', async () => {
      const page = await newSpecPage({
        components: [InfoField],
        html: `<sg-info-field label="Content" value="<strong>Bold</strong>" type="html"></sg-info-field>`,
      });

      const htmlContent = page.root.shadowRoot.querySelector('.html-content');
      expect(htmlContent).toBeTruthy();
      expect(htmlContent.innerHTML).toContain('<strong>Bold</strong>');
    });
  });

  describe('type: array', () => {
    it('renders array as list', async () => {
      const page = await newSpecPage({
        components: [InfoField],
        html: `<sg-info-field label="Tags" type="array"></sg-info-field>`,
      });

      // Set array value via property
      page.rootInstance.value = ['tag1', 'tag2', 'tag3'];
      await page.waitForChanges();

      const list = page.root.shadowRoot.querySelector('.array-list');
      expect(list).toBeTruthy();
      const items = list.querySelectorAll('li');
      expect(items.length).toBe(3);
    });

    it('shows empty text for empty array', async () => {
      const page = await newSpecPage({
        components: [InfoField],
        html: `<sg-info-field label="Tags" type="array"></sg-info-field>`,
      });

      page.rootInstance.value = [];
      await page.waitForChanges();

      const value = page.root.shadowRoot.querySelector('.info-value');
      expect(value.textContent).toContain('Vacío');
    });
  });
});
