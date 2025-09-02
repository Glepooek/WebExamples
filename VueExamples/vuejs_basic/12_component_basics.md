组件允许将UI划分为独立的、可重用的部分，并且可以对每个部分进行单独的逻辑处理。
![组件基础](assets/components_basic.png)

Vue实现了自己的组件模型，使我们可以在每个组件的内部实现自定义内容与逻辑。

## 定义一个组件

当使用构建步骤时，一般会将Vue组件定义在一个单独的`.vue`文件中，这被叫做`单文件组件`，简称 SFC。

```vue
<template>
  <button @click="count++">count is: {{ count }}</button>
</template>

<script setup>
  const count = ref(0)
</script>
```

当不使用构建步骤时，一个Vue组件以一个包含`Vue特定选项`的js对象来定义。

```js
import { ref } from "vue"

export default {
  setup() {
    const count = ref(0)
    return {
      count,
    }
  },
  template: `<button @click="count++">count is: {{ count }}</button>`,
  // 也可以针对一个 DOM 内联模板：
  // template: '#my-template-element'
}
```

- 上例中模板是一个内联的JS字符串，也可以使用`ID选择器`来指向一个元素(通常是原生的`<template>`元素)，Vue将会使用其内容作为模板来源。
- 上例中定义了一个组件，并在一个`.js`文件里默认导出了它自己，但你也可以通过具名导出在一个文件中导出多个组件。

## 使用组件

在父组件中导入子组件。如导入计数器组件（ButtonCounter以默认导出的形式被暴露给外部）：

```vue
<template>
  <h1>Here is a child component!</h1>
  <ButtonCounter />
</template>

<script setup>
  import ButtonCounter from "@/components/ButtonCounter.vue"
</script>
```

- 通过`<script setup>`导入的组件在模板中直接可用。
- 组件可以被重用任意多次，每一个是一个新实例；
- 在单文件组件中，推荐为子组件使用`PascalCase`的标签名。也可以使用`/>`关闭一个标签。
- 如果在DOM中直接使用，需要使用`kebab-case`形式并显式地关闭这些组件的标签，如<button-counter></button-counter>

## 传递属性

一个组件可以有任意多的props，默认情况下，所有prop都接受任意类型的值。

```vue
<template>
  <h4>{{ title }}</h4>
</template>

<script setup>
  defineProps(["id", "title"])
</script>

<!-- ts类型写法 -->
<script setup>
  const props = defineProps({
    id: { type: String, required: true },
    title: { type: String, required: true },
  })
</script>

<!-- 如果没有使用<script setup>，props必须以props选项的方式声明，props对象会作为setup()函数的第一个参数被传入： -->
<script>
  import { computed } from "vue"

  export default {
    props: ["id", "title"],
    setup(props) {
      computed(() => {
        // 处理...
      })

      return {
        // 返回...
      }
    },
  }
</script>
```

## 监听事件

`$emit()`是Vue组件系统中用于触发自定义事件的核心方法。

- $emit('enlarge-text')
- const emit = defineEmits(["enlargeText"])

举例，子组件：

```vue
<template>
  <h4>{{ id }}——{{ title }}</h4>
  <!-- <button @click="$emit('enlarge-text')">Enlarge text</button> -->
  <button @click="enlargeText">Enlarge text</button>
</template>

<script setup>
  defineProps(["id", "title"])
  const emit = defineEmits(["enlargeText"])

  const enlargeText = () => {
    emit("enlargeText")
  }
</script>
```

父组件：

```vue
<template>
  <div :style="{ fontSize: postFontSize + 'px' }">
    <BlogPost
      v-for="post in posts"
      :key="post.id"
      :id="post.id"
      :title="post.title"
      @enlarge-text="postFontSize = postFontSize + 2"
    />
  </div>
</template>

<script setup>
  import { ref } from "vue"
  import BlogPost from "@/components/BlogPost.vue"

  const posts = ref([
    { id: "1", title: "First Post" },
    { id: "2", title: "Second Post" },
    { id: "3", title: "Third Post" },
  ])

  const postFontSize = ref(16)
</script>
```

在子组件中不使用`<script setup>`，可以通过`emits`选项抛出事件：

```js
export default {
  props: ["id", "title"],
  emits: ["enlargeText"],
  setup(props, { emit }) {
    const enlargeText = () => {
      emit("enlargeText")
    }

    return {
      enlargeText,
    }
  },
}
```

## 通过插槽来分配内容

Vue自定义的`<slot>`元素允许我们向组件传递内容。

```vue
<template>
  <div class="alert-box">
    <strong>This is an Error for Demo Purposes</strong>
    <slot></slot>
  </div>
</template>

<style scoped>
  .alert-box {
    // ...
  }
</style>
```

## 动态组件

可以使用`<component :is="...">`，在多个组件间动态的切换组件。被切换掉的组件会被卸载。可以通过`<KeepAlive>`组件强制被切换掉的组件仍然保持“存活”的状态。`is属性`指定组件名称。

* `RouterView`是Vue Router提供的专门组件，用于渲染与当前路由匹配的组件。它是Vue Router的核心组件之一。
* `<component :is="">`是Vue的内置组件，用于动态组件渲染。它可以根据一个表达式的值来决定渲染哪个组件。

传给`:is`的值可以是以下几种：
- 被注册的组件名
- 导入的组件对象

```vue
<script setup>
  import Home from "./Home.vue"
  import Posts from "./Posts.vue"
  import Archive from "./Archive.vue"
  import { ref } from "vue"

  const currentTab = ref("Home")

  const tabs = {
    Home,
    Posts,
    Archive,
  }
</script>

<template>
  <div class="demo">
    <button
      v-for="(_, tab) in tabs"
      :key="tab"
      :class="['tab-button', { active: currentTab === tab }]"
      @click="currentTab = tab"
    >
      {{ tab }}
    </button>
    <component :is="tabs[currentTab]" class="tab"></component>
  </div>
</template>

<style>
  .demo {
    font-family: sans-serif;
    border: 1px solid #eee;
    border-radius: 2px;
    padding: 20px 30px;
    margin-top: 1em;
    margin-bottom: 40px;
    user-select: none;
    overflow-x: auto;
  }

  .tab-button {
    padding: 6px 10px;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    border: 1px solid #ccc;
    cursor: pointer;
    background: #f0f0f0;
    margin-bottom: -1px;
    margin-right: -1px;
  }
  .tab-button:hover {
    background: #e0e0e0;
  }
  .tab-button.active {
    background: #e0e0e0;
  }
  .tab {
    border: 1px solid #ccc;
    padding: 10px;
  }
</style>
```

## DOM内模版解析注意事项

请注意下面讨论只适用于直接在DOM中编写模板的情况。如果你使用来自以下来源的字符串模板，就不需要顾虑这些限制了：

- 单文件组件
- 内联模板字符串 (例如 template: '...')
- <script type="text/x-template">

### 大小写区分 ​

HTML标签和属性名称是不分大小写的，所以浏览器会把任何大写的字符解释为小写。这意味着当你在DOM内使用模板时，无论是PascalCase形式的组件名称、camelCase形式的prop名称还是v-on的事件名称，都需要转换为相应等价的kebab-case(短横线连字符) 形式：

```js
// JavaScript 中的 camelCase
const BlogPost = {
props: ['postTitle'],
emits: ['updatePost'],
template: `<h3>{{ postTitle }}</h3> `
}

<!-- HTML中的kebab-case -->
<blog-post post-title="hello!" @update-post="onUpdatePost"></blog-post>
```

### 闭合标签 ​

上面的例子中已经使用过了闭合标签 (self-closing tag)：

```vue
<MyComponent />
```

这是因为Vue的模板解析器支持任意标签使用`/>`作为标签关闭的标志。然而在DOM内模板中，必须显式地写出关闭标签：

```html
<my-component></my-component>
```

这是由于HTML只允许一小部分特殊的元素省略其关闭标签，最常见的就是`<input>`和`<img>`。对于其他的元素来说，如果你省略了关闭标签，原生的HTML解析器会认为开启的标签永远没有结束，用下面这个代码片段举例来说：

```html
<my-component />
<!-- 我们想要在这里关闭标签... -->
<span>hello</span>
```

将被解析为：

```html
<my-component>
  <span>hello</span>
</my-component>
<!-- 但浏览器会在这里关闭标签 -->
```

### 元素位置限制 ​

某些HTML元素对于放在其中的元素类型有限制，例如<ul>，<ol>，<table>和<select>，相应的，某些元素仅在放置于特定元素中时才会显示，例如<li>，<tr>和<option>。
这将导致在使用带有此类限制元素的组件时出现问题。例如：

```html
<table>
  <blog-post-row></blog-post-row>
</table>
```

自定义的组件`<blog-post-row>`将作为无效的内容被忽略，因而在最终呈现的输出中造成错误。我们可以使用特殊的`is`属性作为一种解决方案：

```html
<table>
  <tr is="vue:blog-post-row"></tr>
</table>
```

当使用在原生HTML元素上时，`is`的值必须加上前缀`vue:`才可以被解析为一个Vue组件。这一点是必要的，为了避免和原生的自定义内置元素相混淆。
