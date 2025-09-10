## 基本用法
`v-model`可以在组件上使用以实现双向数据绑定。
以实现`CustomInput`组件为例：

* 组件内`v-model`实现方式1：

```vue
<CustomInput v-model="todoItemTitle" />
```

```vue
<template>
  <!-- <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
  <input :value="modelValue" @input="updateModelValue($event)" />
  <input :value="modelValue" @input="event => updateModelValue(event)" /> -->
</template>

<script>
  export default {
    props: ["modelValue"],
    emits: ["update:modelValue"],
    setup(props, { emit }) {
      return {
        updateModelValue(event) {
          emit("update:modelValue", event.target.value)
        },
      }
    },
  }
</script>
```

* 组件内`v-model`实现方式2：
另一种在组件内实现`v-model`的方式是使用一个可写的，同时具有`getter和setter`的`computed`属性。get方法需返回`modelValue`prop，而 set方法需触发相应的事件：

```vue
<CustomInput v-model="todoItemTitle" />
```

```vue
<template>
  <input v-model="value" />
</template>

<script>
  export default {
    props: ["modelValue"],
    emits: ["update:modelValue"],
    computed: {
      value: {
        get() {
          return this.modelValue
        },
        set(value) {
          this.$emit("update:modelValue", value)
        },
      },
    },
  }
</script>
```

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
`v-model`有一些内置的修饰符，如`.lazy`、`.trim`和`.number`。

### 自定义修饰符
添加到组件`v-model`的修饰符将通过`modelModifiers`prop提供给组件。
如创建一个自定义修饰符`capitalize`，自动将`v-model`绑定输入的字符串值的第一个字母转为大写。

```vue
<!-- 父组件 -->
<MyComponent v-model.capitalize="todoItemTitle" />
```

```vue
<!-- 子组件 -->
<template>
  <input type="text" :value="modelValue" @input="emitValue" />
</template>

<script>
  export default {
    props: {
      modelValue: String,
      modelModifiers: {
        default: () => [],
      },
    },
    emits: ["update:modelValue"],
    methods: {
      emitValue(event) {
        let value = event.target.value
        if (this.modelModifiers.capitalize) {
          value = value.charAt(0).toUpperCase() + value.slice(1)
        }
        this.$emit("update:modelValue", value)
      },
    },
    created() {
      console.log(this.modelModifiers)
    },
  }
</script>
```

### 处理带参数`v-model`修饰符
对于既有参数又有修饰符的`v-model`绑定，prop名将是`arg+Modifiers`。如：

```vue
<!-- 父组件 -->
<MyComponent v-model:title.capitalize="todoItemTitle" />
```

```vue
<!-- 子组件 -->
<script>
    export default {
        props: ['title', 'titleModifiers'],
        emits: ['update:title'],
        methods: {
            emitValue(event) {
                let value = event.target.value
                if (this.titleModifiers.capitalize) {
                    value = value.charAt(0).toUpperCase() + value.slice(1)
                }
                this.$emit('update:title', value)
            }
        }
    }
</script>
```

如何在使用多个不同参数的`v-model`时使用修饰符：
```vue
<UserName
    v-model:first-name.capitalize="firstName"
    v-model:last-name.uppercase="lastName" />
```

```vue
<!-- 子组件 -->
<template>
    <input :value="firstName" @input="$emit('update:firstName', $event.target.value)" />
    <input :value="lastName" @input="$emit('update:lastName', $event.target.value)" />
</template>
<script>
    export default {
        props:{
            firstName: String,
            lastName: String,
            firstNameModifiers: {
                default: () => [],
            },
            lastNameModifiers: {
                default: () => [],
            }
        },
        emits: ['update:firstName', 'update:lastName'],
    }
</script>
```