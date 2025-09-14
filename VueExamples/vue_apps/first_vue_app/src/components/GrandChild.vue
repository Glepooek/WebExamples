<template>
  <div>message to grand child: {{ message }}</div>
</template>

<script>
  export default {
    inject: ["message"],
  }
</script>
