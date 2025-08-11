<template>
  <div class="book-container">
    <div class="leftPage">
      <img v-if="!isTopCover" :src="leftPage.imgBase64" alt="">
      <ClickRead
        v-for="item in leftPage.pageModel.clickRead" 
        :key="item.id"
        :x="item.x" 
        :y="item.y" 
        :width="item.width" 
        :height="item.height" />
    </div>
    <div class="rightPage">
      <img v-if="!isBottomCover" :src="rightPage.imgBase64" alt="">
      <ClickRead
        v-for="item in rightPage.pageModel.clickRead" 
        :key="item.id"
        :x="item.x" 
        :y="item.y" 
        :width="item.width" 
        :height="item.height" />
    </div>
    <div class="rightToolbar"></div>
    <div class="bottomToolbar">
      <div class="left">
        <el-button type="primary" @click="returnBookList">
          <svg-icon icon-name="icon-tuichu" icon-text="返回" />
        </el-button>
        <div class="vertical-line" style="margin: 0 4px;"></div>
        <el-button type="primary">
          <svg-icon icon-name="icon-danye" icon-text="单页" />
        </el-button>
      </div>
      <div class="center">
        <el-button type="primary">
          <svg-icon icon-name="icon-xuanze" icon-text="选择" />
        </el-button>
        <el-button type="primary">
          <svg-icon icon-name="icon-huabi" icon-text="画笔" />
        </el-button>
        <el-button type="primary">
          <svg-icon icon-name="icon-xiangpi1" icon-text="橡皮" />
        </el-button>
        <el-button type="primary">
          <svg-icon icon-name="icon-qingchu" icon-text="清除" />
        </el-button>
        <el-button type="primary">
          <svg-icon icon-name="icon-fangdajing" icon-text="放大镜" />
        </el-button>
        <el-button type="primary">
          <svg-icon icon-name="icon-jubugaoliang" icon-text="局部高亮" />
        </el-button>
        <el-button type="primary">
          <svg-icon icon-name="icon-jubuzhedang" icon-text="局部遮挡" />
        </el-button>
        <el-button type="primary">
          <svg-icon icon-name="icon-cibiao" icon-text="词表" />
        </el-button>
        <el-button type="primary">
          <svg-icon icon-name="icon-gengduo" icon-text="更多" />
        </el-button>
      </div>
      <div class="right">
        <el-button ref="buttonRef" v-click-outside="onClickOutside" type="primary">
          <svg-icon icon-name="icon-mulu1" icon-text="目录" />
        </el-button>
        <div class="vertical-line"></div>
        <el-button type="primary" class="el-button-switch" @click="gotoPreviousPage">
          <el-icon :size="20" color="#FFFFFF">
            <CaretLeft />
          </el-icon>
        </el-button>
        <span class="span-page-number-str" v-text="pageIndexStr"></span>
        <el-button type="primary" class="el-button-switch" @click="gotoNextPage">
          <el-icon :size="20" color="#FFFFFF">
            <CaretRight />
          </el-icon>
        </el-button>
      </div>
    </div>
  </div>

  <el-popover ref="popoverRef" 
    v-model:visible="isCatalogVisible" 
    :virtual-ref="buttonRef" 
    trigger="click"
    placement="top" 
    width="auto" 
    virtual-triggering>
    <BookCatalog :catalog-list="bookInfo.catalog" 
      @page-number-enter="handlePageNumber"
      @catalog-item-click="handleCatalogItemClick"></BookCatalog>
  </el-popover>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, unref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { init, getDigitalBook, getDigitalBookPage } from '@/apis/digitalBookApi'
import { debounce } from 'es-toolkit'
import { CaretLeft, CaretRight } from '@element-plus/icons-vue'
import { ClickOutside as vClickOutside } from 'element-plus'
import BookCatalog from '@/components/BookCatalog.vue'
import ClickRead from '@/components/ClickRead.vue'

const route = useRoute()
const router = useRouter()

const fileName = route.params.fileName
const secretKey = route.params.secretKey

let bookInfo = {}

const leftPage = ref({ pageModel: {}, imgBase64: '' })
const rightPage = ref({ pageModel: {}, imgBase64: '' })
const isTopCover = ref(false)
const isBottomCover = ref(false)
const pageIndexStr = ref('')
const isCatalogVisible = ref(false)
const currentIndex = ref(0)

// 返回列表页
const returnBookList = debounce(() => {
  router.push({ name: 'bookList' });
}, 300);

// 获取上一页
const gotoPreviousPage = debounce(() => {
  currentIndexNumber.value -= 2;
}, 300);

// 获取下一页
const gotoNextPage = debounce(() => {
  currentIndexNumber.value += 2;
}, 300);

// 通过输入页码跳转
const handlePageNumber = pageName => {
  isCatalogVisible.value = false;
  const pageIndex = bookInfo.pages.findIndex(item => item.pageName === pageName)
  currentIndexNumber.value = pageIndex;
}

// 通过目录点击跳转
const handleCatalogItemClick = catalogInfo => {
  isCatalogVisible.value = false;
  const pageIndex = bookInfo.pages.findIndex(item => item.pageName === catalogInfo.pageName)
  currentIndexNumber.value = pageIndex;
};

// book.pages数组下标索引
const currentIndexNumber = computed({
  get() {
    return currentIndex.value
  },
  set(index) {
    if (!bookInfo.pages) return;

    if (index < 0) {
      index = 0;
    }

    if (index >= bookInfo.pages.length) {
      index = bookInfo.pages.length - 1;
    }

    // 更新当前索引
    currentIndex.value = index;

    // 双页
    isTopCover.value = index === 0;
    isBottomCover.value = index === bookInfo.pages.length - 1;

    // 判断index左右
    // - 0
    // 1 2
    // 3 4
    let left = 0;
    let right = 0;
    if (index === 0 || index % 2 === 0) {
      // 右
      left = index - 1;
      right = index;
    }
    else {
      // 左
      left = index;
      right = index + 1;
    }

    // 清空页码显示
    pageIndexStr.value = '';

    // 首页不显示左
    if (!isTopCover.value && left >= 0) {
      const leftPageIndex = bookInfo.pages[left];
      pageIndexStr.value = leftPageIndex.pageName;
      getDigitalBookPage(leftPageIndex).then(page => {
        leftPage.value = page;
      });
    }

    // 底页不显示右
    if (!isBottomCover.value && right < bookInfo.pages.length) {
      const rightPageIndex = bookInfo.pages[right];
      pageIndexStr.value = !pageIndexStr.value ? rightPageIndex.pageName : `${pageIndexStr.value}-${rightPageIndex.pageName}`;
      getDigitalBookPage(rightPageIndex).then(page => {
        rightPage.value = page;
      });
    }
  }
})

onMounted(async () => {
  init(`${import.meta.env.VITE_APP_API_EBOOK_BASE_URL}${fileName}/`, fileName, secretKey)

  bookInfo = await getDigitalBook()
  currentIndexNumber.value = 0
});

// 组件卸载时：
// 取消未完成的异步请求
// 移除事件监听器
// 清理定时器或动画
// 释放其他资源：如 WebSocket 连接、订阅等。
onUnmounted(() => {

  // 清理响应式数据引用
  bookInfo = null;
  leftPage.value = null;
  rightPage.value = null;

  // 重置ref值
  isTopCover.value = false;
  isBottomCover.value = false;
  pageIndexStr.value = '';
  currentIndex.value = 0;
  isCatalogVisible.value = false;

});

const buttonRef = ref()
const popoverRef = ref()
const onClickOutside = () => {
  unref(popoverRef).popperRef?.delayHide?.()
}
</script>

<style scoped>
.book-container {
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #4257C4 0%, #4C90E6 100%);
  display: flex;
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

.leftPage {
  flex: 1;
  margin: 0 0 48px 80px;
  /* background-color: #d9db36; */
  display: flex;
  justify-content: right;
  position: relative;
  overflow: hidden;
}

.rightPage {
  flex: 1;
  margin: 0 80px 48px 0;
  /* background-color: #c442ae; */
  display: flex;
  justify-content: left;
  position: relative;
  overflow: hidden;
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
  background: rgba(226, 8, 8, 0.39);
  z-index: 2;
}

.bottomToolbar {
  position: absolute;
  bottom: 6px;
  left: 12px;
  right: 12px;
  width: calc(100% - 24px);
  height: 58px;
  /* background: rgba(16, 207, 48, 0.336); */
  display: grid;
  grid-template-columns: auto repeat(3, minmax(auto, 1fr)) auto;
  z-index: 2;
}

.bottomToolbar .el-button {
  padding: 0;
  margin: 0 4px 0 0;
  width: 56px;
  height: auto;
  background-color: transparent;
  border-color: transparent;
}

.bottomToolbar .el-button:hover {
  background-color: rgb(41, 100, 255, 0.5);
}

.bottomToolbar .el-button .el-icon+span {
  margin-left: 0 !important;
}

.bottomToolbar .left {
  grid-column: 1 / 2;
}

.bottomToolbar .center {
  grid-column: 3 / 4;
}

.bottomToolbar .right {
  grid-column: 5 / 6;
}

/* 提取共同样式 */
.bottomToolbar .left,
.bottomToolbar .center,
.bottomToolbar .right {
  display: flex;
  align-items: center;
  justify-content: flex-start;

  padding: 6px;
  background-color: #14172B;
  opacity: 0.72;
  border-color: #90A3E1;
  border-radius: 4px;
  border-style: solid;
  border-width: 1px;
}

/*
 * 上一页、下一页按钮样式
 */
.bottomToolbar .right .el-button-switch {
  padding: 6px 9px;
  background-color: #1D419F;
  border-radius: 2px;
  width: auto;
  height: auto;
  margin: 0;
}

/*
 * 页码文本（如：9-10）样式
 */
.bottomToolbar .right .span-page-number-str {
  margin: 0 5px;
  padding: 4px 9px;
  background-color: #FFFFFF;
  border-color: #3D4663;
  border-style: solid;
  border-width: 1px;
  border-radius: 2px;
  font-size: 14px;
  font-weight: 600;
  color: #1A1E2B;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
}

/*
 * 竖线样式。底部工具栏分割功能区 
 */
.vertical-line {
  width: 0px;
  height: 36px;
  background: rgba(216, 216, 216, 0.01);
  border: 1px solid #4861AA;
  opacity: 0.5;
  margin: 0 13px 0 4px;
}
</style>