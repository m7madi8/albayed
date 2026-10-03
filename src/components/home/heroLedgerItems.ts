import { stats } from '../../data/company'
import { brands } from '../../lib/catalog'

const originCount = new Set(brands.map((b) => b.originId)).size

export type HeroLedgerItem = { value: string; label: string; ltr: boolean }

export function getHeroLedgerItems(): HeroLedgerItem[] {
  return [
    stats[0] ? { value: stats[0].value, label: stats[0].label, ltr: true } : null,
    { value: String(brands.length), label: 'علامة تجارية', ltr: true },
    { value: String(originCount), label: 'دول منشأ', ltr: true },
  ].filter((x): x is HeroLedgerItem => Boolean(x))
}
