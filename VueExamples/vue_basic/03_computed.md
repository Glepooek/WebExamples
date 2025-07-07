## 基础示例
使用计算属性来描述依赖响应式状态的复杂逻辑。

```js
<script type="module">
    import { createApp } from 'vue'
    import { debounce } from 'lodash'

    createApp({
        el: '#app4',
        data() {
            return {
                message: 'Hello Vue.js'
            }
        },
        methods: {
            reverseMessageMethod: function () {
					this.message = "changed"
					return this.message
				}
        },
        // 计算属性是基于它们的响应式依赖进行缓存的。
        // 只在相关响应式依赖发生改变时它们才会重新求值。
        computed: {
            reverseMessage: function () {
                return this.message.split('').reverse().join('')
            }
        }
    }).mount("#app4")
</script>
```

## 计算属性缓存 VS 方法
* 计算属性值会基于其响应式依赖被缓存。一个计算属性仅会在其响应式依赖更新时才重新计算。
* 方法调用总是会在重渲染发生时再次执行函数。

## 可写计算属性
计算属性默认是只读的。
只在某些特殊场景中你可能才需要用到“可写”的属性，你可以通过同时提供 getter 和 setter 来创建：
```js
createApp({
    el: '#app5',
    data() {
        return {
            firstName: 'an',
            lastName: 'yu'
        }
    },
    computed: {
        fullName: {
            // getter
            get: function () {
                return this.firstName + ' ' + this.lastName
            },
            // setter
            set: function (newValue) {
               if (newValue.length > 0) {
					[this.firstName, this.lastName] = newValue.split(' ') 
			    }
            }
        }
    }
}).mount("#app5")
```

## 获取上一个值，仅3.4+支持


## 最佳实战
### Getter不应有副作用
getter的职责应该仅为计算和返回该值。

### 避免直接修改计算属性值​
从计算属性返回的值是派生状态。可以把它看作是一个“临时快照”，每当源状态发生变化时，就会创建一个新的快照。更改快照是没有意义的，因此计算属性的返回值应该被视为只读的，并且永远不应该被更改——应该更新它所依赖的源状态以触发新的计算。
