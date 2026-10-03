import { Link, useLocation } from 'react-router-dom'
import { Home, LayoutGrid, Menu, Search, Star } from 'lucide-react'
import { useCatalogEngagement } from '../../context/CatalogEngagementContext'
import { useVisitOrder } from '../../context/VisitOrderContext'
import { isCatalogPath } from '../../lib/catalogPath'
const ITEMS = [
  { id: 'home', href: '/', label: 'الرئيسية', icon: Home, match: (p: string) => p === '/' },
  {
    id: 'catalog',
    href: '/products',
    label: 'الكتالوج',
    icon: LayoutGrid,
    match: (p: string) => isCatalogPath(p) && p !== '/visit-order' && p !== '/products/favorites',
  },
  { id: 'search', label: 'بحث', icon: Search },
  { id: 'favorites', href: '/products/favorites', label: 'المفضلة', icon: Star, match: (p: string) => p === '/products/favorites' },
  { id: 'menu', label: 'القائمة', icon: Menu },
] as const

export default function CatalogMobileNav({
  onSearch,
  onMenu,
}: {
  onSearch: () => void
  onMenu: () => void
}) {
  const { pathname } = useLocation()
  const { favoriteIds } = useCatalogEngagement()
  const { lineCount } = useVisitOrder()
  const favCount = favoriteIds.length

  return (
    <nav className="catalog-mobile-nav lg:hidden" aria-label="تنقل الكتالوج">
      {ITEMS.map((item) => {
        if (item.id === 'search') {
          return (
            <button key={item.id} type="button" onClick={onSearch} className="catalog-mobile-nav__link focus-ring">
              <item.icon size={22} strokeWidth={1.75} aria-hidden />
              <span>{item.label}</span>
            </button>
          )
        }
        if (item.id === 'menu') {
          return (
            <button key={item.id} type="button" onClick={onMenu} className="catalog-mobile-nav__link focus-ring">
              <item.icon size={22} strokeWidth={1.75} aria-hidden />
              <span>{item.label}</span>
            </button>
          )
        }
        const active = item.match(pathname)
        const badge =
          item.id === 'favorites' && favCount > 0
            ? favCount
            : item.id === 'catalog' && lineCount > 0
              ? lineCount
              : undefined
        const href = item.href!
        return (
          <Link
            key={item.id}
            to={href}
            className={`catalog-mobile-nav__link focus-ring${active ? ' catalog-mobile-nav__link--active' : ''}`}
            aria-current={active ? 'page' : undefined}
          >
            <item.icon size={22} strokeWidth={1.75} aria-hidden />
            <span>{item.label}</span>
            {badge != null && <span className="catalog-mobile-nav__badge">{badge > 9 ? '9+' : badge}</span>}
          </Link>
        )
      })}
    </nav>
  )
}
