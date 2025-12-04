/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Output, NgZone } from '@angular/core';

import { ProxyCmp } from './angular-component-lib/utils';

import type { Components } from 'sagebox/components';

import { defineCustomElement as defineSgArticleEditor } from 'sagebox/components/sg-article-editor.js';
import { defineCustomElement as defineSgBadge } from 'sagebox/components/sg-badge.js';
import { defineCustomElement as defineSgButton } from 'sagebox/components/sg-button.js';
import { defineCustomElement as defineSgDropdown } from 'sagebox/components/sg-dropdown.js';
import { defineCustomElement as defineSgIcon } from 'sagebox/components/sg-icon.js';
import { defineCustomElement as defineSgSkeleton } from 'sagebox/components/sg-skeleton.js';
import { defineCustomElement as defineSgThemeToggle } from 'sagebox/components/sg-theme-toggle.js';
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
  defineCustomElementFn: defineSgIcon,
  inputs: ['color', 'decorative', 'fill', 'flipH', 'flipV', 'height', 'jsonSrc', 'label', 'name', 'rotate', 'size', 'spin', 'src', 'strokeWidth', 'width'],
  methods: ['registerIcons', 'registerIcon', 'getRegisteredIcons', 'hasIcon']
})
@Component({
  selector: 'sg-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['color', 'decorative', 'fill', 'flipH', 'flipV', 'height', 'jsonSrc', 'label', 'name', 'rotate', 'size', 'spin', 'src', 'strokeWidth', 'width'],
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


