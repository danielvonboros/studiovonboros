<script setup lang="ts">
import { computed } from 'vue';
import { useHead } from '@unhead/vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

const { tm, rt } = useI18n();

const items = computed(() =>
  (tm('faq.items') as unknown as { q: string; a: string }[]).map((item) => ({
    q: rt(item.q),
    a: rt(item.a),
  })),
);

const route = useRoute();
useHead({
  script: computed(() =>
    route.path === '/'
      ? [
          {
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: items.value.map((item) => ({
                '@type': 'Question',
                name: item.q,
                acceptedAnswer: { '@type': 'Answer', text: item.a },
              })),
            }),
          },
        ]
      : [],
  ),
});
</script>

<template>
  <section id="fragen" class="mx-auto max-w-3xl px-6 pb-24 md:px-10 md:pb-32">
    <div class="mb-12 text-center">
      <p class="kicker mb-4">{{ $t('faq.kicker') }}</p>
      <h2 class="font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05]">
        {{ $t('faq.title') }}
      </h2>
    </div>


    <details v-for="(item, i) in items" :key="i" class="group border-t border-kalk-line last:border-b">
      <summary
        class="flex cursor-pointer list-none items-baseline justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden"
      >
        <h3 class="font-display text-[clamp(1.35rem,2.5vw,1.75rem)] leading-[1.15]">{{ item.q }}</h3>
        <span
          aria-hidden="true"
          class="text-2xl leading-none text-messing transition-transform duration-300 group-open:rotate-45"
          >+</span
        >
      </summary>
      <p class="max-w-prose pb-8 leading-relaxed text-espresso-soft">{{ item.a }}</p>
    </details>
  </section>
</template>
