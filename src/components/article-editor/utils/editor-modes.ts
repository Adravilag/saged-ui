/**
 * @adravilag/ui - Editor Modes Utilities
 * Headless functions for HTML ↔ Markdown conversion
 */

import { ContentType } from './types';

// =====================================================
// HTML TO MARKDOWN CONVERSION
// =====================================================

/**
 * Convert HTML string to Markdown
 */
export function htmlToMarkdown(html: string): string {
  if (!html || !html.trim()) return '';

  let markdown = html;

  // Headers
  markdown = markdown.replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n');
  markdown = markdown.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n');
  markdown = markdown.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n\n');
  markdown = markdown.replace(/<h4[^>]*>(.*?)<\/h4>/gi, '#### $1\n\n');
  markdown = markdown.replace(/<h5[^>]*>(.*?)<\/h5>/gi, '##### $1\n\n');
  markdown = markdown.replace(/<h6[^>]*>(.*?)<\/h6>/gi, '###### $1\n\n');

  // Bold and italic
  markdown = markdown.replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**');
  markdown = markdown.replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**');
  markdown = markdown.replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*');
  markdown = markdown.replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*');

  // Strikethrough
  markdown = markdown.replace(/<del[^>]*>(.*?)<\/del>/gi, '~~$1~~');
  markdown = markdown.replace(/<s[^>]*>(.*?)<\/s>/gi, '~~$1~~');
  markdown = markdown.replace(/<strike[^>]*>(.*?)<\/strike>/gi, '~~$1~~');

  // Code
  markdown = markdown.replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`');
  markdown = markdown.replace(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi, '```\n$1\n```\n\n');
  markdown = markdown.replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, '```\n$1\n```\n\n');

  // Links
  markdown = markdown.replace(/<a[^>]*href=["']([^"']*)["'][^>]*>(.*?)<\/a>/gi, '[$2]($1)');

  // Images
  markdown = markdown.replace(/<img[^>]*src=["']([^"']*)["'][^>]*alt=["']([^"']*)["'][^>]*\/?>/gi, '![$2]($1)');
  markdown = markdown.replace(/<img[^>]*alt=["']([^"']*)["'][^>]*src=["']([^"']*)["'][^>]*\/?>/gi, '![$1]($2)');
  markdown = markdown.replace(/<img[^>]*src=["']([^"']*)["'][^>]*\/?>/gi, '![]($1)');

  // Lists
  markdown = markdown.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (_, content) => {
    return content.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '- $1\n') + '\n';
  });
  markdown = markdown.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (_, content) => {
    let index = 0;
    return (
      content.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, () => {
        index++;
        return `${index}. `;
      }) + '\n'
    );
  });

  // Blockquotes
  markdown = markdown.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (_, content) => {
    return (
      content
        .split('\n')
        .map((line: string) => `> ${line.trim()}`)
        .join('\n') + '\n\n'
    );
  });

  // Horizontal rules
  markdown = markdown.replace(/<hr[^>]*\/?>/gi, '\n---\n\n');

  // Paragraphs and line breaks
  markdown = markdown.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '$1\n\n');
  markdown = markdown.replace(/<br[^>]*\/?>/gi, '\n');
  markdown = markdown.replace(/<div[^>]*>([\s\S]*?)<\/div>/gi, '$1\n');

  // Clean up remaining tags
  markdown = markdown.replace(/<[^>]+>/g, '');

  // Decode HTML entities
  markdown = decodeHtmlEntities(markdown);

  // Clean up whitespace
  markdown = markdown.replace(/\n{3,}/g, '\n\n').trim();

  return markdown;
}

// =====================================================
// MARKDOWN TO HTML CONVERSION
// =====================================================

/**
 * Convert Markdown string to HTML
 */
export function markdownToHtml(markdown: string): string {
  if (!markdown || !markdown.trim()) return '';

  let html = markdown;

  // Store code blocks to protect them from other processing
  const codeBlocks: string[] = [];

  // Helper to create code block HTML
  const createCodeBlock = (lang: string, code: string): string => {
    const escapedCode = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const langLabel = lang ? `<span class="code-lang">${lang}</span>` : '';
    const langAttr = lang ? ` class="language-${lang}" data-language="${lang}"` : '';
    return `<div class="code-block">${langLabel}<pre><code${langAttr}>${escapedCode}</code></pre></div>`;
  };

  // Code blocks (fenced with ```) - process FIRST to protect code from other transformations
  // Use a more permissive regex that handles various edge cases
  html = html.replace(/```(\w*)\s*\n([\s\S]*?)```/g, (_, lang, code) => {
    const index = codeBlocks.length;
    codeBlocks.push(createCodeBlock(lang || '', code.replace(/\n$/, '')));
    return `\n___CODEBLOCK_${index}___\n`;
  });

  // Fallback: Code blocks without closing ``` (treat rest of content as code)
  html = html.replace(/```(\w*)\s*\n([\s\S]+)$/g, (match, lang, code) => {
    // Only match if no closing ``` was found (not already processed)
    if (code.includes('___CODEBLOCK_')) return match;
    const index = codeBlocks.length;
    codeBlocks.push(createCodeBlock(lang || '', code.replace(/\n$/, '')));
    return `\n___CODEBLOCK_${index}___\n`;
  });

  // Escape HTML entities (but not in code blocks which are already protected)
  html = escapeHtml(html);

  // Inline code (single backticks, not triple)
  html = html.replace(/`([^`\n]+)`/g, '<code>$1</code>');

  // Tables (before other block processing)
  html = html.replace(/^(\|.+\|)\n(\|[\s\-:|]+\|)\n((?:\|.+\|\n?)+)/gm, (_, headerRow, separatorRow, bodyRows) => {
    // Parse header
    const headers = headerRow
      .split('|')
      .slice(1, -1)
      .map((cell: string) => `<th>${cell.trim()}</th>`)
      .join('');

    // Parse alignment from separator row
    const alignments = separatorRow
      .split('|')
      .slice(1, -1)
      .map((cell: string) => {
        const trimmed = cell.trim();
        if (trimmed.startsWith(':') && trimmed.endsWith(':')) return 'center';
        if (trimmed.endsWith(':')) return 'right';
        return 'left';
      });

    // Parse body rows
    const rows = bodyRows
      .trim()
      .split('\n')
      .map((row: string) => {
        const cells = row
          .split('|')
          .slice(1, -1)
          .map((cell: string, i: number) => {
            const align = alignments[i] || 'left';
            return `<td style="text-align: ${align}">${cell.trim()}</td>`;
          })
          .join('');
        return `<tr>${cells}</tr>`;
      })
      .join('');

    return `<table><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table>`;
  });

  // Headers with auto-generated IDs for anchor links
  html = html.replace(/^###### (.+)$/gm, (_, text) => `<h6 id="${slugify(text)}">${text}</h6>`);
  html = html.replace(/^##### (.+)$/gm, (_, text) => `<h5 id="${slugify(text)}">${text}</h5>`);
  html = html.replace(/^#### (.+)$/gm, (_, text) => `<h4 id="${slugify(text)}">${text}</h4>`);
  html = html.replace(/^### (.+)$/gm, (_, text) => `<h3 id="${slugify(text)}">${text}</h3>`);
  html = html.replace(/^## (.+)$/gm, (_, text) => `<h2 id="${slugify(text)}">${text}</h2>`);
  html = html.replace(/^# (.+)$/gm, (_, text) => `<h1 id="${slugify(text)}">${text}</h1>`);

  // Bold and italic (order matters!)
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/(?<![*\w])\*([^*\n]+)\*(?![*\w])/g, '<em>$1</em>');
  html = html.replace(/___(.+?)___/g, '<strong><em>$1</em></strong>');
  html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');
  html = html.replace(/(?<!_)\b_([^_\n]+)_\b(?!_)/g, '<em>$1</em>');

  // Strikethrough
  html = html.replace(/~~(.+?)~~/g, '<del>$1</del>');

  // Highlight/Mark
  html = html.replace(/==(.+?)==/g, '<mark>$1</mark>');

  // Subscript and superscript
  html = html.replace(/~([^~]+)~/g, '<sub>$1</sub>');
  html = html.replace(/\^([^^]+)\^/g, '<sup>$1</sup>');

  // Images (before links)
  html = html.replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/g, (_, alt, src, title) => {
    const titleAttr = title ? ` title="${title}"` : '';
    return `<img src="${src}" alt="${alt}"${titleAttr} />`;
  });

  // Links with optional title
  html = html.replace(/\[([^\]]+)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/g, (_, text, href, title) => {
    const titleAttr = title ? ` title="${title}"` : '';
    return `<a href="${href}"${titleAttr}>${text}</a>`;
  });

  // Blockquotes (handle multi-line)
  html = html.replace(/^(?:>\s?(.*)(?:\n|$))+/gm, match => {
    const content = match.replace(/^>\s?/gm, '').trim();
    return `<blockquote>${content}</blockquote>`;
  });

  // Task lists (must be before regular lists)
  html = html.replace(/^(\s*)[-*]\s+\[x\]\s+(.+)$/gm, '$1<li class="task-item task-done"><input type="checkbox" checked disabled /> $2</li>');
  html = html.replace(/^(\s*)[-*]\s+\[\s?\]\s+(.+)$/gm, '$1<li class="task-item"><input type="checkbox" disabled /> $2</li>');

  // Nested lists - process by indentation levels
  html = processLists(html);

  // Horizontal rules
  html = html.replace(/^---$/gm, '<hr />');
  html = html.replace(/^\*\*\*$/gm, '<hr />');
  html = html.replace(/^___$/gm, '<hr />');

  // Line breaks (two spaces at end of line or backslash)
  html = html.replace(/  \n/g, '<br />\n');
  html = html.replace(/\\\n/g, '<br />\n');

  // Paragraphs - wrap remaining text blocks (not code block placeholders)
  html = html.replace(/^(?!<[a-z/]|$|\s*$|___CODEBLOCK_\d+___)(.+)$/gm, '<p>$1</p>');

  // Clean up empty paragraphs
  html = html.replace(/<p>\s*<\/p>/g, '');

  // Clean up excessive whitespace
  html = html.replace(/\n{2,}/g, '\n').trim();

  // Restore code blocks (handle both wrapped in <p> and standalone)
  codeBlocks.forEach((block, index) => {
    // Remove <p> wrapper if present around the placeholder
    html = html.replace(`<p>___CODEBLOCK_${index}___</p>`, block);
    html = html.replace(`___CODEBLOCK_${index}___`, block);
  });

  return html;
}

/**
 * Generate URL-friendly slug from text
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special chars
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/-+/g, '-'); // Replace multiple - with single -
}

/**
 * Process nested lists
 */
function processLists(html: string): string {
  const lines = html.split('\n');
  const result: string[] = [];
  const listStack: { type: 'ul' | 'ol'; indent: number }[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check for list items (task items already have <li>)
    const taskMatch = line.match(/^(\s*)<li class="task-item/);
    const ulMatch = line.match(/^(\s*)[-*]\s+(.+)$/);
    const olMatch = line.match(/^(\s*)(\d+)\.\s+(.+)$/);

    if (taskMatch || ulMatch || olMatch) {
      let indent: number;
      let content: string;
      let listType: 'ul' | 'ol';

      if (taskMatch) {
        // Task items already converted to <li>
        indent = taskMatch[1].length;
        listType = 'ul';

        // Handle list opening for task items
        if (listStack.length === 0 || listStack[listStack.length - 1].indent < indent) {
          result.push('<ul class="task-list">');
          listStack.push({ type: 'ul', indent });
        }
        result.push(line);
        continue;
      } else if (ulMatch) {
        indent = ulMatch[1].length;
        content = ulMatch[2];
        listType = 'ul';
      } else {
        indent = olMatch![1].length;
        content = olMatch![3];
        listType = 'ol';
      }

      // Close lists that are deeper than current
      while (listStack.length > 0 && listStack[listStack.length - 1].indent > indent) {
        const closed = listStack.pop()!;
        result.push(`</${closed.type}>`);
      }

      // Check if we need to open a new list or switch type
      if (listStack.length === 0) {
        // Detect if this is a table of contents / index
        const isTocItem = content.includes('](#') || content.match(/^\[.+\]\(#/);
        const tocClass = isTocItem ? ' class="toc-list"' : '';
        result.push(`<${listType}${tocClass}>`);
        listStack.push({ type: listType, indent });
      } else if (listStack[listStack.length - 1].indent < indent) {
        // Nested list
        result.push(`<${listType}>`);
        listStack.push({ type: listType, indent });
      } else if (listStack[listStack.length - 1].type !== listType && listStack[listStack.length - 1].indent === indent) {
        // Switch list type at same level
        const closed = listStack.pop()!;
        result.push(`</${closed.type}>`);
        result.push(`<${listType}>`);
        listStack.push({ type: listType, indent });
      }

      result.push(`<li>${content}</li>`);
    } else {
      // Close all open lists when encountering non-list content
      while (listStack.length > 0) {
        const closed = listStack.pop()!;
        result.push(`</${closed.type}>`);
      }
      result.push(line);
    }
  }

  // Close any remaining open lists
  while (listStack.length > 0) {
    const closed = listStack.pop()!;
    result.push(`</${closed.type}>`);
  }

  return result.join('\n');
}

// =====================================================
// HELPER FUNCTIONS
// =====================================================

/**
 * Decode HTML entities
 */
function decodeHtmlEntities(text: string): string {
  const entities: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&nbsp;': ' ',
    '&mdash;': '—',
    '&ndash;': '–',
    '&copy;': '©',
    '&reg;': '®',
    '&trade;': '™',
  };

  return text.replace(/&[^;]+;/g, entity => entities[entity] || entity);
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text: string): string {
  // Don't escape, we want to allow HTML in markdown
  // This is called before processing to handle edge cases
  return text;
}

// =====================================================
// MODE CONVERSION
// =====================================================

/**
 * Convert content between content types
 */
export function convertContent(content: string, fromType: ContentType, toType: ContentType): string {
  // No conversion needed for same type
  if (fromType === toType) return content;

  // HTML -> Markdown
  if (fromType === 'html' && toType === 'markdown') {
    return htmlToMarkdown(content);
  }

  // Markdown -> HTML
  if (fromType === 'markdown' && toType === 'html') {
    return markdownToHtml(content);
  }

  return content;
}

/**
 * Get HTML preview content regardless of current content type
 */
export function getPreviewHtml(content: string, contentType: ContentType): string {
  if (contentType === 'markdown') {
    return markdownToHtml(content);
  }
  return content;
}

// =====================================================
// CONTENT SANITIZATION
// =====================================================

/**
 * Basic HTML sanitization - removes potentially dangerous tags/attributes
 * For production, consider using DOMPurify
 */
export function sanitizeHtml(html: string): string {
  // Remove script tags
  let sanitized = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  // Remove event handlers
  sanitized = sanitized.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '');

  // Remove javascript: URLs
  sanitized = sanitized.replace(/href\s*=\s*["']javascript:[^"']*["']/gi, 'href="#"');

  // Remove data: URLs in src (potential XSS)
  sanitized = sanitized.replace(/src\s*=\s*["']data:[^"']*["']/gi, 'src=""');

  return sanitized;
}
