/**
 * Configuration Utilities
 *
 * Load and manage SageBox configuration
 */

const fs = require('fs');
const path = require('path');

const CONFIG_FILENAME = 'sagebox.config.json';

// Path to built-in library icons (for sagebox development)
const LIBRARY_ICONS_PATH = path.join(__dirname, '../../src/components/svg-icon/icons');

const DEFAULT_CONFIG = {
  icons: {
    input: './src/icons',
    output: './src/icons/index.ts',
    jsonFile: 'icons.json'
  }
};

/**
 * Find config file by traversing up directories
 * @param {string} startDir - Starting directory
 * @returns {string|null} Config file path or null
 */
function findConfigFile(startDir = process.cwd()) {
  let dir = startDir;

  while (dir !== path.dirname(dir)) {
    const configPath = path.join(dir, CONFIG_FILENAME);
    if (fs.existsSync(configPath)) {
      return configPath;
    }
    dir = path.dirname(dir);
  }

  return null;
}

/**
 * Load configuration from file or use defaults
 * @returns {Object} Configuration object
 */
function loadConfig() {
  const configPath = findConfigFile();

  if (configPath) {
    try {
      const configContent = fs.readFileSync(configPath, 'utf-8');
      const config = JSON.parse(configContent);

      // Store the config root for resolving relative paths
      config._root = path.dirname(configPath);

      // Merge with defaults
      return {
        ...DEFAULT_CONFIG,
        ...config,
        icons: {
          ...DEFAULT_CONFIG.icons,
          ...config.icons
        }
      };
    } catch (e) {
      console.warn(`Warning: Could not parse ${configPath}: ${e.message}`);
    }
  }

  // Check if we're inside sagebox library itself (for development)
  if (fs.existsSync(LIBRARY_ICONS_PATH)) {
    return {
      icons: {
        input: LIBRARY_ICONS_PATH,
        output: path.join(LIBRARY_ICONS_PATH, 'index.ts'),
        jsonFile: 'icons.json'
      },
      _root: path.join(__dirname, '../..'),
      _isLibrary: true
    };
  }

  // Return defaults with current directory as root
  return {
    ...DEFAULT_CONFIG,
    _root: process.cwd()
  };
}

/**
 * Get the full path to icons.json
 * @param {Object} config - Configuration object
 * @returns {string} Full path to icons.json
 */
function getIconsPath(config) {
  const root = config._root || process.cwd();
  const iconsDir = path.resolve(root, config.icons.input);
  return path.join(iconsDir, config.icons.jsonFile);
}

/**
 * Get the full path to output TypeScript file
 * @param {Object} config - Configuration object
 * @returns {string} Full path to output file
 */
function getOutputPath(config) {
  const root = config._root || process.cwd();
  return path.resolve(root, config.icons.output);
}

/**
 * Ensure icons directory exists
 * @param {Object} config - Configuration object
 */
function ensureIconsDir(config) {
  const root = config._root || process.cwd();
  const iconsDir = path.resolve(root, config.icons.input);

  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
  }

  // Create empty icons.json if it doesn't exist
  const iconsJsonPath = path.join(iconsDir, config.icons.jsonFile);
  if (!fs.existsSync(iconsJsonPath)) {
    fs.writeFileSync(iconsJsonPath, '{}', 'utf-8');
  }
}

/**
 * Save configuration to file
 * @param {Object} config - Configuration to save
 * @param {string} targetDir - Target directory
 */
function saveConfig(config, targetDir = process.cwd()) {
  const configPath = path.join(targetDir, CONFIG_FILENAME);

  // Remove internal properties before saving
  const { _root, ...configToSave } = config;

  fs.writeFileSync(configPath, JSON.stringify(configToSave, null, 2), 'utf-8');
}

module.exports = {
  CONFIG_FILENAME,
  DEFAULT_CONFIG,
  findConfigFile,
  loadConfig,
  getIconsPath,
  getOutputPath,
  ensureIconsDir,
  saveConfig
};
