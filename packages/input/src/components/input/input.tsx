import { Component, Prop, State, Event, EventEmitter, Element, Method, Watch, h, Host } from '@stencil/core';

export type InputType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local' | 'select';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  group?: string;
}
export type InputSize = 'sm' | 'md' | 'lg';
export type InputVariant = 'default' | 'filled' | 'outline' | 'underline';
export type ValidationState = 'default' | 'success' | 'warning' | 'error';

/**
 * @component sg-input
 * @description A versatile input component with validation, icons, and multiple variants.
 * Supports all standard HTML input types with enhanced styling and accessibility.
 *
 * @example
 * <!-- ═══════════════════════════════════════════════════════════════════════════════
 *      VANILLA HTML / JS
 *      ═══════════════════════════════════════════════════════════════════════════════ -->
 * <sg-input placeholder="Enter your name"></sg-input>
 * <sg-input type="email" label="Email" required></sg-input>
 * <sg-input type="password" label="Password" leading-icon="lock"></sg-input>
 * <sg-input label="Username" helper-text="Choose a unique username"></sg-input>
 * <sg-input label="Email" validation-state="error" error-message="Invalid email format"></sg-input>
 *
 * <script>
 *   document.querySelector('sg-input').addEventListener('sgInput', (e) => {
 *     console.log('Value changed:', e.detail.value);
 *   });
 * </script>
 *
 * <!-- ═══════════════════════════════════════════════════════════════════════════════
 *      ANGULAR
 *      ═══════════════════════════════════════════════════════════════════════════════ -->
 * <sg-input
 *   label="Email"
 *   type="email"
 *   [attr.value]="email"
 *   [attr.validation-state]="emailError ? 'error' : 'default'"
 *   [attr.error-message]="emailError"
 *   (sgInput)="onEmailChange($event)">
 * </sg-input>
 *
 * <!-- ═══════════════════════════════════════════════════════════════════════════════
 *      REACT
 *      ═══════════════════════════════════════════════════════════════════════════════ -->
 * <sg-input
 *   label="Search"
 *   type="search"
 *   leading-icon="search"
 *   clearable
 *   onSgInput={(e) => setSearch(e.detail.value)}
 * />
 *
 * @slot prefix - Content to show before the input (inside the field)
 * @slot suffix - Content to show after the input (inside the field)
 *
 * @fires sgInput - Emitted when the input value changes
 * @fires sgChange - Emitted when the input loses focus after value change
 * @fires sgFocus - Emitted when the input gains focus
 * @fires sgBlur - Emitted when the input loses focus
 * @fires sgClear - Emitted when the clear button is clicked
 *
 * @cssprop --sg-input-bg - Input background color
 * @cssprop --sg-input-color - Input text color
 * @cssprop --sg-input-border-color - Input border color
 * @cssprop --sg-input-border-radius - Input border radius
 * @cssprop --sg-input-focus-ring - Focus ring color
 */
@Component({
  tag: 'sg-input',
  styleUrl: 'input.css',
  shadow: true,
})
export class SgInput {
  @Element() el!: HTMLElement;

  private inputEl?: HTMLInputElement;
  private inputId = `sg-input-${Math.random().toString(36).substring(2, 9)}`;

  // ═══════════════════════════════════════════════════════════════════════════
  // PROPS
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Input type
   * @attr type
   */
  @Prop() type: InputType = 'text';

  /**
   * Input value
   * @attr value
   */
  @Prop({ mutable: true }) value: string = '';

  /**
   * Input name attribute
   * @attr name
   */
  @Prop() name?: string;

  /**
   * Placeholder text
   * @attr placeholder
   */
  @Prop() placeholder?: string;

  /**
   * Label text displayed above the input
   * @attr label
   */
  @Prop() label?: string;

  /**
   * Helper text displayed below the input
   * @attr helper-text
   */
  @Prop({ attribute: 'helper-text' }) helperText?: string;

  /**
   * Error message (displayed when validation-state is 'error')
   * @attr error-message
   */
  @Prop({ attribute: 'error-message' }) errorMessage?: string;

  /**
   * Input size variant
   * @attr size
   */
  @Prop({ reflect: true }) size: InputSize = 'md';

  /**
   * Visual variant
   * @attr variant
   */
  @Prop({ reflect: true }) variant: InputVariant = 'default';

  /**
   * Validation state
   * @attr validation-state
   */
  @Prop({ reflect: true, attribute: 'validation-state' }) validationState: ValidationState = 'default';

  /**
   * Whether the input is disabled
   * @attr disabled
   */
  @Prop({ reflect: true }) disabled: boolean = false;

  /**
   * Whether the input is readonly
   * @attr readonly
   */
  @Prop({ reflect: true }) readonly: boolean = false;

  /**
   * Whether the input is required
   * @attr required
   */
  @Prop({ reflect: true }) required: boolean = false;

  /**
   * Show clear button when input has value
   * @attr clearable
   */
  @Prop() clearable: boolean = false;

  /**
   * Leading icon name (from sg-icon)
   * @attr leading-icon
   */
  @Prop({ attribute: 'leading-icon' }) leadingIcon?: string;

  /**
   * Trailing icon name (from sg-icon)
   * @attr trailing-icon
   */
  @Prop({ attribute: 'trailing-icon' }) trailingIcon?: string;

  /**
   * Minimum length for text inputs
   * @attr minlength
   */
  @Prop() minlength?: number;

  /**
   * Maximum length for text inputs
   * @attr maxlength
   */
  @Prop() maxlength?: number;

  /**
   * Pattern for validation (regex)
   * @attr pattern
   */
  @Prop() pattern?: string;

  /**
   * Minimum value for number/date inputs
   * @attr min
   */
  @Prop() min?: string | number;

  /**
   * Maximum value for number/date inputs
   * @attr max
   */
  @Prop() max?: string | number;

  /**
   * Step value for number inputs
   * @attr step
   */
  @Prop() step?: string | number;

  /**
   * Autocomplete attribute
   * @attr autocomplete
   */
  @Prop() autocomplete?: string;

  /**
   * Autofocus attribute
   * @attr autofocus
   */
  @Prop() autofocus: boolean = false;

  /**
   * Options for select type (array of {value, label} or JSON string)
   * @attr options
   */
  @Prop() options?: SelectOption[] | string;

  /**
   * Placeholder option for select (shown when no value selected)
   * @attr select-placeholder
   */
  @Prop({ attribute: 'select-placeholder' }) selectPlaceholder?: string;

  // ═══════════════════════════════════════════════════════════════════════════
  // STATE
  // ═══════════════════════════════════════════════════════════════════════════

  @State() hasFocus: boolean = false;
  @State() showPassword: boolean = false;
  @State() touched: boolean = false;

  // ═══════════════════════════════════════════════════════════════════════════
  // EVENTS
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Emitted when the input value changes
   */
  @Event() sgInput!: EventEmitter<{ value: string; event: InputEvent }>;

  /**
   * Emitted when the input loses focus after value change
   */
  @Event() sgChange!: EventEmitter<{ value: string }>;

  /**
   * Emitted when the input gains focus
   */
  @Event() sgFocus!: EventEmitter<void>;

  /**
   * Emitted when the input loses focus
   */
  @Event() sgBlur!: EventEmitter<void>;

  /**
   * Emitted when the clear button is clicked
   */
  @Event() sgClear!: EventEmitter<void>;

  // ═══════════════════════════════════════════════════════════════════════════
  // WATCHERS
  // ═══════════════════════════════════════════════════════════════════════════

  @Watch('value')
  handleValueChange(newValue: string) {
    if (this.inputEl && this.inputEl.value !== newValue) {
      this.inputEl.value = newValue;
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // METHODS
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Sets focus on the input
   */
  @Method()
  async setFocus(): Promise<void> {
    this.inputEl?.focus();
  }

  /**
   * Removes focus from the input
   */
  @Method()
  async setBlur(): Promise<void> {
    this.inputEl?.blur();
  }

  /**
   * Selects all text in the input
   */
  @Method()
  async select(): Promise<void> {
    this.inputEl?.select();
  }

  /**
   * Clears the input value
   */
  @Method()
  async clear(): Promise<void> {
    this.value = '';
    this.sgClear.emit();
    this.inputEl?.focus();
  }

  /**
   * Returns the native input element
   */
  @Method()
  async getInputElement(): Promise<HTMLInputElement | undefined> {
    return this.inputEl;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // HANDLERS
  // ═══════════════════════════════════════════════════════════════════════════

  private handleInput = (event: InputEvent) => {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.sgInput.emit({ value: this.value, event });
  };

  private handleSelectChange = (event: Event) => {
    const select = event.target as HTMLSelectElement;
    this.value = select.value;
    this.sgInput.emit({ value: this.value, event: event as InputEvent });
    this.sgChange.emit({ value: this.value });
  };

  private handleChange = () => {
    this.sgChange.emit({ value: this.value });
  };

  private handleFocus = () => {
    this.hasFocus = true;
    this.sgFocus.emit();
  };

  private handleBlur = () => {
    this.hasFocus = false;
    this.touched = true;
    this.sgBlur.emit();
  };

  private handleClear = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    this.clear();
  };

  private togglePassword = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    this.showPassword = !this.showPassword;
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // LIFECYCLE
  // ═══════════════════════════════════════════════════════════════════════════

  componentDidLoad() {
    if (this.autofocus) {
      this.setFocus();
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════════

  private renderLabel() {
    if (!this.label) return null;
    return (
      <label htmlFor={this.inputId} class="input-label">
        {this.label}
        {this.required && <span class="required-mark">*</span>}
      </label>
    );
  }

  private getOptions(): SelectOption[] {
    if (!this.options) return [];
    if (typeof this.options === 'string') {
      try {
        return JSON.parse(this.options);
      } catch {
        return [];
      }
    }
    return this.options;
  }

  private renderHelperText() {
    const message = this.validationState === 'error' && this.errorMessage ? this.errorMessage : this.helperText;

    if (!message) return null;

    return (
      <div
        class={{
          'input-helper': true,
          'input-helper--error': this.validationState === 'error',
          'input-helper--success': this.validationState === 'success',
          'input-helper--warning': this.validationState === 'warning',
        }}
      >
        {this.validationState === 'error' && <sg-icon name="error" size="14" />}
        {this.validationState === 'success' && <sg-icon name="check-circle" size="14" />}
        {this.validationState === 'warning' && <sg-icon name="alert" size="14" />}
        <span>{message}</span>
      </div>
    );
  }

  private renderClearButton() {
    if (!this.clearable || !this.value || this.disabled || this.readonly) return null;
    return (
      <button type="button" class="input-clear" onClick={this.handleClear} tabIndex={-1} aria-label="Clear input">
        <sg-icon name="close" size="16" />
      </button>
    );
  }

  private renderPasswordToggle() {
    if (this.type !== 'password') return null;
    return (
      <button
        type="button"
        class="input-toggle-password"
        onClick={this.togglePassword}
        tabIndex={-1}
        aria-label={this.showPassword ? 'Hide password' : 'Show password'}
      >
        <sg-icon name={this.showPassword ? 'visibility-off' : 'visibility'} size="18" />
      </button>
    );
  }

  render() {
    const inputType = this.type === 'password' && this.showPassword ? 'text' : this.type;

    const hostClasses = {
      'sg-input': true,
      [`sg-input--${this.size}`]: true,
      [`sg-input--${this.variant}`]: true,
      [`sg-input--${this.validationState}`]: this.validationState !== 'default',
      'sg-input--disabled': this.disabled,
      'sg-input--readonly': this.readonly,
      'sg-input--focused': this.hasFocus,
      'sg-input--filled': !!this.value,
      'sg-input--has-label': !!this.label,
      'sg-input--has-leading-icon': !!this.leadingIcon,
      'sg-input--has-trailing-icon': !!this.trailingIcon || this.type === 'password' || this.clearable || this.type === 'select',
      'sg-input--select': this.type === 'select',
    };

    const isSelect = this.type === 'select';
    const selectOptions = isSelect ? this.getOptions() : [];

    return (
      <Host class={hostClasses}>
        {this.renderLabel()}

        <div class="input-wrapper">
          {/* Leading icon */}
          {this.leadingIcon && (
            <span class="input-icon input-icon--leading">
              <sg-icon name={this.leadingIcon} size="18" />
            </span>
          )}

          {/* Prefix slot */}
          <slot name="prefix" />

          {/* Select element */}
          {isSelect ? (
            <select
              id={this.inputId}
              class="input-field input-field--select"
              name={this.name}
              disabled={this.disabled}
              required={this.required}
              aria-invalid={this.validationState === 'error' ? 'true' : undefined}
              aria-describedby={this.helperText || this.errorMessage ? `${this.inputId}-helper` : undefined}
              onChange={this.handleSelectChange}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
            >
              {(this.selectPlaceholder || this.placeholder) && (
                <option value="" disabled selected={!this.value}>
                  {this.selectPlaceholder || this.placeholder}
                </option>
              )}
              {selectOptions.map(opt => (
                <option value={opt.value} disabled={opt.disabled} selected={this.value === opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : (
            /* Input element */
            <input
              ref={el => (this.inputEl = el)}
              id={this.inputId}
              type={inputType}
              class="input-field"
              name={this.name}
              value={this.value}
              placeholder={this.placeholder}
              disabled={this.disabled}
              readOnly={this.readonly}
              required={this.required}
              minLength={this.minlength}
              maxLength={this.maxlength}
              pattern={this.pattern}
              min={this.min}
              max={this.max}
              step={this.step}
              autoComplete={this.autocomplete}
              aria-invalid={this.validationState === 'error' ? 'true' : undefined}
              aria-describedby={this.helperText || this.errorMessage ? `${this.inputId}-helper` : undefined}
              onInput={this.handleInput}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
            />
          )}

          {/* Suffix slot */}
          <slot name="suffix" />

          {/* Clear button */}
          {this.renderClearButton()}

          {/* Password toggle */}
          {this.renderPasswordToggle()}

          {/* Select arrow icon */}
          {isSelect && (
            <span class="input-icon input-icon--trailing input-icon--select-arrow">
              <sg-icon name="mdi:chevron-down" size="18" />
            </span>
          )}

          {/* Trailing icon */}
          {this.trailingIcon && !this.clearable && this.type !== 'password' && !isSelect && (
            <span class="input-icon input-icon--trailing">
              <sg-icon name={this.trailingIcon} size="18" />
            </span>
          )}
        </div>

        {this.renderHelperText()}
      </Host>
    );
  }
}
