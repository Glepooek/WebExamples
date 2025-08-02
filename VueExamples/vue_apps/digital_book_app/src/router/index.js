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
      component: () => import('../views/DigitalBookView.vue'),
    },
    {
      path: '/bookList',
      name: 'bookList',
      component: () => import('../views/BookListView.vue'),
    },
    {
      path: '/userInfo/:userId(\\d+)?',
      name: 'userInfo',
      component: () => import('../views/UserInfo.vue'),
      children: [
        {
          path: '',
          component: () => import('../views/UserInfoHome.vue'),
        },
        {
          path: 'profile',
          component: () => import('../views/UserInfoProfile.vue'),
        },
        {
          path: 'posts',
          component: () => import('../views/UserInfoPosts.vue'),
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue')
    }
  ],
  strict: true, // 严格模式，对尾随斜线敏感
  sensitive: true // 匹配大小写敏感
})

export default router