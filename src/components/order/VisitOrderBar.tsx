import { Link, useLocation } from 'react-router-dom'
import { ClipboardList } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { useVisitOrder } from '../../context/VisitOrderContext'
import { visitOrderBarMotion } from '../../lib/motionPresets'
import { isCatalogPath } from '../../lib/catalogPath'
import { btn } from '../../lib/buttonStyles'
import { formatUnitPrice } from '../../lib/customerPricing'

export default function VisitOrderBar() {
  const { lineCount, unitCount, clientLabel, orderTotal } = useVisitOrder()
  const { pathname } = useLocation()
  const isCatalogRoute = isCatalogPath(pathname)
  const shellClass = isCatalogRoute ? 'catalog-shell' : 'container-x'
  const reduce = useReducedMotion()

  if (lineCount === 0 || pathname === '/dashboard/order' || pathname === '/visit-order') return null

  const inner = (
    <div className={`${shellClass} visit-order-bar-inner`}>
      <div className="min-w-0 text-[13px] leading-5 text-foreground-muted">
        <span className="block truncate text-foreground">{clientLabel ?? 'بدون شركة محددة'}</span>
        <span>
          {lineCount} صنف · {unitCount} وحدة · {formatUnitPrice(orderTotal)}
        </span>
      </div>
      <Link
        to="/visit-order"
        className={btn('primary', 'visit-order-bar-cta w-full gap-2 rounded-[12px] px-4 text-[14px] font-medium sm:w-auto')}
      >
        <ClipboardList size={18} strokeWidth={2} />
        مراجعة العرض
      </Link>
    </div>
  )

  const barClass =
    'visit-order-bar sticky bottom-0 z-30 border-t border-border bg-surface px-4 py-3 pb-[max(12px,env(safe-area-inset-bottom))]'

  if (reduce) {
    return <div className={barClass}>{inner}</div>
  }

  return (
    <motion.div className={barClass} initial={visitOrderBarMotion.initial} animate={visitOrderBarMotion.animate} transition={visitOrderBarMotion.transition}>
      {inner}
    </motion.div>
  )
}
