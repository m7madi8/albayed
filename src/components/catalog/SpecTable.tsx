import type { SpecRow } from '../../data/types'
import type { SpecGroup } from '../../lib/productDetail'

function SpecRowsTable({ rows }: { rows: SpecRow[] }) {
  return (
    <dl className="hairline-t spec-table">
      {rows.map((r) => (
        <div
          key={r.label}
          className="spec-table__row hairline-b grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-4 py-3.5 sm:py-4"
        >
          <dt className="text-[14px] text-foreground-muted">{r.label}</dt>
          <dd className="type-data text-[14px] font-medium text-foreground">{r.value}</dd>
        </div>
      ))}
    </dl>
  )
}

export default function SpecTable({
  rows,
  groups,
  title = 'المواصفات',
  grouped = false,
}: {
  rows?: SpecRow[]
  groups?: SpecGroup[]
  title?: string
  grouped?: boolean
}) {
  const flatRows = rows ?? []
  const hasGroups = Boolean(groups && groups.length > 0)
  if (!hasGroups && flatRows.length === 0) return null

  if (hasGroups) {
    return (
      <div className="spec-table-groups">
        {groups!.map((g) => (
          <section key={g.title} className="spec-table-group-block mb-8 last:mb-0">
            <h3 className="spec-table-group-block__title type-label mb-3">{g.title}</h3>
            <SpecRowsTable rows={g.rows} />
          </section>
        ))}
      </div>
    )
  }

  const table = <SpecRowsTable rows={flatRows} />

  if (!grouped) {
    return (
      <div>
        {title ? <p className="mb-4 text-[13px] font-medium text-foreground-muted">{title}</p> : null}
        {table}
      </div>
    )
  }

  return (
    <details className="spec-table-group sm:open" open>
      <summary className="spec-table-group__summary type-label cursor-pointer list-none sm:hidden">
        {title || 'المواصفات'}
      </summary>
      <div className="mt-2 sm:mt-0">{table}</div>
    </details>
  )
}
