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
      ],},        
  ],
    scrollBehavior(to, from, savedPosition) {
      const modals = ['project', 'imprint', 'privacy'];
    if (modals.includes(to.name as string) || modals.includes(from.name as string)) return false;
    if (savedPosition) return savedPosition;
    if (to.hash) return { el: to.hash, behavior: 'smooth' };
    return { top: 0 };
  },
});