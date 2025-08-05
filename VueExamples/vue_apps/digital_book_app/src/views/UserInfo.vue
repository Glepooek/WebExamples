<template>
  <div class="container">
    <h1>
      <!-- 当前路由可以通过 $route 在模板中访问 -->
      User {{ $route.params.userId }}
    </h1>
    <h2>svgs</h2>
    <div style="display: flex;">
      <IconCommunity color="red" style="flex: 1;" />
      <IconDocumentation color="red" style="flex: 1;" />
      <IconEcosystem color="red" style="flex: 1;" />
      <IconSupport color="red" style="flex: 1;" />
      <IconTooling color="red" style="flex: 1;" />
    </div>

    <!-- 路由组件将渲染在这里 -->
    <router-view></router-view>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import IconCommunity from '../components/icons/IconCommunity.vue'
import IconDocumentation from '../components/icons/IconDocumentation.vue'
import IconEcosystem from '../components/icons/IconEcosystem.vue'
import IconSupport from '../components/icons/IconSupport.vue'
import IconTooling from '../components/icons/IconTooling.vue'

const route = useRoute()

// 监听路由参数变化
watch(() => route.params.userId, (newId, oldId) => {
  console.log('User changed from', oldId, 'to', newId)
}, { immediate: true })

// 使用导航守卫监听路由变化
// 没有执行
onBeforeRouteUpdate((to, from) => {
  console.log('Route updated from', from.params.userId, 'to', to.params.userId)
  // 确保阻止默认行为或者正确处理导航
  return true;
})
</script>

<style scoped>
.container {
  padding: 20px;
}

h1 {
  color: red;
}
</style>