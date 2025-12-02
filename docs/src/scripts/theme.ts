/**
 * Theme management for SagedUI docs
 */

export function initTheme(): void {
  const saved = localStorage.getItem('theme');
  if (saved) {
    document.documentElement.dataset.theme = saved;
  }
}

export function toggleTheme(): void {
  const html = document.documentElement;
  const isDark = html.dataset.theme === 'dark';
  html.dataset.theme = isDark ? 'light' : 'dark';
  localStorage.setItem('theme', html.dataset.theme);
}

// Auto-init on load
initTheme();

// Expose globally for onclick handlers
declare global {
  interface Window {
    toggleTheme: typeof toggleTheme;
  }
}
window.toggleTheme = toggleTheme;
