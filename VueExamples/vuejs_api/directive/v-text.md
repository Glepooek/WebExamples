## v-text

更新元素的文本内容。

* 期望的绑定值类型：`string`
* 详细信息
`v-text`通过设置元素的`textContent`属性来工作，因此它将覆盖元素中所有现有的内容。
如果你需要更新`textContent`的部分，应该使用文本插值（`{{ msg}}`）代替。

* 示例

```vue
<template>
    <span v-text="msg"></span>
    <!-- 等同于 -->
    <span>{{msg}}</span>

    <button v-text="btnText"></button>
</template>

<script setup>

const msg = ref('更新元素的文本内容')
const btnText = ref('更新文本')

</script>
```