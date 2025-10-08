在定义函数声明形式参数时，给参数赋值默认值。在参数没有值传递或传递undefined时，将使用默认值。

```js
function foo(a, b = 10) {
    return a + b;
}
```

## 关键细节
### 默认值参数要出现在参数列表的末尾
默认值参数必须出现在参数列表的末尾。如果没有出现在参数列表的末尾，若要默认值生效，在使用时要传入undefined。

### 影响arguments
函数中的arguments对象会包含所有参数，包括没有默认值的参数。
arguments中的值与形参是一一对应的，如果改变形参的值，arguments中的值也会改变。但在`严格模式`下，改变形参的值不会改变arguments中的值，这样才是合理的。当使用参数默认值后，`arguments`表现出来的行为跟在严格模式下一样，即arguments对象中的值将不再对应形参。

```js
function bar(a, b) {
    'use strict'
    console.log(a === arguments[0])
    console.log(b === arguments[1])
    a = 'changed'
    b = 'changed'
    console.log(a === arguments[0])
    console.log(b === arguments[1])
}

bar('a', 'b')
// true
// true
// false
// false

function bar(a, b = 2) {
    console.log(a === arguments[0])
    console.log(b === arguments[1])
    a = 'changed'
    b = 'changed'
    console.log(a === arguments[0])
    console.log(b === arguments[1])
}

bar('a', 'b')
// true
// true
// false
// false
```

### 影响函数的length属性
函数的length属性表示函数声明的形参的数量，但不包括默认值参数及其之后的参数。

```js
function foo(a, b = 2, c) {}

console.log(foo.length)// 1
```

### 默认值表达式
默认值参数的默认值可以是任何表达式。默认值表达式只有在函数调用时才会被计算。

```js
let n = 1
function getvalue() {
    return n++
}

function baz(a, b = getvalue()) {
    console.log(a, b)
}

baz(1, 2) // 1 2
baz(1) // 1 1
baz(1) // 1 2
```

### 参数默认值的暂时性死区

```js
function getValue(v) {
    return v * 2
}

function foo(a = getValue(b), b) {
    console.log(a, b)
}

foo(undefined, 2) // error, b处于暂时性死区
```