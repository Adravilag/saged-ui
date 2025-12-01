/**
 * Servidor local para gestionar iconos desde Storybook
 *
 * Uso: node scripts/icon-server.js
 *
 * Endpoints:
 *   GET  /api/icons          - Lista todos los iconos
 *   POST /api/icons          - Añade un nuevo icono
 *   DELETE /api/icons/:name  - Elimina un icono
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PORT = 3456;
const ICONS_JSON = path.join(__dirname, '../src/components/svg-icon/icons/icons.json');

// Parsear SVG
function parseSVG(svgContent) {
  const viewBoxMatch = svgContent.match(/viewBox=["']([^"']+)["']/);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';

  const paths = [];
  const pathRegex = /<path[^>]*d=["']([^"']+)["'][^>]*\/?>/g;
  let match;
  while ((match = pathRegex.exec(svgContent)) !== null) {
    paths.push(match[1]);
  }

  const fillRuleMatch = svgContent.match(/fill-rule=["']([^"']+)["']/);
  const fillRule = fillRuleMatch ? fillRuleMatch[1] : null;

  return { paths, viewBox, fillRule };
}

// Leer iconos
function readIcons() {
  return JSON.parse(fs.readFileSync(ICONS_JSON, 'utf-8'));
}

// Guardar iconos
function saveIcons(icons) {
  // Ordenar alfabéticamente
  const sorted = {};
  Object.keys(icons).sort().forEach(key => {
    sorted[key] = icons[key];
  });
  fs.writeFileSync(ICONS_JSON, JSON.stringify(sorted, null, 2), 'utf-8');
}

// Regenerar TypeScript
function regenerateTS() {
  try {
    execSync('node scripts/generate-icons.js', {
      cwd: path.join(__dirname, '..'),
      stdio: 'pipe'
    });
    return true;
  } catch (e) {
    console.error('Error regenerando TS:', e.message);
    return false;
  }
}

// Servidor HTTP
const server = http.createServer((req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://localhost:${PORT}`);

  // GET /api/icons - Lista iconos
  if (req.method === 'GET' && url.pathname === '/api/icons') {
    const icons = readIcons();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, icons, count: Object.keys(icons).length }));
    return;
  }

  // POST /api/icons - Añadir icono
  if (req.method === 'POST' && url.pathname === '/api/icons') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const { name, svg } = JSON.parse(body);

        if (!name || !svg) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: 'name y svg son requeridos' }));
          return;
        }

        // Parsear SVG
        const parsed = parseSVG(svg);
        if (parsed.paths.length === 0) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: 'No se encontraron paths en el SVG' }));
          return;
        }

        // Normalizar nombre
        const kebabName = name
          .replace(/([a-z])([A-Z])/g, '$1-$2')
          .replace(/[\s_]+/g, '-')
          .toLowerCase();

        // Crear definición
        const iconDef = { paths: parsed.paths };
        if (parsed.viewBox !== '0 0 24 24') {
          iconDef.viewBox = parsed.viewBox;
        }
        if (parsed.fillRule && parsed.fillRule !== 'nonzero') {
          iconDef.fillRule = parsed.fillRule;
        }

        // Leer, añadir y guardar
        const icons = readIcons();
        const isUpdate = !!icons[kebabName];
        icons[kebabName] = iconDef;
        saveIcons(icons);

        // Regenerar TS
        const tsGenerated = regenerateTS();

        console.log(`${isUpdate ? '🔄 Actualizado' : '✅ Añadido'}: ${kebabName}`);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          name: kebabName,
          isUpdate,
          tsGenerated,
          message: `Icono "${kebabName}" ${isUpdate ? 'actualizado' : 'añadido'}`
        }));
      } catch (e) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: e.message }));
      }
    });
    return;
  }

  // DELETE /api/icons/:name - Eliminar icono
  if (req.method === 'DELETE' && url.pathname.startsWith('/api/icons/')) {
    const iconName = url.pathname.replace('/api/icons/', '');

    const icons = readIcons();
    if (!icons[iconName]) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: `Icono "${iconName}" no encontrado` }));
      return;
    }

    delete icons[iconName];
    saveIcons(icons);
    regenerateTS();

    console.log(`🗑️ Eliminado: ${iconName}`);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, message: `Icono "${iconName}" eliminado` }));
    return;
  }

  // 404
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ success: false, error: 'Not found' }));
});

server.listen(PORT, () => {
  console.log(`\n🎨 Icon Server corriendo en http://localhost:${PORT}`);
  console.log(`\nEndpoints:`);
  console.log(`  GET    /api/icons          - Lista iconos`);
  console.log(`  POST   /api/icons          - Añade icono { name, svg }`);
  console.log(`  DELETE /api/icons/:name    - Elimina icono`);
  console.log(`\nPresiona Ctrl+C para detener\n`);
});
