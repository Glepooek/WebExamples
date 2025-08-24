# 不同的历史模式
在创建路由器实例时，`history`配置允许我们在不同的历史模式中进行选择。

## Hash模式
hash模式是用`createWebHashHistory()`创建的：

```js
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    //...
  ],
})
```

它在内部传递的实际URL之前使用了一个井号（#）。由于这部分URL从未被发送到服务器，所以它不需要在服务器层面上进行任何特殊处理。不过，它在 SEO 中确实有不好的影响。如果你担心这个问题，可以使用`HTML5模式`。

## Memory模式
Memory模式不会假定自己处于浏览器环境，因此不会与URL交互也`不会自动触发初始导航`。这使得它非常适合Node环境和SSR。它是用`createMemoryHistory()`创建的，并且需要你在调用 app.use(router) 之后手动 push 到初始导航。

```js
import { createRouter, createMemoryHistory } from 'vue-router'
const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    //...
  ],
})
```

虽然不推荐，你仍可以在浏览器应用程序中使用此模式，但请注意它不会有历史记录，这意味着你无法后退或前进。

## HTML5模式
用`createWebHistory()`创建HTML5模式，推荐使用这个模式：

```js
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    //...
  ],
})
```

当使用这种历史模式时，URL会看起来很 "正常"，例如 https://example.com/user/id。

不过，问题来了。由于我们的应用是一个单页的客户端应用，如果没有适当的服务器配置，用户在浏览器中直接访问 https://example.com/user/id，就会得到一个 404 错误。

不用担心：要解决这个问题，你需要做的就是在你的服务器上添加一个简单的回退路由。如果URL不匹配任何静态资源，它应提供与你的应用程序中的index.html相同的页面。

## 服务器配置

Nginx服务器:
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```
