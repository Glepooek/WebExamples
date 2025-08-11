<template>
    <div class="container" :style="containerStyle">
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 },
    width: { type: Number, default: 100 },
    height: { type: Number, default: 100 }
})

const containerStyle = computed(() => {
    return {
        position: 'absolute',
        left: props.x + 'px',
        top: props.y + 'px',
        width: props.width + 'px',
        height: props.height + 'px'
    }
})
</script>

<style scoped>
.container {
    /* 默认样式可以根据需要添加 */
    position: absolute;
    background: yellow;
    z-index: 3;
}

.container:hover {
    /* 悬停效果可以根据需要添加 */
    background: red;
    border-radius: 4px;
    border-style: solid;
    border-color: blue;
    cursor: pointer;
}
</style>