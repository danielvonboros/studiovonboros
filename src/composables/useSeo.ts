import { computed, type MaybeRefOrGetter, toValue } from 'vue';
import { useHead } from '@unhead/vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { SITE_URL } from '@/site';

export function useSeo(
  pageTitle?: MaybeRefOrGetter<string | undefined>,
  description?: MaybeRefOrGetter<string | undefined>,
  options: { noindex?: boolean } = {},
) {
  const { t, locale } = useI18n();
  const route = useRoute();

  const title = computed(() => {
    const page = toValue(pageTitle);
    return page ? t('seo.titleTemplate').replace('%s', page) : t('seo.defaultTitle');
  });

  const desc = computed(() => toValue(description) ?? t('seo.description'));
  const url = computed(() => SITE_URL + route.path);
  const ogLocale = computed(() => (locale.value === 'en' ? 'en_US' : 'de_DE'));

  useHead({
    title,
    htmlAttrs: { lang: locale },
    // Jede Seite verweist auf sich selbst — sonst hält Google Projekte für Kopien der Startseite.
    link: options.noindex ? [] : [{ rel: 'canonical', href: url }],
    meta: [
      { name: 'description', content: desc },
      ...(options.noindex ? [{ name: 'robots', content: 'noindex' }] : []),
      { property: 'og:title', content: title },
      { property: 'og:description', content: desc },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: url },
      { property: 'og:image', content: `${SITE_URL}/og.jpg` },
      { property: 'og:locale', content: ogLocale },
      { property: 'og:site_name', content: 'Studio von Boros' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: desc },
    ],
  });
}
