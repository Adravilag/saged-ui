import { newSpecPage } from '@stencil/core/testing';
import { DatePicker } from './date-picker';

describe('sg-date-picker', () => {
  describe('rendering', () => {
    it('renders with default props', async () => {
      const page = await newSpecPage({
        components: [DatePicker],
        html: `<sg-date-picker></sg-date-picker>`,
      });

      expect(page.root).toBeTruthy();
      expect(page.root.shadowRoot.querySelector('.date-picker-wrapper')).toBeTruthy();
      expect(page.root.shadowRoot.querySelector('.date-input')).toBeTruthy();
    });

    it('renders with custom placeholder', async () => {
      const page = await newSpecPage({
        components: [DatePicker],
        html: `<sg-date-picker placeholder="Pick a date..."></sg-date-picker>`,
      });

      const input = page.root.shadowRoot.querySelector('.date-input') as HTMLInputElement;
      expect(input.placeholder).toBe('Pick a date...');
    });

    it('renders with initial value', async () => {
      const page = await newSpecPage({
        components: [DatePicker],
        html: `<sg-date-picker value="2024-12-25"></sg-date-picker>`,
      });

      const input = page.root.shadowRoot.querySelector('.date-input') as HTMLInputElement;
      expect(input.value).toBe('25/12/2024');
    });

    it('renders calendar icon button', async () => {
      const page = await newSpecPage({
        components: [DatePicker],
        html: `<sg-date-picker></sg-date-picker>`,
      });

      const calendarBtn = page.root.shadowRoot.querySelector('.calendar-btn');
      expect(calendarBtn).toBeTruthy();
    });
  });

  describe('disabled state', () => {
    it('disables input when disabled', async () => {
      const page = await newSpecPage({
        components: [DatePicker],
        html: `<sg-date-picker disabled="true"></sg-date-picker>`,
      });

      const input = page.root.shadowRoot.querySelector('.date-input') as HTMLInputElement;
      expect(input.disabled).toBe(true);
      expect(input).toHaveClass('disabled');
    });

    it('disables calendar button when disabled', async () => {
      const page = await newSpecPage({
        components: [DatePicker],
        html: `<sg-date-picker disabled="true"></sg-date-picker>`,
      });

      const calendarBtn = page.root.shadowRoot.querySelector('.calendar-btn') as HTMLButtonElement;
      expect(calendarBtn.hasAttribute('disabled')).toBe(true);
    });

    it('does not open picker when disabled', async () => {
      const page = await newSpecPage({
        components: [DatePicker],
        html: `<sg-date-picker disabled="true"></sg-date-picker>`,
      });

      await page.rootInstance.open();
      await page.waitForChanges();

      const picker = page.root.shadowRoot.querySelector('.picker-dropdown');
      expect(picker).toBeFalsy();
    });
  });

  describe('error state', () => {
    it('applies error styling when hasError is true', async () => {
      const page = await newSpecPage({
        components: [DatePicker],
        html: `<sg-date-picker has-error="true"></sg-date-picker>`,
      });

      const input = page.root.shadowRoot.querySelector('.date-input');
      expect(input).toHaveClass('has-error');
    });
  });

  describe('picker visibility', () => {
    it('is closed by default', async () => {
      const page = await newSpecPage({
        components: [DatePicker],
        html: `<sg-date-picker></sg-date-picker>`,
      });

      const picker = page.root.shadowRoot.querySelector('.picker-dropdown');
      expect(picker).toBeFalsy();
    });

    it('opens on input click', async () => {
      const page = await newSpecPage({
        components: [DatePicker],
        html: `<sg-date-picker></sg-date-picker>`,
      });

      const input = page.root.shadowRoot.querySelector('.date-input') as HTMLInputElement;
      input.click();
      await page.waitForChanges();

      const picker = page.root.shadowRoot.querySelector('.picker-dropdown');
      expect(picker).toBeTruthy();
    });

    it('opens on calendar button click', async () => {
      const page = await newSpecPage({
        components: [DatePicker],
        html: `<sg-date-picker></sg-date-picker>`,
      });

      const calendarBtn = page.root.shadowRoot.querySelector('.calendar-btn') as HTMLButtonElement;
      calendarBtn.click();
      await page.waitForChanges();

      const picker = page.root.shadowRoot.querySelector('.picker-dropdown');
      expect(picker).toBeTruthy();
    });

    it('opens via open() method', async () => {
      const page = await newSpecPage({
        components: [DatePicker],
        html: `<sg-date-picker></sg-date-picker>`,
      });

      await page.rootInstance.open();
      await page.waitForChanges();

      const picker = page.root.shadowRoot.querySelector('.picker-dropdown');
      expect(picker).toBeTruthy();
    });

    it('closes via close() method', async () => {
      const page = await newSpecPage({
        components: [DatePicker],
        html: `<sg-date-picker></sg-date-picker>`,
      });

      await page.rootInstance.open();
      await page.waitForChanges();
      expect(page.root.shadowRoot.querySelector('.picker-dropdown')).toBeTruthy();

      await page.rootInstance.close();
      await page.waitForChanges();
      expect(page.root.shadowRoot.querySelector('.picker-dropdown')).toBeFalsy();
    });
  });

  describe('locale support', () => {
    it('renders Spanish weekdays by default', async () => {
      const page = await newSpecPage({
        components: [DatePicker],
        html: `<sg-date-picker locale="es"></sg-date-picker>`,
      });

      await page.rootInstance.open();
      await page.waitForChanges();

      const weekdays = page.root.shadowRoot.querySelectorAll('.weekday');
      expect(weekdays[0].textContent).toBe('Lu');
    });

    it('renders English weekdays', async () => {
      const page = await newSpecPage({
        components: [DatePicker],
        html: `<sg-date-picker locale="en"></sg-date-picker>`,
      });

      await page.rootInstance.open();
      await page.waitForChanges();

      const weekdays = page.root.shadowRoot.querySelectorAll('.weekday');
      expect(weekdays[0].textContent).toBe('Mo');
    });

    it('renders Spanish today button', async () => {
      const page = await newSpecPage({
        components: [DatePicker],
        html: `<sg-date-picker locale="es"></sg-date-picker>`,
      });

      await page.rootInstance.open();
      await page.waitForChanges();

      const todayBtn = page.root.shadowRoot.querySelector('.footer-btn.primary');
      expect(todayBtn.textContent).toBe('Hoy');
    });

    it('renders English today button', async () => {
      const page = await newSpecPage({
        components: [DatePicker],
        html: `<sg-date-picker locale="en"></sg-date-picker>`,
      });

      await page.rootInstance.open();
      await page.waitForChanges();

      const todayBtn = page.root.shadowRoot.querySelector('.footer-btn.primary');
      expect(todayBtn.textContent).toBe('Today');
    });
  });

  describe('navigation', () => {
    it('renders month and year in header', async () => {
      const page = await newSpecPage({
        components: [DatePicker],
        html: `<sg-date-picker value="2024-06-15"></sg-date-picker>`,
      });

      await page.rootInstance.open();
      await page.waitForChanges();

      const monthYear = page.root.shadowRoot.querySelector('.month-year');
      expect(monthYear.textContent).toContain('Junio');
      expect(monthYear.textContent).toContain('2024');
    });

    it('navigates to previous month', async () => {
      const page = await newSpecPage({
        components: [DatePicker],
        html: `<sg-date-picker value="2024-06-15"></sg-date-picker>`,
      });

      await page.rootInstance.open();
      await page.waitForChanges();

      const prevBtn = page.root.shadowRoot.querySelectorAll('.nav-btn')[0] as HTMLButtonElement;
      prevBtn.click();
      await page.waitForChanges();

      const monthYear = page.root.shadowRoot.querySelector('.month-year');
      expect(monthYear.textContent).toContain('Mayo');
    });

    it('navigates to next month', async () => {
      const page = await newSpecPage({
        components: [DatePicker],
        html: `<sg-date-picker value="2024-06-15"></sg-date-picker>`,
      });

      await page.rootInstance.open();
      await page.waitForChanges();

      const nextBtn = page.root.shadowRoot.querySelectorAll('.nav-btn')[1] as HTMLButtonElement;
      nextBtn.click();
      await page.waitForChanges();

      const monthYear = page.root.shadowRoot.querySelector('.month-year');
      expect(monthYear.textContent).toContain('Julio');
    });

    it('handles year transition when navigating months', async () => {
      const page = await newSpecPage({
        components: [DatePicker],
        html: `<sg-date-picker value="2024-01-15"></sg-date-picker>`,
      });

      await page.rootInstance.open();
      await page.waitForChanges();

      const prevBtn = page.root.shadowRoot.querySelectorAll('.nav-btn')[0] as HTMLButtonElement;
      prevBtn.click();
      await page.waitForChanges();

      const monthYear = page.root.shadowRoot.querySelector('.month-year');
      expect(monthYear.textContent).toContain('Diciembre');
      expect(monthYear.textContent).toContain('2023');
    });
  });

  describe('date selection', () => {
    it('selects a date', async () => {
      const page = await newSpecPage({
        components: [DatePicker],
        html: `<sg-date-picker value="2024-06-15"></sg-date-picker>`,
      });

      const changeSpy = jest.fn();
      page.root.addEventListener('sgChange', changeSpy);

      await page.rootInstance.open();
      await page.waitForChanges();

      // Find a day button and click it
      const dayBtns = page.root.shadowRoot.querySelectorAll('.day-btn:not(.disabled)');
      expect(dayBtns.length).toBeGreaterThan(0);
      
      const dayBtn = dayBtns[15] as HTMLButtonElement; // Pick a day in the middle
      dayBtn.click();
      await page.waitForChanges();

      // Just verify the event was emitted and value changed
      expect(changeSpy).toHaveBeenCalled();
      expect(page.rootInstance.value).toBeTruthy();
    });

    it('closes picker after selection', async () => {
      const page = await newSpecPage({
        components: [DatePicker],
        html: `<sg-date-picker value="2024-06-15"></sg-date-picker>`,
      });

      await page.rootInstance.open();
      await page.waitForChanges();

      const dayBtns = page.root.shadowRoot.querySelectorAll('.day-btn');
      const day10 = Array.from(dayBtns).find(btn => btn.textContent === '10') as HTMLButtonElement;
      day10.click();
      await page.waitForChanges();

      const picker = page.root.shadowRoot.querySelector('.picker-dropdown');
      expect(picker).toBeFalsy();
    });

    it('selects today', async () => {
      const page = await newSpecPage({
        components: [DatePicker],
        html: `<sg-date-picker></sg-date-picker>`,
      });

      await page.rootInstance.open();
      await page.waitForChanges();

      const todayBtn = page.root.shadowRoot.querySelector('.footer-btn.primary') as HTMLButtonElement;
      todayBtn.click();
      await page.waitForChanges();

      const today = new Date().toISOString().split('T')[0];
      expect(page.rootInstance.value).toBe(today);
    });
  });

  describe('clearable', () => {
    it('shows clear button when clearable and has value', async () => {
      const page = await newSpecPage({
        components: [DatePicker],
        html: `<sg-date-picker value="2024-06-15" clearable="true"></sg-date-picker>`,
      });

      await page.rootInstance.open();
      await page.waitForChanges();

      const clearBtn = page.root.shadowRoot.querySelectorAll('.footer-btn')[1];
      expect(clearBtn).toBeTruthy();
    });

    it('does not show clear button when clearable is false', async () => {
      const page = await newSpecPage({
        components: [DatePicker],
        html: `<sg-date-picker value="2024-06-15" clearable="false"></sg-date-picker>`,
      });

      await page.rootInstance.open();
      await page.waitForChanges();

      const footerBtns = page.root.shadowRoot.querySelectorAll('.footer-btn');
      expect(footerBtns.length).toBe(1); // Only today button
    });

    it('clears value when clear is clicked', async () => {
      const page = await newSpecPage({
        components: [DatePicker],
        html: `<sg-date-picker value="2024-06-15" clearable="true"></sg-date-picker>`,
      });

      const changeSpy = jest.fn();
      page.root.addEventListener('sgChange', changeSpy);

      await page.rootInstance.open();
      await page.waitForChanges();

      const clearBtn = page.root.shadowRoot.querySelectorAll('.footer-btn')[1] as HTMLButtonElement;
      clearBtn.click();
      await page.waitForChanges();

      expect(page.rootInstance.value).toBeNull();
      expect(changeSpy).toHaveBeenCalled();
      expect(changeSpy.mock.calls[0][0].detail).toBeNull();
    });
  });

  describe('min/max date restrictions', () => {
    it('disables dates before minDate', async () => {
      const page = await newSpecPage({
        components: [DatePicker],
        html: `<sg-date-picker value="2024-06-15" min-date="2024-06-10"></sg-date-picker>`,
      });

      await page.rootInstance.open();
      await page.waitForChanges();

      const dayBtns = page.root.shadowRoot.querySelectorAll('.day-btn');
      const day5 = Array.from(dayBtns).find(btn => btn.textContent === '5');
      expect(day5).toHaveClass('disabled');
    });

    it('disables dates after maxDate', async () => {
      const page = await newSpecPage({
        components: [DatePicker],
        html: `<sg-date-picker value="2024-06-15" max-date="2024-06-20"></sg-date-picker>`,
      });

      await page.rootInstance.open();
      await page.waitForChanges();

      const dayBtns = page.root.shadowRoot.querySelectorAll('.day-btn');
      const day25 = Array.from(dayBtns).find(btn => btn.textContent === '25');
      expect(day25).toHaveClass('disabled');
    });
  });

  describe('alignment', () => {
    it('aligns dropdown to right when align-right is true', async () => {
      const page = await newSpecPage({
        components: [DatePicker],
        html: `<sg-date-picker align-right="true"></sg-date-picker>`,
      });

      await page.rootInstance.open();
      await page.waitForChanges();

      const picker = page.root.shadowRoot.querySelector('.picker-dropdown');
      expect(picker).toHaveClass('align-right');
    });
  });
});
