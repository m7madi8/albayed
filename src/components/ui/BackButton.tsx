import { ChevronRight } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { btn } from '../../lib/buttonStyles'

export default function BackButton({
  fallback = '/',
  to,
}: {
  fallback?: string
  /** عند التعيين: انتقال مباشر بدون history.back */
  to?: string
}) {
  const navigate = useNavigate()
  const { pathname, search } = useLocation()

  if (pathname === '/' && !search) return null

  const goBack = () => {
    if (to) {
      navigate(to)
      return
    }
    if (window.history.state?.idx > 0) {
      navigate(-1)
    } else {
      navigate(fallback)
    }
  }

  return (
    <button
      type="button"
      onClick={goBack}
      aria-label="رجوع"
      className={btn('ghost', 'min-h-11 gap-1.5 rounded-[12px] px-3 text-[15px] font-medium active:text-accent')}
    >
      <ChevronRight size={20} strokeWidth={2} aria-hidden />
      رجوع
    </button>
  )
}
