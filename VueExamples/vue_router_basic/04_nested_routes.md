## 嵌套路由
一些应用程序的UI由多层嵌套的组件组成。在这种情况下，URL的片段通常对应于特定的嵌套组件结构，例如：

/user/johnny/profile                   /user/johnny/posts 
┌──────────────────┐                  ┌──────────────────┐
│ User             │                  │ User             │
│ ┌──────────────┐ │                  │ ┌──────────────┐ │
│ │ Profile      │ │  ────────────>   │ │ Posts        │ │
│ │              │ │                  │ │              │ │
│ └──────────────┘ │                  │ └──────────────┘ │
└──────────────────┘                  └──────────────────┘

通过Vue Router，可以通过配置嵌套路由来表达这种关系。

接着上节创建的 app ：

```vue
<!-- App.vue -->
<template>
  <router-view />
</template>

<!-- User.vue -->
<template>
  <div>
    User {{ $route.params.id }}
  </div>
</template>
```
```js
import User from './User.vue'

// 这些都会传递给 `createRouter`
const routes = [{ path: '/user/:id', component: User }]
```

这里的<router-view>是一个顶层的router-view。它渲染顶层路由匹配的组件。同样地，一个被渲染的组件也可以包含自己嵌套的<router-view>。例如，如果我们在User组件的模板内添加一个<router-view>：

```vue
<!-- User.vue -->
<template>
  <div class="user">
    <h2>User {{ $route.params.id }}</h2>
    <router-view />
  </div>
</template>
```

要将组件渲染到这个嵌套的`router-view`中，我们需要在路由中配置`children`：

```js
const routes = [
  {
    path: '/user/:id',
    component: User,
    children: [
      {
        // 当 /user/:id/profile 匹配成功
        // UserProfile 将被渲染到User的<router-view>内部
        path: 'profile',
        component: UserProfile,
      },
      {
        // 当 /user/:id/posts 匹配成功
        // UserPosts 将被渲染到 User 的 <router-view> 内部
        path: 'posts',
        component: UserPosts,
      },
    ],
  },
]
```

如你所见，children配置只是另一个路由数组，就像routes本身一样。因此，你可以根据自己的需要，不断地嵌套视图。

此时，按照上面的配置，当你访问/user/eduardo时，在User的`router-view`里面什么都不会呈现，因为没有匹配到嵌套路由。也许你确实想在那里渲染一些东西。在这种情况下，你可以提供一个空的嵌套路径：

```js
const routes = [
  {
    path: '/user/:id',
    component: User,
    children: [
      // 当 /user/:id 匹配成功
      // UserHome 将被渲染到 User 的 <router-view> 内部
      { path: '', component: UserHome },

      // ...其他子路由
    ],
  },
]
```

### 嵌套的命名路由
在处理命名路由时，你通常会给子路由命名：

```js
const routes = [
  {
    path: '/user/:id',
    component: User,
    // 请注意，只有子路由具有名称
    children: [{ path: '', name: 'user', component: UserHome }],
  },
]
```

这将确保导航到/user/:id时始终显示嵌套路由。

在一些场景中，你可能希望导航到命名路由而不导航到嵌套路由。例如，你想导航/user/:id 而不显示嵌套路由。那样的话，你还可以命名父路由，但请注意重新加载页面将始终显示嵌套的子路由，因为它被视为指向路径/users/:id 的导航，而不是命名路由：

```js
const routes = [
  {
    path: '/user/:id',
    name: 'user-parent',
    component: User,
    children: [{ path: '', name: 'user', component: UserHome }],
  },
]
```

### 忽略父组件 4.1+
我们还可以仅利用路由的父子关系，但不嵌套路由组件。这对于将具有公共路径前缀的路由分组在一起或使用更高级的功能时很有用，例如：路由独享的守卫或路由元信息。

为了实现这一点, 我们在父路由中省略了`component`和`components`选项

```js
const routes = [
  {
    path: '/admin',
    children: [
      { path: '', component: AdminOverview },
      { path: 'users', component: AdminUserList },
      { path: 'users/:id', component: AdminUserDetails },
    ], 
  },
]
```

由于父级没有指定路由组件，顶级<router-view>将跳过父级并仅使用子路由组件。