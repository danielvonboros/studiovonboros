<script setup lang="ts">
import SiteHeader from '@/components/SiteHeader.vue';
import SiteFooter from '@/components/SiteFooter.vue';
import { useScrollReveal } from '@/composables/useScrollReveal';

useScrollReveal();
</script>

<template>
  <SiteHeader />
  <main>
        <router-view />
  </main>
  <SiteFooter />
</template>
