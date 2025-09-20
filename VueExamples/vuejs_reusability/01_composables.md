## 什么是`组合式函数`？
在Vue中，`组合式函数`是一个利用Vue组合式API来`封装`和`复用``有状态的逻辑`的函数。

* 封装、复用无状态逻辑，如loadsh、date-fns等。
* 封装、复用有状态逻辑，如数据获取、数据处理、数据缓存等。

## 鼠标跟踪器示例
使用组合式API实现鼠标跟踪器功能。

```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const x = ref(0)
const y = ref(0)

function update(e) {
    x.value = e.pageX
    y.value = e.pageY
}

onMounted(() => window.addEventListener('mousemove', update))
onUnmounted(() => window.removeEventListener('mousemove', update))
</script>

<template>
<div>Mouse position is at: {{ x }}, {{ y }}</div>
</template>
```

为了在多个组件中复用鼠标跟踪器的逻辑，可以将鼠标跟踪器功能提取到外部js文件（如mouse.js），并封装到一个自定义组合式函数中：

```js
import { ref, onMounted, onUnmounted } from 'vue'

// 组合函数以use开头
export function useMouse() {
    // 被组合函数封装和管理的状态
    const x = ref(0)
    const y = ref(0)

    function update(e) {
        x.value = e.pageX
        y.value = e.pageY
    }

    // 一个组合式函数也可以挂靠在所属组件的生命周期上来启动和卸载副作用
    onMounted(() => window.addEventListener('mousemove', update))
    onUnmounted(() => window.removeEventListener('mousemove', update))

    // 通过返回值暴露所管理的状态
    return { x, y }
}
```

在组件中使用组合式函数：

```vue
<script setup>
import { useMouse } from './mouse.js'
const { x, y } = useMouse()
</script>

<template>
<div>Mouse position is at: {{ x }}, {{ y }}</div>
</template>
```

`一个组合式函数可以调用一个或多个其他的组合式函数。`
举例来说，可以将添加和清除DOM事件监听器的逻辑抽取到一个js文件（如event.js），并封装进一个组合式函数中：

```js
import { onMounted, onUnmounted } from 'vue'

export function useEventListener(target, event, callback) {
    onMounted(() => target.addEventListener(event, callback))
    onUnmounted(() => target.removeEventListener(event, callback))
}
```

上面的useMousePosition函数可以被简化为：

```js
import { ref } from 'vue'
import { useEventListener } from './event.js'

export function useMouse() {
    const x = ref(0)
    const y = ref(0)

    useEventListener(window, 'mousemove', (e) => {
        x.value = e.pageX
        y.value = e.pageY
    })

    return { x, y }
}
```

## 异步状态示例
来看一个需要接收一个参数的组合式函数示例。在做异步数据请求时，我们常常需要处理不同的状态：加载中、加载成功和加载失败。

```vue
<script setup>
import { ref, onMounted } from 'vue'

const data = ref(null)
const error = ref(null)

onMounted(async () => {
    fetch('...')
    .then(res => res.json())
    .then(json => data.value = json)
    .catch(err => error.value = err)
})
</script>

<template>
<div v-if="error">Oops! Error encountered: {{ error.message }}</div>
<div v-else-if="data">
    Data loaded:
    <pre> {{ data }}</pre>
</div>
<div v-else>Loading...</div>
</template>
```

为了复用上面的处理逻辑，可以将其封装到一个组合式函数中：

```js
import { ref } from 'vue'

const data = ref(null)
const error = ref(null)

export function useFetch(url) {
    fetch(url)
    .then(res => res.json())
    .then(json => data.value = json)
    .catch(err => error.value = err)
}

return { data, error }
```

在组件中使用：

```js
import { useFetch } from './fetch.js'

const { data, error } = useFetch('...')
```

### 接收响应式状态
`useFetch()`接收一个静态URL字符串作为输入——因此它`只会执行一次fetch并且就此结束`。如果要在 URL改变时重新fetch，需要将`响应式状态`传入组合式函数，并让它基于传入的状态来创建执行操作的侦听器。可用`watchEffect()`或`toValue()`来重构API:

```js
import { ref, toValue, watchEffect } from 'vue'

export function useFetch(url) {
    const data = ref(null)
    const error = ref(null)

    const fetchData = () => {
        data.value = null
        error.value = null

        fetch(toValue(url))
        .then(res => res.json())
        .then(json => data.value = json)
        .catch(err => error.value = err)
    }

    watchEffect(() => fetchData())

    return { data, error }
}
```

`toValue()`是一个在3.3版本中新增的API。它的设计目的是`将ref或getter规范化为值`。

* 如果参数是ref，它会返回ref的值；
* 如果参数是函数，它会调用函数并返回其返回值。否则，它会原样返回参数。

注意：toValue(url)是在watchEffect回调函数的内部调用的。这确保了在toValue()规范化期间访问的任何响应式依赖项都会被侦听器跟踪。

这个版本的useFetch()现在能接收`静态URL字符串、ref和getter`，使其更加灵活。watchEffect会立即运行，并且会跟踪toValue(url)期间访问的任何依赖项。如果没有跟踪到依赖项(例如 url已经是字符串)，则effect只会运行一次；否则，它将在跟踪到的任何依赖项更改时重新运行。

## 约定和最佳实践
### 命名
组合式函数约定用驼峰命名法命名，并以`use`开头。

### 输入参数
组合式函数的输入参数,既可以是非响应性的普通参数，也可以是依赖于`ref`或`getter`的响应性参数。为使函数更通用，可以利用`toValue()`工具函数来处理输入参数是`ref`或`getter`而非原始值的情况实现：

```js
import { toValue } from 'vue'

function useFeature(maybeRefOrGetter) {
  // 如果 maybeRefOrGetter 是一个 ref 或 getter，
  // 将返回它的规范化值。
  // 否则原样返回。
  const value = toValue(maybeRefOrGetter)
}
```

如果你的组合式函数在输入参数是ref或getter的情况下创建了响应式效果，为了让它能够被正确追踪，请确保要么使用`watch()`显式地监视ref或getter，要么在`watchEffect()`中调用`toValue()`。

### 返回值
推荐的约定是组合式函数始终返回`一个包含多个ref的普通的非响应式对象`，这样该对象在组件中被解构为ref之后仍可以保持响应性：

```js
// x 和 y 是两个 ref
const { x, y } = useMouse()
```

`从组合式函数返回一个响应式对象会导致在对象解构过程中丢失与组合式函数内状态的响应性连接。与之相反，ref则可以维持这一响应性连接。`

如果你更希望以对象属性的形式来使用组合式函数中返回的状态，你可以将返回的对象用reactive()包装一次，这样其中的ref会被自动解包，例如：

```js
const mouse = reactive(useMouse())

// mouse.x 链接到了原来的 x ref
console.log(mouse.x)

Mouse position is at: {{ mouse.x }}, {{ mouse.y }}
```

### 副作用
在组合式函数中的确可以执行副作用（例如：添加 DOM 事件监听器或者请求数据），但请注意以下规则：

* 如果你的应用用到了服务端渲染(SSR)，请确保在组件挂载后才调用的生命周期钩子中执行DOM相关的副作用，例如：onMounted()。这些钩子仅会在浏览器中被调用，因此可以确保能访问到DOM。

* 确保在`onUnmounted()`时清理副作用。

### 使用限制
组合式函数只能在`<script setup>`或`setup()`钩子中被调用。在这些上下文中，它们也只能被`同步`调用。在某些情况下，你也可以在像`onMounted()`这样的生命周期钩子中调用它们。

这些限制很重要，因为这些是Vue用于确定当前活跃的组件实例的上下文。访问活跃的组件实例很有必要，这样才能：

* 将生命周期钩子注册到该组件实例上
* 将计算属性和监听器注册到该组件实例上，以便在该组件被卸载时停止监听，避免内存泄漏。

`<script setup>`是唯一在调用await之后仍可调用组合式函数的地方。编译器会在异步操作之后自动为你恢复当前的组件实例。

## 通过抽取组合式函数改善代码结构​
`抽取组合式函数不仅是为了复用，也是为了代码组织。`随着组件复杂度的增高，你可能会最终发现组件多得难以查询和理解。组合式API会给予你足够的灵活性，让你可以基于逻辑问题将组件代码拆分成更小的函数：

```vue
<script setup>
import { useFeatureA } from './featureA.js'
import { useFeatureB } from './featureB.js'
import { useFeatureC } from './featureC.js'

const { foo, bar } = useFeatureA()
const { baz } = useFeatureB(foo)
const { qux } = useFeatureC(baz)
</script>
```

在某种程度上，可以将这些提取出的组合式函数看作是可以相互通信的组件范围内的服务。

## 在选项式API中使用组合式函数​
如果你正在使用选项式API，组合式函数必须在`setup()`中调用。且其返回的绑定必须在`setup()`中返回，以便暴露给`this`及其模板：

```js
import { useMouse } from './mouse.js'
import { useFetch } from './fetch.js'

export default {
  setup() {
    const { x, y } = useMouse()
    const { data, error } = useFetch('...')
    return { x, y, data, error }
  },
  mounted() {
    // setup() 暴露的属性可以在通过 `this` 访问到
    console.log(this.x)
  }
  // ...其他选项
}
```

## 与其他模式的比较​
### 和Mixin的对比​
mixins有三个主要的短板：

* 不清晰的数据来源。
* 命名空间冲突。
* 隐式的跨mixin交流：多个mixin需要依赖共享的属性名来进行相互作用，这使得它们隐性地耦合在一起。而一个组合式函数的返回值可以作为另一个组合式函数的参数被传入，像普通函数那样。

基于上述理由，我们不再推荐在Vue3中继续使用mixin。

### 和无渲染组件的对比​
组合式函数相对于无渲染组件的主要优势是：`组合式函数不会产生额外的组件实例开销`。当在整个应用中使用时，由无渲染组件产生的额外组件实例会带来无法忽视的性能开销。

推荐：`在纯逻辑复用时使用组合式函数，在需要同时复用逻辑和视图布局时使用无渲染组件。`

### 和React Hooks的对比​
如果你有React的开发经验，你可能注意到组合式函数和自定义React hooks非常相似。组合式API的一部分灵感正来自于React hooks，Vue的组合式函数也的确在逻辑组合能力上与React hooks相近。然而，Vue的组合式函数是基于Vue细粒度的响应性系统，这和React hooks的执行模型有本质上的不同。