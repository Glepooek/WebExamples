<template>
  <div class="tab">
    <span>User Posts for User</span>
    <button @click="counter++">Clicked {{ counter }} times</button>
  </div>
</template>

<script setup>
  import { ref, onActivated, onDeactivated } from "vue"
  const counter = ref(0)

  onActivated(() => {
    console.log("UserPosts activated, counter is:", counter.value)
  })

  onDeactivated(() => {
    console.log("UserPosts deactivated, counter is:", counter.value)
  })
</script>

<style scoped>
  button {
    display: block;
  }
</style>
