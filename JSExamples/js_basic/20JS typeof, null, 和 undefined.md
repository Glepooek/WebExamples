可以使用```typeof```操作符来检测变量的数据类型。

```JS
实例
typeof "John"                // 返回 string
typeof 3.14                  // 返回 number
typeof false                 // 返回 boolean
typeof [1,2,3,4]             // 返回 object
typeof {name:'John', age:34} // 返回 object
```
 
### null
在JavaScript中null表示"什么都没有"。
null是一个只有一个值的特殊类型。表示一个空对象引用。

```js
typeof null // 返回 object。
```

可以设置为```null```来清空对象:

```js
// 实例
var person = null;           // 值为 null(空), 但类型为对象
```

可以设置为```undefined```来清空对象:

```js
var person = undefined;     // 值为 undefined, 类型为 undefined
```

### undefined
在JavaScript中, undefined是所有未赋值变量的默认值。
任何变量都可以通过设置值为undefined来清空。 类型为undefined。
typeof 一个没有值的变量会返回 undefined。

```js
// 实例
var person;                  // 值为 undefined(空), 类型是undefined
typeof person;               // 返回 undefined

// 实例
var person ={};
person = undefined;          // 值为 undefined, 类型是undefined
```

### undefined和null的区别
null和undefined的值相等，但类型不等：

```js
typeof undefined             // undefined
typeof null                  // object
null === undefined           // false
null == undefined            // true
```

JavaScript中有以下七种数据类型：

- string：表示文本内容，例如 "Hello"。
- number：表示数值，例如123。
- boolean：表示真或假的值，例如true或false。
- undefined：表示未定义或者未赋值的变量或者属性，例如var x;。
- symbol：表示唯一的标识符，例如Symbol("foo")。
- object：表示复杂的数据结构，例如{ x: 1, y: 2 }。// null和array也是object类型
- function：表示可执行的代码块，例如function() { ... }。

typeof 运算符会根据操作数的数据类型返回相应的字符串。例如：

```js
typeof "Hello" // 返回"string"
typeof 123 // 返回"number"
typeof true // 返回"boolean"
typeof x // 返回"undefined"
typeof { x: 1, y: 2 } // 返回"object"
typeof function() { ... } // 返回"function"
typeof Symbol("foo") // 返回"symbol"
```
有一些特殊情况需要注意：
- typeof null 会返回 "object"，这是一个历史遗留的问题，实际上 null 是一个空或者不存在的值，不是一个对象。
- typeof NaN 会返回 "number"，这是因为 NaN 是一个特殊的数值类型，表示 Not a Number（不是一个数字）。
- typeof [] 会返回 "object"，这是因为数组是一种特殊的对象类型，它有一个 length 属性和一些方法来操作元素。