/**
 * Icon Sets Command
 *
 * Import popular icon sets directly
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const { loadConfig, getIconsPath, ensureIconsDir } = require('../utils/config');

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
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

/**
 * Available icon sets with their sources
 */
const ICON_SETS = {
  'material': {
    name: 'Material Symbols',
    description: 'Google Material Symbols icons',
    source: 'iconify',
    prefix: 'material-symbols',
    url: 'https://raw.githubusercontent.com/nicholasdille/icons/icons/json/material-symbols.json',
    // Alternative: use Iconify API
    iconifySet: 'material-symbols'
  },
  'lucide': {
    name: 'Lucide',
    description: 'Beautiful & consistent icons (fork of Feather)',
    source: 'iconify',
    prefix: 'lucide',
    iconifySet: 'lucide'
  },
  'heroicons': {
    name: 'Heroicons',
    description: 'Beautiful hand-crafted SVG icons by Tailwind',
    source: 'iconify',
    prefix: 'heroicons',
    iconifySet: 'heroicons'
  },
  'phosphor': {
    name: 'Phosphor',
    description: 'Flexible icon family',
    source: 'iconify',
    prefix: 'ph',
    iconifySet: 'ph'
  },
  'tabler': {
    name: 'Tabler Icons',
    description: 'Free and open source icons',
    source: 'iconify',
    prefix: 'tabler',
    iconifySet: 'tabler'
  },
  'feather': {
    name: 'Feather',
    description: 'Simply beautiful open source icons',
    source: 'iconify',
    prefix: 'feather',
    iconifySet: 'feather'
  },
  'bootstrap': {
    name: 'Bootstrap Icons',
    description: 'Official Bootstrap icons',
    source: 'iconify',
    prefix: 'bi',
    iconifySet: 'bi'
  },
  'carbon': {
    name: 'Carbon',
    description: 'IBM Carbon Design System icons',
    source: 'iconify',
    prefix: 'carbon',
    iconifySet: 'carbon'
  },
  'mdi': {
    name: 'Material Design Icons',
    description: 'Community Material Design icons',
    source: 'iconify',
    prefix: 'mdi',
    iconifySet: 'mdi'
  },
  'ionicons': {
    name: 'Ionicons',
    description: 'Ionic framework icons',
    source: 'iconify',
    prefix: 'ion',
    iconifySet: 'ion'
  }
};

/**
 * Fetch JSON from URL
 */
function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return fetchJSON(res.headers.location).then(resolve).catch(reject);
      }

      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error('Failed to parse JSON'));
        }
      });
    }).on('error', reject);
  });
}

/**
 * Fetch icons from Iconify API
 */
async function fetchIconifySet(setName, icons = null) {
  const baseUrl = 'https://api.iconify.design';

  // First, get the list of icons if not specified
  if (!icons) {
    const collectionUrl = `${baseUrl}/collection?prefix=${setName}`;
    try {
      const collection = await fetchJSON(collectionUrl);
      if (collection.uncategorized) {
        icons = collection.uncategorized;
      } else if (collection.categories) {
        icons = Object.values(collection.categories).flat();
      } else {
        throw new Error('Could not find icon list');
      }
    } catch (e) {
      throw new Error(`Failed to fetch icon collection: ${e.message}`);
    }
  }

  // Fetch icons in batches
  const batchSize = 50;
  const allIcons = {};

  for (let i = 0; i < icons.length; i += batchSize) {
    const batch = icons.slice(i, i + batchSize);
    const iconsParam = batch.join(',');
    const url = `${baseUrl}/${setName}.json?icons=${iconsParam}`;

    try {
      const data = await fetchJSON(url);
      if (data.icons) {
        Object.assign(allIcons, data.icons);
      }
    } catch (e) {
      log.warn(`Failed to fetch batch ${i / batchSize + 1}`);
    }

    // Progress indicator
    process.stdout.write(`\r${colors.blue}ℹ${colors.reset} Fetching... ${Math.min(i + batchSize, icons.length)}/${icons.length}`);
  }

  console.log(''); // New line after progress
  return allIcons;
}

/**
 * Convert Iconify format to SageBox format
 */
function convertIconifyToSageBox(iconifyIcons, prefix) {
  const result = {};

  for (const [name, data] of Object.entries(iconifyIcons)) {
    const iconName = `${prefix}-${name}`;

    // Extract path data
    const paths = [];
    const body = data.body || '';

    // Match path elements
    const pathRegex = /<path[^>]*d="([^"]+)"[^>]*\/?>/g;
    let match;
    while ((match = pathRegex.exec(body)) !== null) {
      paths.push(match[1]);
    }

    // If no paths found, try to use the body directly if it's a single path
    if (paths.length === 0 && body.includes(' d="')) {
      const singlePath = body.match(/d="([^"]+)"/);
      if (singlePath) {
        paths.push(singlePath[1]);
      }
    }

    if (paths.length > 0) {
      const iconDef = { paths };

      // Add viewBox if different from default
      const width = data.width || 24;
      const height = data.height || 24;
      const left = data.left || 0;
      const top = data.top || 0;
      const viewBox = `${left} ${top} ${width} ${height}`;

      if (viewBox !== '0 0 24 24') {
        iconDef.viewBox = viewBox;
      }

      result[iconName] = iconDef;
    }
  }

  return result;
}

/**
 * Read existing icons
 */
function readIconsJSON(iconsJsonPath) {
  if (!fs.existsSync(iconsJsonPath)) {
    return {};
  }
  return JSON.parse(fs.readFileSync(iconsJsonPath, 'utf-8'));
}

/**
 * Write icons to JSON
 */
function writeIconsJSON(iconsJsonPath, icons) {
  const sorted = {};
  Object.keys(icons).sort().forEach(key => {
    sorted[key] = icons[key];
  });
  fs.writeFileSync(iconsJsonPath, JSON.stringify(sorted, null, 2), 'utf-8');
}

module.exports = function(program) {
  const iconSets = program
    .command('icon-sets')
    .alias('sets')
    .description('Import popular icon sets');

  // List available sets
  iconSets
    .command('list')
    .description('List available icon sets')
    .action(() => {
      log.title('🎨 Available Icon Sets');

      console.log('  Use: npx sagebox icon-sets import <set-name> [icons...]\n');

      for (const [id, set] of Object.entries(ICON_SETS)) {
        console.log(`  ${colors.cyan}${id.padEnd(12)}${colors.reset} ${set.name}`);
        console.log(`  ${''.padEnd(12)} ${colors.yellow}${set.description}${colors.reset}\n`);
      }
    });

  // Import a set
  iconSets
    .command('import <set>')
    .description('Import icons from a set')
    .option('-i, --icons <icons...>', 'Specific icons to import (comma or space separated)')
    .option('-a, --all', 'Import all icons from the set')
    .option('-l, --limit <number>', 'Limit number of icons to import', '100')
    .option('--no-prefix', 'Do not add set prefix to icon names')
    .action(async (setId, options) => {
      log.title('🎨 Import Icon Set');

      const setConfig = ICON_SETS[setId.toLowerCase()];
      if (!setConfig) {
        log.error(`Unknown icon set: ${setId}`);
        log.info(`Available sets: ${Object.keys(ICON_SETS).join(', ')}`);
        process.exit(1);
      }

      log.info(`Importing from ${setConfig.name}...`);

      const config = loadConfig();
      const iconsJsonPath = getIconsPath(config);
      ensureIconsDir(config);

      try {
        let iconNames = null;

        if (options.icons) {
          // Specific icons requested
          iconNames = options.icons.flatMap(i => i.split(',').map(s => s.trim()));
          log.info(`Fetching ${iconNames.length} specific icons...`);
        } else if (!options.all) {
          // Default: fetch popular/first N icons
          const limit = parseInt(options.limit);
          log.info(`Fetching up to ${limit} icons (use --all for complete set)...`);

          // Get collection info first
          const collectionUrl = `https://api.iconify.design/collection?prefix=${setConfig.iconifySet}`;
          const collection = await fetchJSON(collectionUrl);

          if (collection.uncategorized) {
            iconNames = collection.uncategorized.slice(0, limit);
          } else if (collection.categories) {
            iconNames = Object.values(collection.categories).flat().slice(0, limit);
          }
        }

        // Fetch icons
        const iconifyIcons = await fetchIconifySet(setConfig.iconifySet, iconNames);
        const iconCount = Object.keys(iconifyIcons).length;

        if (iconCount === 0) {
          log.error('No icons found');
          process.exit(1);
        }

        log.info(`Converting ${iconCount} icons...`);

        // Convert to SageBox format
        const prefix = options.prefix ? setConfig.prefix : '';
        const convertedIcons = convertIconifyToSageBox(iconifyIcons, prefix);
        const convertedCount = Object.keys(convertedIcons).length;

        // Merge with existing
        const existingIcons = readIconsJSON(iconsJsonPath);
        const mergedIcons = { ...existingIcons, ...convertedIcons };

        writeIconsJSON(iconsJsonPath, mergedIcons);

        log.success(`Import completed!`);
        log.info(`  📥 Imported: ${convertedCount} icons`);
        log.info(`  📊 Total: ${Object.keys(mergedIcons).length} icons`);
        log.info(`\nRun ${colors.cyan}npx sagebox icons build${colors.reset} to generate TypeScript`);

      } catch (e) {
        log.error(`Failed to import: ${e.message}`);
        process.exit(1);
      }
    });

  // Search icons in a set
  iconSets
    .command('search <set> <query>')
    .description('Search for icons in a set')
    .option('-l, --limit <number>', 'Max results', '20')
    .action(async (setId, query, options) => {
      log.title('🔍 Search Icon Set');

      const setConfig = ICON_SETS[setId.toLowerCase()];
      if (!setConfig) {
        log.error(`Unknown icon set: ${setId}`);
        process.exit(1);
      }

      try {
        const searchUrl = `https://api.iconify.design/search?query=${encodeURIComponent(query)}&prefix=${setConfig.iconifySet}&limit=${options.limit}`;
        const results = await fetchJSON(searchUrl);

        if (!results.icons || results.icons.length === 0) {
          log.warn(`No icons found for "${query}"`);
          return;
        }

        log.info(`Found ${results.icons.length} icons:\n`);

        results.icons.forEach(icon => {
          const [, name] = icon.split(':');
          console.log(`  ${colors.cyan}${name}${colors.reset}`);
        });

        console.log(`\nImport with: ${colors.cyan}npx sagebox icon-sets import ${setId} -i ${results.icons.map(i => i.split(':')[1]).slice(0, 5).join(' ')}${colors.reset}`);

      } catch (e) {
        log.error(`Search failed: ${e.message}`);
      }
    });

  // Preview a set
  iconSets
    .command('preview <set>')
    .description('Open preview of an icon set')
    .action((setId) => {
      const setConfig = ICON_SETS[setId.toLowerCase()];
      if (!setConfig) {
        log.error(`Unknown icon set: ${setId}`);
        process.exit(1);
      }

      const url = `https://icon-sets.iconify.design/${setConfig.iconifySet}/`;
      log.info(`Opening ${setConfig.name} preview...`);
      log.info(`URL: ${colors.cyan}${url}${colors.reset}`);

      // Try to open in browser
      const { exec } = require('child_process');
      const command = process.platform === 'win32' ? 'start' :
                      process.platform === 'darwin' ? 'open' : 'xdg-open';
      exec(`${command} ${url}`);
    });
};
