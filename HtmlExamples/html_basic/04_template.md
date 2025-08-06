在HTML5中，`<template>`标签用于声明一段不会被浏览器直接渲染的HTML结构，作为“模板”存放在文档中，只有通过JavaScript动态获取和插入时才会被渲染到页面。

`<template>`既是HTML5的标准标签，也是Vue单文件组件（SFC）中的核心部分。

## 在Vue文件中的作用
- `<template>`用于声明该组件的“模板”，即组件的结构和内容。
- 里面写的内容会被Vue渲染为真实的DOM元素。
- 只能有一个根元素（如 `<div>`），其内部可以包含任意HTML和Vue语法。

## 如何使用
- 在`.vue`文件中，`<template>` 标签包裹组件的HTML结构。
- 结合 Vue 的数据绑定、指令等语法，实现动态渲染。

```vue
<template>
  <div>
    <h1>{{ title }}</h1>
    <button @click="doSomething">点击</button>
  </div>
</template>
```

## 总结
- `<template>` 是HTML5标准标签，但在Vue组件中专门用来写组件的视图结构。
- 只在Vue编译时起作用，最终不会出现在页面DOM结构中。