<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useSeo } from '@/composables/useSeo';

const props = defineProps<{ doc: 'imprint' | 'privacy' }>();

const router = useRouter();
const { locale, t } = useI18n();

// Texte werden mitgebaut statt nachgeladen — so stehen sie auch im vorgerenderten HTML.
const docs = import.meta.glob<string>('@/legal/*.html', { query: '?raw', import: 'default', eager: true });
const html = computed(
  () => docs[`/src/legal/${props.doc}.${locale.value}.html`] ?? '<p>Dokument nicht gefunden.</p>',
);

const pageTitle = () => (props.doc === 'imprint' ? t('legal.imprint') : t('legal.privacy'));
useSeo(pageTitle);

function close() {
  router.push({ path: '/' });
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') close();
}

onMounted(() => {
  document.body.style.overflow = 'hidden';
  window.addEventListener('keydown', onKey);
});
onBeforeUnmount(() => {
  document.body.style.overflow = '';
  window.removeEventListener('keydown', onKey);
});
</script>

<template>
  <!-- Kein <Teleport to="body"> mehr: Das lässt sich nicht sauber vorrendern. Fixed + z-index reicht, wie beim ProjectModal. -->
  <div
    class="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-espresso/70 px-4 py-10 backdrop-blur-sm md:py-16"
    role="dialog"
    aria-modal="true"
    @click.self="close"
  >
    <div class="relative w-full max-w-3xl bg-kalk shadow-2xl">
      <button
        type="button"
        class="absolute right-4 top-4 z-10 text-2xl leading-none text-espresso hover:text-messing"
        aria-label="Schließen"
        @click="close"
      >
        &times;
      </button>

      <div class="p-8 md:p-12">
        <h1 class="mb-8 font-display text-[clamp(1.8rem,4vw,2.75rem)] leading-[1.05]">
          {{ pageTitle() }}
        </h1>
        <div class="legal-prose" v-html="html" />
      </div>
    </div>
  </div>
</template>
