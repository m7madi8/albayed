import type { Product } from '../data/types'
import { collator } from './arabic'

export interface ShelfSection {
  type: string
  products: Product[]
}

export function groupCatalogShelf(products: Product[]): ShelfSection[] {
  const map = new Map<string, Product[]>()
  for (const p of products) {
    const key = p.type?.trim() || 'أخرى'
    const list = map.get(key) ?? []
    list.push(p)
    map.set(key, list)
  }
  return [...map.entries()]
    .sort(([a], [b]) => collator.compare(a, b))
    .map(([type, list]) => ({ type, products: list }))
}
