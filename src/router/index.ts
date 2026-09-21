import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import ProjectModal from '@/components/ProjectModal.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {path: '/',
      component: HomeView,
      children: [
        { path: 'projekte/:id', name: 'project', component: ProjectModal, props: true },
      ],},
    { path: '/:pathMatch(.*)*', redirect: '/' },
        {
      path: '/impressum',
      name: 'imprint',
      component: () => import('@/views/LegalView.vue'),
      props: { doc: 'imprint' },
    },
    {
      path: '/datenschutz',
      name: 'privacy',
      component: () => import('@/views/LegalView.vue'),
      props: { doc: 'privacy' },
    },
  ],
    scrollBehavior(to, from, savedPosition) {
    if (to.name === 'project' || from.name === 'project') return false;
    if (savedPosition) return savedPosition;
    if (to.hash) return { el: to.hash, behavior: 'smooth' };
    return { top: 0 };
  },
});