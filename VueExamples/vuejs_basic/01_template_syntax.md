Vue使用一种基于HTML的模板语法。在底层机制中，Vue会将模板编译成高度优化的JavaScript代码。

## 文本插值
“Mustache”语法，即双大括号。双大括号标签会被替换为Vue组件实例的msg属性值。

```html
 <span>Message: {{ msg }}</span>
```

## 原始HTML
双大括号会将数据解释为纯文本，而不是HTML。若想插入HTML，需要使用`v-html`指令。

```html
<!--解释为纯文本，原样输出-->
<p>Using text interpolation: {{ rawHtml }}</p>
<!--解释为HTML-->
<p>Using v-html directive: <span v-html="rawHtml"></span></p>
```

指令由`v-`作为前缀，表明它们是一些由Vue提供的特殊属性。

## 属性（Attribute）绑定
双大括号不能在HTML属性中使用，想要响应式的绑定一个属性，应该使用`v-bind`指令。

```html
<div v-bind:id="dynamicId"></div>
```

`v-bind`指令指示Vue将元素的id属性与组件的dynamicId属性保持一致。如果绑定的值是 null 或者 undefined，那么该 attribute 将会从渲染的元素上移除。

### 简写

```html
<div :id="dynamicId"></div>
```

### 同名简写，仅支持3.4版本及以上
如果属性的名称和绑定的JS变量的名称相同，则属性值可以省略。

```html
<!--与:id="id"相同-->
<div :id></div>

<!--或-->
<div v-bind:id></div>
```

### 布尔型属性
布尔型属性依据`true/false`值来决定属性是否应该存在于该元素上。

```html
<button :disabled="isDisabled">Button</button>
```

当isDisabled为真值或一个空字符串 (即 <button disabled="">) 时，元素会包含这个disabled属性。而当其为其他假值时属性将被忽略。

### 动态绑定多个值

```js
data() {
  return {
    objectOfAttrs: {
      id: 'container',
      class: 'wrapper'
    }
  }
}
```

通过不带参数的`v-bind`，将它们绑定到单个元素上：

```html
<div v-bind="objectOfAttrs"></div>
```

## 使用JS表达式
Vue在所有的数据绑定中都支持JS表达式。

```html
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}

<div :id="`list-${id}`"></div>
```

在Vue模版内，JS表达式可以在以下场景使用：
* 在文本插值中 (双大括号)
* 在任何Vue指令 (以`v-`开头的特殊属性) 属性的值中

### 仅支持表达式
每个绑定仅支持单一表达式。

### 调用函数
可以在绑定的表达式中使用一个组件暴露的方法：

```html
<time :title="toTitleDate(date)" :datetime="date">
  {{ formatDate(date) }}
</time>
```

### 受限的全局访问

## 指令
指令是带有`v-`前缀的特殊属性。
指令属性的期望值为一个JS表达式 (除了少数几个例外，即之后要讨论到的`v-for、v-on 和 v-slot`)。一个指令的任务是在其表达式的值变化时响应式地更新DOM。

![指令语法图](assets/指令语法图.png)

### 参数

### 动态参数

### 动态参数值的限制
动态参数中表达式的值应当是一个字符串，或者是null。特殊值null意为显式移除该绑定。其他非字符串的值会触发警告。

### 动态参数语法的限制

### 修饰符
修饰符是以点开头的特殊后缀，表明指令需要以一些特殊的方式被绑定。


