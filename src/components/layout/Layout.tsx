import { useCallback, useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Header from './Header'
import SalesRepSidebar from '../dashboard/SalesRepSidebar'
import SearchOverlay from '../search/SearchOverlay'
import BackButton from '../ui/BackButton'
import VisitOrderBar from '../order/VisitOrderBar'
import { MotionPage } from '../motion/MotionPrimitives'
import { useScrollRestoration } from '../../lib/useScrollRestoration'
import { SearchOpenProvider } from '../../context/SearchOpenContext'
import { isCatalogPath } from '../../lib/catalogPath'
import Footer from './Footer'
import CatalogMobileNav from './CatalogMobileNav'

export default function Layout() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const openSearch = useCallback(() => setSearchOpen(true), [])
  const { pathname, search } = useLocation()
  const isHome = pathname === '/' && !search
  const isCatalogRoute = isCatalogPath(pathname)
  /** الرئيسية + الكتالوج: بدون انتقال صفحة عند تغيير معاملات URL (فلتر/قسم) */
  const isStaticPageShell = pathname === '/' || isCatalogRoute
  const routeKey = pathname
  useScrollRestoration()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const pageInner = (
    <>
      {!isHome && pathname !== '/products' && (
        <div className={`${isCatalogRoute ? 'catalog-shell' : 'container-x'} pt-2 lg:pt-3`}>
          <BackButton to={isCatalogRoute ? (pathname.startsWith('/products/') ? '/products' : '/') : undefined} />
        </div>
      )}
      <Outlet />
    </>
  )

  return (
    <SearchOpenProvider open={openSearch}>
    <a href="#main-content" className="skip-link">
      تخطي إلى المحتوى
    </a>
    <div className={`app-canvas min-h-dvh${isCatalogRoute ? ' app-canvas--catalog' : ''}`}>
      <div
        className={`app-frame flex min-h-dvh flex-col${isCatalogRoute ? ' app-frame--catalog' : ''}${isHome ? ' app-frame--home' : ''}`}
      >
        <Header onSearch={() => setSearchOpen(true)} onMenu={() => setMenuOpen(true)} />
        <main
          id="main-content"
          className={`main-flow flex-1${isCatalogRoute ? ' main-flow--catalog-mobile' : ''} pb-[env(safe-area-inset-bottom)]`}
        >
          {isStaticPageShell ? (
            <div className="page-shell page-shell--static">{pageInner}</div>
          ) : (
            <AnimatePresence mode="wait">
              <MotionPage key={routeKey} className="page-shell">
                {pageInner}
              </MotionPage>
            </AnimatePresence>
          )}
          <VisitOrderBar />
        </main>
        {!isCatalogRoute && <Footer />}
        {isCatalogRoute ? (
          <CatalogMobileNav onSearch={() => setSearchOpen(true)} onMenu={() => setMenuOpen(true)} />
        ) : null}
        <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
        <SalesRepSidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      </div>
    </div>
    </SearchOpenProvider>
  )
}
