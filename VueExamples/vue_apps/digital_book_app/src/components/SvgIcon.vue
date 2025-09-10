<template>
  <div class="svg-container">
    <svg class="svg-icon" aria-hidden="true" >
      <use :xlink:href="computedIconName" />
    </svg>
    <span v-if="iconText" class="svg-text">
      {{ iconText }}
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  iconName: {
    type: String,
    required: true
  },
  iconText: {
    type: String,
    default: ''
  },
  iconSize: {
    type: String,
    default: '1.5rem'
  },
  fontSize: {
    type: String,
    default: '14px'
  },
  color: {
    type: String,
    default: '#A9B2CB'
  },
  hoverColor: {
    type: String,
    default: '#fff'
  },
})

const computedIconName = computed(() => `#${props.iconName}`)

</script>

<style scoped>
.svg-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.svg-icon {
  width: v-bind(iconSize);
  height: v-bind(iconSize);
  fill: v-bind(color);
}

.svg-text {
  margin-top: 4px;
  margin-bottom: 2px;
  font-size: v-bind(fontSize);
  color: v-bind(color);
}

.svg-container:hover .svg-icon {
  fill: v-bind('hoverColor || color');
}

.svg-container:hover .svg-text {
  color: v-bind('hoverColor || color');
}
</style>