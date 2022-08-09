export interface Options {
  add?(el: Element): KeyframeEffect | undefined
  remove?(el: Element, oldRect: DOMRect): KeyframeEffect | undefined
  update?(el: Element, oldRect: DOMRect): KeyframeEffect | undefined
  duration?: number
  easing?: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out' | string
}
