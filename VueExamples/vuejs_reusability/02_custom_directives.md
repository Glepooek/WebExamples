## 介绍
除了Vue内置的一系列指令外，Vue也允许我们注册自定义指令（Custom Directives）。

在Vue中重用代码的方式：
* 组件，主要的构建模块，
* 组合式函数，侧重于封装有状态的逻辑。
* 自定义指令，重用涉及普通元素的底层DOM访问逻辑。

一个自定义指令由一个包含生命周期钩子的对象来定义。钩子函数会接收到指令所绑定元素作为其参数。
下面是一个自定义指令的例子，当Vue将元素插入到DOM中后，该指令会将一个class添加到元素中：

```js
const highlight = {
  mounted: (el) => el.classList.add('is-highlight')
}

export default {
  directives: {
    // 在模板中启用 v-highlight
    highlight
  }
}
```

```vue
<p v-highlight>This sentence is important!</p>
```

`自定义指令在模板中使用前必须先注册。`

* 局部注册。使用`directives`选项完成指令的局部注册， 如上面的例子。
* 全局注册。使用`app.directive()`方法注册到应用层级，完成全局注册。

```js
const app = createApp({})

// 使 v-highlight 在所有组件中都可用
app.directive('highlight', {
  /* ... */
})
```

## 自定义指令的使用时机
`只有当所需功能只能通过直接的DOM操作来实现时，才应该使用自定义指令。`

一个常见例子是使元素获取焦点的`v-focus`指令。

```js
const focus = {
  mounted: (el) => el.focus()
}

export default {
  directives: {
    // 在模板中启用 v-focus
    focus
  }
}
```

```vue
<input v-focus />
```

建议尽可能使用`v-bind`等内置指令声明模板，因为它们更高效，对服务端渲染也更友好。

## 指令钩子
一个指令的定义对象可以提供几种钩子函数 (都是可选的)：

```js
const myDirective = {
  // 在绑定元素的 attribute 前
  // 或事件监听器应用前调用
  created(el, binding, vnode) {},
  // 在元素被插入到 DOM 前调用
  beforeMount(el, binding, vnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted(el, binding, vnode) {},
  // 绑定元素的父组件更新前调用
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载前调用
  beforeUnmount(el, binding, vnode) {},
  // 绑定元素的父组件卸载后调用
  unmounted(el, binding, vnode) {}
}
```

### 钩子参数​
指令的钩子会传递以下几种参数：

* el：指令绑定到的元素。这可以用于直接操作 DOM。
* binding：一个对象，包含以下属性。
    * value：传递给指令的值。
    * oldValue：之前的值，仅在beforeUpdate和updated中可用。无论值是否更改，它都可用。
    * arg：传递给指令的参数 (如果有的话)。
    * modifiers：一个包含修饰符的对象 (如果有的话)。
    * instance：使用该指令的组件实例。
    * dir：指令的定义对象。
* vnode：代表绑定元素的底层VNode。
* prevVnode：代表之前的渲染中指令所绑定元素的VNode。仅在beforeUpdate和updated钩子中可用。

举例来说，像下面这样使用指令：

```html
<div v-example:foo.bar="baz"></div>
```

binding参数会是一个这样的对象：

```js
{
  arg: 'foo',
  modifiers: { bar: true },
  value: /* `baz` 的值 */,
  oldValue: /* 上一次更新时 `baz` 的值 */
}
```

和内置指令类似，自定义指令的参数也可以是动态的。举例来说：

```vue
<div v-example:[arg]="value"></div>
```

这里指令的参数会基于组件的arg数据属性响应式地更新。

注意：除了`el`外，其他参数都是只读的，不要更改它们。若你需要在不同的钩子间共享信息，推荐通过元素的`dataset`属性实现。

## 简化形式
对于自定义指令来说，一个很常见的情况是仅仅需要在`mounted`和`updated`上实现相同的行为，除此之外并不需要其他钩子。这种情况下我们可以直接用一个函数来定义指令，如下所示：

```html
<div v-color="color"></div>
```

```js
app.directive('color', (el, binding) => {
  // 这会在 `mounted` 和 `updated` 时都调用
  el.style.color = binding.value
})
```

## 对象字面量
如果你的指令需要多个值，你可以向它传递一个JavaScript对象字面量。别忘了，指令也可以接收任何合法的JavaScript表达式。

```html
<div v-demo="{ color: 'white', text: 'hello!' }"></div>
```

```js
app.directive('demo', (el, binding) => {
  console.log(binding.value.color) // => "white"
  console.log(binding.value.text) // => "hello!"
})
```

## 在组件上使用
`不推荐在组件上使用自定义指令。当组件具有多个根节点时可能会出现预期外的行为。`