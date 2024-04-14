### while循环
while只要指定条件为true，循环就可以一直执行代码块。

```js
// 语法
while (条件)
{
    // 需要执行的代码
}
```

```js
// 实例
while (i<5)
{
    x=x + "The number is " + i + "<br>";
    i++;
}

// 如果您忘记增加条件中所用变量的值，该循环永远不会结束。这可能导致浏览器崩溃。
```

### do/while循环
do/while循环是while循环的变体。该循环会在检查条件是否为真之前执行一次代码块，然后如果条件为真的话，就会重复这个循环。

```js
// 语法
do
{
    需要执行的代码
}
while (条件);
```

```js
// 实例
do
{
    x=x + "The number is " + i + "<br>";
    i++;
}
while (i<5);
```

### 比较for和while
本例中的循环使用for循环来显示cars数组中的所有值：

```js
// 实例
cars=["BMW","Volvo","Saab","Ford"];
var i=0;
for (;cars[i];)
{
    document.write(cars[i] + "<br>");
    i++;
}
```

本例中的循环使用while循环来显示cars数组中的所有值：

```js
// 实例
cars=["BMW","Volvo","Saab","Ford"];
var i=0;
while (cars[i])
{
    document.write(cars[i] + "<br>");
    i++;
}
```