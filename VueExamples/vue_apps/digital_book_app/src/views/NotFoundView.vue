<template>
  <div class="book-container">
    <header class="book-header">
      <el-button type="primary" :icon="ArrowLeft" @click="returnPreviousPage">返回</el-button>
    </header>

    <main>
        <div>Not Found Page</div>
    </main>

  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ArrowLeft } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()

const onlineBookUrl = route.query.onlineBookUrl;
const secretKey = route.query.secretKey;

const returnPreviousPage = () => {
  // 返回列表页
  router.push({ name: 'bookList' });
};

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

.book-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  /* background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px); */
  display: flex;
  align-items: center;
  padding: 0 20px;
  z-index: 2;
  /* 确保 header 在最上层 */
}
</style>
