/**
 * @sagebox/article-editor
 * Rich text and markdown editor component
 */

// Export component
export { ArticleEditor } from './article-editor';

// Export types and utilities
export type { ContentType, ViewMode, ToolbarAction, MediaItem } from './utils/types';

export { DEFAULT_TOOLBAR_BUTTONS, CONTENT_TYPES, VIEW_MODES, countWords, countChars } from './utils/types';

export { convertContent, getPreviewHtml, sanitizeHtml } from './utils/editor-modes';

export { getTextSelection, setTextSelection, applyToolbarAction, getActionFromKeyboard, DEFAULT_SHORTCUTS } from './utils/toolbar-actions';

export type { SupportedLocale, EditorTranslations } from './utils/i18n';

export { getTranslations, isRTL, formatCount } from './utils/i18n';
