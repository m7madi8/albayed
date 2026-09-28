import { useEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

/** Scroll offsets keyed by React Router location.key (one entry per history step). */
const scrollByKey = new Map<string, number>()

/**
 * POP (back/forward) → restore saved offset.
 * PUSH (new route) → scroll to top.
 * REPLACE (filters, query on same page) → keep scroll position.
 */
export function useScrollRestoration() {
  const location = useLocation()
  const navigationType = useNavigationType()
  const key = location.key

  useEffect(() => {
    const saved = scrollByKey.get(key)
    if (navigationType === 'POP' && saved !== undefined) {
      const restore = () => window.scrollTo(0, saved)
      requestAnimationFrame(() => {
        requestAnimationFrame(restore)
      })
    } else if (navigationType === 'PUSH') {
      window.scrollTo(0, 0)
    }
  }, [key, navigationType])

  useEffect(() => {
    return () => {
      scrollByKey.set(key, window.scrollY)
    }
  }, [key])
}
