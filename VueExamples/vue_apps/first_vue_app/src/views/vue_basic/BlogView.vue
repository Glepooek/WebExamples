<template>
    <div :style="{ fontSize: postFontSize + 'px' }">
        <BlogPost v-for="post in posts" :key="post.id" :id="post.id" :title="post.title"
            @enlarge-text="postFontSize = postFontSize + 2" />
        <AlertBox> Something bad happened.</AlertBox>
    </div>

</template>


<script setup>
import { ref } from 'vue'
import BlogPost from '@/components/BlogPost.vue';
import AlertBox from '@/components/AlertBox.vue';

const posts = ref([
    { id: '1', title: 'First Post' },
    { id: '2', title: 'Second Post' },
    { id: '3', title: 'Third Post' },
]);

const postFontSize = ref(16);


</script>