/**
 * Icon Management Server
 *
 * Local HTTP server for managing icons via web UI
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { parseSVG } = require('./svg-parser');

/**
 * Start the icon management server
 * @param {string} iconsJsonPath - Path to icons.json
 * @param {number} port - Server port
 */
function start(iconsJsonPath, port = 4567) {
  const server = http.createServer((req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    const url = new URL(req.url, `http://localhost:${port}`);

    // Serve UI
    if (req.method === 'GET' && url.pathname === '/') {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(generateUI(iconsJsonPath));
      return;
    }

    // API: List icons
    if (req.method === 'GET' && url.pathname === '/api/icons') {
      const icons = readIcons(iconsJsonPath);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: true,
        icons,
        count: Object.keys(icons).length
      }));
      return;
    }

    // API: Add icon
    if (req.method === 'POST' && url.pathname === '/api/icons') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        try {
          const { name, svg } = JSON.parse(body);

          if (!name || !svg) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: 'name and svg are required' }));
            return;
          }

          const parsed = parseSVG(svg);
          if (parsed.paths.length === 0) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: 'No paths found in SVG' }));
            return;
          }

          const kebabName = toKebabCase(name);
          const icons = readIcons(iconsJsonPath);
          const isUpdate = !!icons[kebabName];

          const iconDef = { paths: parsed.paths };
          if (parsed.viewBox !== '0 0 24 24') {
            iconDef.viewBox = parsed.viewBox;
          }
          if (parsed.fillRule && parsed.fillRule !== 'nonzero') {
            iconDef.fillRule = parsed.fillRule;
          }

          icons[kebabName] = iconDef;
          saveIcons(iconsJsonPath, icons);

          console.log(`${isUpdate ? '🔄 Updated' : '✅ Added'}: ${kebabName}`);

          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            success: true,
            name: kebabName,
            isUpdate,
            message: `Icon "${kebabName}" ${isUpdate ? 'updated' : 'added'}`
          }));
        } catch (e) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: e.message }));
        }
      });
      return;
    }

    // API: Delete icon
    if (req.method === 'DELETE' && url.pathname.startsWith('/api/icons/')) {
      const iconName = decodeURIComponent(url.pathname.replace('/api/icons/', ''));
      const icons = readIcons(iconsJsonPath);

      if (!icons[iconName]) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: `Icon "${iconName}" not found` }));
        return;
      }

      delete icons[iconName];
      saveIcons(iconsJsonPath, icons);

      console.log(`🗑️ Deleted: ${iconName}`);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, message: `Icon "${iconName}" deleted` }));
      return;
    }

    // 404
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, error: 'Not found' }));
  });

  server.listen(port, () => {
    console.log(`
🎨 SageBox Icon Server

   Local:   http://localhost:${port}

   API Endpoints:
   GET    /api/icons          List all icons
   POST   /api/icons          Add icon { name, svg }
   DELETE /api/icons/:name    Delete icon

   Press Ctrl+C to stop
`);
  });

  return server;
}

function readIcons(iconsJsonPath) {
  if (!fs.existsSync(iconsJsonPath)) {
    return {};
  }
  return JSON.parse(fs.readFileSync(iconsJsonPath, 'utf-8'));
}

function saveIcons(iconsJsonPath, icons) {
  const sorted = {};
  Object.keys(icons).sort().forEach(key => {
    sorted[key] = icons[key];
  });
  fs.writeFileSync(iconsJsonPath, JSON.stringify(sorted, null, 2), 'utf-8');
}

function toKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

function generateUI(iconsJsonPath) {
  const icons = readIcons(iconsJsonPath);

  // Define icon sets with metadata
  const ICON_SETS = {
    'lucide': { name: 'Lucide', color: '#f472b6', license: 'ISC' },
    'heroicons': { name: 'Heroicons', color: '#38bdf8', license: 'MIT' },
    'material': { name: 'Material Symbols', color: '#fbbf24', license: 'Apache 2.0' },
    'tabler': { name: 'Tabler Icons', color: '#4ade80', license: 'MIT' },
    'feather': { name: 'Feather', color: '#a78bfa', license: 'MIT' },
    'mdi': { name: 'Material Design Icons', color: '#fb923c', license: 'Apache 2.0' },
    'bootstrap': { name: 'Bootstrap Icons', color: '#818cf8', license: 'MIT' },
    'bi': { name: 'Bootstrap Icons', color: '#818cf8', license: 'MIT' },
    'carbon': { name: 'Carbon', color: '#2dd4bf', license: 'Apache 2.0' },
    'ph': { name: 'Phosphor', color: '#f87171', license: 'MIT' },
    'ion': { name: 'Ionicons', color: '#60a5fa', license: 'MIT' },
    'ri': { name: 'Remix Icon', color: '#c084fc', license: 'Apache 2.0' },
    'solar': { name: 'Solar', color: '#facc15', license: 'CC BY 4.0' }
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SageBox Icon Manager</title>
  <style>
    :root {
      /* Colors - Accent */
      --color-primary: #6366f1;
      --color-primary-hover: #4f46e5;
      --color-primary-soft: rgba(99, 102, 241, 0.15);
      --color-secondary: #a855f7;
      --color-success: #22c55e;
      --color-success-soft: rgba(34, 197, 94, 0.15);
      --color-warning: #f59e0b;
      --color-warning-soft: rgba(245, 158, 11, 0.15);
      --color-danger: #ef4444;
      --color-danger-soft: rgba(239, 68, 68, 0.15);
      --color-info: #38bdf8;
      --color-info-soft: rgba(56, 189, 248, 0.15);

      /* Backgrounds */
      --bg-base: #0a0a0f;
      --bg-surface: #12121a;
      --bg-elevated: #1a1a24;
      --bg-muted: #252530;

      /* Text */
      --text-primary: #f4f4f5;
      --text-secondary: #a1a1aa;
      --text-muted: #71717a;

      /* Borders */
      --border-default: #27272a;
      --border-muted: #3f3f46;

      /* Effects */
      --radius-sm: 6px;
      --radius-md: 8px;
      --radius-lg: 12px;
      --radius-xl: 16px;
      --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
      --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
      --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2);
      --shadow-glow: 0 0 20px rgba(99, 102, 241, 0.3);

      /* Transitions */
      --transition-fast: 150ms ease;
      --transition-normal: 250ms ease;

      /* Layout */
      --sidebar-width: 280px;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: var(--bg-base);
      color: var(--text-primary);
      min-height: 100vh;
      line-height: 1.5;
    }

    /* Layout */
    .app-layout {
      display: flex;
      min-height: 100vh;
    }

    /* Sidebar */
    .sidebar {
      width: var(--sidebar-width);
      background: var(--bg-surface);
      border-right: 1px solid var(--border-default);
      display: flex;
      flex-direction: column;
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      z-index: 40;
    }

    .sidebar-header {
      padding: 1.25rem;
      border-bottom: 1px solid var(--border-default);
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .logo-icon {
      width: 36px;
      height: 36px;
      background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.125rem;
    }

    .logo-text {
      font-size: 1rem;
      font-weight: 600;
    }

    .logo-text span {
      display: block;
      color: var(--text-muted);
      font-weight: 400;
      font-size: 0.75rem;
    }

    .sidebar-content {
      flex: 1;
      overflow-y: auto;
      padding: 1rem 0;
    }

    .sidebar-section {
      margin-bottom: 1.5rem;
    }

    .sidebar-section-title {
      padding: 0 1.25rem;
      margin-bottom: 0.5rem;
      font-size: 0.6875rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-muted);
    }

    /* Category Items */
    .category-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.625rem 1.25rem;
      cursor: pointer;
      transition: var(--transition-fast);
      border-left: 2px solid transparent;
    }

    .category-item:hover {
      background: var(--bg-elevated);
    }

    .category-item.active {
      background: var(--color-primary-soft);
      border-left-color: var(--color-primary);
    }

    .category-icon {
      width: 32px;
      height: 32px;
      border-radius: var(--radius-sm);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.875rem;
    }

    .category-info {
      flex: 1;
      min-width: 0;
    }

    .category-name {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--text-primary);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .category-meta {
      font-size: 0.75rem;
      color: var(--text-muted);
    }

    .category-count {
      font-size: 0.75rem;
      color: var(--text-muted);
      background: var(--bg-muted);
      padding: 0.125rem 0.5rem;
      border-radius: var(--radius-sm);
    }

    /* Icon Set Card in Sidebar */
    .icon-set-previews {
      display: flex;
      gap: 0.25rem;
      margin-top: 0.25rem;
    }

    .icon-set-previews svg {
      width: 14px;
      height: 14px;
      fill: var(--text-muted);
    }

    /* Main Content */
    .main-content {
      flex: 1;
      margin-left: var(--sidebar-width);
      display: flex;
      flex-direction: column;
    }

    /* Header */
    .header {
      background: var(--bg-surface);
      border-bottom: 1px solid var(--border-default);
      padding: 1rem 1.5rem;
      position: sticky;
      top: 0;
      z-index: 30;
    }

    .header-content {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    /* Search Input */
    .search-wrapper {
      flex: 1;
      max-width: 400px;
      position: relative;
    }

    .search-icon {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-muted);
      pointer-events: none;
    }

    .search {
      width: 100%;
      padding: 0.625rem 1rem 0.625rem 2.5rem;
      background: var(--bg-elevated);
      border: 1px solid var(--border-default);
      border-radius: var(--radius-lg);
      color: var(--text-primary);
      font-size: 0.875rem;
      transition: var(--transition-fast);
    }

    .search:focus {
      outline: none;
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px var(--color-primary-soft);
    }

    .search::placeholder {
      color: var(--text-muted);
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    /* Buttons */
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.625rem 1rem;
      font-size: 0.8125rem;
      font-weight: 500;
      border: none;
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: var(--transition-fast);
      white-space: nowrap;
    }

    .btn-primary {
      background: var(--color-primary);
      color: white;
    }

    .btn-primary:hover {
      background: var(--color-primary-hover);
      box-shadow: var(--shadow-glow);
    }

    .btn-secondary {
      background: var(--bg-elevated);
      color: var(--text-primary);
      border: 1px solid var(--border-default);
    }

    .btn-secondary:hover {
      background: var(--bg-muted);
      border-color: var(--border-muted);
    }

    .btn-danger {
      background: var(--color-danger);
      color: white;
    }

    .btn-danger:hover {
      background: #dc2626;
    }

    .btn-ghost {
      background: transparent;
      color: var(--text-secondary);
      padding: 0.5rem;
    }

    .btn-ghost:hover {
      background: var(--bg-elevated);
      color: var(--text-primary);
    }

    /* View Toggle */
    .view-toggle {
      display: flex;
      background: var(--bg-elevated);
      border-radius: var(--radius-md);
      padding: 0.25rem;
      border: 1px solid var(--border-default);
    }

    .view-btn {
      padding: 0.375rem 0.5rem;
      background: transparent;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      border-radius: var(--radius-sm);
      transition: var(--transition-fast);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .view-btn:hover {
      color: var(--text-primary);
    }

    .view-btn.active {
      background: var(--color-primary);
      color: white;
    }

    /* Content Area */
    .content-area {
      flex: 1;
      padding: 1.5rem;
      overflow-y: auto;
    }

    /* Category Header */
    .category-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--border-default);
    }

    .category-header-icon {
      width: 48px;
      height: 48px;
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
    }

    .category-header-info h1 {
      font-size: 1.25rem;
      font-weight: 600;
    }

    .category-header-meta {
      display: flex;
      gap: 1rem;
      margin-top: 0.25rem;
    }

    .category-header-meta span {
      font-size: 0.8125rem;
      color: var(--text-muted);
    }

    .license-badge {
      background: var(--bg-muted);
      padding: 0.125rem 0.5rem;
      border-radius: var(--radius-sm);
      font-size: 0.75rem;
    }

    /* Grid */
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
      gap: 0.75rem;
    }

    .grid.list-view {
      grid-template-columns: 1fr;
      gap: 0.5rem;
    }

    /* Icon Card */
    .icon-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-default);
      border-radius: var(--radius-md);
      padding: 1rem 0.75rem;
      text-align: center;
      cursor: pointer;
      transition: var(--transition-fast);
      position: relative;
    }

    .icon-card:hover {
      border-color: var(--color-primary);
      background: var(--bg-elevated);
    }

    .icon-card.selected {
      border-color: var(--color-primary);
      background: var(--color-primary-soft);
    }

    .icon-card .check-badge {
      position: absolute;
      top: 0.375rem;
      right: 0.375rem;
      width: 18px;
      height: 18px;
      background: var(--color-primary);
      border-radius: 50%;
      display: none;
      align-items: center;
      justify-content: center;
    }

    .icon-card.selected .check-badge {
      display: flex;
    }

    .icon-card svg.icon-preview {
      width: 28px;
      height: 28px;
      fill: currentColor;
    }

    .icon-card .name {
      margin-top: 0.5rem;
      font-size: 0.6875rem;
      color: var(--text-muted);
      word-break: break-word;
      line-height: 1.3;
    }

    .icon-card.hidden {
      display: none;
    }

    /* List View */
    .grid.list-view .icon-card {
      display: flex;
      align-items: center;
      padding: 0.5rem 0.75rem;
      text-align: left;
      gap: 0.75rem;
    }

    .grid.list-view .icon-card svg.icon-preview {
      width: 20px;
      height: 20px;
    }

    .grid.list-view .icon-card .name {
      margin-top: 0;
      flex: 1;
      font-size: 0.8125rem;
    }

    .grid.list-view .icon-card .check-badge {
      position: static;
    }

    /* Icon Set Cards (for "All" view) */
    .icon-sets-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .icon-set-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-default);
      border-radius: var(--radius-lg);
      padding: 1rem;
      cursor: pointer;
      transition: var(--transition-fast);
    }

    .icon-set-card:hover {
      border-color: var(--color-primary);
      background: var(--bg-elevated);
    }

    .icon-set-card-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 0.75rem;
    }

    .icon-set-card-title {
      font-size: 0.9375rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    .icon-set-card-meta {
      font-size: 0.75rem;
      color: var(--text-muted);
      margin-top: 0.125rem;
    }

    .icon-set-card-count {
      font-size: 0.75rem;
      color: var(--text-muted);
    }

    .icon-set-card-previews {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .icon-set-card-previews svg {
      width: 20px;
      height: 20px;
      fill: var(--text-secondary);
    }

    /* Modal */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.75);
      backdrop-filter: blur(4px);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 100;
      padding: 2rem;
    }

    .modal-overlay.active {
      display: flex;
    }

    .modal {
      background: var(--bg-surface);
      border: 1px solid var(--border-default);
      border-radius: var(--radius-xl);
      width: 100%;
      max-width: 480px;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: var(--shadow-lg);
    }

    .modal-header {
      padding: 1.25rem;
      border-bottom: 1px solid var(--border-default);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .modal-header h2 {
      font-size: 1rem;
      font-weight: 600;
    }

    .modal-close {
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      border-radius: var(--radius-md);
      transition: var(--transition-fast);
    }

    .modal-close:hover {
      background: var(--bg-elevated);
      color: var(--text-primary);
    }

    .modal-body {
      padding: 1.25rem;
    }

    .modal-footer {
      padding: 1rem 1.25rem;
      border-top: 1px solid var(--border-default);
      display: flex;
      gap: 0.75rem;
      justify-content: flex-end;
    }

    /* Form */
    .form-group {
      margin-bottom: 1rem;
    }

    .form-label {
      display: block;
      margin-bottom: 0.375rem;
      font-size: 0.8125rem;
      font-weight: 500;
      color: var(--text-secondary);
    }

    .form-input,
    .form-textarea {
      width: 100%;
      padding: 0.625rem 0.875rem;
      background: var(--bg-elevated);
      border: 1px solid var(--border-default);
      border-radius: var(--radius-md);
      color: var(--text-primary);
      font-size: 0.8125rem;
      transition: var(--transition-fast);
    }

    .form-input:focus,
    .form-textarea:focus {
      outline: none;
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px var(--color-primary-soft);
    }

    .form-textarea {
      min-height: 120px;
      font-family: 'JetBrains Mono', 'Fira Code', monospace;
      font-size: 0.75rem;
      resize: vertical;
    }

    /* Drop Zone */
    .drop-zone {
      border: 2px dashed var(--border-muted);
      border-radius: var(--radius-lg);
      padding: 1.5rem;
      text-align: center;
      transition: var(--transition-fast);
      margin-bottom: 1rem;
      cursor: pointer;
    }

    .drop-zone:hover,
    .drop-zone.dragover {
      border-color: var(--color-primary);
      background: var(--color-primary-soft);
    }

    .drop-zone-icon {
      width: 40px;
      height: 40px;
      margin: 0 auto 0.75rem;
      color: var(--text-muted);
    }

    .drop-zone-text {
      color: var(--text-secondary);
      font-size: 0.8125rem;
    }

    .drop-zone-text strong {
      color: var(--color-primary);
    }

    /* Toast */
    .toast {
      position: fixed;
      bottom: 1.5rem;
      right: 1.5rem;
      background: var(--bg-elevated);
      border: 1px solid var(--border-default);
      border-radius: var(--radius-lg);
      padding: 0.875rem 1rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      box-shadow: var(--shadow-lg);
      transform: translateY(100px);
      opacity: 0;
      transition: var(--transition-normal);
      z-index: 200;
    }

    .toast.show {
      transform: translateY(0);
      opacity: 1;
    }

    .toast.success { border-left: 3px solid var(--color-success); }
    .toast.error { border-left: 3px solid var(--color-danger); }

    /* Selection Bar */
    .selection-bar {
      position: fixed;
      bottom: 1.5rem;
      left: calc(var(--sidebar-width) + 50%);
      transform: translateX(-50%) translateY(100px);
      background: var(--bg-elevated);
      border: 1px solid var(--border-default);
      border-radius: var(--radius-xl);
      padding: 0.625rem 1.25rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      box-shadow: var(--shadow-lg);
      transition: var(--transition-normal);
      z-index: 90;
    }

    .selection-bar.show {
      transform: translateX(-50%) translateY(0);
    }

    .selection-count {
      font-size: 0.8125rem;
      color: var(--text-secondary);
    }

    .selection-count strong {
      color: var(--color-primary);
    }

    /* Empty State */
    .empty-state {
      text-align: center;
      padding: 3rem 2rem;
      color: var(--text-muted);
    }

    .empty-state-icon {
      width: 56px;
      height: 56px;
      margin: 0 auto 1rem;
      color: var(--text-muted);
      opacity: 0.5;
    }

    .empty-state h3 {
      font-size: 1rem;
      color: var(--text-secondary);
      margin-bottom: 0.375rem;
    }

    /* Animations */
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .icon-card {
      animation: fadeIn 0.2s ease forwards;
    }

    /* Scrollbar */
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }

    ::-webkit-scrollbar-track {
      background: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background: var(--bg-muted);
      border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: var(--border-muted);
    }

    /* Responsive */
    @media (max-width: 768px) {
      .sidebar {
        transform: translateX(-100%);
      }
      .main-content {
        margin-left: 0;
      }
      .selection-bar {
        left: 50%;
      }
    }
  </style>
</head>
<body>
  <div class="app-layout">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <div class="logo">
          <div class="logo-icon">🎨</div>
          <div class="logo-text">SageBox<span>Icon Manager</span></div>
        </div>
      </div>

      <div class="sidebar-content">
        <div class="sidebar-section">
          <div class="sidebar-section-title">Categories</div>
          <div class="category-item active" data-category="all" onclick="filterCategory('all')">
            <div class="category-icon" style="background: var(--color-primary-soft); color: var(--color-primary);">📦</div>
            <div class="category-info">
              <div class="category-name">All Icons</div>
              <div class="category-meta" id="allIconsCount">${Object.keys(icons).length} icons</div>
            </div>
          </div>
          <div class="category-item" data-category="custom" onclick="filterCategory('custom')">
            <div class="category-icon" style="background: var(--color-success-soft); color: var(--color-success);">✨</div>
            <div class="category-info">
              <div class="category-name">Custom</div>
              <div class="category-meta" id="customIconsCount">0 icons</div>
            </div>
          </div>
        </div>

        <div class="sidebar-section">
          <div class="sidebar-section-title">Icon Sets</div>
          <div id="iconSetsList"></div>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <header class="header">
        <div class="header-content">
          <div class="search-wrapper">
            <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <input type="text" class="search" id="search" placeholder="Search icons...">
          </div>

          <div class="header-actions">
            <div class="view-toggle">
              <button class="view-btn active" id="gridViewBtn" onclick="setView('grid')" title="Grid view">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="3" y="3" width="7" height="7" rx="1"/>
                  <rect x="14" y="3" width="7" height="7" rx="1"/>
                  <rect x="3" y="14" width="7" height="7" rx="1"/>
                  <rect x="14" y="14" width="7" height="7" rx="1"/>
                </svg>
              </button>
              <button class="view-btn" id="listViewBtn" onclick="setView('list')" title="List view">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="3" y="4" width="18" height="4" rx="1"/>
                  <rect x="3" y="10" width="18" height="4" rx="1"/>
                  <rect x="3" y="16" width="18" height="4" rx="1"/>
                </svg>
              </button>
            </div>

            <button class="btn btn-primary" onclick="openAddModal()">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Add Icon
            </button>
          </div>
        </div>
      </header>

      <div class="content-area">
        <div id="categoryHeader"></div>
        <div id="iconSetsCards"></div>
        <div class="grid" id="grid"></div>
      </div>
    </main>
  </div>

  <!-- Selection Bar -->
  <div class="selection-bar" id="selectionBar">
    <span class="selection-count"><strong id="selectedCount">0</strong> selected</span>
    <button class="btn btn-ghost" onclick="clearSelection()">Clear</button>
    <button class="btn btn-danger" onclick="deleteSelected()">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M3 6h18"/>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
      </svg>
      Delete
    </button>
  </div>

  <!-- Add Modal -->
  <div class="modal-overlay" id="addModal">
    <div class="modal">
      <div class="modal-header">
        <h2>Add New Icon</h2>
        <button class="modal-close" onclick="closeModal()">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
      <div class="modal-body">
        <div class="drop-zone" id="dropZone">
          <svg class="drop-zone-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
          <p class="drop-zone-text">
            <strong>Drop SVG file here</strong><br>
            or click to browse
          </p>
          <input type="file" id="fileInput" accept=".svg" style="display: none">
        </div>

        <div class="form-group">
          <label class="form-label">Icon Name</label>
          <input type="text" class="form-input" id="iconName" placeholder="e.g. my-custom-icon">
        </div>

        <div class="form-group">
          <label class="form-label">SVG Code</label>
          <textarea class="form-textarea" id="svgCode" placeholder="<svg viewBox='0 0 24 24'>...</svg>"></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
        <button class="btn btn-primary" onclick="addIcon()">Add Icon</button>
      </div>
    </div>
  </div>

  <!-- Toast -->
  <div class="toast" id="toast">
    <span id="toastMessage"></span>
  </div>

  <script>
    const icons = ${JSON.stringify(icons)};
    const ICON_SETS = ${JSON.stringify(ICON_SETS)};

    let selected = new Set();
    let currentView = 'grid';
    let currentCategory = 'all';

    // Categorize icons
    function categorizeIcons() {
      const categories = {
        custom: [],
        sets: {}
      };

      const knownPrefixes = Object.keys(ICON_SETS);

      Object.keys(icons).forEach(name => {
        const parts = name.split('-');
        const prefix = parts[0];

        if (knownPrefixes.includes(prefix)) {
          if (!categories.sets[prefix]) {
            categories.sets[prefix] = [];
          }
          categories.sets[prefix].push(name);
        } else {
          categories.custom.push(name);
        }
      });

      return categories;
    }

    function renderSidebar() {
      const categories = categorizeIcons();
      const setsList = document.getElementById('iconSetsList');

      // Update counts
      document.getElementById('allIconsCount').textContent = Object.keys(icons).length + ' icons';
      document.getElementById('customIconsCount').textContent = categories.custom.length + ' icons';

      // Render icon sets
      const setsHTML = Object.entries(categories.sets)
        .sort((a, b) => b[1].length - a[1].length)
        .map(([prefix, iconNames]) => {
          const setInfo = ICON_SETS[prefix] || { name: prefix, color: '#6366f1' };
          const previewIcons = iconNames.slice(0, 6);

          return \`
            <div class="category-item" data-category="\${prefix}" onclick="filterCategory('\${prefix}')">
              <div class="category-icon" style="background: \${setInfo.color}22; color: \${setInfo.color};">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="3" y="3" width="7" height="7" rx="1"/>
                  <rect x="14" y="3" width="7" height="7" rx="1"/>
                  <rect x="3" y="14" width="7" height="7" rx="1"/>
                  <rect x="14" y="14" width="7" height="7" rx="1"/>
                </svg>
              </div>
              <div class="category-info">
                <div class="category-name">\${setInfo.name}</div>
                <div class="category-meta">\${iconNames.length} icons</div>
              </div>
            </div>
          \`;
        }).join('');

      setsList.innerHTML = setsHTML;
    }

    function filterCategory(category) {
      currentCategory = category;

      // Update sidebar active state
      document.querySelectorAll('.category-item').forEach(item => {
        item.classList.toggle('active', item.dataset.category === category);
      });

      renderCategoryHeader();
      renderIconSetsCards();
      renderIcons();
    }

    function renderCategoryHeader() {
      const header = document.getElementById('categoryHeader');
      const categories = categorizeIcons();

      if (currentCategory === 'all') {
        header.innerHTML = \`
          <div class="category-header">
            <div class="category-header-icon" style="background: var(--color-primary-soft); color: var(--color-primary);">📦</div>
            <div class="category-header-info">
              <h1>All Icons</h1>
              <div class="category-header-meta">
                <span>\${Object.keys(icons).length} icons</span>
                <span>\${Object.keys(categories.sets).length} icon sets</span>
              </div>
            </div>
          </div>
        \`;
      } else if (currentCategory === 'custom') {
        header.innerHTML = \`
          <div class="category-header">
            <div class="category-header-icon" style="background: var(--color-success-soft); color: var(--color-success);">✨</div>
            <div class="category-header-info">
              <h1>Custom Icons</h1>
              <div class="category-header-meta">
                <span>\${categories.custom.length} icons</span>
              </div>
            </div>
          </div>
        \`;
      } else {
        const setInfo = ICON_SETS[currentCategory] || { name: currentCategory, color: '#6366f1', license: 'Unknown' };
        const count = categories.sets[currentCategory]?.length || 0;
        header.innerHTML = \`
          <div class="category-header">
            <div class="category-header-icon" style="background: \${setInfo.color}22; color: \${setInfo.color};">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <rect x="3" y="3" width="7" height="7" rx="1"/>
                <rect x="14" y="3" width="7" height="7" rx="1"/>
                <rect x="3" y="14" width="7" height="7" rx="1"/>
                <rect x="14" y="14" width="7" height="7" rx="1"/>
              </svg>
            </div>
            <div class="category-header-info">
              <h1>\${setInfo.name}</h1>
              <div class="category-header-meta">
                <span>\${count} icons</span>
                <span class="license-badge">\${setInfo.license}</span>
              </div>
            </div>
          </div>
        \`;
      }
    }

    function renderIconSetsCards() {
      const container = document.getElementById('iconSetsCards');

      if (currentCategory !== 'all') {
        container.innerHTML = '';
        return;
      }

      const categories = categorizeIcons();
      const sets = Object.entries(categories.sets)
        .sort((a, b) => b[1].length - a[1].length);

      if (sets.length === 0) {
        container.innerHTML = '';
        return;
      }

      container.innerHTML = \`
        <div class="icon-sets-grid">
          \${sets.map(([prefix, iconNames]) => {
            const setInfo = ICON_SETS[prefix] || { name: prefix, color: '#6366f1', license: 'Unknown' };
            const previewIcons = iconNames.slice(0, 8);

            return \`
              <div class="icon-set-card" onclick="filterCategory('\${prefix}')">
                <div class="icon-set-card-header">
                  <div>
                    <div class="icon-set-card-title" style="color: \${setInfo.color}">\${setInfo.name}</div>
                    <div class="icon-set-card-meta">\${setInfo.license}</div>
                  </div>
                  <div class="icon-set-card-count">\${iconNames.length} icons</div>
                </div>
                <div class="icon-set-card-previews">
                  \${previewIcons.map(name => {
                    const icon = icons[name];
                    const viewBox = icon.viewBox || '0 0 24 24';
                    const paths = icon.paths.map(d => \`<path d="\${d}"/>\`).join('');
                    return \`<svg viewBox="\${viewBox}">\${paths}</svg>\`;
                  }).join('')}
                </div>
              </div>
            \`;
          }).join('')}
        </div>
      \`;
    }

    function renderIcons() {
      const grid = document.getElementById('grid');
      const categories = categorizeIcons();

      let filteredNames = [];

      if (currentCategory === 'all') {
        filteredNames = Object.keys(icons).sort();
      } else if (currentCategory === 'custom') {
        filteredNames = categories.custom.sort();
      } else {
        filteredNames = (categories.sets[currentCategory] || []).sort();
      }

      if (filteredNames.length === 0) {
        grid.innerHTML = \`
          <div class="empty-state" style="grid-column: 1 / -1;">
            <svg class="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <path d="m21 15-5-5L5 21"/>
            </svg>
            <h3>No icons in this category</h3>
            <p>Add icons or import from popular icon sets</p>
          </div>
        \`;
        return;
      }

      grid.innerHTML = filteredNames.map((name, i) => {
        const icon = icons[name];
        const viewBox = icon.viewBox || '0 0 24 24';
        const paths = icon.paths.map(d => \`<path d="\${d}"/>\`).join('');

        return \`
          <div class="icon-card" data-name="\${name}" onclick="toggleSelect('\${name}')" style="animation-delay: \${Math.min(i * 0.015, 0.3)}s">
            <div class="check-badge">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <svg class="icon-preview" viewBox="\${viewBox}">\${paths}</svg>
            <div class="name">\${name}</div>
          </div>
        \`;
      }).join('');
    }

    function setView(view) {
      currentView = view;
      const grid = document.getElementById('grid');
      grid.classList.toggle('list-view', view === 'list');
      document.getElementById('gridViewBtn').classList.toggle('active', view === 'grid');
      document.getElementById('listViewBtn').classList.toggle('active', view === 'list');
    }

    function toggleSelect(name) {
      if (selected.has(name)) {
        selected.delete(name);
      } else {
        selected.add(name);
      }
      updateSelection();
    }

    function updateSelection() {
      document.querySelectorAll('.icon-card').forEach(card => {
        card.classList.toggle('selected', selected.has(card.dataset.name));
      });

      const bar = document.getElementById('selectionBar');
      bar.classList.toggle('show', selected.size > 0);
      document.getElementById('selectedCount').textContent = selected.size;
    }

    function clearSelection() {
      selected.clear();
      updateSelection();
    }

    document.getElementById('search').addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      document.querySelectorAll('.icon-card').forEach(card => {
        const name = card.dataset.name;
        if (name) {
          card.classList.toggle('hidden', !name.includes(query));
        }
      });
    });

    function openAddModal() {
      document.getElementById('addModal').classList.add('active');
    }

    function closeModal() {
      document.getElementById('addModal').classList.remove('active');
      document.getElementById('iconName').value = '';
      document.getElementById('svgCode').value = '';
    }

    function showToast(message, type = 'success') {
      const toast = document.getElementById('toast');
      const toastMessage = document.getElementById('toastMessage');

      toast.className = 'toast ' + type;
      toastMessage.textContent = message;
      toast.classList.add('show');

      setTimeout(() => {
        toast.classList.remove('show');
      }, 3000);
    }

    async function addIcon() {
      const name = document.getElementById('iconName').value.trim();
      const svg = document.getElementById('svgCode').value.trim();

      if (!name || !svg) {
        showToast('Please provide name and SVG code', 'error');
        return;
      }

      try {
        const res = await fetch('/api/icons', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, svg })
        });
        const data = await res.json();

        if (data.success) {
          location.reload();
        } else {
          showToast('Error: ' + data.error, 'error');
        }
      } catch (e) {
        showToast('Error: ' + e.message, 'error');
      }
    }

    async function deleteSelected() {
      if (!confirm(\`Delete \${selected.size} icon(s)?\`)) return;

      for (const name of selected) {
        await fetch('/api/icons/' + encodeURIComponent(name), { method: 'DELETE' });
      }
      showToast(\`Deleted \${selected.size} icon(s)\`);
      setTimeout(() => location.reload(), 500);
    }

    // Drag and drop
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');

    dropZone.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) handleFile(file);
    });

    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', () => {
      dropZone.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.classList.remove('dragover');
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    });

    function handleFile(file) {
      if (file.name.endsWith('.svg')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          document.getElementById('svgCode').value = e.target.result;
          document.getElementById('iconName').value = file.name.replace('.svg', '').replace(/\\s+/g, '-').toLowerCase();
        };
        reader.readAsText(file);
      } else {
        showToast('Please select an SVG file', 'error');
      }
    }

    // Close modal on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });

    // Close modal on overlay click
    document.getElementById('addModal').addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-overlay')) closeModal();
    });

    // Initialize
    renderSidebar();
    renderCategoryHeader();
    renderIconSetsCards();
    renderIcons();
  </script>
</body>
</html>`;
}

module.exports = { start };
