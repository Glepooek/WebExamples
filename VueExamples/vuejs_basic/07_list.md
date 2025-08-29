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

* `v-for`块中可以完整的访问父作用域内的属性和变量。
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

* 使用`v-for`遍历一个对象的所有属性值。遍历顺序会基于该对象调用`Object.values()`的返回值决定。
* 可以提供第二参数表示`属性名`。
* 可以提供第三参数表示`位置索引`。

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
    <li v-for="(value,key,index) in bookInfo">
        {{index}}. {{key}}: {{value}}
    </li>
</ul>
```

## 在`v-for`里使用范围值
`v-for`可以直接接受一个整数值。在这种用例中，会将该模板基于`1...n`的取值范围重复渲染多次。

```html
<!--n从1开始-->
<span v-for="n in 10">{{n}}</span>
```

## `<template>`上的`v-for`
也可以在`<template>`标签上使用`v-for`来渲染一个包含多个元素的块。

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
Vue默认按照`就地更新`的策略来更新通过`v-for`渲染的元素列表。默认模式是高效的，但只适用于列表渲染输出的结果不依赖子组件状态或者临时DOM状态 (例如表单输入值) 的情况。

为了给Vue一个提示，以便它可以跟踪每个节点的标识，从而重用和重新排序现有的元素，你需要为每个元素对应的块提供一个唯一的`key`属性：

```vue
<div v-for="item in items" :key="item.id">
  <!-- 内容 -->
</div>
```

当你使用`<template v-for>`时，key应该被放置在这个`<template>`容器上：

```vue
<template v-for="todo in todos" :key="todo.name">
  <li>{{ todo.name }}</li>
</template>
```

* 推荐在任何可行的时候为`v-for`提供一个`key`属性，除非所迭代的DOM内容非常简单 (例如：不包含组件或有状态的DOM元素)，或者你想有意采用默认行为来提高性能。
* `key`绑定的值期望是一个基础类型的值，例如字符串或number类型。不要用对象作为`v-for`的key。

## 组件上的`v-for`
可以直接在组件上使用`v-for`：

```js
<MyComponent v-for="item in items" :key="item.id" />
```

但是，这不会自动将任何数据传递给组件，因为组件有自己独立的作用域。为了将迭代后的数据传递到组件中，我们还需要传递props：

```js
<MyComponent
  v-for="(item, index) in items"
  :item="item"
  :index="index"
  :key="item.id"
/>
```

## 数组变换侦测
### 变更方法
Vue能够侦听响应式数组的变更方法，并在它们被调用时触发相关的更新。
变更方法——都会直接修改原数组，包括：
* push() 在数组末尾添加一个或多个元素，并返回新长度
* pop() 删除数组最后一个元素，并返回该元素
* unshift() 在数组开头添加一个或多个元素，返回新长度
* shift() 删除数组的第一个元素，并返回该元素
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
// 通过扩展运算符创建一个数组副本
let copy = [...arr]; // copy: [1, 2, 3]

let arr = [1, 2, 3];
let copy = arr.slice(); // copy: [1, 2, 3]

let arr = [1, 2, 3];
let copy = [].concat(arr); // copy: [1, 2, 3]
```