<template>
  <div class="book-container">
    <main class="book-main">
      <div class="leftPage"></div>
      <div class="rightPage"></div>
      <div class="rightToolbar"></div>
      <div class="bottomToolbar">
        <div class="left">
          <el-button type="primary" :icon="ArrowLeft" @click="returnPreviousPage">返回</el-button>
        </div>
        <div class="center">
          <el-input v-model="fileName" type="text" style="margin: 0 0 0 10px;"></el-input>
        </div>
        <div class="right">
          hello
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getDigitalBook } from '@/apis/digitalBookApi'
import { ArrowLeft } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()

const fileName = route.query.fileName
const secretKey = route.query.secretKey

console.log(fileName, secretKey)

const returnPreviousPage = () => {
  // 返回列表页
  router.push({ name: 'bookList' });
};

onMounted(async() => {
  const book = await getDigitalBook(fileName, secretKey)
  console.log(book)
});

// 组件卸载时：
// 取消未完成的异步请求
// 移除事件监听器
// 清理定时器或动画
// 释放其他资源：如 WebSocket 连接、订阅等。
onUnmounted(() => {
  
  
});
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
  background: url('../assets/book_background.svg') center / cover no-repeat;
}

.book-main {
  display: flex;
  flex: 1;
}

.leftPage {
  flex: 1;
  margin: 0 0 48px 180px;
  background-color: #d9db36;
}

.rightPage {
  flex: 1;
  margin: 0 180px 48px 0;
  background-color: #c442ae;
}

.rightToolbar {
  position: absolute;
  top: 0;
  right: 0;
  width: 64px;
  height: 100%;
  background: rgba(187, 28, 28, 0.39);
}

.bottomToolbar {
  position: absolute;
  bottom: 6px;
  left: 12px;
  right: 12px;
  width: calc(100% - 24px);
  height: 56px;
  background: rgba(16, 207, 48, 0.336);
  display: grid;
  grid-template-columns: 188px 1fr 217px;
}

.bottomToolbar .left {
  display: flex;
  align-items: center;
}

.bottomToolbar .center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.bottomToolbar .right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>