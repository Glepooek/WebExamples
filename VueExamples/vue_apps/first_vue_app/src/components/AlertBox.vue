<template>
  <div class="alert-box">
    <strong>This is an Error for Demo Purposes</strong>
    <slot></slot>
  </div>
</template>

<style scoped>
  .alert-box {
    border-radius: 5px;
    background-color: #f8d7da;
    border: 1px solid red;
    color: #000;
    padding: 10px;
    margin: 10px;
  }

  .alert-box strong {
    font-size: 1.2em;
    color: red;
    display: block;
  }
</style>
