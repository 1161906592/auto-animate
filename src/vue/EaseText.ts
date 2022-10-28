import { defineComponent, h } from 'vue'
import { duration } from '@liuyang0826/auto-animate'
import type { PropType } from 'vue'
import { useAutoAnimate } from './useAutoAnimate'

export const EaseText = /* @__PURE__ */ defineComponent({
  props: {
    text: [String, Number] as PropType<string | number | null>,
    tag: { type: String as PropType<string>, default: 'span' },
    easeOnUpdate: Boolean as PropType<boolean>,
  },
  setup(props) {
    const { rootRef } = useAutoAnimate({
      add: (el) =>
        new KeyframeEffect(el, [{ opacity: 0 }, { opacity: 1 }], {
          duration,
          easing: 'ease-in',
        }),
      remove: (el) =>
        new KeyframeEffect(el, [{ opacity: 1 }, { opacity: 0 }], {
          duration,
          easing: 'ease-out',
        }),
    })

    const style = 'display: inline-block;vertical-align: middle;'

    return () =>
      h(
        props.tag,
        { ref: rootRef, style },
        props.text ? h('span', { style, key: props.easeOnUpdate ? props.text : undefined }, props.text) : undefined
      )
  },
})
