<template>
  <input type="text" :value="modelValue" @input="emitValue" />
</template>

<script>
  export default {
    props: {
      modelValue: String,
      modelModifiers: {
        default: () => [],
      },
    },
    emits: ["update:modelValue"],
    methods: {
      emitValue(event) {
        let value = event.target.value
        if (this.modelModifiers.capitalize) {
          value = value.charAt(0).toUpperCase() + value.slice(1)
        }
        this.$emit("update:modelValue", value)
      },
    },
    created() {
      console.log(this.modelModifiers) // []
    },
  }
</script>

<!-- <template>
  <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
  <input :value="modelValue" @input="updateModelValue($event)" />
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
</script> -->

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
