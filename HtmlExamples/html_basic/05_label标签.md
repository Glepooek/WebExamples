`label`标签用于为input元素定义标注（标记）。这个标签不仅提高了表单控件的可用性，而且还增强了用户的交互体验。当用户点击label标签内的文本时，浏览器会自动将焦点转移到与标签相关的表单控件上，这样就扩大了元素的可点击区域，特别是对于触屏设备的用户来说，操作起来更加方便。

## 使用label标签的方法

有两种主要的方法可以将label标签与input相关联：

### 方法一：直接包含

将input直接放在label标签内部，这样就不需要for和id属性，因为关联已经隐含在其中了。例如：

```html
<label>密码:
    <input type="text" />
</label>
```
这种方法简单直接，不需要额外的属性来建立关联。

### 方法二：使用for属性

给input标签一个id属性，并且给label标签一个for属性，其值与input的id相同。例如：

```html
<label for="password">密码:</label>
<input type="text" id="password" />
```

这种方法允许将label标签放置在页面的任何位置，而不仅仅是作为form标签的后代。