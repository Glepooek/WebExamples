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
* .passive，以passive方式添加事件监听器，提升滚动性能，不能调用event.preventDefault()。

## 按键修饰符



