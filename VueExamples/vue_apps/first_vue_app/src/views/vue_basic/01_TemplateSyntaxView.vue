<template>
    <main>
        <div>
            <ul>
                <li v-for="number in numbers" :key="number">{{ number }}</li>
            </ul>
        </div>
        <div>
            <p>{{ message }}</p>
            <p v-html="message"></p>
            <p>{{ canShow ? "yes" : "no" }}</p>
        </div>
        <el-button type="primary" :disabled="canShow">Primary Button</el-button>
        <form action="https://www.baidu.com" @click="onForm">
            <button type="primary" @click.prevent.stop="onSubmit">提交</button>
        </form>
    </main>
</template>

<script setup>
import { ref } from 'vue';
const numbers = ref([1, 2, 3, 4, 5]);
const message = ref('<strong>Hello, Vue 3!<strong>');
let canShow = ref(true);

const onSubmit = () => {
    alert(1)
}

const onForm = () => {
    alert(2);
};

</script>

<style scoped></style>