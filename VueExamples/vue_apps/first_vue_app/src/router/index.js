import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/blog",
      name: "blog",
      component: () => import("../views/vue_basic/BlogView.vue"),
    },
    {
      path: "/todo",
      name: "todo",
      component: () => import("../views/vue_basic/TodoItemListView.vue"),
    },
    {
      path: "/user",
      name: "user",
      component: () => import("../views/vue_basic/UserInfo.vue"),
    },
  ],
})

export default router
