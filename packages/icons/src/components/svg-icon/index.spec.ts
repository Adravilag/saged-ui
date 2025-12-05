import { registerIcons, registerIcon, getRegisteredIcons, hasRegisteredIcon } from './index';

describe('svg-icon/index', () => {
  // Note: _userIcons is module-level state, so tests share state
  // We test behavior, not initial state

  describe('registerIcons', () => {
    it('should register multiple icons', () => {
      const icons = {
        'test-icon-1': '<svg viewBox="0 0 24 24"><path d="M1"/></svg>',
        'test-icon-2': '<svg viewBox="0 0 24 24"><path d="M2"/></svg>',
      };

      registerIcons(icons);

      const registered = getRegisteredIcons();
      expect(registered['test-icon-1']).toBe(icons['test-icon-1']);
      expect(registered['test-icon-2']).toBe(icons['test-icon-2']);
    });

    it('should merge with existing icons', () => {
      registerIcons({ 'merge-first-icon': '<svg>1</svg>' });
      registerIcons({ 'merge-second-icon': '<svg>2</svg>' });

      const registered = getRegisteredIcons();
      expect(registered['merge-first-icon']).toBe('<svg>1</svg>');
      expect(registered['merge-second-icon']).toBe('<svg>2</svg>');
    });
  });

  describe('registerIcon', () => {
    it('should register a single icon', () => {
      registerIcon('single-icon', '<svg viewBox="0 0 24 24"><circle/></svg>');

      const registered = getRegisteredIcons();
      expect(registered['single-icon']).toBe('<svg viewBox="0 0 24 24"><circle/></svg>');
    });

    it('should overwrite existing icon with same name', () => {
      registerIcon('overwrite-icon', '<svg>old</svg>');
      registerIcon('overwrite-icon', '<svg>new</svg>');

      const registered = getRegisteredIcons();
      expect(registered['overwrite-icon']).toBe('<svg>new</svg>');
    });
  });

  describe('getRegisteredIcons', () => {
    it('should return registered icons', () => {
      registerIcon('get-test-icon', '<svg/>');

      const registered = getRegisteredIcons();
      expect(registered['get-test-icon']).toBe('<svg/>');
    });

    it('should return a copy of registered icons', () => {
      registerIcon('copy-test', '<svg/>');

      const registered1 = getRegisteredIcons();
      const registered2 = getRegisteredIcons();

      expect(registered1).not.toBe(registered2);
      expect(registered1).toEqual(registered2);
    });
  });

  describe('hasRegisteredIcon', () => {
    it('should return true for registered icon', () => {
      registerIcon('has-exists', '<svg/>');

      expect(hasRegisteredIcon('has-exists')).toBe(true);
    });

    it('should return false for non-registered icon', () => {
      expect(hasRegisteredIcon('definitely-not-exists-xyz')).toBe(false);
    });
  });
});
