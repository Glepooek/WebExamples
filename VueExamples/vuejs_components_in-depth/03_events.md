## 触发与监听事件​
在组件的模板表达式中，可以直接使用`$emit`方法触发自定义事件 (例如：在v-on的处理函数中)：

```vue
<!-- MyComponent -->
<button @click="$emit('someEvent')">Click Me</button>
```

父组件可以通过`v-on`(缩写为`@`)来监听事件：

```vue
<MyComponent @some-event="callback" />
```

同样，组件的事件监听器也支持`.once`修饰符：

```vue
<MyComponent @some-event.once="callback" />
```

组件内，事件以`camelCase`形式命名的事件，但在父组件中可以使用`kebab-case`形式来监听。

注意：和原生 DOM 事件不一样，组件触发的事件没有冒泡机制。

## 事件参数​
有时候需要在触发事件时附带一个特定的值。举例来说，我们想要`<BlogPost>`组件来管理文本会缩放得多大。在这个场景下，我们可以给`$emit`提供一个额外的参数：

```vue
<button @click="$emit('increaseBy', 1)">
  Increase by 1
</button>
```

然后我们在父组件中监听事件，我们可以先简单写一个内联的箭头函数作为监听器，此函数会接收到事件附带的参数：

```vue
<!-- <MyButton @increase-by="(n) => count += n" /> -->
```

或者，也可以用一个组件方法来作为事件处理函数：

```vue
<MyButton @increase-by="increaseCount" />
```

该方法也会接收到事件所传递的参数：

```js
function increaseCount(n) {
  count.value += n
}
```

注意：所有传入`$emit()`的额外参数都会被直接传向监听器。举例来说，`$emit('foo', 1, 2, 3)`触发后，监听器函数将会收到这三个参数值。

## 声明触发的事件​
组件可以显式地通过`defineEmits()`宏来声明它要触发的事件：

```vue
<script setup>
    defineEmits(['inFocus', 'submit'])
</script>
```

在`<template>`中使用的`$emit`方法不能在组件的`<script setup>`部分中使用，但`defineEmits()`会返回一个相同作用的函数供我们使用：

```vue
<script setup>
    const emit = defineEmits(['inFocus', 'submit'])

    function buttonClick() {
        emit('submit')
    }
</script>
```

`defineEmits()`宏不能在子函数中使用。如上所示，它必须直接放置在`<script setup>`的顶级作用域下。

如果你显式地使用了`setup`函数而不是<script setup>，则事件需要通过`emits选项`来定义，emit函数也被暴露在`setup()`的上下文对象上：

```js
export default {
  emits: ['inFocus', 'submit'],
  setup(props, ctx) {
    ctx.emit('submit')
  }
}
```

与`setup()`上下文对象中的其他属性一样，emit可以安全地被解构：

```js
export default {
  emits: ['inFocus', 'submit'],
  setup(props, { emit }) {
    emit('submit')
  }
}
```

这个`emits选项`和`defineEmits()`宏还支持对象语法。通过TypeScript为参数指定类型，它允许我们对触发事件的参数进行验证：

```vue
<script setup lang="ts">
    const emit = defineEmits({
    submit(payload: { email: string, password: string }) {
        // 通过返回值为 `true` 还是为 `false` 来判断
        // 验证是否通过
    }
    })
</script>
```

如果你正在搭配TypeScript使用<script setup>，也可以使用纯类型标注来声明触发的事件：

```vue
<script setup lang="ts">
    const emit = defineEmits<{
    (e: 'change', id: number): void
    (e: 'update', value: string): void
    }>()
</script>
```

尽管事件声明是可选的，我们还是推荐你完整地声明所有要触发的事件，以此在代码中作为文档记录组件的用法。同时，事件声明能让Vue更好地将事件和透传属性作出区分，从而避免一些由第三方代码触发的自定义 DOM 事件所导致的边界情况。

注意：`如果一个原生事件的名字 (例如 click) 被定义在emits选项中，则监听器只会监听组件触发的click 事件而不会再响应原生的click事件。`

## 事件校验​
和对props添加类型校验的方式类似，所有触发的事件也可以使用对象形式来描述。
`要为事件添加校验，那么事件可以被赋值为一个函数，接受的参数就是抛出事件时传入emit的内容，返回一个布尔值来表明事件是否合法。`

```vue
<script setup>
const emit = defineEmits({
  // 没有校验
  click: null,

  // 校验 submit 事件
  submit: ({ email, password }) => {
    if (email && password) {
      return true
    } else {
      console.warn('Invalid submit event payload!')
      return false
    }
  }
})

function submitForm(email, password) {
  emit('submit', { email, password })
}
</script>
```