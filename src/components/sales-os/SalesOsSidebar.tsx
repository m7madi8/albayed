import { Link, useLocation } from 'react-router-dom'
import { Search } from 'lucide-react'
import { SALES_OS_NAV } from '../../data/salesOsNav'
import { salesOsNavActive } from '../../data/salesOsNav'
import { BRAND_LOGO_FULL, BRAND_LOGO_ON_DARK } from '../../lib/brandAssets'
import { useTheme } from '../../context/ThemeContext'
import { useVisitOrder } from '../../context/VisitOrderContext'

export default function SalesOsSidebar({ onSearch }: { onSearch: () => void }) {
  const { pathname } = useLocation()
  const { theme } = useTheme()
  const { lineCount } = useVisitOrder()
  const logo = theme === 'dark' ? BRAND_LOGO_ON_DARK : BRAND_LOGO_FULL

  return (
    <aside className="sales-os-sidebar hidden lg:flex" aria-label="تنقل نظام المبيعات">
      <div className="sales-os-sidebar-inner">
        <Link to="/dashboard/overview" className="sales-os-sidebar-brand">
          <img src={logo} alt="" width={180} height={44} className="sales-os-sidebar-logo" decoding="async" />
          <span className="sales-os-sidebar-kicker">نظام المبيعات</span>
        </Link>

        <button type="button" onClick={onSearch} className="sales-os-search-trigger focus-ring">
          <Search size={18} strokeWidth={1.75} aria-hidden />
          <span>بحث في النظام</span>
          <kbd className="sales-kbd">⌘K</kbd>
        </button>

        <nav className="sales-os-nav">
          {SALES_OS_NAV.map((item) => {
            const active = salesOsNavActive(pathname, item.href, item.end)
            const badge = item.id === 'products' && lineCount > 0 ? lineCount : undefined
            const Icon = item.icon
            return (
              <Link
                key={item.id}
                to={item.href}
                className={`sales-os-nav-link focus-ring${active ? ' sales-os-nav-link--active' : ''}`}
                aria-current={active ? 'page' : undefined}
              >
                {active && <span className="sales-os-nav-indicator" aria-hidden />}
                <Icon size={20} strokeWidth={1.75} aria-hidden />
                <span>{item.label}</span>
                {badge != null && <span className="sales-os-nav-badge">{badge > 99 ? '99+' : badge}</span>}
              </Link>
            )
          })}
        </nav>

        <div className="sales-os-sidebar-foot">
          <Link to="/" className="sales-os-sidebar-exit text-[13px] text-foreground-muted hover:text-foreground">
            الخروج إلى الكتالوج العام
          </Link>
        </div>
      </div>
    </aside>
  )
}
