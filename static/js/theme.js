(function() {
  'use strict';

  class ThemeManager {
    constructor() {
      this.theme = 'system'; // 'system', 'light', 'dark'
      this.systemPrefersDark = false;
      this.mediaQueryList = null;
      this.init();
    }

    init() {
      this.loadSettings();

      this.setupMediaQuery();

      this.applyTheme();

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.setupUI());
      } else {
        this.setupUI();
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

    setupMediaQuery() {
      if (typeof window === 'undefined' || !window.matchMedia) return;

      this.mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
      this.systemPrefersDark = this.mediaQueryList.matches;

      const handleChange = (e) => {
        this.systemPrefersDark = e.matches;
        if (this.theme === 'system') {
          this.applyTheme();
        }
        this.updateUI();
      };

      if (this.mediaQueryList.addEventListener) {
        this.mediaQueryList.addEventListener('change', handleChange);
      } else {
        this.mediaQueryList.addListener(handleChange);
      }
    }

    getCurrentMode() {
      if (this.theme === 'system') {
        return this.systemPrefersDark ? 'dark' : 'light';
      }
      return this.theme;
    }

    isDarkActive() {
      return this.getCurrentMode() === 'dark';
    }

    applyTheme() {
      if (typeof document === 'undefined') return;

      const isDark = this.isDarkActive();

      document.documentElement.classList.toggle('dark', isDark);
      document.documentElement.classList.toggle('light', !isDark);
    }

    setTheme(newTheme) {
      if (!['system', 'light', 'dark'].includes(newTheme)) return;

      this.theme = newTheme;
      this.applyTheme();
      this.saveSettings();
      this.updateUI();
    }

    setupUI() {
      this.initializeThemeSwitches();
      this.updateUI();
    }

    initializeThemeSwitches() {
      this.createThemeSwitch()
    }

    createThemeSwitch() {
      const radioButtons = document.querySelectorAll('.theme-switch input[type="radio"]');
      radioButtons.forEach(radio => {
        radio.addEventListener('change', (e) => {
          if (e.target.checked) {
            this.setTheme(e.target.value);
          }
        });
      });
    }

    updateUI() {
        // Radio buttons updaten
        const radioButtons = document.querySelectorAll('.theme-switch input[type="radio"]');
        radioButtons.forEach(radio => {
          radio.checked = radio.value === this.theme;
        });
    }
  }

  new ThemeManager();
})();
