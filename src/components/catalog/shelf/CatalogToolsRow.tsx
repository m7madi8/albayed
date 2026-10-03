import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { sortLabels, type SortKey } from '../../../lib/useCatalogQuery'
import { formatCatalogNum } from '../../../lib/catalogCounts'
import CatalogViewToggle from './CatalogViewToggle'

export default function CatalogToolsRow({
  resultCount,
  active,
  onRemove,
  sort,
  onSort,
  view,
  onView,
  filterSlot,
  showAllProductsLink,
  showIndexLink,
  query,
  onClearQuery,
}: {
  resultCount: number
  active: { key: string; label: string; value: string }[]
  onRemove: (key: string, value: string) => void
  sort: SortKey
  onSort: (s: SortKey) => void
  view: 'gallery' | 'sheet'
  onView: (v: 'gallery' | 'sheet') => void
  filterSlot?: ReactNode
  showAllProductsLink?: boolean
  showIndexLink?: boolean
  query?: string
  onClearQuery?: () => void
}) {
  return (
    <div className="sh-tools">
      <div className="sh-tools__lead">
        <p className="sh-tools__count">
          <strong>{formatCatalogNum(resultCount)}</strong> صنف
        </p>
      </div>

      <div className="sh-tools__filters">
        {showIndexLink ? (
          <Link to="/products" className="sh-tools__filter-link">فهرس الأقسام</Link>
        ) : null}
        {showAllProductsLink && !showIndexLink ? (
          <Link to="/products" className="sh-tools__filter-link">عرض الكل</Link>
        ) : null}
        {query ? (
          <button type="button" className="sh-tools__filter-link" onClick={onClearQuery}>
            إلغاء البحث «{query}»
          </button>
        ) : null}
        {active.map((chip) => (
          <button
            key={`${chip.key}-${chip.value}`}
            type="button"
            className="sh-tools__filter-link"
            onClick={() => onRemove(chip.key, chip.value)}
          >
            {chip.label}: {chip.value} ×
          </button>
        ))}
      </div>

      <div className="sh-tools__actions">
        {filterSlot}

        <label className="sr-only" htmlFor="sh-catalog-sort">ترتيب النتائج</label>
        <select
          id="sh-catalog-sort"
          className="sh-tools__sort"
          value={sort}
          onChange={(e) => onSort(e.target.value as SortKey)}
        >
          {(Object.keys(sortLabels) as SortKey[]).map((k) => (
            <option key={k} value={k}>{sortLabels[k]}</option>
          ))}
        </select>

        <CatalogViewToggle view={view} onView={onView} />
      </div>
    </div>
  )
}
