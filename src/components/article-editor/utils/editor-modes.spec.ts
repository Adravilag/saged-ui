import { htmlToMarkdown, markdownToHtml, convertContent, sanitizeHtml } from './editor-modes';

describe('editor-modes utilities', () => {
  // =====================================================
  // HTML TO MARKDOWN
  // =====================================================

  describe('htmlToMarkdown', () => {
    it('converts headers', () => {
      expect(htmlToMarkdown('<h1>Title</h1>')).toBe('# Title');
      expect(htmlToMarkdown('<h2>Subtitle</h2>')).toBe('## Subtitle');
      expect(htmlToMarkdown('<h3>Section</h3>')).toBe('### Section');
    });

    it('converts bold text', () => {
      expect(htmlToMarkdown('<strong>bold</strong>')).toBe('**bold**');
      expect(htmlToMarkdown('<b>bold</b>')).toBe('**bold**');
    });

    it('converts italic text', () => {
      expect(htmlToMarkdown('<em>italic</em>')).toBe('*italic*');
      expect(htmlToMarkdown('<i>italic</i>')).toBe('*italic*');
    });

    it('converts strikethrough', () => {
      expect(htmlToMarkdown('<del>deleted</del>')).toBe('~~deleted~~');
      expect(htmlToMarkdown('<s>strikethrough</s>')).toBe('~~strikethrough~~');
    });

    it('converts code', () => {
      expect(htmlToMarkdown('<code>code</code>')).toBe('`code`');
    });

    it('converts links', () => {
      expect(htmlToMarkdown('<a href="https://example.com">Link</a>')).toBe('[Link](https://example.com)');
    });

    it('converts images', () => {
      expect(htmlToMarkdown('<img src="image.jpg" alt="Alt text" />')).toBe('![Alt text](image.jpg)');
    });

    it('converts blockquotes', () => {
      const html = '<blockquote>Quote text</blockquote>';
      const result = htmlToMarkdown(html);
      expect(result).toContain('> Quote text');
    });

    it('converts horizontal rules', () => {
      expect(htmlToMarkdown('<hr />')).toContain('---');
    });

    it('handles empty input', () => {
      expect(htmlToMarkdown('')).toBe('');
      expect(htmlToMarkdown('   ')).toBe('');
    });
  });

  // =====================================================
  // MARKDOWN TO HTML
  // =====================================================

  describe('markdownToHtml', () => {
    it('converts headers', () => {
      expect(markdownToHtml('# Title')).toContain('<h1>Title</h1>');
      expect(markdownToHtml('## Subtitle')).toContain('<h2>Subtitle</h2>');
      expect(markdownToHtml('### Section')).toContain('<h3>Section</h3>');
    });

    it('converts bold text', () => {
      expect(markdownToHtml('**bold**')).toContain('<strong>bold</strong>');
      expect(markdownToHtml('__bold__')).toContain('<strong>bold</strong>');
    });

    it('converts italic text', () => {
      expect(markdownToHtml('*italic*')).toContain('<em>italic</em>');
      expect(markdownToHtml('_italic_')).toContain('<em>italic</em>');
    });

    it('converts strikethrough', () => {
      expect(markdownToHtml('~~deleted~~')).toContain('<del>deleted</del>');
    });

    it('converts inline code', () => {
      expect(markdownToHtml('`code`')).toContain('<code>code</code>');
    });

    it('converts code blocks', () => {
      const markdown = '```\ncode block\n```';
      const result = markdownToHtml(markdown);
      expect(result).toContain('<pre>');
      expect(result).toContain('<code>');
    });

    it('converts links', () => {
      expect(markdownToHtml('[Link](https://example.com)')).toContain('<a href="https://example.com">Link</a>');
    });

    it('converts images', () => {
      expect(markdownToHtml('![Alt](image.jpg)')).toContain('<img src="image.jpg" alt="Alt" />');
    });

    it('converts blockquotes', () => {
      expect(markdownToHtml('> Quote')).toContain('<blockquote>');
    });

    it('converts horizontal rules', () => {
      expect(markdownToHtml('---')).toContain('<hr />');
    });

    it('handles empty input', () => {
      expect(markdownToHtml('')).toBe('');
      expect(markdownToHtml('   ')).toBe('');
    });
  });

  // =====================================================
  // CONVERT CONTENT
  // =====================================================

  describe('convertContent', () => {
    it('converts HTML to Markdown', () => {
      const html = '<h1>Title</h1><p>Paragraph</p>';
      const result = convertContent(html, 'html', 'markdown');
      expect(result).toContain('# Title');
    });

    it('converts Markdown to HTML', () => {
      const markdown = '# Title\n\nParagraph';
      const result = convertContent(markdown, 'markdown', 'html');
      expect(result).toContain('<h1>Title</h1>');
    });

    it('returns same content for same mode', () => {
      const content = '<p>Test</p>';
      expect(convertContent(content, 'html', 'html')).toBe(content);
    });
  });

  // =====================================================
  // SANITIZE HTML
  // =====================================================

  describe('sanitizeHtml', () => {
    it('removes script tags', () => {
      const html = '<p>Safe</p><script>alert("xss")</script>';
      expect(sanitizeHtml(html)).toBe('<p>Safe</p>');
    });

    it('removes event handlers', () => {
      const html = '<div onclick="alert(1)">Test</div>';
      const result = sanitizeHtml(html);
      expect(result).not.toContain('onclick');
    });

    it('removes javascript URLs', () => {
      const html = '<a href="javascript:alert(1)">Link</a>';
      const result = sanitizeHtml(html);
      expect(result).not.toContain('javascript:');
    });

    it('preserves safe HTML', () => {
      const html = '<p><strong>Bold</strong> and <em>italic</em></p>';
      expect(sanitizeHtml(html)).toBe(html);
    });
  });
});
