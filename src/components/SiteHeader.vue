<script setup lang="ts">
import { ref } from 'vue';

const open = ref(false);

const links = [
  { label: 'nav.projects', hash: '#projekte' },
  { label: 'nav.studio', hash: '#studio' },
  { label: 'nav.contact', hash: '#kontakt' },
];
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 text-white mix-blend-difference"
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
        {{ link.label }}
      </router-link>
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
      {{ link.label }}
    </router-link>
  </div>
</template>