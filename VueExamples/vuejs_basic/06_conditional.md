## 条件渲染

* `v-if`指令用于条件性地渲染一块内容。这块内容只会在指令的表达式返回真值时才被渲染。
* `v-else`为`v-if`添加一个`else区块`。`v-else`元素必须跟在一个`v-if`或`v-else-if`元素后面，否则它将不会被识别。
* `v-else-if`提供的是相应于`v-if`的`else if`区块”。它可以连续多次重复使用。

## `<template>`上的v-if​、v-else 和 v-else-if
因为`v-if`是一个指令，必须依附于某个元素。如果想切换多个元素，在这种情况下我们可以在一个<template>元素上使用`v-if`，这只是一个不可见的包装器元素，最后渲染的结果并不会包含这个 <template> 元素。

```vue
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
```

## v-show
`v-show`指令也可以用来按条件显示一个元素。

```html
<h1 v-show="ok">Hello!</h1>
```

不同之处在于`v-show`会在DOM渲染中保留该元素；v-show仅切换了该元素上名为`display`的CSS属性。
v-show不支持在<template>元素上使用，也不能和v-else搭配使用。

## v-if vs. v-show​
* v-if 是“真实的”按条件渲染，因为它确保了在切换时，条件区块内的事件监听器和子组件都会被销毁与重建。
* v-if 也是惰性的：如果在初次渲染时条件值为 false，则不会做任何事。条件区块只有当条件首次变为 true 时才被渲染。
* v-show简单许多，元素无论初始条件如何，始终会被渲染，只要 CSS display 属性会被切换。

总的来说，
`v-if`有更高的切换开销，而`v-show`有更高的初始渲染开销。
因此，如果需要频繁切换，则使用`v-show`较好；如果在运行时绑定条件很少改变，则`v-if`会更合适。

## v-if 和 v-for​
当`v-if`和`v-for`同时存在于一个元素上的时候，`v-if`会首先被执行。