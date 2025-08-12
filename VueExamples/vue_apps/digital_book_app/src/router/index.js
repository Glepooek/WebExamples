import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import { useUserInfoStore } from '@/stores/userInfo'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'bookList',
      component: () => import('../views/BookListView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/digitalBook/:fileName/:secretKey',
      name: 'digitalBook',
      component: () => import('../views/DigitalBookView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/userInfo/:userId(\\d+)?',
      name: 'userInfo',
      component: () => import('../views/UserInfo.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'userInfoHome',
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

router.beforeEach((to, from, next) => {
  const userInfoStore = useUserInfoStore()

  // 如果已登录且尝试访问登录页，则重定向到图书列表页
  if (to.name === 'login' && userInfoStore.hasToken) {
    next({ name: 'bookList' })
    return
  }

  // 如果路由需要认证且用户未登录，则重定向到登录页
  if (to.meta.requiresAuth && !userInfoStore.hasToken) {
    next({ name: 'login' })
    return
  }

  next()
})

export default router