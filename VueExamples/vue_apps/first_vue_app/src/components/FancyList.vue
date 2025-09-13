<script>
  export default {
    props: ["api-url", "per-page"],
    data() {
      return {
        items: [],
      }
    },
    mounted() {
      // mock remote data fetching
      setTimeout(() => {
        this.items = [
          { body: "Scoped Slots Guide", username: "Evan You", likes: 20 },
          { body: "Vue Tutorial", username: "Natalia Tepluhina", likes: 10 },
        ]
      }, 1000)
    },
  }
</script>

<template>
  <ul>
    <li v-if="!items.length">Loading...</li>
    <li v-for="item in items" :key="item.likes">
      <slot name="item" v-bind="item"></slot>
    </li>
  </ul>
</template>

<style scoped>
  ul {
    list-style-type: none;
    padding: 5px;
    background: linear-gradient(315deg, #42d392 25%, #647eff);
  }
  li {
    padding: 5px 20px;
    margin: 10px;
    background: #fff;
    color: black;
  }
</style>
