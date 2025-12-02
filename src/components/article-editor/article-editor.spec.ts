import { newSpecPage } from '@stencil/core/testing';
import { ArticleEditor } from './article-editor';

describe('sg-article-editor', () => {
  // =====================================================
  // RENDERING TESTS
  // =====================================================

  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [ArticleEditor],
      html: `<sg-article-editor></sg-article-editor>`,
    });

    // Check that essential elements exist
    const editor = page.root.shadowRoot.querySelector('.article-editor');
    const toolbar = page.root.shadowRoot.querySelector('.article-editor__toolbar');
    const contentTypeSelector = page.root.shadowRoot.querySelector('.article-editor__content-type-selector');
    const textarea = page.root.shadowRoot.querySelector('textarea');
    const statusBar = page.root.shadowRoot.querySelector('.article-editor__status-bar');

    expect(editor).not.toBeNull();
    expect(toolbar).not.toBeNull();
    expect(contentTypeSelector).not.toBeNull();
    expect(textarea).not.toBeNull();
    expect(statusBar).not.toBeNull();

    // Check content type buttons (html, markdown)
    const contentTypeButtons = page.root.shadowRoot.querySelectorAll('.article-editor__content-type-btn');
    expect(contentTypeButtons.length).toBe(2);
  });

  it('renders with initial value', async () => {
    const page = await newSpecPage({
      components: [ArticleEditor],
      html: `<sg-article-editor value="<p>Hello World</p>"></sg-article-editor>`,
    });

    // Check internal state directly
    expect(page.rootInstance.internalValue).toBe('<p>Hello World</p>');
  });

  it('renders in preview mode', async () => {
    const page = await newSpecPage({
      components: [ArticleEditor],
      html: `<sg-article-editor view-mode="preview" value="<p>Test</p>"></sg-article-editor>`,
    });

    const preview = page.root.shadowRoot.querySelector('.article-editor__preview-container');
    expect(preview).not.toBeNull();

    const textarea = page.root.shadowRoot.querySelector('textarea');
    expect(textarea).toBeNull();
  });

  it('renders in split mode', async () => {
    const page = await newSpecPage({
      components: [ArticleEditor],
      html: `<sg-article-editor view-mode="split" value="<p>Test</p>"></sg-article-editor>`,
    });

    const editor = page.root.shadowRoot.querySelector('.article-editor');
    expect(editor.classList.contains('article-editor--split')).toBe(true);

    const textarea = page.root.shadowRoot.querySelector('textarea');
    const preview = page.root.shadowRoot.querySelector('.article-editor__preview-container');
    expect(textarea).not.toBeNull();
    expect(preview).not.toBeNull();
  });

  // =====================================================
  // PROPS TESTS
  // =====================================================

  it('respects placeholder prop', async () => {
    const page = await newSpecPage({
      components: [ArticleEditor],
      html: `<sg-article-editor placeholder="Custom placeholder"></sg-article-editor>`,
    });

    // Check placeholder through component instance
    expect(page.rootInstance.placeholder).toBe('Custom placeholder');
  });

  it('respects disabled prop', async () => {
    const page = await newSpecPage({
      components: [ArticleEditor],
      html: `<sg-article-editor disabled="true"></sg-article-editor>`,
    });

    const editor = page.root.shadowRoot.querySelector('.article-editor');
    expect(editor.classList.contains('article-editor--disabled')).toBe(true);
  });

  it('respects minHeight prop', async () => {
    const page = await newSpecPage({
      components: [ArticleEditor],
      html: `<sg-article-editor min-height="600"></sg-article-editor>`,
    });

    const editor = page.root.shadowRoot.querySelector('.article-editor') as HTMLElement;
    expect(editor.style.getPropertyValue('--editor-min-height')).toBe('600px');
  });

  it('hides word count when showWordCount is false', async () => {
    const page = await newSpecPage({
      components: [ArticleEditor],
      html: `<sg-article-editor show-word-count="false"></sg-article-editor>`,
    });

    const statusBar = page.root.shadowRoot.querySelector('.article-editor__status-bar');
    expect(statusBar).toBeNull();
  });

  // =====================================================
  // EVENT TESTS
  // =====================================================

  it('emits editorChange on input', async () => {
    const page = await newSpecPage({
      components: [ArticleEditor],
      html: `<sg-article-editor></sg-article-editor>`,
    });

    const changeSpy = jest.fn();
    page.root.addEventListener('editorChange', changeSpy);

    const textarea = page.root.shadowRoot.querySelector('textarea');
    textarea.value = 'New content';
    textarea.dispatchEvent(new Event('input'));

    await page.waitForChanges();

    expect(changeSpy).toHaveBeenCalled();
    expect(changeSpy.mock.calls[0][0].detail.value).toBe('New content');
  });

  it('emits editorModeChange when mode changes', async () => {
    const page = await newSpecPage({
      components: [ArticleEditor],
      html: `<sg-article-editor content-type="html"></sg-article-editor>`,
    });

    const modeChangeSpy = jest.fn();
    page.root.addEventListener('contentTypeChange', modeChangeSpy);

    // Click on markdown content type button (second button)
    const markdownBtn = page.root.shadowRoot.querySelectorAll('.article-editor__content-type-btn')[1] as HTMLButtonElement;
    markdownBtn.click();

    await page.waitForChanges();

    expect(modeChangeSpy).toHaveBeenCalled();
    expect(modeChangeSpy.mock.calls[0][0].detail.previousType).toBe('html');
    expect(modeChangeSpy.mock.calls[0][0].detail.newType).toBe('markdown');
  });

  // =====================================================
  // METHOD TESTS
  // =====================================================

  it('getContent returns current content', async () => {
    const page = await newSpecPage({
      components: [ArticleEditor],
      html: `<sg-article-editor value="Test content"></sg-article-editor>`,
    });

    const content = await page.rootInstance.getContent();
    expect(content).toBe('Test content');
  });

  it('setContent updates content', async () => {
    const page = await newSpecPage({
      components: [ArticleEditor],
      html: `<sg-article-editor></sg-article-editor>`,
    });

    await page.rootInstance.setContent('Updated content');
    await page.waitForChanges();

    const content = await page.rootInstance.getContent();
    expect(content).toBe('Updated content');
  });

  it('getHtml returns HTML when in markdown mode', async () => {
    const page = await newSpecPage({
      components: [ArticleEditor],
      html: `<sg-article-editor content-type="markdown" value="# Hello"></sg-article-editor>`,
    });

    const html = await page.rootInstance.getHtml();
    expect(html).toContain('<h1');
    expect(html).toContain('Hello');
  });

  // =====================================================
  // WORD COUNT TESTS
  // =====================================================

  it('counts words correctly', async () => {
    const page = await newSpecPage({
      components: [ArticleEditor],
      html: `<sg-article-editor value="Hello world this is a test"></sg-article-editor>`,
    });

    expect(page.rootInstance.wordCount).toBe(6);
  });

  it('counts characters correctly', async () => {
    const page = await newSpecPage({
      components: [ArticleEditor],
      html: `<sg-article-editor value="Hello"></sg-article-editor>`,
    });

    expect(page.rootInstance.charCount).toBe(5);
  });

  it('strips HTML tags when counting', async () => {
    const page = await newSpecPage({
      components: [ArticleEditor],
      html: `<sg-article-editor value="<p>Hello</p> <strong>World</strong>"></sg-article-editor>`,
    });

    expect(page.rootInstance.wordCount).toBe(2);
    // "Hello World" = 11 characters (stripped HTML)
    expect(page.rootInstance.charCount).toBe(11);
  });
});
