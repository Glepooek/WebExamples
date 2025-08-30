<template>
  <div class="book-container">
    <header class="book-header">
      <el-button type="primary" :icon="ArrowLeft" @click="returnPreviousPage">返回</el-button>
    </header>

    <main class="book-main">
      <span style="color: red; font-size: 50px">Not Found Page</span>
    </main>
  </div>
</template>

<script setup>
  import { useRouter } from "vue-router"
  import { ArrowLeft } from "@element-plus/icons-vue"

  const router = useRouter()
  const returnPreviousPage = () => {
    // 返回列表页
    router.push({ name: "bookList" })
  }
</script>

<style scoped>
  .book-container {
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, #4257c4 0%, #4c90e6 100%);
    display: flex;
    flex-direction: column;
  }

  .book-container::before {
    content: "";
    position: absolute;
    bottom: 82px;
    left: 0;
    width: 100%;
    height: 30%;
    background: url("../assets/svgs/book_background.svg") center / cover no-repeat;
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
