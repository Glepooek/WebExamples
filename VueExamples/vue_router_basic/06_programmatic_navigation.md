除了使用`router-link`标签来创建`a`标签定义导航链接，还可以使用router实例方法，如`router.push()`或`router.replace()`方法，通过编写代码来实现。

### 导航到不同位置
想要访问`router`路由器实例，在组件内部可以使用`this.$router`属性访问路由器实例。使用组合式API，可以使用`useRouter()`函数访问路由器实例。

|声明式 | 编程式|
|:----|:----|
|`<router-link to="...">` | `this.$router.push(...)`或`router.push(...)` |

使用`this.$router.push(...)`或`router.push(...)`导航到不同URL时，会向history栈添加一个新的记录，因此，当用户点击浏览器后退按钮时，会回到之前的URL。

该方法的参数可以是一个字符串路径，或者一个描述地址的对象。如：

```js
// 字符串路径
router.push('/user/john')
// 对象路径
router.push({ path: '/user/john' })

// 命名的路由
router.push({ name: 'user', params: { userName: 'john' }})

// 带查询参数
router.push({ path: '/user', query: { name: 'john' }})

// 带hash
router.push({ path: '/user', hash: '#team'})
```

在上面的例子中，如果提供了`path`，那么`params`会被忽略，但是`query`并不属于这种情况。
应该采取下面的做法，需要提供路由的`name`或手写完整的`带有参数的path` ：

```js
const userName = 'john'
// path 带参数，需要自己处理编码
router.push(`/user/${userName}`)
router.push({ path: `/user/${userName}`})

// 命令路由带参数，自动处理编码
router.push({ name: 'user', params: { name: userName }})

// params和path不能一起使用
router.push({ path: '/user', params: { name: userName }})
```

当指定`params`时，可提供`string`或`number`参数，或者对于可重复的参数可提供一个数组。任何其他类型（如对象、布尔等）都将被自动字符串化。对于可选参数，可以提供一个空字符串（""）或 null 来移除它。

由于属性`to`与`router.push`接受的对象种类相同，所以两者的规则完全相同。

### 替换当前位置
|声明式 | 编程式|
|:----|:----|
|`<router-link to="..." replace>` | `this.$router.replace(...)`或`router.replace(...)` |

与`router.push`不同的是，`router.replace`不会向history栈添加新记录，只是取代了当前记录。
也可以在传递给`router.push`的to参数中增加一个`{ replace: true }`属性来达到同样的效果。

```js
router.push({ path: '/home', replace: true })
router.replace('/home')
```

### 横跨历史
`router.go`，该方法采用一个整数参数，表示在历史堆栈中前进或后退多少步，类似于`window.history.go(n)`。

```js
// 向前移动一条记录，同router.forward()
router.go(1)
// 向后移动一条记录，同router.back()
router.go(-1)

// 如果访问的记录不存在，go()方法将不会做任何操作。
router.go(100)
router.go(-100)
```
### 篡改历史
`router.push`、`router.replace`和`router.go`是`window.history.pushState`、`window.history.replaceState`和`window.history.go`的翻版，它们确实模仿了window.history的API。
值得一提的是，无论在创建路由器实例时传递什么history配置，Vue Router的导航方法 (push、replace、go) 都能始终正常工作。