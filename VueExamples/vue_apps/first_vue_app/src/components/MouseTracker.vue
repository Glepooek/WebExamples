<script setup>
  // import { useMouse } from "../utils/mouse.js"
  import { useMouse } from '@vueuse/core'

  const { x: mouseX, y: mouseY } = useMouse()
</script>

<template>
  <!-- x,y 是作用域插槽上使用的属性，用于将子组件的数据传递给父组件 -->
  <slot :x="mouseX" :y="mouseY"></slot>
</template>
