<script setup>
  import { ref, onMounted, onUnmounted } from "vue"

  const mouseX = ref(0)
  const mouseY = ref(0)

  const trackMouse = e => {
    mouseX.value = e.pageX
    mouseY.value = e.pageY
  }

  onMounted(() => {
    window.addEventListener("mousemove", trackMouse)
  })

  onUnmounted(() => {
    window.removeEventListener("mousemove", trackMouse)
  })
</script>

<template>
  <!-- x,y 是作用域插槽上使用的属性，用于将子组件的数据传递给父组件 -->
  <slot :x="mouseX" :y="mouseY"></slot>
</template>
