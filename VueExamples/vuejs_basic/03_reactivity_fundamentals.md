# 选项卡式API

## 声明响应式状态
用data选项来声明组件的响应式状态。此选项的值为返回一个对象的函数。

```js
data() {
    return {
        message: 'Hello, Vue 3!'
    }
},
```

### 响应式代理 vs 原始值
在Vue3中，数据是基于JS代理实现响应式的。

## 声明方法
用methods选项为组件添加方法。此选项为包含所有方法的对象。

```js
 methods: {
    increment() {
      this.count++
    }
  },
```

在定义`methods`时不应该使用箭头函数，因为箭头函数没有自己的this上下文。

### 深层响应性
在Vue中，默认情况下，状态是深度响应的。这意味着当改变嵌套对象或数组时，这些变化也会被检测到。

### DOM更新时机
当修改了响应式状态时，DOM会被自动更新。但是DOM更新不是同步的。
要等待DOM更新完成后再执行额外代码，可以使用`nextTick()`全局API。

```js
import { nextTick } from 'vue'

export default {
  methods: {
    async increment() {
      this.count++
      await nextTick()
      // 现在 DOM 已经更新了
    }
  }
}
```

### 有状态的方法
可重用组件预置的防抖函数是有状态的。
要保持每个可重用组件实例的防抖函数都彼此独立，可以改为在`created`生命周期钩子中创建这个预置防抖的函数：

```js
export default {
  created() {
    // 每个实例都有了自己的预置防抖的处理函数
    this.debouncedClick = _.debounce(this.click, 500)
  },
  unmounted() {
    // 最好是在组件卸载时
    // 清除掉防抖计时器
    this.debouncedClick.cancel()
  },
  methods: {
    click() {
      // ... 对点击的响应 ...
    }
  }
}
```

# 组合式API

## 声明响应式状态

### ref()
在组合式API中，推荐使用`ref()`函数来声明响应式状态。
`ref()`函数接收一个参数作为初始值，并将其包裹在一个带有`.value`属性的ref对象中返回。

```js
import { ref } from 'vue'
const count = ref(0)

console.log(count) // { value: 0 }
console.log(count.value) // 0
count.value++
console.log(count.value) // 1
```

要在组件模版中访问ref对象，请在组件的`setup()`函数中声明并返回它们。

```vue
<template>
  <div>{{ count }}</div>
</template>

<script>
  import { ref } from 'vue'
  export default {
    setup() {
      const count = ref(0)
      return { count }
    }
  }
</script>
```

在模版中使用ref对象时，不需要附加`.value`。原因是：在模版中使用时，ref对象会被自动解包。
也可以在事件监听器中改变ref对象。

```vue
<button @click="count++">
  {{ count }}
</button>
```

可以在同一作用域内声明更改`ref`的函数，并将它们作为方法与状态一起公开：

```js
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)

    function increment() {
      // 在 JavaScript 中需要 .value
      count.value++
    }

    // 不要忘记同时暴露 increment 函数
    return {
      count,
      increment
    }
  }
}
```

然后，暴露的方法可以被用作事件监听器：

```html
<button @click="increment">
  {{ count }}
</button>
```

### `<script setup>`
在setup()函数中，暴露大量的状态和方法非常繁琐，可以通过在单文件组件（SFC）中使用`<script setup>`来简化代码：

```vue
<template>
  <button @click="increment">
    {{ count }}
  </button>
</template>

<script setup>
 import { ref } from 'vue'
 const count = ref(0)

 const increment = () => {
  count.value++
 }

</script>
```

`<script setup>`中的顶层的导入、声明的变量和函数可在同一组件的模板中直接使用。可以将模板理解为是在同一作用域内声明的一个 JavaScript 函数。

### 为什么要使用ref


### 深层响应性
`Ref`可以持有任何类型的值，包括深层嵌套的对象、数组或者JS内置的数据结构，比如 Map。
`Ref`会使它的值具有深层响应性。这意味着即使改变嵌套对象或数组时，变化也会被检测到：

```js
import { ref } from 'vue'

const obj = ref({
  nested: { count: 0 },
  arr: ['foo', 'bar']
})

function mutateDeeply() {
  // 以下都会按照期望工作
  obj.value.nested.count++
  obj.value.arr.push('baz')
}
```

也可以通过`shallowRef()`来放弃深层响应性。对于浅层ref，只有.value的访问会被追踪。浅层ref可以用于避免对大型数据的响应性开销来优化性能、或者有外部库管理其内部状态的情况。

### DOM更新时机
当你修改了响应式状态时，DOM会被自动更新。但是需要注意的是，DOM更新不是同步的。Vue会在“next tick”更新周期中缓冲所有状态的修改，以确保不管你进行了多少次状态修改，每个组件都只会被更新一次。

要等待DOM更新完成后再执行额外的代码，可以使用`nextTick()`全局API：

```js
import { nextTick } from 'vue'

async function increment() {
  count.value++
  await nextTick()
  // 现在 DOM 已经更新了
}
```

## `reactive()`
另一种声明响应式状态的方式，即使用`reactive()`API。与将内部值包装在特殊对象中的ref不同，`reactive()`将使对象本身具有响应性：

```vue
<script setup>
  import { reactive } from 'vue'

  const state = reactive({ count: 0 })
</script>

<template>
  <button @click="state.count++">
    {{ state.count }}
  </button>
</template>
```

响应式对象是JS代理，其行为就和普通对象一样。不同的是，Vue能够拦截对响应式对象所有属性的访问和修改，以便进行依赖追踪和触发更新。
`reactive()`将深层地转换对象：当访问嵌套对象时，它们也会被`reactive()`包装。当ref 的值是一个对象时，ref()也会在内部调用它。与浅层 ref 类似，这里也有一个 `shallowReactive()`API 可以选择退出深层响应性。

### Reactive Proxy vs. Original
`reactive()`返回的是一个原始对象的Proxy，它和原始对象是不相等的：

```js
const raw = {}
const proxy = reactive(raw)

// 代理对象和原始对象不是全等的
console.log(proxy === raw) // false
```

只有代理对象是响应式的，更改原始对象不会触发更新。因此，使用Vue的响应式系统的最佳实践是仅使用你声明对象的代理版本。
为保证访问代理的一致性，`对同一个原始对象调用reactive()会总是返回同样的代理对象，而对一个已存在的代理对象调用reactive()会返回其本身`：

```js
// 在同一个对象上调用 reactive() 会返回相同的代理
console.log(reactive(raw) === proxy) // true

// 在一个代理上调用 reactive() 会返回它自己
console.log(reactive(proxy) === proxy) // true
```

这个规则对嵌套对象也适用。依靠深层响应性，响应式对象内的嵌套对象依然是代理：

```js
const proxy = reactive({})

const raw = {}
proxy.nested = raw

console.log(proxy.nested === raw) // false
```

### `reactive()`的局限性
`reactive()`API有一些局限性：

+ 有限的值类型：它只能用于对象类型 (对象、数组和如 Map、Set 这样的集合类型)。它不能持有如 string、number 或 boolean 这样的原始类型。
+ 不能替换整个对象：由于 Vue 的响应式跟踪是通过属性访问实现的，因此我们必须始终保持对响应式对象的相同引用。这意味着我们不能轻易地“替换”响应式对象，因为这样的话与第一个引用的响应性连接将丢失：

```js
let state = reactive({ count: 0 })

// 上面的 ({ count: 0 }) 引用将不再被追踪
// (响应性连接已丢失！)
state = reactive({ count: 1 })
```

+ 对解构操作不友好：当我们将响应式对象的原始类型属性解构为本地变量时，或者将该属性传递给函数时，我们将丢失响应性连接：

```js
const state = reactive({ count: 0 })

// 当解构时，count 已经与 state.count 断开连接
let { count } = state
// 不会影响原始的 state
count++

// 该函数接收到的是一个普通的数字
// 并且无法追踪 state.count 的变化
// 我们必须传入整个对象以保持响应性
callSomeFunction(state.count)
```

## 额外的 ref 解包细节
### 作为 reactive 对象的属性​
一个`ref`会在作为响应式对象的属性被访问或修改时自动解包。换句话说，它的行为就像一个普通的属性：

```js
const count = ref(0)
const state = reactive({
  count
})

console.log(state.count) // 0

state.count = 1
console.log(count.value) // 1
```

如果将一个新的ref赋值给一个关联了已有ref的属性，那么它会替换掉旧的ref：

```js
const otherCount = ref(2)

state.count = otherCount
console.log(state.count) // 2
// 原始 ref 现在已经和 state.count 失去联系
console.log(count.value) // 1
```

`只有当嵌套在一个深层响应式对象内时，才会发生ref解包。当其作为浅层响应式对象的属性被访问时不会解包。`

### 数组和集合的注意事项​
与reactive对象不同的是，当 ref 作为响应式数组或原生集合类型 (如 Map) 中的元素被访问时，它不会被解包：

```js
const books = reactive([ref('Vue 3 Guide')])
// 这里需要 .value
console.log(books[0].value)

const map = reactive(new Map([['count', ref(0)]]))
// 这里需要 .value
console.log(map.get('count').value)
```

### 在模板中解包的注意事项​
在模板渲染上下文中，只有顶级的ref属性才会被解包。

在下面的例子中，count和object是顶级属性，但object.id不是：

```js
const count = ref(0)
const object = { id: ref(1) }
```

因此，这个表达式按预期工作：

```template
{{ count + 1 }}
```
...但这个不会：

```template
{{ object.id + 1 }}
```

渲染的结果将是 [object Object]1，因为在计算表达式时object.id没有被解包，仍然是一个ref对象。为了解决这个问题，我们可以将 id 解构为一个顶级属性：

```js
const { id } = object
```

```template
{{ id + 1 }}
```
现在渲染的结果将是 2。

另一个需要注意的点是，如果`ref是文本插值的最终计算值 (即{{ }}标签)`，那么它将被解包，因此以下内容将渲染为 1：

```template
{{ object.id }}
```
该特性仅仅是文本插值的一个便利特性，等价于 `{{ object.id.value }}`。