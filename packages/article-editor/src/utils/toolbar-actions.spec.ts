import {
  applyToolbarAction,
  getActionFromKeyboard,
  matchesShortcut,
  getTextSelection,
  setTextSelection,
  DEFAULT_SHORTCUTS,
  KeyboardShortcut,
} from './toolbar-actions';

describe('toolbar-actions utilities', () => {
  // =====================================================
  // TEXT SELECTION UTILITIES
  // =====================================================

  describe('getTextSelection', () => {
    it('returns correct selection from textarea', () => {
      const textarea = document.createElement('textarea');
      textarea.value = 'hello world';
      textarea.selectionStart = 0;
      textarea.selectionEnd = 5;

      const selection = getTextSelection(textarea);

      expect(selection.start).toBe(0);
      expect(selection.end).toBe(5);
      expect(selection.text).toBe('hello');
    });

    it('returns empty text when no selection', () => {
      const textarea = document.createElement('textarea');
      textarea.value = 'hello world';
      textarea.selectionStart = 5;
      textarea.selectionEnd = 5;

      const selection = getTextSelection(textarea);

      expect(selection.start).toBe(5);
      expect(selection.end).toBe(5);
      expect(selection.text).toBe('');
    });

    it('handles selection at end of text', () => {
      const textarea = document.createElement('textarea');
      textarea.value = 'hello';
      textarea.selectionStart = 5;
      textarea.selectionEnd = 5;

      const selection = getTextSelection(textarea);

      expect(selection.start).toBe(5);
      expect(selection.end).toBe(5);
      expect(selection.text).toBe('');
    });
  });

  describe('setTextSelection', () => {
    it('sets selection range on textarea', () => {
      const textarea = document.createElement('textarea');
      textarea.value = 'hello world';
      // Mock setSelectionRange for JSDOM environment
      textarea.setSelectionRange = jest.fn((start: number, end: number) => {
        textarea.selectionStart = start;
        textarea.selectionEnd = end;
      });
      document.body.appendChild(textarea);

      setTextSelection(textarea, 0, 5);

      expect(textarea.setSelectionRange).toHaveBeenCalledWith(0, 5);

      document.body.removeChild(textarea);
    });

    it('focuses the textarea', () => {
      const textarea = document.createElement('textarea');
      textarea.value = 'hello world';
      // Mock setSelectionRange for JSDOM environment
      textarea.setSelectionRange = jest.fn();
      document.body.appendChild(textarea);

      const focusSpy = jest.spyOn(textarea, 'focus');
      setTextSelection(textarea, 0, 5);

      expect(focusSpy).toHaveBeenCalled();

      document.body.removeChild(textarea);
    });
  });

  // =====================================================
  // APPLY TOOLBAR ACTION - HTML MODE
  // =====================================================

  describe('applyToolbarAction (HTML mode)', () => {
    const baseOptions = {
      mode: 'html' as const,
      selection: { start: 0, end: 4, text: 'test' },
    };

    it('applies bold formatting', () => {
      const result = applyToolbarAction({
        ...baseOptions,
        content: 'test content',
        action: 'bold',
      });

      expect(result.newContent).toBe('<strong>test</strong> content');
    });

    it('applies italic formatting', () => {
      const result = applyToolbarAction({
        ...baseOptions,
        content: 'test content',
        action: 'italic',
      });

      expect(result.newContent).toBe('<em>test</em> content');
    });

    it('applies code formatting', () => {
      const result = applyToolbarAction({
        ...baseOptions,
        content: 'test content',
        action: 'code',
      });

      expect(result.newContent).toBe('<code>test</code> content');
    });

    it('applies h1 formatting', () => {
      const result = applyToolbarAction({
        ...baseOptions,
        content: 'test',
        action: 'h1',
      });

      expect(result.newContent).toContain('<h1>');
      expect(result.newContent).toContain('</h1>');
    });

    it('applies h2 formatting', () => {
      const result = applyToolbarAction({
        ...baseOptions,
        content: 'test',
        action: 'h2',
      });

      expect(result.newContent).toContain('<h2>');
    });

    it('inserts horizontal rule', () => {
      const result = applyToolbarAction({
        content: 'before after',
        mode: 'html',
        selection: { start: 7, end: 7, text: '' },
        action: 'hr',
      });

      expect(result.newContent).toContain('<hr />');
    });

    it('handles empty selection with default text', () => {
      const result = applyToolbarAction({
        content: 'content',
        mode: 'html',
        selection: { start: 0, end: 0, text: '' },
        action: 'bold',
      });

      expect(result.newContent).toContain('<strong>text</strong>');
    });
  });

  // =====================================================
  // APPLY TOOLBAR ACTION - MARKDOWN MODE
  // =====================================================

  describe('applyToolbarAction (Markdown mode)', () => {
    const baseOptions = {
      mode: 'markdown' as const,
      selection: { start: 0, end: 4, text: 'test' },
    };

    it('applies bold formatting', () => {
      const result = applyToolbarAction({
        ...baseOptions,
        content: 'test content',
        action: 'bold',
      });

      expect(result.newContent).toBe('**test** content');
    });

    it('applies italic formatting', () => {
      const result = applyToolbarAction({
        ...baseOptions,
        content: 'test content',
        action: 'italic',
      });

      expect(result.newContent).toBe('*test* content');
    });

    it('applies code formatting', () => {
      const result = applyToolbarAction({
        ...baseOptions,
        content: 'test content',
        action: 'code',
      });

      expect(result.newContent).toBe('`test` content');
    });

    it('applies strikethrough formatting', () => {
      const result = applyToolbarAction({
        ...baseOptions,
        content: 'test content',
        action: 'strikethrough',
      });

      expect(result.newContent).toBe('~~test~~ content');
    });

    it('applies h1 formatting', () => {
      const result = applyToolbarAction({
        ...baseOptions,
        content: 'test',
        action: 'h1',
      });

      expect(result.newContent).toBe('# test');
    });

    it('applies h2 formatting', () => {
      const result = applyToolbarAction({
        ...baseOptions,
        content: 'test',
        action: 'h2',
      });

      expect(result.newContent).toBe('## test');
    });

    it('applies bullet list formatting', () => {
      const result = applyToolbarAction({
        ...baseOptions,
        content: 'test',
        action: 'ul',
      });

      expect(result.newContent).toBe('- test');
    });

    it('applies numbered list formatting', () => {
      const result = applyToolbarAction({
        ...baseOptions,
        content: 'test',
        action: 'ol',
      });

      expect(result.newContent).toBe('1. test');
    });

    it('applies quote formatting', () => {
      const result = applyToolbarAction({
        ...baseOptions,
        content: 'test',
        action: 'quote',
      });

      expect(result.newContent).toBe('> test');
    });

    it('inserts horizontal rule', () => {
      const result = applyToolbarAction({
        content: 'before after',
        mode: 'markdown',
        selection: { start: 7, end: 7, text: '' },
        action: 'hr',
      });

      expect(result.newContent).toContain('---');
    });
  });

  // =====================================================
  // LINK INSERTION
  // =====================================================

  describe('link insertion', () => {
    it('inserts HTML link', () => {
      const result = applyToolbarAction({
        content: 'click here',
        mode: 'html',
        selection: { start: 6, end: 10, text: 'here' },
        action: 'link',
        url: 'https://example.com',
      });

      expect(result.newContent).toContain('href="https://example.com"');
    });

    it('inserts Markdown link', () => {
      const result = applyToolbarAction({
        content: 'click here',
        mode: 'markdown',
        selection: { start: 6, end: 10, text: 'here' },
        action: 'link',
        url: 'https://example.com',
      });

      expect(result.newContent).toContain('[here](https://example.com)');
    });
  });

  // =====================================================
  // IMAGE INSERTION
  // =====================================================

  describe('image insertion', () => {
    it('inserts HTML image', () => {
      const result = applyToolbarAction({
        content: '',
        mode: 'html',
        selection: { start: 0, end: 0, text: '' },
        action: 'image',
        url: 'image.jpg',
        alt: 'My image',
      });

      expect(result.newContent).toContain('src="image.jpg"');
      expect(result.newContent).toContain('alt="My image"');
    });

    it('inserts Markdown image', () => {
      const result = applyToolbarAction({
        content: '',
        mode: 'markdown',
        selection: { start: 0, end: 0, text: '' },
        action: 'image',
        url: 'image.jpg',
        alt: 'My image',
      });

      expect(result.newContent).toBe('![My image](image.jpg)');
    });
  });

  // =====================================================
  // KEYBOARD SHORTCUTS
  // =====================================================

  describe('keyboard shortcuts', () => {
    it('detects Ctrl+B as bold', () => {
      const event = new KeyboardEvent('keydown', {
        key: 'b',
        ctrlKey: true,
      });

      const action = getActionFromKeyboard(event, DEFAULT_SHORTCUTS);
      expect(action).toBe('bold');
    });

    it('detects Ctrl+I as italic', () => {
      const event = new KeyboardEvent('keydown', {
        key: 'i',
        ctrlKey: true,
      });

      const action = getActionFromKeyboard(event, DEFAULT_SHORTCUTS);
      expect(action).toBe('italic');
    });

    it('detects Ctrl+K as link', () => {
      const event = new KeyboardEvent('keydown', {
        key: 'k',
        ctrlKey: true,
      });

      const action = getActionFromKeyboard(event, DEFAULT_SHORTCUTS);
      expect(action).toBe('link');
    });

    it('returns null for non-shortcut keys', () => {
      const event = new KeyboardEvent('keydown', {
        key: 'x',
        ctrlKey: true,
      });

      const action = getActionFromKeyboard(event, DEFAULT_SHORTCUTS);
      expect(action).toBeNull();
    });

    it('matchesShortcut works correctly', () => {
      const shortcut = { key: 'b', ctrl: true, action: 'bold' as const };

      const matchingEvent = new KeyboardEvent('keydown', {
        key: 'b',
        ctrlKey: true,
      });

      const nonMatchingEvent = new KeyboardEvent('keydown', {
        key: 'b',
        ctrlKey: false,
      });

      expect(matchesShortcut(matchingEvent, shortcut)).toBe(true);
      expect(matchesShortcut(nonMatchingEvent, shortcut)).toBe(false);
    });
  });

  // =====================================================
  // SELECTION CURSOR POSITION
  // =====================================================

  describe('cursor position after formatting', () => {
    it('positions cursor inside formatted text', () => {
      const result = applyToolbarAction({
        content: 'test',
        mode: 'html',
        selection: { start: 0, end: 4, text: 'test' },
        action: 'bold',
      });

      // Cursor should be at start of selected text (after opening tag)
      expect(result.newSelectionStart).toBe('<strong>'.length);
      expect(result.newSelectionEnd).toBe('<strong>'.length + 4);
    });

    it('positions cursor after inserted element', () => {
      const result = applyToolbarAction({
        content: 'before after',
        mode: 'html',
        selection: { start: 7, end: 7, text: '' },
        action: 'hr',
      });

      // Cursor should be after the inserted HR
      expect(result.newSelectionStart).toBeGreaterThan(7);
    });
  });

  // =====================================================
  // ADDITIONAL HTML MODE TESTS
  // =====================================================

  describe('applyToolbarAction - additional HTML tests', () => {
    it('applies underline formatting in HTML', () => {
      const result = applyToolbarAction({
        content: 'test content',
        mode: 'html',
        selection: { start: 0, end: 4, text: 'test' },
        action: 'underline',
      });

      expect(result.newContent).toBe('<u>test</u> content');
    });

    it('applies strikethrough formatting in HTML', () => {
      const result = applyToolbarAction({
        content: 'test content',
        mode: 'html',
        selection: { start: 0, end: 4, text: 'test' },
        action: 'strikethrough',
      });

      expect(result.newContent).toBe('<del>test</del> content');
    });

    it('applies h3 formatting in HTML', () => {
      const result = applyToolbarAction({
        content: 'test',
        mode: 'html',
        selection: { start: 0, end: 4, text: 'test' },
        action: 'h3',
      });

      expect(result.newContent).toContain('<h3>');
      expect(result.newContent).toContain('</h3>');
    });

    it('applies ul formatting in HTML', () => {
      const result = applyToolbarAction({
        content: 'test',
        mode: 'html',
        selection: { start: 0, end: 4, text: 'test' },
        action: 'ul',
      });

      expect(result.newContent).toContain('<li>test</li>');
    });

    it('applies ol formatting in HTML', () => {
      const result = applyToolbarAction({
        content: 'test',
        mode: 'html',
        selection: { start: 0, end: 4, text: 'test' },
        action: 'ol',
      });

      expect(result.newContent).toContain('<li>test</li>');
    });

    it('applies quote formatting in HTML', () => {
      const result = applyToolbarAction({
        content: 'test',
        mode: 'html',
        selection: { start: 0, end: 4, text: 'test' },
        action: 'quote',
      });

      expect(result.newContent).toContain('<blockquote>');
      expect(result.newContent).toContain('</blockquote>');
    });

    it('inserts HTML link with default URL', () => {
      const result = applyToolbarAction({
        content: 'click here',
        mode: 'html',
        selection: { start: 6, end: 10, text: 'here' },
        action: 'link',
      });

      expect(result.newContent).toContain('href="https://"');
    });

    it('inserts HTML image without alt using selection text', () => {
      const result = applyToolbarAction({
        content: 'photo',
        mode: 'html',
        selection: { start: 0, end: 5, text: 'photo' },
        action: 'image',
        url: 'photo.jpg',
      });

      expect(result.newContent).toContain('alt="photo"');
    });

    it('inserts HTML image with default alt when empty', () => {
      const result = applyToolbarAction({
        content: '',
        mode: 'html',
        selection: { start: 0, end: 0, text: '' },
        action: 'image',
        url: 'test.jpg',
      });

      expect(result.newContent).toContain('alt="image"');
    });
  });

  // =====================================================
  // ADDITIONAL MARKDOWN MODE TESTS
  // =====================================================

  describe('applyToolbarAction - additional Markdown tests', () => {
    it('applies underline formatting in Markdown (uses HTML tag)', () => {
      const result = applyToolbarAction({
        content: 'test content',
        mode: 'markdown',
        selection: { start: 0, end: 4, text: 'test' },
        action: 'underline',
      });

      // Markdown uses <u> tags for underline
      expect(result.newContent).toBe('<u>test<u> content');
    });

    it('applies h3 formatting in Markdown', () => {
      const result = applyToolbarAction({
        content: 'test',
        mode: 'markdown',
        selection: { start: 0, end: 4, text: 'test' },
        action: 'h3',
      });

      expect(result.newContent).toBe('### test');
    });

    it('inserts Markdown link with default URL', () => {
      const result = applyToolbarAction({
        content: 'click here',
        mode: 'markdown',
        selection: { start: 6, end: 10, text: 'here' },
        action: 'link',
      });

      expect(result.newContent).toContain('[here](https://)');
    });

    it('inserts Markdown link with default text when no selection', () => {
      const result = applyToolbarAction({
        content: '',
        mode: 'markdown',
        selection: { start: 0, end: 0, text: '' },
        action: 'link',
        url: 'https://example.com',
      });

      expect(result.newContent).toContain('[link text](https://example.com)');
    });

    it('inserts Markdown image without alt using selection text', () => {
      const result = applyToolbarAction({
        content: 'photo',
        mode: 'markdown',
        selection: { start: 0, end: 5, text: 'photo' },
        action: 'image',
        url: 'photo.jpg',
      });

      expect(result.newContent).toBe('![photo](photo.jpg)');
    });

    it('inserts Markdown image with default alt when empty', () => {
      const result = applyToolbarAction({
        content: '',
        mode: 'markdown',
        selection: { start: 0, end: 0, text: '' },
        action: 'image',
        url: 'test.jpg',
      });

      expect(result.newContent).toBe('![image](test.jpg)');
    });

    it('adds newline before block format when not at line start', () => {
      const result = applyToolbarAction({
        content: 'some text',
        mode: 'markdown',
        selection: { start: 9, end: 9, text: '' },
        action: 'h1',
      });

      expect(result.newContent).toContain('\n# ');
    });
  });

  // =====================================================
  // DEFAULT/UNKNOWN ACTION
  // =====================================================

  describe('unknown action handling', () => {
    it('returns unchanged content for unknown action', () => {
      const result = applyToolbarAction({
        content: 'test content',
        mode: 'html',
        selection: { start: 0, end: 4, text: 'test' },
        action: 'unknown' as never,
      });

      expect(result.newContent).toBe('test content');
      expect(result.newSelectionStart).toBe(0);
      expect(result.newSelectionEnd).toBe(4);
    });
  });

  // =====================================================
  // KEYBOARD SHORTCUTS - ADDITIONAL TESTS
  // =====================================================

  describe('keyboard shortcuts - additional tests', () => {
    it('detects Ctrl+U as underline', () => {
      const event = new KeyboardEvent('keydown', {
        key: 'u',
        ctrlKey: true,
      });

      const action = getActionFromKeyboard(event, DEFAULT_SHORTCUTS);
      expect(action).toBe('underline');
    });

    it('detects Ctrl+Shift+1 as h1', () => {
      const event = new KeyboardEvent('keydown', {
        key: '1',
        ctrlKey: true,
        shiftKey: true,
      });

      const action = getActionFromKeyboard(event, DEFAULT_SHORTCUTS);
      expect(action).toBe('h1');
    });

    it('detects Ctrl+Shift+2 as h2', () => {
      const event = new KeyboardEvent('keydown', {
        key: '2',
        ctrlKey: true,
        shiftKey: true,
      });

      const action = getActionFromKeyboard(event, DEFAULT_SHORTCUTS);
      expect(action).toBe('h2');
    });

    it('detects Ctrl+Shift+3 as h3', () => {
      const event = new KeyboardEvent('keydown', {
        key: '3',
        ctrlKey: true,
        shiftKey: true,
      });

      const action = getActionFromKeyboard(event, DEFAULT_SHORTCUTS);
      expect(action).toBe('h3');
    });

    it('detects metaKey as equivalent to ctrlKey', () => {
      const event = new KeyboardEvent('keydown', {
        key: 'b',
        metaKey: true,
      });

      const action = getActionFromKeyboard(event, DEFAULT_SHORTCUTS);
      expect(action).toBe('bold');
    });

    it('matchesShortcut handles shift requirement', () => {
      const shortcut: KeyboardShortcut = { key: '1', ctrl: true, shift: true, action: 'h1' };

      const matchingEvent = new KeyboardEvent('keydown', {
        key: '1',
        ctrlKey: true,
        shiftKey: true,
      });

      const nonMatchingEvent = new KeyboardEvent('keydown', {
        key: '1',
        ctrlKey: true,
        shiftKey: false,
      });

      expect(matchesShortcut(matchingEvent, shortcut)).toBe(true);
      expect(matchesShortcut(nonMatchingEvent, shortcut)).toBe(false);
    });

    it('matchesShortcut handles alt requirement', () => {
      const shortcut: KeyboardShortcut = { key: 'a', alt: true, action: 'bold' };

      const matchingEvent = new KeyboardEvent('keydown', {
        key: 'a',
        altKey: true,
      });

      const nonMatchingEvent = new KeyboardEvent('keydown', {
        key: 'a',
        altKey: false,
      });

      expect(matchesShortcut(matchingEvent, shortcut)).toBe(true);
      expect(matchesShortcut(nonMatchingEvent, shortcut)).toBe(false);
    });

    it('matchesShortcut is case insensitive for keys', () => {
      const shortcut: KeyboardShortcut = { key: 'B', ctrl: true, action: 'bold' };

      const event = new KeyboardEvent('keydown', {
        key: 'b',
        ctrlKey: true,
      });

      expect(matchesShortcut(event, shortcut)).toBe(true);
    });

    it('uses default shortcuts when not provided', () => {
      const event = new KeyboardEvent('keydown', {
        key: 'b',
        ctrlKey: true,
      });

      const action = getActionFromKeyboard(event);
      expect(action).toBe('bold');
    });
  });

  // =====================================================
  // DEFAULT_SHORTCUTS CONSTANT
  // =====================================================

  describe('DEFAULT_SHORTCUTS constant', () => {
    it('contains expected shortcuts', () => {
      expect(DEFAULT_SHORTCUTS.length).toBeGreaterThan(0);

      const boldShortcut = DEFAULT_SHORTCUTS.find(s => s.action === 'bold');
      expect(boldShortcut).toBeDefined();
      expect(boldShortcut?.key).toBe('b');
      expect(boldShortcut?.ctrl).toBe(true);
    });

    it('has shortcuts for formatting actions', () => {
      const actions = DEFAULT_SHORTCUTS.map(s => s.action);
      expect(actions).toContain('bold');
      expect(actions).toContain('italic');
      expect(actions).toContain('underline');
      expect(actions).toContain('link');
    });

    it('has shortcuts for headings', () => {
      const h1 = DEFAULT_SHORTCUTS.find(s => s.action === 'h1');
      const h2 = DEFAULT_SHORTCUTS.find(s => s.action === 'h2');
      const h3 = DEFAULT_SHORTCUTS.find(s => s.action === 'h3');

      expect(h1).toBeDefined();
      expect(h2).toBeDefined();
      expect(h3).toBeDefined();
    });
  });
});
