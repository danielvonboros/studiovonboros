<script setup lang="ts">
import HeroSection from '@/components/HeroSection.vue';
import FeatureBlock from '@/components/FeatureBlock.vue';
import PricingSection from '@/components/PricingSection.vue';
import { projects } from '@/data/projects';
import { useScrollReveal } from '@/composables/useScrollReveal';

useScrollReveal();
</script>

<template>
  <HeroSection />

  <section id="projects" class="mx-auto max-w-6xl px-6 md:px-10">
    <FeatureBlock
      v-for="(project, i) in projects"
      :key="project.id"
      :project="project"
      :flip="i % 2 === 1"
      class="reveal"
    />
  </section>

  <section id="studio" class="mx-auto max-w-3xl px-6 py-24 text-center md:px-10">
    <p class="kicker mb-4">{{ $t('studio.kicker') }}</p>
    <h2 class="mt-3 font-display text-[clamp(2rem,6vw,4rem)] leading-[0.95]">
      {{ $t('studio.title') }}
    </h2>
    <p class="mt-6 text-lg leading-relaxed text-espresso-soft">
      {{ $t('studio.text') }}
    </p>
  </section>
      <PricingSection />
</template>