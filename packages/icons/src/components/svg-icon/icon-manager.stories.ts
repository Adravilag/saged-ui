/**
 * Icon Manager - Herramienta para gestionar iconos en sg-icon
 *
 * ⚠️ Requiere el servidor de iconos corriendo:
 *    npm run icon-server
 *
 * Los iconos se cargan dinámicamente desde el servidor API,
 * así que siempre verás los datos más recientes al recargar la página.
 */

const API_URL = 'http://localhost:4567/api/icons';

// Tipos
interface IconDefinition {
  paths: string[];
  viewBox?: string;
  fillRule?: string;
}

interface IconsData {
  [key: string]: IconDefinition;
}

export default {
  title: 'Tools/Icon Manager',
  parameters: {
    layout: 'fullscreen',
  },
};

export const Manager: any = {
  render: () => {
    const container = document.createElement('div');

    // Mostrar estado de carga inicial
    container.innerHTML = `
      <div style="font-family: system-ui, -apple-system, sans-serif; padding: 24px; max-width: 1400px; margin: 0 auto;">
        <div style="text-align: center; padding: 48px;">
          <div style="font-size: 32px; margin-bottom: 16px;">⏳</div>
          <div style="color: #666;">Cargando iconos desde el servidor...</div>
        </div>
      </div>
    `;

    // Funciones helper
    function showToast(message: string, duration = 2000) {
      const toast = container.querySelector('#toast') as HTMLElement;
      if (toast) {
        toast.textContent = message;
        toast.style.opacity = '1';
        setTimeout(() => {
          toast.style.opacity = '0';
        }, duration);
      }
    }

    function parseSVG(svgString: string) {
      const viewBoxMatch = svgString.match(/viewBox=["']([^"']+)["']/);
      const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';

      const paths: string[] = [];
      const pathRegex = /<path[^>]*d=["']([^"']+)["'][^>]*\/?>/g;
      let match;
      while ((match = pathRegex.exec(svgString)) !== null) {
        paths.push(match[1]);
      }

      return { paths, viewBox };
    }

    async function loadIcons(): Promise<{ icons: IconsData; iconNames: string[] }> {
      try {
        const res = await fetch(API_URL);
        if (res.ok) {
          const data = await res.json();
          // El servidor devuelve { success: true, icons: {...}, count: n }
          const icons = data.icons || (data as IconsData);
          const iconNames = Object.keys(icons).sort();
          return { icons, iconNames };
        }
      } catch (e) {
        // Error de conexión
      }
      return { icons: {}, iconNames: [] };
    }

    async function addIcon(name: string, svg: string) {
      try {
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, svg }),
        });
        return await res.json();
      } catch (e) {
        return { success: false, error: 'No se pudo conectar con el servidor' };
      }
    }

    async function deleteIcon(name: string) {
      try {
        const res = await fetch(`${API_URL}/${encodeURIComponent(name)}`, {
          method: 'DELETE',
        });
        return await res.json();
      } catch (e) {
        return { success: false, error: 'No se pudo conectar con el servidor' };
      }
    }

    // Cargar iconos y renderizar
    async function init() {
      const { icons, iconNames } = await loadIcons();
      const serverOnline = iconNames.length > 0 || (await checkServerStatus());

      async function checkServerStatus(): Promise<boolean> {
        try {
          const res = await fetch(API_URL);
          return res.ok;
        } catch (e) {
          return false;
        }
      }

      // Renderizar interfaz completa
      container.innerHTML = `
        <div style="font-family: system-ui, -apple-system, sans-serif; padding: 24px; max-width: 1400px; margin: 0 auto;">

          <!-- Header -->
          <div style="margin-bottom: 32px;">
            <h1 style="margin: 0 0 8px; color: #1a1a2e; font-size: 28px;">🎨 Icon Manager</h1>
            <p style="margin: 0; color: #666; font-size: 14px;">
              Gestiona los iconos de la librería sg-icon • <strong id="icon-count">${iconNames.length}</strong> iconos
            </p>
            <div id="server-status" style="margin-top: 12px; padding: 8px 12px; border-radius: 6px; font-size: 13px; display: inline-block;
              ${
                serverOnline
                  ? 'background: #e8f5e9; color: #2e7d32;">🟢 Servidor activo - Los iconos se cargan en tiempo real'
                  : 'background: #ffebee; color: #c62828;">🔴 Servidor no disponible - Ejecuta: <code style="background:#fff3e0;padding:2px 6px;border-radius:4px;">npm run icon-server</code>'
              }
            </div>
          </div>

          <!-- Tabs -->
          <div style="display: flex; gap: 0; margin-bottom: 24px; border-bottom: 2px solid #e0e0e0;">
            <button class="tab-btn active" data-tab="gallery" style="padding: 12px 24px; border: none; background: none; font-size: 14px; font-weight: 500; color: #1a1a2e; cursor: pointer; border-bottom: 2px solid #2196f3; margin-bottom: -2px;">
              📚 Galería
            </button>
            <button class="tab-btn" data-tab="add" style="padding: 12px 24px; border: none; background: none; font-size: 14px; font-weight: 500; color: #666; cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -2px;">
              ➕ Añadir Icono
            </button>
            <button class="tab-btn" data-tab="export" style="padding: 12px 24px; border: none; background: none; font-size: 14px; font-weight: 500; color: #666; cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -2px;">
              📦 Exportar
            </button>
          </div>

          <!-- Tab: Gallery -->
          <div class="tab-content" data-tab="gallery">
            <div style="margin-bottom: 24px; display: flex; gap: 12px; align-items: center;">
              <input type="text" id="search-input" placeholder="🔍 Buscar iconos..."
                style="flex: 1; max-width: 400px; padding: 12px 16px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; outline: none;" />
              <button id="refresh-btn" style="padding: 12px 16px; background: #e3f2fd; color: #1976d2; border: none; border-radius: 8px; font-size: 14px; cursor: pointer;">
                🔄 Actualizar
              </button>
            </div>
            <div id="icons-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 12px;">
              ${
                iconNames.length === 0
                  ? '<div style="grid-column: 1/-1; text-align: center; padding: 48px; color: #666;">No hay iconos disponibles. Asegúrate de que el servidor está corriendo.</div>'
                  : iconNames
                      .map(name => {
                        const icon = icons[name];
                        const viewBox = icon?.viewBox || '0 0 24 24';
                        const paths = icon?.paths || [];
                        return `
                      <div class="icon-card" data-name="${name}" style="display: flex; flex-direction: column; align-items: center; padding: 16px 12px; border: 1px solid #e0e0e0; border-radius: 8px; cursor: pointer; transition: all 0.2s; background: white; position: relative;">
                        <svg viewBox="${viewBox}" width="28" height="28" style="fill: #333;">
                          ${paths.map(p => `<path d="${p}"/>`).join('')}
                        </svg>
                        <span style="margin-top: 8px; font-size: 11px; color: #666; text-align: center; word-break: break-word;">${name}</span>
                        <button class="delete-icon-btn" data-name="${name}" style="position: absolute; top: 4px; right: 4px; width: 20px; height: 20px; border: none; background: transparent; color: #999; cursor: pointer; font-size: 12px; opacity: 0; transition: opacity 0.2s;" title="Eliminar icono">✕</button>
                      </div>
                    `;
                      })
                      .join('')
              }
            </div>
          </div>

          <!-- Tab: Add Icon -->
          <div class="tab-content" data-tab="add" style="display: none;">
            <div style="max-width: 800px;">
              <div style="background: #f8f9fa; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
                <h3 style="margin: 0 0 16px; color: #333; font-size: 18px;">Añadir nuevo icono</h3>

                <div style="margin-bottom: 16px;">
                  <label style="display: block; margin-bottom: 6px; font-weight: 500; color: #333; font-size: 14px;">Nombre del icono</label>
                  <input type="text" id="icon-name-input" placeholder="ej: mi-icono, arrow-left"
                    style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; outline: none; box-sizing: border-box;" />
                </div>

                <div style="margin-bottom: 16px;">
                  <label style="display: block; margin-bottom: 6px; font-weight: 500; color: #333; font-size: 14px;">Código SVG</label>
                  <textarea id="svg-input" placeholder="Pega aquí el SVG completo..."
                    style="width: 100%; height: 150px; padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-size: 13px; font-family: monospace; outline: none; resize: vertical; box-sizing: border-box;"></textarea>
                </div>

                <button id="preview-btn" style="padding: 10px 20px; background: #e3f2fd; color: #1976d2; border: none; border-radius: 6px; font-size: 14px; cursor: pointer; margin-right: 8px;">
                  👁️ Vista previa
                </button>
                <button id="add-icon-btn" style="padding: 10px 20px; background: #4caf50; color: white; border: none; border-radius: 6px; font-size: 14px; cursor: pointer;">
                  ✅ Añadir icono
                </button>
              </div>

              <div id="preview-area" style="display: none; background: white; border: 1px solid #e0e0e0; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
                <h4 style="margin: 0 0 16px; color: #333;">Vista previa</h4>
                <div id="preview-container" style="display: flex; align-items: center; gap: 24px; padding: 16px; background: #f5f5f5; border-radius: 8px;"></div>
              </div>

              <div id="result-area" style="display: none; border-radius: 12px; padding: 24px; margin-bottom: 24px;"></div>
            </div>
          </div>

          <!-- Tab: Export -->
          <div class="tab-content" data-tab="export" style="display: none;">
            <div style="max-width: 800px;">
              <div style="background: #f8f9fa; border-radius: 12px; padding: 24px;">
                <h3 style="margin: 0 0 16px; color: #333; font-size: 18px;">Exportar iconos</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
                  <button id="export-json-btn" style="padding: 16px; background: white; border: 1px solid #ddd; border-radius: 8px; cursor: pointer; text-align: left;">
                    <div style="font-size: 24px; margin-bottom: 8px;">📄</div>
                    <div style="font-weight: 500; color: #333;">JSON</div>
                    <div style="font-size: 12px; color: #666;">Exportar definiciones</div>
                  </button>
                  <button id="export-names-btn" style="padding: 16px; background: white; border: 1px solid #ddd; border-radius: 8px; cursor: pointer; text-align: left;">
                    <div style="font-size: 24px; margin-bottom: 8px;">📝</div>
                    <div style="font-weight: 500; color: #333;">Lista de nombres</div>
                    <div style="font-size: 12px; color: #666;">Todos los iconos</div>
                  </button>
                  <button id="export-usage-btn" style="padding: 16px; background: white; border: 1px solid #ddd; border-radius: 8px; cursor: pointer; text-align: left;">
                    <div style="font-size: 24px; margin-bottom: 8px;">💻</div>
                    <div style="font-weight: 500; color: #333;">Ejemplos de uso</div>
                    <div style="font-size: 12px; color: #666;">HTML snippets</div>
                  </button>
                </div>
                <div id="export-output" style="display: none; margin-top: 24px;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                    <span style="font-weight: 500; color: #333;">Resultado:</span>
                    <button id="copy-export-btn" style="padding: 6px 12px; background: #4caf50; color: white; border: none; border-radius: 4px; font-size: 12px; cursor: pointer;">Copiar</button>
                  </div>
                  <pre id="export-content" style="margin: 0; padding: 16px; background: #1e1e1e; border-radius: 8px; overflow-x: auto; font-size: 12px; color: #d4d4d4; max-height: 400px; overflow-y: auto;"></pre>
                </div>
              </div>
            </div>
          </div>

          <!-- Toast -->
          <div id="toast" style="position: fixed; bottom: 24px; right: 24px; padding: 12px 24px; background: #333; color: white; border-radius: 8px; font-size: 14px; opacity: 0; transition: opacity 0.3s; pointer-events: none; z-index: 1000;"></div>
        </div>
      `;

      // Setup event listeners
      setTimeout(() => {
        // Tab switching
        container.querySelectorAll('.tab-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            container.querySelectorAll('.tab-btn').forEach(b => {
              (b as HTMLElement).classList.remove('active');
              (b as HTMLElement).style.color = '#666';
              (b as HTMLElement).style.borderBottomColor = 'transparent';
            });
            (btn as HTMLElement).classList.add('active');
            (btn as HTMLElement).style.color = '#1a1a2e';
            (btn as HTMLElement).style.borderBottomColor = '#2196f3';

            const tab = (btn as HTMLElement).dataset.tab;
            container.querySelectorAll('.tab-content').forEach(c => {
              (c as HTMLElement).style.display = (c as HTMLElement).dataset.tab === tab ? 'block' : 'none';
            });
          });
        });

        // Refresh button
        const refreshBtn = container.querySelector('#refresh-btn');
        if (refreshBtn) {
          refreshBtn.addEventListener('click', async () => {
            (refreshBtn as HTMLButtonElement).disabled = true;
            (refreshBtn as HTMLButtonElement).textContent = '⏳ Cargando...';

            // Recargar iconos y re-renderizar galería
            const { icons: newIcons, iconNames: newNames } = await loadIcons();

            const grid = container.querySelector('#icons-grid') as HTMLElement;
            const countEl = container.querySelector('#icon-count') as HTMLElement;

            if (countEl) countEl.textContent = String(newNames.length);

            if (grid) {
              grid.innerHTML =
                newNames.length === 0
                  ? '<div style="grid-column: 1/-1; text-align: center; padding: 48px; color: #666;">No hay iconos disponibles.</div>'
                  : newNames
                      .map(name => {
                        const icon = newIcons[name];
                        const viewBox = icon?.viewBox || '0 0 24 24';
                        const paths = icon?.paths || [];
                        return `
                      <div class="icon-card" data-name="${name}" style="display: flex; flex-direction: column; align-items: center; padding: 16px 12px; border: 1px solid #e0e0e0; border-radius: 8px; cursor: pointer; transition: all 0.2s; background: white; position: relative;">
                        <svg viewBox="${viewBox}" width="28" height="28" style="fill: #333;">
                          ${paths.map(p => `<path d="${p}"/>`).join('')}
                        </svg>
                        <span style="margin-top: 8px; font-size: 11px; color: #666; text-align: center; word-break: break-word;">${name}</span>
                        <button class="delete-icon-btn" data-name="${name}" style="position: absolute; top: 4px; right: 4px; width: 20px; height: 20px; border: none; background: transparent; color: #999; cursor: pointer; font-size: 12px; opacity: 0; transition: opacity 0.2s;" title="Eliminar icono">✕</button>
                      </div>
                    `;
                      })
                      .join('');

              // Re-bind card events
              bindCardEvents();
            }

            (refreshBtn as HTMLButtonElement).disabled = false;
            (refreshBtn as HTMLButtonElement).textContent = '🔄 Actualizar';
            showToast('✓ Iconos actualizados');
          });
        }

        // Search
        const searchInput = container.querySelector('#search-input') as HTMLInputElement;
        if (searchInput) {
          searchInput.addEventListener('input', e => {
            const query = (e.target as HTMLInputElement).value.toLowerCase();
            container.querySelectorAll('.icon-card').forEach(card => {
              const name = (card as HTMLElement).dataset.name || '';
              (card as HTMLElement).style.display = name.includes(query) ? 'flex' : 'none';
            });
          });
        }

        // Bind card events
        function bindCardEvents() {
          container.querySelectorAll('.icon-card').forEach(card => {
            card.addEventListener('click', e => {
              // Ignorar si se hizo clic en el botón de eliminar
              if ((e.target as HTMLElement).classList.contains('delete-icon-btn')) return;

              const name = (card as HTMLElement).dataset.name;
              const code = `<sg-icon name="${name}"></sg-icon>`;
              navigator.clipboard.writeText(code);
              showToast(`✓ Copiado: ${code}`);
            });
            card.addEventListener('mouseenter', () => {
              (card as HTMLElement).style.borderColor = '#2196f3';
              (card as HTMLElement).style.background = '#f5f9ff';
              const deleteBtn = card.querySelector('.delete-icon-btn') as HTMLElement;
              if (deleteBtn) deleteBtn.style.opacity = '1';
            });
            card.addEventListener('mouseleave', () => {
              (card as HTMLElement).style.borderColor = '#e0e0e0';
              (card as HTMLElement).style.background = 'white';
              const deleteBtn = card.querySelector('.delete-icon-btn') as HTMLElement;
              if (deleteBtn) deleteBtn.style.opacity = '0';
            });
          });

          // Delete buttons
          container.querySelectorAll('.delete-icon-btn').forEach(btn => {
            btn.addEventListener('click', async e => {
              e.stopPropagation();
              const name = (btn as HTMLElement).dataset.name || '';
              if (!confirm(`¿Eliminar el icono "${name}"?`)) return;

              const result = await deleteIcon(name);
              if (result.success) {
                showToast(`✓ Icono "${name}" eliminado`);
                // Actualizar galería
                (container.querySelector('#refresh-btn') as HTMLButtonElement)?.click();
              } else {
                showToast(`❌ Error: ${result.error}`);
              }
            });
          });
        }

        bindCardEvents();

        // Preview button
        const previewBtn = container.querySelector('#preview-btn');
        if (previewBtn) {
          previewBtn.addEventListener('click', () => {
            const svgInput = (container.querySelector('#svg-input') as HTMLTextAreaElement)?.value || '';
            if (!svgInput.trim()) {
              showToast('⚠️ Pega un SVG primero');
              return;
            }

            const parsed = parseSVG(svgInput);
            if (parsed.paths.length === 0) {
              showToast('⚠️ No se encontró ningún path');
              return;
            }

            const previewArea = container.querySelector('#preview-area') as HTMLElement;
            const previewContainer = container.querySelector('#preview-container') as HTMLElement;

            let previewHTML = '';
            [24, 32, 48, 64].forEach(size => {
              previewHTML += `
                <div style="text-align: center;">
                  <svg viewBox="${parsed.viewBox}" width="${size}" height="${size}" style="fill: #333;">
                    ${parsed.paths.map(p => `<path d="${p}"/>`).join('')}
                  </svg>
                  <div style="font-size: 10px; color: #666; margin-top: 4px;">${size}px</div>
                </div>
              `;
            });

            previewContainer.innerHTML = previewHTML;
            previewArea.style.display = 'block';
            showToast('✓ Vista previa generada');
          });
        }

        // Add icon button
        const addIconBtn = container.querySelector('#add-icon-btn');
        if (addIconBtn) {
          addIconBtn.addEventListener('click', async () => {
            const nameInput = container.querySelector('#icon-name-input') as HTMLInputElement;
            const svgInput = container.querySelector('#svg-input') as HTMLTextAreaElement;
            const resultArea = container.querySelector('#result-area') as HTMLElement;

            const name = nameInput?.value?.trim() || '';
            const svg = svgInput?.value?.trim() || '';

            if (!name) {
              showToast('⚠️ Escribe un nombre para el icono');
              return;
            }
            if (!svg) {
              showToast('⚠️ Pega un SVG');
              return;
            }

            const parsed = parseSVG(svg);
            if (parsed.paths.length === 0) {
              showToast('⚠️ No se encontró ningún path en el SVG');
              return;
            }

            // Intentar añadir via API
            (addIconBtn as HTMLButtonElement).disabled = true;
            (addIconBtn as HTMLButtonElement).textContent = '⏳ Añadiendo...';

            const result = await addIcon(name, svg);

            (addIconBtn as HTMLButtonElement).disabled = false;
            (addIconBtn as HTMLButtonElement).textContent = '✅ Añadir icono';

            if (result.success) {
              resultArea.style.display = 'block';
              resultArea.style.background = '#e8f5e9';
              resultArea.style.border = '1px solid #c8e6c9';
              resultArea.innerHTML = `
                <div style="color: #2e7d32; font-weight: 500; margin-bottom: 8px;">
                  ✅ ${result.isUpdate ? 'Icono actualizado' : 'Icono añadido'}: <code style="background:#fff;padding:2px 6px;border-radius:4px;">${result.name}</code>
                </div>
                <div style="color: #388e3c; font-size: 13px;">
                  ${result.tsGenerated ? '• TypeScript regenerado automáticamente' : ''}
                  <br>• Uso: <code style="background:#fff;padding:2px 6px;border-radius:4px;">&lt;sg-icon name="${result.name}"&gt;&lt;/sg-icon&gt;</code>
                </div>
              `;

              // Limpiar inputs
              nameInput.value = '';
              svgInput.value = '';
              (container.querySelector('#preview-area') as HTMLElement).style.display = 'none';

              showToast(`✅ Icono "${result.name}" añadido`, 2000);

              // Actualizar galería automáticamente
              setTimeout(() => {
                (container.querySelector('#refresh-btn') as HTMLButtonElement)?.click();
                // Cambiar a la pestaña de galería
                const galleryTab = container.querySelector('.tab-btn[data-tab="gallery"]') as HTMLButtonElement;
                if (galleryTab) galleryTab.click();
              }, 500);
            } else {
              resultArea.style.display = 'block';
              resultArea.style.background = '#ffebee';
              resultArea.style.border = '1px solid #ffcdd2';
              resultArea.innerHTML = `
                <div style="color: #c62828; font-weight: 500;">
                  ❌ Error: ${result.error}
                </div>
                <div style="color: #d32f2f; font-size: 13px; margin-top: 8px;">
                  Asegúrate de que el servidor está corriendo: <code style="background:#fff;padding:2px 6px;border-radius:4px;">npm run icon-server</code>
                </div>
              `;
              showToast('❌ Error al añadir icono');
            }
          });
        }

        // Export buttons
        const exportJsonBtn = container.querySelector('#export-json-btn');
        const exportNamesBtn = container.querySelector('#export-names-btn');
        const exportUsageBtn = container.querySelector('#export-usage-btn');
        const copyExportBtn = container.querySelector('#copy-export-btn');

        function showExport(content: string) {
          const output = container.querySelector('#export-output') as HTMLElement;
          const exportContent = container.querySelector('#export-content') as HTMLElement;
          exportContent.textContent = content;
          output.style.display = 'block';
        }

        if (exportJsonBtn) {
          exportJsonBtn.addEventListener('click', () => {
            showExport(JSON.stringify(icons, null, 2));
            showToast('✓ JSON generado');
          });
        }

        if (exportNamesBtn) {
          exportNamesBtn.addEventListener('click', () => {
            showExport(iconNames.join('\n'));
            showToast('✓ Lista generada');
          });
        }

        if (exportUsageBtn) {
          exportUsageBtn.addEventListener('click', () => {
            const usage = iconNames.map(n => `<sg-icon name="${n}"></sg-icon>`).join('\n');
            showExport(usage);
            showToast('✓ Ejemplos generados');
          });
        }

        if (copyExportBtn) {
          copyExportBtn.addEventListener('click', () => {
            const content = (container.querySelector('#export-content') as HTMLElement)?.textContent || '';
            navigator.clipboard.writeText(content);
            showToast('✓ Copiado');
          });
        }
      }, 100);
    }

    // Iniciar carga
    init();

    return container;
  },
};

Manager.parameters = {
  controls: { disable: true },
  docs: { disable: true },
};
