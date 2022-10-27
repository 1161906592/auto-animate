import { autoAnimate } from '@liuyang0826/auto-animate'
import type { Options } from '@liuyang0826/auto-animate'
import type { Plugin, Directive } from 'vue'
import { CrossFlip } from './CrossFlip'
import { useAutoAnimate } from './useAutoAnimate'

export const vAutoAnimate: Directive = {
  mounted: (el: HTMLElement, binding: { value: Options }) => {
    autoAnimate(el, binding.value || {})
  },
}

export { CrossFlip, useAutoAnimate }

export function autoAnimatePlugin(): Plugin {
  return {
    install(app) {
      app.directive('auto-animate', vAutoAnimate)
      app.component('CrossFlip', CrossFlip)
    },
  }
}
