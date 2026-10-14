<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useSeo } from '@/composables/useSeo';

const { t } = useI18n();

useSeo(() => t('notFound.title'), undefined, { noindex: true });
</script>

<template>
  <section class="mx-auto flex min-h-[70svh] max-w-3xl flex-col justify-center px-6 pb-24 pt-36 md:px-10">
    <p class="kicker mb-4">{{ t('notFound.kicker') }}</p>
    <h1 class="font-display text-[clamp(2.5rem,7vw,5rem)] leading-[0.95]">{{ t('notFound.title') }}</h1>
    <p class="mt-6 text-lg text-espresso-soft">{{ t('notFound.text') }}</p>
    <router-link to="/" class="link-underline mt-10 self-start">{{ t('notFound.cta') }}</router-link>
  </section>
</template>
