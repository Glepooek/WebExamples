```html
<input 
    :value="text" 
    @input="event=> text = event.target.value">
```

如上代码，手动连接值绑定和更改事件监听器可能会很麻烦，`v-model`指令简化了这一步骤，它会根据所使用的元素自动使用对应的DOM属性和事件组合。可用于不同类型的输入，如input、textarea、select。

* 文本类型的`<input>`和`<textarea>`元素会绑定到`value`属性，并侦听`input`事件。
* `<input type="checkbox">`和`<input> type="radio"`会绑定到`checked`属性，并侦听`change`事件
* `<select">`会绑定到`value`属性，并侦听`change`事件


## 基本用法
### 文本
```html
<input v-model="message" placeholder="edit me" >
```

### 多行文本
```html
<textarea v-model="message" placeholder="add multiple lines" >
```

在textarea中不支持插值表达式。

### 复选框

#### 单个复选框，绑定到bool值

```html
<input id="checkbox" type="checkbox" v-model="checked" />
<label for="checkbox">{{checked}}</label>
```

#### 多个复选框，绑定到同一数组或集合

```html
<div> checked Names:{{ checkedNames }} />

<input type="checkbox"  id="jack" value="Jack" v-model="checkedNames" />
<label for="jack">Jack</label>

<input type="checkbox"  id="john" value="John" v-model="checkedNames" />
<label for="john">John</label>

<input type="checkbox"  id="mike" value="Mike" v-model="checkedNames" />
<label for="mike">Mike</label>
```

### 单选按钮

```html
<div> Picked:{{ picked }} />

<input type="radio"  id="one" value="One" v-model="picked" />
<label for="one">One</label>

<input type="radio"  id="two" value="Two" v-model="picked" />
<label for="two">Two</label>
```

### 选择器（下拉框）

#### 单选
```html
<div> Selected:{{ selected }} />
<select v-model="selected">
    <option disabled value="">请选择</option>
    <option value="A">A</option>
    <option value="B">B</option>
    <option value="C">C</option>
</select>
```

#### 多选

```html
<div> Selected:{{ selected }} />
<select v-model="selected" multiple>
    <option value="A">A</option>
    <option value="B">B</option>
    <option value="C">C</option>
</select>
```

#### `v-for`渲染选项

```html
<select v-model="selected">
    <option v-for="option in options" :value="option.value">
    {{ option.text }}
    </option>
</select>

<div> Selected:{{ selected }} />
```

```js

data() {
    return {
        selected: 'A',
        options: [
            { text: 'One', value: 'A' },
            { text: 'Two', value: 'B' },
            { text: 'Three', value: 'C' },
        ]
    }
}
```

## 值绑定
对于单选按钮，复选框和选择器选项，`v-model`绑定的值通常是静态的字符串 (或者对复选框是布尔值)。
可以通过使用`v-bind`将该值绑定到当前组件实例上的动态数据。此外，使用`v-bind`还可以将选项值绑定为非字符串的数据类型。

### 复选框

```html
<input 
    type="checkbox" 
    v-model="checked" 
    :true-value="dynamicTrueValue" 
    :false-value="dynamicFalseValue" />
```

`true-value`和`false-value`是Vue特有的属性，仅支持和`v-model`配套使用。

### 单选按钮

```html
<input type="radio" v-model="selected" :value="dynamicValue" />
```

### 选择器选项
```html
<select v-model="selected">
  <!-- 内联对象字面量 -->
  <option :value="{ number: 123 }">123</option>
</select>
```

## 修饰符
### `.lazy​`
可以添加lazy修饰符来改为在每次change事件后更新数据：

```html
<!-- 在 "change" 事件后同步更新而不是 "input" -->
<input v-model.lazy="msg" />
```

### `.number​`
如果你想让用户输入自动转换为数字，可以在`v-model`后添加`.number`修饰符来管理输入：

```html
<input v-model.number="age" />
```

`number`修饰符会在输入框有`type="number"`时自动启用。

### `.trim​`
如果想要默认自动去除用户输入内容中两端的空格，可以在`v-model`后添加`.trim`修饰符：

```html
<input v-model.trim="msg" />
```

## 组件上的 v-model​









