/**
 * Tests for CLI Config Utilities
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

const {
  CONFIG_FILENAME,
  DEFAULT_CONFIG,
  findConfigFile,
  loadConfig,
  getIconsPath,
  getOutputPath,
  ensureIconsDir,
  saveConfig
} = require('../utils/config');

describe('CLI Config Utilities', () => {
  let tempDir;

  beforeEach(() => {
    // Create a temporary directory for tests
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'sagebox-test-'));
  });

  afterEach(() => {
    // Clean up temporary directory
    if (tempDir && fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  describe('DEFAULT_CONFIG', () => {
    it('should have default icons configuration', () => {
      expect(DEFAULT_CONFIG.icons).toBeDefined();
      expect(DEFAULT_CONFIG.icons.input).toBe('./src/icons');
      expect(DEFAULT_CONFIG.icons.output).toBe('./src/icons/index.ts');
      expect(DEFAULT_CONFIG.icons.jsonFile).toBe('icons.json');
    });
  });

  describe('CONFIG_FILENAME', () => {
    it('should be sagebox.config.json', () => {
      expect(CONFIG_FILENAME).toBe('sagebox.config.json');
    });
  });

  describe('findConfigFile', () => {
    it('should return null when no config file exists', () => {
      const result = findConfigFile(tempDir);
      expect(result).toBeNull();
    });

    it('should find config file in current directory', () => {
      const configPath = path.join(tempDir, CONFIG_FILENAME);
      fs.writeFileSync(configPath, '{}', 'utf-8');

      const result = findConfigFile(tempDir);
      expect(result).toBe(configPath);
    });

    it('should find config file in parent directory', () => {
      const nestedDir = path.join(tempDir, 'nested', 'deep');
      fs.mkdirSync(nestedDir, { recursive: true });

      const configPath = path.join(tempDir, CONFIG_FILENAME);
      fs.writeFileSync(configPath, '{}', 'utf-8');

      const result = findConfigFile(nestedDir);
      expect(result).toBe(configPath);
    });
  });

  describe('loadConfig', () => {
    it('should return default config when no config file exists (in non-library context)', () => {
      const originalCwd = process.cwd();
      process.chdir(tempDir);

      try {
        const config = loadConfig();
        // Note: When running inside sagebox library, it detects _isLibrary mode
        // and uses library paths. This is expected behavior.
        if (config._isLibrary) {
          expect(config.icons.input).toContain('svg-icon');
        } else {
          expect(config.icons.input).toBe(DEFAULT_CONFIG.icons.input);
          expect(config.icons.output).toBe(DEFAULT_CONFIG.icons.output);
          expect(config.icons.jsonFile).toBe(DEFAULT_CONFIG.icons.jsonFile);
        }
      } finally {
        process.chdir(originalCwd);
      }
    });

    it('should load custom config from file', () => {
      const customConfig = {
        icons: {
          input: './custom/icons',
          output: './custom/icons/custom.ts',
          jsonFile: 'custom-icons.json'
        }
      };

      const configPath = path.join(tempDir, CONFIG_FILENAME);
      fs.writeFileSync(configPath, JSON.stringify(customConfig), 'utf-8');

      const originalCwd = process.cwd();
      process.chdir(tempDir);

      try {
        const config = loadConfig();
        expect(config.icons.input).toBe('./custom/icons');
        expect(config.icons.output).toBe('./custom/icons/custom.ts');
        expect(config.icons.jsonFile).toBe('custom-icons.json');
        expect(config._root).toBe(tempDir);
      } finally {
        process.chdir(originalCwd);
      }
    });

    it('should merge with defaults for partial config', () => {
      const partialConfig = {
        icons: {
          input: './my-icons'
        }
      };

      const configPath = path.join(tempDir, CONFIG_FILENAME);
      fs.writeFileSync(configPath, JSON.stringify(partialConfig), 'utf-8');

      const originalCwd = process.cwd();
      process.chdir(tempDir);

      try {
        const config = loadConfig();
        expect(config.icons.input).toBe('./my-icons');
        expect(config.icons.output).toBe(DEFAULT_CONFIG.icons.output);
        expect(config.icons.jsonFile).toBe(DEFAULT_CONFIG.icons.jsonFile);
      } finally {
        process.chdir(originalCwd);
      }
    });

    it('should handle invalid JSON gracefully', () => {
      const configPath = path.join(tempDir, CONFIG_FILENAME);
      fs.writeFileSync(configPath, 'invalid json {', 'utf-8');

      const originalCwd = process.cwd();
      process.chdir(tempDir);

      try {
        // Should not throw, returns defaults (or library config if inside sagebox)
        const config = loadConfig();
        // Just verify it doesn't throw and returns a valid config
        expect(config.icons).toBeDefined();
        expect(config.icons.input).toBeDefined();
      } finally {
        process.chdir(originalCwd);
      }
    });
  });

  describe('getIconsPath', () => {
    it('should return correct path for icons.json', () => {
      const config = {
        _root: tempDir,
        icons: {
          input: './icons',
          jsonFile: 'icons.json'
        }
      };

      const result = getIconsPath(config);
      expect(result).toBe(path.join(tempDir, 'icons', 'icons.json'));
    });

    it('should use process.cwd() when _root is not defined', () => {
      const config = {
        icons: {
          input: './icons',
          jsonFile: 'icons.json'
        }
      };

      const result = getIconsPath(config);
      expect(result).toBe(path.join(process.cwd(), 'icons', 'icons.json'));
    });
  });

  describe('getOutputPath', () => {
    it('should return correct output path', () => {
      const config = {
        _root: tempDir,
        icons: {
          output: './src/icons/index.ts'
        }
      };

      const result = getOutputPath(config);
      expect(result).toBe(path.join(tempDir, 'src', 'icons', 'index.ts'));
    });
  });

  describe('ensureIconsDir', () => {
    it('should create icons directory if it does not exist', () => {
      const config = {
        _root: tempDir,
        icons: {
          input: './icons',
          jsonFile: 'icons.json'
        }
      };

      const iconsDir = path.join(tempDir, 'icons');
      expect(fs.existsSync(iconsDir)).toBe(false);

      ensureIconsDir(config);

      expect(fs.existsSync(iconsDir)).toBe(true);
    });

    it('should create empty icons.json if it does not exist', () => {
      const config = {
        _root: tempDir,
        icons: {
          input: './icons',
          jsonFile: 'icons.json'
        }
      };

      ensureIconsDir(config);

      const iconsJsonPath = path.join(tempDir, 'icons', 'icons.json');
      expect(fs.existsSync(iconsJsonPath)).toBe(true);

      const content = fs.readFileSync(iconsJsonPath, 'utf-8');
      expect(content).toBe('{}');
    });

    it('should not overwrite existing icons.json', () => {
      const config = {
        _root: tempDir,
        icons: {
          input: './icons',
          jsonFile: 'icons.json'
        }
      };

      const iconsDir = path.join(tempDir, 'icons');
      fs.mkdirSync(iconsDir, { recursive: true });

      const iconsJsonPath = path.join(iconsDir, 'icons.json');
      const existingContent = '{"existing": "icon"}';
      fs.writeFileSync(iconsJsonPath, existingContent, 'utf-8');

      ensureIconsDir(config);

      const content = fs.readFileSync(iconsJsonPath, 'utf-8');
      expect(content).toBe(existingContent);
    });
  });

  describe('saveConfig', () => {
    it('should save config to file', () => {
      const config = {
        icons: {
          input: './my-icons',
          output: './my-icons/index.ts',
          jsonFile: 'my-icons.json'
        }
      };

      saveConfig(config, tempDir);

      const configPath = path.join(tempDir, CONFIG_FILENAME);
      expect(fs.existsSync(configPath)).toBe(true);

      const savedConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
      expect(savedConfig.icons.input).toBe('./my-icons');
    });

    it('should not save internal _root property', () => {
      const config = {
        _root: tempDir,
        _isLibrary: true,
        icons: {
          input: './icons'
        }
      };

      saveConfig(config, tempDir);

      const configPath = path.join(tempDir, CONFIG_FILENAME);
      const savedConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

      // Only _root is removed by saveConfig, _isLibrary might be preserved
      // as it's a valid user-configurable option
      expect(savedConfig._root).toBeUndefined();
      expect(savedConfig.icons.input).toBe('./icons');
    });
  });
});
