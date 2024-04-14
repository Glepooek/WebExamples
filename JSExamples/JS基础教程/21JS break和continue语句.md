break语句用于跳出循环。continue用于跳过循环中的一个迭代。

### break语句
break语句可用于跳出循环。break语句跳出循环后，会继续执行该循环之后的代码（如果有的话）。

```js
// 实例
for (i=0;i<10;i++)
{
    if (i==3)
    {
        break;
    }
    x=x + "The number is " + i + "<br>";
}
```

### continue语句
continue语句中断当前的循环中的迭代，然后继续循环下一个迭代。

```js
for (i=0;i<=10;i++)
{
    if (i==3) continue;
    x=x + "The number is " + i + "<br>";
}
```

### JavaScript标签
如需标记JavaScript语句，请在语句之前加上冒号：

```js
// 语法:
label:
{
    statements
}

break labelname; 
continue labelname;
```

continue 语句（带有或不带标签引用）只能用在循环中。
break 语句（不带标签引用），只能用在循环或switch中。
```通过标签引用，break语句可用于跳出任何JavaScript代码块。```

```js
// 实例
cars=["BMW","Volvo","Saab","Ford"];
list: 
{
    document.write(cars[0] + "<br>"); 
    document.write(cars[1] + "<br>"); 
    document.write(cars[2] + "<br>"); 
    break list;
    document.write(cars[3] + "<br>"); 
    document.write(cars[4] + "<br>"); 
    document.write(cars[5] + "<br>"); 
}
```