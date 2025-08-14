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
`watch`函数的第一个参数是监听的数据源，可以是一个ref（包括计算属性），一个响应式对象、一个getter函数或多个数据源组成的数组。

```js
const question = ref('')
watch(question, (newQuestion, oldQuestion) => {

})

const x = ref(0)
const y = ref(0)

// 单个 ref
watch(x, (newX) => {
  console.log(`x is ${newX}`)
})

// getter 函数
watch(() => x.value + y.value, (sum) => {
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
watch(() => obj.count, (count) => {
    console.log(`count is: ${count}`)
})
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

相比之下，一个返回响应式对象的getter函数，只有在返回不同的对象时，才会触发回调：

```js
watch(
  () => state.someObject,
  () => {
    // 仅当 state.someObject 被替换时触发
  }
)

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

## 即时回调的侦听器
`watch()`默认是懒执行的，仅当数据源发生变化时，才执行回调函数。可以通过传入`immediate:true`选项来强制侦听器的回调立即执行。

```js
watch(source,(newValue, oldValue))=>{
    // 立即执行，且当 `source` 改变时再次执行
    }, {
        immediate:true
    })
```

## 一次性侦听器
每当侦听源发生变化时，侦听器的回调就会立即执行。若想回调只在源变化时触发一次，请使用`once: true`选项。

```js
watch(source,(newValue, oldValue))=>{
    // 当 `source` 改变时只执行一次
    }, {
        once:true
    })
```

## watchEffect()





