/** Shared easing — premium, restrained (280–380ms) */
export const EASE_CALM = [0.22, 0.61, 0.36, 1] as const
export const EASE_OUT = [0.16, 1, 0.3, 1] as const

export const MOTION_DURATION = {
  fast: 0.28,
  base: 0.32,
  slow: 0.38,
} as const

export const pageTransition = {
  duration: MOTION_DURATION.fast,
  ease: EASE_CALM,
}

/** Rare section reveals — not for cards or lists */
export const fadeUp = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: MOTION_DURATION.base, ease: EASE_OUT },
  },
}

/** Search overlay — full-screen takeover */
export const searchOverlayMotion = {
  initial: { opacity: 0, y: -6 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
  transition: { duration: MOTION_DURATION.base, ease: EASE_OUT },
}

/** Catalog results swap — opacity only */
export const catalogResultsMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: MOTION_DURATION.fast, ease: EASE_CALM },
}

/** Visit order bar — dock in */
export const visitOrderBarMotion = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: MOTION_DURATION.base, ease: EASE_OUT },
}

/** PDP / blueprint visualization mode */
export const vizCrossfadeMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: MOTION_DURATION.base, ease: EASE_CALM },
}

/** Modal panel */
export const modalPanelMotion = {
  initial: { opacity: 0, scale: 0.985 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.98 },
  transition: { duration: MOTION_DURATION.base, ease: EASE_OUT },
}

/** Apply reduced motion: zero duration / no transform */
export function motionProps<T extends { transition?: { duration?: number }; initial?: object; animate?: object }>(
  preset: T,
  reduced: boolean | null,
): T {
  if (!reduced) return preset
  return {
    ...preset,
    initial: { opacity: 1, ...(preset.initial as object) },
    animate: { opacity: 1, ...(preset.animate as object) },
    transition: { duration: 0 },
  } as T
}
