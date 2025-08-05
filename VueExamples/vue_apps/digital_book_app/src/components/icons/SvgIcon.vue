<template>
  <div class="svg-container" :style="containerStyle">
    <svg 
      aria-hidden="true" 
      :width="computedSize" 
      :height="computedSize"
      :style="svgStyle"
      :class="svgClass" 
    >
      <use :xlink:href="iconClassName" :fill="computedColor" />
    </svg>
    <span 
      v-if="iconText" 
      class="svg-text"
      :style="textStyle"
    >
      {{ iconText }}
    </span>
  </div>
</template>

<script setup>
// `defineProps` is a compiler macro and no longer needs to be imported.
import { computed } from 'vue'

const props = defineProps({
  iconName: { type: String, required: true },
  iconText: { type: String, default: '' },
  className: { type: String, default: '' },
  size: { type: String, default: '1em' },
  color: { type: String, default: '#FFFFFF' },

  svgStyle: { type: Object, default: () => ({}) },
  containerStyle: { type: Object, default: () => ({}) },
  textStyle: { type: Object, default: () => ({}) }
})

const iconClassName = computed(() => `#${props.iconName}`)
const computedSize = computed(() => props.size)
const computedColor = computed(() => props.color || 'currentColor')
const svgClass = computed(() => {
  const classes = ['svg-icon']
  if (props.className) {
    classes.push(props.className)
  }
  return classes.join(' ')
})
</script>

<style scoped>
.svg-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.svg-icon {
  position: relative;
  fill: currentColor;
  vertical-align: -2px;
}

.svg-text {
  margin-top: 4px;
  margin-bottom: 2px;
  font-size: 12px;
  color: #A9B2CB;
}
</style>