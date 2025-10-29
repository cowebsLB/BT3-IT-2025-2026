// Internationalization (i18n) Handler for BT3 IT Course Website
// Supports English (en) and French (fr)

import { translations } from './i18n/translations.js';

class I18n {
    constructor() {
        this.currentLang = localStorage.getItem('language') || 'en';
        this.translations = translations;
        this.init();
    }
    
    init() {
        // Set HTML lang attribute
        document.documentElement.lang = this.currentLang;
        
        // Apply translations on load
        this.translatePage();
        
        // Update language switcher if it exists
        this.updateLanguageSwitcher();
    }
    
    /**
     * Get translation for a key path (e.g., 'nav.home' or 'home.title')
     */
    t(key, defaultValue = '') {
        const keys = key.split('.');
        let value = this.translations[this.currentLang];
        
        for (const k of keys) {
            if (value && typeof value === 'object') {
                value = value[k];
            } else {
                return defaultValue || key;
            }
        }
        
        return value || defaultValue || key;
    }
    
    /**
     * Set language and update the page
     */
    setLanguage(lang) {
        if (!this.translations[lang]) {
            console.warn(`Language "${lang}" not found. Available: ${Object.keys(this.translations).join(', ')}`);
            return;
        }
        
        this.currentLang = lang;
        document.documentElement.lang = lang;
        localStorage.setItem('language', lang);
        
        // Translate all elements
        this.translatePage();
        
        // Update language switcher
        this.updateLanguageSwitcher();
        
        // Trigger custom event for other scripts
        document.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
    }
    
    /**
     * Translate all elements with data-i18n attribute
     */
    translatePage() {
        // Translate static content
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key);
            
            if (translation) {
                // Handle different element types
                if (element.tagName === 'INPUT' && (element.type === 'text' || element.type === 'search')) {
                    element.placeholder = translation;
                } else if (element.hasAttribute('data-i18n-html')) {
                    element.innerHTML = translation;
                } else if (element.tagName === 'OPTION') {
                    element.textContent = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
        
        // Translate img alt attributes with data-i18n-alt
        document.querySelectorAll('[data-i18n-alt]').forEach(element => {
            const key = element.getAttribute('data-i18n-alt');
            const translation = this.t(key);
            if (translation) {
                element.setAttribute('alt', translation);
            }
        });
        
        // Translate elements with data-i18n-html attribute
        document.querySelectorAll('[data-i18n-html]').forEach(element => {
            const key = element.getAttribute('data-i18n-html');
            const translation = this.t(key);
            if (translation) {
                element.innerHTML = translation;
            }
        });
        
        // Translate title and meta tags
        const titleKey = document.documentElement.getAttribute('data-i18n-title');
        if (titleKey) {
            document.title = this.t(titleKey) || document.title;
        }
        
        // Update aria-labels
        document.querySelectorAll('[data-i18n-aria-label]').forEach(element => {
            const key = element.getAttribute('data-i18n-aria-label');
            element.setAttribute('aria-label', this.t(key));
        });
    }
    
    /**
     * Update language switcher UI
     */
    updateLanguageSwitcher() {
        const switchers = document.querySelectorAll('[data-language-switcher]');
        switchers.forEach(switcher => {
            switcher.querySelectorAll('button[data-lang]').forEach(btn => {
                const lang = btn.getAttribute('data-lang');
                if (lang === this.currentLang) {
                    btn.classList.add('active');
                    btn.setAttribute('aria-pressed', 'true');
                } else {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-pressed', 'false');
                }
            });
        });
    }
    
    /**
     * Get current language
     */
    getLanguage() {
        return this.currentLang;
    }
}

// Create singleton instance
const i18n = new I18n();

// Export for use in other modules
export default i18n;

// Make available globally for inline scripts
window.i18n = i18n;

