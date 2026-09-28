import type { Facet } from '../../lib/filters'
import { filterChipClass } from '../../lib/filterStyles'
export default function CountryFilter({
  facet,
  selected,
  onToggle,
  onClearAll,
}: {
  facet: Facet | undefined
  selected: string[]
  onToggle: (value: string) => void
  onClearAll: () => void
}) {
  if (!facet || facet.options.length === 0) return null

  const activeCount = selected.length

  return (
    <section className="catalog-country-filter" aria-label="فلترة حسب البلد">
      <div className="catalog-country-filter-head">
        <p className="type-caption font-medium text-foreground-muted">البلد</p>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={onClearAll}
            className="type-caption font-medium text-accent underline-offset-4 hover:underline"
          >
            مسح ({activeCount})
          </button>
        )}
      </div>
      <div className="catalog-country-chips" role="group" aria-label="اختر البلد">
        {facet.options.map((opt) => {
          const active = selected.includes(opt.value)
          const disabled = opt.count === 0 && !active
          return (
            <button
              key={opt.value}
              type="button"
              disabled={disabled}
              onClick={() => onToggle(opt.value)}
              className={`${filterChipClass(active, disabled)} catalog-country-chip`}
              aria-pressed={active}
            >
              <span>{opt.value}</span>
              <span className="catalog-country-chip-count" aria-hidden>{opt.count}</span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
