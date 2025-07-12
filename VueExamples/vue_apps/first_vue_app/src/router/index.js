import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/vue_basic/01_TemplateSyntax',
      name: 'template-syntax',
      component: () => import('../views/vue_basic/01_TemplateSyntaxView.vue'),
    },
  ],
})

export default router
