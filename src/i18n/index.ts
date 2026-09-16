import { createI18n } from 'vue-i18n';
import de from '@/locales/de.json';
import en from '@/locales/en.json';

export type Locale = 'de' | 'en';

const STORAGE_KEY = 'svb-locale';

function getStartLocale(): Locale {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'de' || saved === 'en') return saved;
  return navigator.language.startsWith('de') ? 'de' : 'en';
}

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: getStartLocale(),
  fallbackLocale: 'de',
  messages: { de, en },
});

export function setLocale(locale: Locale) {
  i18n.global.locale.value = locale;
  localStorage.setItem(STORAGE_KEY, locale);
  document.documentElement.lang = locale;
}