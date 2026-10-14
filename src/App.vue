<script setup lang="ts">
import SiteHeader from '@/components/SiteHeader.vue';
import SiteFooter from '@/components/SiteFooter.vue';
import StructuredData from '@/components/StructuredData.vue';
import { useScrollReveal } from '@/composables/useScrollReveal';

useScrollReveal();
</script>

<template>
  <StructuredData />
  <SiteHeader />
  <main>
        <router-view />
  </main>
  <SiteFooter />
</template>
