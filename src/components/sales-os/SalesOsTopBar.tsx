import { Link, useLocation } from 'react-router-dom'
import { Menu, Search } from 'lucide-react'
import { salesOsLabel, salesOsNavActive, SALES_OS_NAV } from '../../data/salesOsNav'
import Logo from '../ui/Logo'

export default function SalesOsTopBar({ onSearch }: { onSearch: () => void }) {
  const { pathname } = useLocation()
  const section = SALES_OS_NAV.find((i) => salesOsNavActive(pathname, i.href, i.end))
  const title =
    pathname.startsWith('/dashboard/customers/') && pathname !== '/dashboard/customers'
      ? 'ملف العميل'
      : salesOsLabel(section?.id ?? 'overview') ?? 'نظام المبيعات'

  return (
    <header className="sales-os-topbar lg:hidden">
      <div className="sales-os-topbar-inner">
        <Link to="/dashboard/overview" className="shrink-0" aria-label="الرئيسية">
          <Logo variant="compact" />
        </Link>
        <h1 className="sales-os-topbar-title truncate">{title}</h1>
        <div className="flex shrink-0 items-center gap-1">
          <button type="button" onClick={onSearch} className="sales-os-icon-btn focus-ring" aria-label="بحث">
            <Search size={22} strokeWidth={1.75} />
          </button>
          <Link to="/dashboard/settings" className="sales-os-icon-btn focus-ring" aria-label="الإعدادات">
            <Menu size={22} strokeWidth={1.75} />
          </Link>
        </div>
      </div>
      <button type="button" onClick={onSearch} className="sales-os-mobile-search focus-ring">
        <Search size={18} strokeWidth={1.75} aria-hidden />
        <span>بحث منتجات، عملاء، أو رقم SKU…</span>
        <kbd className="sales-kbd">⌘K</kbd>
      </button>
    </header>
  )
}
