import { getTransformValues, getTransitionSizes } from './utils'

export function add(el: Element, duration: number) {
  return new KeyframeEffect(
    el,
    [
      { transform: 'scale(.98)', opacity: 0 },
      { transform: 'scale(0.98)', opacity: 0, offset: 0.5 },
      { transform: 'scale(1)', opacity: 1 },
    ],
    {
      duration: duration * 1.5,
      easing: 'ease-in',
    }
  )
}

export function remove(el: Element, duration: number) {
  return new KeyframeEffect(
    el,
    [
      {
        transform: 'scale(1)',
        opacity: 1,
      },
      {
        transform: 'scale(.98)',
        opacity: 0,
      },
    ],
    {
      duration,
      easing: 'ease-out',
    }
  )
}

export function update(el: Element, oldRect: DOMRect, duration: number, easing: string) {
  const newRect = el.getBoundingClientRect()
  const deltaX = oldRect.left - newRect.left
  const deltaY = oldRect.top - newRect.top
  const [widthFrom, widthTo, heightFrom, heightTo] = getTransitionSizes(el, oldRect, newRect)

  if (deltaX || deltaY) {
    const transform = getTransformValues(el)
    let start: Keyframe
    let end: Keyframe

    if (transform) {
      if (transform.type === 'matrix3d') {
        transform.values[12] += deltaX
        transform.values[13] += deltaY
      } else {
        transform.values[4] += deltaX
        transform.values[5] += deltaY
      }

      start = { transform: `${transform.type}(${transform.values.join(',')})` }
      end = { transform: transform.origin }
    } else {
      start = { transform: `translate(${deltaX}px, ${deltaY}px)` }
      end = { transform: `translate(0, 0)` }
    }

    if (widthFrom !== widthTo) {
      start.width = `${widthFrom}px`
      end.width = `${widthTo}px`
    }

    if (heightFrom !== heightTo) {
      start.height = `${heightFrom}px`
      end.height = `${heightTo}px`
    }

    return new KeyframeEffect(el, [start, end], {
      duration,
      easing,
    })
  }
}

export const duration = 250

export const easing = 'ease-in-out'
