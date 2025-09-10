<template>
  <!-- <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" /> -->
  <!-- <input :value="modelValue" @input="updateModelValue($event)" /> -->
  <input :value="modelValue" @input="event => updateModelValue(event)" />
</template>

<script>
  export default {
    props: ["modelValue"],
    emits: ["update:modelValue"],
    setup(props, { emit }) {
      return {
        updateModelValue(event) {
          emit("update:modelValue", event.target.value)
        },
      }
    },
  }
</script>

<!-- <template>
  <input v-model="value" />
</template>

<script>
  export default {
    props: ["modelValue"],
    emits: ["update:modelValue"],
    computed: {
      value: {
        get() {
          return this.modelValue
        },
        set(value) {
          this.$emit("update:modelValue", value)
        },
      },
    },
  }
</script>-->
