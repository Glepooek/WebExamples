## 监听事件

可以使用`v-on`指令来监听DOM事件，并当事件触发时执行对应的JS。用法：`v-on:click='handler'`或`@:click='handler'`。

事件处理器（handler）可以是：
+ 内联事件处理器
+ 方法事件处理器

## 内联事件处理器
用于简单场景。

```js
data() {
    return {
        count: 0
    }
}
```

```html
<button @click="count++"></button>
<p> count is: {{ count }} </p>
```

## 方法事件处理器
用于复杂场景。

```js
data() {
    return {
        name: 'vue.js'
    }
},
methods: {
    greet(event) {
        alert(`hello ${this.name}!`)
        if (event) {
            alert(event.target.tagName)
        }
    }
}
```

```html
<button @click="greet"></button>
```

方法事件处理器可以自动接收原生DOM事件并触发执行。
能够通过被触发事件的`event.target`访问到该DOM元素。

### 方法与内联事件判断
举例来说，`foo、foo.bar和foo['bar']` 会被视为方法事件处理器，而`foo()和count++`会被视为内联事件处理器。

## 内联事件处理器调用方法
允许向方法传入自定义参数以代替原生事件。

```js
methods: {
    say(message) {
        alert(message)
    }
}
```

```html
<button @click="say('say hello')">say hello</button>
<button @click="say('say bye')">say bye</button>
```

## 内联事件处理器访问事件参数
有时候需要在内联事件处理器中访问原生DOM事件。可以向该处理器传入一个特殊的`$event`变量，或者使用内联箭头函数。

```js
methods: {
    warn(message, event) {
        if (event) {
            event.preventDefault()
        }
        alert(message)
    }
}
```

```html
<button @click="warn('Form cannot be submitted yet.', $event)">Submit</button>
<button @click="(event)=>warn('Form cannot be submitted yet.', event)">Submit</button>
```

## 事件修饰符
Vue为`v-on`指令提供了事件修饰符。事件修饰符是用`.`表示的指令后缀，包含以下这些：
* .stop，调用event.stopPropagation()，阻止事件冒泡。
* .prevent，调用event.preventDefault()，阻止事件的默认行为。
* .self，只在事件由自身元素触发时才执行回调（不响应子元素冒泡上来的事件）。
* .capture，以捕获模式添加事件监听器（即在捕获阶段触发）。
* .once，事件只触发一次，自动移除监听器。
* .passive，滚动事件的默认行为 (scrolling) 将立即发生而非等待 `onScroll` 完成，不能调用event.preventDefault()。

使用修饰符时需要注意调用顺序，因为相关代码是以相同的顺序生成的。
`.passive`修饰符一般用于触摸事件的监听器，可以用来改善移动端设备的滚屏性能。

## 按键修饰符
在监听按键事件时，经常需要检查特定的按键。Vue允许在`v-on 或 @`监听按键事件时添加按键修饰符。

### 按键别名
Vue为一些常用的按键提供了别名：
* .enter
* .tab
* .delete (捕获“Delete”和“Backspace”两个按键)
* .esc
* .space
* .up
* .down
* .left
* .right

### 系统按键修饰符​
你可以使用以下系统按键修饰符来触发鼠标或键盘事件监听器，只有当按键被按下时才会触发。
* .ctrl
* .alt
* .shift
* .meta，在 Mac 键盘上，meta 是 Command 键 (⌘)。在 Windows 键盘上，meta 键是 Windows 键 (⊞)。

举例来说：

```html
<!-- Alt + Enter -->
<input @keyup.alt.enter="clear" />

<!-- Ctrl + 点击 -->
<div @click.ctrl="doSomething">Do something</div>
```

请注意，系统按键修饰符和常规按键不同。与 keyup 事件一起使用时，该按键必须在事件发出时处于按下状态。换句话说，keyup.ctrl 只会在你仍然按住 ctrl 但松开了另一个键时被触发。若你单独松开 ctrl 键将不会触发。

### .exact修饰符​
`.exact`修饰符允许精确控制触发事件所需的系统修饰符的组合。

```html
<!-- 当按下 Ctrl 时，即使同时按下 Alt 或 Shift 也会触发 -->
<button @click.ctrl="onClick">A</button>

<!-- 仅当按下 Ctrl 且未按任何其他键时才会触发 -->
<button @click.ctrl.exact="onCtrlClick">A</button>

<!-- 仅当没有按下任何系统按键时触发 -->
<button @click.exact="onClick">A</button>
```

## 鼠标按键修饰符

* .left
* .right
* .middle

这些修饰符将处理程序限定为由特定鼠标按键触发的事件。.left，.right 和 .middle 这些修饰符名称是基于常见的右手用鼠标布局设定的，但实际上它们分别指代设备事件触发器的“主”、”次“，“辅助”，而非实际的物理按键。