<template>
  <main>
    <button @click="show = !show">Toggle</button>
    <Transition name="bounce">
      <p v-if="show" style="text-align: center">Hello here is some bouncy text!</p>
    </Transition>
  </main>
</template>

<script>
  export default {
    data() {
      return {
        show: false,
      }
    },
  }
</script>

<style scoped>
  .bounce-enter-active {
    animation: bounce-in 0.5s;
  }
  .bounce-leave-active {
    animation: bounce-in 0.5s reverse;
  }

  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.25);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
