<template>
    <svg :class="svgClass" aria-hidden="true">
        <use :xlink:href="iconClassName" :fill="color" />
    </svg>
</template>

<script setup>
import { computed, defineProps } from 'vue'

const props = defineProps({
    iconName: { type: String, required: true },
    className: { type: String, default: '' },
    color: { type: String, default: '#FFFFFF' }
});

const iconClassName = computed(() => `#${props.iconName}`);
const svgClass = computed(() => props.className ? `svg-icon ${props.className}` : 'svg-icon');
</script>

<style scoped>
.svg-icon {
    width: 1em;
    height: 1em;
    position: relative;
    fill: currentColor;
    vertical-align: -2px;
}
</style>