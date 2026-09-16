<script setup lang="ts">
import type { Project } from '@/types';

defineProps<{ project: Project; flip?: boolean; index?: number }>();
</script>

<template>
  <article
    :id="project.id"
    class="grid items-center gap-10 border-t border-kalk-line py-20 md:grid-cols-2 md:gap-20 md:py-28"
  >
    <div :class="flip ? 'md:order-2' : ''">
      <div class="overflow-hidden bg-kalk-line">
        <img
          :src="project.image"
          :alt="project.title"
          loading="lazy"
          decoding="async"
          class="aspect-4/3 w-full object-cover transition-transform duration-[1.2s] ease-out hover:scale-[1.04]"
        />
      </div>
    </div>

    <div>
      <p class="kicker mb-4">
        <span v-if="index !== undefined" class="text-messing"
          >{{ String(index + 1).padStart(2, '0') }} —
        </span>
        {{ project.category }} · {{ project.year }}
      </p>
      <h2 class="mb-6 font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.02]">
        {{ project.title }}
      </h2>
      <p class="mb-8 max-w-prose leading-relaxed text-espresso-soft">{{ project.description }}</p>
<router-link
        :to="`/projekte/${project.id}`"
        class="inline-block border-b-2 border-black pb-1 text-sm uppercase tracking-wide hover:opacity-60"
      >
        {{ $t('projects.more') }}
      </router-link>    </div>
  </article>
</template>
