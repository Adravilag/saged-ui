/**
 * @adravilag/ui - Toolbar Actions Utilities
 * Headless functions for text formatting operations
 */

import { ToolbarAction, TextSelection, EditorMode } from './types';

// =====================================================
// TEXT SELECTION UTILITIES
// =====================================================

/**
 * Get current text selection from a textarea element
 */
export function getTextSelection(textarea: HTMLTextAreaElement): TextSelection {
  return {
    start: textarea.selectionStart,
    end: textarea.selectionEnd,
    text: textarea.value.substring(textarea.selectionStart, textarea.selectionEnd),
  };
}

/**
 * Set text selection in a textarea element
 */
export function setTextSelection(textarea: HTMLTextAreaElement, start: number, end: number): void {
  textarea.focus();
  textarea.setSelectionRange(start, end);
}

// =====================================================
// FORMATTING OPERATIONS (HTML MODE)
// =====================================================

interface FormatResult {
  newContent: string;
  newSelectionStart: number;
  newSelectionEnd: number;
}

/**
 * Apply HTML formatting to selected text
 */
function applyHtmlFormat(content: string, selection: TextSelection, tag: string, attributes: string = ''): FormatResult {
  const before = content.substring(0, selection.start);
  const after = content.substring(selection.end);
  const selectedText = selection.text || 'text';

  const openTag = attributes ? `<${tag} ${attributes}>` : `<${tag}>`;
  const closeTag = `</${tag}>`;
  const formatted = `${openTag}${selectedText}${closeTag}`;

  return {
    newContent: before + formatted + after,
    newSelectionStart: selection.start + openTag.length,
    newSelectionEnd: selection.start + openTag.length + selectedText.length,
  };
}

/**
 * Apply HTML block formatting (wraps whole line/selection)
 */
function applyHtmlBlockFormat(content: string, selection: TextSelection, tag: string): FormatResult {
  const before = content.substring(0, selection.start);
  const after = content.substring(selection.end);
  const selectedText = selection.text || 'text';

  const formatted = `<${tag}>${selectedText}</${tag}>\n`;

  return {
    newContent: before + formatted + after,
    newSelectionStart: selection.start + tag.length + 2,
    newSelectionEnd: selection.start + tag.length + 2 + selectedText.length,
  };
}

// =====================================================
// FORMATTING OPERATIONS (MARKDOWN MODE)
// =====================================================

/**
 * Apply Markdown inline formatting
 */
function applyMarkdownInlineFormat(content: string, selection: TextSelection, wrapper: string): FormatResult {
  const before = content.substring(0, selection.start);
  const after = content.substring(selection.end);
  const selectedText = selection.text || 'text';

  const formatted = `${wrapper}${selectedText}${wrapper}`;

  return {
    newContent: before + formatted + after,
    newSelectionStart: selection.start + wrapper.length,
    newSelectionEnd: selection.start + wrapper.length + selectedText.length,
  };
}

/**
 * Apply Markdown block formatting (prefix-based)
 */
function applyMarkdownBlockFormat(content: string, selection: TextSelection, prefix: string): FormatResult {
  const before = content.substring(0, selection.start);
  const after = content.substring(selection.end);
  const selectedText = selection.text || 'text';

  // Check if we're at the start of a line
  const needsNewline = before.length > 0 && !before.endsWith('\n');
  const linePrefix = needsNewline ? '\n' : '';

  const formatted = `${linePrefix}${prefix}${selectedText}`;

  return {
    newContent: before + formatted + after,
    newSelectionStart: selection.start + linePrefix.length + prefix.length,
    newSelectionEnd: selection.start + linePrefix.length + prefix.length + selectedText.length,
  };
}

// =====================================================
// LINK AND IMAGE INSERTION
// =====================================================

/**
 * Insert a link in HTML mode
 */
function insertHtmlLink(content: string, selection: TextSelection, url: string = 'https://'): FormatResult {
  return applyHtmlFormat(content, selection, 'a', `href="${url}"`);
}

/**
 * Insert a link in Markdown mode
 */
function insertMarkdownLink(content: string, selection: TextSelection, url: string = 'https://'): FormatResult {
  const before = content.substring(0, selection.start);
  const after = content.substring(selection.end);
  const linkText = selection.text || 'link text';

  const formatted = `[${linkText}](${url})`;

  return {
    newContent: before + formatted + after,
    newSelectionStart: selection.start + 1,
    newSelectionEnd: selection.start + 1 + linkText.length,
  };
}

/**
 * Insert an image in HTML mode
 */
function insertHtmlImage(content: string, selection: TextSelection, url: string, alt: string = ''): FormatResult {
  const before = content.substring(0, selection.start);
  const after = content.substring(selection.end);
  const altText = alt || selection.text || 'image';

  const formatted = `<img src="${url}" alt="${altText}" />`;

  return {
    newContent: before + formatted + after,
    newSelectionStart: selection.start + formatted.length,
    newSelectionEnd: selection.start + formatted.length,
  };
}

/**
 * Insert an image in Markdown mode
 */
function insertMarkdownImage(content: string, selection: TextSelection, url: string, alt: string = ''): FormatResult {
  const before = content.substring(0, selection.start);
  const after = content.substring(selection.end);
  const altText = alt || selection.text || 'image';

  const formatted = `![${altText}](${url})`;

  return {
    newContent: before + formatted + after,
    newSelectionStart: selection.start + formatted.length,
    newSelectionEnd: selection.start + formatted.length,
  };
}

// =====================================================
// MAIN ACTION DISPATCHER
// =====================================================

export interface ApplyActionOptions {
  content: string;
  selection: TextSelection;
  mode: EditorMode;
  action: ToolbarAction;
  url?: string;
  alt?: string;
}

/**
 * Apply a toolbar action to the content
 */
export function applyToolbarAction(options: ApplyActionOptions): FormatResult {
  const { content, selection, mode, action, url, alt } = options;
  const isMarkdown = mode === 'markdown';

  switch (action) {
    // Inline formatting
    case 'bold':
      return isMarkdown ? applyMarkdownInlineFormat(content, selection, '**') : applyHtmlFormat(content, selection, 'strong');

    case 'italic':
      return isMarkdown ? applyMarkdownInlineFormat(content, selection, '*') : applyHtmlFormat(content, selection, 'em');

    case 'underline':
      return isMarkdown ? applyMarkdownInlineFormat(content, selection, '<u>') : applyHtmlFormat(content, selection, 'u');

    case 'strikethrough':
      return isMarkdown ? applyMarkdownInlineFormat(content, selection, '~~') : applyHtmlFormat(content, selection, 'del');

    case 'code':
      return isMarkdown ? applyMarkdownInlineFormat(content, selection, '`') : applyHtmlFormat(content, selection, 'code');

    // Block formatting
    case 'h1':
      return isMarkdown ? applyMarkdownBlockFormat(content, selection, '# ') : applyHtmlBlockFormat(content, selection, 'h1');

    case 'h2':
      return isMarkdown ? applyMarkdownBlockFormat(content, selection, '## ') : applyHtmlBlockFormat(content, selection, 'h2');

    case 'h3':
      return isMarkdown ? applyMarkdownBlockFormat(content, selection, '### ') : applyHtmlBlockFormat(content, selection, 'h3');

    case 'ul':
      return isMarkdown ? applyMarkdownBlockFormat(content, selection, '- ') : applyHtmlFormat(content, selection, 'li');

    case 'ol':
      return isMarkdown ? applyMarkdownBlockFormat(content, selection, '1. ') : applyHtmlFormat(content, selection, 'li');

    case 'quote':
      return isMarkdown ? applyMarkdownBlockFormat(content, selection, '> ') : applyHtmlBlockFormat(content, selection, 'blockquote');

    case 'hr':
      const before = content.substring(0, selection.start);
      const after = content.substring(selection.end);
      const hrText = isMarkdown ? '\n\n---\n\n' : '\n<hr />\n';
      return {
        newContent: before + hrText + after,
        newSelectionStart: selection.start + hrText.length,
        newSelectionEnd: selection.start + hrText.length,
      };

    // Links and images
    case 'link':
      return isMarkdown ? insertMarkdownLink(content, selection, url) : insertHtmlLink(content, selection, url);

    case 'image':
      return isMarkdown ? insertMarkdownImage(content, selection, url || '', alt) : insertHtmlImage(content, selection, url || '', alt);

    default:
      return {
        newContent: content,
        newSelectionStart: selection.start,
        newSelectionEnd: selection.end,
      };
  }
}

// =====================================================
// KEYBOARD SHORTCUTS
// =====================================================

export interface KeyboardShortcut {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  action: ToolbarAction;
}

export const DEFAULT_SHORTCUTS: KeyboardShortcut[] = [
  { key: 'b', ctrl: true, action: 'bold' },
  { key: 'i', ctrl: true, action: 'italic' },
  { key: 'u', ctrl: true, action: 'underline' },
  { key: 'k', ctrl: true, action: 'link' },
  { key: '1', ctrl: true, shift: true, action: 'h1' },
  { key: '2', ctrl: true, shift: true, action: 'h2' },
  { key: '3', ctrl: true, shift: true, action: 'h3' },
];

/**
 * Check if a keyboard event matches a shortcut
 */
export function matchesShortcut(event: KeyboardEvent, shortcut: KeyboardShortcut): boolean {
  const ctrlMatch = shortcut.ctrl ? event.ctrlKey || event.metaKey : !event.ctrlKey && !event.metaKey;
  const shiftMatch = shortcut.shift ? event.shiftKey : !event.shiftKey;
  const altMatch = shortcut.alt ? event.altKey : !event.altKey;

  return event.key.toLowerCase() === shortcut.key.toLowerCase() && ctrlMatch && shiftMatch && altMatch;
}

/**
 * Find matching action for a keyboard event
 */
export function getActionFromKeyboard(event: KeyboardEvent, shortcuts: KeyboardShortcut[] = DEFAULT_SHORTCUTS): ToolbarAction | null {
  for (const shortcut of shortcuts) {
    if (matchesShortcut(event, shortcut)) {
      return shortcut.action;
    }
  }
  return null;
}
