import type { ReactNode } from 'react'
import { X } from 'lucide-react'
import { categoryBySlug } from '../../data/categories'
import type { SortKey } from '../../lib/useCatalogQuery'
import { sortLabels } from '../../lib/useCatalogQuery'

interface ActiveChip { key: string; label: string; value: string }

function chipValueLabel(key: string, value: string): string {
  if (key === 'category') return categoryBySlug(value)?.name ?? value
  return value
}

export default function ListToolbar({
  total, active, onRemove, sort, onSort, onClearAll, filterSlot,
}: {
  total: number
  active: ActiveChip[]
  onRemove: (key: string, value: string) => void
  sort: SortKey
  onSort: (s: SortKey) => void
  onClearAll?: () => void
  filterSlot?: ReactNode
}) {
  return (
    <div className="catalog-toolbar mb-5">
      <p className="catalog-toolbar-count text-[15px] text-foreground-muted">
        <span className="font-medium text-foreground">{total}</span> منتج
      </p>

      <div className="catalog-toolbar-actions">
        {filterSlot}
        <select
          value={sort}
          onChange={(e) => onSort(e.target.value as SortKey)}
          aria-label="الترتيب"
          className="ds-select catalog-sort h-12 min-w-0"
        >
          {(Object.keys(sortLabels) as SortKey[]).map((k) => (
            <option key={k} value={k}>{sortLabels[k]}</option>
          ))}
        </select>
      </div>

      {active.length > 0 && (
        <div className="catalog-toolbar-chips flex flex-col gap-2 min-w-0 w-full">
          <div className="flex flex-wrap items-center gap-2">
            {active.map((chip) => (
              <button
                key={`${chip.key}-${chip.value}`}
                type="button"
                onClick={() => onRemove(chip.key, chip.value)}
                className="filter-chip filter-chip--selected gap-2"
              >
                <span>{chipValueLabel(chip.key, chip.value)}</span>
                <X size={14} strokeWidth={2} aria-hidden />
              </button>
            ))}
            {onClearAll ? (
              <button type="button" onClick={onClearAll} className="text-link text-[13px] font-medium">
                مسح الكل
              </button>
            ) : null}
          </div>
        </div>
      )}
    </div>
  )
}
