/**
 * @adravilag/ui - Editor Modes Utilities
 * Headless functions for HTML ↔ Markdown conversion
 */

import { EditorMode } from './types';

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

  // Escape HTML entities first
  html = escapeHtml(html);

  // Code blocks (before other processing)
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
    const langAttr = lang ? ` class="language-${lang}"` : '';
    return `<pre><code${langAttr}>${code.trim()}</code></pre>`;
  });

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Headers
  html = html.replace(/^###### (.+)$/gm, '<h6>$1</h6>');
  html = html.replace(/^##### (.+)$/gm, '<h5>$1</h5>');
  html = html.replace(/^#### (.+)$/gm, '<h4>$1</h4>');
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

  // Bold and italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  html = html.replace(/___(.+?)___/g, '<strong><em>$1</em></strong>');
  html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');
  html = html.replace(/_(.+?)_/g, '<em>$1</em>');

  // Strikethrough
  html = html.replace(/~~(.+?)~~/g, '<del>$1</del>');

  // Images (before links)
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Blockquotes
  html = html.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>');
  // Merge consecutive blockquotes
  html = html.replace(/<\/blockquote>\n<blockquote>/g, '\n');

  // Unordered lists
  html = html.replace(/^[\-\*] (.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>\n?)+/g, match => `<ul>${match}</ul>`);

  // Ordered lists
  html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');

  // Horizontal rules
  html = html.replace(/^---$/gm, '<hr />');
  html = html.replace(/^\*\*\*$/gm, '<hr />');
  html = html.replace(/^___$/gm, '<hr />');

  // Paragraphs - wrap remaining text blocks
  html = html.replace(/^(?!<[a-z]|$)(.+)$/gm, '<p>$1</p>');

  // Clean up empty paragraphs
  html = html.replace(/<p>\s*<\/p>/g, '');

  // Clean up excessive whitespace
  html = html.replace(/\n{2,}/g, '\n').trim();

  return html;
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
 * Convert content between editor modes
 */
export function convertContent(content: string, fromMode: EditorMode, toMode: EditorMode): string {
  // No conversion needed for same mode or preview modes
  if (fromMode === toMode) return content;
  if (toMode === 'preview' || toMode === 'split') return content;
  if (fromMode === 'preview' || fromMode === 'split') return content;

  // HTML -> Markdown
  if (fromMode === 'html' && toMode === 'markdown') {
    return htmlToMarkdown(content);
  }

  // Markdown -> HTML
  if (fromMode === 'markdown' && toMode === 'html') {
    return markdownToHtml(content);
  }

  return content;
}

/**
 * Get HTML preview content regardless of current mode
 */
export function getPreviewHtml(content: string, currentMode: EditorMode): string {
  if (currentMode === 'markdown') {
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
