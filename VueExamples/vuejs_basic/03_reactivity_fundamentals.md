选项卡式API：

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