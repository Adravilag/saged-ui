import { Component, Prop, State, Event, EventEmitter, h, Watch, Method } from '@stencil/core';
import {
  ContentType,
  ViewMode,
  EditorChangeEvent,
  ContentTypeChangeEvent,
  ViewModeChangeEvent,
  MediaItem,
  CONTENT_TYPES,
  VIEW_MODES,
  DEFAULT_TOOLBAR_BUTTONS,
  countWords,
  countChars,
  ToolbarAction,
} from './utils';
import { convertContent, getPreviewHtml, sanitizeHtml } from './utils/editor-modes';
import { getTextSelection, setTextSelection, applyToolbarAction, getActionFromKeyboard, DEFAULT_SHORTCUTS } from './utils/toolbar-actions';
import { SupportedLocale, EditorTranslations, getTranslations, isRTL, formatCount } from './utils/i18n';

/**
 * SagedUI - Article Editor Component
 *
 * A headless-ready article editor supporting HTML and Markdown modes
 * with live preview, formatting toolbar, and optional media library integration.
 *
 * @example
 * ```html
 * <sg-article-editor
 *   value="<p>Hello World</p>"
 *   mode="html"
 *   placeholder="Start writing..."
 * ></sg-article-editor>
 * ```
 */
@Component({
  tag: 'sg-article-editor',
  styleUrl: 'article-editor.css',
  shadow: true,
})
export class ArticleEditor {
  // =====================================================
  // PROPERTIES
  // =====================================================

  /**
   * The content value of the editor
   */
  @Prop({ mutable: true }) value: string = '';

  /**
   * Content syntax type (html or markdown)
   */
  @Prop({ mutable: true }) contentType: ContentType = 'html';

  /**
   * View mode (editor, preview, or split)
   */
  @Prop({ mutable: true }) viewMode: ViewMode = 'editor';

  /**
   * Available content types (comma-separated or array)
   */
  @Prop() availableContentTypes: string = 'html,markdown';

  /**
   * Available view modes (comma-separated or array)
   */
  @Prop() availableViewModes: string = 'editor,preview,split';

  /**
   * @deprecated Use contentType instead
   */
  @Prop({ mutable: true }) mode: ContentType = 'html';

  /**
   * @deprecated Use availableContentTypes instead
   */
  @Prop() availableModes: string = 'html,markdown';

  /**
   * Placeholder text when editor is empty
   */
  @Prop() placeholder: string = 'Start writing...';

  /**
   * Minimum height in pixels
   */
  @Prop() minHeight: number = 400;

  /**
   * Enable spell checking
   */
  @Prop() spellcheck: boolean = true;

  /**
   * Show word/character count
   */
  @Prop() showWordCount: boolean = true;

  /**
   * Enable external preview window
   */
  @Prop() enableExternalPreview: boolean = true;

  /**
   * Disabled state
   */
  @Prop() disabled: boolean = false;

  /**
   * Read-only state
   */
  @Prop() readonly: boolean = false;

  // =====================================================
  // STYLE PROPS - CSS Custom Properties
  // =====================================================

  /**
   * Custom background color for the editor
   */
  @Prop() editorBg: string;

  /**
   * Custom secondary background color
   */
  @Prop() editorBgSecondary: string;

  /**
   * Custom tertiary background color
   */
  @Prop() editorBgTertiary: string;

  /**
   * Custom text color
   */
  @Prop() editorText: string;

  /**
   * Custom secondary text color
   */
  @Prop() editorTextSecondary: string;

  /**
   * Custom border color
   */
  @Prop() editorBorder: string;

  /**
   * Custom accent color (buttons, links)
   */
  @Prop() editorAccent: string;

  /**
   * Custom border radius
   */
  @Prop() editorBorderRadius: string;

  /**
   * Custom font family for text
   */
  @Prop() editorFontSans: string;

  /**
   * Custom font family for code
   */
  @Prop() editorFontMono: string;

  /**
   * Custom font size
   */
  @Prop() editorFontSize: string;

  // =====================================================
  // I18N PROPS
  // =====================================================

  /**
   * Locale for UI text (en, es, fr, de, pt, it, zh, ja, ko, ar)
   */
  @Prop() locale: SupportedLocale = 'en';

  /**
   * Custom translations to override defaults
   */
  @Prop() customTranslations: Partial<EditorTranslations>;

  // =====================================================
  // STATE
  // =====================================================

  @State() internalValue: string = '';
  @State() wordCount: number = 0;
  @State() charCount: number = 0;
  @State() isMediaLibraryOpen: boolean = false;
  @State() isExternalPreviewOpen: boolean = false;
  @State() externalWindow: Window | null = null;
  @State() splitPosition: number = 50; // Percentage for editor width in split mode
  @State() isResizing: boolean = false;

  // =====================================================
  // EVENTS
  // =====================================================

  /**
   * Emitted when the content changes
   */
  @Event() editorChange: EventEmitter<EditorChangeEvent>;

  /**
   * Emitted when the content type changes
   */
  @Event() contentTypeChange: EventEmitter<ContentTypeChangeEvent>;

  /**
   * Emitted when the view mode changes
   */
  @Event() viewModeChange: EventEmitter<ViewModeChangeEvent>;

  /**
   * @deprecated Use contentTypeChange instead
   */
  @Event() editorModeChange: EventEmitter<ContentTypeChangeEvent>;

  /**
   * Emitted when media library is requested
   */
  @Event() mediaLibraryOpen: EventEmitter<void>;

  /**
   * Emitted when a media item should be inserted
   */
  @Event() mediaInsert: EventEmitter<MediaItem>;

  // =====================================================
  // REFS
  // =====================================================

  private textareaRef: HTMLTextAreaElement;

  // =====================================================
  // COMPUTED - I18N
  // =====================================================

  /**
   * Get merged translations (base + custom overrides)
   */
  private get t(): EditorTranslations {
    const base = getTranslations(this.locale);
    if (!this.customTranslations) return base;

    // Deep merge custom translations
    return {
      modes: { ...base.modes, ...this.customTranslations.modes },
      toolbar: { ...base.toolbar, ...this.customTranslations.toolbar },
      status: { ...base.status, ...this.customTranslations.status },
      actions: { ...base.actions, ...this.customTranslations.actions },
      placeholders: { ...base.placeholders, ...this.customTranslations.placeholders },
      preview: { ...base.preview, ...this.customTranslations.preview },
      aria: { ...base.aria, ...this.customTranslations.aria },
    };
  }

  /**
   * Check if current locale is RTL
   */
  private get isRtl(): boolean {
    return isRTL(this.locale);
  }

  // =====================================================
  // LIFECYCLE
  // =====================================================

  componentWillLoad() {
    this.internalValue = this.value;
    this.updateCounts();
  }

  componentDidLoad() {
    // Set up external preview polling if window is open
    if (this.isExternalPreviewOpen) {
      this.startExternalPreviewPolling();
    }
  }

  disconnectedCallback() {
    // Clean up external window
    if (this.externalWindow && !this.externalWindow.closed) {
      this.externalWindow.close();
    }
  }

  // =====================================================
  // WATCHERS
  // =====================================================

  @Watch('value')
  handleValueChange(newValue: string) {
    if (newValue !== this.internalValue) {
      this.internalValue = newValue;
      this.updateCounts();
    }
  }

  // =====================================================
  // PUBLIC METHODS
  // =====================================================

  /**
   * Get the current content
   */
  @Method()
  async getContent(): Promise<string> {
    return this.internalValue;
  }

  /**
   * Set the content programmatically
   */
  @Method()
  async setContent(content: string): Promise<void> {
    this.internalValue = content;
    this.value = content;
    this.updateCounts();
    this.emitChange();
  }

  /**
   * Get content as HTML (converts if in markdown mode)
   */
  @Method()
  async getHtml(): Promise<string> {
    return getPreviewHtml(this.internalValue, this.contentType);
  }

  /**
   * Focus the editor
   */
  @Method()
  async focusEditor(): Promise<void> {
    this.textareaRef?.focus();
  }

  /**
   * Insert content at cursor position
   */
  @Method()
  async insertAtCursor(content: string): Promise<void> {
    if (!this.textareaRef) return;

    const selection = getTextSelection(this.textareaRef);
    const before = this.internalValue.substring(0, selection.start);
    const after = this.internalValue.substring(selection.end);

    this.internalValue = before + content + after;
    this.value = this.internalValue;
    this.updateCounts();
    this.emitChange();

    // Set cursor after inserted content
    requestAnimationFrame(() => {
      setTextSelection(this.textareaRef, selection.start + content.length, selection.start + content.length);
    });
  }

  /**
   * Insert a media item
   */
  @Method()
  async insertMedia(media: MediaItem): Promise<void> {
    const isMarkdown = this.contentType === 'markdown';
    const content = isMarkdown
      ? `![${media.alt || media.filename}](${media.url})`
      : `<img src="${media.url}" alt="${media.alt || media.filename}" />`;

    await this.insertAtCursor(content);
    this.mediaInsert.emit(media);
    this.isMediaLibraryOpen = false;
  }

  // =====================================================
  // PRIVATE METHODS
  // =====================================================

  private updateCounts() {
    this.wordCount = countWords(this.internalValue);
    this.charCount = countChars(this.internalValue);
  }

  private emitChange() {
    this.editorChange.emit({
      value: this.internalValue,
      contentType: this.contentType,
      viewMode: this.viewMode,
      wordCount: this.wordCount,
      charCount: this.charCount,
    });
  }

  private getAvailableContentTypes(): ContentType[] {
    const types = this.availableContentTypes.split(',').map(t => t.trim() as ContentType);
    return CONTENT_TYPES.filter(c => types.includes(c.type)).map(c => c.type);
  }

  private getAvailableViewModes(): ViewMode[] {
    const modes = this.availableViewModes.split(',').map(m => m.trim() as ViewMode);
    return VIEW_MODES.filter(v => modes.includes(v.mode)).map(v => v.mode);
  }

  private handleInput = (event: Event) => {
    const target = event.target as HTMLTextAreaElement;
    this.internalValue = target.value;
    this.value = target.value;
    this.updateCounts();
    this.emitChange();
    this.updateExternalPreview();
  };

  private handleContentTypeChange = (newType: ContentType) => {
    if (newType === this.contentType) return;

    const previousType = this.contentType;

    // Convert content when switching between html and markdown
    this.internalValue = convertContent(this.internalValue, previousType, newType);
    this.value = this.internalValue;

    this.contentType = newType;
    this.mode = newType; // Keep deprecated prop in sync

    this.contentTypeChange.emit({ previousType, newType });
  };

  private handleViewModeChange = (newMode: ViewMode) => {
    if (newMode === this.viewMode) return;

    const previousMode = this.viewMode;
    this.viewMode = newMode;

    this.viewModeChange.emit({ previousMode, newMode });
  };

  private handleToolbarAction = (action: string) => {
    if (action === 'image') {
      this.isMediaLibraryOpen = true;
      this.mediaLibraryOpen.emit();
      return;
    }

    if (!this.textareaRef) return;

    const selection = getTextSelection(this.textareaRef);
    const result = applyToolbarAction({
      content: this.internalValue,
      selection,
      mode: this.contentType,
      action: action as ToolbarAction,
    });

    this.internalValue = result.newContent;
    this.value = result.newContent;
    this.updateCounts();
    this.emitChange();

    requestAnimationFrame(() => {
      setTextSelection(this.textareaRef, result.newSelectionStart, result.newSelectionEnd);
    });
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    const action = getActionFromKeyboard(event, DEFAULT_SHORTCUTS);
    if (action) {
      event.preventDefault();
      this.handleToolbarAction(action);
    }
  };

  private toggleExternalPreview = () => {
    if (this.isExternalPreviewOpen && this.externalWindow) {
      this.externalWindow.close();
      this.externalWindow = null;
      this.isExternalPreviewOpen = false;
    } else {
      this.openExternalPreview();
    }
  };

  private openExternalPreview() {
    const width = 800;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    this.externalWindow = window.open('', 'EditorPreview', `width=${width},height=${height},left=${left},top=${top}`);

    if (this.externalWindow) {
      this.isExternalPreviewOpen = true;
      this.updateExternalPreview();
      this.startExternalPreviewPolling();
    }
  }

  private updateExternalPreview() {
    if (!this.externalWindow || this.externalWindow.closed) return;

    const html = getPreviewHtml(this.internalValue, this.contentType);
    const sanitized = sanitizeHtml(html);

    this.externalWindow.document.open();
    this.externalWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Editor Preview</title>
          <style>
            body {
              font-family: system-ui, -apple-system, sans-serif;
              line-height: 1.6;
              padding: 2rem;
              max-width: 800px;
              margin: 0 auto;
              color: #333;
            }
            img { max-width: 100%; height: auto; }
            pre { background: #f5f5f5; padding: 1rem; overflow-x: auto; }
            code { background: #f5f5f5; padding: 0.2em 0.4em; border-radius: 3px; }
            blockquote { border-left: 4px solid #ddd; margin-left: 0; padding-left: 1rem; color: #666; }
          </style>
        </head>
        <body>${sanitized}</body>
      </html>
    `);
    this.externalWindow.document.close();
  }

  private startExternalPreviewPolling() {
    const checkWindow = () => {
      if (this.externalWindow?.closed) {
        this.externalWindow = null;
        this.isExternalPreviewOpen = false;
      } else if (this.isExternalPreviewOpen) {
        requestAnimationFrame(checkWindow);
      }
    };
    requestAnimationFrame(checkWindow);
  }

  // =====================================================
  // SPLIT PANEL RESIZE
  // =====================================================

  private contentRef: HTMLDivElement;

  private handleResizeStart = (event: MouseEvent | TouchEvent) => {
    event.preventDefault();
    this.isResizing = true;

    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!this.isResizing || !this.contentRef) return;

      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const rect = this.contentRef.getBoundingClientRect();
      const newPosition = ((clientX - rect.left) / rect.width) * 100;

      // Clamp between 20% and 80%
      this.splitPosition = Math.min(80, Math.max(20, newPosition));
    };

    const handleEnd = () => {
      this.isResizing = false;
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', handleEnd);
    };

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchmove', handleMove);
    document.addEventListener('touchend', handleEnd);
  };

  // =====================================================
  // TOOLBAR ICONS
  // =====================================================

  private renderContentTypeIcon(type: ContentType) {
    switch (type) {
      case 'html':
        return (
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
        );
      case 'markdown':
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 3h18v18H3V3zm16 16V5H5v14h14zM7 15V9h2l2 3 2-3h2v6h-2v-4l-2 3-2-3v4H7z"></path>
          </svg>
        );
    }
  }

  private renderViewModeIcon(mode: ViewMode) {
    switch (mode) {
      case 'editor':
        return (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
        );
      case 'preview':
        return (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        );
      case 'split':
        return (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="12" y1="3" x2="12" y2="21"></line>
          </svg>
        );
    }
  }

  private renderToolbarIcon(action: string) {
    switch (action) {
      case 'bold':
        return (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
            <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
          </svg>
        );
      case 'italic':
        return (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="19" y1="4" x2="10" y2="4"></line>
            <line x1="14" y1="20" x2="5" y2="20"></line>
            <line x1="15" y1="4" x2="9" y2="20"></line>
          </svg>
        );
      case 'underline':
        return (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"></path>
            <line x1="4" y1="21" x2="20" y2="21"></line>
          </svg>
        );
      case 'link':
        return (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
          </svg>
        );
      case 'code':
        return (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
        );
      case 'quote':
        return (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z"></path>
            <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3z"></path>
          </svg>
        );
      case 'image':
        return (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
          </svg>
        );
      default:
        return <span>{action.charAt(0).toUpperCase()}</span>;
    }
  }

  // =====================================================
  // RENDER
  // =====================================================

  private getCustomStyles(): Record<string, string> {
    const styles: Record<string, string> = {
      '--editor-min-height': `${this.minHeight}px`,
    };

    // Apply custom style props if provided
    if (this.editorBg) styles['--editor-bg'] = this.editorBg;
    if (this.editorBgSecondary) styles['--editor-bg-secondary'] = this.editorBgSecondary;
    if (this.editorBgTertiary) styles['--editor-bg-tertiary'] = this.editorBgTertiary;
    if (this.editorText) styles['--editor-text'] = this.editorText;
    if (this.editorTextSecondary) styles['--editor-text-secondary'] = this.editorTextSecondary;
    if (this.editorBorder) styles['--editor-border'] = this.editorBorder;
    if (this.editorAccent) styles['--editor-accent'] = this.editorAccent;
    if (this.editorBorderRadius) styles['--editor-border-radius'] = this.editorBorderRadius;
    if (this.editorFontSans) styles['--editor-font-sans'] = this.editorFontSans;
    if (this.editorFontMono) styles['--editor-font-mono'] = this.editorFontMono;
    if (this.editorFontSize) styles['--editor-font-size'] = this.editorFontSize;

    return styles;
  }

  render() {
    const availableContentTypes = this.getAvailableContentTypes();
    const availableViewModes = this.getAvailableViewModes();
    const showEditor = this.viewMode === 'editor' || this.viewMode === 'split';
    const showPreview = this.viewMode === 'preview' || this.viewMode === 'split';
    const previewHtml = getPreviewHtml(this.internalValue, this.contentType);
    const t = this.t;

    return (
      <div
        class={{
          'article-editor': true,
          'article-editor--split': this.viewMode === 'split',
          'article-editor--disabled': this.disabled,
          'article-editor--rtl': this.isRtl,
        }}
        style={this.getCustomStyles()}
        dir={this.isRtl ? 'rtl' : 'ltr'}
        aria-label={t.aria.editor}
      >
        {/* Toolbar */}
        <div class="article-editor__toolbar" role="toolbar" aria-label={t.aria.toolbar}>
          {/* Content Type Selector (HTML/Markdown) */}
          <div class="article-editor__content-type-selector" role="group" aria-label={t.aria.modeSelector}>
            {availableContentTypes.map(type => {
              const typeConfig = CONTENT_TYPES.find(c => c.type === type);
              const typeLabel = t.modes[type as keyof typeof t.modes] || typeConfig?.label || type;
              return (
                <button
                  key={type}
                  class={{
                    'article-editor__content-type-btn': true,
                    'article-editor__content-type-btn--active': this.contentType === type,
                  }}
                  onClick={() => this.handleContentTypeChange(type)}
                  disabled={this.disabled}
                  title={typeLabel}
                  aria-pressed={this.contentType === type ? 'true' : 'false'}
                >
                  {this.renderContentTypeIcon(type)}
                  <span class="article-editor__content-type-label">{typeLabel}</span>
                </button>
              );
            })}
          </div>

          {/* View Mode Selector (Editor/Preview/Split) */}
          <div class="article-editor__view-mode-selector" role="group" aria-label="View mode">
            {availableViewModes.map(mode => {
              const modeConfig = VIEW_MODES.find(v => v.mode === mode);
              const modeLabel = t.modes[mode as keyof typeof t.modes] || modeConfig?.label || mode;
              return (
                <button
                  key={mode}
                  class={{
                    'article-editor__view-mode-btn': true,
                    'article-editor__view-mode-btn--active': this.viewMode === mode,
                  }}
                  onClick={() => this.handleViewModeChange(mode)}
                  disabled={this.disabled}
                  title={modeLabel}
                  aria-pressed={this.viewMode === mode ? 'true' : 'false'}
                >
                  {this.renderViewModeIcon(mode)}
                </button>
              );
            })}
          </div>

          {/* Format Buttons */}
          {showEditor && (
            <div class="article-editor__format-toolbar" role="group" aria-label={t.aria.formatToolbar}>
              {DEFAULT_TOOLBAR_BUTTONS.slice(0, 7).map((btn, index) => {
                const label = t.toolbar[btn.action as keyof typeof t.toolbar] || btn.label;
                return [
                  index === 3 && <span class="article-editor__format-separator" key={`sep-${index}`}></span>,
                  <button
                    key={btn.action}
                    class="article-editor__format-btn"
                    onClick={() => this.handleToolbarAction(btn.action)}
                    disabled={this.disabled || this.readonly}
                    title={btn.shortcut ? `${label} (${btn.shortcut})` : label}
                    aria-label={label}
                  >
                    {this.renderToolbarIcon(btn.action)}
                  </button>,
                ];
              })}
            </div>
          )}

          {/* Actions */}
          <div class="article-editor__actions">
            {this.enableExternalPreview && (
              <button
                class={{
                  'article-editor__action-btn': true,
                  'article-editor__action-btn--active': this.isExternalPreviewOpen,
                }}
                onClick={this.toggleExternalPreview}
                disabled={this.disabled}
                title={t.actions.externalPreview}
                aria-pressed={this.isExternalPreviewOpen ? 'true' : 'false'}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                <span class="article-editor__action-text">{this.isExternalPreviewOpen ? 'Close' : t.actions.externalPreview || 'Preview'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div
          class={{
            'article-editor__content': true,
            'article-editor__content--resizing': this.isResizing,
          }}
          ref={el => (this.contentRef = el)}
        >
          {/* Editor */}
          {showEditor && (
            <div class="article-editor__editor-container" style={this.viewMode === 'split' ? { width: `${this.splitPosition}%` } : {}}>
              <textarea
                ref={el => (this.textareaRef = el)}
                class="article-editor__textarea"
                value={this.internalValue}
                placeholder={this.placeholder || t.placeholders.startWriting}
                spellcheck={this.spellcheck}
                disabled={this.disabled}
                readOnly={this.readonly}
                onInput={this.handleInput}
                onKeyDown={this.handleKeyDown}
                aria-label={t.aria.editor}
              />
            </div>
          )}

          {/* Resizer */}
          {this.viewMode === 'split' && (
            <div
              class="article-editor__resizer"
              onMouseDown={this.handleResizeStart}
              onTouchStart={this.handleResizeStart}
              role="separator"
              aria-label="Resize panels"
              aria-valuenow={this.splitPosition}
              aria-valuemin={20}
              aria-valuemax={80}
            >
              <div class="article-editor__resizer-handle"></div>
            </div>
          )}

          {/* Preview */}
          {showPreview && (
            <div class="article-editor__preview-container" style={this.viewMode === 'split' ? { width: `${100 - this.splitPosition}%` } : {}}>
              <div class="article-editor__preview-header">{t.preview.title}</div>
              <div
                class="article-editor__preview-content"
                innerHTML={sanitizeHtml(previewHtml) || `<p class="empty">${t.preview.empty}</p>`}
                aria-label={t.aria.preview}
              />
            </div>
          )}
        </div>

        {/* Status Bar */}
        {this.showWordCount && (
          <div class="article-editor__status-bar">
            <span>{formatCount(this.wordCount, t.status.words, t.status.wordsPlural)}</span>
            <span>{formatCount(this.charCount, t.status.characters, t.status.charactersPlural)}</span>
          </div>
        )}

        {/* External Preview Indicator */}
        {this.isExternalPreviewOpen && <div class="article-editor__external-indicator">{t.actions.externalPreviewOpen}</div>}
      </div>
    );
  }
}
