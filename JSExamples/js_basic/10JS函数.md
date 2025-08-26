函数是由事件驱动的或者当它被调用时执行的可重复使用的代码块。

```js
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>测试实例</title>
    <script>
        function myFunction()
        {
            alert("Hello World!");
        }
    </script>
</head>
 
<body>
    <button onclick="myFunction()">点我</button>
</body>
</html>
```

### JavaScript函数语法
函数就是包裹在花括号中的代码块，前面使用了关键词function：

```js
function functionname()
{
    // 执行代码
}
```

可以在某事件发生时直接调用函数（比如当用户点击按钮时），并且可由JavaScript在任何位置进行调用。
```JavaScript对大小写敏感。关键词function必须是小写的，并且必须以与函数名称相同的大小写来调用函数。```

### 调用带参数的函数
在调用函数时，可以向其传递值，这些值被称为参数。
这些参数可以在函数中使用。
可以发送任意多的参数，由逗号(,)分隔：

```js
myFunction(argument1, argument2)
```

当您声明函数时，请把参数作为变量来声明：
变量和参数必须以一致的顺序出现。第一个变量就是第一个被传递的参数的给定的值，以此类推。

```js
<p>点击这个按钮，来调用带参数的函数。</p>
<button onclick="myFunction('Harry Potter','Wizard')">点击这里</button>
<script>
    function myFunction(name, job){
        alert("Welcome " + name + ", the " + job);
    }
</script>
```

### 带有返回值的函数
有时，希望函数将值返回调用它的地方。
可以通过使用```return```语句就可以实现。
在使用```return```语句时，函数会停止执行，并返回指定的值。

```js
function myFunction()
{
    var x=5;
    return x;
}

// myVar 变量的值是 5，也就是函数 "myFunction()" 所返回的值。
var myVar = myFunction();

function myFunction(a, b)
{
    return a*b;
}
```

在您仅仅希望退出函数时 ，也可使用return语句。返回值是可选的：

```js
function myFunction(a, b)
{
    if (a>b)
    {
        return;
    }
    x=a+b
}
```

### 局部JavaScript变量
- 在JavaScript函数内部声明的变量（使用 var）是局部变量，所以只能在函数内部访问它。（该变量的作用域是局部的）。
- 可以在不同的函数中使用名称相同的局部变量，因为只有声明过该变量的函数才能识别出该变量。
- 只要函数运行完毕，本地变量就会被删除。

### 全局JavaScript变量
在函数外声明的变量是全局变量，网页上的所有脚本和函数都能访问它。

### JavaScript变量的生存期
JavaScript变量的生命期从它们被声明的时间开始。
- 局部变量会在函数运行以后被删除。
- 全局变量会在页面关闭后被删除。

### 向未声明的JavaScript变量分配值
如果您把值赋给尚未声明的变量，该变量将被自动作为```window```的一个属性。

```js
// 将声明 window 的一个属性 carname。
carname="Volvo";
```

非严格模式下给未声明变量赋值创建的全局变量，是全局对象的可配置属性，可以删除。

```js
var var1 = 1; // 不可配置全局属性
var2 = 2; // 没有使用 var 声明，可配置全局属性

console.log(this.var1); // 1
console.log(window.var1); // 1
console.log(window.var2); // 2

delete var1; // false 无法删除
console.log(var1); //1

delete var2; 
console.log(delete var2); // true
console.log(var2); // 已经删除 报错变量未定义
```

向未声明的JavaScript变量分配值会导致以下特性：
- 隐式全局变量创建：
在非严格模式下，如果给一个未事先声明的变量赋值，JavaScript会自动在全局作用域中创建一个新的全局变量。这意味着该变量成为全局对象（在浏览器环境中通常是 window 对象）的一个属性，可以在整个脚本的任何地方被访问。

- 可配置性：
与使用 var 关键字声明的全局变量不同，这种隐式创建的全局变量通常具有可配置性。这意味着它们可以被删除（使用```delete```操作符），其属性描述符（如可写性、枚举性等）可以通过Object.defineProperty() 或 Object.prototype.propertyIsEnumerable()等方法修改。

- 严格模式限制：
在严格模式（通过在脚本或函数顶部放置"use strict"; 来启用）下，向未声明的变量赋值会导致抛出 ReferenceError。严格模式禁止这种隐式全局变量的创建，强制开发者显式声明变量以防止意外的全局污染和潜在的编程错误。

- 作用域链查找：
尽管是隐式创建的全局变量，但在函数内部向未声明的变量赋值时，该变量不会被视为局部变量。当在函数内部访问该变量时，由于它不在当前函数的作用域内，JavaScript会沿着作用域链向上查找，最终在全局作用域找到并使用该变量。

- 代码可维护性与调试挑战：
隐式创建的全局变量可能会导致代码难以理解和维护，因为它们没有明确的声明位置，使得追踪变量来源和管理作用域变得困难。这可能导致命名冲突、难以定位的bug以及代码的混乱。

综上所述，向未声明的JavaScript变量分配值会产生一个全局可访问且可能可配置的变量（非严格模式下），但在严格模式下则会引发错误。这种做法通常被认为是不良编程实践，因为它容易引发意外的副作用和降低代码质量。因此，推荐始终显式声明变量以确保代码的清晰性、可维护性和符合预期的行为。