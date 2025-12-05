/**
 * Icons Command
 *
 * Manage SVG icons in your project
 */

const fs = require('fs');
const path = require('path');
const { parseSVG, parseSpriteSVG } = require('../utils/svg-parser');
const { loadConfig, getIconsPath, ensureIconsDir } = require('../utils/config');

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

const log = {
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  warn: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  title: (msg) => console.log(`\n${colors.bright}${colors.cyan}${msg}${colors.reset}\n`),
};

// ═══════════════════════════════════════════════════════════════════════════
// ICONIFY API HELPERS
// ═══════════════════════════════════════════════════════════════════════════

const ICONIFY_API = 'https://api.iconify.design';

/**
 * Fetch icon from Iconify API
 * @param {string} prefix - Icon set prefix (e.g., 'lucide', 'mdi', 'heroicons')
 * @param {string} name - Icon name
 * @returns {Promise<string|null>} SVG content or null
 */
async function fetchIconifyIcon(prefix, name) {
  const url = `${ICONIFY_API}/${prefix}/${name}.svg`;
  try {
    const response = await fetch(url);
    if (response.ok) {
      return await response.text();
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Search icons in Iconify
 * @param {string} query - Search query
 * @param {string} prefix - Optional icon set prefix
 * @returns {Promise<Array>} Search results
 */
async function searchIconify(query, prefix = '') {
  const params = new URLSearchParams({ query, limit: '50' });
  if (prefix) params.set('prefix', prefix);

  const url = `${ICONIFY_API}/search?${params}`;
  try {
    const response = await fetch(url);
    if (response.ok) {
      return await response.json();
    }
    return { icons: [] };
  } catch {
    return { icons: [] };
  }
}

/**
 * Get list of icon sets from Iconify
 * @returns {Promise<Object>} Icon sets
 */
async function getIconifySets() {
  const url = `${ICONIFY_API}/collections`;
  try {
    const response = await fetch(url);
    if (response.ok) {
      return await response.json();
    }
    return {};
  } catch {
    return {};
  }
}

// ═══════════════════════════════════════════════════════════════════════════

/**
 * Read icons.json from project
 * Returns array format: [{ name, content }]
 */
function readIconsJSON(iconsJsonPath) {
  if (!fs.existsSync(iconsJsonPath)) {
    return [];
  }
  const data = JSON.parse(fs.readFileSync(iconsJsonPath, 'utf-8'));

  // Handle both formats for backwards compatibility
  if (Array.isArray(data)) {
    return data;
  }

  // Convert object format to array
  return Object.entries(data).map(([name, def]) => {
    const content = typeof def === 'string' ? def : (def.svg || '');
    return { name, content };
  });
}

/**
 * Read project-icons.json from project (DEPRECATED - now using inProject flag)
 * Kept for backwards compatibility
 */
function readProjectIconsJSON(iconsDir) {
  const projectIconsPath = path.join(iconsDir, 'project-icons.json');
  if (!fs.existsSync(projectIconsPath)) {
    return null; // null means no project file, check inProject flag instead
  }
  try {
    const data = JSON.parse(fs.readFileSync(projectIconsPath, 'utf-8'));
    return Array.isArray(data) ? data : [];
  } catch {
    return null;
  }
}

/**
 * Get icons to include in build
 * Priority: 1. project-icons.json (legacy), 2. inProject flag, 3. all icons
 */
function getProjectIconsFromArray(iconsArray, iconsDir) {
  // Check for legacy project-icons.json first
  const projectIconsFile = readProjectIconsJSON(iconsDir);
  if (projectIconsFile !== null && projectIconsFile.length > 0) {
    return iconsArray.filter(icon => projectIconsFile.includes(icon.name));
  }

  // Check for inProject flag
  const projectIcons = iconsArray.filter(icon => icon.inProject === true);
  if (projectIcons.length > 0) {
    return projectIcons;
  }

  // Fallback: use all icons (no filtering)
  return iconsArray;
}

/**
 * Write icons.json to project in array format
 */
function writeIconsJSON(iconsJsonPath, icons) {
  // Ensure array format
  let iconArray;
  if (Array.isArray(icons)) {
    iconArray = icons;
  } else {
    // Convert object to array
    iconArray = Object.entries(icons).map(([name, def]) => {
      const content = typeof def === 'string' ? def : (def.svg || '');
      return { name, content };
    });
  }

  // Sort alphabetically by name
  const sorted = [...iconArray].sort((a, b) => a.name.localeCompare(b.name));
  fs.writeFileSync(iconsJsonPath, JSON.stringify(sorted, null, 2), 'utf-8');
}

/**
 * Find icon in array by name
 */
function findIcon(icons, name) {
  return icons.find(i => i.name === name);
}

/**
 * Add or update icon in array
 * New icons get inProject: false by default
 */
function upsertIcon(icons, name, content) {
  const existing = findIcon(icons, name);
  if (existing) {
    existing.content = content;
    // Keep existing inProject value
  } else {
    // New icons are NOT in project by default
    icons.push({ name, content, inProject: false });
  }
  return icons;
}

/**
 * Clean SVG for storage - remove width/height, keep viewBox and other attributes
 */
function cleanSvgForStorage(svgContent) {
  // Remove width and height attributes (we'll use CSS to control size)
  let cleaned = svgContent
    .replace(/\s+width=["'][^"']*["']/g, '')
    .replace(/\s+height=["'][^"']*["']/g, '');

  // Ensure xmlns is present
  if (!cleaned.includes('xmlns=')) {
    cleaned = cleaned.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
  }

  // Normalize whitespace
  cleaned = cleaned.replace(/\s+/g, ' ').trim();

  return cleaned;
}

/**
 * Generate SVG string from IconDefinition or return raw SVG
 */
function iconDefToSvg(def) {
  // If it's already a raw SVG string, return it
  if (typeof def === 'string') {
    return def;
  }
  // If it has a raw SVG stored, use that
  if (def.svg) {
    return def.svg;
  }
  // Legacy: build from paths (for fill-based icons)
  const viewBox = def.viewBox || '0 0 24 24';
  const fillRule = def.fillRule || 'nonzero';
  const paths = def.paths.map(d => `<path d="${d}" fill-rule="${fillRule}"/>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}">${paths}</svg>`;
}

/**
 * Generate TypeScript file from icons.json
 * Uses inProject flag or project-icons.json (legacy) to filter icons
 */
function generateTypeScript(iconsJsonPath, outputPath, config = {}) {
  let iconsArray = readIconsJSON(iconsJsonPath);
  const iconsDir = path.dirname(iconsJsonPath);
  const totalIcons = iconsArray.length;

  // Get project icons (filtered by inProject flag or project-icons.json)
  const filteredIcons = getProjectIconsFromArray(iconsArray, iconsDir);
  const projectIconCount = filteredIcons.length;

  if (projectIconCount < totalIcons) {
    log.info(`Building ${projectIconCount} of ${totalIcons} icons (filtered by inProject flag)`);
  }

  // Use filtered icons for the build
  iconsArray = filteredIcons;

  // Detect if we're inside the sagebox library (for development)
  const isLibrary = config._isLibrary || false;

  // ═══════════════════════════════════════════════════════════════════════════
  // Generate JSON file for dynamic loading (new feature)
  // ═══════════════════════════════════════════════════════════════════════════
  const jsonOutputPath = outputPath.replace(/\.ts$/, '.json');
  const iconsJson = {};
  for (const icon of iconsArray) {
    const exportName = icon.name.replace(':', '-');
    iconsJson[exportName] = icon.content;
  }
  fs.writeFileSync(jsonOutputPath, JSON.stringify(iconsJson, null, 2), 'utf-8');
  log.info(`Generated JSON: ${path.basename(jsonOutputPath)}`);

  // ═══════════════════════════════════════════════════════════════════════════
  // Generate TypeScript file
  // ═══════════════════════════════════════════════════════════════════════════

  let content = `/**
 * SVG Icon Library - Custom icon definitions
 *
 * ⚠️  AUTO-GENERATED FILE - DO NOT EDIT MANUALLY
 *
 * To add/modify icons, edit: icons.json
 * Then run: npx sagebox icons build
 *
 * Generated: ${new Date().toISOString()}
 * Icons: ${projectIconCount}${projectIconCount < totalIcons ? ` (filtered from ${totalIcons} total)` : ''}
 */

`;

  content += `// ═══════════════════════════════════════════════════════════════════════════
// SVG String Format (recommended for registerIcons)
// ═══════════════════════════════════════════════════════════════════════════

export const icons: Record<string, string> = {\n`;

  for (const icon of iconsArray) {
    // Convert prefix:name to prefix-name for use in components
    const exportName = icon.name.replace(':', '-');
    content += `  '${exportName}': '${icon.content.replace(/'/g, "\\'")}',\n`;
  }

  content += `};

// ═══════════════════════════════════════════════════════════════════════════
// Icon Registration - Compatible with all frameworks
// ═══════════════════════════════════════════════════════════════════════════

const ICONS_KEY = '__sgUserIcons';
const ICONS_LOADED_KEY = '__sgIconsLoaded';

/**
 * Register icons globally for <sg-icon> components
 */
function registerIcons(iconsToRegister: Record<string, string>): void {
  if (typeof globalThis !== 'undefined') {
    const existing = (globalThis as any)[ICONS_KEY] || {};
    (globalThis as any)[ICONS_KEY] = { ...existing, ...iconsToRegister };
  }
}

/**
 * Load icons from a JSON file (for dynamic loading)
 * @param jsonPath - Path to the JSON file containing icons
 */
export async function loadIconsFromJson(jsonPath: string): Promise<void> {
  if (typeof globalThis !== 'undefined' && (globalThis as any)[ICONS_LOADED_KEY]?.[jsonPath]) {
    return; // Already loaded
  }

  try {
    const response = await fetch(jsonPath);
    if (response.ok) {
      const iconsData = await response.json();
      registerIcons(iconsData);

      // Mark as loaded
      if (!(globalThis as any)[ICONS_LOADED_KEY]) {
        (globalThis as any)[ICONS_LOADED_KEY] = {};
      }
      (globalThis as any)[ICONS_LOADED_KEY][jsonPath] = true;
    }
  } catch (error) {
    console.error('[SageBox] Failed to load icons from:', jsonPath, error);
  }
}
`;

  // Only add auto-registration for user projects
  if (!isLibrary) {
    content += `
// Auto-register icons when this file is imported
registerIcons(icons);
`;
  }

  // Generate literal type for better autocompletion
  const iconNamesList = iconsArray.map(i => i.name.replace(':', '-'));

  content += `
// ═══════════════════════════════════════════════════════════════════════════
// Type definitions - Use these for autocompletion in your IDE
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Available icon names in this project.
 * Use with SgIcon: <SgIcon name="lucide-home" /> or <SgIcon name="lucide:home" />
 */
export type IconName = ${iconNamesList.map(n => `'${n}'`).join(' | ') || 'string'};

/**
 * Array of all available icon names
 */
export const iconNames: IconName[] = [
${iconNamesList.map(n => `  '${n}'`).join(',\n')}
];

/**
 * Check if a string is a valid icon name
 */
export function isValidIconName(name: string): name is IconName {
  return iconNames.includes(name as IconName);
}
`;

  fs.writeFileSync(outputPath, content, 'utf-8');
  return projectIconCount;
}

/**
 * Convert name to kebab-case
 */
function toKebabCase(name) {
  return name
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

module.exports = function(program) {
  const icons = program
    .command('icons')
    .description('Manage SVG icons');

  // icons add <name> --file <path>
  icons
    .command('add <name>')
    .description('Add a new SVG icon')
    .option('-f, --file <path>', 'Path to SVG file')
    .option('-s, --svg <content>', 'SVG content as string')
    .action((name, options) => {
      log.title('🎨 SageBox - Add Icon');

      const config = loadConfig();
      const iconsJsonPath = getIconsPath(config);
      ensureIconsDir(config);

      let svgContent;

      if (options.file) {
        const filePath = path.resolve(options.file);
        if (!fs.existsSync(filePath)) {
          log.error(`File not found: ${filePath}`);
          process.exit(1);
        }
        svgContent = fs.readFileSync(filePath, 'utf-8');
        log.info(`Reading SVG from: ${filePath}`);
      } else if (options.svg) {
        svgContent = options.svg;
      } else {
        log.error('Please provide --file or --svg option');
        process.exit(1);
      }

      const parsed = parseSVG(svgContent);

      if (parsed.paths.length === 0) {
        log.error('No paths found in SVG');
        process.exit(1);
      }

      const kebabName = toKebabCase(name);
      const icons = readIconsJSON(iconsJsonPath);
      const isUpdate = !!icons[kebabName];

      // Create icon definition
      const iconDef = { paths: parsed.paths };
      if (parsed.viewBox !== '0 0 24 24') {
        iconDef.viewBox = parsed.viewBox;
      }
      if (parsed.fillRule && parsed.fillRule !== 'nonzero') {
        iconDef.fillRule = parsed.fillRule;
      }

      icons[kebabName] = iconDef;
      writeIconsJSON(iconsJsonPath, icons);

      log.success(`Icon "${kebabName}" ${isUpdate ? 'updated' : 'added'}`);
      log.info(`Paths: ${parsed.paths.length}`);
      log.info(`ViewBox: ${parsed.viewBox}`);
      log.info(`\nRun ${colors.cyan}npx sagebox icons build${colors.reset} to generate TypeScript`);
    });

  // icons sets - List available icon sets from Iconify
  icons
    .command('sets')
    .description('List available icon sets from Iconify')
    .option('-s, --search <query>', 'Filter sets by name')
    .action(async (options) => {
      log.title('🎨 SageBox - Available Icon Sets');

      log.info('Fetching available icon sets...');
      const sets = await getIconifySets();
      const setNames = Object.keys(sets).sort();

      console.log(`\n${colors.bright}Popular icon sets:${colors.reset}\n`);
      const popular = ['lucide', 'mdi', 'heroicons', 'tabler', 'phosphor', 'carbon', 'fa6-solid', 'fa6-regular'];
      popular.forEach(prefix => {
        if (sets[prefix]) {
          console.log(`  ${colors.cyan}${prefix}${colors.reset} - ${sets[prefix].name} (${sets[prefix].total} icons)`);
        }
      });

      let filteredSets = setNames;
      if (options.search) {
        const query = options.search.toLowerCase();
        filteredSets = setNames.filter(name =>
          name.toLowerCase().includes(query) ||
          sets[name].name.toLowerCase().includes(query)
        );
        console.log(`\n${colors.bright}Matching sets (${filteredSets.length}):${colors.reset}\n`);
      } else {
        console.log(`\n${colors.bright}All sets (${setNames.length}):${colors.reset}\n`);
      }

      for (let i = 0; i < filteredSets.length; i += 4) {
        const row = filteredSets.slice(i, i + 4);
        console.log('  ' + row.map(n => n.padEnd(20)).join(''));
      }

      console.log(`\n${colors.dim}Usage: npx sagebox icons fetch <prefix>:<name> (e.g., lucide:home)${colors.reset}`);
    });

  // icons fetch <prefix:name> [more...]
  icons
    .command('fetch <icons...>')
    .description('Fetch icons from Iconify (e.g., lucide:home mdi:account)')
    .option('--prefix <prefix>', 'Default prefix for icons without one')
    .action(async (iconNames, options) => {
      log.title('🎨 SageBox - Fetch Icons from Iconify');

      const config = loadConfig();
      const iconsJsonPath = getIconsPath(config);
      ensureIconsDir(config);

      const existingIcons = readIconsJSON(iconsJsonPath);
      let added = 0;
      let failed = 0;

      for (const iconRef of iconNames) {
        let prefix, name;

        if (iconRef.includes(':')) {
          [prefix, name] = iconRef.split(':');
        } else if (options.prefix) {
          prefix = options.prefix;
          name = iconRef;
        } else {
          log.warn(`Skipping "${iconRef}" - no prefix. Use format "prefix:name" or --prefix`);
          failed++;
          continue;
        }

        log.info(`Fetching ${prefix}:${name}...`);
        const svgContent = await fetchIconifyIcon(prefix, name);

        if (!svgContent) {
          log.error(`  Not found: ${prefix}:${name}`);
          failed++;
          continue;
        }

        // Use prefix:name format for consistency with gestor web
        const iconName = `${prefix}:${toKebabCase(name)}`;

        // Clean up SVG: remove width/height, keep viewBox
        const cleanedSvg = cleanSvgForStorage(svgContent);
        upsertIcon(existingIcons, iconName, cleanedSvg);
        log.success(`  Added: ${iconName}`);
        added++;
      }

      writeIconsJSON(iconsJsonPath, existingIcons);

      console.log('');
      log.success(`Fetch completed!`);
      log.info(`  ✓ Added: ${added}`);
      if (failed > 0) log.warn(`  ✗ Failed: ${failed}`);
      log.info(`\nRun ${colors.cyan}npx sagebox icons build${colors.reset} to generate TypeScript`);
    });

  // icons search <query>
  icons
    .command('search <query>')
    .description('Search icons in Iconify')
    .option('--prefix <prefix>', 'Limit search to specific icon set')
    .action(async (query, options) => {
      log.title('🎨 SageBox - Search Icons');

      log.info(`Searching for "${query}"...`);
      const results = await searchIconify(query, options.prefix || '');

      if (!results.icons || results.icons.length === 0) {
        log.warn('No icons found');
        return;
      }

      console.log(`\n${colors.bright}Found ${results.icons.length} icons:${colors.reset}\n`);

      // Group by prefix
      const grouped = {};
      results.icons.forEach(icon => {
        const [prefix, name] = icon.split(':');
        if (!grouped[prefix]) grouped[prefix] = [];
        grouped[prefix].push(name);
      });

      for (const [prefix, names] of Object.entries(grouped)) {
        console.log(`  ${colors.cyan}${prefix}${colors.reset}:`);
        console.log(`    ${names.join(', ')}`);
      }

      console.log(`\n${colors.bright}To add icons:${colors.reset}`);
      console.log(`  npx sagebox icons fetch ${results.icons.slice(0, 3).join(' ')}`);
    });

  // icons import <file>
  icons
    .command('import <file>')
    .description('Import icons from SVG sprite sheet')
    .option('--merge', 'Merge with existing icons (default)', true)
    .option('--replace', 'Replace all existing icons')
    .action((file, options) => {
      log.title('🎨 SageBox - Import Icons');

      const config = loadConfig();
      const iconsJsonPath = getIconsPath(config);
      ensureIconsDir(config);

      const filePath = path.resolve(file);
      if (!fs.existsSync(filePath)) {
        log.error(`File not found: ${filePath}`);
        process.exit(1);
      }

      log.info(`Reading sprite from: ${filePath}`);
      const svgContent = fs.readFileSync(filePath, 'utf-8');
      const newIcons = parseSpriteSVG(svgContent);
      const newCount = Object.keys(newIcons).length;

      if (newCount === 0) {
        log.error('No icons found in sprite file');
        process.exit(1);
      }

      log.info(`Found ${newCount} icons in sprite`);

      let existingIcons = {};
      if (!options.replace) {
        existingIcons = readIconsJSON(iconsJsonPath);
        log.info(`Existing icons: ${Object.keys(existingIcons).length}`);
      }

      const mergedIcons = { ...existingIcons, ...newIcons };
      const mergedCount = Object.keys(mergedIcons).length;
      const addedCount = mergedCount - Object.keys(existingIcons).length;

      writeIconsJSON(iconsJsonPath, mergedIcons);

      log.success(`Import completed!`);
      log.info(`  📥 Imported: ${newCount}`);
      log.info(`  ➕ New: ${addedCount}`);
      log.info(`  🔄 Updated: ${newCount - addedCount}`);
      log.info(`  📊 Total: ${mergedCount}`);
      log.info(`\nRun ${colors.cyan}npx sagebox icons build${colors.reset} to generate TypeScript`);
    });

  // icons remove <name>
  icons
    .command('remove <name>')
    .description('Remove an icon')
    .action((name) => {
      log.title('🎨 SageBox - Remove Icon');

      const config = loadConfig();
      const iconsJsonPath = getIconsPath(config);

      const icons = readIconsJSON(iconsJsonPath);
      const kebabName = toKebabCase(name);

      if (!icons[kebabName]) {
        log.error(`Icon "${kebabName}" not found`);
        process.exit(1);
      }

      delete icons[kebabName];
      writeIconsJSON(iconsJsonPath, icons);

      log.success(`Icon "${kebabName}" removed`);
      log.info(`\nRun ${colors.cyan}npx sagebox icons build${colors.reset} to update TypeScript`);
    });

  // icons list
  icons
    .command('list')
    .description('List all icons')
    .option('-j, --json', 'Output as JSON')
    .action((options) => {
      const config = loadConfig();
      const iconsJsonPath = getIconsPath(config);
      const iconsArray = readIconsJSON(iconsJsonPath);
      const iconNames = iconsArray.map(i => i.name).sort();

      if (options.json) {
        console.log(JSON.stringify(iconNames, null, 2));
        return;
      }

      log.title('🎨 SageBox - Icon List');
      log.info(`Total icons: ${iconNames.length}\n`);

      if (iconNames.length === 0) {
        log.warn('No icons found. Add some with: npx sagebox icons add <name> --file <svg>');
        return;
      }

      // Display in columns
      const columns = 4;
      const colWidth = 25;

      for (let i = 0; i < iconNames.length; i += columns) {
        const row = iconNames.slice(i, i + columns);
        console.log('  ' + row.map(n => n.padEnd(colWidth)).join(''));
      }
    });

  // icons build
  icons
    .command('build')
    .description('Generate TypeScript from icons.json')
    .option('-o, --output <path>', 'Output path for TypeScript file')
    .action((options) => {
      log.title('🎨 SageBox - Build Icons');

      const config = loadConfig();
      const iconsJsonPath = getIconsPath(config);

      if (!fs.existsSync(iconsJsonPath)) {
        log.error(`icons.json not found at: ${iconsJsonPath}`);
        log.info('Add icons first with: npx sagebox icons add <name> --file <svg>');
        process.exit(1);
      }

      const outputPath = options.output || config.icons?.output ||
        path.join(path.dirname(iconsJsonPath), 'custom-icons.ts');

      const count = generateTypeScript(iconsJsonPath, outputPath, config);

      log.success(`Generated ${count} icons`);
      log.info(`Output: ${outputPath}`);

      if (config._isLibrary) {
        log.info(`${colors.yellow}Library mode:${colors.reset} Auto-registration disabled`);
      }
    });

  // icons server
  icons
    .command('server')
    .description('Start icon management server')
    .option('-p, --port <port>', 'Server port', '4567')
    .option('--legacy', 'Use legacy inline server')
    .action(async (options) => {
      log.title('🎨 SageBox - Icon Server');

      const config = loadConfig();
      const iconsJsonPath = getIconsPath(config);
      ensureIconsDir(config);

      if (options.legacy) {
        // Legacy server removed - redirect to new Icon Manager
        log.warn('Legacy server has been removed.');
        log.info('Starting new Icon Manager instead...');
        options.legacy = false;
      }
      
      // Use Astro-based Icon Manager (standalone project)
      const { spawn } = require('child_process');
      // Navigate from packages/icons/cli/commands to root/tools/icon-manager
      const iconManagerPath = path.resolve(__dirname, '..', '..', '..', '..', 'tools', 'icon-manager');

      // Check if Icon Manager exists
      if (!fs.existsSync(iconManagerPath)) {
        log.error(`Icon Manager not found at: ${iconManagerPath}`);
        log.info('Please ensure the tools/icon-manager directory exists.');
        process.exit(1);
      }

      // Set environment variable for icons path
      const env = {
        ...process.env,
        ICONS_PATH: iconsJsonPath,
        PORT: options.port
      };

      log.info(`Starting Icon Manager (Astro)...`);
      log.info(`Icons path: ${iconsJsonPath}`);
      console.log();
      
      const astro = spawn('npm', ['run', 'dev', '--', '--port', options.port], {
        cwd: iconManagerPath,
        env,
        stdio: 'inherit',
        shell: true
      });

      astro.on('error', (err) => {
        log.error(`Failed to start Icon Manager: ${err.message}`);
        log.info('Try running manually: cd tools/icon-manager && npm run dev');
        process.exit(1);
      });
    });

  // icons optimize
  icons
    .command('optimize')
    .description('Optimize all SVG icons (path data)')
    .option('--analyze', 'Analyze icons for potential issues')
    .action(async (options) => {
      log.title('🎨 SageBox - Optimize Icons');

      const { optimizeIconsJSON, analyzeIcon } = require('../utils/svg-optimizer');
      const config = loadConfig();
      const iconsJsonPath = getIconsPath(config);

      if (!fs.existsSync(iconsJsonPath)) {
        log.error('No icons.json found');
        process.exit(1);
      }

      const iconsArray = readIconsJSON(iconsJsonPath);
      const iconCount = iconsArray.length;

      if (options.analyze) {
        log.info(`Analyzing ${iconCount} icons...\n`);
        let issues = 0;

        for (const icon of iconsArray) {
          const analysis = analyzeIcon({ svg: icon.content });
          if (analysis.issues.length > 0 || analysis.suggestions.length > 0) {
            console.log(`  ${colors.cyan}${icon.name}${colors.reset}`);
            analysis.issues.forEach(issue => {
              console.log(`    ${colors.red}✗${colors.reset} ${issue}`);
              issues++;
            });
            analysis.suggestions.forEach(sug => {
              console.log(`    ${colors.yellow}⚠${colors.reset} ${sug}`);
            });
          }
        }

        if (issues === 0) {
          log.success('No issues found!');
        } else {
          log.warn(`Found ${issues} issues`);
        }
        return;
      }

      log.info(`Optimizing ${iconCount} icons...`);

      try {
        const result = await optimizeIconsJSON(iconsJsonPath);

        log.success(`Optimization complete!`);
        log.info(`  📊 Icons: ${result.count}`);
        log.info(`  📉 Before: ${(result.beforeSize / 1024).toFixed(1)} KB`);
        log.info(`  📈 After: ${(result.afterSize / 1024).toFixed(1)} KB`);
        log.info(`  💾 Savings: ${result.savings}`);
      } catch (e) {
        log.error(`Optimization failed: ${e.message}`);
      }
    });

  // icons preview
  icons
    .command('preview')
    .description('Generate HTML preview of all icons')
    .option('-o, --output <path>', 'Output path', './icons-preview.html')
    .action((options) => {
      log.title('🎨 SageBox - Icon Preview');

      const config = loadConfig();
      const iconsJsonPath = getIconsPath(config);
      const iconsArray = readIconsJSON(iconsJsonPath);

      const html = generatePreviewHTML(iconsArray);
      const outputPath = path.resolve(options.output);

      fs.writeFileSync(outputPath, html, 'utf-8');

      log.success(`Preview generated: ${outputPath}`);
      log.info(`Open in browser to view ${iconsArray.length} icons`);
    });
};

/**
 * Generate HTML preview page
 */
function generatePreviewHTML(iconsArray) {
  const iconNames = iconsArray.map(i => i.name).sort();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SageBox Icons Preview</title>
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      margin: 0;
      padding: 2rem;
      background: #f5f5f5;
    }
    h1 { text-align: center; color: #333; }
    .search {
      display: block;
      width: 100%;
      max-width: 400px;
      margin: 1rem auto 2rem;
      padding: 0.75rem 1rem;
      font-size: 1rem;
      border: 2px solid #ddd;
      border-radius: 8px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap: 1rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    .icon-card {
      background: white;
      border-radius: 8px;
      padding: 1rem;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s;
      border: 2px solid transparent;
    }
    .icon-card:hover {
      border-color: #0066cc;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    .icon-card svg {
      width: 32px;
      height: 32px;
      fill: currentColor;
    }
    .icon-card .name {
      margin-top: 0.5rem;
      font-size: 0.75rem;
      color: #666;
      word-break: break-word;
    }
    .icon-card.hidden { display: none; }
    .count { text-align: center; color: #666; margin-bottom: 1rem; }
  </style>
</head>
<body>
  <h1>🎨 SageBox Icons</h1>
  <input type="text" class="search" placeholder="Search icons..." id="search">
  <p class="count">${iconNames.length} icons</p>
  <div class="grid">
    ${iconsArray.map(icon => {
      return `
    <div class="icon-card" data-name="${icon.name}" onclick="copyName('${icon.name}')">
      ${icon.content}
      <div class="name">${icon.name}</div>
    </div>`;
    }).join('')}
  </div>
  <script>
    const search = document.getElementById('search');
    const cards = document.querySelectorAll('.icon-card');

    search.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      cards.forEach(card => {
        const name = card.dataset.name;
        card.classList.toggle('hidden', !name.includes(query));
      });
    });

    function copyName(name) {
      navigator.clipboard.writeText(name);
      alert('Copied: ' + name);
    }
  </script>
</body>
</html>`;
}
