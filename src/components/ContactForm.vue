<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const form = reactive({ name: '', email: '', message: '', company: '' }); // company = Honeypot
const status = ref<'idle' | 'sending' | 'success' | 'error'>('idle');

async function submit() {
  status.value = 'sending';
  try {
    const res = await fetch('/.netlify/functions/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok || !data.ok) throw new Error(data.error ?? 'error');
    status.value = 'success';
    form.name = '';
    form.email = '';
    form.message = '';
  } catch {
    status.value = 'error';
  }
}
</script>

<template>
  <div id="kontakt" class="mx-auto mt-20 max-w-2xl border-t border-espresso-soft pt-12">
    <p class="kicker mb-4 !text-kalk/50">{{ t('contact.kicker') }}</p>
    <h2 class="mb-10 font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] text-kalk">
      {{ t('contact.title') }}
    </h2>

    <form v-if="status !== 'success'" class="space-y-6" @submit.prevent="submit">
      <div>
        <label for="cf-name" class="kicker mb-2 block !text-kalk/50">{{ t('contact.name') }}</label>
        <input
          id="cf-name"
          v-model.trim="form.name"
          type="text"
          required
          class="w-full border border-kalk/30 bg-transparent px-4 py-3 text-kalk focus:border-kalk focus:outline-none"
        />
      </div>

      <div>
        <label for="cf-email" class="kicker mb-2 block !text-kalk/50">{{ t('contact.email') }}</label>
        <input
          id="cf-email"
          v-model.trim="form.email"
          type="email"
          required
          class="w-full border border-kalk/30 bg-transparent px-4 py-3 text-kalk focus:border-kalk focus:outline-none"
        />
      </div>

      <div>
        <label for="cf-message" class="kicker mb-2 block !text-kalk/50">{{ t('contact.message') }}</label>
        <textarea
          id="cf-message"
          v-model.trim="form.message"
          rows="5"
          required
          class="w-full border border-kalk/30 bg-transparent px-4 py-3 text-kalk focus:border-kalk focus:outline-none"
        ></textarea>
      </div>

      <!-- Honeypot: unsichtbar für Menschen -->
      <input
        v-model="form.company"
        type="text"
        tabindex="-1"
        autocomplete="off"
        aria-hidden="true"
        class="hidden"
      />

      <button
        type="submit"
        :disabled="status === 'sending'"
        class="inline-block bg-kalk px-8 py-3 text-sm uppercase tracking-wide text-espresso transition-colors hover:bg-messing disabled:opacity-50"
      >
        {{ status === 'sending' ? t('contact.sending') : t('contact.submit') }}
      </button>

      <p v-if="status === 'error'" class="text-sm text-red-300">{{ t('contact.error') }}</p>
    </form>

    <p v-else class="text-lg text-kalk/80">{{ t('contact.success') }}</p>
  </div>
</template>