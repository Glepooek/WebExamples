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

## 深层监听器


