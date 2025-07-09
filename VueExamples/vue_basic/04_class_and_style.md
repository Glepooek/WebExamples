数据绑定的一个常见需求场景是：操纵元素的CSS class列表和内联样式。
因为`class`和`style`都是属性，可以和其他属性一样使用`v-bind`将它们和动态的字符串绑定。
Vue专门为`class`和`style`的`v-bind`用法提供了特殊的功能增强。除了字符串外，表达式的值也可以是对象或数组。

## 绑定HTML class
### 绑定对象
* 可以给`:class`传递一个对象来动态切换`class`。class是否生效取决于数据属性的真假值
* 可以在对象中定义多个字段来操作多个class
* `:class`指令可以和一般的class属性共存

#### 内联字面量
```html
<p class="static" v-bind:class="{active:isActive, 'text-danger':hasError}">
    <span>内联字面量</span> Note that this is an important paragraph.
</p>
```

```js
data(){
    return {
        isActive: true,
        hasError: false
    }
}
```

#### 对象
```html
<p class="static" v-bind:class="classObj">
    <span>绑定对象</span> Note that this is an important paragraph.
</p>
```

```js
data(){
    return {
        classObj: {
            active: true,
            'text-danger': false
        }
    }
}
```

#### 计算属性
```html
<p class="static" v-bind:class="classObject">
    <span>绑定对象</span> Note that this is an important paragraph.
</p>
```

```js
data() {
  return {
    isActive: true,
    error: null
  }
},
computed: {
  classObject() {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}
```
### 绑定数组
```js
data() {
  return {
    activeClass: 'active',
    errorClass: 'text-danger'
  }
}
```

```html
<div :class="[activeClass, errorClass]"></div>
<div :class="[isActive ? activeClass : '', errorClass]"></div>
```

## 绑定内联样式
### 绑定对象
`:style`支持绑定JS对象值，对应的是HTML元素的`style`属性。

* 内联字面量
* 对象
* 计算属性


### 绑定数组
:style绑定一个包含多个样式对象的数组。这些对象会被合并后渲染到同一元素上：

```html
<div :style="[baseStyles, overridingStyles]"></div>
```

### 自动前缀
在`:style`中使用了需要浏览器特殊前缀的CSS属性时，Vue会自动为他们加上相应的前缀。

### 样式多值
```html
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

数组仅会渲染浏览器支持的最后一个值。在这个示例中，在支持不需要特别前缀的浏览器中都会渲染为`display: flex`。