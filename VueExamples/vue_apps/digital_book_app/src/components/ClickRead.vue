<template>
    <div class="click-read-container">
    </div>
</template>

<script setup> 
import { watch } from 'vue'
const props = defineProps({
    clickReadData: { type: Array, default: () => [] }
})

watch(() => props.clickReadData, (newValue) => { 
    console.log('clickReadData', newValue)
})

</script>

<style scoped>
</style>