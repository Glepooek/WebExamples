<script>
  import Child from "@/components/Child.vue"
  import { computed } from "vue"
  export default {
    components: { Child },
    data() {
      return {
        message: "Hello",
      }
    },
    provide() {
      return {
        message: computed(() => this.message),
      }
    },
  }
</script>
<template>
  <main>
    <h1>InjectView</h1>
    <p>
      <input type="text" v-model="message" />
      <Child />
    </p>
  </main>
</template>
