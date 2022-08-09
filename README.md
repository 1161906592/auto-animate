# auto-animate

```tsx
import { useAutoAnimate } from "auto-animate/vue"

export default defineComponent({
  setup() {
    const rootRef = useAutoAnimate()

    return () => (
      <ul ref={rootRef}>
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </ul>
    )
  }
})
```
