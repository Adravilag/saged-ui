import { Component, Prop, h } from '@stencil/core';

export type InfoFieldType = 'text' | 'date' | 'datetime' | 'status' | 'currency' | 'boolean' | 'html' | 'array' | 'custom';

export interface StatusMapItem {
  label: string;
  bgColor: string;
  textColor: string;
}

/**
 * @component sg-info-field
 * @description Display label-value pairs with automatic formatting based on type.
 * Supports text, dates, status badges, currency, booleans, arrays and custom formatters.
 * 
 * @example
 * <sg-info-field label="Name" value="John Doe"></sg-info-field>
 * <sg-info-field label="Created" value="2024-01-15" type="date"></sg-info-field>
 * <sg-info-field label="Status" value="active" type="status"></sg-info-field>
 * <sg-info-field label="Price" value="99.99" type="currency"></sg-info-field>
 */
@Component({
  tag: 'sg-info-field',
  styleUrl: 'info-field.css',
  shadow: true,
})
export class InfoField {
  /**
   * Label text for the field
   */
  @Prop() label: string = '';

  /**
   * Value to display (can be string, number, boolean, array, etc.)
   */
  @Prop() value: any;

  /**
   * Type of value formatting
   */
  @Prop() type: InfoFieldType = 'text';

  /**
   * Custom status map for status type
   */
  @Prop() statusMap: Record<string, StatusMapItem> = {
    active: { label: 'Activo', bgColor: '#dcfce7', textColor: '#166534' },
    inactive: { label: 'Inactivo', bgColor: '#fee2e2', textColor: '#991b1b' },
    pending: { label: 'Pendiente', bgColor: '#fef3c7', textColor: '#92400e' },
    draft: { label: 'Borrador', bgColor: '#f3f4f6', textColor: '#374151' },
    completed: { label: 'Completado', bgColor: '#dbeafe', textColor: '#1e40af' },
    cancelled: { label: 'Cancelado', bgColor: '#fce7f3', textColor: '#9d174d' },
  };

  /**
   * Currency symbol for currency type
   */
  @Prop() currencySymbol: string = '€';

  /**
   * Date format locale
   */
  @Prop() locale: string = 'es-ES';

  /**
   * Placeholder text when value is empty
   */
  @Prop() emptyText: string = 'No especificado';

  /**
   * Boolean text for true value
   */
  @Prop() trueText: string = 'Sí';

  /**
   * Boolean text for false value
   */
  @Prop() falseText: string = 'No';

  private formatDate(value: any, includeTime: boolean = false): string {
    if (!value) return this.emptyText;
    try {
      const date = new Date(value);
      const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        ...(includeTime && { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      };
      return date.toLocaleDateString(this.locale, options);
    } catch {
      return this.emptyText;
    }
  }

  private formatCurrency(value: any): string {
    if (value === null || value === undefined) return this.emptyText;
    const num = typeof value === 'number' ? value : parseFloat(value);
    if (isNaN(num)) return this.emptyText;
    return `${this.currencySymbol}${num.toFixed(2)}`;
  }

  private getStatusStyle(): { backgroundColor: string; color: string } {
    const statusKey = String(this.value).toLowerCase();
    const status = this.statusMap[statusKey];
    if (status) {
      return { backgroundColor: status.bgColor, color: status.textColor };
    }
    return { backgroundColor: '#f3f4f6', color: '#374151' };
  }

  private getStatusLabel(): string {
    const statusKey = String(this.value).toLowerCase();
    const status = this.statusMap[statusKey];
    return status?.label || this.value;
  }

  private renderValue() {
    switch (this.type) {
      case 'text':
        return (
          <span class={{ missing: !this.value }}>
            {this.value || this.emptyText}
          </span>
        );

      case 'date':
        return (
          <span class={{ missing: !this.value }}>
            {this.formatDate(this.value)}
          </span>
        );

      case 'datetime':
        return (
          <span class={{ missing: !this.value }}>
            {this.formatDate(this.value, true)}
          </span>
        );

      case 'status': {
        const statusStyle = this.getStatusStyle();
        return (
          <span
            class="status-badge"
            style={{
              backgroundColor: statusStyle.backgroundColor,
              color: statusStyle.color,
            }}
          >
            {this.getStatusLabel()}
          </span>
        );
      }

      case 'currency':
        return (
          <span class={{ missing: !this.value }}>
            {this.formatCurrency(this.value)}
          </span>
        );

      case 'boolean':
        return (
          <span class={{ 'text-success': !!this.value, 'text-error': !this.value }}>
            {this.value ? this.trueText : this.falseText}
          </span>
        );

      case 'html':
        return <div class="html-content" innerHTML={this.value}></div>;

      case 'array':
        if (Array.isArray(this.value) && this.value.length > 0) {
          return (
            <ul class="array-list">
              {this.value.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          );
        }
        return <span class="missing">Vacío</span>;

      default:
        return (
          <span class={{ missing: !this.value }}>
            {this.value || this.emptyText}
          </span>
        );
    }
  }

  render() {
    return (
      <div class="info-field">
        <label class="info-label">{this.label}</label>
        <div class="info-value">{this.renderValue()}</div>
      </div>
    );
  }
}
