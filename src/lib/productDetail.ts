import type { Category, Product, SpecRow } from '../data/types'
import { headlineSpec } from './catalog'

const flat = (v: string | string[]) => (Array.isArray(v) ? v.join(' / ') : v)

/** أهم المواصفات للعمود الجانبي — بدون حشو */
export function keySpecificationRows(product: Product, category: Category, max = 5): SpecRow[] {
  const priority = ['diameter', 'size', 'thickness', 'material', 'connection', 'length', 'finish', 'capacity', 'usage']
  const rows: SpecRow[] = []
  for (const key of priority) {
    const v = product.attributes[key]
    if (!v) continue
    const def = category.filters.find((f) => f.key === key)
    rows.push({ label: def?.label ?? key, value: flat(v) })
    if (rows.length >= max) break
  }
  if (rows.length === 0 && product.details[0]) rows.push(product.details[0])
  return rows
}

export function allSpecificationRows(product: Product, category: Category): SpecRow[] {
  const attrRows = Object.entries(product.attributes).map(([key, v]) => {
    const filterDef = category.filters.find((f) => f.key === key)
    return { label: filterDef?.label ?? key, value: flat(v) }
  })
  const seen = new Set(attrRows.map((r) => r.label))
  const extra = product.details.filter((d) => !seen.has(d.label))
  return [...attrRows, ...extra]
}

/** بيانات تُعرض بجانب وضع المخطط */
export function blueprintSpecificationRows(product: Product, category: Category): SpecRow[] {
  const keys = ['diameter', 'size', 'thickness', 'material', 'connection', 'length', 'usage']
  const rows: SpecRow[] = []
  for (const key of keys) {
    const v = product.attributes[key]
    if (!v) continue
    const def = category.filters.find((f) => f.key === key)
    rows.push({ label: def?.label ?? key, value: flat(v) })
  }
  if (product.art.mark) {
    rows.unshift({ label: 'وسم المنتج', value: product.art.mark })
  }
  if (rows.length < 3) {
    for (const d of product.details.slice(0, 4 - rows.length)) {
      if (!rows.some((r) => r.label === d.label)) rows.push(d)
    }
  }
  return rows
}

export function visualizationLabel(product: Product): string {
  return product.art.mark ?? headlineSpec(product)
}

export function productPrimaryImage(product: Product): string | undefined {
  return product.image ?? product.images?.[0]
}
