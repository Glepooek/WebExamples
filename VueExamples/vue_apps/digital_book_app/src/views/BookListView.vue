<template>
  <div class="container">
    <el-tabs v-model="firstLevelTab.selectedTabName">
      <el-tab-pane v-for="item in firstLevelTab.tabs" :key="item.id" :label="item.name" :name="item.name">
        <el-tabs v-model="secondLevelTab.selectedTabName">
          <el-tab-pane v-for="item in secondLevelTab.tabs" :key="item.id" :label="item.name" :name="item.name">
            <div class="book-row">
              <div v-for="book in item.items" :key="book.bookTagId" class="book-item" @click="onBookClick(book)">
                <el-card>
                  <template #header>{{ book.showName }}</template>
                  <el-image :src="book.cover" class="book-cover" />
                </el-card>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { reactive, onMounted, watch, onUnmounted } from 'vue'
import { getMenuList, getBookList } from '@/apis/bookListApi'
import { useRouter } from 'vue-router'

const firstLevelTab = reactive({
  selectedTabName: '',
  tabs: []
})

const secondLevelTab = reactive({
  selectedTabName: '',
  tabs: []
})

const router = useRouter()

let currentRequestAbortController = null

onMounted(async () => {
  const menuList = await getMenuList()
  firstLevelTab.tabs = menuList
  firstLevelTab.selectedTabName = menuList[0].name
})

watch(() => firstLevelTab.selectedTabName, async (newTabName) => {
  const tabId = firstLevelTab.tabs.find(tab => tab.name === newTabName).id
  
  // 如果有未完成的请求，先取消
  if (currentRequestAbortController) {
    currentRequestAbortController.abort()
  }

  const abortController = new AbortController()
  currentRequestAbortController = abortController

  try {
    const bookList = await getBookList(tabId, abortController.signal)
    if (bookList.length > 0) {
      secondLevelTab.selectedTabName = bookList[0].name
      secondLevelTab.tabs = bookList
    }
  } catch (error) {
    if (error.name !== 'AbortError') {
      console.error('Failed to fetch book list:', error)
    }
  }
})

const onBookClick = (book) => {
  const onlineBookUrl = `${import.meta.env.VITE_APP_API_EBOOK_BASE_URL}${book.fileName}`
  const secretKey = book.secretKey
  router.push({
    name: 'digitalBook',
    query: { onlineBookUrl, secretKey }
  })
}

// 组件卸载时：
// 取消未完成的异步请求
// 移除事件监听器
// 清理定时器或动画
// 释放其他资源：如 WebSocket 连接、订阅等。
onUnmounted(() => {
  // 取消未完成的请求
  if (currentRequestAbortController) {
    currentRequestAbortController.abort()
  }
  
  // 清理状态
  currentRequestAbortController = null
})
</script>

<style scoped>
.container {
  padding: 10px;
}

.book-row {
  margin: 10px;
  display: flex;
  /* 允许项目在必要时换行 */
  flex-wrap: wrap;
  /* 项目从左到右排列 */
  justify-content: flex-start;
}

.book-item {
  width: 200px;
  /* 为右侧留出间距 */
  margin-right: 10px;
  /* 为下一行留出间距 */
  margin-bottom: 10px;
  transition: transform 0.3s;
}

.book-item:last-child {
  /* 最后一个项目不设置右边距 */
  margin-right: 0;
}

.book-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.book-cover {
  /* 确保高度为 100% */
  width: 100%;
  height: 100%;
  /* 保持图片比例并覆盖整个容器 */
  object-fit: cover;
}

/* 移除可能导致冲突的样式 */
.book-item ::v-deep(.el-card__body) {
  /* 移除默认内边距 */
  padding: 0;
}
</style>