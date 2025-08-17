可以使用`ref`属性来访问 DOM 元素或子组件。通过使用 ref 属性，在 DOM 元素或子组件实例被挂载后，Vue 会将 ref 设置为相应的实例对象。

```html
<input ref="input" />
```

## 访问模版引用

在挂载结束后：

- 选项卡式 API，引用都会暴露在`this.$refs`之上。
- 组合式 API，引用使用 useTemplateRef()函数获取（Vue3.5+）。

```vue
<template>
  <input ref="my-input" />
</template>

<script setup>
  import { useTemplateRef, onMounted } from "vue"
  const myInput = useTemplateRef("my-input")

  onMounted(() => {
    myInput.value.focus()
  })
</script>
```

### 3.5 之前的用法

需要声明一个与模版里的 ref 属性匹配的变量。

```vue
<template>
  <input ref="myInput" />
</template>

<script setup>
  import { onMounted, ref } from "vue"
  const myInput = ref(null)

  onMounted(() => {
    myInput.value.focus()
  })
</script>

<!-- export default {
  setup() {
    const input = ref(null)
    // ...
    return {
      input
    }
  }
} -->
```

只有在组件挂载后，才能访问模版引用。如果要侦听模版引用 ref 的变化，要考虑到其值为 null 的情况：

```vue
// ...
<!-- watchEffect(() => {
    if(myInput.value) {
        myInput.value.focus()
    } else{
        console.log('myInput.value is null')
    }
}) -->
```

## 组件上的 ref

模版引用也可以用在子组件上：

```vue
<template>
  <Child ref="child" />
</template>

<script setup>
  import { useTemplateRef, onMounted } from "vue"
  import Child from "./Child.vue"

  const childRef = useTemplateRef("child")

  onMounted(() => {
    // childRef.value.focus()
  })
</script>
```

### 3.5 之前的用法

```vue
<script setup>
  import { ref, onMounted } from "vue"
  import Child from "./Child.vue"

  const child = ref(null)

  onMounted(() => {
    // child.value 是 <Child /> 组件的实例
  })
</script>

<template>
  <Child ref="child" />
</template>
```

如果一个子组件使用的是`选项式API`或没有使用`<script setup>`，被引用的组件实例和该子组件的 this 完全一致，这意味着父组件对子组件的每一个属性和方法都有完全的访问权。因此，应该只在绝对需要时才使用组件引用。大多数情况下，你应该首先使用标准的`props`和`emit`接口来实现父子组件交互。

有一个例外的情况，使用了`<script setup>`的组件是默认私有的：一个父组件无法访问到一个使用了 `<script setup>`的子组件中的任何东西，除非子组件在其中通过`defineExpose`宏显式暴露：

```vue
<script setup>
  import { ref } from "vue"

  const a = 1
  const b = ref(2)

  // 像 defineExpose 这样的编译器宏不需要导入
  defineExpose({
    a,
    b,
  })
</script>
```

当父组件通过模板引用获取到了该组件的实例时，得到的实例类型为 { a: number, b: number } (ref 都会自动解包，和一般的实例一样)。

请注意，`defineExpose`必须在任何`await`操作之前调用。否则，在`await`操作后暴露的属性和方法将无法访问。

## v-for 中的模版引用（3.5+）

当在 v-for 中使用模板引用时，对应的 ref 中包含的值是一个数组，它将在元素被挂载后包含对应整个列表的所有元素：

```vue
<script setup>
  import { ref, useTemplateRef, onMounted } from "vue"
  const list = ref([])
  const itemsRef = useTemplateRef("items")

  onMounted(() => {
    console.log(itemsRef.value)
  })
</script>

<template>
  <ul>
    <li v-for="item in list" ref="items">
      {{ item }}
    </li>
  </ul>
</template>
```

### 3.5 之前的用法

```vue
<script setup>
  import { ref, onMounted } from "vue"
  const list = ref([])
  const itemsRef = ref([])

  onMounted(() => {
    console.log(itemsRef.value)
  })
</script>

<template>
  <ul>
    <li v-for="item in list" ref="itemsRef">
      {{ item }}
    </li>
  </ul>
</template>
```

## 函数模板引用

除了使用字符串值作名字，`ref`属性还可以绑定为一个函数，会在每次组件更新时都被调用。该函数会收到元素引用作为其第一个参数：

```vue
<input :ref="(el) => { /* 将 el 赋值给一个数据属性或 ref 变量 */ }">
```

注意这里需要使用动态的`:ref`绑定才能够传入一个函数。当绑定的元素被卸载时，函数也会被调用一次，此时的 el 参数会是 null。你当然也可以绑定一个组件方法而不是内联函数。
