import autoAnimate from ".."
import { ref, watch } from "vue"
import type { Directive } from "vue"
import type { Options } from "../types"

export function useAutoAnimate(options?: Options) {
  const rootRef = ref<HTMLElement | null>(null)

  watch(rootRef, (root) => {
    if (root) {
      autoAnimate(root, options)
    }
  }, { immediate: true })

  return rootRef
}

export const vAutoAnimate: Directive = {
  mounted: (
    el: HTMLElement,
    binding: { value: Options }
  ) => {
    autoAnimate(el, binding.value || {})
  },
}