import { createApp as createClientApp, createSSRApp } from 'vue';
import type { RouterHistory } from 'vue-router';
import App from '@/App.vue';
import { createAppRouter } from '@/router';
import { i18n } from '@/i18n';

/**
 * Gemeinsamer Aufbau für den Browser (main.ts) und das Prerendering (entry-server.ts).
 * `hydrate`: vorhandenes, vorgerendertes HTML übernehmen statt neu zu zeichnen.
 */
export function createApp(history: RouterHistory, hydrate: boolean) {
  const app = hydrate ? createSSRApp(App) : createClientApp(App);
  const router = createAppRouter(history);
  app.use(router).use(i18n);
  return { app, router };
}
