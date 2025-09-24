<template>
  <div class="container" :style="containerStyle" @click="onPlayAudio"></div>
</template>

<script setup>
  import { computed } from "vue"
  import { getFilePath } from "@/apis/digitalBookApi"

  const props = defineProps({
    clickReadModel: { type: Object, required: true },
    moduleName: { type: String, required: true },
    proportion: { type: Number, required: true },
  })

  const containerStyle = computed(() => {
    return {
      position: "absolute",
      left: props.clickReadModel.x * props.proportion + "px",
      top: props.clickReadModel.y * props.proportion + "px",
      width: props.clickReadModel.width * props.proportion + "px",
      height: props.clickReadModel.height * props.proportion + "px",
    }
  })

  /**
   * 播放音频
   */
  const onPlayAudio = () => {
    const audioUrl = getFilePath(props.clickReadModel.file, props.moduleName)
    const audio = new Audio(audioUrl)
    audio.play()
  }
</script>

<style scoped>
  .container {
    /* 默认样式可以根据需要添加 */
    position: absolute;
    background: yellow;
    border-color: yellow;
    border-radius: 2px;
    border-style: solid;
    border-width: 1px;
    z-index: 3;
  }

  .container:hover {
    background: rgba(41, 100, 255, 0.2);
    border-color: rgba(41, 100, 255, 0.2);
    cursor: pointer;
  }
</style>
