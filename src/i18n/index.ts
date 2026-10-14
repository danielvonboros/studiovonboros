import { createI18n } from 'vue-i18n';
import de from '@/locales/de.json';
import en from '@/locales/en.json';

export type Locale = 'de' | 'en';

const STORAGE_KEY = 'svb-locale';

// Startet immer auf Deutsch: So entspricht der erste Client-Render dem vorgerenderten HTML.
// Die bevorzugte Sprache setzt main.ts erst nach der Hydration.
export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'de',
  fallbackLocale: 'de',
  messages: { de, en },
});

/** Gespeicherte oder Browser-Sprache — nur im Browser aufrufen. */
export function getPreferredLocale(): Locale {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'de' || saved === 'en') return saved;
  return navigator.language.startsWith('de') ? 'de' : 'en';
}

export function applyLocale(locale: Locale) {
  i18n.global.locale.value = locale;
  document.documentElement.lang = locale;
}

export function setLocale(locale: Locale) {
  applyLocale(locale);
  localStorage.setItem(STORAGE_KEY, locale);
}
