import type { Facet } from '../../lib/filters'

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
    <section className="cp-origin" aria-label="فلترة حسب البلد">
      <div className="cp-origin__head">
        <p className="cp-origin__label">بلد المنشأ</p>
        {activeCount > 0 && (
          <button type="button" onClick={onClearAll} className="cp-empty__link">
            مسح ({activeCount})
          </button>
        )}
      </div>
      <div className="cp-origin__chips" role="group" aria-label="اختر البلد">
        {facet.options
          .filter((opt) => opt.count > 0 || selected.includes(opt.value))
          .map((opt) => {
            const active = selected.includes(opt.value)
            const disabled = opt.count === 0 && !active
            return (
              <button
                key={opt.value}
                type="button"
                disabled={disabled}
                onClick={() => onToggle(opt.value)}
                className="cp-chip"
                aria-pressed={active}
              >
                <span>{opt.value}</span>
                <span className="cp-chip__n">{opt.count}</span>
              </button>
            )
          })}
      </div>
    </section>
  )
}
