<template>
  <div class="book-container">
    <div class="leftPage">
      <img v-if="!isTopCover" :src="leftPage.imgBase64" alt="">
    </div>
    <div class="rightPage">
      <img v-if="!isBottomCover" :src="rightPage.imgBase64" alt="">
    </div>
    <div class="rightToolbar"></div>
    <div class="bottomToolbar">
      <div class="left">
        <el-button type="primary" @click="returnBookList">
          <div class="button-content">
            <el-icon :size="25" color="#FFFFFF">
              <Back />
            </el-icon>
            <span class="button-text">返回</span>
          </div>
        </el-button>
      </div>
      <div class="center">
        <el-input v-model="fileName" type="text" style="margin: 0 0 0 10px;"></el-input>
      </div>
      <div class="right">
        <el-button type="primary" @click="gotoPreviousPage">
          <el-icon :size="20" color="#FFFFFF">
            <CaretLeft />
          </el-icon>
        </el-button>
        <span v-text="pageIndexStr"></span>
        <el-button type="primary" @click="gotoNextPage">
          <el-icon :size="20" color="#FFFFFF">
            <CaretRight />
          </el-icon>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { init, getDigitalBook, getDigitalBookPage } from '@/apis/digitalBookApi'
import { CaretLeft, CaretRight, Back } from '@element-plus/icons-vue'
import { debounce } from 'lodash'

const route = useRoute()
const router = useRouter()

const fileName = route.query.fileName
const secretKey = route.query.secretKey

const leftPage = ref({ background: {}, imgBase64: '' })
const rightPage = ref({ background: {}, imgBase64: '' })

let bookInfo = {}
let isTopCover = ref(false)
let isBottomCover = ref(false)
let pageIndexStr = ref('')
const currentIndex = ref(0)

// 返回列表页
const returnBookList = debounce(() => {
  router.push({ name: 'bookList' });
}, 500);

const gotoPreviousPage = debounce(() => {
  // 获取上一页
  if (currentIndex.value > 0) {
    currentIndexNumber.value -= 2;
  }
}, 500);

const gotoNextPage = debounce(() => {
  // 获取下一页
  if (bookInfo.pages && currentIndex.value < bookInfo.pages.length - 1) {
    currentIndexNumber.value += 2;
  }
}, 500);

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

  bookInfo = await getDigitalBook(fileName, secretKey)
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

});
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
  background: url('../assets/book_background.svg') center / cover no-repeat;
}

.leftPage {
  flex: 1;
  margin: 0 0 48px 80px;
  /* background-color: #d9db36; */
  display: flex;
  justify-content: right;
}

.rightPage {
  flex: 1;
  margin: 0 80px 48px 0;
  /* background-color: #c442ae; */
  display: flex;
  justify-content: left;
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
  grid-template-columns: 188px 1fr 217px;
  z-index: 2;
}

/* 提取共同样式 */
.bottomToolbar .left,
.bottomToolbar .center,
.bottomToolbar .right {
  display: flex;
  align-items: center;
  background-color: #14172B;
  opacity: 0.72;
  border-color: #90A3E1;
  border-radius: 4px;
  border-style: solid;
  border-width: 1px;
}

.bottomToolbar .left {
  justify-content: flex-start;
  padding: 6px;
}

.bottomToolbar .center {
  justify-content: center;
}

.bottomToolbar .right {
  justify-content: flex-end;
  padding: 0 12px;
}

.bottomToolbar .right .el-button {
  padding: 6px 9px;
  background-color: #1D419F;
  border-radius: 2px;
}

.bottomToolbar .right span {
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

.bottomToolbar .left .el-button {
  padding: 0;
  margin: 0;
  width: 56px;
  height: auto;
  background-color: transparent;
  border-color: transparent;
}

.bottomToolbar .left .el-button:hover {
  background-color: rgb(41, 100, 255, 0.5);
}

.bottomToolbar .left .el-button .el-icon+span {
  margin-left: 0 !important;
}

.button-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.button-text {
  margin-top: 4px;
  margin-bottom: 2px;
  font-size: 14px;
  color: #A9B2CB;
}
</style>