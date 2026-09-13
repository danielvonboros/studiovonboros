<script setup lang="ts">
// Komponenten importieren = sie im Template benutzbar machen.
import SiteHeader from '@/components/SiteHeader.vue';
import HeroSection from '@/components/HeroSection.vue';
import FeatureBlock from '@/components/FeatureBlock.vue';
import SiteFooter from '@/components/SiteFooter.vue';
import { projects } from '@/data/projects';
import { useScrollReveal } from '@/composables/useScrollReveal';

useScrollReveal();
</script>

<template>
  <SiteHeader />

  <main>
    <HeroSection />

    <section id="projekte" class="mx-auto max-w-6xl px-6 md:px-10">
      <!-- (project, i) gibt dir auch den Index — hier fuer abwechselndes Layout -->
      <FeatureBlock
        v-for="(project, i) in projects"
        :key="project.id"
        :project="project"
        :flip="i % 2 === 1"
        :index="i"
        class="reveal"
      />
    </section>

    <section id="studio" class="border-t border-kalk-line">
      <div class="mx-auto max-w-3xl px-6 py-28 text-center md:px-10 md:py-36">
        <p class="kicker mb-6">Studio</p>
        <h2 class="mb-8 font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05]">
          Ein Büro, ein Ansprechpartner, ein Maßstab.
        </h2>
        <p class="text-lg leading-relaxed text-espresso-soft">
          Studio von Boros ist mein Büro für Innenarchitektur und Möbel nach Maß in Berlin. Ich
          plane, zeichne und begleite die Ausführung selbst — vom ersten Aufmaß bis zur montierten
          Front. Der Fokus liegt auf dem ungenutzten Potenzial städtischer Wohnungen: durchdachte
          Einbauten, ehrliche Materialien und Räume, die den Alltag leichter machen.
        </p>
      </div>
    </section>
  </main>

  <SiteFooter />
</template>
