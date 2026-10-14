import { createMemoryHistory } from 'vue-router';
import { renderToString } from 'vue/server-renderer';
import { createHead, transformHtmlTemplate } from '@unhead/vue/server';
import { createApp } from '@/app';
import { projects } from '@/data/projects';

export { SITE_URL } from '@/site';

// Alle Seiten, die beim Build als fertiges HTML entstehen (und in der Sitemap landen).
export const routes = [
  '/',
  '/ueber-mich',
  ...projects.map((project) => `/projekte/${project.id}`),
  '/impressum',
  '/datenschutz',
];

// Irgendein unbekannter Pfad — daraus wird 404.html.
export const notFoundRoute = '/404';

/** Rendert eine Route in das gebaute index.html (dist/index.html) hinein. */
export async function render(url: string, template: string) {
  const { app, router } = createApp(createMemoryHistory(), true);
  const head = createHead();
  app.use(head);

  await router.push(url);
  await router.isReady();

  const appHtml = await renderToString(app);
  const html = template.replace('<div id="app"></div>', `<div id="app">${appHtml}</div>`);
  return transformHtmlTemplate(head, html);
}
