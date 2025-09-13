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

插槽内容无法访问子组件的数据。Vue模板中的表达式只能访问其定义时所处的作用域，这和JavaScript的词法作用域规则是一致的。换言之：`父组件模板中的表达式只能访问父组件的作用域；子组件模板中的表达式只能访问子组件的作用域`。

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

当在父组件使用`<SubmitButton>`组件时，没有提供任何内容，则默认内容会被渲染，但如果提供了插槽内容，则显式提供的内容会取代默认内容。如：

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

这类带`name`的插槽被称为具名插槽(named slots)。没有提供`name`的<slot>元素会隐式地命名为“default”。
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

![具名插槽图示](assets/named-slots.png)

下面给出完整的向<BaseLayout>传递插槽内容的代码：

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

当一个组件`同时接收`默认插槽和具名插槽时，所有位于顶级的`非<template>节点`都被隐式地视为默认插槽的内容。所以上面也可以写成：

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
有时需要根据内容是否被传入插槽来渲染某些内容。可以结合使用`$slots`属性与`v-if`来实现。
在下面的示例中，定义了一个卡片组件，它拥有三个条件插槽：header、footer和default。当header、footer或default的内容存在时，我们希望包装它以提供额外的样式：

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
动态指令参数对`v-slot`指令也有效，允许我们为插槽分配一个动态的参数名。
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
在上面的渲染作用域中我们讨论到，插槽的内容无法访问到子组件的状态。然而在某些场景下插槽的内容可能想要同时使用父组件域内和子组件域内的数据。要做到这一点：可以像对组件传递props那样，向一个插槽的出口上传递属性：

```vue
<!-- <MyComponent> 的模板 -->
<template>
    <div>
        <slot :text="greetingMessage" :count="1"></slot>
    </div>
</template>
```

当需要接收插槽`props`时，默认插槽和具名插槽的使用方式有一些小区别。
下面我们将先展示默认插槽如何接受`props`，通过子组件标签上的`v-slot`指令，直接接收到了一个插槽 props对象：

```vue
<template>
    <!-- （`slotProps`是父组件自定义的变量名，用于接收插槽props对象） -->
    <MyComponent v-slot="slotProps">
        {{ slotProps.text }} {{ slotProps.count }}
    </MyComponent>
</template>
```

![具名插槽图示](assets/scoped-slots.svg)

子组件传入插槽的`props`作为了`v-slot`指令的值，可以在插槽内的表达式中访问。
也可以在`v-slot`中使用解构：

```vue
<template>
    <MyComponent v-slot="{ text, count }">
        {{ text }} {{ count }}
    </MyComponent>
</template>
```

### 具名作用域插槽
具名作用域插槽的工作方式也是类似的，插槽props可以作为`v-slot`指令的值被访问到：`v-slot:name="slotProps"`。当使用缩写时是这样：

```vue
<template>
    <MyComponent>
        <template #header="headerProps">
            {{ headerProps }}
        </template>

        <template #default="defaultProps">
            {{ defaultProps }}
        </template>

        <template #footer="footerProps">
            {{ footerProps }}
        </template>
    </MyComponent>
</template>
```

向具名插槽中传入props：

```vue
<template>
    <slot name="header" message="hello"></slot>
</template>
```

注意插槽上的name是一个Vue特别保留的属性，不会作为props传递给插槽。因此最终`headerProps`的结果是{ message: 'hello' }。

如果你同时使用了具名插槽与默认插槽，则需要为默认插槽显式使用<template>标签。尝试直接为组件添加v-slot指令将导致编译错误。这是为了避免因默认插槽的props的作用域而困惑。举例：

```vue
<template>
    <!-- <MyComponent> template -->
    <div>
        <slot :message="hello"></slot>
        <slot name="footer" ></slot>
    </div>
</template>
```

```vue
<template>
    <!-- 该模板无法编译 -->
    <MyComponent v-slot="{ message }">
        <p>{{ message }}</p>
        <template #footer>
            <!-- message 属于默认插槽，此处不可用 -->
            <p>{{ message }}</p>
        </template>
    </MyComponent>
</template>
```

为默认插槽使用显式的<template>标签有助于更清晰地指出message属性在其他插槽中不可用：

```vue
<template>
    <MyComponent>
        <!-- 使用显式的默认插槽 -->
        <template #default="{ message }">
            <p>{{ message }}</p>
        </template>

        <template #footer>
            <p>Here's some contact info</p>
        </template>
    </MyComponent>
</template>
```

### 高级列表组件示例
<FancyList>组件的例子：

```vue
<template>
    <FancyList :api-url="url" :per-page="10">
        <template #item="{ body, username, likes }">
            <div class="item">
            <p>{{ body }}</p>
            <p>by {{ username }} | {{ likes }} likes</p>
            </div>
        </template>
    </FancyList>
</template>
```

```vue
<!-- 子组件 FancyList -->
<script>
  export default {
    props: ["api-url", "per-page"],
    data() {
      return {
        items: [],
      }
    },
    mounted() {
      // mock remote data fetching
      setTimeout(() => {
        this.items = [
          { body: "Scoped Slots Guide", username: "Evan You", likes: 20 },
          { body: "Vue Tutorial", username: "Natalia Tepluhina", likes: 10 },
        ]
      }, 1000)
    },
  }
</script>

<template>
  <ul>
    <li v-if="!items.length">Loading...</li>
    <li v-for="item in items" :key="item.likes">
      <slot name="item" v-bind="item"></slot>
    </li>
  </ul>
</template>

<style scoped>
  ul {
    list-style-type: none;
    padding: 5px;
    background: linear-gradient(315deg, #42d392 25%, #647eff);
  }
  li {
    padding: 5px 20px;
    margin: 10px;
    background: #fff;
    color: black;
  }
</style>
```

### 无渲染组件
上面的<FancyList>案例同时封装了可重用的逻辑（数据获取、分页等）和视图输出，但也将部分视图输出通过作用域插槽交给了消费者组件来管理。

`如果一些组件可能只包括了逻辑而不需要自己渲染内容，视图输出通过作用域插槽全权交给了消费者组件。我们将这种类型的组件称为无渲染组件。`

这里有一个无渲染组件的例子，一个封装了追踪当前鼠标位置逻辑的组件：

```vue
<!-- 父组件 -->
<template>
    <MouseTracker v-slot="{ x, y }">
        Mouse is at: {{ x }}, {{ y }}
    </MouseTracker>
</template>
```

```vue
<!-- 子组件 MouseTracker -->
<script>
  export default {
    data() {
      return {
        mouseX: 0,
        mouseY: 0,
      }
    },
    methods: {
      trackMouse(e) {
        // this.mouseX = e.clientX
        // this.mouseY = e.clientY
        this.mouseX = e.pageX
        this.mouseY = e.pageY
      },
    },
    mounted() {
      window.addEventListener("mousemove", this.trackMouse)
    },
    unmounted() {
      window.removeEventListener("mousemove", this.trackMouse)
    },
  }
</script>

<template>
    <!-- x、y是作用域插槽上使用的属性，用于将子组件的数据传递给父组件 -->
    <slot :x="mouseX" :y="mouseY"></slot>
</template>
```

虽然这个模式很有趣，但大部分能用无渲染组件实现的功能都可以通过组合式API 以另一种更高效的方式实现，并且还不会带来额外组件嵌套的开销。