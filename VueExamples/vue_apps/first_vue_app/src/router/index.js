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
    {
      path: "/inject",
      name: "inject",
      component: () => import("../views/vue_basic/InjectView.vue"),
    },
    {
      path: "/transition",
      name: "transition",
      component: () => import("../views/vue_basic/TransitionView.vue"),
    },
    {
      path: "/animation",
      name: "animation",
      component: () => import("../views/vue_basic/AnimationView.vue"),
    },
    {
      path: "/nested",
      name: "nested",
      component: () => import("../views/vue_basic/NestedTransitionView.vue"),
    },
    {
      path: "/transition-group",
      name: "transition-group",
      component: () => import("../views/vue_basic/TransitionGroupView.vue"),
    },
    {
      path: "/gasp-animation",
      name: "gasp-animation",
      component: () => import("../views/vue_basic/GaspAnimationView.vue"),
    },
    {
      path: "/reactive-state",
      name: "reactive-state",
      component: () => import("../views/vue_basic/UseReactiveState.vue"),
    },
  ],
})

export default router
