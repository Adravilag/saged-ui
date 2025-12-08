import { Component, Prop, State, Event, EventEmitter, Listen, h, Method, Watch } from '@stencil/core';

/**
 * @component sg-date-picker
 * @description Calendar date picker with full i18n support.
 * Works as a standalone component or can integrate with form systems.
 *
 * @example
 * <sg-date-picker
 *   value="2024-01-15"
 *   placeholder="Select date..."
 *   locale="es"
 * ></sg-date-picker>
 */
@Component({
  tag: 'sg-date-picker',
  styleUrl: 'date-picker.css',
  shadow: true,
})
export class DatePicker {
  private wrapperEl?: HTMLDivElement;

  /**
   * Current date value in ISO format (YYYY-MM-DD)
   */
  @Prop({ mutable: true }) value: string | null = null;

  /**
   * Placeholder text for input
   */
  @Prop() placeholder: string = 'Seleccionar fecha...';

  /**
   * Disable the date picker
   */
  @Prop() disabled: boolean = false;

  /**
   * Show error state
   */
  @Prop() hasError: boolean = false;

  /**
   * Allow clearing the date
   */
  @Prop() clearable: boolean = true;

  /**
   * Align dropdown to right
   */
  @Prop() alignRight: boolean = false;

  /**
   * Locale for date formatting ('es' | 'en')
   */
  @Prop() locale: 'es' | 'en' = 'es';

  /**
   * Minimum selectable date (ISO format)
   */
  @Prop() minDate?: string;

  /**
   * Maximum selectable date (ISO format)
   */
  @Prop() maxDate?: string;

  @State() showPicker: boolean = false;
  @State() currentMonth: number;
  @State() currentYear: number;

  /**
   * Emitted when date changes
   */
  @Event() sgChange: EventEmitter<string | null>;

  private i18n = {
    es: {
      weekDays: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'],
      months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      today: 'Hoy',
      clear: 'Limpiar',
    },
    en: {
      weekDays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      today: 'Today',
      clear: 'Clear',
    },
  };

  @Watch('value')
  watchValue(newValue: string | null) {
    if (newValue) {
      const [year, month] = newValue.split('-').map(Number);
      if (year && month) {
        this.currentMonth = month - 1;
        this.currentYear = year;
      }
    }
  }

  componentWillLoad() {
    const now = new Date();
    if (this.value) {
      const [year, month] = this.value.split('-').map(Number);
      this.currentMonth = month - 1;
      this.currentYear = year;
    } else {
      this.currentMonth = now.getMonth();
      this.currentYear = now.getFullYear();
    }
  }

  @Listen('click', { target: 'document' })
  handleDocumentClick(event: MouseEvent) {
    if (this.wrapperEl && !this.wrapperEl.contains(event.target as Node)) {
      this.showPicker = false;
    }
  }

  @Listen('keydown', { target: 'document' })
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.showPicker) {
      this.showPicker = false;
    }
  }

  /**
   * Open the date picker
   */
  @Method()
  async open() {
    if (!this.disabled) {
      this.showPicker = true;
    }
  }

  /**
   * Close the date picker
   */
  @Method()
  async close() {
    this.showPicker = false;
  }

  private togglePicker(event?: MouseEvent) {
    if (event) {
      event.stopPropagation();
    }
    if (!this.disabled) {
      this.showPicker = !this.showPicker;
    }
  }

  private getTexts() {
    return this.i18n[this.locale] || this.i18n.es;
  }

  private getFormattedDate(): string {
    if (!this.value) return '';
    const [year, month, day] = this.value.split('-');
    return `${day}/${month}/${year}`;
  }

  private previousMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
  }

  private nextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
  }

  private getCalendarDays(): (number | null)[] {
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);

    // Monday = 0, Sunday = 6
    let startDay = firstDay.getDay() - 1;
    if (startDay < 0) startDay = 6;

    const daysInMonth = lastDay.getDate();
    const days: (number | null)[] = [];

    // Add empty cells for days before month starts
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  }

  private isSelectedDate(day: number): boolean {
    if (!this.value) return false;
    const [year, month, d] = this.value.split('-').map(Number);
    return d === day && month - 1 === this.currentMonth && year === this.currentYear;
  }

  private isToday(day: number): boolean {
    const today = new Date();
    return today.getDate() === day && today.getMonth() === this.currentMonth && today.getFullYear() === this.currentYear;
  }

  private isDisabledDate(day: number): boolean {
    const dateStr = `${this.currentYear}-${String(this.currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    if (this.minDate && dateStr < this.minDate) return true;
    if (this.maxDate && dateStr > this.maxDate) return true;

    return false;
  }

  private selectDate(day: number) {
    if (this.isDisabledDate(day)) return;

    const year = this.currentYear;
    const month = String(this.currentMonth + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');

    this.value = `${year}-${month}-${d}`;
    this.sgChange.emit(this.value);
    this.showPicker = false;
  }

  private selectToday() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    this.value = `${year}-${month}-${day}`;
    this.currentMonth = today.getMonth();
    this.currentYear = today.getFullYear();
    this.sgChange.emit(this.value);
    this.showPicker = false;
  }

  private clearDate() {
    this.value = null;
    this.sgChange.emit(null);
    this.showPicker = false;
  }

  render() {
    const texts = this.getTexts();

    return (
      <div class="date-picker-wrapper" ref={el => (this.wrapperEl = el)}>
        {/* Input Display */}
        <div class="input-wrapper">
          <input
            type="text"
            value={this.getFormattedDate()}
            onClick={e => this.togglePicker(e)}
            readonly
            autocomplete="off"
            placeholder={this.placeholder}
            disabled={this.disabled}
            class={{
              'date-input': true,
              'has-error': this.hasError,
              disabled: this.disabled,
            }}
          />
          <button type="button" class="calendar-btn" onClick={e => this.togglePicker(e)} disabled={this.disabled}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </button>
        </div>

        {/* Date Picker Dropdown */}
        {this.showPicker && (
          <div class={{ 'picker-dropdown': true, 'align-right': this.alignRight }}>
            {/* Header with month/year */}
            <div class="picker-header">
              <button type="button" class="nav-btn" onClick={() => this.previousMonth()}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <span class="month-year">
                {texts.months[this.currentMonth]} {this.currentYear}
              </span>
              <button type="button" class="nav-btn" onClick={() => this.nextMonth()}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>

            {/* Weekday headers */}
            <div class="weekdays">
              {texts.weekDays.map(day => (
                <div class="weekday" key={day}>
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div class="days-grid">
              {this.getCalendarDays().map((day, index) =>
                day ? (
                  <button
                    key={`day-${index}`}
                    type="button"
                    class={{
                      'day-btn': true,
                      selected: this.isSelectedDate(day),
                      today: this.isToday(day),
                      disabled: this.isDisabledDate(day),
                    }}
                    onClick={() => this.selectDate(day)}
                    disabled={this.isDisabledDate(day)}
                  >
                    {day}
                  </button>
                ) : (
                  <div key={`empty-${index}`} class="day-empty"></div>
                )
              )}
            </div>

            {/* Footer */}
            <div class="picker-footer">
              <button type="button" class="footer-btn primary" onClick={() => this.selectToday()}>
                {texts.today}
              </button>
              {this.clearable && this.value && (
                <button type="button" class="footer-btn" onClick={() => this.clearDate()}>
                  {texts.clear}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}
