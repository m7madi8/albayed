import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { categoryBySlug } from '../../data/categories'
import type { Facet } from '../../lib/filters'

function facetOptionLabel(facet: Facet, value: string): string {
  if (facet.def.source === 'categorySlug') return categoryBySlug(value)?.name ?? value
  return value
}

function FacetGroup({
  facet, selected, onToggle, defaultOpen = true,
}: { facet: Facet; selected: string[]; onToggle: (v: string) => void; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  if (facet.options.length === 0) return null

  return (
    <div className="hairline-b py-5 first:pt-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between text-[14.5px] font-medium text-foreground"
      >
        {facet.def.label}
        <ChevronDown size={16} strokeWidth={1.8} className={`text-foreground-muted transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <ul className="mt-4 flex flex-col gap-3">
          {facet.options.map((opt) => {
            const checked = selected.includes(opt.value)
            const disabled = opt.count === 0 && !checked
            return (
              <li key={opt.value}>
                <label className={`flex cursor-pointer items-center justify-between gap-3 text-[14px] ${disabled ? 'cursor-not-allowed opacity-35' : ''}`}>
                  <span className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={checked}
                      disabled={disabled}
                      onChange={() => onToggle(opt.value)}
                      className="size-4 rounded border-ink/25 accent-accent"
                    />
                    <span className="text-foreground-secondary">{facetOptionLabel(facet, opt.value)}</span>
                  </span>
                  <span className="text-[12.5px] text-foreground-muted">{opt.count}</span>
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
  facets, state, onToggle, onClearAll,
}: { facets: Facet[]; state: Record<string, string[]>; onToggle: (key: string, value: string) => void; onClearAll: () => void }) {
  const activeCount = Object.values(state).reduce((n, v) => n + v.length, 0)
  return (
    <div>
      <div className="flex items-center justify-between pb-5">
        <p className="text-[13px] font-medium text-foreground-muted">تصفية النتائج</p>
        {activeCount > 0 && (
          <button type="button" onClick={onClearAll} className="text-[13px] font-medium text-accent underline-offset-4 hover:underline">
            مسح الكل ({activeCount})
          </button>
        )}
      </div>
      {facets.map((f) => (
        <FacetGroup key={f.def.key} facet={f} selected={state[f.def.key] ?? []} onToggle={(v) => onToggle(f.def.key, v)} />
      ))}
    </div>
  )
}
