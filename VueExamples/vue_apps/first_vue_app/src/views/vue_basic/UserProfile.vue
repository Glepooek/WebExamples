<template>
  <div class="tab">
    <span>User Profile for User</span>
  </div>
</template>

<script setup>
import { onActivated, onDeactivated } from 'vue'

onActivated(() => {
  console.log('UserProfile activated')
})

onDeactivated(() => {
  console.log('UserProfile deactivated')
})
</script>