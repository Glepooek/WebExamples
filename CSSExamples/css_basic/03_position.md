css `position`属性用于指定一个元素在文档中的定位方式。`left`, `right`, `top`, `bottom`属性则决定了该元素的最终位置。

## 定位类型

* 定位元素（positioned element）：是计算位置值是相对、绝对、固定或粘性的元素。(换句话说，除了静态之外的任何东西。）
* 相对定位元素：是计算位置值是相对的元素。顶部和底部属性指定其正常位置的垂直偏差;左侧和右侧属性指定水平偏差。
* 绝对定位元素：是计算位置值为绝对（absolute）或固定(fixed)的元素。顶部、右侧、底部和左侧属性指定距元素包含块边缘的偏差。(包含块是元素所定位的祖先。）如果元素有外边距，则它们将添加到补偿中。该元素为其内容建立新的块格式化上下文（BFC）。
* 粘性定位元素：是计算位置值具有粘性的元素。它被视为相对定位，直到其包含块在其流根（或其滚动的容器）内超过指定阈值（例如将顶部设置为除Auto以外的值），此时它被视为“卡住”，直到遇到其包含块的相对边缘。

绝对定位的元素：
* 当top和bottom都被指定时，top优先；
* 当left和rught都被指定，且direction为ltr时，left优先；


## 语法

```css
position: static;
position: relative;
position: absolute;
position: fixed;
position: sticky;

/* Global values */
position: inherit;
position: initial;
position: revert;
position: revert-layer;
position: unset;
```

* static。该元素根据文档的正常流程进行定位。此时top, right, bottom, left和z-index属性无效。这是默认值。
* relative。该元素根据文档的正常流程进行定位（跟static一样），然后可以用top, right, bottom, left属性的值在原始位置的基础上偏移。偏移后，元素仍然占据原来的空间，不会影响其他元素的布局。position:relative对table-*-group, table-row, table-column, table-cell, table-caption元素无效。
* absolute。该元素会被移出正常文档流，并不为元素预留空间。`该元素相对于其位置最近的祖先（如果有的话）或初始包含块进行定位`。它的最终位置由top, right, bottom, left属性的值确定。当z-index的值不为Auto时，此值会创建新的堆叠上下文。绝对定位的元素可以设置外边距（margins），且不会与其他边距合并。
* fixed。元素会被移出正常文档流，并不为元素预留空间，而是`通过指定元素相对于屏幕视口（viewport）的位置来指定元素位置`。元素的位置在屏幕滚动时不会改变。打印时，元素会出现在的每页的固定位置。fixed 属性会创建新的层叠上下文。当元素祖先的 transform、perspective、filter 或 backdrop-filter 属性非 none 时，容器由视口改为该祖先。
* sticky。元素根据正常文档流进行定位，然后`相对它的最近滚动祖先（nearest scrolling ancestor）和包含块（最近块级祖先 nearest block-level ancestor），包括 table-related 元素，基于 top、right、bottom 和 left 的值进行偏移。偏移值不会影响任何其他元素的位置`。 该值总是创建一个新的层叠上下文（stacking context）。注意，一个 sticky 元素会“固定”在离它最近的一个拥有“滚动机制”的祖先上（当该祖先的 overflow 是 hidden、scroll、auto 或 overlay 时），即便这个祖先不是最近的真实可滚动祖先。


