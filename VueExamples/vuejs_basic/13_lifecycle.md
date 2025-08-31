## 注册周期钩子

Vue生命周期钩子函数：

- onMounted()
- onUpdated()
- onUnmounted()
- onBeforeMount()
- onBeforeUpdate()
- onBeforeUnmount()
- onErrorCaptured()
- onRenderTracked()
- onRenderTriggered()
- onActivated()
- onDeactivated()
- onServerPrefetch()

生命周期钩子函数的调用顺序：

- onBeforeMount()
- onMounted()
- onBeforeUpdate()
- onUpdated()
- onBeforeUnmount()
- onUnmounted()

注册示例：

```js
import { createApp, ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from "vue"
const count = ref(0)

const app = createApp({
  setup() {
    onBeforeMount(() => {
      console.log("onBeforeMounted")
    })

    onMounted(() => {
      console.log("onMounted")
    })

    onBeforeUpdate(() => {
      console.log("onBeforeUpdate")
    })

    onUpdated(() => {
      console.log("onUpdated")
    })

    onBeforeUnmount(() => {
      console.log("onBeforeUnmount")
    })

    onUnmounted(() => {
      console.log("onUnmounted")
    })

    return {
      count,
    }
  },
})

app.mount("#app")
```

注册时特别注意：

- 不要异步注册钩子函数
- 钩子函数不一定放在`setup()`或`<script setup>`内的词法上下文中。也可以在一个外部函数中调用，只要调用栈是同步的，且最终起源自`setup()`就可以。

## 生命周期图示

![生命周期](assets/lifecycle_zh-CN.png)
