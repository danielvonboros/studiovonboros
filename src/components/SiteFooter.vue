<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<template>
  <footer id="kontakt" class="bg-espresso px-6 py-24 text-kalk md:px-10 md:py-32">
    <p class="max-w-3xl font-display text-[clamp(2.25rem,6vw,5rem)] leading-[1.02]">
      Erzähl mir von deinem Raum.
    </p>

    <a href="mailto:hallo@studiovonboros.com" class="link-underline mt-10 text-messing">
      hallo@studiovonboros.com
    </a>

    <div class="mt-20 grid gap-10 border-t border-espresso-soft pt-10 md:grid-cols-3">
      <div>
        <p class="kicker mb-3 !text-kalk/50">Studio</p>
        <p class="text-kalk/80">Berlin, Deutschland</p>
        <p class="text-kalk/80">Termine nach Vereinbarung</p>
      </div>
      <div>
        <p class="kicker mb-3 !text-kalk/50">Social</p>
        <a
          href="https://instagram.com/studiovonboros"
          rel="me noopener"
          class="block text-kalk/80 hover:text-messing"
          >Instagram</a
        >
      </div>
      <div class="md:text-right">
        <p class="kicker mb-3 !text-kalk/50">Rechtliches</p>
        <a href="/impressum" class="block text-kalk/80 hover:text-messing">Impressum</a>
        <a href="/datenschutz" class="block text-kalk/80 hover:text-messing">Datenschutz</a>
        <p class="mt-4 text-xs text-kalk/40">© {{ year }} Studio von Boros</p>
      </div>
    </div>
  </footer>
</template>
