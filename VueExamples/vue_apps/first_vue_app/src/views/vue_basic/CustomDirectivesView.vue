<script setup>
  const vFocus = {
    mounted: (el, binding, vnode) => {
      el.focus()
      console.log(el, binding.value, vnode)
    },
  }
</script>

<template>
  <div>
    <input type="text" v-focus />
  </div>
</template>
