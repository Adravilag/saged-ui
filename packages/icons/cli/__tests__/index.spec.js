/**
 * Tests for CLI Main Entry Point
 */

const cli = require('../index');

describe('CLI Module Exports', () => {
  describe('commands', () => {
    it('should export icons command', () => {
      expect(cli.commands.icons).toBeDefined();
      expect(typeof cli.commands.icons).toBe('function');
    });

    it('should export iconSets command', () => {
      expect(cli.commands.iconSets).toBeDefined();
      expect(typeof cli.commands.iconSets).toBe('function');
    });

    it('should export init command', () => {
      expect(cli.commands.init).toBeDefined();
      expect(typeof cli.commands.init).toBe('function');
    });
  });

  describe('utils', () => {
    it('should export config utilities', () => {
      expect(cli.utils.config).toBeDefined();
      expect(cli.utils.config.loadConfig).toBeDefined();
      expect(cli.utils.config.getIconsPath).toBeDefined();
      expect(cli.utils.config.ensureIconsDir).toBeDefined();
    });

    it('should export svgParser utilities', () => {
      expect(cli.utils.svgParser).toBeDefined();
      expect(cli.utils.svgParser.parseSVG).toBeDefined();
      expect(cli.utils.svgParser.parseSpriteSVG).toBeDefined();
    });

    it('should export svgOptimizer utilities', () => {
      expect(cli.utils.svgOptimizer).toBeDefined();
    });

    it('should export iconServer utilities', () => {
      expect(cli.utils.iconServer).toBeDefined();
    });
  });

  describe('plugins', () => {
    it('should export vite plugin', () => {
      expect(cli.plugins.vite).toBeDefined();
    });
  });
});

describe('CLI Integration', () => {
  it('should be importable as a module', () => {
    const imported = require('../index');
    expect(imported).toBeDefined();
    expect(imported.commands).toBeDefined();
    expect(imported.utils).toBeDefined();
    expect(imported.plugins).toBeDefined();
  });

  it('should have consistent structure', () => {
    const structure = {
      commands: ['icons', 'iconSets', 'init'],
      utils: ['config', 'svgParser', 'svgOptimizer', 'iconServer'],
      plugins: ['vite']
    };

    expect(Object.keys(cli.commands).sort()).toEqual(structure.commands.sort());
    expect(Object.keys(cli.utils).sort()).toEqual(structure.utils.sort());
    expect(Object.keys(cli.plugins).sort()).toEqual(structure.plugins.sort());
  });
});
