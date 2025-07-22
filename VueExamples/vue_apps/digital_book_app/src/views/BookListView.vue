<template>
  <div class="container">
    <el-tabs v-model="firstLevelTab.selectedTabName">
      <el-tab-pane v-for="item in firstLevelTab.tabs" :key="item.id" :label="item.name" :name="item.name">
        <el-tabs v-model="secondLevelTab.selectedTabName">
          <el-tab-pane v-for="item in secondLevelTab.tabs" :key="item.id" :label="item.name" :name="item.name">
            <el-row class="book-row">
              <el-col v-for="book in item.items" :key="book.bookTagId" :span="3">
                <el-card class="book-item" @click="onBookClick(book)">
                  <template #header>{{ book.showName }}</template>
                  <el-image :src="book.cover" class="book-cover" />
                </el-card>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { reactive, onMounted, watch } from 'vue'
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

onMounted(async () => {
  const menuList = await getMenuList()
  firstLevelTab.tabs = menuList
  firstLevelTab.selectedTabName = menuList[0].name
})

watch(() => firstLevelTab.selectedTabName, async (newTabName) => {
  const tabId = firstLevelTab.tabs.find(tab => tab.name === newTabName).id
  const bookList = await getBookList(tabId)
  if (bookList.length > 0) {
    secondLevelTab.selectedTabName = bookList[0].name
    secondLevelTab.tabs = bookList
  }
})

const onBookClick = (book) => {
  const onlineBookUrl = `${import.meta.env.VITE_APP_API_EBOOK_BASE_URL}${book.fileName}`
  const secretKey = book.secretKey
  router.push({
    name: 'digitalBook',
    query: { onlineBookUrl, secretKey }
  });
}
</script>

<style scoped>
.book-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.book-item {
  width: 166px;
  height: 299px;
  flex: 0 0 auto;
  margin-bottom: 20px; /* 为换行留出空间 */
  transition: transform 0.3s;
}

.book-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

/* 优化书籍封面图片样式 */
.book-cover {
  width: 100%;
  height: 100%; /* 确保高度为 100% */
  object-fit: cover; /* 保持图片比例并覆盖整个容器 */
}

/* 移除可能导致冲突的样式 */
.book-item .el-card__body {
  padding: 0; /* 移除默认内边距 */
}
</style>