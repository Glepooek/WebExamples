面向对象语言中this表示当前对象的一个引用。但在JavaScript中this不是固定不变的，它会随着执行环境的改变而改变。

- 在对象方法中，this表示该方法所属的对象。
- 如果单独使用，this表示全局对象。
- 在函数中，非严格模式下，this表示全局对象；在严格模式下，this是undefined。
- 在事件中，this表示接收事件的元素。
- 类似call()和apply()方法可以将this引用到任何对象。

### 方法中的this
在对象方法中， this指向方法所在的对象。

```js
// 实例
var person = {
  firstName: "John",
  lastName : "Doe",
  id       : 5566,
  fullName : function() {
    return this.firstName + " " + this.lastName;
  }
};
```

### 单独使用this
单独使用this，则它指向全局(Global)对象。
在浏览器中，window就是该全局对象为[object Window]；
严格模式下，如果单独使用，this也是指向全局(Global)对象。

### 函数中使用this（默认）
在函数中，函数的所属者（window）默认绑定到this上。
严格模式下函数是没有绑定到this上，这时候this是undefined。

### 事件中的this
在HTML事件句柄中，this指向了接收事件的HTML元素：

```js
// 实例
<button onclick="this.style.display='none'">
点我后我就消失了
</button>
```

### 显式函数绑定
在JavaScript中函数也是对象，对象则有方法，apply和call就是函数对象的方法。这两个方法异常强大，他们允许切换函数执行的上下文环境（context），即this绑定的对象。

在下面实例中，当我们使用person2作为参数来调用person1.fullName方法时, this将指向person2, 即便它是person1的方法：

```js
// 实例
var person1 = {
  fullName: function() {
    return this.firstName + " " + this.lastName;
  }
}
var person2 = {
  firstName:"John",
  lastName: "Doe",
}
person1.fullName.call(person2);  // 返回 "John Doe"
```