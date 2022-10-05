# auto-animate

当元素发生增加、修改、删除时自动增加动画过渡效果。

## 安装

```bash
npm i @liuyang0826/auto-animate
```

> 目前提供底层方法 `autoAnimate` 、vue3的组合式api `useAutoAnimate` 和自定义指令 `vAutoAnimate` 。

## 用法

* 使用组合式api的方式

```tsx
import { useAutoAnimate } from "@liuyang0826/auto-animate/vue"

export default defineComponent({
  setup() {
    const { rootRef } = useAutoAnimate()

    return () => (
      <ul ref={rootRef}>
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </ul>
    )
  }
})
```

* 使用自定义指令的方式

```tsx
import { vAutoAnimate } from "@liuyang0826/auto-animate/vue"

export default defineComponent({
  directives: {
    "auto-animate": vAutoAnimate
  },
  setup() {
    return () => (
      <ul v-auto-animate>
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </ul>
    )
  }
})
```

* 你也可以基于 `autoAnimate` 方法在其他的框架中增加动画。

## 全局安装组件

```ts
// main.ts
import { autoAnimatePlugin } from '@liuyang0826/auto-animate/vue'

app.use(autoAnimatePlugin())
```

## CrossFlip

在vue的包下提供了一个 `CrossFlip` 组件，用于对任意的元素进行切换时自动添加过渡动画。

```tsx
import { CrossFlip } from "@liuyang0826/auto-animate/vue"

export default defineComponent({
  setup() {
    const activeRef = ref(1)
    return () => (
      <ul>
        <li>
          <div>1</div>
          {activeRef.value === 1 && <CrossFlip id="line"></CrossFlip>}
        </li>
        <li>
          <div>2</div>
          {activeRef.value === 2 && <CrossFlip id="line"></CrossFlip>}
        </li>
        <li>
          <div>3</div>
          {activeRef.value === 3 && <CrossFlip id="line"></CrossFlip>}
        </li>
      </ul>
    )
  }
})
```

上面是一个类似tabs的结构，`CrossFlip` 可以看作是每一项的下边框，当选中项切换时下边框会自动平滑过渡到新的位置。传统做法需要手动获取每一项的宽度等布局信息然后给到下边框的元素进行动画，在某些极端情况下，需要你手动的更新条的位置。使用 `CrossFlip` 就可以按照正常的流式布局处理。
