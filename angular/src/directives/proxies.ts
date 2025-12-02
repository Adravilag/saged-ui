/* tslint:disable */
/**
 * Angular Standalone Proxies for SagedUI Web Components
 *
 * IMPORTANTE: Este archivo es MANUAL y no debe ser sobrescrito por Stencil.
 * Los componentes están registrados globalmente via 'import saged-ui' en main.ts.
 *
 * Usage in main.ts:
 *   import 'saged-ui';
 *
 * Usage in components:
 *   import { SgIcon, SgButton } from 'saged-ui/angular';
 */
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  Output,
} from '@angular/core';

// ============================================================================
// Helper: Proxy Event Emitter
// ============================================================================
type EventHandler = (event: Event) => void;

function proxyEvent<T>(
  el: HTMLElement,
  eventName: string,
  emitter: EventEmitter<T>,
  zone: NgZone
): EventHandler {
  const handler = (event: Event) => {
    zone.run(() => emitter.emit(event as T));
  };
  el.addEventListener(eventName, handler);
  return handler;
}

// ============================================================================
// Type Definitions
// ============================================================================

// Badge
export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'purple' | 'cyan';
export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg';

// Button
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'success' | 'warning' | 'error' | 'info';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';
export type ButtonShape = 'default' | 'circle' | 'square' | 'pill' | 'block';

// Dropdown
export type DropdownAlign = 'start' | 'end' | 'center';
export type DropdownPosition = 'bottom' | 'top';
export type DropdownSize = 'sm' | 'md' | 'lg';

// Skeleton
export type SkeletonVariant = 'text' | 'rect' | 'circle';
export type SkeletonAnimation = 'shimmer' | 'pulse' | 'none';

// Editor
export type EditorMode = 'html' | 'markdown' | 'preview' | 'split';
export type SupportedLocale = 'en' | 'es' | 'fr' | 'de' | 'pt' | 'it' | 'zh' | 'ja' | 'ko' | 'ar';

// ============================================================================
// SgArticleEditor
// ============================================================================
@Component({
  selector: 'sg-article-editor',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
})
export class SgArticleEditor implements OnDestroy {
  protected el: HTMLElement;
  private eventHandlers: Array<{ event: string; handler: EventHandler }> = [];

  // Content
  @Input() value?: string;
  @Input() mode?: EditorMode;
  @Input() availableModes?: string;
  @Input() placeholder?: string;

  // Behavior
  @Input() minHeight?: number;
  @Input() spellcheck?: boolean;
  @Input() showWordCount?: boolean;
  @Input() enableExternalPreview?: boolean;
  @Input() disabled?: boolean;
  @Input() readonly?: boolean;

  // Style Props
  @Input() editorBg?: string;
  @Input() editorBgSecondary?: string;
  @Input() editorBgTertiary?: string;
  @Input() editorText?: string;
  @Input() editorTextSecondary?: string;
  @Input() editorBorder?: string;
  @Input() editorAccent?: string;
  @Input() editorBorderRadius?: string;
  @Input() editorFontSans?: string;
  @Input() editorFontMono?: string;
  @Input() editorFontSize?: string;

  // I18n
  @Input() locale?: SupportedLocale;
  @Input() customTranslations?: Record<string, unknown>;

  // Events
  @Output() editorChange = new EventEmitter<CustomEvent>();
  @Output() editorModeChange = new EventEmitter<CustomEvent>();
  @Output() mediaLibraryOpen = new EventEmitter<CustomEvent<void>>();
  @Output() mediaInsert = new EventEmitter<CustomEvent>();

  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    this.bindEvents();
  }

  private bindEvents(): void {
    this.eventHandlers = [
      { event: 'editorChange', handler: proxyEvent(this.el, 'editorChange', this.editorChange, this.z) },
      { event: 'editorModeChange', handler: proxyEvent(this.el, 'editorModeChange', this.editorModeChange, this.z) },
      { event: 'mediaLibraryOpen', handler: proxyEvent(this.el, 'mediaLibraryOpen', this.mediaLibraryOpen, this.z) },
      { event: 'mediaInsert', handler: proxyEvent(this.el, 'mediaInsert', this.mediaInsert, this.z) },
    ];
  }

  ngOnDestroy(): void {
    this.eventHandlers.forEach(({ event, handler }) => {
      this.el.removeEventListener(event, handler);
    });
  }
}

// ============================================================================
// SgBadge
// ============================================================================
@Component({
  selector: 'sg-badge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
})
export class SgBadge {
  protected el: HTMLElement;

  @Input() variant?: BadgeVariant;
  @Input() size?: BadgeSize;
  @Input() pill?: boolean;
  @Input() outlined?: boolean;
  @Input() dot?: boolean;
  @Input() pulse?: boolean;
  @Input() clickable?: boolean;
  @Input() icon?: string;
  @Input() soft?: boolean;

  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

// ============================================================================
// SgButton
// ============================================================================
@Component({
  selector: 'sg-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
})
export class SgButton implements OnDestroy {
  protected el: HTMLElement;
  private eventHandlers: Array<{ event: string; handler: EventHandler }> = [];

  @Input() variant?: ButtonVariant;
  @Input() size?: ButtonSize;
  @Input() shape?: ButtonShape;
  @Input() disabled?: boolean;
  @Input() loading?: boolean;
  @Input() loadingText?: string;
  @Input() leadingIcon?: string;
  @Input() trailingIcon?: string;
  @Input() type?: 'button' | 'submit' | 'reset';
  @Input() ariaLabel?: string;

  @Output() sgClick = new EventEmitter<CustomEvent<MouseEvent>>();

  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    this.bindEvents();
  }

  private bindEvents(): void {
    this.eventHandlers = [
      { event: 'sgClick', handler: proxyEvent(this.el, 'sgClick', this.sgClick, this.z) },
    ];
  }

  ngOnDestroy(): void {
    this.eventHandlers.forEach(({ event, handler }) => {
      this.el.removeEventListener(event, handler);
    });
  }
}

// ============================================================================
// SgDropdown
// ============================================================================
@Component({
  selector: 'sg-dropdown',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
})
export class SgDropdown implements OnDestroy {
  protected el: HTMLElement;
  private eventHandlers: Array<{ event: string; handler: EventHandler }> = [];

  @Input() open?: boolean;
  @Input() align?: DropdownAlign;
  @Input() position?: DropdownPosition;
  @Input() closeOnSelect?: boolean;
  @Input() minWidth?: string;
  @Input() maxHeight?: string;
  @Input() disabled?: boolean;
  @Input() showBackdrop?: boolean;
  @Input() size?: DropdownSize;

  @Output() sgOpen = new EventEmitter<CustomEvent<void>>();
  @Output() sgClose = new EventEmitter<CustomEvent<void>>();
  @Output() sgToggle = new EventEmitter<CustomEvent<boolean>>();

  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    this.bindEvents();
  }

  private bindEvents(): void {
    this.eventHandlers = [
      { event: 'sgOpen', handler: proxyEvent(this.el, 'sgOpen', this.sgOpen, this.z) },
      { event: 'sgClose', handler: proxyEvent(this.el, 'sgClose', this.sgClose, this.z) },
      { event: 'sgToggle', handler: proxyEvent(this.el, 'sgToggle', this.sgToggle, this.z) },
    ];
  }

  ngOnDestroy(): void {
    this.eventHandlers.forEach(({ event, handler }) => {
      this.el.removeEventListener(event, handler);
    });
  }
}

// ============================================================================
// SgIcon
// ============================================================================
@Component({
  selector: 'sg-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
})
export class SgIcon {
  protected el: HTMLElement;

  @Input() name?: string;
  @Input() src?: string;
  @Input() size?: number | string;
  @Input() width?: number | string;
  @Input() height?: number | string;
  @Input() color?: string;
  @Input() fill?: string;
  @Input() strokeWidth?: number;
  @Input() spin?: boolean;
  @Input() rotate?: number;
  @Input() flipH?: boolean;
  @Input() flipV?: boolean;
  @Input() ariaLabel?: string;
  @Input() decorative?: boolean;

  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

// ============================================================================
// SgSkeleton
// ============================================================================
@Component({
  selector: 'sg-skeleton',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
})
export class SgSkeleton {
  protected el: HTMLElement;

  @Input() variant?: SkeletonVariant;
  @Input() width?: string;
  @Input() height?: string;
  @Input() animation?: SkeletonAnimation;

  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

// ============================================================================
// SgThemeToggle
// ============================================================================
export type ThemeMode = 'light' | 'dark' | 'system';
export type ThemeToggleSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'sg-theme-toggle',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
})
export class SgThemeToggle implements OnDestroy {
  protected el: HTMLElement;
  private eventHandlers: Array<{ event: string; handler: EventHandler }> = [];

  @Input() theme?: ThemeMode;
  @Input() size?: ThemeToggleSize;

  @Output() sgThemeChange = new EventEmitter<CustomEvent<ThemeMode>>();

  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    this.bindEvents();
  }

  private bindEvents(): void {
    this.eventHandlers = [
      { event: 'sgThemeChange', handler: proxyEvent(this.el, 'sgThemeChange', this.sgThemeChange, this.z) },
    ];
  }

  ngOnDestroy(): void {
    this.eventHandlers.forEach(({ event, handler }) => {
      this.el.removeEventListener(event, handler);
    });
  }
}


