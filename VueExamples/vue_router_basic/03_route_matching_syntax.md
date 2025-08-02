### 在参数中自定义正则
想象一下，两个路由`/:orderId`和`/:productName`，两者会匹配完全相同的URL，所以我们需要一种方法来区分它们。

#### 在路径中添加一个`静态部分`

```js
const routes = [
  // 匹配 /o/3549
  { path: '/o/:orderId' },
  // 匹配 /p/books
  { path: '/p/:productName' },
]
```

#### 在参数中指定一个自定义的正则
在这种情况下，orderId总是一个数字，而productName可以是任何东西，不想添加静态的`/o` `/p `部分,可以在括号中为参数指定一个自定义的正则：

```js
const routes = [
  // /:orderId -> 仅匹配数字
  { path: '/:orderId(\\d+)' },
  // /:productName -> 匹配其他任何内容
  { path: '/:productName' },
]
```

### 可重复参数
如果需要匹配具有多个部分的路由，如`/first/second/third`，应该用`*`（0或多个）或`+`（1个或多个）来标记参数为可重复。

```js
const routes = [
    // /:chapters -> 匹配 /, /one, /one/two, /one/two/three, 等
    { path: '/:chapters*' },
    // /:chapters ->  匹配 /one, /one/two, /one/two/three, 等
    { path: '/:chapters+' },
]
```

这将为你提供一个参数数组，而不是一个字符串，并且在使用命名路由时也需要你传递一个数组：

```js
// 给定 { path: '/:chapters*', name: 'chapters' },
router.resolve({ name: 'chapters', params: { chapters: [] } }).href
// 产生 /
router.resolve({ name: 'chapters', params: { chapters: ['a', 'b'] } }).href
// 产生 /a/b

// 给定 { path: '/:chapters+', name: 'chapters' },
router.resolve({ name: 'chapters', params: { chapters: [] } }).href
// 抛出错误，因为 `chapters` 为空
```

这些也可以通过在右括号后添加它们与自定义正则结合使用：

```js
const routes = [
  // 仅匹配数字
  // 匹配 /1, /1/2, 等
  { path: '/:chapters(\\d+)+' },
  // 匹配 /, /1, /1/2, 等
  { path: '/:chapters(\\d+)*' },
]
```

### Sensitive与strict路由配置
默认情况下，所有路由是不区分大小写的，并且能匹配带有或不带有尾部斜线的路由。这种行为可以通过`sensitive`和`strict`选项来修改，它们既可以应用在整个全局路由上，又可以应用在当前路由上。

```js
const router = createRouter({
  history: createWebHistory(),
  routes: [
    // 将匹配 /users/posva
    { path: '/users/:id', sensitive: true },
    // 将匹配 /users, /Users, 以及 /users/42 而非 /users/ 或 /users/42/
    { path: '/users/:id?' },
  ],
  strict: true, // applies to all routes
})
```

### 可选参数
可以通过`?`修饰符将一个参数标记为可选参数。`?`修饰符前面的参数至少出现0或1次。

```js
const routes = [
    // 匹配 /users 和 /users/123
    { path: '/users/:userId(\\d+)?' },
    // 匹配 /users 和 /users/polly
    { path: '/users/:userId?' }
]
```

请注意，`*`在技术上也标志着一个参数是可选的，但`?`参数不能重复。