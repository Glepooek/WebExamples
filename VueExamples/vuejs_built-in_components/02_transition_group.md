`TransitionGroup`是一个内置组件，用于对`v-for`列表中元素或组件的插入、移动和顺序改变添加动画效果。

## 和`Transition`组件的区别
`TransitionGroup`支持和`Transition`组件基本相同的props、CSS过渡class和JS钩子监听器，但有以下几点区别：

* 默认情况下，它不会渲染一个容器元素。但可以通过传入`tag`prop来指定一个元素作为容器元素来渲染。
* 过渡模式在这里不可用，因为不再是在互斥的元素之间进行切换。
* 列表中的每个元素都必须有一个独一无二的`key`属性。
* CSS过渡class会被应用在列表内的元素上，而不是容器元素上。

## 进入、离开动画

```vue
<template>
  <main>
    <div>
      <button @click="add">Add</button>
      <button @click="remove">Remove</button>
    </div>
    <TransitionGroup name="list" tag="ul">
      <li v-for="item in list" :key="item.id">{{ item.text }}</li>
    </TransitionGroup>
  </main>
</template>

<script setup>
  import { ref } from "vue"

  const list = ref([
    { id: 1, text: "Item 1" },
    { id: 2, text: "Item 2" },
    { id: 3, text: "Item 3" },
  ])

  const add = () => {
    const nextId = list.value.length + 1
    const randomIndex = Math.floor(Math.random() * (list.value.length + 1))
    list.value.splice(randomIndex, 0, { id: nextId, text: `Item ${nextId}` })
  }

  const remove = () => {
    list.value.splice(Math.floor(Math.random() * list.value.length), 1)
  }
</script>

<style scoped>
  button {
    margin: 0.5em;
    width: 100px;
    height: 30px;
    border-radius: 5px;
  }

  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s ease;
  }

  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
</style>
```

## 移动动画
上面的示例：当某一项被插入或移除时，它周围的元素会立即发生跳跃而不是平稳的移动。可以通过再添加一些额外的CSS规则来解决这个问题：

```vue
<template>
  <main>
    <div>
      <button @click="add">Add</button>
      <button @click="remove">Remove</button>
      <button
        @click="
          () => {
            list = shuffle(list)
          }
        "
      >
        Shuffle
      </button>
    </div>
    <TransitionGroup name="list" tag="ul">
      <li v-for="item in list" :key="item.id">{{ item.text }}</li>
    </TransitionGroup>
  </main>
</template>

<script setup>
  import { ref } from "vue"
  import { shuffle } from "es-toolkit"

  const list = ref([
    { id: 1, text: "Item 1" },
    { id: 2, text: "Item 2" },
    { id: 3, text: "Item 3" },
  ])

  let nextId = list.value.length + 1

  const add = () => {
    const randomIndex = getRandomIndex(list.value.length + 1)
    list.value.splice(randomIndex, 0, { id: nextId, text: `Item ${nextId}` })
    nextId++
  }

  const remove = () => {
    list.value.splice(getRandomIndex(list.value.length), 1)
    if (list.value.length === 0) {
      nextId = 1
    }
  }

  function getRandomIndex(max) {
    return Math.floor(Math.random() * max)
  }
</script>

<style scoped>
  button {
    margin: 0.5em;
    width: 100px;
    height: 30px;
    border-radius: 5px;
  }

  .list-move, /* 对移动中的元素应用的过渡 */
  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s ease;
  }

  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }

  /* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
  .list-leave-active {
    position: absolute;
  }
</style>
```

## 自定义过渡组class
可以通过向<TransitionGroup>传递`moveClass`prop为移动元素指定自定义过渡class。

## 渐进延迟列表动画
通过在JS钩子中读取元素的data属性，可以实现带渐进延迟的列表动画。首先，我们把每一个元素的索引渲染为该元素上的一个data属性：

```vue
<template>
    <TransitionGroup
        tag="ul"
        :css="false"
        @before-enter="onBeforeEnter"
        @enter="onEnter"
        @leave="onLeave"
        >
        <li
            v-for="(item, index) in computedList"
            :key="item.msg"
            :data-index="index"
        >
            {{ item.msg }}
        </li>
    </TransitionGroup>
</template>
```

接着，在JS钩子中，我们基于当前元素的data属性对该元素的进场动画添加一个延迟。
以下是一个基于GSAP库的动画示例：

```js
function onEnter(el, done) {
  gsap.to(el, {
    opacity: 1,
    height: '1.6em',
    delay: el.dataset.index * 0.15,
    onComplete: done
  })
}
```