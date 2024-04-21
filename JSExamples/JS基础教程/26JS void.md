### javascript:void(0)含义
javascript:void(0)中最关键的是```void```关键字， void是JavaScript中非常重要的关键字，```该操作符指定要计算一个表达式，无论该表达式的原始值是什么，总是返回undefined```。

语法格式如下：

```js
void func()
javascript:void func()
// 或者

void(func())
javascript:void(func())
```

```js
// 实例，创建了一个超级链接，当用户点击以后不会发生任何事。
<a href="javascript:void(0)">单击此处什么也不会发生</a>

// 实例，在用户点击链接后显示警告信息。
<p>点击以下链接查看结果：</p>
<a href="javascript:void(alert('Warning!!!'))">点我!</a>

```

### href="#"与href="javascript:void(0)"的区别
- ```#```包含了一个位置信息，用来定位页面的具体位置，格式为：# + id。
- javascript:void(0), 仅仅表示一个死链接，用于阻止链接跳转。

```js
// 阻止链接跳转，URL不会有任何变化
<a href="javascript:void(0)" rel="nofollow ugc">点击此处</a>

// 虽然阻止了链接跳转，但URL尾部会多个#，改变了当前URL。（#主要用于配合location.hash）
<a href="#" rel="nofollow ugc">点击此处</a>

// 同理，#可以的话，?也能达到阻止页面跳转的效果，但也相同的改变了URL。（?主要用于配合 location.search）
<a href="?" rel="nofollow ugc">点击此处</a>

// Chrome中即使javascript:0; 也没变化，firefox中会变成一个字符串0
<a href="javascript:0" rel="nofollow ugc">点击此处</a>
```