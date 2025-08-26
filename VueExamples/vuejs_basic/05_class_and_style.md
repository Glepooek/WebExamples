数据绑定的一个常见需求场景是：操纵元素的CSS class列表和内联样式。
因为`class`和`style`都是属性，可以和其他属性一样使用`v-bind`将它们和动态的字符串绑定。
Vue专门为`class`和`style`的`v-bind`用法提供了特殊的功能增强。除了字符串外，表达式的值也可以是对象或数组。

## 绑定HTML class
### 绑定对象
* 可以给`:class`传递一个对象来动态切换`class`。
* 可以在对象中定义多个字段来操作多个class。
* `:class`指令可以和一般的class属性共存。

#### 内联字面量
绑定对象写成内联字面量。

```html
<!-- active 是否存在取决于数据属性 isActive 的真假值。-->
<p class="static" :class="{active:isActive, 'text-danger':hasError}">
    <span>内联字面量</span> Note that this is an important paragraph.
</p>
```

```vue
<script setup>
  import { ref } from 'vue'

  const isActive = ref(true)
  const hasError = ref(false)
</script>
```

#### 对象
绑定对象直接写成对象。

```html
<p class="static" :class="classObj">
    <span>绑定对象</span> Note that this is an important paragraph.
</p>
```

```vue
<script setup>
  import { reactive } from 'vue'
  const classObj = reactive({
    active: true,
    'text-danger': false
  })
</script>
```

#### 计算属性
绑定到返回对象的计算属性。

```html
<p class="static" :class="classObject">
    <span>绑定对象</span> Note that this is an important paragraph.
</p>
```

```vue
<script setup>
  import { computed, ref } from 'vue'

  const isActive = ref(true)
  const error = ref(null)

  const classObject = computed(() => {
    active: this.isActive && !this.error,
    'text-danger': this.error && this.error.type === 'fatal'
  })
</script>
```

### 绑定数组
可以给`:class`绑定一个数组来渲染多个CSS class：

```html
<div :class="[activeClass, errorClass]"></div>
<!-- 2. 数组语法。有条件的渲染某个class -->
<div :class="[isActive ? activeClass : '', errorClass]"></div>

<!-- 3. 数组与对象混合 -->
<div :class="[{ active: isActive }, errorClass]"></div>

<!-- 4. 使用计算属性名。ES6引入了计算属性名语法，允许我们使用方括号[]包裹表达式来动态生成属性名。 -->
<div :class="[{ [activeClass]: isActive }, errorClass]"></div>
```

```vue
<script setup>
  import { ref } from 'vue'

  const activeClass = ref('active')
  const errorClass = ref('text-danger')
  const isActive = ref(false)
</script>
```

### 在组件上使用
对于只有一个根元素的组件，当你使用了`class`属性时，这些`class`会被添加到根元素上并与该元素上已有的`class`合并。举例来说，如果你声明了一个组件名叫MyComponent，模板如下：

```vue
<template>
  <!-- 子组件模板 -->
  <p class="foo bar">Hi!</p>
</template>
```

在使用时添加一些class：

```vue
<template>
<!-- 在使用组件时 -->
<MyComponent class="baz boo" />
</template>
```

渲染出的HTML为：

```vue
<template>
  <p class="foo bar baz boo">Hi!</p>
</template>
```

Class 的绑定也是同样的：

```vue
<template>
  <MyComponent :class="{ active: isActive }" />
</template>
```

当isActive为真时，被渲染的HTML会是：

```vue
<template>
  <p class="foo bar active">Hi!</p>
</template>
```

如果你的组件有多个根元素，需要指定哪个根元素来接收这个class。你可以通过组件的`$attrs`属性来指定接收的元素：

```vue
<template>
  <!-- MyComponent 模板使用 $attrs 时 -->
  <p :class="$attrs.class">Hi!</p>
  <span>This is a child component</span>
</template>
```

```vue
<MyComponent class="baz" />
```

这将被渲染为：

```html
<p class="baz">Hi!</p>
<span>This is a child component</span>
```

## 绑定内联样式
### 绑定对象
`:style`支持绑定JS对象值，对应的是HTML元素的`style`属性。`:style`指令也可以和常规的style属性共存。

* 绑定到内联字面量
* 绑定到对象
* 绑定到返回样式对象的计算属性
* 绑定到返回样式对象的方法


### 绑定数组
:style绑定一个包含多个样式对象的数组。这些对象会被合并后渲染到同一元素上：

```html
<div :style="[baseStyles, overridingStyles]"></div>
```

### 自动前缀
在`:style`中使用了需要`浏览器特殊前缀`的CSS属性时，Vue会自动为他们加上相应的前缀。

* `-webkit-`
* `-ms-`
* `-moz-`
* `-o-`

### 样式多值
可以对一个样式属性提供多个 (不同前缀的) 值，如：

```html
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

数组仅会渲染浏览器支持的最后一个值。在这个示例中，在支持不需要特别前缀的浏览器中都会渲染为`display: flex`。