`get`语法将`对象属性`绑定到查询该属性时将`被调用的函数`。

## 语法

```js
{ get prop() { ... } }
{ get [expression]() { ... } }
```

```js
const obj = {
    log: ['a', 'b', 'c'],
    get latest() {
        if (this.log.length === 0) {
        return undefined
        }
        return this.log[this.log.length - 1]
    },
}
```

### 参数

* `prop`，要绑定到给定函数的属性名。
* `expression`，使用一个计算属性名的表达式绑定到给定函数。

### 注意事项
使用get语法时应注意以下问题：

* 属性名可以使用数值或字符串作为标识；
* 必须不带参数；
* 在一个对象字面量中，属性名不能与其他属性名重复。

## 使用`delete`操作符删除getter

```js
delete obj.getter;
```

## 使用`Object.defineProperty()`在现有对象上定义getter

```js
Object.defineProperty(obj, 'oldest', {
    get() {
        if (this.log.length === 0) {
        return undefined
        }
        return this.log[0]
    },
})
```

## 使用计算出的属性名

```js
var expr = "foo";

var obj = {
  get [expr]() {
    return "bar";
  },
};

console.log(obj.foo); // "bar"
```

## `get` vs `defineProperty()`
当使用`get`关键字时，它和`Object.defineProperty()`有类似的效果，但在class中使用时，二者有细微的差别：

* 当使用`get`关键字时，属性将被定义在实例的原型上，
* 当使用`Object.defineProperty()`时，属性将被定义在实例自身上。

```js
class Example {
    get hello() {
        return 'how are you?'
    }
}

const example = new Example()

console.log(Object.getOwnPropertyDescriptor(example, 'hello')) // undefined
console.log(Object.getOwnPropertyDescriptor(Object.getPrototypeOf(example), 'hello'))

Object.defineProperty(example, 'greeting', {
    get() {
        return 'hi'
    },
})

console.log(Object.getOwnPropertyDescriptor(example, 'greeting'))
console.log(Object.getOwnPropertyDescriptor(Object.getPrototypeOf(example), 'greeting')) // undefined
```
