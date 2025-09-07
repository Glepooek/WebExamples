一个Vue组件使用前，需要先被注册。
组件注册有两种方式：
* 全局注册
* 局部注册

## 全局注册
使用Vue应用实例的`.component()`方法，让组件在当前Vue应用中全局可用。

```js
import { createApp } from 'vue'

const app = createApp({})
app.component(
    // 注册的组件名
    'MyComponent', {
    // 组件实现
})
```

如果使用单文件组件（SFC），可以注册被导入的`.vue`文件：

```js
import { createApp } from 'vue'
import SvgIcon from './components/icons/SvgIcon.vue'

const app = createApp({})
app.component('SvgIcon', SvgIcon)
```

`.component()`方法可以被链式调用：

```js
app
  .component('ComponentA', ComponentA)
  .component('ComponentB', ComponentB)
  .component('ComponentC', ComponentC)
```

全局注册的组件可以在此应用的任意组件的模板中使用：

```vue
<!-- 这在当前应用的任意组件中都可用 -->
<ComponentA/>
<ComponentB/>
<ComponentC/>
```

## 局部注册
全局注册，存在以下几个问题：
* 全局注册，但没有被使用的组件，无法在生产打包时自动被移除（也叫tree-shaking）。
* 全局注册在大型项目中使项目的依赖关系变得不那么明确。

局部注册的组件，在使用它的父组件中要显示导入，并且只能在该父组件中使用。它的优点是使组件之间的依赖关系更加明确，并且对tree-shaking更加友好。

在使用`<script setup>`的单文件组件中，导入的组件可以直接在模板中使用，无需注册：

```vue
<script setup>
import ComponentA from './ComponentA.vue'
</script>

<template>
  <ComponentA />
</template>
```

如果没有使用`<script setup>`，则需要使用components选项来显式注册：

```js
import ComponentA from './ComponentA.js'

export default {
  components: {
    ComponentA
  },
  setup() {
    // ...
  }
}
```

对于每个`components`对象里的属性，它们的key名就是注册的组件名，而值就是相应组件的实现。上面的例子中使用的是ES2015的缩写语法，等价于：

```js
export default {
  components: {
    ComponentA: ComponentA
  }
  // ...
}
```

请注意：`局部注册的组件在后代组件中不可用。`

## 组件名格式
使用`PascalCase`作为组件名的注册格式，这是因为：

* `PascalCase`是合法的JS标识符。这使得在JS中导入和注册组件都很容易，同时 IDE 也能提供较好的自动补全。
* `<PascalCase />`在模板中更明显地表明了这是一个Vue组件，而不是原生HTML元素。同时也能够将 Vue组件和自定义元素 (web components) 区分开来。

在单文件组件和内联字符串模板中，我们都推荐这样做。但是，`PascalCase`的标签名在DOM内模板中是不可用的。

为了方便，Vue支持将模板中使用`kebab-case`的标签解析为使用`PascalCase`注册的组件。这意味着一个以MyComponent为名注册的组件，在模板 (或由Vue渲染的HTML元素) 中可以通过`<MyComponent>`或 `<my-component>`引用。这让我们能够使用同样的JS组件注册代码来配合不同来源的模板。