import type { FilterDef, Product } from '../data/types'
import { availabilityLabel, brandOf, categoryOf, originOf } from './catalog'
import { catalogCountryOf } from './catalogCountry'
import { salesCountryOf } from './salesFilters'
import { collator } from './arabic'

/** selected values per filter key */
export type FilterState = Record<string, string[]>

export interface FacetOption {
  value: string
  count: number
}
export interface Facet {
  def: FilterDef
  options: FacetOption[]
}

/** The list of values a product exposes for a given filter. Arrays = a family with several values. */
export function valuesFor(p: Product, def: FilterDef): string[] {
  switch (def.source) {
    case 'type': return [p.type]
    case 'brand': return [brandOf(p).name]
    case 'origin': return [originOf(p).name]
    case 'category': return [categoryOf(p).name]
    case 'categorySlug': return [categoryOf(p).slug]
    case 'availability': return [availabilityLabel[p.availability]]
    case 'salesOrigin': return [salesCountryOf(p)]
    case 'catalogCountry': return [catalogCountryOf(p)]
    default: {
      const v = p.attributes[def.key]
      return v === undefined ? [] : Array.isArray(v) ? v : [v]
    }
  }
}

/** OR inside a filter, AND across filters. `skip` leaves one filter out (used for facet counts). */
export function applyFilters(pool: Product[], defs: FilterDef[], state: FilterState, skip?: string): Product[] {
  const active = defs.filter((d) => d.key !== skip && state[d.key]?.length)
  if (!active.length) return pool
  return pool.filter((p) => active.every((d) => valuesFor(p, d).some((v) => state[d.key].includes(v))))
}

function sortValues(def: FilterDef, values: string[]): string[] {
  if (def.order) {
    const idx = (v: string) => {
      const i = def.order!.indexOf(v)
      return i === -1 ? 999 : i
    }
    return [...values].sort((a, b) => idx(a) - idx(b) || collator.compare(a, b))
  }
  return [...values].sort(collator.compare)
}

/**
 * Facets for the current pool. Counts for a facet ignore that facet's own selection,
 * so the user sees what they'd get by adding another value — standard catalogue behaviour.
 */
export function buildFacets(pool: Product[], defs: FilterDef[], state: FilterState): Facet[] {
  return defs.map((def) => {
    const scoped = applyFilters(pool, defs, state, def.key)
    const counts = new Map<string, number>()
    for (const p of scoped) for (const v of new Set(valuesFor(p, def))) counts.set(v, (counts.get(v) ?? 0) + 1)
    for (const v of state[def.key] ?? []) if (!counts.has(v)) counts.set(v, 0)
    if (def.order) for (const v of def.order) if (!counts.has(v)) counts.set(v, 0)
    const values = sortValues(def, [...counts.keys()])
    return { def, options: values.map((value) => ({ value, count: counts.get(value) ?? 0 })) }
  })
}
