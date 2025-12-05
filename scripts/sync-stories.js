#!/usr/bin/env node

/**
 * Sync Stories to Website
 * 
 * Extracts examples from Storybook stories and generates
 * JSON files that the Astro website can consume.
 */

const fs = require('fs');
const path = require('path');

const PACKAGES_DIR = path.resolve(__dirname, '../packages');
const OUTPUT_DIR = path.resolve(__dirname, '../website/src/data/examples');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Parse a stories.ts file and extract render functions
 */
function parseStories(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const examples = [];
  
  // Extract component name from path
  const componentMatch = filePath.match(/packages\/([^/]+)/);
  const componentName = componentMatch ? componentMatch[1] : 'unknown';
  
  // Match story exports with render functions
  // Pattern: export const StoryName: StoryObj = { ... render: (args) => `...` }
  const storyRegex = /export\s+const\s+(\w+)(?::\s*\w+)?\s*=\s*\{([^}]+render\s*:\s*\([^)]*\)\s*=>\s*`([^`]+)`[^}]*)\}/gs;
  
  let match;
  while ((match = storyRegex.exec(content)) !== null) {
    const [, storyName, , template] = match;
    
    // Skip Default if there are other stories
    examples.push({
      name: storyName,
      label: storyName.replace(/([A-Z])/g, ' $1').trim(),
      code: cleanTemplate(template),
    });
  }
  
  // Also try simpler pattern for single-line renders
  const simpleRegex = /export\s+const\s+(\w+)[^=]*=\s*\{[^}]*render\s*:\s*\(\)\s*=>\s*`([^`]+)`/gs;
  
  while ((match = simpleRegex.exec(content)) !== null) {
    const [, storyName, template] = match;
    
    // Avoid duplicates
    if (!examples.find(e => e.name === storyName)) {
      examples.push({
        name: storyName,
        label: storyName.replace(/([A-Z])/g, ' $1').trim(),
        code: cleanTemplate(template),
      });
    }
  }
  
  // Extract args/argTypes for props documentation
  const argsMatch = content.match(/args:\s*\{([^}]+)\}/);
  const defaultArgs = argsMatch ? parseArgs(argsMatch[1]) : {};
  
  const argTypesMatch = content.match(/argTypes:\s*\{([^}]+(?:\{[^}]*\}[^}]*)*)\}/s);
  const argTypes = argTypesMatch ? parseArgTypes(argTypesMatch[1]) : {};
  
  return {
    component: componentName,
    examples,
    defaultArgs,
    argTypes,
  };
}

/**
 * Clean template string (remove extra whitespace, interpolations)
 */
function cleanTemplate(template) {
  return template
    .replace(/\$\{args\.(\w+)\}/g, (_, prop) => `{${prop}}`) // ${args.prop} -> {prop}
    .replace(/\$\{[^}]+\}/g, '') // Remove other interpolations
    .replace(/^\s+/gm, (match) => {
      // Normalize indentation
      const spaces = match.length;
      return '  '.repeat(Math.floor(spaces / 4));
    })
    .trim();
}

/**
 * Parse args object
 */
function parseArgs(argsStr) {
  const args = {};
  const regex = /(\w+):\s*(['"`]?)([^,\n]+)\2/g;
  let match;
  
  while ((match = regex.exec(argsStr)) !== null) {
    const [, key, , value] = match;
    args[key] = value.trim().replace(/^['"`]|['"`]$/g, '');
  }
  
  return args;
}

/**
 * Parse argTypes for controls
 */
function parseArgTypes(argTypesStr) {
  const argTypes = {};
  // This is simplified - real implementation would need proper AST parsing
  const regex = /(\w+):\s*\{[^}]*control:\s*['"](\w+)['"]/g;
  let match;
  
  while ((match = regex.exec(argTypesStr)) !== null) {
    const [, prop, control] = match;
    argTypes[prop] = { control };
  }
  
  return argTypes;
}

/**
 * Find all stories files
 */
function findStories() {
  const stories = [];
  
  const packages = fs.readdirSync(PACKAGES_DIR);
  
  for (const pkg of packages) {
    const pkgPath = path.join(PACKAGES_DIR, pkg);
    if (!fs.statSync(pkgPath).isDirectory()) continue;
    if (pkg === 'core') continue; // Skip core package
    
    // Look for stories files
    const componentsDir = path.join(pkgPath, 'src', 'components', pkg);
    const storiesFile = path.join(componentsDir, `${pkg}.stories.ts`);
    
    if (fs.existsSync(storiesFile)) {
      // Check if file is not empty
      const stat = fs.statSync(storiesFile);
      if (stat.size > 0) {
        stories.push({ file: storiesFile, name: pkg });
      }
    }
  }
  
  return stories;
}

/**
 * Main function
 */
function main() {
  console.log('🔄 Syncing stories to website...\n');
  
  const storiesFiles = findStories();
  const allExamples = {};
  
  for (const { file, name } of storiesFiles) {
    try {
      const data = parseStories(file);
      data.component = name; // Use the package name
      
      if (data.examples.length > 0) {
        allExamples[name] = data;
        
        // Write individual component file
        const outputPath = path.join(OUTPUT_DIR, `${name}.json`);
        fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
        
        console.log(`  ✅ ${name}: ${data.examples.length} examples`);
      } else {
        console.log(`  ⏭️  ${name}: no render templates found`);
      }
    } catch (error) {
      console.log(`  ⚠️  ${name}: ${error.message}`);
    }
  }
  
  // Write index file with all components
  const indexPath = path.join(OUTPUT_DIR, 'index.json');
  fs.writeFileSync(indexPath, JSON.stringify({
    generated: new Date().toISOString(),
    components: Object.keys(allExamples),
  }, null, 2));
  
  console.log(`\n✅ Synced ${Object.keys(allExamples).length} components to website/src/data/examples/`);
}

main();
