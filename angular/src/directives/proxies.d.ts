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
import { ChangeDetectorRef, ElementRef, EventEmitter, NgZone } from '@angular/core';
export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'purple' | 'cyan';
export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg';
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'success' | 'warning' | 'error' | 'info';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';
export type ButtonShape = 'default' | 'circle' | 'square' | 'pill' | 'block';
export type DropdownAlign = 'start' | 'end' | 'center';
export type DropdownPosition = 'bottom' | 'top';
export type DropdownSize = 'sm' | 'md' | 'lg';
export type SkeletonVariant = 'text' | 'rect' | 'circle';
export type SkeletonAnimation = 'shimmer' | 'pulse' | 'none';
export type EditorMode = 'html' | 'markdown' | 'preview' | 'split';
export type SupportedLocale = 'en' | 'es' | 'fr' | 'de' | 'pt' | 'it' | 'zh' | 'ja' | 'ko' | 'ar';
export declare class SgArticleEditor {
    protected z: NgZone;
    protected el: HTMLElement;
    value?: string;
    mode?: EditorMode;
    availableModes?: string;
    placeholder?: string;
    minHeight?: number;
    spellcheck?: boolean;
    showWordCount?: boolean;
    enableExternalPreview?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    editorBg?: string;
    editorBgSecondary?: string;
    editorBgTertiary?: string;
    editorText?: string;
    editorTextSecondary?: string;
    editorBorder?: string;
    editorAccent?: string;
    editorBorderRadius?: string;
    editorFontSans?: string;
    editorFontMono?: string;
    editorFontSize?: string;
    locale?: SupportedLocale;
    customTranslations?: Record<string, unknown>;
    editorChange: EventEmitter<CustomEvent<any>>;
    editorModeChange: EventEmitter<CustomEvent<any>>;
    mediaLibraryOpen: EventEmitter<CustomEvent<void>>;
    mediaInsert: EventEmitter<CustomEvent<any>>;
    constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare class SgBadge {
    protected z: NgZone;
    protected el: HTMLElement;
    variant?: BadgeVariant;
    size?: BadgeSize;
    pill?: boolean;
    outlined?: boolean;
    dot?: boolean;
    pulse?: boolean;
    clickable?: boolean;
    icon?: string;
    soft?: boolean;
    constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare class SgButton {
    protected z: NgZone;
    protected el: HTMLElement;
    variant?: ButtonVariant;
    size?: ButtonSize;
    shape?: ButtonShape;
    disabled?: boolean;
    loading?: boolean;
    loadingText?: string;
    leadingIcon?: string;
    trailingIcon?: string;
    type?: 'button' | 'submit' | 'reset';
    ariaLabel?: string;
    sgClick: EventEmitter<CustomEvent<MouseEvent>>;
    constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare class SgDropdown {
    protected z: NgZone;
    protected el: HTMLElement;
    open?: boolean;
    align?: DropdownAlign;
    position?: DropdownPosition;
    closeOnSelect?: boolean;
    minWidth?: string;
    maxHeight?: string;
    disabled?: boolean;
    showBackdrop?: boolean;
    size?: DropdownSize;
    sgOpen: EventEmitter<CustomEvent<void>>;
    sgClose: EventEmitter<CustomEvent<void>>;
    sgToggle: EventEmitter<CustomEvent<boolean>>;
    constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare class SgIcon {
    protected z: NgZone;
    protected el: HTMLElement;
    name?: string;
    src?: string;
    size?: number | string;
    width?: number | string;
    height?: number | string;
    color?: string;
    fill?: string;
    strokeWidth?: number;
    spin?: boolean;
    rotate?: number;
    flipH?: boolean;
    flipV?: boolean;
    ariaLabel?: string;
    decorative?: boolean;
    constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare class SgSkeleton {
    protected z: NgZone;
    protected el: HTMLElement;
    variant?: SkeletonVariant;
    width?: string;
    height?: string;
    animation?: SkeletonAnimation;
    constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export type ThemeMode = 'light' | 'dark' | 'system';
export type ThemeToggleSize = 'sm' | 'md' | 'lg';
export declare class SgThemeToggle {
    protected z: NgZone;
    protected el: HTMLElement;
    theme?: ThemeMode;
    size?: ThemeToggleSize;
    sgThemeChange: EventEmitter<CustomEvent<ThemeMode>>;
    constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
//# sourceMappingURL=proxies.d.ts.map