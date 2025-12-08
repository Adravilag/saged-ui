import { Component, Prop, State, Event, EventEmitter, Element, Method, Watch, h, Host, Listen } from '@stencil/core';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  group?: string;
  icon?: string;
  description?: string;
  data?: unknown;
}

export type SelectSize = 'sm' | 'md' | 'lg';
export type SelectVariant = 'default' | 'filled' | 'outline' | 'underline';
export type ValidationState = 'default' | 'success' | 'warning' | 'error';

/**
 * @component sg-select
 * @description Advanced select/combobox component with search, multi-select, async loading, and more.
 *
 * @example
 * <!-- Basic usage -->
 * <sg-select label="Country" placeholder="Select a country">
 *   <sg-option value="us">United States</sg-option>
 *   <sg-option value="uk">United Kingdom</sg-option>
 *   <sg-option value="es">Spain</sg-option>
 * </sg-select>
 *
 * <!-- With search -->
 * <sg-select label="Search countries" searchable>
 *   <sg-option value="us">United States</sg-option>
 *   <sg-option value="uk">United Kingdom</sg-option>
 * </sg-select>
 *
 * <!-- Multi-select -->
 * <sg-select label="Select tags" multiple>
 *   <sg-option value="react">React</sg-option>
 *   <sg-option value="vue">Vue</sg-option>
 *   <sg-option value="angular">Angular</sg-option>
 * </sg-select>
 *
 * @slot default - sg-option elements
 * @slot empty - Content to show when no options match search
 * @slot loading - Content to show while loading async options
 *
 * @fires sgChange - Emitted when selection changes
 * @fires sgSearch - Emitted when search query changes (for async loading)
 * @fires sgOpen - Emitted when dropdown opens
 * @fires sgClose - Emitted when dropdown closes
 */
@Component({
  tag: 'sg-select',
  styleUrl: 'select.css',
  shadow: true,
})
export class SgSelect {
  @Element() el!: HTMLElement;

  private inputEl?: HTMLInputElement;
  private listboxEl?: HTMLElement;
  private selectId = `sg-select-${Math.random().toString(36).substring(2, 9)}`;
  private searchTimeout?: ReturnType<typeof setTimeout>;

  // ═══════════════════════════════════════════════════════════════════════════
  // PROPS
  // ═══════════════════════════════════════════════════════════════════════════

  /** Current value (single select) or values (multi-select as JSON array) */
  @Prop({ mutable: true }) value?: string;

  /** Array of selected values for multi-select */
  @Prop({ mutable: true }) values: string[] = [];

  /** Options passed as array (alternative to slots) */
  @Prop() options?: SelectOption[] | string;

  /** Label text */
  @Prop() label?: string;

  /** Placeholder text */
  @Prop() placeholder?: string;

  /** Helper text below the select */
  @Prop({ attribute: 'helper-text' }) helperText?: string;

  /** Error message */
  @Prop({ attribute: 'error-message' }) errorMessage?: string;

  /** Size variant */
  @Prop({ reflect: true }) size: SelectSize = 'md';

  /** Visual variant */
  @Prop({ reflect: true }) variant: SelectVariant = 'default';

  /** Validation state */
  @Prop({ reflect: true, attribute: 'validation-state' }) validationState: ValidationState = 'default';

  /** Allow multiple selections */
  @Prop() multiple: boolean = false;

  /** Enable search/filter functionality */
  @Prop() searchable: boolean = false;

  /** Allow creating new options */
  @Prop() creatable: boolean = false;

  /** Enable async loading (use sgSearch event) */
  @Prop() async: boolean = false;

  /** Show loading indicator */
  @Prop() loading: boolean = false;

  /** Disabled state */
  @Prop({ reflect: true }) disabled: boolean = false;

  /** Required field */
  @Prop({ reflect: true }) required: boolean = false;

  /** Allow clearing selection */
  @Prop() clearable: boolean = false;

  /** Close dropdown after selection (single select) */
  @Prop({ attribute: 'close-on-select' }) closeOnSelect: boolean = true;

  /** Maximum selections for multi-select */
  @Prop({ attribute: 'max-selections' }) maxSelections?: number;

  /** Search debounce delay in ms */
  @Prop({ attribute: 'search-delay' }) searchDelay: number = 300;

  /** No results text */
  @Prop({ attribute: 'no-results-text' }) noResultsText: string = 'No results found';

  /** Loading text */
  @Prop({ attribute: 'loading-text' }) loadingText: string = 'Loading...';

  /** Create option text template (use {query} placeholder) */
  @Prop({ attribute: 'create-text' }) createText: string = 'Create "{query}"';

  // ═══════════════════════════════════════════════════════════════════════════
  // STATE
  // ═══════════════════════════════════════════════════════════════════════════

  @State() isOpen: boolean = false;
  @State() searchQuery: string = '';
  @State() highlightedIndex: number = -1;
  @State() internalOptions: SelectOption[] = [];

  // ═══════════════════════════════════════════════════════════════════════════
  // EVENTS
  // ═══════════════════════════════════════════════════════════════════════════

  @Event() sgChange!: EventEmitter<{ value: string | string[]; option?: SelectOption }>;
  @Event() sgSearch!: EventEmitter<{ query: string }>;
  @Event() sgOpen!: EventEmitter<void>;
  @Event() sgClose!: EventEmitter<void>;
  @Event() sgCreate!: EventEmitter<{ value: string }>;

  // ═══════════════════════════════════════════════════════════════════════════
  // WATCHERS
  // ═══════════════════════════════════════════════════════════════════════════

  @Watch('options')
  handleOptionsChange() {
    this.parseOptions();
  }

  @Watch('isOpen')
  handleOpenChange(newValue: boolean) {
    if (newValue) {
      this.sgOpen.emit();
      this.highlightedIndex = -1;
      if (this.searchable) {
        setTimeout(() => this.inputEl?.focus(), 10);
      }
    } else {
      this.sgClose.emit();
      this.searchQuery = '';
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // LIFECYCLE
  // ═══════════════════════════════════════════════════════════════════════════

  componentWillLoad() {
    this.parseOptions();
    this.collectSlottedOptions();
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // LISTENERS
  // ═══════════════════════════════════════════════════════════════════════════

  @Listen('click', { target: 'document' })
  handleDocumentClick(event: MouseEvent) {
    if (this.isOpen && !this.el.contains(event.target as Node)) {
      this.close();
    }
  }

  @Listen('keydown')
  handleKeyDown(event: KeyboardEvent) {
    if (this.disabled) return;

    const filteredOptions = this.getFilteredOptions();

    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        if (this.isOpen && this.highlightedIndex >= 0) {
          const option = filteredOptions[this.highlightedIndex];
          if (option && !option.disabled) {
            this.selectOption(option);
          }
        } else if (this.isOpen && this.creatable && this.searchQuery) {
          this.createOption(this.searchQuery);
        } else {
          this.toggle();
        }
        break;

      case 'ArrowDown':
        event.preventDefault();
        if (!this.isOpen) {
          this.open();
        } else {
          this.highlightedIndex = Math.min(this.highlightedIndex + 1, filteredOptions.length - 1);
          this.scrollToHighlighted();
        }
        break;

      case 'ArrowUp':
        event.preventDefault();
        if (this.isOpen) {
          this.highlightedIndex = Math.max(this.highlightedIndex - 1, 0);
          this.scrollToHighlighted();
        }
        break;

      case 'Escape':
        if (this.isOpen) {
          event.preventDefault();
          this.close();
        }
        break;

      case 'Tab':
        if (this.isOpen) {
          this.close();
        }
        break;

      case 'Backspace':
        if (this.multiple && !this.searchQuery && this.values.length > 0) {
          this.removeValue(this.values[this.values.length - 1]);
        }
        break;
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // METHODS
  // ═══════════════════════════════════════════════════════════════════════════

  @Method()
  async open(): Promise<void> {
    if (!this.disabled) {
      this.isOpen = true;
    }
  }

  @Method()
  async close(): Promise<void> {
    this.isOpen = false;
  }

  @Method()
  async toggle(): Promise<void> {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  @Method()
  async clear(): Promise<void> {
    if (this.multiple) {
      this.values = [];
      this.sgChange.emit({ value: [] });
    } else {
      this.value = undefined;
      this.sgChange.emit({ value: '' });
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // PRIVATE METHODS
  // ═══════════════════════════════════════════════════════════════════════════

  private parseOptions() {
    if (!this.options) {
      this.internalOptions = [];
      return;
    }
    if (typeof this.options === 'string') {
      try {
        this.internalOptions = JSON.parse(this.options);
      } catch {
        this.internalOptions = [];
      }
    } else {
      this.internalOptions = this.options;
    }
  }

  private collectSlottedOptions() {
    // This will be enhanced to collect sg-option elements from slots
    const slottedOptions = this.el.querySelectorAll('sg-option');
    if (slottedOptions.length > 0) {
      this.internalOptions = Array.from(slottedOptions).map(opt => ({
        value: opt.getAttribute('value') || '',
        label: opt.textContent?.trim() || opt.getAttribute('value') || '',
        disabled: opt.hasAttribute('disabled'),
        icon: opt.getAttribute('icon') || undefined,
        description: opt.getAttribute('description') || undefined,
      }));
    }
  }

  private getFilteredOptions(): SelectOption[] {
    if (!this.searchQuery || !this.searchable) {
      return this.internalOptions;
    }
    const query = this.searchQuery.toLowerCase();
    return this.internalOptions.filter(
      opt => opt.label.toLowerCase().includes(query) || opt.value.toLowerCase().includes(query) || opt.description?.toLowerCase().includes(query)
    );
  }

  private selectOption(option: SelectOption) {
    if (option.disabled) return;

    if (this.multiple) {
      const isSelected = this.values.includes(option.value);
      if (isSelected) {
        this.values = this.values.filter(v => v !== option.value);
      } else {
        if (this.maxSelections && this.values.length >= this.maxSelections) {
          return;
        }
        this.values = [...this.values, option.value];
      }
      this.sgChange.emit({ value: this.values, option });
    } else {
      this.value = option.value;
      this.sgChange.emit({ value: option.value, option });
      if (this.closeOnSelect) {
        this.close();
      }
    }
  }

  private removeValue(value: string) {
    this.values = this.values.filter(v => v !== value);
    this.sgChange.emit({ value: this.values });
  }

  private createOption(query: string) {
    const newOption: SelectOption = {
      value: query,
      label: query,
    };
    this.internalOptions = [...this.internalOptions, newOption];
    this.selectOption(newOption);
    this.sgCreate.emit({ value: query });
    this.searchQuery = '';
  }

  private handleSearchInput = (event: InputEvent) => {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value;
    this.highlightedIndex = 0;

    if (this.async) {
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }
      this.searchTimeout = setTimeout(() => {
        this.sgSearch.emit({ query: this.searchQuery });
      }, this.searchDelay);
    }
  };

  private handleTriggerClick = () => {
    if (!this.disabled) {
      this.toggle();
    }
  };

  private scrollToHighlighted() {
    if (this.listboxEl && this.highlightedIndex >= 0) {
      const highlighted = this.listboxEl.children[this.highlightedIndex] as HTMLElement;
      if (highlighted) {
        highlighted.scrollIntoView({ block: 'nearest' });
      }
    }
  }

  private getDisplayValue(): string {
    if (this.multiple) {
      return '';
    }
    if (!this.value) return '';
    const option = this.internalOptions.find(opt => opt.value === this.value);
    return option?.label || this.value;
  }

  private getSelectedOptions(): SelectOption[] {
    return this.internalOptions.filter(opt => this.values.includes(opt.value));
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════════

  private renderLabel() {
    if (!this.label) return null;
    return (
      <label htmlFor={this.selectId} class="select-label">
        {this.label}
        {this.required && <span class="required-mark">*</span>}
      </label>
    );
  }

  private renderHelperText() {
    const message = this.validationState === 'error' && this.errorMessage ? this.errorMessage : this.helperText;

    if (!message) return null;

    return (
      <div
        class={{
          'select-helper': true,
          [`select-helper--${this.validationState}`]: this.validationState !== 'default',
        }}
      >
        <span>{message}</span>
      </div>
    );
  }

  private renderTags() {
    if (!this.multiple || this.values.length === 0) return null;

    const selectedOptions = this.getSelectedOptions();

    return (
      <div class="select-tags">
        {selectedOptions.map(opt => (
          <span class="select-tag">
            {opt.label}
            <button
              type="button"
              class="select-tag-remove"
              onClick={e => {
                e.stopPropagation();
                this.removeValue(opt.value);
              }}
              aria-label={`Remove ${opt.label}`}
            >
              <sg-svg-icon name="mdi:close" size="12px" />
            </button>
          </span>
        ))}
      </div>
    );
  }

  private renderOptions() {
    const filteredOptions = this.getFilteredOptions();

    if (this.loading) {
      return (
        <div class="select-loading">
          <slot name="loading">
            <sg-svg-icon name="mdi:loading" size="20px" class="spin" />
            <span>{this.loadingText}</span>
          </slot>
        </div>
      );
    }

    if (filteredOptions.length === 0) {
      if (this.creatable && this.searchQuery) {
        return (
          <div class="select-option select-option--create" onClick={() => this.createOption(this.searchQuery)}>
            <sg-svg-icon name="mdi:plus" size="16px" />
            <span>{this.createText.replace('{query}', this.searchQuery)}</span>
          </div>
        );
      }
      return (
        <div class="select-empty">
          <slot name="empty">
            <span>{this.noResultsText}</span>
          </slot>
        </div>
      );
    }

    return filteredOptions.map((option, index) => {
      const isSelected = this.multiple ? this.values.includes(option.value) : this.value === option.value;

      return (
        <div
          class={{
            'select-option': true,
            'select-option--selected': isSelected,
            'select-option--highlighted': index === this.highlightedIndex,
            'select-option--disabled': !!option.disabled,
          }}
          role="option"
          aria-selected={isSelected ? 'true' : 'false'}
          aria-disabled={option.disabled ? 'true' : undefined}
          onClick={() => this.selectOption(option)}
          onMouseEnter={() => (this.highlightedIndex = index)}
        >
          {this.multiple && <span class="select-option-checkbox">{isSelected && <sg-svg-icon name="mdi:check" size="14px" />}</span>}
          {option.icon && <sg-svg-icon name={option.icon} size="16px" class="select-option-icon" />}
          <div class="select-option-content">
            <span class="select-option-label">{option.label}</span>
            {option.description && <span class="select-option-description">{option.description}</span>}
          </div>
          {!this.multiple && isSelected && <sg-svg-icon name="mdi:check" size="16px" class="select-option-check" />}
        </div>
      );
    });
  }

  render() {
    const displayValue = this.getDisplayValue();

    const hostClasses = {
      'sg-select': true,
      [`sg-select--${this.size}`]: true,
      [`sg-select--${this.variant}`]: true,
      [`sg-select--${this.validationState}`]: this.validationState !== 'default',
      'sg-select--open': this.isOpen,
      'sg-select--disabled': this.disabled,
      'sg-select--multiple': this.multiple,
      'sg-select--searchable': this.searchable,
      'sg-select--has-value': this.multiple ? this.values.length > 0 : !!this.value,
    };

    return (
      <Host class={hostClasses}>
        {this.renderLabel()}

        <div class="select-wrapper">
          {/* Trigger */}
          <div
            class="select-trigger"
            onClick={this.handleTriggerClick}
            role="combobox"
            aria-expanded={this.isOpen ? 'true' : 'false'}
            aria-haspopup="listbox"
            aria-controls={`${this.selectId}-listbox`}
            tabIndex={this.disabled ? -1 : 0}
          >
            {this.renderTags()}

            {this.searchable && this.isOpen ? (
              <input
                ref={el => (this.inputEl = el)}
                type="text"
                class="select-search"
                placeholder={this.multiple && this.values.length > 0 ? '' : this.placeholder}
                value={this.searchQuery}
                onInput={this.handleSearchInput}
                onClick={e => e.stopPropagation()}
              />
            ) : (
              <span class={{ 'select-value': true, 'select-placeholder': !displayValue }}>{displayValue || this.placeholder}</span>
            )}

            {/* Clear button */}
            {this.clearable && (this.value || this.values.length > 0) && !this.disabled && (
              <button
                type="button"
                class="select-clear"
                onClick={e => {
                  e.stopPropagation();
                  this.clear();
                }}
                aria-label="Clear selection"
              >
                <sg-svg-icon name="mdi:close-circle" size="16px" />
              </button>
            )}

            {/* Arrow */}
            <span class="select-arrow">
              <sg-svg-icon name="mdi:chevron-down" size="18px" />
            </span>
          </div>

          {/* Dropdown */}
          {this.isOpen && (
            <div
              ref={el => (this.listboxEl = el)}
              class="select-dropdown"
              role="listbox"
              id={`${this.selectId}-listbox`}
              aria-multiselectable={this.multiple ? 'true' : undefined}
            >
              {this.renderOptions()}
            </div>
          )}
        </div>

        {this.renderHelperText()}

        {/* Hidden slot for sg-option elements */}
        <div style={{ display: 'none' }}>
          <slot onSlotchange={() => this.collectSlottedOptions()} />
        </div>
      </Host>
    );
  }
}
