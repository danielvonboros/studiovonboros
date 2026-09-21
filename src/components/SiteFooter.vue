<script setup lang="ts">
import ContactForm from '@/components/ContactForm.vue';

const year = new Date().getFullYear();
</script>

<template>
  <footer id="contact" class="bg-espresso px-6 py-24 text-kalk md:px-10 md:py-32">
    <ContactForm />

    <div class="mt-20 grid gap-10 border-t border-espresso-soft pt-10 md:grid-cols-3">
      <div>
        <p class="kicker mb-3 !text-kalk/50">{{$t('footer.studioLabel')}}</p>
        <p class="text-kalk/80">{{$t('footer.studioLocation')}}</p>
        <p class="text-kalk/80">{{$t('footer.studioHours')}}</p>
      </div>
      <div>
        <p class="kicker mb-3 !text-kalk/50">{{$t('footer.socialLabel')}}</p>
        <a
          href="https://instagram.com/studiovonboros"
          rel="me noopener"
          class="block text-kalk/80 hover:text-messing"
          >Instagram</a
        >
      </div>
      <div class="md:text-right">
        <p class="kicker mb-3 !text-kalk/50">{{$t('footer.legalLabel')}}</p>
 <router-link to="/impressum" class="block text-kalk/80 hover:text-messing">
          {{ $t('legal.imprint') }}
        </router-link>
        <router-link to="/datenschutz" class="block text-kalk/80 hover:text-messing">
          {{ $t('legal.privacy') }}
        </router-link>
        <p class="mt-4 text-xs text-kalk/40">{{ year }} {{$t('footer.copyright')}}</p>
      </div>
    </div>
  </footer>
</template>
