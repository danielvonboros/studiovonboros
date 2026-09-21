<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';
import { useSeo } from '@/composables/useSeo';

// Welches Dokument? Kommt als Prop aus der Route ('imprint' | 'privacy').
const props = defineProps<{ doc: 'imprint' | 'privacy' }>();

const { locale, t } = useI18n();
const html = ref('');
const loading = ref(true);

// Lädt /legal/<doc>.<locale>.html aus dem public-Ordner.
// Reagiert auf Sprachwechsel UND Dokumentwechsel.
watchEffect(async () => {
  loading.value = true;
  try {
    const res = await fetch(`/legal/${props.doc}.${locale.value}.html`);
    html.value = res.ok ? await res.text() : '<p>Dokument nicht gefunden.</p>';
  } catch {
    html.value = '<p>Dokument konnte nicht geladen werden.</p>';
  } finally {
    loading.value = false;
  }
});

const pageTitle = () => (props.doc === 'imprint' ? t('legal.imprint') : t('legal.privacy'));
useSeo(pageTitle);
</script>

<template>
  <section class="mx-auto max-w-3xl px-6 py-28 md:px-10">
    <h1 class="mb-10 font-display text-[clamp(2rem,5vw,3.25rem)] leading-[1.05]">
      {{ pageTitle() }}
    </h1>

    <p v-if="loading" class="text-espresso-soft">…</p>

    <!-- legal-prose gibt den Rechtstexten lesbares Styling (s. style.css unten) -->
    <div v-else class="legal-prose" v-html="html" />
  </section>
</template>