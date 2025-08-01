Vue Router是Vue官方的客户端路由解决方案。
客户端路由的作用是：在单页应用 (SPA) 中将浏览器的URL和用户看到的内容绑定起来。当用户在应用中浏览不同页面时，URL会随之更新，但页面不需要从服务器重新加载。

## 根组件App.vue

```vue
<template>
  <h1>Hello App!</h1>
  <p><strong>Current route path:</strong> {{ $route.fullPath }}</p>
  <nav>
    <RouterLink to="/">Go to Home</RouterLink>
    <RouterLink to="/about">Go to About</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>
```

在这个`template`中使用了两个由Vue Router提供的组件: 

* RouterLink，创建链接。这使得Vue Router能够在不重新加载页面的情况下改变URL，处理URL的生成、编码和其他功能。
* RouterView，使Vue Router知道你想要在哪里渲染当前URL路径对应的路由组件。

上述示例还使用了 {{ $route.fullPath }} 。你可以在组件模板中使用 $route 来访问当前的路由对象。

## 创建路由器实例（index.js）

```js
import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from './HomeView.vue'
import AboutView from './AboutView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/about', component: AboutView },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router
```

路由实例是通过调用`createRouter()`函数创建的。

* `routes`选项定义一组路由，把URL路径映射到组件。`component`参数指定的组件在`RouterView`中被渲染。
* `history`选项控制了路由和URL路径是如何双向映射的。使用`createMemoryHistory()`创建，还可以使用createWebHistory() 或 createWebHashHistory()。

## 注册路由器插件（main.js）

```js
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
```

* 通过调用use()完成路由器插件的注册；
* 在mount()方法之前调用use()

路由器插件的职责，包括：
+ 全局注册`RouterView`和`RouterLink`组件。
+ 添加全局`$router`和`$route`属性。
+ 启用`useRouter()`和`useRoute()`组合式函数。
+ 触发路由器解析初始路由

## 访问路由器和当前路由

如果你是从ES模块导出路由器实例的，你可以将路由器实例直接导入到你需要它的地方。
在组件模板中，路由器实例将被暴露为`$router`。当前路由被暴露为`$route`。

如果使用选项式API，可以在JS中如下访问这两个属性：`this.$router`和`this.$route`。

```js
export default {
  methods: {
    goToAbout() {
      this.$router.push('/about')
    },
  },
}
```
这里调用了push()，这是用于编程式导航的方法。

对于组合式API，不能通过`this`访问组件实例，所以Vue Router给我们提供了一些组合式函数。
可以通过`useRouter()`和`useRoute()`来访问路由器实例和当前路由。

```js
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const search = computed({
  get() {
    return route.query.search ?? ''
  },
  set(search) {
    router.replace({ query: { search } })
  },
})
```