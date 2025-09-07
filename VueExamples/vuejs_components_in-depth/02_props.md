## props声明
一个组件需要显示的声明它所接受的props。只有这样Vue才能知道外部传入的哪些是props，哪些是透传属性。

在使用`<script setup>`的单文件组件中，使用`defineProps`声明props：

```vue
<script setup>
    const props = defineProps(['foo', 'bar'])
    console.log(props.foo)
</script>
```

在没有使用`<script setup>`的单文件组件中，使用`props`选项声明props：

```js
export default {
    props: ['foo', 'bar'],
    // setup接受props作为第一个参数
    setup(props) {
        console.log(props.foo)
    }
}
```

传递个`defineProps`的参数和提供给`props`选项的值，除了使用数组，还可以是一个对象。

```js
// <script setup>
const props = defineProps({
    foo: String,
    bar: Number
})

console.log(props.foo)

// 非<script setup>
export default {
    props: {
        foo: String,
        bar: Number
    },
    setup(props) {
        console.log(props.foo)
    }
}
```

对于以对象形式声明的每个属性，`key`是prop的名称，而值则是该prop预期类型的`构造函数`。
对象形式的props声明不仅可以一定程度上作为组件的文档，而且如果其他开发者在使用你的组件时传递了错误的类型，也会在浏览器控制台中抛出警告。

## 响应式props解构 vue3.5+
Vue的响应式系统基于属性访问跟踪状态的使用情况。例如，在计算属性或侦听器中访问props.foo时，foo属性将被跟踪为依赖项。

因此，在以下代码的情况下：

```js
const { foo } = defineProps(['foo'])

watchEffect(() => {
  // 在 3.5 之前只运行一次
  // 在 3.5+ 中在 "foo" prop 变化时重新执行
  console.log(foo)
})
```

* 在3.4及以下版本，foo是一个实际的常量，永远不会改变。
* 在3.5及以上版本，当在同一个`<script setup>`代码块中访问由`defineProps`解构的变量时，Vue编译器会自动在前面添加`props.`。因此，上面的代码等同于以下代码：

```js
const props = defineProps(['foo'])

watchEffect(() => {
  // `foo` 由编译器转换为 `props.foo`
  console.log(props.foo)
})
```

### 将解构的props传递到函数中

当我们将解构的prop传递到函数中时，例如：

```js
const { foo } = defineProps(['foo'])

watch(foo, /* ... */)
```

这并不会按预期工作，因为它等价于`watch(props.foo, ...)`——我们给watch传递的是一个值而不是响应式数据源。实际上，Vue的编译器会捕捉这种情况并发出警告。

与使用`watch(() => props.foo, ...)`来侦听普通prop类似，我们也可以通过将其包装在getter中来侦听解构的prop：

```js
watch(() => foo, /* ... */)
```

此外，当我们需要`传递解构的prop到外部函数中并保持响应性时`，这是推荐做法：

```js
useComposable(() => foo)
```

外部函数可以调用getter(或使用toValue进行规范化) 来追踪提供的prop变更。例如，在计算属性或侦听器的getter中。

## 传递props的细节
### prop名字格式

* prop名称使用`camelCase`格式
* 传递props时，推荐使用`kebab-case`格式，更贴近HTML属性的风格
* 组件名称使用`PascalCase`格式，能帮助区分Vue组件和原生HTML元素

### 静态 vs 动态props

* 静态props，在模版中直接为prop赋值，如`<MyComponent msg="hello">`。
* 动态props，在模版中通过`v-bind`（或缩写`:`）指令绑定，如`<MyComponent v-bind:msg="dynamicMsg">`。

### 传递不同的值类型
任何类型的值都可以作为props的值传递给组件。

### 使用一个对象绑定多个prop
如果想要将一个对象的所有属性都当作`props`传入，可以使用没有参数的`v-bind`，即只使用`v-bind`而非 `:prop-name`。例如，这里有一个post对象：

```js
const post = {
  id: 1,
  title: 'My Journey with Vue'
}
```

以及下面的模板：

```vue
<!-- 在组件内部，需要定义与post对象内部属性同名的prop -->
<BlogPost v-bind="post" />
```

而这实际上等价于：

```vue
<BlogPost :id="post.id" :title="post.title" />
```

## 单向数据流
所有的props都遵循着`单向绑定原则`，props因父组件的更新而变化，自然地将新的状态向下流往子组件，而不会逆向传递。

另外，每次父组件更新后，所有的子组件中的props都会被更新到最新值，这意味着你不应该在子组件中去更改一个 prop。若你这么做了，Vue会在控制台上向你抛出警告：

```js
const props = defineProps(['foo'])

// ❌ 警告！prop 是只读的！
props.foo = 'bar'
```

导致你想要更改一个prop的需求通常来源于以下两种场景：

* prop被用于传入初始值；而子组件想在之后将其作为一个局部数据属性。在这种情况下，最好是新定义一个局部数据属性，从props上获取初始值即可：

```js
const props = defineProps(['initialCounter'])

// 计数器只是将 props.initialCounter 作为初始值
// 像下面这样做就使 prop 和后续更新无关了
const counter = ref(props.initialCounter)
```

* 需要对传入的prop值做进一步的转换。在这种情况中，最好是基于该prop值定义一个计算属性：

```js
const props = defineProps(['size'])

// 该 prop 变更时计算属性也会自动更新
const normalizedSize = computed(() => props.size.trim().toLowerCase())
```

### 更改对象/数组类型的props​

当对象或数组作为props被传入时，虽然子组件无法更改props绑定，但仍然`可以更改对象或数组内部的值`。这是因为JavaScript的对象和数组是按引用传递，对Vue来说，阻止这种更改需要付出的代价异常昂贵。

这种更改的主要缺陷是它允许了子组件以某种不明显的方式影响父组件的状态，可能会使数据流在将来变得更难以理解。在最佳实践中，你应该尽可能避免这样的更改，除非父子组件在设计上本来就需要紧密耦合。在大多数场景下，子组件应该抛出一个事件来通知父组件做出改变。

## prop校验​
Vue组件对传入的props可以更细致地声明校验要求。要声明对`props`的校验，你可以向`defineProps()`宏提供一个带有`props`校验选项的对象，例如：

```js
defineProps({
  // 基础类型检查
  // (给出 `null` 和 `undefined` 值则会跳过任何类型检查)
  propA: Number,
  // 多种可能的类型
  propB: [String, Number],
  // 必传，且为 String 类型
  propC: {
    type: String,
    required: true
  },
  // 必传但可为 null 的字符串
  propD: {
    type: [String, null],
    required: true
  },
  // Number 类型的默认值
  propE: {
    type: Number,
    default: 100
  },
  // 对象类型的默认值
  propF: {
    type: Object,
    // 对象或数组的默认值
    // 必须从一个工厂函数返回。
    // 该函数接收组件所接收到的原始 prop 作为参数。
    default(rawProps) {
      return { message: 'hello' }
    }
  },
  // 自定义类型校验函数
  // 在 3.4+ 中完整的 props 作为第二个参数传入
  propG: {
    validator(value, props) {
      // The value must match one of these strings
      return ['success', 'warning', 'danger'].includes(value)
    }
  },
  // 函数类型的默认值
  propH: {
    type: Function,
    // 不像对象或数组的默认，这不是一个
    // 工厂函数。这会是一个用来作为默认值的函数
    default() {
      return 'Default function'
    }
  }
})
```

注意：`defineProps()`宏中的参数不可以访问`<script setup>`中定义的其他变量，因为在编译时整个表达式都会被移到外部的函数中。

一些补充细节：

* 所有prop默认都是可选的，除非声明了`required: true`。
* 除Boolean外的未传递的可选prop将会有一个默认值undefined。
* Boolean类型的未传递prop将被转换为`false`。这可以通过为它设置`default`来更改——例如：设置为 default: undefined 将与非布尔类型的 prop 的行为保持一致。
* 如果声明了`default`值，那么在prop的值被解析为undefined时，无论prop是未被传递还是显式指明的 undefined，都会改为`default`值。

### 运行时类型检查​
校验选项中的`type`可以是下列这些原生构造函数：

* String
* Number
* Boolean
* Array
* Object
* Date
* Function
* Symbol
* Error

另外，type也可以是自定义的类或构造函数，Vue将会通过`instanceof`来检查类型是否匹配。例如下面这个类：

```js
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName
    this.lastName = lastName
  }
}
```

你可以将其作为一个prop的类型：

```js
defineProps({
  author: Person
})
```

### 可为null的类型​
如果该类型是必传但可为null的，你可以用一个包含null的数组语法：

```js
defineProps({
  id: {
    type: [String, null],
    required: true
  }
})
```

注意：如果type仅为null而非使用数组语法，它将允许任何类型。

## Boolean类型转换​
为了更贴近原生`boolean`属性的行为，声明为Boolean类型的props有特别的类型转换规则。以带有如下声明的<MyComponent>组件为例：

```js
defineProps({
  disabled: Boolean
})
```

该组件可以被这样使用：

```vue
<!-- 等同于传入 :disabled="true" -->
<MyComponent disabled />

<!-- 等同于传入 :disabled="false" -->
<MyComponent />
```

当一个prop被声明为允许多种类型时，Boolean的转换规则也将被应用。然而，当同时允许String和Boolean时，有一种边缘情况——只有当Boolean出现在String之前时，Boolean转换规则才适用：

```js
// disabled 将被转换为 true
defineProps({
  disabled: [Boolean, Number]
})

// disabled 将被转换为 true
defineProps({
  disabled: [Boolean, String]
})

// disabled 将被转换为 true
defineProps({
  disabled: [Number, Boolean]
})

// disabled 将被解析为空字符串 (disabled="")
defineProps({
  disabled: [String, Boolean]
})
```