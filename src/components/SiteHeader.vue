<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

// `ref` ist Vues reaktiver State — wie Reacts useState.
// Im <script> liest/schreibst du den Wert ueber `.value`,
// im <template> direkt (Vue packt ihn dort automatisch aus).
const open = ref(false);
const scrolled = ref(false);

const links = [
  { label: 'Projekte', href: '#projekte' },
  { label: 'Studio', href: '#studio' },
  { label: 'Kontakt', href: '#kontakt' },
];

// Ab 80px Scroll bekommt der Header einen Hintergrund, damit die
// Navigation auf hellen Projektbildern lesbar bleibt.
const onScroll = () => (scrolled.value = window.scrollY > 80);

onMounted(() => {
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
});
onUnmounted(() => window.removeEventListener('scroll', onScroll));
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-colors duration-500"
    :class="scrolled ? 'bg-kalk/92 text-espresso backdrop-blur-sm' : 'text-kalk'"
  >
    <div class="flex items-center justify-between px-6 py-5 md:px-10">
      <a href="#" class="leading-none">
        <span class="block font-display text-xl tracking-tight md:text-2xl">von Boros</span>
        <span class="block text-[0.6rem] uppercase tracking-[0.32em] opacity-70">Studio</span>
      </a>

      <!-- v-for ist Vues .map(); :key entspricht Reacts key -->
      <nav class="hidden gap-10 md:flex">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="text-xs uppercase tracking-[0.18em] transition-opacity hover:opacity-60"
        >
          {{ link.label }}
        </a>
      </nav>

      <!-- @click ist onClick; open = !open schaltet den State um -->
      <button
        class="text-xs uppercase tracking-[0.18em] md:hidden"
        :aria-expanded="open"
        aria-controls="mobile-menu"
        @click="open = !open"
      >
        {{ open ? 'Schließen' : 'Menü' }}
      </button>
    </div>
  </header>

  <!-- v-if ist wie {open && (...)} in React -->
  <div
    v-if="open"
    id="mobile-menu"
    class="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-espresso text-kalk md:hidden"
  >
    <a
      v-for="link in links"
      :key="link.href"
      :href="link.href"
      class="font-display text-3xl"
      @click="open = false"
    >
      {{ link.label }}
    </a>
  </div>
</template>
