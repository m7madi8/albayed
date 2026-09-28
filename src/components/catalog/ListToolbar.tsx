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
  total, active, onRemove, sort, onSort,
}: {
  total: number
  active: ActiveChip[]
  onRemove: (key: string, value: string) => void
  sort: SortKey
  onSort: (s: SortKey) => void
}) {
  return (
    <div className="mb-5 flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[15px] text-foreground-muted">
          <span className="font-medium text-foreground">{total}</span> منتج
        </p>
        <div className="flex items-center gap-2">
          <select
            value={sort}
            onChange={(e) => onSort(e.target.value as SortKey)}
            aria-label="الترتيب"
            className="ds-select catalog-sort h-12 min-w-[9.5rem]"
          >
            {(Object.keys(sortLabels) as SortKey[]).map((k) => (
              <option key={k} value={k}>{sortLabels[k]}</option>
            ))}
          </select>
        </div>
      </div>

      {active.length > 0 && (
        <div className="ios-list">
          {active.map((chip) => (
            <button
              key={`${chip.key}-${chip.value}`}
              type="button"
              onClick={() => onRemove(chip.key, chip.value)}
              className="ios-list-row flex w-full items-center justify-between text-[15px] text-foreground"
            >
              <span>{chipValueLabel(chip.key, chip.value)}</span>
              <X size={16} strokeWidth={2} className="text-foreground-muted" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
