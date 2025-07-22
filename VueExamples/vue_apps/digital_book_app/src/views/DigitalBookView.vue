<template>
  <div class="book-container">

  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const onlineBookUrl = route.query.onlineBookUrl;
const secretKey = route.query.secretKey;

console.log(onlineBookUrl, secretKey);
</script>

<style scoped>
.book-container {
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #4257C4 0%, #4C90E6 100%);
}

.book-container::before {
  content: '';
  position: absolute;
  bottom: 82px;
  left: 0;
  width: 100%;
  height: 30%;
  background: url('../assets/book_background.svg') center / cover no-repeat;
  /* 确保 SVG 在渐变背景之上 */
  z-index: 1;
}
</style>
