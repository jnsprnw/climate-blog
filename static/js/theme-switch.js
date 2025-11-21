/**
 * Standalone Lit Theme Switch Web Component with Radio Buttons
 * Drei Modi: System, Light, Dark
 */

import { LitElement, html, css } from 'https://cdn.skypack.dev/lit@3.1.0';

class ThemeSwitch extends LitElement {
  static properties = {
    theme: { type: String, reflect: true }, // 'system', 'light', 'dark'
  };

  constructor() {
    super();
    this.theme = 'system'; // Default: System-Präferenz
    this.compact = false;
    this.showLabels = true;
    this.systemPrefersDark = false;
    this.mediaQueryList = null;
  }

  static styles = css`
    :host {
      display: inline-block;
      font-family: system-ui, -apple-system, sans-serif;
    }

    .theme-options {
      display: flex;
      flex-direction: row;
      gap: 2px;
    }

    .theme-options input {
      display: none;
    }

    .theme-option {
      padding: 4px;
      width: 18px;
      height: 18px;
      border-radius: 6px;
    }

    .theme-option:not(:has(input:checked)) {
      transition: color 0.3s ease;
      color: oklch(70.8% 0 0);
      cursor: pointer;
    }

    .theme-option svg {
      width: 100%;
      height: 100%;
    }

    .theme-option:hover:not(:has(input:checked)) {
      /*background-color: var(--bg-primary, #ffffff);*/
      color: var(--bg-primary, #000);
    }
    .theme-option:has(input:checked) {
      color: black;
    }

    .option-content {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    /* Theme-spezifische Farben */
    .theme-option input:checked + .option-content .option-icon.system {
      color: var(--primary-color, #2196F3);
    }

    .theme-option input:checked + .option-content .option-icon.light {
      color: #ffa500;
    }

    .theme-option input:checked + .option-content .option-icon.dark {
      color: #4a4a4a;
    }

    /* Auto Dark Theme */
    @media (prefers-color-scheme: dark) {
      .theme-controls {
        --bg-secondary: #2d2d2d;
        --bg-primary: #ffffff;
        --border-color: #eee;
        --text-primary: #ffffff;
        --text-secondary: #cccccc;
      }

      .theme-option input:checked + .option-content .option-icon.dark {
        color: #ffffff;
      }
    }
  `;

  get currentMode() {
    if (this.theme === 'system') {
      return this.systemPrefersDark ? 'dark' : 'light';
    }
    return this.theme;
  }

  get isDarkActive() {
    return this.currentMode === 'dark';
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
      // Nur anwenden wenn System-Modus aktiv ist
      if (this.theme === 'system') {
        this.applyTheme();
      }
    };

    if (this.mediaQueryList.addEventListener) {
      this.mediaQueryList.addEventListener('change', this.handleMediaChange);
    } else {
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

    const savedTheme = localStorage.getItem('theme-preference');
    if (savedTheme && ['system', 'light', 'dark'].includes(savedTheme)) {
      this.theme = savedTheme;
    }
  }

  saveSettings() {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem('theme-preference', this.theme);
  }

  applyTheme() {
    if (typeof document === 'undefined') return;

    const isDark = this.isDarkActive;

    // CSS-Klassen auf html-Element setzen
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.classList.toggle('light', !isDark);

    // CSS Custom Properties setzen
    // document.documentElement.style.setProperty('--theme-mode', isDark ? 'dark' : 'light');
    // document.documentElement.style.setProperty('--theme-preference', this.theme);

    // Custom Event dispatchen
    // this.dispatchEvent(new CustomEvent('theme-changed', {
    //   detail: {
    //     theme: this.theme,
    //     currentMode: this.currentMode,
    //     isDark: isDark,
    //     systemPrefersDark: this.systemPrefersDark
    //   },
    //   bubbles: true,
    //   composed: true
    // }));

    this.saveSettings();
  }

  handleThemeChange(e) {
    this.theme = e.target.value;
    this.applyTheme();
  }

  render() {
    return html`
      <div class="theme-controls">
        <div class="theme-options">
          <label class="theme-option">
            <input
              type="radio"
              name="theme"
              value="system"
              .checked=${this.theme === 'system'}
              @change=${this.handleThemeChange}
            />
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brightness"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M12 3l0 18" /><path d="M12 9l4.65 -4.65" /><path d="M12 14.3l7.37 -7.37" /><path d="M12 19.6l8.85 -8.85" /></svg>
          </label>

          <label class="theme-option">
            <input
              type="radio"
              name="theme"
              value="light"
              .checked=${this.theme === 'light'}
              @change=${this.handleThemeChange}
            />
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="icon icon-tabler icons-tabler-filled icon-tabler-brightness-up"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 8a4 4 0 1 1 -3.995 4.2l-.005 -.2l.005 -.2a4 4 0 0 1 3.995 -3.8z" /><path d="M12 2a1 1 0 0 1 .993 .883l.007 .117v2a1 1 0 0 1 -1.993 .117l-.007 -.117v-2a1 1 0 0 1 1 -1z" /><path d="M17.693 4.893a1 1 0 0 1 1.497 1.32l-.083 .094l-1.4 1.4a1 1 0 0 1 -1.497 -1.32l.083 -.094l1.4 -1.4z" /><path d="M21 11a1 1 0 0 1 .117 1.993l-.117 .007h-2a1 1 0 0 1 -.117 -1.993l.117 -.007h2z" /><path d="M16.293 16.293a1 1 0 0 1 1.32 -.083l.094 .083l1.4 1.4a1 1 0 0 1 -1.32 1.497l-.094 -.083l-1.4 -1.4a1 1 0 0 1 0 -1.414z" /><path d="M12 18a1 1 0 0 1 .993 .883l.007 .117v2a1 1 0 0 1 -1.993 .117l-.007 -.117v-2a1 1 0 0 1 1 -1z" /><path d="M6.293 16.293a1 1 0 0 1 1.497 1.32l-.083 .094l-1.4 1.4a1 1 0 0 1 -1.497 -1.32l.083 -.094l1.4 -1.4z" /><path d="M6 11a1 1 0 0 1 .117 1.993l-.117 .007h-2a1 1 0 0 1 -.117 -1.993l.117 -.007h2z" /><path d="M4.893 4.893a1 1 0 0 1 1.32 -.083l.094 .083l1.4 1.4a1 1 0 0 1 -1.32 1.497l-.094 -.083l-1.4 -1.4a1 1 0 0 1 0 -1.414z" /></svg>
          </label>

          <label class="theme-option">
            <input
              type="radio"
              name="theme"
              value="dark"
              .checked=${this.theme === 'dark'}
              @change=${this.handleThemeChange}
            />
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-sparkles"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6z" /></svg>
          </label>
        </div>
      </div>
    `;
  }
}

// Custom Element registrieren
if (!customElements.get('theme-switch')) {
  customElements.define('theme-switch', ThemeSwitch);
}

// Für Verwendung als ES-Modul
export { ThemeSwitch };
