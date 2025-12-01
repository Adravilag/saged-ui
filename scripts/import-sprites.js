/**
 * Script para importar iconos desde un archivo sprites.svg al sistema de iconos
 *
 * Uso: node scripts/import-sprites.js <ruta-sprites.svg>
 * Ejemplo: node scripts/import-sprites.js ../MediQ-Monorepo/frontend/public/sprites.svg
 */

const fs = require('fs');
const path = require('path');

// Rutas
const ICONS_JSON_PATH = path.join(__dirname, '..', 'src', 'components', 'svg-icon', 'icons', 'icons.json');

/**
 * Parsea un archivo SVG sprite y extrae los symbols
 * @param {string} svgContent - Contenido del archivo SVG
 * @returns {Object} - Objeto con los iconos extraídos
 */
function parseSpritesSVG(svgContent) {
  const icons = {};

  // Regex para encontrar symbols
  const symbolRegex = /<symbol\s+([^>]*)>([\s\S]*?)<\/symbol>/gi;
  let symbolMatch;

  while ((symbolMatch = symbolRegex.exec(svgContent)) !== null) {
    const attributes = symbolMatch[1];
    const content = symbolMatch[2].trim();

    // Extraer id del symbol
    const idMatch = attributes.match(/id="([^"]+)"/);
    if (!idMatch) continue;

    let iconId = idMatch[1];

    // Remover prefijo "icon-" o "status-" si existe para el nombre
    let iconName = iconId;
    if (iconName.startsWith('icon-')) {
      iconName = iconName.substring(5);
    } else if (iconName.startsWith('status-')) {
      // Mantener el prefijo status- como parte del nombre
      iconName = iconName;
    }

    // Extraer viewBox
    const viewBoxMatch = attributes.match(/viewBox="([^"]+)"/);
    const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';

    // Extraer todos los paths
    const pathRegex = /<path\s+([^>]*)\/?>/gi;
    const paths = [];
    let pathMatch;

    while ((pathMatch = pathRegex.exec(content)) !== null) {
      const pathAttrs = pathMatch[1];
      const dMatch = pathAttrs.match(/d="([^"]+)"/);
      if (dMatch) {
        paths.push(dMatch[1]);
      }
    }

    // Extraer círculos y convertirlos a path si es necesario
    const circleRegex = /<circle\s+([^>]*)\/?>/gi;
    const circles = [];
    let circleMatch;

    while ((circleMatch = circleRegex.exec(content)) !== null) {
      const circleAttrs = circleMatch[1];
      const cxMatch = circleAttrs.match(/cx="([^"]+)"/);
      const cyMatch = circleAttrs.match(/cy="([^"]+)"/);
      const rMatch = circleAttrs.match(/r="([^"]+)"/);

      if (cxMatch && cyMatch && rMatch) {
        circles.push({
          cx: parseFloat(cxMatch[1]),
          cy: parseFloat(cyMatch[1]),
          r: parseFloat(rMatch[1])
        });
      }
    }

    // Solo agregar si tiene paths
    if (paths.length > 0) {
      const iconData = { paths };

      // Agregar viewBox si no es el estándar 0 0 24 24
      if (viewBox !== '0 0 24 24') {
        iconData.viewBox = viewBox;
      }

      // Agregar círculos si los hay
      if (circles.length > 0) {
        iconData.circles = circles;
      }

      icons[iconName] = iconData;
    }
  }

  return icons;
}

/**
 * Función principal
 */
async function main() {
  // Obtener ruta del archivo sprites.svg desde argumentos o usar ruta por defecto
  let spritesPath = process.argv[2];

  if (!spritesPath) {
    // Ruta por defecto
    spritesPath = path.join(__dirname, '..', '..', 'MediQ-Monorepo', 'frontend', 'public', 'sprites.svg');
  }

  // Resolver ruta absoluta
  spritesPath = path.resolve(spritesPath);

  console.log('📂 Buscando sprites en:', spritesPath);

  // Verificar que existe el archivo
  if (!fs.existsSync(spritesPath)) {
    console.error('❌ Error: No se encontró el archivo sprites.svg en:', spritesPath);
    process.exit(1);
  }

  // Leer el archivo sprites.svg
  console.log('📖 Leyendo archivo sprites.svg...');
  const svgContent = fs.readFileSync(spritesPath, 'utf-8');

  // Parsear los iconos
  console.log('🔍 Parseando symbols...');
  const newIcons = parseSpritesSVG(svgContent);
  const newIconCount = Object.keys(newIcons).length;
  console.log(`   Encontrados ${newIconCount} iconos en el sprite`);

  // Leer el archivo icons.json existente
  console.log('📖 Leyendo icons.json existente...');
  let existingIcons = {};
  if (fs.existsSync(ICONS_JSON_PATH)) {
    existingIcons = JSON.parse(fs.readFileSync(ICONS_JSON_PATH, 'utf-8'));
  }
  const existingCount = Object.keys(existingIcons).length;
  console.log(`   Existentes: ${existingCount} iconos`);

  // Merge de iconos (los nuevos sobrescriben los existentes si hay conflicto)
  const mergedIcons = { ...existingIcons, ...newIcons };
  const mergedCount = Object.keys(mergedIcons).length;
  const addedCount = mergedCount - existingCount;
  const replacedCount = newIconCount - addedCount;

  // Ordenar alfabéticamente
  const sortedIcons = {};
  Object.keys(mergedIcons).sort().forEach(key => {
    sortedIcons[key] = mergedIcons[key];
  });

  // Guardar el archivo actualizado
  console.log('💾 Guardando icons.json actualizado...');
  fs.writeFileSync(ICONS_JSON_PATH, JSON.stringify(sortedIcons, null, 2));

  console.log('');
  console.log('✅ Importación completada:');
  console.log(`   📥 Iconos importados: ${newIconCount}`);
  console.log(`   ➕ Nuevos añadidos: ${addedCount}`);
  console.log(`   🔄 Reemplazados: ${replacedCount}`);
  console.log(`   📊 Total final: ${mergedCount}`);
  console.log('');

  // Mostrar lista de iconos importados
  console.log('📋 Iconos importados del sprite:');
  Object.keys(newIcons).sort().forEach((name, i) => {
    const isNew = !existingIcons[name];
    const marker = isNew ? '➕' : '🔄';
    console.log(`   ${marker} ${name}`);
  });

  console.log('');
  console.log('🔧 Ejecuta "node scripts/generate-icons.js" para regenerar el TypeScript');
}

main().catch(console.error);
