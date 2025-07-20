import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/digitalBook',
      name: 'digitalBook',
      component:  () => import('../views/DigitalBookView.vue'),
    },
    {
      path: '/bookList',
      name: 'bookList',
      component: () => import('../views/BookListView.vue'),
    },
  ],
})

export default router
