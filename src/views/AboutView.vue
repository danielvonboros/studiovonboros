<script setup lang="ts">
import { computed } from 'vue';
import { useHead } from '@unhead/vue';
import { useI18n } from 'vue-i18n';
import { useSeo } from '@/composables/useSeo';
import { SITE_URL } from '@/site';

const { t, tm, rt } = useI18n();

const sections = computed(() => tm('about.sections') as unknown as { title: string; text: string }[]);
const facts = computed(() => tm('about.facts') as unknown as { label: string; value: string }[]);

useSeo(
  () => t('about.seoTitle'),
  () => t('about.seoDescription'),
);

// Verknüpft diese Seite mit der Person aus StructuredData.vue.
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        url: `${SITE_URL}/ueber-mich`,
        mainEntity: { '@id': `${SITE_URL}/#daniel-von-boros` },
        isPartOf: { '@id': `${SITE_URL}/#website` },
      }),
    },
  ],
});
</script>

<template>
  <article class="mx-auto max-w-3xl px-6 pb-24 pt-36 md:px-10 md:pb-32 md:pt-44">
    <p class="kicker mb-4">{{ t('about.kicker') }}</p>
    <h1 class="font-display text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.95]">
      {{ t('about.title') }}
    </h1>
    <p class="mt-8 text-xl leading-relaxed text-espresso-soft">{{ t('about.lead') }}</p>

    <!-- Platz für ein Porträt, z. B. public/daniel-von-boros.webp, im Seitenverhältnis 4:5 -->

    <section v-for="(section, i) in sections" :key="i" class="mt-16 border-t border-kalk-line pt-10">
      <h2 class="mb-4 font-display text-[clamp(1.75rem,4vw,2.5rem)] leading-[1.05]">
        {{ rt(section.title) }}
      </h2>
      <p class="text-lg leading-relaxed text-espresso-soft">{{ rt(section.text) }}</p>
    </section>

    <section class="mt-16 border-t border-kalk-line pt-10">
      <h2 class="kicker mb-6">{{ t('about.factsTitle') }}</h2>
      <dl class="grid gap-x-10 gap-y-2 md:grid-cols-[12rem_1fr] md:gap-y-4">
        <template v-for="(fact, i) in facts" :key="i">
          <dt class="text-sm uppercase tracking-wide text-espresso-soft">{{ rt(fact.label) }}</dt>
          <dd class="mb-4 md:mb-0">{{ rt(fact.value) }}</dd>
        </template>
      </dl>
    </section>

    <p class="mt-16 font-display text-2xl">{{ t('about.signature') }}</p>

    <router-link
      :to="{ hash: '#kontakt' }"
      class="mt-10 inline-block bg-espresso px-8 py-3 text-sm uppercase tracking-wide text-kalk transition-colors hover:bg-messing"
    >
      {{ t('about.cta') }}
    </router-link>
  </article>
</template>
