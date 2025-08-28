JSON是用于存储和传输数据的格式。
JSON通常用于服务端向客户端传递数据 。

### 什么是JSON?
- JSON英文全称JavaScript Object Notation。
- JSON是一种轻量级的数据交换格式。
- JSON是独立的语言。
- JSON使用JavaScript语法，但是JSON格式仅仅是一个文本。文本可以被任何编程语言读取及作为数据格式传递。

### JSON格式化后为JavaScript对象
JSON格式在语法上与创建JavaScript对象代码是相同的。
由于它们很相似，所以JavaScript程序可以很容易的将JSON数据转换为JavaScript对象。

### JSON语法规则
- 数据为键/值对。
- 数据由逗号分隔。
- 大括号保存对象
- 方括号保存数组

### JSON数据 - 一个名称对应一个值
JSON数据格式为键/值对，就像JavaScript对象属性。
```键/值```对包括字段名称（在双引号中），后面一个冒号，然后是值：

```json
"name":"Runoob"
```

### JSON对象
JSON对象保存在大括号内。
就像在JavaScript中, 对象可以保存多个```键/值```对：

```json
{"name":"Runoob", "url":"www.runoob.com"}
```

### JSON数组
JSON数组保存在中括号内。就像在JavaScript中, 数组可以包含对象：

```json
"sites":[
    {"name":"Runoob", "url":"www.runoob.com"}, 
    {"name":"Google", "url":"www.google.com"},
    {"name":"Taobao", "url":"www.taobao.com"}
]
```

### JSON字符串转换为JavaScript对象
通常我们从服务器中读取JSON数据，并在网页中显示数据。

```js
var text = '{ "sites" : [' +
'{ "name":"Runoob" , "url":"www.runoob.com" },' +
'{ "name":"Google" , "url":"www.google.com" },' +
'{ "name":"Taobao" , "url":"www.taobao.com" } ]}';

// 将字符串转换为 JavaScript 对象:
var obj = JSON.parse(text);

// 使用新的JavaScript对象：
document.getElementById("demo").innerHTML = obj.sites[1].name + " " + obj.sites[1].url;
```

### 相关函数
|函数	|描述|
|:---|:---|
|JSON.parse()|用于将一个`JSON字符串`转换为JavaScript对象。|
|JSON.stringify()|用于将`JavaScript值`转换为JSON字符串。|

### 注意事项
不包含的属性：
* 函数
* undefined值
* Symbol类型
* 循环引用的对象会抛出错误


特殊处理：
* 日期对象会被转换为 ISO 格式的字符串
* NaN 和 Infinity 会被转换为 null