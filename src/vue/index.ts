import { Plugin, ref, watch } from 'vue'
import { autoAnimate } from '..'
import type { Options } from '../types'
import type { Directive } from 'vue'
import { CrossFlip } from './CrossFlip'

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

export const vAutoAnimate: Directive = {
  mounted: (el: HTMLElement, binding: { value: Options }) => {
    autoAnimate(el, binding.value || {})
  },
}

export { CrossFlip }

export function autoAnimatePlugin(): Plugin {
  return {
    install(app) {
      app.directive('auto-animate', vAutoAnimate)
      app.component('CrossFlip', CrossFlip)
    },
  }
}
