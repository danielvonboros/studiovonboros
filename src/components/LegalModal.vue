<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useSeo } from '@/composables/useSeo';

const props = defineProps<{ doc: 'imprint' | 'privacy' }>();

const router = useRouter();
const { locale, t } = useI18n();

const html = ref('');
const loading = ref(true);

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

function close() {
  router.push({ path: '/' });
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') close();
}

import { onMounted, onBeforeUnmount } from 'vue';
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
  <Teleport to="body">
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
          <p v-if="loading" class="text-espresso-soft">…</p>
          <div v-else class="legal-prose" v-html="html" />
        </div>
      </div>
    </div>
  </Teleport>
</template>