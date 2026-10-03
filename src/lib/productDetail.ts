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

export type SpecGroup = { title: string; rows: SpecRow[] }

const PHYSICAL_KEYS = new Set(['diameter', 'size', 'thickness', 'material', 'length', 'finish', 'capacity'])
const CONNECTION_KEYS = new Set(['connection'])
const PRESSURE_KEYS = new Set(['pressure', 'usage'])
const CERT_KEY_RE = /شهاد|معيار|cert|standard|iso/i

function rowKeyForLabel(label: string, product: Product, category: Category): string | undefined {
  for (const [key] of Object.entries(product.attributes)) {
    const def = category.filters.find((f) => f.key === key)
    if ((def?.label ?? key) === label) return key
  }
  return undefined
}

/** Grouped datasheet sections for PDP */
export function groupedSpecificationRows(product: Product, category: Category): SpecGroup[] {
  const all = allSpecificationRows(product, category)
  const buckets: Record<string, SpecRow[]> = {
    'الخصائص الفيزيائية': [],
    'التوصيل والربط': [],
    'الضغط والاستخدام': [],
    'الشهادات والمعايير': [],
    أخرى: [],
  }

  for (const row of all) {
    const key = rowKeyForLabel(row.label, product, category)
    if (key && PHYSICAL_KEYS.has(key)) buckets['الخصائص الفيزيائية'].push(row)
    else if (key && CONNECTION_KEYS.has(key)) buckets['التوصيل والربط'].push(row)
    else if (key && PRESSURE_KEYS.has(key)) buckets['الضغط والاستخدام'].push(row)
    else if (CERT_KEY_RE.test(row.label)) buckets['الشهادات والمعايير'].push(row)
    else buckets['أخرى'].push(row)
  }

  return Object.entries(buckets)
    .filter(([, rows]) => rows.length > 0)
    .map(([title, rows]) => ({ title, rows }))
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
