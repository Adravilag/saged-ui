/**
 * Icon Server Utilities
 * 
 * Provides programmatic access to the icon server functionality
 * for managing icons through the CLI and Storybook integration.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

// Default configuration
const DEFAULT_PORT = 3456;
const ICONS_JSON_PATH = path.join(__dirname, '../../src/components/svg-icon/icons/icons.json');

/**
 * Parse SVG content and extract paths and viewBox
 * @param {string} svgContent - Raw SVG content
 * @returns {Object} Parsed SVG data with paths, viewBox, and fillRule
 */
function parseSVG(svgContent) {
  const viewBoxMatch = svgContent.match(/viewBox=["']([^"']+)["']/);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';

  const paths = [];
  const pathRegex = /<path[^>]*d=["']([^"']+)["'][^>]*\/?>/g;
  let match;
  while ((match = pathRegex.exec(svgContent)) !== null) {
    paths.push(match[1]);
  }

  const fillRuleMatch = svgContent.match(/fill-rule=["']([^"']+)["']/);
  const fillRule = fillRuleMatch ? fillRuleMatch[1] : null;

  return { paths, viewBox, fillRule };
}

/**
 * Read icons from the JSON file
 * @param {string} [iconsPath] - Custom path to icons.json
 * @returns {Object} Icons object
 */
function readIcons(iconsPath = ICONS_JSON_PATH) {
  try {
    return JSON.parse(fs.readFileSync(iconsPath, 'utf-8'));
  } catch (error) {
    return {};
  }
}

/**
 * Save icons to the JSON file
 * @param {Object} icons - Icons object to save
 * @param {string} [iconsPath] - Custom path to icons.json
 */
function saveIcons(icons, iconsPath = ICONS_JSON_PATH) {
  // Sort alphabetically
  const sorted = {};
  Object.keys(icons).sort().forEach(key => {
    sorted[key] = icons[key];
  });
  fs.writeFileSync(iconsPath, JSON.stringify(sorted, null, 2), 'utf-8');
}

/**
 * Add a new icon
 * @param {string} name - Icon name
 * @param {string} svgContent - SVG content
 * @param {string} [iconsPath] - Custom path to icons.json
 * @returns {Object} Result with success status and icon data
 */
function addIcon(name, svgContent, iconsPath = ICONS_JSON_PATH) {
  const icons = readIcons(iconsPath);
  const parsed = parseSVG(svgContent);
  
  icons[name] = parsed;
  saveIcons(icons, iconsPath);
  
  return {
    success: true,
    icon: { name, ...parsed }
  };
}

/**
 * Remove an icon
 * @param {string} name - Icon name to remove
 * @param {string} [iconsPath] - Custom path to icons.json
 * @returns {Object} Result with success status
 */
function removeIcon(name, iconsPath = ICONS_JSON_PATH) {
  const icons = readIcons(iconsPath);
  
  if (!icons[name]) {
    return { success: false, error: 'Icon not found' };
  }
  
  delete icons[name];
  saveIcons(icons, iconsPath);
  
  return { success: true };
}

/**
 * List all icons
 * @param {string} [iconsPath] - Custom path to icons.json
 * @returns {Array} Array of icon names
 */
function listIcons(iconsPath = ICONS_JSON_PATH) {
  const icons = readIcons(iconsPath);
  return Object.keys(icons).sort();
}

/**
 * Get icon by name
 * @param {string} name - Icon name
 * @param {string} [iconsPath] - Custom path to icons.json
 * @returns {Object|null} Icon data or null if not found
 */
function getIcon(name, iconsPath = ICONS_JSON_PATH) {
  const icons = readIcons(iconsPath);
  return icons[name] || null;
}

/**
 * Create and start the icon server
 * @param {Object} [options] - Server options
 * @param {number} [options.port] - Port to listen on
 * @param {string} [options.iconsPath] - Custom path to icons.json
 * @returns {http.Server} The HTTP server instance
 */
function createServer(options = {}) {
  const port = options.port || DEFAULT_PORT;
  const iconsPath = options.iconsPath || ICONS_JSON_PATH;

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
    
    // Health check
    if (url.pathname === '/health') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'ok' }));
      return;
    }

    // API endpoints
    if (url.pathname === '/api/icons') {
      if (req.method === 'GET') {
        const icons = readIcons(iconsPath);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(icons));
      } else if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
          try {
            const { name, svg } = JSON.parse(body);
            const result = addIcon(name, svg, iconsPath);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(result));
          } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: error.message }));
          }
        });
      }
      return;
    }

    // Delete icon endpoint
    const deleteMatch = url.pathname.match(/^\/api\/icons\/(.+)$/);
    if (deleteMatch && req.method === 'DELETE') {
      const result = removeIcon(deleteMatch[1], iconsPath);
      res.writeHead(result.success ? 200 : 404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result));
      return;
    }

    res.writeHead(404);
    res.end('Not Found');
  });

  return server;
}

/**
 * Start the icon server
 * @param {Object} [options] - Server options
 * @param {number} [options.port] - Port to listen on
 * @returns {Promise<http.Server>} The started server
 */
function startServer(options = {}) {
  const port = options.port || DEFAULT_PORT;
  const server = createServer(options);
  
  return new Promise((resolve, reject) => {
    server.listen(port, () => {
      console.log(`Icon server running on http://localhost:${port}`);
      resolve(server);
    });
    server.on('error', reject);
  });
}

module.exports = {
  // Core functions
  parseSVG,
  readIcons,
  saveIcons,
  addIcon,
  removeIcon,
  listIcons,
  getIcon,
  // Server functions
  createServer,
  startServer,
  // Constants
  DEFAULT_PORT,
  ICONS_JSON_PATH
};
