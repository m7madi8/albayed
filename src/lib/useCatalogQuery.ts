import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { FilterDef, Product } from '../data/types'
import { applyFilters, buildFacets, type FilterState } from './filters'
import { collator } from './arabic'
import { searchAll } from './search'

export type SortKey = 'default' | 'name' | 'availability'

export const sortLabels: Record<SortKey, string> = {
  default: 'الترتيب الافتراضي',
  name: 'الاسم',
  availability: 'المتوفر أولًا',
}

const availRank = { in_stock: 0, limited: 1, out_of_stock: 2 } as const

/**
 * All catalogue state lives in the URL (?type=PVC&origin=تركيا&q=…) so every view
 * is shareable and the browser back button behaves. Same shape a Laravel API would accept.
 */
export function useCatalogQuery(pool: Product[], defs: FilterDef[]) {
  const [sp, setSp] = useSearchParams()
  const q = sp.get('q') ?? ''
  const sort = (sp.get('sort') as SortKey) || 'default'
  const spKey = sp.toString()

  const state: FilterState = useMemo(() => {
    const params = new URLSearchParams(spKey)
    return Object.fromEntries(defs.map((d) => [d.key, params.getAll(d.key)]))
  }, [spKey, defs])

  const basePool = useMemo(() => {
    const ids = searchAll(q)
    return ids ? pool.filter((p) => ids.has(p.id)) : pool
  }, [pool, q])

  const facets = useMemo(() => buildFacets(basePool, defs, state), [basePool, defs, state])

  const results = useMemo(() => {
    const list = applyFilters(basePool, defs, state)
    if (sort === 'name') return [...list].sort((a, b) => collator.compare(a.name, b.name))
    if (sort === 'availability') return [...list].sort((a, b) => availRank[a.availability] - availRank[b.availability])
    return list
  }, [basePool, defs, state, sort])

  const mutate = useCallback(
    (fn: (next: URLSearchParams) => void) =>
      setSp(
        (prev) => {
          const next = new URLSearchParams(prev)
          fn(next)
          return next
        },
        { replace: true, preventScrollReset: true },
      ),
    [setSp],
  )

  const toggle = useCallback(
    (key: string, value: string) =>
      mutate((n) => {
        const cur = n.getAll(key)
        n.delete(key)
        const nextVals = cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value]
        nextVals.forEach((v) => n.append(key, v))
      }),
    [mutate],
  )

  const clearAll = useCallback(
    () =>
      mutate((n) => {
        defs.forEach((d) => n.delete(d.key))
        n.delete('q')
      }),
    [mutate, defs],
  )
  const clearQuery = useCallback(() => mutate((n) => n.delete('q')), [mutate])

  const setSingle = useCallback(
    (key: string, value: string | null) =>
      mutate((n) => {
        n.delete(key)
        if (value) n.append(key, value)
      }),
    [mutate],
  )
  const setSort = useCallback(
    (s: SortKey) => mutate((n) => (s === 'default' ? n.delete('sort') : n.set('sort', s))),
    [mutate],
  )

  const active = defs.flatMap((d) => state[d.key].map((value) => ({ key: d.key, label: d.label, value })))

  return {
    q,
    sort,
    state,
    facets,
    results,
    active,
    toggle,
    setSingle,
    clearAll,
    clearQuery,
    setSort,
    total: basePool.length,
  }
}
