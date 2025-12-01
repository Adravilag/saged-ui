/**
 * @adravilag/ui - Article Editor Internationalization
 * Multi-language support for the editor UI
 */

export type SupportedLocale = 'en' | 'es' | 'fr' | 'de' | 'pt' | 'it' | 'zh' | 'ja' | 'ko' | 'ar';

export interface EditorTranslations {
  modes: {
    html: string;
    markdown: string;
    preview: string;
    split: string;
  };
  toolbar: {
    bold: string;
    italic: string;
    underline: string;
    strikethrough: string;
    code: string;
    link: string;
    image: string;
    heading1: string;
    heading2: string;
    heading3: string;
    bulletList: string;
    numberedList: string;
    quote: string;
    horizontalRule: string;
  };
  status: {
    words: string;
    characters: string;
    wordsPlural: string;
    charactersPlural: string;
  };
  actions: {
    externalPreview: string;
    externalPreviewOpen: string;
    openMediaLibrary: string;
  };
  placeholders: {
    startWriting: string;
  };
  preview: {
    title: string;
    empty: string;
  };
  aria: {
    editor: string;
    toolbar: string;
    modeSelector: string;
    formatToolbar: string;
    preview: string;
  };
}

const translations: Record<SupportedLocale, EditorTranslations> = {
  en: {
    modes: { html: 'HTML', markdown: 'Markdown', preview: 'Preview', split: 'Split' },
    toolbar: {
      bold: 'Bold',
      italic: 'Italic',
      underline: 'Underline',
      strikethrough: 'Strikethrough',
      code: 'Code',
      link: 'Link',
      image: 'Image',
      heading1: 'Heading 1',
      heading2: 'Heading 2',
      heading3: 'Heading 3',
      bulletList: 'Bullet List',
      numberedList: 'Numbered List',
      quote: 'Quote',
      horizontalRule: 'Horizontal Rule',
    },
    status: { words: 'word', characters: 'character', wordsPlural: 'words', charactersPlural: 'characters' },
    actions: { externalPreview: 'External Preview', externalPreviewOpen: 'External preview open', openMediaLibrary: 'Open Media Library' },
    placeholders: { startWriting: 'Start writing...' },
    preview: { title: 'Preview', empty: 'Nothing to preview yet. Start writing!' },
    aria: { editor: 'Rich text editor', toolbar: 'Editor toolbar', modeSelector: 'Editor mode selector', formatToolbar: 'Text formatting toolbar', preview: 'Content preview' },
  },
  es: {
    modes: { html: 'HTML', markdown: 'Markdown', preview: 'Vista previa', split: 'Dividido' },
    toolbar: {
      bold: 'Negrita',
      italic: 'Cursiva',
      underline: 'Subrayado',
      strikethrough: 'Tachado',
      code: 'Codigo',
      link: 'Enlace',
      image: 'Imagen',
      heading1: 'Titulo 1',
      heading2: 'Titulo 2',
      heading3: 'Titulo 3',
      bulletList: 'Lista con vinetas',
      numberedList: 'Lista numerada',
      quote: 'Cita',
      horizontalRule: 'Linea horizontal',
    },
    status: { words: 'palabra', characters: 'caracter', wordsPlural: 'palabras', charactersPlural: 'caracteres' },
    actions: { externalPreview: 'Vista previa externa', externalPreviewOpen: 'Vista previa externa abierta', openMediaLibrary: 'Abrir biblioteca de medios' },
    placeholders: { startWriting: 'Empieza a escribir...' },
    preview: { title: 'Vista previa', empty: 'Nada que previsualizar aun. Empieza a escribir!' },
    aria: {
      editor: 'Editor de texto enriquecido',
      toolbar: 'Barra de herramientas del editor',
      modeSelector: 'Selector de modo del editor',
      formatToolbar: 'Barra de formato de texto',
      preview: 'Vista previa del contenido',
    },
  },
  fr: {
    modes: { html: 'HTML', markdown: 'Markdown', preview: 'Apercu', split: 'Divise' },
    toolbar: {
      bold: 'Gras',
      italic: 'Italique',
      underline: 'Souligne',
      strikethrough: 'Barre',
      code: 'Code',
      link: 'Lien',
      image: 'Image',
      heading1: 'Titre 1',
      heading2: 'Titre 2',
      heading3: 'Titre 3',
      bulletList: 'Liste a puces',
      numberedList: 'Liste numerotee',
      quote: 'Citation',
      horizontalRule: 'Ligne horizontale',
    },
    status: { words: 'mot', characters: 'caractere', wordsPlural: 'mots', charactersPlural: 'caracteres' },
    actions: { externalPreview: 'Apercu externe', externalPreviewOpen: 'Apercu externe ouvert', openMediaLibrary: 'Ouvrir la mediatheque' },
    placeholders: { startWriting: 'Commencez a ecrire...' },
    preview: { title: 'Apercu', empty: 'Rien a previsualiser. Commencez a ecrire!' },
    aria: {
      editor: 'Editeur de texte riche',
      toolbar: 'Barre outils editeur',
      modeSelector: 'Selecteur de mode',
      formatToolbar: 'Barre de mise en forme',
      preview: 'Apercu du contenu',
    },
  },
  de: {
    modes: { html: 'HTML', markdown: 'Markdown', preview: 'Vorschau', split: 'Geteilt' },
    toolbar: {
      bold: 'Fett',
      italic: 'Kursiv',
      underline: 'Unterstrichen',
      strikethrough: 'Durchgestrichen',
      code: 'Code',
      link: 'Link',
      image: 'Bild',
      heading1: 'Uberschrift 1',
      heading2: 'Uberschrift 2',
      heading3: 'Uberschrift 3',
      bulletList: 'Aufzahlungsliste',
      numberedList: 'Nummerierte Liste',
      quote: 'Zitat',
      horizontalRule: 'Horizontale Linie',
    },
    status: { words: 'Wort', characters: 'Zeichen', wordsPlural: 'Worter', charactersPlural: 'Zeichen' },
    actions: { externalPreview: 'Externe Vorschau', externalPreviewOpen: 'Externe Vorschau geoffnet', openMediaLibrary: 'Medienbibliothek offnen' },
    placeholders: { startWriting: 'Beginnen Sie zu schreiben...' },
    preview: { title: 'Vorschau', empty: 'Noch nichts zum Vorschauen. Fangen Sie an!' },
    aria: {
      editor: 'Rich-Text-Editor',
      toolbar: 'Editor-Symbolleiste',
      modeSelector: 'Editor-Modus-Auswahl',
      formatToolbar: 'Textformatierungs-Symbolleiste',
      preview: 'Inhaltsvorschau',
    },
  },
  pt: {
    modes: { html: 'HTML', markdown: 'Markdown', preview: 'Visualizacao', split: 'Dividido' },
    toolbar: {
      bold: 'Negrito',
      italic: 'Italico',
      underline: 'Sublinhado',
      strikethrough: 'Riscado',
      code: 'Codigo',
      link: 'Link',
      image: 'Imagem',
      heading1: 'Titulo 1',
      heading2: 'Titulo 2',
      heading3: 'Titulo 3',
      bulletList: 'Lista com marcadores',
      numberedList: 'Lista numerada',
      quote: 'Citacao',
      horizontalRule: 'Linha horizontal',
    },
    status: { words: 'palavra', characters: 'caractere', wordsPlural: 'palavras', charactersPlural: 'caracteres' },
    actions: { externalPreview: 'Visualizacao externa', externalPreviewOpen: 'Visualizacao externa aberta', openMediaLibrary: 'Abrir biblioteca de midia' },
    placeholders: { startWriting: 'Comece a escrever...' },
    preview: { title: 'Visualizacao', empty: 'Nada para visualizar ainda. Comece a escrever!' },
    aria: {
      editor: 'Editor de texto rico',
      toolbar: 'Barra de ferramentas do editor',
      modeSelector: 'Seletor de modo do editor',
      formatToolbar: 'Barra de formatacao de texto',
      preview: 'Visualizacao do conteudo',
    },
  },
  it: {
    modes: { html: 'HTML', markdown: 'Markdown', preview: 'Anteprima', split: 'Diviso' },
    toolbar: {
      bold: 'Grassetto',
      italic: 'Corsivo',
      underline: 'Sottolineato',
      strikethrough: 'Barrato',
      code: 'Codice',
      link: 'Link',
      image: 'Immagine',
      heading1: 'Titolo 1',
      heading2: 'Titolo 2',
      heading3: 'Titolo 3',
      bulletList: 'Elenco puntato',
      numberedList: 'Elenco numerato',
      quote: 'Citazione',
      horizontalRule: 'Linea orizzontale',
    },
    status: { words: 'parola', characters: 'carattere', wordsPlural: 'parole', charactersPlural: 'caratteri' },
    actions: { externalPreview: 'Anteprima esterna', externalPreviewOpen: 'Anteprima esterna aperta', openMediaLibrary: 'Apri libreria multimediale' },
    placeholders: { startWriting: 'Inizia a scrivere...' },
    preview: { title: 'Anteprima', empty: 'Niente da visualizzare. Inizia a scrivere!' },
    aria: {
      editor: 'Editor di testo avanzato',
      toolbar: 'Barra degli strumenti',
      modeSelector: 'Selettore di modalita',
      formatToolbar: 'Barra di formattazione',
      preview: 'Anteprima del contenuto',
    },
  },
  zh: {
    modes: { html: 'HTML', markdown: 'Markdown', preview: 'Preview', split: 'Split' },
    toolbar: {
      bold: 'Bold',
      italic: 'Italic',
      underline: 'Underline',
      strikethrough: 'Strikethrough',
      code: 'Code',
      link: 'Link',
      image: 'Image',
      heading1: 'Heading 1',
      heading2: 'Heading 2',
      heading3: 'Heading 3',
      bulletList: 'Bullet List',
      numberedList: 'Numbered List',
      quote: 'Quote',
      horizontalRule: 'Horizontal Rule',
    },
    status: { words: 'word', characters: 'char', wordsPlural: 'words', charactersPlural: 'chars' },
    actions: { externalPreview: 'External Preview', externalPreviewOpen: 'External preview open', openMediaLibrary: 'Open Media Library' },
    placeholders: { startWriting: 'Start writing...' },
    preview: { title: 'Preview', empty: 'Nothing to preview. Start writing!' },
    aria: { editor: 'Rich text editor', toolbar: 'Editor toolbar', modeSelector: 'Mode selector', formatToolbar: 'Format toolbar', preview: 'Content preview' },
  },
  ja: {
    modes: { html: 'HTML', markdown: 'Markdown', preview: 'Preview', split: 'Split' },
    toolbar: {
      bold: 'Bold',
      italic: 'Italic',
      underline: 'Underline',
      strikethrough: 'Strikethrough',
      code: 'Code',
      link: 'Link',
      image: 'Image',
      heading1: 'Heading 1',
      heading2: 'Heading 2',
      heading3: 'Heading 3',
      bulletList: 'Bullet List',
      numberedList: 'Numbered List',
      quote: 'Quote',
      horizontalRule: 'Horizontal Rule',
    },
    status: { words: 'word', characters: 'char', wordsPlural: 'words', charactersPlural: 'chars' },
    actions: { externalPreview: 'External Preview', externalPreviewOpen: 'External preview open', openMediaLibrary: 'Open Media Library' },
    placeholders: { startWriting: 'Start writing...' },
    preview: { title: 'Preview', empty: 'Nothing to preview. Start writing!' },
    aria: { editor: 'Rich text editor', toolbar: 'Editor toolbar', modeSelector: 'Mode selector', formatToolbar: 'Format toolbar', preview: 'Content preview' },
  },
  ko: {
    modes: { html: 'HTML', markdown: 'Markdown', preview: 'Preview', split: 'Split' },
    toolbar: {
      bold: 'Bold',
      italic: 'Italic',
      underline: 'Underline',
      strikethrough: 'Strikethrough',
      code: 'Code',
      link: 'Link',
      image: 'Image',
      heading1: 'Heading 1',
      heading2: 'Heading 2',
      heading3: 'Heading 3',
      bulletList: 'Bullet List',
      numberedList: 'Numbered List',
      quote: 'Quote',
      horizontalRule: 'Horizontal Rule',
    },
    status: { words: 'word', characters: 'char', wordsPlural: 'words', charactersPlural: 'chars' },
    actions: { externalPreview: 'External Preview', externalPreviewOpen: 'External preview open', openMediaLibrary: 'Open Media Library' },
    placeholders: { startWriting: 'Start writing...' },
    preview: { title: 'Preview', empty: 'Nothing to preview. Start writing!' },
    aria: { editor: 'Rich text editor', toolbar: 'Editor toolbar', modeSelector: 'Mode selector', formatToolbar: 'Format toolbar', preview: 'Content preview' },
  },
  ar: {
    modes: { html: 'HTML', markdown: 'Markdown', preview: 'Preview', split: 'Split' },
    toolbar: {
      bold: 'Bold',
      italic: 'Italic',
      underline: 'Underline',
      strikethrough: 'Strikethrough',
      code: 'Code',
      link: 'Link',
      image: 'Image',
      heading1: 'Heading 1',
      heading2: 'Heading 2',
      heading3: 'Heading 3',
      bulletList: 'Bullet List',
      numberedList: 'Numbered List',
      quote: 'Quote',
      horizontalRule: 'Horizontal Rule',
    },
    status: { words: 'word', characters: 'char', wordsPlural: 'words', charactersPlural: 'chars' },
    actions: { externalPreview: 'External Preview', externalPreviewOpen: 'External preview open', openMediaLibrary: 'Open Media Library' },
    placeholders: { startWriting: 'Start writing...' },
    preview: { title: 'Preview', empty: 'Nothing to preview. Start writing!' },
    aria: { editor: 'Rich text editor', toolbar: 'Editor toolbar', modeSelector: 'Mode selector', formatToolbar: 'Format toolbar', preview: 'Content preview' },
  },
};

export function getTranslations(locale: SupportedLocale = 'en'): EditorTranslations {
  return translations[locale] || translations.en;
}

export function isRTL(locale: SupportedLocale): boolean {
  return locale === 'ar';
}

export function getSupportedLocales(): SupportedLocale[] {
  return Object.keys(translations) as SupportedLocale[];
}

export function formatCount(count: number, singular: string, plural: string): string {
  return `${count} ${count === 1 ? singular : plural}`;
}

export function detectLocale(): SupportedLocale {
  if (typeof navigator === 'undefined' || !navigator.language) return 'en';
  const browserLang = navigator.language.split('-')[0].toLowerCase();
  const supportedLocales = getSupportedLocales();
  if (supportedLocales.includes(browserLang as SupportedLocale)) {
    return browserLang as SupportedLocale;
  }
  return 'en';
}
