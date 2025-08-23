css `display`属性设置元素是否被视为块级（block）或行级（inline）盒子以及用于子元素的布局，例如流式布局、网格布局或弹性布局。

形式上，`display`属性设置元素的内部和外部的显示类型。外部类型设置元素`参与流式布局`；内部类型设置`子元素的布局`。一些`display`值在它们自己的单独规范中完整定义。例如，在CSS弹性盒模型的规范中，定义了声明`display: flex`时会发生的细节。

## 语法
CSS `display`属性规定使用的关键字值：

```css
/* 预组合值 */
display: block;
display: inline;
display: inline-block;
display: flex;
display: inline-flex;
display: grid;
display: inline-grid;
display: flow-root;

/* 生成盒子 */
display: none;
display: contents;

/* 多关键字语法 */
display: block flex;
display: block flow;
display: block flow-root;
display: block grid;
display: inline flex;
display: inline flow;
display: inline flow-root;
display: inline grid;

/* 其他值 */
display: table;
display: table-row; /* 所有的 table 元素 都有等效的 CSS display 值 */
display: list-item;

/* 全局值 */
display: inherit;
display: initial;
display: revert;
display: revert-layer;
display: unset;
```

## 分组的值
关键字值可以被分组为六个种类。

### Outside（`<display-outside>`）
这些关键字规定元素的外部显示类型，实际上就是其在流式布局中的角色：

* block，该元素生成一个块级盒子，在正常的流中，该元素之前和之后产生换行。
* inline，该元素生成一个或多个行级盒子，它们之前或者之后并不会产生换行。在正常的流中，如果有空间，下一个元素将会在同一行上。

```css
display: block;
```

### Inside（`<display-inside>`）
这些关键字规定了元素的内部显示类型，其定义了该内容布局时的格式上下文的类型（假设它是一个非替换元素）：

* flow，该元素使用流式布局（块向和行向布局）来排布它的内容。
* flow-root，该元素生成一个块级元素盒，其会建立一个新的区块格式化上下文，定义格式化上下文的根元素。
* table，该元素定义了一个块级别的盒子。行为类似于HTML中的`<table>`元素。
* flex，该元素的行为类似块级元素并且根据弹性盒模型布局它的内容。
* grid，该元素的行为类似块级元素并且根据网格模型布局它的内容。
* ruby，该元素的行为类似行级元素并且根据`ruby`格式化模型布局它的内容。它的行为像关联的HTML的 `<ruby>`元素。

```css
display: flex;
```

### List-item（`<display-listitem>`）
该元素为内容生成一个块级盒子和一个单独的列表元素行级盒子。
`list-item`的单独值将导致元素的行为类似于一个列表元素。其可以与`list-style-type`和 `list-style-position`一起使用。

`list-item`也可以与任意的`<display-outside>`关键字和`<display-inside>`中的flow或 flow-root关键字组合。

```css
.fake-list {
    display: list-item;
    list-style-position: inside;
}
```

### Internal（`<display-internal>`）
一些布局模型，例如`table`和`ruby`有一个复杂的内置结构，它们的子孙后代可以扮演几个不同的角色。本节定义的这些“内部”display值，仅在特定的布局模式下有用。

* table-row-group，该元素的行为类似于 HTML 的 <tbody> 元素。
* table-header-group，该元素的行为类似于 HTML 的 <thead> 元素。
* table-footer-group，该元素的行为类似于 HTML 的 <tfoot> 元素。
* table-row，该元素的行为类似于 HTML 的 <tr> 元素。
* table-cell，该元素的行为类似于 HTML 的 <td> 元素。
* table-column-group，该元素的行为类似于 HTML 的 <colgroup> 元素。
* table-column，该元素的行为类似于 HTML <col> 元素。
* table-caption，该元素的行为类似于 HTML 的 <caption> 元素。
* ruby-base，该元素的行为类似于 HTML 的 <rb> 元素。
* ruby-text，该元素的行为类似于 HTML 的 <rt> 元素。
* ruby-base-container，该元素是作为匿名盒子生成的。
* ruby-text-container，该元素的行为类似于 HTML 的 <rtc> 元素。

### Box（`<display-box>`）
这些关键词定义一个元素到底是否产生显示盒（display boxes）。

* contents，这些元素自身不会产生特定的盒子。它们被伪盒子（pseudo-box）和子盒子取代。（本身不显示，子元素会显示）
* none，使元素不再显示，其对布局不会有影响（文档渲染得好像这个元素并不存在）。所有的后代元素也不会再显示。为了使元素占据一个它通常占据的空间，但实际上没有渲染任何东西，应该使用`visibility`属性。

```css
.outer {
  border: 2px solid red;
  width: 300px;
  display: contents;
}

.outer > div {
  border: 1px solid green;
}
```

### 预组合（Precomposed，`<display-legacy>`）
CSS 2为`display`属性使用单关键字的预组合的语法，对相同布局模式的块级和行级变体需要单独的关键字。

* inline-block，该元素生成块级元素盒，如果它是一个单独的行级盒，它将和周围的内容一起流动（行为类似于替换元素）。它等同于`inline flow-root`。
* inline-table，inline-table值在HTML中没有直接的映射。它行为类似于HTML的`<table>`元素，但实际是一个行级盒，而不是一个块级盒子。table盒内部是一个块级上下文。它等同于 `inline table`。
* inline-flex，元素的行为类似于行级元素并且它的内容根据弹性盒模型布局。它等同于 `inline flex`。
* inline-grid，元素的行为类似于行级元素并且它的内容根据网格盒模型布局。它等同于`inline grid`。

## 现在该用什么语法？
CSS display modules描述了多关键字语法，你可以使用`display`属性明确地定义外部和内部 display值。也支持单个关键字值（预组合`<display-legacy>`值）以实现向后兼容性。

例如，你可以按以下方式使用两个值指定一个行级的弹性容器：

```css
.container {
  display: inline flex;
}
```

也可以使用传统的单值来指定。

```css
.container {
  display: inline-flex;
}
```

## 全局值

```css
/* 全局值 */
display: inherit;
display: initial;
display: unset;
```
