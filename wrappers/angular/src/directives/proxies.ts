/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Output, NgZone } from '@angular/core';

import { ProxyCmp } from './angular-component-lib/utils';

import type { Components } from 'sagebox/components';

import { defineCustomElement as defineSgArticleEditor } from 'sagebox/components/sg-article-editor.js';
import { defineCustomElement as defineSgBadge } from 'sagebox/components/sg-badge.js';
import { defineCustomElement as defineSgBreadcrumb } from 'sagebox/components/sg-breadcrumb.js';
import { defineCustomElement as defineSgBreadcrumbItem } from 'sagebox/components/sg-breadcrumb-item.js';
import { defineCustomElement as defineSgButton } from 'sagebox/components/sg-button.js';
import { defineCustomElement as defineSgCard } from 'sagebox/components/sg-card.js';
import { defineCustomElement as defineSgContextMenu } from 'sagebox/components/sg-context-menu.js';
import { defineCustomElement as defineSgDatePicker } from 'sagebox/components/sg-date-picker.js';
import { defineCustomElement as defineSgDropdown } from 'sagebox/components/sg-dropdown.js';
import { defineCustomElement as defineSgFormSection } from 'sagebox/components/sg-form-section.js';
import { defineCustomElement as defineSgIcon } from 'sagebox/components/sg-icon.js';
import { defineCustomElement as defineSgInfoField } from 'sagebox/components/sg-info-field.js';
import { defineCustomElement as defineSgInput } from 'sagebox/components/sg-input.js';
import { defineCustomElement as defineSgModal } from 'sagebox/components/sg-modal.js';
import { defineCustomElement as defineSgOption } from 'sagebox/components/sg-option.js';
import { defineCustomElement as defineSgOptionGroup } from 'sagebox/components/sg-option-group.js';
import { defineCustomElement as defineSgSearchBox } from 'sagebox/components/sg-search-box.js';
import { defineCustomElement as defineSgSelect } from 'sagebox/components/sg-select.js';
import { defineCustomElement as defineSgSkeleton } from 'sagebox/components/sg-skeleton.js';
import { defineCustomElement as defineSgStatsCard } from 'sagebox/components/sg-stats-card.js';
import { defineCustomElement as defineSgThemeToggle } from 'sagebox/components/sg-theme-toggle.js';
import { defineCustomElement as defineSgTooltip } from 'sagebox/components/sg-tooltip.js';
@ProxyCmp({
  defineCustomElementFn: defineSgArticleEditor,
  inputs: ['availableContentTypes', 'availableModes', 'availableViewModes', 'contentType', 'customTranslations', 'disabled', 'editorAccent', 'editorBg', 'editorBgSecondary', 'editorBgTertiary', 'editorBorder', 'editorBorderRadius', 'editorFontMono', 'editorFontSans', 'editorFontSize', 'editorText', 'editorTextSecondary', 'enableExternalPreview', 'locale', 'minHeight', 'mode', 'placeholder', 'readonly', 'showWordCount', 'spellcheck', 'value', 'viewMode'],
  methods: ['getContent', 'setContent', 'getHtml', 'focusEditor', 'insertAtCursor', 'insertMedia']
})
@Component({
  selector: 'sg-article-editor',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['availableContentTypes', 'availableModes', 'availableViewModes', 'contentType', 'customTranslations', 'disabled', 'editorAccent', 'editorBg', 'editorBgSecondary', 'editorBgTertiary', 'editorBorder', 'editorBorderRadius', 'editorFontMono', 'editorFontSans', 'editorFontSize', 'editorText', 'editorTextSecondary', 'enableExternalPreview', 'locale', 'minHeight', 'mode', 'placeholder', 'readonly', 'showWordCount', 'spellcheck', 'value', 'viewMode'],
  outputs: ['editorChange', 'contentTypeChange', 'viewModeChange', 'editorModeChange', 'mediaLibraryOpen', 'mediaInsert'],
})
export class SgArticleEditor {
  protected el: HTMLSgArticleEditorElement;
  @Output() editorChange = new EventEmitter<CustomEvent<ISgArticleEditorEditorChangeEvent>>();
  @Output() contentTypeChange = new EventEmitter<CustomEvent<ISgArticleEditorContentTypeChangeEvent>>();
  @Output() viewModeChange = new EventEmitter<CustomEvent<ISgArticleEditorViewModeChangeEvent>>();
  @Output() editorModeChange = new EventEmitter<CustomEvent<ISgArticleEditorContentTypeChangeEvent>>();
  @Output() mediaLibraryOpen = new EventEmitter<CustomEvent<void>>();
  @Output() mediaInsert = new EventEmitter<CustomEvent<ISgArticleEditorMediaItem>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { EditorChangeEvent as ISgArticleEditorEditorChangeEvent } from 'sagebox/components';
import type { ContentTypeChangeEvent as ISgArticleEditorContentTypeChangeEvent } from 'sagebox/components';
import type { ViewModeChangeEvent as ISgArticleEditorViewModeChangeEvent } from 'sagebox/components';
import type { MediaItem as ISgArticleEditorMediaItem } from 'sagebox/components';

export declare interface SgArticleEditor extends Components.SgArticleEditor {
  /**
   * Emitted when the content changes
   */
  editorChange: EventEmitter<CustomEvent<ISgArticleEditorEditorChangeEvent>>;
  /**
   * Emitted when the content type changes
   */
  contentTypeChange: EventEmitter<CustomEvent<ISgArticleEditorContentTypeChangeEvent>>;
  /**
   * Emitted when the view mode changes
   */
  viewModeChange: EventEmitter<CustomEvent<ISgArticleEditorViewModeChangeEvent>>;
  /**
   *  @deprecated Use contentTypeChange instead
   */
  editorModeChange: EventEmitter<CustomEvent<ISgArticleEditorContentTypeChangeEvent>>;
  /**
   * Emitted when media library is requested
   */
  mediaLibraryOpen: EventEmitter<CustomEvent<void>>;
  /**
   * Emitted when a media item should be inserted
   */
  mediaInsert: EventEmitter<CustomEvent<ISgArticleEditorMediaItem>>;
}


@ProxyCmp({
  defineCustomElementFn: defineSgBadge,
  inputs: ['clickable', 'dot', 'icon', 'outlined', 'pill', 'pulse', 'size', 'size', 'soft', 'variant', 'variant']
})
@Component({
  selector: 'sg-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['clickable', 'dot', 'icon', 'outlined', 'pill', 'pulse', 'size', 'size', 'soft', 'variant', 'variant'],
})
export class SgBadge {
  protected el: HTMLSgBadgeElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SgBadge extends Components.SgBadge {}


@ProxyCmp({
  defineCustomElementFn: defineSgBreadcrumb,
  inputs: ['collapsible', 'customSeparator', 'maxItems', 'separator', 'showHomeIcon', 'size']
})
@Component({
  selector: 'sg-breadcrumb',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['collapsible', 'customSeparator', 'maxItems', 'separator', 'showHomeIcon', 'size'],
})
export class SgBreadcrumb {
  protected el: HTMLSgBreadcrumbElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SgBreadcrumb extends Components.SgBreadcrumb {}


@ProxyCmp({
  defineCustomElementFn: defineSgBreadcrumbItem,
  inputs: ['active', 'disabled', 'href', 'icon', 'target']
})
@Component({
  selector: 'sg-breadcrumb-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['active', 'disabled', 'href', 'icon', 'target'],
})
export class SgBreadcrumbItem {
  protected el: HTMLSgBreadcrumbItemElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SgBreadcrumbItem extends Components.SgBreadcrumbItem {}


@ProxyCmp({
  defineCustomElementFn: defineSgButton,
  inputs: ['disabled', 'label', 'leadingIcon', 'loading', 'loadingText', 'shape', 'size', 'trailingIcon', 'type', 'variant']
})
@Component({
  selector: 'sg-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'label', 'leadingIcon', 'loading', 'loadingText', 'shape', 'size', 'trailingIcon', 'type', 'variant'],
  outputs: ['sgClick'],
})
export class SgButton {
  protected el: HTMLSgButtonElement;
  @Output() sgClick = new EventEmitter<CustomEvent<MouseEvent>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SgButton extends Components.SgButton {
  /**
   * Click event (emitted when not disabled/loading)
   */
  sgClick: EventEmitter<CustomEvent<MouseEvent>>;
}


@ProxyCmp({
  defineCustomElementFn: defineSgCard,
  inputs: ['actionLabel', 'actionVariant', 'cardTitle', 'clickable', 'disabled', 'flat', 'header', 'hoverable', 'href', 'icon', 'iconColor', 'iconSize', 'loading', 'size', 'subtitle', 'target', 'variant']
})
@Component({
  selector: 'sg-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['actionLabel', 'actionVariant', 'cardTitle', 'clickable', 'disabled', 'flat', 'header', 'hoverable', 'href', 'icon', 'iconColor', 'iconSize', 'loading', 'size', 'subtitle', 'target', 'variant'],
  outputs: ['sgClick', 'sgAction'],
})
export class SgCard {
  protected el: HTMLSgCardElement;
  @Output() sgClick = new EventEmitter<CustomEvent<void>>();
  @Output() sgAction = new EventEmitter<CustomEvent<void>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SgCard extends Components.SgCard {
  /**
   * Emitted when the card is clicked (if clickable)
   */
  sgClick: EventEmitter<CustomEvent<void>>;
  /**
   * Emitted when the action button is clicked
   */
  sgAction: EventEmitter<CustomEvent<void>>;
}


@ProxyCmp({
  defineCustomElementFn: defineSgContextMenu,
  inputs: ['items'],
  methods: ['show', 'close']
})
@Component({
  selector: 'sg-context-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['items'],
  outputs: ['itemClick', 'menuClose'],
})
export class SgContextMenu {
  protected el: HTMLSgContextMenuElement;
  @Output() itemClick = new EventEmitter<CustomEvent<string>>();
  @Output() menuClose = new EventEmitter<CustomEvent<void>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SgContextMenu extends Components.SgContextMenu {
  /**
   * Emitted when a menu item is clicked
   */
  itemClick: EventEmitter<CustomEvent<string>>;
  /**
   * Emitted when menu is closed
   */
  menuClose: EventEmitter<CustomEvent<void>>;
}


@ProxyCmp({
  defineCustomElementFn: defineSgDatePicker,
  inputs: ['alignRight', 'clearable', 'disabled', 'hasError', 'locale', 'maxDate', 'minDate', 'placeholder', 'value'],
  methods: ['open', 'close']
})
@Component({
  selector: 'sg-date-picker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['alignRight', 'clearable', 'disabled', 'hasError', 'locale', 'maxDate', 'minDate', 'placeholder', 'value'],
  outputs: ['sgChange'],
})
export class SgDatePicker {
  protected el: HTMLSgDatePickerElement;
  @Output() sgChange = new EventEmitter<CustomEvent<string | null>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SgDatePicker extends Components.SgDatePicker {
  /**
   * Emitted when date changes
   */
  sgChange: EventEmitter<CustomEvent<string | null>>;
}


@ProxyCmp({
  defineCustomElementFn: defineSgDropdown,
  inputs: ['align', 'align', 'closeOnSelect', 'disabled', 'maxHeight', 'minWidth', 'open', 'position', 'position', 'showBackdrop', 'size'],
  methods: ['openDropdown', 'closeDropdown', 'toggle']
})
@Component({
  selector: 'sg-dropdown',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['align', 'align', 'closeOnSelect', 'disabled', 'maxHeight', 'minWidth', 'open', 'position', 'position', 'showBackdrop', 'size'],
  outputs: ['sgOpen', 'sgClose', 'sgToggle'],
})
export class SgDropdown {
  protected el: HTMLSgDropdownElement;
  @Output() sgOpen = new EventEmitter<CustomEvent<void>>();
  @Output() sgClose = new EventEmitter<CustomEvent<void>>();
  @Output() sgToggle = new EventEmitter<CustomEvent<boolean>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SgDropdown extends Components.SgDropdown {
  /**
   * Emitted when the dropdown opens
   */
  sgOpen: EventEmitter<CustomEvent<void>>;
  /**
   * Emitted when the dropdown closes
   */
  sgClose: EventEmitter<CustomEvent<void>>;
  /**
   * Emitted when the open state changes
   */
  sgToggle: EventEmitter<CustomEvent<boolean>>;
}


@ProxyCmp({
  defineCustomElementFn: defineSgFormSection,
  inputs: ['collapsed', 'collapsible', 'iconBgClass', 'sectionTitle', 'stepNumber', 'totalSteps']
})
@Component({
  selector: 'sg-form-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['collapsed', 'collapsible', 'iconBgClass', 'sectionTitle', 'stepNumber', 'totalSteps'],
})
export class SgFormSection {
  protected el: HTMLSgFormSectionElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SgFormSection extends Components.SgFormSection {}


@ProxyCmp({
  defineCustomElementFn: defineSgIcon,
  inputs: ['color', 'decorative', 'fill', 'flipH', 'flipV', 'height', 'jsonSrc', 'label', 'name', 'rotate', 'showPlaceholder', 'size', 'spin', 'src', 'strokeWidth', 'width'],
  methods: ['registerIcons', 'registerIcon', 'getRegisteredIcons', 'hasIcon']
})
@Component({
  selector: 'sg-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['color', 'decorative', 'fill', 'flipH', 'flipV', 'height', 'jsonSrc', 'label', 'name', 'rotate', 'showPlaceholder', 'size', 'spin', 'src', 'strokeWidth', 'width'],
})
export class SgIcon {
  protected el: HTMLSgIconElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SgIcon extends Components.SgIcon {}


@ProxyCmp({
  defineCustomElementFn: defineSgInfoField,
  inputs: ['currencySymbol', 'emptyText', 'falseText', 'label', 'locale', 'statusMap', 'trueText', 'type', 'value']
})
@Component({
  selector: 'sg-info-field',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['currencySymbol', 'emptyText', 'falseText', 'label', 'locale', 'statusMap', 'trueText', 'type', 'value'],
})
export class SgInfoField {
  protected el: HTMLSgInfoFieldElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SgInfoField extends Components.SgInfoField {}


@ProxyCmp({
  defineCustomElementFn: defineSgInput,
  inputs: ['autocomplete', 'autofocus', 'clearable', 'disabled', 'errorMessage', 'helperText', 'label', 'leadingIcon', 'max', 'maxlength', 'min', 'minlength', 'name', 'options', 'pattern', 'placeholder', 'readonly', 'required', 'selectPlaceholder', 'size', 'step', 'trailingIcon', 'type', 'validationState', 'value', 'variant'],
  methods: ['setFocus', 'setBlur', 'select', 'clear', 'getInputElement']
})
@Component({
  selector: 'sg-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['autocomplete', 'autofocus', 'clearable', 'disabled', 'errorMessage', 'helperText', 'label', 'leadingIcon', 'max', 'maxlength', 'min', 'minlength', 'name', 'options', 'pattern', 'placeholder', 'readonly', 'required', 'selectPlaceholder', 'size', 'step', 'trailingIcon', 'type', 'validationState', 'value', 'variant'],
  outputs: ['sgInput', 'sgChange', 'sgFocus', 'sgBlur', 'sgClear'],
})
export class SgInput {
  protected el: HTMLSgInputElement;
  @Output() sgInput = new EventEmitter<CustomEvent<{ value: string; event: InputEvent }>>();
  @Output() sgChange = new EventEmitter<CustomEvent<{ value: string }>>();
  @Output() sgFocus = new EventEmitter<CustomEvent<void>>();
  @Output() sgBlur = new EventEmitter<CustomEvent<void>>();
  @Output() sgClear = new EventEmitter<CustomEvent<void>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SgInput extends Components.SgInput {
  /**
   * Emitted when the input value changes
   */
  sgInput: EventEmitter<CustomEvent<{ value: string; event: InputEvent }>>;
  /**
   * Emitted when the input loses focus after value change
   */
  sgChange: EventEmitter<CustomEvent<{ value: string }>>;
  /**
   * Emitted when the input gains focus
   */
  sgFocus: EventEmitter<CustomEvent<void>>;
  /**
   * Emitted when the input loses focus
   */
  sgBlur: EventEmitter<CustomEvent<void>>;
  /**
   * Emitted when the clear button is clicked
   */
  sgClear: EventEmitter<CustomEvent<void>>;
}


@ProxyCmp({
  defineCustomElementFn: defineSgModal,
  inputs: ['closeOnBackdrop', 'closeOnEscape', 'header', 'nonModal', 'open', 'overlay', 'showCloseButton', 'size'],
  methods: ['showModal', 'show', 'close']
})
@Component({
  selector: 'sg-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['closeOnBackdrop', 'closeOnEscape', 'header', 'nonModal', 'open', 'overlay', 'showCloseButton', 'size'],
  outputs: ['sgOpen', 'sgClose', 'sgCancel'],
})
export class SgModal {
  protected el: HTMLSgModalElement;
  @Output() sgOpen = new EventEmitter<CustomEvent<void>>();
  @Output() sgClose = new EventEmitter<CustomEvent<string>>();
  @Output() sgCancel = new EventEmitter<CustomEvent<void>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SgModal extends Components.SgModal {
  /**
   * Emitted when modal opens
   */
  sgOpen: EventEmitter<CustomEvent<void>>;
  /**
   * Emitted when modal closes
   */
  sgClose: EventEmitter<CustomEvent<string>>;
  /**
   * Emitted when modal is cancelled (Escape or backdrop)
   */
  sgCancel: EventEmitter<CustomEvent<void>>;
}


@ProxyCmp({
  defineCustomElementFn: defineSgOption,
  inputs: ['description', 'disabled', 'icon', 'value']
})
@Component({
  selector: 'sg-option',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['description', 'disabled', 'icon', { name: 'value', required: true }],
})
export class SgOption {
  protected el: HTMLSgOptionElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SgOption extends Components.SgOption {}


@ProxyCmp({
  defineCustomElementFn: defineSgOptionGroup,
  inputs: ['disabled', 'label']
})
@Component({
  selector: 'sg-option-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', { name: 'label', required: true }],
})
export class SgOptionGroup {
  protected el: HTMLSgOptionGroupElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SgOptionGroup extends Components.SgOptionGroup {}


@ProxyCmp({
  defineCustomElementFn: defineSgSearchBox,
  inputs: ['clearButtonLabel', 'clearIcon', 'disabled', 'hideClearButton', 'hideSearchButton', 'placeholder', 'searchButtonLabel', 'searchIcon', 'size', 'value']
})
@Component({
  selector: 'sg-search-box',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['clearButtonLabel', 'clearIcon', 'disabled', 'hideClearButton', 'hideSearchButton', 'placeholder', 'searchButtonLabel', 'searchIcon', 'size', 'value'],
  outputs: ['sgInput', 'sgSearch', 'sgClear'],
})
export class SgSearchBox {
  protected el: HTMLSgSearchBoxElement;
  @Output() sgInput = new EventEmitter<CustomEvent<string>>();
  @Output() sgSearch = new EventEmitter<CustomEvent<string>>();
  @Output() sgClear = new EventEmitter<CustomEvent<void>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SgSearchBox extends Components.SgSearchBox {
  /**
   * Emitted when search term changes
   */
  sgInput: EventEmitter<CustomEvent<string>>;
  /**
   * Emitted when search is triggered (button click or Enter)
   */
  sgSearch: EventEmitter<CustomEvent<string>>;
  /**
   * Emitted when clear button is clicked
   */
  sgClear: EventEmitter<CustomEvent<void>>;
}


@ProxyCmp({
  defineCustomElementFn: defineSgSelect,
  inputs: ['async', 'clearable', 'closeOnSelect', 'creatable', 'createText', 'disabled', 'errorMessage', 'helperText', 'label', 'loading', 'loadingText', 'maxSelections', 'multiple', 'noResultsText', 'options', 'placeholder', 'required', 'searchDelay', 'searchable', 'size', 'validationState', 'value', 'values', 'variant'],
  methods: ['open', 'close', 'toggle', 'clear']
})
@Component({
  selector: 'sg-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['async', 'clearable', 'closeOnSelect', 'creatable', 'createText', 'disabled', 'errorMessage', 'helperText', 'label', 'loading', 'loadingText', 'maxSelections', 'multiple', 'noResultsText', 'options', 'placeholder', 'required', 'searchDelay', 'searchable', 'size', 'validationState', 'value', 'values', 'variant'],
  outputs: ['sgChange', 'sgSearch', 'sgOpen', 'sgClose', 'sgCreate'],
})
export class SgSelect {
  protected el: HTMLSgSelectElement;
  @Output() sgChange = new EventEmitter<CustomEvent<{ value: string | string[]; option?: any }>>();
  @Output() sgSearch = new EventEmitter<CustomEvent<{ query: string }>>();
  @Output() sgOpen = new EventEmitter<CustomEvent<void>>();
  @Output() sgClose = new EventEmitter<CustomEvent<void>>();
  @Output() sgCreate = new EventEmitter<CustomEvent<{ value: string }>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { SelectOption as ISgSelectSelectOption } from 'sagebox/components';

export declare interface SgSelect extends Components.SgSelect {

  sgChange: EventEmitter<CustomEvent<{ value: string | string[]; option?: [object Object] }>>;

  sgSearch: EventEmitter<CustomEvent<{ query: string }>>;

  sgOpen: EventEmitter<CustomEvent<void>>;

  sgClose: EventEmitter<CustomEvent<void>>;

  sgCreate: EventEmitter<CustomEvent<{ value: string }>>;
}


@ProxyCmp({
  defineCustomElementFn: defineSgSkeleton,
  inputs: ['animation', 'height', 'variant', 'width']
})
@Component({
  selector: 'sg-skeleton',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['animation', 'height', 'variant', 'width'],
})
export class SgSkeleton {
  protected el: HTMLSgSkeletonElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SgSkeleton extends Components.SgSkeleton {}


@ProxyCmp({
  defineCustomElementFn: defineSgStatsCard,
  inputs: ['animationDelay', 'cardTitle', 'color', 'description', 'icon', 'loading', 'stats', 'trend', 'trendPositive', 'unit', 'value']
})
@Component({
  selector: 'sg-stats-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['animationDelay', 'cardTitle', 'color', 'description', 'icon', 'loading', 'stats', 'trend', 'trendPositive', 'unit', 'value'],
})
export class SgStatsCard {
  protected el: HTMLSgStatsCardElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SgStatsCard extends Components.SgStatsCard {}


@ProxyCmp({
  defineCustomElementFn: defineSgThemeToggle,
  inputs: ['size', 'theme']
})
@Component({
  selector: 'sg-theme-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['size', 'theme'],
  outputs: ['sgThemeChange'],
})
export class SgThemeToggle {
  protected el: HTMLSgThemeToggleElement;
  @Output() sgThemeChange = new EventEmitter<CustomEvent<ISgThemeToggleThemeMode>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { ThemeMode as ISgThemeToggleThemeMode } from 'sagebox/components';

export declare interface SgThemeToggle extends Components.SgThemeToggle {
  /**
   * Emitted when the theme changes
   */
  sgThemeChange: EventEmitter<CustomEvent<ISgThemeToggleThemeMode>>;
}


@ProxyCmp({
  defineCustomElementFn: defineSgTooltip,
  inputs: ['arrow', 'disabled', 'hideDelay', 'interactive', 'maxWidth', 'open', 'position', 'showDelay', 'text', 'trigger', 'variant'],
  methods: ['show', 'hide', 'toggle']
})
@Component({
  selector: 'sg-tooltip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['arrow', 'disabled', 'hideDelay', 'interactive', 'maxWidth', 'open', 'position', 'showDelay', 'text', 'trigger', 'variant'],
  outputs: ['sgShow', 'sgHide'],
})
export class SgTooltip {
  protected el: HTMLSgTooltipElement;
  @Output() sgShow = new EventEmitter<CustomEvent<void>>();
  @Output() sgHide = new EventEmitter<CustomEvent<void>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SgTooltip extends Components.SgTooltip {
  /**
   * Emitted when tooltip is shown
   */
  sgShow: EventEmitter<CustomEvent<void>>;
  /**
   * Emitted when tooltip is hidden
   */
  sgHide: EventEmitter<CustomEvent<void>>;
}


