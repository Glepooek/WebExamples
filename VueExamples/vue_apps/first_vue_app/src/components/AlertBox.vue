<template>
    <div class="alert-box">
        <strong>This is an Error for Demo Purposes</strong>
        <br />
        <slot></slot>
    </div>
</template>

<style scoped>
.alert-box {
    background-color: red;
    color: white;
    padding: 10px;
    margin: 10px;
}
</style>
