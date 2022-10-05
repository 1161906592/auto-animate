import type { Options } from './types'
import {
  add as defaultAdd,
  remove as defaultRemove,
  update as defaultUpdate,
  duration as defaultDuration,
  easing as defaultEasing,
} from './defaults'
import { patch } from './patch'
import { deletePosition, diffElements } from './utils'

export function autoAnimate(el: Element, options?: Options) {
  const {
    duration = defaultDuration,
    easing = defaultEasing,
    add = (el: Element) => defaultAdd(el, duration),
    remove = (el: Element) => defaultRemove(el, duration),
    update = (el: Element, oldRect: DOMRect) => defaultUpdate(el, oldRect, duration, easing),
  } = options || {}

  let pending = false
  let animating = false
  let oldElementRectMap: Map<Element, DOMRect>
  let isPaused = false

  const willChange = () => {
    if (pending || animating || isPaused) return
    pending = true
    const oldElements = Array.from(el.children)

    oldElementRectMap = new Map(oldElements.map((item) => [item, item.getBoundingClientRect()]))

    requestAnimationFrame(() => {
      pending = false
      animating = true
      const { addElements, updateElements, removeElements } = diffElements(oldElements, Array.from(el.children))

      addElements.forEach((element) => {
        const effect = add(element)
        if (!effect) return
        const animation = new Animation(effect)
        animation.play()
      })

      updateElements.forEach((element) => {
        const effect = update(element, oldElementRectMap.get(element) as DOMRect)
        if (!effect) return
        const animation = new Animation(effect)
        animation.play()
      })

      removeElements.forEach((element) => {
        el.appendChild(element)
        const oldRect = oldElementRectMap.get(element) as DOMRect
        const effect = remove(element, oldRect)
        if (!effect) return
        const [top, left, width, height] = deletePosition(element, oldRect, element.getBoundingClientRect())

        Object.assign((element as HTMLElement).style, {
          position: 'absolute',
          top: `${top}px`,
          left: `${left}px`,
          width: `${width}px`,
          height: `${height}px`,
          margin: 0,
          pointerEvents: 'none',
          transformOrigin: 'center',
          zIndex: 100,
        })

        const animation = new Animation(effect)

        animation.addEventListener('finish', () => {
          element.remove()
        })

        animation.play()
      })

      animating = false
    })
  }

  const pauseAnimate = () => {
    isPaused = true
  }

  const continueAnimate = () => {
    isPaused = false
  }

  patch(el, willChange)

  return { willChange, pauseAnimate, continueAnimate }
}
