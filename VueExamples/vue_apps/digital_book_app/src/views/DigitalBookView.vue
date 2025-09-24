<template>
  <div ref="bookContainer" class="book-container">
    <div ref="bookContentRef" class="book-content">
      <div class="leftPage">
        <img v-if="!isTopCover" :src="leftPage.imgBase64" alt="" />
        <ClickRead
          v-for="item in leftPage.pageModel.clickRead"
          :key="item.id"
          :click-read-model="item"
          :module-name="leftPage.moduleName"
          :proportion="proportion"
        />
      </div>
      <div class="rightPage">
        <img v-if="!isBottomCover" :src="rightPage.imgBase64" alt="" />
        <ClickRead
          v-for="item in rightPage.pageModel.clickRead"
          :key="item.id"
          :click-read-model="item"
          :module-name="leftPage.moduleName"
          :proportion="proportion"
        />
      </div>
    </div>

    <div class="rightToolbar"></div>
    <div class="bottomToolbar">
      <div class="left">
        <el-button type="primary" @click="returnBookList">
          <svg-icon icon-name="icon-tuichu" icon-text="返回" />
        </el-button>
        <div class="vertical-line" style="margin: 0 4px"></div>
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
        <span class="page-number-str" v-text="pageIndexStr"></span>
        <el-button type="primary" class="el-button-switch" @click="gotoNextPage">
          <el-icon :size="20" color="#FFFFFF">
            <CaretRight />
          </el-icon>
        </el-button>
      </div>
    </div>
  </div>

  <el-popover
    ref="popoverRef"
    v-model:visible="isCatalogVisible"
    :virtual-ref="buttonRef"
    trigger="click"
    placement="top"
    width="auto"
    virtual-triggering
  >
    <BookCatalog
      :catalog-list="bookInfo.catalog"
      @page-number-enter="handlePageNumber"
      @catalog-item-click="handleCatalogItemClick"
    ></BookCatalog>
  </el-popover>
</template>

<script setup>
  import { watch, onMounted, onUnmounted, ref, unref } from "vue"
  import { useRoute, useRouter } from "vue-router"
  import { init, getDigitalBook, getDigitalBookPage } from "@/apis/digitalBookApi"
  import { debounce } from "es-toolkit"
  import { CaretLeft, CaretRight } from "@element-plus/icons-vue"
  import { ClickOutside as vClickOutside } from "element-plus"
  import BookCatalog from "@/components/BookCatalog.vue"
  import ClickRead from "@/components/ClickRead.vue"

  const route = useRoute()
  const router = useRouter()

  const fileName = route.params.fileName
  const secretKey = route.params.secretKey

  let bookInfo = {}

  const leftPage = ref({ pageModel: {}, imgBase64: "", moduleName: "" })
  const rightPage = ref({ pageModel: {}, imgBase64: "", moduleName: "" })
  const isTopCover = ref(false)
  const isBottomCover = ref(false)
  const pageIndexStr = ref("")
  const isCatalogVisible = ref(false)
  const currentIndex = ref(-1)

  const bookWidth = ref(0)
  const bookHeight = ref(0)

  const bookContainer = ref(null)
  const bookContentRef = ref(null)
  const proportion = ref(1)

  // 返回列表页
  const returnBookList = debounce(() => {
    router.push({ name: "bookList" })
  }, 300)

  // 获取上一页
  const gotoPreviousPage = debounce(() => {
    currentIndex.value -= 2
  }, 300)

  // 获取下一页
  const gotoNextPage = debounce(() => {
    currentIndex.value += 2
  }, 300)

  // 通过输入页码跳转
  const handlePageNumber = pageName => {
    isCatalogVisible.value = false
    const pageIndex = bookInfo.pages.findIndex(item => item.pageName === pageName)
    currentIndex.value = pageIndex
  }

  // 通过目录点击跳转
  const handleCatalogItemClick = catalogInfo => {
    isCatalogVisible.value = false
    const pageIndex = bookInfo.pages.findIndex(item => item.pageName === catalogInfo.pageName)
    currentIndex.value = pageIndex
  }

  // book.pages数组下标索引
  watch(currentIndex, newIndex => {
    if (!bookInfo.pages) return

    if (newIndex < 0) {
      newIndex = 0
    }

    if (newIndex >= bookInfo.pages.length) {
      newIndex = bookInfo.pages.length - 1
    }

    // 双页
    isTopCover.value = newIndex === 0
    isBottomCover.value = newIndex === bookInfo.pages.length - 1

    // 判断index左右
    // - 0
    // 1 2
    // 3 4
    let left = 0
    let right = 0
    if (newIndex === 0 || newIndex % 2 === 0) {
      // 右
      left = newIndex - 1
      right = newIndex
    } else {
      // 左
      left = newIndex
      right = newIndex + 1
    }

    // 清空页码显示
    pageIndexStr.value = ""

    // 首页不显示左
    if (!isTopCover.value && left >= 0) {
      const leftPageIndex = bookInfo.pages[left]
      pageIndexStr.value = leftPageIndex.pageName
      getDigitalBookPage(leftPageIndex).then(page => {
        leftPage.value = {
          pageModel: page.pageModel || {},
          imgBase64: page.imgBase64 || "",
          moduleName: leftPageIndex.moduleName || "",
        }
      })
    }

    // 底页不显示右
    if (!isBottomCover.value && right < bookInfo.pages.length) {
      const rightPageIndex = bookInfo.pages[right]
      pageIndexStr.value = !pageIndexStr.value
        ? rightPageIndex.pageName
        : `${pageIndexStr.value}-${rightPageIndex.pageName}`
      getDigitalBookPage(rightPageIndex).then(page => {
        rightPage.value = {
          pageModel: page.pageModel || {},
          imgBase64: page.imgBase64 || "",
          moduleName: rightPageIndex.moduleName || "",
        }
      })
    }
  })

  onMounted(async () => {
    init(`${import.meta.env.VITE_APP_API_EBOOK_BASE_URL}${fileName}/`, fileName, secretKey)

    bookInfo = await getDigitalBook()
    bookWidth.value = bookInfo.width
    bookHeight.value = bookInfo.height
    calculationProportion()
    currentIndex.value = 0
  })

  // 计算缩放比
  const calculationProportion = () => {
    console.log("---", bookContainer.value)
    const boxWidth = bookContainer.value.offsetWidth / 2 // 除2是因为要放两页
    const boxHeight = bookContainer.value.offsetHeight
    if (boxWidth / boxHeight > bookWidth.value / bookHeight.value) {
      proportion.value = boxHeight / bookHeight.value
      bookContentRef.value.style.width = `${bookWidth.value * 2 * proportion.value}px`
      bookContentRef.value.style.height = "100%"
    } else {
      proportion.value = boxWidth / bookWidth.value
      bookContentRef.value.style.height = `${bookHeight.value * proportion.value}px`
      bookContentRef.value.style.width = "100%"
    }
    console.log("---", proportion.value)
  }

  // 监听窗口大小变化事件
  window.addEventListener("resize", calculationProportion)

  // 组件卸载时：
  // 取消未完成的异步请求
  // 移除事件监听器
  // 清理定时器或动画
  // 释放其他资源：如 WebSocket 连接、订阅等。
  onUnmounted(() => {
    // 清理响应式数据引用
    bookInfo = null
    leftPage.value = null
    rightPage.value = null

    // 重置ref值
    isTopCover.value = false
    isBottomCover.value = false
    pageIndexStr.value = ""
    currentIndex.value = 0
    isCatalogVisible.value = false
  })

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
    background: linear-gradient(90deg, #4257c4 0%, #4c90e6 100%);
    display: flex;
    justify-content: center;
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

  .book-content {
    display: flex;
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

  .bottomToolbar .el-button .el-icon + span {
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
    background-color: #14172b;
    opacity: 0.72;
    border-color: #90a3e1;
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
  }

  /*
 * 上一页、下一页按钮样式
 */
  .bottomToolbar .right .el-button-switch {
    padding: 6px 9px;
    background-color: #1d419f;
    border-radius: 2px;
    width: auto;
    height: auto;
    margin: 0;
  }

  /*
 * 页码文本（如：9-10）样式
 */
  .bottomToolbar .right .page-number-str {
    margin: 0 4px;
    padding: 5px;
    width: 62px;
    text-align: center;
    background-color: #ffffff;
    border-color: #3d4663;
    border-style: solid;
    border-width: 1px;
    border-radius: 2px;
    font-size: 14px;
    font-weight: 600;
    color: #1a1e2b;
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
    border: 1px solid #4861aa;
    opacity: 0.5;
    margin: 0 13px 0 4px;
  }
</style>
