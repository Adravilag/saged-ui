import type { Meta, StoryObj } from '@storybook/html';
import type { SupportedLocale } from './utils/i18n';

// Note: In Storybook, components are auto-loaded from dist folder via staticDirs config

interface ArticleEditorArgs {
  value: string;
  mode: 'html' | 'markdown' | 'preview' | 'split';
  availableModes: string;
  placeholder: string;
  minHeight: number;
  spellcheck: boolean;
  showWordCount: boolean;
  enableExternalPreview: boolean;
  disabled: boolean;
  readonly: boolean;
  // Style props
  editorBg: string;
  editorBgSecondary: string;
  editorBgTertiary: string;
  editorText: string;
  editorTextSecondary: string;
  editorBorder: string;
  editorAccent: string;
  editorBorderRadius: string;
  editorFontSans: string;
  editorFontMono: string;
  editorFontSize: string;
  // I18n props
  locale: SupportedLocale;
}

const meta: Meta<ArticleEditorArgs> = {
  title: 'Components/ArticleEditor',
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'The content value of the editor',
    },
    mode: {
      control: 'select',
      options: ['html', 'markdown', 'preview', 'split'],
      description: 'Current editor mode',
    },
    availableModes: {
      control: 'text',
      description: 'Comma-separated list of available modes',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when editor is empty',
    },
    minHeight: {
      control: { type: 'number', min: 200, max: 800 },
      description: 'Minimum height in pixels',
    },
    spellcheck: {
      control: 'boolean',
      description: 'Enable spell checking',
    },
    showWordCount: {
      control: 'boolean',
      description: 'Show word/character count',
    },
    enableExternalPreview: {
      control: 'boolean',
      description: 'Enable external preview window',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    readonly: {
      control: 'boolean',
      description: 'Read-only state',
    },
    // Style props
    editorBg: {
      control: 'color',
      description: 'Custom background color',
      table: { category: 'Styling' },
    },
    editorBgSecondary: {
      control: 'color',
      description: 'Custom secondary background color',
      table: { category: 'Styling' },
    },
    editorBgTertiary: {
      control: 'color',
      description: 'Custom tertiary background color',
      table: { category: 'Styling' },
    },
    editorText: {
      control: 'color',
      description: 'Custom text color',
      table: { category: 'Styling' },
    },
    editorTextSecondary: {
      control: 'color',
      description: 'Custom secondary text color',
      table: { category: 'Styling' },
    },
    editorBorder: {
      control: 'color',
      description: 'Custom border color',
      table: { category: 'Styling' },
    },
    editorAccent: {
      control: 'color',
      description: 'Custom accent color (buttons, links)',
      table: { category: 'Styling' },
    },
    editorBorderRadius: {
      control: 'text',
      description: 'Custom border radius (e.g., "12px", "0")',
      table: { category: 'Styling' },
    },
    editorFontSans: {
      control: 'text',
      description: 'Custom font family for text',
      table: { category: 'Styling' },
    },
    editorFontMono: {
      control: 'text',
      description: 'Custom font family for code',
      table: { category: 'Styling' },
    },
    editorFontSize: {
      control: 'text',
      description: 'Custom font size (e.g., "16px", "1rem")',
      table: { category: 'Styling' },
    },
    locale: {
      control: 'select',
      options: ['en', 'es', 'fr', 'de', 'pt', 'it', 'zh', 'ja', 'ko', 'ar'],
      description: 'Locale for UI text',
      table: { category: 'I18n' },
    },
  },
  args: {
    value: '<p>Hello World! This is a <strong>article editor</strong>.</p>',
    mode: 'html',
    availableModes: 'html,markdown,preview,split',
    placeholder: 'Start writing...',
    minHeight: 400,
    spellcheck: true,
    showWordCount: true,
    enableExternalPreview: true,
    disabled: false,
    readonly: false,
    // Style defaults (empty = use component defaults)
    editorBg: '',
    editorBgSecondary: '',
    editorBgTertiary: '',
    editorText: '',
    editorTextSecondary: '',
    editorBorder: '',
    editorAccent: '',
    editorBorderRadius: '',
    editorFontSans: '',
    editorFontMono: '',
    editorFontSize: '',
    locale: 'en',
  },
  render: (args, context) => {
    const editor = document.createElement('sg-article-editor');
    editor.setAttribute('value', args.value);
    editor.setAttribute('mode', args.mode);
    editor.setAttribute('available-modes', args.availableModes);
    editor.setAttribute('placeholder', args.placeholder);
    editor.setAttribute('min-height', String(args.minHeight));
    editor.setAttribute('spellcheck', String(args.spellcheck));
    editor.setAttribute('show-word-count', String(args.showWordCount));
    editor.setAttribute('enable-external-preview', String(args.enableExternalPreview));
    editor.setAttribute('disabled', String(args.disabled));
    editor.setAttribute('readonly', String(args.readonly));

    // Apply style props if provided
    if (args.editorBg) editor.setAttribute('editor-bg', args.editorBg);
    if (args.editorBgSecondary) editor.setAttribute('editor-bg-secondary', args.editorBgSecondary);
    if (args.editorBgTertiary) editor.setAttribute('editor-bg-tertiary', args.editorBgTertiary);
    if (args.editorText) editor.setAttribute('editor-text', args.editorText);
    if (args.editorTextSecondary) editor.setAttribute('editor-text-secondary', args.editorTextSecondary);
    if (args.editorBorder) editor.setAttribute('editor-border', args.editorBorder);
    if (args.editorAccent) editor.setAttribute('editor-accent', args.editorAccent);
    if (args.editorBorderRadius) editor.setAttribute('editor-border-radius', args.editorBorderRadius);
    if (args.editorFontSans) editor.setAttribute('editor-font-sans', args.editorFontSans);
    if (args.editorFontMono) editor.setAttribute('editor-font-mono', args.editorFontMono);
    if (args.editorFontSize) editor.setAttribute('editor-font-size', args.editorFontSize);

    // Apply i18n - use global locale if no specific locale set, or story arg
    const locale = args.locale || context?.globals?.locale || 'en';
    editor.setAttribute('locale', locale);

    // Add event listeners for demo
    editor.addEventListener('editorChange', (e: CustomEvent) => {
      console.log('ðŸ“ Content changed:', e.detail);
    });

    editor.addEventListener('editorModeChange', (e: CustomEvent) => {
      console.log('ðŸ”„ Mode changed:', e.detail);
    });

    return editor;
  },
};

export default meta;
type Story = StoryObj<ArticleEditorArgs>;

// =====================================================
// STORIES
// =====================================================

/**
 * Default HTML mode editor with basic content
 */
export const Default: Story = {};

/**
 * Split view showing editor and preview side by side
 */
export const SplitView: Story = {
  args: {
    mode: 'split',
    value: `<h1>Welcome to the Editor</h1>
<p>This is a <strong>split view</strong> that shows the editor and preview side by side.</p>
<ul>
  <li>Edit on the left</li>
  <li>Preview on the right</li>
</ul>
<blockquote>Try editing the content!</blockquote>`,
    minHeight: 500,
  },
};

/**
 * Markdown mode with markdown syntax
 */
export const MarkdownMode: Story = {
  args: {
    mode: 'markdown',
    value: `# Markdown Editor

This editor supports **bold**, *italic*, and \`code\`.

## Features

- HTML to Markdown conversion
- Live preview
- Keyboard shortcuts

> Quote blocks are supported too!

\`\`\`javascript
const editor = document.querySelector('ui-article-editor');
editor.getContent().then(console.log);
\`\`\`
`,
  },
};

/**
 * Preview only mode - read-only display
 */
export const PreviewMode: Story = {
  args: {
    mode: 'preview',
    value: `<h2>Preview Mode</h2>
<p>This mode shows only the rendered HTML preview.</p>
<p>Perfect for <em>read-only</em> display of content.</p>
<img src="https://via.placeholder.com/400x200" alt="Placeholder image" />`,
  },
};

/**
 * Empty state with custom placeholder
 */
export const EmptyState: Story = {
  args: {
    value: '',
    placeholder: 'âœï¸ Start writing your amazing content here...',
  },
};

/**
 * Disabled editor state
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    value: '<p>This editor is disabled and cannot be edited.</p>',
  },
};

/**
 * Read-only editor state
 */
export const ReadOnly: Story = {
  args: {
    readonly: true,
    value: '<p>This editor is read-only. Content can be viewed but not modified.</p>',
  },
};

/**
 * Minimal configuration - only HTML and Preview modes
 */
export const MinimalModes: Story = {
  args: {
    availableModes: 'html,preview',
    value: '<p>This editor only has HTML and Preview modes available.</p>',
  },
};

/**
 * Without word count
 */
export const NoWordCount: Story = {
  args: {
    showWordCount: false,
    value: '<p>This editor has the word count disabled.</p>',
  },
};

/**
 * Custom height
 */
export const TallEditor: Story = {
  args: {
    minHeight: 600,
    mode: 'split',
    value: `<h1>Tall Editor</h1>
<p>This editor has a custom minimum height of 600px.</p>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
<p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>`,
  },
};

/**
 * Blog post example with rich content
 */
export const BlogPost: Story = {
  args: {
    mode: 'split',
    minHeight: 550,
    value: `<h1>How to Build Web Components</h1>

<p><em>Published on December 1, 2025</em></p>

<p>Web Components are a set of web platform APIs that allow you to create new custom, reusable, encapsulated HTML tags.</p>

<h2>Why Use Web Components?</h2>

<ul>
  <li><strong>Encapsulation</strong> - Styles and behavior are isolated</li>
  <li><strong>Reusability</strong> - Use in any framework or vanilla JS</li>
  <li><strong>Standards</strong> - Built on web platform APIs</li>
</ul>

<h2>Getting Started</h2>

<p>Here's a simple example:</p>

<pre><code>class MyComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
}</code></pre>

<blockquote>
  Web Components are the future of reusable UI!
</blockquote>

<p>For more information, check out the <a href="https://developer.mozilla.org/en-US/docs/Web/Web_Components">MDN documentation</a>.</p>`,
  },
};

/**
 * Dark theme example (requires parent with theme attribute)
 */
export const DarkTheme: Story = {
  args: {
    mode: 'split',
    value: '<h2>Dark Theme</h2><p>This editor uses the <strong>dark theme</strong> variant.</p>',
  },
  decorators: [
    story => {
      const container = document.createElement('div');
      container.setAttribute('data-theme', 'dark');
      container.style.padding = '2rem';
      container.style.background = '#1f2937';
      container.style.borderRadius = '8px';
      container.appendChild(story() as Node);
      return container;
    },
  ],
};

/**
 * Global Theme System - Uses toolbar theme selector
 *
 * This story demonstrates the global theming system.
 * Use the ðŸ–Œï¸ Theme selector in the toolbar above to switch themes!
 * The editor will automatically inherit colors from the global design tokens.
 */
export const GlobalThemeDemo: Story = {
  args: {
    mode: 'split',
    value: `<h2> Sistema de Temas Global</h2>
<p>Este editor <strong>hereda automn¡ticamente</strong> el tema seleccionado en la barra de herramientas.</p>
<h3>Cn³mo funciona:</h3>
<ol>
  <li>Usa el selector <code>ðŸ–Œï¸ Theme</code> en la toolbar de arriba</li>
  <li>El tema se aplica via <code>data-theme</code> al contenedor</li>
  <li>Los CSS tokens fluyen automn¡ticamente al componente</li>
</ol>
<blockquote>!Prueba a cambiar el tema y el idioma desde la toolbar!</blockquote>`,
    minHeight: 400,
  },
  parameters: {
    docs: {
      description: {
        story: `
## Global Theme System

The editor inherits theme from parent \`data-theme\` attribute.
Use the theme selector in Storybook toolbar to see it in action!

\`\`\`html
<div data-theme="dark">
  <sg-article-editor></sg-article-editor>
</div>
\`\`\`

Available themes: \`dark\`, \`purple\`, \`emerald\`, \`rose\`, \`orange\`
        `,
      },
    },
  },
};

// =====================================================
// CUSTOM STYLE STORIES
// =====================================================

/**
 * Custom colors - Purple theme
 */
export const PurpleTheme: Story = {
  args: {
    mode: 'split',
    value: `<h2>Purple Theme</h2>
<p>This editor uses a <strong>custom purple color scheme</strong> via style props.</p>
<ul>
  <li>Custom background colors</li>
  <li>Custom accent color</li>
  <li>Custom border color</li>
</ul>`,
    editorBg: '#f5f3ff',
    editorBgSecondary: '#ede9fe',
    editorBgTertiary: '#ddd6fe',
    editorText: '#4c1d95',
    editorTextSecondary: '#6d28d9',
    editorBorder: '#a78bfa',
    editorAccent: '#7c3aed',
  },
};

/**
 * Ocean blue theme with rounded corners
 */
export const OceanTheme: Story = {
  args: {
    mode: 'split',
    value: `<h2>Ocean Theme</h2>
<p>A calm <strong>ocean blue</strong> color scheme with rounded corners.</p>
<blockquote>Perfect for a relaxed writing environment.</blockquote>`,
    editorBg: '#f0f9ff',
    editorBgSecondary: '#e0f2fe',
    editorBgTertiary: '#bae6fd',
    editorText: '#0c4a6e',
    editorTextSecondary: '#0369a1',
    editorBorder: '#38bdf8',
    editorAccent: '#0284c7',
    editorBorderRadius: '16px',
  },
};

/**
 * Custom typography - Serif style
 */
export const SerifTypography: Story = {
  args: {
    mode: 'split',
    value: `<h2>Serif Typography</h2>
<p>This editor uses a <em>serif font</em> for a more traditional, book-like feel.</p>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>`,
    editorFontSans: 'Georgia, "Times New Roman", serif',
    editorFontSize: '18px',
  },
};

/**
 * Minimal flat design - no borders
 */
export const FlatMinimal: Story = {
  args: {
    mode: 'html',
    value: `<h2>Flat Minimal Design</h2>
<p>A clean, borderless design with subtle backgrounds.</p>`,
    editorBg: '#ffffff',
    editorBgSecondary: '#f9fafb',
    editorBgTertiary: '#f3f4f6',
    editorBorder: 'transparent',
    editorBorderRadius: '0',
    editorAccent: '#111827',
  },
};

/**
 * High contrast for accessibility
 */
export const HighContrast: Story = {
  args: {
    mode: 'split',
    value: `<h2>High Contrast Mode</h2>
<p>This theme provides <strong>high contrast</strong> for better accessibility.</p>
<ul>
  <li>Dark text on light background</li>
  <li>Clear visual boundaries</li>
  <li>Strong accent colors</li>
</ul>`,
    editorBg: '#ffffff',
    editorBgSecondary: '#f5f5f5',
    editorBgTertiary: '#e5e5e5',
    editorText: '#000000',
    editorTextSecondary: '#262626',
    editorBorder: '#000000',
    editorAccent: '#0000ff',
    editorBorderRadius: '4px',
  },
};

/**
 * Dark mode custom - Dracula inspired
 */
export const DraculaTheme: Story = {
  args: {
    mode: 'split',
    value: `<h2>Dracula Theme</h2>
<p>A popular <strong>dark theme</strong> inspired by Dracula color scheme.</p>
<pre><code>const hello = "world";</code></pre>`,
    editorBg: '#282a36',
    editorBgSecondary: '#44475a',
    editorBgTertiary: '#6272a4',
    editorText: '#f8f8f2',
    editorTextSecondary: '#bd93f9',
    editorBorder: '#44475a',
    editorAccent: '#ff79c6',
    editorFontMono: '"Fira Code", "JetBrains Mono", monospace',
  },
};

/**
 * Warm paper-like theme
 */
export const WarmPaperTheme: Story = {
  args: {
    mode: 'html',
    value: `<h2>Warm Paper Theme</h2>
<p>A warm, paper-like background for comfortable <em>long writing sessions</em>.</p>
<p>The slightly yellow tint reduces eye strain and creates a cozy atmosphere.</p>`,
    editorBg: '#fffbeb',
    editorBgSecondary: '#fef3c7',
    editorBgTertiary: '#fde68a',
    editorText: '#78350f',
    editorTextSecondary: '#92400e',
    editorBorder: '#d97706',
    editorAccent: '#b45309',
    editorFontSans: '"Palatino Linotype", "Book Antiqua", Palatino, serif',
    editorFontSize: '17px',
    editorBorderRadius: '8px',
  },
};

// =====================================================
// I18N STORIES
// =====================================================

/**
 * Spanish locale
 */
export const SpanishLocale: Story = {
  args: {
    mode: 'split',
    locale: 'es',
    value: `<h2>Editor en Espan±ol</h2>
<p>Este editor muestra toda la interfaz en <strong>espan±ol</strong>.</p>
<ul>
  <li>Botones de modo traducidos</li>
  <li>Tooltips en espan±ol</li>
  <li>Contador de palabras localizado</li>
</ul>
<blockquote>!Perfecto para usuarios hispanohablantes!</blockquote>`,
  },
};

/**
 * French locale
 */
export const FrenchLocale: Story = {
  args: {
    mode: 'split',
    locale: 'fr',
    value: `<h2>n‰diteur en Frann§ais</h2>
<p>Cet n©diteur affiche toute l'interface en <strong>frann§ais</strong>.</p>
<ul>
  <li>Boutons de mode traduits</li>
  <li>Infobulles en frann§ais</li>
  <li>Compteur de mots localisn©</li>
</ul>
<blockquote>Parfait pour les utilisateurs francophones!</blockquote>`,
  },
};

/**
 * German locale
 */
export const GermanLocale: Story = {
  args: {
    mode: 'split',
    locale: 'de',
    value: `<h2>Editor auf Deutsch</h2>
<p>Dieser Editor zeigt die gesamte Oberfln¤che auf <strong>Deutsch</strong> an.</p>
<ul>
  <li>nœbersetzte Modus-Schaltfln¤chen</li>
  <li>Tooltips auf Deutsch</li>
  <li>Lokalisierte Wortanzahl</li>
</ul>
<blockquote>Perfekt fn¼r deutschsprachige Benutzer!</blockquote>`,
  },
};

/**
 * Japanese locale
 */
export const JapaneseLocale: Story = {
  args: {
    mode: 'split',
    locale: 'ja',
    value: `<h2>æ—¥æœ¬èªžn‚¨nƒ‡n‚£n‚¿</h2>
<p>n“n®n‚¨nƒ‡n‚£n‚¿n¯<strong>æ—¥æœ¬èªž</strong>n§n‚¤nƒ³n‚¿nƒ¼nƒ•n‚§nƒ¼n‚¹n‚’è¡¨ç¤ºn—n¾n™n€‚</p>
<ul>
  <li>ç¿»è¨³n•n‚ŒnŸnƒ¢nƒ¼nƒ‰nƒœn‚¿nƒ³</li>
  <li>æ—¥æœ¬èªžnƒ„nƒ¼nƒ«nƒnƒƒnƒ—</li>
  <li>nƒ­nƒ¼n‚«nƒ©n‚¤n‚ºn•n‚ŒnŸå˜èªžn‚«n‚¦nƒ³nƒˆ</li>
</ul>
<blockquote>æ—¥æœ¬èªžnƒ¦nƒ¼n‚¶nƒ¼n«æœ€é©ï¼</blockquote>`,
  },
};

/**
 * Chinese locale
 */
export const ChineseLocale: Story = {
  args: {
    mode: 'split',
    locale: 'zh',
    value: `<h2>ä¸­æ–‡ç¼–è¾‘å™¨</h2>
<p>æ­¤ç¼–è¾‘å™¨ä»¥<strong>ä¸­æ–‡</strong>æ˜¾ç¤ºæ‰€æœ‰ç•Œé¢å…ƒç´ n€‚</p>
<ul>
  <li>ç¿»è¯‘çš„æ¨¡å¼æŒ‰é’®</li>
  <li>ä¸­æ–‡å·¥å…·æç¤º</li>
  <li>æœ¬åœ°åŒ–å­—æ•°ç»Ÿè®¡</li>
</ul>
<blockquote>éžå¸¸é€‚åˆä¸­æ–‡ç”¨æˆ·ï¼</blockquote>`,
  },
};

/**
 * Arabic locale (RTL)
 */
export const ArabicLocale: Story = {
  args: {
    mode: 'split',
    locale: 'ar',
    value: `<h2>Ù…Ø­Ø±Ø± Ø¹Ø±Ø¨ÙŠ</h2>
<p>ÙŠØ¹Ø±Ø¶ Ù‡Ø°Ø§ Ø§Ù„Ù…Ø­Ø±Ø± Ø¬Ù…ÙŠØ¹ Ø¹Ù†Ø§ØµØ± Ø§Ù„ÙˆØ§Ø¬Ù‡Ø© <strong>Ø¨Ø§Ù„Ø¹Ø±Ø¨ÙŠØ©</strong>.</p>
<ul>
  <li>Ø£Ø²Ø±Ø§Ø± Ø§Ù„ÙˆØ¶Ø¹ Ø§Ù„Ù…ØªØ±Ø¬Ù…Ø©</li>
  <li>ØªÙ„Ù…ÙŠØ­Ø§Øª Ø§Ù„Ø£Ø¯ÙˆØ§Øª Ø¨Ø§Ù„Ø¹Ø±Ø¨ÙŠØ©</li>
  <li>Ø¹Ø¯Ø§Ø¯ Ø§Ù„ÙƒÙ„Ù…Ø§Øª Ø§Ù„Ù…Ø­Ù„ÙŠ</li>
</ul>
<blockquote>Ù…Ø«Ø§Ù„ÙŠ Ù„Ù„Ù…Ø³ØªØ®Ø¯Ù…ÙŠÙ† Ø§Ù„Ù†Ø§Ø·Ù‚ÙŠÙ† Ø¨Ø§Ù„Ø¹Ø±Ø¨ÙŠØ©!</blockquote>`,
  },
};

/**
 * Korean locale
 */
export const KoreanLocale: Story = {
  args: {
    mode: 'split',
    locale: 'ko',
    value: `<h2>í•œêµ­ì–´ íŽ¸ì§‘ê¸°</h2>
<p>ì´ íŽ¸ì§‘ê¸°ëŠ” <strong>í•œêµ­ì–´</strong>ë¡œ ëª¨ë“  ì¸í„°íŽ˜ì´ìŠ¤ë¥¼ í‘œì‹œí•©ë‹ˆë‹¤.</p>
<ul>
  <li>ë²ˆì—­ëœ ëª¨ë“œ ë²„íŠ¼</li>
  <li>í•œêµ­ì–´ íˆ´íŒ</li>
  <li>í˜„ì§€í™”ëœ ë‹¨ì–´ ìˆ˜</li>
</ul>
<blockquote>í•œêµ­ì–´ ì‚¬ìš©ìžì—ê²Œ ì™„ë²½í•©ë‹ˆë‹¤!</blockquote>`,
  },
};
