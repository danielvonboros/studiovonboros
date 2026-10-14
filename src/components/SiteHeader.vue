<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import LocaleSwitch from '@/components/LocaleSwitch.vue';

const open = ref(false);
const route = useRoute();
const header = ref<HTMLElement>();

const overHero = ref(Boolean(route.meta.hero));

function updateOverHero() {
  const hero = document.querySelector('[data-hero]');
  overHero.value = !!hero && !!header.value && hero.getBoundingClientRect().bottom > header.value.offsetHeight;
}

onMounted(() => {
  updateOverHero();
  window.addEventListener('scroll', updateOverHero, { passive: true });
  window.addEventListener('resize', updateOverHero);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateOverHero);
  window.removeEventListener('resize', updateOverHero);
});

watch(
  () => route.path,
  () => nextTick(updateOverHero),
);

const links = [
  { label: `nav.projects`, hash: '#projects' },
  { label: 'nav.studio', hash: '#studio' },
  { label: 'nav.contact', hash: '#contact' },
];
</script>

<template>
  <header
    ref="header"
    class="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5"
    :class="overHero && !open ? 'text-kalk' : 'text-white mix-blend-difference'"
  >
    <router-link to="/" class="text-lg font-extrabold uppercase tracking-tight">
      Studio von Boros
    </router-link>

    <nav class="hidden gap-8 md:flex">
      <router-link
        v-for="link in links"
        :key="link.hash"
        :to="{ path: '/', hash: link.hash }"
        class="text-sm uppercase tracking-wide hover:opacity-60"
      >
        {{ $t(link.label) }}
      </router-link>
      <LocaleSwitch />
    </nav>
    
    <button class="md:hidden" :aria-expanded="open" aria-label="Menü" @click="open = !open">
      <span class="text-sm uppercase tracking-wide">{{ open ? $t('nav.menuClose') : $t('nav.menuOpen') }}</span>
    </button>
  </header>

  <div
    v-if="open"
    class="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-black text-white md:hidden"
  >
    <router-link
      v-for="link in links"
      :key="link.hash"
      :to="{ path: '/', hash: link.hash }"
      class="text-2xl uppercase"
      @click="open = false"
    >
      {{ $t(link.label) }}
    </router-link>
    <LocaleSwitch class="mt-4" />
  </div>
</template>