import fs from 'node:fs';
import path from 'node:path';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';

const execAsync = promisify(exec);

// Icon set metadata with animated flag
export const ICON_SETS: Record<string, { name: string; color: string; license: string; animated?: boolean }> = {
  // Static icon sets
  'lucide': { name: 'Lucide', color: '#f472b6', license: 'ISC' },
  'heroicons': { name: 'Heroicons', color: '#38bdf8', license: 'MIT' },
  'material-symbols': { name: 'Material Symbols', color: '#fbbf24', license: 'Apache 2.0' },
  'tabler': { name: 'Tabler Icons', color: '#4ade80', license: 'MIT' },
  'feather': { name: 'Feather', color: '#a78bfa', license: 'MIT' },
  'mdi': { name: 'Material Design Icons', color: '#fb923c', license: 'Apache 2.0' },
  'bi': { name: 'Bootstrap Icons', color: '#818cf8', license: 'MIT' },
  'carbon': { name: 'Carbon', color: '#2dd4bf', license: 'Apache 2.0' },
  'ph': { name: 'Phosphor', color: '#f87171', license: 'MIT' },
  'ion': { name: 'Ionicons', color: '#60a5fa', license: 'MIT' },
  'ri': { name: 'Remix Icon', color: '#c084fc', license: 'Apache 2.0' },
  'solar': { name: 'Solar', color: '#facc15', license: 'CC BY 4.0' },
  'fa6-solid': { name: 'Font Awesome Solid', color: '#538DD7', license: 'CC BY 4.0' },
  'fa6-regular': { name: 'Font Awesome Regular', color: '#538DD7', license: 'CC BY 4.0' },
  'radix-icons': { name: 'Radix Icons', color: '#9333EA', license: 'MIT' },
  'eos-icons': { name: 'EOS Icons', color: '#06b6d4', license: 'MIT' },

  // Animated icon sets from Iconify (100% animated)
  'svg-spinners': { name: 'SVG Spinners', color: '#ec4899', license: 'MIT', animated: true },
  'line-md': { name: 'Line MD', color: '#f472b6', license: 'MIT', animated: true },

  // Custom animated (local)
  'animated': { name: 'Custom Animated', color: '#a855f7', license: 'MIT', animated: true },
};

// Predefined animated icons
export const ANIMATED_ICONS: Record<string, string> = {
  'animated:spinner': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" fill="none" opacity="0.25"/><path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/></path></svg>`,

  'animated:dots': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="4" cy="12" r="3" fill="currentColor"><animate attributeName="opacity" dur="1s" values="1;0.2;1" repeatCount="indefinite" begin="0"/></circle><circle cx="12" cy="12" r="3" fill="currentColor"><animate attributeName="opacity" dur="1s" values="1;0.2;1" repeatCount="indefinite" begin="0.2s"/></circle><circle cx="20" cy="12" r="3" fill="currentColor"><animate attributeName="opacity" dur="1s" values="1;0.2;1" repeatCount="indefinite" begin="0.4s"/></circle></svg>`,

  'animated:pulse': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" fill="currentColor"><animate attributeName="r" dur="1.5s" values="8;12;8" repeatCount="indefinite"/><animate attributeName="opacity" dur="1.5s" values="1;0.5;1" repeatCount="indefinite"/></circle></svg>`,

  'animated:bars': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><rect x="2" y="6" width="4" height="12" rx="1" fill="currentColor"><animate attributeName="height" dur="1s" values="12;20;12" repeatCount="indefinite" begin="0"/><animate attributeName="y" dur="1s" values="6;2;6" repeatCount="indefinite" begin="0"/></rect><rect x="10" y="6" width="4" height="12" rx="1" fill="currentColor"><animate attributeName="height" dur="1s" values="12;20;12" repeatCount="indefinite" begin="0.2s"/><animate attributeName="y" dur="1s" values="6;2;6" repeatCount="indefinite" begin="0.2s"/></rect><rect x="18" y="6" width="4" height="12" rx="1" fill="currentColor"><animate attributeName="height" dur="1s" values="12;20;12" repeatCount="indefinite" begin="0.4s"/><animate attributeName="y" dur="1s" values="6;2;6" repeatCount="indefinite" begin="0.4s"/></rect></svg>`,

  'animated:ring': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"><animate attributeName="stroke-dasharray" dur="1.5s" values="0 63;63 63" repeatCount="indefinite"/><animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/></circle></svg>`,

  'animated:bounce': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="6" fill="currentColor"><animate attributeName="cy" dur="0.6s" values="12;6;12" repeatCount="indefinite" calcMode="spline" keySplines="0.5 0 0.5 1; 0.5 0 0.5 1"/></circle></svg>`,

  'animated:wave': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><rect x="1" y="8" width="3" height="8" rx="1" fill="currentColor"><animate attributeName="height" dur="1s" values="8;16;8" repeatCount="indefinite" begin="0"/><animate attributeName="y" dur="1s" values="8;4;8" repeatCount="indefinite" begin="0"/></rect><rect x="6" y="8" width="3" height="8" rx="1" fill="currentColor"><animate attributeName="height" dur="1s" values="8;16;8" repeatCount="indefinite" begin="0.1s"/><animate attributeName="y" dur="1s" values="8;4;8" repeatCount="indefinite" begin="0.1s"/></rect><rect x="11" y="8" width="3" height="8" rx="1" fill="currentColor"><animate attributeName="height" dur="1s" values="8;16;8" repeatCount="indefinite" begin="0.2s"/><animate attributeName="y" dur="1s" values="8;4;8" repeatCount="indefinite" begin="0.2s"/></rect><rect x="16" y="8" width="3" height="8" rx="1" fill="currentColor"><animate attributeName="height" dur="1s" values="8;16;8" repeatCount="indefinite" begin="0.3s"/><animate attributeName="y" dur="1s" values="8;4;8" repeatCount="indefinite" begin="0.3s"/></rect><rect x="21" y="8" width="3" height="8" rx="1" fill="currentColor"><animate attributeName="height" dur="1s" values="8;16;8" repeatCount="indefinite" begin="0.4s"/><animate attributeName="y" dur="1s" values="8;4;8" repeatCount="indefinite" begin="0.4s"/></rect></svg>`,

  'animated:heart': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"><animate attributeName="transform" type="scale" values="1;1.2;1" dur="0.8s" repeatCount="indefinite" additive="sum"/><animateTransform attributeName="transform" type="translate" values="0 0;0 0;0 0" dur="0.8s" repeatCount="indefinite"/></path></svg>`,

  'animated:loading-circle': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="2" fill="currentColor"><animate attributeName="r" dur="1.5s" values="2;6;2" repeatCount="indefinite"/><animate attributeName="opacity" dur="1.5s" values="1;0;1" repeatCount="indefinite"/></circle><circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" stroke-width="1"><animate attributeName="r" dur="1.5s" values="6;10;6" repeatCount="indefinite"/><animate attributeName="opacity" dur="1.5s" values="0.5;0;0.5" repeatCount="indefinite"/></circle></svg>`,

  'animated:sync': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z" fill="currentColor"><animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1.5s" repeatCount="indefinite"/></path></svg>`,

  'animated:typing': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="6" cy="12" r="2" fill="currentColor"><animate attributeName="cy" dur="0.6s" values="12;8;12" repeatCount="indefinite" begin="0"/></circle><circle cx="12" cy="12" r="2" fill="currentColor"><animate attributeName="cy" dur="0.6s" values="12;8;12" repeatCount="indefinite" begin="0.15s"/></circle><circle cx="18" cy="12" r="2" fill="currentColor"><animate attributeName="cy" dur="0.6s" values="12;8;12" repeatCount="indefinite" begin="0.3s"/></circle></svg>`,

  'animated:clock': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/><line x1="12" y1="12" x2="12" y2="7" stroke="currentColor" stroke-width="2" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="12s" repeatCount="indefinite"/></line><line x1="12" y1="12" x2="16" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/></line></svg>`,
};

export type IconDefinition = {
  paths: string[];
  viewBox?: string;
  fillRule?: string;
};

export type Icons = Record<string, IconDefinition>;

export interface Icon {
  name: string;
  content: string;
  inProject?: boolean;  // Flag to indicate if icon is used in the project build
}

// Get icons.json path (library - all imported icons)
export function getIconsPath(): string {
  const envPath = process.env.ICONS_PATH;
  if (envPath && fs.existsSync(envPath)) {
    return envPath;
  }

  // Default: look in src folder relative to docs
  const defaultPath = path.resolve(process.cwd(), '..', 'src', 'icons.json');
  if (fs.existsSync(defaultPath)) {
    return defaultPath;
  }

  // Fallback
  return path.resolve(process.cwd(), 'src', 'icons.json');
}

// Read project icon names (icons with inProject: true)
export async function readProjectIcons(): Promise<Set<string>> {
  const allIcons = await readIcons();
  const projectIcons = allIcons.filter(icon => icon.inProject === true);
  return new Set(projectIcons.map(icon => icon.name));
}

// Save icons and trigger auto-build
async function saveIconsAndBuild(icons: Icon[]): Promise<void> {
  await saveIcons(icons);

  // Wait for filesystem to sync
  await new Promise(resolve => setTimeout(resolve, 300));

  // Auto-build using CLI (for user projects)
  await runCliBuild();
}

// Run the CLI build command to generate TypeScript
async function runCliBuild(): Promise<{ success: boolean; message: string }> {
  const iconsPath = getIconsPath();
  const iconsDir = path.dirname(iconsPath);  // src/icons

  // Get project root (go up from src/icons to project root)
  const projectRoot = path.dirname(path.dirname(iconsDir));

  // Check if this is a user project (has package.json with sagebox dependency)
  const packageJsonPath = path.join(projectRoot, 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    console.log('[Icon Manager] No package.json found, skipping auto-build');
    return { success: false, message: 'No package.json' };
  }

  try {
    // Use npx to run sagebox CLI - works for both linked and installed packages
    const isWindows = process.platform === 'win32';
    const cmd = isWindows ? 'npx.cmd sagebox icons build' : 'npx sagebox icons build';

    console.log(`[Icon Manager] Auto-building TypeScript...`);
    console.log(`[Icon Manager] Project root: ${projectRoot}`);

    const { stdout, stderr } = await execAsync(cmd, {
      cwd: projectRoot,
      env: { ...process.env },
      shell: true
    });

    if (stdout) console.log('[Icon Manager]', stdout.trim());
    if (stderr && !stderr.includes('ExperimentalWarning')) {
      console.error('[Icon Manager] stderr:', stderr);
    }

    console.log('[Icon Manager] ✓ Build completed');
    return { success: true, message: 'Build completed' };
  } catch (error) {
    console.error('[Icon Manager] Build failed:', error);
    return { success: false, message: error instanceof Error ? error.message : 'Build failed' };
  }
}

// Generate TypeScript content for sg-icon component
function generateIconsTS(icons: { name: string; content: string }[]): string {
  const timestamp = new Date().toISOString();

  let output = `/**
 * SVG Icon Library - Centralized icon definitions
 *
 * [!] ARCHIVO AUTO-GENERADO POR ICON MANAGER - NO EDITAR MANUALMENTE
 *
 * Iconos seleccionados en el proyecto: ${icons.length}
 * Generado: ${timestamp}
 */

export interface IconDefinition {
  paths: string[];
  viewBox?: string;
  fillRule?: 'nonzero' | 'evenodd';
}

export const icons: Record<string, IconDefinition> = {
`;

  icons.forEach((icon, index) => {
    const { name, content } = icon;

    const viewBoxMatch = content.match(/viewBox=["']([^"']+)["']/i);
    const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';

    const paths: string[] = [];
    const pathMatches = content.matchAll(/<path[^>]*d=["']([^"']+)["'][^>]*\/?>/gi);
    for (const match of pathMatches) {
      paths.push(match[1]);
    }

    const fillRuleMatch = content.match(/fill-rule=["']([^"']+)["']/i);
    const fillRule = fillRuleMatch ? fillRuleMatch[1] : null;

    const cleanName = name.includes(':') ? name.split(':')[1] : name;

    output += `  '${cleanName}': {\n`;
    output += `    paths: [\n`;
    paths.forEach((p, i) => {
      output += `      '${p}'${i < paths.length - 1 ? ',' : ''}\n`;
    });
    output += `    ],\n`;

    if (viewBox !== '0 0 24 24') {
      output += `    viewBox: '${viewBox}',\n`;
    }

    if (fillRule && fillRule !== 'nonzero') {
      output += `    fillRule: '${fillRule}',\n`;
    }

    output += `  }${index < icons.length - 1 ? ',' : ''}\n`;
  });

  output += `};\n`;

  return output;
}

// Build sg-icon component automatically
export async function buildSgIconComponent(): Promise<{ success: boolean; count: number; path: string }> {
  const icons = await exportProjectIcons();

  // Path to sg-icon component
  const iconsPath = path.resolve(process.cwd(), '..', '..', 'src', 'components', 'svg-icon', 'icons', 'index.ts');
  const dir = path.dirname(iconsPath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const tsContent = generateIconsTS(icons);
  fs.writeFileSync(iconsPath, tsContent, 'utf-8');

  return { success: true, count: icons.length, path: iconsPath };
}

// Add icons to project (set inProject: true)
export async function addToProject(iconNames: string[]): Promise<void> {
  const allIcons = await readIcons();
  const namesSet = new Set(iconNames);

  const updatedIcons = allIcons.map(icon => ({
    ...icon,
    inProject: namesSet.has(icon.name) ? true : icon.inProject
  }));

  await saveIconsAndBuild(updatedIcons);
}

// Remove icons from project (set inProject: false)
export async function removeFromProject(iconNames: string[]): Promise<void> {
  const allIcons = await readIcons();
  const namesSet = new Set(iconNames);

  const updatedIcons = allIcons.map(icon => ({
    ...icon,
    inProject: namesSet.has(icon.name) ? false : icon.inProject
  }));

  await saveIconsAndBuild(updatedIcons);
}

// Export only project icons (for production build)
export async function exportProjectIcons(): Promise<Icon[]> {
  const allIcons = await readIcons();
  return allIcons.filter(icon => icon.inProject === true);
}

// Read icons in raw JSON format
export function readIconsRaw(): Icons {
  const iconsPath = getIconsPath();
  if (!fs.existsSync(iconsPath)) {
    return {};
  }
  return JSON.parse(fs.readFileSync(iconsPath, 'utf-8'));
}

// Save icons in raw object format
export function saveIconsRaw(icons: Icons): void {
  const iconsPath = getIconsPath();
  const dir = path.dirname(iconsPath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Sort by key alphabetically
  const sorted = Object.fromEntries(
    Object.entries(icons).sort(([a], [b]) => a.localeCompare(b))
  );
  fs.writeFileSync(iconsPath, JSON.stringify(sorted, null, 2), 'utf-8');
}

// Read icons as array with name/content/inProject for UI
export async function readIcons(): Promise<Icon[]> {
  const iconsPath = getIconsPath();
  if (!fs.existsSync(iconsPath)) {
    return [];
  }

  try {
    const data = JSON.parse(fs.readFileSync(iconsPath, 'utf-8'));

    // Handle both formats: array of {name, content, inProject?} or object {name: def}
    if (Array.isArray(data)) {
      // Ensure inProject is boolean (default to false for backwards compatibility)
      return data.map(icon => ({
        ...icon,
        inProject: icon.inProject === true
      }));
    }

    // Convert object format to array (legacy format, default inProject to false)
    return Object.entries(data).map(([name, def]) => {
      const iconDef = def as IconDefinition;
      const viewBox = iconDef.viewBox || '0 0 24 24';
      const paths = iconDef.paths.map(d => {
        const fillRule = iconDef.fillRule ? ` fill-rule="${iconDef.fillRule}"` : '';
        return `<path d="${d}"${fillRule}/>`;
      }).join('');
      const content = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" fill="currentColor">${paths}</svg>`;
      return { name, content, inProject: false };
    });
  } catch {
    return [];
  }
}

// Save icons (accepts array format)
export async function saveIcons(icons: Icon[]): Promise<void> {
  const iconsPath = getIconsPath();
  const dir = path.dirname(iconsPath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Sort alphabetically
  const sorted = [...icons].sort((a, b) => a.name.localeCompare(b.name));
  fs.writeFileSync(iconsPath, JSON.stringify(sorted, null, 2), 'utf-8');

  // Ensure file is flushed to disk
  await new Promise(resolve => setTimeout(resolve, 50));
}

// Helper to detect animated SVGs
export function isAnimatedSVG(content: string): boolean {
  return /(<animate[^>]*>|<animateTransform[^>]*>|<animateMotion[^>]*>|<set\s[^>]*>)/i.test(content);
}

// Categorize icons by prefix
export function categorizeIcons(icons: Icon[]) {
  const knownPrefixes = Object.keys(ICON_SETS);
  const categories = {
    all: icons.length,
    custom: [] as string[],
    animated: [] as string[],
    sets: {} as Record<string, string[]>
  };

  icons.forEach(icon => {
    // Check if icon is animated
    if (isAnimatedSVG(icon.content)) {
      categories.animated.push(icon.name);
    }

    // Check if name has a prefix (e.g., "lucide:arrow" or "lucide-arrow")
    const colonIndex = icon.name.indexOf(':');
    const prefix = colonIndex > 0 ? icon.name.substring(0, colonIndex) : null;

    if (prefix && knownPrefixes.includes(prefix)) {
      if (!categories.sets[prefix]) {
        categories.sets[prefix] = [];
      }
      categories.sets[prefix].push(icon.name);
    } else {
      categories.custom.push(icon.name);
    }
  });

  return categories;
}

// Parse SVG to extract paths
export function parseSVG(svgContent: string) {
  const paths: string[] = [];
  let viewBox = '0 0 24 24';
  let fillRule: string | undefined;

  const viewBoxMatch = svgContent.match(/viewBox=["']([^"']+)["']/i);
  if (viewBoxMatch) {
    viewBox = viewBoxMatch[1];
  }

  const pathMatches = svgContent.matchAll(/<path[^>]*d=["']([^"']+)["'][^>]*\/?>/gi);
  for (const match of pathMatches) {
    paths.push(match[1]);
  }

  const fillRuleMatch = svgContent.match(/fill-rule=["']([^"']+)["']/i);
  if (fillRuleMatch) {
    fillRule = fillRuleMatch[1];
  }

  return { paths, viewBox, fillRule };
}

export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}
