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
      <button
        type="button"
        onClick={onOpen}
        className="ui-press filter-chip type-label inline-flex h-12 items-center gap-2 rounded-md px-4 xl:hidden"
      >
        <SlidersHorizontal size={16} strokeWidth={1.8} />
        الفلاتر{activeCount > 0 ? ` (${activeCount})` : ''}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <button type="button" aria-label="إغلاق" onClick={onClose} className="absolute inset-0 bg-overlay" />
          <div className="relative flex max-h-[85dvh] flex-col rounded-t-[16px] bg-surface">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <p className="text-[15.5px] font-medium text-foreground">الفلاتر</p>
              <button
                type="button"
                onClick={onClose}
                aria-label="إغلاق"
                className="app-header-icon-btn inline-flex size-9 items-center justify-center rounded-full"
              >
                <X size={18} strokeWidth={1.8} />
              </button>
            </div>
            {headerSlot}
            <div className="flex-1 overflow-y-auto px-5 py-2">
              <FilterRail facets={facets} state={state} onToggle={onToggle} onClearAll={onClearAll} />
            </div>
            <div className="border-t border-border p-4">
              <button
                type="button"
                onClick={onClose}
                className="flex h-12 w-full items-center justify-center rounded-xl bg-accent text-[15px] font-medium text-accent-foreground"
              >
                عرض {resultCount} منتج
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
