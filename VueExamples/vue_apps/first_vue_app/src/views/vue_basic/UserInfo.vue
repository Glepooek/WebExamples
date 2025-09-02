<template>
  <main>
    <span>User Info for User</span>
    <div class="demo">
      <button
        v-for="(_, tab) in tabs"
        :key="tab"
        :class="['tab-button', { active: currentTab === tab }]"
        @click="currentTab = tab"
      >
        {{ tab }}
      </button>
      <component :is="tabs[currentTab]"></component>
    </div>
  </main>
</template>

<script setup>
  import { ref } from "vue"
  import UserPosts from "./UserPosts.vue"
  import UserProfile from "./UserProfile.vue"

  const tabs = ref({
    UserProfile,
    UserPosts,
  })

  const currentTab = ref("UserProfile")
</script>

<style>
  .demo {
    font-family: sans-serif;
    margin-top: 1em;
    margin-bottom: 40px;
    user-select: none;
    overflow-x: auto;
  }

  .tab-button {
    padding: 6px 10px;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    border: 1px solid #ccc;
    cursor: pointer;
    background: #f0f0f0;
    margin-bottom: -1px;
    margin-right: -1px;
  }
  .tab-button:hover {
    background: #e0e0e0;
  }
  .tab-button.active {
    background: #e0e0e0;
  }
  .tab {
    border: 1px solid #ccc;
    padding: 10px;
  }
</style>
