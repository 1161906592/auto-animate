import type { Options } from "./types"
import { add as defaultAdd, remove as defaultRemove, update as defaultUpdate } from "./defaults"
import { deletePosition, diffElements } from "./utils"

export default function autoAnimate(el: HTMLElement, options?: Options) {
  const {
    duration = 250,
    easing = 'ease-in-out',
    add = (el: Element) => defaultAdd(el, duration),
    remove = (el: Element) => defaultRemove(el, duration),
    update = (el: Element, oldRect: DOMRect) => defaultUpdate(el, oldRect, duration, easing),
  } = options || {}

  let pending = false
  let animating = false
  let oldElementRectMap: Map<Element, DOMRect>

  const willChange = () => {
    if (pending || animating) return
    pending = true
    const oldElements = Array.from(el.children)

    oldElementRectMap = new Map(
      oldElements.map((item) => [item, item.getBoundingClientRect()])
    )

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

  const appendChild = el.appendChild

  el.appendChild = <T extends Node>(node: T): T => {
    willChange()

    return appendChild.call(el, node) as T
  }

  const insertBefore = el.insertBefore

  el.insertBefore = <T extends Node>(node: T, child: Node): T => {
    willChange()

    return insertBefore.call(el, node, child) as T
  }

  const removeChild = el.removeChild

  el.removeChild = <T extends Node>(child: Node): T => {
    willChange()

    return removeChild.call(el, child) as T
  }

  return willChange
}
