<template>
  <h4 :class="$attrs.class">{{ id }}——{{ title }}</h4>
  <!-- <button @click="$emit('enlarge-text')">Enlarge text</button> -->
  <button @click="enlargeText">Enlarge text</button>
</template>

<script>
  // defineProps(["id", "title"])
  // const emit = defineEmits(["enlargeText"])

  // const enlargeText = () => {
  //   emit("enlargeText")
  // }

  // defineExpose({
  //   emit,
  //   enlargeText,
  // })

  // 不使用<script setup>
  export default {
    // 禁用属性继承
    inheritAttrs: false,
    props: ["id", "title"],
    emits: ["enlargeText"],
    setup(props, { emit }) {
      const enlargeText = () => {
        emit("enlargeText")
      }

      return {
        enlargeText,
      }
    },
  }
</script>
