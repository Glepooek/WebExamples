## 基本用法
`v-model`可以在组件上使用以实现双向数据绑定。


## `v-model`的参数
组件上的`v-model`也可以接受一个参数：

```vue
<!-- 父组件 -->
<MyComponent v-model:title="todoItemTitle" />
```

在这种情况下，子组件应该使用`title`prop和`update:title`事件来更新父组件的值，而非默认的`modelValue`和`update:modelValue`事件。

```vue
<!-- 子组件 -->
<template>
    <input :value="title" @input="$emit('update:title', $event.target.value)" />
</template>

<script>
    export default {
        props: ['title'],
        emits: ['update:title'],
    }
</script>
```

## 多个`v-model`绑定
通过为`v-model`指定不同参数，可以在单个组件实例上创建多个`v-model`双向绑定。
组件上的每一个v-model都会同步不同的prop，而无需额外的选项：

```vue
<UserName v-model:first-name="firstName" v-model:last-name="lastName" />
```

```vue
<!-- 子组件 -->
<template>
    <input :value="firstName" @input="$emit('update:firstName', $event.target.value)" />
    <input :value="lastName" @input="$emit('update:lastName', $event.target.value)" />
</template>
<script>
    export default {
        props: ['firstName', 'lastName'],
        emits: ['update:firstName', 'update:lastName'],
    }
</script>
```

## 处理`v-model`修饰符
`v-model`


### 处理带参数`v-model`修饰符

