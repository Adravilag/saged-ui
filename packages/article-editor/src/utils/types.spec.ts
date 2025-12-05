/**
 * @adravilag/ui - Article Editor Types Tests
 */

import {
  countWords,
  countChars,
  createInitialState,
  ContentType,
  ViewMode,
  CONTENT_TYPES,
  VIEW_MODES,
  EDITOR_MODES,
  DEFAULT_TOOLBAR_BUTTONS,
} from './types';

describe('types utilities', () => {
  // =====================================================
  // COUNT WORDS
  // =====================================================

  describe('countWords', () => {
    it('counts words in plain text', () => {
      expect(countWords('hello world')).toBe(2);
      expect(countWords('one two three four')).toBe(4);
    });

    it('returns 0 for empty string', () => {
      expect(countWords('')).toBe(0);
    });

    it('returns 0 for whitespace only', () => {
      expect(countWords('   ')).toBe(0);
      expect(countWords('\n\t  ')).toBe(0);
    });

    it('strips HTML tags before counting', () => {
      expect(countWords('<p>hello world</p>')).toBe(2);
      expect(countWords('<strong>bold</strong> text')).toBe(2);
      expect(countWords('<div><span>nested</span> content</div>')).toBe(2);
    });

    it('handles multiple spaces correctly', () => {
      expect(countWords('hello   world')).toBe(2);
      expect(countWords('   spaced   out   text   ')).toBe(3);
    });

    it('handles newlines and tabs', () => {
      expect(countWords('hello\nworld')).toBe(2);
      expect(countWords('hello\tworld')).toBe(2);
      expect(countWords('line1\n\nline2')).toBe(2);
    });

    it('handles complex HTML structures', () => {
      const html = '<h1>Title</h1><p>First paragraph.</p><ul><li>Item one</li><li>Item two</li></ul>';
      expect(countWords(html)).toBe(7); // Title, First, paragraph., Item, one, Item, two
    });

    it('handles single word', () => {
      expect(countWords('word')).toBe(1);
    });

    it('handles HTML with attributes', () => {
      expect(countWords('<a href="http://example.com">link text</a>')).toBe(2);
    });
  });

  // =====================================================
  // COUNT CHARS
  // =====================================================

  describe('countChars', () => {
    it('counts characters in plain text', () => {
      expect(countChars('hello')).toBe(5);
      expect(countChars('hello world')).toBe(11);
    });

    it('returns 0 for empty string', () => {
      expect(countChars('')).toBe(0);
    });

    it('strips HTML tags before counting', () => {
      expect(countChars('<p>hello</p>')).toBe(5);
      expect(countChars('<strong>bold</strong>')).toBe(4);
    });

    it('counts spaces', () => {
      expect(countChars('a b c')).toBe(5);
    });

    it('handles special characters', () => {
      expect(countChars('hello!')).toBe(6);
      expect(countChars('café')).toBe(4);
    });

    it('handles complex HTML', () => {
      expect(countChars('<div><span>test</span></div>')).toBe(4);
    });
  });

  // =====================================================
  // CREATE INITIAL STATE
  // =====================================================

  describe('createInitialState', () => {
    it('creates default state with no arguments', () => {
      const state = createInitialState();

      expect(state.content).toBe('');
      expect(state.contentType).toBe('html');
      expect(state.viewMode).toBe('editor');
      expect(state.selection).toBeNull();
      expect(state.isDirty).toBe(false);
      expect(state.wordCount).toBe(0);
      expect(state.charCount).toBe(0);
      expect(state.isMediaLibraryOpen).toBe(false);
      expect(state.isExternalPreviewOpen).toBe(false);
    });

    it('creates state with initial content', () => {
      const state = createInitialState('Hello world');

      expect(state.content).toBe('Hello world');
      expect(state.wordCount).toBe(2);
      expect(state.charCount).toBe(11);
    });

    it('creates state with markdown content type', () => {
      const state = createInitialState('# Title', 'markdown');

      expect(state.content).toBe('# Title');
      expect(state.contentType).toBe('markdown');
      expect(state.viewMode).toBe('editor');
    });

    it('creates state with preview view mode', () => {
      const state = createInitialState('Content', 'html', 'preview');

      expect(state.content).toBe('Content');
      expect(state.contentType).toBe('html');
      expect(state.viewMode).toBe('preview');
    });

    it('creates state with split view mode', () => {
      const state = createInitialState('Content', 'markdown', 'split');

      expect(state.viewMode).toBe('split');
    });

    it('calculates word count for HTML content', () => {
      const state = createInitialState('<p>Hello <strong>world</strong></p>');

      expect(state.wordCount).toBe(2);
    });

    it('calculates char count for HTML content', () => {
      const state = createInitialState('<p>Hello</p>');
      // Note: charCount uses content.length, not stripped HTML
      expect(state.charCount).toBe(12); // '<p>Hello</p>'.length
    });
  });

  // =====================================================
  // TYPE CONSTANTS
  // =====================================================

  describe('type constants', () => {
    describe('CONTENT_TYPES', () => {
      it('contains html and markdown types', () => {
        expect(CONTENT_TYPES.length).toBe(2);
        expect(CONTENT_TYPES.find(c => c.type === 'html')).toBeDefined();
        expect(CONTENT_TYPES.find(c => c.type === 'markdown')).toBeDefined();
      });

      it('has correct labels', () => {
        const html = CONTENT_TYPES.find(c => c.type === 'html');
        const md = CONTENT_TYPES.find(c => c.type === 'markdown');

        expect(html?.label).toBe('HTML');
        expect(md?.label).toBe('Markdown');
      });

      it('has icons defined', () => {
        CONTENT_TYPES.forEach(ct => {
          expect(ct.icon).toBeDefined();
          expect(typeof ct.icon).toBe('string');
        });
      });
    });

    describe('VIEW_MODES', () => {
      it('contains editor, preview, and split modes', () => {
        expect(VIEW_MODES.length).toBe(3);
        expect(VIEW_MODES.find(v => v.mode === 'editor')).toBeDefined();
        expect(VIEW_MODES.find(v => v.mode === 'preview')).toBeDefined();
        expect(VIEW_MODES.find(v => v.mode === 'split')).toBeDefined();
      });

      it('has correct labels', () => {
        const editor = VIEW_MODES.find(v => v.mode === 'editor');
        const preview = VIEW_MODES.find(v => v.mode === 'preview');
        const split = VIEW_MODES.find(v => v.mode === 'split');

        expect(editor?.label).toBe('Editor');
        expect(preview?.label).toBe('Preview');
        expect(split?.label).toBe('Split');
      });

      it('has icons defined', () => {
        VIEW_MODES.forEach(vm => {
          expect(vm.icon).toBeDefined();
          expect(typeof vm.icon).toBe('string');
        });
      });
    });

    describe('EDITOR_MODES (deprecated)', () => {
      it('maps from CONTENT_TYPES', () => {
        expect(EDITOR_MODES.length).toBe(CONTENT_TYPES.length);
      });

      it('has mode property mapped from type', () => {
        const html = EDITOR_MODES.find(e => e.mode === 'html');
        expect(html).toBeDefined();
        expect(html?.label).toBe('HTML');
      });
    });

    describe('DEFAULT_TOOLBAR_BUTTONS', () => {
      it('contains all expected actions', () => {
        const actions = DEFAULT_TOOLBAR_BUTTONS.map(b => b.action);

        expect(actions).toContain('bold');
        expect(actions).toContain('italic');
        expect(actions).toContain('underline');
        expect(actions).toContain('strikethrough');
        expect(actions).toContain('code');
        expect(actions).toContain('link');
        expect(actions).toContain('image');
        expect(actions).toContain('h1');
        expect(actions).toContain('h2');
        expect(actions).toContain('h3');
        expect(actions).toContain('ul');
        expect(actions).toContain('ol');
        expect(actions).toContain('quote');
        expect(actions).toContain('hr');
      });

      it('has labels for all buttons', () => {
        DEFAULT_TOOLBAR_BUTTONS.forEach(btn => {
          expect(btn.label).toBeDefined();
          expect(typeof btn.label).toBe('string');
          expect(btn.label.length).toBeGreaterThan(0);
        });
      });

      it('has icons for all buttons', () => {
        DEFAULT_TOOLBAR_BUTTONS.forEach(btn => {
          expect(btn.icon).toBeDefined();
          expect(typeof btn.icon).toBe('string');
        });
      });

      it('has shortcuts for common actions', () => {
        const bold = DEFAULT_TOOLBAR_BUTTONS.find(b => b.action === 'bold');
        const italic = DEFAULT_TOOLBAR_BUTTONS.find(b => b.action === 'italic');
        const underline = DEFAULT_TOOLBAR_BUTTONS.find(b => b.action === 'underline');
        const link = DEFAULT_TOOLBAR_BUTTONS.find(b => b.action === 'link');

        expect(bold?.shortcut).toBe('Ctrl+B');
        expect(italic?.shortcut).toBe('Ctrl+I');
        expect(underline?.shortcut).toBe('Ctrl+U');
        expect(link?.shortcut).toBe('Ctrl+K');
      });
    });
  });

  // =====================================================
  // TYPE GUARDS
  // =====================================================

  describe('type definitions', () => {
    it('ContentType accepts valid values', () => {
      const html: ContentType = 'html';
      const markdown: ContentType = 'markdown';

      expect(html).toBe('html');
      expect(markdown).toBe('markdown');
    });

    it('ViewMode accepts valid values', () => {
      const editor: ViewMode = 'editor';
      const preview: ViewMode = 'preview';
      const split: ViewMode = 'split';

      expect(editor).toBe('editor');
      expect(preview).toBe('preview');
      expect(split).toBe('split');
    });
  });
});
