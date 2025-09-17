<template>
  <main>
    <button @click="toggle">Toggle</button>
    <transition
      name="nested"
      :duration="{ enter: 500, leave: 800 }"
      @before-enter="onBeforeEnter"
      @enter="onEnter"
      @after-enter="onAfterEnter"
      @enter-cancelled="onEnterCancelled"
      @before-leave="onBeforeLeave"
      @leave="onLeave"
      @after-leave="onAfterLeave"
      @leave-cancelled="onLeaveCancelled"
    >
      <div v-if="show" class="outer">
        <div class="inner">Hello, World!</div>
      </div>
    </transition>
  </main>
</template>

<script>
  export default {
    data() {
      return {
        show: true,
      }
    },
    methods: {
      toggle() {
        this.show = !this.show
      },
      onBeforeEnter(el) {
        console.log("before-enter", el)
      },
      onEnter(el, done) {
        console.log("enter", el)
        // Call done when the enter transition finishes
        //done()
      },
      onAfterEnter(el) {
        console.log("after-enter", el)
      },
      onEnterCancelled(el) {
        console.log("enter-cancelled", el)
      },

      onBeforeLeave(el) {
        console.log("before-leave", el)
      },
      onLeave(el, done) {
        console.log("leave", el)
        // Call done when the leave transition finishes
        //done()
      },
      onAfterLeave(el) {
        console.log("after-leave", el)
      },
      onLeaveCancelled(el) {
        console.log("leave-cancelled", el)
      },
    },
  }
</script>

<style scoped>
  .outer,
  .inner {
    background: #eee;
    padding: 30px;
    min-height: 100px;
  }

  .inner {
    background: #ccc;
    color: #000;
  }

  .nested-enter-active,
  .nested-leave-active {
    transition: all 0.3s ease-in-out;
  }

  .nested-leave-active {
    transition-delay: 0.25s;
  }

  .nested-enter-from,
  .nested-leave-to {
    transform: translateY(30px);
    opacity: 0;
  }

  .nested-enter-active .inner,
  .nested-leave-active .inner {
    transition: all 0.3s ease-in-out;
  }

  .nested-enter-active .inner {
    transition-delay: 0.25s;
  }

  .nested-enter-from .inner,
  .nested-leave-to .inner {
    transform: translateX(30px);
    opacity: 0;
  }
</style>
