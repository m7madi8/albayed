import { brands, categories, products } from './catalog'
import { normalize } from './arabic'
import { brandOf, categoryOf, originOf } from './catalog'
import type { Brand, Category, Product } from '../data/types'

interface Entry {
  p: Product
  name: string
  type: string
  brand: string
  category: string
  origin: string
  attrs: string
  kw: string
  sku: string
  slug: string
  all: string
}

const flat = (v: string | string[]) => (Array.isArray(v) ? v.join(' ') : v)

/** Built once — 5–10k products would move this to the server, the ranking rules stay. */
const index: Entry[] = products.map((p) => {
  const name = normalize(p.name)
  const type = normalize(p.type)
  const brand = normalize(`${brandOf(p).name} ${brandOf(p).latin}`)
  const category = normalize(categoryOf(p).name)
  const origin = normalize(`${originOf(p).name} ${originOf(p).latin}`)
  const attrs = normalize(
    [...Object.values(p.attributes).map(flat), ...p.details.map((d) => d.value)].join(' '),
  )
  const kw = normalize((p.keywords ?? []).join(' '))
  const sku = normalize(p.id)
  const slug = normalize(p.slug)
  return {
    p,
    name,
    type,
    brand,
    category,
    origin,
    attrs,
    kw,
    sku,
    slug,
    all: `${name} ${type} ${brand} ${category} ${origin} ${attrs} ${kw} ${sku} ${slug}`,
  }
})

const has = (hay: string, tok: string) =>
  /^\d+$/.test(tok) ? new RegExp(`(?<![\\d/.])${tok}(?![\\d.])`).test(hay) : hay.includes(tok)

export interface SearchResult {
  products: Product[]
  total: number
  categories: Category[]
  brands: Brand[]
}

export function search(query: string, limit = 8): SearchResult {
  const q = normalize(query)
  if (!q) return { products: [], total: 0, categories: [], brands: [] }
  const tokens = q.split(' ')

  const scored: { p: Product; s: number }[] = []
  for (const e of index) {
    if (!tokens.every((t) => has(e.all, t))) continue
    let s = 0
    for (const t of tokens) {
      if (has(e.sku, t)) s += 14
      if (has(e.slug, t)) s += 10
      if (has(e.name, t)) s += e.name.startsWith(t) ? 12 : 9
      if (has(e.type, t)) s += 6
      if (has(e.kw, t)) s += 5
      if (has(e.brand, t)) s += 5
      if (has(e.category, t)) s += 4
      if (has(e.origin, t)) s += 4
      if (has(e.attrs, t)) s += 2
    }
    scored.push({ p: e.p, s })
  }
  scored.sort((a, b) => b.s - a.s)

  const cats = categories.filter((c) => {
    const hay = normalize(`${c.name} ${c.subtypes.join(' ')}`)
    return tokens.every((t) => hay.includes(t))
  })
  const brs = brands.filter((b) => {
    const hay = normalize(`${b.name} ${b.latin}`)
    return tokens.every((t) => hay.includes(t))
  })

  return { products: scored.slice(0, limit).map((x) => x.p), total: scored.length, categories: cats.slice(0, 3), brands: brs.slice(0, 3) }
}

/** Full-list variant used by /products?q= */
export function searchAll(query: string): Set<string> | null {
  const q = normalize(query)
  if (!q) return null
  const tokens = q.split(' ')
  return new Set(index.filter((e) => tokens.every((t) => has(e.all, t))).map((e) => e.p.id))
}

export const popularSearches = ['PVC', 'PPR', 'محبس كروي', 'بطارية', 'مضخة', '2 إنش']
