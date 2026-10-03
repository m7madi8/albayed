import { useEffect, type ReactNode } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'
import type { Facet } from '../../lib/filters'
import FilterRail from './FilterRail'

export default function FilterDrawer({
  open,
  onOpen,
  onClose,
  facets,
  state,
  onToggle,
  onClearAll,
  resultCount,
  headerSlot,
  shelf = false,
}: {
  open: boolean
  onOpen: () => void
  onClose: () => void
  facets: Facet[]
  state: Record<string, string[]>
  onToggle: (key: string, value: string) => void
  onClearAll: () => void
  resultCount: number
  headerSlot?: ReactNode
  shelf?: boolean
}) {
  const activeCount = Object.values(state).reduce((n, v) => n + v.length, 0)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <button type="button" onClick={onOpen} className={shelf ? 'sh-filter-mobile' : 'cp-filter-mobile'}>
        <SlidersHorizontal size={16} strokeWidth={1.8} aria-hidden />
        فلاتر{activeCount > 0 ? ` · ${activeCount}` : ''}
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="إغلاق"
            onClick={onClose}
            className={shelf ? 'sh-drawer-backdrop' : 'cp-drawer-backdrop'}
          />
          <div className={shelf ? 'sh-drawer' : 'cp-drawer'} role="dialog" aria-modal="true" aria-label="الفلاتر">
            <div className={shelf ? 'sh-drawer__head' : 'cp-drawer__head'}>
              <p className="text-[15px] font-semibold">تصفية المنتجات</p>
              <button type="button" onClick={onClose} aria-label="إغلاق" className="app-header-icon-btn size-9">
                <X size={18} strokeWidth={1.8} />
              </button>
            </div>
            {headerSlot}
            <div className={shelf ? 'sh-drawer__body' : 'cp-drawer__body'}>
              <FilterRail
                shelf={shelf}
                facets={facets}
                state={state}
                onToggle={onToggle}
                onClearAll={onClearAll}
              />
            </div>
            <div className={shelf ? 'sh-drawer__foot' : 'cp-drawer__foot'}>
              <button type="button" onClick={onClose} className={shelf ? 'sh-drawer__apply' : 'cp-drawer__apply'}>
                عرض {resultCount.toLocaleString('en-US')} منتج
              </button>
            </div>
          </div>
        </>
      )}
    </>
  )
}
