一个Vue组件使用前，需要先被注册。
组件注册有两种方式：
* 全局注册
* 局部注册

## 全局注册
使用Vue应用实例的`.component()`方法，让组件在当前Vue应用中全局可用。

```js
import { createApp } from 'vue'

const app = createApp({})
app.component(
    // 注册的组件名
    'MyComponent', {
    // 组件实现
})
```

如果使用单文件组件（SFC），可以注册被导入的`.vue`文件：

```js
import { createApp } from 'vue'
import SvgIcon from './components/icons/SvgIcon.vue'

const app = createApp({})
app.component('SvgIcon', SvgIcon)
```

`.component()`方法可以被链式调用：

```js
app
  .component('ComponentA', ComponentA)
  .component('ComponentB', ComponentB)
  .component('ComponentC', ComponentC)
```

全局注册的组件可以在此应用的任意组件的模板中使用：

```vue
<!-- 这在当前应用的任意组件中都可用 -->
<ComponentA/>
<ComponentB/>
<ComponentC/>
```

## 局部注册


## 组件名格式


