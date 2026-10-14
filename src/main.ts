import { createWebHistory } from 'vue-router';
import { createHead } from '@unhead/vue/client';
import { createApp } from '@/app';
import { applyLocale, getPreferredLocale } from '@/i18n';
import '@/style.css';

import '@fontsource/instrument-serif/400.css';
import '@fontsource-variable/archivo';

// Im Build ist #app schon mit vorgerendertem HTML gefüllt, im Dev-Server noch leer.
const prerendered = document.getElementById('app')?.hasChildNodes() ?? false;

const { app, router } = createApp(createWebHistory(), prerendered);
app.use(createHead());

// Erst mounten, wenn der Router die Seite (inkl. Lazy-Komponenten) aufgelöst hat —
// sonst passt der erste Render nicht zum vorgerenderten HTML.
router.isReady().then(() => {
  app.mount('#app');
  applyLocale(getPreferredLocale());
});
