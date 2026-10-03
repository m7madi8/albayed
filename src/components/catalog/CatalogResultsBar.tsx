import type { ReactNode } from 'react'
import { X } from 'lucide-react'
import { categoryBySlug } from '../../data/categories'
import type { SortKey } from '../../lib/useCatalogQuery'
import { sortLabels } from '../../lib/useCatalogQuery'

interface ActiveChip {
  key: string
  label: string
  value: string
}

function chipValueLabel(key: string, value: string): string {
  if (key === 'category') return categoryBySlug(value)?.name ?? value
  return value
}

export default function CatalogResultsBar({
  total,
  active,
  onRemove,
  sort,
  onSort,
  onClearAll,
  filterSlot,
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
    <div className="cp-results-bar">
      <p className="cp-results-bar__count">
        <strong>{total.toLocaleString('ar-EG')}</strong> منتج في هذه القائمة
      </p>
      <div className="cp-results-bar__tools">
        {filterSlot}
        <select
          value={sort}
          onChange={(e) => onSort(e.target.value as SortKey)}
          aria-label="الترتيب"
          className="cp-sort"
        >
          {(Object.keys(sortLabels) as SortKey[]).map((k) => (
            <option key={k} value={k}>
              {sortLabels[k]}
            </option>
          ))}
        </select>
      </div>
      {active.length > 0 ? (
        <div className="cp-active-filters">
          {active.map((chip) => (
            <button
              key={`${chip.key}-${chip.value}`}
              type="button"
              onClick={() => onRemove(chip.key, chip.value)}
              className="cp-active-chip"
            >
              <span>{chipValueLabel(chip.key, chip.value)}</span>
              <X size={14} strokeWidth={2} aria-hidden />
            </button>
          ))}
          {onClearAll ? (
            <button type="button" onClick={onClearAll} className="cp-empty__link">
              مسح الكل
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
