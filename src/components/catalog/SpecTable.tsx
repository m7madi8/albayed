import type { SpecRow } from '../../data/types'

export default function SpecTable({ rows, title = 'المواصفات' }: { rows: SpecRow[]; title?: string }) {
  if (rows.length === 0) return null
  return (
    <div>
      {title ? <p className="mb-4 text-[13px] font-medium text-foreground-muted">{title}</p> : null}
      <dl className="hairline-t">
        {rows.map((r) => (
          <div key={r.label} className="hairline-b grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-4 py-3.5 sm:py-4">
            <dt className="text-[14px] text-foreground-muted">{r.label}</dt>
            <dd className="text-[14px] font-medium text-foreground">{r.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
