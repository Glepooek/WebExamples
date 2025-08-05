<template>
  <div class="book-container">
    <header class="book-header">
      <el-button type="primary" :icon="ArrowLeft" @click="returnPreviousPage">返回</el-button>
    </header>

    <main class="book-main">
      <div>
        <span style="color: red;font-size: 50px;">Not Found Page</span>
        <p>
          <span style="margin-right: 5px;">count: {{ counterStore.count }}, doubleCount: {{ counterStore.doubleCount }}</span>
          <el-button type="primary" @click="counterStore.increment">Increment</el-button>
        </p>
      </div>
    </main>
  </div>
</template>

<script setup>

import { useRoute, useRouter } from 'vue-router';
import { ArrowLeft } from '@element-plus/icons-vue'
import { useCounterStore } from '@/stores/counter';

const route = useRoute()
const router = useRouter()
const counterStore = useCounterStore()

console.log(counterStore.count, counterStore.doubleCount);

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
  display: flex;
  flex-direction: column;
}

.book-container::before {
  content: '';
  position: absolute;
  bottom: 82px;
  left: 0;
  width: 100%;
  height: 30%;
  background: url('../assets/svgs/book_background.svg') center / cover no-repeat;
}

.book-header {
  padding: 10px;
}

.book-main {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}
</style>
