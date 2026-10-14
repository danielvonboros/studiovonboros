import { createRouter, type RouterHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import ProjectModal from '@/components/ProjectModal.vue';

// Fabrik statt Singleton: Der Browser nutzt die Web-History, das Prerendering eine Memory-History.
export function createAppRouter(history: RouterHistory) {
  return createRouter({
    history,
    routes: [
      {
        path: '/',
        component: HomeView,
        children: [
          { path: 'projekte/:id', name: 'project', component: ProjectModal, props: true },
          {
            path: 'impressum',
            name: 'imprint',
            component: () => import('@/components/LegalModal.vue'),
            props: { doc: 'imprint' },
          },
          {
            path: 'datenschutz',
            name: 'privacy',
            component: () => import('@/components/LegalModal.vue'),
            props: { doc: 'privacy' },
          },
        ],
      },
      { path: '/ueber-mich', name: 'about', component: () => import('@/views/AboutView.vue') },
      // Alles Unbekannte landet hier — wird als 404.html vorgerendert.
      { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/views/NotFoundView.vue') },
    ],
    scrollBehavior(to, from, savedPosition) {
      const modals = ['project', 'imprint', 'privacy'];
      if (modals.includes(to.name as string) || modals.includes(from.name as string)) return false;
      if (savedPosition) return savedPosition;
      if (to.hash) return { el: to.hash, behavior: 'smooth' };
      return { top: 0 };
    },
  });
}
