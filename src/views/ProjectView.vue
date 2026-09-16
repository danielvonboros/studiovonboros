<script setup lang="ts">
import { computed } from 'vue';
import { projects } from '@/data/projects';

const props = defineProps<{ id: string }>();

const project = computed(() => projects.find((p) => p.id === props.id));
</script>

<template>
  <section class="mx-auto max-w-5xl px-6 py-28 md:px-10">
    <router-link
      :to="{ path: '/', hash: '#projects' }"
      class="text-sm uppercase tracking-wide text-neutral-500 hover:opacity-60"
    >
      {{ $t('projects.back') }}
    </router-link>

    <template v-if="project">
      <img
        :src="project.image"
        :alt="project.title"
        class="mt-8 aspect-[16/9] w-full object-cover"
      />
      <p class="mt-8 text-xs uppercase tracking-[0.2em] text-neutral-500">
        {{ project.category }} · {{ project.year }}
      </p>
      <h1 class="mt-3 text-[clamp(2rem,6vw,4rem)] font-extrabold uppercase leading-[0.95]">
        {{ project.title }}
      </h1>
      <p class="mt-6 max-w-prose text-lg leading-relaxed text-neutral-700">
        {{ project.description }}
      </p>
    </template>

    <template v-else>
      <p class="mt-16 text-lg text-neutral-600">{{$t('projects.notFound')}}</p>
    </template>
  </section>
</template>