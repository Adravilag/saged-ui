import { applyToolbarAction, getActionFromKeyboard, matchesShortcut, DEFAULT_SHORTCUTS } from './toolbar-actions';

describe('toolbar-actions utilities', () => {
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
});
