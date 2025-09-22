<!--
可定制插槽和 CSS 过渡效果的模态框组件。
-->

<script setup>
  import Modal from "@/components/Modal.vue"
  import { ref } from "vue"

  const showModal = ref(false)
</script>

<template>
  <button id="show-modal" @click="showModal = true">Show Modal</button>

  <Teleport to="body">
    <!-- 使用这个 modal 组件，传入 prop -->
    <Modal :show="showModal" @close="showModal = false">
      <template #header>
        <h3>Custom Header</h3>
      </template>
    </Modal>
  </Teleport>
</template>

<style scoped>
  button {
    width: 300px;
    height: 50px;
  }
</style>
