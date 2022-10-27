import { autoAnimate } from '@liuyang0826/auto-animate'
import type { Options } from '@liuyang0826/auto-animate'
import type { Plugin, Directive } from 'vue'
import { CrossFlip } from './CrossFlip'
import { EaseText } from './EaseText'
import { useAutoAnimate } from './useAutoAnimate'

export const vAutoAnimate: Directive = {
  mounted: (el: HTMLElement, binding: { value: Options }) => {
    autoAnimate(el, binding.value || {})
  },
}

export { CrossFlip, useAutoAnimate, EaseText }

export function autoAnimatePlugin(): Plugin {
  return {
    install(app) {
      app.directive('auto-animate', vAutoAnimate)
      app.component('CrossFlip', CrossFlip)
      app.component('EaseText', EaseText)
    },
  }
}
