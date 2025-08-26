<template>
  <h4 :class="$attrs.class">{{ id }}——{{ title }}</h4>
  <!-- <button @click="$emit('enlarge-text')">Enlarge text</button> -->
  <button @click="enlargeText">Enlarge text</button>
</template>

<script setup>
defineProps(['id', 'title'])
const emit = defineEmits(['enlargeText'])

const enlargeText = () => {
  emit('enlargeText')
}

defineExpose({
  emit,
  enlargeText,
})
</script>
