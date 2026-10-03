import { getHeroLedgerItems } from './heroLedgerItems'

export default function HeroLedger() {
  const items = getHeroLedgerItems()

  return (
    <div className="hero-vault__ledger" aria-label="حقائق">
      <ul className="hero-vault__ledger-list">
        {items.map((it) => (
          <li key={it.label} className="hero-vault__ledger-cell">
            <span className="hero-vault__ledger-value" dir={it.ltr ? 'ltr' : undefined}>
              {it.value}
            </span>
            <span className="hero-vault__ledger-label">{it.label}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
