import { computed, type MaybeRefOrGetter, toValue } from 'vue';
import { useHead } from '@unhead/vue';
import { useI18n } from 'vue-i18n';

export function useSeo(pageTitle?: MaybeRefOrGetter<string | undefined>, description?: MaybeRefOrGetter<string | undefined>) {
  const { t, locale } = useI18n();

  const title = computed(() => {
    const page = toValue(pageTitle);
    return page ? t('seo.titleTemplate').replace('%s', page) : t('seo.defaultTitle');
  });

  const desc = computed(() => toValue(description) ?? t('seo.description'));

  useHead({
    title,
    htmlAttrs: { lang: locale },
    meta: [
      { name: 'description', content: desc },
      { property: 'og:title', content: title },
      { property: 'og:description', content: desc },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Studio von Boros' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: desc },
    ],
  });
}