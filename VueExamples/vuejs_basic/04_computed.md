## 基础示例
推荐使用计算属性来描述依赖响应式状态的复杂逻辑。`计算属性会自动追踪响应式依赖。`

```vue
<template>
    <p>Has published books:</p>
    <span>{{ publishedBooksMessage }}</span>
</template>

<script setup>
    import { reactive, computed } from 'vue'

    const author = reactive({
        name: 'John Doe',
        books: ['Vue 2 - Advanced Guide', 'Vue 3 - Basic Guide', 'Vue 4 - The Mystery'],
    })

    const publishedBooksMessage = computed(() => {
        return author.books.length > 0 ? 'Yes' : 'No'
    })
</script>
```

`computed()`方法接收一个`getter`函数作为参数，返回一个计算属性ref。和其他一般的`ref`类似，你可以通过`publishedBooksMessage.value`访问计算结果。在模板中计算属性ref会自动解包，因此在模板表达式中引用时无需添加`.value`。

## 计算属性缓存 VS 方法
区别：

* 计算属性值会基于其响应式依赖被缓存。`一个计算属性仅会在其响应式依赖更新时才重新计算。`在Vue中，应该避免在模板方法中修改响应式数据，因为这会导致不可预测的渲染行为。
* 方法调用总是会在重新渲染发生时再次执行函数。

## 可写计算属性
计算属性默认是只读的。
只在某些特殊场景中可能才需要用到`可写`的计算属性，你可以通过同时提供`getter`和`setter`来创建：

```vue
<script setup>
    import { ref, computed } from 'vue'

    const firstName = ref('John')
    const lastName = ref('Done')

    const fullName = computed({
        // getter
        get() {
            return firstName.value + ' ' + lastName.value
        },
        // setter
        set(newValue) {
            if (newValue.length > 0) {
                [firstName.value, lastName.value] = newValue.split(' ')
            }
        }
    })
</script>
```

## 获取上一个值，`仅3.4+支持`
可以通过访问计算属性的`getter`的第一个参数来获取计算属性返回的上一个值。举例：

```vue
<script setup>
import { ref, computed } from 'vue'

const count = ref(2)

// 这个计算属性在 count 的值小于或等于 3 时，将返回 count 的值。
// 当 count 的值大于等于 4 时，将会返回满足我们条件的最后一个值
// 直到 count 的值再次小于或等于 3 为止。
const alwaysSmall = computed((previous) => {
  if (count.value <= 3) {
    return count.value
  }

  return previous
})
</script>
```

如果你正在使用可写的计算属性：

```vue
<script setup>
import { ref, computed } from 'vue'

const count = ref(2)

const alwaysSmall = computed({
  get(previous) {
    if (count.value <= 3) {
      return count.value
    }

    return previous
  },
  set(newValue) {
    count.value = newValue * 2
  }
})
</script>
```

## 最佳实战
### Getter不应有副作用
计算属性的getter应只做计算而没有任何其他的副作用。如，`不要`改变其他状态、在getter中做异步请求或者更改DOM。

### 避免直接修改计算属性值​
计算属性的返回值通常应该被视为只读的，并且永远不应该被更改——应该更新它所依赖的源状态以触发新的计算。只在确实需要双向绑定时才使用`setter`。
