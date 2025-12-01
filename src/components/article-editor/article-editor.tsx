import { Component, Prop, State, Event, EventEmitter, h, Watch, Method } from '@stencil/core';
import { EditorMode, EditorChangeEvent, EditorModeChangeEvent, MediaItem, EDITOR_MODES, DEFAULT_TOOLBAR_BUTTONS, countWords, countChars } from './utils';
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
   * Current editor mode
   */
  @Prop({ mutable: true }) mode: EditorMode = 'html';

  /**
   * Available modes (comma-separated or array)
   */
  @Prop() availableModes: string = 'html,markdown,preview,split';

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

  // =====================================================
  // EVENTS
  // =====================================================

  /**
   * Emitted when the content changes
   */
  @Event() editorChange: EventEmitter<EditorChangeEvent>;

  /**
   * Emitted when the mode changes
   */
  @Event() editorModeChange: EventEmitter<EditorModeChangeEvent>;

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
    return getPreviewHtml(this.internalValue, this.mode);
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
    const isMarkdown = this.mode === 'markdown';
    const content = isMarkdown ? `![${media.alt || media.filename}](${media.url})` : `<img src="${media.url}" alt="${media.alt || media.filename}" />`;

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
      mode: this.mode,
      wordCount: this.wordCount,
      charCount: this.charCount,
    });
  }

  private getAvailableModes(): EditorMode[] {
    const modes = this.availableModes.split(',').map(m => m.trim() as EditorMode);
    return EDITOR_MODES.filter(m => modes.includes(m.mode)).map(m => m.mode);
  }

  private handleInput = (event: Event) => {
    const target = event.target as HTMLTextAreaElement;
    this.internalValue = target.value;
    this.value = target.value;
    this.updateCounts();
    this.emitChange();
    this.updateExternalPreview();
  };

  private handleModeChange = (newMode: EditorMode) => {
    if (newMode === this.mode) return;

    const previousMode = this.mode;

    // Convert content when switching between html and markdown
    if ((previousMode === 'html' && newMode === 'markdown') || (previousMode === 'markdown' && newMode === 'html')) {
      this.internalValue = convertContent(this.internalValue, previousMode, newMode);
      this.value = this.internalValue;
    }

    this.mode = newMode;
    this.editorModeChange.emit({ previousMode, newMode });
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
      mode: this.mode,
      action: action as any,
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

    const html = getPreviewHtml(this.internalValue, this.mode);
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
    const availableModes = this.getAvailableModes();
    const showEditor = this.mode === 'html' || this.mode === 'markdown' || this.mode === 'split';
    const showPreview = this.mode === 'preview' || this.mode === 'split';
    const previewHtml = getPreviewHtml(this.internalValue, this.mode);
    const t = this.t;

    return (
      <div
        class={{
          'article-editor': true,
          'article-editor--split': this.mode === 'split',
          'article-editor--disabled': this.disabled,
          'article-editor--rtl': this.isRtl,
        }}
        style={this.getCustomStyles()}
        dir={this.isRtl ? 'rtl' : 'ltr'}
        aria-label={t.aria.editor}
      >
        {/* Toolbar */}
        <div class="article-editor__toolbar" role="toolbar" aria-label={t.aria.toolbar}>
          {/* Mode Selector */}
          <div class="article-editor__mode-selector" role="group" aria-label={t.aria.modeSelector}>
            {availableModes.map(mode => {
              const modeLabel = t.modes[mode as keyof typeof t.modes];
              return (
                <button
                  key={mode}
                  class={{
                    'article-editor__mode-btn': true,
                    'article-editor__mode-btn--active': this.mode === mode,
                  }}
                  onClick={() => this.handleModeChange(mode)}
                  disabled={this.disabled}
                  title={modeLabel}
                  aria-pressed={this.mode === mode ? 'true' : 'false'}
                >
                  {modeLabel}
                </button>
              );
            })}
          </div>

          {/* Format Buttons */}
          {showEditor && (
            <div class="article-editor__format-toolbar" role="group" aria-label={t.aria.formatToolbar}>
              {DEFAULT_TOOLBAR_BUTTONS.slice(0, 7).map(btn => {
                const label = t.toolbar[btn.action as keyof typeof t.toolbar] || btn.label;
                return (
                  <button
                    key={btn.action}
                    class="article-editor__format-btn"
                    onClick={() => this.handleToolbarAction(btn.action)}
                    disabled={this.disabled || this.readonly}
                    title={btn.shortcut ? `${label} (${btn.shortcut})` : label}
                    aria-label={label}
                  >
                    {btn.label.charAt(0)}
                  </button>
                );
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
                ↗
              </button>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div class="article-editor__content">
          {/* Editor */}
          {showEditor && (
            <div class="article-editor__editor-container">
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

          {/* Preview */}
          {showPreview && (
            <div class="article-editor__preview-container">
              <div class="article-editor__preview-header">{t.preview.title}</div>
              <div class="article-editor__preview-content" innerHTML={sanitizeHtml(previewHtml) || `<p class="empty">${t.preview.empty}</p>`} aria-label={t.aria.preview} />
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
