## 基本示例

计算属性允许我们声明性的计算衍生值。
在选项卡式API中，可以使用`watch选项`在每次响应式属性发生变化时触发一个函数。
在组合式API中，可以使用`watch函数`在每次响应式状态发生变化时触发回调函数。

```html
<p>
  Ask a yes/no question:
  <input v-model="question" :disabled="loading" />
</p>
<p>{{ answer }}</p>
<img v-if="imgUrl" :src="imgUrl" alt="Answer image" />
```

```js
<script type="module">
    import { createApp } from 'vue'

    const app = createApp({
        data() {
            return {
                question: '',
                answer: 'Questions usually contain a question mark. ;-)',
                imgUrl:'',
                loading: false
            }
        },
        watch: {
            question(newQuestion, oldQuestion) {
                if (newQuestion.includes('?')) {
                    this.getAnswer()
                }
            }
        },
        methods: {
            async getAnswer() {
                this.loading = true
                this.answer = 'Thinging...'
                try {
                    const res = await axios.get('https://yesno.wtf/api')
                    this.answer = res.data.answer
                    this.imgUrl = res.data.image
                } catch (error) {
                    this.answer = 'Error, could not load answer. ' + error
                } finally {
                    this.loading = false
                }
            }
        }
    })

    app.mount('#app')
</script>
```

## 侦听数据源的类型

`watch`函数的第一个参数是监听的数据源，可以是：
* 一个`ref`（包括计算属性）
* 一个响应式对象
* 一个`getter`函数
* 多个数据源组成的数组。

```js
const question = ref("")
watch(question, (newQuestion, oldQuestion) => {})

const x = ref(0)
const y = ref(0)

// 单个 ref
watch(x, newX => {
  console.log(`x is ${newX}`)
})

// getter 函数
watch(
  () => x.value + y.value,
  sum => {
    console.log(`sum of x + y is: ${sum}`)
  }
)

// 多个来源组成的数组
watch([x, () => y.value], ([newX, newY]) => {
  console.log(`x is ${newX} and y is ${newY}`)
})
```

`不能直接侦听响应式对象的属性值，而是要侦听返回该属性值的getter函数。`

```js
const obj = reactive({ count: 0 })
watch(
  () => obj.count,
  count => {
    console.log(`count is: ${count}`)
  }
)
```

## 深层侦听器

直接给`watch()`传入一个响应式对象，会隐式地创建一个`深层侦听器`——该回调函数在所有嵌套的属性变更时都会被触发：

```js
const obj = reactive({ count: 0 })

watch(obj, (newValue, oldValue) => {
  // 在嵌套的属性变更时触发
  // 注意：`newValue` 此处和 `oldValue` 是相等的
  // 因为它们是同一个对象！
})

obj.count++
```

相比之下，一个返回响应式对象的`getter`函数，只有在返回不同的对象时，才会触发回调：

```js
// 假设state.someObject是一个响应式对象
const state = reactive({
  someObject: {
    name: 'Vue',
    version: 3
  }
})

watch(
  () => state.someObject,
  () => {
    // 仅当 state.someObject 被替换时触发
  }
)

// 情况1：修改someObject的属性
state.someObject.name = 'Vue 3' // 不会触发watch回调
state.someObject.version = 4    // 不会触发watch回调

// 情况2：替换整个someObject对象（会触发watch回调）
state.someObject = {
  name: 'React',
  version: 18
}
```

你也可以给上面这个例子显式地加上`deep`选项，强制转成深层侦听器：

```js
watch(
  () => state.someObject,
  (newValue, oldValue) => {
    // 注意：`newValue` 此处和 `oldValue` 是相等的
    // *除非* state.someObject 被整个替换了
  },
  { deep: true }
)
```

在Vue3.5+中，`deep`选项还可以是一个数字，表示遍历的最大深度。·

## 即时回调的侦听器

`watch()`默认是懒执行的，仅当数据源发生变化时，才执行回调函数。可以通过传入`immediate:true`选项来强制侦听器的回调立即执行。

```js
watch(source,(newValue, oldValue) =>{
    // 立即执行，且当 `source` 改变时再次执行
    }, {
        immediate:true
    })
```

## 一次性侦听器

每当侦听源发生变化时，侦听器的回调就会立即执行。若想回调只在源变化时触发一次，请使用`once: true`选项。

```js
watch(source,(newValue, oldValue) =>{
    // 当 `source` 改变时只执行一次
    }, {
        once:true
    })
```

## watchEffect()

侦听器的回调使用与源完全相同的响应式状态是很常见的，如下面的示例所示：

```js
const todoId = ref(1)
const data = reactive(null)

watch(
  () => todoId.value,
  async (newId, oldId) => {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/todos/${newId}`)
    data.value = res.data
  },
  {
    immediate: true,
  }
)
```

`watchEffect()`函数与`watch()`函数非常相似，但`watchEffect()`会自动追踪其响应式依赖项，立即执行回调，并在其依赖项变更时重新执行。

```js
watchEffect(async () => {
  const res = await axios.get(`https://jsonplaceholder.typicode.com/todos/${todoId.value}`)
  data.value = res.data
})
```

对于有多个依赖项的侦听器来说，使用`watchEffect()`可以消除手动维护依赖列表的负担。此外，如果你需要侦听一个嵌套数据结构中的几个属性，`watchEffect()`可能会比深度侦听器更有效，因为它将只跟踪回调中被使用到的属性，而不是递归地跟踪所有的属性。

### watch() vs watchEffect()

`watch`和`watchEffect`都能响应式地执行有副作用的回调。它们之间的主要区别是追踪响应式依赖的方式：

- `watch`只追踪明确侦听的数据源。它不会追踪任何在回调中访问到的东西。另外，仅在数据源确实改变时才会触发回调。watch 会避免在发生副作用时追踪依赖，因此，我们能更加精确地控制回调函数的触发时机。

- `watchEffect`则会在副作用发生期间追踪依赖。它会在同步执行过程中，自动追踪所有能访问到的响应式属性。这更方便，而且代码往往更简洁，但有时其响应性依赖关系会不那么明确。`watchEffect 仅会在其同步执行期间，才追踪依赖。在使用异步回调时，只有在第一个 await 正常工作前访问到的属性才会被追踪。`

在响应式系统中，副作用通常指的是：

- 修改响应式数据
- 更新 DOM
- 发送网络请求
- 调用外部 API
- 执行 I/O 操作
- 修改全局变量

## 副作用清理

当侦听源发生变化时，侦听器会的回调会立即执行执行副作用，如异步请求数据。如果在异步请求的过程中，侦听源再次发生变化，应该对副作用进行清理。

```js
import { createApp, ref, watch, watchEffect, onWatcherCleanup } from "vue"
import axios from "axios"

const app = createApp({
  setup() {
    const todo = ref({
      todoId: 1,
      data: {},
    })

    watch(
      () => todo.value.todoId,
      (newId, oldId) => {
        // 创建新的AbortController用于取消请求
        const controller = new AbortController()

        // 发起异步请求获取数据
        axios
          .get(`https://jsonplaceholder.typicode.com/todos/${newId}`, {
            signal: controller.signal,
          })
          .then(res => {
            todo.value.data = res.data
          })
          .catch(error => {
            // 更好地处理错误，区分取消请求和其他错误
            if (error.name !== "AbortError") {
              console.error("Error fetching todo:", error)
            }
          })

        // 注册清理函数，用于在监听器重新触发时取消之前的请求
        onWatcherCleanup(() => {
          controller.abort()
        })
      },
      {
        immediate: true,
      }
    )

    // watchEffect(() => {
    //   try {
    //     const controller = new AbortController()
    //     axios
    //       .get(`https://jsonplaceholder.typicode.com/todos/${todo.value.todoId}`, {
    //         signal: controller.signal,
    //       })
    //       .then(res => {
    //         todo.value.data = res.data
    //       })

    //     onWatcherCleanup(() => {
    //       controller.abort()
    //     })
    //   } catch (error) {
    //     console.log(error)
    //   }
    // })

    return {
      todo,
    }
  },
})

app.mount("#app")
```

特别注意：

- `onWatcherCleanup`仅在 Vue3.5+中支持。
- 必须在`watchEffect`效果函数或`watch`回调函数的同步执行期间调用。不能在异步函数的`await`语句之后调用它。

作为替代，`onCleanup`函数作为`watch`函数的第三个参数传递给侦听器回调，以及`watchEffect`函数的第一个参数：

```js
watch(id, (newId, oldId, onCleanup) => {
  // ...
  onCleanup(() => {
    // 清理逻辑
  })
})

watchEffect(onCleanup => {
  // ...
  onCleanup(() => {
    // 清理逻辑
  })
})
```

这在 3.5 之前的版本有效。此外，通过函数参数传递的 onCleanup 与侦听器实例相绑定，因此`不受 onWatcherCleanup的同步限制`。

## 回调的触发时机

当你更改了响应式状态，它可能会同时触发 Vue 组件更新和侦听器回调。

默认情况下，侦听器回调会在父组件更新 (如有) 之后、所属组件的 DOM 更新之前被调用。这意味着如果你尝试在侦听器回调中访问所属组件的 DOM，那么 DOM 将处于更新前的状态。

### Post Watchers​

如果想在侦听器回调中能访问被 Vue 更新之后的所属组件的 DOM，你需要指明`flush: 'post'`选项：

```js
watch(source, callback, {
  flush: "post",
})

watchEffect(callback, {
  flush: "post",
})

// 后置刷新的 watchEffect() 有个更方便的别名 watchPostEffect()：
import { watchPostEffect } from "vue"

watchPostEffect(() => {
  /* 在 Vue 更新后执行 */
})
```

### 同步侦听器 ​

你还可以创建一个同步触发的侦听器，它会在 Vue 进行任何更新之前触发：

```js
watch(source, callback, {
  flush: "sync",
})

watchEffect(callback, {
  flush: "sync",
})

// 同步触发的 watchEffect() 有个更方便的别名 watchSyncEffect()：
import { watchSyncEffect } from "vue"

watchSyncEffect(() => {
  // 在响应式数据变化时同步执行
})
```

### 谨慎使用

同步侦听器不会进行批处理，每当检测到响应式数据发生变化时就会触发。可以使用它来监视简单的布尔值，但应避免在可能多次同步修改的数据源 (如数组) 上使用。

## 停止侦听器

在`setup()`或`<script setup>`中用`同步语句`创建的侦听器，会自动绑定到宿主组件实例上，并且会在宿主组件卸载时自动停止。因此，在大多数情况下，无需关心怎么停止一个侦听器。

如果用异步回调创建一个侦听器，那么它不会绑定到当前组件上，必须手动停止，以防内存泄漏。如：

```vue
<script setup>
  import { watchEffect } from "vue"

  // 它会自动停止
  watchEffect(() => {})

  // ...这个则不会！setTimeout是异步函数
  setTimeout(() => {
    watchEffect(() => {})
  }, 100)
</script>
```

要手动停止一个侦听器，请调用`watch`或`watchEffect`返回的函数：

```js
const unwatch = watchEffect(() => {})

// ...当该侦听器不再需要时
unwatch()
```
