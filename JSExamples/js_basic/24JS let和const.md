ES6新增加了两个重要的JavaScript关键字: let和const。

- let声明的变量只在let命令所在的代码块内有效。
- const声明一个只读的常量，一旦声明，常量的值就不能改变。

在ES6之前，JavaScript只有两种作用域：全局变量与函数内的局部变量。

### 全局变量作用域
在函数外使用```var关键字```声明的变量作用域是全局的：

```js
// 实例
var carName = "Volvo";
 
// 这里可以使用 carName 变量
 
function myFunction() {
    // 这里也可以使用 carName 变量
}
```

在函数体外或代码块外使用var和let关键字声明的变量有点类似。它们的作用域都是全局的:

```js
// 使用 var
var x = 2;       // 全局作用域

// 使用 let
let x = 2;       // 全局作用域
```

### 局部变量作用域
在函数内使用```var```关键字声明的变量作用域是局部的（函数内）。
函数内使用var声明的变量只能在函数内访问，如果不使用var则是全局变量。

```js
// 实例
// 这里不能使用 carName 变量
 
function myFunction() {
    var carName = "Volvo";
    // 这里可以使用 carName 变量
}
 
// 这里不能使用 carName 变量
```

在函数体内使用var和let关键字声明的变量有点类似。它们的作用域都是局部的:

```js
// 使用 var
function myFunction() {
    var carName = "Volvo";   // 局部作用域
}

// 使用 let
function myFunction() {
    let carName = "Volvo";   //  局部作用域
}
```

### 块级作用域(Block Scope)
使用var关键字声明的变量不具备块级作用域的特性，它在```{}```外依然能被访问到。

```js
{ 
    var x = 2; 
}
// 这里可以使用 x 变量
```

在ES6之前，是没有块级作用域的概念的。ES6可以使用```let关键字```来实现块级作用域。
let声明的变量只在let命令所在的代码块{}内有效，在{}之外不能访问。

```js
{ 
    let x = 2;
}
// 这里不能使用 x 变量
```

### 循环作用域
使用var关键字：

```js
// 实例
var i = 5;
for (var i = 0; i < 10; i++) {
    // 一些代码...
}
// 这里输出 i 为 10
```

使用let关键字：

```js
// 实例
var i = 5;
for (let i = 0; i < 10; i++) {
    // 一些代码...
}
// 这里输出 i 为 5
```

### HTML代码中使用全局变量
在JavaScript中, 全局作用域是针对JavaScript环境。
在HTML中, 全局作用域是针对window对象。
使用var关键字声明的全局作用域变量属于window对象。
使用 let 关键字声明的全局作用域变量不属于 window 对象。

```js
// 实例
var carName = "Volvo";
// 可以使用 window.carName 访问变量

// 实例
let carName = "Volvo";
// 不能使用 window.carName 访问变量
```

### 重置（重新定义）变量
在任何地方，可以使用var关键字重置var关键字声明的变量：

```js
// 实例
var x = 2;
 
// x 为 2
 
var x = 3;
 
// 现在 x 为 3
```

在相同的作用域或块级作用域中，不能使用let关键字来重置var关键字声明的变量:

```js
var x = 2;       // 合法
let x = 3;       // 不合法

{
    var x = 4;   // 合法
    let x = 5   // 不合法
}
```

在相同的作用域或块级作用域中，不能使用let关键字来重置let关键字声明的变量:

```js
let x = 2;       // 合法
let x = 3;       // 不合法

{
    let x = 4;   // 合法
    let x = 5;   // 不合法
}
```

在相同的作用域或块级作用域中，不能使用var关键字来重置let关键字声明的变量:

```js
let x = 2;       // 合法
var x = 3;       // 不合法

{
    let x = 4;   // 合法
    var x = 5;   // 不合法
}
```

let关键字在不同作用域，或不同块级作用域中是可以重新声明赋值的:

```js
let x = 2;       // 合法

{
    let x = 3;   // 合法
}

{
    let x = 4;   // 合法
}
```

### 变量提升
JavaScript中，var关键字定义的变量可以先使用再声明（JavaScript 变量提升）。

```js
// 实例
// 在这里可以使用 carName 变量
 
var carName;
```

let关键字定义的变量则不可以先使用再声明。

```js
// 在这里不可以使用 carName 变量

let carName;
```

### const关键字
const用于声明一个或多个常量，声明时必须进行初始化，且初始化后值不可再修改：

```js
// 实例
const PI = 3.141592653589793;
PI = 3.14;      // 报错
PI = PI + 10;   // 报错
```

const定义常量与使用let 定义的变量相似：
- 二者都是块级作用域
- 都不能和它所在作用域内的其他变量或函数拥有相同的名称

两者还有以下两点区别：
- const声明的常量必须初始化，而let声明的变量不用
- const定义常量的值不能通过再赋值修改，也不能再次声明。而let定义的变量值可以修改。


#### 并非真正的常量
const的本质: const定义的变量并非常量，并非不可变，它定义了一个常量引用一个值。使用const定义的对象或者数组，其引用不可变，但内部的属性值是可变的。

```js
// 实例
// 创建常量对象
const car = {type:"Fiat", model:"500", color:"white"};
 
// 修改属性:
car.color = "red";
 
// 添加属性
car.owner = "Johnson";

car = {type:"Volvo", model:"EX60", color:"red"};    // 错误
```

```js
// 实例
// 创建常量数组
const cars = ["Saab", "Volvo", "BMW"];
 
// 修改元素
cars[0] = "Toyota";
 
// 添加元素
cars.push("Audi");

cars = ["Toyota", "Volvo", "Audi"];    // 错误
```

那么什么情况能彻底“锁死”变量呢？可以使用Object.freeze()方法来冻结变量，如：

```js
const obj = {
  name:"1024kb"
}
Object.freeze(obj)
// 此时对象obj被冻结，返回被冻结的对象
```

需要注意的是，被冻结后的对象不仅仅是不能修改值，同时也
- 不能向这个对象添加新的属性
- 不能修改其已有属性的值
- 不能删除已有属性
- 不能修改该对象已有属性的可枚举性、可配置性、可写性

#### 重置变量
在任何地方，可以使用var关键字重置var关键字声明的变量：

```js
// 实例
var x = 2;    //  合法
var x = 3;    //  合法
x = 4;        //  合法
```

在相同的作用域或块级作用域中，不能使用const关键字来重置var和let关键字声明的变量:

```js
var x = 2;         // 合法
const x = 2;       // 不合法

{
    let x = 2;     // 合法
    const x = 2;   // 不合法
}
```

在相同的作用域或块级作用域中，不能使用const关键字来重置const关键字声明的变量:

```js
const x = 2;       // 合法
const x = 3;       // 不合法
x = 3;             // 不合法
var x = 3;         // 不合法
let x = 3;         // 不合法

{
    const x = 2;   // 合法
    const x = 3;   // 不合法
    x = 3;         // 不合法
    var x = 3;     // 不合法
    let x = 3;     // 不合法
}
```

const关键字在不同作用域，或不同块级作用域中是可以重新声明赋值的:

```js
const x = 2;       // 合法

{
    const x = 3;   // 合法
}

{
    const x = 4;   // 合法
}
```

#### 变量提升
JavaScript var关键字定义的变量可以先使用后声明（JavaScript 变量提升）。

```js
// 实例
carName = "Volvo";    // 这里可以使用 carName 变量
var carName;
```

const关键字定义的变量不可以先使用后声明。

```js
carName = "Volvo";    // 在这里不可以使用 carName 变量
const carName = "Volvo";
```