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

### CSS的animation
原生`CSS动画`和CSS transition的应用方式基本上是相同的，只有一点不同，那就是`*-enter-from`不是在元素插入后立即移除，而是在一个`animationend`事件触发时被移除。
对于大多数的CSS动画，可以简单地在`*-enter-active`和`*-leave-active` class下声明它们。

```vue
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
```

### 自定义过渡class
也可以向`<Transition>`组件传递以下props来指定自定义的过渡class：

* `enter-from-class`
* `enter-active-class`
* `enter-to-class`
* `leave-from-class`
* `leave-active-class`
* `leave-to-class`

传入的这些class会覆盖相应阶段的默认class名。这个功能在你想要在Vue的动画机制下集成其他的`第三方CSS动画库`时非常有用，比如`Animate.css`：

```vue
<script>
export default {
  data() {
    return {
      show: true
    }
  }
}
</script>

<template>
	<button @click="show = !show">Toggle</button>
  <Transition
    name="custom-classes"
    enter-active-class="animate__animated animate__tada"
    leave-active-class="animate__animated animate__bounceOutRight"
  >
    <p v-if="show">hello</p>
  </Transition>
</template>

<style>
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css";
</style>
```

### 同时使用transition和animation
Vue需要附加事件监听器，以便知道过渡何时结束。可以是`transitionend`或`animationend`，这取决于你所应用的CSS规则。如果你仅仅使用二者的其中之一，Vue可以自动探测到正确的类型。

然而在某些场景中，你或许想要在同一个元素上同时使用它们两个。举例来说，Vue触发了一个CSS动画，同时鼠标悬停触发另一个CSS过渡。此时你需要显式地传入`type`prop来声明，告诉Vue需要关心哪种类型，传入的值是`animation`或`transition`：

```vue
<Transition type="animation">...</Transition>
```

### 深层级过渡与显式过渡时长
尽管过渡class仅能应用在`<Transition>`的直接子元素上，我们还是可以使用`深层级的CSS选择器`，在深层级的元素上触发过渡效果：

```vue
<template>
  <Transition name="nested">
    <div v-if="show" class="outer">
      <div class="inner">
        Hello
      </div>
    </div>
  </Transition>
</template>
```

```css
/* 应用于嵌套元素的规则 */
.nested-enter-active .inner,
.nested-leave-active .inner {
  transition: all 0.3s ease-in-out;
}

.nested-enter-from .inner,
.nested-leave-to .inner {
  transform: translateX(30px);
  opacity: 0;
}

/* ... 省略了其他必要的 CSS */
```

甚至可以在深层元素上添加一个过渡延迟，从而创建一个带渐进延迟的动画序列：

```css
/* 延迟嵌套元素的进入以获得交错效果 */
.nested-enter-active .inner {
  transition-delay: 0.25s;
}
```

然而，这会带来一个小问题。默认情况下，<Transition>组件会通过监听过渡根元素上的第一个 transitionend或者animationend事件来尝试自动判断过渡何时结束。而在嵌套的过渡中，期望的行为应该是等待所有内部元素的过渡完成。

在这种情况下，你可以通过向<Transition>组件传入`duration`prop来显式指定过渡的持续时间(以毫秒为单位)。总持续时间应该匹配延迟加上内部元素的过渡持续时间：

```vue
<Transition :duration="550">...</Transition>
```

如果有必要的话，也可以用对象的形式传入，分开指定进入和离开所需的时间：

```vue
<Transition :duration="{ enter: 500, leave: 800 }">...</Transition>
```

### 性能考量​
上面例子中展示的动画所用到的CSS属性大多是transform和opacity之类的。用这些属性制作动画非常高效，因为：

+ 他们在动画过程中不会影响到 DOM 结构，因此不会每一帧都触发昂贵的 CSS 布局重新计算。
+ 大多数的现代浏览器都可以在执行transform动画时利用GPU进行硬件加速。

相比之下，像 height 或者 margin 这样的属性会触发 CSS 布局变动，因此执行它们的动画效果更昂贵，需要谨慎使用。

## JS钩子



