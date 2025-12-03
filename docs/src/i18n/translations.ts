/**
 * i18n/translations.ts
 * Sistema de internacionalización para la documentación de SagedUI
 */

export const languages = {
  es: 'Español',
  en: 'English',
} as const;

export type Language = keyof typeof languages;

export const defaultLang: Language = 'es';

export const translations = {
  es: {
    // Navigation
    nav: {
      home: 'Inicio',
      components: 'Componentes',
      gettingStarted: 'Primeros pasos',
      theming: 'Temas',
      changelog: 'Cambios',
    },
    // Common
    common: {
      copy: 'Copiar',
      copied: '¡Copiado!',
      code: 'Código',
      showCode: 'Mostrar código',
      hideCode: 'Ocultar código',
      preview: 'Vista previa',
      example: 'Ejemplo',
      examples: 'Ejemplos',
      properties: 'Propiedades',
      property: 'Propiedad',
      type: 'Tipo',
      default: 'Por defecto',
      description: 'Descripción',
      required: 'Requerido',
      optional: 'Opcional',
      yes: 'Sí',
      no: 'No',
      usage: 'Uso',
      installation: 'Instalación',
      learnMore: 'Saber más',
      seeAll: 'Ver todos',
      backToTop: 'Volver arriba',
      search: 'Buscar...',
      darkMode: 'Modo oscuro',
      lightMode: 'Modo claro',
      toggleTheme: 'Cambiar tema',
      language: 'Idioma',
    },
    // Home page
    home: {
      title: 'SagedUI',
      subtitle: 'Librería de Web Components',
      description: 'Componentes modernos, accesibles y personalizables para crear interfaces elegantes.',
      heroTagline: 'Diseño moderno. Accesibilidad integrada. Personalización total.',
      getStarted: 'Comenzar',
      viewComponents: 'Ver componentes',
      installWith: 'Instalar con',
      features: {
        title: 'Características',
        modern: {
          title: 'Moderno',
          description: 'Construido con Web Components estándar y Stencil.js',
        },
        accessible: {
          title: 'Accesible',
          description: 'Cumple con WCAG 2.1 y soporta navegación por teclado',
        },
        themeable: {
          title: 'Personalizable',
          description: 'Sistema de temas con CSS Custom Properties',
        },
        lightweight: {
          title: 'Ligero',
          description: 'Sin dependencias externas, tree-shaking automático',
        },
      },
    },
    // Components
    components: {
      title: 'Componentes',
      description: 'Explora nuestra colección de componentes',
      // Button
      button: {
        name: 'Button',
        description: 'Botón interactivo con múltiples variantes y estados.',
        variants: 'Variantes',
        sizes: 'Tamaños',
        shapes: 'Formas',
        fullWidth: 'Ancho completo',
        withIcons: 'Con iconos',
        states: 'Estados',
        combinations: 'Combinaciones',
        loading: 'Cargando',
        disabled: 'Deshabilitado',
      },
      // Badge
      badge: {
        name: 'Badge',
        description: 'Etiqueta visual para mostrar estados o contadores.',
        colors: 'Colores',
        sizes: 'Tamaños',
        variants: 'Variantes',
      },
      // Skeleton
      skeleton: {
        name: 'Skeleton',
        description: 'Placeholder de carga para contenido.',
        shapes: 'Formas',
        animation: 'Animación',
      },
      // Dropdown
      dropdown: {
        name: 'Dropdown',
        description: 'Menú desplegable para acciones o navegación.',
        placement: 'Posición',
        triggers: 'Disparadores',
      },
      // Theme Toggle
      themeToggle: {
        name: 'Theme Toggle',
        description: 'Interruptor para cambiar entre modo claro y oscuro.',
      },
      // Icon
      icon: {
        name: 'Icon',
        description: 'Sistema de iconos SVG optimizado.',
      },
      // Article Editor
      articleEditor: {
        name: 'Article Editor',
        description: 'Editor de artículos con soporte para Markdown.',
      },
    },
    // Footer
    footer: {
      madeWith: 'Hecho con',
      by: 'por',
      rights: 'Todos los derechos reservados.',
    },
    // Design Tokens page
    tokens: {
      title: 'Design Tokens',
      description: 'Variables CSS para mantener consistencia visual en tu proyecto.',
      subtitle: 'Colores, tipografía, espaciado y efectos listos para usar.',
      back: 'Volver',
      // Navigation
      colors: 'Colores',
      typography: 'Tipografía',
      spacing: 'Espaciado',
      effects: 'Efectos',
      // Sections
      installation: 'Instalación',
      installDesc: 'Los tokens se incluyen automáticamente con los componentes. También puedes importarlos por separado:',
      jsImport: 'JavaScript / Bundler',
      htmlCdn: 'HTML (CDN)',
      cssImport: 'CSS @import',
      usage: 'Uso en CSS',
      // Color groups
      accent: 'Acento',
      backgrounds: 'Fondos',
      text: 'Texto',
      borders: 'Bordes',
      semantic: 'Semánticos',
      // Typography
      families: 'Familias',
      sizes: 'Tamaños',
      size: 'Tamaño',
      pixels: 'Pixels',
      use: 'Uso',
      preview: 'Preview',
      // Effects
      borderRadius: 'Border Radius',
      shadows: 'Sombras',
      transitions: 'Transiciones',
      hoverMe: 'Hover me',
      // Figma
      figmaTitle: 'Figma Library',
      figmaDesc: 'Descarga el archivo Figma con todos los tokens sincronizados para mantener consistencia entre diseño y desarrollo.',
      comingSoon: 'Próximamente',
    },
  },
  en: {
    // Navigation
    nav: {
      home: 'Home',
      components: 'Components',
      gettingStarted: 'Getting Started',
      theming: 'Theming',
      changelog: 'Changelog',
    },
    // Common
    common: {
      copy: 'Copy',
      copied: 'Copied!',
      code: 'Code',
      showCode: 'Show code',
      hideCode: 'Hide code',
      preview: 'Preview',
      example: 'Example',
      examples: 'Examples',
      properties: 'Properties',
      property: 'Property',
      type: 'Type',
      default: 'Default',
      description: 'Description',
      required: 'Required',
      optional: 'Optional',
      yes: 'Yes',
      no: 'No',
      usage: 'Usage',
      installation: 'Installation',
      learnMore: 'Learn more',
      seeAll: 'See all',
      backToTop: 'Back to top',
      search: 'Search...',
      darkMode: 'Dark mode',
      lightMode: 'Light mode',
      toggleTheme: 'Toggle theme',
      language: 'Language',
    },
    // Home page
    home: {
      title: 'SagedUI',
      subtitle: 'Web Components Library',
      description: 'Modern, accessible and customizable components for building elegant interfaces.',
      heroTagline: 'Modern design. Built-in accessibility. Full customization.',
      getStarted: 'Get Started',
      viewComponents: 'View Components',
      installWith: 'Install with',
      features: {
        title: 'Features',
        modern: {
          title: 'Modern',
          description: 'Built with standard Web Components and Stencil.js',
        },
        accessible: {
          title: 'Accessible',
          description: 'WCAG 2.1 compliant with keyboard navigation support',
        },
        themeable: {
          title: 'Themeable',
          description: 'Theming system with CSS Custom Properties',
        },
        lightweight: {
          title: 'Lightweight',
          description: 'No external dependencies, automatic tree-shaking',
        },
      },
    },
    // Components
    components: {
      title: 'Components',
      description: 'Explore our component collection',
      // Button
      button: {
        name: 'Button',
        description: 'Interactive button with multiple variants and states.',
        variants: 'Variants',
        sizes: 'Sizes',
        shapes: 'Shapes',
        fullWidth: 'Full Width',
        withIcons: 'With Icons',
        states: 'States',
        combinations: 'Combinations',
        loading: 'Loading',
        disabled: 'Disabled',
      },
      // Badge
      badge: {
        name: 'Badge',
        description: 'Visual label for displaying states or counters.',
        colors: 'Colors',
        sizes: 'Sizes',
        variants: 'Variants',
      },
      // Skeleton
      skeleton: {
        name: 'Skeleton',
        description: 'Loading placeholder for content.',
        shapes: 'Shapes',
        animation: 'Animation',
      },
      // Dropdown
      dropdown: {
        name: 'Dropdown',
        description: 'Dropdown menu for actions or navigation.',
        placement: 'Placement',
        triggers: 'Triggers',
      },
      // Theme Toggle
      themeToggle: {
        name: 'Theme Toggle',
        description: 'Switch between light and dark mode.',
      },
      // Icon
      icon: {
        name: 'Icon',
        description: 'Optimized SVG icon system.',
      },
      // Article Editor
      articleEditor: {
        name: 'Article Editor',
        description: 'Article editor with Markdown support.',
      },
    },
    // Footer
    footer: {
      madeWith: 'Made with',
      by: 'by',
      rights: 'All rights reserved.',
    },
    // Design Tokens page
    tokens: {
      title: 'Design Tokens',
      description: 'CSS variables to maintain visual consistency in your project.',
      subtitle: 'Colors, typography, spacing and effects ready to use.',
      back: 'Back',
      // Navigation
      colors: 'Colors',
      typography: 'Typography',
      spacing: 'Spacing',
      effects: 'Effects',
      // Sections
      installation: 'Installation',
      installDesc: 'Tokens are automatically included with the components. You can also import them separately:',
      jsImport: 'JavaScript / Bundler',
      htmlCdn: 'HTML (CDN)',
      cssImport: 'CSS @import',
      usage: 'CSS Usage',
      // Color groups
      accent: 'Accent',
      backgrounds: 'Backgrounds',
      text: 'Text',
      borders: 'Borders',
      semantic: 'Semantic',
      // Typography
      families: 'Families',
      sizes: 'Sizes',
      size: 'Size',
      pixels: 'Pixels',
      use: 'Use',
      preview: 'Preview',
      // Effects
      borderRadius: 'Border Radius',
      shadows: 'Shadows',
      transitions: 'Transitions',
      hoverMe: 'Hover me',
      // Figma
      figmaTitle: 'Figma Library',
      figmaDesc: 'Download the Figma file with all synced tokens to maintain consistency between design and development.',
      comingSoon: 'Coming Soon',
    },
  },
} as const;

export type Translations = typeof translations.es;

/**
 * Get translation function for a specific language
 */
export function useTranslations(lang: Language = defaultLang) {
  return translations[lang] || translations[defaultLang];
}

/**
 * Get a nested translation value by path
 */
export function t(lang: Language, path: string): string {
  const keys = path.split('.');
  let value: any = translations[lang] || translations[defaultLang];
  
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      return path; // Return path if translation not found
    }
  }
  
  return typeof value === 'string' ? value : path;
}
