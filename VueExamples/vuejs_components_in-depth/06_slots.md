## 插槽内容与出口
组件可以接收任意类型JS值作为props。
组件通过`<slot>`元素接收模板内容，可以是任意合法的模版内容，不局限于文本。

示例：父组件向子组件传递模版内容

```vue
<!-- 父组件 -->
<template>
    <!-- <FancyButton>Click Me</FancyButton> -->
    <FancyButton>
        <span style="color:red">Click me!</span>
        <AwesomeIcon name="plus" />
    </FancyButton>
</template>
```

```vue
<!-- 子组件 FancyButton -->
<template>
    <button class="fancy-button">
        <slot></slot>
    </button>
</template>
```

`<slot>`元素是一个插槽出口(slot outlet)，标示了父元素提供的插槽内容(slot content)将在哪里被渲染。

![slot](assets/slots_content_outlet.png)


通过使用插槽，`<FancyButton>`仅负责渲染外层的`<button>`元素，而其内部的内容由父组件提供。

## 渲染作用域
插槽的内容可以访问到父组件的数据作用域，因为插槽内容本身是在父组件作用域内定义的。

```vue
<span>{{ message }}</span>
<FancyButton>{{ message }}</FancyButton>
```

这里的两个`{{ message }}`插值表达式渲染的内容都是一样的。

插槽内容无法访问子组件的数据。Vue模板中的表达式只能访问其定义时所处的作用域，这和JavaScript的词法作用域规则是一致的。换言之：
`父组件模板中的表达式只能访问父组件的作用域；子组件模板中的表达式只能访问子组件的作用域`。

## 默认内容
在外部没有提供任何内容的情况下，可以为插槽指定默认内容。如下示例：

```vue
<!-- <SubmitButton> 组件 -->
<template>
    <button type="submit">
        <slot>
        <!-- 默认内容 -->
            Submit
        </slot>
    </button>
</template>
```

当在父组件使用`<SubmitButton>`组件时，没有提供任何内容，则默认内容会被渲染，但如果提供了插槽内容，则显示提供的内容会取代默认内容。如：

```vue
<SubmitButton>Save</SubmitButton>
```

渲染为：

```html
<button type="submit">Save</button>
```

## 具名插槽
在一个组件中有时包含多个插槽出口。对于这种场景，`<slot>`元素可以有一个特殊的属性`name`，用来给各个插槽分配唯一的ID，以确定每一处要渲染的内容。
举例来说，在一个<BaseLayout>组件中，有如下模板：

```vue
<template>
    <div class="container">
        <header>
            <slot name="header"></slot>
        </header>
        <main>
            <slot></slot>
        </main>
        <footer>
            <slot name="footer"></slot>
        </footer>
    </div>
</template>
```

这类带`name`的插槽被称为具名插槽(named slots)。没有提供`name`的<slot>出口会隐式地命名为“default”。
在父组件中使用<BaseLayout>时，要为具名插槽传入内容，需要使用一个含`v-slot`指令的`<template>`元素，并将目标插槽的名字传给该指令：

```vue
<template>
    <BaseLayout>
        <template v-slot:header>
            <!-- header 插槽的内容放这里 -->
        </template>
    </BaseLayout>
</template>
```

`v-slot`有对应的简写`#`，因此<template v-slot:header>可以简写为`<template #header>`。

![名插槽图示](assets/named-slots.png)

下面给出完整的向<BaseLayout>传递插槽内容的代码，指令均使用的是缩写形式：

```vue
<template>
    <BaseLayout>
        <template #header>
            <h1>Here might be a page title</h1>
        </template>

        <template #default>
            <p>A paragraph for the main content.</p>
            <p>And another one.</p>
        </template>

        <template #footer>
            <p>Here's some contact info</p>
        </template>
    </BaseLayout>
</template>
```

当一个组件同时接收默认插槽和具名插槽时，所有位于顶级的非<template>节点都被隐式地视为默认插槽的内容。所以上面也可以写成：

```vue
<template>
    <BaseLayout>
        <template #header>
            <h1>Here might be a page title</h1>
        </template>

        <!-- 隐式的默认插槽 -->
        <p>A paragraph for the main content.</p>
        <p>And another one.</p>

        <template #footer>
            <p>Here's some contact info</p>
        </template>
    </BaseLayout>
</template>
```

现在<template>元素中的所有内容都将被传递到相应的插槽。最终渲染出的HTML如下：

```html
<div class="container">
  <header>
    <h1>Here might be a page title</h1>
  </header>
  <main>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </main>
  <footer>
    <p>Here's some contact info</p>
  </footer>
</div>
```

## 条件插槽
有时需要根据内容是否被传入了插槽来渲染某些内容。可以结合使用`$slots`属性与`v-if`来实现。
在下面的示例中，我们定义了一个卡片组件，它拥有三个条件插槽：header、footer和default。 当header、footer或default的内容存在时，我们希望包装它以提供额外的样式：

```vue
<template>
  <div class="card">
    <div v-if="$slots.header" class="card-header">
      <slot name="header" />
    </div>

    <div v-if="$slots.default" class="card-content">
      <slot />
    </div>

    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>
```

## 动态插槽名
动态指令参数在`v-slot`也有效，允许我们为插槽分配一个动态的参数名。
示例：

```vue
<template>
    <BaseLayout>
        <template v-slot:[dynamicSlotName]>
        </template>

        <template #[dynamicSlotName]>
        </template>
    </BaseLayout>
</template>
```

## 作用域插槽


### 具名作用域插槽


### 高级列表组件示例


### 无渲染组件



