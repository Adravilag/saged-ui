import { Component, Prop, State, Event, EventEmitter, Listen, h, Method } from '@stencil/core';

export interface ContextMenuItem {
  id: string;
  label: string;
  icon?: string;
  divider?: boolean;
  disabled?: boolean;
  danger?: boolean;
}

/**
 * @component sg-context-menu
 * @description Floating context menu that appears on right-click or programmatically.
 * Automatically closes on Escape key, click outside, or item selection.
 *
 * @example
 * <sg-context-menu id="myMenu"></sg-context-menu>
 * <script>
 *   const menu = document.getElementById('myMenu');
 *   menu.items = [
 *     { id: 'edit', label: 'Edit', icon: 'edit' },
 *     { id: 'delete', label: 'Delete', icon: 'delete', danger: true }
 *   ];
 *   document.addEventListener('contextmenu', (e) => {
 *     e.preventDefault();
 *     menu.show(e.clientX, e.clientY);
 *   });
 * </script>
 */
@Component({
  tag: 'sg-context-menu',
  styleUrl: 'context-menu.css',
  shadow: true,
})
export class ContextMenu {
  /**
   * Menu items to display
   */
  @Prop() items: ContextMenuItem[] = [];

  /**
   * Whether the menu is visible
   */
  @State() visible: boolean = false;

  /**
   * X position of the menu
   */
  @State() positionX: number = 0;

  /**
   * Y position of the menu
   */
  @State() positionY: number = 0;

  /**
   * Emitted when a menu item is clicked
   */
  @Event() itemClick: EventEmitter<string>;

  /**
   * Emitted when menu is closed
   */
  @Event() menuClose: EventEmitter<void>;

  @Listen('click', { target: 'document' })
  handleDocumentClick() {
    if (this.visible) {
      this.close();
    }
  }

  @Listen('contextmenu', { target: 'document' })
  handleContextMenu(event: MouseEvent) {
    if (this.visible && !event.defaultPrevented) {
      this.close();
    }
  }

  @Listen('keydown', { target: 'document' })
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.visible) {
      this.close();
    }
  }

  /**
   * Show the context menu at the specified position
   */
  @Method()
  async show(x: number, y: number) {
    // Adjust position to keep menu in viewport
    const menuWidth = 200;
    const menuHeight = this.items.length * 40;

    const maxX = window.innerWidth - menuWidth - 10;
    const maxY = window.innerHeight - menuHeight - 10;

    this.positionX = Math.min(x, maxX);
    this.positionY = Math.min(y, maxY);
    this.visible = true;
  }

  /**
   * Close the context menu
   */
  @Method()
  async close() {
    this.visible = false;
    this.menuClose.emit();
  }

  private handleItemClick(item: ContextMenuItem, event: MouseEvent) {
    event.stopPropagation();
    if (!item.disabled && !item.divider) {
      this.itemClick.emit(item.id);
      this.close();
    }
  }

  render() {
    if (!this.visible) {
      return null;
    }

    return (
      <div
        class="context-menu"
        style={{
          top: `${this.positionY}px`,
          left: `${this.positionX}px`,
        }}
        onClick={e => e.stopPropagation()}
      >
        {this.items.map(item => {
          if (item.divider) {
            return <div class="divider" key={`divider-${item.id}`}></div>;
          }

          return (
            <button
              key={item.id}
              class={{
                'menu-item': true,
                disabled: item.disabled,
                danger: item.danger,
              }}
              onClick={e => this.handleItemClick(item, e)}
              disabled={item.disabled}
            >
              {item.icon && <sg-icon name={item.icon} size="16" color="currentColor"></sg-icon>}
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    );
  }
}
