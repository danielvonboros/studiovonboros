<script setup lang="ts">
import HeroSection from '@/components/HeroSection.vue';
import FeatureBlock from '@/components/FeatureBlock.vue';
import { projects } from '@/data/projects';
import { useScrollReveal } from '@/composables/useScrollReveal';

useScrollReveal();
</script>

<template>
  <HeroSection />

  <section id="projekte" class="mx-auto max-w-6xl px-6 md:px-10">
    <FeatureBlock
      v-for="(project, i) in projects"
      :key="project.id"
      :project="project"
      :flip="i % 2 === 1"
      class="reveal"
    />
  </section>

  <section id="studio" class="mx-auto max-w-3xl px-6 py-24 text-center md:px-10">
    <p class="mb-4 text-xs uppercase tracking-[0.2em] text-neutral-500">Studio</p>
    <h2 class="mb-6 text-[clamp(1.8rem,4vw,3rem)] font-extrabold uppercase">
      Über Studio von Boros
    </h2>
    <p class="text-lg leading-relaxed text-neutral-700">
      Studio von Boros gestaltet Innenräume und Möbel nach Maß. Der Fokus liegt auf dem ungenutzten
      Potenzial kleiner Stadtwohnungen — durchdachte Einbauten, ehrliche Materialien und Räume, die
      den Alltag leichter machen.
    </p>
  </section>
</template>