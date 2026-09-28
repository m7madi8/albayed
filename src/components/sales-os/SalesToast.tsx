import { useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { MOTION_DURATION, EASE_OUT } from '../../lib/motionPresets'

export default function SalesToast({ message, onDone }: { message: string | null; onDone: () => void }) {
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!message) return
    const t = setTimeout(onDone, 2400)
    return () => clearTimeout(t)
  }, [message, onDone])

  if (!message) return null

  const motionProps = reduce
    ? {}
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: MOTION_DURATION.fast, ease: EASE_OUT },
      }

  return (
    <motion.div className="ds-toast" role="status" {...motionProps}>
      {message}
    </motion.div>
  )
}
