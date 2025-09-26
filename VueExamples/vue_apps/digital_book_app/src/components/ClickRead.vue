<template>
  <div
    ref="containerRef"
    :class="['container', activeCids.includes(clickReadModel.cid) ? 'active' : '']"
    :style="containerStyle"
    @click="onPlayAudio"
    @mouseover="onMouseOver"
    @mouseout="onMouseOut"
  ></div>
</template>

<script setup>
  import { computed, ref, onMounted, watch, nextTick, onBeforeUnmount } from "vue"
  import { getFilePath } from "@/apis/digitalBookApi"

  // 定义属性
  const props = defineProps({
    clickReadModel: { type: Object, required: true },
    moduleName: { type: String, required: true },
    proportion: { type: Number, required: true },
    activeCids: { type: Array, required: true },
  })

  // 定义事件
  const emits = defineEmits(["onMouseOver", "onMouseOut", "onPlayAudio"])

  /**
   * 当鼠标移入点读区域时，获取该点读区域所有关联区域的Id, 并触发onMouseOver事件
   */
  const onMouseOver = () => {
    if (!props.clickReadModel || !props.clickReadModel.relatedIds || props.clickReadModel.relatedIds.length === 0) {
      return
    }

    let array = []
    props.clickReadModel.relatedIds.forEach(relatedId => {
      relatedId.marks.forEach(mark => {
        array.push(mark.markId)
      })
    })

    emits("onMouseOver", array)
  }

  /**
   * 当鼠标移出点读区域时，触发onMouseOut事件
   */
  const onMouseOut = () => {
    emits("onMouseOut")
  }

  /**
   * 当点击点读区域时，触发onPlayAudio事件
   */
  const onPlayAudio = () => {
    const audioUrl = getFilePath(props.clickReadModel.file, props.moduleName)
    emits("onPlayAudio", audioUrl)
  }

  const containerRef = ref(null)
  const imgOffset = ref({ x: 0, y: 0 })

  const calcImgOffset = () => {
    const el = containerRef.value
    if (!el || !el.parentElement) return
    const parent = el.parentElement
    const img = parent.querySelector("img")
    if (!img) {
      imgOffset.value = { x: 0, y: 0 }
      return
    }

    // Use bounding rects to be safe (handles transforms)
    const parentRect = parent.getBoundingClientRect()
    const imgRect = img.getBoundingClientRect()
    imgOffset.value = {
      x: Math.round(imgRect.left - parentRect.left),
      y: Math.round(imgRect.top - parentRect.top),
    }
  }

  onMounted(() => {
    // initial calc
    nextTick(calcImgOffset)

    // watch for image load inside parent
    const el = containerRef.value
    if (el && el.parentElement) {
      const img = el.parentElement.querySelector("img")
      if (img) {
        img.addEventListener("load", calcImgOffset)
      }
    }
  })

  // recalc when proportion or clickReadModel changes
  watch(
    () => props.proportion,
    () => {
      nextTick(calcImgOffset)
    }
  )

  // Also watch for model changes (in case different image replaced)
  watch(
    () => props.clickReadModel,
    () => {
      nextTick(calcImgOffset)
    }
  )

  // cleanup
  onBeforeUnmount(() => {
    const el = containerRef.value
    if (el && el.parentElement) {
      const img = el.parentElement.querySelector("img")
      if (img) img.removeEventListener("load", calcImgOffset)
    }
  })

  const containerStyle = computed(() => {
    const baseLeft = (props.clickReadModel.x || 0) * (props.proportion || 1)
    const baseTop = (props.clickReadModel.y || 0) * (props.proportion || 1)
    const width = (props.clickReadModel.width || 0) * (props.proportion || 1)
    const height = (props.clickReadModel.height || 0) * (props.proportion || 1)

    const left = imgOffset.value.x + baseLeft
    const top = imgOffset.value.y + baseTop

    return {
      position: "absolute",
      left: left + "px",
      top: top + "px",
      width: width + "px",
      height: height + "px",
    }
  })
</script>

<style scoped>
  .container {
    /* 默认样式可以根据需要添加 */
    background: transparent;
    border-color: transparent;
    border-radius: 2px;
    border-style: solid;
    border-width: 1px;
    z-index: 3;
  }

  .container:hover,
  .container.active {
    background: rgba(41, 100, 255, 0.2);
    border-color: rgba(41, 100, 255, 0.2);
    cursor: pointer;
  }
</style>
