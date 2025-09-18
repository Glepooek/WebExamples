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
