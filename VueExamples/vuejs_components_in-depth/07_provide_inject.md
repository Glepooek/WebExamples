## props逐渐透传问题
通常情况下，当我们需要从父组件向子组件传递数据时，会使用`props`。如果组件嵌套层级过多，props沿着组件链逐级传递，这会非常麻烦，甚至链路非常长，有些组件根本不关心这些props：

![属性透传图示](assets/prop-drilling.png)

`provide`和`inject`可以帮助我们解决这一问题。一个父组件相对于其所有的后代组件，会作为依赖提供者。任何后代的组件树，无论层级有多深，都可以注入由父组件提供给整条链路的依赖。

![依赖注入图示](assets/provide-inject.png)

## Provide(提供)
要为后代组件提供数据，可以：

* 使用`provide`选项。对于provide对象提供的每个属性，后代组件会用其`key`为注入名查找期望注入的值，属性的值就是要提供的数据。

```js
export default {
    provide: {
        message: 'hello'
    }
}
```

* 使用`provide()`方法。这样提供的数据可以依赖组件实例中由`data()`定义的数据属性。

```js
export default {
    data() {
        return {
            message: 'hello'
        }
    },
    provide() {
        return {
            message: this.message
        }
    }
}
```

但是这样注入的数据`不会保持响应式`。

## 应用层Provide
除了在组件中提供依赖，还可以在整个应用层面提供依赖。

```js
import { createApp } from 'vue'

const app = createApp({})
app.provide('message', 'hello')
```

`在应用级别提供的数据在该应用内的所有组件中都可以注入。`这在你编写插件时会特别有用，因为插件一般都不会使用组件形式来提供值。

## Inject(注入)
要注入上层组件提供的数据，可以使用`inject`选项。

```js
export default {
    inject: ['message']，
    created() {
        console.log(this.message)
    }
}
```

注入会在组件自身的状态之前被解析，因此可以在`data()`中访问到注入的属性。

```js
export default {
    inject: ['message'],
    data() {
        return {
            fullMessage: this.message
        }
    }
}
```

`如果有多个父组件提供了相同键的数据，注入将解析为组件链上最近的父组件所注入的值。`

### 注入别名
当以数组形式使用inject，注入的属性会以同名的`key`暴露到组件实例上。这使得，访问的本地属性名和注入名是相同的。

如果我们想要用一个不同的本地属性名注入该属性，需要在`inject`选项的属性上使用对象的形式：

```js
export default {
  inject: {
    /* 本地属性名 */ localMessage: {
      from: /* 注入来源名 */ 'message'
    }
  }
}
```

这里，组件本地化了原注入名`message`所提供的属性，并将其暴露为`this.localMessage`。

### 注入默认值
默认情况下，inject假设传入的注入名会被某个祖先链上的组件提供。如果该注入名的确没有任何组件提供，则会抛出一个运行时警告。

如果在注入一个值时不要求必须有提供者，那么我们应该声明一个默认值，和`props`类似：

```js
export default {
  // 当声明注入的默认值时
  // 必须使用对象形式
  inject: {
    message: {
      from: 'message', // 当与原注入名同名时，这个属性是可选的
      default: 'default value'
    },
    user: {
      // 对于非基础类型数据，如果创建开销比较大，或是需要确保每个组件实例
      // 需要独立数据的，请使用工厂函数
      default: () => ({ name: 'John' })
    }
  }
}
```

## 和响应式数据配合使用
为保证注入方和供给方之间的响应性链接，我们需要使用`computed()`函数提供一个计算属性：

```js
import { computed } from 'vue'

export default {
  data() {
    return {
      message: 'hello!'
    }
  },
  provide() {
    return {
      // 显式提供一个计算属性
      message: computed(() => this.message)
    }
  }
}
```

`computed()`函数常用于组合式API风格的组件中，但它同样还可以用于补充选项式API风格的某些用例。

## 使用Symbol作注入名
已经了解了如何使用`字符串`作为注入名。但如果你正在构建大型的应用，包含非常多的依赖提供，或者你正在编写提供给其他开发者使用的组件库，建议最好使用`Symbol`来作为注入名以避免潜在的冲突。

通常推荐在一个单独的文件中导出这些注入名`Symbol`：

如使用文件：keys.js导出：

```js
export const myInjectionKey = Symbol()
```

```js
// 在供给方组件中
import { myInjectionKey } from './keys.js'

export default {
  provide() {
    return {
      [myInjectionKey]: {
        /* 要提供的数据 */
      }
    }
  }
}
```

```js
// 注入方组件
import { myInjectionKey } from './keys.js'

export default {
  inject: {
    injected: { from: myInjectionKey }
  }
}
```