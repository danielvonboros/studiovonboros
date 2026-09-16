<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { setLocale, type Locale } from '@/i18n';

const { locale } = useI18n();

const locales: Locale[] = ['de', 'en'];
</script>

<template>
  <div class="flex items-center gap-1 text-sm uppercase tracking-wide">
    <template v-for="(l, i) in locales" :key="l">
      <button
        type="button"
        class="transition-opacity"
        :class="locale === l ? 'opacity-100' : 'opacity-40 hover:opacity-70'"
        :aria-current="locale === l ? 'true' : undefined"
        @click="setLocale(l)"
      >
        {{ l }}
      </button>
      <span v-if="i === 0" aria-hidden="true" class="opacity-40">/</span>
    </template>
  </div>
</template>