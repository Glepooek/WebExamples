<template>
  <main>
    <input v-model="query" placeholder="Filter..." />
    <!-- data-index 自定义属性 -->
    <TransitionGroup tag="ul" :css="false" @before-enter="onBeforeEnter" @enter="onEnter" @leave="onLeave">
      <li v-for="(item, index) in computedList" :key="item.msg" :data-index="index">
        {{ item.msg }}
      </li>
    </TransitionGroup>
  </main>
</template>

<script setup>
  import gsap from "gsap"
  import { ref, computed } from "vue"

  const list = [
    { msg: "Bruce Lee" },
    { msg: "Jackie Chan" },
    { msg: "Chuck Norris" },
    { msg: "Jet Li" },
    { msg: "Kung Fury" },
  ]

  const query = ref("")

  const computedList = computed(() => {
    return list.filter(item => item.msg.toLowerCase().includes(query.value.toLowerCase()))
  })

  const onBeforeEnter = el => {
    el.style.opacity = 0
    el.style.height = 0
    console.log("onBeforeEnter", el)
  }

  // el是DOM元素的引用，在这个例子中是列表项<li>元素。
  // dataset是DOM元素的一个属性，它提供了对元素上所有data-*自定义属性的访问。这是HTML5的标准特性，允许我们在元素上存储自定义数据。
  // index是dataset对象的一个属性，对应于元素上的data-index属性。
  // 在JavaScript中，data-*属性通过dataset对象访问时，会去掉data-前缀并将连字符后的第一个字母大写。例如：
  // data-index变成dataset.index
  // data-my-attribute变成dataset.myAttribute

  const onEnter = (el, done) => {
    gsap.to(el, {
      opacity: 1,
      height: "1.6em",
      delay: el.dataset.index * 0.15,
      onComplete: done,
    })
  }

  const onLeave = (el, done) => {
    gsap.to(el, {
      opacity: 0,
      height: 0,
      delay: el.dataset.index * 0.15,
      onComplete: done,
    })
  }
</script>

<style scoped>
  input {
    padding: 0.5em;
    font-size: 1em;
    border: 2px solid #42b983;
    border-radius: 4px;
    outline: none;
    margin-bottom: 1em;
    width: calc(100% - 1em);
  }
</style>
