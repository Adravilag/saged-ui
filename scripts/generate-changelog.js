#!/usr/bin/env node

/**
 * Generate Changelog for Website
 * 
 * Reads CHANGELOG.md and generates a structured JSON file
 * that the Astro website can consume.
 */

const fs = require('fs');
const path = require('path');

const CHANGELOG_PATH = path.resolve(__dirname, '../CHANGELOG.md');
const OUTPUT_PATH = path.resolve(__dirname, '../website/src/data/changelog.json');

// Ensure output directory exists
const outputDir = path.dirname(OUTPUT_PATH);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

/**
 * Parse CHANGELOG.md into structured data
 */
function parseChangelog(content) {
  const releases = [];
  
  // Split by version headers (## [x.x.x] or ## x.x.x)
  const versionRegex = /^## \[?(\d+\.\d+\.\d+(?:-[a-zA-Z0-9.]+)?)\]?(?:\s*[-–]\s*(\d{4}-\d{2}-\d{2}))?/gm;
  
  const sections = content.split(versionRegex);
  
  // Process pairs: version, date, content
  for (let i = 1; i < sections.length; i += 3) {
    const version = sections[i];
    const date = sections[i + 1] || null;
    const body = sections[i + 2] || '';
    
    const release = {
      version,
      date,
      changes: parseChanges(body),
    };
    
    releases.push(release);
  }
  
  return releases;
}

/**
 * Parse changes from a release section
 */
function parseChanges(body) {
  const changes = {
    features: [],
    fixes: [],
    breaking: [],
    docs: [],
    chore: [],
    other: [],
  };
  
  // Match change type headers (### Added, ### Fixed, etc.)
  const typeRegex = /^### (Added|Features?|Fixed|Bug Fixes?|Breaking|BREAKING CHANGES?|Docs?|Documentation|Chore|Other|Changed|Removed|Security|Deprecated)/gim;
  
  const typeSections = body.split(typeRegex);
  
  let currentType = 'other';
  
  for (let i = 0; i < typeSections.length; i++) {
    const section = typeSections[i].trim();
    
    // Check if this is a type header
    const typeMatch = section.match(/^(Added|Features?|Fixed|Bug Fixes?|Breaking|BREAKING CHANGES?|Docs?|Documentation|Chore|Other|Changed|Removed|Security|Deprecated)$/i);
    
    if (typeMatch) {
      currentType = normalizeType(typeMatch[1]);
      continue;
    }
    
    // Parse bullet points
    const items = section.match(/^[-*]\s+(.+)$/gm);
    if (items) {
      for (const item of items) {
        const text = item.replace(/^[-*]\s+/, '').trim();
        if (text && changes[currentType]) {
          changes[currentType].push(parseChangeItem(text));
        }
      }
    }
  }
  
  // Also parse items without headers
  const unheaderedItems = body.match(/^[-*]\s+(.+)$/gm);
  if (unheaderedItems && Object.values(changes).every(arr => arr.length === 0)) {
    for (const item of unheaderedItems) {
      const text = item.replace(/^[-*]\s+/, '').trim();
      const parsed = parseChangeItem(text);
      
      // Categorize by conventional commit prefix
      if (text.startsWith('feat')) {
        changes.features.push(parsed);
      } else if (text.startsWith('fix')) {
        changes.fixes.push(parsed);
      } else if (text.startsWith('docs')) {
        changes.docs.push(parsed);
      } else if (text.startsWith('chore')) {
        changes.chore.push(parsed);
      } else if (text.includes('BREAKING')) {
        changes.breaking.push(parsed);
      } else {
        changes.other.push(parsed);
      }
    }
  }
  
  return changes;
}

/**
 * Normalize change type to our categories
 */
function normalizeType(type) {
  const t = type.toLowerCase();
  
  if (t.includes('add') || t.includes('feature')) return 'features';
  if (t.includes('fix') || t.includes('bug')) return 'fixes';
  if (t.includes('breaking')) return 'breaking';
  if (t.includes('doc')) return 'docs';
  if (t.includes('chore') || t.includes('change') || t.includes('remove')) return 'chore';
  
  return 'other';
}

/**
 * Parse a single change item
 */
function parseChangeItem(text) {
  // Extract scope from conventional commit format: type(scope): message
  const scopeMatch = text.match(/^\w+\(([^)]+)\):\s*(.+)$/);
  
  if (scopeMatch) {
    return {
      scope: scopeMatch[1],
      message: scopeMatch[2],
      raw: text,
    };
  }
  
  // Extract component name if mentioned
  const componentMatch = text.match(/\*\*([^*]+)\*\*:\s*(.+)$/);
  
  if (componentMatch) {
    return {
      scope: componentMatch[1],
      message: componentMatch[2],
      raw: text,
    };
  }
  
  return {
    scope: null,
    message: text,
    raw: text,
  };
}

/**
 * Main function
 */
function main() {
  console.log('📋 Generating changelog data...\n');
  
  if (!fs.existsSync(CHANGELOG_PATH)) {
    console.log('  ⚠️  CHANGELOG.md not found, creating empty changelog');
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify({
      generated: new Date().toISOString(),
      releases: [],
    }, null, 2));
    return;
  }
  
  const content = fs.readFileSync(CHANGELOG_PATH, 'utf-8');
  const releases = parseChangelog(content);
  
  const output = {
    generated: new Date().toISOString(),
    releases,
  };
  
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));
  
  console.log(`  ✅ Parsed ${releases.length} releases`);
  console.log(`  📁 Output: website/src/data/changelog.json`);
  
  // Show summary
  if (releases.length > 0) {
    console.log(`\n  Latest: v${releases[0].version}`);
  }
}

main();
