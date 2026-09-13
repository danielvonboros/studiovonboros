<script setup lang="ts">

withDefaults(
  defineProps<{
    image?: string;
    kicker?: string;
    title?: string;
    intro?: string;
  }>(),
  {
    image: '/hero.jpg',
    kicker: 'Innenarchitektur · Möbel nach Maß · Berlin',
    title: 'Räume mit Haltung.',
    intro:
      'Ich entwerfe Innenräume, Einbauten und Möbel nach Maß — für Wohnungen, in denen jeder Zentimeter eine Entscheidung ist.',
  },
);
</script>

<template>
  <section class="relative flex h-svh min-h-[560px] items-end overflow-hidden bg-espresso">
    <img
      :src="image"
      alt=""
      fetchpriority="high"
      class="absolute inset-0 h-full w-full object-cover"
    />
    <div class="absolute inset-0 bg-gradient-to-t from-espresso/85 via-espresso/25 to-transparent" />

    <div class="relative z-10 w-full px-6 pb-16 text-kalk md:px-10 md:pb-24">
      <p class="kicker mb-5 !text-kalk/75">{{ kicker }}</p>
      <h1 class="max-w-4xl font-display text-[clamp(2.75rem,8vw,7rem)] leading-[0.95]">
        {{ title }}
      </h1>
      <p class="mt-7 max-w-lg text-lg leading-relaxed text-kalk/85">{{ intro }}</p>
      <a href="#projekte" class="link-underline mt-10">Projekte ansehen</a>
    </div>
  </section>
</template>
