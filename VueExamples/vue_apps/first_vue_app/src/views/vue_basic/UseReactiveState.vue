<script setup>
  import { ref, computed } from "vue"
  import { useFetch } from "@/utils/fetch.js"

  const baseUrl = "https://jsonplaceholder.typicode.com/todos/"
  const id = ref("1")
  const url = computed(() => `${baseUrl}${id.value}`)

  const { data, error } = useFetch(url)
</script>

<template>
  <main>
    <h1>Use Reactive State</h1>
    <input type="number" v-model="id" />
    <div v-if="error">Oops! Error encountered: {{ error.message }}</div>
    <div v-else-if="data">
      data loaded:
      <pre> {{ data }}</pre>
    </div>
    <div v-else>Loading...</div>
  </main>
</template>
