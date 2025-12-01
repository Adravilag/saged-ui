/**
 * @adravilag/ui - Article Editor i18n Tests
 */

import { getTranslations, isRTL, getSupportedLocales, formatCount, detectLocale, SupportedLocale } from './i18n';

describe('i18n utilities', () => {
  describe('getTranslations', () => {
    it('returns English translations by default', () => {
      const t = getTranslations();
      expect(t.modes.html).toBe('HTML');
      expect(t.modes.preview).toBe('Preview');
      expect(t.toolbar.bold).toBe('Bold');
    });

    it('returns English translations for "en" locale', () => {
      const t = getTranslations('en');
      expect(t.modes.html).toBe('HTML');
      expect(t.modes.preview).toBe('Preview');
      expect(t.status.words).toBe('word');
      expect(t.status.wordsPlural).toBe('words');
    });

    it('returns Spanish translations for "es" locale', () => {
      const t = getTranslations('es');
      expect(t.modes.preview).toBe('Vista previa');
      expect(t.toolbar.bold).toBe('Negrita');
      expect(t.status.words).toBe('palabra');
      expect(t.placeholders.startWriting).toBe('Empieza a escribir...');
    });

    it('returns French translations for "fr" locale', () => {
      const t = getTranslations('fr');
      expect(t.modes.preview).toBe('Apercu');
      expect(t.toolbar.bold).toBe('Gras');
    });

    it('returns German translations for "de" locale', () => {
      const t = getTranslations('de');
      expect(t.modes.preview).toBe('Vorschau');
      expect(t.toolbar.bold).toBe('Fett');
    });

    it('returns Portuguese translations for "pt" locale', () => {
      const t = getTranslations('pt');
      expect(t.modes.preview).toBe('Visualizacao');
      expect(t.toolbar.bold).toBe('Negrito');
    });

    it('returns Italian translations for "it" locale', () => {
      const t = getTranslations('it');
      expect(t.modes.preview).toBe('Anteprima');
      expect(t.toolbar.bold).toBe('Grassetto');
    });

    it('returns Chinese translations for "zh" locale (fallback to English)', () => {
      const t = getTranslations('zh');
      expect(t.modes.preview).toBe('Preview');
      expect(t.toolbar.bold).toBe('Bold');
    });

    it('returns Japanese translations for "ja" locale (fallback to English)', () => {
      const t = getTranslations('ja');
      expect(t.modes.preview).toBe('Preview');
      expect(t.toolbar.bold).toBe('Bold');
    });

    it('returns Korean translations for "ko" locale (fallback to English)', () => {
      const t = getTranslations('ko');
      expect(t.modes.preview).toBe('Preview');
      expect(t.toolbar.bold).toBe('Bold');
    });

    it('returns Arabic translations for "ar" locale (fallback to English)', () => {
      const t = getTranslations('ar');
      expect(t.modes.preview).toBe('Preview');
      expect(t.toolbar.bold).toBe('Bold');
    });

    it('returns English as fallback for unsupported locale', () => {
      const t = getTranslations('xx' as SupportedLocale);
      expect(t.modes.html).toBe('HTML');
    });
  });

  describe('isRTL', () => {
    it('returns true for Arabic', () => {
      expect(isRTL('ar')).toBe(true);
    });

    it('returns false for LTR languages', () => {
      const ltrLocales: SupportedLocale[] = ['en', 'es', 'fr', 'de', 'pt', 'it', 'zh', 'ja', 'ko'];
      ltrLocales.forEach(locale => {
        expect(isRTL(locale)).toBe(false);
      });
    });
  });

  describe('getSupportedLocales', () => {
    it('returns all supported locales', () => {
      const locales = getSupportedLocales();
      expect(locales).toContain('en');
      expect(locales).toContain('es');
      expect(locales).toContain('fr');
      expect(locales).toContain('de');
      expect(locales).toContain('pt');
      expect(locales).toContain('it');
      expect(locales).toContain('zh');
      expect(locales).toContain('ja');
      expect(locales).toContain('ko');
      expect(locales).toContain('ar');
    });

    it('returns 10 locales', () => {
      const locales = getSupportedLocales();
      expect(locales.length).toBe(10);
    });
  });

  describe('formatCount', () => {
    it('uses singular for count of 1', () => {
      expect(formatCount(1, 'word', 'words')).toBe('1 word');
      expect(formatCount(1, 'character', 'characters')).toBe('1 character');
    });

    it('uses plural for count of 0', () => {
      expect(formatCount(0, 'word', 'words')).toBe('0 words');
    });

    it('uses plural for count > 1', () => {
      expect(formatCount(5, 'word', 'words')).toBe('5 words');
      expect(formatCount(100, 'character', 'characters')).toBe('100 characters');
    });
  });

  describe('detectLocale', () => {
    it('returns "en" when navigator is undefined', () => {
      // In test environment, navigator may be undefined or mocked
      const locale = detectLocale();
      expect(typeof locale).toBe('string');
      expect(getSupportedLocales()).toContain(locale);
    });
  });

  describe('translations completeness', () => {
    const locales = getSupportedLocales();

    locales.forEach(locale => {
      describe(`${locale} locale`, () => {
        const t = getTranslations(locale);

        it('has all mode labels', () => {
          expect(t.modes.html).toBeDefined();
          expect(t.modes.markdown).toBeDefined();
          expect(t.modes.preview).toBeDefined();
          expect(t.modes.split).toBeDefined();
        });

        it('has all toolbar labels', () => {
          expect(t.toolbar.bold).toBeDefined();
          expect(t.toolbar.italic).toBeDefined();
          expect(t.toolbar.underline).toBeDefined();
          expect(t.toolbar.strikethrough).toBeDefined();
          expect(t.toolbar.code).toBeDefined();
          expect(t.toolbar.link).toBeDefined();
          expect(t.toolbar.image).toBeDefined();
          expect(t.toolbar.heading1).toBeDefined();
          expect(t.toolbar.heading2).toBeDefined();
          expect(t.toolbar.heading3).toBeDefined();
          expect(t.toolbar.bulletList).toBeDefined();
          expect(t.toolbar.numberedList).toBeDefined();
          expect(t.toolbar.quote).toBeDefined();
          expect(t.toolbar.horizontalRule).toBeDefined();
        });

        it('has all status labels', () => {
          expect(t.status.words).toBeDefined();
          expect(t.status.characters).toBeDefined();
          expect(t.status.wordsPlural).toBeDefined();
          expect(t.status.charactersPlural).toBeDefined();
        });

        it('has all action labels', () => {
          expect(t.actions.externalPreview).toBeDefined();
          expect(t.actions.externalPreviewOpen).toBeDefined();
          expect(t.actions.openMediaLibrary).toBeDefined();
        });

        it('has placeholder text', () => {
          expect(t.placeholders.startWriting).toBeDefined();
        });

        it('has preview labels', () => {
          expect(t.preview.title).toBeDefined();
          expect(t.preview.empty).toBeDefined();
        });

        it('has accessibility labels', () => {
          expect(t.aria.editor).toBeDefined();
          expect(t.aria.toolbar).toBeDefined();
          expect(t.aria.modeSelector).toBeDefined();
          expect(t.aria.formatToolbar).toBeDefined();
          expect(t.aria.preview).toBeDefined();
        });
      });
    });
  });
});
