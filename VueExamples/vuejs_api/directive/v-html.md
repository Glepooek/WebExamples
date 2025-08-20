## v-html
* 更新元素的innerHTML。

* 期望的绑定值类型：`string`

* 详细信息

`v-html`的内容直接作为普通HTML插入—— Vue模板语法是不会被解析的。如果你发现自己正打算用`v-html`来编写模板，不如重新想想怎么使用组件来代替。
安全起见，慎用`v-html`。

在单文件组件，scoped样式将不会作用于v-html里的内容，因为HTML内容不会被Vue的模板编译器解析。如果你想让v-html的内容也支持scoped CSS，可以使用CSS modules或使用一个额外的全局`<style>`元素，手动设置类似`BEM`的作用域策略。

* 示例

```html
<div v-html="html"></div>

<!--- 使用 CSS modules -->
<style module>
.highlight {
  background-color: yellow;
  padding: 10px;
  border-radius: 4px;
}
</style>

<!-- 使用全局样式 -->
<style>
.highlight {
  background-color: yellow;
  padding: 10px;
  border-radius: 4px;
}
</style>
```