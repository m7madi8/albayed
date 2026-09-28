import type { ReactNode } from 'react'

/** شريط إجراءات ثابت أسفل المحتوى داخل الإطار — متجاوب مع safe-area */
export default function AppStickyDock({ children }: { children: ReactNode }) {
  return (
    <div className="app-sticky-dock">
      <div className="container-x flex flex-wrap items-center justify-between gap-3">{children}</div>
    </div>
  )
}
