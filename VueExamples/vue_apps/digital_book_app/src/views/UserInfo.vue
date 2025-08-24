<template>
  <div class="container">
    <h1>
      <!-- 当前路由可以通过 $route 在模板中访问 -->
      <!-- User {{ $route.params.userId }} -->
      User {{ userId }}
    </h1>

    <!-- 路由组件将渲染在这里 -->
    <router-view></router-view>
  </div>
</template>

<script setup>
  import { onBeforeRouteUpdate } from "vue-router"

  defineProps({
    userId: {
      type: String,
      required: true,
    },
  })

  // 使用导航守卫监听路由变化
  // 没有执行
  onBeforeRouteUpdate((to, from) => {
    console.log("Route updated from", from.params.userId, "to", to.params.userId)
    // 确保阻止默认行为或者正确处理导航
    return true
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
