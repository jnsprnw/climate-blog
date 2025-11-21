/**
 * Standalone Lit Dark Mode Switch Web Component
 * Kann unabhängig von jedem Framework verwendet werden
 */

import { LitElement, html, css } from 'https://cdn.skypack.dev/lit@3.1.0';

class DarkModeSwitch extends LitElement {
  static properties = {
    darkMode: { type: Boolean, reflect: true, attribute: 'dark-mode' },
    useSystemPreference: { type: Boolean, reflect: true, attribute: 'use-system' },
    showLabels: { type: Boolean, reflect: true, attribute: 'show-labels' },
    compact: { type: Boolean, reflect: true }
  };

  constructor() {
    super();
    this.darkMode = false;
    this.useSystemPreference = true;
    this.showLabels = true;
    this.compact = false;
    this.systemPrefersDark = false;
    this.mediaQueryList = null;
  }

  static styles = css`
    :host {
      display: inline-block;
      font-family: system-ui, -apple-system, sans-serif;
    }

    .theme-controls {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: var(--padding, 16px);
      background: var(--bg-secondary, #f8f9fa);
      border: 1px solid var(--border-color, #dee2e6);
      border-radius: 8px;
      min-width: var(--min-width, 280px);
    }

    :host([compact]) .theme-controls {
      flex-direction: row;
      align-items: center;
      padding: 8px 12px;
      gap: 16px;
      min-width: auto;
    }

    .system-preference {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      font-size: 14px;
      color: var(--text-primary, #212529);
    }

    :host([compact]) .system-preference {
      display: none;
    }

    .system-preference input {
      margin: 0;
    }

    .manual-toggle {
      display: flex;
      align-items: center;
      gap: 12px;
      opacity: var(--toggle-opacity, 1);
      transition: opacity 0.3s ease;
    }

    .manual-toggle.disabled {
      --toggle-opacity: 0.5;
      pointer-events: none;
    }

    .switch {
      position: relative;
      display: inline-block;
      width: 60px;
      height: 34px;
    }

    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: var(--switch-bg, #ccc);
      transition: .4s;
      border-radius: 34px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 6px;
    }

    .slider:before {
      position: absolute;
      content: "";
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      transition: .4s;
      border-radius: 50%;
      z-index: 2;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    input:checked + .slider {
      background-color: var(--primary-color, #2196F3);
    }

    input:checked + .slider:before {
      transform: translateX(26px);
    }

    .icon {
      font-size: 12px;
      z-index: 1;
      transition: color 0.3s ease;
    }

    .sun {
      color: var(--sun-color, #ffa500);
    }

    .moon {
      color: var(--moon-color, #4a4a4a);
    }

    input:checked ~ .slider .sun,
    input:checked ~ .slider .moon {
      color: white;
    }

    .mode-label {
      font-weight: 500;
      font-size: 14px;
      color: var(--text-primary, #212529);
    }

    .status {
      font-size: 12px;
      color: var(--text-secondary, #6c757d);
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    :host([compact]) .status {
      display: none;
    }

    .status p {
      margin: 0;
    }

    /* Dark theme auto-detection */
    @media (prefers-color-scheme: dark) {
      .theme-controls {
        --bg-secondary: #2d2d2d;
        --border-color: #404040;
        --text-primary: #ffffff;
        --text-secondary: #cccccc;
        --switch-bg: #555;
      }
    }
  `;

  get currentMode() {
    return this.useSystemPreference ? this.systemPrefersDark : this.darkMode;
  }

  connectedCallback() {
    super.connectedCallback();
    this.initializeTheme();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.cleanupMediaQuery();
  }

  initializeTheme() {
    // Gespeicherte Einstellungen laden
    this.loadSettings();

    // System-Präferenz überwachen
    this.setupMediaQuery();

    // Initial theme anwenden
    this.applyTheme();
  }

  setupMediaQuery() {
    if (typeof window === 'undefined') return;

    this.mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
    this.systemPrefersDark = this.mediaQueryList.matches;

    this.handleMediaChange = (e) => {
      this.systemPrefersDark = e.matches;
      this.requestUpdate();
      this.applyTheme();
    };

    // Modern browsers
    if (this.mediaQueryList.addEventListener) {
      this.mediaQueryList.addEventListener('change', this.handleMediaChange);
    } else {
      // Fallback für ältere Browser
      this.mediaQueryList.addListener(this.handleMediaChange);
    }
  }

  cleanupMediaQuery() {
    if (!this.mediaQueryList || !this.handleMediaChange) return;

    if (this.mediaQueryList.removeEventListener) {
      this.mediaQueryList.removeEventListener('change', this.handleMediaChange);
    } else {
      this.mediaQueryList.removeListener(this.handleMediaChange);
    }
  }

  loadSettings() {
    if (typeof localStorage === 'undefined') return;

    const savedDarkMode = localStorage.getItem('lit-dark-mode');
    const savedUseSystem = localStorage.getItem('lit-use-system-preference');

    if (savedDarkMode !== null) {
      this.darkMode = savedDarkMode === 'true';
    }

    if (savedUseSystem !== null) {
      this.useSystemPreference = savedUseSystem === 'true';
    }
  }

  saveSettings() {
    if (typeof localStorage === 'undefined') return;

    localStorage.setItem('lit-dark-mode', this.darkMode.toString());
    localStorage.setItem('lit-use-system-preference', this.useSystemPreference.toString());
  }

  applyTheme() {
    if (typeof document === 'undefined') return;

    const isDark = this.currentMode;

    // CSS-Klasse auf html-Element setzen
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.classList.toggle('light', !isDark);
console.log({isDark}, this.useSystemPreference)
    // CSS Custom Properties setzen
    document.documentElement.style.setProperty('--theme-mode', isDark ? 'dark' : 'light');

    // Custom Event dispatchen
    this.dispatchEvent(new CustomEvent('theme-changed', {
      detail: {
        darkMode: isDark,
        useSystemPreference: this.useSystemPreference,
        systemPrefersDark: this.systemPrefersDark
      },
      bubbles: true,
      composed: true // Wichtig für Shadow DOM
    }));

    this.saveSettings();
  }

  handleSystemPreferenceToggle(e) {
    this.useSystemPreference = e.target.checked;
    this.applyTheme();
  }

  handleDarkModeToggle(e) {
    this.darkMode = e.target.checked;
    this.applyTheme();
  }

  render() {
    return html`
      <div class="theme-controls">
        ${!this.compact ? html`
          <label class="system-preference">
            <input
              type="checkbox"
              .checked=${this.useSystemPreference}
              @change=${this.handleSystemPreferenceToggle}
            />
            System-Präferenz verwenden
          </label>
        ` : ''}

        <div class="manual-toggle ${this.useSystemPreference && !this.compact ? 'disabled' : ''}">
          <label class="switch">
            <input
              type="checkbox"
              .checked=${this.darkMode}
              .disabled=${this.useSystemPreference && !this.compact}
              @change=${this.handleDarkModeToggle}
            />
            <span class="slider">
              <span class="icon sun">☀️</span>
              <span class="icon moon">🌙</span>
            </span>
          </label>
          ${this.showLabels ? html`
            <span class="mode-label">
              ${this.currentMode ? 'Dark Mode' : 'Light Mode'}
            </span>
          ` : ''}
        </div>

        ${!this.compact ? html`
          <div class="status">
            <p>System: ${this.systemPrefersDark ? 'Dark' : 'Light'}</p>
            <p>Aktiv: ${this.currentMode ? 'Dark' : 'Light'}</p>
          </div>
        ` : ''}
      </div>
    `;
  }
}

// Custom Element registrieren
if (!customElements.get('dark-mode-switch')) {
  customElements.define('dark-mode-switch', DarkModeSwitch);
}

// Für Verwendung als ES-Modul
export { DarkModeSwitch };
