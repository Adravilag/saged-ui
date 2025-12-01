# ui-article-editor



<!-- Auto Generated Below -->


## Overview

SagedUI - Article Editor Component

A headless-ready article editor supporting HTML and Markdown modes
with live preview, formatting toolbar, and optional media library integration.

## Properties

| Property                | Attribute                 | Description                                                 | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Default                         |
| ----------------------- | ------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------- |
| `availableModes`        | `available-modes`         | Available modes (comma-separated or array)                  | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `'html,markdown,preview,split'` |
| `customTranslations`    | --                        | Custom translations to override defaults                    | `{ modes?: { html: string; markdown: string; preview: string; split: string; }; toolbar?: { bold: string; italic: string; underline: string; strikethrough: string; code: string; link: string; image: string; heading1: string; heading2: string; heading3: string; bulletList: string; numberedList: string; quote: string; horizontalRule: string; }; status?: { words: string; characters: string; wordsPlural: string; charactersPlural: string; }; actions?: { externalPreview: string; externalPreviewOpen: string; openMediaLibrary: string; }; placeholders?: { startWriting: string; }; preview?: { title: string; empty: string; }; aria?: { editor: string; toolbar: string; modeSelector: string; formatToolbar: string; preview: string; }; }` | `undefined`                     |
| `disabled`              | `disabled`                | Disabled state                                              | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | `false`                         |
| `editorAccent`          | `editor-accent`           | Custom accent color (buttons, links)                        | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `undefined`                     |
| `editorBg`              | `editor-bg`               | Custom background color for the editor                      | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `undefined`                     |
| `editorBgSecondary`     | `editor-bg-secondary`     | Custom secondary background color                           | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `undefined`                     |
| `editorBgTertiary`      | `editor-bg-tertiary`      | Custom tertiary background color                            | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `undefined`                     |
| `editorBorder`          | `editor-border`           | Custom border color                                         | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `undefined`                     |
| `editorBorderRadius`    | `editor-border-radius`    | Custom border radius                                        | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `undefined`                     |
| `editorFontMono`        | `editor-font-mono`        | Custom font family for code                                 | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `undefined`                     |
| `editorFontSans`        | `editor-font-sans`        | Custom font family for text                                 | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `undefined`                     |
| `editorFontSize`        | `editor-font-size`        | Custom font size                                            | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `undefined`                     |
| `editorText`            | `editor-text`             | Custom text color                                           | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `undefined`                     |
| `editorTextSecondary`   | `editor-text-secondary`   | Custom secondary text color                                 | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `undefined`                     |
| `enableExternalPreview` | `enable-external-preview` | Enable external preview window                              | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | `true`                          |
| `locale`                | `locale`                  | Locale for UI text (en, es, fr, de, pt, it, zh, ja, ko, ar) | `"ar" \| "de" \| "en" \| "es" \| "fr" \| "it" \| "ja" \| "ko" \| "pt" \| "zh"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `'en'`                          |
| `minHeight`             | `min-height`              | Minimum height in pixels                                    | `number`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `400`                           |
| `mode`                  | `mode`                    | Current editor mode                                         | `"html" \| "markdown" \| "preview" \| "split"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `'html'`                        |
| `placeholder`           | `placeholder`             | Placeholder text when editor is empty                       | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `'Start writing...'`            |
| `readonly`              | `readonly`                | Read-only state                                             | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | `false`                         |
| `showWordCount`         | `show-word-count`         | Show word/character count                                   | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | `true`                          |
| `spellcheck`            | `spellcheck`              | Enable spell checking                                       | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | `true`                          |
| `value`                 | `value`                   | The content value of the editor                             | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `''`                            |


## Events

| Event              | Description                                  | Type                                 |
| ------------------ | -------------------------------------------- | ------------------------------------ |
| `editorChange`     | Emitted when the content changes             | `CustomEvent<EditorChangeEvent>`     |
| `editorModeChange` | Emitted when the mode changes                | `CustomEvent<EditorModeChangeEvent>` |
| `mediaInsert`      | Emitted when a media item should be inserted | `CustomEvent<MediaItem>`             |
| `mediaLibraryOpen` | Emitted when media library is requested      | `CustomEvent<void>`                  |


## Methods

### `focusEditor() => Promise<void>`

Focus the editor

#### Returns

Type: `Promise<void>`



### `getContent() => Promise<string>`

Get the current content

#### Returns

Type: `Promise<string>`



### `getHtml() => Promise<string>`

Get content as HTML (converts if in markdown mode)

#### Returns

Type: `Promise<string>`



### `insertAtCursor(content: string) => Promise<void>`

Insert content at cursor position

#### Parameters

| Name      | Type     | Description |
| --------- | -------- | ----------- |
| `content` | `string` |             |

#### Returns

Type: `Promise<void>`



### `insertMedia(media: MediaItem) => Promise<void>`

Insert a media item

#### Parameters

| Name    | Type        | Description |
| ------- | ----------- | ----------- |
| `media` | `MediaItem` |             |

#### Returns

Type: `Promise<void>`



### `setContent(content: string) => Promise<void>`

Set the content programmatically

#### Parameters

| Name      | Type     | Description |
| --------- | -------- | ----------- |
| `content` | `string` |             |

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
