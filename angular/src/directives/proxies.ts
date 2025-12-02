/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Output, NgZone, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ProxyCmp } from './angular-component-lib/utils';

import type { Components } from 'saged-ui/components';

import { defineCustomElement as defineSgArticleEditor } from 'saged-ui/components/sg-article-editor.js';
import { defineCustomElement as defineSgBadge } from 'saged-ui/components/sg-badge.js';
import { defineCustomElement as defineSgButton } from 'saged-ui/components/sg-button.js';
import { defineCustomElement as defineSgDropdown } from 'saged-ui/components/sg-dropdown.js';
import { defineCustomElement as defineSgIcon } from 'saged-ui/components/sg-icon.js';
import { defineCustomElement as defineSgSkeleton } from 'saged-ui/components/sg-skeleton.js';
@ProxyCmp({
  defineCustomElementFn: defineSgArticleEditor,
  inputs: ['availableModes', 'customTranslations', 'disabled', 'editorAccent', 'editorBg', 'editorBgSecondary', 'editorBgTertiary', 'editorBorder', 'editorBorderRadius', 'editorFontMono', 'editorFontSans', 'editorFontSize', 'editorText', 'editorTextSecondary', 'enableExternalPreview', 'locale', 'minHeight', 'mode', 'placeholder', 'readonly', 'showWordCount', 'spellcheck', 'value'],
  methods: ['getContent', 'setContent', 'getHtml', 'focusEditor', 'insertAtCursor', 'insertMedia']
})
@Component({
  selector: 'sg-article-editor',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['availableModes', 'customTranslations', 'disabled', 'editorAccent', 'editorBg', 'editorBgSecondary', 'editorBgTertiary', 'editorBorder', 'editorBorderRadius', 'editorFontMono', 'editorFontSans', 'editorFontSize', 'editorText', 'editorTextSecondary', 'enableExternalPreview', 'locale', 'minHeight', 'mode', 'placeholder', 'readonly', 'showWordCount', 'spellcheck', 'value'],
  outputs: ['editorChange', 'editorModeChange', 'mediaLibraryOpen', 'mediaInsert'],
})
export class SgArticleEditor {
  protected el: HTMLSgArticleEditorElement;
  @Output() editorChange = new EventEmitter<CustomEvent<ISgArticleEditorEditorChangeEvent>>();
  @Output() editorModeChange = new EventEmitter<CustomEvent<ISgArticleEditorEditorModeChangeEvent>>();
  @Output() mediaLibraryOpen = new EventEmitter<CustomEvent<void>>();
  @Output() mediaInsert = new EventEmitter<CustomEvent<ISgArticleEditorMediaItem>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { EditorChangeEvent as ISgArticleEditorEditorChangeEvent } from 'saged-ui/components';
import type { EditorModeChangeEvent as ISgArticleEditorEditorModeChangeEvent } from 'saged-ui/components';
import type { MediaItem as ISgArticleEditorMediaItem } from 'saged-ui/components';

export declare interface SgArticleEditor extends Components.SgArticleEditor {
  /**
   * Emitted when the content changes
   */
  editorChange: EventEmitter<CustomEvent<ISgArticleEditorEditorChangeEvent>>;
  /**
   * Emitted when the mode changes
   */
  editorModeChange: EventEmitter<CustomEvent<ISgArticleEditorEditorModeChangeEvent>>;
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
  inputs: ['clickable', 'dot', 'icon', 'outlined', 'pill', 'pulse', 'size', 'soft', 'variant']
})
@Component({
  selector: 'sg-badge',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['clickable', 'dot', 'icon', 'outlined', 'pill', 'pulse', 'size', 'soft', 'variant'],
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
  defineCustomElementFn: defineSgButton,
  inputs: ['ariaLabel', 'disabled', 'leadingIcon', 'loading', 'loadingText', 'shape', 'size', 'trailingIcon', 'type', 'variant']
})
@Component({
  selector: 'sg-button',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['ariaLabel', 'disabled', 'leadingIcon', 'loading', 'loadingText', 'shape', 'size', 'trailingIcon', 'type', 'variant'],
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
  defineCustomElementFn: defineSgDropdown,
  inputs: ['align', 'closeOnSelect', 'disabled', 'maxHeight', 'minWidth', 'open', 'position', 'showBackdrop', 'size'],
  methods: ['openDropdown', 'closeDropdown', 'toggle']
})
@Component({
  selector: 'sg-dropdown',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['align', 'closeOnSelect', 'disabled', 'maxHeight', 'minWidth', 'open', 'position', 'showBackdrop', 'size'],
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
  defineCustomElementFn: defineSgIcon,
  inputs: ['ariaLabel', 'color', 'decorative', 'fill', 'flipH', 'flipV', 'height', 'name', 'rotate', 'size', 'spin', 'src', 'strokeWidth', 'width']
})
@Component({
  selector: 'sg-icon',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['ariaLabel', 'color', 'decorative', 'fill', 'flipH', 'flipV', 'height', 'name', 'rotate', 'size', 'spin', 'src', 'strokeWidth', 'width'],
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
  defineCustomElementFn: defineSgSkeleton,
  inputs: ['animation', 'height', 'variant', 'width']
})
@Component({
  selector: 'sg-skeleton',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
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


