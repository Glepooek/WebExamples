自定义属性，也被称作CSS变量或者级联变量，是由CSS作者定义的，它包含的值可以在整个文档中重复使用。由自定义属性标记设定值（比如：--main-color:black;），由`var()`函数来获取值（比如：color:var(--main-color);）。

* 自定义属性通常定义在根元素`:root`中，然后在整个文档中重复使用它。这样可以方便地统一管理和修改样式变量，提高样式的可维护性和复用性。
* 语义化的标识。比如，--main-text-color会比 #00ff00更易理解，尤其是这个颜色值在其他上下文中也被使用到。
* 自定义属性受级联的约束，并从其父级继承其值。

## 基本用法
声明一个自定义属性，属性名需要以两个减号`--`开始，属性值则可以是任何有效的CSS值。和其他属性一样，自定义属性也是写在`规则集`之内，如下：

```css
element {
  --main-bg-color: brown;
}
```

注意，规则集所指定的选择器定义了自定义属性的可见作用域。通常的最佳实践是定义在根伪类`:root`下，这样就可以在HTML文档的任何地方访问到它了：

```css
:root {
  --main-bg-color: brown;
}
```

`备注：自定义属性名是大小写敏感的，--my-color和--My-color会被认为是两个不同的自定义属性。`

如前所述，使用一个局部变量时用`var()`函数包裹以表示一个合法的属性值：

```css
element {
  background-color: var(--main-bg-color);
}
```

## 自定义属性的继承性
自定义属性会继承。这意味着如果在一个给定的元素上，没有为这个自定义属性设置值，会继承其父元素上的值。

## 自定义属性的备用值
用`var()`函数可以定义多个备用值（fallback value），当给定值未定义时将会用备用值替换。
`var()`函数的第一个参数是`自定义属性的名称`。如果提供了第二个参数，则表示备用值，当自定义属性值无效时生效。第二个参数可以嵌套，但是不能继续平铺展开下去了，例如：

```css
.two {
  color: var(--my-var, red); /* Red if --my-var is not defined */
}

.three {
  background-color: var(
    --my-var,
    var(--my-background, pink)
  ); /* pink if --my-var and --my-background are not defined */
}

.three {
  background-color: var(
    --my-var,
    --my-background,
    pink
  ); /* Invalid: "--my-background, pink" */
}
```

## 有效性和值
传统的CSS概念里，有效性和属性是绑定的，比如`color: red;`是有效的，`color: 123;`是无效的。但这对自定义属性来说并不适用。浏览器在解析自定义属性值时，并不知道它们会被用在哪里，所以所有自定义属性的值都被认为是有效的，不会报错。

但当你用`var()`函数把自定义属性的值用到具体CSS属性上时，如果这个值在当前上下文下不合法（比如 width: var(--my-var);，而--my-var: abc;），就会导致这条CSS语句无效。这种情况叫做`计算时有效性`。

## 无效变量会导致什么
当浏览器遇到无效的`var()`时，会使用`继承值或初始值`代替。
`备注：当CSS属性-值对中存在语法错误，该行则会被忽略。然而如果自定义属性的值无效，它并不会被忽略，会导致该值被覆盖为默认值。`

## JS中的值
在JavaScript中获取或者修改CSS变量和操作普通CSS属性是一样的：

```js
// 获取一个 Dom 节点上的 CSS 变量
element.style.getPropertyValue("--my-var");

// 获取任意 Dom 节点上的 CSS 变量
getComputedStyle(element).getPropertyValue("--my-var");

// 修改一个 Dom 节点上的 CSS 变量
element.style.setProperty("--my-var", jsVar + 4);
```