initializeI8n();
"use strict";

function applyTranslations(locale) {
    const translatableElements = document.querySelectorAll("[data-i18n]");
    console.log(translatableElements);
    const labelElements = document.querySelectorAll("[data-i18n-label]");
    const placeholderElements = document.querySelectorAll("[data-i18n-placeholder]");
    const dict = window.translations?.[locale];
    

    console.log(window.translations);
    console.log(locale);
    for (let i = 0; i < translatableElements.length; i++) {
        const element = translatableElements[i];
        const key = element.dataset.i18n;
        const translatedText = dict[key];
        if (translatedText) element.innerHTML = translatedText;
    }

    for (let i = 0; i < labelElements.length; i++) {
        const element = labelElements[i];
        const key = element.dataset.i18n;
        const translatedLabel = dict[key];
        if (translatedLabel) element.setAttribute("label", translatedLabel);
    }

    for (let i = 0; i < placeholderElements.length; i++) {
        const element = placeholderElements[i];
        const key = element.dataset.i18nPlaceholder;
        const translated = dict[key];
        if (translated) element.placeholder = translated;
    }
    
    document.documentElement.lang = locale;
}

function setLocale(locale) {
    const selectedLocale = window.translations[locale] ? locale : 'es';
    localStorage.setItem('preferredLanguage', selectedLocale);
    applyTranslations(selectedLocale);
}

window.setLocale = setLocale;

function getSavedLocale() {
    const savedLocale = localStorage.getItem('preferredLanguage');
    return translations[savedLocale] ? savedLocale : 'es';
}

function initializeLanguageSwitcher(locale) {
    const languageSwitcher = document.querySelector('#language-switcher');

    if (languageSwitcher) languageSwitcher.value = locale;
}

function initializeI8n() {
    const translatableElements = document.querySelectorAll('[data-i18n]');
    const languageSwitcher = document.querySelector('#language-switcher');
    
    if (translatableElements.length === 0 && !languageSwitcher) {
        console.error('Esta página no está preparada para soportar i18n.');
        return;
    }

    const initialLocale = getSavedLocale();
    applyTranslations(initialLocale);
    initializeLanguageSwitcher(initialLocale);
}

let dateErrorCount = 0;
function formatDate(dateValue, locale) {
    try {
        const resolvedLocale = locale === 'en' ? 'en-US' : 'es-ES';
        return new Intl.DateTimeFormat(resolvedLocale, {
            dateStyle: 'long',
            timeStyle: 'short'
        }).format(dateValue);
    } catch (error) {
        dateErrorCount++;
        let errorMessage = "The date is not completed";
        console.error(errorMessage + `(${dateErrorCount})`);
        return "";
    }
}