在创建路由时，可以给路由一个`name`：

```js
const routes = [
    { path: '/user/:userName', name: 'profile', component: User },
]
```

然后，可以传递`name`，而不是`path`，给`router-link`的`to`属性：

```html
<router-link :to="{ name: 'profile', params: { userName: 'john' } }">
    John's profile
</router-link>
```

使用`name`的优点:

* 避免硬编码Url，比如`/user/john`
* 避免Url中出现拼写错误
* `params`自动编码、解码
* 绕过路径排序

`所有路由的命名都必须是唯一的。如果为多条路由添加相同的命名，路由器只会保留最后那一条。`

Vue Router有很多其他部分可以传入网址，例如`router.push() `和`router.replace()`方法。就像to属性一样，这些方法也支持通过`name`传入网址：

```js
router.push({ name: 'user', params: { username: 'erina' } })
// 与router.push() 不同，router.replace() 不会在浏览器的历史记录中添加新记录，而是替换当前的历史记录条目。这意味着用户不能通过后退按钮返回到被替换的页面。
router.replace({ name: 'user', params: { username: 'erina' } })
```