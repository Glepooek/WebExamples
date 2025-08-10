<template>
    <div class="container">
        <div class="header">
            <span class="title">目录</span>
            <div class="skip-page">
                <label for="page">跳转</label>
                <el-input 
                    id="page" 
                    v-model="pageNumber"
                    @keyup.enter="handlePageNumberEnter"
                />
                <label for="page">页</label>
            </div>
        </div>
        <div class="catalog-list">
            <div v-for="item in unnestedCatalogList" :key="item.id" 
                 class="catalog-item"
                 :class="{ 'catalog-item-indented': item.parentId }"
                 @click="handleCatalogItemClick(item)">
                <span class="catalog-title">
                  <svg-icon v-show="!item.parentId" icon-name="icon-mulu" icon-size="16px" />
                  {{ item.title }}
                </span>
                <span class="page-number">{{ item.pageName }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const props = defineProps({
    catalogList: { type: Array, default: () => [] }
})

const emit = defineEmits(['pageNumberEnter', 'catalogItemClick'])

const pageNumber = ref('')

const unnestedCatalogList = computed(() => {
  if (!props.catalogList) {
    return []
  }

  return props.catalogList.flatMap(item => {
    const result = [{
      id: item.bookTagId,
      parentId: '',
      title: item.title,
      pageName: item.pageName
    }]
    
    if (item.unitInfo) {
      item.unitInfo.forEach(unit => {
        result.push({
          id: unit.bookTagId,
          parentId: item.bookTagId,
          title: unit.title,
          pageName: unit.pageName
        })
      })
    }
    
    return result
  })
})

const handlePageNumberEnter = () => {
    // 校验输入的一定是数字
    if (/^\d+$/.test(pageNumber.value)) {
        emit('pageNumberEnter', pageNumber.value)
    }
    // 如果输入的不是纯数字或空值情况，则不触发事件
}

const handleCatalogItemClick = (item) => {
    emit('catalogItemClick', item)
}
</script>

<style scoped>
.container {
    width: 322px;
    height: 358px;    
    background: rgba(40, 47, 73, 0.95); /* #282f49 0.95 */
    border: 1px solid rgba(144, 163, 225, 0.4); /* #90a3e1 0.4 */

    display: flex;
    flex-direction: column;
}

.header {
    height: 56px;
    color: #A9B2CB;

    display: flex;
    justify-content: space-between;
    align-items: center;
}

.header .title {
    font-size: 17px;
    margin-left: 20px;
}

.header .skip-page {
    font-size: 12px;
    margin-right: 20px;
    
    display: flex;
    align-items: center;
}

.header .skip-page .el-input {
    width: 41px;
    height: 20px;
    margin: 0 4px;
}

.catalog-list {
  flex: 1;
  overflow-y: auto;
  padding: 0 20px;
}

/* 滚动条样式 */
.catalog-list::-webkit-scrollbar {
  width: 3px;
}

.catalog-list::-webkit-scrollbar-track {
  background: rgba(40, 47, 73, 0.5);
  border-radius: 3px;
}

.catalog-list::-webkit-scrollbar-thumb {
  background: #90A3E1;
  border-radius: 3px;
}

.catalog-list::-webkit-scrollbar-thumb:hover {
  background: #A9B2CB;
}

.catalog-item {
    padding: 12px 0;
    border-bottom: 1px solid rgba(144, 163, 225, 0.2);

    display: flex;
    justify-content: space-between;
    align-items: center; 
}

.catalog-item:hover {
    cursor: pointer;
    background: rgba(144, 163, 225, 0.1);
}

.catalog-item:last-child {
    border-bottom: none;
}

.catalog-item .catalog-title {
    font-size: 14px;
    color: #FFFFFF;
    flex: 1;
    margin-right: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    display: flex;
    align-items: center;
}

.catalog-item-indented .catalog-title {
    padding-left: 20px;
}

.catalog-item .page-number {
    font-size: 12px;
    color: #A9B2CB;
    min-width: fit-content;
}
</style>