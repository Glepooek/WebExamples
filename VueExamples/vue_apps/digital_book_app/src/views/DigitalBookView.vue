<template>
  <div class="book-container">
    <main class="book-main">
      <div class="leftPage">
        <img v-if="leftPage.imgBase64" :src="leftPage.imgBase64" alt="">
       </div>
      <div class="rightPage">
        <img v-if="rightPage.imgBase64" :src="rightPage.imgBase64" alt="">
      </div>
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
import { onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { init, getDigitalBook, getDigitalBookPage } from '@/apis/digitalBookApi'
import { ArrowLeft } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()

const fileName = route.query.fileName
const secretKey = route.query.secretKey

const leftPage = ref({ background: {}, imgBase64: '' })
const rightPage = ref({ background: {}, imgBase64: '' })

const returnPreviousPage = () => {
  // 返回列表页
  router.push({ name: 'bookList' });
};

onMounted(async () => {
  init(`${import.meta.env.VITE_APP_API_EBOOK_BASE_URL}${fileName}/`, fileName, secretKey)

  const book = await getDigitalBook(fileName, secretKey)
  const leftPageIndex = book.pages[0]
  const rightPageIndex = book.pages[1]

  leftPage.value = await getDigitalBookPage(leftPageIndex) 
  rightPage.value = await getDigitalBookPage(rightPageIndex)
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
  margin: 0 0 48px 80px;
  background-color: #d9db36;
  display: flex;
  justify-content: center;
  align-items: center;
}

.rightPage {
  flex: 1;
  margin: 0 80px 48px 0;
  background-color: #c442ae;
  display: flex;
  justify-content: center;
  align-items: center;
}

.leftPage img,
.rightPage img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  z-index: 1;
}

.rightToolbar {
  position: absolute;
  top: 0;
  right: 0;
  width: 64px;
  height: 100%;
  background: rgba(187, 28, 28, 0.39);
  z-index: 2;
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
  z-index: 2;
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