import { useEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

/** نافذة فوق كل المحتوى — يتجاوز transform على MotionPage */
export default function ModalPortal({
  open,
  onClose,
  labelledBy,
  children,
}: {
  open: boolean
  onClose: () => void
  labelledBy: string
  children: ReactNode
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div className="app-modal-overlay">
      <button type="button" aria-label="إغلاق" className="app-modal-backdrop" onClick={onClose} />
      <div role="dialog" aria-modal="true" aria-labelledby={labelledBy} className="app-modal-panel">
        {children}
      </div>
    </div>,
    document.body,
  )
}
