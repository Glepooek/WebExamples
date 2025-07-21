<template>
  <div class="container">
    <el-tabs v-model="firstLevelTab.selectedTabName">
      <el-tab-pane v-for="item in firstLevelTab.tabs" :key="item.id" :label="item.name" :name="item.name">
        <el-tabs v-model="secondLevelTab.selectedTabName">
          <el-tab-pane v-for="item in secondLevelTab.tabs" :key="item.id" :label="item.name" :name="item.name">
            <el-card v-for="book in item.items" :key="book.bookTagId" style="max-width: 480px">
              <template #header>{{ book.showName }}</template>
              <img :src="book.cover" style="height: 100px;width: auto;" />
            </el-card>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { reactive, onMounted, watch } from 'vue'
import { getMenuList, getBookList } from '@/apis/bookListApi'

const firstLevelTab = reactive({
  selectedTabName: '',
  tabs: []
})

const secondLevelTab = reactive({
  selectedTabName: '',
  tabs: []
})

onMounted(async () => {
  const menuList = await getMenuList()
  firstLevelTab.tabs = menuList
  firstLevelTab.selectedTabName = menuList[0].name
})

// const onTabNameChange = async (tabName) => {
//   const tabId = menus.tabs.find(tab => tab.name === tabName).id
//   const bookList = await getBookList(tabId)
//   return bookList
// }

watch(() => firstLevelTab.selectedTabName, async (newTabName) => {
  const tabId = firstLevelTab.tabs.find(tab => tab.name === newTabName).id
  const bookList = await getBookList(tabId)
  if (bookList.length > 0) {
    secondLevelTab.selectedTabName = bookList[0].name
    secondLevelTab.tabs = bookList
  }
})
</script>

<style>
.container {
  padding: 10px;
}

.demo-tabs>.el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>