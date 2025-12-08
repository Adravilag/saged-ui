import { Component, Prop, State, Event, EventEmitter, Element, Method, Watch, h, Host } from '@stencil/core';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

/**
 * @component sg-modal
 * @description A modern modal dialog component built on the native HTML <dialog> element.
 * Provides built-in accessibility, focus trapping, and backdrop handling.
 *
 * @example
 * <!-- ═══════════════════════════════════════════════════════════════════════════════
 *      VANILLA HTML / JS
 *      ═══════════════════════════════════════════════════════════════════════════════ -->
 * <sg-modal id="myModal" header="Confirm Action">
 *   <p>Are you sure you want to continue?</p>
 *   <div slot="footer">
 *     <sg-button variant="secondary" onclick="document.getElementById('myModal').close()">Cancel</sg-button>
 *     <sg-button variant="primary">Confirm</sg-button>
 *   </div>
 * </sg-modal>
 *
 * <sg-button onclick="document.getElementById('myModal').showModal()">Open Modal</sg-button>
 *
 * <script>
 *   document.getElementById('myModal').addEventListener('sgClose', (e) => {
 *     console.log('Modal closed with:', e.detail);
 *   });
 * </script>
 *
 * <!-- ═══════════════════════════════════════════════════════════════════════════════
 *      ANGULAR
 *      ═══════════════════════════════════════════════════════════════════════════════ -->
 * <sg-modal
 *   #modal
 *   header="Edit Profile"
 *   [attr.open]="isOpen || null"
 *   (sgClose)="onClose($event)"
 *   (sgCancel)="onCancel()">
 *   <form>...</form>
 *   <div slot="footer">
 *     <sg-button (sgClick)="modal.close()">Cancel</sg-button>
 *     <sg-button variant="primary" (sgClick)="save()">Save</sg-button>
 *   </div>
 * </sg-modal>
 *
 * <!-- ═══════════════════════════════════════════════════════════════════════════════
 *      REACT
 *      ═══════════════════════════════════════════════════════════════════════════════ -->
 * <sg-modal
 *   ref={modalRef}
 *   header="Delete Item"
 *   size="sm"
 *   onSgClose={(e) => handleClose(e.detail)}
 *   onSgCancel={() => handleCancel()}>
 *   <p>This action cannot be undone.</p>
 *   <div slot="footer">
 *     <sg-button onClick={() => modalRef.current.close()}>Cancel</sg-button>
 *     <sg-button variant="error" onClick={() => handleDelete()}>Delete</sg-button>
 *   </div>
 * </sg-modal>
 *
 * @slot - Main content of the modal
 * @slot header - Custom header content (overrides header prop)
 * @slot footer - Footer content (typically action buttons)
 *
 * @fires sgOpen - Emitted when the modal opens
 * @fires sgClose - Emitted when the modal closes, detail contains returnValue
 * @fires sgCancel - Emitted when user cancels (Escape or backdrop click)
 *
 * @cssprop --sg-modal-width - Modal width (default: auto based on size)
 * @cssprop --sg-modal-max-width - Modal max width
 * @cssprop --sg-modal-max-height - Modal max height
 * @cssprop --sg-modal-padding - Modal content padding
 * @cssprop --sg-modal-radius - Modal border radius
 * @cssprop --sg-modal-backdrop-color - Backdrop overlay color
 * @cssprop --sg-modal-shadow - Modal box shadow
 */
@Component({
  tag: 'sg-modal',
  styleUrl: 'modal.css',
  shadow: true,
})
export class SgModal {
  @Element() el!: HTMLElement;

  private dialogEl?: HTMLDialogElement;

  /**
   * Whether the modal is open
   */
  @Prop({ reflect: true, mutable: true }) open: boolean = false;

  /**
   * Modal header text
   */
  @Prop() header?: string;

  /**
   * Modal size preset
   */
  @Prop({ reflect: true }) size: ModalSize = 'md';

  /**
   * Whether the modal can be closed by clicking the backdrop
   */
  @Prop({ attribute: 'close-on-backdrop' }) closeOnBackdrop: boolean = true;

  /**
   * Whether the modal can be closed by pressing Escape
   */
  @Prop({ attribute: 'close-on-escape' }) closeOnEscape: boolean = true;

  /**
   * Whether to show the close button in the header
   */
  @Prop({ attribute: 'show-close-button' }) showCloseButton: boolean = true;

  /**
   * Whether the modal is a non-modal dialog (doesn't block interaction)
   */
  @Prop({ attribute: 'non-modal' }) nonModal: boolean = false;

  /**
   * Whether to show the backdrop overlay
   */
  @Prop({ reflect: true }) overlay: boolean = true;

  /**
   * Tracks if header slot has content
   */
  @State() hasHeaderSlot: boolean = false;

  /**
   * Tracks if footer slot has content
   */
  @State() hasFooterSlot: boolean = false;

  /**
   * Emitted when modal opens
   */
  @Event() sgOpen!: EventEmitter<void>;

  /**
   * Emitted when modal closes
   */
  @Event() sgClose!: EventEmitter<string>;

  /**
   * Emitted when modal is cancelled (Escape or backdrop)
   */
  @Event() sgCancel!: EventEmitter<void>;

  @Watch('open')
  handleOpenChange(newValue: boolean) {
    if (newValue) {
      this.openDialog();
    } else {
      this.closeDialog();
    }
  }

  componentWillLoad() {
    this.checkSlots();
  }

  componentDidLoad() {
    // Handle native dialog events
    this.dialogEl?.addEventListener('close', this.handleDialogClose);
    this.dialogEl?.addEventListener('cancel', this.handleDialogCancel);
    this.dialogEl?.addEventListener('click', this.handleBackdropClick);

    // Open if initially open
    if (this.open) {
      this.openDialog();
    }
  }

  disconnectedCallback() {
    this.dialogEl?.removeEventListener('close', this.handleDialogClose);
    this.dialogEl?.removeEventListener('cancel', this.handleDialogCancel);
    this.dialogEl?.removeEventListener('click', this.handleBackdropClick);
  }

  private checkSlots() {
    this.hasHeaderSlot = !!this.el.querySelector('[slot="header"]');
    this.hasFooterSlot = !!this.el.querySelector('[slot="footer"]');
  }

  private openDialog() {
    if (!this.dialogEl) return;

    if (this.nonModal) {
      this.dialogEl.show();
    } else {
      this.dialogEl.showModal();
    }
    this.sgOpen.emit();
  }

  private closeDialog(returnValue?: string) {
    if (!this.dialogEl) return;
    this.dialogEl.close(returnValue);
  }

  private handleDialogClose = () => {
    this.open = false;
    this.sgClose.emit(this.dialogEl?.returnValue || '');
  };

  private handleDialogCancel = (event: Event) => {
    if (!this.closeOnEscape) {
      event.preventDefault();
      return;
    }
    this.sgCancel.emit();
  };

  private handleBackdropClick = (event: MouseEvent) => {
    if (!this.closeOnBackdrop) return;

    // Check if click was on the backdrop (dialog element itself, not content)
    const rect = this.dialogEl?.getBoundingClientRect();
    if (!rect) return;

    const clickedInDialog = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;

    // If clicked outside the visible dialog content (on backdrop)
    if (event.target === this.dialogEl && !clickedInDialog) {
      this.sgCancel.emit();
      this.close();
    }
  };

  private handleCloseButtonClick = () => {
    this.sgCancel.emit();
    this.close();
  };

  /**
   * Opens the modal dialog
   */
  @Method()
  async showModal(): Promise<void> {
    this.open = true;
  }

  /**
   * Opens as non-modal dialog
   */
  @Method()
  async show(): Promise<void> {
    if (!this.dialogEl) return;
    this.dialogEl.show();
    this.open = true;
    this.sgOpen.emit();
  }

  /**
   * Closes the modal dialog
   * @param returnValue - Optional value to pass to the close event
   */
  @Method()
  async close(returnValue?: string): Promise<void> {
    this.closeDialog(returnValue);
  }

  render() {
    const showHeader = this.header || this.hasHeaderSlot || this.showCloseButton;

    return (
      <Host>
        <dialog
          ref={el => (this.dialogEl = el)}
          class={{
            'sg-modal': true,
            [`sg-modal--${this.size}`]: true,
            'sg-modal--no-overlay': !this.overlay,
          }}
          part="dialog"
        >
          {showHeader && (
            <header class="sg-modal__header" part="header">
              <div class="sg-modal__header-content">
                <slot name="header">{this.header && <h2 class="sg-modal__title">{this.header}</h2>}</slot>
              </div>
              {this.showCloseButton && (
                <button type="button" class="sg-modal__close" onClick={this.handleCloseButtonClick} aria-label="Close modal" part="close-button">
                  <sg-icon name="close" size="20"></sg-icon>
                </button>
              )}
            </header>
          )}

          <div class="sg-modal__body" part="body">
            <slot></slot>
          </div>

          {this.hasFooterSlot && (
            <footer class="sg-modal__footer" part="footer">
              <slot name="footer"></slot>
            </footer>
          )}
        </dialog>
      </Host>
    );
  }
}
