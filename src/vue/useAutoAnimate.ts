import { ref, watch } from 'vue'
import { autoAnimate } from '@liuyang0826/auto-animate'
import type { Options } from '@liuyang0826/auto-animate'

export function useAutoAnimate(options?: Options) {
  const rootRef = ref<Element | null>(null)
  const animatorRef = ref<ReturnType<typeof autoAnimate> | null>(null)

  watch(
    rootRef,
    (root) => {
      if (root) {
        animatorRef.value = autoAnimate(root, options)
      }
    },
    { immediate: true }
  )

  return {
    rootRef,
    animatorRef,
  }
}
