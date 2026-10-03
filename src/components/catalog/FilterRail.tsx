import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { categoryBySlug } from '../../data/categories'
import type { Facet } from '../../lib/filters'

function facetOptionLabel(facet: Facet, value: string): string {
  if (facet.def.source === 'categorySlug') return categoryBySlug(value)?.name ?? value
  return value
}

function FacetGroup({
  facet,
  selected,
  onToggle,
  defaultOpen = true,
  shelf = false,
}: {
  facet: Facet
  selected: string[]
  onToggle: (v: string) => void
  defaultOpen?: boolean
  shelf?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  if (facet.options.length === 0) return null

  const groupCls = shelf ? 'sh-filter-group' : 'cp-filter-group'
  const btnCls = shelf ? 'sh-filter-group-btn' : 'cp-filter-group-btn'
  const listCls = shelf ? 'sh-filter-options' : 'cp-filter-options'
  const optCls = shelf ? 'sh-filter-option' : 'cp-filter-option'

  return (
    <div className={groupCls}>
      <button type="button" onClick={() => setOpen((o) => !o)} className={btnCls}>
        {facet.def.label}
        <ChevronDown
          size={16}
          strokeWidth={1.8}
          className={`text-foreground-muted transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <ul className={listCls}>
          {facet.options
            .filter((opt) => opt.count > 0 || selected.includes(opt.value))
            .map((opt) => {
              const checked = selected.includes(opt.value)
              const disabled = opt.count === 0 && !checked
              return (
                <li key={opt.value}>
                  <label className={`${optCls}${disabled ? ' opacity-35 cursor-not-allowed' : ''}`}>
                    <span className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={checked}
                        disabled={disabled}
                        onChange={() => onToggle(opt.value)}
                      />
                      <span>{facetOptionLabel(facet, opt.value)}</span>
                    </span>
                    <span className="font-mono text-[12px] text-foreground-muted">
                      {shelf ? opt.count.toLocaleString('en-US') : opt.count}
                    </span>
                  </label>
                </li>
              )
            })}
        </ul>
      )}
    </div>
  )
}

export default function FilterRail({
  facets,
  state,
  onToggle,
  onClearAll,
  shelf = false,
}: {
  facets: Facet[]
  state: Record<string, string[]>
  onToggle: (key: string, value: string) => void
  onClearAll: () => void
  shelf?: boolean
}) {
  const activeCount = Object.values(state).reduce((n, v) => n + v.length, 0)
  const headCls = shelf ? 'sh-filter-head' : 'cp-filter-head'
  const titleCls = shelf ? 'sh-filter-title' : 'cp-filter-title'
  const clearCls = shelf ? 'sh-filter-clear' : 'cp-filter-clear'
  return (
    <div>
      <div className={headCls}>
        <p className={titleCls}>تصفية</p>
        {activeCount > 0 && (
          <button type="button" onClick={onClearAll} className={clearCls}>
            مسح ({activeCount})
          </button>
        )}
      </div>
      {facets.map((f) => (
        <FacetGroup
          key={f.def.key}
          facet={f}
          selected={state[f.def.key] ?? []}
          onToggle={(v) => onToggle(f.def.key, v)}
          shelf={shelf}
        />
      ))}
    </div>
  )
}
