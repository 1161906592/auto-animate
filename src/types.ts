export interface Options {
  add?(el: Element): KeyframeEffect | void
  remove?(el: Element, oldRect: DOMRect): KeyframeEffect | void
  update?(el: Element, oldRect: DOMRect): KeyframeEffect | void
  duration?: number
  easing?: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out' | string
}
