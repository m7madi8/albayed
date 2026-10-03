import { categories } from '../data/categories'
import { products, productsIn } from './catalog'

export function totalCatalogCount(): number {
  return products.length
}

export function categoryLiveCount(slug: string): number {
  const cat = categories.find((c) => c.slug === slug)
  if (!cat) return 0
  return productsIn(cat).length
}

/** Western numerals for technical UI */
export function formatCatalogNum(n: number): string {
  return n.toLocaleString('en-US')
}
