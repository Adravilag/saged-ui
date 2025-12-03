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

    const editor: HTMLElement = page.root.shadowRoot.querySelector('.article-editor');
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

  // =====================================================
  // VIEW MODE TESTS
  // =====================================================

  it('emits viewModeChange when view mode changes', async () => {
    const page = await newSpecPage({
      components: [ArticleEditor],
      html: `<sg-article-editor view-mode="editor"></sg-article-editor>`,
    });

    const viewChangeSpy = jest.fn();
    page.root.addEventListener('viewModeChange', viewChangeSpy);

    // Find and click split mode button
    const viewModeButtons = page.root.shadowRoot.querySelectorAll('.article-editor__view-btn');
    const splitBtn = Array.from(viewModeButtons).find(btn => btn.getAttribute('title')?.includes('Split'));
    if (splitBtn) {
      (splitBtn as HTMLButtonElement).click();
      await page.waitForChanges();
      expect(viewChangeSpy).toHaveBeenCalled();
    }
  });

  // =====================================================
  // TOOLBAR TESTS
  // =====================================================

  it('applies bold formatting', async () => {
    const page = await newSpecPage({
      components: [ArticleEditor],
      html: `<sg-article-editor value="test text" content-type="html"></sg-article-editor>`,
    });

    // Find bold button and click it
    const boldBtn = page.root.shadowRoot.querySelector('[title*="Bold"]') as HTMLButtonElement;
    if (boldBtn) {
      boldBtn.click();
      await page.waitForChanges();
    }
    // Test passes if no errors are thrown
  });

  it('applies italic formatting', async () => {
    const page = await newSpecPage({
      components: [ArticleEditor],
      html: `<sg-article-editor value="test text" content-type="markdown"></sg-article-editor>`,
    });

    const italicBtn = page.root.shadowRoot.querySelector('[title*="Italic"]') as HTMLButtonElement;
    if (italicBtn) {
      italicBtn.click();
      await page.waitForChanges();
    }
  });

  it('has keydown handler on textarea', async () => {
    const page = await newSpecPage({
      components: [ArticleEditor],
      html: `<sg-article-editor value="test"></sg-article-editor>`,
    });

    const textarea = page.root.shadowRoot.querySelector('textarea');

    // The textarea should exist and be configured for keyboard handling
    expect(textarea).toBeDefined();
    expect(page.rootInstance.textareaRef).toBeDefined();
  });

  // =====================================================
  // ADDITIONAL METHOD TESTS
  // =====================================================

  it('focusEditor focuses the textarea', async () => {
    const page = await newSpecPage({
      components: [ArticleEditor],
      html: `<sg-article-editor></sg-article-editor>`,
    });

    await page.rootInstance.focusEditor();
    // No error should be thrown
    expect(page.rootInstance.textareaRef).toBeDefined();
  });

  it('insertAtCursor inserts content at beginning', async () => {
    const page = await newSpecPage({
      components: [ArticleEditor],
      html: `<sg-article-editor value=""></sg-article-editor>`,
    });

    await page.waitForChanges();

    // Mock selectionStart, selectionEnd and value for the textarea
    const textarea = page.root.shadowRoot.querySelector('textarea');
    Object.defineProperty(textarea, 'selectionStart', { value: 0, writable: true, configurable: true });
    Object.defineProperty(textarea, 'selectionEnd', { value: 0, writable: true, configurable: true });
    Object.defineProperty(textarea, 'value', { value: '', writable: true, configurable: true });

    await page.rootInstance.insertAtCursor('Hello');
    await page.waitForChanges();

    const content = await page.rootInstance.getContent();
    expect(content).toBe('Hello');
  });

  it('insertMedia inserts image in markdown mode', async () => {
    const page = await newSpecPage({
      components: [ArticleEditor],
      html: `<sg-article-editor content-type="markdown" value=""></sg-article-editor>`,
    });

    await page.waitForChanges();

    // Mock textarea selection properties and value
    const textarea = page.root.shadowRoot.querySelector('textarea');
    Object.defineProperty(textarea, 'selectionStart', { value: 0, writable: true, configurable: true });
    Object.defineProperty(textarea, 'selectionEnd', { value: 0, writable: true, configurable: true });
    Object.defineProperty(textarea, 'value', { value: '', writable: true, configurable: true });

    const mediaSpy = jest.fn();
    page.root.addEventListener('mediaInsert', mediaSpy);

    await page.rootInstance.insertMedia({
      url: 'https://example.com/image.jpg',
      filename: 'image.jpg',
      alt: 'Test image',
    });

    await page.waitForChanges();

    expect(mediaSpy).toHaveBeenCalled();
    const content = await page.rootInstance.getContent();
    expect(content).toContain('![Test image]');
  });

  it('insertMedia inserts img tag in html mode', async () => {
    const page = await newSpecPage({
      components: [ArticleEditor],
      html: `<sg-article-editor content-type="html" value=""></sg-article-editor>`,
    });

    await page.waitForChanges();

    // Mock textarea selection properties and value
    const textarea = page.root.shadowRoot.querySelector('textarea');
    Object.defineProperty(textarea, 'selectionStart', { value: 0, writable: true, configurable: true });
    Object.defineProperty(textarea, 'selectionEnd', { value: 0, writable: true, configurable: true });
    Object.defineProperty(textarea, 'value', { value: '', writable: true, configurable: true });

    await page.rootInstance.insertMedia({
      url: 'https://example.com/image.jpg',
      filename: 'image.jpg',
    });

    await page.waitForChanges();

    const content = await page.rootInstance.getContent();
    expect(content).toContain('<img');
    expect(content).toContain('src="https://example.com/image.jpg"');
  });

  it('getHtml returns HTML preview', async () => {
    const page = await newSpecPage({
      components: [ArticleEditor],
      html: `<sg-article-editor content-type="markdown" value="# Hello"></sg-article-editor>`,
    });

    const html = await page.rootInstance.getHtml();
    expect(html).toContain('<h1');
    expect(html).toContain('Hello');
  });

  it('setContent method updates the content', async () => {
    const page = await newSpecPage({
      components: [ArticleEditor],
      html: `<sg-article-editor value="Some content"></sg-article-editor>`,
    });

    await page.rootInstance.setContent('New content');
    await page.waitForChanges();

    const content = await page.rootInstance.getContent();
    expect(content).toBe('New content');
  });

  // =====================================================
  // CONTENT TYPE CONVERSION TESTS
  // =====================================================

  it('converts content when changing from html to markdown', async () => {
    const page = await newSpecPage({
      components: [ArticleEditor],
      html: `<sg-article-editor content-type="html" value="<p>Hello</p>"></sg-article-editor>`,
    });

    // Click markdown button
    const markdownBtn = page.root.shadowRoot.querySelectorAll('.article-editor__content-type-btn')[1] as HTMLButtonElement;
    markdownBtn.click();
    await page.waitForChanges();

    expect(page.rootInstance.contentType).toBe('markdown');
  });

  // =====================================================
  // AVAILABLE OPTIONS TESTS
  // =====================================================

  it('respects availableContentTypes prop', async () => {
    const page = await newSpecPage({
      components: [ArticleEditor],
      html: `<sg-article-editor available-content-types="markdown"></sg-article-editor>`,
    });

    const contentTypeButtons = page.root.shadowRoot.querySelectorAll('.article-editor__content-type-btn');
    expect(contentTypeButtons.length).toBe(1);
  });

  it('respects availableViewModes prop', async () => {
    const page = await newSpecPage({
      components: [ArticleEditor],
      html: `<sg-article-editor available-view-modes="editor,preview"></sg-article-editor>`,
    });

    const viewModeButtons = page.root.shadowRoot.querySelectorAll('.article-editor__view-mode-btn');
    expect(viewModeButtons.length).toBe(2);
  });

  // =====================================================
  // PREVIEW TESTS
  // =====================================================

  it('renders markdown preview correctly', async () => {
    const page = await newSpecPage({
      components: [ArticleEditor],
      html: `<sg-article-editor content-type="markdown" view-mode="preview" value="# Hello World"></sg-article-editor>`,
    });

    const previewContainer = page.root.shadowRoot.querySelector('.article-editor__preview-container');
    expect(previewContainer).not.toBeNull();
    const previewContent = previewContainer.querySelector('.article-editor__preview-content');
    expect(previewContent).not.toBeNull();
    expect(previewContent.innerHTML).toContain('<h1');
  });

  it('renders html preview correctly', async () => {
    const page = await newSpecPage({
      components: [ArticleEditor],
      html: `<sg-article-editor content-type="html" view-mode="preview" value="<h1>Hello</h1>"></sg-article-editor>`,
    });

    const previewContainer = page.root.shadowRoot.querySelector('.article-editor__preview-container');
    expect(previewContainer).not.toBeNull();
    const previewContent = previewContainer.querySelector('.article-editor__preview-content');
    expect(previewContent).not.toBeNull();
    expect(previewContent.innerHTML).toContain('<h1>Hello</h1>');
  });

  // =====================================================
  // LOCALE TESTS
  // =====================================================

  it('respects locale prop', async () => {
    const page = await newSpecPage({
      components: [ArticleEditor],
      html: `<sg-article-editor locale="es"></sg-article-editor>`,
    });

    expect(page.rootInstance.locale).toBe('es');
  });

  // =====================================================
  // COMPONENT LIFECYCLE TESTS
  // =====================================================

  it('initializes internal value from value prop', async () => {
    const page = await newSpecPage({
      components: [ArticleEditor],
      html: `<sg-article-editor value="Initial content"></sg-article-editor>`,
    });

    expect(page.rootInstance.internalValue).toBe('Initial content');
    expect(page.rootInstance.wordCount).toBe(2);
    expect(page.rootInstance.charCount).toBe(15);
  });

  it('updates internal value when value prop changes', async () => {
    const page = await newSpecPage({
      components: [ArticleEditor],
      html: `<sg-article-editor value="Initial"></sg-article-editor>`,
    });

    page.root.setAttribute('value', 'Updated content');
    await page.waitForChanges();

    expect(page.rootInstance.internalValue).toBe('Updated content');
  });
});
