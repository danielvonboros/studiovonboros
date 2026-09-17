<script setup lang="ts">
import { useI18n } from 'vue-i18n';


const { tm, rt } = useI18n();
</script>

<template>
  <section id="leistungen" class="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
    <div class="mx-auto mb-16 max-w-2xl text-center">
      <p class="kicker mb-4">{{ $t('pricing.kicker') }}</p>
      <h2 class="mb-6 font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05]">
        {{ $t('pricing.title') }}
      </h2>
      <p class="text-lg leading-relaxed text-espresso-soft">{{ $t('pricing.intro') }}</p>
    </div>

    <div class="grid gap-6 md:grid-cols-2 md:gap-8">
      <article class="flex flex-col bg-espresso mb-10 p-8 text-kalk md:p-12">
        <p class="kicker mb-6 !text-kalk/50">{{ $t('pricing.package.name') }}</p>
        <p class="font-display text-[clamp(2.5rem,5vw,3.5rem)] leading-none text-messing">
          {{ $t('pricing.package.price') }}
        </p>
        <p class="mt-2 text-sm uppercase tracking-wide text-kalk/50">
          {{ $t('pricing.package.period') }}
        </p>

        <ul class="mt-10 space-y-3 border-t border-espresso-soft pt-8">
          <li
            v-for="(feature, i) in tm('pricing.package.features')"
            :key="i"
            class="flex gap-3 text-kalk/80"
          >
            <span aria-hidden="true" class="text-messing">—</span>
            <span>{{ rt(feature) }}</span>
          </li>
        </ul>

        <router-link
          :to="{ path: '/', hash: '#kontakt' }"
          class="mt-auto inline-block bg-kalk px-7 py-3 text-center text-sm uppercase tracking-wide text-espresso transition-colors hover:bg-messing"
        >
          {{ $t('pricing.package.cta') }}
        </router-link>
      </article>

      <!-- Auf Anfrage (hell, umrandet) -->
      <article class="flex flex-col border border-espresso-soft mb-10 p-8 md:p-12">
        <p class="kicker mb-6">{{ $t('pricing.custom.name') }}</p>
        <p class="font-display text-[clamp(2.5rem,5vw,3.5rem)] leading-none">
          {{ $t('pricing.custom.price') }}
        </p>
        <p class="mt-2 text-sm uppercase tracking-wide text-espresso-soft">
          {{ $t('pricing.custom.period') }}
        </p>

        <p class="mt-10 pb-10 border-t border-kalk-line pt-8 leading-relaxed text-espresso-soft">
          {{ $t('pricing.custom.description') }}
        </p>

        <router-link
          :to="{ path: '/', hash: '#kontakt' }"
          class="mt-15 inline-block border border-espresso-soft px-7 py-3 text-center text-sm uppercase tracking-wide transition-colors hover:border-espresso"
        >
          {{ $t('pricing.custom.cta') }}
        </router-link>
      </article>
    </div>

    <p class="mt-12 text-center text-sm text-espresso-soft">{{ $t('pricing.note') }}</p>
  </section>
</template>