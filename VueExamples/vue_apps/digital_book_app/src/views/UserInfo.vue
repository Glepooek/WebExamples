<template>
  <div class="container">
    <h1>
      <!-- 当前路由可以通过 $route 在模板中访问 -->
      User {{ $route.params.userId }}
    </h1>
    <!-- 路由组件将渲染在这里 -->
    <router-view></router-view>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'

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