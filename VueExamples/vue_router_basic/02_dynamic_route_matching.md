## 带参数的动态路由匹配
很多时候需要将给定匹配模式的路由映射到同一个组件。在Vue Router中，可以在路径中使用一个动态字段来实现，我们称之为`路径参数`：

```js
import User from './User.vue'

// 这些都会传递给 `createRouter`
const routes = [
  // 动态字段以冒号开始
  { path: '/users/:id', component: User },
]
```

路径参数用`:`表示。当一个路由被匹配时，它的params的值将在每个组件中以`$route.params`的形式暴露出来。
```html
<template>
    <div>
    <!-- 当前路由可以通过 $route 在模板中访问 -->
    User {{ $route.params.userId }}
  </div>
</template>
```

可以在同一个路由中设置多个路径参数，它们会映射到`$route.params`上的相应字段。例如：

|匹配模式 |	匹配路径 |	route.params|
| :----  | :----    | :---- |
|/users/:username |	/users/eduardo  |	{ username: 'eduardo' }|
|/users/:username/posts/:postId |	/users/eduardo/posts/123  |	{ username: 'eduardo', postId: '123' }|

除了`route.params`之外，route对象还公开了其他有用的信息，如`route.query`（如果 URL 中存在参数）、`route.hash`等。

### 响应路由参数的变化
使用带有参数的路由（如`/users/:id`）时需要注意，用户从一个URL导航到另一个具有相同路由模式但参数不同的URL（如从`/user/1`导航到`/user/2`）时，`相同的组件实例将被重复使用`，而不是销毁再创建。这也意味着组件的生命周期钩子（如mounted）不会被调用。因此，要对同一个组件中参数的变化做出响应的话，主要有两种方式：

* 使用watch监听路由参数
* 使用onBeforeRouteUpdate导航守卫

可以watch $route对象上的任意属性，在这个场景中，就是`$route.params`：

```js
<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

watch(() => route.params.id, (newId, oldId) => {
  // 对路由变化做出响应...
})
</script>
```

或者，使用beforeRouteUpdate导航守卫，它还允许你取消导航：

```js
<script setup>
import { onBeforeRouteUpdate } from 'vue-router'
// ...

onBeforeRouteUpdate(async (to, from) => {
  // 对路由变化做出响应...
  userData.value = await fetchUser(to.params.id)
})
</script>
```

### 捕获所有路由或404 Not found路由
常规参数只匹配`url`片段之间的字符，用`/`分隔。如果想匹配任意路径，可以使用自定义的`路径参数正则表达式`，在路径参数后面的括号中加入正则表达式:

```js
const routes = [
  // 将匹配所有内容并将其放在 `route.params.pathMatch` 下
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  // 将匹配以 `/user-` 开头的所有内容，并将其放在 `route.params.afterUser` 下
  { path: '/user-:afterUser(.*)', component: UserGeneric },
]
```

在这个特定的场景中，我们在括号之间使用了自定义正则表达式，并将pathMatch参数标记为可选可重复。这样做是为了让我们在需要的时候，可以通过将`path`拆分成一个数组，直接导航到路由：

```js
router.push({
  name: 'NotFound',
  // 保留当前路径并删除第一个字符，以避免目标URL以 `//` 开头。
  params: { pathMatch: this.$route.path.substring(1).split('/') },
  // 保留现有的查询和 hash 值，如果有的话
  query: route.query,
  hash: route.hash,
})
```