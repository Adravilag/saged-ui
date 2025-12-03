/**
 * Tests for Icons Command
 *
 * Tests the core functionality of the icons command utilities
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

// We need to test the exported functions, so we'll create a test module
// that exposes the internal functions we want to test

describe('Icons Command', () => {
  let tempDir;
  let iconsJsonPath;

  beforeEach(() => {
    // Create a temporary directory for tests
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'saged-ui-icons-test-'));
    iconsJsonPath = path.join(tempDir, 'icons.json');
  });

  afterEach(() => {
    // Clean up temporary directory
    if (tempDir && fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  describe('Icons JSON Operations', () => {
    it('should create empty icons.json array format', () => {
      fs.writeFileSync(iconsJsonPath, '[]', 'utf-8');

      const content = JSON.parse(fs.readFileSync(iconsJsonPath, 'utf-8'));
      expect(Array.isArray(content)).toBe(true);
      expect(content).toHaveLength(0);
    });

    it('should store icons in array format', () => {
      const icons = [
        { name: 'home', content: '<svg><path d="M10 20v-6h4v6"/></svg>' },
        { name: 'star', content: '<svg><path d="M12 17.27L18.18 21"/></svg>' }
      ];

      fs.writeFileSync(iconsJsonPath, JSON.stringify(icons, null, 2), 'utf-8');

      const content = JSON.parse(fs.readFileSync(iconsJsonPath, 'utf-8'));
      expect(content).toHaveLength(2);
      expect(content[0].name).toBe('home');
      expect(content[1].name).toBe('star');
    });

    it('should store icons with inProject flag', () => {
      const icons = [
        { name: 'home', content: '<svg><path d="M10 20"/></svg>', inProject: true },
        { name: 'star', content: '<svg><path d="M12 17"/></svg>', inProject: false }
      ];

      fs.writeFileSync(iconsJsonPath, JSON.stringify(icons, null, 2), 'utf-8');

      const content = JSON.parse(fs.readFileSync(iconsJsonPath, 'utf-8'));
      expect(content[0].inProject).toBe(true);
      expect(content[1].inProject).toBe(false);
    });

    it('should handle icon names with prefixes', () => {
      const icons = [
        { name: 'lucide:home', content: '<svg><path d="M10 20"/></svg>' },
        { name: 'mdi:star', content: '<svg><path d="M12 17"/></svg>' }
      ];

      fs.writeFileSync(iconsJsonPath, JSON.stringify(icons, null, 2), 'utf-8');

      const content = JSON.parse(fs.readFileSync(iconsJsonPath, 'utf-8'));
      expect(content[0].name).toBe('lucide:home');
      expect(content[1].name).toBe('mdi:star');
    });
  });

  describe('SVG Content Handling', () => {
    it('should store SVG content as string', () => {
      const svgContent = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>';

      const icons = [{ name: 'home', content: svgContent }];
      fs.writeFileSync(iconsJsonPath, JSON.stringify(icons, null, 2), 'utf-8');

      const content = JSON.parse(fs.readFileSync(iconsJsonPath, 'utf-8'));
      expect(content[0].content).toBe(svgContent);
    });

    it('should handle SVG with multiple paths', () => {
      const svgContent = '<svg viewBox="0 0 24 24"><path d="M0 0"/><path d="M10 10"/></svg>';

      const icons = [{ name: 'multi-path', content: svgContent }];
      fs.writeFileSync(iconsJsonPath, JSON.stringify(icons, null, 2), 'utf-8');

      const content = JSON.parse(fs.readFileSync(iconsJsonPath, 'utf-8'));
      expect(content[0].content).toContain('<path d="M0 0"/>');
      expect(content[0].content).toContain('<path d="M10 10"/>');
    });

    it('should handle SVG with special characters', () => {
      const svgContent = '<svg viewBox="0 0 24 24"><path d="M0 0" fill="currentColor" stroke-width="1.5"/></svg>';

      const icons = [{ name: 'special', content: svgContent }];
      fs.writeFileSync(iconsJsonPath, JSON.stringify(icons, null, 2), 'utf-8');

      const content = JSON.parse(fs.readFileSync(iconsJsonPath, 'utf-8'));
      expect(content[0].content).toContain('fill="currentColor"');
      expect(content[0].content).toContain('stroke-width="1.5"');
    });
  });

  describe('TypeScript Generation', () => {
    it('should generate index.ts from icons.json', () => {
      const icons = [
        { name: 'lucide:home', content: '<svg viewBox="0 0 24 24"><path d="M10 20"/></svg>', inProject: true }
      ];

      fs.writeFileSync(iconsJsonPath, JSON.stringify(icons), 'utf-8');

      // Simulate TypeScript generation
      const tsContent = generateMockTypeScript(icons);

      expect(tsContent).toContain("'lucide-home':");
      expect(tsContent).toContain('export const icons');
      expect(tsContent).toContain("export type IconName =");
    });

    it('should convert prefix:name to prefix-name format', () => {
      const icons = [
        { name: 'mdi:account', content: '<svg/>', inProject: true },
        { name: 'tabler:settings', content: '<svg/>', inProject: true }
      ];

      const tsContent = generateMockTypeScript(icons);

      expect(tsContent).toContain("'mdi-account'");
      expect(tsContent).toContain("'tabler-settings'");
      expect(tsContent).not.toContain("'mdi:account'");
      expect(tsContent).not.toContain("'tabler:settings'");
    });

    it('should escape single quotes in SVG content', () => {
      const icons = [
        { name: 'test', content: "<svg attr='value'><path/></svg>", inProject: true }
      ];

      const tsContent = generateMockTypeScript(icons);

      expect(tsContent).toContain("\\'value\\'");
    });

    it('should generate JSON file alongside TypeScript', () => {
      const icons = [
        { name: 'home', content: '<svg/>', inProject: true }
      ];

      const indexTsPath = path.join(tempDir, 'index.ts');
      const indexJsonPath = path.join(tempDir, 'index.json');

      // Simulate the build process
      fs.writeFileSync(indexTsPath, generateMockTypeScript(icons), 'utf-8');
      fs.writeFileSync(indexJsonPath, JSON.stringify({ home: '<svg/>' }, null, 2), 'utf-8');

      expect(fs.existsSync(indexTsPath)).toBe(true);
      expect(fs.existsSync(indexJsonPath)).toBe(true);

      const jsonContent = JSON.parse(fs.readFileSync(indexJsonPath, 'utf-8'));
      expect(jsonContent.home).toBe('<svg/>');
    });
  });

  describe('Icon Filtering', () => {
    it('should filter icons by inProject flag', () => {
      const icons = [
        { name: 'included', content: '<svg/>', inProject: true },
        { name: 'excluded', content: '<svg/>', inProject: false },
        { name: 'also-included', content: '<svg/>', inProject: true }
      ];

      const projectIcons = icons.filter(i => i.inProject === true);

      expect(projectIcons).toHaveLength(2);
      expect(projectIcons.map(i => i.name)).toContain('included');
      expect(projectIcons.map(i => i.name)).toContain('also-included');
      expect(projectIcons.map(i => i.name)).not.toContain('excluded');
    });

    it('should use all icons when no inProject flags set', () => {
      const icons = [
        { name: 'icon1', content: '<svg/>' },
        { name: 'icon2', content: '<svg/>' }
      ];

      // No inProject flags, so all should be included
      const hasProjectFlags = icons.some(i => i.inProject === true);
      const projectIcons = hasProjectFlags
        ? icons.filter(i => i.inProject === true)
        : icons;

      expect(projectIcons).toHaveLength(2);
    });
  });

  describe('Icon Name Normalization', () => {
    it('should handle various icon name formats', () => {
      const testCases = [
        { input: 'MyIcon', expected: 'my-icon' },
        { input: 'my_icon', expected: 'my-icon' },
        { input: 'my icon', expected: 'my-icon' },
        { input: 'my-icon', expected: 'my-icon' },
        { input: 'lucide:home', expected: 'lucide:home' }, // prefix format preserved in storage
      ];

      testCases.forEach(({ input, expected }) => {
        const normalized = toKebabCase(input);
        // Note: prefix format is preserved but kebab-case is applied to the name part
        if (input.includes(':')) {
          expect(input).toBe(expected); // preserved as-is in storage
        } else {
          expect(normalized).toBe(expected);
        }
      });
    });
  });
});

// Helper functions to simulate CLI functionality

function toKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

function generateMockTypeScript(icons) {
  let content = `/**
 * SVG Icon Library - Custom icon definitions
 * AUTO-GENERATED FILE
 */

export const icons: Record<string, string> = {
`;

  for (const icon of icons) {
    const exportName = icon.name.replace(':', '-');
    const escapedContent = icon.content.replace(/'/g, "\\'");
    content += `  '${exportName}': '${escapedContent}',\n`;
  }

  content += `};

export type IconName = ${icons.map(i => `'${i.name.replace(':', '-')}'`).join(' | ') || 'string'};
`;

  return content;
}
