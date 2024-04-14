循环可以将代码块执行指定的次数。

```js
// 一般写法：
document.write(cars[0] + "<br>"); 
document.write(cars[1] + "<br>"); 
document.write(cars[2] + "<br>"); 
document.write(cars[3] + "<br>"); 
document.write(cars[4] + "<br>"); 
document.write(cars[5] + "<br>");

// 使用for循环
for (var i=0;i<cars.length;i++)
{ 
    document.write(cars[i] + "<br>");
}
```

### 不同类型的循环
JavaScript支持不同类型的循环：

- for - 循环代码块一定的次数
- for/in - 循环遍历对象的属性
- while - 当指定的条件为true时循环指定的代码块
- do/while - 先循环一次代码块，然后当指定的条件为true时继续循环指定的代码块

### for循环
下面是for循环的语法：

for (语句 1; 语句 2; 语句 3)
{
    被执行的代码块
}

语句1（代码块）开始前执行；
语句2定义运行循环（代码块）的条件；
语句3在循环（代码块）已被执行之后执行。
语句1、2、3都可以省略。

```js
for (var i=0; i<5; i++)
{
      x=x + "该数字为 " + i + "<br>";
}
```

### For/In 循环
JavaScript for/in语句循环遍历对象的属性：

```js
var person={fname:"Bill",lname:"Gates",age:56}; 
 
for (x in person)  // x 为属性名
{
    txt=txt + person[x];
}
```