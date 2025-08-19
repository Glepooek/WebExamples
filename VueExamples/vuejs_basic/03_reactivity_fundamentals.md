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

### 为什么要使用ref


### 深层响应性


### DOM更新时机