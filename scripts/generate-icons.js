/**
 * Script para generar icons.ts desde icons.json
 *
 * Uso: node scripts/generate-icons.js
 *
 * Este script lee icons.json (fuente de verdad) y genera
 * el archivo TypeScript con tipado completo.
 */

const fs = require('fs');
const path = require('path');

const ICONS_JSON = path.join(__dirname, '../src/components/svg-icon/icons/icons.json');
const ICONS_TS = path.join(__dirname, '../src/components/svg-icon/icons/index.ts');

function generateIconsTS() {
  // Leer JSON
  const iconsData = JSON.parse(fs.readFileSync(ICONS_JSON, 'utf-8'));
  const iconNames = Object.keys(iconsData);

  console.log(`📦 Generando icons.ts con ${iconNames.length} iconos...`);

  // Generar contenido TypeScript
  let content = `/**
 * SVG Icon Library - Centralized icon definitions
 *
 * ⚠️  ARCHIVO AUTO-GENERADO - NO EDITAR MANUALMENTE
 *
 * Para añadir/modificar iconos, edita: icons.json
 * Luego ejecuta: npm run generate-icons
 *
 * Generado: ${new Date().toISOString()}
 */

export interface IconDefinition {
  paths: string[];
  viewBox?: string;
  fillRule?: 'nonzero' | 'evenodd';
}

export const icons: Record<string, IconDefinition> = {\n`;

  // Añadir cada icono
  for (const [name, def] of Object.entries(iconsData)) {
    content += `  '${name}': {\n`;
    content += `    paths: [\n`;
    def.paths.forEach((p, i) => {
      content += `      '${p}'${i < def.paths.length - 1 ? ',' : ''}\n`;
    });
    content += `    ],\n`;

    if (def.viewBox && def.viewBox !== '0 0 24 24') {
      content += `    viewBox: '${def.viewBox}',\n`;
    }

    if (def.fillRule && def.fillRule !== 'nonzero') {
      content += `    fillRule: '${def.fillRule}',\n`;
    }

    content += `  },\n`;
  }

  content += `};

export type IconName = keyof typeof icons;

export const iconNames = Object.keys(icons) as IconName[];
`;

  // Escribir archivo
  fs.writeFileSync(ICONS_TS, content, 'utf-8');
  console.log(`✅ icons.ts generado con ${iconNames.length} iconos`);
  console.log(`   Ruta: ${ICONS_TS}`);
}

// Función para añadir un icono al JSON
function addIconToJSON(name, svgContent) {
  const iconsData = JSON.parse(fs.readFileSync(ICONS_JSON, 'utf-8'));

  // Parsear SVG
  const viewBoxMatch = svgContent.match(/viewBox=["']([^"']+)["']/);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';

  const paths = [];
  const pathRegex = /<path[^>]*d=["']([^"']+)["'][^>]*\/?>/g;
  let match;
  while ((match = pathRegex.exec(svgContent)) !== null) {
    paths.push(match[1]);
  }

  if (paths.length === 0) {
    console.error('❌ No se encontraron paths en el SVG');
    return false;
  }

  // Convertir a kebab-case
  const kebabName = name
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();

  // Crear definición
  const iconDef = { paths };
  if (viewBox !== '0 0 24 24') {
    iconDef.viewBox = viewBox;
  }

  const fillRuleMatch = svgContent.match(/fill-rule=["']([^"']+)["']/);
  if (fillRuleMatch && fillRuleMatch[1] !== 'nonzero') {
    iconDef.fillRule = fillRuleMatch[1];
  }

  // Añadir al objeto
  iconsData[kebabName] = iconDef;

  // Ordenar alfabéticamente
  const sorted = {};
  Object.keys(iconsData).sort().forEach(key => {
    sorted[key] = iconsData[key];
  });

  // Guardar JSON
  fs.writeFileSync(ICONS_JSON, JSON.stringify(sorted, null, 2), 'utf-8');
  console.log(`✅ Icono "${kebabName}" añadido a icons.json`);

  return true;
}

// CLI
const args = process.argv.slice(2);

if (args[0] === 'add' && args[1] && args[2]) {
  // Modo: añadir icono
  // node scripts/generate-icons.js add <name> --file <path>
  const name = args[1];
  const fileIndex = args.indexOf('--file');

  if (fileIndex !== -1 && args[fileIndex + 1]) {
    const svgPath = args[fileIndex + 1];
    const svgContent = fs.readFileSync(svgPath, 'utf-8');

    if (addIconToJSON(name, svgContent)) {
      generateIconsTS();
    }
  } else if (args[2] && !args[2].startsWith('--')) {
    // SVG inline como argumento
    if (addIconToJSON(name, args[2])) {
      generateIconsTS();
    }
  } else {
    console.log('Uso: node scripts/generate-icons.js add <name> --file <svg-path>');
    console.log('  o: node scripts/generate-icons.js add <name> "<svg-content>"');
  }
} else {
  // Modo: solo generar
  generateIconsTS();
}
