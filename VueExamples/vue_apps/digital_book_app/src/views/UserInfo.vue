<template>
    <div>
    <!-- 当前路由可以通过 $route 在模板中访问 -->
    User {{ $route.params.userId }}
  </div>
</template>

<script setup>
    import { watch } from 'vue'
    import { useRoute, onBeforeRouteUpdate } from 'vue-router'

    const route = useRoute()

    watch(() => route.params.userId, (newId, oldId) => {
      console.log('User', newId)
      console.log('User', oldId)
    })

    onBeforeRouteUpdate((to, from) => {
      console.log('User', to.params.userId)
      console.log('User', from.params.userId)
    })
</script>