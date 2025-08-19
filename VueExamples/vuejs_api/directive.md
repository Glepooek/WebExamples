## v-on

* 给元素绑定事件监听器。

* 缩写：`@`

* 期望的绑定值类型：`Function | Inline Statement | Object (不带参数)`

* 参数：`event (使用对象语法则为可选项)`

* 修饰符
    * .stop - 调用 event.stopPropagation()。
    * .prevent - 调用 event.preventDefault()。
    * .capture - 在捕获模式添加事件监听器。
    * .self - 只有事件从元素本身发出才触发处理函数。
    * .{keyAlias} - 只在某些按键下触发处理函数。
    * .once - 最多触发一次处理函数。
    * .left - 只在鼠标左键事件触发处理函数。
    * .right - 只在鼠标右键事件触发处理函数。
    * .middle - 只在鼠标中键事件触发处理函数。
    * .passive - 通过 { passive: true } 附加一个 DOM 事件。

* 详细信息

事件类型由参数来指定。
表达式可以是一个方法名，一个内联声明，如果有修饰符则可省略。
当用于普通元素，只监听原生 DOM 事件。当用于自定义元素组件，则监听子组件触发的自定义事件。
当监听原生 DOM 事件时，方法接收原生事件作为唯一参数。如果使用内联声明，声明可以访问一个特殊的`$event`变量：`v-on:click="handle('ok', $event)"`。
v-on 还支持绑定不带参数的`事件/监听器对`的对象。请注意，当使用对象语法时，不支持任何修饰符。

* 示例

```html
<!-- 方法处理函数 -->
<button v-on:click="doThis"></button>

<!-- 动态事件 -->
<button v-on:[event]="doThis"></button>

<!-- 内联声明 -->
<button v-on:click="doThat('hello', $event)"></button>

<!-- 缩写 -->
<button @click="doThis"></button>

<!-- 使用缩写的动态事件 -->
<button @[event]="doThis"></button>

<!-- 停止传播 -->
<button @click.stop="doThis"></button>

<!-- 阻止默认事件 -->
<button @click.prevent="doThis"></button>

<!-- 不带表达式地阻止默认事件 -->
<form @submit.prevent></form>

<!-- 链式调用修饰符 -->
<button @click.stop.prevent="doThis"></button>

<!-- 按键用于 keyAlias 修饰符-->
<input @keyup.enter="onEnter" />

<!-- 点击事件将最多触发一次 -->
<button v-on:click.once="doThis"></button>

<!-- 对象语法 -->
<button v-on="{ mousedown: doThis, mouseup: doThat }"></button>
```

监听子组件的自定义事件 (当子组件的“my-event”事件被触发，处理函数将被调用)：

```vue
<MyComponent @my-event="handleThis" />

<!-- 内联声明 -->
<MyComponent @my-event="handleThis(123, $event)" />
```