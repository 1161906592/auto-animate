import { defineComponent, createVNode } from 'vue'
import type { PropType } from 'vue'
import { useAutoAnimate } from './useAutoAnimate'

export const EaseText = /* @__PURE__ */ defineComponent({
  props: {
    text: [String, Number, null] as PropType<string | number | null>,
    tag: { type: String as PropType<string>, default: 'div' },
  },
  setup(props) {
    const { rootRef } = useAutoAnimate({
      add: (el) =>
        new KeyframeEffect(el, [{ opacity: 0 }, { opacity: 1 }], {
          duration: 300,
          easing: 'ease-in',
        }),
      remove: (el) =>
        new KeyframeEffect(el, [{ opacity: 1 }, { opacity: 0 }], {
          duration: 300,
          easing: 'ease-out',
        }),
    })

    const style = 'display: inline-block;vertical-align: middle;'

    return () =>
      createVNode(props.tag, { ref: rootRef, style }, props.text ? createVNode('span', { style }, props.text) : null)
  },
})
