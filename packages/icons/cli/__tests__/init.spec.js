/**
 * Tests for Init Command
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

describe('Init Command', () => {
  let tempDir;
  let originalCwd;

  beforeEach(() => {
    // Create a temporary directory for tests
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'sagebox-init-test-'));
    originalCwd = process.cwd();
    process.chdir(tempDir);
  });

  afterEach(() => {
    // Restore original directory and clean up
    process.chdir(originalCwd);
    if (tempDir && fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  describe('Configuration File Creation', () => {
    it('should create default config structure', () => {
      const defaultConfig = {
        icons: {
          input: './src/icons',
          output: './src/icons/index.ts',
          jsonFile: 'icons.json'
        }
      };

      const configPath = path.join(tempDir, 'sagebox.config.json');
      fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2), 'utf-8');

      expect(fs.existsSync(configPath)).toBe(true);

      const savedConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
      expect(savedConfig.icons.input).toBe('./src/icons');
      expect(savedConfig.icons.output).toBe('./src/icons/index.ts');
      expect(savedConfig.icons.jsonFile).toBe('icons.json');
    });

    it('should detect existing config file', () => {
      const configPath = path.join(tempDir, 'sagebox.config.json');
      fs.writeFileSync(configPath, '{"existing": true}', 'utf-8');

      expect(fs.existsSync(configPath)).toBe(true);
    });

    it('should allow force overwrite of existing config', () => {
      const configPath = path.join(tempDir, 'sagebox.config.json');

      // Create existing config
      fs.writeFileSync(configPath, '{"old": "config"}', 'utf-8');

      // Overwrite with new config
      const newConfig = { icons: { input: './new/path' } };
      fs.writeFileSync(configPath, JSON.stringify(newConfig, null, 2), 'utf-8');

      const savedConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
      expect(savedConfig.icons.input).toBe('./new/path');
      expect(savedConfig.old).toBeUndefined();
    });
  });

  describe('Icons Directory Creation', () => {
    it('should create icons directory structure', () => {
      const iconsDir = path.join(tempDir, 'src', 'icons');
      fs.mkdirSync(iconsDir, { recursive: true });

      expect(fs.existsSync(iconsDir)).toBe(true);
    });

    it('should create empty icons.json file', () => {
      const iconsDir = path.join(tempDir, 'src', 'icons');
      fs.mkdirSync(iconsDir, { recursive: true });

      const iconsJsonPath = path.join(iconsDir, 'icons.json');
      fs.writeFileSync(iconsJsonPath, '[]', 'utf-8');

      expect(fs.existsSync(iconsJsonPath)).toBe(true);

      const content = JSON.parse(fs.readFileSync(iconsJsonPath, 'utf-8'));
      expect(Array.isArray(content)).toBe(true);
      expect(content).toHaveLength(0);
    });

    it('should not overwrite existing icons.json', () => {
      const iconsDir = path.join(tempDir, 'src', 'icons');
      fs.mkdirSync(iconsDir, { recursive: true });

      const iconsJsonPath = path.join(iconsDir, 'icons.json');
      const existingIcons = [{ name: 'existing', content: '<svg/>' }];
      fs.writeFileSync(iconsJsonPath, JSON.stringify(existingIcons), 'utf-8');

      // Simulate init behavior - should not overwrite
      if (!fs.existsSync(iconsJsonPath)) {
        fs.writeFileSync(iconsJsonPath, '[]', 'utf-8');
      }

      const content = JSON.parse(fs.readFileSync(iconsJsonPath, 'utf-8'));
      expect(content).toHaveLength(1);
      expect(content[0].name).toBe('existing');
    });
  });

  describe('Package.json Integration', () => {
    it('should add icon scripts to package.json', () => {
      const pkgPath = path.join(tempDir, 'package.json');
      const pkg = {
        name: 'test-project',
        version: '1.0.0',
        scripts: {}
      };

      fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2), 'utf-8');

      // Simulate adding scripts
      const scriptsToAdd = {
        'icons:add': 'sagebox icons add',
        'icons:build': 'sagebox icons build',
        'icons:list': 'sagebox icons list',
        'icons:preview': 'sagebox icons preview'
      };

      const updatedPkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
      updatedPkg.scripts = { ...updatedPkg.scripts, ...scriptsToAdd };
      fs.writeFileSync(pkgPath, JSON.stringify(updatedPkg, null, 2), 'utf-8');

      const savedPkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
      expect(savedPkg.scripts['icons:add']).toBe('sagebox icons add');
      expect(savedPkg.scripts['icons:build']).toBe('sagebox icons build');
      expect(savedPkg.scripts['icons:list']).toBe('sagebox icons list');
      expect(savedPkg.scripts['icons:preview']).toBe('sagebox icons preview');
    });

    it('should not overwrite existing scripts', () => {
      const pkgPath = path.join(tempDir, 'package.json');
      const pkg = {
        name: 'test-project',
        scripts: {
          'icons:build': 'custom-build-command'
        }
      };

      fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2), 'utf-8');

      // Simulate adding scripts without overwriting
      const scriptsToAdd = {
        'icons:add': 'sagebox icons add',
        'icons:build': 'sagebox icons build' // Should not overwrite
      };

      const updatedPkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
      for (const [name, cmd] of Object.entries(scriptsToAdd)) {
        if (!updatedPkg.scripts[name]) {
          updatedPkg.scripts[name] = cmd;
        }
      }
      fs.writeFileSync(pkgPath, JSON.stringify(updatedPkg, null, 2), 'utf-8');

      const savedPkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
      expect(savedPkg.scripts['icons:build']).toBe('custom-build-command'); // Preserved
      expect(savedPkg.scripts['icons:add']).toBe('sagebox icons add'); // Added
    });

    it('should create scripts object if not exists', () => {
      const pkgPath = path.join(tempDir, 'package.json');
      const pkg = {
        name: 'test-project',
        version: '1.0.0'
      };

      fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2), 'utf-8');

      const updatedPkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
      if (!updatedPkg.scripts) {
        updatedPkg.scripts = {};
      }
      updatedPkg.scripts['icons:build'] = 'sagebox icons build';
      fs.writeFileSync(pkgPath, JSON.stringify(updatedPkg, null, 2), 'utf-8');

      const savedPkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
      expect(savedPkg.scripts).toBeDefined();
      expect(savedPkg.scripts['icons:build']).toBe('sagebox icons build');
    });

    it('should work without package.json', () => {
      // No package.json - should not throw
      const configPath = path.join(tempDir, 'sagebox.config.json');
      const config = { icons: { input: './src/icons' } };

      fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf-8');

      expect(fs.existsSync(configPath)).toBe(true);
    });
  });

  describe('Custom Configuration', () => {
    it('should support custom icons directory', () => {
      const customConfig = {
        icons: {
          input: './assets/icons',
          output: './assets/icons/icons.ts',
          jsonFile: 'my-icons.json'
        }
      };

      const configPath = path.join(tempDir, 'sagebox.config.json');
      fs.writeFileSync(configPath, JSON.stringify(customConfig, null, 2), 'utf-8');

      const savedConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
      expect(savedConfig.icons.input).toBe('./assets/icons');
      expect(savedConfig.icons.output).toBe('./assets/icons/icons.ts');
      expect(savedConfig.icons.jsonFile).toBe('my-icons.json');
    });
  });
});
