<template>
  <div class="container">
    <el-tabs v-model="firstLevelTab.selectedTabName">
      <el-tab-pane v-for="item in firstLevelTab.tabs" :key="item.id" :label="item.name" :name="item.name">
        <el-tabs v-model="secondLevelTab.selectedTabName">
          <el-tab-pane v-for="item in secondLevelTab.tabs" :key="item.id" :label="item.name" :name="item.name">
            <div class="book-list-container">
              <div v-for="book in item.items" :key="book.bookTagId" class="book-item" @click="onBookClick(book)">
                <el-card>
                  <template #header>{{ book.showName }}</template>
                  <el-image :src="book.cover" />
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

let requestAbortController = null

onMounted(async () => {
  const menuList = await getMenuList()
  firstLevelTab.tabs = menuList
  firstLevelTab.selectedTabName = menuList[0].name
})

const unwatch = watch(() => firstLevelTab.selectedTabName, async (newTabName) => {
  const tabId = firstLevelTab.tabs.find(tab => tab.name === newTabName).id

  // 如果有未完成的请求，先取消
  if (requestAbortController) {
    requestAbortController.abort()
  }

  const abortController = new AbortController()
  requestAbortController = abortController

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
  const fileName = book.fileName
  const secretKey = book.secretKey
  router.push({
    name: 'digitalBook',
    params: { fileName, secretKey }
  })
}

// 组件卸载时：
// 取消未完成的异步请求
// 移除事件监听器
// 清理定时器或动画
// 释放其他资源：如 WebSocket 连接、订阅等。
onUnmounted(() => {
  unwatch()
  
  // 取消未完成的请求
  if (requestAbortController) {
    requestAbortController.abort()
  }

  // 清理状态
  requestAbortController = null
})
</script>

<style scoped>
.container {
  padding: 10px;
}

.book-list-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  column-gap: 10px;
  row-gap: 20px;
  overflow: visible;
}

.book-item {
  transition: transform 0.3s;
  cursor: pointer;
}

.book-item:hover {
  position: relative;
  z-index: 2;
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

/* 用深度选择器强制覆盖 */
:deep(.el-tabs__content),
:deep(.el-tab-pane) {
  overflow: visible !important;
}

/* 移除可能导致冲突的样式 */
.book-item ::v-deep(.el-card__body) {
  /* 移除默认内边距 */
  padding: 0;
}
</style>