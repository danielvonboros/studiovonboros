<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { projects } from '@/data/projects';

const props = defineProps<{ id: string }>();
const router = useRouter();

const project = computed(() => projects.find((p) => p.id === props.id));

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

      <template v-if="project">
        <img :src="project.image" :alt="project.title" class="aspect-[16/9] w-full object-cover" />
        <div class="p-8 md:p-12">
          <p class="kicker mb-3 text-espresso-soft">{{ project.category }} · {{ project.year }}</p>
          <h2 class="mb-6 font-display text-[clamp(1.8rem,5vw,3rem)] leading-[1.02]">
            {{ project.title }}
          </h2>
          <p class="leading-relaxed text-espresso-soft">{{ project.description }}</p>

          <button
            type="button"
            class="mt-10 inline-block border-b-2 border-espresso pb-1 text-sm uppercase tracking-wide hover:text-messing"
            @click="close"
          >
            {{ $t('projects.back') }}
          </button>
        </div>
      </template>

      <template v-else>
        <div class="p-12 text-center">
          <p class="text-espresso-soft">{{ $t('projects.notFound') }}</p>
          <button
            type="button"
            class="mt-6 border-b-2 border-espresso pb-1 text-sm uppercase tracking-wide"
            @click="close"
          >
            {{ $t('projects.back') }}
          </button>
        </div>
      </template>
    </div>
  </div>
</template>