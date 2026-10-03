import { useCallback, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import SalesOsSidebar from './SalesOsSidebar'
import SalesOsTopBar from './SalesOsTopBar'
import SalesOsBottomNav from './SalesOsBottomNav'
import UniversalSearchOverlay from '../search/UniversalSearchOverlay'
import VisitOrderBar from '../order/VisitOrderBar'
import { SearchOpenProvider } from '../../context/SearchOpenContext'
import { useVisitOrder } from '../../context/VisitOrderContext'
import SalesToast from './SalesToast'
import { densityClass, readSalesDensity, type SalesDensity } from '../../lib/salesDensity'

export default function SalesOsLayout() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const [density, setDensity] = useState<SalesDensity>(() => readSalesDensity())
  const openSearch = useCallback(() => setSearchOpen(true), [])
  const { lineCount } = useVisitOrder()
  const hideVisitBar = lineCount === 0

  useEffect(() => {
    const onDensity = (e: Event) => {
      const detail = (e as CustomEvent<SalesDensity>).detail
      if (detail) setDensity(detail)
    }
    window.addEventListener('al-bayed-density-change', onDensity)
    return () => window.removeEventListener('al-bayed-density-change', onDensity)
  }, [])

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

  return (
    <SearchOpenProvider open={openSearch}>
      <div className="sales-os-canvas min-h-dvh bg-background">
        <div className="sales-os-frame flex min-h-dvh">
          <SalesOsSidebar onSearch={openSearch} />
          <div className="sales-os-main flex min-h-dvh min-w-0 flex-1 flex-col">
            <SalesOsTopBar onSearch={openSearch} />
            <main
              className={`sales-os-content flex-1 ${densityClass(density)}${hideVisitBar ? '' : ' sales-os-content--order-pad'}`}
            >
              <div className="sales-os-page">
                <Outlet context={{ showToast: (msg: string) => setToast(msg) }} />
              </div>
            </main>
            {!hideVisitBar && <VisitOrderBar />}
            <SalesOsBottomNav onSearch={openSearch} />
          </div>
        </div>
        <UniversalSearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
        <SalesToast message={toast} onDone={() => setToast(null)} />
      </div>
    </SearchOpenProvider>
  )
}
