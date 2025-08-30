<template>
  <li>
    {{ title }}
    <button @click="$emit('removeTodo')">X</button>
  </li>
</template>

<script setup>
  defineProps(["title"])
  defineEmits(["removeTodo"])
</script>
