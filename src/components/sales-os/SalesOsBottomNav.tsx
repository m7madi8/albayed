import { Link, useLocation } from 'react-router-dom'
import { SALES_OS_NAV, SALES_OS_SEARCH, salesOsNavActive } from '../../data/salesOsNav'
import { useVisitOrder } from '../../context/VisitOrderContext'

export default function SalesOsBottomNav({ onSearch }: { onSearch: () => void }) {
  const { pathname } = useLocation()
  const { lineCount } = useVisitOrder()
  const mobileItems = [...SALES_OS_NAV.filter((i) => i.mobile), SALES_OS_SEARCH]

  return (
    <nav className="sales-os-bottom-nav lg:hidden" aria-label="تنقل سريع">
      {mobileItems.map((item) => {
        if (item.id === 'search') {
          return (
            <button
              key={item.id}
              type="button"
              onClick={onSearch}
              className="sales-os-bottom-link focus-ring"
            >
              <item.icon size={22} strokeWidth={1.75} aria-hidden />
              <span>{item.label}</span>
            </button>
          )
        }
        const active = salesOsNavActive(pathname, item.href, item.end)
        const badge = item.id === 'products' && lineCount > 0 ? lineCount : undefined
        return (
          <Link
            key={item.id}
            to={item.href}
            className={`sales-os-bottom-link focus-ring${active ? ' sales-os-bottom-link--active' : ''}`}
            aria-current={active ? 'page' : undefined}
          >
            <item.icon size={22} strokeWidth={1.75} aria-hidden />
            <span>{item.label}</span>
            {badge != null && <span className="sales-os-bottom-badge">{badge > 9 ? '9+' : badge}</span>}
          </Link>
        )
      })}
    </nav>
  )
}
