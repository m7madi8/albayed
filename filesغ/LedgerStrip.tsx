import { stats } from '../../data/company'
import { brands } from '../../lib/catalog'

// Every figure is derived from real data — nothing typed in by hand except the coverage line,
// which already exists in the current hero ("تغطية توزيع في الضفة").
const originCount = new Set(brands.map((b) => b.originId)).size

const items = [
  stats[0] ? { value: stats[0].value, label: stats[0].label, ltr: true } : null,
  { value: String(brands.length), label: 'علامة تجارية', ltr: true },
  { value: String(originCount), label: 'دول منشأ', ltr: true },
  { value: 'الضفة', label: 'تغطية توزيع', ltr: false },
].filter((x): x is { value: string; label: string; ltr: boolean } => Boolean(x))

export default function LedgerStrip() {
  return (
    <section className="aisle-ledger" aria-label="حقائق">
      <div className="container-x">
        <ul className="aisle-ledger__list">
          {items.map((it) => (
            <li key={it.label} className="aisle-ledger__cell">
              <span className="aisle-ledger__value" dir={it.ltr ? 'ltr' : undefined}>
                {it.value}
              </span>
              <span className="aisle-small">{it.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
