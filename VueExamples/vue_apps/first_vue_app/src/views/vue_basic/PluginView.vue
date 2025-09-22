<template>
  <div>
    <!-- <h1>{{ $translate("greetings.hello") }}</h1> -->
    <h1>{{ i18n.greetings.hello }}</h1>
  </div>
</template>

<script setup>
  import { inject } from "vue"

  const i18n = inject("i18n")
</script>
