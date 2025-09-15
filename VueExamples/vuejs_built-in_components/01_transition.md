Vue提供了两个内置组件，用于帮助制作基于状态的过渡和动画：
* `<Transition>`会在一个元素或组件进入和离开DOM时应用动画；
* `<TransitionGroup>`会在一个`v-for`列表中的元素或组件被插入，移动，或移除时应用动画。

## `<Transition>`组件
`<Transition>`是一个内置组件，可以在任意组件中使用，无需注册。它可以将进入和离开动画应用到通过默认插槽传递给它的元素或组件上。

进入或离开可以由以下的条件之一触发：
* 由`v-if`所触发的切换
* 由`v-show`所触发的切换
* 由特殊元素`<component>`切换的动态组件
* 改变特殊的`key`属性

基本用法示例：

```vue
<template>
    <button @click="show = !show">Toggle</button>
    <Transition>
        <p v-if="show">hello world</p>
    </Transition>
</template>

<script>
export default {
    data() {
        return {
            show: true
        }
    }
}
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
```

`<Transition>`仅支持单个元素或组件作为其插槽内容。如果内容是一个组件，这个组件必须仅有一个根元素。

当一个`<Transition>`组件中的元素被插入或移除时，会发生下面这些事情：
* Vue会自动检测目标元素是否应用了CSS过渡或动画。如果是，则一些CSS过渡class会在适当的时机被添加和移除。
* 如果有作为监听器的JavaScript钩子，这些钩子函数会在适当时机被调用。
* 如果没有探测到CSS过渡或动画、也没有提供JavaScript钩子，那么DOM的插入、删除操作将在浏览器的下一个动画帧后执行。

## 基于CSS的过渡效果
### CSS过渡class
一个有6个应用于进入与离开过渡效果的CSS class：
![过渡效果图示](assets/transition-classes.png)

+ `v-enter-from`：进入动画的起始状态。在元素插入之前添加，在元素插入完成后的下一帧移除。
+ `v-enter-active`：进入动画的生效状态。应用于整个进入动画阶段。在元素被插入之前添加，在过渡或动画完成之后移除。这个`class`可以被用来定义进入动画的持续时间、延迟与速度曲线类型。
+ `v-enter-to`：进入动画的结束状态。在元素插入完成后的下一帧被添加 (也就是 v-enter-from 被移除的同时)，在过渡或动画完成之后移除。
+ `v-leave-from`：离开动画的起始状态。在离开过渡效果被触发时立即添加，在一帧后被移除。
+ `v-leave-active`：离开动画的生效状态。应用于整个离开动画阶段。在离开过渡效果被触发时立即添加，在过渡或动画完成之后移除。这个`class`可以被用来定义离开动画的持续时间、延迟与速度曲线类型。
+ `v-leave-to`：离开动画的结束状态。在一个离开动画被触发后的下一帧被添加 (也就是 v-leave-from 被移除的同时)，在过渡或动画完成之后移除。

### 为过渡效果命名
可以给`<Transition>`组件一个`name`属性来声明一个过渡效果名。

```vue
<template>
    <button @click="show = !show">Toggle</button>
    <Transition name="fade">
        <!-- 插槽内容 -->
    </Transition>
</template>
```

对于一个有名字的过渡效果，对它起作用的过渡class会以其`名字`而不是`v`作为前缀。

```vue
<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
```

### CSS的transition
`<Transition>`一般都会搭配原生`CSS过渡`一起使用，正如你在上面的例子中所看到的那样。这个 `transition`CSS属性是一个简写形式，使我们可以一次定义一个过渡的各个方面，包括`需要执行动画的属性、持续时间和速度曲线`。

下面是一个更高级的例子，它使用了不同的持续时间和速度曲线来过渡多个属性：

```vue
<template>
    <button @click="show = !show">Toggle Slide + Fade</button>
    <Transition>
        <p v-if="show">hello world</p>
    </Transition>
</template>

<script>
export default {
    data() {
        return {
            show: true
        }
    }
}
</script>

<style scoped>
/*
  进入和离开动画可以使用不同
  持续时间和速度曲线。
*/
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
```
