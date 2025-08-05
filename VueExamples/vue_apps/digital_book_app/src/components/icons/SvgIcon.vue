<template>
  <div class="svg-container">
    <svg aria-hidden="true" :width="computedSize" :height="computedSize" :class="svgClass">
      <use :xlink:href="iconClassName" :fill="computedColor" />
    </svg>
    <span v-if="iconText" class="svg-text">
      {{ iconText }}
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  iconName: { type: String, required: true },
  iconText: { type: String, default: '' },
  size: { type: String, default: '1em' },
  color: { type: String, default: '#FFFFFF' },

  className: { type: String, default: '' }
})

const iconClassName = computed(() => `#${props.iconName}`)
const computedSize = computed(() => props.size)
const computedColor = computed(() => props.color || 'currentColor')
const svgClass = computed(() => props.className)
</script>

<style scoped>
.svg-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.svg-text {
  margin-top: 4px;
  margin-bottom: 2px;
  font-size: 14px;
  color: #A9B2CB;
}
</style>