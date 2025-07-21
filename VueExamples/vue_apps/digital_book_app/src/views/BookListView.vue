<template>
  <div>
    <el-tabs v-model="menus.selectedTabName" class="demo" @tab-change="onTabNameChange">
      <el-tab-pane v-for="item in menus.tabs" :key="item.id" :label="item.name" :name="item.id">
        <!-- <el-row>
          <el-col v-for="book in bookList" :key="book.id" :span="6">
            <el-card shadow="never">
              <img :src="book.cover" class="image" />
              <div class="book-info"></div>
            </el-card>
          </el-col>
        </el-row> -->
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { getMenuList, getBookList } from '@/apis/bookListApi'

const menus = reactive({
  selectedTabName: '',
  tabs: []
})

onMounted(async () => {
  const menuList = await getMenuList()
  menus.tabs = menuList
  menus.selectedTabName = menuList[0].id
})

const onTabNameChange = async (tabName) => {
  const tabId = menus.tabs.find(tab => tab.tabName === tabName).id
  const bookList = await getBookList(tabId)
  return bookList
}

</script>

<style>
.demo-tabs>.el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
