import type { Facet } from '../../lib/filters'
import { filterChipClass } from '../../lib/filterStyles'
import {
  SALES_COUNTRY_LABELS,
  SALES_SECTIONS,
  type SalesCountryLabel,
  type SalesSectionId,
} from '../../lib/salesFilters'

export default function SalesCatalogFilters({
  section,
  onSection,
  countryFacet,
  selectedCountry,
  onCountry,
  onClearCountry,
}: {
  section: SalesSectionId
  onSection: (id: SalesSectionId) => void
  countryFacet: Facet | undefined
  selectedCountry: string | null
  onCountry: (label: SalesCountryLabel) => void
  onClearCountry: () => void
}) {
  const counts = new Map(countryFacet?.options.map((o) => [o.value, o.count]) ?? [])

  return (
    <div className="space-y-5">
      <div>
        <p className="mb-2.5 text-[13px] font-medium text-foreground-muted">ما تعرضه للشركة</p>
        <div className="grid grid-cols-2 gap-2.5">
          {SALES_SECTIONS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => onSection(s.id)}
              className={`min-h-[52px] rounded-[14px] px-4 ${filterChipClass(section === s.id)}`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-2.5 flex items-center justify-between gap-3">
          <p className="text-[13px] font-medium text-foreground-muted">البلد</p>
          {selectedCountry && (
            <button type="button" onClick={onClearCountry} className="text-[13px] font-medium text-foreground-secondary underline-offset-4 hover:underline">
              عرض كل البلدان
            </button>
          )}
        </div>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
          {SALES_COUNTRY_LABELS.map((label) => {
            const count = counts.get(label) ?? 0
            const active = selectedCountry === label
            const disabled = count === 0 && !active
            return (
              <button
                key={label}
                type="button"
                disabled={disabled}
                onClick={() => onCountry(label)}
                className={`flex min-h-[56px] flex-col items-center justify-center rounded-[14px] px-3 py-2.5 ${filterChipClass(active, disabled)}`}
              >
                <span className="text-[15px] font-medium">{label}</span>
                <span className={`mt-0.5 text-[12px] ${active ? 'text-foreground-secondary' : 'text-foreground-muted'}`}>{count} صنف</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
