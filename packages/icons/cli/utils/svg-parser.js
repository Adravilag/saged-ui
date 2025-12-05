/**
 * SVG Parser Utilities
 *
 * Parse SVG content and extract paths, viewBox, etc.
 */

/**
 * Parse a single SVG file
 * @param {string} svgContent - SVG content as string
 * @returns {Object} Parsed icon data
 */
function parseSVG(svgContent) {
  // Extract viewBox
  const viewBoxMatch = svgContent.match(/viewBox=["']([^"']+)["']/);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';

  // Extract all paths
  const paths = [];
  const pathRegex = /<path[^>]*d=["']([^"']+)["'][^>]*\/?>/g;
  let match;
  while ((match = pathRegex.exec(svgContent)) !== null) {
    paths.push(match[1]);
  }

  // Extract fill-rule
  const fillRuleMatch = svgContent.match(/fill-rule=["']([^"']+)["']/);
  const fillRule = fillRuleMatch ? fillRuleMatch[1] : null;

  // Extract circles and convert to path data (optional)
  const circles = extractCircles(svgContent);

  return {
    paths,
    viewBox,
    fillRule,
    circles
  };
}

/**
 * Parse SVG sprite sheet with <symbol> elements
 * @param {string} svgContent - SVG sprite content
 * @returns {Object} Map of icon name to icon data
 */
function parseSpriteSVG(svgContent) {
  const icons = {};

  // Match <symbol> elements
  const symbolRegex = /<symbol\s+([^>]*)>([\s\S]*?)<\/symbol>/gi;
  let symbolMatch;

  while ((symbolMatch = symbolRegex.exec(svgContent)) !== null) {
    const attributes = symbolMatch[1];
    const content = symbolMatch[2].trim();

    // Extract id
    const idMatch = attributes.match(/id=["']([^"']+)["']/);
    if (!idMatch) continue;

    let iconId = idMatch[1];

    // Clean up icon name (remove common prefixes)
    let iconName = iconId;
    const prefixes = ['icon-', 'svg-', 'i-'];
    for (const prefix of prefixes) {
      if (iconName.startsWith(prefix)) {
        iconName = iconName.substring(prefix.length);
        break;
      }
    }

    // Convert to kebab-case
    iconName = toKebabCase(iconName);

    // Extract viewBox
    const viewBoxMatch = attributes.match(/viewBox=["']([^"']+)["']/);
    const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';

    // Extract paths from symbol content
    const paths = [];
    const pathRegex = /<path[^>]*d=["']([^"']+)["'][^>]*\/?>/gi;
    let pathMatch;
    while ((pathMatch = pathRegex.exec(content)) !== null) {
      paths.push(pathMatch[1]);
    }

    // Skip if no paths found
    if (paths.length === 0) continue;

    // Create icon definition
    const iconData = { paths };
    if (viewBox !== '0 0 24 24') {
      iconData.viewBox = viewBox;
    }

    // Extract fill-rule if present
    const fillRuleMatch = content.match(/fill-rule=["']([^"']+)["']/);
    if (fillRuleMatch && fillRuleMatch[1] !== 'nonzero') {
      iconData.fillRule = fillRuleMatch[1];
    }

    icons[iconName] = iconData;
  }

  // Also try to match standalone SVGs in case it's not a sprite
  if (Object.keys(icons).length === 0) {
    // Try parsing as individual SVG
    const parsed = parseSVG(svgContent);
    if (parsed.paths.length > 0) {
      // Use filename or 'icon' as default name
      icons['imported-icon'] = {
        paths: parsed.paths,
        ...(parsed.viewBox !== '0 0 24 24' && { viewBox: parsed.viewBox }),
        ...(parsed.fillRule && parsed.fillRule !== 'nonzero' && { fillRule: parsed.fillRule })
      };
    }
  }

  return icons;
}

/**
 * Extract circle elements from SVG
 * @param {string} svgContent - SVG content
 * @returns {Array} Array of circle data
 */
function extractCircles(svgContent) {
  const circles = [];
  const circleRegex = /<circle\s+([^>]*)\/?>/gi;
  let match;

  while ((match = circleRegex.exec(svgContent)) !== null) {
    const attrs = match[1];
    const cx = extractAttr(attrs, 'cx');
    const cy = extractAttr(attrs, 'cy');
    const r = extractAttr(attrs, 'r');

    if (cx && cy && r) {
      circles.push({
        cx: parseFloat(cx),
        cy: parseFloat(cy),
        r: parseFloat(r)
      });
    }
  }

  return circles;
}

/**
 * Extract attribute value from attribute string
 */
function extractAttr(attrs, name) {
  const match = attrs.match(new RegExp(`${name}=["']([^"']+)["']`));
  return match ? match[1] : null;
}

/**
 * Convert string to kebab-case
 */
function toKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

/**
 * Convert circle to path data
 * @param {number} cx - Center X
 * @param {number} cy - Center Y
 * @param {number} r - Radius
 * @returns {string} Path data
 */
function circleToPath(cx, cy, r) {
  return `M ${cx - r} ${cy} ` +
         `a ${r} ${r} 0 1 0 ${r * 2} 0 ` +
         `a ${r} ${r} 0 1 0 ${-r * 2} 0`;
}

/**
 * Validate SVG path data
 * @param {string} pathData - SVG path d attribute
 * @returns {boolean} Is valid
 */
function validatePathData(pathData) {
  // Basic validation - check for common path commands
  const validCommands = /^[MmZzLlHhVvCcSsQqTtAa0-9\s,.\-+eE]+$/;
  return validCommands.test(pathData.trim());
}

/**
 * Normalize viewBox to standard format
 * @param {string} viewBox - ViewBox string
 * @returns {string} Normalized viewBox
 */
function normalizeViewBox(viewBox) {
  const parts = viewBox.trim().split(/[\s,]+/).map(Number);
  if (parts.length === 4 && parts.every(n => !isNaN(n))) {
    return parts.join(' ');
  }
  return '0 0 24 24';
}

module.exports = {
  parseSVG,
  parseSpriteSVG,
  extractCircles,
  circleToPath,
  validatePathData,
  normalizeViewBox,
  toKebabCase
};
