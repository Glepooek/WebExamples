## Attributes继承
`透传attribute`指的是传递给一个组件，但没有被组件声明为`props`和`emits`的属性或`v-on`事件监听器。最常见的例子是`class`、`style`和`id`属性。
当一个组件以单个元素为根被渲染时，透传的属性会被添加到根元素上。

### 对`class`和`style`的合并
如果一个子组件的根元素已经有了`class`和`style`属性，它会和从父组件上继承的属性自动被合并。

### `v-on`监听器继承
`v-on`监听器会从父组件继承下来，也被添加到根元素上。如果根元素也通过`v-on`绑定了一个事件监听器，则这个监听器和从父组件继承的监听器都会被触发。

### 深层组件继承
透传属性会从父组件的根元素继承到所有子组件的根元素。

请注意：
* 透传的attribute不会包含<MyButton>上声明过的props或是针对emits声明事件的v-on侦听函数，换句话说，声明过的props和侦听函数被<MyButton>“消费”了。
* 透传的attribute若符合声明，也可以作为 props 传入 <BaseButton>。

## 禁用Attributes继承
如果不想组件的根元素自动继承属性，可以通过`inheritAttrs`选项将其设置为`false`。

```js
export default {
    inheritAttrs: false,
}
```

最常见的禁用属性继承的场景：属性需要应用在根节点以外的其他元素上。通过设置`inheritAttrs`选项为 false，你可以完全控制透传进来的attribute被如何使用。

这些透传进来的attribute可以在模板的表达式中直接用`$attrs`访问到。

```vue
<span>Fallthrough attribute: {{ $attrs }}</span>
```

这个`$attrs`对象包含了除组件所声明的props和emits之外的所有其他attribute，例如class，style，v-on监听器等等。

有几点需要注意：

* 和props有所不同，透传attributes在JS中保留了它们原始的大小写，所以像`foo-bar`这样的一个 attribute需要通过`$attrs['foo-bar']`来访问。
* 像`@click`这样的一个v-on事件监听器将在此对象下被暴露为一个函数`$attrs.onClick`。

再次使用一下之前小节中的<MyButton>组件例子。有时候我们可能为了样式，需要在<button>元素外包装一层 <div>：

```vue
<div class="btn-wrapper">
  <button class="btn">Click Me</button>
</div>
```

想要所有像class和v-on监听器这样的透传attribute都应用在内部的<button>上而不是外层的<div>上，可以通过设定`inheritAttrs:false`和使用`v-bind="$attrs"`（没有参数的v-bind会将一个对象的所有属性都作为attribute应用到目标元素上）来实现：

```vue
<template>
    <div class="btn-wrapper">
        <button class="btn" v-bind="$attrs">Click Me</button>
    </div>
</template>

<script>
export default {
    inheritAttrs: false
}
</script>
```

## 多根节点的Attributes继承
有多根节点的组件没有attributes自动透传行为。需要在你想透传属性的根节点上显示绑定`$attrs`。

```vue
<template>
    <header></header>
    <main v-bind="$attrs"></main>
    <footer></footer>
</template>
```

## 在JS中访问透传attributes
`$attrs`对象包含了组件的所有透传的attribute。

```js
export default {
    created() {
        console.log(this.$attrs)
    }
}
```