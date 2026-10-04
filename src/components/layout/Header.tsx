import { useScrollThreshold } from '../../lib/useScrollThreshold'
import { Link, useLocation } from 'react-router-dom'
import { ClipboardList, Menu, Search, Star } from 'lucide-react'
import { useCatalogEngagement } from '../../context/CatalogEngagementContext'
import Logo from '../ui/Logo'
import { useVisitOrder } from '../../context/VisitOrderContext'
import { buildOrderEntryPath } from '../../lib/orderEntry'
import { isCatalogPath } from '../../lib/catalogPath'
import { PUBLIC_HEADER_NAV } from '../../lib/publicHeaderNav'
import { CATALOG_FAVORITES_ENABLED } from '../../lib/catalogFeatures'

const ICON_SIZE = 20
const ICON_STROKE = 1.75

export default function Header({
  onSearch,
  onMenu,
}: {
  onSearch: () => void
  onMenu: () => void
}) {
  const { lineCount } = useVisitOrder()
  const { favoriteIds } = useCatalogEngagement()
  const { pathname } = useLocation()
  const onCatalog = isCatalogPath(pathname)
  const onHome = pathname === '/'
  const favCount = favoriteIds.length
  const scrolled = useScrollThreshold(6)

  return (
    <header
      className={`app-header${scrolled ? ' app-header--scrolled' : ''}${onHome && !scrolled ? ' app-header--home' : ''}`}
    >
      <div className="app-header-container">
        <div className="app-header-brand">
          <Logo variant="header" onDark={onHome && !scrolled} />
        </div>

        <nav className="app-header-nav" aria-label="التنقل الرئيسي">
          <div className="app-header-nav-rail">
            {PUBLIC_HEADER_NAV.map((item) => {
              const active = item.match(pathname)
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`app-header-nav-link${active ? ' app-header-nav-link--active' : ''}`}
                  aria-current={active ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        </nav>

        <div className="app-header-actions" role="group" aria-label="إجراءات سريعة">
          <button
            type="button"
            onClick={onSearch}
            aria-label="بحث المنتجات (Ctrl+K)"
            className="app-header-icon-btn app-header-icon-btn--ghost"
          >
            <Search size={ICON_SIZE} strokeWidth={ICON_STROKE} aria-hidden />
          </button>
          {CATALOG_FAVORITES_ENABLED && onCatalog ? (
            <Link
              to="/products/favorites"
              aria-label={favCount > 0 ? `المفضلة — ${favCount}` : 'المفضلة'}
              className="app-header-icon-btn app-header-icon-btn--ghost"
            >
              <Star size={ICON_SIZE} strokeWidth={ICON_STROKE} aria-hidden />
              {favCount > 0 && (
                <span className="app-header-badge badge-pop" aria-hidden>
                  {favCount > 9 ? '9+' : favCount}
                </span>
              )}
            </Link>
          ) : null}
          <Link
            to={buildOrderEntryPath(lineCount)}
            aria-label={lineCount > 0 ? `مراجعة العرض — ${lineCount} صنف` : 'الكتالوج'}
            className="app-header-icon-btn app-header-icon-btn--accent"
          >
            <ClipboardList size={ICON_SIZE} strokeWidth={ICON_STROKE} aria-hidden />
            {lineCount > 0 && (
              <span className="app-header-badge badge-pop" aria-hidden>
                {lineCount > 99 ? '99+' : lineCount}
              </span>
            )}
          </Link>
          <button
            type="button"
            onClick={onMenu}
            aria-label="فتح القائمة"
            className="app-header-icon-btn app-header-menu-btn"
          >
            <Menu size={ICON_SIZE} strokeWidth={ICON_STROKE} aria-hidden />
          </button>
        </div>
      </div>
    </header>
  )
}
