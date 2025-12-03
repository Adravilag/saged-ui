/**
 * @adravilag/ui - Rich Editor Types
 * Type definitions for the headless rich editor component
 */

// =====================================================
// EDITOR MODES
// =====================================================

/** Content syntax type */
export type ContentType = 'html' | 'markdown';

/** View mode for the editor */
export type ViewMode = 'editor' | 'preview' | 'split';

/** @deprecated Use ContentType and ViewMode separately */
export type EditorMode = ContentType;

export interface ContentTypeConfig {
  type: ContentType;
  label: string;
  icon: string;
}

export interface ViewModeConfig {
  mode: ViewMode;
  label: string;
  icon: string;
}

export const CONTENT_TYPES: ContentTypeConfig[] = [
  { type: 'html', label: 'HTML', icon: 'code' },
  { type: 'markdown', label: 'Markdown', icon: 'markdown' },
];

export const VIEW_MODES: ViewModeConfig[] = [
  { mode: 'editor', label: 'Editor', icon: 'edit' },
  { mode: 'preview', label: 'Preview', icon: 'eye' },
  { mode: 'split', label: 'Split', icon: 'columns' },
];

/** @deprecated Use CONTENT_TYPES and VIEW_MODES instead */
export const EDITOR_MODES = CONTENT_TYPES.map(c => ({ mode: c.type, label: c.label, icon: c.icon }));

// =====================================================
// TOOLBAR ACTIONS
// =====================================================

export type ToolbarAction =
  | 'bold'
  | 'italic'
  | 'underline'
  | 'strikethrough'
  | 'code'
  | 'link'
  | 'image'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'ul'
  | 'ol'
  | 'quote'
  | 'hr';

export interface ToolbarButton {
  action: ToolbarAction;
  label: string;
  icon: string;
  shortcut?: string;
}

export const DEFAULT_TOOLBAR_BUTTONS: ToolbarButton[] = [
  { action: 'bold', label: 'Bold', icon: 'bold', shortcut: 'Ctrl+B' },
  { action: 'italic', label: 'Italic', icon: 'italic', shortcut: 'Ctrl+I' },
  { action: 'underline', label: 'Underline', icon: 'underline', shortcut: 'Ctrl+U' },
  { action: 'strikethrough', label: 'Strikethrough', icon: 'strikethrough' },
  { action: 'code', label: 'Code', icon: 'code' },
  { action: 'link', label: 'Link', icon: 'link', shortcut: 'Ctrl+K' },
  { action: 'image', label: 'Image', icon: 'image' },
  { action: 'h1', label: 'Heading 1', icon: 'heading' },
  { action: 'h2', label: 'Heading 2', icon: 'heading' },
  { action: 'h3', label: 'Heading 3', icon: 'heading' },
  { action: 'ul', label: 'Bullet List', icon: 'list-ul' },
  { action: 'ol', label: 'Numbered List', icon: 'list-ol' },
  { action: 'quote', label: 'Quote', icon: 'quote-right' },
  { action: 'hr', label: 'Horizontal Rule', icon: 'minus' },
];

// =====================================================
// MEDIA LIBRARY
// =====================================================

export interface MediaItem {
  id: string;
  filename: string;
  url: string;
  thumbnailUrl?: string;
  type: 'image' | 'video' | 'audio' | 'document';
  mimeType: string;
  size: number;
  width?: number;
  height?: number;
  createdAt: string;
  alt?: string;
}

export interface MediaUploadProgress {
  filename: string;
  progress: number;
  status: 'pending' | 'uploading' | 'complete' | 'error';
  error?: string;
}

/**
 * Media adapter interface - implement this to connect your own backend
 */
export interface MediaAdapter {
  /**
   * Fetch list of media items from your backend
   */
  getMediaItems: (search?: string) => Promise<MediaItem[]>;

  /**
   * Upload a file to your backend
   */
  uploadFile: (file: File, onProgress?: (progress: number) => void) => Promise<MediaItem>;

  /**
   * Delete a media item from your backend
   */
  deleteItem?: (id: string) => Promise<void>;
}

// =====================================================
// EDITOR CONFIGURATION
// =====================================================

export interface RichEditorConfig {
  /**
   * Initial content type (syntax)
   * @default 'html'
   */
  initialContentType?: ContentType;

  /**
   * Initial view mode
   * @default 'editor'
   */
  initialViewMode?: ViewMode;

  /**
   * Available content types for the editor
   * @default ['html', 'markdown']
   */
  availableContentTypes?: ContentType[];

  /**
   * Available view modes
   * @default ['editor', 'preview', 'split']
   */
  availableViewModes?: ViewMode[];

  /**
   * Toolbar buttons to display
   * @default DEFAULT_TOOLBAR_BUTTONS
   */
  toolbarButtons?: ToolbarButton[];

  /**
   * Placeholder text for the editor
   */
  placeholder?: string;

  /**
   * Minimum height of the editor in pixels
   * @default 400
   */
  minHeight?: number;

  /**
   * Enable spell checking
   * @default true
   */
  spellCheck?: boolean;

  /**
   * Enable word/character count display
   * @default true
   */
  showWordCount?: boolean;

  /**
   * Enable external preview window feature
   * @default true
   */
  enableExternalPreview?: boolean;

  /**
   * Media adapter for handling file uploads/library
   * If not provided, media features are disabled
   */
  mediaAdapter?: MediaAdapter;

  /**
   * Custom CSS class for theming
   */
  customClass?: string;
}

// =====================================================
// EDITOR EVENTS
// =====================================================

export interface EditorChangeEvent {
  value: string;
  contentType: ContentType;
  viewMode: ViewMode;
  wordCount: number;
  charCount: number;
}

export interface ContentTypeChangeEvent {
  previousType: ContentType;
  newType: ContentType;
}

export interface ViewModeChangeEvent {
  previousMode: ViewMode;
  newMode: ViewMode;
}

/** @deprecated Use ContentTypeChangeEvent or ViewModeChangeEvent */
export interface EditorModeChangeEvent {
  previousMode: ContentType;
  newMode: ContentType;
}

export interface MediaInsertEvent {
  media: MediaItem;
  insertedHtml: string;
}

// =====================================================
// TEXT SELECTION
// =====================================================

export interface TextSelection {
  start: number;
  end: number;
  text: string;
}

// =====================================================
// EDITOR STATE
// =====================================================

export interface EditorState {
  content: string;
  contentType: ContentType;
  viewMode: ViewMode;
  selection: TextSelection | null;
  isDirty: boolean;
  wordCount: number;
  charCount: number;
  isMediaLibraryOpen: boolean;
  isExternalPreviewOpen: boolean;
}

export const createInitialState = (
  initialContent = '',
  initialContentType: ContentType = 'html',
  initialViewMode: ViewMode = 'editor'
): EditorState => ({
  content: initialContent,
  contentType: initialContentType,
  viewMode: initialViewMode,
  selection: null,
  isDirty: false,
  wordCount: countWords(initialContent),
  charCount: initialContent.length,
  isMediaLibraryOpen: false,
  isExternalPreviewOpen: false,
});

// =====================================================
// UTILITY FUNCTIONS
// =====================================================

/**
 * Count words in a string (strips HTML tags first)
 */
export function countWords(text: string): number {
  const stripped = text.replace(/<[^>]*>/g, ' ').trim();
  if (!stripped) return 0;
  return stripped.split(/\s+/).filter(Boolean).length;
}

/**
 * Count characters in a string (strips HTML tags)
 */
export function countChars(text: string): number {
  return text.replace(/<[^>]*>/g, '').length;
}
