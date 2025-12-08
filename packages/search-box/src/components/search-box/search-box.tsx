import { Component, Prop, Event, EventEmitter, State, h } from '@stencil/core';

/**
 * @component sg-search-box
 * @description Search input component with search and clear buttons.
 * Supports Enter key to trigger search and emits events for search actions.
 * 
 * @example
 * <sg-search-box 
 *   placeholder="Search users..." 
 *   search-button-label="Find"
 *   clear-button-label="Clear"
 * ></sg-search-box>
 */
@Component({
  tag: 'sg-search-box',
  styleUrl: 'search-box.css',
  shadow: true,
})
export class SearchBox {
  /**
   * Current search term value
   */
  @Prop({ mutable: true }) value: string = '';

  /**
   * Placeholder text for the input
   */
  @Prop() placeholder: string = 'Buscar...';

  /**
   * Label for search button
   */
  @Prop() searchButtonLabel: string = 'Buscar';

  /**
   * Label for clear button
   */
  @Prop() clearButtonLabel: string = 'Limpiar';

  /**
   * Icon name for search button
   */
  @Prop() searchIcon: string = 'view';

  /**
   * Icon name for clear button
   */
  @Prop() clearIcon: string = 'delete';

  /**
   * Size variant: 'sm' | 'md' | 'lg'
   */
  @Prop() size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Disable the search box
   */
  @Prop() disabled: boolean = false;

  /**
   * Hide search button
   */
  @Prop() hideSearchButton: boolean = false;

  /**
   * Hide clear button
   */
  @Prop() hideClearButton: boolean = false;

  /**
   * Internal state for input value
   */
  @State() internalValue: string = '';

  /**
   * Emitted when search term changes
   */
  @Event() sgInput: EventEmitter<string>;

  /**
   * Emitted when search is triggered (button click or Enter)
   */
  @Event() sgSearch: EventEmitter<string>;

  /**
   * Emitted when clear button is clicked
   */
  @Event() sgClear: EventEmitter<void>;

  componentWillLoad() {
    this.internalValue = this.value;
  }

  private handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.internalValue = target.value;
    this.sgInput.emit(this.internalValue);
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.handleSearch();
    }
  }

  private handleSearch() {
    if (!this.disabled) {
      this.sgSearch.emit(this.internalValue);
    }
  }

  private handleClear() {
    this.internalValue = '';
    this.sgInput.emit('');
    this.sgClear.emit();
  }

  render() {
    return (
      <div class={`search-box search-box--${this.size}`}>
        <input
          type="text"
          class="search-input"
          value={this.internalValue}
          placeholder={this.placeholder}
          disabled={this.disabled}
          onInput={(e) => this.handleInput(e)}
          onKeyDown={(e) => this.handleKeyDown(e)}
          autocomplete="off"
        />
        
        {!this.hideSearchButton && (
          <button
            class="btn btn-primary"
            onClick={() => this.handleSearch()}
            disabled={this.disabled}
          >
            <sg-icon name={this.searchIcon} size="18" color="currentColor"></sg-icon>
            <span>{this.searchButtonLabel}</span>
          </button>
        )}

        {!this.hideClearButton && this.internalValue && (
          <button
            class="btn btn-danger"
            onClick={() => this.handleClear()}
            disabled={this.disabled}
          >
            <sg-icon name={this.clearIcon} size="18" color="currentColor"></sg-icon>
            <span>{this.clearButtonLabel}</span>
          </button>
        )}
      </div>
    );
  }
}
