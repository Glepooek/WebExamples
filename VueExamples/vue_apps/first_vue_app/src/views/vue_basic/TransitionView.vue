<template>
  <main>
    <button @click="toggle">Toggle Slide + Fade</button>
    <transition name="slide-fade">
      <div v-if="show">Hello, World!</div>
    </transition>
  </main>
</template>

<script setup>
  import { ref } from "vue"

  const show = ref(true)

  function toggle() {
    show.value = !show.value
  }
</script>

<style scoped>
  button {
    margin-bottom: 16px;
    width: 160px;
    height: 32px;
  }

  .slide-fade-enter-active {
    /* transition属性是一个简写属性，可以同时设置四个过渡相关的子属性：
    transition-property：指定应用过渡效果的CSS属性
    transition-duration：过渡效果的持续时间
    transition-timing-function：过渡效果的时间函数（缓动函数）
    transition-delay：过渡效果的延迟时间 */
    transition: all 0.3s ease-out;

    /* 在transition: all 0.3s ease-out;中：
    all 表示所有可应用过渡效果的CSS属性都会参与过渡动画
    这包括如opacity、transform、color、background-color等可以平滑变化的属性
    在例子中，指的是opacity、transform */
  }

  .slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
  }
</style>
