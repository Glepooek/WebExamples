## `v-for`与数组
可以用`v-for`指令基于一个数组来渲染一个列表。`v-for`指令的值需要使用`item in items`形式的语法，其中`items`是源数据数组，`item`是迭代项的别名。

```js
data() {
    return {
        parentMessage: 'parent',
        items:[{ message: "Foo" }, { message: "Bar" }]
    }
}
```

```html
<div id="app">
    <ul>
        <li v-for="item in items">
            {{item.message}}
        </li>
    </ul>
</div>
```

* `v-for`块中可以访问父作用域的属性和变量。如上面的html代码，`v-for`的父作用域是app这个Vue应用的data作用域。
* `v-for`支持使用第二参数表示当前项的位置索引。

```html
<div id="app">
    <ul>
        <li v-for="(item, index) in items">
            {{parentMessage}} - {{index}} - {{item.message}}
        </li>
    </ul>
</div>
```

* 也可以在定义`v-for`变量别名时使用解构，和解构函数参数类似。

```html
<div id="app">
    <ul>
        <li v-for="{ message } in items">
            {{ message }}
        </li>
    </ul>

    <ul>
        <li v-for="({ message }, index) in items">
            {{ parentMessage }} - {{ index }} - {{ message }}
        </li>
    </ul>
</div>
```

* 多层嵌套的`v-for`，每层`v-for`作用域都可以访问到父级作用域。
* `item in items`形式的语法，也可以使用`item of items`形式的语法

## `v-for`与对象

* 使用`v-for`遍历一个对象的所有属性。遍历顺序会基于该对象调用Object.values()的返回值决定。
* 可以提供第二参数表示属性名。
* 可以提供第三参数表示位置索引。

```js
data(){
    return {
        bookInfo: {
            bookName: '曾国藩家书',
            author: '唐浩明',
            publishedAt: '2016-10-24'
        }
    }
}
```

```html
<ul>
    <li v-for="（value,key,index) in bookInfo">
        {{index}}. {{key}}: {{value}}
    </li>
</ul>
```

## 在`v-for`里使用范围值
```html
<!--n从1开始-->
<span v-for="n in 10">{{n}}</span>
```

## `<template>`上的`v-for`

```html
<ul>
    <template v-for="(item, index) in items">
        <li style="color: red;">{{parentMessage}}-{{index}}-{{item.text}}</li>
    </template>
</ul>
```

## `v-for和v-if`
* vue2: v-for和v-if在同一元素上使用时，v-for的优先级高于v-if
* vue3: v-for和v-if在同一元素上使用时，v-if的优先级高于v-for，也就是v-if无法访问到v-for作用域内的变量，可以采用如下方式处理：

```html
<template v-for="todo in todos">
  <li v-if="!todo.isComplete">
    {{ todo.name }}
  </li>
</template>
```

* 不建议v-for和v-if同时使用。

## 通过key管理状态

* 推荐在任何可行的时候为`v-for`提供一个`key`属性，除非所迭代的 DOM 内容非常简单 (例如：不包含组件或有状态的 DOM 元素)，或者你想有意采用默认行为来提高性能。
* `key`绑定的值期望是一个基础类型的值，例如字符串或number类型。不要用对象作为`v-for`的key。

## 组件上的`v-for`


## 数组变换侦测
### 变更方法
Vue能够侦听响应式数组的变更方法，并在它们被调用时触发相关的更新。
变更方法——都会直接修改原数组，包括：
* push() 在数组末尾添加一个或多个元素，并返回新长度
* pop() 删除数组最后一个元素，并返回该元素
* shift() 删除数组的第一个元素，并返回该元素
* unshift() 在数组开头添加一个或多个元素，返回新长度
* splice() 可以删除、替换或添加任意位置的元素
* sort() 对数组元素进行排序
* reverse() 反转数组中元素的顺序

### 替换一个数组
不改变原数组，返回一个新数组，如：
* filter()
* concat() 
* slice()

需要将原数组替换为新数组，以响应更新。

## 展示排序或过滤后的结果
希望显示已排序或过滤后的数组，而不改变原数组的内容，可以返回已过滤或已排序数组的计算属性。

```js
var vm4 = createApp({
data() {
        return {
            numbers: [1, 2, 3, 4, 5, 6]
        }
    },
    computed: {
        evenNumbers() {
            return this.numbers.filter(number => number % 2 === 0)
        },
        even(numbers) {
            return numbers.filter(number => number % 2 === 0)
        }
    }
}).mount('#app4')
```

`reverse()和sort()`将变更原始数组，计算函数中不应该这么做。
调用这些方法之前创建一个原数组的副本：
```js
let arr = [1, 2, 3];
let copy = [...arr]; // copy: [1, 2, 3]

let arr = [1, 2, 3];
let copy = arr.slice(); // copy: [1, 2, 3]

let arr = [1, 2, 3];
let copy = [].concat(arr); // copy: [1, 2, 3]
```