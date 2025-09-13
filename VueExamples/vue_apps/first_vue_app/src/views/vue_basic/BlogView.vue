<template>
  <div :style="{ fontSize: postFontSize + 'px' }">
    <BlogPost
      v-for="post in posts"
      :key="post.id"
      :id="post.id"
      :title="post.title"
      @enlarge-text="postFontSize = postFontSize + 2"
      ref="blogPosts"
      class="active"
    />
    <AlertBox> Something good happened.</AlertBox>

    <MouseTracker v-slot="slotProps">
      <p>Mouse position: {{ slotProps.x }}, {{ slotProps.y }}</p>
    </MouseTracker>

    <FancyList :api-url="url" :per-page="10">
      <template #item="{ body, username, likes }">
        <div class="item">
          <p>{{ body }}</p>
          <p class="meta">by {{ username }} | {{ likes }} likes</p>
        </div>
      </template>
    </FancyList>
  </div>
</template>

<script setup>
  import { ref, onMounted, useTemplateRef } from "vue"
  import BlogPost from "@/components/BlogPost.vue"
  import AlertBox from "@/components/AlertBox.vue"
  import MouseTracker from "@/components/MouseTracker.vue"
  import FancyList from "@/components/FancyList.vue"

  const posts = ref([
    { id: "1", title: "First Post" },
    { id: "2", title: "Second Post" },
    { id: "3", title: "Third Post" },
  ])

  const postFontSize = ref(16)
  const blogPostsRef = useTemplateRef("blogPosts")

  onMounted(() => {
    console.log(blogPostsRef.value[0].emit)
  })
</script>

<style>
  .active {
    color: red;
  }

  .meta {
    font-size: 0.8em;
    color: #42b883;
  }
</style>
