/**
 * SVG Optimizer
 *
 * Optimize SVG icons using SVGO
 */

const fs = require('fs');
const path = require('path');

/**
 * Default SVGO configuration optimized for icons
 */
const DEFAULT_SVGO_CONFIG = {
  multipass: true,
  plugins: [
    'preset-default',
    'removeDimensions',
    {
      name: 'removeAttrs',
      params: {
        attrs: ['class', 'data-name', 'fill', 'stroke']
      }
    },
    {
      name: 'addAttributesToSVGElement',
      params: {
        attributes: [{ fill: 'currentColor' }]
      }
    }
  ]
};

/**
 * Check if SVGO is available
 */
function isSvgoAvailable() {
  try {
    require.resolve('svgo');
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Optimize a single SVG string
 * @param {string} svgContent - SVG content
 * @param {Object} options - SVGO options
 * @returns {Promise<string>} Optimized SVG
 */
async function optimizeSVG(svgContent, options = {}) {
  if (!isSvgoAvailable()) {
    throw new Error('SVGO not installed. Run: npm install -D svgo');
  }

  const { optimize } = require('svgo');
  const config = { ...DEFAULT_SVGO_CONFIG, ...options };

  const result = optimize(svgContent, config);
  return result.data;
}

/**
 * Optimize SVG file
 * @param {string} filePath - Path to SVG file
 * @param {Object} options - SVGO options
 * @returns {Promise<{original: number, optimized: number, savings: string}>}
 */
async function optimizeSVGFile(filePath, options = {}) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const originalSize = Buffer.byteLength(content, 'utf8');

  const optimized = await optimizeSVG(content, options);
  const optimizedSize = Buffer.byteLength(optimized, 'utf8');

  if (options.output) {
    fs.writeFileSync(options.output, optimized, 'utf-8');
  } else {
    fs.writeFileSync(filePath, optimized, 'utf-8');
  }

  const savings = ((1 - optimizedSize / originalSize) * 100).toFixed(1);

  return {
    original: originalSize,
    optimized: optimizedSize,
    savings: `${savings}%`
  };
}

/**
 * Optimize all paths in an icon definition
 * This is a lightweight optimization without SVGO
 * @param {Object} iconDef - Icon definition with paths
 * @returns {Object} Optimized icon definition
 */
function optimizeIconPaths(iconDef) {
  if (!iconDef.paths) return iconDef;

  const optimizedPaths = iconDef.paths.map(pathData => {
    return pathData
      // Remove unnecessary whitespace
      .replace(/\s+/g, ' ')
      .trim()
      // Remove spaces after commands
      .replace(/([MmZzLlHhVvCcSsQqTtAa])\s+/g, '$1')
      // Remove spaces before commands
      .replace(/\s+([MmZzLlHhVvCcSsQqTtAa])/g, '$1')
      // Use comma as separator
      .replace(/\s+/g, ',')
      // Remove redundant commas
      .replace(/,+/g, ',')
      // Remove trailing commas
      .replace(/,$/g, '')
      // Remove leading commas
      .replace(/^,/g, '');
  });

  return {
    ...iconDef,
    paths: optimizedPaths
  };
}

/**
 * Optimize icons.json file
 * @param {string} iconsJsonPath - Path to icons.json
 * @param {Object} options - Options
 * @returns {Promise<{count: number, beforeSize: number, afterSize: number}>}
 */
async function optimizeIconsJSON(iconsJsonPath, options = {}) {
  const content = fs.readFileSync(iconsJsonPath, 'utf-8');
  const beforeSize = Buffer.byteLength(content, 'utf8');
  const icons = JSON.parse(content);

  const optimizedIcons = {};
  let count = 0;

  for (const [name, def] of Object.entries(icons)) {
    optimizedIcons[name] = optimizeIconPaths(def);
    count++;
  }

  // Sort alphabetically
  const sorted = {};
  Object.keys(optimizedIcons).sort().forEach(key => {
    sorted[key] = optimizedIcons[key];
  });

  const optimizedContent = JSON.stringify(sorted, null, 2);
  const afterSize = Buffer.byteLength(optimizedContent, 'utf8');

  fs.writeFileSync(iconsJsonPath, optimizedContent, 'utf-8');

  return {
    count,
    beforeSize,
    afterSize,
    savings: ((1 - afterSize / beforeSize) * 100).toFixed(1) + '%'
  };
}

/**
 * Validate SVG path data
 * @param {string} pathData - SVG path d attribute
 * @returns {{valid: boolean, errors: string[]}}
 */
function validatePathData(pathData) {
  const errors = [];

  // Check for valid commands
  const validCommands = /^[MmZzLlHhVvCcSsQqTtAa0-9\s,.\-+eE]+$/;
  if (!validCommands.test(pathData)) {
    errors.push('Contains invalid characters');
  }

  // Check starts with moveto
  if (!/^[Mm]/.test(pathData.trim())) {
    errors.push('Path should start with M or m command');
  }

  // Check for balanced commands
  const commands = pathData.match(/[MmZzLlHhVvCcSsQqTtAa]/g) || [];
  if (commands.length === 0) {
    errors.push('No path commands found');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Analyze icon for potential issues
 * @param {Object} iconDef - Icon definition
 * @returns {{issues: string[], suggestions: string[]}}
 */
function analyzeIcon(iconDef) {
  const issues = [];
  const suggestions = [];

  if (!iconDef.paths || iconDef.paths.length === 0) {
    issues.push('No paths defined');
    return { issues, suggestions };
  }

  // Check path count
  if (iconDef.paths.length > 5) {
    suggestions.push(`Icon has ${iconDef.paths.length} paths - consider combining`);
  }

  // Check path data size
  const totalPathLength = iconDef.paths.reduce((sum, p) => sum + p.length, 0);
  if (totalPathLength > 2000) {
    suggestions.push('Path data is large - may affect performance');
  }

  // Validate each path
  iconDef.paths.forEach((pathData, i) => {
    const validation = validatePathData(pathData);
    if (!validation.valid) {
      issues.push(`Path ${i + 1}: ${validation.errors.join(', ')}`);
    }
  });

  // Check viewBox
  if (iconDef.viewBox) {
    const parts = iconDef.viewBox.split(/\s+/).map(Number);
    if (parts.length !== 4 || parts.some(isNaN)) {
      issues.push('Invalid viewBox format');
    }
  }

  return { issues, suggestions };
}

module.exports = {
  isSvgoAvailable,
  optimizeSVG,
  optimizeSVGFile,
  optimizeIconPaths,
  optimizeIconsJSON,
  validatePathData,
  analyzeIcon,
  DEFAULT_SVGO_CONFIG
};
