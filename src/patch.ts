export function patch(el: Element, willChange: () => void) {
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
}
