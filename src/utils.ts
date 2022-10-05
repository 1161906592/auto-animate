/**
 * reference https://github.com/formkit/auto-animate/blob/master/src/index.ts
 */

export function raw(str: string) {
  return Number(str.replace(/[^0-9.-]/g, ''))
}

export function getTransitionSizes(el: Element, oldRect: DOMRect, newRect: DOMRect) {
  let widthFrom = oldRect.width
  let heightFrom = oldRect.height
  let widthTo = newRect.width
  let heightTo = newRect.height
  const styles = getComputedStyle(el)
  const sizing = styles.getPropertyValue('box-sizing')

  if (sizing === 'content-box') {
    const paddingY =
      raw(styles.paddingTop) + raw(styles.paddingBottom) + raw(styles.borderTopWidth) + raw(styles.borderBottomWidth)

    const paddingX =
      raw(styles.paddingLeft) + raw(styles.paddingRight) + raw(styles.borderRightWidth) + raw(styles.borderLeftWidth)

    widthFrom -= paddingX
    widthTo -= paddingX
    heightFrom -= paddingY
    heightTo -= paddingY
  }

  return [widthFrom, widthTo, heightFrom, heightTo].map(Math.round)
}

export function deletePosition(el: Element, oldRect: DOMRect, newRect: DOMRect) {
  const [width, , height] = getTransitionSizes(el, oldRect, newRect)
  let offsetParent = el.parentElement

  while (
    offsetParent &&
    (getComputedStyle(offsetParent).position === 'static' || offsetParent instanceof HTMLBodyElement)
  ) {
    offsetParent = offsetParent.parentElement
  }

  if (!offsetParent) offsetParent = document.body
  const parentStyles = getComputedStyle(offsetParent)
  const parentRect = offsetParent.getBoundingClientRect()
  const top = Math.round(oldRect.top - parentRect.top) - raw(parentStyles.borderTopWidth)
  const left = Math.round(oldRect.left - parentRect.left) - raw(parentStyles.borderLeftWidth)

  return [top, left, width, height]
}

export function diffElements(oldElements: Element[], newElements: Element[]) {
  const oldElementMap = new Map<Element, boolean>(oldElements.map((d) => [d, true]))
  const newElementMap = new Map<Element, boolean>(newElements.map((d) => [d, true]))
  const sameSet = new Set<Element>()

  const removeElements: Element[] = []

  oldElements.forEach((element) => {
    if (newElementMap.has(element)) {
      sameSet.add(element)
    } else {
      removeElements.push(element)
    }
  })

  const addElements: Element[] = []

  newElements.forEach((element) => {
    if (oldElementMap.has(element)) {
      sameSet.add(element)
    } else {
      addElements.push(element)
    }
  })

  return {
    addElements,
    removeElements,
    updateElements: Array.from(sameSet),
  }
}
