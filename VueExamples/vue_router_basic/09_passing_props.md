在组件中使用`$route`和`useRoute()`会与路由紧密耦合，这限制了组件的灵活性，因为它只能用于特定的URL。可以通过`props`配置来解除这一限制。

示例：

```
// User.vue
<template>
  <div> User: {{ $route.params.id }}</div>
<template>
```

```js
// index.js
const router = createRouter({
    history: createWebHashHistory(),
    routes: [{
        path: '/user/:id',
        component: User,
    }]
})
```

可以通过声明props，在User.vue中删除对`$route`的依赖：

```
// User.vue
<template>
  <div> User: {{ id }}</div>
<template>

<script setup>
 const props = defineProps({
    id:{
        type: String,
        required: true
    }
 })
</script>
```

然后可以通过设置`props: true`来配置路由将`id`参数作为`prop`传递给组件:

```js
// index.js
const router = createRouter({
    history: createWebHashHistory(),
    routes: [{
        path: '/user/:id',
        component: User,
        props: true
    }]
})
```

## 布尔模式

当`props`会被设置为`true`，`route.params`将被设置为组件的`props`。

## 命名视图
对于有命名视图的路由，必须为每个命名视图定义`props`配置：

```js
const routes = [
  {
    path: '/user/:id',
    components: { default: User, sidebar: Sidebar },
    props: { default: true, sidebar: false }
  }
]
```

## 对象模式
当props是一个对象时，它将原样设置为组件props。当props是静态的时候很有用。

```js
const routes = [
  {
    path: '/promotion/from-newsletter',
    component: Promotion,
    props: { newsletterPopup: false }
  }
]
```

## 函数模式
可以创建一个返回 props 的函数。这允许你将参数转换为其他类型，将静态值与基于路由的值相结合等等。

```js
const routes = [
  {
    path: '/search',
    component: SearchUser,
    props: route => ({ query: route.query.q })
  }
]
```
URL`/search?q=vue`将传递`{query: 'vue'}`作为`props`传给SearchUser组件。

请尽可能保持props函数为无状态的，因为它只会在路由发生变化时起作用。如果你需要状态来定义props，请使用包装组件，这样Vue才可以对状态变化做出反应。

## 通过RouterView

你还可以通过`<RouterView>`插槽传递任意参数：

```vue
<RouterView v-slot="{ Component }">
  <component
    :is="Component"
    view-prop="value"
   />
</RouterView>
```

注意：在这种情况下，所有视图组件都会接收到 view-prop。通常这并不是一个好主意，因为这意味着所有的视图组件都声明了一个 view-prop prop，但这未必需要。所以请尽可能使用上述的其他选项。
