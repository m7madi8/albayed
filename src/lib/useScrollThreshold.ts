import { useEffect, useRef, useState } from 'react'

/** Passive scroll listener — at most one React update per frame when crossing `threshold`. */
export function useScrollThreshold(threshold = 6) {
  const [past, setPast] = useState(false)
  const pastRef = useRef(false)

  useEffect(() => {
    let raf = 0
    const read = () => {
      raf = 0
      const next = window.scrollY > threshold
      if (next === pastRef.current) return
      pastRef.current = next
      setPast(next)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(read)
    }
    read()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [threshold])

  return past
}
