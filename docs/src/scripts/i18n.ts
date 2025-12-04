/**
 * i18n.ts
 * Client-side internationalization helper
 * Updates UI elements with data-i18n attributes based on saved language
 */

const LANG_KEY = 'saged-lang';

type Language = 'es' | 'en';

// Inline translations for client-side use (to avoid import issues)
const translations: Record<Language, Record<string, any>> = {
  es: {
    common: {
      copy: 'Copiar',
      copied: '¡Copiado!',
      code: 'Código',
      search: 'Buscar...',
    },
    nav: {
      components: 'Componentes',
      groups: {
        general: 'General',
        form: 'Formularios',
        feedback: 'Feedback',
        content: 'Contenido',
        utils: 'Utilidades',
      },
      items: {
        button: 'Botón',
        badge: 'Badge',
        icon: 'Icono',
        dropdown: 'Dropdown',
        skeleton: 'Skeleton',
        'article-editor': 'Editor de Artículos',
        'theme-toggle': 'Theme Toggle',
      },
    },
    home: {
      badge: 'Documentación',
      title: 'Componentes',
      description: 'Explora la colección completa de componentes SageBox. Cada componente está diseñado pensando en accesibilidad, rendimiento y personalización.',
      quickStart: 'Inicio Rápido',
      install: '1. Instalar',
      import: '2. Importar',
      use: '3. Usar',
    },
    stats: {
      components: 'Componentes',
      typescript: 'TypeScript',
      accessible: 'Accesible',
    },
    features: {
      treeShake: 'Tree-shakeable',
      cssVars: 'Variables CSS',
      wcag: 'WCAG 2.1',
      zeroDeps: 'Sin dependencias',
      darkMode: 'Modo oscuro',
      lazyLoad: 'Carga diferida',
    },
    components: {
      button: {
        title: 'Botón',
        description: 'Botón interactivo con múltiples variantes',
        variants: 'Variantes',
        sizes: 'Tamaños',
        states: 'Estados',
      },
      badge: {
        title: 'Badge',
        description: 'Etiqueta visual para estados o contadores',
        colors: 'Variantes',
        sizes: 'Tamaños',
        features: 'Características',
      },
      icon: {
        title: 'Icono',
        description: 'Sistema de iconos SVG optimizado',
        basic: 'Básicos',
        sizes: 'Tamaños',
        colors: 'Colores',
      },
      dropdown: {
        title: 'Dropdown',
        description: 'Menú desplegable con opciones',
        basic: 'Básico',
        position: 'Posición',
      },
      skeleton: {
        title: 'Skeleton',
        description: 'Placeholder de carga',
        text: 'Texto',
        rectangle: 'Rectángulo',
        circle: 'Círculo',
        pulse: 'Animación Pulse',
        variants: 'Variantes',
      },
      editor: {
        title: 'Editor de Artículos',
        description: 'Editor WYSIWYG con soporte Markdown',
        basic: 'Básico',
      },
      themeToggle: {
        title: 'Theme Toggle',
        description: 'Interruptor de tema claro/oscuro',
        default: 'Por defecto',
      },
    },
    labels: {
      viewDocs: 'Ver docs',
      primary: 'Primario',
      secondary: 'Secundario',
      outline: 'Contorno',
      ghost: 'Fantasma',
      danger: 'Peligro',
      small: 'Pequeño',
      medium: 'Mediano',
      large: 'Grande',
      disabled: 'Deshabilitado',
      loading: 'Cargando',
    },
    tokens: {
      title: 'Design Tokens',
      description: 'Variables CSS para mantener consistencia visual en tu proyecto.',
      subtitle: 'Colores, tipografía, espaciado y efectos listos para usar.',
      back: 'Volver',
      colors: 'Colores',
      typography: 'Tipografía',
      spacing: 'Espaciado',
      effects: 'Efectos',
      installation: 'Instalación',
      installDesc: 'Los tokens se incluyen automáticamente con los componentes. También puedes importarlos por separado:',
      jsImport: 'JavaScript / Bundler',
      htmlCdn: 'HTML (CDN)',
      cssImport: 'CSS @import',
      usage: 'Uso en CSS',
      accent: 'Acento',
      backgrounds: 'Fondos',
      text: 'Texto',
      borders: 'Bordes',
      semantic: 'Semánticos',
      families: 'Familias',
      sizes: 'Tamaños',
      size: 'Tamaño',
      pixels: 'Pixels',
      use: 'Uso',
      preview: 'Preview',
      borderRadius: 'Border Radius',
      shadows: 'Sombras',
      transitions: 'Transiciones',
      hoverMe: 'Hover me',
      figmaTitle: 'Figma Library',
      figmaDesc: 'Descarga el archivo Figma con todos los tokens sincronizados para mantener consistencia entre diseño y desarrollo.',
      comingSoon: 'Próximamente - CDN aún no disponible',
    },
    about: {
      title: 'Sobre SageBox',
      description: 'Una librería de Web Components moderna, accesible y altamente personalizable construida con Stencil.js.',
      mission: 'Nuestra Misión',
      missionText: 'SageBox fue creado para proporcionar a los desarrolladores un conjunto de componentes UI de alta calidad, accesibles y agnósticos de framework.',
      missionText2: 'Creemos que los buenos componentes UI deberían funcionar en todas partes, ser fáciles de personalizar y no obligarte a usar ningún framework en particular.',
      features: 'Características',
      team: 'Equipo',
      contributing: 'Contribuir',
      contributingText: 'SageBox es código abierto y damos la bienvenida a contribuciones. Ya sea corrigiendo bugs, añadiendo nuevas funcionalidades o mejorando la documentación.',
      license: 'Licencia MIT',
      licenseText: 'SageBox está liberado bajo la Licencia MIT. Puedes usarlo en proyectos personales y comerciales.',
      stats: {
        components: 'Componentes',
        typescript: 'TypeScript',
        dependencies: 'Dependencias',
        license: 'Licencia',
      },
      featuresList: {
        webComponents: 'Web Components',
        webComponentsDesc: 'Construido con Stencil.js para máxima compatibilidad entre frameworks.',
        accessibility: 'Accesibilidad Primero',
        accessibilityDesc: 'Compatible con WCAG 2.1 con navegación completa por teclado y soporte para lectores de pantalla.',
        themeable: 'Personalizable',
        themeableDesc: 'CSS Custom Properties para fácil personalización y soporte de modo oscuro.',
        lightweight: 'Ligero',
        lightweightDesc: 'Sin dependencias, tree-shakeable y optimizado para rendimiento.',
        typescript: 'TypeScript',
        typescriptDesc: 'Soporte completo de TypeScript con definiciones de tipos auto-generadas.',
        frameworkAgnostic: 'Agnóstico de Framework',
        frameworkAgnosticDesc: 'Funciona con React, Vue, Angular o JavaScript vanilla.',
      },
    },
  },
  en: {
    common: {
      copy: 'Copy',
      copied: 'Copied!',
      code: 'Code',
      search: 'Search...',
    },
    nav: {
      components: 'Components',
      groups: {
        general: 'General',
        form: 'Forms',
        feedback: 'Feedback',
        content: 'Content',
        utils: 'Utilities',
      },
      items: {
        button: 'Button',
        badge: 'Badge',
        icon: 'Icon',
        dropdown: 'Dropdown',
        skeleton: 'Skeleton',
        'article-editor': 'Article Editor',
        'theme-toggle': 'Theme Toggle',
      },
    },
    home: {
      badge: 'Documentation',
      title: 'Components',
      description: 'Explore the complete collection of SageBox components. Each component is designed with accessibility, performance, and customization in mind.',
      quickStart: 'Quick Start',
      install: '1. Install',
      import: '2. Import',
      use: '3. Use',
    },
    stats: {
      components: 'Components',
      typescript: 'TypeScript',
      accessible: 'Accessible',
    },
    features: {
      treeShake: 'Tree-shakeable',
      cssVars: 'CSS Variables',
      wcag: 'WCAG 2.1',
      zeroDeps: 'Zero deps',
      darkMode: 'Dark mode',
      lazyLoad: 'Lazy loading',
    },
    components: {
      button: {
        title: 'Button',
        description: 'Interactive button with multiple variants',
        variants: 'Variants',
        sizes: 'Sizes',
        states: 'States',
      },
      badge: {
        title: 'Badge',
        description: 'Visual label for states or counters',
        colors: 'Variants',
        sizes: 'Sizes',
        features: 'Features',
      },
      icon: {
        title: 'Icon',
        description: 'Optimized SVG icon system',
        basic: 'Basics',
        sizes: 'Sizes',
        colors: 'Colors',
      },
      dropdown: {
        title: 'Dropdown',
        description: 'Dropdown menu with options',
        basic: 'Basic',
        position: 'Position',
      },
      skeleton: {
        title: 'Skeleton',
        description: 'Loading placeholder',
        text: 'Text',
        rectangle: 'Rectangle',
        circle: 'Circle',
        pulse: 'Pulse Animation',
        variants: 'Variants',
      },
      editor: {
        title: 'Article Editor',
        description: 'WYSIWYG editor with Markdown support',
        basic: 'Basic',
      },
      themeToggle: {
        title: 'Theme Toggle',
        description: 'Light/dark theme switch',
        default: 'Default',
      },
    },
    labels: {
      viewDocs: 'View docs',
      primary: 'Primary',
      secondary: 'Secondary',
      outline: 'Outline',
      ghost: 'Ghost',
      danger: 'Danger',
      small: 'Small',
      medium: 'Medium',
      large: 'Large',
      disabled: 'Disabled',
      loading: 'Loading',
    },
    tokens: {
      title: 'Design Tokens',
      description: 'CSS variables to maintain visual consistency in your project.',
      subtitle: 'Colors, typography, spacing and effects ready to use.',
      back: 'Back',
      colors: 'Colors',
      typography: 'Typography',
      spacing: 'Spacing',
      effects: 'Effects',
      installation: 'Installation',
      installDesc: 'Tokens are automatically included with the components. You can also import them separately:',
      jsImport: 'JavaScript / Bundler',
      htmlCdn: 'HTML (CDN)',
      cssImport: 'CSS @import',
      usage: 'CSS Usage',
      accent: 'Accent',
      backgrounds: 'Backgrounds',
      text: 'Text',
      borders: 'Borders',
      semantic: 'Semantic',
      families: 'Families',
      sizes: 'Sizes',
      size: 'Size',
      pixels: 'Pixels',
      use: 'Use',
      preview: 'Preview',
      borderRadius: 'Border Radius',
      shadows: 'Shadows',
      transitions: 'Transitions',
      hoverMe: 'Hover me',
      figmaTitle: 'Figma Library',
      figmaDesc: 'Download the Figma file with all synced tokens to maintain consistency between design and development.',
      comingSoon: 'Coming soon - CDN not available yet',
    },
    about: {
      title: 'About SageBox',
      description: 'A modern, accessible, and highly customizable Web Components library built with Stencil.js.',
      mission: 'Our Mission',
      missionText: 'SageBox was created to provide developers with a set of high-quality, accessible, and framework-agnostic UI components.',
      missionText2: 'We believe that great UI components should work everywhere, be easy to customize, and not force you into any particular framework.',
      features: 'Key Features',
      team: 'Team',
      contributing: 'Contributing',
      contributingText: 'SageBox is open source and we welcome contributions! Whether it\'s fixing bugs, adding new features, or improving documentation.',
      license: 'MIT License',
      licenseText: 'SageBox is released under the MIT License. You\'re free to use it in personal and commercial projects.',
      stats: {
        components: 'Components',
        typescript: 'TypeScript',
        dependencies: 'Dependencies',
        license: 'License',
      },
      featuresList: {
        webComponents: 'Web Components',
        webComponentsDesc: 'Built with Stencil.js for maximum compatibility across frameworks.',
        accessibility: 'Accessibility First',
        accessibilityDesc: 'WCAG 2.1 compliant with full keyboard navigation and screen reader support.',
        themeable: 'Themeable',
        themeableDesc: 'CSS Custom Properties for easy customization and dark mode support.',
        lightweight: 'Lightweight',
        lightweightDesc: 'Zero dependencies, tree-shakeable, and optimized for performance.',
        typescript: 'TypeScript',
        typescriptDesc: 'Full TypeScript support with auto-generated type definitions.',
        frameworkAgnostic: 'Framework Agnostic',
        frameworkAgnosticDesc: 'Works with React, Vue, Angular, or vanilla JavaScript.',
      },
    },
  },
};

// Get current language
export function getCurrentLang(): Language {
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === 'es' || saved === 'en') {
      return saved;
    }
  } catch {}
  return 'es';
}

// Get translation by path
export function t(path: string, lang?: Language): string {
  const currentLang = lang || getCurrentLang();
  const keys = path.split('.');
  let value: any = translations[currentLang];
  
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      return path;
    }
  }
  
  return typeof value === 'string' ? value : path;
}

// Update all elements with data-i18n attribute
export function updateI18n() {
  const lang = getCurrentLang();
  
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const path = el.getAttribute('data-i18n');
    if (path) {
      const translated = t(path, lang);
      if (el.hasAttribute('data-i18n-attr')) {
        const attr = el.getAttribute('data-i18n-attr')!;
        el.setAttribute(attr, translated);
      } else {
        el.textContent = translated;
      }
    }
  });

  // Update html lang attribute
  document.documentElement.setAttribute('lang', lang);
}

// Auto-initialize
if (typeof window !== 'undefined') {
  // Update on page load
  document.addEventListener('DOMContentLoaded', updateI18n);
  
  // Also run immediately if DOM is already loaded
  if (document.readyState !== 'loading') {
    updateI18n();
  }
}
